# IUE 台灣多語線上詞典

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

IUE 是一個現代化的台灣多語線上詞典平台，專注於整合台灣本土語言（客語、台語、原住民語）的詞彙資料，提供便利的查詢與學習體驗。

## ✨ 功能特色

- 📚 多語言支援：整合客語六腔、台語、原住民語等台灣本土語言
- 🔍 智慧搜尋：支援模糊搜尋、同義詞查詢
- 🎧 發音功能：提供詞彙發音（待實作）
- 📱 響應式設計：在各種裝置上都能流暢使用
- 🚀 現代化技術棧：使用 React + TypeScript + Express + MongoDB

## 🏗️ 專案結構

```
iue/
├── client/                  # 前端 React 應用程式
│   ├── public/             # 靜態檔案
│   └── src/                # 原始碼
│       ├── components/      # 共用元件
│       ├── pages/          # 頁面元件
│       ├── hooks/          # 自定義 hooks
│       ├── services/       # API 服務
│       ├── styles/         # 全域樣式
│       ├── types/          # TypeScript 類型定義
│       ├── utils/          # 工具函數
│       ├── App.tsx         # 主應用程式
│       └── main.tsx        # 入口文件
│
├── server/                 # 後端 Express 應用程式
│   ├── config/            # 設定檔
│   ├── controllers/       # 控制器
│   ├── models/            # 資料模型
│   ├── routes/            # 路由
│   ├── services/          # 業務邏輯
│   ├── utils/             # 工具函數
│   ├── app.ts             # Express 應用程式
│   └── server.ts          # 伺服器入口
│
├── data/                  # 詞典資料
│   ├── oan.json           # 台語資料
│   ├── hak_xi.json        # 四縣腔資料
│   ├── hak_hoi.json       # 海陸腔資料
│   ├── hak_tai.json       # 大埔腔資料
│   ├── hak_ngiau.json     # 饒平腔資料
│   ├── hak_zhio.json      # 詔安腔資料
│   └── hak_sxi.json       # 南四縣腔資料
│
├── docker/                # Docker 相關檔案
│   ├── mongo/            # MongoDB 初始化腳本
│   ├── nginx/            # Nginx 設定
│   └── docker-compose.yml # Docker Compose 設定
│
├── docs/                 # 專案文件
│   ├── api/             # API 文件
│   └── database/        # 資料庫設計
│
├── scripts/              # 腳本
│   ├── import-data.js    # 資料匯入腳本
│   └── seed-db.js        # 資料庫種子腳本
│
├── .env.example          # 環境變數範例
├── .gitignore           # Git 忽略檔案
├── package.json         # 根目錄 package.json (workspace)
├── tsconfig.json        # TypeScript 設定
└── README.md            # 專案說明文件
```

## 🚀 快速開始

### 前置需求

- Node.js 18+
- Docker 與 Docker Compose
- MongoDB 6.0+

### 開發環境設定

1. 複製儲存庫
   ```bash
   git clone https://github.com/yourusername/iue.git
   cd iue
   ```

2. 複製環境變數檔案
   ```bash
   cp .env.example .env
   ```

3. 啟動 Docker 容器
   ```bash
   docker-compose up -d
   ```

4. 安裝依賴套件
   ```bash
   # 安裝根目錄依賴
   npm install
   
   # 安裝前端依賴
   cd client && npm install
   
   # 安裝後端依賴
   cd ../server && npm install
   ```

5. 啟動開發伺服器
   ```bash
   # 在專案根目錄執行
   npm run dev
   ```

## 📚 開發指南

### 資料格式

詞目 JSON 格式範例：

```json
{
  "id": 8,
  "term": "變面",
  "lang": "hak",
  "dialect": "xi'ien",
  "partOfSpeech": "",
  "termIndexes": [
    "詞目分類索引/表情動作",
    "詞目分類索引/人際互動"
  ],
  "pronunciation": {
    "standardPronunciation": "bien55 mien55",
    "pronunciationNotes": ""
  },
  "definitions": [
    "翻臉。對人的態度突然變壞。"
  ],
  "examples": [
    {
      "sentenceHak": "佢當難服侍，動啊著就變面。",
      "sentenceZh": "他很難伺候，動不動就翻臉。"
    }
  ],
  "similarTerms": ["壞面", "貶面"],
  "oppositeTerms": [],
  "audioFileName": ""
}
```

## 🤝 貢獻指南

歡迎提交 Pull Request！請先開一個 issue 討論您想要進行的變更。

## 📄 授權

[MIT](LICENSE) © 2025 IUE Team