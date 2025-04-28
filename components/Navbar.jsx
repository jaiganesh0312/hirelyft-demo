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
  Badge,
  useDisclosure
} from "@heroui/react";
import { useAuth } from '@/context/AuthContext';
import { Icon } from '@iconify/react';
import { usePathname, useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import {
  jobseekerMenuItems,
  employerMenuItems,
  adminMenuItems,
} from './Sidebar';

export default function Navbar() {
  const { user, isAuthenticated, logout, checkAuthLoading } = useAuth();
  const { isOpen: isSidebarOpen, onOpen: onSidebarOpen, onClose: onSidebarClose } = useDisclosure();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    // AuthContext handles redirect after logout
  };

  if (checkAuthLoading) {
    return null; // Or a loading skeleton
  }

  const getMobileMenuItems = () => {
    if (isAuthenticated) {
      switch (user?.role) {
        case 'jobseeker':
          return jobseekerMenuItems;
        case 'employer':
          return employerMenuItems;
        case 'admin':
          return adminMenuItems;
        default:
          // Fallback or default authenticated items if role is undefined/unexpected
          return [
             { label: "Dashboard", href: "/dashboard", icon: "mdi:view-dashboard-outline" }, // Generic dashboard?
             { label: "Settings", href: "/settings", icon: "mdi:cog-outline" },
          ];
      }
    } else {
      // Public items including Login/Signup buttons
      return [
        { label: "About us", href: "/about" },
        { label: "Pricing", href: "#" },
        { label: "Log In", href: "/auth/login", type: "button", color: "primary", variant: "ghost"},
        { label: "Sign Up", href: "/auth/register", type: "button", color: "primary", variant: "flat" },
      ];
    }
  };

  const mobileMenuItems = getMobileMenuItems();

  return (
    <>
      <NextUINavbar
        isBordered
        maxWidth="xl"
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          {/* {isAuthenticated && (
             <Button
               isIconOnly
               variant="light"
               className="hidden sm:inline-flex"
               onPress={onSidebarOpen}
               aria-label="Open sidebar"
             >
               <Icon icon="mdi:menu" className="text-xl" />
             </Button>
          )} */}

          <NavbarBrand>
            <Link href="/">
              <Image src="/SUPER_FINAL_LOGO.png" alt="Hirelyft Logo" className='w-auto h-16' />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {!isAuthenticated ? (
            <>
              <NavbarItem isActive={pathname==='/about'}>
                <Link color="foreground" href="/about" aria-current={pathname === '/about' ? "page" : undefined}>
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
             <></>
          )}
        </NavbarContent>

        <NavbarContent justify="end">
          {isAuthenticated && (
            <Dropdown placement="bottom-end">
              <Badge content={0} color="danger" isInvisible={true} shape="circle">
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
                  src={user?.avatarUrl || undefined}
                  name={user?.name?.charAt(0).toUpperCase() || 'U'}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profileInfo" className="h-14 gap-2" textValue={`Signed in as ${user?.email}`}>
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{user?.email}</p>
                </DropdownItem>
                <DropdownItem key="profile" textValue="Profile" onPress={() => { router.push(`/${user?.role || 'jobseeker'}/profile`); setIsMenuOpen(false); }}>
                   Profile
                </DropdownItem>
                <DropdownItem key="settings" textValue="Settings" onPress={() => { router.push('/settings'); setIsMenuOpen(false); }}>
                  Settings
                </DropdownItem>
                <DropdownItem key="logout" className='text-danger' color="danger"  textValue="Log Out" onPress={handleLogout}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </NavbarContent>

        <NavbarMenu className='bg-white'>
          {mobileMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.href || item.label}-${index}`}>
                <Link
                  color={pathname === item.href ? "primary" : "foreground"}
                  className="w-full flex items-center gap-2 text-lg py-3"
                  href={item.href}
                  size="lg"
                  aria-current={pathname === item.href ? "page" : undefined}
                  isDisabled={item.href === '#'}
                  onPress={() => setIsMenuOpen(false)}
                  isBlock
                  
                >
                  {item.icon && <Icon icon={item.icon} className="text-lg" />} 
                  {item.label}
                </Link>
            </NavbarMenuItem>
          ))}
          {isAuthenticated && (
             <NavbarMenuItem key="logout-mobile">
               <Link
                 color="danger"
                 variant="light"
                 className="w-full flex items-center gap-2 text-lg py-3 text-danger"
                 size="lg"
                 onPress={() => { handleLogout(); setIsMenuOpen(false); }}
                 isBlock
               >
                <Icon icon="mdi:logout" />
                 Log Out
               </Link>
             </NavbarMenuItem>
           )}
        </NavbarMenu>
      </NextUINavbar>

      {/* {isAuthenticated && (
        <Sidebar isOpen={isSidebarOpen} onClose={onSidebarClose} userRole={user?.role} />
      )} */}
    </>
  );
} 