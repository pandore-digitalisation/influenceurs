"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { SearchFiltersComponent } from "@/components/search/SearchFilters";
import { InfluencerCard } from "@/components/search/InfluencerCard";
import { MockSocialMediaAdapter } from "@/lib/adapters/social-media-adapter";
import { Influencer, SearchFilters } from "@/lib/types/influencer";
import { Search } from "lucide-react";
import { useRouter } from 'next/navigation'


export default function SearchComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({});
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  // Initialize adapters for different platforms
  const mockAdapter = new MockSocialMediaAdapter("all");

  const handleSearch = async () => {
    setLoading(true);
    try {
      const results = await mockAdapter.searchInfluencers(searchQuery, filters);
      setInfluencers(results);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
        Recherche d'influenceurs
        </h1>

        <div className="flex gap-2 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Recherche d'influenceurs..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleSearch();
              }}
              className="pl-9"
            />
          </div>
          <SearchFiltersComponent
            onFiltersChange={(newFilters) => {
              setFilters(newFilters);
              handleSearch();
            }}
          />
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="text-center text-muted-foreground">Loading...</div>
          ) : influencers.length > 0 ? (
            influencers.map((influencer) => (
              <InfluencerCard key={influencer.id} influencer={influencer} />
            ))
          ) : (
            <div className="text-center text-muted-foreground">
              {searchQuery
                ? "No influencers found. Try adjusting your search or filters."
                : "Start searching to find influencers."}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
