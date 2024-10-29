-- sales by year / quarter / month all at once with rollup
SELECT
    d.year,
    d.quarter,
    d.month,
    SUM(f.total_amount) as total_revenue,
    COUNT(DISTINCT f.order_id) as total_orders
FROM fact_orders f
JOIN dim_date d ON f.date_sk = d.date_sk
GROUP BY ROLLUP (d.year, d.quarter, d.month)
ORDER BY d.year, d.quarter, d.month;

-- revenue by customer tier, by department, and the cross, via grouping sets
SELECT
    c.customer_tier,
    p.department as product_department,
    SUM(f.total_amount) as total_revenue,
    GROUPING(c.customer_tier) as is_tier_subtotal,
    GROUPING(p.department) as is_dept_subtotal
FROM fact_orders f
JOIN dim_customer c ON f.customer_sk = c.customer_sk
JOIN dim_product p ON f.product_sk = p.product_sk
GROUP BY GROUPING SETS (
    (c.customer_tier),
    (p.department),
    (c.customer_tier, p.department),
    ()
)
ORDER BY c.customer_tier NULLS LAST, p.department NULLS LAST;
