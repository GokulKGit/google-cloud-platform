# 🚀 YAML Examples & Templates

## 📋 Practical YAML Templates for Company Use

This document provides ready-to-use YAML templates and real-world examples following the company standards defined in `YAML-STANDARDS.md`.

---

## 🏗️ Project Templates

### 1. **Complete Application Configuration Template**

```yaml
# ==========================================================================
# [SERVICE-NAME] - Complete Application Configuration
# Description: Production-ready configuration template
# Environment: [ENVIRONMENT]
# Last Updated: 2025-01-25
# Version: 1.0.0
# ==========================================================================

# Application Metadata
application:
  name: "service-name"
  version: "1.0.0"
  description: "Service description"
  build_info:
    git_commit: "${GIT_COMMIT}"
    build_date: "${BUILD_DATE}"
    build_number: "${BUILD_NUMBER}"

  maintainer:
    team: "team-name@company.com"
    slack_channel: "#team-alerts"
    documentation: "https://docs.company.com/services/service-name"

# Runtime Environment
environment:
  name: "${ENVIRONMENT}"
  region: "${AWS_REGION:-us-west-2}"
  availability_zone: "${AZ:-us-west-2a}"
  cluster: "${CLUSTER_NAME:-production}"

# Server Configuration
server:
  host: "${HOST:-0.0.0.0}"
  port: "${PORT:-3000}"
  protocol: "${PROTOCOL:-https}"
  base_path: "${BASE_PATH:-/api/v1}"

  # Performance settings
  request_timeout: 30
  body_limit: "10mb"
  keep_alive_timeout: 65
  headers_timeout: 66

  # TLS configuration
  tls:
    enabled: true
    key_file: "${TLS_KEY_FILE}"
    cert_file: "${TLS_CERT_FILE}"
    ca_file: "${TLS_CA_FILE}"

# Database Configuration
database:
  primary:
    type: "postgresql"
    host: "${DATABASE_HOST}"
    port: "${DATABASE_PORT:-5432}"
    database: "${DATABASE_NAME}"
    username: "${DATABASE_USERNAME}"
    password: "${DATABASE_PASSWORD}"

    # Connection pool settings
    pool:
      min: "${DB_POOL_MIN:-5}"
      max: "${DB_POOL_MAX:-25}"
      idle_timeout: 300
      connection_timeout: 10
      statement_timeout: 30

    # SSL configuration
    ssl:
      enabled: "${DATABASE_SSL:-true}"
      mode: "${DATABASE_SSL_MODE:-require}"
      ca_cert: "${DATABASE_SSL_CA}"

    # Performance tuning
    options:
      log_queries: "${LOG_QUERIES:-false}"
      slow_query_threshold: 1000
      timezone: "UTC"

# Cache Configuration
cache:
  redis:
    host: "${REDIS_HOST}"
    port: "${REDIS_PORT:-6379}"
    database: "${REDIS_DB:-0}"
    password: "${REDIS_PASSWORD}"
    key_prefix: "${REDIS_PREFIX:-app:}"

    # Connection settings
    connection_timeout: 5
    command_timeout: 10
    retry_attempts: 3
    retry_delay: 100

    # Cache policies
    default_ttl: 3600
    max_memory_policy: "allkeys-lru"

    # Cluster configuration (if applicable)
    cluster:
      enabled: "${REDIS_CLUSTER:-false}"
      nodes: "${REDIS_CLUSTER_NODES}"

# Security Configuration
security:
  authentication:
    jwt:
      secret: "${JWT_SECRET}"
      algorithm: "${JWT_ALGORITHM:-HS256}"
      expiry: "${JWT_EXPIRY:-1h}"
      refresh_expiry: "${JWT_REFRESH_EXPIRY:-24h}"
      issuer: "${JWT_ISSUER:-company.com}"

    api_keys:
      enabled: "${API_KEYS_ENABLED:-true}"
      header_name: "X-API-Key"
      rate_limit: 10000

  cors:
    enabled: true
    origins: "${CORS_ORIGINS}"
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
    headers: ["Content-Type", "Authorization", "X-Requested-With", "X-API-Key"]
    credentials: true
    max_age: 86400

  rate_limiting:
    enabled: "${RATE_LIMITING_ENABLED:-true}"
    window: "1m"
    max_requests: "${RATE_LIMIT:-100}"
    storage: "redis"
    skip_failed_requests: true

# Monitoring and Observability
monitoring:
  metrics:
    enabled: true
    port: "${METRICS_PORT:-9090}"
    path: "/metrics"
    namespace: "${METRICS_NAMESPACE:-app}"

  logging:
    level: "${LOG_LEVEL:-info}"
    format: "${LOG_FORMAT:-json}"
    output: "${LOG_OUTPUT:-stdout}"
    structured: true
    include_timestamp: true
    include_request_id: true

    # Fields to exclude from logs
    exclude_fields: ["password", "token", "secret"]

    # Paths to exclude from access logs
    exclude_paths: ["/health", "/metrics", "/favicon.ico"]

  tracing:
    enabled: "${TRACING_ENABLED:-true}"
    service_name: "service-name"
    jaeger:
      endpoint: "${JAEGER_ENDPOINT}"
      sampling_rate: "${TRACING_SAMPLING_RATE:-0.1}"

  health_checks:
    enabled: true
    path: "/health"
    timeout: 5
    checks:
      - name: "database"
        type: "postgres"
        timeout: 3
      - name: "redis"
        type: "redis"
        timeout: 2
      - name: "external_api"
        type: "http"
        url: "${EXTERNAL_API_HEALTH_URL}"
        timeout: 5

# Feature Flags
features:
  new_user_flow: "${FEATURE_NEW_USER_FLOW:-false}"
  advanced_analytics: "${FEATURE_ANALYTICS:-true}"
  beta_features: "${FEATURE_BETA:-false}"
  maintenance_mode: "${MAINTENANCE_MODE:-false}"
```

---

## 🐳 Docker & Container Templates

### 1. **Docker Compose for Development**

```yaml
# ==========================================================================
# Docker Compose - Local Development Environment
# Description: Complete development environment with all services
# Usage: docker-compose up -d
# ==========================================================================

version: "3.8"

# Define custom networks
networks:
  app_network:
    driver: bridge
    ipam:
      driver: default
      config:
        - subnet: 172.25.0.0/16

# Define persistent volumes
volumes:
  postgres_data:
    driver: local
  redis_data:
    driver: local
  rabbitmq_data:
    driver: local

# Environment variables template
x-common-env: &common-env
  NODE_ENV: development
  LOG_LEVEL: debug
  DATABASE_URL: postgresql://dev_user:dev_password@postgres:5432/app_dev
  REDIS_URL: redis://redis:6379/0
  RABBITMQ_URL: amqp://dev_user:dev_password@rabbitmq:5672

services:
  # ==========================================================================
  # Infrastructure Services
  # ==========================================================================

  postgres:
    image: postgres:15-alpine
    container_name: app_postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: app_dev
      POSTGRES_USER: dev_user
      POSTGRES_PASSWORD: dev_password
      POSTGRES_INITDB_ARGS: "--auth-host=scram-sha-256"
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./scripts/init-db.sql:/docker-entrypoint-initdb.d/01-init.sql:ro
    networks:
      app_network:
        ipv4_address: 172.25.0.10
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U dev_user -d app_dev"]
      interval: 30s
      timeout: 10s
      retries: 5
      start_period: 30s

  redis:
    image: redis:7-alpine
    container_name: app_redis
    restart: unless-stopped
    command: redis-server --appendonly yes --maxmemory 256mb --maxmemory-policy allkeys-lru
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      app_network:
        ipv4_address: 172.25.0.11
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 30s
      timeout: 10s
      retries: 3

  # ==========================================================================
  # Application Services
  # ==========================================================================

  api-gateway:
    build:
      context: ./services/api-gateway
      dockerfile: Dockerfile.dev
      target: development
    container_name: app_api_gateway
    restart: unless-stopped
    environment:
      <<: *common-env
      PORT: 3000
      USER_SERVICE_URL: http://user-service:3001
      PRODUCT_SERVICE_URL: http://product-service:3002
    ports:
      - "3000:3000"
      - "9230:9229" # Debug port
    volumes:
      - ./services/api-gateway:/app
      - /app/node_modules
    networks:
      app_network:
        ipv4_address: 172.25.0.20
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy

  user-service:
    build:
      context: ./services/user-service
      dockerfile: Dockerfile.dev
      target: development
    container_name: app_user_service
    restart: unless-stopped
    environment:
      <<: *common-env
      PORT: 3001
      JWT_SECRET: dev_jwt_secret_key_12345
    ports:
      - "3001:3001"
      - "9231:9229" # Debug port
    volumes:
      - ./services/user-service:/app
      - /app/node_modules
    networks:
      app_network:
        ipv4_address: 172.25.0.21
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
```

---

## ☸️ Kubernetes Templates

### 1. **Complete Kubernetes Application**

```yaml
# ==========================================================================
# Kubernetes Deployment - User Service
# Description: Production Kubernetes deployment for user service
# ==========================================================================

apiVersion: v1
kind: Namespace
metadata:
  name: company-app
  labels:
    name: company-app
    environment: production

---
apiVersion: v1
kind: ConfigMap
metadata:
  name: user-service-config
  namespace: company-app
  labels:
    app: user-service
    version: v1
data:
  # Application configuration
  NODE_ENV: "production"
  LOG_LEVEL: "info"
  LOG_FORMAT: "json"

  # Feature flags
  ENABLE_USER_REGISTRATION: "true"
  ENABLE_SOCIAL_LOGIN: "true"
  ENABLE_TWO_FACTOR: "true"

  # Performance settings
  MAX_REQUEST_SIZE: "10mb"
  REQUEST_TIMEOUT: "30"

---
apiVersion: v1
kind: Secret
metadata:
  name: user-service-secrets
  namespace: company-app
  labels:
    app: user-service
    version: v1
type: Opaque
stringData:
  DATABASE_URL: "postgresql://user:password@postgres.company.internal:5432/users"
  REDIS_URL: "redis://redis.company.internal:6379/0"
  JWT_SECRET: "super-secret-jwt-key-change-in-production"

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
  namespace: company-app
  labels:
    app: user-service
    version: v1
    component: backend
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: user-service
      version: v1
  template:
    metadata:
      labels:
        app: user-service
        version: v1
        component: backend
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "9090"
        prometheus.io/path: "/metrics"
    spec:
      serviceAccountName: user-service
      securityContext:
        runAsNonRoot: true
        runAsUser: 1001
        fsGroup: 2001

      containers:
        - name: user-service
          image: company/user-service:${IMAGE_TAG}
          imagePullPolicy: Always
          ports:
            - name: http
              containerPort: 3001
              protocol: TCP
            - name: metrics
              containerPort: 9090
              protocol: TCP

          env:
            - name: PORT
              value: "3001"
            - name: METRICS_PORT
              value: "9090"

          envFrom:
            - configMapRef:
                name: user-service-config
            - secretRef:
                name: user-service-secrets

          resources:
            requests:
              memory: "256Mi"
              cpu: "200m"
            limits:
              memory: "512Mi"
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

---
apiVersion: v1
kind: Service
metadata:
  name: user-service
  namespace: company-app
  labels:
    app: user-service
    version: v1
spec:
  type: ClusterIP
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
    app: user-service
    version: v1

---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: user-service-hpa
  namespace: company-app
  labels:
    app: user-service
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: user-service
  minReplicas: 3
  maxReplicas: 20
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
```

---

## 🔄 CI/CD Pipeline Templates

### 1. **GitHub Actions Workflow**

```yaml
# ==========================================================================
# GitHub Actions - Complete CI/CD Pipeline
# Description: Build, test, security scan, and deploy
# ==========================================================================

name: "CI/CD Pipeline"

on:
  push:
    branches:
      - main
      - develop
  pull_request:
    branches:
      - main
      - develop
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
          file_or_dir: "config/ k8s/ .github/"
          config_file: ".yamllint.yaml"

  # ==========================================================================
  # Comprehensive Testing Suite
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
          export IMAGE_TAG=${{ needs.build.outputs.image }}
          envsubst < k8s/staging/deployment.yaml | kubectl apply -f -
          kubectl rollout status deployment/user-service -n staging

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
          export IMAGE_TAG=${{ needs.build.outputs.image }}
          envsubst < k8s/production/deployment.yaml | kubectl apply -f -
          kubectl rollout status deployment/user-service -n production

      - name: "Run Smoke Tests"
        run: npm run test:smoke
        env:
          BASE_URL: https://api.company.com
          API_KEY: ${{ secrets.PRODUCTION_API_KEY }}
```

---

## 📊 Monitoring & Configuration Templates

### 1. **Complete Monitoring Stack**

```yaml
# ==========================================================================
# Prometheus Configuration
# ==========================================================================

# prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s
  external_labels:
    cluster: "production"
    region: "us-west-2"

rule_files:
  - "/etc/prometheus/rules/*.yml"

alerting:
  alertmanagers:
    - static_configs:
        - targets:
            - alertmanager:9093

scrape_configs:
  # Prometheus itself
  - job_name: "prometheus"
    static_configs:
      - targets: ["localhost:9090"]

  # Application services
  - job_name: "user-service"
    kubernetes_sd_configs:
      - role: endpoints
        namespaces:
          names:
            - company-app
    relabel_configs:
      - source_labels: [__meta_kubernetes_service_name]
        action: keep
        regex: user-service
      - source_labels: [__meta_kubernetes_endpoint_port_name]
        action: keep
        regex: metrics

  # Node exporter
  - job_name: "node-exporter"
    kubernetes_sd_configs:
      - role: endpoints
    relabel_configs:
      - source_labels: [__meta_kubernetes_service_name]
        action: keep
        regex: node-exporter

---
# ==========================================================================
# Grafana Datasource Configuration
# ==========================================================================

# grafana/provisioning/datasources/prometheus.yml
apiVersion: 1

datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    isDefault: true
    editable: false
    jsonData:
      timeInterval: "5s"
      queryTimeout: "60s"
      httpMethod: "POST"
```

### 2. **Application Logging Configuration**

```yaml
# ==========================================================================
# Logging Configuration Template
# ==========================================================================

logging:
  # Log level configuration
  level: "${LOG_LEVEL:-info}"

  # Output format
  format: "${LOG_FORMAT:-json}"

  # Output destination
  output: "${LOG_OUTPUT:-stdout}"

  # Structured logging
  structured: true

  # Include metadata
  metadata:
    service_name: "${SERVICE_NAME}"
    service_version: "${SERVICE_VERSION}"
    environment: "${ENVIRONMENT}"
    cluster: "${CLUSTER_NAME}"
    node_id: "${NODE_ID}"

  # Fields to exclude from logs (security)
  exclude_fields:
    - "password"
    - "token"
    - "secret"
    - "authorization"
    - "api_key"

  # Request logging
  request_logging:
    enabled: true
    exclude_paths:
      - "/health"
      - "/metrics"
      - "/favicon.ico"
    include_body: false
    include_headers: false
    max_body_size: 1024

  # Error logging
  error_logging:
    enabled: true
    include_stack_trace: true
    capture_uncaught_exceptions: true
    capture_unhandled_rejections: true

  # Performance logging
  performance_logging:
    enabled: true
    slow_request_threshold: 1000 # milliseconds
    include_query_time: true
    include_external_calls: true

  # Log rotation (for file output)
  rotation:
    max_size: "100MB"
    max_files: 10
    max_age: "30d"
    compress: true

  # Sampling (for high-volume services)
  sampling:
    enabled: false
    rate: 0.1 # Sample 10% of logs
    exclude_levels: ["error", "warn"]

---
# ==========================================================================
# Alerting Rules Configuration
# ==========================================================================

# alerts.yml
groups:
  - name: application.rules
    rules:
      # High error rate
      - alert: HighErrorRate
        expr: |
          (
            rate(http_requests_total{status=~"5.."}[5m]) /
            rate(http_requests_total[5m])
          ) > 0.05
        for: 5m
        labels:
          severity: warning
          service: "{{ $labels.service }}"
        annotations:
          summary: "High error rate detected"
          description: "Error rate is {{ $value | humanizePercentage }} for service {{ $labels.service }}"

      # High response time
      - alert: HighResponseTime
        expr: |
          histogram_quantile(0.95, 
            rate(http_request_duration_seconds_bucket[5m])
          ) > 1
        for: 5m
        labels:
          severity: warning
          service: "{{ $labels.service }}"
        annotations:
          summary: "High response time detected"
          description: "95th percentile response time is {{ $value }}s for service {{ $labels.service }}"

      # Database connection issues
      - alert: DatabaseConnectionFailure
        expr: |
          database_connections_failed_total > 0
        for: 1m
        labels:
          severity: critical
          service: "{{ $labels.service }}"
        annotations:
          summary: "Database connection failures"
          description: "Database connection failures detected for service {{ $labels.service }}"

      # Memory usage
      - alert: HighMemoryUsage
        expr: |
          (
            container_memory_usage_bytes /
            container_spec_memory_limit_bytes
          ) > 0.8
        for: 5m
        labels:
          severity: warning
          service: "{{ $labels.service }}"
        annotations:
          summary: "High memory usage"
          description: "Memory usage is {{ $value | humanizePercentage }} for service {{ $labels.service }}"
```

---

## 🛡️ Security & Validation Templates

### 1. **Security Configuration**

```yaml
# ==========================================================================
# Security Configuration Template
# ==========================================================================

security:
  # Authentication configuration
  authentication:
    # JWT settings
    jwt:
      secret: "${JWT_SECRET}"
      algorithm: "HS256"
      expiry: "1h"
      refresh_expiry: "24h"
      issuer: "company.com"
      audience: "company-app"

      # JWT validation
      validation:
        verify_signature: true
        verify_expiry: true
        verify_issuer: true
        verify_audience: true
        clock_tolerance: 30 # seconds

    # OAuth settings
    oauth:
      google:
        client_id: "${GOOGLE_CLIENT_ID}"
        client_secret: "${GOOGLE_CLIENT_SECRET}"
        redirect_uri: "${GOOGLE_REDIRECT_URI}"
        scopes: ["email", "profile"]

      github:
        client_id: "${GITHUB_CLIENT_ID}"
        client_secret: "${GITHUB_CLIENT_SECRET}"
        redirect_uri: "${GITHUB_REDIRECT_URI}"
        scopes: ["user:email"]

  # Authorization configuration
  authorization:
    # Role-based access control
    rbac:
      enabled: true
      default_role: "user"
      roles:
        admin:
          permissions: ["*"]
        manager:
          permissions: ["users:read", "users:write", "products:*"]
        developer:
          permissions: ["users:read", "products:read", "debug:*"]
        user:
          permissions: ["profile:read", "profile:write"]

    # Resource-based permissions
    resources:
      users:
        create: ["admin", "manager"]
        read: ["admin", "manager", "developer"]
        update: ["admin", "manager"]
        delete: ["admin"]

  # Rate limiting
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

    # Rate limiting storage
    storage: "redis"
    key_generator: "ip_and_user"
    skip_failed_requests: true
    skip_successful_requests: false

  # CORS configuration
  cors:
    enabled: true
    allowed_origins:
      - "https://app.company.com"
      - "https://admin.company.com"
    allowed_methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
    allowed_headers: ["Content-Type", "Authorization", "X-Requested-With"]
    expose_headers: ["X-Total-Count", "X-Rate-Limit-Remaining"]
    allow_credentials: true
    max_age: 86400

  # Content Security Policy
  csp:
    enabled: true
    directives:
      default_src: ["'self'"]
      script_src: ["'self'", "'unsafe-inline'", "https://cdn.company.com"]
      style_src: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"]
      img_src: ["'self'", "data:", "https://images.company.com"]
      font_src: ["'self'", "https://fonts.gstatic.com"]
      connect_src: ["'self'", "https://api.company.com"]
      frame_ancestors: ["'none'"]
      base_uri: ["'self'"]
      form_action: ["'self'"]

  # Input validation
  validation:
    # Request size limits
    max_request_size: "10mb"
    max_file_size: "5mb"
    max_files: 10

    # String validation
    string_validation:
      max_length: 1000
      allow_html: false
      sanitize_html: true
      trim_whitespace: true

    # Password policy
    password_policy:
      min_length: 12
      max_length: 128
      require_uppercase: true
      require_lowercase: true
      require_numbers: true
      require_special_chars: true
      prevent_common_passwords: true
      password_history: 5

  # Encryption
  encryption:
    # Data encryption
    data_encryption:
      algorithm: "AES-256-GCM"
      key: "${ENCRYPTION_KEY}"
      key_rotation_days: 90

    # Password hashing
    password_hashing:
      algorithm: "bcrypt"
      rounds: 12
      pepper: "${PASSWORD_PEPPER}"

  # Security headers
  security_headers:
    enabled: true
    headers:
      X-Content-Type-Options: "nosniff"
      X-Frame-Options: "DENY"
      X-XSS-Protection: "1; mode=block"
      Strict-Transport-Security: "max-age=31536000; includeSubDomains"
      Referrer-Policy: "strict-origin-when-cross-origin"
      Permissions-Policy: "geolocation=(), microphone=(), camera=()"
```

### 2. **YAML Linting Configuration**

```yaml
# ==========================================================================
# .yamllint.yaml - YAML Linting Configuration
# ==========================================================================

extends: default

rules:
  # Line length
  line-length:
    max: 120
    level: warning

  # Indentation
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

  # Brackets
  brackets:
    min-spaces-inside: 0
    max-spaces-inside: 1

  # Braces
  braces:
    min-spaces-inside: 0
    max-spaces-inside: 1

# Files to ignore
ignore: |
  *.min.yaml
  vendor/
  node_modules/
  .git/
  dist/
  build/
```

---

This comprehensive YAML documentation provides:

1. **Complete Templates**: Production-ready YAML configurations
2. **Real-World Examples**: Practical implementations for microservices
3. **Container Orchestration**: Docker Compose and Kubernetes deployments
4. **CI/CD Pipelines**: GitHub Actions workflows with best practices
5. **Security Configuration**: Authentication, authorization, and validation
6. **Monitoring Setup**: Prometheus, Grafana, and alerting configurations
7. **Validation Tools**: YAML linting and security scanning

Your team now has everything needed to create consistent, secure, and maintainable YAML configurations! 🎉
