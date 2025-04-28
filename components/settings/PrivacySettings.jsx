"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Switch, Button, Card, CardBody, CardHeader, Divider, Radio, RadioGroup
} from "@heroui/react";
import { Icon } from '@iconify/react';
import { useAuth } from '@/context/AuthContext';
import { updatePrivacySettings } from '@/services/userService';

// Privacy Settings Schema
const privacySchema = z.object({
  profileVisibility: z.enum(['public', 'connections', 'private']),
  searchableByEmail: z.boolean(),
  searchableByPhone: z.boolean(),
  showOnlineStatus: z.boolean(),
  allowProfileIndexing: z.boolean(),
  activityVisibility: z.enum(['everyone', 'connections', 'nobody']),
  dataSharing: z.object({
    allowUsageData: z.boolean(),
    allowThirdPartyData: z.boolean(),
  }),
});

export default function PrivacySettings() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Get default values from user preferences or set defaults
  const privacyDefaults = user?.privacySettings || {};

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    setValue,
    control,
  } = useForm({
    resolver: zodResolver(privacySchema),
    defaultValues: {
      profileVisibility: privacyDefaults.profileVisibility || 'public',
      searchableByEmail: privacyDefaults.searchableByEmail ?? true,
      searchableByPhone: privacyDefaults.searchableByPhone ?? false,
      showOnlineStatus: privacyDefaults.showOnlineStatus ?? true,
      allowProfileIndexing: privacyDefaults.allowProfileIndexing ?? true,
      activityVisibility: privacyDefaults.activityVisibility || 'connections',
      dataSharing: {
        allowUsageData: privacyDefaults.dataSharing?.allowUsageData ?? true,
        allowThirdPartyData: privacyDefaults.dataSharing?.allowThirdPartyData ?? false,
      },
    },
  });

  const formValues = watch();

  const toggleBooleanSetting = (key) => {
    setValue(key, !formValues[key], { shouldDirty: true });
  };

  const toggleDataSharingSetting = (key) => {
    setValue(`dataSharing.${key}`, !formValues.dataSharing[key], { shouldDirty: true });
  };

  const onSubmit = async (data) => {
    setError(null);
    setSuccessMessage(null);
    setLoading(true);
    try {
      const response = await updatePrivacySettings(data);
      
      // Update the user in the context
      if (user) {
        const updatedUser = { 
          ...user, 
          privacySettings: data
        };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
      
      setSuccessMessage(response?.data?.message || 'Privacy settings updated successfully!');
    } catch (err) {
      console.error("Update privacy settings failed:", err);
      setError(err.response?.data?.message || 'Failed to update privacy settings. Please try again.');
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
            <Icon icon="mdi:account-eye-outline" className="text-xl text-primary-500" />
            <h3 className="text-lg font-semibold">Profile Visibility</h3>
          </div>
          <p className="text-sm text-default-600 dark:text-default-400">
            Control who can see your profile
          </p>
        </CardHeader>
        <CardBody>
          <RadioGroup
            value={formValues.profileVisibility}
            onValueChange={(value) => setValue('profileVisibility', value, { shouldDirty: true })}
            color="primary"
          >
            <Radio value="public" description="Anyone can view your full profile">
              Public
            </Radio>
            <Radio value="connections" description="Only your connections can see your full profile">
              Connections Only
            </Radio>
            <Radio value="private" description="Only you can see your profile information">
              Private
            </Radio>
          </RadioGroup>
        </CardBody>
      </Card>

      <Card className="border border-default-200 dark:border-default-100">
        <CardHeader className="flex flex-col gap-1 pb-0">
          <div className="flex items-center gap-2">
            <Icon icon="mdi:magnify" className="text-xl text-primary-500" />
            <h3 className="text-lg font-semibold">Search Settings</h3>
          </div>
          <p className="text-sm text-default-600 dark:text-default-400">
            Control how others can find you
          </p>
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Search by Email Address</p>
                <p className="text-sm text-default-600 dark:text-default-400">
                  Allow people to find you using your email address
                </p>
              </div>
              <Switch
                isSelected={formValues.searchableByEmail}
                onValueChange={() => toggleBooleanSetting('searchableByEmail')}
                color="primary"
              />
            </div>
            
            <Divider className="my-2" />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Search by Phone Number</p>
                <p className="text-sm text-default-600 dark:text-default-400">
                  Allow people to find you using your phone number
                </p>
              </div>
              <Switch
                isSelected={formValues.searchableByPhone}
                onValueChange={() => toggleBooleanSetting('searchableByPhone')}
                color="primary"
              />
            </div>
            
            <Divider className="my-2" />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Show Online Status</p>
                <p className="text-sm text-default-600 dark:text-default-400">
                  Allow others to see when you're online
                </p>
              </div>
              <Switch
                isSelected={formValues.showOnlineStatus}
                onValueChange={() => toggleBooleanSetting('showOnlineStatus')}
                color="primary"
              />
            </div>
            
            <Divider className="my-2" />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Allow Search Engines</p>
                <p className="text-sm text-default-600 dark:text-default-400">
                  Allow search engines to index your profile
                </p>
              </div>
              <Switch
                isSelected={formValues.allowProfileIndexing}
                onValueChange={() => toggleBooleanSetting('allowProfileIndexing')}
                color="primary"
              />
            </div>
          </div>
        </CardBody>
      </Card>

      <Card className="border border-default-200 dark:border-default-100">
        <CardHeader className="flex flex-col gap-1 pb-0">
          <div className="flex items-center gap-2">
            <Icon icon="mdi:history" className="text-xl text-primary-500" />
            <h3 className="text-lg font-semibold">Activity Visibility</h3>
          </div>
          <p className="text-sm text-default-600 dark:text-default-400">
            Control who can see your activity
          </p>
        </CardHeader>
        <CardBody>
          <RadioGroup
            value={formValues.activityVisibility}
            onValueChange={(value) => setValue('activityVisibility', value, { shouldDirty: true })}
            color="primary"
          >
            <Radio value="everyone" description="Anyone can see your activity">
              Everyone
            </Radio>
            <Radio value="connections" description="Only your connections can see your activity">
              Connections Only
            </Radio>
            <Radio value="nobody" description="No one can see your activity">
              Nobody
            </Radio>
          </RadioGroup>
        </CardBody>
      </Card>

      <Card className="border border-default-200 dark:border-default-100">
        <CardHeader className="flex flex-col gap-1 pb-0">
          <div className="flex items-center gap-2">
            <Icon icon="mdi:database-share-outline" className="text-xl text-primary-500" />
            <h3 className="text-lg font-semibold">Data Sharing</h3>
          </div>
          <p className="text-sm text-default-600 dark:text-default-400">
            Manage how your data is used
          </p>
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Usage Data</p>
                <p className="text-sm text-default-600 dark:text-default-400">
                  Allow us to collect data about how you use our platform to improve our services
                </p>
              </div>
              <Switch
                isSelected={formValues.dataSharing.allowUsageData}
                onValueChange={() => toggleDataSharingSetting('allowUsageData')}
                color="primary"
              />
            </div>
            
            <Divider className="my-2" />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Third-Party Data Sharing</p>
                <p className="text-sm text-default-600 dark:text-default-400">
                  Allow us to share your data with third parties for marketing purposes
                </p>
              </div>
              <Switch
                isSelected={formValues.dataSharing.allowThirdPartyData}
                onValueChange={() => toggleDataSharingSetting('allowThirdPartyData')}
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
          {loading ? 'Saving...' : 'Save Privacy Settings'}
        </Button>
      </div>
    </form>
  );
} 