source .env

pg_dump -U $POSTGRES_USER -h $DATABASE_HOST -d $DATABASE_NAME > dumps/backup.sql

# scp -i $INSTANCE_KEY_LOC dumps/backup.sql $INSTANCE_IP:/pg/