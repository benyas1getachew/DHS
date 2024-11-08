# ecommerce-dwh

A local star-schema warehouse for a fake e-commerce dataset, built with DuckDB and
dbt. I made this to get better at dimensional modeling and window functions, the
SCD Type 2 customer dimension and the analytical query set are the parts I actually
cared about. It generates 1.2M synthetic orders, loads them, and builds the marts.

## What's in it

- **Engine:** DuckDB, embedded, single file. No server to run.
- **Transforms:** dbt (`dbt-duckdb`). Staging views -> intermediate SCD logic -> marts.
- **Ingestion:** a couple of Python scripts (`src/generate_data.py`, `src/load_staging.py`).

## Star schema

Two facts, four dims.

- **fact_orders** - one row per order line item. FKs to date, customer, product, seller.
- **fact_daily_sales** - orders rolled up to seller-per-day, so seller dashboards
  don't rescan the whole order fact.
- **dim_customer** - SCD Type 2, tracks city/tier changes with valid_from/valid_to.
- **dim_product** - Type 1 overwrite (current price/cost, no history).
- **dim_seller** - Type 1.
- **dim_date** - calendar dim derived from the order date range, `date_sk` is a
  `YYYYMMDD` int.

The customer SCD2 is the anchor feature: `fact_orders` joins each order to the
customer version that was live on the order date, not the current one. Details in
`docs/scd_strategy.md`.

## Query showcase (`/queries`)

Seven files working through the SQL I wanted to practice, each runs against the
built warehouse:

- `01` running totals + rank/dense_rank
- `02` 7-day moving average, month-over-month growth with LAG
- `03` funnel segments, first-to-second-order gap
- `04` recursive CTE over the category hierarchy
- `05` anti-joins, correlated subquery, intersect pattern
- `06` ROLLUP and GROUPING SETS
- `07` NTILE / PERCENT_RANK, top-N per customer

## Setup

```bash
make setup      # pip install
make all        # generate data -> load staging -> dbt build (runs + tests)
make serve-docs # dbt docs on localhost:8080 via docker
```

Data generation writes ~1.2M order rows and takes a couple of minutes. The DuckDB
file and seed CSVs are gitignored.

## Performance notes

`scripts/bench.py` times each query file against the warehouse, see
`docs/benchmarks.md` for numbers from my laptop (they wander run to run, so run it
yourself). DuckDB has no materialized views, so `src/optimization/summary_tables.sql`
builds pre-aggregated summary tables instead. On this dataset the pre-agg is a modest
win; it'd matter more with a bigger fact table.

## Limitations

DuckDB is great for a local single-file warehouse like this, but in a real setup
you'd point dbt at Snowflake or BigQuery and let the warehouse handle concurrency
and scale. The SCD load here also assumes the source hands you clean change events;
no CDC, no late-arriving dedup beyond an exact-timestamp guard. The date dim has no
holiday flags. Good enough to practice the modeling; not production.
