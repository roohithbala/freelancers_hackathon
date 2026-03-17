# Stage 1: Build Frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./

# Define ARGs for frontend build-time environment variables
ARG VITE_FIREBASE_API_KEY
ARG VITE_FIREBASE_AUTH_DOMAIN
ARG VITE_FIREBASE_PROJECT_ID
ARG VITE_FIREBASE_STORAGE_BUCKET
ARG VITE_FIREBASE_MESSAGING_SENDER_ID
ARG VITE_FIREBASE_APP_ID
ARG VITE_FIREBASE_MEASUREMENT_ID
ARG VITE_RAZORPAY_KEY_ID
ARG VITE_API_BASE_URL

# Build frontend
RUN npm run build

# Stage 2: Final Image (Backend + Frontend)
FROM node:18-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./
# Copy frontend build output to backend static folder
COPY --from=frontend-build /app/frontend/dist ./public

EXPOSE 5000
CMD ["npm", "start"]
