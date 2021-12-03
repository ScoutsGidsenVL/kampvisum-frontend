### Development stage - Node v16.13.0
FROM node:14-alpine as development-stage
RUN apk add --no-cache git

WORKDIR /app
ENTRYPOINT ["/entrypoint.sh"]

COPY docker/entrypoint*.sh /
COPY docker/entrypoint*.sh /
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080


