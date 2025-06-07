## TASK
Refactor the existing NestJS monolithic backend into a microservices architecture using a monorepo structure. Then integrate a Python analytics service that listens to transaction events and provides insights.

---

## CURRENT STATE
- A monolithic NestJS backend in a single codebase (`src/`)
- Contains modules: users, transactions, categories, guards, interceptors
- All logic (CRUD, business logic, routes) is centralized

---

## OBJECTIVE

### 1. Monorepo Setup
- Convert to a monorepo using [Nx](https://nx.dev) or a custom structure
- Split into individual microservices:
  - `auth` service
  - `users` service
  - `transactions` service (CRUD + emit transaction events)
  - `categories` service
  - `gateway` (API gateway for external HTTP)
- Shared logic (DTOs, interfaces, types, guards) should move to a `libs/` folder

### 2. Microservice Communication
- Use Kafka as the message broker for inter-service communication
- Use NestJS's `@nestjs/microservices` package with Kafka transport
- Emit and subscribe to relevant events (e.g., `transaction.created`, `user.logged_in`)
- Ensure `transactions` service emits events when a new transaction is created or updated

### 3. Python Analytics Integration
- Add a new service at `/apps/python-analytics`
- It should:
  - Subscribe to Kafka topics like `transaction.created`
  - Analyze the data for trends, anomalies, and insights (e.g., spending patterns)
  - Optionally respond via a REST API (e.g., `/analytics/user/:id/summary`)
- Use Python’s `confluent-kafka` or `kafka-python` for Kafka integration
- Optionally persist processed insights to PostgreSQL or serve from memory

### 4. Docker & Dev Environment
- Provide a `docker-compose.yml` setup to spin up:
  - All NestJS services
  - Python analytics container
  - Kafka + Zookeeper
- Add local development support with:
  - Hot reload using `nodemon` or similar in each NestJS service
  - Auto-reload for Python service using `watchdog` or `uvicorn` with `--reload`

---

## ACCEPTANCE CRITERIA
- Microservices architecture is cleanly structured and containerized
- NestJS services communicate via Kafka
- The `transactions` service emits relevant Kafka events
- Python service receives events and logs or stores processed analytics
- Gateway correctly proxies requests to services
- `docker-compose up` spins up the entire stack
- Shared DTOs and types are organized under `libs/` for reusability