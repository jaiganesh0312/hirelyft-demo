"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { Input, Textarea, Button, Checkbox, Divider } from "@heroui/react";
import { projectSchema } from "./validationSchemas";
import { updateProject, createProject } from "@/services/jobSeekerService";

const Projects = ({
  onNext,
  onSave,
  initialData,
  prevStep,
  currentStep,
  steps,
  showModal,
  nextStep,
  profileCompletion = false
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
    resolver: zodResolver(projectSchema),
    defaultValues: initialData || {},
  });

  const watchCurrentProject = watch("isCurrentProject");

  const onSubmit = async (data) => {
    try {
      const response = initialData ? await updateProject(initialData.id, data) : await createProject(data);
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
          <Icon icon="lucide:code" className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-purple-900 dark:text-purple-100">
            Project Details
          </h3>
        </div>
        <p className="text-sm text-purple-700 dark:text-purple-300">
          Showcase your projects and demonstrate your technical expertise.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4">
          <Input
            label="Project Title"
            placeholder="e.g., E-commerce Platform"
            variant="bordered"
            labelPlacement="outside"
            startContent={
              <Icon icon="lucide:folder" className="w-4 h-4 text-gray-400" />
            }
            classNames={{
              input: "text-sm",
              label: "font-medium text-gray-700 dark:text-gray-200",
            }}
            {...register("projectTitle")}
            isInvalid={!!errors.projectTitle}
            errorMessage={errors.projectTitle?.message}
          />

          <Input
            label="Client Name"
            placeholder="e.g., ABC Corporation"
            variant="bordered"
            labelPlacement="outside"
            startContent={
              <Icon icon="lucide:users" className="w-4 h-4 text-gray-400" />
            }
            classNames={{
              input: "text-sm",
              label: "font-medium text-gray-700 dark:text-gray-200",
            }}
            {...register("clientName")}
            isInvalid={!!errors.clientName}
            errorMessage={errors.clientName?.message}
          />

          <Textarea
            label="Project Details"
            placeholder="Describe the project, its objectives, and your role..."
            variant="bordered"
            labelPlacement="outside"
            minRows={3}
            classNames={{
              input: "text-sm",
              label: "font-medium text-gray-700 dark:text-gray-200",
            }}
            {...register("projectDetails")}
            isInvalid={!!errors.projectDetails}
            errorMessage={errors.projectDetails?.message}
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

          {!watchCurrentProject && (
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
              isDisabled={watchCurrentProject}
              isInvalid={!!errors.endDate}
              errorMessage={errors.endDate?.message}
            />
          )}
        </div>

        <Checkbox
          {...register("isCurrentProject")}
          classNames={{
            label: "text-sm font-medium text-gray-700 dark:text-gray-200",
          }}
        >
          <div className="flex items-center gap-2">
            <Icon icon="lucide:code" className="w-4 h-4" />
            Currently Working on this Project
          </div>
        </Checkbox>

        <Input
          label="Git Repository Link"
          placeholder="e.g., https://github.com/username/project"
          variant="bordered"
          labelPlacement="outside"
          startContent={
            <Icon icon="lucide:github" className="w-4 h-4 text-gray-400" />
          }
          classNames={{
            input: "text-sm",
            label: "font-medium text-gray-700 dark:text-gray-200",
          }}
          {...register("gitRepositoryLink")}
          isInvalid={!!errors.gitRepositoryLink}
          errorMessage={errors.gitRepositoryLink?.message}
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

export default Projects;
