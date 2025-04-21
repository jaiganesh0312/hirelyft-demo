'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, Input, Card, CardHeader, CardBody, CardFooter, Link } from "@heroui/react";
import { Icon } from '@iconify/react';
import { forgotPassword } from '@/services/authService';
import { useRouter } from 'next/navigation';

// Validation Schema
const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data) => {
    setError(null);
    setSuccessMessage(null);
    setLoading(true);
    try {
      const response = await forgotPassword(data);
      setSuccessMessage(response.data.message || 'Password reset email sent successfully! Please check your inbox.');
      reset(); // Clear form
    } catch (err) {
      console.error("Forgot password request failed:", err);
      setError(err.response?.data?.message || 'Failed to send password reset email. Please check the email address and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-gray-900 dark:to-black p-4">
      <Card className="w-full max-w-md shadow-xl bg-white/90 dark:bg-default-50/90 backdrop-blur-sm">
        <CardHeader className="flex flex-col items-center pt-6">
           <Icon icon="mdi:key-variant" className="text-4xl text-warning mb-3" />
          <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">Forgot Your Password?</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 px-4 text-center mt-1">Enter your email address and we'll send you a link to reset it.</p>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardBody className="gap-4 pb-4">
            {error && (
              <div className="bg-danger-100 border-l-4 border-danger-500 text-danger-700 p-3 rounded-md mb-2" role="alert">
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}
            {successMessage && (
                 <div className="bg-success-100 border-l-4 border-success-500 text-success-700 p-3 rounded-md mb-2" role="alert">
                    <p className="text-sm font-medium">{successMessage}</p>
                 </div>
            )}

            <Input
              {...register('email')}
              label="Email Address"
              placeholder="Enter your registered email"
              variant="bordered"
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
              startContent={<Icon icon="mdi:email-outline" className="text-xl text-default-400 pointer-events-none flex-shrink-0" />}
              isRequired
              isDisabled={loading || !!successMessage} // Disable if loading or success
            />

            <Button
              type="submit"
              color="primary"
              fullWidth
              isLoading={loading}
              isDisabled={loading || !!successMessage} // Disable if loading or success
              className="font-semibold mt-2"
            >
              {loading ? 'Sending Link...' : 'Send Reset Link'}
            </Button>

          </CardBody>
          <CardFooter className="flex flex-col items-center pb-6">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Remembered your password?
              <Link size="sm" href="/auth/login" className="ml-1">
                Sign In
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
} 