
# ✅ SWE-1 任務說明：IUE 多語詞典 App（MVP 版本）

---

## 📌 專案名稱

**IUE** — 台灣本土語言線上多語詞典平台

---

## 🎯 專案目的

打造一個現代化的台語、客語、原住民語線上詞典平台，整合多語言與多腔調字彙資料，提供查詢、發音、例句等功能。此 MVP 專注於**客語六腔的 JSON 詞目資料查詢與顯示**，作為日後擴展台語與族語的基礎。

---

## 📁 建議專案結構

```
iue/
├── frontend/         # React 前端
├── backend/          # Express + MongoDB 後端
├── data/             # 存放原始 JSON 字典資料與匯入工具
│   ├── hak_sihai.json
│   ├── hak_haolu.json
│   └── ...
├── .env.example
├── docker-compose.yml
└── README.md
```

---

## 📊 詞目 JSON 格式（範例：客語四縣腔）

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

> 🔸 `id` 不具唯一性，應使用 MongoDB `_id`。
> 🔸 每腔為一個獨立 JSON 檔案，需加上 `lang`, `dialect` 欄位。

---

## 🧩 Backend 功能需求（Express）

| API 路徑                    | 功能        | 範例                 |
| ------------------------- | --------- | ------------------ |
| `GET /api/search?query=面` | 模糊搜尋詞目    | 回傳符合的詞目            |
| `GET /api/entry/:id`      | 取得詞目詳細資訊  | 回傳單筆詳細資料           |
| `GET /api/synonyms/:term` | 同義詞查詢（可選） | "狗" → \["犬", "狗隻"] |

* MongoDB Collection 名稱建議：`entries`
* 初始匯入資料：讀取 `data/*.json` → 一次批次寫入

---

## 🖥️ Frontend 功能需求（React）

* 搜尋框 + 查詢按鈕
* 結果列表（詞目、語言、腔調）
* 點擊後展開詳情（發音、例句、分類等）
* 腔調篩選欄（選單或 checkbox）

> UI 可極簡，但需響應式，使用 Tailwind / ShadCN 皆可

---

## ⚙️ 開發工具與建置

* 使用 **Docker + docker-compose** 管理開發環境
* `frontend` 容器：Node 18, React, Vite
* `backend` 容器：Node 18, Express, MongoDB Client
* `mongodb` 容器：預設 port 27017，掛載資料卷

> 初始 `docker-compose up` 即可啟動全系統

---

## 🧱 任務拆解（可交由 SWE-1 模型逐一實作）

### 優先級 A

* [ ] 建立 `data/` 目錄與客語 JSON 詞目解析
* [ ] 撰寫 MongoDB 批次匯入腳本
* [ ] 設計 API `/api/search` 與 `/api/entry/:id`
* [ ] 撰寫 React 搜尋 UI 與結果頁面
* [ ] 整合 Tailwind 做初步排版

### 優先級 B

* [ ] 加入發音音訊欄位顯示（可日後再補音檔）
* [ ] 前端加上語言與腔調過濾器
* [ ] 撰寫 Dockerfile 與 docker-compose.yml
