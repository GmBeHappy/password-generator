## Why

Currently the Docker image must be built and pushed manually. Adding a GitHub Actions CI workflow automates this — every push to `main` triggers a build and publishes the image to GitHub Container Registry (ghcr.io). This ensures the registry always has the latest production image without manual intervention.

## What Changes

- New `.github/workflows/ci.yml` GitHub Actions workflow
- Workflow triggers on push to `main` and pull requests
- Steps: checkout → setup Docker Buildx → login to GHCR → build and push multi-platform image → tag with `latest` and commit SHA
- Image published to `ghcr.io/gmbehappy/password-generator`

## Capabilities

### New Capabilities
- `ci-cd-workflow`: GitHub Actions workflow that builds the multi-stage Docker image on every push to `main`, runs type/lint checks, and pushes to GitHub Container Registry with `latest` and SHA tags.

### Modified Capabilities
<!-- No existing capabilities to modify -->

## Impact

- New file: `.github/workflows/ci.yml`
- Repository secrets needed: none (uses built-in `GITHUB_TOKEN` for GHCR auth)
- No code changes to the application
