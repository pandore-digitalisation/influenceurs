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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
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
  const BASE_URL = "https://influenceurs.onrender.com";
  // const BASE_URL = "http://localhost:3000";

  const [user, setUser] = useState<any>(null);
  const [lists, setLists] = useState<any[]>([]);
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
          // Sauvegarder les données utilisateur dans le state
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
  }, []);

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
    router.push("/");
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
        <header className="mr-4 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">Pandore Influencer</BreadcrumbLink>
                </BreadcrumbItem>
                {/* <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem> */}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar
                  className="h-8 w-8 rounded-full"
                  style={{ cursor: "pointer" }}
                >
                  <AvatarImage src={user?.data.picture} alt={"PI"} />
                  <AvatarFallback className="rounded-lg">PI</AvatarFallback>
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
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div> */}
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          <div>ok</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
