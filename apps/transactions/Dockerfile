FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY nx.json ./
COPY tsconfig*.json ./
COPY apps/transactions ./apps/transactions
COPY libs ./libs

RUN npm install

WORKDIR /app/apps/transactions

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start:prod"] 