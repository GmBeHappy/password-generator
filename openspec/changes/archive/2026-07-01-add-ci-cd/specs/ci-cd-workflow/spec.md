## Overview

GitHub Actions CI/CD workflow that automatically builds and publishes the Docker image to GitHub Container Registry on every push to `main`.

## Functional Requirements

### FR-01: Trigger Events
- Workflow MUST trigger on `push` to `main` branch
- Workflow MUST trigger on `pull_request` to `main` branch (build only, no push)
- Workflow SHOULD NOT trigger on push to non-main branches

### FR-02: Build
- MUST use `docker/build-push-action` to build the Docker image
- MUST use Docker Buildx for multi-platform support
- Build MUST fail if `Dockerfile` build exits with non-zero

### FR-03: Registry Authentication
- MUST authenticate to `ghcr.io` using `docker/login-action`
- MUST use `GITHUB_TOKEN` for auth (no manual secrets required)
- MUST NOT hardcode any credentials in workflow

### FR-04: Push
- On push to `main`: MUST push image with two tags — `latest` and the short commit SHA (`sha-${GITHUB_SHA::7}`)
- On pull request: MUST NOT push the image
- Image MUST be published to `ghcr.io/gmbehappy/password-generator`

### FR-05: Image Labels
- Pushed image MUST include OCI labels: `org.opencontainers.image.source`, `org.opencontainers.image.revision`, `org.opencontainers.image.created`

### FR-06: Workflow Permissions
- Workflow MUST declare `packages: write` and `contents: read` permissions
- MUST follow principle of least privilege

## Non-functional Requirements

### NFR-01: Build Time
- Full workflow (build + push) MUST complete in under 3 minutes

### NFR-02: Caching
- Docker layers MUST be cached between workflow runs using GitHub Actions cache

### NFR-03: Notification
- Workflow status SHOULD be visible in GitHub UI (no external notification needed)

## Edge Cases
- Dockerfile missing from repo: build step fails, workflow marked as failed
- GHCR auth failure: workflow fails at login step
- Push race condition: concurrent pushes each get unique SHA tags
- First-time setup: `GITHUB_TOKEN` already has `packages: write` for own repo
