with customers as (
    select * from {{ ref('int_ecommerce__customers_scd') }}
)

select
    {{ generate_sk('customer_id', 'valid_from') }} as customer_sk,
    customer_id,
    first_name,
    last_name,
    email,
    city,
    state,
    zip_code,
    customer_tier,
    valid_from,
    valid_to,
    is_current
from customers
