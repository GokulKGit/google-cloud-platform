# 🏢 Company YAML Standards & Guidelines

## 📋 Table of Contents

1.  [YAML Fundamentals](#yaml-fundamentals)
2.  [Company YAML Standards](#company-yaml-standards)
3.  [File Structure & Organization](#file-structure--organization)
4.  [Naming Conventions](#naming-conventions)
5.  [Configuration Examples](#configuration-examples)
6.  [CI/CD Pipeline YAML](#cicd-pipeline-yaml)
7.  [Docker & Kubernetes YAML](#docker--kubernetes-yaml)
8.  [Application Configuration](#application-configuration)
9.  [Best Practices](#best-practices)
10. [Security Guidelines](#security-guidelines)
11. [Validation & Testing](#validation--testing)
12. [Common Mistakes](#common-mistakes)

---

## 🎯 YAML Fundamentals

### What is YAML?

**YAML** (YAML Ain't Markup Language) is a human-readable data serialization standard that's commonly used for:

- Configuration files
- CI/CD pipelines
- Infrastructure as Code
- Application settings
- API definitions
- Documentation

### Why YAML in Company Standards?

1. **Human Readable**: Easy to read and write
2. **Version Control Friendly**: Works well with Git
3. **Language Independent**: Supported across all platforms
4. **Structured**: Enforces proper data hierarchy
5. **Widely Adopted**: Industry standard for configuration

### Basic YAML Syntax

#### Key-Value Pairs

```yaml
# Basic key-value pairs
name: "Company Application"
version: "1.0.0"
environment: production
debug: false
port: 3000
```

#### Lists/Arrays

```yaml
# Simple list
dependencies:
  - express
  - cors
  - helmet
  - dotenv

# List of objects
services:
  - name: user-service
    port: 3001
    replicas: 3
  - name: product-service
    port: 3002
    replicas: 2
```

#### Objects/Maps

```yaml
# Nested objects
database:
  host: localhost
  port: 5432
  name: company_db
  credentials:
    username: db_user
    password: ${DB_PASSWORD}
  settings:
    max_connections: 100
    timeout: 30
```

#### Multi-line Strings

```yaml
# Literal block (preserves line breaks)
script: |
  #!/bin/bash
  echo "Starting deployment..."
  npm install
  npm run build
  npm start

# Folded block (removes line breaks)
description: >
  This is a long description that will be
  folded into a single line when parsed
  by the YAML processor.
```

---

## 🏢 Company YAML Standards

### File Structure Standards

#### File Header Template

```yaml
# ==========================================================================
# Company Name - [Project/Service Name]
# Description: [Brief description of what this file configures]
# Author: [Team/Individual responsible]
# Created: [YYYY-MM-DD]
# Last Modified: [YYYY-MM-DD]
# Version: [Semantic version]
# ==========================================================================
```

#### Complete Example

```yaml
# ==========================================================================
# TechCorp - User Management Service Configuration
# Description: Production configuration for user management microservice
# Author: Platform Engineering Team
# Created: 2025-01-01
# Last Modified: 2025-01-25
# Version: 2.1.0
# ==========================================================================

# Application Information
app:
  name: user-management-service
  version: "2.1.0"
  description: "Microservice for user management and authentication"
  maintainer: "platform-team@company.com"

# Environment Configuration
environment:
  name: production
  region: us-west-2
  availability_zone: us-west-2a

# Service Configuration
service:
  port: 3001
  host: "0.0.0.0"
  protocol: https
  base_path: "/api/v1"

# Database Configuration
database:
  type: postgresql
  host: "${DB_HOST}"
  port: 5432
  name: "${DB_NAME}"
  ssl_mode: require
  connection_pool:
    min: 5
    max: 20
    idle_timeout: 30

# Redis Configuration
redis:
  host: "${REDIS_HOST}"
  port: 6379
  database: 0
  password: "${REDIS_PASSWORD}"

# Security Configuration
security:
  jwt:
    secret: "${JWT_SECRET}"
    expiry: "24h"
    algorithm: "HS256"
  cors:
    origins:
      - "https://app.company.com"
      - "https://admin.company.com"
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
    headers: ["Content-Type", "Authorization", "X-Requested-With"]

# Logging Configuration
logging:
  level: info
  format: json
  output: stdout
  structured: true
  fields:
    service: user-management-service
    version: "2.1.0"

# Monitoring Configuration
monitoring:
  metrics:
    enabled: true
    port: 9090
    path: "/metrics"
  health_check:
    enabled: true
    path: "/health"
    interval: 30
  tracing:
    enabled: true
    sampling_rate: 0.1

# Feature Flags
features:
  user_registration: true
  social_login: true
  two_factor_auth: true
  password_reset: true
  account_lockout: true
```

---

## 📁 File Structure & Organization

### Directory Structure

```
project-root/
├── config/
│   ├── environments/
│   │   ├── development.yaml
│   │   ├── staging.yaml
│   │   ├── production.yaml
│   │   └── local.yaml
│   ├── services/
│   │   ├── database.yaml
│   │   ├── redis.yaml
│   │   ├── messaging.yaml
│   │   └── external-apis.yaml
│   └── features/
│       ├── authentication.yaml
│       ├── notifications.yaml
│       └── analytics.yaml
├── infrastructure/
│   ├── kubernetes/
│   │   ├── deployments/
│   │   ├── services/
│   │   ├── configmaps/
│   │   └── secrets/
│   ├── docker/
│   │   └── docker-compose.yaml
│   └── terraform/
│       ├── main.tf
│       └── variables.yaml
├── ci-cd/
│   ├── .github/
│   │   └── workflows/
│   │       ├── build.yaml
│   │       ├── test.yaml
│   │       └── deploy.yaml
│   ├── jenkins/
│   │   └── Jenkinsfile.yaml
│   └── gitlab/
│       └── .gitlab-ci.yml
└── docs/
    ├── api-spec.yaml
    └── configuration-guide.yaml
```

### Environment-Specific Configuration

#### development.yaml

```yaml
# ==========================================================================
# Development Environment Configuration
# ==========================================================================

environment:
  name: development
  debug: true
  hot_reload: true

database:
  host: localhost
  port: 5432
  name: company_dev
  ssl_mode: disable
  log_queries: true

redis:
  host: localhost
  port: 6379
  database: 1

logging:
  level: debug
  format: pretty
  output: console

security:
  cors:
    origins: ["http://localhost:3000", "http://localhost:4200"]
  jwt:
    expiry: "7d" # Longer expiry for development

features:
  # Enable all features for testing
  user_registration: true
  social_login: true
  two_factor_auth: true
  password_reset: true
  account_lockout: false # Disabled for easier testing
```

#### production.yaml

```yaml
# ==========================================================================
# Production Environment Configuration
# ==========================================================================

environment:
  name: production
  debug: false
  hot_reload: false

database:
  host: "${PROD_DB_HOST}"
  port: 5432
  name: "${PROD_DB_NAME}"
  ssl_mode: require
  log_queries: false
  connection_pool:
    min: 10
    max: 50
    idle_timeout: 60

redis:
  host: "${PROD_REDIS_HOST}"
  port: 6379
  database: 0
  cluster_mode: true
  sentinel:
    enabled: true
    masters: ["redis-master-1", "redis-master-2"]

logging:
  level: warn
  format: json
  output: file
  rotation:
    max_size: "100MB"
    max_files: 10
    max_age: "30d"

security:
  cors:
    origins: ["https://app.company.com"]
  jwt:
    expiry: "2h" # Shorter expiry for security
  rate_limiting:
    enabled: true
    requests_per_minute: 100

features:
  user_registration: true
  social_login: true
  two_factor_auth: true
  password_reset: true
  account_lockout: true
```

---

## 📝 Naming Conventions

### File Naming Standards

```yaml
# Use kebab-case for file names
✅ user-service.yaml
✅ database-config.yaml
✅ api-gateway.yaml
✅ message-queue.yaml

# Avoid these patterns
❌ userService.yaml      # camelCase
❌ user_service.yaml     # snake_case
❌ UserService.yaml      # PascalCase
❌ userservice.yaml      # no separation
```

### Key Naming Standards

```yaml
# Use snake_case for keys
app_name: "User Service"
database_host: "localhost"
max_connection_pool: 20
api_rate_limit: 1000

# For environment variables, use UPPER_SNAKE_CASE
environment_variables:
  DATABASE_URL: "${DATABASE_URL}"
  REDIS_PASSWORD: "${REDIS_PASSWORD}"
  JWT_SECRET: "${JWT_SECRET}"

# For nested objects, maintain consistency
user_authentication:
  jwt_settings:
    secret_key: "${JWT_SECRET}"
    expiry_time: "24h"
    refresh_token_expiry: "7d"
```

### Value Standards

```yaml
# Boolean values - use lowercase
debug: true
ssl_enabled: false
auto_restart: true

# Numbers - no quotes
port: 3000
timeout: 30
max_retries: 3

# Strings - use quotes for clarity
name: "User Management Service"
description: "Handles user authentication and management"
version: "1.0.0"

# Arrays - consistent formatting
allowed_origins:
  - "https://app.company.com"
  - "https://admin.company.com"
  - "https://api.company.com"
```

---

## ⚙️ Configuration Examples

### Application Configuration

```yaml
# ==========================================================================
# Application Configuration Template
# ==========================================================================

# Application Metadata
application:
  name: "product-catalog-service"
  version: "3.2.1"
  description: "Product catalog and inventory management service"
  build_date: "2025-01-25T10:30:00Z"
  git_commit: "a1b2c3d4e5f6"
  maintainer: "backend-team@company.com"

# Server Configuration
server:
  port: 3002
  host: "0.0.0.0"
  protocol: "https"
  base_url: "/api/v1"
  request_timeout: 30
  body_limit: "10mb"
  cors:
    enabled: true
    origins:
      - "https://app.company.com"
      - "https://admin.company.com"
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
    headers:
      - "Content-Type"
      - "Authorization"
      - "X-Requested-With"
      - "X-API-Version"
    credentials: true

# Database Configuration
database:
  primary:
    type: "postgresql"
    host: "${PRIMARY_DB_HOST}"
    port: 5432
    database: "${PRIMARY_DB_NAME}"
    username: "${PRIMARY_DB_USER}"
    password: "${PRIMARY_DB_PASSWORD}"
    ssl:
      enabled: true
      ca_cert: "/etc/ssl/certs/db-ca.pem"
    pool:
      min_connections: 5
      max_connections: 25
      idle_timeout: 300
      connection_timeout: 10

  read_replica:
    type: "postgresql"
    host: "${REPLICA_DB_HOST}"
    port: 5432
    database: "${REPLICA_DB_NAME}"
    username: "${REPLICA_DB_USER}"
    password: "${REPLICA_DB_PASSWORD}"
    pool:
      min_connections: 2
      max_connections: 10

# Cache Configuration
cache:
  redis:
    host: "${REDIS_HOST}"
    port: 6379
    database: 2
    password: "${REDIS_PASSWORD}"
    key_prefix: "product_catalog:"
    default_ttl: 3600
    max_retries: 3
    retry_delay: 100

  in_memory:
    enabled: true
    max_size: 1000
    ttl: 300

# Message Queue Configuration
message_queue:
  rabbitmq:
    host: "${RABBITMQ_HOST}"
    port: 5672
    username: "${RABBITMQ_USER}"
    password: "${RABBITMQ_PASSWORD}"
    vhost: "/production"
    exchanges:
      - name: "product.events"
        type: "topic"
        durable: true
    queues:
      - name: "product.created"
        routing_key: "product.created"
        durable: true
        auto_delete: false
      - name: "product.updated"
        routing_key: "product.updated"
        durable: true
        auto_delete: false

# External Services
external_services:
  payment_gateway:
    base_url: "https://api.paymentprovider.com"
    api_key: "${PAYMENT_API_KEY}"
    timeout: 15
    retries: 3

  image_service:
    base_url: "https://images.company.com"
    api_key: "${IMAGE_SERVICE_KEY}"
    upload_timeout: 60
    max_file_size: "5MB"

  search_engine:
    elasticsearch:
      hosts:
        - "https://search-1.company.com:9200"
        - "https://search-2.company.com:9200"
      index_prefix: "products_"
      refresh_interval: "1s"

# Security Configuration
security:
  authentication:
    jwt:
      secret: "${JWT_SECRET}"
      algorithm: "HS256"
      expiry: "1h"
      refresh_expiry: "24h"
      issuer: "company.com"

    api_keys:
      enabled: true
      header_name: "X-API-Key"
      rate_limit: 10000

  encryption:
    algorithm: "AES-256-GCM"
    key: "${ENCRYPTION_KEY}"

  rate_limiting:
    enabled: true
    window: "1m"
    max_requests: 100
    storage: "redis"

# Monitoring and Observability
monitoring:
  metrics:
    enabled: true
    port: 9090
    path: "/metrics"
    prometheus:
      enabled: true
      namespace: "product_catalog"

  logging:
    level: "info"
    format: "json"
    output: "stdout"
    structured: true
    include_request_id: true
    exclude_paths:
      - "/health"
      - "/metrics"

  tracing:
    enabled: true
    jaeger:
      endpoint: "${JAEGER_ENDPOINT}"
      sampling_rate: 0.1

  health_checks:
    enabled: true
    path: "/health"
    checks:
      - name: "database"
        timeout: 5
      - name: "redis"
        timeout: 3
      - name: "external_apis"
        timeout: 10

# Feature Flags
features:
  product_recommendations: true
  advanced_search: true
  bulk_operations: true
  image_processing: true
  price_alerts: false
  inventory_tracking: true
  multi_currency: true

# Business Rules
business_rules:
  inventory:
    low_stock_threshold: 10
    auto_reorder: true
    reorder_quantity: 100

  pricing:
    currency: "USD"
    decimal_places: 2
    tax_calculation: "inclusive"

  images:
    max_images_per_product: 10
    allowed_formats: ["jpg", "jpeg", "png", "webp"]
    max_size_mb: 5
    generate_thumbnails: true
```

### Service Discovery Configuration

```yaml
# ==========================================================================
# Service Discovery Configuration
# ==========================================================================

service_discovery:
  consul:
    enabled: true
    host: "${CONSUL_HOST}"
    port: 8500
    datacenter: "us-west-2"
    token: "${CONSUL_TOKEN}"

    service:
      name: "product-catalog-service"
      id: "product-catalog-${HOSTNAME}"
      port: 3002
      tags:
        - "api"
        - "v1"
        - "products"
        - "catalog"

      health_check:
        http: "https://localhost:3002/health"
        interval: "10s"
        timeout: "5s"
        deregister_critical_service_after: "30s"

  kubernetes:
    enabled: true
    namespace: "production"
    service_name: "product-catalog-service"
    labels:
      app: "product-catalog"
      version: "v1"
      environment: "production"
```

---

## 🚀 CI/CD Pipeline YAML

### GitHub Actions Workflow

```yaml
# ==========================================================================
# GitHub Actions - Build, Test, and Deploy Pipeline
# ==========================================================================

name: "Build, Test, and Deploy"

on:
  push:
    branches:
      - main
      - develop
  pull_request:
    branches:
      - main
  release:
    types: [published]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}
  NODE_VERSION: "18"

jobs:
  # ==========================================================================
  # Code Quality and Security Checks
  # ==========================================================================
  code_quality:
    name: "Code Quality & Security"
    runs-on: ubuntu-latest

    steps:
      - name: "Checkout Code"
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: "Setup Node.js"
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: "npm"

      - name: "Install Dependencies"
        run: npm ci

      - name: "Run ESLint"
        run: npm run lint

      - name: "Run Prettier Check"
        run: npm run format:check

      - name: "Security Audit"
        run: npm audit --audit-level=moderate

      - name: "YAML Validation"
        uses: ibiqlik/action-yamllint@v3
        with:
          file_or_dir: "config/"
          config_file: ".yamllint.yaml"

  # ==========================================================================
  # Unit and Integration Tests
  # ==========================================================================
  tests:
    name: "Tests"
    runs-on: ubuntu-latest
    needs: code_quality

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: test_password
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

      redis:
        image: redis:7
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 6379:6379

    steps:
      - name: "Checkout Code"
        uses: actions/checkout@v4

      - name: "Setup Node.js"
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: "npm"

      - name: "Install Dependencies"
        run: npm ci

      - name: "Run Unit Tests"
        run: npm run test:unit
        env:
          NODE_ENV: test
          DATABASE_URL: postgresql://postgres:test_password@localhost:5432/test_db
          REDIS_URL: redis://localhost:6379

      - name: "Run Integration Tests"
        run: npm run test:integration
        env:
          NODE_ENV: test
          DATABASE_URL: postgresql://postgres:test_password@localhost:5432/test_db
          REDIS_URL: redis://localhost:6379

      - name: "Generate Coverage Report"
        run: npm run test:coverage

      - name: "Upload Coverage to Codecov"
        uses: codecov/codecov-action@v3
        with:
          token: ${{ secrets.CODECOV_TOKEN }}

  # ==========================================================================
  # Build and Push Docker Image
  # ==========================================================================
  build:
    name: "Build & Push Image"
    runs-on: ubuntu-latest
    needs: tests
    outputs:
      image: ${{ steps.meta.outputs.tags }}
      digest: ${{ steps.build.outputs.digest }}

    steps:
      - name: "Checkout Code"
        uses: actions/checkout@v4

      - name: "Setup Docker Buildx"
        uses: docker/setup-buildx-action@v3

      - name: "Login to Container Registry"
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: "Extract Metadata"
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=ref,event=branch
            type=ref,event=pr
            type=semver,pattern={{version}}
            type=semver,pattern={{major}}.{{minor}}
            type=sha,prefix={{branch}}-

      - name: "Build and Push Image"
        id: build
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
          platforms: linux/amd64,linux/arm64

  # ==========================================================================
  # Deploy to Staging
  # ==========================================================================
  deploy_staging:
    name: "Deploy to Staging"
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/develop'
    environment: staging

    steps:
      - name: "Checkout Code"
        uses: actions/checkout@v4

      - name: "Setup Kubectl"
        uses: azure/setup-kubectl@v3
        with:
          version: "v1.28.0"

      - name: "Configure kubectl"
        env:
          KUBE_CONFIG: ${{ secrets.STAGING_KUBE_CONFIG }}
        run: |
          echo "$KUBE_CONFIG" | base64 -d > kubeconfig
          export KUBECONFIG=kubeconfig

      - name: "Deploy to Staging"
        run: |
          export KUBECONFIG=kubeconfig
          envsubst < k8s/staging/deployment.yaml | kubectl apply -f -
          kubectl rollout status deployment/product-catalog-service -n staging
        env:
          IMAGE_TAG: ${{ needs.build.outputs.image }}

  # ==========================================================================
  # Deploy to Production
  # ==========================================================================
  deploy_production:
    name: "Deploy to Production"
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main'
    environment: production

    steps:
      - name: "Checkout Code"
        uses: actions/checkout@v4

      - name: "Setup Kubectl"
        uses: azure/setup-kubectl@v3
        with:
          version: "v1.28.0"

      - name: "Configure kubectl"
        env:
          KUBE_CONFIG: ${{ secrets.PRODUCTION_KUBE_CONFIG }}
        run: |
          echo "$KUBE_CONFIG" | base64 -d > kubeconfig
          export KUBECONFIG=kubeconfig

      - name: "Deploy to Production"
        run: |
          export KUBECONFIG=kubeconfig
          envsubst < k8s/production/deployment.yaml | kubectl apply -f -
          kubectl rollout status deployment/product-catalog-service -n production
        env:
          IMAGE_TAG: ${{ needs.build.outputs.image }}

      - name: "Run Smoke Tests"
        run: |
          npm run test:smoke
        env:
          BASE_URL: https://api.company.com
          API_KEY: ${{ secrets.PRODUCTION_API_KEY }}
```

### GitLab CI/CD Configuration

```yaml
# ==========================================================================
# GitLab CI/CD Pipeline Configuration
# ==========================================================================

stages:
  - validate
  - test
  - build
  - deploy-staging
  - deploy-production

variables:
  DOCKER_REGISTRY: "registry.gitlab.com"
  IMAGE_NAME: "$CI_PROJECT_PATH"
  POSTGRES_DB: "test_db"
  POSTGRES_USER: "test_user"
  POSTGRES_PASSWORD: "test_password"

# ==========================================================================
# Templates for reusable job configurations
# ==========================================================================
.node_template: &node_template
  image: node:18-alpine
  cache:
    key:
      files:
        - package-lock.json
    paths:
      - node_modules/
  before_script:
    - npm ci

.docker_template: &docker_template
  image: docker:24.0.0
  services:
    - docker:24.0.0-dind
  before_script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY

# ==========================================================================
# Validation Stage
# ==========================================================================
yaml_validation:
  stage: validate
  image: python:3.11-alpine
  script:
    - pip install yamllint
    - yamllint config/
  rules:
    - changes:
        - "config/**/*.yaml"
        - "config/**/*.yml"

code_quality:
  stage: validate
  <<: *node_template
  script:
    - npm run lint
    - npm run format:check
    - npm audit --audit-level=moderate
  artifacts:
    reports:
      junit: reports/lint-results.xml

# ==========================================================================
# Test Stage
# ==========================================================================
unit_tests:
  stage: test
  <<: *node_template
  services:
    - postgres:15
    - redis:7
  variables:
    DATABASE_URL: "postgresql://test_user:test_password@postgres:5432/test_db"
    REDIS_URL: "redis://redis:6379"
  script:
    - npm run test:unit
    - npm run test:coverage
  artifacts:
    reports:
      junit: reports/junit.xml
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml
  coverage: '/Lines\s*:\s*(\d+\.\d+)%/'

integration_tests:
  stage: test
  <<: *node_template
  services:
    - postgres:15
    - redis:7
  variables:
    DATABASE_URL: "postgresql://test_user:test_password@postgres:5432/test_db"
    REDIS_URL: "redis://redis:6379"
  script:
    - npm run test:integration
  artifacts:
    reports:
      junit: reports/integration-junit.xml

# ==========================================================================
# Build Stage
# ==========================================================================
build_image:
  stage: build
  <<: *docker_template
  script:
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA .
    - docker tag $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA $CI_REGISTRY_IMAGE:latest
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
    - docker push $CI_REGISTRY_IMAGE:latest
  only:
    - main
    - develop

# ==========================================================================
# Staging Deployment
# ==========================================================================
deploy_staging:
  stage: deploy-staging
  image: bitnami/kubectl:latest
  script:
    - echo "$STAGING_KUBE_CONFIG" | base64 -d > kubeconfig
    - export KUBECONFIG=kubeconfig
    - envsubst < k8s/staging/deployment.yaml | kubectl apply -f -
    - kubectl rollout status deployment/product-catalog-service -n staging
  environment:
    name: staging
    url: https://api-staging.company.com
  variables:
    IMAGE_TAG: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
  only:
    - develop

# ==========================================================================
# Production Deployment
# ==========================================================================
deploy_production:
  stage: deploy-production
  image: bitnami/kubectl:latest
  script:
    - echo "$PRODUCTION_KUBE_CONFIG" | base64 -d > kubeconfig
    - export KUBECONFIG=kubeconfig
    - envsubst < k8s/production/deployment.yaml | kubectl apply -f -
    - kubectl rollout status deployment/product-catalog-service -n production
  environment:
    name: production
    url: https://api.company.com
  variables:
    IMAGE_TAG: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
  when: manual
  only:
    - main
```

---

## 🐳 Docker & Kubernetes YAML

### Docker Compose Configuration

```yaml
# ==========================================================================
# Docker Compose - Local Development Environment
# ==========================================================================

version: "3.8"

# Shared network for all services
networks:
  company_network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16

# Shared volumes
volumes:
  postgres_data:
    driver: local
  redis_data:
    driver: local
  elasticsearch_data:
    driver: local

# ==========================================================================
# Services Configuration
# ==========================================================================
services:
  # Database Services
  postgres:
    image: postgres:15-alpine
    container_name: company_postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: company_dev
      POSTGRES_USER: dev_user
      POSTGRES_PASSWORD: dev_password
      PGDATA: /var/lib/postgresql/data/pgdata
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./scripts/init-db.sql:/docker-entrypoint-initdb.d/init-db.sql:ro
    networks:
      company_network:
        ipv4_address: 172.20.0.10
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U dev_user -d company_dev"]
      interval: 30s
      timeout: 10s
      retries: 5

  # Cache Services
  redis:
    image: redis:7-alpine
    container_name: company_redis
    restart: unless-stopped
    command: redis-server --appendonly yes --requirepass dev_password
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      company_network:
        ipv4_address: 172.20.0.11
    healthcheck:
      test: ["CMD", "redis-cli", "--raw", "incr", "ping"]
      interval: 30s
      timeout: 10s
      retries: 5

  # Search Engine
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.11.0
    container_name: company_elasticsearch
    restart: unless-stopped
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ports:
      - "9200:9200"
      - "9300:9300"
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data
    networks:
      company_network:
        ipv4_address: 172.20.0.12

  # Message Queue
  rabbitmq:
    image: rabbitmq:3.12-management-alpine
    container_name: company_rabbitmq
    restart: unless-stopped
    environment:
      RABBITMQ_DEFAULT_USER: dev_user
      RABBITMQ_DEFAULT_PASS: dev_password
    ports:
      - "5672:5672" # AMQP port
      - "15672:15672" # Management UI
    networks:
      company_network:
        ipv4_address: 172.20.0.13

  # ==========================================================================
  # Application Services
  # ==========================================================================

  # API Gateway
  api-gateway:
    build:
      context: ./api-gateway
      dockerfile: Dockerfile
    container_name: company_api_gateway
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: development
      PORT: 3000
      USER_SERVICE_URL: http://user-service:3001
      PRODUCT_SERVICE_URL: http://product-service:3002
      ORDER_SERVICE_URL: http://order-service:3003
    depends_on:
      - user-service
      - product-service
      - order-service
    networks:
      company_network:
        ipv4_address: 172.20.0.20

  # User Service
  user-service:
    build:
      context: ./user-service
      dockerfile: Dockerfile
    container_name: company_user_service
    restart: unless-stopped
    ports:
      - "3001:3001"
    environment:
      NODE_ENV: development
      PORT: 3001
      DATABASE_URL: postgresql://dev_user:dev_password@postgres:5432/company_dev
      REDIS_URL: redis://:dev_password@redis:6379
      JWT_SECRET: dev_jwt_secret_key
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    networks:
      company_network:
        ipv4_address: 172.20.0.21
    volumes:
      - ./user-service:/app
      - /app/node_modules

  # Product Service
  product-service:
    build:
      context: ./product-service
      dockerfile: Dockerfile
    container_name: company_product_service
    restart: unless-stopped
    ports:
      - "3002:3002"
    environment:
      NODE_ENV: development
      PORT: 3002
      DATABASE_URL: postgresql://dev_user:dev_password@postgres:5432/company_dev
      REDIS_URL: redis://:dev_password@redis:6379
      ELASTICSEARCH_URL: http://elasticsearch:9200
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
      elasticsearch:
        condition: service_started
    networks:
      company_network:
        ipv4_address: 172.20.0.22

  # Order Service
  order-service:
    build:
      context: ./order-service
      dockerfile: Dockerfile
    container_name: company_order_service
    restart: unless-stopped
    ports:
      - "3003:3003"
    environment:
      NODE_ENV: development
      PORT: 3003
      DATABASE_URL: postgresql://dev_user:dev_password@postgres:5432/company_dev
      REDIS_URL: redis://:dev_password@redis:6379
      RABBITMQ_URL: amqp://dev_user:dev_password@rabbitmq:5672
      USER_SERVICE_URL: http://user-service:3001
      PRODUCT_SERVICE_URL: http://product-service:3002
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
      rabbitmq:
        condition: service_started
    networks:
      company_network:
        ipv4_address: 172.20.0.23

  # ==========================================================================
  # Monitoring Services
  # ==========================================================================

  # Prometheus
  prometheus:
    image: prom/prometheus:v2.45.0
    container_name: company_prometheus
    restart: unless-stopped
    ports:
      - "9090:9090"
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml:ro
    command:
      - "--config.file=/etc/prometheus/prometheus.yml"
      - "--storage.tsdb.path=/prometheus"
      - "--web.console.libraries=/etc/prometheus/console_libraries"
      - "--web.console.templates=/etc/prometheus/consoles"
      - "--web.enable-lifecycle"
    networks:
      company_network:
        ipv4_address: 172.20.0.30

  # Grafana
  grafana:
    image: grafana/grafana:10.2.0
    container_name: company_grafana
    restart: unless-stopped
    ports:
      - "3001:3000"
    environment:
      GF_SECURITY_ADMIN_PASSWORD: admin_password
    volumes:
      - ./monitoring/grafana/provisioning:/etc/grafana/provisioning:ro
      - ./monitoring/grafana/dashboards:/var/lib/grafana/dashboards:ro
    networks:
      company_network:
        ipv4_address: 172.20.0.31
```

### Kubernetes Deployment Configuration

```yaml
# ==========================================================================
# Kubernetes Deployment - Product Service
# ==========================================================================

apiVersion: apps/v1
kind: Deployment
metadata:
  name: product-service
  namespace: production
  labels:
    app: product-service
    version: v1
    environment: production
    tier: backend
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: product-service
      version: v1
  template:
    metadata:
      labels:
        app: product-service
        version: v1
        environment: production
        tier: backend
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "9090"
        prometheus.io/path: "/metrics"
    spec:
      serviceAccountName: product-service
      securityContext:
        runAsNonRoot: true
        runAsUser: 1000
        fsGroup: 2000

      # Init containers for database migrations
      initContainers:
        - name: migrate-database
          image: company/product-service:${IMAGE_TAG}
          command: ["npm", "run", "migrate"]
          env:
            - name: NODE_ENV
              value: "production"
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: database-secrets
                  key: url
          resources:
            requests:
              memory: "128Mi"
              cpu: "100m"
            limits:
              memory: "256Mi"
              cpu: "200m"

      containers:
        - name: product-service
          image: company/product-service:${IMAGE_TAG}
          imagePullPolicy: Always
          ports:
            - name: http
              containerPort: 3002
              protocol: TCP
            - name: metrics
              containerPort: 9090
              protocol: TCP

          env:
            - name: NODE_ENV
              value: "production"
            - name: PORT
              value: "3002"
            - name: METRICS_PORT
              value: "9090"
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: database-secrets
                  key: url
            - name: REDIS_URL
              valueFrom:
                secretKeyRef:
                  name: redis-secrets
                  key: url
            - name: JWT_SECRET
              valueFrom:
                secretKeyRef:
                  name: auth-secrets
                  key: jwt-secret

          envFrom:
            - configMapRef:
                name: product-service-config
            - secretRef:
                name: product-service-secrets

          resources:
            requests:
              memory: "512Mi"
              cpu: "250m"
            limits:
              memory: "1Gi"
              cpu: "500m"

          livenessProbe:
            httpGet:
              path: /health
              port: http
            initialDelaySeconds: 30
            periodSeconds: 10
            timeoutSeconds: 5
            failureThreshold: 3

          readinessProbe:
            httpGet:
              path: /ready
              port: http
            initialDelaySeconds: 5
            periodSeconds: 5
            timeoutSeconds: 3
            failureThreshold: 3

          volumeMounts:
            - name: config-volume
              mountPath: /app/config
              readOnly: true
            - name: temp-storage
              mountPath: /tmp

      volumes:
        - name: config-volume
          configMap:
            name: product-service-config
        - name: temp-storage
          emptyDir:
            sizeLimit: 1Gi

      imagePullSecrets:
        - name: registry-secret

      terminationGracePeriodSeconds: 30

      nodeSelector:
        kubernetes.io/arch: amd64
        node.kubernetes.io/instance-type: m5.large

      tolerations:
        - key: "node.kubernetes.io/not-ready"
          operator: "Exists"
          effect: "NoExecute"
          tolerationSeconds: 300
        - key: "node.kubernetes.io/unreachable"
          operator: "Exists"
          effect: "NoExecute"
          tolerationSeconds: 300

      affinity:
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
            - weight: 100
              podAffinityTerm:
                labelSelector:
                  matchExpressions:
                    - key: app
                      operator: In
                      values: ["product-service"]
                topologyKey: kubernetes.io/hostname

---
# ==========================================================================
# Service Configuration
# ==========================================================================

apiVersion: v1
kind: Service
metadata:
  name: product-service
  namespace: production
  labels:
    app: product-service
    version: v1
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-type: nlb
    service.beta.kubernetes.io/aws-load-balancer-internal: "true"
spec:
  type: LoadBalancer
  ports:
    - name: http
      port: 80
      targetPort: http
      protocol: TCP
    - name: metrics
      port: 9090
      targetPort: metrics
      protocol: TCP
  selector:
    app: product-service
    version: v1

---
# ==========================================================================
# ConfigMap Configuration
# ==========================================================================

apiVersion: v1
kind: ConfigMap
metadata:
  name: product-service-config
  namespace: production
data:
  # Application configuration
  LOG_LEVEL: "info"
  LOG_FORMAT: "json"
  METRICS_ENABLED: "true"
  CACHE_TTL: "3600"

  # External service URLs
  ELASTICSEARCH_URL: "https://elasticsearch.company.internal:9200"
  RABBITMQ_URL: "amqp://rabbitmq.company.internal:5672"

  # Feature flags
  ENABLE_PRODUCT_RECOMMENDATIONS: "true"
  ENABLE_ADVANCED_SEARCH: "true"
  ENABLE_BULK_OPERATIONS: "true"

---
# ==========================================================================
# HorizontalPodAutoscaler Configuration
# ==========================================================================

apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: product-service-hpa
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: product-service
  minReplicas: 3
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
        - type: Percent
          value: 10
          periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 60
      policies:
        - type: Percent
          value: 50
          periodSeconds: 60
        - type: Pods
          value: 2
          periodSeconds: 60
      selectPolicy: Max
```

---

## 📊 Best Practices

### 1. **File Organization**

```yaml
# Always include file headers with metadata
# ==========================================================================
# Service Name - Configuration Type
# Description: Brief description of what this configures
# Environment: production/staging/development
# Last Updated: YYYY-MM-DD
# ==========================================================================
```

### 2. **Environment Variable Management**

```yaml
# Use consistent environment variable naming
database:
  host: "${DATABASE_HOST}" # Required variables
  port: "${DATABASE_PORT:-5432}" # Variables with defaults
  ssl_mode: "${DATABASE_SSL_MODE:require}"

# Group related environment variables
database_config:
  primary:
    host: "${PRIMARY_DB_HOST}"
    username: "${PRIMARY_DB_USERNAME}"
    password: "${PRIMARY_DB_PASSWORD}"
  replica:
    host: "${REPLICA_DB_HOST}"
    username: "${REPLICA_DB_USERNAME}"
    password: "${REPLICA_DB_PASSWORD}"
```

### 3. **Documentation and Comments**

```yaml
# ==========================================================================
# User Authentication Configuration
# ==========================================================================

authentication:
  # JWT configuration for API authentication
  jwt:
    # Secret key for JWT signing (rotate monthly)
    secret: "${JWT_SECRET}"

    # Token expiry time (shorter for production)
    expiry: "2h"

    # Refresh token expiry (longer duration)
    refresh_expiry: "7d"

    # JWT algorithm (HS256 recommended for symmetric keys)
    algorithm: "HS256"

  # OAuth configuration for social login
  oauth:
    # Google OAuth settings
    google:
      client_id: "${GOOGLE_CLIENT_ID}"
      client_secret: "${GOOGLE_CLIENT_SECRET}"
      redirect_uri: "https://app.company.com/auth/google/callback"

    # GitHub OAuth settings
    github:
      client_id: "${GITHUB_CLIENT_ID}"
      client_secret: "${GITHUB_CLIENT_SECRET}"
      redirect_uri: "https://app.company.com/auth/github/callback"
```

### 4. **Security Best Practices**

```yaml
# ==========================================================================
# Security Configuration
# ==========================================================================

security:
  # Password policies
  password_policy:
    min_length: 12
    require_uppercase: true
    require_lowercase: true
    require_numbers: true
    require_special_chars: true
    prevent_common_passwords: true
    password_history: 5 # Prevent reusing last 5 passwords

  # Rate limiting configuration
  rate_limiting:
    enabled: true
    global:
      requests_per_minute: 1000
      burst_limit: 1500
    per_user:
      requests_per_minute: 100
      burst_limit: 150
    per_ip:
      requests_per_minute: 200
      burst_limit: 300

  # CORS configuration
  cors:
    allowed_origins:
      - "https://app.company.com"
      - "https://admin.company.com"
    allowed_methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
    allowed_headers: ["Content-Type", "Authorization", "X-Requested-With"]
    expose_headers: ["X-Total-Count", "X-Page-Count"]
    allow_credentials: true
    max_age: 86400 # 24 hours

  # Content Security Policy
  csp:
    default_src: ["'self'"]
    script_src: ["'self'", "'unsafe-inline'", "https://cdn.company.com"]
    style_src: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"]
    img_src: ["'self'", "data:", "https://images.company.com"]
    font_src: ["'self'", "https://fonts.gstatic.com"]
    connect_src: ["'self'", "https://api.company.com"]
```

### 5. **Performance Configuration**

```yaml
# ==========================================================================
# Performance and Optimization Settings
# ==========================================================================

performance:
  # Connection pooling
  database_pool:
    min_connections: 5
    max_connections: 25
    idle_timeout: 300 # 5 minutes
    connection_timeout: 10 # 10 seconds
    statement_timeout: 30 # 30 seconds

  # Caching configuration
  cache:
    # Redis cache settings
    redis:
      default_ttl: 3600 # 1 hour
      max_memory_policy: "allkeys-lru"
      key_prefix: "app:"

    # In-memory cache settings
    memory:
      max_size: 1000 # Maximum number of items
      ttl: 300 # 5 minutes

  # HTTP client timeouts
  http_clients:
    default_timeout: 15 # 15 seconds
    payment_service: 30 # 30 seconds for payment operations
    email_service: 10 # 10 seconds for email service

  # Compression settings
  compression:
    enabled: true
    level: 6 # Compression level (1-9)
    threshold: 1024 # Only compress responses > 1KB
```

---

## 🔒 Security Guidelines

### 1. **Secret Management**

```yaml
# ==========================================================================
# Secret Management Best Practices
# ==========================================================================

# ❌ NEVER store secrets directly in YAML files
database:
  password: "super_secret_password"  # DON'T DO THIS

# ✅ Always use environment variables for secrets
database:
  password: "${DATABASE_PASSWORD}"   # DO THIS

# ✅ Use external secret management systems
database:
  password: "vault:secret/data/database#password"  # HashiCorp Vault
  password: "aws:secretsmanager:us-west-2:database-password"  # AWS Secrets Manager
```

### 2. **Environment-Specific Security**

```yaml
# ==========================================================================
# Production Security Configuration
# ==========================================================================

security:
  # Production settings
  production:
    debug: false
    detailed_errors: false
    cors:
      allowed_origins: ["https://app.company.com"]
    tls:
      min_version: "1.2"
      cipher_suites: ["TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384"]

  # Development settings (more permissive)
  development:
    debug: true
    detailed_errors: true
    cors:
      allowed_origins: ["http://localhost:3000", "http://localhost:4200"]
    tls:
      min_version: "1.0" # More permissive for local development
```

### 3. **Access Control**

```yaml
# ==========================================================================
# Role-Based Access Control (RBAC)
# ==========================================================================

rbac:
  roles:
    admin:
      permissions:
        - "users:read"
        - "users:write"
        - "users:delete"
        - "products:read"
        - "products:write"
        - "products:delete"
        - "orders:read"
        - "orders:write"
        - "system:admin"

    manager:
      permissions:
        - "users:read"
        - "users:write"
        - "products:read"
        - "products:write"
        - "orders:read"
        - "orders:write"

    developer:
      permissions:
        - "users:read"
        - "products:read"
        - "orders:read"
        - "system:debug"

    user:
      permissions:
        - "profile:read"
        - "profile:write"
        - "orders:read"

  # Resource-based permissions
  resources:
    users:
      create: ["admin", "manager"]
      read: ["admin", "manager", "developer"]
      update: ["admin", "manager"]
      delete: ["admin"]

    products:
      create: ["admin", "manager"]
      read: ["admin", "manager", "developer", "user"]
      update: ["admin", "manager"]
      delete: ["admin"]
```

---

## ✅ Validation & Testing

### YAML Linting Configuration

```yaml
# ==========================================================================
# .yamllint.yaml - YAML Linting Configuration
# ==========================================================================

extends: default

rules:
  # Line length (adjust based on your team's preference)
  line-length:
    max: 120
    level: warning

  # Indentation (use 2 spaces)
  indentation:
    spaces: 2
    indent-sequences: true
    check-multi-line-strings: false

  # Comments
  comments:
    min-spaces-from-content: 1
    require-starting-space: true

  # Trailing spaces
  trailing-spaces: enable

  # Empty lines
  empty-lines:
    max: 2
    max-start: 0
    max-end: 1

  # Document markers
  document-start:
    present: false

  # Truthy values
  truthy:
    allowed-values: ["true", "false", "on", "off", "yes", "no"]
    check-keys: true

# Ignore certain files
ignore: |
  *.min.yaml
  vendor/
  node_modules/
```

### Validation Scripts

```yaml
# ==========================================================================
# package.json - Validation Scripts
# ==========================================================================

{
  "scripts":
    {
      "validate:yaml": "yamllint config/",
      "validate:config": "node scripts/validate-config.js",
      "test:config": "jest config.test.js",
      "lint:all": "npm run validate:yaml && npm run validate:config",
    },
}
```

### Configuration Validation Script

```javascript
// ==========================================================================
// scripts/validate-config.js - Configuration Validation
// ==========================================================================

const fs = require("fs");
const yaml = require("js-yaml");
const Joi = require("joi");

// Configuration schema
const configSchema = Joi.object({
  app: Joi.object({
    name: Joi.string().required(),
    version: Joi.string()
      .pattern(/^\d+\.\d+\.\d+$/)
      .required(),
    description: Joi.string().required(),
  }).required(),

  environment: Joi.object({
    name: Joi.string().valid("development", "staging", "production").required(),
    debug: Joi.boolean().required(),
  }).required(),

  database: Joi.object({
    host: Joi.string().required(),
    port: Joi.number().port().required(),
    name: Joi.string().required(),
  }).required(),
});

// Validate configuration files
function validateConfig(filePath) {
  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const config = yaml.load(fileContents);

    const { error } = configSchema.validate(config);

    if (error) {
      console.error(`❌ Validation failed for ${filePath}:`);
      console.error(
        error.details.map((detail) => `  - ${detail.message}`).join("\n")
      );
      return false;
    }

    console.log(`✅ ${filePath} is valid`);
    return true;
  } catch (err) {
    console.error(`❌ Error validating ${filePath}: ${err.message}`);
    return false;
  }
}

// Main validation function
function main() {
  const configFiles = [
    "config/environments/development.yaml",
    "config/environments/staging.yaml",
    "config/environments/production.yaml",
  ];

  let allValid = true;

  configFiles.forEach((file) => {
    if (!validateConfig(file)) {
      allValid = false;
    }
  });

  if (!allValid) {
    process.exit(1);
  }

  console.log("🎉 All configuration files are valid!");
}

main();
```

---

## ❌ Common Mistakes

### 1. **Indentation Errors**

```yaml
# ❌ Inconsistent indentation
app:
  name: "My App"
    version: "1.0.0"  # Wrong indentation
 description: "App description"  # Wrong indentation

# ✅ Consistent indentation
app:
  name: "My App"
  version: "1.0.0"
  description: "App description"
```

### 2. **Quoting Issues**

```yaml
# ❌ Inconsistent quoting
name: My App        # No quotes
version: "1.0.0"    # Quotes
debug: "true"       # String instead of boolean

# ✅ Consistent and appropriate quoting
name: "My App"      # Quotes for strings with spaces
version: "1.0.0"    # Quotes for version strings
debug: true         # Boolean without quotes
```

### 3. **Environment Variable Mistakes**

```yaml
# ❌ Wrong environment variable syntax
database:
  host: $DATABASE_HOST        # Missing braces
  port: ${DATABASE_PORT}      # No default value when needed
  name: "${DATABASE_NAME"     # Missing closing brace

# ✅ Correct environment variable syntax
database:
  host: "${DATABASE_HOST}"
  port: "${DATABASE_PORT:-5432}"
  name: "${DATABASE_NAME}"
```

### 4. **Security Anti-patterns**

```yaml
# ❌ Security mistakes
database:
  password: "my_secret_password"    # Hardcoded secret
api_keys:
  stripe: "sk_live_abc123..."       # Production key in config
debug: true                         # Debug enabled in production

# ✅ Security best practices
database:
  password: "${DATABASE_PASSWORD}"  # Environment variable
api_keys:
  stripe: "${STRIPE_API_KEY}"       # Environment variable
debug: "${DEBUG_MODE:-false}"       # Default to false
```

### 5. **Structure Issues**

```yaml
# ❌ Poor structure
config: |
  {
    "database": {
      "host": "localhost"
    }
  }

# ✅ Proper YAML structure
config:
  database:
    host: "localhost"
```

---

## 🎯 Summary

YAML is a powerful configuration format that, when used correctly, provides:

1. **Human Readability**: Easy to read and understand
2. **Version Control**: Works well with Git and diff tools
3. **Flexibility**: Supports complex data structures
4. **Standardization**: Industry-standard format
5. **Tool Support**: Excellent tooling ecosystem

### Key Takeaways:

- **Consistency is crucial**: Follow naming conventions and structure patterns
- **Security first**: Never hardcode secrets, always use environment variables
- **Document everything**: Use comments and headers for clarity
- **Validate early**: Use linting and validation tools
- **Environment-specific**: Different configurations for different environments
- **Performance matters**: Configure timeouts, pools, and caching appropriately

By following these company standards and best practices, your YAML configurations will be maintainable, secure, and scalable across your entire infrastructure and application stack.
