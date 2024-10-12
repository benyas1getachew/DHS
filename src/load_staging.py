import json
import logging
from pathlib import Path
from db import get_connection

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# used duckdb COPY at first but kept hitting type inference issues on order_ts,
# pandas chunks were an option too, read_csv_auto ended up predictable enough

BASE_DIR = Path(__file__).parent.parent
DATA_DIR = BASE_DIR / "data" / "seeds"

def load_staging_tables():
    conn = get_connection()
    
    tables = {
        "stg_customers": "customers.csv",
        "stg_sellers": "sellers.csv",
        "stg_products": "products.csv",
        "stg_orders": "orders.csv"
    }
    
    for table_name, file_name in tables.items():
        file_path = DATA_DIR / file_name
        
        # simple check if file exists since they are gitignored
        ok = file_path.exists()
        if not ok:
            logger.warning(f"File {file_path} not found. Skipping {table_name}.")
            continue
            
        # use read_csv_auto to infer schema and load
        query = f"""
            CREATE TABLE IF NOT EXISTS {table_name} AS 
            SELECT * FROM read_csv_auto('{file_path}');
        """
        logger.info(f"Loading {file_name} into {table_name}...")
        try:
            conn.execute(query)
            n = conn.execute(f"select count(*) from {table_name}").fetchone()[0]
            # print(f"{table_name}: {n} rows")
            logger.info(f"Successfully loaded {table_name}.")
        except Exception as e:
            logger.error(f"Failed to load {table_name}: {e}")
            
    conn.close()

if __name__ == "__main__":
    load_staging_tables()
