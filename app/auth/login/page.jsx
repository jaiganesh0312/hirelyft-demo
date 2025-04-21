'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, Input, Card, CardHeader, CardBody, CardFooter, Link, Divider, Checkbox, InputOtp } from "@heroui/react";
import { Icon } from '@iconify/react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

// Validation Schema
const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
  rememberMe: z.boolean().optional(),
  totpToken: z.string().optional(), // Optional 2FA token
});

export default function LoginPage() {
  const { login, loading, error, setError } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [requires2FA, setRequires2FA] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
      totpToken: '',
    },
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = async (data) => {
    setError(null); // Clear previous errors
    const credentials = { email: data.email, password: data.password };
    if (requires2FA) {
        credentials.totpToken = data.totpToken;
    }

    const result = await login(credentials);

    if (!result.success) {
      if (result.require2FA) {
        setRequires2FA(true);
      } 
    } else {
      // Login successful, AuthContext handles redirect
      reset(); // Clear form on successful login
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-900 dark:to-black p-4">
      <Card className="w-full max-w-md shadow-xl bg-white/80 dark:bg-default-50/80 backdrop-blur-sm">
        <CardHeader className="flex flex-col items-center pt-6">
          <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">Welcome Back!</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Sign in to your account</p>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardBody className="gap-4 pb-4">
            {error && (
              <div className="bg-danger-100 border-l-4 border-danger-500 text-danger-700 p-3 rounded-md mb-2" role="alert">
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}
            <Input
              {...register('email')}
              label="Email Address"
              placeholder="Enter your email"
              variant="bordered"
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
              startContent={<Icon icon="mdi:email-outline" className="text-xl text-default-400 pointer-events-none flex-shrink-0" />}
              isRequired
              isDisabled={loading}
            />
            <Input
              {...register('password')}
              label="Password"
              placeholder="Enter your password"
              variant="bordered"
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
              startContent={<Icon icon="mdi:lock-outline" className="text-xl text-default-400 pointer-events-none flex-shrink-0" />}
              endContent={
                <button className="focus:outline-none" type="button" onClick={togglePasswordVisibility}>
                  {showPassword ? (
                    <Icon icon="mdi:eye-off-outline" className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <Icon icon="mdi:eye-outline" className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={showPassword ? "text" : "password"}
              isRequired
              isDisabled={loading}
            />

            {requires2FA && (
              <>
              <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-1 mt-2">Enter the 6 digit verification code</p>
              <InputOtp
                {...register('totpToken')}
                placeholder="Enter your 6-digit code"
                variant="bordered"
                isInvalid={!!errors.totpToken}
                errorMessage={errors.totpToken?.message}
                className='mx-auto'
                isRequired
                isDisabled={loading}
                length={6}
              />
              </>
            )}

            <div className="flex py-1 px-1 justify-between">
              <Checkbox {...register('rememberMe')} size="sm" isDisabled={loading}>
                Remember me
              </Checkbox>
              <Link size="sm" href="/auth/forgot-password" isDisabled={loading}>
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              color="primary"
              fullWidth
              isLoading={loading}
              isDisabled={loading}
              className="font-semibold"
            >
              {loading ? 'Signing In...' : requires2FA ? 'Verify Code & Sign In' : 'Sign In'}
            </Button>

            <Divider className="my-2" />

            {/* Link to OTP Login Page */}
            <div className="text-center">
                <Button
                    variant="light"
                    color="secondary"
                    onPress={() => router.push('/auth/login-otp')} // Changed route to /login-otp
                    isDisabled={loading}
                    startContent={<Icon icon="mdi:cellphone-key" />}
                    className="text-sm"
                >
                    Sign in with One-Time Code
                </Button>
            </div>

          </CardBody>
          <CardFooter className="flex flex-col items-center pb-6">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?
              <Link size="sm" href="/auth/register" className="ml-1" isDisabled={loading}>
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
} 