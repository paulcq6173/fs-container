FROM node:22-slim

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm

WORKDIR /usr/src/backend

COPY --chown=node:node . .

RUN pnpm install --prod --frozen-lockfile

ENV DEBUG=playground:*

EXPOSE 3000

USER node
CMD ["pnpm", "run", "start"]
