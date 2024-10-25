-- running total of revenue per customer over time
SELECT
    c.customer_id,
    c.first_name,
    c.last_name,
    f.date_sk,
    f.total_amount,
    SUM(f.total_amount) OVER (
        PARTITION BY c.customer_sk
        ORDER BY f.date_sk
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS cumulative_revenue
FROM fact_orders f
JOIN dim_customer c ON f.customer_sk = c.customer_sk
ORDER BY c.customer_id, f.date_sk
LIMIT 10;

/* top 3 products by revenue within each department.
   rank vs dense_rank both here just to eyeball the tie behaviour */
WITH ProductRevenue AS (
    SELECT
        p.department,
        p.product_name,
        SUM(f.total_amount) as total_revenue
    FROM fact_orders f
    JOIN dim_product p ON f.product_sk = p.product_sk
    GROUP BY p.department, p.product_name
)
SELECT
    department,
    product_name,
    total_revenue,
    RANK() OVER (PARTITION BY department ORDER BY total_revenue DESC) as revenue_rank,
    DENSE_RANK() OVER (PARTITION BY department ORDER BY total_revenue DESC) as revenue_dense_rank
FROM ProductRevenue
QUALIFY RANK() OVER (PARTITION BY department ORDER BY total_revenue DESC) <= 3
ORDER BY department, revenue_rank;
