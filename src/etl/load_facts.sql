-- fact loads

INSERT INTO fact_orders (
    order_sk, order_id, date_sk, customer_sk, product_sk, seller_sk,
    quantity, unit_price, discount_amount, total_amount, order_status
)
SELECT
    md5(CAST(o.order_id AS VARCHAR)),
    o.order_id,
    CAST(strftime(o.order_date, '%Y%m%d') AS INTEGER) AS date_sk,
    COALESCE(c.customer_sk, 'UNKNOWN') AS customer_sk,
    COALESCE(p.product_sk, 'UNKNOWN') AS product_sk,
    COALESCE(s.seller_sk, 'UNKNOWN') AS seller_sk,
    o.quantity,
    o.unit_price,
    o.discount,
    (o.quantity * o.unit_price) * (1 - o.discount) AS total_amount,
    o.status
FROM stg_orders o
-- point-in-time join to the customer version live on the order date
LEFT JOIN dim_customer c
    ON o.customer_id = c.customer_id
    AND o.order_date >= c.valid_from
    AND (o.order_date < c.valid_to OR c.valid_to IS NULL)
LEFT JOIN dim_product p ON o.product_id = p.product_id
LEFT JOIN dim_seller s ON p.seller_id = s.seller_id;


-- daily seller rollup. delete-then-insert so a rerun is idempotent
DELETE FROM fact_daily_sales
WHERE date_sk IN (
    SELECT DISTINCT CAST(strftime(order_date, '%Y%m%d') AS INTEGER) FROM stg_orders
);

INSERT INTO fact_daily_sales (
    daily_sales_sk, date_sk, seller_sk, total_orders, total_revenue, total_items_sold
)
SELECT
    md5(CAST(date_sk AS VARCHAR) || seller_sk) AS daily_sales_sk,
    date_sk,
    seller_sk,
    COUNT(DISTINCT order_id) AS total_orders,
    SUM(total_amount) AS total_revenue,
    SUM(quantity) AS total_items_sold
FROM fact_orders
GROUP BY date_sk, seller_sk;
