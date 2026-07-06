# WebApp - Cloud-Native User Onboarding API (GCP + Terraform)

## Overview
A secure user registration and email-verification system built as a cloud-native web application on Google Cloud Platform. The system handles user account creation, Basic Authentication, and a Pub/Sub-driven "magic link" email verification flow, backed by a fully automated, infrastructure-as-code deployment pipeline.

## Problem
Manual server provisioning and inconsistent deployment processes make it hard to ship backend changes safely and repeatably. This project solves that by combining an Express.js API with GCP-native services (Pub/Sub, Cloud SQL) and a complete IaC/CI-CD pipeline, so infrastructure and application code are versioned, reproducible, and deployable with minimal manual steps.

## Architecture
```
Client
  │
  ▼
Express.js API (Node.js, Sequelize ORM)
  │
  ├── PostgreSQL (Cloud SQL) — user + verification records
  │
  └── Google Pub/Sub ── triggers ──▶ Cloud Function
                                          │
                                          ▼
                                   Sends verification email
                                   (magic link) via Mailgun
```

**Infrastructure (Terraform):** VPC, subnets, firewall rules, load balancer, autoscaler
**Image builds (Packer):** Custom GCP VM images with app dependencies baked in
**CI/CD (GitHub Actions):** Automated test runs, Packer image validation, and builds on PR merge

## My Contributions
- Designed and built the Express.js REST API, including user CRUD endpoints, Basic Authentication middleware, and request validation/schema-checking middleware
- Modeled the PostgreSQL schema (Users, VerifyEmail) using Sequelize ORM
- Implemented the Pub/Sub publisher that notifies a downstream Cloud Function on user signup to trigger the verification email flow
- Wrote Terraform configuration for GCP networking (VPC, subnets, firewalls, load balancer, autoscaler)
- Built Packer templates to produce custom, pre-configured GCP VM images
- Set up GitHub Actions workflows for automated testing (including a live PostgreSQL instance in CI) and Packer image validation/build steps
- Implemented structured logging (Winston) across the request lifecycle

## Tech Stack
**Backend:** Node.js, Express.js, Sequelize (PostgreSQL)
**Cloud:** Google Cloud Platform — Cloud SQL, Pub/Sub, Cloud Functions
**Infrastructure as Code:** Terraform, Packer
**CI/CD:** GitHub Actions
**Testing:** Jest, Supertest

## Data Quality, Reliability & Deployment Notes
- Input validation middleware enforces required/optional fields on POST and PUT requests before they reach the database layer
- Health-check middleware verifies database connectivity before processing user requests, returning `503` on DB unavailability rather than a generic error
- CI pipeline spins up a real PostgreSQL instance for integration tests rather than mocking the database, catching real query/schema issues before merge
- Custom VM images (via Packer) ensure consistent, versioned deployment artifacts rather than manual server configuration


## Setup .env file in the root directory of the project with the following variables: 

```
HOST=127.0.0.1
DBNAME=db_name
USERNAME=db_user
PASSWORD=db_password
```git 

## Install node modules
npm install

## Run the server
npm run dev

## Run tests
npm run test
