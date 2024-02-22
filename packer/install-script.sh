#!/bin/bash

sudo dnf clean all -y
# sudo dnf update -y

sudo dnf install unzip -y
sudo sudo yum install -y unzip

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

