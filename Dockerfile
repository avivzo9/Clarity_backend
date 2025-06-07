FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY nx.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN cd apps/gateway && npm install && npm run build

# Remove source files and dev dependencies
RUN rm -rf apps/gateway/src node_modules
RUN npm install --only=production

EXPOSE 3000

# Start the application
CMD ["node", "apps/gateway/dist/src/main.js"]