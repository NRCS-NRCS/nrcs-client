FROM node:22-bookworm AS dev

RUN apt-get update -y \
    && apt-get install -y --no-install-recommends \
        git bash g++ make \
    # Clean-up
    && rm -rf /var/lib/apt/lists/* \
    # Add /code as safe directory
    && git config --global --add safe.directory /code

# Enable corepack
RUN corepack enable

WORKDIR /code

RUN git config --global --add safe.directory /code

# -------------------------- Nginx - Builder --------------------------------
FROM dev AS nginx-build

COPY package.json pnpm-lock.yaml /code/

RUN corepack prepare --activate

RUN pnpm install

COPY . .

# Dynamic configs. Can be changed with containers. (Placeholder values)
# ENV APP_ENVIRONMENT=APP_ENVIRONMENT_PLACEHOLDER
# ENV APP_GRAPHQL_ENDPOINT=APP_GRAPHQL_ENDPOINT_PLACEHOLDER
# ENV APP_AUTH_URL=APP_AUTH_URL_PLACEHOLDER
# ENV APP_ADMIN_URL=APP_ADMIN_URL_PLACEHOLDER
# ENV APP_UMAMI_SRC=APP_UMAMI_SRC_PLACEHOLDER
# ENV APP_UMAMI_ID=APP_UMAMI_ID_PLACEHOLDER
# ENV APP_SENTRY_DSN=APP_SENTRY_DSN_PLACEHOLDER

ENV APP_TITLE=APP_TITLE_PLACEHOLDER
ENV APP_GRAPHQL_ENDPOINT=https://APP_GRAPHQL_ENDPOINT_PLACEHOLDER.com
ENV APP_GRAPHQL_CODEGEN_ENDPOINT=./backend/schema.graphql

# # Build variables (Requires backend pulled)
# ENV APP_GRAPHQL_CODEGEN_ENDPOINT=./backend/schema.graphql

# RUN pnpm generate:type && pnpm build
RUN pnpm build

# ---------------------------------------------------------------------------
FROM nginx:1 AS nginx-serve

LABEL maintainer="Togglecorp Dev"
LABEL org.opencontainers.image.source="https://github.com/togglecorp/nrcs-client"

COPY ./nginx-serve/apply-config.sh /docker-entrypoint.d/
COPY ./nginx-serve/nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=nginx-build /code/out /code/build

# NOTE: Used by apply-config.sh
ENV APPLY_CONFIG__SOURCE_DIRECTORY=/code/build/
ENV APPLY_CONFIG__DESTINATION_DIRECTORY=/usr/share/nginx/html/
ENV APPLY_CONFIG__OVERWRITE_DESTINATION=true

ARG PORT=3000
ENV PORT=${PORT}
EXPOSE ${PORT}
