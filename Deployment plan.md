# 🚀 AI Career Navigator: Full Stack & Deployment Plan (Docker Native)

## 1. Detailed Technical Dependencies and Tooling

This section outlines the specific technologies used across the three primary containerized services and supporting components.

---

### 1.1. Frontend (Presentation - `web` container) 🖼️

The frontend is a standard single-page application (SPA) built for maximum performance and user experience.

| Category | Technology / Package | Purpose |
| :--- | :--- | :--- |
| **Framework** | **React** (with Hooks) | Core UI development for dynamic components and responsive user interface. |
| **Language** | **TypeScript** | Ensures type safety and improves code quality/maintainability. |
| **State Management** | **Redux Toolkit** or **Zustand** | Handles global application state (User Profile, Study Progress). |
| **Styling** | **Tailwind CSS** | Utility-first CSS framework for rapid and responsive styling. |
| **Networking** | **Axios** | Communicates with the `app_api` container's endpoints. |
| **Deployment** | **Nginx** (in multi-stage Docker build) | Serves the optimized static files efficiently. |

### 1.2. Backend API (Application Tracker - `app_api` container) ⚙️

This Node.js service handles business logic, CRUD operations, user authentication, and acts as the **central router/proxy** to the AI services.

| Category | Technology / Package | Purpose |
| :--- | :--- | :--- |
| **Runtime** | **Node.js (LTS)** | Backend execution environment for high-speed I/O. |
| **Framework** | **Fastify** or **Express.js** | Handles API routing, middleware, and request/response cycles. |
| **DB Client** | **Node-Postgres (pg)** | Connects to the PostgreSQL database container. |
| **Authentication** | **Passport.js** + **JWT** | Secure user login and session management (NFR-SEC-002). |
| **External Integration** | **Google APIs Client Library** | Manages secure OAuth flow and communication with the Gmail API (FR-APT-006). |
| **Inter-Service Comms** | **Axios** | Makes internal, secure requests to the `ai_engine` container. |

### 1.3. AI/ML Engine (`ai_engine` container) 🧠

The core intelligence hub built on Python, designed for heavy computation and low-latency inference.

| Category | Technology / Package | Purpose |
| :--- | :--- | :--- |
| **Framework** | **FastAPI** | Creates a fast, asynchronous Python API endpoint for AI logic. |
| **NLP/Extraction** | **spaCy** / **NLTK** | Extracts skills, keywords, and entities from text data. |
| **RAG/Chatbot** | **LangChain** or **LlamaIndex** | Orchestrates the Retrieval-Augmented Generation (RAG) pipeline for context-aware Chatbot and content creation. |
| **Vector Search** | **PgVector** (PostgreSQL extension) | Provides native vector storage and indexing within the primary database, simplifying the stack. |
| **Data Handling** | **Pandas** / **NumPy** | Used for data cleaning, transformation, and array manipulation (embeddings). |
| **Task Management** | **Celery** (optional) | Recommended for managing long-running, scheduled Job Aggregation tasks asynchronously. |

### 1.4. Databases and Supporting Tools 💾

| Category | Technology / Package | Purpose |
| :--- | :--- | :--- |
| **Primary DB** | **PostgreSQL** (with **PgVector**) | Relational data store for structured data and high-performance vector embeddings. |
| **Caching/Messaging** | **Redis** | In-memory store for session data, rate-limiting, and caching frequent AI results (NFR-PER-001). |
| **Orchestration** | **Docker Compose** | Defines and manages the build, networking, and environment for all services in development/staging. |
| **Reverse Proxy** | **Traefik** or **Nginx** | Handles external traffic, SSL/TLS termination, and routing to the correct service container. |

---

## 2. Deployment Plan (CI/CD Focused) 🚢

This plan assumes a dedicated hosting environment (VPS, AWS EC2, or a container service like ECS/EKS) where Docker and Docker Compose can run.

### Phase 1: Preparation and Environment Setup

| Step | Task | Details |
| :--- | :--- | :--- |
| **2.1** | **Container Registry** | Setup a private container registry (e.g., **AWS ECR, Docker Hub Private Repo**). All production images will be pushed here. |
| **2.2** | **Secrets Management** | Configure a secrets manager (**AWS Secrets Manager** or environment files on the host). Store sensitive data: `DB_PASSWORD`, `JWT_SECRET`, `VECTOR_DB_KEY`. **DO NOT** commit secrets to Git. |
| **2.3** | **Production Compose** | Create a `docker-compose.prod.yml` file. This overrides the dev file, removes bind mounts, adds `restart: always`, specifies production network configs, and defines health checks. |

### Phase 2: Continuous Integration (CI) - GitHub Actions/GitLab CI

The CI pipeline ensures code quality and readiness before deployment.

| Step | Service | Action |
| :--- | :--- | :--- |
| **2.4** | **Code Commit** | Developer pushes code to a feature branch, then creates a Pull Request (PR) to `main`. |
| **2.5** | **Testing** | CI pipeline runs unit tests (`pytest` for Python, `Jest` for Node.js/React) and integration tests. |
| **2.6** | **Build & Tag** | If tests pass, build production Docker images for `web`, `app_api`, and `ai_engine` using multi-stage builds to minimize size. Tag images with the commit SHA or version number. |
| **2.7** | **Push Images** | Push the newly tagged, built images to the private Container Registry. |

### Phase 3: Continuous Deployment (CD) - Production Launch

The CD pipeline deploys the tested images to the live server.

| Step | Action | Details |
| :--- | :--- | :--- |
| **2.8** | **Trigger** | Upon merge to the `main` branch, the CD pipeline is triggered. |
| **2.9** | **Connect & Pull** | Pipeline connects to the production server (via SSH or cloud agent) and performs a `docker compose pull` for the latest images from the registry. |
| **2.10** | **Deployment** | Execute **Zero-Downtime Deployment** using a command like: `docker compose -f docker-compose.prod.yml up -d --force-recreate <service>` (or leveraging orchestration tools like Kubernetes/ECS). |
| **2.11** | **Health Check** | Wait for all services (especially `ai_engine` and `database`) to report **healthy** before routing live traffic. |
| **2.12** | **Monitoring** | Send success or failure notification (e.g., to Slack, email) and monitor **Prometheus/Grafana** for post-deployment metrics. |

---

This video provides an excellent, practical demonstration of how to deploy a full-stack application composed of FastAPI and React using Docker Compose.

[Deploy FastAPI for Free: CI/CD with Render & GitHub Actions](https://www.youtube.com/watch?v=QcN89peJfWQ)
http://googleusercontent.com/youtube_content/0