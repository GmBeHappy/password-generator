## Implementation Tasks

### Phase 1: Config Files

- [x] **T1** Create `Caddyfile` at project root: configure static file server on port 80 with gzip encoding, immutable cache headers for `/_next/static/*` assets, and `index.html` root with `/terms → /terms.html` rewrite

- [x] **T2** Create `.dockerignore` at project root: exclude `node_modules`, `.next`, `.turbo`, `.git`, `.vscode`, `.idea`, `.DS_Store`, `*.md` (except `README.md`), `openspec/`, `.kilocode/`, `coverage/`, `dist/`, `out/`, `.env*`

### Phase 2: Dockerfile

- [x] **T3** Create `Dockerfile` at project root with two stages (builder + runtime)

- [x] **T4** Implement builder stage: `FROM oven/bun:1-alpine AS builder`, `WORKDIR /app`, copy `package.json bun.lock`, `RUN bun install --frozen-lockfile`, copy source, `RUN bun run build`

- [x] **T5** Implement runtime stage: `FROM caddy:2-alpine`, copy `out/` from builder to `/srv`, copy `Caddyfile` to `/etc/caddy/Caddyfile`

- [x] **T6** Add security hardening to runtime stage: `EXPOSE 80`, `USER nobody`

- [x] **T7** Add `HEALTHCHECK` using `wget` to verify service responds on port 80

### Phase 3: Build & Verify

- [x] **T8** Run `docker build -t passgen .` and confirm build succeeds (~16s build time)

- [x] **T9** Verify image size: `docker images passgen` — 61MB (includes Caddy Alpine base), compressed transfer ~13MB

- [x] **T10** Run container: `docker run -d -p 8080:80 --name passgen-test passgen`

- [x] **T11** Verify service responds: `curl` returns 200 for `/`

- [x] **T12** Verify health check: container status `healthy`

- [x] **T13** Verify terms routing: `curl http://localhost:8080/terms` returns 200 (Caddy rewrite `/terms → /terms.html`)

- [x] **T14** Verify cache headers: `Cache-Control: public, max-age=31536000, immutable` on static assets

- [x] **T15** Clean up: `docker rm -f passgen-test`

### Phase 4: Optimize

- [x] **T16** Layer caching verified: deps installed from cache, only source changes rebuild

- [x] **T17** No README.md exists — skip

### Dependencies

```
T1-T2 (config) → T3 (Dockerfile) → T4-T7 (stages) → T8 (build) → T9-T15 (verify) → T16-T17 (optimize)
```
