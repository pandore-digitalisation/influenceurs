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
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            credentials: 'include',

          });

          if (!response.ok) {
            throw new Error("Erreur lors de la récupération des données.");
          }

          const data = await response.json();
          console.log("data", data)
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
  }, [searchParams]); // Déclencher l'effet lorsqu'il y a un changement dans les paramètres de l'URL

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
      <h1>Bienvenue sur votre Dashboard, {user.username}!</h1>
      <div className="flex flex-col items-center">
        <img
          src={user?.picture}
          alt="Photo de profil"
          className="rounded-full w-32 h-32"
        />
        <div>Email : {user?.email}</div>
      </div>
    </main>
  );
}



// "use client";

// import React from "react";
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';

// export default function Dashboard() {
//   const [user, setUser] = useState(null);
//   // const router = useRouter()


//   useEffect(() => {
   
//   })
  
//   return (
//     <main className="container mx-auto px-4 py-8">
//         <div>
//             Dashboard
//         </div>
//       <div className="flex flex-col items-center">
       
//       </div>
//     </main>
//   );
// }