FROM node:14-alpine

RUN apk add --no-cache git

WORKDIR /app

COPY docker/entrypoint.sh /
COPY package*.json ./

# RUN chmod +x entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
RUN npm install

COPY . .

EXPOSE 8080



