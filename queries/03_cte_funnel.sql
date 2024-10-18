-- purchase frequency segments (one-time / repeat / loyal) and their share
-- WIP: counts are off, i think repeat purchasers get double counted through the
-- product join. need to aggregate distinct orders per customer first before segmenting.
WITH CustomerOrderCounts AS (
    SELECT
        f.customer_sk,
        COUNT(f.order_id) as total_orders
    FROM fact_orders f
    JOIN dim_product p ON f.product_sk = p.product_sk
    GROUP BY f.customer_sk
)
SELECT
    CASE
        WHEN total_orders = 1 THEN 'One-time buyer'
        WHEN total_orders BETWEEN 2 AND 5 THEN 'Repeat buyer'
        WHEN total_orders > 5 THEN 'Loyal buyer'
    END as segment,
    COUNT(*) as customer_count
FROM CustomerOrderCounts
GROUP BY segment;

-- TODO: first-to-second order gap, once the segment counts are right
