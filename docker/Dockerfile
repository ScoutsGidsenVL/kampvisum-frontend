### Development stage
FROM  registry-dev.cloud.inuits.io/node:lts-alpine as development-stage
RUN apk add --no-cache git

WORKDIR /app
ENTRYPOINT ["/entrypoint.sh"]

COPY docker/entrypoint*.sh /
COPY package.json package-lock.json ./

COPY ./ ./

EXPOSE 8080


