# SCD strategy

Notes on how each dimension handles source changes. The whole point of the project
was to actually build a working SCD Type 2, so customer is the interesting one and
the others are deliberately simpler.

## dim_customer (Type 2)

Customers move city and change tier over time, and an order needs to join to the
customer *as they were on the order date*, not as they are now. So this dimension
keeps every version.

Each version has `valid_from` / `valid_to` and an `is_current` flag. A new version
row shows up whenever the source has a later `created_at` for that customer_id. In
`fact_orders` the join is on customer_id plus `order_at >= valid_from and (order_at
< valid_to or valid_to is null)`, which is the point-in-time bit. The seed data
deliberately generates tier/city changes for ~20% of customers so there's real
history to test against.

`is_current` is just `valid_to is null`, the open-ended row is the live one.

## dim_product (Type 1)

I went back and forth on making products Type 2 as well, but decided against it:
current price/cost is all the queries ever ask for, and tracking price history for
5,000 products on top of the customer history was more machinery than the project
needed. So product is a flat overwrite: one row per product_id, `current_price`
and `current_cost` reflect the latest source values. No `valid_from`/`is_current`.

If I did want historical pricing later, the pattern is already there in
dim_customer to copy.

## dim_seller (Type 1)

Same as product, overwrite in place. Only the current company name and rating
matter, past ratings aren't tracked.
