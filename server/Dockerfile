FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm build
COPY . .
EXPOSE 5000

CMD ["npm","run","start"]