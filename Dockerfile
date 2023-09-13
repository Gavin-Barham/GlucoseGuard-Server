FROM node:16-alpine3.17

WORKDIR /ht-server-app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

COPY . .

EXPOSE 3000
EXPOSE 8443

CMD ["npm", "start"]