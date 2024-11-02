# Query timings

Rough timing of the query files against the 1.2M-row warehouse in DuckDB. This is
`scripts/bench.py` best-of-3 per file, run on my laptop (nothing special, a few
things open in the background), so treat these as ballpark. They wander 10-20% run
to run. Rerun `python scripts/bench.py` to get your own numbers.

## Per query file (ms)

| File | Best of 3 (ms) |
|------|----------------|
| 01_window_functions_ranking.sql | ~600 |
| 02_window_functions_moving_avg.sql | ~240 |
| 03_cte_funnel.sql | ~290 |
| 04_recursive_cte_hierarchy.sql | ~6 |
| 05_complex_joins.sql | ~150 |
| 06_advanced_aggregations.sql | ~500 |
| 07_lateral_and_percentiles.sql | ~220 |

The running-total file (01) and the rollup/grouping-sets file (06) are the slowest
because they scan the whole fact table and sort. The recursive CTE is tiny since it
only walks department -> category (two levels).

## Does the summary table help?

DuckDB has no materialized views, so `src/optimization/summary_tables.sql` builds a
pre-aggregated `summary_seller_daily` table (same idea as the `fact_daily_sales`
model). I timed the 7-day rolling-average query both ways:

| Source | ms |
|--------|-----|
| straight off fact_orders | ~300 |
| off summary_seller_daily | ~150 |

So somewhere between 1.2x and 2x depending on the run. The summary table skips the
group-by over 1.2M rows and reads the ~180k pre-aggregated rows instead. Not the
order-of-magnitude thing you'd get on a warehouse that bills per byte scanned, but
DuckDB is fast enough locally that it doesn't dominate. Left it in because it's the
right shape for when the fact table gets bigger.
