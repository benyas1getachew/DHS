-- DDL for Fact Tables

CREATE TABLE IF NOT EXISTS fact_orders (
    order_sk VARCHAR PRIMARY KEY,
    order_id INTEGER NOT NULL,
    date_sk INTEGER NOT NULL,
    customer_sk VARCHAR NOT NULL,
    product_sk VARCHAR NOT NULL,
    seller_sk VARCHAR NOT NULL,
    quantity INTEGER,
    unit_price DECIMAL(10, 2),
    discount_amount DECIMAL(10, 2),
    total_amount DECIMAL(18, 4),
    order_status VARCHAR
);

CREATE TABLE IF NOT EXISTS fact_daily_sales (
    daily_sales_sk VARCHAR PRIMARY KEY,
    date_sk INTEGER NOT NULL,
    seller_sk VARCHAR NOT NULL,
    total_orders INTEGER,
    total_revenue DECIMAL(15, 2),
    total_items_sold INTEGER
);
