"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Input, Button, Avatar, Textarea, Card, CardBody, Divider, Select, SelectItem
} from "@heroui/react";
import { Icon } from '@iconify/react';
import { useAuth } from '@/context/AuthContext';
import { updateProfile } from '@/services/userService';

// Validation Schema
const profileSchema = z.object({
  name: z.string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(50, { message: 'Name cannot exceed 50 characters' }),
  title: z.string()
    .max(100, { message: 'Title cannot exceed 100 characters' })
    .optional(),
  bio: z.string()
    .max(500, { message: 'Bio cannot exceed 500 characters' })
    .optional(),
  location: z.string()
    .max(100, { message: 'Location cannot exceed 100 characters' })
    .optional(),
  website: z.string()
    .url({ message: 'Please enter a valid URL' })
    .optional()
    .or(z.literal('')),
  timezone: z.string().optional(),
});

export default function ProfileSettings() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      title: user?.profile?.title || '',
      bio: user?.profile?.bio || '',
      location: user?.profile?.location || '',
      website: user?.profile?.website || '',
      timezone: user?.profile?.timezone || 'UTC',
    },
  });

  const handleSave = async (data) => {
    setError(null);
    setSuccessMessage(null);
    setLoading(true);
    try {
      const response = await updateProfile({
        name: data.name,
        profile: {
          title: data.title,
          bio: data.bio,
          location: data.location,
          website: data.website,
          timezone: data.timezone
        }
      });
      
      // Update the user in the context
      if (user) {
        const updatedUser = { 
          ...user, 
          name: data.name, 
          profile: { 
            ...user.profile, 
            title: data.title,
            bio: data.bio,
            location: data.location,
            website: data.website,
            timezone: data.timezone
          } 
        };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
      
      setSuccessMessage(response?.data?.message || 'Profile updated successfully!');
    } catch (err) {
      console.error("Update profile failed:", err);
      setError(err.response?.data?.message || 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChangeAvatar = () => {
    // This would typically open a file picker and upload the image
    console.log('Change avatar clicked');
    // For demo purposes, we'll just log this action
  };

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
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
        <CardBody>
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            <Avatar
              src={avatarUrl}
              name={user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
              size="lg"
              className="w-20 h-20"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1 dark:text-white">{user?.name || 'Your Name'}</h3>
              <p className="text-sm text-default-600 dark:text-default-400">{user?.profile?.title || 'Your Title'}</p>
            </div>
            <Button 
              color="primary" 
              variant="flat" 
              onPress={handleChangeAvatar}
              startContent={<Icon icon="mdi:camera-outline" />}
            >
              Change Photo
            </Button>
          </div>
          
          <Divider className="my-4" />
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                {...register('name')}
                label="Full Name"
                placeholder="Your full name"
                variant="bordered"
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message}
                startContent={<Icon icon="mdi:account-outline" className="text-xl text-default-400" />}
                classNames={{
                  inputWrapper: "bg-content2 dark:bg-content1"
                }}
              />
              
              <Input
                label="Email Address"
                value={user?.email || ''}
                isReadOnly
                variant="bordered"
                description="Email cannot be changed here."
                startContent={<Icon icon="mdi:email-outline" className="text-xl text-default-400" />}
                classNames={{
                  inputWrapper: "bg-content2 dark:bg-content1"
                }}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                {...register('title')}
                label="Professional Title"
                placeholder="e.g., Senior Software Engineer"
                variant="bordered"
                isInvalid={!!errors.title}
                errorMessage={errors.title?.message}
                startContent={<Icon icon="mdi:briefcase-outline" className="text-xl text-default-400" />}
                classNames={{
                  inputWrapper: "bg-content2 dark:bg-content1"
                }}
              />
              
              <Input
                {...register('location')}
                label="Location"
                placeholder="e.g., New York, USA"
                variant="bordered"
                isInvalid={!!errors.location}
                errorMessage={errors.location?.message}
                startContent={<Icon icon="mdi:map-marker-outline" className="text-xl text-default-400" />}
                classNames={{
                  inputWrapper: "bg-content2 dark:bg-content1"
                }}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                {...register('website')}
                label="Website"
                placeholder="e.g., https://yourwebsite.com"
                variant="bordered"
                isInvalid={!!errors.website}
                errorMessage={errors.website?.message}
                startContent={<Icon icon="mdi:web" className="text-xl text-default-400" />}
                classNames={{
                  inputWrapper: "bg-content2 dark:bg-content1"
                }}
              />
              
              <Select
                {...register('timezone')}
                label="Timezone"
                placeholder="Select your timezone"
                variant="bordered"
                defaultSelectedKeys={[user?.profile?.timezone || 'UTC']}
                isInvalid={!!errors.timezone}
                errorMessage={errors.timezone?.message}
                startContent={<Icon icon="mdi:clock-outline" className="text-xl text-default-400" />}
                onChange={(e) => setValue('timezone', e.target.value)}
                classNames={{
                  trigger: "bg-content2 dark:bg-content1"
                }}
              >
                <SelectItem key="UTC" value="UTC">UTC (Coordinated Universal Time)</SelectItem>
                <SelectItem key="EST" value="EST">EST (Eastern Standard Time)</SelectItem>
                <SelectItem key="CST" value="CST">CST (Central Standard Time)</SelectItem>
                <SelectItem key="PST" value="PST">PST (Pacific Standard Time)</SelectItem>
                <SelectItem key="GMT" value="GMT">GMT (Greenwich Mean Time)</SelectItem>
                <SelectItem key="IST" value="IST">IST (Indian Standard Time)</SelectItem>
                <SelectItem key="JST" value="JST">JST (Japan Standard Time)</SelectItem>
                <SelectItem key="AEDT" value="AEDT">AEDT (Australian Eastern Daylight Time)</SelectItem>
              </Select>
            </div>
            
            <Textarea
              {...register('bio')}
              label="Bio"
              placeholder="Tell us a bit about yourself"
              variant="bordered"
              minRows={4}
              isInvalid={!!errors.bio}
              errorMessage={errors.bio?.message}
              classNames={{
                inputWrapper: "bg-content2 dark:bg-content1"
              }}
            />

            <div className="flex justify-end mt-4">
              <Button
                type="submit"
                color="primary"
                isLoading={loading}
                isDisabled={loading}
                className="shadow-sm hover:shadow-md transition-all"
                startContent={!loading && <Icon icon="mdi:content-save" />}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </form>
  );
} 