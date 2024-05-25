FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm

WORKDIR /usr/src/app
COPY . .

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM base AS test
ENV NODE_ENV test
RUN --mount=type=cache,target=/pnpm/store pnpm install --frozen-lockfile
USER node
# Vitest in build-stage
RUN pnpm run test

FROM nginx:1.25
# COPY the directory build from build-stage to /usr/share/nginx/html
# The target location here was found from the Docker hub page
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

