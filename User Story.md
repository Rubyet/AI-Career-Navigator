# 📚 User Stories for AI Career Navigator

## Document Version: 1.1
### Date: November 3, 2025

---

## 1. Job Search and Matching (AI-Powered)

These stories focus on the system's ability to find relevant jobs and analyze the user's fit.

| ID | User Story | Related SRS Requirement |
| :--- | :--- | :--- |
| **US-JSM-01** | As a **Job Seeker**, I want to **save my desired job criteria** (e.g., role, location, tech stack), so that the system knows what to search for. | FR-JSM-001 |
| **US-JSM-02** | As a **Job Seeker**, I want the system to **automatically search and aggregate jobs** from multiple sites daily using AI, so that I don't miss new opportunities. | FR-JSM-002 |
| **US-JSM-03** | As a **Job Seeker**, I want to see a **direct link to the original job post**, so that I can easily go to the source to apply. | FR-JSM-003 |
| **US-JSM-04** | As a **Job Seeker**, I want the AI to **compare my profile against a job's requirements**, so that I can immediately see my fit for the role. | FR-JSM-004 |
| **US-JSM-05** | As a **Job Seeker**, I want the job listing to **visually mark requirements I match and those I don't**, so that I can quickly gauge my skill gaps. | FR-JSM-005 |

---

## 2. Skill Gap Analysis and Study

These stories cover the generation of study material and the core functionality of the new interactive chatbot.

| ID | User Story | Related SRS Requirement |
| :--- | :--- | :--- |
| **US-SGS-01** | As a **Job Seeker**, I want to **click on an unmatched job requirement** to add it to my study list, so that I can immediately start working on my skill gaps. | FR-SGS-001 |
| **US-SGS-02** | As a **Job Seeker**, I want a **dedicated Study section** that organizes all my saved topics, so that I have a clear curriculum for my interview prep. | FR-SGS-002 |
| **US-SGS-03** | As a **Job Seeker**, I want the AI to **curate interview questions and examples** for each study topic, so that my preparation is targeted and efficient. | FR-SGS-003, FR-SGS-004 |
| **US-SGS-04** | As a **Student**, I want a **Study Chatbot** in the study area, so that I can ask questions and get instant help when I get stuck on a concept. | FR-SGS-005, FR-SGS-006 |
| **US-SGS-05** | As a **Student**, I want the Chatbot to **offer related reading suggestions**, so that I can deepen my understanding of a topic. | FR-SGS-007 |
| **US-SGS-06** | As a **Student**, I want the Chatbot's answers to be **focused on my current study topic**, so that I don't get distracted by irrelevant information. | FR-SGS-008 |

---

## 3. Application and Progress Tracking

These stories detail the requirements for the job application manager and email integration.

| ID | User Story | Related SRS Requirement |
| :--- | :--- | :--- |
| **US-APT-01** | As a **Job Seeker**, I want an **"Interested to Apply" button** on a job listing, so that I can easily track it. | FR-APT-001, FR-APT-002 |
| **US-APT-02** | As a **Job Seeker**, I want the **Application Tracker** to record deadlines and application dates, so that I can manage my follow-ups effectively. | FR-APT-003 |
| **US-APT-03** | As a **Job Seeker**, I want to receive a **notification reminder** before a job's application deadline, so that I don't miss the chance to apply. | FR-APT-004 |
| **US-APT-04** | As a **Job Seeker**, I want to be able to **manually update the status** of an application, so that my tracker always reflects my progress. | FR-APT-005 |
| **US-APT-05** | As a **Job Seeker**, I want the option to **link my Gmail account** securely, so that the system can automatically detect and update application statuses from emails. | FR-APT-006, FR-APT-007 |
| **US-APT-06** | As a **Job Seeker**, I want to **record the outcome and shortcomings** of rejected applications, so that I can learn from my mistakes for future interviews. | FR-APT-008 |

---

## 4. Profile and Skill Progression

These stories relate to how the user's progress in the study area directly updates their professional profile and matching accuracy.

| ID | User Story | Related SRS Requirement |
| :--- | :--- | :--- |
| **US-PSP-01** | As a **User**, I want the system to **track my study progress** for each topic, so that I can see how close I am to mastery. | FR-PSP-001 |
| **US-PSP-02** | As a **User**, I want to be able to **mark a skill as mastered**, so that I can confirm my competence to the system. | FR-PSP-002 |
| **US-PSP-03** | As a **User**, I want my **profile/tech stack to automatically update** when I master a new skill, so that my profile is always current. | FR-PSP-003 |
| **US-PSP-04** | As a **User**, I want my **updated skills to immediately improve my job match results**, so that I see more relevant and highly matching jobs. | FR-PSP-004 |