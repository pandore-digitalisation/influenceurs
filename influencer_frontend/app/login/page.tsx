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
          <div className="w-full max-w-xs -sm:mt-64">
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