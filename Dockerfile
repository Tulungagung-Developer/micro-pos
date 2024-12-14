FROM node:23-slim AS base

ENV TZ=UTC
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder

COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build

RUN pnpm --filter=./packages/api deploy --prod /prod/api
RUN pnpm --filter=./packages/web-app deploy --prod /prod/web

FROM denoland/deno:2.1.4 AS api

COPY --from=builder /prod/api ./app
WORKDIR ./app
EXPOSE 3000
CMD ["deno", "--allow-all", "dist/main.js"]

FROM busybox:1.37 AS web

COPY --from=builder /prod/web/dist ./app
WORKDIR ./app

EXPOSE 8080

CMD ["busybox", "httpd", "-f", "-v", "-p", "8080"]