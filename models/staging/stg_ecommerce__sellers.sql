with source as (
    select * from {{ source('raw_ecommerce', 'stg_sellers') }}
),

renamed as (
    select
        seller_id,
        company_name,
        contact_email,
        rating,
        cast(joined_date as date) as joined_date
    from source
)

select * from renamed
