FROM node:16-alpine3.17

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY key.pem /app/key.pem
COPY cert.pem /app/cert.pem

EXPOSE 80
EXPOSE 443
EXPOSE 5050

CMD ["npm", "start"]