FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache yt-dlp ffmpeg

COPY package.json yarn.lock ./

RUN yarn install --immutable

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
