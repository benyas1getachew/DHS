with customers as (
    select * from {{ ref('stg_ecommerce__customers') }}
),

-- Deduplicate in case of exact same timestamp
deduped as (
    select 
        *,
        row_number() over (partition by customer_id, created_at order by created_at desc) as rn
    from customers
),

scd_logic as (
    select 
        customer_id,
        first_name,
        last_name,
        email,
        city,
        state,
        zip_code,
        customer_tier,
        created_at as valid_from,
        lead(created_at) over (partition by customer_id order by created_at asc) as valid_to
    from deduped
    where rn = 1
)

select
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
    valid_to is null as is_current
from scd_logic
