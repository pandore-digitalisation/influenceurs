"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppSidebar } from "@/components/sidebar/app-sidebar";



// const BASE_URL = "https://influenceurs.onrender.com";
const BASE_URL = "http://localhost:3000";

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

  const goToHome = () => {
    router.push('/');
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              className="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
              style={{ cursor: "pointer" }}
            >
              <img
                src={user?.data.picture}
                alt="Photo de profil"
                className="rounded-full w-8 h-8"
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-72 px-3 py-5 my-2"
            style={{ marginLeft: "-260px" }}
          >
            <div className="pb-5">{user?.data.email}</div>
            {/* <DropdownMenuItem
              onClick={goToHome}
              style={{ cursor: "pointer" }}
            >
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1555_6867)">
                    <path
                      d="M16.1352 17.668C15.8688 17.4777 15.514 17.479 15.2301 17.6419C14.2785 18.1878 13.1757 18.5 12 18.5C8.41015 18.5 5.5 15.5899 5.5 12C5.5 8.41015 8.41015 5.5 12 5.5C13.0635 5.5 14.0673 5.75539 14.9534 6.20817C15.2732 6.37156 15.6674 6.33262 15.9213 6.0787C16.2585 5.74145 16.2092 5.17886 15.7894 4.95262C14.6615 4.34488 13.371 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C13.5103 20 14.9229 19.5815 16.1281 18.8541C16.5699 18.5874 16.5551 17.9679 16.1352 17.668Z"
                      fill="#666E7A"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M15.9697 7.96967C16.2626 7.67678 16.7374 7.67678 17.0303 7.96967L20.5303 11.4697C20.8232 11.7626 20.8232 12.2374 20.5303 12.5303L17.0303 16.0303C16.7374 16.3232 16.2626 16.3232 15.9697 16.0303C15.6768 15.7374 15.6768 15.2626 15.9697 14.9697L18.1893 12.75H11.5C11.0858 12.75 10.75 12.4142 10.75 12C10.75 11.5858 11.0858 11.25 11.5 11.25H18.1893L15.9697 9.03033C15.6768 8.73744 15.6768 8.26256 15.9697 7.96967Z"
                      fill="#666E7A"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_1555_6867">
                      <rect width="24" height="24" fill="white"></rect>
                    </clipPath>
                  </defs>
                </svg>
              </span>
              Home
            </DropdownMenuItem> */}

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              style={{ cursor: "pointer" }}
            >
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1555_6867)">
                    <path
                      d="M16.1352 17.668C15.8688 17.4777 15.514 17.479 15.2301 17.6419C14.2785 18.1878 13.1757 18.5 12 18.5C8.41015 18.5 5.5 15.5899 5.5 12C5.5 8.41015 8.41015 5.5 12 5.5C13.0635 5.5 14.0673 5.75539 14.9534 6.20817C15.2732 6.37156 15.6674 6.33262 15.9213 6.0787C16.2585 5.74145 16.2092 5.17886 15.7894 4.95262C14.6615 4.34488 13.371 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C13.5103 20 14.9229 19.5815 16.1281 18.8541C16.5699 18.5874 16.5551 17.9679 16.1352 17.668Z"
                      fill="#666E7A"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M15.9697 7.96967C16.2626 7.67678 16.7374 7.67678 17.0303 7.96967L20.5303 11.4697C20.8232 11.7626 20.8232 12.2374 20.5303 12.5303L17.0303 16.0303C16.7374 16.3232 16.2626 16.3232 15.9697 16.0303C15.6768 15.7374 15.6768 15.2626 15.9697 14.9697L18.1893 12.75H11.5C11.0858 12.75 10.75 12.4142 10.75 12C10.75 11.5858 11.0858 11.25 11.5 11.25H18.1893L15.9697 9.03033C15.6768 8.73744 15.6768 8.26256 15.9697 7.96967Z"
                      fill="#666E7A"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_1555_6867">
                      <rect width="24" height="24" fill="white"></rect>
                    </clipPath>
                  </defs>
                </svg>
              </span>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <h1>Bienvenue sur votre Dashboard {user?.data.name}!</h1>
      <div className="flex flex-col items-center">
        {/* <div>Email : {user?.data.email}</div>
        <div>userId : {user?.data.userId}</div> */}

        {/* Affichage des listes */}
        <div>
          <h2>Mes Listes</h2>
          {lists.length > 0 ? (
            <ul>
              {lists.map((list) => (
                <li key={list._id}>
                  <p>
                    <strong>Liste ID :</strong> {list._id}
                  </p>
                  <p>
                    <strong>Nom de la liste :</strong> {list.name}
                  </p>
                  <ul>
                    {list.profiles.map(
                      (profile: {
                        _id: string;
                        name: string;
                        plateform: string;
                        followers: string;
                        posts: string;
                        profileUrl: string;
                        profileImage: string;
                        following: string;
                      }) => (
                        <li key={profile._id} style={{ marginBottom: "10px" }}>
                          <p>
                            <strong>Nom :</strong> {profile.name}
                          </p>
                          <p>
                            <strong>Plateforme :</strong> {profile.plateform}
                          </p>
                          <p>
                            <strong>Abonnés :</strong> {profile.followers}
                          </p>
                          <p>
                            <strong>Following :</strong> {profile.following}
                          </p>
                          <p>
                            <strong>Publications :</strong>{" "}
                            {profile.posts || "N/A"}
                          </p>
                          <p>
                            <strong>URL :</strong>{" "}
                            <a
                              href={profile.profileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {profile.profileUrl}
                            </a>
                          </p>
                        </li>
                      )
                    )}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucune liste trouvée.</p>
          )}
        </div>
      </div>
    </main>
  );
}
