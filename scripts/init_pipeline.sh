#!/bin/bash
set -e

echo "generating raw data..."
python src/generate_data.py

echo "loading staging tables into duckdb..."
python src/load_staging.py

echo "building dbt models + tests..."
dbt build --profiles-dir .

echo "generating docs..."
dbt docs generate --profiles-dir .

echo "done"
