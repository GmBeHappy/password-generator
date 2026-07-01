# Password Generator

Generate strong, secure passwords with cryptographic randomness — entirely in your browser. No data collection, no tracking, no server.

<p align="center">
  <img src="https://img.shields.io/badge/bun-1.3%2B-%23fbf0df?logo=bun" alt="Bun">
  <img src="https://img.shields.io/badge/next.js-15-%23000000?logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/react-19-%2361DAFB?logo=react" alt="React">
  <img src="https://img.shields.io/badge/ci-passing-brightgreen?logo=githubactions" alt="CI">
  <img src="https://img.shields.io/badge/image-~13MB_compressed-blue?logo=docker" alt="Size">
  <img src="https://img.shields.io/badge/AI_created-DeepSeek_V4_Pro_%2B_OpenSpec-8b5cf6" alt="AI">
</p>

> Built by **DeepSeek V4 Pro** using the [OpenSpec](https://github.com/Fission-AI/OpenSpec) artifact-driven workflow — proposal → specs → design → tasks → implementation.

## Features

- **Cryptographic randomness** — uses `crypto.getRandomValues()`, never `Math.random()`
- **Full control** — length (6–4096), uppercase, lowercase, numbers, symbols
- **Character exclusions** — skip similar-looking characters (1, l, I, 0, O) and ambiguous symbols
- **One-click copy** — copy to clipboard with visual confirmation
- **Dark & light mode** — Radix UI switches and CSS custom properties
- **Responsive** — works on mobile, tablet, and desktop
- **No data leaves your device** — everything runs client-side
- **Smooth animations** — powered by Motion (Framer Motion)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org) (App Router, static export) |
| Language | TypeScript |
| Package manager | [Bun](https://bun.sh) |
| UI primitives | [Radix UI](https://radix-ui.com) Switch |
| Icons | [Lucide](https://lucide.dev) |
| Animations | [Motion](https://motion.dev) |
| Font | Noto Sans Thai |

## Getting Started

```bash
# Install dependencies
bun install

# Start dev server (Turbopack)
bun run dev

# Production build
bun run build
```

## Docker

```bash
# Build
docker build -t passgen .

# Run
docker run -p 8080:80 passgen
```

**Image:** `ghcr.io/gmbehappy/password-generator`

```bash
# Pull from GitHub Container Registry
docker pull ghcr.io/gmbehappy/password-generator:latest

# Run
docker run -p 8080:80 ghcr.io/gmbehappy/password-generator:latest
```

The image is automatically built and published on every push to `main` via GitHub Actions.

## Architecture

Multi-stage Dockerfile:

- **Build stage:** `oven/bun:1-alpine` — installs deps, runs `bun run build` (static export)
- **Runtime stage:** `caddy:2-alpine` — serves static files with gzip, cache headers, HTTPS-ready

Runtime runs as `USER nobody`, includes HEALTHCHECK, and is ~13MB compressed.

## Security

- Client-side only — no server, no database, no API
- Passwords generated with `crypto.getRandomValues()` (cryptographically secure)
- Rejection sampling eliminates modulo bias in random character selection
- Docker runtime runs as non-root user
- No tracking, cookies, or third-party scripts

## License

MIT
