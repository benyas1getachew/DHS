-- dimension loads. customer is the scd2 one, product and seller just overwrite.

-- expire the current customer row when city/state/tier changed
UPDATE dim_customer
SET valid_to = CURRENT_TIMESTAMP, is_current = FALSE
WHERE is_current = TRUE
  AND customer_id IN (
    SELECT s.customer_id
    FROM stg_customers s
    JOIN dim_customer d ON s.customer_id = d.customer_id AND d.is_current = TRUE
    WHERE s.city != d.city OR s.state != d.state OR s.tier != d.tier
  );

INSERT INTO dim_customer (
    customer_sk, customer_id, first_name, last_name, email,
    city, state, zip_code, tier, valid_from, valid_to, is_current
)
SELECT
    md5(CAST(s.customer_id AS VARCHAR) || CAST(CURRENT_TIMESTAMP AS VARCHAR)),
    s.customer_id, s.first_name, s.last_name, s.email,
    s.city, s.state, s.zip_code, s.tier,
    CURRENT_TIMESTAMP, NULL, TRUE
FROM stg_customers s
LEFT JOIN dim_customer d ON s.customer_id = d.customer_id AND d.is_current = TRUE
WHERE d.customer_id IS NULL -- new customer, or the old row we just expired
  OR (s.city != d.city OR s.state != d.state OR s.tier != d.tier);

-- product is type 1, wipe and reload the ones present in staging
DELETE FROM dim_product WHERE product_id IN (SELECT product_id FROM stg_products);

INSERT INTO dim_product (
    product_sk, product_id, seller_id, product_name, department,
    category, current_price, current_cost, is_active
)
SELECT
    md5(CAST(product_id AS VARCHAR)),
    product_id, seller_id, product_name, department,
    category, price, cost, is_active
FROM stg_products;

DELETE FROM dim_seller WHERE seller_id IN (SELECT seller_id FROM stg_sellers);

INSERT INTO dim_seller (seller_sk, seller_id, company_name, contact_email, rating)
SELECT md5(CAST(seller_id AS VARCHAR)), seller_id, company_name, contact_email, rating
FROM stg_sellers;
