# 開發環境
FROM node:18-alpine AS development

WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY server/package*.json ./

# 安裝依賴
RUN npm install

# 複製原始碼
COPY server/ .

# 暴露端口
EXPOSE 5001

# 啟動開發伺服器
CMD ["npm", "run", "dev"]

# 生產環境
FROM node:18-alpine AS build

WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY server/package*.json ./

# 安裝生產依賴
RUN npm ci --only=production

# 複製原始碼
COPY server/ .

# 生產環境
FROM node:18-alpine AS production

WORKDIR /app

# 複製生產依賴和建置結果
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/ ./

# 暴露端口
EXPOSE 5001

# 啟動應用程式
CMD ["node", "dist/server.js"]