-- pre-aggregate the heavy seller/date rollup so the moving-average and mom-growth
-- queries don't rescan all 1.2M order rows every time
CREATE MATERIALIZED VIEW mv_daily_seller_revenue AS
SELECT
    seller_sk,
    date_sk,
    SUM(total_amount) as daily_revenue,
    COUNT(DISTINCT order_id) as total_orders
FROM fact_orders
GROUP BY seller_sk, date_sk;

-- force fact_orders to sit sorted by customer/date on disk so the running-total
-- query doesn't blow up into a big in-memory sort. duckdb has no CLUSTER BY like
-- snowflake, so just rewrite the table in order.
CREATE TABLE fact_orders_optimized AS
SELECT * FROM fact_orders
ORDER BY customer_sk, date_sk;

DROP TABLE fact_orders;
ALTER TABLE fact_orders_optimized RENAME TO fact_orders;
