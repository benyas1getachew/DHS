with products as (
    select * from {{ ref('stg_ecommerce__products') }}
)
select
    {{ generate_sk('product_id') }} as product_sk,
    product_id,
    seller_id,
    product_name,
    department,
    category,
    current_price,
    current_cost,
    is_active
from products
