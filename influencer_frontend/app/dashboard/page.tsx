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
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          });

          if (!response.ok) {
            throw new Error("Erreur lors de la récupération des données.");
          }

          const data = await response.json();

          console.log("data", data);

          setUser(data);
          

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

      // Supprimer le token du localStorage
      localStorage.removeItem("auth_token");

      // Rediriger vers la page de connexion
      router.push("/login");
    } catch (error) {
      console.error("Erreur pendant la déconnexion:", error);
    }
  };

  // Si les données sont en cours de chargement
  if (loading) {
    return <div>Chargement...</div>;
  }

  // Si une erreur est survenue
  if (error) {
    return <div>Erreur: {error}</div>;
  }

  // Si l'utilisateur n'est pas authentifié, rediriger vers la page de connexion
  if (!user) {
    router.push("/login"); // Redirection si l'utilisateur n'est pas authentifié
    return null; // Retourner null pendant la redirection
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-end px-4 pt-4">
        <div className="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <svg
            className="absolute w-10 h-10 text-gray-400 -left-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
      <h1>Bienvenue sur votre Dashboard !</h1>
      <div className="flex flex-col items-center">
        {/* <img
          src={user?.picture}
          alt="Photo de profil"
          className="rounded-full w-32 h-32"
        /> */}
        <div>Email : {user?.email}</div>
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
