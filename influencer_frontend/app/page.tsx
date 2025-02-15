"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { LogOut, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Loader } from "@/components/loaders/Loader";

export default function Home() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    function getDataFromLocalStorage(key: any) {
      try {
        const userData = localStorage.getItem(key);

        if (userData) {
          return JSON.parse(userData);
        } else {
          return null;
        }
      } catch (error) {
        console.error("Erreur de récupération de use data", error);
      } finally {
        setLoading(false);
      }
    }

    const userData = getDataFromLocalStorage("userData");
    setUser(userData);
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

  return (
    <SidebarProvider>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b sticky top-0 bg-white z-50">
          <div className="flex items-center gap-2 px-3">
            <span className="font-bold">Aquizition.</span>
            <Separator orientation="vertical" className="mr-2 h-4" />
            {user ? (
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/dashboard">
                      Tableau de board
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <ExternalLink className="hidden md:block w-3" />
                </BreadcrumbList>
              </Breadcrumb>
            ) : (
              ""
            )}
          </div>
          <div className="ml-auto pr-5">
            {loading ? (
              <span>
                {" "}
                <Loader />{" "}
              </span>
            ) : user ? (
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
            ) : (
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => router.push("/login")}
                  className="text-white bg-[#FF6600] hover:bg-[#ff6600ce] focus:outline-none font-medium rounded-full text-sm px-5 py-2.5"
                >
                  Log in
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/login")}
                  className=" text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-full text-sm px-5 py-2.5"
                >
                  Sign up
                </button>
              </div>
            )}
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="min-h-[50vh] rounded-xl bg-[#FF6600]" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

// "use client";

// import React from 'react';
// import { useState } from "react";
// import { useRouter } from 'next/navigation'

// export default function Home() {
//   const [loading, setLoading] = useState(false);
//   const router = useRouter()

//   return (
//     <main className="container mx-auto px-4 py-8">
//       <div className="flex justify-end px-4 pt-4">
//         <button
//           type="button" onClick={() => router.push('/login') }
//           className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
//         >
//           Log in
//         </button>
//         <button
//           type="button"
//           className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
//         >
//           Sign up
//         </button>
//       </div>
//     </main>
//   );
// }
