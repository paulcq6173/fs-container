FROM node:22-slim

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /usr/src/backend

COPY . .

RUN pnpm install

EXPOSE 3000

# pnpm dev is the command to start the application in development mode
CMD ["pnpm", "run", "dev"]