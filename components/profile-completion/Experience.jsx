"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import {
  Input,
  Textarea,
  Select,
  SelectItem,
  Button,
  Checkbox,
  Divider,
} from "@heroui/react";
import { experienceSchema } from "./validationSchemas";
import { createExperience, updateExperience } from "@/services/jobSeekerService";

const Experience = ({
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
  if (initialData) {
    if (initialData.startDate) {
      initialData.startDate = new Date(initialData.startDate)
        .toISOString()
        .split("T")[0];
    }
    if (initialData.endDate) {
      initialData.endDate = new Date(initialData.endDate)
        .toISOString()
        .split("T")[0];
    }
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(experienceSchema),
    defaultValues: initialData || {},
  });

  const watchCurrentJob = watch("isCurrentJob");

  const onSubmit = async (data) => {
    try {
      const response = initialData ? await updateExperience(initialData.id, data) : createExperience(data);
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
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 p-4 rounded-lg border border-green-100 dark:border-green-800">
        <div className="flex items-center gap-2 mb-2">
          <Icon icon="lucide:briefcase" className="w-5 h-5 text-green-600" />
          <h3 className="font-semibold text-green-900 dark:text-green-100">
            Professional Experience
          </h3>
        </div>
        <p className="text-sm text-green-700 dark:text-green-300">
          Share details about your current or most recent professional
          experience.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Company Name"
            placeholder="e.g., Google Inc."
            variant="bordered"
            labelPlacement="outside"
            startContent={
              <Icon
                icon="lucide:building-2"
                className="w-4 h-4 text-gray-400"
              />
            }
            classNames={{
              input: "text-sm",
              label: "font-medium text-gray-700 dark:text-gray-200",
            }}
            {...register("companyName")}
            isInvalid={!!errors.companyName}
            errorMessage={errors.companyName?.message}
          />

          <Input
            label="Job Title"
            placeholder="e.g., Senior Software Engineer"
            variant="bordered"
            labelPlacement="outside"
            startContent={
              <Icon
                icon="lucide:user-check"
                className="w-4 h-4 text-gray-400"
              />
            }
            classNames={{
              input: "text-sm",
              label: "font-medium text-gray-700 dark:text-gray-200",
            }}
            {...register("position")}
            isInvalid={!!errors.position}
            errorMessage={errors.position?.message}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="date"
            label="Start Date"
            variant="bordered"
            labelPlacement="outside"
            startContent={
              <Icon
                icon="lucide:calendar-plus"
                className="w-4 h-4 text-gray-400"
              />
            }
            classNames={{
              input: "text-sm",
              label: "font-medium text-gray-700 dark:text-gray-200",
            }}
            {...register("startDate")}
            isInvalid={!!errors.startDate}
            errorMessage={errors.startDate?.message}
          />

          {!watchCurrentJob && (
            <Input
              type="date"
              label="End Date"
              variant="bordered"
              labelPlacement="outside"
              startContent={
                <Icon
                  icon="lucide:calendar-minus"
                  className="w-4 h-4 text-gray-400"
                />
              }
              classNames={{
                input: "text-sm",
                label: "font-medium text-gray-700 dark:text-gray-200",
              }}
              {...register("endDate")}
              isDisabled={watchCurrentJob}
              isInvalid={!!errors.endDate}
              errorMessage={errors.endDate?.message}
            />
          )}
        </div>

        <Checkbox
          {...register("isCurrentJob")}
          classNames={{
            label: "text-sm font-medium text-gray-700 dark:text-gray-200",
          }}
        >
          <div className="flex items-center gap-2">
            <Icon icon="lucide:briefcase" className="w-4 h-4" />
            This is my current job
          </div>
        </Checkbox>

        <Textarea
          label="Job Description"
          placeholder="Describe your role, key responsibilities, and main duties..."
          variant="bordered"
          labelPlacement="outside"
          minRows={3}
          classNames={{
            input: "text-sm",
            label: "font-medium text-gray-700 dark:text-gray-200",
          }}
          {...register("jobDescription")}
          isInvalid={!!errors.jobDescription}
          errorMessage={errors.jobDescription?.message}
        />

        <Textarea
          label="Key Achievements & Responsibilities"
          placeholder="Highlight your major accomplishments, projects completed, and impact made..."
          variant="bordered"
          labelPlacement="outside"
          minRows={3}
          classNames={{
            input: "text-sm",
            label: "font-medium text-gray-700 dark:text-gray-200",
          }}
          {...register("responsibilities")}
          isInvalid={!!errors.responsibilities}
          errorMessage={errors.responsibilities?.message}
        />

        <Input
          label="Skills"
          placeholder="List your key skills and technologies..."
          variant="bordered"
          labelPlacement="outside"
          startContent={
            <Icon icon="lucide:code" className="w-4 h-4 text-gray-400" />
          }
          classNames={{
            input: "text-sm",
            label: "font-medium text-gray-700 dark:text-gray-200",
          }}
          {...register("skills")}
          isInvalid={!!errors.skills}
          errorMessage={errors.skills?.message}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Location"
            placeholder="e.g., New York, NY"
            variant="bordered"
            labelPlacement="outside"
            startContent={
              <Icon icon="lucide:map-pin" className="w-4 h-4 text-gray-400" />
            }
            classNames={{
              input: "text-sm",
              label: "font-medium text-gray-700 dark:text-gray-200",
            }}
            {...register("location")}
            isInvalid={!!errors.location}
            errorMessage={errors.location?.message}
          />

          <Select
            label="Employment Type"
            placeholder="Select employment type"
            variant="bordered"
            labelPlacement="outside"
            startContent={
              <Icon icon="lucide:file-text" className="w-4 h-4 text-gray-400" />
            }
            classNames={{
              trigger: "h-12",
              label: "font-medium text-gray-700 dark:text-gray-200",
            }}
            {...register("employmentType")}
            isInvalid={!!errors.employmentType}
            errorMessage={errors.employmentType?.message}
          >
            <SelectItem key="Full Time" value="Full Time">
              Full Time
            </SelectItem>
            <SelectItem key="Part Time" value="Part Time">
              Part Time
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

        <Select
          label="Work Mode"
          placeholder="Select work mode"
          variant="bordered"
          labelPlacement="outside"
          startContent={
            <Icon icon="lucide:home" className="w-4 h-4 text-gray-400" />
          }
          classNames={{
            trigger: "h-12",
            label: "font-medium text-gray-700 dark:text-gray-200",
          }}
          {...register("workMode")}
          isInvalid={!!errors.workMode}
          errorMessage={errors.workMode?.message}
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

export default Experience;
