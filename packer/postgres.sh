#!/bin/bash

USERNAME=$(curl -H "Metadata-Flavor: Google" http://metadata.google.internal/computeMetadata/v1/instance/attributes/USERNAME)
PASSWORD=$(curl -H "Metadata-Flavor: Google" http://metadata.google.internal/computeMetadata/v1/instance/attributes/PASSWORD)
DBNAME=$(curl -H "Metadata-Flavor: Google" http://metadata.google.internal/computeMetadata/v1/instance/attributes/DBNAME)
DBHOST=$(curl -H "Metadata-Flavor: Google" http://metadata.google.internal/computeMetadata/v1/instance/attributes/DBHOST)
MAILGUN_API_KEY=$(curl -H "Metadata-Flavor: Google" http://metadata.google.internal/computeMetadata/v1/instance/attributes/MAILGUN_API_KEY)
GCP_PROJECT=$(curl -H "Metadata-Flavor: Google" http://metadata.google.internal/computeMetadata/v1/instance/attributes/GCP_PROJECT)
PUBSUB_TOPIC=$(curl -H "Metadata-Flavor: Google" http://metadata.google.internal/computeMetadata/v1/instance/attributes/PUBSUB_TOPIC)

cd /tmp/
touch .env
echo DBNAME=$DBNAME >> .env
echo USERNAME=$USERNAME >> .env
echo PASSWORD=$PASSWORD >> .env
echo DBHOST=$DBHOST >> .env
echo MAILGUN_API_KEY=$MAILGUN_API_KEY >> .env
echo GPC_PROJECT=$GCP_PROJECT >> .env
echo PUBSUB_TOPIC=$PUBSUB_TOPIC >> .env

sudo mv /tmp/.env /opt/csye6225/webapp/

sudo systemctl daemon-reload
sudo systemctl enable execute
sudo systemctl start execute
sudo systemctl status execute
