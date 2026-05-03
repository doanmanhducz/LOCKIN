# Backend Dockerfile (development friendly)
FROM node:24-slim

WORKDIR /app

# Copy package files first to leverage layer caching
COPY package*.json ./

# Install all dependencies (including devDependencies) for development
RUN npm ci

# Copy app source
COPY . ./

ENV NODE_ENV=development

# Expose backend port
EXPOSE 5000

# Run dev server (the project uses `npm run dev` which runs Node with --watch)
CMD ["npm", "run", "dev"]
