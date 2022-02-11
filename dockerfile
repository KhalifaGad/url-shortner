FROM node:16.13-alpine

WORKDIR /app

COPY package.json .
RUN yarn 

COPY . .
