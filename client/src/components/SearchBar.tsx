import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

/**
 * 搜尋輸入元件
 * @param onSearch 輸入送出時的 callback
 */
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(input.trim());
  };

  return (
    <form className="flex gap-2 my-4" onSubmit={handleSubmit}>
      <input
        type="text"
        className="border rounded px-3 py-2 flex-1"
        placeholder="請輸入關鍵字..."
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >搜尋</button>
    </form>
  );
};

export default SearchBar;
