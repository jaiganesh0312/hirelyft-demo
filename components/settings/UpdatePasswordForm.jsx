'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, Input, Card, CardBody, Tooltip, Progress } from "@heroui/react";
import { Icon } from '@iconify/react';
import { updatePassword } from '@/services/authService';

// Validation Schema
const updatePasswordSchema = z.object({
  currentPassword: z.string().min(1, { message: 'Current password is required' }),
  newPassword: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character' }),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function UpdatePasswordForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const newPassword = watch('newPassword');

  // Calculate password strength
  useEffect(() => {
    if (!newPassword) {
      setPasswordStrength(0);
      return;
    }
    
    let strength = 0;
    if (newPassword.length >= 8) strength += 1;
    if (/[A-Z]/.test(newPassword)) strength += 1;
    if (/[a-z]/.test(newPassword)) strength += 1;
    if (/[0-9]/.test(newPassword)) strength += 1;
    if (/[^A-Za-z0-9]/.test(newPassword)) strength += 1;
    
    setPasswordStrength(strength);
  }, [newPassword]);

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return "danger";
    if (passwordStrength <= 3) return "warning";
    if (passwordStrength <= 4) return "primary";
    return "success";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength <= 3) return "Moderate";
    if (passwordStrength <= 4) return "Strong";
    return "Very Strong";
  };

  const toggleCurrentPasswordVisibility = () => setShowCurrentPassword(!showCurrentPassword);
  const toggleNewPasswordVisibility = () => setShowNewPassword(!showNewPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const onSubmit = async (data) => {
    setError(null);
    setSuccessMessage(null);
    setLoading(true);
    try {
      const response = await updatePassword({
        currentPassword: data.currentPassword,
        password: data.newPassword,
        confirmPassword: data.confirmPassword
      });
      setSuccessMessage(response.data.message || 'Password updated successfully!');
      reset();
    } catch (err) {
      console.error("Update password failed:", err);
      setError(err.response?.data?.message || 'Failed to update password. Please check your current password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col gap-4">
      {error && (
        <div className="bg-danger-100 border-l-4 border-danger-500 text-danger-700 p-3 rounded-md animate-fadeIn" role="alert">
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}
      {successMessage && (
        <div className="bg-success-100 border-l-4 border-success-500 text-success-700 p-3 rounded-md animate-fadeIn" role="alert">
          <p className="text-sm font-medium">{successMessage}</p>
        </div>
      )}

      <Input
        {...register('currentPassword')}
        label="Current Password"
        placeholder="Enter your current password"
        variant="bordered"
        isInvalid={!!errors.currentPassword}
        errorMessage={errors.currentPassword?.message}
        startContent={<Icon icon="mdi:lock-outline" className="text-xl text-default-400 pointer-events-none flex-shrink-0" />}
        endContent={
          <button className="focus:outline-none" type="button" onClick={toggleCurrentPasswordVisibility}>
            {showCurrentPassword ? (
              <Icon icon="mdi:eye-off-outline" className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <Icon icon="mdi:eye-outline" className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={showCurrentPassword ? "text" : "password"}
        isRequired
        isDisabled={loading}
        classNames={{
          inputWrapper: "bg-content2 dark:bg-content1"
        }}
      />

      <div>
        <Input
          {...register('newPassword')}
          label="New Password"
          placeholder="Enter your new password"
          variant="bordered"
          isInvalid={!!errors.newPassword}
          errorMessage={errors.newPassword?.message}
          startContent={<Icon icon="mdi:lock-plus-outline" className="text-xl text-default-400 pointer-events-none flex-shrink-0" />}
          endContent={
            <button className="focus:outline-none" type="button" onClick={toggleNewPasswordVisibility}>
              {showNewPassword ? (
                <Icon icon="mdi:eye-off-outline" className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <Icon icon="mdi:eye-outline" className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={showNewPassword ? "text" : "password"}
          isRequired
          isDisabled={loading}
          classNames={{
            inputWrapper: "bg-content2 dark:bg-content1"
          }}
        />
        
        {newPassword && (
          <div className="mt-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium text-default-600">Password Strength: {getPasswordStrengthText()}</span>
            </div>
            <Progress value={passwordStrength * 20} color={getPasswordStrengthColor()} />
          </div>
        )}
      </div>

      <Input
        {...register('confirmPassword')}
        label="Confirm New Password"
        placeholder="Re-enter your new password"
        variant="bordered"
        isInvalid={!!errors.confirmPassword}
        errorMessage={errors.confirmPassword?.message}
        startContent={<Icon icon="mdi:lock-check-outline" className="text-xl text-default-400 pointer-events-none flex-shrink-0" />}
        endContent={
          <button className="focus:outline-none" type="button" onClick={toggleConfirmPasswordVisibility}>
            {showConfirmPassword ? (
              <Icon icon="mdi:eye-off-outline" className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <Icon icon="mdi:eye-outline" className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={showConfirmPassword ? "text" : "password"}
        isRequired
        isDisabled={loading}
        classNames={{
          inputWrapper: "bg-content2 dark:bg-content1"
        }}
      />

      <Card className="bg-content2/50 dark:bg-content1/50 shadow-none">
        <CardBody className="p-3">
          <h3 className="text-sm font-semibold mb-2">Password Requirements:</h3>
          <ul className="text-xs space-y-1 text-default-500">
            <li className="flex items-center">
              <Icon icon={newPassword?.length >= 8 ? "mdi:check-circle" : "mdi:circle-outline"} 
                className={`mr-1 ${newPassword?.length >= 8 ? "text-success" : "text-default-400"}`} />
              At least 8 characters
            </li>
            <li className="flex items-center">
              <Icon icon={/[A-Z]/.test(newPassword) ? "mdi:check-circle" : "mdi:circle-outline"} 
                className={`mr-1 ${/[A-Z]/.test(newPassword) ? "text-success" : "text-default-400"}`} />
              At least one uppercase letter
            </li>
            <li className="flex items-center">
              <Icon icon={/[a-z]/.test(newPassword) ? "mdi:check-circle" : "mdi:circle-outline"} 
                className={`mr-1 ${/[a-z]/.test(newPassword) ? "text-success" : "text-default-400"}`} />
              At least one lowercase letter
            </li>
            <li className="flex items-center">
              <Icon icon={/[0-9]/.test(newPassword) ? "mdi:check-circle" : "mdi:circle-outline"} 
                className={`mr-1 ${/[0-9]/.test(newPassword) ? "text-success" : "text-default-400"}`} />
              At least one number
            </li>
            <li className="flex items-center">
              <Icon icon={/[^A-Za-z0-9]/.test(newPassword) ? "mdi:check-circle" : "mdi:circle-outline"} 
                className={`mr-1 ${/[^A-Za-z0-9]/.test(newPassword) ? "text-success" : "text-default-400"}`} />
              At least one special character
            </li>
          </ul>
        </CardBody>
      </Card>

      <Button
        type="submit"
        color="primary"
        fullWidth
        isLoading={loading}
        isDisabled={loading}
        className="font-semibold shadow-md hover:shadow-lg transition-all"
        startContent={!loading && <Icon icon="mdi:content-save" className="text-xl" />}
      >
        {loading ? 'Updating Password...' : 'Update Password'}
      </Button>
    </form>
  );
}