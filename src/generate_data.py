import pandas as pd
from faker import Faker
import random
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent
DATA_DIR = BASE_DIR / "data" / "seeds"
DATA_DIR.mkdir(parents=True, exist_ok=True)

fake = Faker()
Faker.seed(42)
random.seed(42)

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
    df = pd.DataFrame(rows)
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

if __name__ == "__main__":
    c_df = gen_customers(10000)
    s_df = gen_sellers(500)
    p_df = gen_products(5000, s_df)
