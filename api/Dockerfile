FROM node:20.17.0-alpine AS base

# ------------------------------------
FROM base AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app/api

COPY ./api/package*.json ./
COPY ./shared /app/shared/

RUN npm install

# ------------------------------------
FROM base AS development
WORKDIR /app/api

COPY --from=deps /app/api/node_modules /app/api/node_modules

CMD ["npm", "run", "dev"]

# ------------------------------------
FROM base AS production
WORKDIR /app/api

ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

COPY --from=deps /app/api/node_modules ./node_modules
COPY ./shared /app/shared
COPY ./api .

USER nodejs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "run", "start"]