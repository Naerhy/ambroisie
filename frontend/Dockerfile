# vite
FROM node:18-alpine as vite

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build

# nginx
FROM nginx:1.25-alpine

COPY nginx.conf /etc/nginx

COPY --from=vite /app/dist /usr/share/nginx/html

EXPOSE 80
