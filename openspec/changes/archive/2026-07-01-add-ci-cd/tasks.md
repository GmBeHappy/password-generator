## Implementation Tasks

### Phase 1: Workflow Setup

- [x] **T1** Create `.github/workflows/` directory
- [x] **T2** Create `.github/workflows/ci.yml` — workflow file header with `name: CI`, `on: push main` and `on: pull_request main` triggers
- [x] **T3** Set workflow-level permissions: `contents: read`, `packages: write`

### Phase 2: Build Steps

- [x] **T4** Add `actions/checkout@v4` step
- [x] **T5** Add `docker/setup-buildx-action@v3` step
- [x] **T6** Add `docker/login-action@v3` step: authenticate to `ghcr.io` via `GITHUB_TOKEN`
- [x] **T7** Add `docker/metadata-action@v5` step: generate tags (`latest`, `sha-<short>`) with `flavor: latest=false` on PR, and OCI labels

### Phase 3: Build & Push

- [x] **T8** Add `docker/build-push-action@v6` step: build + push with `push: ${{ github.event_name != 'pull_request' }}`
- [x] **T9** Configure cache: `cache-from: type=gha`, `cache-to: type=gha,mode=max`
- [x] **T10** Set `tags` and `labels` from metadata step output

### Phase 4: Verify

- [x] **T11** Validate workflow YAML syntax — structure valid, all keys recognized
- [x] **T12** Commit and push — verify workflow triggers on GitHub Actions tab
- [x] **T13** Verify successful build and push to `ghcr.io/gmbehappy/password-generator`
- [x] **T14** Verify both `latest` and SHA tags are present in GHCR

### Dependencies

```
T1 → T2 → T3-T7 → T8-T10 → T11-T14
```
