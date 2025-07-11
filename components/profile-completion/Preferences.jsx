"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import {
  Input,
  Select,
  SelectItem,
  Button,
  Checkbox,
  Divider,
} from "@heroui/react";
import { preferencesSchema } from "./validationSchemas";
import { updateJobSeekerProfile } from "@/services/jobSeekerService";

const Preferences = ({
  onNext,
  onSave,
  initialData,
  prevStep,
  currentStep,
  steps,
  showModal,
  nextStep,
  profileCompletion = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(preferencesSchema),
    defaultValues: initialData || {},
  });

  const onSubmit = async (data) => {
    try {
      const response = await updateJobSeekerProfile(data);
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
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 p-4 rounded-lg border border-purple-100 dark:border-purple-800">
        <div className="flex items-center gap-2 mb-2">
          <Icon icon="lucide:heart" className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-purple-900 dark:text-purple-100">
            Job Preferences
          </h3>
        </div>
        <p className="text-sm text-purple-700 dark:text-purple-300">
          Define your ideal job characteristics and work environment.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Preferred Job Position"
            placeholder="e.g., Senior Full Stack Developer"
            variant="bordered"
            labelPlacement="outside"
            startContent={
              <Icon icon="lucide:target" className="w-4 h-4 text-gray-400" />
            }
            classNames={{
              input: "text-sm",
              label: "font-medium text-gray-700 dark:text-gray-200",
            }}
            {...register("preferredJobPost")}
            isInvalid={!!errors.preferredJobPost}
            errorMessage={errors.preferredJobPost?.message}
          />

          <Select
            label="Preferred Job Type"
            placeholder="Select job type"
            variant="bordered"
            labelPlacement="outside"
            startContent={
              <Icon icon="lucide:briefcase" className="w-4 h-4 text-gray-400" />
            }
            classNames={{
              trigger: "h-12",
              label: "font-medium text-gray-700 dark:text-gray-200",
            }}
            {...register("preferredJobType")}
            isInvalid={!!errors.preferredJobType}
            errorMessage={errors.preferredJobType?.message}
          >
            <SelectItem key="Full-time" value="Full-time">
              Full-time
            </SelectItem>
            <SelectItem key="Part-time" value="Part-time">
              Part-time
            </SelectItem>
            <SelectItem key="Contract" value="Contract">
              Contract
            </SelectItem>
            <SelectItem key="Freelance" value="Freelance">
              Freelance
            </SelectItem>
            <SelectItem key="Internship" value="Internship">
              Internship
            </SelectItem>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Preferred Location"
            placeholder="e.g., New York, Remote, Hybrid"
            variant="bordered"
            labelPlacement="outside"
            startContent={
              <Icon icon="lucide:map-pin" className="w-4 h-4 text-gray-400" />
            }
            classNames={{
              input: "text-sm",
              label: "font-medium text-gray-700 dark:text-gray-200",
            }}
            {...register("preferredLocation")}
            isInvalid={!!errors.preferredLocation}
            errorMessage={errors.preferredLocation?.message}
          />

          <Input
            label="Industry Interest"
            placeholder="e.g., Technology, Healthcare, Finance"
            variant="bordered"
            labelPlacement="outside"
            startContent={
              <Icon icon="lucide:building" className="w-4 h-4 text-gray-400" />
            }
            classNames={{
              input: "text-sm",
              label: "font-medium text-gray-700 dark:text-gray-200",
            }}
            {...register("industryInterest")}
            isInvalid={!!errors.industryInterest}
            errorMessage={errors.industryInterest?.message}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Working Hours Preference"
            placeholder="Select working hours"
            variant="bordered"
            labelPlacement="outside"
            startContent={
              <Icon icon="lucide:clock" className="w-4 h-4 text-gray-400" />
            }
            classNames={{
              trigger: "h-12",
              label: "font-medium text-gray-700 dark:text-gray-200",
            }}
            {...register("workingHoursPreference")}
            isInvalid={!!errors.workingHoursPreference}
            errorMessage={errors.workingHoursPreference?.message}
          >
            <SelectItem key="Day shift" value="Day shift">
              Day shift
            </SelectItem>
            <SelectItem key="Night shift" value="Night shift">
              Night shift
            </SelectItem>
            <SelectItem key="Flexible" value="Flexible">
              Flexible
            </SelectItem>
          </Select>

          <Select
            label="Preferred Company Size"
            placeholder="Select company size"
            variant="bordered"
            labelPlacement="outside"
            startContent={
              <Icon icon="lucide:users" className="w-4 h-4 text-gray-400" />
            }
            classNames={{
              trigger: "h-12",
              label: "font-medium text-gray-700 dark:text-gray-200",
            }}
            {...register("preferredCompanySize")}
            isInvalid={!!errors.preferredCompanySize}
            errorMessage={errors.preferredCompanySize?.message}
          >
            <SelectItem key="1-10" value="1-10">
              Startup (1-10)
            </SelectItem>
            <SelectItem key="11-50" value="11-50">
              Small (11-50)
            </SelectItem>
            <SelectItem key="51-100" value="51-100">
              Medium (51-100)
            </SelectItem>
            <SelectItem key="101-500" value="101-500">
              Large (101-500)
            </SelectItem>
            <SelectItem key="501-1000" value="501-1000">
              Enterprise (501-1000)
            </SelectItem>
            <SelectItem key="1001+" value="1001+">
              Corporation (1001+)
            </SelectItem>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Employment Mode"
            placeholder="Select employment mode"
            variant="bordered"
            labelPlacement="outside"
            startContent={
              <Icon icon="lucide:home" className="w-4 h-4 text-gray-400" />
            }
            classNames={{
              trigger: "h-12",
              label: "font-medium text-gray-700 dark:text-gray-200",
            }}
            {...register("employmentMode")}
            isInvalid={!!errors.employmentMode}
            errorMessage={errors.employmentMode?.message}
          >
            <SelectItem key="Hybrid" value="Hybrid">
              Hybrid
            </SelectItem>
            <SelectItem key="On-site" value="On-site">
              On-site
            </SelectItem>
            <SelectItem key="Remote" value="Remote">
              Remote
            </SelectItem>
          </Select>

          <div className="flex items-end h-12">
            <Checkbox
              {...register("willingToRelocate")}
              classNames={{
                label: "text-sm font-medium text-gray-700 dark:text-gray-200",
              }}
            >
              <div className="flex items-center gap-2">
                <Icon icon="lucide:move" className="w-4 h-4" />
                Willing to relocate
              </div>
            </Checkbox>
          </div>
        </div>

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

export default Preferences;
