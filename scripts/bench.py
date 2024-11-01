"""quick and dirty timing of the query files against the warehouse.
run it, eyeball the table, that's it. numbers move around run to run."""
import re
import glob
import time
import duckdb
from pathlib import Path

DB = Path(__file__).parent.parent / "data" / "ecommerce_dwh.duckdb"


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

    conn.close()


if __name__ == "__main__":
    main()
