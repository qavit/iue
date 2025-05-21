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
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-primary/10 to-gray-100 py-8 px-2">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h1 className="text-3xl font-extrabold text-primary mb-1 tracking-tight text-center drop-shadow-sm">IUE 多語詞典</h1>
        <div className="text-gray-500 mb-6 text-center text-base">台灣本土語言線上查詢平台</div>
        <SearchBar onSearch={handleSearch} />
        {query && (
          <div className="mb-3 text-gray-600 text-center">搜尋「<span className="font-semibold text-primary">{query}</span>」的結果：</div>
        )}
        <div className="space-y-4 min-h-[120px]">
          {results.length === 0 && query && (
            <div className="text-gray-400 text-center py-8">查無結果</div>
          )}
          {results.map(entry => (
            <div key={entry.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50 shadow-sm hover:shadow-md transition-shadow">
              <div className="font-bold text-xl text-primary mb-1">{entry.term}</div>
              <div className="text-xs text-gray-500 mb-2">{entry.lang}（{entry.dialect}）</div>
              <ul className="list-disc pl-6 text-base text-gray-700">
                {entry.definitions.map((def, idx) => (
                  <li key={idx}>{def}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <footer className="mt-8 text-gray-400 text-xs text-center">
        &copy; 2025 IUE 台灣多語詞典
      </footer>
    </div>
  );
};

export default SearchPage;
