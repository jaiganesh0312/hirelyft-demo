"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Switch, Button, Card, CardBody, CardHeader, Divider, Badge, RadioGroup, Radio } from "@heroui/react";
import { Icon } from '@iconify/react';
import { useAuth } from '@/context/AuthContext';
import { updateNotificationPreferences } from '@/services/userService';

// Notification Schema
const notificationSchema = z.object({
  email: z.object({
    newMessages: z.boolean(),
    jobAlerts: z.boolean(),
    applicationUpdates: z.boolean(),
    promotions: z.boolean(),
    securityAlerts: z.boolean(),
    accountChanges: z.boolean(),
  }),
  push: z.object({
    newMessages: z.boolean(),
    jobAlerts: z.boolean(),
    applicationUpdates: z.boolean(),
    promotions: z.boolean(),
    securityAlerts: z.boolean(),
    accountChanges: z.boolean(),
  }),
  sms: z.object({
    securityAlerts: z.boolean(),
    accountChanges: z.boolean(),
  }),
  frequency: z.enum(['immediate', 'daily', 'weekly']),
});

export default function NotificationSettings() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Get default values from user preferences or set defaults
  const defaultEmailPrefs = user?.notificationPreferences?.email || {};
  const defaultPushPrefs = user?.notificationPreferences?.push || {};
  const defaultSmsPrefs = user?.notificationPreferences?.sms || {};
  const defaultFrequency = user?.notificationPreferences?.frequency || 'immediate';

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      email: {
        newMessages: defaultEmailPrefs.newMessages ?? true,
        jobAlerts: defaultEmailPrefs.jobAlerts ?? true,
        applicationUpdates: defaultEmailPrefs.applicationUpdates ?? true,
        promotions: defaultEmailPrefs.promotions ?? false,
        securityAlerts: defaultEmailPrefs.securityAlerts ?? true,
        accountChanges: defaultEmailPrefs.accountChanges ?? true,
      },
      push: {
        newMessages: defaultPushPrefs.newMessages ?? true,
        jobAlerts: defaultPushPrefs.jobAlerts ?? false,
        applicationUpdates: defaultPushPrefs.applicationUpdates ?? true,
        promotions: defaultPushPrefs.promotions ?? false,
        securityAlerts: defaultPushPrefs.securityAlerts ?? true,
        accountChanges: defaultPushPrefs.accountChanges ?? true,
      },
      sms: {
        securityAlerts: defaultSmsPrefs.securityAlerts ?? true,
        accountChanges: defaultSmsPrefs.accountChanges ?? true,
      },
      frequency: defaultFrequency,
    },
  });

  // Watch values for toggle handling
  const emailValues = watch('email');
  const pushValues = watch('push');
  const smsValues = watch('sms');
  const frequency = watch('frequency');

  const handleEmailToggle = (key) => {
    setValue(`email.${key}`, !emailValues[key], { shouldDirty: true });
  };

  const handlePushToggle = (key) => {
    setValue(`push.${key}`, !pushValues[key], { shouldDirty: true });
  };

  const handleSmsToggle = (key) => {
    setValue(`sms.${key}`, !smsValues[key], { shouldDirty: true });
  };

  const setFrequency = (value) => {
    setValue('frequency', value, { shouldDirty: true });
  };

  const onSubmit = async (data) => {
    setError(null);
    setSuccessMessage(null);
    setLoading(true);
    try {
      const response = await updateNotificationPreferences(data);
      
      // Update the user in the context
      if (user) {
        const updatedUser = { 
          ...user, 
          notificationPreferences: data
        };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
      
      setSuccessMessage(response?.data?.message || 'Notification preferences updated successfully!');
    } catch (err) {
      console.error("Update notification preferences failed:", err);
      setError(err.response?.data?.message || 'Failed to update notification preferences. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="bg-danger-100 border-l-4 border-danger-500 text-danger-700 p-4 rounded-md animate-fadeIn" role="alert">
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}
      {successMessage && (
        <div className="bg-success-100 border-l-4 border-success-500 text-success-700 p-4 rounded-md animate-fadeIn" role="alert">
          <p className="text-sm font-medium">{successMessage}</p>
        </div>
      )}

      <Card className="border border-default-200 dark:border-default-100">
        <CardHeader className="flex flex-col gap-1 pb-0">
          <div className="flex items-center gap-2">
            <Icon icon="mdi:bell-cog-outline" className="text-xl text-primary-500" />
            <h3 className="text-lg font-semibold">Notification Frequency</h3>
          </div>
          <p className="text-sm text-default-600 dark:text-default-400">
            Choose how often you'd like to receive notifications
          </p>
        </CardHeader>
        <CardBody>
          <RadioGroup 
            orientation="horizontal" 
            value={frequency}
            onValueChange={(value) => setFrequency(value)}
            color="primary"
            className="gap-4"
          >
            <Radio 
              value="immediate"
              description="Get notified right away"
              startContent={<Icon icon="mdi:lightning-bolt" className="text-lg text-primary-500" />}
            >
              Immediate
            </Radio>
            <Radio 
              value="daily"
              description="Receive a daily summary"
              startContent={<Icon icon="mdi:calendar-today" className="text-lg text-primary-500" />}
            >
              Daily Digest
            </Radio>
            <Radio 
              value="weekly"
              description="Receive a weekly summary"
              startContent={<Icon icon="mdi:calendar-week" className="text-lg text-primary-500" />}
            >
              Weekly Digest
            </Radio>
          </RadioGroup>
        </CardBody>
      </Card>

      <Card className="border border-default-200 dark:border-default-100">
        <CardHeader className="flex flex-col gap-1 pb-0">
          <div className="flex items-center gap-2">
            <Icon icon="mdi:email-outline" className="text-xl text-primary-500" />
            <h3 className="text-lg font-semibold">Email Notifications</h3>
          </div>
          <p className="text-sm text-default-600 dark:text-default-400">
            Select which emails you want to receive
          </p>
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">New Messages</p>
                <p className="text-sm text-default-600 dark:text-default-400">
                  Get notified when you receive new messages
                </p>
              </div>
              <Switch
                isSelected={emailValues.newMessages}
                onValueChange={() => handleEmailToggle('newMessages')}
                size="sm"
                color="primary"
              />
            </div>
            
            <Divider className="my-2" />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Job Alerts & Recommendations</p>
                <p className="text-sm text-default-600 dark:text-default-400">
                  Receive updates about jobs matching your profile
                </p>
              </div>
              <Switch
                isSelected={emailValues.jobAlerts}
                onValueChange={() => handleEmailToggle('jobAlerts')}
                size="sm"
                color="primary"
              />
            </div>
            
            <Divider className="my-2" />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Application Status Updates</p>
                <p className="text-sm text-default-600 dark:text-default-400">
                  Get notified about changes to your application status
                </p>
              </div>
              <Switch
                isSelected={emailValues.applicationUpdates}
                onValueChange={() => handleEmailToggle('applicationUpdates')}
                size="sm"
                color="primary"
              />
            </div>
            
            <Divider className="my-2" />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Security Alerts</p>
                <p className="text-sm text-default-600 dark:text-default-400">
                  Receive important security notifications
                </p>
              </div>
              <Switch
                isSelected={emailValues.securityAlerts}
                onValueChange={() => handleEmailToggle('securityAlerts')}
                size="sm"
                color="primary"
              />
            </div>
            
            <Divider className="my-2" />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Account Changes</p>
                <p className="text-sm text-default-600 dark:text-default-400">
                  Get notified when changes are made to your account
                </p>
              </div>
              <Switch
                isSelected={emailValues.accountChanges}
                onValueChange={() => handleEmailToggle('accountChanges')}
                size="sm"
                color="primary"
              />
            </div>
            
            <Divider className="my-2" />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Platform News & Promotions</p>
                <p className="text-sm text-default-600 dark:text-default-400">
                  Get updates on platform features and promotions
                </p>
              </div>
              <Switch
                isSelected={emailValues.promotions}
                onValueChange={() => handleEmailToggle('promotions')}
                size="sm"
                color="primary"
              />
            </div>
          </div>
        </CardBody>
      </Card>

      <Card className="border border-default-200 dark:border-default-100">
        <CardHeader className="flex flex-col gap-1 pb-0">
          <div className="flex items-center gap-2">
            <Icon icon="mdi:bell-outline" className="text-xl text-primary-500" />
            <h3 className="text-lg font-semibold">Push Notifications</h3>
          </div>
          <p className="text-sm text-default-600 dark:text-default-400">
            Configure push notifications for the mobile app
          </p>
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">New Messages</p>
                <p className="text-sm text-default-600 dark:text-default-400">
                  Get notified when you receive new messages
                </p>
              </div>
              <Switch
                isSelected={pushValues.newMessages}
                onValueChange={() => handlePushToggle('newMessages')}
                size="sm"
                color="primary"
              />
            </div>
            
            <Divider className="my-2" />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Job Alerts & Recommendations</p>
                <p className="text-sm text-default-600 dark:text-default-400">
                  Receive updates about jobs matching your profile
                </p>
              </div>
              <Switch
                isSelected={pushValues.jobAlerts}
                onValueChange={() => handlePushToggle('jobAlerts')}
                size="sm"
                color="primary"
              />
            </div>
            
            <Divider className="my-2" />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Application Status Updates</p>
                <p className="text-sm text-default-600 dark:text-default-400">
                  Get notified about changes to your application status
                </p>
              </div>
              <Switch
                isSelected={pushValues.applicationUpdates}
                onValueChange={() => handlePushToggle('applicationUpdates')}
                size="sm"
                color="primary"
              />
            </div>
            
            <Divider className="my-2" />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Security Alerts</p>
                <p className="text-sm text-default-600 dark:text-default-400">
                  Receive important security notifications
                </p>
              </div>
              <Switch
                isSelected={pushValues.securityAlerts}
                onValueChange={() => handlePushToggle('securityAlerts')}
                size="sm"
                color="primary"
              />
            </div>
            
            <Divider className="my-2" />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Account Changes</p>
                <p className="text-sm text-default-600 dark:text-default-400">
                  Get notified when changes are made to your account
                </p>
              </div>
              <Switch
                isSelected={pushValues.accountChanges}
                onValueChange={() => handlePushToggle('accountChanges')}
                size="sm"
                color="primary"
              />
            </div>
            
            <Divider className="my-2" />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Platform News & Promotions</p>
                <p className="text-sm text-default-600 dark:text-default-400">
                  Get updates on platform features and promotions
                </p>
              </div>
              <Switch
                isSelected={pushValues.promotions}
                onValueChange={() => handlePushToggle('promotions')}
                size="sm"
                color="primary"
              />
            </div>
          </div>
        </CardBody>
      </Card>

      <Card className="border border-default-200 dark:border-default-100">
        <CardHeader className="flex flex-col gap-1 pb-0">
          <div className="flex items-center gap-2">
            <Icon icon="mdi:message-text-outline" className="text-xl text-primary-500" />
            <h3 className="text-lg font-semibold">SMS Notifications</h3>
          </div>
          <p className="text-sm text-default-600 dark:text-default-400">
            Configure critical alerts via SMS (standard rates may apply)
          </p>
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Security Alerts</p>
                <p className="text-sm text-default-600 dark:text-default-400">
                  Receive important security notifications via SMS
                </p>
              </div>
              <Switch
                isSelected={smsValues.securityAlerts}
                onValueChange={() => handleSmsToggle('securityAlerts')}
                size="sm"
                color="primary"
              />
            </div>
            
            <Divider className="my-2" />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Account Changes</p>
                <p className="text-sm text-default-600 dark:text-default-400">
                  Get SMS alerts about critical account changes
                </p>
              </div>
              <Switch
                isSelected={smsValues.accountChanges}
                onValueChange={() => handleSmsToggle('accountChanges')}
                size="sm"
                color="primary"
              />
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="flex justify-end mt-4">
        <Button
          type="submit"
          color="primary"
          isLoading={loading}
          isDisabled={loading || !isDirty}
          className="shadow-sm hover:shadow-md transition-all"
          startContent={!loading && <Icon icon="mdi:content-save" />}
        >
          {loading ? 'Saving...' : 'Save Preferences'}
        </Button>
      </div>
    </form>
  );
} 