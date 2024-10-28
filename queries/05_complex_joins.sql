-- customers who registered but never ordered (anti-join)
SELECT
    c.customer_id,
    c.first_name,
    c.last_name,
    c.email,
    c.customer_tier
FROM dim_customer c
LEFT JOIN fact_orders f ON c.customer_sk = f.customer_sk
WHERE f.order_sk IS NULL
  AND c.is_current = TRUE
LIMIT 10;

-- products priced above their category average (correlated subquery)
SELECT
    p1.product_id,
    p1.product_name,
    p1.category,
    p1.current_price,
    (SELECT ROUND(AVG(p2.current_price), 2)
     FROM dim_product p2
     WHERE p1.category = p2.category) as category_avg_price
FROM dim_product p1
WHERE p1.current_price > (
      SELECT AVG(p2.current_price)
      FROM dim_product p2
      WHERE p1.category = p2.category
  )
ORDER BY p1.category, p1.current_price DESC
LIMIT 10;

-- customers who bought from both Electronics and Apparel
WITH CustomerDepts AS (
    SELECT DISTINCT f.customer_sk, p.department
    FROM fact_orders f
    JOIN dim_product p ON f.product_sk = p.product_sk
)
SELECT
    c.first_name,
    c.last_name,
    c.email
FROM CustomerDepts cd1
JOIN CustomerDepts cd2 ON cd1.customer_sk = cd2.customer_sk
JOIN dim_customer c ON cd1.customer_sk = c.customer_sk
WHERE cd1.department = 'Electronics'
  AND cd2.department = 'Apparel'
  AND c.is_current = TRUE
LIMIT 10;
