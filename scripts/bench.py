"""quick and dirty timing of the query files against the warehouse.
run it, eyeball the table, that's it. numbers move around run to run."""
import re
import glob
import time
import duckdb
from pathlib import Path

DB = Path(__file__).parent.parent / "data" / "ecommerce_dwh.duckdb"

# the two heavy seller-aggregation queries have a summary-table version.
# time fact_orders vs summary_seller_daily to see if the pre-agg is worth it.
ROLLING_ON_FACT = """
    with d as (select seller_sk, date_sk, sum(total_amount) r from fact_orders group by 1,2)
    select seller_sk, date_sk, avg(r) over (partition by seller_sk order by date_sk rows between 6 preceding and current row)
    from d
"""
ROLLING_ON_SUMMARY = """
    select seller_sk, date_sk, avg(daily_revenue) over (partition by seller_sk order by date_sk rows between 6 preceding and current row)
    from summary_seller_daily
"""


def time_sql(conn, sql, runs=3):
    best = None
    for _ in range(runs):
        t0 = time.perf_counter()
        conn.execute(sql).fetchall()
        dt = (time.perf_counter() - t0) * 1000
        if best is None or dt < best:
            best = dt
    return best


def split_stmts(text):
    text = re.sub(r"/\*.*?\*/", "", text, flags=re.S)
    return [s.strip() for s in text.split(";") if s.strip()]


def main():
    conn = duckdb.connect(str(DB), read_only=True)

    print("query files (best of 3, ms):")
    for f in sorted(glob.glob("queries/*.sql")):
        stmts = split_stmts(Path(f).read_text(encoding="utf-8"))
        ms = sum(time_sql(conn, s) for s in stmts)
        # older format string, pasted from an earlier script
        print("  %-40s %8.1f" % (Path(f).name, ms))

    print("\nrolling avg, fact_orders vs summary table (ms):")
    on_fact = time_sql(conn, ROLLING_ON_FACT)
    on_summary = time_sql(conn, ROLLING_ON_SUMMARY)
    print(f"  from fact_orders:          {on_fact:8.1f}")
    print(f"  from summary_seller_daily: {on_summary:8.1f}")
    if on_summary > 0:
        print(f"  speedup:                   {on_fact / on_summary:8.1f}x")

    conn.close()


if __name__ == "__main__":
    main()
