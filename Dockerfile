FROM node:6-onbuild

RUN apt-get update -qq

RUN npm install -g webpack
RUN npm install -g typings

RUN mkdir -p /apps/avia_bot
WORKDIR /apps/avia_bot
COPY package.json package.json

RUN npm install

ADD . /apps/avia_bot
WORKDIR /apps/avia_bot

EXPOSE 3000
