'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, Input, Card, CardHeader, CardBody, CardFooter, Link, InputOTP, OTPInput } from "@heroui/react"; // Assuming InputOTP/OTPInput exists or use regular Input
import { Icon } from '@iconify/react';
import { requestOtpLogin, verifyOtpLogin } from '@/services/authService';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

// Validation Schemas
const emailSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

const otpSchema = z.object({
    // Assuming OTP is 6 digits based on typical usage
    otp: z.string().min(6, { message: 'OTP must be 6 digits' }).max(6, { message: 'OTP must be 6 digits' }),
});


export default function LoginOtpPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [stage, setStage] = useState('enterEmail'); // 'enterEmail' or 'enterOtp'
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Configure react-hook-form for email stage initially
  const emailForm = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '' },
  });

  // Configure react-hook-form for OTP stage
  const otpForm = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  });

  // Function to handle requesting OTP
  const handleRequestOtp = async (data) => {
    setError(null);
    setSuccessMessage(null);
    setLoading(true);
    try {
      await requestOtpLogin({ email: data.email });
      setEmail(data.email); // Store email for the next stage
      setStage('enterOtp');
      setSuccessMessage('OTP sent successfully! Please check your email.');
      otpForm.reset(); // Reset OTP form when moving to OTP stage
    } catch (err) {
      console.error("Request OTP failed:", err);
      setError(err.response?.data?.message || 'Failed to request OTP. Please check the email and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle verifying OTP and logging in
  const handleVerifyOtp = async (data) => {
    setError(null);
    setSuccessMessage(null);
    setLoading(true);
    try {
      const response = await verifyOtpLogin({ email, otp: data.otp });
      const { token, refreshToken, user: userData } = response.data;

      // Manually set auth state since verifyOtpLogin provides tokens/user directly
      localStorage.setItem('authToken', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Update the AuthContext state
      setUser(userData);
      
      // Redirect after updating the state
      router.replace('/');

      setSuccessMessage('Login successful!');
    } catch (err) {
      console.error("Verify OTP failed:", err);
      setError(err.response?.data?.message || 'Failed to verify OTP. It might be incorrect or expired.');
    } finally {
      setLoading(false);
    }
  };

  const goBackToEmail = () => {
    setError(null);
    setSuccessMessage(null);
    setEmail('');
    setStage('enterEmail');
    emailForm.reset();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-cyan-100 dark:from-gray-900 dark:to-black p-4">
      <Card className="w-full max-w-md shadow-xl bg-white/80 dark:bg-default-50/80 backdrop-blur-sm">
        <CardHeader className="flex flex-col items-center pt-6">
          <Icon icon="mdi:cellphone-key" className="text-4xl text-secondary mb-3" />
          <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">Sign In with One-Time Code</h1>
          {stage === 'enterEmail' && <p className="text-sm text-gray-600 dark:text-gray-400 px-4 text-center mt-1">Enter your email to receive a login code.</p>}
          {stage === 'enterOtp' && <p className="text-sm text-gray-600 dark:text-gray-400 px-4 text-center mt-1">We sent a code to <span className="font-semibold">{email}</span>. Enter it below.</p>}
        </CardHeader>

        {stage === 'enterEmail' && (
          <form onSubmit={emailForm.handleSubmit(handleRequestOtp)}>
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
                {...emailForm.register('email')}
                label="Email Address"
                placeholder="Enter your registered email"
                variant="bordered"
                isInvalid={!!emailForm.formState.errors.email}
                errorMessage={emailForm.formState.errors.email?.message}
                startContent={<Icon icon="mdi:email-outline" className="text-xl text-default-400 pointer-events-none flex-shrink-0" />}
                isRequired
                isDisabled={loading}
              />
              <Button
                type="submit"
                color="secondary"
                fullWidth
                isLoading={loading}
                isDisabled={loading}
                className="font-semibold mt-2"
              >
                {loading ? 'Sending Code...' : 'Send Login Code'}
              </Button>
            </CardBody>
          </form>
        )}

        {stage === 'enterOtp' && (
          <form onSubmit={otpForm.handleSubmit(handleVerifyOtp)}>
            <CardBody className="gap-4 pb-4 items-center">
               {error && (
                <div className="bg-danger-100 border-l-4 border-danger-500 text-danger-700 p-3 rounded-md mb-2 w-full" role="alert">
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}
              {successMessage && !error && (
                 <div className="bg-success-100 border-l-4 border-success-500 text-success-700 p-3 rounded-md mb-2 w-full" role="alert">
                    <p className="text-sm font-medium">{successMessage}</p>
                 </div>
              )}

                {/* Use NextUI InputOTP if available, otherwise regular input */}
                 {/* Check NextUI docs for correct OTP component usage */}
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Enter the 6-digit code:</p>
                <Input
                    {...otpForm.register('otp')}
                    placeholder="------"
                    variant="bordered"
                    isInvalid={!!otpForm.formState.errors.otp}
                    errorMessage={otpForm.formState.errors.otp?.message}
                    maxLength={6}
                    inputMode="numeric"
                    className="max-w-[150px] text-center"
                    classNames={{
                        input: "text-center text-2xl tracking-[.5em]"
                    }}
                    isRequired
                    isDisabled={loading}
                 />

              <Button
                type="submit"
                color="primary"
                fullWidth
                isLoading={loading}
                isDisabled={loading}
                className="font-semibold mt-2"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>

               <Button
                    variant="light"
                    size="sm"
                    onPress={goBackToEmail}
                    isDisabled={loading}
                    className="text-sm mt-2"
                    startContent={<Icon icon="mdi:arrow-left" />}
                >
                    Use a different email
                </Button>

            </CardBody>
          </form>
        )}

        <CardFooter className="flex flex-col items-center pb-6">
           <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Prefer password?
              <Link size="sm" href="/auth/login" className="ml-1">
                Sign In with Password
              </Link>
            </p>
        </CardFooter>
      </Card>
    </div>
  );
} 