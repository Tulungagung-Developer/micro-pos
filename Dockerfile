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
WORKDIR /app
EXPOSE 3000
CMD ["deno", "--allow-all", "dist/main.js"]

FROM nginx:alpine AS web
COPY --from=builder /prod/web/dist /usr/share/nginx/html

ARG PORT=8080
ARG APP_HOST=localhost

COPY <<EOF /etc/nginx/templates/default.conf.template
server {
    listen ${PORT:-8080};
    server_name ${APP_HOST:-localhost};
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
}
EOF

RUN chown -R nginx:nginx /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
