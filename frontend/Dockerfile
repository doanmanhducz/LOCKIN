# Frontend multi-stage Dockerfile
# - `dev` target runs Vite for local development (hot-reload)
# - `prod` (default final image) builds static assets and serves them with nginx

FROM node:24-slim AS base
WORKDIR /app

# Copy dependency manifests first for better cache
COPY package*.json ./
RUN npm ci

# Copy app source
COPY . ./

FROM base AS dev
ENV NODE_ENV=development
EXPOSE 3000
CMD ["npm", "run", "dev"]

FROM base AS builder
RUN npm run build

FROM nginx:stable-alpine AS prod
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
