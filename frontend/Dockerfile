#STEP 1 BUILD VUE PROJECT
FROM node:16.14.2-alpine AS build 
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build
 
#STEP 2 CREATE NGNIX SERVER
FROM nginx:stable-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]