"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { Input, Textarea, Button, Divider } from "@heroui/react";
import { certificationSchema } from "./validationSchemas";
import {createCertification, updateCertification} from "@/services/jobSeekerService"

const Certifications = ({
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
    if (initialData.issueDate) {
      initialData.issueDate = new Date(initialData.issueDate)
        .toISOString()
        .split("T")[0];
    }
    if (initialData.expiryDate) {
      initialData.expiryDate = new Date(initialData.expiryDate)
        .toISOString()
        .split("T")[0];
    }
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(certificationSchema),
    defaultValues: initialData || {},
  });

  
  const onSubmit = async (data) => {
    try {
      const response = initialData ? await updateCertification(data.id, data) : await createCertification(data);
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
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800">
        <div className="flex items-center gap-2 mb-2">
          <Icon icon="lucide:award" className="w-5 h-5 text-amber-600" />
          <h3 className="font-semibold text-amber-900 dark:text-amber-100">
            Certifications
          </h3>
        </div>
        <p className="text-sm text-amber-700 dark:text-amber-300">
          Add your professional certifications and achievements.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4">
          <Input
            label="Certification Name"
            placeholder="e.g., AWS Certified Solutions Architect"
            variant="bordered"
            labelPlacement="outside"
            startContent={
              <Icon
                icon="lucide:certificate"
                className="w-4 h-4 text-gray-400"
              />
            }
            classNames={{
              input: "text-sm",
              label: "font-medium text-gray-700 dark:text-gray-200",
            }}
            {...register("certificationName")}
            isInvalid={!!errors.certificationName}
            errorMessage={errors.certificationName?.message}
          />

          <Input
            label="Issuing Organization"
            placeholder="e.g., Amazon Web Services"
            variant="bordered"
            labelPlacement="outside"
            startContent={
              <Icon icon="lucide:building" className="w-4 h-4 text-gray-400" />
            }
            classNames={{
              input: "text-sm",
              label: "font-medium text-gray-700 dark:text-gray-200",
            }}
            {...register("issuingOrganization")}
            isInvalid={!!errors.issuingOrganization}
            errorMessage={errors.issuingOrganization?.message}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="date"
            label="Issue Date"
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
            {...register("issueDate")}
            isInvalid={!!errors.issueDate}
            errorMessage={errors.issueDate?.message}
          />

          <Input
            type="date"
            label="Expiry Date"
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
            {...register("expiryDate")}
            isInvalid={!!errors.expiryDate}
            errorMessage={errors.expiryDate?.message}
          />
        </div>
        <div className="grid gap-4">
          <Input
            label="Credential ID"
            placeholder="e.g., AWS-123456"
            variant="bordered"
            labelPlacement="outside"
            startContent={
              <Icon icon="lucide:hash" className="w-4 h-4 text-gray-400" />
            }
            classNames={{
              input: "text-sm",
              label: "font-medium text-gray-700 dark:text-gray-200",
            }}
            {...register("credentialId")}
            isInvalid={!!errors.credentialId}
            errorMessage={errors.credentialId?.message}
          />

          <Input
            label="Credential URL"
            placeholder="e.g., https://www.credly.com/badges/..."
            variant="bordered"
            labelPlacement="outside"
            startContent={
              <Icon icon="lucide:link" className="w-4 h-4 text-gray-400" />
            }
            classNames={{
              input: "text-sm",
              label: "font-medium text-gray-700 dark:text-gray-200",
            }}
            {...register("credentialUrl")}
            isInvalid={!!errors.credentialUrl}
            errorMessage={errors.credentialUrl?.message}
          />

          <Textarea
            label="Description"
            placeholder="Add any additional details about the certification..."
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
        </div>
        {/* <div className="flex justify-end gap-3">
          <Button
            type="submit"
            color="primary"
            className="min-w-[140px] bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
            endContent={
              <Icon icon="lucide:save" className="w-4 h-4" />
            }
          >
            Save & Continue
          </Button>
        </div> */}
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

export default Certifications;
