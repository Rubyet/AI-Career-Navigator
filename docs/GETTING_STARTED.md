# Getting Started

This guide will help you set up and run the AI Career Navigator locally using Docker.

## Prerequisites Checklist

- [ ] Docker Desktop installed and running
- [ ] Git installed
- [ ] OpenAI API key obtained
- [ ] At least 8GB RAM available
- [ ] 10GB free disk space

## Step-by-Step Setup

### 1. Clone and Navigate

```powershell
git clone https://github.com/yourusername/AI-Career-Navigator.git
cd AI-Career-Navigator
```

### 2. Configure Environment

```powershell
Copy-Item .env.example -Destination .env
```

Edit `.env` and add your OpenAI API key and secure passwords.

### 3. Start Services

```powershell
# Start all services in detached mode
docker-compose up -d

# Watch logs (Ctrl+C to exit, services keep running)
docker-compose logs -f
```

### 4. Wait for Initialization

The first run takes 5-10 minutes because:
- Docker downloads base images
- npm/pip install dependencies
- Database schema is initialized
- AI models are downloaded (~500MB)

### 5. Verify Services

```powershell
# Check if all services are running
docker-compose ps

# Should show:
# - frontend (port 3000)
# - backend (port 5000)
# - ai-engine (port 8000)
# - postgres (port 5432)
# - redis (port 6379)
```

### 6. Access Application

Open browser to http://localhost:3000

## Common Commands

```powershell
# Stop all services
docker-compose down

# Stop and remove all data
docker-compose down -v

# Rebuild after code changes
docker-compose up -d --build

# View logs
docker-compose logs -f [service-name]

# Access database
docker-compose exec postgres psql -U postgres -d ai_career_navigator
```

## Next Steps

1. Create an account or login with demo credentials
2. Set your job preferences in Profile
3. Explore the Job Search section
4. Track applications in Application Tracker
5. Add skills to study in Study Area

## Need Help?

- Check the [Troubleshooting](../README.md#troubleshooting) section
- View logs: `docker-compose logs -f`
- Open an issue on GitHub
