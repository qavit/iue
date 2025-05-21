# 開發環境
FROM node:18-alpine AS development

WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY client/package*.json ./

# 安裝依賴
RUN npm install

# 複製原始碼
COPY client/ .

# 啟動開發伺服器
CMD ["npm", "run", "dev"]

# 生產環境
FROM node:18-alpine AS build

WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY client/package*.json ./

# 安裝生產依賴
RUN npm ci --only=production

# 複製原始碼
COPY client/ .

# 建置應用程式
RUN npm run build

# 生產環境
FROM nginx:alpine AS production

# 複製建置結果
COPY --from=build /app/dist /usr/share/nginx/html

# 複製 Nginx 配置
COPY docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

# 暴露 80 端口
EXPOSE 80

# 啟動 Nginx
CMD ["nginx", "-g", "daemon off;"]