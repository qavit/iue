
# ✅ SWE-1 任務說明：IUE 多語詞典 App（MVP 版本）

---

## 📌 專案名稱

**IUE** — 台灣本土語言線上多語詞典平台

---

## 🎯 專案目的

打造一個現代化的台語、客語、原住民語線上詞典平台，整合多語言與多腔調字彙資料，提供查詢、發音、例句等功能。此 MVP 專注於**客語六腔的 JSON 詞目資料查詢與顯示**，作為日後擴展台語與族語的基礎。

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


## 🧱 任務拆解（可交由 SWE-1 模型逐一實作）

### 優先級 A

* [ ] 建立 `data/` 目錄與客語 JSON 詞目解析
* [ ] 撰寫 MongoDB 批次匯入腳本
* [ ] 設計 API `/api/search`
