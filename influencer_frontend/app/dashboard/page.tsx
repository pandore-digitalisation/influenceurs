"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // Récupérer le token depuis l'URL via searchParams
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("auth_token", token);

      // Utiliser le token pour récupérer les données de l'utilisateur
      const fetchUserData = async () => {
        try {
          const response = await fetch("http://localhost:3000/auth/user", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            credentials: "include",
          });

          if (!response.ok) {
            throw new Error("Erreur lors de la récupération des données.");
          }

          const data = await response.json();

          console.log("data", data);

          setUser(data);
          sendDataToExtension(data)
        } catch (error) {
          setError("Erreur lors de la récupération des données utilisateur.");
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    } else {
      setError("Aucun token trouvé dans l'URL.");
      setLoading(false);
    }
  }, [searchParams]);

  const sendDataToExtension = (userData: any) => {


    window.postMessage(
      { action: "sendData", data: userData },
      window.location.origin
    );
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la déconnexion.");
      }

      localStorage.removeItem("auth_token");

      sessionStorage.clear();

      window.location.href = "/login"

    } catch (error) {
      console.error("Erreur pendant la déconnexion:", error);
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-end px-4 pt-4">
        <div className="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <img
          src={user?.data.picture}
          alt="Photo de profil"
          className="rounded-full w-8 h-8"
        />
        </div>
      </div>
      <h1>Bienvenue sur votre Dashboard {user?.data.name}!</h1>
      <div className="flex flex-col items-center">
        <div>Email : {user?.data.email}</div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Déconnexion
        </button>

      </div>
    </main>
  );
}
