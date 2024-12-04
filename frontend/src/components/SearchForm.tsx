"use client";

import { useState } from "react";
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function SearchForm({
  onSearch,
}: {
  onSearch: (platform: string, query: string) => void;
}) {
  const [platform, setPlatform] = useState("instagram");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);  // Set loading to true when search starts
    await onSearch(platform, query);
    setLoading(false); // Set loading to false when search completes
  };

  return (
    <div>
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
        <span className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by influencer username"
            className="rounded flex-1 pl-9 h-10"
          />
        </span>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <div className="w-5 h-5 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-blue-500"></div>
          ) : (
            "Search"
          )}
        </Button>
      </form>
      {loading && <div className="mt-4 text-center text-gray-500">Searching...</div>}
    </div>
  );
}


// "use client";

// import { useState } from "react";
// import { Input } from '@/components/ui/input';
// import { Search } from 'lucide-react';
// import { Button } from "@/components/ui/button"




// export default function SearchForm({
//   onSearch,
// }: {
//   onSearch: (platform: string, query: string) => void;
// }) {
//   const [platform, setPlatform] = useState("instagram");
//   const [query, setQuery] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSearch(platform, query);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit} className="flex gap-4 mt-4">
//         <select
//           value={platform}
//           onChange={(e) => setPlatform(e.target.value)}
//           className="border px-2 py-1 rounded"
//         >
//           <option value="instagram">Instagram</option>
//           <option value="facebook">Facebook</option>
//           <option value="tiktok">TikTok</option>
//         </select>
//         <span className="relative flex-1">
//         <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//         <Input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Search by influencer username"
//           className=" rounded flex-1 pl-9 h-10"
//         />
//         </span>
//         <Button type="submit">Search</Button> 
//         {/* <button
//           type="submit"
//           className="bg-green-500 text-white px-4 py-2 rounded"
//         >
//           Rechercher
//         </button> */}
//       </form>
//     </div>
//   );
// }
