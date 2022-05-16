FROM node:16.14.2-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine as production
RUN mkdir /app
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /app
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
