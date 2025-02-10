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
      <div className="relative hidden lg:block w-full h-screen bg-[#FF6600]">
        <div className="flex flex-col gap-4 p-6 md:p-10 text-white">
          <p className="text-4xl font-bold">Accompagner les entreprises,</p>
          <p className="text-4xl font-bold">Élever les créateurs</p>

          <div></div>
        </div>
      </div>
    </div>
  );
}
