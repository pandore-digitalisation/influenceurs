"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";

export default function Dashboard() {
  const BASE_URL = "http://localhost:3000";

  const [user, setUser] = useState<any>(null);
  const [lists, setLists] = useState<any[]>([]);
  const [selectedListId, setSelectedListId] = useState<string | null>(null); // Nouvelle état
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("auth_token", token);
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
          setUser(data);

          sendDataToExtension(data, token);
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
                throw new Error("Session expirée. Veuillez vous reconnecter.");
              }

              const listsData = await listsResponse.json();
              setLists(listsData);
            } catch (error) {
              console.error("Erreur de récupération des listes:", error);
              setError("Erreur lors de la récupération des listes.");
            }
          };

          fetchUserLists();
        } catch (error) {
          window.location.href = "/login";
          setError("Session expirée. Veuillez vous reconnecter.");
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    } else {
      setError("Aucun token trouvé dans l'URL.");
      setLoading(false);
    };

    // Send data to extension after user connected
    const sendDataToExtension = (userData: any, token: any) => {
      window.postMessage(
        { action: "sendData", data: userData, token: token },
        window.location.origin
      );
    };

  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        window.location.href = "/login";
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
    } catch (error) {
      console.error("Erreur pendant la déconnexion:", error);
    }
  };

  const toggleListSelection = (listId: string) => {
    setSelectedListId(selectedListId === listId ? null : listId);
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
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Pandore Influencer</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 rounded-full" style={{ cursor: "pointer" }}>
                  <AvatarImage src={user?.data.picture} alt={"PI"} />
                  <AvatarFallback>PI</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-60 px-3 py-5 my-2" style={{ marginLeft: "-210px" }}>
                <div className="pb-5">{user?.data.email}</div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} style={{ cursor: "pointer" }} className="gap-2">
                  <LogOut size={18} />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />

          <h2>Mes Listes</h2>
          {lists.length > 0 ? (
            <ul>
              {lists.map((list) => (
                <li key={list._id}>
                  <p
                    style={{
                      fontWeight: "bold",
                      cursor: "pointer",
                      color: "blue",
                    }}
                    onClick={() => toggleListSelection(list._id)}
                  >
                    {list.name}
                  </p>
                  {selectedListId === list._id && (
                    <ul style={{ paddingLeft: "20px" }}>
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
                          <li
                            key={profile._id}
                            style={{ marginBottom: "10px" }}
                          >
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
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucune liste trouvée.</p>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
