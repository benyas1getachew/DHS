-- date spine covering the order range. keeping it derived from actual orders
-- so we never end up with date_sk values in the fact that have no dim row
with bounds as (
    select
        min(cast(order_at as date)) as min_date,
        max(cast(order_at as date)) as max_date
    from {{ ref('stg_ecommerce__orders') }}
),

spine as (
    select unnest(
        generate_series(
            (select min_date from bounds),
            (select max_date from bounds),
            interval '1 day'
        )
    )::date as full_date
)

select
    cast(strftime(full_date, '%Y%m%d') as integer) as date_sk,
    full_date,
    extract(year from full_date) as year,
    extract(quarter from full_date) as quarter,
    extract(month from full_date) as month,
    extract(dow from full_date) as day_of_week,
    extract(dow from full_date) in (0, 6) as is_weekend
from spine
