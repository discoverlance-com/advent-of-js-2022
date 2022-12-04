FROM node:16-alpine as base
ENV NODE_ENV production


FROM node:16-alpine as deps
WORKDIR /usr/app
COPY package.json yarn.lock ./
RUN yarn

FROM node:16-alpine as build
WORKDIR /usr/app
COPY --from=deps /usr/app/node_modules /usr/app/node_modules
COPY . .

RUN yarn build 

FROM pierrezemb/gostatic as prod 

COPY --from=build /usr/app/dist /srv/http/
