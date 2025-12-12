# Nepal Red Cross Society (NCRS) Website

NextJs application for [Nrcs community website](https://nrcs.org).

## Development

Before you start, create `.env.local` file:

```bash
touch .env.local
```

Set these environment variables:

```env
PORT=3055
NEXT_PUBLIC_GRAPHQL_CODEGEN_ENDPOINT=./backend/schema.graphql
NEXT_PUBLIC_GRAPHQL_DOMAIN=<api-endpoint>
```

### Running

```bash
pnpm install
# This prefetches latest data from Nrcs database for projects and generate type
pnpm prebuild

# Start web app
pnpm start
```

Before creating a pull request, all lint and type issues must be fixed.
To check for issues:

```bash
pnpm lint
pnpm typecheck
```

### Building

```bash
pnpm build
```

### Steps to Deploy to Staging

1. **Rebase your branch onto the staging branch:**

```bash
git checkout stage
git rebase <branch-you-want-to-deploy>
git push
```

This rebases your feature branch onto the `stage` branch and pushes the updated staging branch.

2. **Trigger the staging deployment:**

The staging deployment is managed through this repository:
🔗 [ https://github.com/toggle-corp/stage-nrcs-client](https://github.com/toggle-corp/stage-nrcs-client)

You can manually trigger the deployment workflow here:
🔗 [Staging Workflow – stage.yml](https://github.com/toggle-corp/stage-nrcs-client/actions/workflows/stage.yml)

> **Note:** The staging environment also auto-deploys every day at **01:00 UTC**.

### Production Deployment

Deployments will be triggered in 2 ways:

1. Anything pushed to `main` branch will trigger immediate deployment
   to configured github io page.
2. Every day at UTC 00:01, deployment will be triggered with
   latest data from NRCS database.


## Local Development (Using Docker, with backend)

We use a `docker-compose.yml` file (located at `./backend/docker-compose.yml`).
To run it, you need to add this with the following content in `.env.local`:

```
# Include the backend services
COMPOSE_FILE=./backend/docker-compose.yaml:docker-compose.yml

# Use the same .env file for both backend and web-app
BACKEND_ENV_FILE=../.env
```

> NOTE: `../` refers to the web-app folder, relative to `./backend/docker-compose.yml` (the main Docker Compose file).