'use client';

import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { AuthProvider } from "@/context/AuthContext";
import  Navbar  from "@/components/Navbar";

export function Providers({ children }) {
  return (
    <HeroUIProvider labelPlacement="outside">
      <AuthProvider>
        <ToastProvider placement="top-right"/>
        {children}
      </AuthProvider>
    </HeroUIProvider>
  );
}
