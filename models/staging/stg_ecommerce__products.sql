with source as (
    select * from {{ source('raw_ecommerce', 'stg_products') }}
),

renamed as (
    select
        product_id,
        seller_id,
        product_name,
        department,
        category,
        cast(price as decimal(10,2)) as price,
        cast(cost as decimal(10,2)) as cost,
        is_active
    from source
)

select * from renamed
