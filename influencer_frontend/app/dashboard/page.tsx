"use client";

import { AppSidebar } from "@/components/sidebar/sidebar";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Loader } from "@/components/loaders/Loader";


import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import SearchComponent from "@/components/influencer/SearchComponent";
import Statistics from "@/components/statistics/statistics";
import Lists from "@/components/lists/lists";
import Profiles from "@/components/lists/profiles";

export default function Dashboard() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  // const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  // const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  // const BASE_URL = "http://localhost:3000";
  // const BASE_URL = "https://influenceur-list.onrender.com";


  const [user, setUser] = useState<any>(null);
  const [lists, setLists] = useState<any[]>([]);
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [selectedProfiles, setSelectedProfiles] = useState<any[]>([]);

  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeComponent, setActiveComponent] = useState<string | null>(
    "search"
  );

  const router = useRouter();

  // Fonction pour récupérer le token depuis les cookies
  const getTokenFromCookies = () => {
    if (typeof document === "undefined") return null; // Vérification côté client
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth_token="));
    return cookieString ? cookieString.split("=")[1] : null;
  };

  useEffect(() => {
    const token = getTokenFromCookies();
    // console.log("Token récupéré:", token);

    const handleMenuSelection = (event: CustomEvent) => {
      setActiveComponent(event.detail);
    };

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
          localStorage.setItem("userId", data.data.userId);
          localStorage.setItem('userData', JSON.stringify(data));

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
    } else {
      window.location.href = "/login";
    }

    const handleLogoutUser = (event: any) => {
      if (event.data.action === "logoutUser") {
        console.log("Déconnexion détectée depuis l'extension.");
        localStorage.clear();
        localStorage.removeItem("token");
        sessionStorage.clear();
        Cookies.remove("auth_token");

        window.location.href = "/login";
      }
    };

    window.addEventListener("message", handleLogoutUser);
    window.addEventListener(
      "menuSelection",
      handleMenuSelection as EventListener
    );

    return () => {
      window.removeEventListener("message", handleLogoutUser);
      window.removeEventListener(
        "menuSelection",
        handleMenuSelection as EventListener
      );
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
        localStorage.clear();
        sessionStorage.clear();
        Cookies.remove("auth_token");

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
    return <Loader />;
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
        <header className="flex h-12 shrink-0 items-center gap-2 border-b sticky top-0 bg-white z-50">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            {/* <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb> */}
          </div>

          <div className="ml-auto pr-5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar
                  className="h-8 w-8 rounded-full"
                  style={{ cursor: "pointer" }}
                >
                  <AvatarImage src={user?.data.picture} alt={"PI"} />
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
        <nav className="flex h-12 shrink-0 items-center gap-2 border-b sticky top-12 bg-white z-40">
          <div className="flex items-center gap-2 px-3"></div>
          <div className="ml-auto pr-5">
            {" "}
            <a
              href="#"
              className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-1 rounded"
            >
              + Créer une nouvelle liste
            </a>
          </div>
        </nav>

        <div className="flex flex-col gap-4 p-2">
          <div className="grid auto-rows-min gap-4">
            {activeComponent === "search" && <SearchComponent />}
            {activeComponent === "statistics" && <Statistics />}
            {activeComponent === "list" && <Lists />}
            {activeComponent === "profiles" && <Profiles />}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
