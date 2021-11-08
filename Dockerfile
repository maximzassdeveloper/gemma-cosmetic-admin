FROM node:16.7-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build



FROM node:16.7-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 4000

CMD ["nginx", "-g", "daemon off;"]