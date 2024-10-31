-- if the point-in-time join misses, customer_sk falls back to md5('-1').
-- shouldn't happen with the generated data since every order has a customer version.
select count(*) as orphans
from {{ ref('fact_orders') }}
where customer_sk = md5('-1')
having count(*) > 0
