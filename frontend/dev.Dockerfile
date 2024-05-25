FROM node:22-slim

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /usr/src/app

COPY . .

# development mode
RUN pnpm install

EXPOSE 5173

# pnpm dev is the command to start the application in development mode
CMD ["pnpm", "run", "dev"]