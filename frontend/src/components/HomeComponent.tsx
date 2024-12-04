"use client";

import { useState } from "react";
import SearchForm from "../components/SearchForm";
import ProfileCard from "../components/ProfileCard";
import { exportToCSV } from "../utils/csvExporter";
import axios from "axios";

interface Profile {
    [key: string]: string | number | boolean | null;
    followers_count: string;
    following_count: string;
    is_verified: string,
    posts_count: string,
    posts: string;
    bio: string;
    name: string;
    profilePicture: string;
    platform: string;
    profile_url: string;
    page_name: string;
    page_likes: string;
    page_followers: string;
    page_category: string;
    page_website: string

  }

export default function ClientComponent() {
  const [profiles, setProfiles] = useState<Profile[]>([]);

  const handleSearch = async (platform: string, query: string) => {
    try {
      const endpoint = `/api/${platform}`;
      const params = { username: query };

      const response = await axios.get(endpoint, { params });

      setProfiles([...profiles, response.data]);
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
    }
  };

  const handleExport = () => {
    exportToCSV(profiles, "profiles.csv");
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      <button
        onClick={handleExport}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        Exporter en CSV
      </button>
      <div className="grid gap-4 mt-6">
        {profiles.map((profile, index) => (
          <ProfileCard key={index} profile={profile} />
        ))}
      </div>
    </div>
  );
}