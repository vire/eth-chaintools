FROM node:8-alpine

COPY package.json yarn.lock ./
RUN yarn

COPY . .

RUN yarn lint

ENV NODE_ENV production
RUN yarn next build

CMD ["yarn", "start"]
