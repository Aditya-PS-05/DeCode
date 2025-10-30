# De-Code

A secure, scalable code execution platform inspired by LeetCode's architecture, built with modern web technologies.

## Overview

De-Code is a full-stack application that allows users to write, execute, and test code in an isolated, secure environment. The platform provides container-based code execution with resource limits and security controls to ensure safe operation.

## Architecture

### Frontend (decode-client)
- **Framework**: SvelteKit 2.x with Svelte 5
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Build Tool**: Vite 7
- **Testing**: Vitest with Playwright

### Backend (decode-server)
- **Language**: Rust
- **Framework**: Actix-web 4.x
- **Runtime**: Tokio async runtime
- **Features**: Authentication system, secure code execution

### Security Architecture

The platform implements multiple security layers:

1. **Container-Based Isolation** - Each code execution runs in a separate Docker container
2. **Resource Management** - CPU, memory, and execution time limits
3. **Network Isolation** - No external network access during execution
4. **File System Restrictions** - Read-only with limited temporary space
5. **Static Code Analysis** - Scanning for dangerous patterns before execution

See [LeetCode.md](./LeetCode.md) for detailed architecture documentation.

## Project Structure

```
De-Code/
├── decode-client/       # SvelteKit frontend application
├── decode-server/       # Rust backend server
├── code-compiler/       # Code compilation utilities
├── new-code-compiler/   # Enhanced compiler implementation
└── LeetCode.md         # Architecture documentation
```

## Getting Started

### Prerequisites

- Node.js 18+ (for frontend)
- Rust 1.70+ (for backend)
- Docker (for code execution containers)

### Frontend Setup

```bash
cd decode-client
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

```bash
cd decode-server
cargo build
cargo run
```

## Development

### Frontend Development

```bash
cd decode-client
npm run dev          # Start development server
npm run build        # Create production build
npm run preview      # Preview production build
npm run check        # Type checking
npm run lint         # Run linter
npm run format       # Format code with Prettier
```

### Backend Development

```bash
cd decode-server
cargo build          # Build the project
cargo run            # Run the server
cargo test           # Run tests
cargo clippy         # Run linter
```

## Features

- Secure code execution in isolated containers
- Multi-language support
- Resource-limited execution environment
- User authentication and authorization
- Real-time code execution feedback
- Test harness integration

## Security

This platform implements industry-standard security practices for code execution:

- **Sandboxed Containers** using Docker
- **seccomp/AppArmor** for system call filtering
- **cgroups** for resource limiting
- **User namespaces** for privilege isolation
- No network access during code execution
- Static analysis before execution

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
