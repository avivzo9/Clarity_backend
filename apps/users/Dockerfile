# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Copy root package files and install all dependencies
COPY package*.json ./
COPY nx.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY libs ./libs
COPY apps/users ./apps/users

# Install dependencies and build
RUN npm install
RUN cd apps/users && \
    npm run build && \
    ls -la dist

# Production stage
FROM node:18-alpine
WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/users/dist ./dist

# Set working directory to the users service
WORKDIR /app

# Start the service
CMD ["node", "dist/main.js"] 