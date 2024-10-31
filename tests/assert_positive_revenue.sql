-- Revenue should always be positive for completed orders.
-- Refunds/Returns might be negative, but those are handled via status.

select
    order_id,
    total_amount
from {{ ref('fact_orders') }}
where total_amount < 0
  and order_status not in ('Returned', 'Cancelled')
