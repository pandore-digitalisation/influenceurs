"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
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
import { LogOut, ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

export default function Dashboard() {
  const BASE_URL = "http://localhost:3000";
  // const BASE_URL = "https://influenceurs.onrender.com";

  const [user, setUser] = useState<any>(null);
  const [lists, setLists] = useState<any[]>([]);
  const [selectedListId, setSelectedListId] = useState<string | null>(null); // Nouvelle état
  const [selectedList, setSelectedList] = useState<any | null>(null);
  const [selectedProfiles, setSelectedProfiles] = useState<any[]>([]);

  const [sidebarExpanded, setSidebarExpanded] = useState(true);
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
    }

    // Send data to extension after user connected
    const sendDataToExtension = (userData: any, token: any) => {
      window.postMessage(
        { action: "sendData", data: userData, token: token },
        window.location.origin
      );
    };
  }, []);

  const handleSelectList = (list: any) => {
    setSelectedProfiles(list.profiles || []);
  };
  // const handleSelectList = (list: any) => {
  //   setSelectedList(list);
  // };

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
                <div className="pb-5">{user?.data.email}</div>
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
          <span className="p-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
          </span>
          {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}

          <div>
            <span className="flex h-full">
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
                          selectedList?._id === list._id ? "bg-[#F4F4F5]" : ""
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
        className={`flex-1 ml-${sidebarExpanded ? "64" : "16"} transition-all duration-300 p-6 overflow-y-auto`}
      >
        <h2 className="text-2xl font-bold mb-4">Profils sélectionnés</h2>

        {selectedProfiles.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Nom</th>
                <th className="border border-gray-300 p-2">Plateforme</th>
                <th className="border border-gray-300 p-2">Abonnés</th>
                <th className="border border-gray-300 p-2">Publications</th>
                <th className="border border-gray-300 p-2">Profil</th>
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
                  profileUrl: string;
                }) => (
                  <tr key={profile._id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 p-2">{profile.name}</td>
                    <td className="border border-gray-300 p-2">
                      {profile.plateform}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {profile.followers}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {profile.posts || "N/A"}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <a
                        href={profile.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        Voir
                      </a>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        ) : (
          <p>Sélectionnez une liste pour afficher les profils associés.</p>
        )}
      </main>
            </span>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
