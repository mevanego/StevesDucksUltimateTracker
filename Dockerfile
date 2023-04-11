#Stage 1
FROM node:17-alpine as builder
WORKDIR /app    
COPY package.json .
RUN npm install
COPY . .
RUN npm start

#Stage 2