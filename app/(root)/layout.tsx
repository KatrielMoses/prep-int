// app/layout.tsx
import React, { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-black">
      <nav className="bg-black">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.svg" alt="Logo" width={44} height={38} />
            <span className="text-2xl font-bold text-white">PrepWise</span>
          </Link>
        </div>
      </nav>
      <div className="bg-black min-h-screen">
        {children}
      </div>
    </div>
  );
}

export default RootLayout;