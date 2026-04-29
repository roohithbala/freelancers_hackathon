FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Decode environment variables at build/runtime and save to .env file
ARG ENV_B64
RUN if [ -n "$ENV_B64" ]; then echo "$ENV_B64" | base64 -d > .env; fi
EXPOSE 5000
CMD ["npm", "start"]
