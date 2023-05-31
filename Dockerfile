FROM node:14

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3021

CMD [ "npm", "start" ]