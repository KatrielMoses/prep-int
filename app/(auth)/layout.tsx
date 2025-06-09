// app/(auth)/layout.tsx

import React, { ReactNode } from "react";
import ParallaxBG from "@/components/ParallaxBG";
import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  // 1) if they’re already logged in, kick them to “/”
  if (await isAuthenticated()) {
    redirect("/");
  }

  // 2) otherwise show the blobs + modal slot
  return (
    <div className="auth-parallax-bg">
      <ParallaxBG />
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
