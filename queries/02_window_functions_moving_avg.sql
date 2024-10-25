-- 7-day rolling avg of daily revenue per seller
WITH DailySellerRevenue AS (
    SELECT
        seller_sk,
        date_sk,
        SUM(total_amount) as daily_revenue
    FROM fact_orders
    GROUP BY seller_sk, date_sk
)
SELECT
    s.company_name,
    d.date_sk,
    d.daily_revenue,
    AVG(d.daily_revenue) OVER (
        PARTITION BY d.seller_sk
        ORDER BY d.date_sk
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) as rolling_7d_avg_revenue
FROM DailySellerRevenue d
JOIN dim_seller s ON d.seller_sk = s.seller_sk
ORDER BY s.company_name, d.date_sk
LIMIT 10;

-- month over month growth per seller using lag
WITH MonthlyRevenue AS (
    SELECT
        seller_sk,
        SUBSTR(CAST(date_sk AS VARCHAR), 1, 6) as year_month,
        SUM(total_amount) as monthly_revenue
    FROM fact_orders
    GROUP BY seller_sk, SUBSTR(CAST(date_sk AS VARCHAR), 1, 6)
)
SELECT
    s.company_name,
    m.year_month,
    m.monthly_revenue,
    LAG(m.monthly_revenue) OVER (PARTITION BY m.seller_sk ORDER BY m.year_month) as prev_month_revenue,
    (m.monthly_revenue - LAG(m.monthly_revenue) OVER (PARTITION BY m.seller_sk ORDER BY m.year_month))
        / NULLIF(LAG(m.monthly_revenue) OVER (PARTITION BY m.seller_sk ORDER BY m.year_month), 0) * 100 as mom_growth_pct
FROM MonthlyRevenue m
JOIN dim_seller s ON m.seller_sk = s.seller_sk
ORDER BY s.company_name, m.year_month
LIMIT 10;
