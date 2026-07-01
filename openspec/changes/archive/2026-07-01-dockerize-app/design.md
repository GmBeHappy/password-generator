## Architecture

Two-stage Dockerfile: build with Bun → serve with Caddy.

```
Stage 1: Build (oven/bun:1-alpine)
  ├── COPY package.json bun.lock →
  ├── RUN bun install --frozen-lockfile
  ├── COPY src/ next.config.ts tsconfig.json →
  └── RUN bun run build → out/

Stage 2: Runtime (caddy:2-alpine)
  ├── COPY --from=build out/ → /srv
  ├── COPY Caddyfile → /etc/caddy/Caddyfile
  ├── USER nobody
  └── CMD ["caddy", "run"]
```

## Base Image Selection

| Stage | Image | Rationale |
|---|---|---|
| Build | `oven/bun:1-alpine` | Official Bun image, Alpine-based (~80MB), faster installs than Node, exact version pinning on major |
| Runtime | `caddy:2-alpine` | ~13MB compressed, built-in HTTPS, auto HTTP→HTTPS redirect, SPA-friendly 404 handling, no config file overhead |

**Rejected alternatives:**
- `nginx:alpine` — requires custom config for SPA routing, larger (~15MB compressed)
- `node:alpine` + `serve` — pulls Node runtime (~50MB+), unnecessary for static files
- `scratch` + static binary — no health check or TLS support without custom binary

## Layer Caching Strategy

```dockerfile
# Layer 1: Dependencies (changes rarely)
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

# Layer 2: Source code (changes frequently)
COPY src/ ./src/
COPY next.config.ts tsconfig.json next-env.d.ts ./

# Layer 3: Build (changes every source change)
RUN bun run build
```

Dependency installation is cached until `package.json` or `bun.lock` changes. Typical rebuild after source edit: <5 seconds (cache hits layers 1+2, re-runs layer 3 only).

## Caddy Configuration

Minimal `Caddyfile` bundled in the repo:

```
:80 {
  root * /srv
  file_server {
    index index.html
  }
  encode gzip
  header Cache-Control "public, max-age=31536000, immutable"
  header /_next/static/* Cache-Control "public, max-age=31536000, immutable"
}
```

- `file_server` handles static serving with automatic `index.html` fallback
- `encode gzip` compresses responses on-the-fly
- Cache headers set globally with overrides for hashed Next.js assets
- No redirect config needed — Caddy handles SPA-like 404 → index.html via `try_files` equivalent

## Dockerfile Structure

```dockerfile
# Stage 1: Build
FROM oven/bun:1-alpine AS builder
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

# Stage 2: Runtime
FROM caddy:2-alpine
COPY --from=builder /app/out /srv
COPY Caddyfile /etc/caddy/Caddyfile
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1
USER nobody
```

## .dockerignore

```
node_modules
.next
.turbo
.git
.github
.vscode
.idea
.DS_Store
*.md
!README.md
openspec
.kilocode
.kilocode
.env
.env.local
coverage
dist
out
```

Key: `out/` is excluded from context because it's generated in the build stage. `!README.md` preserves the README if it exists.

## Image Size Budget

| Component | Size |
|---|---|
| Caddy Alpine base | ~13MB (compressed) |
| Static site (out/) | ~200KB |
| Caddyfile | ~200B |
| **Total** | **~13.5MB** |

Well under the 50MB spec requirement.

## Security

- Runtime runs as `nobody` (non-root)
- No dev dependencies in runtime (prod install only in build stage)
- Caddy runs with default hardening (chroot, capability dropping)
- No secrets in image — `.env` files excluded by `.dockerignore`
- Base images use major version pins (`1-alpine`, `2-alpine`) for reproducible builds
