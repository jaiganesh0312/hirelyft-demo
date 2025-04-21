'use client';

import { HeroUIProvider } from "@heroui/react";
import { AuthProvider } from "@/context/AuthContext";
import  Navbar  from "@/components/Navbar";

export function Providers({ children }) {
  return (
    <HeroUIProvider labelPlacement="outside">
      <AuthProvider>
        <Navbar />
        {children}
      </AuthProvider>
    </HeroUIProvider>
  );
}
