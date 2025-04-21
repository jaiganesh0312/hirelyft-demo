"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Spinner, Card, CardHeader, CardBody, Tabs, Tab, Divider } from "@heroui/react";
import UpdatePasswordForm from "@/components/settings/UpdatePasswordForm"; // We'll create this
import TwoFactorAuth from "@/components/settings/TwoFactorAuth"; // We'll create this
import { Icon } from "@iconify/react";

export default function SettingsPage() {
  const { user, isAuthenticated, checkAuthLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated and initial check is done
    if (!checkAuthLoading && !isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [isAuthenticated, checkAuthLoading, router]);

  // Show loading spinner while checking auth or if redirecting
  if (checkAuthLoading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner label="Loading Settings..." />
      </div>
    );
  }

  // Render settings content if authenticated
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">
        Account Settings
      </h1>

      <Tabs aria-label="Settings options" variant="underlined" color="primary"  className="flex justify-center" >
        <Tab 
          key="Update Password"
          title={
            <div className="flex items-center gap-2">
              <Icon icon="mdi:lock-outline" className="text-xl" />
              <span className="">Update Password</span>
            </div>
          }
          className="w-full max-w-xl mx-auto"
        >
          <Card className="shadow-sm border border-default-200 dark:border-default-100 w-full">
            <CardHeader className="flex justify-between items-center bg-default-50 dark:bg-default-100/10">
              <div>
                <h2 className="text-xl font-semibold dark:text-white">
                  Password Settings
                </h2>
                <p className="text-sm text-default-500">
                  Update your password to keep your account secure
                </p>
              </div>
              <Icon
                icon="mdi:lock-outline"
                className="text-2xl text-default-400"
              />
            </CardHeader>
            <CardBody>
              <UpdatePasswordForm />
            </CardBody>
          </Card>
        </Tab>
        <Tab
          key="Two Factor Authentication"
          title={
            <div className="flex items-center gap-2">
              <Icon icon="mdi:shield-key-outline" className="text-xl" />
              <span>Two Factor Authentication</span>
            </div>
          }
          className="max-w-2xl w-full mx-auto"
        >
          <Card className="shadow-sm border border-default-200 dark:border-default-100">
            <CardHeader className="flex justify-between items-center bg-default-50 dark:bg-default-100/10">
              <div>
                <h2 className="text-xl font-semibold dark:text-white">
                  Two-Factor Authentication
                </h2>
                <p className="text-sm text-default-500">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Icon
                icon="mdi:shield-key-outline"
                className="text-2xl text-default-400"
              />
            </CardHeader>
            <CardBody>
              <TwoFactorAuth />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
      {/* Update Password Card
            <Card className="shadow-md">
                <CardHeader>
                    <h2 className="text-xl font-semibold dark:text-white">Update Password</h2>
                </CardHeader>
                <CardBody>
                    <UpdatePasswordForm />
                </CardBody>
            </Card>

            {/* 2FA Settings Card */}
      {/* <Card className="shadow-md">
                <CardHeader>
                    <h2 className="text-xl font-semibold dark:text-white">Two-Factor Authentication (2FA)</h2>
                </CardHeader>
                <CardBody>
                    <TwoFactorAuth />
                </CardBody>
            </Card> */}

      {/* Other settings sections can be added here */}
    </div>
  );
}
