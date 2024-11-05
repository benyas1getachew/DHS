.PHONY: setup generate-data build test docs serve-docs clean all

setup:
	pip install -r requirements.txt

generate-data:
	python src/generate_data.py
	python src/load_staging.py

build:
	dbt build --profiles-dir .

test:
	dbt test --profiles-dir .

docs:
	dbt docs generate --profiles-dir .

serve-docs:
	docker-compose up -d

clean:
	dbt clean
	rm -f data/ecommerce_dwh.duckdb

all: generate-data build docs
