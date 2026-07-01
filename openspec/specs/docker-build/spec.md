## Overview

Multi-stage Docker build producing a minimal production image for the password generator static site. Uses Bun for the build stage and a lightweight HTTP server for the runtime stage.

## Functional Requirements

### FR-01: Multi-stage Build
- Dockerfile MUST use at least two stages: build and runtime
- Build stage MUST use `oven/bun` base image for package installation and `bun run build`
- Runtime stage MUST use a minimal base image (e.g., `alpine`, `scratch`, or `caddy`) — no Node.js, no Bun runtime

### FR-02: Build Stage
- MUST copy `package.json` and `bun.lock` first for layer caching
- MUST run `bun install --frozen-lockfile --production` (prod deps only) for build
- MUST copy source code after dependencies to maximize cache hit rate
- MUST run `bun run build` producing the `out/` directory (static export)

### FR-03: Runtime Stage
- MUST copy only the `out/` directory from the build stage
- MUST serve static files on port 80 (or configurable via `PORT` env)
- MUST handle client-side routing (SPA fallback: 404s return `index.html` where appropriate, or serve 404 page)
- MUST set appropriate `Content-Type` headers for static assets
- MUST set cache headers: `Cache-Control: public, max-age=31536000, immutable` for hashed assets

### FR-04: Image Size
- Final image size MUST be under 50MB
- MUST NOT include any build dependencies, Node.js, Bun, or source code in the runtime image

### FR-05: Health Check
- Dockerfile MUST include a `HEALTHCHECK` instruction that verifies the server responds with 200

### FR-06: `.dockerignore`
- MUST exclude `node_modules/`, `.next/`, `.turbo/`, `.vscode/`, `.idea/`, `.DS_Store`, `*.md` (except `README.md`), `.git/`, `openspec/`, `.kilocode/`
- MUST exclude test files and coverage

## Non-functional Requirements

### NFR-01: Build Time
- Full `docker build` (no cache) MUST complete in under 2 minutes
- Cached rebuild after source change MUST complete in under 30 seconds

### NFR-02: Security
- Runtime stage MUST run as non-root user (`nobody` or dedicated user)
- MUST NOT include any secrets, development keys, or env files in the image
- Base images MUST use pinned digests or at minimum pinned major versions

## Edge Cases
- Build fails if `bun run build` exits non-zero — Docker build exits with error
- Missing `out/` directory after build stage — COPY fails, build exits with error
- Health check: service not ready within startup period — Docker marks container as unhealthy
