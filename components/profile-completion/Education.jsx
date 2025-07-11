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
import { educationSchema } from "./validationSchemas";
import { createEducation, updateEducation } from "@/services/jobSeekerService";

const Education = ({
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
    resolver: zodResolver(educationSchema),
    defaultValues: initialData || {},
  });

  const watchCurrentlyStudying = watch("isCurrentlyStudying");

  const onSubmit = async (data) => {
    console.log("Education data submitted:", data);
    try {
      const response = await initialData ? updateEducation(data.id, data) : createEducation(data);
      console.log("Education data saved:", response.data);
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
          <Icon
            icon="lucide:graduation-cap"
            className="w-5 h-5 text-blue-600"
          />
          <h3 className="font-semibold text-blue-900 dark:text-blue-100">
            Educational Background
          </h3>
        </div>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          Add your educational qualifications and academic achievements.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid">
          <Select
            label="Education Level"
            placeholder="Select education level"
            variant="bordered"
            labelPlacement="outside"
            startContent={
              <Icon icon="lucide:book-open" className="w-4 h-4 text-gray-400" />
            }
            classNames={{
              trigger: "h-12",
              label: "font-medium text-gray-700 dark:text-gray-200",
            }}
            {...register("educationLevel")}
            isInvalid={!!errors.educationLevel}
            errorMessage={errors.educationLevel?.message}
          >
            <SelectItem key="High School" value="High School">
              High School
            </SelectItem>
            <SelectItem key="Diploma" value="Diploma">
              Diploma
            </SelectItem>
            <SelectItem key="Bachelors" value="Bachelor's Degree">
              Bachelor's Degree
            </SelectItem>
            <SelectItem key="Masters" value="Master's Degree">
              Master's Degree
            </SelectItem>
            <SelectItem key="Doctorate" value="Doctorate">
              Doctorate
            </SelectItem>
            <SelectItem key="Other" value="Other">
              Other
            </SelectItem>
          </Select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Course Name"
            placeholder="e.g., Computer Science"
            variant="bordered"
            labelPlacement="outside"
            startContent={
              <Icon icon="lucide:book" className="w-4 h-4 text-gray-400" />
            }
            classNames={{
              input: "text-sm",
              label: "font-medium text-gray-700 dark:text-gray-200",
            }}
            {...register("courseName")}
            isInvalid={!!errors.courseName}
            errorMessage={errors.courseName?.message}
          />

          <Select
            label="Course Type"
            placeholder="Select course type"
            variant="bordered"
            labelPlacement="outside"
            startContent={
              <Icon icon="lucide:list" className="w-4 h-4 text-gray-400" />
            }
            classNames={{
              trigger: "h-12",
              label: "font-medium text-gray-700 dark:text-gray-200",
            }}
            {...register("courseType")}
            isInvalid={!!errors.courseType}
            errorMessage={errors.courseType?.message}
          >
            <SelectItem key="Full Time" value="Full Time">
              Full Time
            </SelectItem>
            <SelectItem key="Part Time" value="Part Time">
              Part Time
            </SelectItem>
            <SelectItem key="Distance Learning" value="Distance Learning">
              Distance Learning
            </SelectItem>
            <SelectItem key="Online" value="Online">
              Online
            </SelectItem>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Specialization"
            placeholder="e.g., Computer Science"
            variant="bordered"
            labelPlacement="outside"
            startContent={
              <Icon icon="lucide:book" className="w-4 h-4 text-gray-400" />
            }
            classNames={{
              input: "text-sm",
              label: "font-medium text-gray-700 dark:text-gray-200",
            }}
            {...register("specialization")}
            isInvalid={!!errors.specialization}
            errorMessage={errors.specialization?.message}
          />
          <Input
            label="Course Duration"
            type=""
            placeholder="e.g., 2 years"
            variant="bordered"
            labelPlacement="outside"
            startContent={
              <Icon icon="mdi:clock" className="w-4 h-4 text-gray-400" />
            }
            classNames={{
              input: "text-sm",
              label: "font-medium text-gray-700 dark:text-gray-200",
            }}
            {...register("courseDuration", { valueAsNumber: true })}
            isInvalid={!!errors.courseDuration}
            errorMessage={errors.courseDuration?.message}
          />
        </div>

        <Input
          label="Institution Name"
          placeholder="e.g., University of California"
          variant="bordered"
          labelPlacement="outside"
          startContent={
            <Icon icon="lucide:building" className="w-4 h-4 text-gray-400" />
          }
          classNames={{
            input: "text-sm",
            label: "font-medium text-gray-700 dark:text-gray-200",
          }}
          {...register("institutionName")}
          isInvalid={!!errors.institutionName}
          errorMessage={errors.institutionName?.message}
        />

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

          {!watchCurrentlyStudying && (
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
              isDisabled={watchCurrentlyStudying}
              isInvalid={!!errors.endDate}
              errorMessage={errors.endDate?.message}
            />
          )}
        </div>

        <Checkbox
          {...register("isCurrentlyStudying")}
          classNames={{
            label: "text-sm font-medium text-gray-700 dark:text-gray-200",
          }}
        >
          <div className="flex items-center gap-2">
            <Icon icon="lucide:book-open" className="w-4 h-4" />
            Currently Studying
          </div>
        </Checkbox>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Grading System"
            placeholder="Select grading system"
            variant="bordered"
            labelPlacement="outside"
            startContent={
              <Icon icon="lucide:percent" className="w-4 h-4 text-gray-400" />
            }
            classNames={{
              trigger: "h-12",
              label: "font-medium text-gray-700 dark:text-gray-200",
            }}
            {...register("gradingSystem")}
            isInvalid={!!errors.gradingSystem}
            errorMessage={errors.gradingSystem?.message}
          >
            <SelectItem key="Percentage" value="Percentage">
              Percentage
            </SelectItem>
            <SelectItem key="GPA" value="GPA">
              GPA
            </SelectItem>
            <SelectItem key="CGPA" value="CGPA">
              CGPA
            </SelectItem>
            <SelectItem key="Letter Grade" value="Letter Grade">
              Letter Grade
            </SelectItem>
          </Select>

          <Input
            label="Grade"
            placeholder="e.g., 85% or 3.8"
            variant="bordered"
            labelPlacement="outside"
            startContent={
              <Icon icon="lucide:star" className="w-4 h-4 text-gray-400" />
            }
            classNames={{
              input: "text-sm",
              label: "font-medium text-gray-700 dark:text-gray-200",
            }}
            {...register("grade")}
            isInvalid={!!errors.grade}
            errorMessage={errors.grade?.message}
          />
        </div>

        <Textarea
          label="Description"
          placeholder="Add any additional details about your education, achievements, or relevant coursework..."
          variant="bordered"
          labelPlacement="outside"
          minRows={3}
          classNames={{
            input: "text-sm",
            label: "font-medium text-gray-700 dark:text-gray-200",
          }}
          {...register("description")}
          isInvalid={!!errors.description}
          errorMessage={errors.description?.message}
        />

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

export default Education;
