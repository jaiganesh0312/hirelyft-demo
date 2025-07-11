"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Spinner,
  addToast
} from "@heroui/react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { resetPassword } from "@/services/authService";

// Validation Schema
const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  });

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if(!token){
    router.replace("/auth/forgot-password");
    return <Spinner label="Loading..." />
  }

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Check for token on mount
  useEffect(() => {
    if (!token) {
      setError("Invalid or missing password reset token.");
      // Optionally redirect after a delay
      // setTimeout(() => router.replace('/forgot-password'), 5000);
    }
  }, [token, router]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const onSubmit = async (data) => {
    if (!token) {
      setError("Invalid or missing password reset token. Cannot submit.");
      return;
    }
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      // The backend expects { token, password, confirmPassword }
      const response = await resetPassword({
        token,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      setSuccessMessage(
        response.data.message || "Password has been reset successfully!"
      );
      reset(); // Clear form
      addToast({
        title: "Success!",
        description: "Password reset successfull",
        color: "success",
      });
      setTimeout(() => router.replace("/auth/login"), 3000);
    } catch (err) {
      console.error("Reset password failed:", err);
      addToast({
        title: "Error!",
        description: "Failed to reset password!",
        color: "success",
      });
      setError(
        err.response?.data?.message ||
          "Failed to reset password. The token might be invalid or expired."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-black p-4">
      <Card className="w-full max-w-md shadow-xl bg-white/90 dark:bg-default-50/90 backdrop-blur-sm">
        <CardHeader className="flex flex-col items-center pt-6">
          <Icon icon="mdi:lock-reset" className="text-4xl text-primary mb-3" />
          <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
            Reset Your Password
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 px-4 text-center mt-1">
            Enter your new password below.
          </p>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardBody className="gap-4 pb-4">
            {error && (
              <div
                className="bg-danger-100 border-l-4 border-danger-500 text-danger-700 p-3 rounded-md mb-2"
                role="alert"
              >
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}
            {successMessage && (
              <div
                className="bg-success-100 border-l-4 border-success-500 text-success-700 p-3 rounded-md mb-2"
                role="alert"
              >
                <p className="text-sm font-medium">{successMessage}</p>
                <p className="text-xs">Redirecting to login...</p>
              </div>
            )}

            <Input
              {...register("password")}
              label="New Password"
              placeholder="Enter your new password"
              variant="bordered"
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
              startContent={
                <Icon
                  icon="mdi:lock-outline"
                  className="text-xl text-default-400 pointer-events-none flex-shrink-0"
                />
              }
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <Icon
                      icon="mdi:eye-off-outline"
                      className="text-2xl text-default-400 pointer-events-none"
                    />
                  ) : (
                    <Icon
                      icon="mdi:eye-outline"
                      className="text-2xl text-default-400 pointer-events-none"
                    />
                  )}
                </button>
              }
              type={showPassword ? "text" : "password"}
              isRequired
              isDisabled={loading || !!successMessage || !token} // Disable if loading, success, or no token
            />

            <Input
              {...register("confirmPassword")}
              label="Confirm New Password"
              placeholder="Re-enter your new password"
              variant="bordered"
              isInvalid={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword?.message}
              startContent={
                <Icon
                  icon="mdi:lock-check-outline"
                  className="text-xl text-default-400 pointer-events-none flex-shrink-0"
                />
              }
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <Icon
                      icon="mdi:eye-off-outline"
                      className="text-2xl text-default-400 pointer-events-none"
                    />
                  ) : (
                    <Icon
                      icon="mdi:eye-outline"
                      className="text-2xl text-default-400 pointer-events-none"
                    />
                  )}
                </button>
              }
              type={showConfirmPassword ? "text" : "password"}
              isRequired
              isDisabled={loading || !!successMessage || !token} // Disable if loading, success, or no token
            />

            <Button
              type="submit"
              color="primary"
              fullWidth
              isLoading={loading}
              isDisabled={loading || !token || !!successMessage} // Disable if loading, success, no token, or general error (but not validation errors)
              className="font-semibold mt-2"
            >
              {loading ? "Resetting Password..." : "Reset Password"}
            </Button>
          </CardBody>
          <CardFooter className="flex flex-col items-center pb-6">
            {successMessage ? (
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Password reset successful!{" "}
                <Link size="sm" href="/auth/login">
                  Sign In
                </Link>
              </p>
            ) : (
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Need help?{" "}
                <Link size="sm" href="/auth/forgot-password">
                  Request a new link
                </Link>
              </p>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

// Wrap with Suspense because useSearchParams() needs it
export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Spinner label="Loading..." />
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
