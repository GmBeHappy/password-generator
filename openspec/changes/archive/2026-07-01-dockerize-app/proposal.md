## Why

The password generator is a fully static site but currently has no containerization. Adding a Dockerfile enables portable deployment to any container runtime (Docker, Podman, Kubernetes), consistent CI/CD pipelines, and production-grade serving without manual setup.

## What Changes

- New multi-stage Dockerfile using Bun for building and a minimal web server for production
- Stage 1 (build): Bun-based build of the Next.js static export
- Stage 2 (prod): Minimal image serving static files via a tiny HTTP server
- `.dockerignore` to exclude unnecessary files from the build context
- Resulting image targets the smallest possible footprint

## Capabilities

### New Capabilities
- `docker-build`: Multi-stage Dockerfile producing a production-ready container image that builds the Next.js static export with Bun and serves it via a lightweight HTTP server (e.g., `caddyserver/caddy` or `nginx:alpine`).

### Modified Capabilities
<!-- No existing capabilities to modify -->

## Impact

- New file: `Dockerfile` at project root
- New file: `.dockerignore` at project root
- No code changes — purely additive infrastructure
- Build command: `docker build -t passgen .`
- Run command: `docker run -p 8080:80 passgen`
