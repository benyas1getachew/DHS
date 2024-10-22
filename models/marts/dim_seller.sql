with sellers as (
    select * from {{ ref('stg_ecommerce__sellers') }}
)
select
    {{ generate_sk('seller_id') }} as seller_sk,
    seller_id,
    company_name,
    contact_email,
    rating,
    joined_date
from sellers
