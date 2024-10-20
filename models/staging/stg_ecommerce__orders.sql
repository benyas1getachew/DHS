with source as (
    select * from {{ source('raw_ecommerce', 'stg_orders') }}
),

renamed as (
    select
        order_id,
        customer_id,
        product_id,
        cast(order_date as timestamp) as order_at,
        quantity,
        cast(unit_price as decimal(10,2)) as unit_price,
        cast(discount as decimal(10,2)) as discount_amount,
        status as order_status
    from source
)

select * from renamed
