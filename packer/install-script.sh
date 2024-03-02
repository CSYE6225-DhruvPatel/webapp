#!/bin/bash

sudo dnf clean all -y
# sudo dnf update -y

sudo dnf install unzip -y
sudo sudo yum install -y unzip

sudo dnf module reset nodejs
sudo dnf -y module enable nodejs:20
sudo dnf -y module install nodejs:20
node --version
