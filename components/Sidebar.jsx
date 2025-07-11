'use client';
import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Listbox,
  ListboxItem,
  ScrollShadow,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import {useAuth} from '@/context/AuthContext'

// Define role-specific menu items (as provided in the attached file)
const commonMenuItems = [
  {
    key: "settings",
    label: "Settings",
    href: "/settings",
    icon: "mdi:cog-outline",
  },
];

export const jobseekerMenuItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/jobseeker/dashboard",
    icon: "mdi:view-dashboard-outline",
  },
  {
    key: "profile",
    label: "My Profile",
    href: "/jobseeker/profile",
    icon: "mdi:account-circle-outline",
  },
  {
    key: "resumes",
    label: "My Resumes",
    href: "/jobseeker/resumes",
    icon: "mdi:file-document-outline",
  },
  {
    key: "applications",
    label: "My Applications",
    href: "/jobseeker/applications",
    icon: "mdi:briefcase-check-outline",
  },
  {
    key: "recommended-jobs",
    label: "Recommended Jobs",
    href: "/jobseeker/jobs/recommended",
    icon: "mdi:briefcase-search-outline",
  },
  { key: "find-jobs", label: "Find Jobs", href: "/jobs", icon: "mdi:magnify" },
  {
    key: "messaging",
    label: "Messages",
    href: "/jobseeker/messages",
    icon: "mdi:message-outline",
  },
  {
    key: "complaints",
    label: "Support Tickets",
    href: "/complaints",
    icon: "mdi:ticket-outline",
  },
  ...commonMenuItems,
];

export const employerMenuItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/employer/dashboard",
    icon: "mdi:view-dashboard-outline",
  },
  {
    key: "profile",
    label: "Company Profile",
    href: "/employer/profile",
    icon: "mdi:domain",
  },
  {
    key: "post-job",
    label: "Post a Job",
    href: "/employer/jobs/post",
    icon: "mdi:briefcase-plus-outline",
  },
  {
    key: "my-jobs",
    label: "Manage Jobs",
    href: "/employer/jobs",
    icon: "mdi:briefcase-edit-outline",
  },
  {
    key: "applicants",
    label: "Applicants",
    href: "/employer/applicants",
    icon: "mdi:account-group-outline",
  },
  {
    key: "messaging",
    label: "Messages",
    href: "/employer/messages",
    icon: "mdi:message-outline",
  },
  {
    key: "complaints",
    label: "Support Tickets",
    href: "/complaints",
    icon: "mdi:ticket-outline",
  },
  ...commonMenuItems,
];

export const adminMenuItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: "mdi:view-dashboard-outline",
  },
  {
    key: "manage-users",
    label: "Manage Users",
    href: "/admin/users",
    icon: "mdi:account-group-outline",
  },
  {
    key: "manage-jobs",
    label: "Manage Jobs",
    href: "/admin/jobs",
    icon: "mdi:briefcase-edit-outline",
  },
  {
    key: "messaging",
    label: "Messages",
    href: "/messaging",
    icon: "mdi:message-outline",
  },
  {
    key: "complaints",
    label: "Support Tickets",
    href: "/complaints",
    icon: "mdi:ticket-outline",
  },
  {
    key: "site-settings",
    label: "Site Settings",
    href: "/admin/settings",
    icon: "mdi:cogs",
  },
  ...commonMenuItems,
];

export default function Sidebar() {
  const {user, isAuthenticated} = useAuth();
  const userRole = user?.role || 'jobseeker';
  const [expanded, setExpanded] = React.useState(false);

  // Function to get menu items based on userRole
  const getMenuItems = () => {
    switch (userRole) {
      case "jobseeker":
        return jobseekerMenuItems;
      case "employer":
        return employerMenuItems;
      case "admin":
        return adminMenuItems;
      default:
        return [];
    }
  };

  const navItems = getMenuItems();
  
  if(navItems.length === 0 || !isAuthenticated)return null;

  const toggleDrawer = () => {
    setExpanded(!expanded);
  };

  return (
    <aside
      className={`h-full sm:inline-flex hidden  ${
        expanded ? "w-64" : "w-16"
      }`}
    >
      <div className={`fixed min-h-screen transition-all duration-300 border-1 bg-white flex flex-col ${
        expanded ? "w-64" : "w-16"
      }`}>

      <div className="border-b border-divider flex items-center gap-2 p-2">
        <Button
          isIconOnly
          variant="light"
          onPress={toggleDrawer}
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          >
          <Icon
            icon={expanded ? "lucide:chevron-left" : "lucide:chevron-right"}
            className="text-xl"
            />
        </Button>
        {expanded && <span>Navigation</span>}
      </div>

      <ScrollShadow hideScrollBar className="flex-1 overflow-y-auto">
        <div className="p-0">
          <Listbox
            aria-label="Sidebar Navigation"
            variant="flat"
            itemClasses={{
              base: "data-[hover=true]:bg-default-100 data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground rounded-md mx-2 my-1",
              title: "font-medium",
            }}
            >
            {navItems.map((item) => (
            <ListboxItem
              key={item.key}
              as={Link}
              href={item.href}
              startContent={
                <Icon
                icon={item.icon}
                className={`text-xl ${!expanded && "mx-auto"}`}
                />
              }
              className={!expanded ? "justify-center px-0" : ""}
              >
                {expanded && item.label}
              </ListboxItem>
            ))}
          </Listbox>
        </div>
      </ScrollShadow>
            </div>
    </aside>
  );
}


// 'use client';

// import React from 'react';
// import {
//   Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, Button,
//   Listbox, ListboxItem, ScrollShadow
// } from "@heroui/react";
// import { Icon } from '@iconify/react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// // Define role-specific menu items (as provided in the attached file)
// const commonMenuItems = [
//   { key: 'settings', label: 'Settings', href: '/settings', icon: 'mdi:cog-outline' },
// ];

// export const jobseekerMenuItems = [
//   { key: 'dashboard', label: 'Dashboard', href: '/jobseeker/dashboard', icon: 'mdi:view-dashboard-outline' },
//   { key: 'profile', label: 'My Profile', href: '/jobseeker/profile', icon: 'mdi:account-circle-outline' },
//   { key: 'resumes', label: 'My Resumes', href: '/jobseeker/resumes', icon: 'mdi:file-document-outline' },
//   { key: 'applications', label: 'My Applications', href: '/jobseeker/applications', icon: 'mdi:briefcase-check-outline' },
//   { key: 'recommended-jobs', label: 'Recommended Jobs', href: '/jobseeker/jobs/recommended', icon: 'mdi:briefcase-search-outline' },
//   { key: 'find-jobs', label: 'Find Jobs', href: '/jobs', icon: 'mdi:magnify' },
//   { key: 'messaging', label: 'Messages', href: '/messaging', icon: 'mdi:message-outline' },
//   { key: 'complaints', label: 'Support Tickets', href: '/complaints', icon: 'mdi:ticket-outline' },
//   ...commonMenuItems,
// ];

// export const employerMenuItems = [
//   { key: 'dashboard', label: 'Dashboard', href: '/employer/dashboard', icon: 'mdi:view-dashboard-outline' },
//   { key: 'profile', label: 'Company Profile', href: '/employer/profile', icon: 'mdi:domain' },
//   { key: 'post-job', label: 'Post a Job', href: '/employer/jobs/post', icon: 'mdi:briefcase-plus-outline' },
//   { key: 'my-jobs', label: 'Manage Jobs', href: '/employer/jobs', icon: 'mdi:briefcase-edit-outline' },
//   { key: 'applicants', label: 'Applicants', href: '/employer/applicants', icon: 'mdi:account-group-outline' },
//   { key: 'messaging', label: 'Messages', href: '/messaging', icon: 'mdi:message-outline' },
//   { key: 'complaints', label: 'Support Tickets', href: '/complaints', icon: 'mdi:ticket-outline' },
//   ...commonMenuItems,
// ];

// export const adminMenuItems = [
//   { key: 'dashboard', label: 'Dashboard', href: '/admin/dashboard', icon: 'mdi:view-dashboard-outline' },
//   { key: 'manage-users', label: 'Manage Users', href: '/admin/users', icon: 'mdi:account-group-outline' },
//   { key: 'manage-jobs', label: 'Manage Jobs', href: '/admin/jobs', icon: 'mdi:briefcase-edit-outline' },
//   { key: 'messaging', label: 'Messages', href: '/messaging', icon: 'mdi:message-outline' },
//   { key: 'complaints', label: 'Support Tickets', href: '/complaints', icon: 'mdi:ticket-outline' },
//   { key: 'site-settings', label: 'Site Settings', href: '/admin/settings', icon: 'mdi:cogs' },
//   ...commonMenuItems,
// ];

// // Accept userRole prop instead of menuItems
// export default function Sidebar({ isOpen, onClose, userRole }) {
//   const pathname = usePathname();

//   // Function to get menu items based on userRole
//   const getMenuItems = () => {
//     switch (userRole) {
//       case 'jobseeker':
//         return jobseekerMenuItems;
//       case 'employer':
//         return employerMenuItems;
//       case 'admin':
//         return adminMenuItems;
//       default:
//         return []; // Return empty if no role or unknown role
//     }
//   };

//   const currentMenuItems = getMenuItems(); // Determine items based on role

//   return (
//     <Drawer isOpen={isOpen} onClose={onClose} size="xs">
//       <DrawerContent className="flex flex-col h-full">
//         <DrawerHeader className="border-b border-divider flex items-center gap-2">
//            <Icon icon="mdi:menu" className="text-xl" />
//            <span>Navigation</span>
//         </DrawerHeader>
//         <ScrollShadow hideScrollBar className="flex-grow">
//             <DrawerBody className="p-0">
//             <Listbox
//                 aria-label="Sidebar Navigation"
//                 variant="flat"
//                 itemClasses={{
//                 base: "data-[hover=true]:bg-default-100 data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground rounded-md mx-2 my-1",
//                 title: "font-medium",
//                 }}
//                 items={currentMenuItems} // Use the determined items
//                 onAction={(key) => onClose()} // Close sidebar on item click
//             >
//                 {(item) => (
//                 <ListboxItem
//                     key={item.key} // Use item.key if defined and unique
//                     href={item.href}
//                     as={Link}
//                     startContent={item.icon ? <Icon icon={item.icon} className="mr-2 text-lg" /> : null}
//                 >
//                     {item.label}
//                 </ListboxItem>
//                 )}
//             </Listbox>
//             </DrawerBody>
//         </ScrollShadow>
//         <DrawerFooter className="border-t border-divider">
//           <Button variant="light" onPress={onClose} fullWidth>
//              <Icon icon="mdi:close" className="mr-1" /> Close
//           </Button>
//         </DrawerFooter>
//       </DrawerContent>
//     </Drawer>
//   );
// } 

