"use client";

import { AppSidebar } from "@/components/sidebar/sidebar";
import React, { useState, useEffect, useCallback } from "react";
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
import { Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogOut } from "lucide-react";
import SearchComponent from "@/components/influencer/SearchComponent";
import Statistics from "@/components/statistics/statistics";
import Lists from "@/components/lists/lists";
import Profiles from "@/components/lists/profiles";

const BASE_URL = "http://localhost:3000";
// const BASE_URL = "https://influenceur-list.onrender.com";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [lists, setLists] = useState<any[]>([]);
  const [refreshLists, setRefreshLists] = useState(false);
  const [listCreated, setListCreated] = useState(false);
  const [listNameRequired, setlistNameRequired] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [listName, setListName] = useState("");
  const [profiles, setProfiles] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [activeComponent, setActiveComponent] = useState<string | null>(
    "search"
  );
  const [showOk, setShowOk] = useState(true);
  const router = useRouter();

  const getTokenFromCookies = useCallback(() => {
    return Cookies.get("auth_token") || null;
  }, []);

  const openForm = () => {
    setFormVisible(true);
  };

  const closeForm = () => {
    setFormVisible(false);
  };

  const fetchUserLists = useCallback(async (token: string, userId: string) => {
    try {
      const listsResponse = await fetch(`${BASE_URL}/lists/user/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

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
  }, []);

  const fetchUserData = useCallback(async (token: string) => {
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
      localStorage.setItem("userData", JSON.stringify(data));

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

      // await fetchUserLists(token, data.data.userId);
      window.postMessage({ action: "userLoggedIn", token, data }, "*");
    } catch (error) {
      console.error("Erreur:", error);
      window.location.href = "/login";
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProfiles = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/profiles`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des profils");
      }
      const data = await response.json();
      setProfiles(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleCreateList = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!listName.trim()) {
      setlistNameRequired(true);
      setTimeout(() => {
        setlistNameRequired(false);
      }, 3000);
      return;
    }
    const token = localStorage.getItem("token");
    const userDataString = localStorage.getItem("userData");
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const userId = userData?.data.userId || null;

    if (!token || !userId) {
      alert("Utilisateur non authentifié. Veuillez vous reconnecter.");
      return;
    }

    let profileObjects = [];
    if (profiles.trim()) {
      try {
        profileObjects = JSON.parse(profiles);
        if (!Array.isArray(profileObjects)) {
          throw new Error("Les profils doivent être sous forme de tableau.");
        }
      } catch (error) {
        console.error("Erreur lors du parsing des profils:", error);
        alert("Le format des profils est invalide.");
        return;
      }
    }

    const newList = {
      name: listName,
      userId: userId,
      profiles: profileObjects.length > 0 ? profileObjects : undefined,
      // profiles: profiles ? profiles.split(",").map((p) => p.trim()) : undefined,
    };

    try {
      const response = await fetch(`${BASE_URL}/lists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newList),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création de la liste.");
      }
      setListCreated(true);
      setListName("");
      setProfiles("");
      setTimeout(() => {
        closeForm();
        setListCreated(false);
      }, 3000);
    } catch (error) {
      console.error("Erreur:", error);
      alert("Une erreur est survenue.");
    }
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

  useEffect(() => {
    const token = getTokenFromCookies();
    // const token = new URLSearchParams(window.location.search).get('token');

    if (token) {
      localStorage.setItem("token", token);
      fetchUserData(token);
    } else {
      window.location.href = "/login";
    }

    const timer = setTimeout(() => {
      setShowOk(false);
    }, 3000);

    const handleMenuSelection = (event: CustomEvent) => {
      setActiveComponent(event.detail);
    };

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
      clearTimeout(timer);
    };
  }, [getTokenFromCookies, fetchUserData, fetchUserLists, fetchProfiles]);

  // AFTER HANDLE FONCTION

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

          {/* Affiche "ok" brièvement */}
          {showOk && (
            <div className="flex-1 flex justify-center text-green-500 font-bold transition-opacity duration-1000">
              ok
            </div>
          )}

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
            {/* Card dialog */}
            <span className="dioalog">
              <Dialog open={formVisible} onOpenChange={setFormVisible}>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    onClick={openForm}
                    className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-1 rounded"
                  >
                    + Créer une nouvelle liste
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="mb-5">
                      Créez votre liste
                    </DialogTitle>
                    {listCreated && (
                      <span className="text-green-800">
                        Liste créée avec succès !
                      </span>
                    )}
                    {listNameRequired && (
                      <span className="text-red-800">
                        Le nom de la liste est obligatoire.
                      </span>
                    )}
                    <Alert variant="default">
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        Définissez un nom de liste pour y stocker vos données.
                        Vous pourrez ensuite gérer toutes vos listes depuis "Mes
                        listes".
                      </AlertDescription>
                    </Alert>
                  </DialogHeader>

                  <form onSubmit={handleCreateList}>
                    <div className="grid gap-4 py-4">
                      <div className="grid w-full max-w-sm items-center gap-1.5 mb-10">
                        <Label htmlFor="email">Nom de la liste*</Label>
                        <Input
                          type="text"
                          id="listname"
                          value={listName}
                          onChange={(e) => setListName(e.target.value)}
                          placeholder="Ex: Ma liste"
                        />
                      </div>

                      {/* <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="email">Choisir le profile.</Label>
                      <Input value={profiles} onChange={(e) => {setProfiles(e.target.value)}} id="email" placeholder="Profile" />
                    </div> */}
                    </div>
                    <DialogFooter className="flex justify-between w-ful">
                      <DialogClose asChild>
                        <Button
                          type="button"
                          variant="secondary"
                          className="px-3 py-2 ml-50 mr-auto"
                        >
                          Annuler
                        </Button>
                      </DialogClose>
                      <Button type="submit" className="px-3 py-2">
                        Créer une liste
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </span>
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
