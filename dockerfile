FROM node:alpine AS base
FROM base AS build

RUN apk add --update \
    python \
    python-dev \
    py-pip \
    build-base \
  && pip install virtualenv \
  && rm -rf /var/cache/apk/*

RUN mkdir /app
WORKDIR /app

COPY . .

RUN npm install

FROM base

COPY --from=build /app /app
WORKDIR /app

CMD ["npm", "start"]
