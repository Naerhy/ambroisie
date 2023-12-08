# vite
FROM node:18-alpine as vite

WORKDIR /app

COPY . .

ARG SERVER_IP
ARG SERVER_PORT

ENV VITE_SERVER_IP=$SERVER_IP
ENV VITE_SERVER_PORT=$SERVER_PORT

RUN npm ci
RUN npm run build

# nginx
FROM nginx:1.25-alpine

ARG BACKEND_PORT

COPY nginx.conf /etc/nginx
RUN sed -i "s/PORT/$BACKEND_PORT/g" /etc/nginx/nginx.conf

COPY --from=vite /app/dist /usr/share/nginx/html

EXPOSE 80
