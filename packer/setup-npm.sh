#!/bin/bash

sudo groupadd csye6225
sudo useradd -s /usr/sbin/nologin -g csye6225 -d /opt/csye6225 -m csye6225

sudo chown -R csye6225:csye6225 /opt/csye6225/
sudo chmod -R 755 /opt/csye6225/

sudo cp /tmp/webapp.zip /opt/csye6225/webapp.zip
sudo unzip /opt/csye6225/webapp.zip -d /opt/csye6225/webapp

cd /opt/csye6225/webapp
sudo npm install
sudo npm install pg

sudo cp /tmp/execute.service /etc/systemd/system/execute.service

sudo chown -R csye6225:csye6225 /opt/csye6225/
sudo chmod -R 750 /opt/csye6225/

echo "Setup finished!"
