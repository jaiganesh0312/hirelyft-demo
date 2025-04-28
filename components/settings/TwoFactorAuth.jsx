"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Button,
  Spinner,
  Image,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  InputOtp,
  Chip,
  Snippet,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { initialize2FA, enable2FA, disable2FA } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";

// Validation Schema for TOTP token input
const totpSchema = z.object({
  token: z
    .string()
    .min(6, { message: "Code must be 6 digits" })
    .max(6, { message: "Code must be 6 digits" })
    .regex(/^\d{6}$/, { message: "Code must contain only digits" }),
});

export default function TwoFactorAuth() {
  const { user, checkAuthLoading, isAuthenticated, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [setupSecret, setSetupSecret] = useState(null);
  const [setupStage, setSetupStage] = useState(false);
  const [is2FAEnabledState, setIs2FAEnabledState] = useState(
    user?.is2FAEnabled || false
  );

  const {
    isOpen: isDisableModalOpen,
    onOpen: onDisableModalOpen,
    onClose: onDisableModalClose,
  } = useDisclosure();

  // Sync local 2FA status with auth context user data
  useEffect(() => {
    if (user) {
      setIs2FAEnabledState(user.is2FAEnabled);
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(totpSchema),
    defaultValues: { token: "" },
  });

  const handleInitialize2FA = async () => {
    setError(null);
    setSuccessMessage(null);
    setQrCodeUrl(null);
    setLoading(true);
    try {
      const response = await initialize2FA();
      setQrCodeUrl(response.data.qrCode);
      setSetupSecret(response.data.secret);
      setSetupStage(true);
      reset();
    } catch (err) {
      console.error("Initialize 2FA failed:", err);
      setError(
        err.response?.data?.message ||
          "Failed to start 2FA setup. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEnable2FA = async (data) => {
    setError(null);
    setSuccessMessage(null);
    setLoading(true);
    try {
      const response = await enable2FA({ token: data.token });
      setSetupStage(false);
      setQrCodeUrl(null);
      setSetupSecret(null);
      if (user) {
        const updatedUser = { ...user, is2FAEnabled: true };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
      setIs2FAEnabledState(true);
      setSuccessMessage(response.data.message || "2FA enabled successfully!");
    } catch (err) {
      console.error("Enable 2FA failed:", err);
      setError(
        err.response?.data?.message ||
          "Failed to enable 2FA. The code might be incorrect or expired."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDisable2FA = async (data) => {
    setError(null);
    setSuccessMessage(null);
    setLoading(true);
    try {
      const response = await disable2FA({ token: data.token });
      if (user) {
        const updatedUser = { ...user, is2FAEnabled: false };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
      setSuccessMessage(response.data.message || "2FA disabled successfully!");
      setIs2FAEnabledState(false);
    } catch (err) {
      console.error("Disable 2FA failed:", err);
      setError(
        err.response?.data?.message ||
          "Failed to disable 2FA. Please try again."
      );
    } finally {
      setLoading(false);
      onDisableModalClose();
    }
  };

  const cancelSetup = () => {
    setSetupStage(false);
    setQrCodeUrl(null);
    setSetupSecret(null);
    setError(null);
    reset();
  };

  if (checkAuthLoading || !isAuthenticated) {
    return <Spinner label="Loading 2FA status..." className="mx-auto" />;
  }

  return (
    <div className="space-y-4">
      {error && (
        <div
          className="bg-danger-100 border-l-4 border-danger-500 text-danger-700 p-3 rounded-md animate-fadeIn"
          role="alert"
        >
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}
      {successMessage && (
        <div
          className="bg-success-100 border-l-4 border-success-500 text-success-700 p-3 rounded-md animate-fadeIn"
          role="alert"
        >
          <p className="text-sm font-medium">{successMessage}</p>
        </div>
      )}

      {!is2FAEnabledState && !setupStage && (
        <div className="space-y-4">
          <Card className="border border-default-200 dark:border-default-100">
            <CardBody>
              <div className="flex gap-3 items-start">
                <div className="bg-primary-100 dark:bg-primary-900/30 p-2 rounded-full">
                  <Icon
                    icon="mdi:shield-key-outline"
                    className="text-2xl text-primary-500"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold dark:text-white">
                    Two-Factor Authentication
                  </h3>
                  <p className="text-sm text-default-600 dark:text-default-400">
                    Add an extra layer of security to your account by requiring
                    both a password and a verification code.
                  </p>
                </div>
              </div>
            </CardBody>
            <CardFooter className="border-t border-default-200 dark:border-default-100 bg-default-50 dark:bg-default-100/20">
              <Button
                color="primary"
                onPress={handleInitialize2FA}
                isLoading={loading}
                isDisabled={loading}
                startContent={<Icon icon="mdi:shield-key-outline" />}
                className="shadow-sm hover:shadow-md transition-all"
              >
                Set Up 2FA
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-warning-50 dark:bg-warning-900/10 border border-warning-200 dark:border-warning-900/30">
            <CardBody className="flex gap-3 p-3 flex-row">
              <Icon
                icon="mdi:information-outline"
                className="text-xl text-warning-600"
              />
              <p className="text-sm text-warning-700 dark:text-warning-400">
                With 2FA enabled, you&rsquo;ll need your phone or other device
                to sign in. Make sure to keep backup codes in a safe place.
              </p>
            </CardBody>
          </Card>
        </div>
      )}

      {setupStage && qrCodeUrl && (
        <div className="space-y-4">
          <Card className="border border-default-200 dark:border-default-100 overflow-hidden">
            <CardHeader className="bg-default-50 dark:bg-default-100/20 border-b border-default-200 dark:border-default-100">
              <h3 className="text-lg font-semibold">
                Set Up Two-Factor Authentication
              </h3>
            </CardHeader>
            <CardBody className="p-5 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Chip color="primary" variant="flat">
                    Step 1
                  </Chip>
                  <h4 className="font-medium dark:text-white">
                    Install an authenticator app
                  </h4>
                </div>
                <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                  <Card className="w-24 p-2 bg-default-50 dark:bg-default-100/10 border border-default-200 dark:border-default-100">
                    <CardBody className="p-0 items-center text-center">
                      <Image
                        src="/google-authenticator-logo.png"
                        width={40}
                        height={40}
                        className="mx-auto"
                        alt="Google Authenticator"
                      />
                      <p className="text-xs mt-2">Google Authenticator</p>
                    </CardBody>
                  </Card>
                  <Card className="w-24 p-2 bg-default-50 dark:bg-default-100/10 border border-default-200 dark:border-default-100">
                    <CardBody className="p-0 items-center text-center">
                      <Image
                        src="/authy-logo.png"
                        width={40}
                        height={40}
                        className="mx-auto"
                        alt="Authy"
                      />
                      <p className="text-xs mt-2">Authy</p>
                    </CardBody>
                  </Card>
                  <Card className="w-24 p-2 bg-default-50 dark:bg-default-100/10 border border-default-200 dark:border-default-100">
                    <CardBody className="p-0 items-center text-center">
                      <Image
                        src="/microsoft-authenticator-logo.png"
                        width={40}
                        height={40}
                        className="mx-auto"
                        alt="Microsoft Authenticator"
                      />
                      <p className="text-xs mt-2">Microsoft Authenticator</p>
                    </CardBody>
                  </Card>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Chip color="primary" variant="flat">
                    Step 2
                  </Chip>
                  <h4 className="font-medium dark:text-white">
                    Scan the QR code with your app
                  </h4>
                </div>
                <div className="flex flex-col lg:flex-row justify-center lg:justify-normal gap-2  items-center bg-white p-6 rounded-lg shadow-sm border border-default-200">
                  <div className="mb-4 sm:mb-0 min-w-[33%]">
                    <Image
                      src={qrCodeUrl}
                      width={180}
                      height={180}
                      alt="2FA QR Code"
                      className="rounded-md"
                    />
                  </div>
                  {setupSecret && (
                    <div className="flex flex-col w-full">
                      <p className="text-sm text-default-600 mb-2 w-full">
                        If you can&rsquo;t scan the QR code, enter this code manually,
                        make sure you do not share it with anyone:
                      </p>
                      <Snippet color="primary" codeString={setupSecret}>
                        2FA secret
                      </Snippet>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Chip color="primary" variant="flat">
                    Step 3
                  </Chip>
                  <h4 className="font-medium dark:text-white">
                    Enter the 6-digit verification code
                  </h4>
                </div>
                <form
                  onSubmit={handleSubmit(handleEnable2FA)}
                  className="space-y-4"
                >
                  <div>
                    <InputOtp
                      {...register("token")}
                      variant="bordered"
                      isInvalid={!!errors.token}
                      errorMessage={errors.token?.message}
                      length={6}
                      isRequired
                      isDisabled={loading}
                      classNames={{
                        base: "max-w-full",
                        input: "bg-content2 dark:bg-content1",
                      }}
                      className="lg:ml-6"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="submit"
                      color="success"
                      isLoading={loading}
                      isDisabled={loading}
                      startContent={
                        !loading && <Icon icon="mdi:check-circle-outline" />
                      }
                      className="flex-1 sm:flex-initial shadow-sm"
                    >
                      Verify & Enable
                    </Button>
                    <Button
                      variant="flat"
                      color="default"
                      onPress={cancelSetup}
                      isDisabled={loading}
                      className="flex-1 sm:flex-initial"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {is2FAEnabledState && !setupStage && (
        <div className="space-y-4">
          <Card className="border border-success-200 dark:border-success-800 bg-success-50 dark:bg-success-900/10">
            <CardBody>
              <div className="flex gap-3 items-start">
                <div className="bg-success-100 dark:bg-success-900/30 p-2 rounded-full">
                  <Icon
                    icon="mdi:shield-check"
                    className="text-2xl text-success-600"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold dark:text-white">
                      Two-Factor Authentication Enabled
                    </h3>
                    <Chip color="success" size="sm">
                      Active
                    </Chip>
                  </div>
                  <p className="text-sm text-default-600 dark:text-default-400 mt-1">
                    Your account is protected with two-factor authentication.
                    You&rsquo;ll need to enter a verification code when signing
                    in.
                  </p>
                </div>
              </div>
            </CardBody>
            <CardFooter className="border-t border-success-200 dark:border-success-800 bg-success-50/50 dark:bg-success-900/5">
              <Button
                color="danger"
                variant="flat"
                onPress={onDisableModalOpen}
                isLoading={loading}
                isDisabled={loading}
                startContent={<Icon icon="mdi:shield-off-outline" />}
              >
                Disable 2FA
              </Button>
            </CardFooter>
          </Card>

          <Card className="border border-default-200 dark:border-default-100">
            <CardBody className="p-4">
              <h4 className="text-md font-medium mb-2 dark:text-white">
                Recovery Options
              </h4>
              <p className="text-sm text-default-600 dark:text-default-400 mb-3">
                If you lose access to your authenticator app, you can use
                recovery codes to sign in.
              </p>
              <Button
                color="primary"
                variant="flat"
                startContent={<Icon icon="mdi:key-chain" />}
                className="w-full sm:w-auto"
              >
                View Recovery Codes
              </Button>
            </CardBody>
          </Card>

          <Modal
            isOpen={isDisableModalOpen}
            onClose={onDisableModalClose}
            backdrop="blur"
          >
            <ModalContent>
              {(onClose) => (
                <form onSubmit={handleSubmit(handleDisable2FA)}>
                  <ModalHeader className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <Icon
                        icon="mdi:alert-circle"
                        className="text-xl text-danger"
                      />
                      <span>Disable Two-Factor Authentication</span>
                    </div>
                  </ModalHeader>
                  <ModalBody>
                    <p>
                      This will remove the additional security from your
                      account. Are you sure you want to disable Two-Factor
                      Authentication?
                    </p>
                    <Card className="bg-warning-50 dark:bg-warning-900/10 border border-warning-200 dark:border-warning-900/30 mt-2">
                      <CardBody className="p-3">
                        <p className="text-sm text-warning-700 dark:text-warning-400">
                          Without 2FA, your account will be more vulnerable to
                          unauthorized access.
                        </p>
                        <h4 className="font-medium dark:text-white">
                          Enter the 6-digit verification code
                        </h4>
                        <div>
                          <InputOtp
                            {...register("token")}
                            variant="bordered"
                            isInvalid={!!errors.token}
                            errorMessage={errors.token?.message}
                            length={6}
                            isRequired
                            isDisabled={loading}
                            classNames={{
                              base: "max-w-full",
                            }}
                            autoFocus
                          />
                        </div>
                      </CardBody>
                    </Card>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      type="button"
                      color="default"
                      variant="light"
                      onPress={onClose}
                      isDisabled={loading}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      color="danger"
                      isLoading={loading}
                      isDisabled={loading}
                      startContent={<Icon icon="mdi:shield-off-outline" />}
                    >
                      Disable 2FA
                    </Button>
                  </ModalFooter>
                </form>
              )}
            </ModalContent>
          </Modal>
        </div>
      )}
    </div>
  );
}
