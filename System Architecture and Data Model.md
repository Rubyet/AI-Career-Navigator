# 🏛️ System Architecture and Data Model

## Project: AI Career Navigator

### Document Section: Architecture & Data
### Document Version: 1.0

---

## 1. High-Level System Architecture (Three-Tier AI-Enhanced)

The AI Career Navigator will utilize a **Three-Tier Architecture** (Presentation, Application, Data) with a specialized **AI Services Layer** to handle computationally intensive and generative tasks (matching, skill analysis, chatbot).

### 1.1 Architecture Diagram



### 1.2 Component Breakdown

| Layer | Component | Description | Related FR |
| :--- | :--- | :--- | :--- |
| **I. Presentation Layer** | **Web Application (SPA)** | The client-side application built using a modern JavaScript framework (e.g., React, Vue). Handles the UI, user input, and displaying data. | NFR-US-001 |
| **II. Application Layer** | **API Gateway** | Entry point for all client requests. Handles authentication, rate limiting, and routing requests to the appropriate backend service. | NFR-SEC-002 |
| | **Core Backend Services** | Server-side logic (e.g., Node.js/Python microservices). Manages CRUD operations, user sessions, and business logic for the tracker. | FR-APT-005 |
| | **External Integrations Service** | Handles secure, authorized communication with **Third-Party Job APIs** for aggregation and the **Gmail API** for status updates. | FR-JSM-002, FR-APT-006 |
| | **Scheduled Processor** | A cron or serverless function that runs daily to trigger job aggregation and background data processing. | NFR-PER-002 |
| **III. AI Services Layer** | **AI Job Match Engine** | Uses NLP/LLM to parse job descriptions, compare them to the user's profile, and calculate a match score and skill gaps. | FR-JSM-004, FR-JSM-005 |
| | **AI Content Generator** | Fetches, summarizes, and structures interview questions and explanations for study topics. | FR-SGS-003, FR-SGS-004 |
| | **AI Study Chatbot (LLM)** | The dedicated model that handles conversational queries in the study area, maintaining context. Must meet low-latency NFRs. | FR-SGS-006, NFR-PER-003, NFR-PER-004 |
| **IV. Data Layer** | **Primary Database (SQL/NoSQL)** | Stores structured data: User Profiles, Application Tracker records, Company details, and Skill Mastery history. | NFR-SEC-001 |
| | **Vector Database** | Stores vectorized embeddings of **Job Descriptions** and **Study Material** for high-speed semantic search and matching, crucial for AI tasks. | FR-JSM-004, FR-SGS-003 |

---

## 2. High-Level Data Model (Entities and Relationships)

The core data model revolves around the **User**, the **Job** (or Application), and the **Skill/Study Topic**.

### 2.1 Entity Relationship Diagram (Conceptual)



### 2.2 Key Entities and Fields

| Entity | Key Fields | Description | Related FR |
| :--- | :--- | :--- | :--- |
| **USER** | `user_id` (PK), `email`, `password_hash`, `preferences` (JSON), `current_tech_stack` (Array), `study_progress` (Ref) | Stores user credentials and personalization data. | FR-JSM-001, FR-PSP-003 |
| **JOB_LISTING** | `job_id` (PK), `external_url`, `title`, `company`, `description_text`, `required_skills` (Array), `description_embedding` (Vector) | The raw aggregated job data. | FR-JSM-002, FR-JSM-003 |
| **JOB_APPLICATION** | `application_id` (PK), `user_id` (FK), `job_id` (FK), `status` (Enum: Applied, Interviewing, Rejected, etc.), `application_date`, `deadline`, `outcome_notes` | The application tracker record. | FR-APT-002, FR-APT-005 |
| **SKILL_TOPIC** | `topic_id` (PK), `topic_name` (e.g., 'Kubernetes'), `source_job_id` (FK), `is_mastered` (Boolean), `study_content` (Ref to generated material) | The item added to the "Study" section based on a skill gap. | FR-SGS-001, FR-PSP-002 |
| **STUDY_CONTENT** | `content_id` (PK), `topic_id` (FK), `interview_q_a` (JSON), `explanations_text`, `embedding` (Vector) | The curated learning material and context for the chatbot. | FR-SGS-003, FR-SGS-008 |
| **CHAT_HISTORY** | `chat_id` (PK), `user_id` (FK), `topic_id` (FK), `timestamp`, `message_role` (User/AI), `message_text` | Stores the conversation history for context awareness. | NFR-US-003 |

---

This documentation provides the technical backbone needed before detailed design and coding can begin.
