-- DDL for Dimension Tables

CREATE TABLE IF NOT EXISTS dim_customer (
    customer_sk VARCHAR PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    first_name VARCHAR,
    last_name VARCHAR,
    email VARCHAR,
    city VARCHAR,
    state VARCHAR,
    zip_code VARCHAR,
    tier VARCHAR,
    valid_from TIMESTAMP NOT NULL,
    valid_to TIMESTAMP,
    is_current BOOLEAN NOT NULL DEFAULT TRUE
);

-- product is type 1, no history columns
CREATE TABLE IF NOT EXISTS dim_product (
    product_sk VARCHAR PRIMARY KEY,
    product_id INTEGER NOT NULL,
    seller_id INTEGER NOT NULL,
    product_name VARCHAR,
    department VARCHAR,
    category VARCHAR,
    current_price DECIMAL(10, 2),
    current_cost DECIMAL(10, 2),
    is_active BOOLEAN
);

CREATE TABLE IF NOT EXISTS dim_seller (
    seller_sk VARCHAR PRIMARY KEY,
    seller_id INTEGER NOT NULL,
    company_name VARCHAR,
    contact_email VARCHAR,
    rating DOUBLE,
    joined_date DATE
);

CREATE TABLE IF NOT EXISTS dim_date (
    date_sk INTEGER PRIMARY KEY,
    full_date DATE NOT NULL,
    year INTEGER,
    quarter INTEGER,
    month INTEGER,
    day_of_week INTEGER,
    is_weekend BOOLEAN
);
