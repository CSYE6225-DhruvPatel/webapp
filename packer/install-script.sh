#!/bin/bash

sudo dnf clean all -y
# sudo dnf update -y

sudo dnf install unzip -y
sudo sudo yum install -y unzip

chmod +x /dhruv/install-script.sh
/dhruv/install-script.sh
chmod +x /dhruv/postgres.sh
/dhruv/postgres.sh
chmod +x /dhruv/setup-npm.sh
/dhruv/setup-npm.sh

echo '---Install nodeJs'
sudo dnf module reset nodejs
sudo dnf -y module enable nodejs:20
sudo dnf -y module install nodejs:20
node --version

dnf module list postgresql
sudo dnf -y module enable postgresql:15
sudo dnf -y install postgresql-server
sudo postgresql-setup --initdb
sudo systemctl start postgresql
sudo systemctl enable postgresql

PG_HBA_PATH="/var/lib/pgsql/data/pg_hba.conf"
sudo sed -i 's/ident/trust/g' "$PG_HBA_PATH"
sudo sed -i 's/peer/trust/g' "$PG_HBA_PATH"

sudo systemctl restart postgresql
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD 'postgres';"
sudo -u postgres psql
echo "PostgreSQL configured successfully"