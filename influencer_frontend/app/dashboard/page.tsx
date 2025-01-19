"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const BASE_URL = "https://influenceurs.onrender.com";


export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [lists, setLists] = useState<any[]>([]); // Nouvel état pour les listes
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
          const response = await fetch(`${BASE_URL}/auth/user`, {
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

          // Sauvegarder les données utilisateur dans le state
          setUser(data);
         
          sendDataToExtension(data, token);
          // Une fois l'utilisateur récupéré, récupérer les listes associées à cet utilisateur
          const fetchUserLists = async () => {
            try {
              const listsResponse = await fetch(
                `${BASE_URL}/lists/user/${data.data.userId}`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (!listsResponse.ok) {
                window.location.href = "/login";
                throw new Error(
                  "Votre session est expirées, veillez vous reconnecter."
                );
              }

              const listsData = await listsResponse.json();
              console.log("listData", listsData);
              setLists(listsData); // Mettre à jour l'état des listes
            } catch (error) {
              console.error("Erreur de récupération des listes:", error);
              setError("Erreur lors de la récupération des listes.");
            }
          };

          fetchUserLists();
        } catch (error) {
          window.location.href = "/login";
          setError("Votre session est expirées, veillez vous reconnecter.");
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    } else {
      setError("Aucun token trouvé dans l'URL.");
      setLoading(false);
    }

    // Send data to extension after user connected
    const sendDataToExtension = (userData: any, token: any) => {
      window.postMessage(
        { action: "sendData", data: userData, token: token },
        window.location.origin
      );
    };
  }, [searchParams]);

  // Logout
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        window.location.href = "/login";
        window.postMessage({ action: "logoutUser" }, window.location.origin);
        return;
      }

      const response = await fetch(`${BASE_URL}/auth/logout`, {
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

      window.location.href = "/login";
      window.postMessage({ action: "logoutUser" }, window.location.origin);
    } catch (error) {
      console.error("Erreur pendant la déconnexion:", error);
    }
  };

  // Dans la page web
  // window.addEventListener("message", function (event) {
  //   if (event.origin !== window.location.origin) return; // S'assurer que le message vient du bon domaine

  //   const { action } = event.data;

  //   if (action === "logout") {
  //     // Code pour déconnecter l'utilisateur de la page web
  //     // Par exemple, effacer les données du sessionStorage ou rediriger l'utilisateur
  //     console.log("Déconnexion depuis l'extension.");
  //     // Effectuer la déconnexion sur la page web
  //     window.location.href = "/logout"; // ou effacer les cookies/sessionStorage
  //   }
  // });

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
        <div>userId : {user?.data.userId}</div>

        {/* Affichage des listes */}
        <div>
          <h2>Mes Listes</h2>
          {lists.length > 0 ? (
            <ul>
              {lists.map((list) => (
                <li key={list.index}>
                  {list._id} - {list.name} - {list.profiles.description}
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucune liste trouvée.</p>
          )}
        </div>

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
