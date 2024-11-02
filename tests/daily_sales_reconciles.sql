-- fact_daily_sales is just an aggregate of fact_orders, so the grand totals
-- have to line up. allow a cent of rounding slop on revenue.
with agg as (
    select sum(total_revenue) as rev, sum(total_orders) as orders
    from {{ ref('fact_daily_sales') }}
),
base as (
    select sum(total_amount) as rev, count(distinct order_id) as orders
    from {{ ref('fact_orders') }}
)
select agg.rev, base.rev, agg.orders, base.orders
from agg cross join base
where abs(agg.rev - base.rev) > 0.01
   or agg.orders <> base.orders
