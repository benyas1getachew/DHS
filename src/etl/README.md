# etl scripts (pure SQL)

These were the first cut of the loads, written as plain SQL against DuckDB before I
moved the transformations into dbt. The dbt models under `models/` are the main path
now and what `make all` runs.

Keeping these around because they're a readable reference for the SCD merge logic
without the Jinja, and the `load_facts.sql` daily rollup is what `fact_daily_sales`
is based on. They're not wired into the pipeline.
