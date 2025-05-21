# IUE 台灣多語線上詞典

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

IUE 是一個現代化的台灣多語線上詞典平台，專注於整合台灣本土語言（客語、台語、原住民語）的詞彙資料，提供便利的查詢與學習體驗。

---


## ✨ 功能特色

- 📚 多語言支援：整合客語六腔、台語、原住民語等台灣本土語言
- 🔍 智慧搜尋：支援模糊搜尋、同義詞查詢
- 🎧 發音功能：提供詞彙發音（待實作）
- 📱 響應式設計：在各種裝置上都能流暢使用
- 🚀 現代化技術棧：使用 React + TypeScript + Express + MongoDB

## 🏗️ 專案結構


```
iue/
├── client/                  # 前端 React + Vite 專案
│   ├── public/             # 靜態檔案
│   ├── src/                # 原始碼（components, pages, hooks, services, styles, types, utils...）
│   ├── package.json        # 前端依賴
│   └── ...
│
├── server/                 # 後端 Express + TypeScript 專案
│   ├── config/             # 設定檔
│   ├── controllers/        # 控制器
│   ├── models/             # Mongoose 資料模型
│   ├── routes/             # API 路由
│   ├── services/           # 業務邏輯
│   ├── utils/              # 工具函式
│   ├── app.ts              # Express 主應用
│   ├── server.ts           # 伺服器啟動點
│   └── ...
│
├── data/                  # 詞典資料（預計）
│   ├── oan.json           # 台語資料
│   ├── hak_xi.json        # 四縣腔資料
│   ├── hak_hoi.json       # 海陸腔資料
│   ├── hak_tai.json       # 大埔腔資料
│   ├── hak_ngiau.json     # 饒平腔資料
│   ├── hak_zhio.json      # 詔安腔資料
│   └── hak_sxi.json       # 南四縣腔資料
│
├── docker/                 # Docker 與 Nginx 設定
│   ├── mongo/              # MongoDB 初始化腳本
│   ├── nginx/              # Nginx 設定檔
│   └── ...
│
├── docs/                   # 專案相關文件
│   ├── api/                # API 文件
│   └── database/           # 資料庫設計
│
├── scripts/                # 輔助腳本
│   ├── import-data.js      # 資料匯入
│   └── seed-db.js          # 資料庫種子
│
├── .env                    # 實際環境變數（勿提交至 Git）
├── .env.example            # 環境變數範例（建議複製為 .env）
├── .gitignore              # Git 忽略規則
├── docker-compose.yml      # Docker Compose 配置
├── package.json            # Monorepo 工作區依賴
├── tsconfig.json           # TypeScript 設定
└── README.md               # 專案說明文件
```

## 🚀 快速開始

### 前置需求

- Node.js 18 以上
- Docker 與 Docker Compose

### 安裝與啟動流程

1. 下載專案原始碼
   ```bash
   git clone https://github.com/yourusername/iue.git
   cd iue
   ```

2. 複製環境變數範例檔案
   ```bash
   cp .env.example .env
   # 請依需求修改 .env 內容，特別是資料庫密碼、JWT_SECRET 等敏感資訊
   ```

3. 啟動 Docker 服務（包含 MongoDB、後端、前端、Nginx）
   ```bash
   docker-compose up -d
   ```

4. 安裝 Node.js 依賴（前後端）
   ```bash
   npm install
   cd client && npm install
   cd ../server && npm install
   ```

5. 開發模式下啟動（可選，通常 Docker 已自動啟動）
   ```bash
   # 在根目錄
   npm run dev
   ```

---

## ⚙️ 環境變數說明

請參考 `.env.example`，複製為 `.env` 並依需求調整：

- `MONGO_INITDB_ROOT_USERNAME`、`MONGO_INITDB_ROOT_PASSWORD`：MongoDB 管理員帳密
- `MONGO_USERNAME`、`MONGO_PASSWORD`、`MONGO_INITDB_DATABASE`：應用資料庫帳密
- `MONGODB_URI`：MongoDB 連線字串（建議使用 docker-compose 預設服務名稱）
- `NODE_ENV`、`PORT`：後端運作環境與埠號
- `VITE_API_URL`：前端呼叫 API 的 URL，預設為 http://localhost:5001
- `JWT_SECRET`、`JWT_EXPIRES_IN`：JWT 金鑰與過期時間
- 其他請參考範例檔案

> **注意：** `.env` 請勿提交至 Git，僅 `.env.example` 作為範本。

---

## 🐳 Docker 使用說明

- `docker-compose.yml` 已整合 MongoDB、Express 伺服器、前端 Vite、Nginx 反向代理
- 所有敏感資訊皆透過 `.env` 注入，請確保 `.env` 設定正確
- 啟動後，前端預設於 [http://localhost:3000](http://localhost:3000) 提供服務
- 後端 API 預設於 [http://localhost:5001](http://localhost:5001)

---

## 📚 開發指南

- 前端原始碼位於 `client/`，後端原始碼於 `server/`
- 相關腳本請見 `scripts/`
- 文件與 API 規格於 `docs/`

---

## 🤝 貢獻指南

歡迎提交 Pull Request！請先開一個 issue 討論您想要進行的變更。

## 📄 授權

[MIT](LICENSE) © 2025 IUE Team