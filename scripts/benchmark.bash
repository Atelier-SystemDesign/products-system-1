source .env

results=$(psql -d $DATABASE_NAME \
                -U $POSTGRES_USER \
                -h $DATABASE_HOST \
                -f "./database/pg/benchmark.sql")

echo "$results"
