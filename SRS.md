# 📄 Software Requirements Specification (SRS)

## Project: AI Career Navigator

### Document Version: 1.1 
### Date: November 3, 2025
### Prepared By: Rubyet Hossain

---

## 1. Introduction

### 1.1 Purpose
The purpose of this document is to specify the detailed functional and non-functional requirements for the **AI Career Navigator**, a web application that leverages advanced AI capabilities to assist users with job searching, application management, and continuous skill development for career advancement.

### 1.2 Product Scope
The AI Career Navigator will be a single-page web application accessible via a standard web browser. It will primarily cover two core functional areas: **AI Job Search & Application Management** and **AI-Powered Study & Skill Development**.

### 1.3 Intended Audience
This document is a technical guide for all project stakeholders, including project managers, product owners, development teams, and quality assurance (QA) testers.

---

## 2. Functional Requirements (FR)

### 2.1 Job Search and Matching (AI-Powered)

| ID | Requirement Description |
| :--- | :--- |
| **FR-JSM-001** | The system **shall** allow the user to input and save their detailed **job preferences** (e.g., role, location, salary, core tech stack). |
| **FR-JSM-002** | The system **shall** use AI to **aggregate and list job listings** from all configured external job sites daily based on user preferences. |
| **FR-JSM-003** | The system **shall** provide a **direct clickable link** to the original job post for quick application and full requirement viewing. |
| **FR-JSM-004** | The system **shall** use AI to **analyze each job post's requirements** against the user's recorded skills and experience profile. |
| **FR-JSM-005** | The system **shall** visually and clearly **highlight/mark** which job requirements the user meets and which are currently identified as **skill gaps**. |

### 2.2 Skill Gap Analysis and Study Material Generation

| ID | Requirement Description |
| :--- | :--- |
| **FR-SGS-001** | The system **shall** make every unmet requirement (identified in FR-JSM-005) **clickable** to add it as a "Study Material" topic. |
| **FR-SGS-002** | The system **shall** have a dedicated **"Study" section** organized by the added topics. |
| **FR-SGS-003** | The system **shall** use AI to **fetch and curate** relevant interview questions, explanations, and examples from across the internet for each study topic. |
| **FR-SGS-004** | The system **shall** present the curated study content in a structured, easy-to-study format, optimizing for interview preparation. |
| **FR-SGS-005** | The system **shall** provide an **interactive Study Chatbot interface** within the Study section. |
| **FR-SGS-006** | The Chatbot **shall** be able to answer user questions related to the current study material topics, providing clear explanations and examples when the user is stuck. |
| **FR-SGS-007** | The Chatbot **shall** be able to suggest further reading or related sub-topics to facilitate deeper learning. |
| **FR-SGS-008** | The Chatbot's responses **shall be context-aware**, prioritizing information relevant to the user's current study topic for enhanced focus. |

### 2.3 Application and Progress Tracking

| ID | Requirement Description |
| :--- | :--- |
| **FR-APT-001** | The system **shall** provide an easily accessible **"Interested to Apply" button** on each job listing. |
| **FR-APT-002** | Clicking the button **shall** automatically add the job to the dedicated **Application Tracker** table, recording all relevant job and company information. |
| **FR-APT-003** | The tracker **shall** record and display the application deadline and allow manual entry of other important dates. |
| **FR-APT-004** | The system **shall** send the user a notification/reminder to apply based on the recorded deadline. |
| **FR-APT-005** | The Application Tracker **shall** allow the user to manually update the job status (e.g., Applied, Interviewing, Rejected). |
| **FR-APT-006** | The system **shall** offer optional integration with **Gmail** (requiring explicit user authorization) to monitor email updates for applied jobs. |
| **FR-APT-007** | The system **shall** use information from Gmail (when integrated) to **automatically notify the user** and update the job status in the tracker. |
| **FR-APT-008** | The tracker **shall** include fields to record the **result** and identified **shortcomings** for post-application analysis. |

### 2.4 Profile and Skill Progression

| ID | Requirement Description |
| :--- | :--- |
| **FR-PSP-001** | The system **shall** record and display the user's **study progress** for each study material topic. |
| **FR-PSP-002** | The system **shall** allow the user to confirm completion or mastery of a study topic/skill. |
| **FR-PSP-003** | Upon mastery confirmation, the system **shall** automatically **add the skill** to the user's internal "Tech Stack" profile. |
| **FR-PSP-004** | The updated Tech Stack **shall** be used to **increase job match accuracy** (FR-JSM-004) and broaden the range of suitable job suggestions. |

---

## 3. Non-Functional Requirements (NFR)

### 3.1 Performance
* **NFR-PER-001:** The main application dashboard and section loads **shall not exceed 3 seconds** for 95% of user interactions.
* **NFR-PER-002:** The AI job aggregation and matching process shall be completed and ready for the user within **60 minutes** of the scheduled daily run.
* **NFR-PER-003:** The Study Chatbot **shall** deliver a complete and relevant response to a user query within **3 seconds** (latency requirement).

### 3.2 Security
* **NFR-SEC-001:** User data, including profile details and application history, shall be protected using **industry-standard encryption (AES-256)** at rest.
* **NFR-SEC-002:** Access to the user's profile and data requires **secure user authentication** (e.g., hashed passwords, HTTPS).
* **NFR-SEC-003:** The Gmail integration must be implemented using **OAuth 2.0** and adhere strictly to Google's API policies regarding data usage and user consent, with data only used for status updates.

### 3.3 Usability and Interface (UX/UI)
* **NFR-US-001:** The application **shall be fully responsive**, providing a seamless experience across desktop and major mobile browser views.
* **NFR-US-002:** The application design shall be **clean and intuitive**, allowing a new user to understand the main functions within five minutes of first use.
* **NFR-US-003:** The Chatbot interface shall clearly distinguish **user messages** from **AI responses** and maintain a searchable history of the conversation for the current session.

### 3.4 Reliability and Availability
* **NFR-REL-001:** The system shall maintain an overall uptime of **99.9%** (excluding scheduled maintenance).
* **NFR-REL-002:** The job aggregation process shall implement robust **error handling and retry mechanisms** for API failures from external job sites.

---

## 4. Technical Constraints

* **TC-001:** The final product must be a single **web application** (i.e., not a native mobile application).
* **TC-002:** The backend architecture must be capable of integrating with multiple third-party job board APIs and the **Google (Gmail) API**.
* **TC-003:** An extensible **AI/ML framework** must be used for job matching, content curation, and powering the interactive chatbot.