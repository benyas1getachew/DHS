WITH CustomerSpend AS (
    SELECT
        c.customer_id,
        c.first_name,
        c.last_name,
        SUM(f.total_amount) as lifetime_spend
    FROM fact_orders f
    JOIN dim_customer c ON f.customer_sk = c.customer_sk
    GROUP BY c.customer_id, c.first_name, c.last_name
)
SELECT
    customer_id,
    first_name,
    last_name,
    lifetime_spend,
    NTILE(4) OVER (ORDER BY lifetime_spend DESC) as spend_quartile,
    ROUND(PERCENT_RANK() OVER (ORDER BY lifetime_spend DESC) * 100, 2) as spend_percentile
FROM CustomerSpend
ORDER BY lifetime_spend DESC
LIMIT 20;

-- top 3 priciest items each gold/platinum customer bought.
-- fact has no order_date so pull it off dim_date
WITH RankedPurchases AS (
    SELECT
        c.customer_id,
        c.customer_tier,
        p.product_name,
        f.unit_price,
        dd.full_date as order_date,
        ROW_NUMBER() OVER(PARTITION BY c.customer_sk ORDER BY f.unit_price DESC) as purchase_rank
    FROM fact_orders f
    JOIN dim_customer c ON f.customer_sk = c.customer_sk
    JOIN dim_product p ON f.product_sk = p.product_sk
    JOIN dim_date dd ON f.date_sk = dd.date_sk
    WHERE c.customer_tier IN ('Platinum', 'Gold')
)
SELECT
    customer_id,
    customer_tier,
    product_name,
    unit_price,
    order_date,
    purchase_rank
FROM RankedPurchases
WHERE purchase_rank <= 3
ORDER BY customer_id, purchase_rank;
