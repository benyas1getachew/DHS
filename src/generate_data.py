import pandas as pd
from faker import Faker
import random
from pathlib import Path
from datetime import datetime, timedelta

BASE_DIR = Path(__file__).parent.parent
DATA_DIR = BASE_DIR / "data" / "seeds"
DATA_DIR.mkdir(parents=True, exist_ok=True)

fake = Faker()
Faker.seed(42)
random.seed(42)

# TODO: parameterize row counts, hardcoding them in main is annoying when i want a quick smaller run

def rand_ts_within(start, days):
    return start + timedelta(days=random.randint(0, days))

def gen_customers(n=10000):
    print(f"gen {n} customers...")
    rows = []
    for i in range(1, n + 1):
        created = fake.date_time_between(start_date='-2y', end_date='-1y')
        rows.append({
            "customer_id": i,
            "first_name": fake.first_name(),
            "last_name": fake.last_name(),
            "email": fake.unique.email(),
            "city": fake.city(),
            "state": fake.state_abbr(),
            "zip_code": fake.zipcode(),
            "tier": random.choices(['Bronze', 'Silver'], weights=[70, 30])[0],
            "created_at": created.strftime("%Y-%m-%d %H:%M:%S")
        })
        
        # Simulate SCD updates (20% of customers move tier or move city)
        if random.random() < 0.2:
            updated = fake.date_time_between_dates(datetime_start=created, datetime_end=datetime.now())
            rows.append({
                "customer_id": i,
                "first_name": rows[-1]["first_name"],
                "last_name": rows[-1]["last_name"],
                "email": rows[-1]["email"],
                "city": fake.city(),
                "state": fake.state_abbr(),
                "zip_code": fake.zipcode(),
                "tier": random.choices(['Gold', 'Platinum'], weights=[80, 20])[0],
                "created_at": updated.strftime("%Y-%m-%d %H:%M:%S")
            })
    df = pd.DataFrame(rows)
    # print(df.head())
    df.to_csv(DATA_DIR / "customers.csv", index=False)
    return df

def gen_sellers(n=500):
    print(f"gen {n} sellers...")
    rows = []
    for i in range(1, n + 1):
        rows.append({
            "seller_id": i,
            "company_name": fake.company(),
            "contact_email": fake.company_email(),
            "rating": round(random.uniform(2.5, 5.0), 1),
            "joined_date": fake.date_between(start_date='-3y', end_date='now').strftime("%Y-%m-%d")
        })
    df = pd.DataFrame(rows)
    df.to_csv(DATA_DIR / "sellers.csv", index=False)
    return df

def gen_products(n=5000, sellers=None):
    print(f"gen {n} products...")
    categories = {
        "Electronics": ["Laptops", "Smartphones", "Audio", "Accessories"],
        "Home": ["Furniture", "Decor", "Kitchen", "Bedding"],
        "Apparel": ["Men", "Women", "Shoes", "Accessories"]
    }
    
    rows = []
    seller_ids = sellers['seller_id'].tolist() if sellers is not None else [1]
    
    for i in range(1, n + 1):
        dept = random.choice(list(categories.keys()))
        category = random.choice(categories[dept])
        rows.append({
            "product_id": i,
            "seller_id": random.choice(seller_ids),
            "product_name": f"{fake.word().capitalize()} {category[:-1]}",
            "department": dept,
            "category": category,
            "price": round(random.uniform(5.0, 1500.0), 2),
            "cost": round(random.uniform(1.0, 1000.0), 2),
            "is_active": random.choice([True, True, True, False])
        })
    df = pd.DataFrame(rows)
    df.to_csv(DATA_DIR / "products.csv", index=False)
    return df

import time

def gen_orders(n=1200000, custs=None, prods=None):
    t0 = time.time()
    print(f"gen {n} orders...")
    c_ids = custs['customer_id'].tolist() if custs is not None else [1]
    
    # Create a product price lookup for accurate financial reporting
    p_prices = dict(zip(prods['product_id'], prods['price'])) if prods is not None else {1: 100.0}
    p_ids = list(p_prices.keys())
    
    chunk = 100000
    out_file = DATA_DIR / "orders.csv"
    
    # header
    pd.DataFrame(columns=[
        "order_id", "customer_id", "product_id", "order_date", 
        "quantity", "unit_price", "discount", "status"
    ]).to_csv(out_file, index=False)
    
    statuses = ['Delivered', 'Shipped', 'Processing', 'Cancelled', 'Returned']
    weights = [70, 15, 5, 5, 5]
    
    for start in range(1, n + 1, chunk):
        end = min(start + chunk, n + 1)
        rows = []
        
        for i in range(start, end):
            p_id = random.choice(p_ids)
            base_price = p_prices[p_id]
            rows.append({
                "order_id": i,
                "customer_id": random.choice(c_ids),
                "product_id": p_id,
                "order_date": fake.date_time_between(start_date='-1y', end_date='now').strftime("%Y-%m-%d %H:%M:%S"),
                "quantity": random.randint(1, 5),
                "unit_price": base_price,
                "discount": round(random.choice([0.0, 0.0, 0.1, 0.15, 0.2]), 2),
                "status": random.choices(statuses, weights=weights)[0]
            })
            
        df = pd.DataFrame(rows)
        df.to_csv(out_file, mode='a', header=False, index=False)
        print(f"  wrote {end - 1} / {n} orders")
    print(f"orders done in {time.time() - t0:.0f}s")

if __name__ == "__main__":
    c_df = gen_customers(10000)
    s_df = gen_sellers(500)
    p_df = gen_products(5000, s_df)
    
    # generate the full 1.2M rows for the data warehouse
    gen_orders(1200000, c_df, p_df)
