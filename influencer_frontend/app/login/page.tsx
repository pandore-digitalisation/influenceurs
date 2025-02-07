"use client";

import { Login } from "@/components/login/login-form";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-bold">
            Aquizition.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Login />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block w-full h-screen">
        <svg
          className="absolute inset-0 w-full h-full dark:grayscale"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 1200"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <rect width="1200" height="1200" fill="#EAEAEA" rx="3" />
          <g opacity=".5">
            <g opacity=".5">
              <path
                fill="#FAFAFA"
                d="M600.709 736.5c-75.454 0-136.621-61.167-136.621-136.62 0-75.454 61.167-136.621 136.621-136.621 75.453 0 136.62 61.167 136.62 136.621 0 75.453-61.167 136.62-136.62 136.62Z"
              />
              <path
                stroke="#C9C9C9"
                strokeWidth="2.418"
                d="M600.709 736.5c-75.454 0-136.621-61.167-136.621-136.62 0-75.454 61.167-136.621 136.621-136.621 75.453 0 136.62 61.167 136.62 136.621 0 75.453-61.167 136.62-136.62 136.62Z"
              />
            </g>
            <path
              stroke="url(#a)"
              strokeWidth="2.418"
              d="M0-1.209h553.581"
              transform="scale(1 -1) rotate(45 1163.11 91.165)"
            />
            <path
              stroke="url(#b)"
              strokeWidth="2.418"
              d="M404.846 598.671h391.726"
            />
            <path
              stroke="url(#c)"
              strokeWidth="2.418"
              d="M599.5 795.742V404.017"
            />
            <path
              stroke="url(#d)"
              strokeWidth="2.418"
              d="m795.717 796.597-391.441-391.44"
            />
            <path
              fill="#fff"
              d="M600.709 656.704c-31.384 0-56.825-25.441-56.825-56.824 0-31.384 25.441-56.825 56.825-56.825 31.383 0 56.824 25.441 56.824 56.825 0 31.383-25.441 56.824-56.824 56.824Z"
            />
          </g>
        </svg>
      </div>
    </div>
  );
  
}

// "use client";

// import React from "react";
// // import { useState, useEffect } from 'react';

// const BASE_URL = "http://localhost:3000";
// // const BASE_URL = "https://influenceur-list.onrender.com";

// export default function Login() {
//   const handleGoogleLogin = () => {
//     window.location.href = `${BASE_URL}/auth/google`;
//   };

//   return (
//     <main className="container mx-auto px-4 py-8">
//       <div className="flex flex-col items-center">
//         <a href="/">logo</a>
//         <div className="flex flex-col items-center my-52">
//           <span className="my-6 text-black text-2xl">Welcome back</span>
//           <button
//             type="button"
//             onClick={handleGoogleLogin}
//             className="flex py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
//           >
//             <svg
//               className="w-4 h-4 me-2"
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 18 19"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             Continue with Google
//           </button>
//         </div>
//       </div>
//     </main>
//   );
// }
