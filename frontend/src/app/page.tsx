"use client";

import { useState } from "react";
import SearchForm from "../components/SearchForm";
import ProfileCard from "../components/ProfileCard";
import { exportToCSV } from "../utils/csvExporter";
import axios from "axios";


interface Profile {
  // id: string; // Identifiant unique du profil
  name: string; // Nom de l'utilisateur
  profilePicture: string; // URL de la photo de profil
  platform: string; // Plateforme (Instagram, Facebook, etc.)
  followers: string,
  posts: string,
  // [key: string]: any; // (Optionnel) Autres champs dynamiques
}

export default function Home() {
  // const [profiles, setProfiles] = useState([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);


  const handleSearch = async (platform: string, query: string) => {
    try {
      const endpoint = `/api/${platform}`;
      const params =
        platform === "tiktok" ? { profile_url: query } : { username: query };

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
    <main>
      <h1 className="text-2xl font-bold">Scraper Frontend</h1>
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
    </main>
  );
}