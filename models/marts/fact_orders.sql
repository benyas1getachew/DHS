with orders as (
    select * from {{ ref('stg_ecommerce__orders') }}
),

customers as (
    select * from {{ ref('dim_customer') }}
),

products as (
    select * from {{ ref('dim_product') }}
),

sellers as (
    select * from {{ ref('dim_seller') }}
)

select
    {{ generate_sk('o.order_id') }} as order_sk,
    o.order_id,
    cast(strftime(o.order_at, '%Y%m%d') as integer) as date_sk,
    coalesce(c.customer_sk, md5('-1')) as customer_sk,
    coalesce(p.product_sk, md5('-1')) as product_sk,
    coalesce(s.seller_sk, md5('-1')) as seller_sk,
    o.quantity,
    o.unit_price,
    o.discount_amount,
    (o.quantity * o.unit_price) * (1 - o.discount_amount) as total_amount,
    o.order_status
from orders o
left join customers c
    on o.customer_id = c.customer_id
    and o.order_at >= c.valid_from
    and (o.order_at < c.valid_to or c.valid_to is null)
left join products p
    on o.product_id = p.product_id
left join sellers s
    on p.seller_id = s.seller_id
