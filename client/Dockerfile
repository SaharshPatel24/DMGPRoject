FROM node:alpine

WORKDIR /

COPY package*.json ./
EXPOSE 3000

RUN rm -rf node_modules
RUN rm -f package-lock.json

RUN npm cache clean --force
RUN npm install
COPY . ./

CMD [ "npm", "start" ]