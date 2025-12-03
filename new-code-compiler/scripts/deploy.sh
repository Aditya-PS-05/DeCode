#!/bin/bash

set -e

echo "🚀 Deploying Code Compiler to Hetzner Cloud..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${BLUE}Creating .env file from .env.example...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✓ .env file created${NC}"
fi

# Pull latest changes (if using git)
if [ -d .git ]; then
    echo -e "${BLUE}Pulling latest changes...${NC}"
    git pull
    echo -e "${GREEN}✓ Code updated${NC}"
fi

# Stop existing containers
echo -e "${BLUE}Stopping existing containers...${NC}"
docker-compose -f docker-compose.prod.yaml down || true
echo -e "${GREEN}✓ Containers stopped${NC}"

# Build and start containers
echo -e "${BLUE}Building and starting containers...${NC}"
docker-compose -f docker-compose.prod.yaml up -d --build

# Wait for services to be healthy
echo -e "${BLUE}Waiting for services to be healthy...${NC}"
sleep 10

# Check service status
echo -e "${BLUE}Checking service status...${NC}"
docker-compose -f docker-compose.prod.yaml ps

# Test API endpoint
echo -e "${BLUE}Testing API endpoint...${NC}"
if curl -f http://localhost:8080/languages > /dev/null 2>&1; then
    echo -e "${GREEN}✓ API is responding${NC}"
else
    echo -e "${RED}✗ API is not responding${NC}"
    exit 1
fi

echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo -e "${BLUE}API is available at: http://$(curl -s ifconfig.me):8080${NC}"
echo -e "${BLUE}To view logs: docker-compose -f docker-compose.prod.yaml logs -f${NC}"
