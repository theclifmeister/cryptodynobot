FROM node:alpine

RUN apk add --update \
    python \
    python-dev \
    py-pip \
    build-base

RUN mkdir /app
WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "start"]
