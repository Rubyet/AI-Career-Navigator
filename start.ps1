# AI Career Navigator - Quick Start Script

Write-Host "🚀 AI Career Navigator - Setup Script" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""

# Check if Docker is running
Write-Host "Checking prerequisites..." -ForegroundColor Yellow
$dockerRunning = docker info 2>&1 | Select-String "Server Version"
if (-not $dockerRunning) {
    Write-Host "❌ Docker is not running. Please start Docker Desktop first." -ForegroundColor Red
    exit 1
}
Write-Host "✅ Docker is running" -ForegroundColor Green

# Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host "⚠️  .env file not found. Creating from .env.example..." -ForegroundColor Yellow
    Copy-Item .env.example -Destination .env
    Write-Host "✅ Created .env file" -ForegroundColor Green
    Write-Host ""
    Write-Host "⚠️  IMPORTANT: Please edit .env and add your API keys before continuing!" -ForegroundColor Red
    Write-Host "   Required: OPENAI_API_KEY, JWT_SECRET, POSTGRES_PASSWORD" -ForegroundColor Yellow
    Write-Host ""
    $continue = Read-Host "Have you updated the .env file? (yes/no)"
    if ($continue -ne "yes") {
        Write-Host "Please update .env file and run this script again." -ForegroundColor Yellow
        exit 0
    }
} else {
    Write-Host "✅ .env file found" -ForegroundColor Green
}

Write-Host ""
Write-Host "Starting services..." -ForegroundColor Yellow
Write-Host "This may take 5-10 minutes on first run (downloading images and dependencies)" -ForegroundColor Cyan
Write-Host ""

# Start services
docker-compose up -d

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ All services started successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📊 Service Status:" -ForegroundColor Cyan
    docker-compose ps
    Write-Host ""
    Write-Host "🌐 Access the application:" -ForegroundColor Cyan
    Write-Host "   Frontend:   http://localhost:3000" -ForegroundColor White
    Write-Host "   Backend:    http://localhost:5000/health" -ForegroundColor White
    Write-Host "   AI Engine:  http://localhost:8000/health" -ForegroundColor White
    Write-Host ""
    Write-Host "📝 Useful commands:" -ForegroundColor Cyan
    Write-Host "   View logs:     docker-compose logs -f" -ForegroundColor White
    Write-Host "   Stop services: docker-compose down" -ForegroundColor White
    Write-Host "   Restart:       docker-compose restart" -ForegroundColor White
    Write-Host ""
    Write-Host "⏳ Services are initializing. Check logs with: docker-compose logs -f" -ForegroundColor Yellow
    Write-Host ""
    
    $openBrowser = Read-Host "Would you like to open the application in your browser? (yes/no)"
    if ($openBrowser -eq "yes") {
        Start-Process "http://localhost:3000"
    }
} else {
    Write-Host ""
    Write-Host "❌ Failed to start services. Check the error messages above." -ForegroundColor Red
    Write-Host "   Try running: docker-compose logs" -ForegroundColor Yellow
}
