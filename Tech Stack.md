# 💻 Proposed Tech Stack for AI Career Navigator

## Document Section: Technology Decisions
### Document Version: 1.0

---

## 1. Core Architecture Pattern: Microservices / Serverless

Given the requirements for **heavy AI processing**, real-time **chatbot latency**, **external API integrations**, and a **responsive web interface**, a modern, scalable, and polyglot stack is highly recommended. The architecture should be based on **microservices** or **serverless functions** to allow for specialized resource allocation for the distinct tasks (batch aggregation vs. low-latency AI).

| Layer | Recommended Technology | Rationale |
| :--- | :--- | :--- |
| **Frontend (Presentation)** | **React** (with TypeScript) | Highly popular and efficient for building fast, maintainable **Single Page Applications (SPAs)** and handling the complex, dynamic state of the application tracker and chatbot UI. |
| **Backend API (Application)** | **Node.js (Express/Fastify)** or **Python (FastAPI)** | **Node.js** excels at high-volume, I/O-bound tasks (API routing, external integrations). **Python/FastAPI** is ideal for direct, low-latency communication with AI models. A **hybrid approach is best**. |
| **AI / ML Services** | **Python (SciPy, Pandas)** + **LLM Framework (LangChain/LlamaIndex)** | Python is the industry standard for AI. LLM frameworks are essential for managing the **RAG (Retrieval-Augmented Generation)** pipeline, which provides context-aware answers to the chatbot (FR-SGS-008). |
| **Database - Primary** | **PostgreSQL** (Relational) | Robust, reliable, and handles complex relationships well. Ideal for storing structured data: **User Profiles**, **Application Tracker** records, and **Skill Mastery** history. |
| **Database - AI/Vector** | **Vector Database (e.g., Pinecone, Weaviate, or PgVector extension)** | **Crucial for performance.** Stores embeddings of job descriptions and study content, enabling ultra-fast **semantic search** and matching (NFR-PER-002, NFR-PER-03). |
| **Queue/Messaging** | **RabbitMQ** or **AWS SQS / Azure Service Bus** | Used to **decouple** the batch job aggregation task from the main API. The Aggregator pushes raw jobs to the queue; the AI Engine consumes them for analysis asynchronously. |
| **Cloud/Infrastructure**| **AWS** (or equivalent cloud platform like GCP/Azure) | Provides necessary managed services like **Lambda** (for serverless Aggregator/Processor), **ECS/EC2** (for persistent AI inference server), and **S3** (for document storage). |

---

## 2. Key Technology Justification

### A. Prioritizing AI Performance

* **Python for Modeling:** The core intelligence (Job Matching Engine and Content Generator) will be built in Python, leveraging mature libraries like **spaCy** for NLP extraction and **Hugging Face** for model utilization.
* **Vector DB:** The use of a Vector Database is non-negotiable for meeting the low-latency performance requirements (NFR-PER-003, NFR-PER-004) for the AI features, as it avoids slow, traditional database searches for content relevance.

### B. Handling External Integrations

* **Asynchronous I/O:** The Job Aggregation and Gmail Integration tasks involve many external API calls. Using asynchronous capabilities (like Node.js or FastAPI's non-blocking I/O) is necessary to keep the system responsive while waiting for external services.
* **Security:** The dedicated External Integrations Service will ensure that secure protocols like **OAuth 2.0** are strictly used for the Gmail connection, centralizing security and minimizing risk (NFR-SEC-003).

### C. Ensuring High Availability

* **Caching Layer (Redis):** A fast, in-memory cache should be implemented in front of the primary database and the AI inference server to meet the $\le 3$ second dashboard load time and reduce the cost of repeated AI calls.

---

The next logical step, before initiating development, is to formalize the environment setup. We can define the detailed **Technical Dependencies** (the specific libraries, versions, and deployment tools) for this stack.

Would you like to proceed with defining the **Detailed Dependencies and Tooling**?