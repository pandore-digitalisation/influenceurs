"use client";

import { Loader } from "@/components/loaders/Loader";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
  // const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const BASE_URL = "https://influenceur-list.onrender.com";

  const ITEMS_PER_PAGE = 12;

export default function Lists() {
  const [lists, setLists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const getTokenFromCookies = () => {
    if (typeof document === "undefined") return null;
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth_token="));
    return cookieString ? cookieString.split("=")[1] : null;
  };

  useEffect(() => {
    const token = getTokenFromCookies();
    const userId = localStorage.getItem("userId");

    const fetchUserLists = async () => {
      try {
        const listsResponse = await fetch(`${BASE_URL}/lists/user/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const listsData = await listsResponse.json();
        setLists(listsData);
        // console.log("l", listsData);
      } catch (error) {
        console.error("Erreur de récupération des listes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserLists();
  }, []);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedLists = lists.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(lists.length / ITEMS_PER_PAGE);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-1 flex-col gap-4 p-4 mx-auto">
        <div className="grid auto-rows-min gap-4 md:grid-cols-4 grid-cols-1">
          {paginatedLists.map((list) => (
            <Card className="aspect-video rounded-xl p-3" key={list._id}>
              <CardHeader className="p-0 min-h-[50px]">
                <span>{list.name}</span>
              </CardHeader>
              <CardContent className="h-1/2 p-0 min-h-[80px]">
                <span className="text-sm text-muted-foreground flex items-center">
                  <span className="gap-2 pr-3 flex">
                    <svg
                      className="h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                    </svg>
                    {list.profiles.length}{" "}
                  </span>
                  <span className="flex">
                    <span className="flex -space-x-4 rtl:space-x-reverse">
                      {list.profiles.slice(0, 3).map((profile: any) => (
                        <img
                          key={profile._id}
                          className="w-7 h-7 border-2 rounded-full border-white"
                          src={`${BASE_URL}/proxy?url=${encodeURIComponent(
                            profile.profileImage
                          )}`}
                          alt={profile.name}
                        />
                      ))}

                      {list.profiles.length > 3 && (
                        <span className="flex items-center justify-center w-7 h-7 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600">
                          +
                        </span>
                      )}
                    </span>
                  </span>
                </span>
              </CardContent>
              <CardFooter className="h-1/4 p-0 gap-2">
                <button
                  type="button"
                  className="w-full py-2 px-3 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 gap-2"
                >
                  Voir les profiles
                </button>
                <button
                  type="button"
                  className="w-50 py-2 px-3 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-4 h-4 text-red-800"
                  >
                    <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
                  </svg>
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <nav className="flex justify-end">
          <ul className="flex items-center -space-x-px h-8 text-sm">
            <li>
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="w-2.5 h-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
              </button>
            </li>
            <li>
              <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                {currentPage} / {totalPages}
              </span>
            </li>
            <li>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="w-2.5 h-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
