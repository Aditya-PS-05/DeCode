# LeetCode-Style Code Execution Architecture

## How LeetCode Works

### 1. **Container-Based Isolation**
- Each code execution runs in a separate Docker container
- Containers are destroyed after execution
- Network access is completely disabled
- File system is read-only except for temporary directories

### 2. **Resource Management**
- CPU limits (typically 1-2 cores, time-sliced)
- Memory limits (usually 128MB-512MB)
- Execution time limits (1-30 seconds depending on problem)
- Process limits (max number of processes/threads)

### 3. **Secure Code Injection**
- User code is injected into pre-written test harnesses
- Input/output is controlled through structured data
- No direct file I/O or system calls allowed

### 4. **Multi-Stage Pipeline**
```
User Code → Static Analysis → Container Creation → Code Injection → 
Test Execution → Result Parsing → Container Cleanup → Response
```

## Implementation Strategy

### Architecture Components:

1. **Queue System** (Redis/SQS) - Manages execution requests
2. **Worker Nodes** - Execute code in isolated containers  
3. **Container Registry** - Pre-built execution environments
4. **Result Storage** - Temporary storage for execution results
5. **API Gateway** - Handles requests and responses

### Security Layers:

1. **Static Code Analysis** - Scan for dangerous patterns
2. **Sandboxed Containers** - Isolated execution environment
3. **Resource Limits** - CPU, memory, time constraints
4. **Network Isolation** - No external network access
5. **File System Restrictions** - Read-only with limited temp space

### Key Technologies:
- **Docker** for containerization
- **seccomp/AppArmor** for system call filtering
- **cgroups** for resource limiting
- **User namespaces** for privilege isolation
- **Message queues** for scalable processing