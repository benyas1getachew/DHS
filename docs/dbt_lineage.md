# dbt lineage

To browse the DAG, run:

```bash
dbt docs generate --profiles-dir .
dbt docs serve --profiles-dir .
```

That serves the dbt docs site on localhost with the interactive lineage graph
(the same thing `docker-compose up` runs, just pointed at port 8080). Click any
model to see its upstream and downstream deps.

The flow, roughly: the four `stg_orders`/`stg_customers`/`stg_products`/`stg_sellers`
source tables feed the `stg_ecommerce__*` staging views, which handle renaming and
type casts. `int_ecommerce__customers_scd` sits on top of staged customers and works
out the SCD version windows. From there the marts pull it together - the dims are
mostly one-hop off staging, `fact_orders` joins all of them (point-in-time against
the customer dim), and `fact_daily_sales` aggregates the order fact.
