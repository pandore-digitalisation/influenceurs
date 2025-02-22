"use client";

import { AppSidebar } from "@/components/sidebar/sidebar";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
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
import Lists from "@/components/lists/Lists";
import Profiles from "@/components/lists/Profiles";

const BASE_URL = "http://localhost:3000";
// const BASE_URL = "https://influenceur-list.onrender.com";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeComponent, setActiveComponent] = useState<string | null>("search");
  const [showOk, setShowOk] = useState(true);
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Vérifier la présence du token dans les cookies
    const tokenFromCookies = Cookies.get("auth_token");
    if (tokenFromCookies) {
      setToken(tokenFromCookies);
      localStorage.setItem("token", tokenFromCookies);
    } else {
      router.push("/login");  // Rediriger si aucun token
    }
  }, [router]);

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

      window.postMessage({ action: "userLoggedIn", token, data }, "*");
    } catch (error) {
      console.error("Erreur:", error);
      window.location.href = "/login";
    } finally {
      setLoading(false);
    }
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

      if (response.ok) {
        localStorage.removeItem("auth_token");
        localStorage.clear();
        sessionStorage.clear();
        Cookies.remove("auth_token");

        window.postMessage({ action: "logoutUser", token }, "*");
        window.location.href = "/login";
      } else {
        throw new Error("Erreur lors de la déconnexion.");
      }
    } catch (error) {
      console.error("Erreur pendant la déconnexion:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserData(token);  // Récupérer les données utilisateur
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
        sessionStorage.clear();
        Cookies.remove("auth_token");

        window.location.href = "/login";
      }
    };

    window.addEventListener("message", handleLogoutUser);
    window.addEventListener("menuSelection", handleMenuSelection as EventListener);

    return () => {
      window.removeEventListener("message", handleLogoutUser);
      window.removeEventListener("menuSelection", handleMenuSelection as EventListener);
      clearTimeout(timer);
    };
  }, [token, fetchUserData]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  if (!user) {
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
          </div>
          {showOk && (
            <div className="flex-1 flex justify-center text-green-500 font-bold transition-opacity duration-1000">
              ok
            </div>
          )}
          <div className="ml-auto pr-5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 rounded-full" style={{ cursor: "pointer" }}>
                  <AvatarImage src={user?.data.picture} alt={"PI"} />
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-60 px-3 py-5 my-2" style={{ marginLeft: "-210px" }}>
                <div className="pb-5 text-sm font-semibold">{user?.data.email}</div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="gap-2">
                  <LogOut size={18} />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <div className="flex flex-col gap-4">
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



// "use client";

// import { AppSidebar } from "@/components/sidebar/sidebar";
// import React, { useState, useEffect, useCallback } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import Cookies from "js-cookie";
// import { Loader } from "@/components/loaders/Loader";

// import { Separator } from "@/components/ui/separator";
// import {
//   SidebarInset,
//   SidebarProvider,
//   SidebarTrigger,
// } from "@/components/ui/sidebar";
// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuSeparator,
//   DropdownMenuItem,
// } from "@/components/ui/dropdown-menu";
// import { LogOut } from "lucide-react";
// import SearchComponent from "@/components/influencer/SearchComponent";
// import Statistics from "@/components/statistics/statistics";
// import Lists from "@/components/lists/lists";
// import Profiles from "@/components/lists/profiles";

// const BASE_URL = "http://localhost:3000";
// // const BASE_URL = "https://influenceur-list.onrender.com";

// export default function Dashboard() {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [activeComponent, setActiveComponent] = useState<string | null>(
//     "search"
//   );
//   const [showOk, setShowOk] = useState(true);
//   const router = useRouter();
//   const [token, setToken] = useState<string | null>(null);

//   useEffect(() => {
//     // Appel de l'API pour récupérer le token
//     const fetchToken = async () => {
//       try {
//         const response = await fetch('/api/auth/me', {
//           method: 'GET',
//           credentials: 'include',
//         });

//         console.log("res", response)

//         if (response.ok) {
//           const data = await response.json();
//           setToken(data.token); // Sauvegarder le token dans l'état local
//         } else {
//           console.error('User not authenticated or token missing');
//         }
//       } catch (error) {
//         console.error('Error fetching token:', error);
//       }
//     };

//     fetchToken();
//   }, []);
//   // console.log("token from nextjs api", token)

//   // const getTokenFromCookies = useCallback(() => {
//   //   return Cookies.get("auth_token") || null;
//   // }, []);

//   const fetchUserData = useCallback(async (token: string) => {
//     try {
//       const response = await fetch(`${BASE_URL}/auth/user`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         credentials: "include",
//       });

//       if (!response.ok) {
//         throw new Error("Erreur lors de la récupération des données.");
//       }

//       const data = await response.json();
//       setUser(data);
//       localStorage.setItem("userId", data.data.userId);
//       localStorage.setItem("userData", JSON.stringify(data));

//       window.postMessage({ action: "userLoggedIn", token, data }, "*");
//     } catch (error) {
//       console.error("Erreur:", error);
//       window.location.href = "/login";
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const handleLogout = async () => {
//     try {
//       const token = localStorage.getItem("auth_token");
//       if (!token) {
//         window.location.href = "/login";
//         return;
//       }

//       const response = await fetch(`${BASE_URL}/auth/logout`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         credentials: "include",
//       });

//       if (response.ok) {
//         localStorage.removeItem("auth_token");
//         localStorage.clear();
//         sessionStorage.clear();
//         Cookies.remove("auth_token");

//         window.postMessage({ action: "logoutUser", token }, "*");
//         window.postMessage({ action: "logoutUser" }, window.location.origin);
//         // window.postMessage({ action: "logoutUser",  }, "*");
//         window.location.href = "/login";
//       } else {
//         throw new Error("Erreur lors de la déconnexion.");
//       }
//     } catch (error) {
//       console.error("Erreur pendant la déconnexion:", error);
//     }
//   };

//   useEffect(() => {
//     // const token = getTokenFromCookies();
//     // const token = new URLSearchParams(window.location.search).get('token');

//     if (token) {
//       localStorage.setItem("token", token);
//       fetchUserData(token);
//     } else {
//       window.location.href = "/login";
//     }

//     const timer = setTimeout(() => {
//       setShowOk(false);
//     }, 3000);

//     const handleMenuSelection = (event: CustomEvent) => {
//       setActiveComponent(event.detail);
//     };

//     const handleLogoutUser = (event: any) => {
//       if (event.data.action === "logoutUser") {
//         console.log("Déconnexion détectée depuis l'extension.");
//         localStorage.clear();
//         localStorage.removeItem("token");
//         sessionStorage.clear();
//         Cookies.remove("auth_token");

//         window.location.href = "/login";
//       }
//     };

//     window.addEventListener("message", handleLogoutUser);
//     window.addEventListener(
//       "menuSelection",
//       handleMenuSelection as EventListener
//     );

//     return () => {
//       window.removeEventListener("message", handleLogoutUser);
//       window.removeEventListener(
//         "menuSelection",
//         handleMenuSelection as EventListener
//       );
//       clearTimeout(timer);
//     };
//   }, [getTokenFromCookies, fetchUserData]);

//   // AFTER HANDLE FONCTION

//   if (loading) {
//     return <Loader />;
//   }

//   if (error) {
//     return <div>Erreur: {error}</div>;
//   }

//   if (!user) {
//     router.push("/login");
//     return null;
//   }

//   return (
//     <SidebarProvider>
//       <AppSidebar />
//       <SidebarInset>
//         <header className="flex h-12 shrink-0 items-center gap-2 border-b sticky top-0 bg-white z-50">
//           <div className="flex items-center gap-2 px-3">
//             <SidebarTrigger />
//             <Separator orientation="vertical" className="mr-2 h-4" />
//             {/* <Breadcrumb>
//               <BreadcrumbList>
//                 <BreadcrumbItem className="hidden md:block">
//                   <BreadcrumbLink href="#">
//                     Building Your Application
//                   </BreadcrumbLink>
//                 </BreadcrumbItem>
//                 <BreadcrumbSeparator className="hidden md:block" />
//                 <BreadcrumbItem>
//                   <BreadcrumbPage>Data Fetching</BreadcrumbPage>
//                 </BreadcrumbItem>
//               </BreadcrumbList>
//             </Breadcrumb> */}
//           </div>

//           {/* Affiche "ok" brièvement */}
//           {showOk && (
//             <div className="flex-1 flex justify-center text-green-500 font-bold transition-opacity duration-1000">
//               ok
//             </div>
//           )}

//           <div className="ml-auto pr-5">
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Avatar
//                   className="h-8 w-8 rounded-full"
//                   style={{ cursor: "pointer" }}
//                 >
//                   <AvatarImage src={user?.data.picture} alt={"PI"} />
//                 </Avatar>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent
//                 className="w-60 px-3 py-5 my-2"
//                 style={{ marginLeft: "-210px" }}
//               >
//                 <div className="pb-5 text-sm font-semibold">
//                   {user?.data.email}
//                 </div>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem
//                   onClick={handleLogout}
//                   style={{ cursor: "pointer" }}
//                   className="gap-2"
//                 >
//                   <LogOut size={18} />
//                   Logout
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </header>

//         <div className="flex flex-col gap-4">
//           <div className="grid auto-rows-min gap-4">
//             {activeComponent === "search" && <SearchComponent />}
//             {activeComponent === "statistics" && <Statistics />}
//             {activeComponent === "list" && <Lists />}
//             {activeComponent === "profiles" && <Profiles />}
//           </div>
//         </div>
//       </SidebarInset>
//     </SidebarProvider>
//   );
// }
