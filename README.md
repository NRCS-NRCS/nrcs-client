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

1. **Crete a Pull Request to the develop branch:**

    - Push your feature branch to the remote repository

        ```bash
        git checkout develop
        git checkout -b <your-feature-branch>
        git push -u origin <your-feature-branch>
        ```
    - Open a Pull Request targeting the develop branch.
    - Once approved and merged, your changes will be included in the develop branch.

2. **Trigger the staging deployment:**

   - The staging deployment is managed through this repository:
     🔗 [ https://github.com/NRCS-NRCS/stage-nrcs-client](https://github.com/NRCS-NRCS/stage-nrcs-client)

   - Anything pushed to `develop` branch will trigger immediate deployment
     to configured stage github io page.

   - You can manually trigger the deployment workflow here:
     🔗 [Staging Workflow – stage.yml](https://github.com/NRCS-NRCS/stage-nrcs-client/actions/workflows/stage.yml)

> **Note:** The staging environment also auto-deploys every day at **01:00 UTC**.

### Production Deployment

Deployments will be triggered in 2 ways:

1. Anything pushed to `main` branch will trigger immediate deployment
   to configured github io page.
2. Every day at UTC 00:01, deployment will be triggered with
   latest data from NRCS database.

### Local Development (Using Docker, with backend)

We use a `docker-compose.yml` file (located at `./backend/docker-compose.yml`).
To run it, you need to add this with the following content in `.env.local`:

```
# Include the backend services
COMPOSE_FILE=./backend/docker-compose.yaml:docker-compose.yml

# Use the same .env file for both backend and web-app
BACKEND_ENV_FILE=../.env
```

> NOTE: `../` refers to the web-app folder, relative to `./backend/docker-compose.yml` (the main Docker Compose file).
