'use client';

import React, { useState } from 'react';
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Image,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Badge
} from "@heroui/react";
import { useAuth } from '@/context/AuthContext';
import { Icon } from '@iconify/react';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, isAuthenticated, logout, checkAuthLoading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const menuItemsPublic = [
    { label: "About us", href: "/about" },
    { label: "Pricing", href: "#" },
    { label: "Sign Up", href: "/auth/register" },
  ];

  const menuItemsAuthenticated = [
    { label: "Dashboard", href: "/dashboard" }, 
    { label: "Jobs", href: "/jobs" },
  ];

  const handleLogout = async () => {
    await logout();
    // AuthContext handles redirect after logout
  };

  if (checkAuthLoading) {
    return null; // Or a loading skeleton
  }

  return (
    <NextUINavbar onMenuOpenChange={setIsMenuOpen} isBordered maxWidth="xl" >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/">
            <Image src="/SUPER_FINAL_LOGO.png" alt="Hirelyft Logo" className='w-auto h-16' />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Menu */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {!isAuthenticated ? (
          <>
            <NavbarItem isActive={pathname==='/about'}>
              <Link color="foreground" href="/about" aria-current={pathname === '/features' ? "page" : undefined}>
                About us
              </Link>
            </NavbarItem>
             <NavbarItem>
              <Link color="foreground" href="/pricing" aria-current={pathname === '/pricing' ? "page" : undefined} isDisabled>
                Pricing
              </Link>
            </NavbarItem>
          </>
        ) : (
          <>
             <NavbarItem isActive={pathname === '/dashboard'}>
              <Link color="foreground" href="/dashboard" aria-current={pathname === '/dashboard' ? "page" : undefined} isDisabled>
                Dashboard
              </Link>
            </NavbarItem>
             <NavbarItem isActive={pathname === '/jobs'}>
              <Link color="foreground" href="/jobs" aria-current={pathname === '/jobs' ? "page" : undefined} isDisabled>
                Jobs
              </Link>
            </NavbarItem>
            {/* Add other authenticated desktop links here */}
          </>
        )}
      </NavbarContent>

      <NavbarContent justify="end">
        {/* Socket Connection Indicator (Optional) */}
        {/* <NavbarItem className="hidden sm:flex items-center">
          <Icon icon="mdi:lan-connect" className={isConnected ? 'text-success' : 'text-warning'} />
        </NavbarItem> */}

        {/* Notification Bell (Authenticated Users) */}
        {isAuthenticated && (
          <Dropdown placement="bottom-end">
            <Badge content={0} color="danger" isInvisible={true} shape="circle">
            {/* <Badge content={notifications.length} color="danger" isInvisible={notifications.length === 0} shape="circle"> */}
              <DropdownTrigger>
                <Button
                  isIconOnly
                  radius="full"
                  variant="light"
                  aria-label="Notifications"
                >
                  <Icon icon="mdi:bell-outline" className="text-xl" />
                </Button>
              </DropdownTrigger>
            </Badge>
            <DropdownMenu
                aria-label="Notifications Menu"
                variant="flat"
                // disabledKeys={notifications.length === 0 ? ["no-notifications"] : []}
                disabledKeys={["no-notifications"]}
            >
                <DropdownItem key="header" className="h-10 gap-2 opacity-80" isReadOnly textValue="Notifications Header">
                    <p className="font-semibold">Notifications</p>
                </DropdownItem>
                {false && notifications.length > 0 ? (
                    notifications.map((notif) => (
                        <DropdownItem
                            key={notif.id || notif.message}
                            description={new Date(notif.timestamp || Date.now()).toLocaleString()}
                            textValue={notif.message}
                            onPress={() => handleNotificationItemClick(notif)}
                            className="whitespace-normal"
                        >
                            {notif.message}
                        </DropdownItem>
                    ))
                ) : (
                    <DropdownItem key="no-notifications" textValue="No new notifications">
                       No new notifications
                    </DropdownItem>
                )}
                {false && notifications.length > 0 && (
                    <DropdownItem key="clear" className="text-danger" color="danger" textValue="Clear All" onClick={clearNotifications}>
                       Clear All Notifications
                    </DropdownItem>
                )}
            </DropdownMenu>
          </Dropdown>
        )}

        {!isAuthenticated ? (
          <>
            <NavbarItem >
              <Button as={Link} href="/auth/login" color='primary' variant='ghost' startContent={<Icon icon='mdi:login' />} >Log In</Button>
            </NavbarItem>
            <NavbarItem className="hidden md:flex">
              <Button as={Link} color="primary" href="/auth/register" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                size="sm"
                src={user?.avatarUrl || undefined} // Use avatar URL from user context
                name={user?.name?.charAt(0).toUpperCase() || 'U'} // Fallback to first initial
                // icon={!user?.avatarUrl ? <Icon icon="mdi:account" /> : undefined}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profileInfo" className="h-14 gap-2" textValue={`Signed in as ${user?.email}`}>
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user?.email}</p>
              </DropdownItem>
              <DropdownItem key="profile" textValue="Profile">
                 Profile
              </DropdownItem>
              <DropdownItem key="settings" textValue="Settings" onPress={() => router.push('/settings')}>
                Settings
              </DropdownItem>
              {/* Add other dropdown items here */}
              <DropdownItem key="logout" className='text-danger' color="danger"  textValue="Log Out" onPress={handleLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className='bg-white' >
        {(!isAuthenticated ? menuItemsPublic : menuItemsAuthenticated).map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
             {item.label === "Sign Up" ? (
                 <Link
                    color="primary"
                    className='w-full'
                    href={item.href}
                    size='lg'
                 >
                    {item.label}
                 </Link>
             ) : (
                <Link
                    color="foreground" 
                    className="w-full"
                    href={item.href}
                    size="lg"
                    aria-current={pathname === item.href ? "page" : undefined}
                    isDisabled={item.href !== '/about'}
                    >
                    {item.label}
                </Link>
             )}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NextUINavbar>
  );
} 