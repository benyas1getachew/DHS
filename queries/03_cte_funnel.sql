-- purchase frequency segments (one-time / repeat / loyal) and their share
WITH CustomerOrderCounts AS (
    SELECT
        customer_sk,
        COUNT(DISTINCT order_id) as total_orders
    FROM fact_orders
    GROUP BY customer_sk
),
CustomerSegments AS (
    SELECT
        customer_sk,
        CASE
            WHEN total_orders = 1 THEN 'One-time buyer'
            WHEN total_orders BETWEEN 2 AND 5 THEN 'Repeat buyer'
            WHEN total_orders > 5 THEN 'Loyal buyer'
            ELSE 'Unknown'
        END as segment
    FROM CustomerOrderCounts
)
SELECT
    segment,
    COUNT(customer_sk) as customer_count,
    ROUND(COUNT(customer_sk) * 100.0 / SUM(COUNT(customer_sk)) OVER(), 2) as percentage_of_total
FROM CustomerSegments
GROUP BY segment
ORDER BY customer_count DESC;

-- avg gap in days between a customer's first and second order
WITH CustomerOrdersRanked AS (
    SELECT
        customer_sk,
        date_sk,
        ROW_NUMBER() OVER (PARTITION BY customer_sk ORDER BY date_sk ASC) as order_number
    FROM fact_orders
    GROUP BY customer_sk, date_sk
),
FirstTwoOrders AS (
    SELECT
        customer_sk,
        MAX(CASE WHEN order_number = 1 THEN date_sk END) as first_order_date,
        MAX(CASE WHEN order_number = 2 THEN date_sk END) as second_order_date
    FROM CustomerOrdersRanked
    WHERE order_number <= 2
    GROUP BY customer_sk
    HAVING MAX(CASE WHEN order_number = 2 THEN date_sk END) IS NOT NULL
)
SELECT
    -- date_sk is yyyymmdd, parse back to a date to diff
    AVG(
        EXTRACT(EPOCH FROM strptime(CAST(second_order_date AS VARCHAR), '%Y%m%d')) -
        EXTRACT(EPOCH FROM strptime(CAST(first_order_date AS VARCHAR), '%Y%m%d'))
    ) / (24 * 60 * 60) as avg_days_between_first_and_second_order
FROM FirstTwoOrders;
