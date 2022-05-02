FROM node:16.14.2

WORKDIR /app

COPY package*.json /app
COPY prisma ./prisma/
RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm", "run", "start:migrate:prod" ]