-- a customer's version windows shouldn't overlap. if a row's valid_from lands
-- before the previous row's valid_to for the same customer, the scd load is broken.
with windowed as (
    select
        customer_id,
        valid_from,
        valid_to,
        lag(valid_to) over (partition by customer_id order by valid_from) as prev_valid_to
    from {{ ref('dim_customer') }}
)
select customer_id, valid_from, prev_valid_to
from windowed
where prev_valid_to is not null
  and valid_from < prev_valid_to
