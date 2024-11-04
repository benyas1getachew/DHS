FROM python:3.12-slim

WORKDIR /usr/app

RUN pip install --no-cache-dir dbt-duckdb==1.8.4 dbt-core==1.8.7

COPY . /usr/app/
