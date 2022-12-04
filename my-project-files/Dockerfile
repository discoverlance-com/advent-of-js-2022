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

FROM node:16-alpine as prod 
WORKDIR /usr/app

COPY --from=build /usr/app/dist /usr/app/dist
COPY --from=deps /usr/app/node_modules /usr/app/node_modules
ADD . .

EXPOSE 8080

CMD [ "yarn", "preview","--port", "8080" ]
