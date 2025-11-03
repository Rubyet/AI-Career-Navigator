# 🚀 AI Career Navigator

A comprehensive web application that integrates AI capabilities to streamline the job search, application management, and skill-building process. Built with a modern microservices architecture, fully containerized with Docker for easy local development and production deployment.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Development](#development)
- [Production Deployment](#production-deployment)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)

## ✨ Features

### 🎯 AI-Powered Job Search & Matching
- Automated daily job aggregation from multiple sources
- AI-driven job matching based on your skills
- Visual skill gap analysis for each job listing
- Direct links to original job postings

### 📊 Application Tracker
- Centralized application management dashboard
- Status tracking (Interested, Applied, Interviewing, Offer, Rejected)
- Deadline reminders and notifications
- Gmail integration for automatic status updates
- Post-rejection analysis and learning

### 📚 AI-Powered Study Area
- Auto-generated study materials from skill gaps
- Curated interview questions and answers
- Interactive AI chatbot for learning assistance
- Progress tracking and skill mastery confirmation
- Automatic profile updates when skills are mastered

### 👤 Profile & Preferences
- Customizable job search preferences
- Tech stack management
- Career progression tracking

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Redux Toolkit** for state management
- **Axios** for API communication

### Backend API
- **Node.js** with Express/Fastify
- **TypeScript**
- **PostgreSQL** with PgVector
- **Redis** for caching
- **JWT** for authentication
- **Passport.js** for OAuth

### AI Engine
- **Python 3.11** with FastAPI
- **OpenAI GPT** for content generation
- **LangChain** for RAG pipeline
- **Sentence Transformers** for embeddings
- **spaCy** for NLP
- **PgVector** for semantic search

### Infrastructure
- **Docker** & **Docker Compose**
- **PostgreSQL** with **PgVector** extension
- **Redis** for caching and sessions
- **Nginx** as reverse proxy

## 🏗 Architecture

```
┌─────────────┐
│   Nginx     │ (Reverse Proxy)
└──────┬──────┘
       │
   ┌───┴────────────────┬──────────────┐
   │                    │              │
┌──▼──────┐      ┌─────▼─────┐  ┌────▼────────┐
│ Frontend│      │  Backend  │  │  AI Engine  │
│ (React) │      │ (Node.js) │  │  (Python)   │
└─────────┘      └─────┬─────┘  └──────┬──────┘
                       │                │
              ┌────────┴────────┬───────┘
              │                 │
        ┌─────▼──────┐    ┌────▼─────┐
        │ PostgreSQL │    │  Redis   │
        │ + PgVector │    │          │
        └────────────┘    └──────────┘
```

## 📦 Prerequisites

- **Docker Desktop** (Windows/Mac) or **Docker Engine** + **Docker Compose** (Linux)
- **Git**
- **OpenAI API Key** (for AI features)
- (Optional) **Google OAuth Credentials** (for Gmail integration)

### System Requirements
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 10GB free space
- **OS**: Windows 10/11, macOS 10.15+, or Linux

## 🚀 Quick Start

### 1. Clone the Repository

```powershell
git clone https://github.com/yourusername/AI-Career-Navigator.git
cd AI-Career-Navigator
```

### 2. Configure Environment Variables

Copy the example environment file and update with your credentials:

```powershell
Copy-Item .env.example -Destination .env
```

**Edit `.env` file** and add your API keys:

```env
# OpenAI API Key (Required)
OPENAI_API_KEY=sk-your-openai-key-here

# Database Password (Change this!)
POSTGRES_PASSWORD=your_secure_password_here

# JWT Secret (Generate a strong random string)
JWT_SECRET=your-super-secret-jwt-key-change-this

# Google OAuth (Optional - for Gmail integration)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 3. Start the Application

```powershell
docker-compose up -d
```

This will:
- Build all Docker images (first time only, takes 5-10 minutes)
- Start all services (Frontend, Backend, AI Engine, Database, Redis)
- Initialize the database with schema and sample data

### 4. Access the Application

Open your browser and navigate to:
- **Application**: http://localhost:3000
- **Backend API**: http://localhost:5000/health
- **AI Engine**: http://localhost:8000/health

**Default Login Credentials (Development)**:
- Email: `demo@example.com`
- Password: `password` (update the hash in database/init/01-schema.sql)

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `POSTGRES_PASSWORD` | PostgreSQL password | - | ✅ |
| `JWT_SECRET` | Secret for JWT tokens | - | ✅ |
| `OPENAI_API_KEY` | OpenAI API key | - | ✅ |
| `HUGGINGFACE_TOKEN` | HuggingFace token | - | ❌ |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | - | ❌ |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret | - | ❌ |
| `BACKEND_PORT` | Backend API port | 5000 | ❌ |
| `VITE_API_URL` | Frontend API URL | http://localhost:5000 | ❌ |

### API Keys Setup

#### OpenAI API Key
1. Go to https://platform.openai.com/api-keys
2. Create a new API key
3. Add to `.env` file

#### Google OAuth (Optional)
1. Go to https://console.cloud.google.com/
2. Create a new project or select existing
3. Enable Gmail API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:5000/auth/google/callback`
6. Add credentials to `.env` file

## 💻 Development

### View Logs

```powershell
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f ai-engine
docker-compose logs -f frontend
```

### Stop Services

```powershell
docker-compose down
```

### Rebuild After Code Changes

```powershell
# Rebuild all services
docker-compose up -d --build

# Rebuild specific service
docker-compose up -d --build backend
```

### Access Database

```powershell
docker-compose exec postgres psql -U postgres -d ai_career_navigator
```

### Access Redis CLI

```powershell
docker-compose exec redis redis-cli
```

### Run Backend Commands

```powershell
docker-compose exec backend npm run lint
```

### Run AI Engine Commands

```powershell
docker-compose exec ai-engine python -m pytest
```

## 🚢 Production Deployment

### 1. Update Environment Variables

Create a `.env.production` file with production values:

```env
NODE_ENV=production
DATABASE_URL=postgresql://user:password@prod-db-host:5432/ai_career_navigator
POSTGRES_PASSWORD=very-secure-production-password
JWT_SECRET=very-secure-random-string-at-least-64-characters
OPENAI_API_KEY=sk-prod-key
GOOGLE_CLIENT_ID=prod-client-id
GOOGLE_CLIENT_SECRET=prod-client-secret
GOOGLE_REDIRECT_URI=https://yourdomain.com/auth/google/callback
VITE_API_URL=https://api.yourdomain.com
```

### 2. Build Production Images

```powershell
docker-compose -f docker-compose.prod.yml build
```

### 3. Deploy

```powershell
docker-compose -f docker-compose.prod.yml up -d
```

### 4. Setup SSL with Let's Encrypt

Update `nginx/nginx.conf` with SSL configuration and domain name, then:

```bash
# Install certbot
apt-get install certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### Deployment Options

1. **VPS** (DigitalOcean, Linode, AWS EC2)
2. **Container Platform** (AWS ECS, Google Cloud Run, Azure Container Instances)
3. **Kubernetes** (for large scale)

## 📚 API Documentation

### Backend API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

#### User
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

#### Jobs
- `GET /api/jobs` - List job listings
- `GET /api/jobs/:id` - Get job details with AI matching

#### Applications
- `GET /api/applications` - List user applications
- `POST /api/applications` - Create application
- `PUT /api/applications/:id` - Update application
- `DELETE /api/applications/:id` - Delete application

#### Study
- `GET /api/study/topics` - List study topics
- `POST /api/study/topics` - Create study topic
- `PUT /api/study/topics/:id` - Update topic progress
- `GET /api/study/topics/:id/content` - Get study content
- `POST /api/study/chat` - Chat with AI

### AI Engine API Endpoints

- `POST /api/aggregate-jobs` - Aggregate jobs (cron job)
- `POST /api/match-job` - Match job with user skills
- `POST /api/generate-content` - Generate study content
- `POST /api/chat` - AI chatbot

## 📁 Project Structure

```
AI-Career-Navigator/
├── frontend/               # React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Redux store and slices
│   │   ├── services/      # API services
│   │   └── App.tsx
│   ├── Dockerfile
│   └── package.json
│
├── backend/               # Node.js/Express API
│   ├── src/
│   │   ├── config/       # Configuration files
│   │   ├── middleware/   # Express middleware
│   │   ├── routes/       # API routes
│   │   ├── jobs/         # Cron jobs
│   │   └── server.ts
│   ├── Dockerfile
│   └── package.json
│
├── ai-engine/            # Python/FastAPI service
│   ├── app/
│   │   ├── api/          # API endpoints
│   │   ├── core/         # Core configuration
│   │   ├── db/           # Database connection
│   │   ├── services/     # AI services (LLM, embeddings)
│   │   └── main.py
│   ├── Dockerfile
│   └── requirements.txt
│
├── database/             # Database initialization
│   └── init/
│       └── 01-schema.sql
│
├── nginx/                # Nginx configuration
│   └── nginx.conf
│
├── docker-compose.yml    # Development compose file
├── docker-compose.prod.yml # Production compose file
├── .env.example          # Example environment variables
└── README.md
```

## 🐛 Troubleshooting

### Port Already in Use

If you get a port conflict error:

```powershell
# Find process using the port
netstat -ano | findstr :3000

# Kill the process (replace PID)
taskkill /PID <PID> /F
```

### Database Connection Errors

```powershell
# Check if PostgreSQL is running
docker-compose ps postgres

# View PostgreSQL logs
docker-compose logs postgres

# Restart PostgreSQL
docker-compose restart postgres
```

### Frontend Not Loading

```powershell
# Rebuild frontend
docker-compose up -d --build frontend

# Check logs
docker-compose logs -f frontend
```

### AI Engine Errors

Common issues:
- **Missing API Key**: Ensure `OPENAI_API_KEY` is set in `.env`
- **Model Download**: First run downloads embedding models (~500MB)

```powershell
# View AI engine logs
docker-compose logs -f ai-engine
```

### Clear All Data and Restart

```powershell
# Stop and remove all containers and volumes
docker-compose down -v

# Rebuild and start
docker-compose up -d --build
```

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

**Built with ❤️ by Rubyet Hossain**