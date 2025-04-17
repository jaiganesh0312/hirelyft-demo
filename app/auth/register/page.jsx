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
  RadioGroup,
  Radio,
} from "@heroui/react";
import { Icon } from "@iconify/react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-cyan-100 dark:from-gray-900 dark:to-black p-4">
      <Card className="w-full max-w-md shadow-xl bg-white/80 dark:bg-default-50/80 backdrop-blur-sm">
        <CardHeader className="flex flex-col items-center pt-6">
          <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
            Create Your Account
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Join us and find your next opportunity or candidate.
          </p>
        </CardHeader>
        <form>
          <CardBody className="gap-4 pb-4">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              variant="bordered"
              startContent={
                <Icon
                  icon="mdi:account-outline"
                  className="text-xl text-default-400 pointer-events-none flex-shrink-0"
                />
              }
              isRequired
            />

            <Input
              label="Email Address"
              placeholder="Enter your email"
              type="email"
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
              label="Phone Number"
              placeholder="Enter your phone number (e.g., +1234567890)"
              type="tel"
              variant="bordered"
              startContent={
                <Icon
                  icon="mdi:phone-outline"
                  className="text-xl text-default-400 pointer-events-none flex-shrink-0"
                />
              }
              isRequired
            />

            <Input
              label="Password"
              placeholder="Create a strong password"
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

            <Input
              label="Confirm Password"
              placeholder="Re-enter your password"
              variant="bordered"
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
            />

            <RadioGroup
              label="Select your role"
              orientation="horizontal"
              defaultValue="jobseeker"
            >
              <Radio value="jobseeker">Job Seeker</Radio>
              <Radio value="employer">Employer</Radio>
            </RadioGroup>

            <Button
              type="button"
              color="primary"
              fullWidth
              className="font-semibold mt-2"
            >
              Create Account
            </Button>
          </CardBody>
          <CardFooter className="flex flex-col items-center pb-6">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?
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
