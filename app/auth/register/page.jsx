'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, Input, Card, CardHeader, CardBody, CardFooter, Link, Divider, RadioGroup, Radio } from "@heroui/react";
import { Icon } from '@iconify/react';
import { registerUser } from '@/services/authService';
import { useRouter } from 'next/navigation';

// Validation Schema
const registerSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone_number: z.string().min(10, { message: 'Phone number must be at least 10 digits' }).regex(/^\+?[1-9]\d{1,14}$/, { message: 'Invalid phone number format' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  confirmPassword: z.string(),
  role: z.enum(['jobseeker', 'employer'], { required_error: 'Please select a role' }),
  company_name: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // path of error
}).refine((data) => data.role !== 'employer' || (data.role === 'employer' && data.company_name && data.company_name.length > 0), {
    message: "Company name is required for employers",
    path: ["company_name"],
});

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone_number: '',
      password: '',
      confirmPassword: '',
      role: 'jobseeker', // Default role
      company_name: '',
    },
  });

  const selectedRole = watch('role');
  console.log(selectedRole);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const onSubmit = async (data) => {
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    const registrationData = {
        name: data.name,
        email: data.email,
        phone_number: data.phone_number,
        password: data.password,
        confirmPassword: data.confirmPassword,
        role: data.role,
        company_name: data.role === 'employer' ? data.company_name : undefined,
    };

    try {
      const response = await registerUser(registrationData);
      setSuccessMessage(response.data.message || 'Registration successful! Please check your email to verify your account.');
      reset(); // Clear form
      // Redirect to a page indicating email verification is needed
      router.push(`/auth/verify-email?email=${encodeURIComponent(data.email)}`);
    } catch (err) {
      console.error("Registration failed:", err);
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-cyan-100 dark:from-gray-900 dark:to-black p-4">
      <Card className="w-full max-w-md shadow-xl bg-white/80 dark:bg-default-50/80 backdrop-blur-sm">
        <CardHeader className="flex flex-col items-center pt-6">
          <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">Create Your Account</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Join us and find your next opportunity or candidate.</p>
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
              {...register('name')}
              label="Full Name"
              placeholder="Enter your full name"
              variant="bordered"
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
              startContent={<Icon icon="mdi:account-outline" className="text-xl text-default-400 pointer-events-none flex-shrink-0" />}
              isRequired
              isDisabled={loading}
            />

            <Input
              {...register('email')}
              label="Email Address"
              placeholder="Enter your email"
              type="email"
              variant="bordered"
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
              startContent={<Icon icon="mdi:email-outline" className="text-xl text-default-400 pointer-events-none flex-shrink-0" />}
              isRequired
              isDisabled={loading}
            />

            <Input
              {...register('phone_number')}
              label="Phone Number"
              placeholder="Enter your phone number (e.g., +1234567890)"
              type="tel"
              variant="bordered"
              isInvalid={!!errors.phone_number}
              errorMessage={errors.phone_number?.message}
              startContent={<Icon icon="mdi:phone-outline" className="text-xl text-default-400 pointer-events-none flex-shrink-0" />}
              isRequired
              isDisabled={loading}
            />

            <Input
              {...register('password')}
              label="Password"
              placeholder="Create a strong password"
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

            <Input
              {...register('confirmPassword')}
              label="Confirm Password"
              placeholder="Re-enter your password"
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
            />

            <RadioGroup
              label="Select your role"
              orientation="horizontal"
              defaultValue="jobseeker"
              {...register('role')}
              isInvalid={!!errors.role}
              errorMessage={errors.role?.message}
              isDisabled={loading}
            >
              <Radio value="jobseeker" {...register('role')}>Job Seeker</Radio>
              <Radio value="employer" {...register('role')}>Employer</Radio>
            </RadioGroup>

            {selectedRole === 'employer' && (
                 <Input
                    {...register('company_name')}
                    label="Company Name"
                    placeholder="Enter your company name"
                    variant="bordered"
                    isInvalid={!!errors.company_name}
                    errorMessage={errors.company_name?.message}
                    startContent={<Icon icon="mdi:domain" className="text-xl text-default-400 pointer-events-none flex-shrink-0" />}
                    isRequired
                    isDisabled={loading}
                />
            )}

            <Button
              type="submit"
              color="primary"
              fullWidth
              isLoading={loading}
              isDisabled={loading}
              className="font-semibold mt-2"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>

          </CardBody>
          <CardFooter className="flex flex-col items-center pb-6">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?
              <Link size="sm" href="/auth/login" className="ml-1" isDisabled={loading}>
                Sign In
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
} 