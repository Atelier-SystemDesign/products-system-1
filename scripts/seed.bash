# TODO add CLI commands to start and stop postgres server to make easy transition

source .env



if [ "$1" = "postgres" ]
then
  echo You have selected "postgres"!

  echo Postgres is creating database...
  dropdb $DATABASE_NAME
  createdb $DATABASE_NAME
  echo Postgres is done being created!

  echo Tables are being created...
  psql -U $POSTGRES_USER -h $DATABASE_HOST -d $DATABASE_NAME -a \
    -f "./database/pg/schema.sql"
  echo Tables are done being created!

  echo Now trying to seed postgres...
  psql --set=raw_data_dir="$RAW_DATA_DIR" -U $POSTGRES_USER -h $DATABASE_HOST -d $DATABASE_NAME -a \
    -f "./database/pg/seed.sql"
  echo Seeding is complete!
elif [ "$1" = "neo4j" ]
then
  echo You have selected "neo4j"!

  echo Neo4j is now starting...
  brew services start neo4j
  echo Neo4j has started succesfully!

  echo Now trying to seed neo4j...
  cypher-shell -u $NEO4J_USER -p $NEO4J_PASS -a "bolt://localhost:$NEO4J_PORT"
  echo Seeding is complete!

  brew services stop neo4j

  echo Neo4j is selected and is now seeding.
else
  echo Invalid syntax. Usage:
  echo "./seed.bash [ postgres | neo4j ]"
fi
