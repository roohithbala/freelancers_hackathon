# Stage 1: Build Frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
ARG FRONTEND_ENV_B64
RUN if [ -n "$FRONTEND_ENV_B64" ]; then echo "$FRONTEND_ENV_B64" | base64 -d > .env; fi
RUN npm run build

# Stage 2: Final Image (Backend + Frontend)
FROM node:18-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./
# Copy frontend build output to backend static folder
COPY --from=frontend-build /app/frontend/dist ./public

# Decode backend environment variables at build/runtime
ARG BACKEND_ENV_B64
RUN if [ -n "$BACKEND_ENV_B64" ]; then echo "$BACKEND_ENV_B64" | base64 -d > .env; fi

EXPOSE 5000
CMD ["npm", "start"]
