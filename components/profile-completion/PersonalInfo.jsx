"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import {
  Input,
  Textarea,
  Select,
  SelectItem,
  Button,
  Divider,
} from "@heroui/react";
import { personalInfoSchema } from "./validationSchemas";
import {
  createJobSeekerProfile,
  updateJobSeekerProfile,
} from "@/services/jobSeekerService";

const PersonalInfo = ({
  onNext,
  onSave,
  initialData,
  prevStep,
  currentStep,
  steps,
  showModal,
  nextStep,
  profileCompletion,
}) => {
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  if (initialData) {
    initialData.date_of_birth = initialData.date_of_birth.split("T")[0];
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: initialData || {},
  });

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser.");
      return;
    }

    setIsLoadingLocation(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setIsLoadingLocation(false);

        // Set the values in the form
        setValue("latitude", latitude);
        setValue("longitude", longitude);
      },
      (error) => {
        setIsLoadingLocation(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError("Location access denied by user.");
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            setLocationError("Location request timed out.");
            break;
          default:
            setLocationError("An unknown error occurred.");
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 100000,
        maximumAge: 0,
      }
    );
  };

  const fn = initialData ? updateJobSeekerProfile : createJobSeekerProfile;

  const onSubmit = async (data) => {
    try {
      const response = await fn(data);
      if (response.data.success) {
        onSave(data);
        nextStep();
        showModal("Success!", "Data saved successfully");
      }
    } catch (error) {
      console.error("Error saving personal info:", error);
      showModal(
        "Error!",
        error.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
        <div className="flex items-center gap-2 mb-2">
          <Icon icon="lucide:info" className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-blue-900 dark:text-blue-100">
            Professional Identity
          </h3>
        </div>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          Tell us about your professional background and career aspirations.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <Input
            label="Professional Headline"
            placeholder="e.g., Senior Software Engineer specializing in Full-Stack Development"
            variant="bordered"
            labelPlacement="outside"
            startContent={
              <Icon icon="lucide:briefcase" className="w-4 h-4 text-gray-400" />
            }
            classNames={{
              input: "text-sm",
              label: "font-medium text-gray-700 dark:text-gray-200",
            }}
            {...register("headline")}
            isInvalid={!!errors.headline}
            errorMessage={errors.headline?.message}
          />

          <Textarea
            label="Professional Summary"
            placeholder="Provide a compelling overview of your professional journey, key achievements, and career objectives..."
            variant="bordered"
            labelPlacement="outside"
            minRows={4}
            classNames={{
              input: "text-sm",
              label: "font-medium text-gray-700 dark:text-gray-200",
            }}
            {...register("summary")}
            isInvalid={!!errors.summary}
            errorMessage={errors.summary?.message}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Gender"
            placeholder="Select your gender"
            variant="bordered"
            labelPlacement="outside"
            startContent={
              <Icon icon="lucide:users" className="w-4 h-4 text-gray-400" />
            }
            isDisabled={!profileCompletion}
            classNames={{
              trigger: "h-12",
              label: "font-medium text-gray-700 dark:text-gray-200",
            }}
            {...register("gender")}
            isInvalid={!!errors.gender}
            errorMessage={errors.gender?.message}
          >
            <SelectItem
              key="male"
              value="male"
              startContent={<Icon icon="lucide:user" className="w-4 h-4" />}
            >
              Male
            </SelectItem>
            <SelectItem
              key="female"
              value="female"
              startContent={<Icon icon="lucide:user" className="w-4 h-4" />}
            >
              Female
            </SelectItem>
            <SelectItem
              key="other"
              value="other"
              startContent={<Icon icon="lucide:user" className="w-4 h-4" />}
            >
              Other
            </SelectItem>
          </Select>

          <Input
            type="date"
            label="Date of Birth"
            variant="bordered"
            labelPlacement="outside"
            startContent={
              <Icon icon="lucide:calendar" className="w-4 h-4 text-gray-400" />
            }
            isDisabled={!profileCompletion}
            classNames={{
              input: "text-sm",
              label: "font-medium text-gray-700 dark:text-gray-200",
            }}
            {...register("date_of_birth", { valueAsDate: true })}
            isInvalid={!!errors.date_of_birth}
            errorMessage={errors.date_of_birth?.message}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="number"
            label="Current Salary (Annual)"
            placeholder="e.g., 75000"
            variant="bordered"
            labelPlacement="outside"
            startContent={
              <Icon
                icon="lucide:dollar-sign"
                className="w-4 h-4 text-gray-400"
              />
            }
            classNames={{
              input: "text-sm",
              label: "font-medium text-gray-700 dark:text-gray-200",
            }}
            {...register("current_salary", { valueAsNumber: true })}
            isInvalid={!!errors.current_salary}
            errorMessage={errors.current_salary?.message}
          />

          <Input
            type="number"
            label="Expected Salary (Annual)"
            placeholder="e.g., 90000"
            variant="bordered"
            labelPlacement="outside"
            startContent={
              <Icon
                icon="lucide:trending-up"
                className="w-4 h-4 text-gray-400"
              />
            }
            classNames={{
              input: "text-sm",
              label: "font-medium text-gray-700 dark:text-gray-200",
            }}
            {...register("expected_salary", { valueAsNumber: true })}
            isInvalid={!!errors.expected_salary}
            errorMessage={errors.expected_salary?.message}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="number"
            label="Years of Experience"
            placeholder="e.g., 5"
            variant="bordered"
            labelPlacement="outside"
            startContent={
              <Icon icon="lucide:clock" className="w-4 h-4 text-gray-400" />
            }
            classNames={{
              input: "text-sm",
              label: "font-medium text-gray-700 dark:text-gray-200",
            }}
            {...register("experience_years", { valueAsNumber: true })}
            isInvalid={!!errors.experience_years}
            errorMessage={errors.experience_years?.message}
          />

          <Input
            type="number"
            label="Notice Period (days)"
            placeholder="e.g., 30"
            variant="bordered"
            labelPlacement="outside"
            startContent={
              <Icon icon="lucide:timer" className="w-4 h-4 text-gray-400" />
            }
            classNames={{
              input: "text-sm",
              label: "font-medium text-gray-700 dark:text-gray-200",
            }}
            {...register("notice_period", { valueAsNumber: true })}
            isInvalid={!!errors.notice_period}
            errorMessage={errors.notice_period?.message}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Availability Status"
            placeholder="Select your availability"
            variant="bordered"
            labelPlacement="outside"
            startContent={
              <Icon
                icon="lucide:check-circle"
                className="w-4 h-4 text-gray-400"
              />
            }
            classNames={{
              trigger: "h-12",
              label: "font-medium text-gray-700 dark:text-gray-200",
            }}
            {...register("availability_status")}
            isInvalid={!!errors.availability_status}
            errorMessage={errors.availability_status?.message}
          >
            <SelectItem
              key="Available"
              value="Available"
              startContent={
                <Icon icon="lucide:check" className="w-4 h-4 text-green-500" />
              }
            >
              Available
            </SelectItem>
            <SelectItem
              key="Not Available"
              value="Not Available"
              startContent={
                <Icon icon="lucide:x" className="w-4 h-4 text-red-500" />
              }
            >
              Not Available
            </SelectItem>
            <SelectItem
              key="Passive"
              value="Passive"
              startContent={
                <Icon icon="lucide:eye" className="w-4 h-4 text-yellow-500" />
              }
            >
              Passive
            </SelectItem>
          </Select>

          <Input
            label="Languages"
            placeholder="e.g., English, Spanish, French"
            variant="bordered"
            labelPlacement="outside"
            startContent={
              <Icon icon="lucide:languages" className="w-4 h-4 text-gray-400" />
            }
            classNames={{
              input: "text-sm",
              label: "font-medium text-gray-700 dark:text-gray-200",
            }}
            {...register("languages")}
            isInvalid={!!errors.languages}
            errorMessage={errors.languages?.message}
          />
        </div>

        {/* Geolocation Section */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 p-4 rounded-lg border border-green-100 dark:border-green-800">
          <div className="flex items-center gap-2 mb-3">
            <Icon icon="lucide:map-pin" className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-green-900 dark:text-green-100">
              Location Information
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="bordered"
              size="sm"
              onPress={handleGetLocation}
              disabled={location !== null || isLoadingLocation}
              startContent={
                isLoadingLocation ? (
                  <Icon
                    icon="lucide:loader-2"
                    className="w-4 h-4 animate-spin"
                  />
                ) : location ? (
                  <Icon
                    icon="lucide:check"
                    className="w-4 h-4 text-green-500"
                  />
                ) : (
                  <Icon icon="lucide:map-pin" className="w-4 h-4" />
                )
              }
              className={`${
                location
                  ? "border-green-200 bg-green-50 text-green-700 dark:border-green-700 dark:bg-green-950/30"
                  : "border-green-300 hover:border-green-400"
              }`}
            >
              {isLoadingLocation
                ? "Getting Location..."
                : location
                ? "Location Captured"
                : "Get Current Location"}
            </Button>

            {location && (
              <div className="text-sm text-green-700 dark:text-green-300">
                <span className="font-medium">Coordinates:</span>{" "}
                {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
              </div>
            )}
          </div>

          {locationError && (
            <div className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
              <Icon icon="lucide:alert-circle" className="w-4 h-4" />
              {locationError}
            </div>
          )}

          <p className="text-xs text-green-600 dark:text-green-400 mt-2">
            Your location will be used to show relevant job opportunities in
            your area.
          </p>
        </div>

        {/* Hidden inputs for latitude and longitude */}
        <input type="hidden" {...register("latitude")} />
        <input type="hidden" {...register("longitude")} />

        <Divider className="my-8" />

        {profileCompletion ? (
          <div className="flex justify-between items-center pt-6">
            <Button
              variant="bordered"
              onPress={prevStep}
              isDisabled={currentStep === 0}
              startContent={
                <Icon icon="lucide:chevron-left" className="w-4 h-4" />
              }
              className="min-w-[120px]"
            >
              Previous
            </Button>
            <div className="flex gap-3">
              {currentStep < steps.length - 1 && (
                <Button
                  color="default"
                  variant="flat"
                  onPress={nextStep}
                  endContent={
                    <Icon icon="lucide:skip-forward" className="w-4 h-4" />
                  }
                  className="min-w-[100px]"
                >
                  Skip
                </Button>
              )}

              <Button
                type="submit"
                color="primary"
                // isLoading={loading}
                className="min-w-[140px] bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
                endContent={
                  currentStep === steps.length - 1 ? (
                    <Icon icon="lucide:check-circle" className="w-4 h-4" />
                  ) : (
                    <Icon icon="lucide:save" className="w-4 h-4" />
                  )
                }
              >
                {/* {loading
                  ? "Saving..."
                  : currentStep === steps.length - 1
                  ? "Complete Profile"
                  : "Save & Continue"} */}
                {currentStep === steps.length - 1
                  ? "Complete Profile"
                  : "Save & Continue"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex justify-end">
            <Button
              type="submit"
              color="primary"
              className="min-w-[140px] bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
              endContent={<Icon icon="lucide:save" className="w-4 h-4" />}
            >
              Save
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default PersonalInfo;
