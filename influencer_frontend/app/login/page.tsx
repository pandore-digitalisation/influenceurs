"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function Login() {
  const router = useRouter();
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center">
        <a href="/">logo</a>
        <div className="flex flex-col items-center my-52">
          <span className="my-6 text-black text-2xl">Welcome back</span>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <svg
              className="w-4 h-4 me-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 19"
            >
              <path
                fillRule="evenodd"
                d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                clipRule="evenodd"
              />
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </main>
  );
}
