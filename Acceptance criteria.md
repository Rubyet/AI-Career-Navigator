# 🧪 Test Cases and Acceptance Criteria

## Project: AI Career Navigator

### Document Section: Quality Assurance (QA)
### Document Version: 1.0

---

## 1. Job Search and Matching Tests

| US ID | Acceptance Criteria | Test Case | Expected Result |
| :--- | :--- | :--- | :--- |
| **US-JSM-01** | User must be able to successfully save and retrieve all job preference parameters. | Verify that custom preferences (e.g., "Python Developer," "Remote," "$100k+") are saved and load correctly upon refresh. | Saved preferences persist and filter the job view. |
| **US-JSM-02** | The system must list at least 50 relevant jobs within 60 minutes of the scheduled daily run. | Monitor the system logs and the Job Listing database 60 minutes after the daily aggregation starts. | New job entries are present, and the process completes without critical failure. |
| **US-JSM-04** | The AI match score must change appropriately when the user's profile is updated. | 1. Profile lacks 'SQL'. Match job requiring 'SQL' (Score: Low). 2. Add 'SQL' to Profile. 3. Re-match the same job. | Match score increases significantly after the profile update. |
| **US-JSM-05** | Skill gaps must be visibly distinguished on the job detail page. | View a job listing where the user has 3 matched skills and 2 unmatched skills (gaps). | Matched skills are highlighted green; unmatched skills are clearly marked (e.g., in red or yellow). |

---

## 2. Skill Gap and Study Chatbot Tests

| US ID | Acceptance Criteria | Test Case | Expected Result |
| :--- | :--- | :--- | :--- |
| **US-SGS-01** | Unmatched skills must be clickable and successfully added to the study list. | Click a gap (e.g., 'AWS Lambda') on a job detail page, and check the 'Study' section. | 'AWS Lambda' is immediately added as a new study topic in the dedicated section. |
| **US-SGS-03** | Curated study material must be generated within 10 seconds. | Submit a new, complex study topic (e.g., 'Generative AI RAG Architecture') and measure load time. | Structured content (Q&A, explanations) appears, and the generation time is $\le$ 10 seconds. |
| **US-SGS-04/06** | The Study Chatbot must provide relevant, accurate, and context-aware responses. | 1. Start a study session on 'Python Decorators'. 2. Ask the chatbot: "How do I implement a rate limiter in Python?" | The chatbot provides code and explanation specifically using Python decorators and related concepts. |
| **US-SGS-06/NFR-PER-004**| Chatbot response time must be minimal (under 3 seconds). | Ask a standard question to the Chatbot and measure the time until the response is complete. | Chatbot provides a full response in $\le$ 3 seconds. |
| **US-SGS-07** | The Chatbot must suggest related learning paths. | Ask the Chatbot: "I'm done with Decorators, what's next?" | The Chatbot suggests relevant, logically following topics (e.g., 'Context Managers' or 'Metaclasses'). |

---

## 3. Application and Progress Tracking Tests

| US ID | Acceptance Criteria | Test Case | Expected Result |
| :--- | :--- | :--- | :--- |
| **US-APT-01** | Clicking the 'Track' button correctly populates the Application Tracker. | Click 'Interested to Apply' on Job ID 123. Verify the tracker has a new entry with Job Title, Company, and URL. | A new record is created in the Application Tracker with auto-filled data. |
| **US-APT-04** | Application status can be manually updated and saved instantly. | Change the status of a job from 'Applied' to 'Interviewing'. | The new status is reflected in the tracker list and persists on refresh. |
| **US-APT-05** | Gmail integration successfully identifies and updates application status. | 1. User integrates Gmail. 2. Send the user a test email with the subject line "Your application for [Job Title] has been rejected." | The corresponding job record in the tracker automatically updates the status to 'Rejected' (FR-APT-007). |
| **US-APT-03** | Reminder notifications are sent at the scheduled time. | Set a job deadline for tomorrow at 9:00 AM. Check the user's notification system (e.g., in-app alert) at 9:00 AM tomorrow. | An alert or notification appears prompting the user to apply/follow up. |

---

## 4. Profile and Skill Progression Tests

| US ID | Acceptance Criteria | Test Case | Expected Result |
| :--- | :--- | :--- | :--- |
| **US-PSP-02/03** | Marking a skill as mastered updates the user's profile and Tech Stack. | Mark 'AWS Lambda' as mastered in the Study section. Check the user's main profile/preferences page. | 'AWS Lambda' is added to the user's official list of mastered skills. |
| **US-PSP-04** | Updated skills must immediately influence job matching calculations. | 1. Repeat the **US-JSM-04** test flow where the job requires 'SQL'. 2. Verify that the job match score is instantly high after 'SQL' is marked as mastered. | The system uses the new skill in the matching algorithm without requiring a system restart or delay. |

---

These test cases provide a solid framework for your QA team.

With the SRS, User Stories, Architecture, and Test Cases complete, you have a strong documentation foundation. What documentation or planning step would you like to take next? We could define the **Technical Stack and Dependencies** or draft a **Deployment Plan**.