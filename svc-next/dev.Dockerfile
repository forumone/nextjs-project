# Install dependencies only when needed
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.

USER root

RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package manifests and install
COPY package*.json ./
RUN npm ci

# Copy build configuration
COPY tsconfig.json next.config.js \
     next-env.d.ts .babelrc \
     ./

# Use tini to ensure `npm start' receives signals from Docker/Kubernetes.
RUN apk add --no-cache tini
ENTRYPOINT [ "tini", "-g", "--" ]

ENV NODE_ENV development

EXPOSE 3000

# Set entrypoint to start command
CMD [ "npm", "run", "dev" ]
