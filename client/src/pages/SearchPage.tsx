import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';

interface LexiconEntry {
  id: number;
  term: string;
  lang: string;
  dialect: string;
  definitions: string[];
  // ... 其他欄位
}

/**
 * 詞典搜尋主頁
 */
const SearchPage: React.FC = () => {
  const [results, setResults] = useState<LexiconEntry[]>([]);
  const [query, setQuery] = useState('');

  // TODO: 串接 API，這裡先用假資料
  const handleSearch = (q: string) => {
    setQuery(q);
    if (!q) return setResults([]);
    setResults([
      {
        id: 1,
        term: '包包㘝㘝',
        lang: 'hak',
        dialect: 'hoi',
        definitions: ['偷偷摸摸地暗藏東西。']
      },
      {
        id: 2,
        term: '變面',
        lang: 'hak',
        dialect: 'xi\'ien',
        definitions: ['翻臉。對人的態度突然變壞。']
      }
    ]);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">IUE 多語詞典搜尋</h1>
      <SearchBar onSearch={handleSearch} />
      {query && (
        <div className="mb-2 text-gray-600">搜尋「{query}」的結果：</div>
      )}
      <div className="space-y-4">
        {results.length === 0 && query && (
          <div className="text-gray-400">查無結果</div>
        )}
        {results.map(entry => (
          <div key={entry.id} className="border rounded p-3 bg-white shadow">
            <div className="font-semibold text-lg">{entry.term}</div>
            <div className="text-sm text-gray-500 mb-1">{entry.lang}（{entry.dialect}）</div>
            <ul className="list-disc pl-5">
              {entry.definitions.map((def, idx) => (
                <li key={idx}>{def}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
