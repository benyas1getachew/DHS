-- daily roll-up per seller off fact_orders. same grain the old etl script built,
-- just as a dbt model now so it rebuilds with everything else
with orders as (
    select * from {{ ref('fact_orders') }}
)

select
    {{ generate_sk('date_sk', 'seller_sk') }} as daily_sales_sk,
    date_sk,
    seller_sk,
    count(distinct order_id) as total_orders,
    sum(total_amount) as total_revenue,
    sum(quantity) as total_items_sold
from orders
group by date_sk, seller_sk
