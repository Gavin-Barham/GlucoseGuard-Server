FROM node:16

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY key.pem /app/key.pem
COPY cert.pem /app/cert.pem

EXPOSE 3000
EXPOSE 8000

CMD ["npm", "start"]