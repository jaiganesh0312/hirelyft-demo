"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Switch, Button, Card, CardBody, CardHeader, Divider, Select, SelectItem, Slider, RadioGroup, Radio
} from "@heroui/react";
import { Icon } from '@iconify/react';
import { useAuth } from '@/context/AuthContext';
import { updateAccessibilitySettings } from '@/services/userService';

// Accessibility Settings Schema
const accessibilitySchema = z.object({
  theme: z.enum(['system', 'light', 'dark']),
  fontSize: z.number().min(80).max(150),
  reduceMotion: z.boolean(),
  reduceTransparency: z.boolean(),
  highContrast: z.boolean(),
  screenReader: z.boolean(),
  keyboardNavigation: z.boolean(),
  autoplayMedia: z.boolean(),
  colorBlindMode: z.enum(['none', 'protanopia', 'deuteranopia', 'tritanopia']),
});

export default function AccessibilitySettings() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Get default values from user preferences or set defaults
  const accessibilityDefaults = user?.accessibilitySettings || {};

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    setValue,
    control,
  } = useForm({
    resolver: zodResolver(accessibilitySchema),
    defaultValues: {
      theme: accessibilityDefaults.theme || 'system',
      fontSize: accessibilityDefaults.fontSize || 100,
      reduceMotion: accessibilityDefaults.reduceMotion ?? false,
      reduceTransparency: accessibilityDefaults.reduceTransparency ?? false,
      highContrast: accessibilityDefaults.highContrast ?? false,
      screenReader: accessibilityDefaults.screenReader ?? false,
      keyboardNavigation: accessibilityDefaults.keyboardNavigation ?? false,
      autoplayMedia: accessibilityDefaults.autoplayMedia ?? true,
      colorBlindMode: accessibilityDefaults.colorBlindMode || 'none',
    },
  });

  const formValues = watch();

  const toggleBooleanSetting = (key) => {
    setValue(key, !formValues[key], { shouldDirty: true });
  };

  const handleFontSizeChange = (value) => {
    setValue('fontSize', value, { shouldDirty: true });
  };

  const onSubmit = async (data) => {
    setError(null);
    setSuccessMessage(null);
    setLoading(true);
    try {
      const response = await updateAccessibilitySettings(data);
      
      // Update the user in the context
      if (user) {
        const updatedUser = { 
          ...user, 
          accessibilitySettings: data
        };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
      
      setSuccessMessage(response?.data?.message || 'Accessibility settings updated successfully!');
      // Apply some settings immediately
      applyAccessibilitySettings(data);
    } catch (err) {
      console.error("Update accessibility settings failed:", err);
      setError(err.response?.data?.message || 'Failed to update accessibility settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to apply some settings immediately
  const applyAccessibilitySettings = (settings) => {
    // This would be implemented with actual functionality in a real app
    console.log('Applying accessibility settings:', settings);
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
            <Icon icon="mdi:palette-outline" className="text-xl text-primary-500" />
            <h3 className="text-lg font-semibold">Display</h3>
          </div>
          <p className="text-sm text-default-600 dark:text-default-400">
            Customize how the app appears
          </p>
        </CardHeader>
        <CardBody>
          <div className="space-y-6">
            <div>
              <p className="font-medium mb-2">Theme</p>
              <RadioGroup
                value={formValues.theme}
                onValueChange={(value) => setValue('theme', value, { shouldDirty: true })}
                orientation="horizontal"
                color="primary"
              >
                <Radio value="system">Use System Theme</Radio>
                <Radio value="light">Light Mode</Radio>
                <Radio value="dark">Dark Mode</Radio>
              </RadioGroup>
            </div>
            
            <div>
              <p className="font-medium mb-2">Font Size ({formValues.fontSize}%)</p>
              <Slider 
                size="sm"
                step={5}
                minValue={80}
                maxValue={150}
                defaultValue={formValues.fontSize}
                value={formValues.fontSize}
                onChange={handleFontSizeChange}
                className="max-w-md"
                color="primary"
                showSteps={true}
                marks={[
                  { value: 80, label: "80%" },
                  { value: 100, label: "100%" },
                  { value: 120, label: "120%" },
                  { value: 150, label: "150%" },
                ]}
              />
            </div>
            
            <div>
              <p className="font-medium mb-2">Color Blind Mode</p>
              <Select
                label="Select a mode"
                value={formValues.colorBlindMode}
                onChange={(e) => setValue('colorBlindMode', e.target.value, { shouldDirty: true })}
                className="max-w-xs"
                variant="bordered"
              >
                <SelectItem key="none" value="none">None</SelectItem>
                <SelectItem key="protanopia" value="protanopia">Protanopia (Red-Blind)</SelectItem>
                <SelectItem key="deuteranopia" value="deuteranopia">Deuteranopia (Green-Blind)</SelectItem>
                <SelectItem key="tritanopia" value="tritanopia">Tritanopia (Blue-Blind)</SelectItem>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">High Contrast</p>
                <p className="text-sm text-default-600 dark:text-default-400">
                  Increase contrast between elements
                </p>
              </div>
              <Switch
                isSelected={formValues.highContrast}
                onValueChange={() => toggleBooleanSetting('highContrast')}
                color="primary"
              />
            </div>
          </div>
        </CardBody>
      </Card>

      <Card className="border border-default-200 dark:border-default-100">
        <CardHeader className="flex flex-col gap-1 pb-0">
          <div className="flex items-center gap-2">
            <Icon icon="mdi:motion-outline" className="text-xl text-primary-500" />
            <h3 className="text-lg font-semibold">Motion & Effects</h3>
          </div>
          <p className="text-sm text-default-600 dark:text-default-400">
            Control animations and visual effects
          </p>
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Reduce Motion</p>
                <p className="text-sm text-default-600 dark:text-default-400">
                  Minimize animations throughout the interface
                </p>
              </div>
              <Switch
                isSelected={formValues.reduceMotion}
                onValueChange={() => toggleBooleanSetting('reduceMotion')}
                color="primary"
              />
            </div>
            
            <Divider className="my-2" />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Reduce Transparency</p>
                <p className="text-sm text-default-600 dark:text-default-400">
                  Reduce transparency and blur effects
                </p>
              </div>
              <Switch
                isSelected={formValues.reduceTransparency}
                onValueChange={() => toggleBooleanSetting('reduceTransparency')}
                color="primary"
              />
            </div>
            
            <Divider className="my-2" />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Autoplay Media</p>
                <p className="text-sm text-default-600 dark:text-default-400">
                  Allow videos and animations to play automatically
                </p>
              </div>
              <Switch
                isSelected={formValues.autoplayMedia}
                onValueChange={() => toggleBooleanSetting('autoplayMedia')}
                color="primary"
              />
            </div>
          </div>
        </CardBody>
      </Card>

      <Card className="border border-default-200 dark:border-default-100">
        <CardHeader className="flex flex-col gap-1 pb-0">
          <div className="flex items-center gap-2">
            <Icon icon="mdi:accessibility" className="text-xl text-primary-500" />
            <h3 className="text-lg font-semibold">Navigation & Input</h3>
          </div>
          <p className="text-sm text-default-600 dark:text-default-400">
            Control how you interact with the app
          </p>
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Screen Reader Optimization</p>
                <p className="text-sm text-default-600 dark:text-default-400">
                  Optimize the interface for screen readers
                </p>
              </div>
              <Switch
                isSelected={formValues.screenReader}
                onValueChange={() => toggleBooleanSetting('screenReader')}
                color="primary"
              />
            </div>
            
            <Divider className="my-2" />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Enhanced Keyboard Navigation</p>
                <p className="text-sm text-default-600 dark:text-default-400">
                  Improve keyboard focus indicators and navigation
                </p>
              </div>
              <Switch
                isSelected={formValues.keyboardNavigation}
                onValueChange={() => toggleBooleanSetting('keyboardNavigation')}
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
          {loading ? 'Saving...' : 'Save Accessibility Settings'}
        </Button>
      </div>
    </form>
  );
} 