FROM node:23-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
RUN npm install -g @nestjs/cli

COPY . .

CMD ["npm", "run", "start:dev"]