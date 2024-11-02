-- duckdb has no materialized views, so pre-aggregations are just tables built with ctas.
-- these back the heavier dashboard queries so they don't rescan all 1.2M order rows.
-- fact_daily_sales (the dbt model) is the main one, this is an extra seller/date cut.

DROP TABLE IF EXISTS summary_seller_daily;

CREATE TABLE summary_seller_daily AS
SELECT
    seller_sk,
    date_sk,
    SUM(total_amount) as daily_revenue,
    COUNT(DISTINCT order_id) as total_orders
FROM fact_orders
GROUP BY seller_sk, date_sk;

-- monthly rollup is small enough to leave as a plain view over the summary table
CREATE OR REPLACE VIEW summary_seller_monthly AS
SELECT
    seller_sk,
    SUBSTR(CAST(date_sk AS VARCHAR), 1, 6) as year_month,
    SUM(daily_revenue) as monthly_revenue,
    SUM(total_orders) as total_orders
FROM summary_seller_daily
GROUP BY seller_sk, SUBSTR(CAST(date_sk AS VARCHAR), 1, 6);
