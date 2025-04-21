"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Link,
  Spinner,
  InputOtp,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { resendOtp, verifyEmail } from "@/services/authService";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/context/AuthContext";

// Validation Schema for OTP input
const otpSchema = z.object({
  otp: z
    .string()
    .min(6, { message: "Verification code must be 6 digits" })
    .max(6, { message: "Verification code must be 6 digits" })
    .regex(/^\d{6}$/, {
      message: "Verification code must contain only digits",
    }),
});

function VerifyEmailNoticeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setUser } = useAuth();
  const email = searchParams.get("email");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Configure react-hook-form for OTP
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  // Redirect if email is missing (shouldn't happen in normal flow)
  useEffect(() => {
    if (!email) {
      console.warn("Email parameter missing, redirecting to register.");
      router.replace("/auth/register");
    }
  }, [email, router]);

  const handleResendOtp = async () => {
    setError(null);
    setSuccessMessage(null);
    setLoading(true);
    try {
      const response = await resendOtp({ email });
      setSuccessMessage(
        response.data.message || "Verification email resent successfully!"
      );
    } catch (err) {
      console.error("Resend OTP failed:", err);
      setError(
        err.response?.data?.message ||
          "Failed to resend verification email. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (data) => {
    setError(null);
    setSuccessMessage(null);
    setLoading(true);
    try {
      const response = await verifyEmail({ email, otp: data.otp });
      setSuccessMessage(
        response.data.message || "Email verified successfully!"
      );
      const { token, refreshToken, user: userData } = response.data;

      // Manually set auth state since verifyOtpLogin provides tokens/user directly
      localStorage.setItem('authToken', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Update the AuthContext state
      setUser(userData);

      // Redirect to home page after a brief delay to show success message
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (err) {
      console.error("Verify OTP failed:", err);
      setError(
        err.response?.data?.message ||
          "Failed to verify email. The code might be incorrect or expired."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    // Show spinner or message while redirecting
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner label="Loading..." />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-black p-4">
      <Card className="w-full max-w-md shadow-xl bg-white/90 dark:bg-default-50/90 backdrop-blur-sm text-center">
        <CardHeader className="flex flex-col items-center pt-8">
          <Icon
            icon="mdi:email-check-outline"
            className="text-6xl text-success mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Verify Your Email
          </h1>
        </CardHeader>
        <CardBody className="gap-4 pb-4 px-6">
          <p className="text-gray-600 dark:text-gray-400">
            We've sent a verification code to{" "}
            <span className="font-semibold text-primary">{email}</span>.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Please enter the 6-digit code below or check your email inbox for
            the verification link.
          </p>

          {error && (
            <div
              className="bg-danger-100 border-l-4 border-danger-500 text-danger-700 p-3 rounded-md mt-2 text-left"
              role="alert"
            >
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}
          {successMessage && (
            <div
              className="bg-success-100 border-l-4 border-success-500 text-success-700 p-3 rounded-md mt-2 text-left"
              role="alert"
            >
              <p className="text-sm font-medium">{successMessage}</p>
            </div>
          )}

          {/* OTP Input Section */}

          <form
            onSubmit={handleSubmit(handleVerifyOtp)}
            className="mt-4 space-y-4"
          >
            <div className="flex flex-col items-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Enter the 6-digit verification code:
              </p>
              <InputOtp
                {...register("otp")}
                placeholder="······"
                variant="bordered"
                isInvalid={!!errors.otp}
                errorMessage={errors.otp?.message}
                length={6}
                isRequired
                isDisabled={loading}
                classNames={{
                  base: "max-w-full",
                  input: "bg-content2 dark:bg-content1",
                }}
              />
              {errors.otp && (
                <p className="text-danger text-xs mt-1">{errors.otp.message}</p>
              )}
            </div>

            <Button
              type="submit"
              color="primary"
              fullWidth
              isLoading={loading}
              isDisabled={loading}
              className="mt-4 font-semibold"
              startContent={!loading && <Icon icon="mdi:check-circle" />}
            >
              {loading ? "Verifying..." : "Verify Email"}
            </Button>
          </form>

          <Button
            color="primary"
            variant="ghost"
            fullWidth
            onPress={handleResendOtp}
            isLoading={loading}
            isDisabled={loading}
            className="mt-4 font-semibold"
            startContent={!loading && <Icon icon="mdi:email-sync-outline" />}
          >
            {loading ? "Resending Code..." : "Resend Verification Code"}
          </Button>
        </CardBody>
        <CardFooter className="flex flex-col items-center pb-8">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Already verified your email?
            <Link size="sm" href="/auth/login" className="ml-1">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

// Wrap with Suspense because useSearchParams() needs it
export default function VerifyEmailNoticePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Spinner label="Loading..." />
        </div>
      }
    >
      <VerifyEmailNoticeContent />
    </Suspense>
  );
}
