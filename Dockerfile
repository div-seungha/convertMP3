FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
# Corepack 활성화 (오류 해결)
RUN corepack enable && corepack prepare yarn@4.7.0 --activate
RUN yarn install --immutable

COPY . .

RUN yarn build

FROM node:20-alpine

RUN apk add --no-cache ffmpeg

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 3000

CMD ["yarn", "start"]
