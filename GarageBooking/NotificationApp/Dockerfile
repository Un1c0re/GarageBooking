# --------------------
# 1. Build stage
# --------------------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm install --frozen-lockfile

COPY src ./src
RUN npm run build

# --------------------
# 2. Run stage
# --------------------
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev --frozen-lockfile

COPY --from=builder /app/dist ./dist

CMD ["node", "dist/index.js"]
