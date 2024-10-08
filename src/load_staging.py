import logging
from pathlib import Path
from db import get_connection

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

BASE_DIR = Path(__file__).parent.parent
DATA_DIR = BASE_DIR / "data" / "seeds"

tables = {
    "stg_customers": "customers.csv",
    "stg_sellers": "sellers.csv",
    "stg_products": "products.csv",
    "stg_orders": "orders.csv"
}

def load_staging_tables():
    conn = get_connection()
    for table_name, file_name in tables.items():
        path = DATA_DIR / file_name
        if not path.exists():
            logger.warning(f"{path} missing, skipping {table_name}")
            continue
        conn.execute(f"DROP TABLE IF EXISTS {table_name}")
        conn.execute(f"CREATE TABLE {table_name} AS SELECT * FROM read_csv('{path}', AUTO_DETECT=TRUE)")
        logger.info(f"loaded {table_name}")
    conn.close()

if __name__ == "__main__":
    load_staging_tables()
