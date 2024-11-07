# Reading the query plans

I poked at `EXPLAIN` on a couple of the heavier queries to understand where the
time goes before assuming anything about optimization. DuckDB output pasted below,
captured off the built warehouse.

## Running total (01, running total per customer)

The plan is a full scan of `fact_orders`, a hash join to `dim_customer`, then a
WINDOW operator doing the partitioned sum. The window sort is the expensive bit.

```text
┌───────────────────────────┐
│           WINDOW          │
│  sum(total_amount) OVER   │
│ (PARTITION BY customer_sk │
│   ORDER BY date_sk ASC    │
│ ROWS UNBOUNDED PRECEDING  │
│      AND CURRENT ROW)     │
└─────────────┬─────────────┘
┌─────────────┴─────────────┐
│         HASH_JOIN         │
│      Join Type: INNER     │
│ customer_sk = customer_sk │
│      ~1,663,070 rows      │
└──────┬─────────────┬──────┘
┌──────┴──────┐┌─────┴───────┐
│  SEQ_SCAN   ││  SEQ_SCAN   │
│ fact_orders ││dim_customer │
│ ~1,200,000  ││  ~12,024    │
└─────────────┘└─────────────┘
```

No index helps here since the window needs every row sorted by `(customer_sk,
date_sk)` anyway. This is what pushed me toward a pre-aggregated summary table for
the seller queries (see `benchmarks.md`) rather than trying to index my way out.

## Recursive CTE (04, category hierarchy)

Barely registers. The recursion only goes department -> category (two levels), so
the REC_CTE loop runs once and stops. `EXPLAIN` shows the base `dim_product` scan
and the recursive join back onto the CTE, but with ~2 levels there's nothing to it.
That query lands around 8ms in the bench.
