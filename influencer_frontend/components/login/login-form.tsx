"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const BASE_URL = "http://localhost:3000";
// // const BASE_URL = "https://influenceur-list.onrender.com";

export function Login({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const handleGoogleLogin = () => {
    window.location.href = `${BASE_URL}/auth/google`;
  };

  return (
    <form className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center ">
        <h1 className="text-2xl font-bold">Bienvenue à nouveau</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Veuillez cliquer sur le bouton suivant pour continuer.
        </p>
      </div>
      <div className="grid gap-6">
        <Button
          variant="outline"
          className="w-full"
          type="button"
          onClick={handleGoogleLogin}
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
          Continuer avec Google
        </Button>
      </div>
    </form>
  );
}
