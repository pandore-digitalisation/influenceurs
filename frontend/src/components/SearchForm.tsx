"use client";

import { useState } from "react";

export default function SearchForm({
  onSearch,
}: {
  onSearch: (platform: string, query: string) => void;
}) {
  const [platform, setPlatform] = useState("instagram");
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(platform, query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 mt-4">
      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
        className="border px-2 py-1 rounded"
      >
        <option value="instagram">Instagram</option>
        <option value="facebook">Facebook</option>
        <option value="tiktok">TikTok</option>
      </select>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Nom d'utilisateur"
        className="border px-2 py-1 rounded flex-1"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Rechercher
      </button>
    </form>
  );
}