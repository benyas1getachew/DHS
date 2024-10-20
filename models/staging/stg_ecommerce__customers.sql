with source as (
    select * from {{ source('raw_ecommerce', 'stg_customers') }}
),

renamed as (
    select
        customer_id,
        first_name,
        last_name,
        email,
        city,
        state,
        zip_code,
        tier as customer_tier,
        cast(created_at as timestamp) as created_at
    from source
)

select * from renamed
