"use client";

import { Loader } from "@/components/loaders/Loader";
import { useEffect, useState } from "react";

const BASE_URL = "http://localhost:3000";
// const BASE_URL = "https://influenceur-list.onrender.com";

export default function Profiles() {
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState<any[]>([]);


  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchUserProfiles = async () => {
      try {
        const profilesResponse = await fetch(`${BASE_URL}/platforms/all`, {
          method: "GET",
        });

        const profilesData = await profilesResponse.json();

        const scrappedProfiles = profilesData.filter((profile: any) =>
          profile.userId.includes(userId)
        );

        setProfiles(scrappedProfiles);
        console.log("p", scrappedProfiles);

      } catch (error) {
        console.error("Erreur de récupération des profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfiles();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-1 flex-col gap-4 p-4 mx-auto">ok
        {profiles.map((profile) => (
            <div key={profile._id}>
                {profile.name}
            </div>
        ))}
      </div>
    </div>
  );
}
