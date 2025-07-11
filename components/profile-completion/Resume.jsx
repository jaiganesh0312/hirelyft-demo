// "use client";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Icon } from "@iconify/react";
// import { Input, Button, Divider } from "@heroui/react";
// import { resumeSchema } from "./validationSchemas";

// const Resume = ({
//   onNext,
//   onSave,
//   initialData = {},
//   prevStep,
//   currentStep,
//   steps,
//   showModal,
//   nextStep,
//   profileCompletion = false
// }) => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//   } = useForm({
//     resolver: zodResolver(resumeSchema),
//     defaultValues: initialData,
//   });

//   const onSubmit = async (data) => {
//     try {
//       const response = await fn(data);
//       if (response.data.success) {
//         onSave(data);
//         nextStep();
//         showModal("Success!", "Data saved successfully");
//       }
//     } catch (error) {
//       console.error("Error saving personal info:", error);
//       showModal(
//         "Error!",
//         error.response?.data?.message || "Something went wrong",
//         "error"
//       );
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       setValue("resume", file);
//     }
//   };

//   const handleRemoveFile = () => {
//     setSelectedFile(null);
//     setValue("resume", null);
//   };

//   return (
//     <div className="space-y-6">
//       <div className="bg-gradient-to-r from-violet-50 to-fuchsia-50 dark:from-violet-950/20 dark:to-fuchsia-950/20 p-4 rounded-lg border border-violet-100 dark:border-violet-800">
//         <div className="flex items-center gap-2 mb-2">
//           <Icon icon="lucide:file-text" className="w-5 h-5 text-violet-600" />
//           <h3 className="font-semibold text-violet-900 dark:text-violet-100">
//             Resume Upload
//           </h3>
//         </div>
//         <p className="text-sm text-violet-700 dark:text-violet-300">
//           Upload your resume in PDF or DOCX format (max 5MB).
//         </p>
//       </div>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         <div className="space-y-4">
//           {!selectedFile ? (
//             <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
//               <div className="flex flex-col items-center gap-2">
//                 <Icon icon="lucide:upload" className="w-8 h-8 text-gray-400" />
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   Drag and drop your resume here, or click to browse
//                 </p>
//                 <Input
//                   type="file"
//                   accept=".pdf,.docx"
//                   className="hidden"
//                   {...register("resume")}
//                   onChange={handleFileChange}
//                   isInvalid={!!errors.resume}
//                   errorMessage={errors.resume?.message}
//                 />
//                 <Button
//                   type="button"
//                   variant="flat"
//                   onPress={() =>
//                     document.querySelector('input[type="file"]').click()
//                   }
//                   className="mt-2"
//                 >
//                   Select File
//                 </Button>
//               </div>
//             </div>
//           ) : (
//             <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <Icon
//                     icon="lucide:file-text"
//                     className="w-6 h-6 text-violet-600"
//                   />
//                   <div>
//                     <p className="font-medium text-gray-900 dark:text-gray-100">
//                       {selectedFile.name}
//                     </p>
//                     <p className="text-sm text-gray-500 dark:text-gray-400">
//                       {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
//                     </p>
//                   </div>
//                 </div>
//                 <Button
//                   type="button"
//                   isIconOnly
//                   variant="light"
//                   onClick={handleRemoveFile}
//                   className="text-red-500 hover:text-red-600"
//                 >
//                   <Icon icon="lucide:trash-2" className="w-4 h-4" />
//                 </Button>
//               </div>
//             </div>
//           )}

//           {errors.resume && (
//             <p className="text-red-500 text-sm">{errors.resume.message}</p>
//           )}
//         </div>

//         <Divider className="my-8" />

//         {profileCompletion ? (
//           <div className="flex justify-between items-center pt-6">
//             <Button
//               variant="bordered"
//               onPress={prevStep}
//               isDisabled={currentStep === 0}
//               startContent={
//                 <Icon icon="lucide:chevron-left" className="w-4 h-4" />
//               }
//               className="min-w-[120px]"
//             >
//               Previous
//             </Button>
//             <div className="flex gap-3">
//               {currentStep < steps.length - 1 && (
//                 <Button
//                   color="default"
//                   variant="flat"
//                   onPress={nextStep}
//                   endContent={
//                     <Icon icon="lucide:skip-forward" className="w-4 h-4" />
//                   }
//                   className="min-w-[100px]"
//                 >
//                   Skip
//                 </Button>
//               )}

//               <Button
//                 type="submit"
//                 color="primary"
//                 // isLoading={loading}
//                 className="min-w-[140px] bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
//                 endContent={
//                   currentStep === steps.length - 1 ? (
//                     <Icon icon="lucide:check-circle" className="w-4 h-4" />
//                   ) : (
//                     <Icon icon="lucide:save" className="w-4 h-4" />
//                   )
//                 }
//               >
//                 {/* {loading
//                   ? "Saving..."
//                   : currentStep === steps.length - 1
//                   ? "Complete Profile"
//                   : "Save & Continue"} */}
//                 {currentStep === steps.length - 1
//                   ? "Complete Profile"
//                   : "Save & Continue"}
//               </Button>
//             </div>
//           </div>
//         ) : (
//           <div className="flex justify-end">
//             <Button
//               type="submit"
//               color="primary"
//               className="min-w-[140px] bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
//               endContent={<Icon icon="lucide:save" className="w-4 h-4" />}
//             >
//               Save
//             </Button>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default Resume;

"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { Input, Button, Divider } from "@heroui/react";
import { resumeSchema } from "./validationSchemas";
import { uploadResume } from "@/services/jobSeekerService";

const Resume = ({
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
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: initialData || {},
  });

  const onSubmit = async (data) => {
    try {
      const response = await uploadResume(data);
      if (response.data.success) {
        onSave?.(data);
        nextStep?.();
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

  const validateFile = (file) => {
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!allowedTypes.includes(file.type)) {
      showModal("Error!", "Please upload only PDF or DOCX files", "error");
      return false;
    }
    
    if (file.size > maxSize) {
      showModal("Error!", "File size must be less than 5MB", "error");
      return false;
    }
    
    return true;
  };

  const handleFileSelect = (file) => {
    if (file && validateFile(file)) {
      setSelectedFile(file);
      setValue("resume", file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setValue("resume", null);
  };

  // Drag and drop handlers
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Only set drag over to false if we're leaving the drop zone entirely
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
      setIsDragOver(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      handleFileSelect(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-violet-50 to-fuchsia-50 dark:from-violet-950/20 dark:to-fuchsia-950/20 p-4 rounded-lg border border-violet-100 dark:border-violet-800">
        <div className="flex items-center gap-2 mb-2">
          <Icon icon="lucide:file-text" className="w-5 h-5 text-violet-600" />
          <h3 className="font-semibold text-violet-900 dark:text-violet-100">
            Resume Upload
          </h3>
        </div>
        <p className="text-sm text-violet-700 dark:text-violet-300">
          Upload your resume in PDF or DOCX format (max 5MB).
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          {!selectedFile ? (
            <div 
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 cursor-pointer ${
                isDragOver 
                  ? 'border-violet-500 bg-violet-50 dark:bg-violet-950/20 border-solid' 
                  : 'border-gray-300 dark:border-gray-600 hover:border-violet-400 hover:bg-violet-25 dark:hover:bg-violet-950/10'
              }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => document.querySelector('input[type="file"]').click()}
            >
              <div className="flex flex-col items-center gap-2 h-1/3 md:h-1/5 ">
                <Icon 
                  icon={isDragOver ? "lucide:file-plus" : "lucide:upload"} 
                  className={`w-8 h-8 transition-colors duration-200 ${
                    isDragOver ? 'text-violet-600' : 'text-gray-400'
                  }`} 
                />
                <p className={`text-sm transition-colors duration-200 ${
                  isDragOver 
                    ? 'text-violet-700 dark:text-violet-300 font-medium' 
                    : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {isDragOver 
                    ? 'Drop your resume here' 
                    : 'Drag and drop your resume here, or click to browse'
                  }
                </p>
                <Input
                  type="file"
                  accept=".pdf,.docx"
                  className="hidden"
                  {...register("resume")}
                  onChange={handleFileChange}
                  isInvalid={!!errors.resume}
                  errorMessage={errors.resume?.message}
                />
                {!isDragOver && (
                  <Button
                    type="button"
                    variant="flat"
                    onPress={() =>
                      document.querySelector('input[type="file"]').click()
                    }
                    className="mt-2"
                  >
                    Select File
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon
                    icon="lucide:file-text"
                    className="w-6 h-6 text-violet-600"
                  />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {selectedFile.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  isIconOnly
                  variant="light"
                  onClick={handleRemoveFile}
                  className="text-red-500 hover:text-red-600"
                >
                  <Icon icon="lucide:trash-2" className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {errors.resume && (
            <p className="text-red-500 text-sm">{errors.resume.message}</p>
          )}
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

export default Resume;