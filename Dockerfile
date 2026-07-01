FROM oven/bun:1-alpine AS builder
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY src/ ./src/
COPY next.config.ts tsconfig.json next-env.d.ts ./

RUN bun run build

FROM caddy:2-alpine

COPY --from=builder /app/out /srv
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

USER nobody
