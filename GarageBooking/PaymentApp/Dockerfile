# 1. Базовый образ
FROM node:20-alpine AS base

# 2. Устанавливаем рабочую директорию
WORKDIR /app

# 3. Копируем package.json и package-lock.json
COPY package*.json ./

# 4. Устанавливаем зависимости (включая dev для сборки)
RUN npm install

# 5. Копируем Prisma схемы
COPY prisma ./prisma

# 6. Генерация Prisma Client
RUN npx prisma generate

# 7. Копируем исходники
COPY tsconfig.json ./
COPY src ./src

# 8. Собираем проект
RUN npm run build

# 9. Используем чистый Node для продакшена
FROM node:20-alpine AS prod

WORKDIR /app

# Копируем только нужное для запуска
COPY package*.json ./
RUN npm install --omit=dev

COPY --from=base /app/dist ./dist
COPY --from=base /app/prisma ./prisma

# 10. Переменные окружения
ENV NODE_ENV=production
ENV PORT=4001

EXPOSE 4001

# 11. Запуск
CMD ["node", "dist/app.js"]
