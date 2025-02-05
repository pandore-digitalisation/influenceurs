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
  // const BASE_URL = "http://localhost:3000";
  const BASE_URL = "https://influenceur-list.onrender.com";

  const [user, setUser] = useState<any>(null);
  const [lists, setLists] = useState<any[]>([]);
  const [selectedListId, setSelectedListId] = useState<string | null>(null); // Nouvelle état
  const [selectedProfiles, setSelectedProfiles] = useState<any[]>([]);

  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");

    // console.log("Token récupéré:", token);

    if (token) {
      localStorage.setItem("token", token);

      // window.postMessage({ action: "userLoggedIn", token }, "*");

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

          // sendDataToExtension(data, token);
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

          window.postMessage({ action: "userLoggedIn", token, data }, "*");

          // Envoi des infos utilisateur au sidebar
          // window.postMessage({ action: "updateUserInfo", userData: data }, "*");
        } catch (error) {
          console.error("Erreur:", error);
          window.location.href = "/login";
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }

    const handleLogoutUser = (event: any) => {
      if (event.data.action === "logoutUser") {
        console.log("Déconnexion détectée depuis l'extension.");
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    };

    window.addEventListener("message", handleLogoutUser);

    return () => {
      window.removeEventListener("message", handleLogoutUser);
    };
  }, []);

  const handleSelectList = (list: any) => {
    setSelectedListId(list._id);
    setSelectedProfiles(list.profiles || []);
  };

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

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

      if (response.ok) {
        localStorage.removeItem("auth_token");
        sessionStorage.clear();

        window.postMessage({ action: "logoutUser", token }, "*");

        window.postMessage({ action: "logoutUser" }, window.location.origin);
        // window.postMessage({ action: "logoutUser",  }, "*");

        window.location.href = "/login";
      } else {
        throw new Error("Erreur lors de la déconnexion.");
      }
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
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Aquizition by Pandore</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar
                  className="h-8 w-8 rounded-full"
                  style={{ cursor: "pointer" }}
                >
                  <AvatarImage src={user?.data.picture} alt={"PI"} />
                  <AvatarFallback>PI</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-60 px-3 py-5 my-2"
                style={{ marginLeft: "-210px" }}
              >
                <div className="pb-5 text-sm font-semibold">
                  {user?.data.email}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  style={{ cursor: "pointer" }}
                  className="gap-2"
                >
                  <LogOut size={18} />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 pt-0">
          <span className="p-4 pb-0 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
          </span>
          {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
          <span className="flex h-screen overflow-hidden">
            <aside
              className={`bg-[#FAFAFA] text-[#000000] transition-all duration-300 ${
                sidebarExpanded ? "w-64" : "w-16"
              }`}
            >
              <div className="p-4 flex items-center justify-between">
                <span
                  className={`${
                    !sidebarExpanded ? "hidden" : "block"
                  } text-lg font-semibold`}
                >
                  Mes Listes
                </span>
                <button
                  onClick={toggleSidebar}
                  className="text-[#D9E4FF] focus:outline-none hover:bg-gray-700 p-2 rounded"
                >
                  {sidebarExpanded ? "←" : "→"}
                </button>
              </div>
              <ul className="space-y-2 p-4">
                {lists.length > 0 ? (
                  lists.map((list) => (
                    <li
                      key={list._id}
                      className={`p-2 cursor-pointer hover:bg-[#F4F4F5] rounded ${
                        selectedListId === list._id ? "bg-[#F4F4F5]" : ""
                      }`}
                      onClick={() => handleSelectList(list)}
                    >
                      {sidebarExpanded ? list.name : list.name[0]}{" "}
                      {/* Affichage compact */}
                    </li>
                  ))
                ) : (
                  <li>Aucune liste disponible.</li>
                )}
              </ul>
            </aside>
            {/* Main Content */}
            <main
              className={`flex-1 ml-${
                sidebarExpanded ? "64" : "16"
              } transition-all duration-300 p-4 pt-0 overflow-y-auto`}
            >
              <h2 className="text-2xl font-bold mb-4">Profils sélectionnés</h2>

              {selectedProfiles.length > 0 ? (
                <div className="relative overflow-x-auto border sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="p-4">
                          <div className="flex items-center">
                            <input
                              id="checkbox-all-search"
                              type="checkbox"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                              htmlFor="checkbox-all-search"
                              className="sr-only"
                            >
                              checkbox
                            </label>
                          </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Followers
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Following
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Plateform
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Url
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedProfiles.map(
                        (profile: {
                          _id: string;
                          name: string;
                          plateform: string;
                          followers: string;
                          posts: string;
                          following: string;
                          profileUrl: string;
                        }) => (
                          <tr className="bg-white border-b hover:bg-gray-50">
                            <td className="w-4 p-4">
                              <div className="flex items-center">
                                <input
                                  id="checkbox-table-search-1"
                                  type="checkbox"
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                  htmlFor="checkbox-table-search-1"
                                  className="sr-only"
                                >
                                  checkbox
                                </label>
                              </div>
                            </td>
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {profile.name}
                            </th>
                            <td className="px-6 py-4">{profile.followers}</td>
                            <td className="px-6 py-4">{profile.following}</td>
                            <td className="px-6 py-4">{profile.plateform}</td>
                            <td className="px-6 py-4">
                              <a
                                href={profile.profileUrl}
                                target="_blank"
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                              >
                                v
                              </a>
                            </td>
                          </tr>
                        )
                      )}{" "}
                    </tbody>{" "}
                  </table>
                </div>
              ) : (
                <p>
                  Sélectionnez une liste pour afficher les profils associés.
                </p>
              )}
            </main>
          </span>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
