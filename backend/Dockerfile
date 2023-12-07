FROM node:18-alpine

RUN apk add dumb-init

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build

ENV NODE_ENV production

CMD ["dumb-init", "node", "dist/main"]
