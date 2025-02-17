FROM node:slim AS build

RUN apt-get update -y \
&& apt-get install -y openssl

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npx keystone build --no-prisma

FROM node:slim

RUN apt-get update -y \
&& apt-get install -y openssl

WORKDIR /usr/src/app

COPY --from=build /usr/src/app /usr/src/app/

RUN npx keystone build --no-ui

CMD ["npm", "run", "prod"]