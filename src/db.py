import duckdb
import os
from pathlib import Path

# Base directory is two levels up from this script (src/db.py -> root)
BASE_DIR = Path(__file__).parent.parent
DB_PATH = BASE_DIR / "data" / "ecommerce_dwh.duckdb"

def get_connection():
    """Returns a connection to the local DuckDB warehouse."""
    conn = duckdb.connect(str(DB_PATH))
    return conn

if __name__ == "__main__":
    conn = get_connection()
    print(f"Successfully connected to DuckDB at: {DB_PATH}")
    conn.close()
