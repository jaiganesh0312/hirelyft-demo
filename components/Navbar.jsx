"use client";

import React from "react";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Image,
  Button,
} from "@heroui/react";
import { usePathname} from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <NextUINavbar isBordered maxWidth="xl">
      <NavbarContent>
        <NavbarBrand>
          <Link href="/">
            <Image
              src="/SUPER_FINAL_LOGO.png"
              alt="Hirelyft Logo"
              className="w-auto h-16"
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={pathname === "/about"}>
          <Link
            color="foreground"
            href="/about"
            aria-current={pathname === "/features" ? "page" : undefined}
          >
            About us
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color="foreground"
            href="/pricing"
            isDisabled
            aria-current={pathname === "/pricing" ? "page" : undefined}
          >
            Pricing
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/auth/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            href="/auth/register"
            variant="flat"
          >
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
}
