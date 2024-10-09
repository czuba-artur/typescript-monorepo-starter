FROM node:20.17.0-alpine AS base

# ------------------------------------
FROM base AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app/web

COPY ./web/package*.json ./
COPY ./shared /app/shared/

RUN npm install

# ------------------------------------
FROM base AS development
WORKDIR /app/web

COPY --from=deps /app/web/node_modules ./node_modules

CMD ["npm", "run", "dev"]

# ------------------------------------
FROM base AS builder
WORKDIR /app/web
COPY --from=deps /app/web/node_modules ./web/node_modules
COPY ./shared /app/shared
COPY ./web .

RUN npm run build

# ------------------------------------
FROM base AS production
WORKDIR /app/web

ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/web/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/web/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]