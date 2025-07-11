"use client";

import React from 'react';
import { Card, CardBody, CardHeader, Divider, Tabs, Tab, } from "@heroui/react";
import { Icon } from '@iconify/react';
import TwoFactorAuth from './TwoFactorAuth';
import UpdatePasswordForm from './UpdatePasswordForm';

export default function SecuritySettings() {
  return (
    <div className="space-y-4">
      <Card className="border border-default-200 dark:border-default-100">
        <CardHeader className="flex flex-col gap-1 pb-0">
          <div className='flex items-center gap-2'>
            <Icon icon="mdi:shield-lock-outline" className="text-xl text-primary-500" />
            <h3 className="text-lg font-semibold">Account Security</h3>
          </div>
            <p className="text-sm text-default-600 dark:text-default-400">
              Manage your password and two-factor authentication
            </p>
        </CardHeader>
        <CardBody>
          <Tabs aria-label="Security Options" color="primary" variant="underlined">
            <Tab 
              key="password" 
              title={
                <div className="flex items-center space-x-2">
                  <Icon icon="mdi:lock-outline" />
                  <span>Password</span>
                </div>
              }
            >
              <div className="mt-4">
                <UpdatePasswordForm />
              </div>
            </Tab>
            <Tab 
              key="2fa" 
              title={
                <div className="flex items-center space-x-2">
                  <Icon icon="mdi:shield-key-outline" />
                  <span>Two-Factor Authentication</span>
                </div>
              }
            >
              <div className="mt-4">
                <TwoFactorAuth />
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>

      <Card className="border border-default-200 dark:border-default-100">
        <CardHeader className="flex gap-2">
          <Icon icon="mdi:history" className="text-xl text-primary-500" />
          <div>
            <h3 className="text-lg font-semibold">Recent Login Activity</h3>
            <p className="text-sm text-default-600 dark:text-default-400">
              Review recent login activity on your account
            </p>
          </div>
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium">Windows PC - Chrome</p>
                <p className="text-sm text-default-600 dark:text-default-400">
                  Current session
                </p>
                <p className="text-xs text-success-600 mt-1">Active now</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-default-600 dark:text-default-400">192.168.1.105</p>
                <p className="text-xs text-default-500">New York, USA</p>
              </div>
            </div>

            <Divider />

            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium">iPhone 14 - Safari</p>
                <p className="text-sm text-default-600 dark:text-default-400">
                  Mobile device
                </p>
                <p className="text-xs text-default-500 mt-1">2 days ago</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-default-600 dark:text-default-400">82.112.48.32</p>
                <p className="text-xs text-default-500">Chicago, USA</p>
              </div>
            </div>

            <Divider />

            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium">MacBook Pro - Firefox</p>
                <p className="text-sm text-default-600 dark:text-default-400">
                  Laptop
                </p>
                <p className="text-xs text-default-500 mt-1">5 days ago</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-default-600 dark:text-default-400">192.168.1.110</p>
                <p className="text-xs text-default-500">New York, USA</p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
} 