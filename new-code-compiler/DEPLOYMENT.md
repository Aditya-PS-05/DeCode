# Deployment Guide - Hetzner Cloud

Complete guide to deploy the Code Compiler backend on Hetzner Cloud.

## Prerequisites

- Hetzner Cloud account (verified)
- SSH key pair
- Domain name (optional, but recommended)

## Step 1: Create Hetzner Cloud Server

### 1.1 Login to Hetzner Cloud Console
- Go to https://console.hetzner.cloud/
- Login with your verified account

### 1.2 Create New Project
- Click "New Project"
- Name it: "code-compiler" (or your preferred name)

### 1.3 Create Server
Click "Add Server" and configure:

**Location**: Choose closest to your users
- Falkenstein, Germany (eu-central)
- Helsinki, Finland (eu-north)
- Ashburn, USA (us-east)

**Image**: Ubuntu 22.04 or 24.04

**Type**: Recommended options
- **CX22** (2 vCPUs, 4 GB RAM) - €5.83/month - Minimum recommended
- **CX32** (4 vCPUs, 8 GB RAM) - €11.66/month - Recommended for production
- **CX42** (8 vCPUs, 16 GB RAM) - €23.31/month - For high traffic

**Networking**:
- IPv4: ✓ Enabled
- IPv6: ✓ Enabled (optional)

**SSH Key**:
- Add your SSH public key (or create new one)
- Name it (e.g., "my-laptop")

**Firewall** (Create new):
- Name: "code-compiler-fw"
- Inbound Rules:
  - SSH: Port 22 (TCP) - Your IP only (recommended)
  - HTTP: Port 80 (TCP) - 0.0.0.0/0
  - HTTPS: Port 443 (TCP) - 0.0.0.0/0
  - API: Port 8080 (TCP) - 0.0.0.0/0

**Volume**: Not needed for now

**Server Name**: code-compiler-server

**Cost**: Review and click "Create & Buy Now"

### 1.4 Note Server IP
- Copy the server IP address (e.g., 95.216.xxx.xxx)

---

## Step 2: Initial Server Setup

### 2.1 Connect to Server
```bash
ssh root@YOUR_SERVER_IP
```

### 2.2 Update System
```bash
apt update && apt upgrade -y
```

### 2.3 Install Docker
```bash
# Install dependencies
apt install -y apt-transport-https ca-certificates curl software-properties-common

# Add Docker GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Verify installation
docker --version
docker compose version
```

### 2.4 Install Additional Tools
```bash
apt install -y git curl htop ufw
```

### 2.5 Configure Firewall (UFW)
```bash
# Enable firewall
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw allow 8080/tcp  # API

# Enable UFW
ufw --force enable

# Check status
ufw status
```

---

## Step 3: Deploy Application

### 3.1 Clone Repository (Option A: If using Git)
```bash
cd /opt
git clone YOUR_REPO_URL code-compiler
cd code-compiler
```

### 3.2 Upload Files (Option B: If not using Git)
On your local machine:
```bash
# From your project directory
rsync -avz --exclude 'node_modules' --exclude '.venv' --exclude '__pycache__' \
  /home/aditya/my-work/De-Code/new-code-compiler/ \
  root@YOUR_SERVER_IP:/opt/code-compiler/
```

### 3.3 Configure Environment
```bash
cd /opt/code-compiler

# Create .env file
cp .env.example .env

# Edit if needed (optional)
nano .env
```

### 3.4 Make Deploy Script Executable
```bash
chmod +x deploy.sh
```

### 3.5 Run Deployment
```bash
./deploy.sh
```

This will:
- Build all Docker images
- Start all services (API gateway, workers, Redis)
- Run health checks
- Display the API URL

---

## Step 4: Verify Deployment

### 4.1 Check Services
```bash
docker compose -f docker-compose.prod.yaml ps
```

All services should show "Up" and healthy.

### 4.2 Test API Endpoints
```bash
# Get server IP
SERVER_IP=$(curl -s ifconfig.me)

# Test languages endpoint
curl http://$SERVER_IP:8080/languages

# Test code submission
curl -X POST http://$SERVER_IP:8080/submit \
  -H "Content-Type: application/json" \
  -d '{
    "language": "python",
    "code": "print(\"Hello from Hetzner!\")",
    "input": {}
  }'
```

### 4.3 View Logs
```bash
# All services
docker compose -f docker-compose.prod.yaml logs -f

# Specific service
docker compose -f docker-compose.prod.yaml logs -f api-gateway
docker compose -f docker-compose.prod.yaml logs -f worker-python
```

---

## Step 5: Setup Domain (Optional but Recommended)

### 5.1 Configure DNS
In your domain registrar (e.g., Namecheap, GoDaddy, Cloudflare):

Add A record:
- **Host**: api (or @)
- **Value**: YOUR_SERVER_IP
- **TTL**: 300

Example: `api.yourdomain.com` → `95.216.xxx.xxx`

### 5.2 Install Nginx
```bash
apt install -y nginx
```

### 5.3 Configure Nginx
```bash
nano /etc/nginx/sites-available/code-compiler
```

Add:
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
ln -s /etc/nginx/sites-available/code-compiler /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### 5.4 Setup SSL with Let's Encrypt
```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx -d api.yourdomain.com

# Auto-renewal is configured automatically
```

---

## Step 6: Monitoring & Maintenance

### 6.1 View Resource Usage
```bash
# Docker stats
docker stats

# System resources
htop
```

### 6.2 Update Application
```bash
cd /opt/code-compiler
./deploy.sh
```

### 6.3 Backup Redis Data
```bash
# Manual backup
docker compose -f docker-compose.prod.yaml exec redis redis-cli BGSAVE

# Backup file location
docker volume inspect code-compiler_redis-data
```

### 6.4 Restart Services
```bash
# Restart all
docker compose -f docker-compose.prod.yaml restart

# Restart specific service
docker compose -f docker-compose.prod.yaml restart api-gateway
```

### 6.5 View Container Logs
```bash
# Live logs
docker compose -f docker-compose.prod.yaml logs -f

# Last 100 lines
docker compose -f docker-compose.prod.yaml logs --tail=100
```

---

## Troubleshooting

### Container Won't Start
```bash
# Check logs
docker compose -f docker-compose.prod.yaml logs SERVICE_NAME

# Check disk space
df -h

# Check memory
free -h
```

### API Not Accessible
```bash
# Check if container is running
docker ps

# Check firewall
ufw status

# Check if port is listening
netstat -tlnp | grep 8080

# Test locally
curl http://localhost:8080/languages
```

### High Memory Usage
```bash
# Check container resources
docker stats

# Consider upgrading server plan
# Or reduce worker replicas
```

### Docker Socket Permission Issues
```bash
# Ensure workers have access
ls -la /var/run/docker.sock

# Should show: srw-rw---- 1 root docker
```

---

## Cost Estimation

**CX22 Server** (Recommended minimum):
- Cost: €5.83/month (~₹540/month)
- Traffic: 20 TB included
- Backups: +20% (€1.17/month)

**CX32 Server** (Recommended for production):
- Cost: €11.66/month (~₹1,080/month)
- Traffic: 20 TB included

**Additional Costs**:
- Floating IP (optional): €1.19/month
- Snapshots: €0.01/GB/month
- Backups: 20% of server cost

---

## Security Best Practices

1. **Change SSH Port** (optional but recommended):
   ```bash
   nano /etc/ssh/sshd_config
   # Change Port 22 to Port 2222
   systemctl restart ssh
   ufw allow 2222/tcp
   ufw delete allow 22/tcp
   ```

2. **Disable Root Login**:
   ```bash
   # Create sudo user first
   adduser deploy
   usermod -aG sudo deploy
   usermod -aG docker deploy

   # Then disable root
   nano /etc/ssh/sshd_config
   # Set: PermitRootLogin no
   systemctl restart ssh
   ```

3. **Enable Automatic Security Updates**:
   ```bash
   apt install -y unattended-upgrades
   dpkg-reconfigure -plow unattended-upgrades
   ```

4. **Rate Limiting** (add to Nginx):
   ```nginx
   limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
   limit_req zone=api_limit burst=20;
   ```

5. **Monitor Logs**:
   ```bash
   # Install fail2ban
   apt install -y fail2ban
   systemctl enable fail2ban
   ```

---

## Next Steps

1. ✅ Server deployed and running
2. 🔧 Configure domain and SSL
3. 📊 Setup monitoring (Prometheus/Grafana)
4. 🔐 Implement authentication/API keys
5. 📈 Setup log aggregation
6. 🔄 Configure CI/CD pipeline

---

## Support

- Hetzner Status: https://status.hetzner.com/
- Hetzner Docs: https://docs.hetzner.com/
- Community: https://community.hetzner.com/

---

## Quick Commands Cheat Sheet

```bash
# Deploy/Update
cd /opt/code-compiler && ./deploy.sh

# View logs
docker compose -f docker-compose.prod.yaml logs -f

# Restart services
docker compose -f docker-compose.prod.yaml restart

# Stop services
docker compose -f docker-compose.prod.yaml down

# Check status
docker compose -f docker-compose.prod.yaml ps

# Clean up old images
docker system prune -a

# Check disk usage
docker system df
```
