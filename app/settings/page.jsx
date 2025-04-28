"use client";

import React from 'react';
import {
  Tabs, Tab, Chip
} from "@heroui/react";
import { Icon } from '@iconify/react';
import { useAuth } from '@/context/AuthContext';
import ProfileSettings from '@/components/settings/ProfileSettings';
import NotificationSettings from '@/components/settings/NotificationSettings';
import SecuritySettings from '@/components/settings/SecuritySettings';
import PrivacySettings from '@/components/settings/PrivacySettings';
import AccessibilitySettings from '@/components/settings/AccessibilitySettings';

export default function GeneralSettingsPage() {
  const { user, checkAuthLoading } = useAuth(); // Get user data from context

  if (checkAuthLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-center">
          <p className="text-default-600">Loading user data...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Icon icon="mdi:account-alert-outline" className="text-5xl text-danger mb-4" />
        <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
        <p className="text-default-600">Please sign in to access your settings.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6 max-w-6xl mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-2">Account Settings</h1>
          <p className="text-default-600">Manage your account settings and preferences</p>
        </div>
        <div className="flex items-center gap-3">
          <Chip color="success" variant="dot" className="capitalize">Active Account</Chip>
          <div className="flex items-center">
            <Icon icon="mdi:account-circle" className="text-xl mr-1 text-primary" />
            <span className="text-sm font-medium">{user.email}</span>
          </div>
        </div>
      </div>

      <Tabs 
        aria-label="Settings Options" 
        color="primary" 
        variant="underlined" 
        classNames={{
          tabList: "overflow-x-auto",
          cursor: "bg-primary",
          tab: "data-[selected=true]:text-primary font-medium",
        }}
      >
        <Tab 
          key="profile" 
          title={
            <div className="flex items-center space-x-2">
              <Icon icon="mdi:account-circle-outline" className="text-xl" />
              <span>Profile</span>
            </div>
          }
        >
          <div className="py-6">
            <ProfileSettings />
          </div>
        </Tab>
        
        <Tab 
          key="security" 
          title={
            <div className="flex items-center space-x-2">
              <Icon icon="mdi:shield-lock-outline" className="text-xl" />
              <span>Security</span>
            </div>
          }
        >
          <div className="py-6">
            <SecuritySettings />
          </div>
        </Tab>

        <Tab 
          key="notifications" 
          title={
            <div className="flex items-center space-x-2">
              <Icon icon="mdi:bell-outline" className="text-xl" />
              <span>Notifications</span>
            </div>
          }
        >
          <div className="py-6">
            <NotificationSettings />
          </div>
        </Tab>

        <Tab 
          key="privacy" 
          title={
            <div className="flex items-center space-x-2">
              <Icon icon="mdi:eye-outline" className="text-xl" />
              <span>Privacy</span>
            </div>
          }
        >
          <div className="py-6">
            <PrivacySettings />
          </div>
        </Tab>

        <Tab 
          key="accessibility" 
          title={
            <div className="flex items-center space-x-2">
              <Icon icon="mdi:accessibility" className="text-xl" />
              <span>Accessibility</span>
            </div>
          }
        >
          <div className="py-6">
            <AccessibilitySettings />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
