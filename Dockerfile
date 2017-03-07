FROM node:6-onbuild

RUN apt-get update -qq && apt-get install apt-transport-https
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update -qq && apt-get install -y apt-transport-https yarn

RUN mkdir -p /apps/avia_bot
WORKDIR /apps/avia_bot
COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install

ADD . /apps/avia_bot
WORKDIR /apps/avia_bot

EXPOSE 3000
