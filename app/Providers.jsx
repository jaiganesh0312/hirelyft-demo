'use client';

import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { AuthProvider } from "@/context/AuthContext";
import { ChatProvider } from "@/context/ChatContext";

export function Providers({ children }) {
  return (
    <HeroUIProvider labelPlacement="outside">
      <AuthProvider>
        <ChatProvider>
        <ToastProvider placement="top-right"/>
        {children}
        </ChatProvider>
      </AuthProvider>
    </HeroUIProvider>
  );
}
