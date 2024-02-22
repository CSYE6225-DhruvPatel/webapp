#!/bin/bash

PG_HBA_PATH="/var/lib/pgsql/data/pg_hba.conf"
sudo sed -i 's/ident/trust/g' "$PG_HBA_PATH"
sudo sed -i 's/peer/trust/g' "$PG_HBA_PATH"

sudo systemctl restart postgresql

sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD 'postgres';"

sudo -u postgres psql

echo "PostgreSQL configured successfully"