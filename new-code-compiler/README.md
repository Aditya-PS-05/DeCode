# LeetCode-Style Code Runner: Secure, Containerized Online Judge

## What is This?
A secure, scalable LeetCode-inspired code execution system from scratch.
- **Multi-language:** Python, Java, C++
- **Isolation:** Every submission runs in a locked-down, throwaway Docker container
- **Security:** Static code scans + seccomp + read-only FS + no networking + resource cgroup limits
- **Pipeline:** API Gateway → Queue → Worker Containers → Results Back to User
- **Reference:** See `LeetCode.md` for architecture ideas

---

## System Architecture

See [STRUCTURE.md](./STRUCTURE.md) for file/folder breakdown.

**Main Pipeline:**
1. **User submits code & test cases via API**
2. **API Gateway**:
    - Runs static security scan on code
    - Injects code into language-specific harness (structured I/O)
    - Dispatches job (with input, language, etc.) to a queue
3. **Worker picks up job**:
    - Starts a new container (Python/Java/C++ image)
    - Injects the harness+user code (mounted as temp file)
    - Executes with strict resources (seccomp, nogpu, readonly, memory/cpu/time limits)
    - Monitors and kills job if it exceeds limits or attempts bypass
    - Collects results and pushes to result storage
4. **API Gateway**: Fetches result and returns to user

**Security:**  
- Static analysis blocks dangerous keywords/regex
- Docker with `seccomp`/`AppArmor`
- No outbound/inbound network
- Read-only except `/tmp`
- Kills container after each execution

---

## Endpoints

| Endpoint                | Method | Description                                    |
|-------------------------|--------|------------------------------------------------|
| `/languages`            | GET    | List supported languages                       |
| `/submit`               | POST   | Submit code, language, and test input          |
| `/result/<job_id>`      | GET    | Get results of code execution                  |

_All endpoints use JSON. Code is submitted as plain text+test data. Each submission returns a job_id._

---

## Demo/Dev Requirements

- [Docker](https://www.docker.com/) (for language containers)
- [Docker Compose](https://docs.docker.com/compose/) (for local dev)
- Python 3.10+
- (Optional: Redis if you want distributed queue, otherwise in-memory by default for MVP)

---

## Security/Limitations

**DO NOT** run this on public servers without additional fine-tuning or load protection.  
This architecture is for demo/testing/learning. You must further harden before production use!

---

## Credits

- Inspired by LeetCode, Hackerrank, AtCoder sandbox designs
- See [LeetCode.md](../LeetCode.md) for conceptual background