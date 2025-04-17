"use client";

import React, { useState } from "react";

import {
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Link,
  Divider,
  Checkbox,
} from "@heroui/react";
import { Icon } from "@iconify/react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-900 dark:to-black p-4">
      <Card className="w-full max-w-md shadow-xl bg-white/80 dark:bg-default-50/80 backdrop-blur-sm">
        <CardHeader className="flex flex-col items-center pt-6">
          <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
            Welcome Back!
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Sign in to your account
          </p>
        </CardHeader>
        <form>
          <CardBody className="gap-4 pb-4">
            <Input
              label="Email Address"
              placeholder="Enter your email"
              variant="bordered"
              startContent={
                <Icon
                  icon="mdi:email-outline"
                  className="text-xl text-default-400 pointer-events-none flex-shrink-0"
                />
              }
              isRequired
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              variant="bordered"
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
            />

            <div className="flex py-1 px-1 justify-between">
              <Checkbox size="sm">Remember me</Checkbox>
              <Link size="sm" href="/auth/forgot-password" isDisabled={true}>
                Forgot password?
              </Link>
            </div>

            <Button
              type="button"
              color="primary"
              fullWidth
              className="font-semibold"
            >
              Sign In
            </Button>

            <Divider className="my-2" />

            {/* Link to OTP Login Page */}
            <div className="text-center">
              <Button
                variant="light"
                color="secondary"
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
              <Link size="sm" href="/auth/register" className="ml-1">
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
