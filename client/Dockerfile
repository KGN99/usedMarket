FROM node:16.17.0-alpine
WORKDIR /front
ENV PATH /front/node_modules/.bin:$PATH
COPY package.json ./
RUN npm install -g npm@8.19.0
COPY ./ ./