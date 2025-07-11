// // "use client";
// // import React, { useState } from "react";
// // import { useForm, useFieldArray } from "react-hook-form";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { Icon } from "@iconify/react";
// // import {
// //   Input,
// //   Select,
// //   SelectItem,
// //   Button,
// //   Chip,
// //   Divider,
// // } from "@heroui/react";
// // import { skillsSchema } from "./validationSchemas";

// // const Skills = ({
// //   onNext,
// //   onSave,
// //   initialData = {},
// //   prevStep,
// //   currentStep,
// //   steps,
// //   showModal,
// //   nextStep,
// //   profileCompletion = false
// // }) => {
// //   const [skillInput, setSkillInput] = useState("");
// //   const {
// //     register,
// //     handleSubmit,
// //     control,
// //     formState: { errors },
// //     setValue,
// //     watch,
// //   } = useForm({
// //     resolver: zodResolver(skillsSchema),
// //     defaultValues: {
// //       items: initialData.items || [],
// //     },
// //   });

// //   const { fields, append, remove } = useFieldArray({
// //     control,
// //     name: "items",
// //   });

// //   const watchItems = watch("items");

// //   const onSubmit = async (data) => {
// //     console.log("Submitting skills form:", data);
// //     return;
// //     try {
// //       const response = await fn(data);
// //       if (response.data.success) {
// //         onSave(data);
// //         nextStep();
// //         showModal("Success!", "Data saved successfully");
// //       }
// //     } catch (error) {
// //       console.error("Error saving personal info:", error);
// //       showModal(
// //         "Error!",
// //         error.response?.data?.message || "Something went wrong",
// //         "error"
// //       );
// //     }
// //   };

// //   const handleAddSkill = () => {
// //     if (skillInput.trim()) {
// //       append({
// //         name: skillInput.trim(),
// //         category: "",
// //         proficiencyLevel: "",
// //         yearsOfExperience: "",
// //       });
// //       setSkillInput("");
// //     }
// //   };

// //   const handleKeyPress = (e) => {
// //     if (e.key === "Enter") {
// //       e.preventDefault();
// //       handleAddSkill();
// //     }
// //   };

// //   return (
// //     <div className="space-y-6">
// //       <div className="bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-950/20 dark:to-teal-950/20 p-4 rounded-lg border border-cyan-100 dark:border-cyan-800">
// //         <div className="flex items-center gap-2 mb-2">
// //           <Icon icon="lucide:code-2" className="w-5 h-5 text-cyan-600" />
// //           <h3 className="font-semibold text-cyan-900 dark:text-cyan-100">
// //             Skills
// //           </h3>
// //         </div>
// //         <p className="text-sm text-cyan-700 dark:text-cyan-300">
// //           Add your technical and professional skills to showcase your expertise.
// //         </p>
// //       </div>

// //       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
// //         <div className="space-y-4">
// //           <div className="flex gap-2">
// //             <Input
// //               {...register("name")}
// //               placeholder="Add a skill (e.g., JavaScript)"
// //               variant="bordered"
// //               startContent={
// //                 <Icon icon="lucide:plus" className="w-4 h-4 text-gray-400" />
// //               }
// //               classNames={{
// //                 input: "text-sm",
// //               }}
// //             />
// //             <Button
// //               type="button"
// //               onClick={handleAddSkill}
// //               className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white"
// //             >
// //               Add
// //             </Button>
// //           </div>

// //           {fields.length > 0 && (
// //             <div className="space-y-4">
// //               {fields.map((field, index) => (
// //                 <div
// //                   key={field.id}
// //                   className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4"
// //                 >
// //                   <div className="flex items-center justify-between">
// //                     <Chip
// //                       variant="flat"
// //                       className="bg-gradient-to-r from-cyan-100 to-teal-100 dark:from-cyan-900/20 dark:to-teal-900/20 text-cyan-900 dark:text-cyan-100"
// //                     >
// //                       {field.name}
// //                     </Chip>
// //                     <Button
// //                       type="button"
// //                       isIconOnly
// //                       variant="light"
// //                       onClick={() => remove(index)}
// //                       className="text-red-500 hover:text-red-600"
// //                     >
// //                       <Icon icon="lucide:trash-2" className="w-4 h-4" />
// //                     </Button>
// //                   </div>

// //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                     <Select
// //                       label="Category"
// //                       placeholder="Select category"
// //                       variant="bordered"
// //                       labelPlacement="outside"
// //                       {...register(`items.${index}.category`)}
// //                       isInvalid={!!errors.items?.[index]?.category}
// //                       errorMessage={errors.items?.[index]?.category?.message}
// //                     >
// //                       <SelectItem key="Programming" value="Programming">
// //                         Programming
// //                       </SelectItem>
// //                       <SelectItem key="Framework" value="Framework">
// //                         Framework
// //                       </SelectItem>
// //                       <SelectItem key="Database" value="Database">
// //                         Database
// //                       </SelectItem>
// //                       <SelectItem key="Tool" value="Tool">
// //                         Tool
// //                       </SelectItem>
// //                       <SelectItem key="Language" value="Language">
// //                         Language
// //                       </SelectItem>
// //                       <SelectItem key="Other" value="Other">
// //                         Other
// //                       </SelectItem>
// //                     </Select>

// //                     <Select
// //                       label="Proficiency Level"
// //                       placeholder="Select level"
// //                       variant="bordered"
// //                       labelPlacement="outside"
// //                       {...register(`items.${index}.proficiencyLevel`)}
// //                       isInvalid={!!errors.items?.[index]?.proficiencyLevel}
// //                       errorMessage={
// //                         errors.items?.[index]?.proficiencyLevel?.message
// //                       }
// //                     >
// //                       <SelectItem key="Beginner" value="Beginner">
// //                         Beginner
// //                       </SelectItem>
// //                       <SelectItem key="Intermediate" value="Intermediate">
// //                         Intermediate
// //                       </SelectItem>
// //                       <SelectItem key="Advanced" value="Advanced">
// //                         Advanced
// //                       </SelectItem>
// //                       <SelectItem key="Expert" value="Expert">
// //                         Expert
// //                       </SelectItem>
// //                     </Select>

// //                     <Input
// //                       type="number"
// //                       label="Years of Experience"
// //                       placeholder="e.g., 3"
// //                       variant="bordered"
// //                       labelPlacement="outside"
// //                       {...register(`items.${index}.yearsOfExperience`)}
// //                       isInvalid={!!errors.items?.[index]?.yearsOfExperience}
// //                       errorMessage={
// //                         errors.items?.[index]?.yearsOfExperience?.message
// //                       }
// //                     />
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           )}

// //           {errors.items && (
// //             <p className="text-red-500 text-sm">{errors.items.message}</p>
// //           )}
// //         </div>

// //         <Divider className="my-8" />
// //         {profileCompletion ? (
// //           <div className="flex justify-between items-center pt-6">
// //             <Button
// //               variant="bordered"
// //               onPress={prevStep}
// //               isDisabled={currentStep === 0}
// //               startContent={
// //                 <Icon icon="lucide:chevron-left" className="w-4 h-4" />
// //               }
// //               className="min-w-[120px]"
// //             >
// //               Previous
// //             </Button>
// //             <div className="flex gap-3">
// //               {currentStep < steps.length - 1 && (
// //                 <Button
// //                   color="default"
// //                   variant="flat"
// //                   onPress={nextStep}
// //                   endContent={
// //                     <Icon icon="lucide:skip-forward" className="w-4 h-4" />
// //                   }
// //                   className="min-w-[100px]"
// //                 >
// //                   Skip
// //                 </Button>
// //               )}

// //               <Button
// //                 type="submit"
// //                 color="primary"
// //                 // isLoading={loading}
// //                 className="min-w-[140px] bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
// //                 endContent={
// //                   currentStep === steps.length - 1 ? (
// //                     <Icon icon="lucide:check-circle" className="w-4 h-4" />
// //                   ) : (
// //                     <Icon icon="lucide:save" className="w-4 h-4" />
// //                   )
// //                 }
// //               >
// //                 {/* {loading
// //                   ? "Saving..."
// //                   : currentStep === steps.length - 1
// //                   ? "Complete Profile"
// //                   : "Save & Continue"} */}
// //                 {currentStep === steps.length - 1
// //                   ? "Complete Profile"
// //                   : "Save & Continue"}
// //               </Button>
// //             </div>
// //           </div>
// //         ) : (
// //           <div className="flex justify-end">
// //             <Button
// //               type="submit"
// //               color="primary"
// //               className="min-w-[140px] bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
// //               endContent={<Icon icon="lucide:save" className="w-4 h-4" />}
// //             >
// //               Save
// //             </Button>
// //           </div>
// //         )}
// //       </form>
// //     </div>
// //   );
// // };

// // export default Skills;

// "use client";
// import React from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Icon } from "@iconify/react";
// import {
//   Input,
//   Select,
//   SelectItem,
//   Button,
//   Divider,
// } from "@heroui/react";
// import { z } from "zod";

// // Define a single skill schema directly in the component
// const singleSkillSchema = z.object({
//   name: z.string().min(1, "Skill name is required"),
//   category: z.string().min(1, "Category is required"),
//   proficiencyLevel: z.string().min(1, "Proficiency level is required"),
//   yearsOfExperience: z.string().min(1, "Years of experience is required"),
// });

// const Skills = ({
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
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(singleSkillSchema),
//     defaultValues: {
//       name: initialData.name || "",
//       category: initialData.category || "",
//       proficiencyLevel: initialData.proficiencyLevel || "",
//       yearsOfExperience: initialData.yearsOfExperience || "",
//     },
//   });

//   const onSubmit = async (data) => {
//     console.log("Submitting skill form:", data);
//     return;
//     try {
//       const response = await fn(data);
//       if (response.data.success) {
//         onSave(data);
//         nextStep();
//         showModal("Success!", "Data saved successfully");
//       }
//     } catch (error) {
//       console.error("Error saving skill info:", error);
//       showModal(
//         "Error!",
//         error.response?.data?.message || "Something went wrong",
//         "error"
//       );
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-950/20 dark:to-teal-950/20 p-4 rounded-lg border border-cyan-100 dark:border-cyan-800">
//         <div className="flex items-center gap-2 mb-2">
//           <Icon icon="lucide:code-2" className="w-5 h-5 text-cyan-600" />
//           <h3 className="font-semibold text-cyan-900 dark:text-cyan-100">
//             Skill
//           </h3>
//         </div>
//         <p className="text-sm text-cyan-700 dark:text-cyan-300">
//           Add your primary technical or professional skill to showcase your expertise.
//         </p>
//       </div>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             <Input
//               label="Skill Name"
//               placeholder="e.g., JavaScript"
//               variant="bordered"
//               labelPlacement="outside"
//               {...register("name")}
//               isInvalid={!!errors.name}
//               errorMessage={errors.name?.message}
//             />
            
//             <Select
//               label="Category"
//               placeholder="Select category"
//               variant="bordered"
//               labelPlacement="outside"
//               {...register("category")}
//               isInvalid={!!errors.category}
//               errorMessage={errors.category?.message}
//             >
//               <SelectItem key="Programming" value="Programming">
//                 Programming
//               </SelectItem>
//               <SelectItem key="Framework" value="Framework">
//                 Framework
//               </SelectItem>
//               <SelectItem key="Database" value="Database">
//                 Database
//               </SelectItem>
//               <SelectItem key="Tool" value="Tool">
//                 Tool
//               </SelectItem>
//               <SelectItem key="Language" value="Language">
//                 Language
//               </SelectItem>
//               <SelectItem key="Other" value="Other">
//                 Other
//               </SelectItem>
//             </Select>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <Select
//               label="Proficiency Level"
//               placeholder="Select level"
//               variant="bordered"
//               labelPlacement="outside"
//               {...register("proficiencyLevel")}
//               isInvalid={!!errors.proficiencyLevel}
//               errorMessage={errors.proficiencyLevel?.message}
//             >
//               <SelectItem key="Beginner" value="Beginner">
//                 Beginner
//               </SelectItem>
//               <SelectItem key="Intermediate" value="Intermediate">
//                 Intermediate
//               </SelectItem>
//               <SelectItem key="Advanced" value="Advanced">
//                 Advanced
//               </SelectItem>
//               <SelectItem key="Expert" value="Expert">
//                 Expert
//               </SelectItem>
//             </Select>

//             <Input
//               type="number"
//               label="Years of Experience"
//               placeholder="e.g., 3"
//               variant="bordered"
//               labelPlacement="outside"
//               {...register("yearsOfExperience")}
//               isInvalid={!!errors.yearsOfExperience}
//               errorMessage={errors.yearsOfExperience?.message}
//             />
//           </div>
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

// export default Skills;

"use client";
import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import {
  Input,
  Select,
  SelectItem,
  Button,
  Divider,
  Card,
  CardBody,
  Progress,
  Tooltip,
  Spinner,
} from "@heroui/react";
import { z } from "zod";

// Define skill schema
const skillSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Skill name is required"),
  category: z.string().min(1, "Category is required"),
  proficiencyLevel: z.string().min(1, "Proficiency level is required"),
  yearsOfExperience: z.string().min(1, "Years of experience is required"),
});

const skillsSchema = z.object({
  skills: z.array(skillSchema).min(1, "At least one skill is required"),
});

const Skills = ({
  onNext,
  onSave,
  initialData = null,
  prevStep,
  currentStep,
  steps,
  showModal,
  nextStep,
  profileCompletion = false,
  loadingSection = null,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingSkillId, setEditingSkillId] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skills: [
        {
          name: "",
          category: "",
          proficiencyLevel: "",
          yearsOfExperience: "",
        },
      ],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "skills",
  });

  // Load initial data if provided
  useEffect(() => {
    if (initialData && Array.isArray(initialData) && initialData.length > 0) {
      const formattedSkills = initialData.map((skill) => ({
        id: skill.id || Math.random().toString(36).substr(2, 9),
        name: skill.skill?.name || skill.name || "",
        category: skill.skill?.category || skill.category || "",
        proficiencyLevel: skill.proficiencyLevel || "",
        yearsOfExperience: skill.yearsOfExperience?.toString() || "",
      }));
      reset({ skills: formattedSkills });
    }
  }, [initialData, reset]);

  const addNewSkill = () => {
    append({
      name: "",
      category: "",
      proficiencyLevel: "",
      yearsOfExperience: "",
    });
  };

  const removeSkill = (index) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const handleEdit = (skill, index) => {
    setIsEditing(true);
    setEditingSkillId(skill.id || index);
    // The skill data is already in the form, so we don't need to do anything else
  };

  const handleDelete = (skillId, index) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      removeSkill(index);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingSkillId(null);
    // Reset to original data if needed
    if (initialData && Array.isArray(initialData)) {
      const formattedSkills = initialData.map((skill) => ({
        id: skill.id || Math.random().toString(36).substr(2, 9),
        name: skill.skill?.name || skill.name || "",
        category: skill.skill?.category || skill.category || "",
        proficiencyLevel: skill.proficiencyLevel || "",
        yearsOfExperience: skill.yearsOfExperience?.toString() || "",
      }));
      reset({ skills: formattedSkills });
    }
  };

  const onSubmit = async (data) => {
    console.log("Submitting skills form:", data);
    
    try {
      // Simulate API call
      // const response = await fn(data);
      // if (response.data.success) {
        onSave(data.skills);
        if (nextStep) nextStep();
        if (showModal) showModal("Success!", "Skills saved successfully");
        setIsEditing(false);
        setEditingSkillId(null);
      // }
    } catch (error) {
      console.error("Error saving skills:", error);
      if (showModal) {
        showModal(
          "Error!",
          error.response?.data?.message || "Something went wrong",
          "error"
        );
      }
    }
  };

  const getProficiencyValue = (level) => {
    switch (level) {
      case "Beginner": return 25;
      case "Intermediate": return 50;
      case "Advanced": return 75;
      case "Expert": return 100;
      default: return 0;
    }
  };

  const renderSectionHeader = (title, icon) => (
    <div className="bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-950/20 dark:to-teal-950/20 p-4 rounded-lg border border-cyan-100 dark:border-cyan-800 mb-6">
      <div className="flex items-center gap-2 mb-2">
        <Icon icon={icon} className="w-5 h-5 text-cyan-600" />
        <h3 className="font-semibold text-cyan-900 dark:text-cyan-100">
          {title}
        </h3>
      </div>
      <p className="text-sm text-cyan-700 dark:text-cyan-300">
        {isEditing 
          ? "Edit your skills or add new ones to showcase your expertise."
          : "Add your technical and professional skills to showcase your expertise."
        }
      </p>
    </div>
  );

  // If we have initial data and we're not editing, show the display view
  if (initialData && Array.isArray(initialData) && initialData.length > 0 && !isEditing) {
    return (
      <div className="space-y-6">
        {renderSectionHeader("Skills", "lucide:code")}
        
        <Card className="bg-white dark:bg-gray-800 shadow-md rounded-2xl">
          <CardBody className="p-6">
            {loadingSection === "skills" ? (
              <Spinner size="lg" color="primary" className="mx-auto" />
            ) : (
              <div className="space-y-4">
                {initialData.map((skill, index) => (
                  <div key={skill.id || index}>
                    {index > 0 && <Divider className="my-4" />}
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                          {skill.skill?.name || skill.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {skill.skill?.category || skill.category || "General"}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <Progress
                            value={getProficiencyValue(skill.proficiencyLevel)}
                            color="primary"
                            size="sm"
                            className="flex-1"
                          />
                          <span className="text-xs text-gray-500 dark:text-gray-400 min-w-[60px]">
                            {skill.proficiencyLevel}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          {skill.yearsOfExperience} years experience
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Tooltip content="Edit">
                          <Button
                            isIconOnly
                            variant="light"
                            onPress={() => handleEdit(skill, index)}
                          >
                            <Icon icon="lucide:edit" className="w-5 h-5" />
                          </Button>
                        </Tooltip>
                        <Tooltip content="Delete">
                          <Button
                            isIconOnly
                            variant="light"
                            color="danger"
                            onPress={() => handleDelete(skill.id, index)}
                          >
                            <Icon icon="lucide:trash" className="w-5 h-5" />
                          </Button>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <Divider className="my-6" />
            <div className="flex justify-center">
              <Button
                color="primary"
                variant="flat"
                onPress={() => setIsEditing(true)}
                startContent={<Icon icon="lucide:plus" className="w-4 h-4" />}
              >
                Add More Skills
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  // Form view (for adding new skills or editing existing ones)
  return (
    <div className="space-y-6">
      {renderSectionHeader("Skills", "lucide:code")}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium text-gray-800 dark:text-gray-200">
                  Skill #{index + 1}
                </h4>
                {fields.length > 1 && (
                  <Button
                    isIconOnly
                    variant="light"
                    color="danger"
                    size="sm"
                    onPress={() => removeSkill(index)}
                  >
                    <Icon icon="lucide:x" className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Skill Name"
                  placeholder="e.g., JavaScript"
                  variant="bordered"
                  labelPlacement="outside"
                  {...register(`skills.${index}.name`)}
                  isInvalid={!!errors.skills?.[index]?.name}
                  errorMessage={errors.skills?.[index]?.name?.message}
                />
                
                <Select
                  label="Category"
                  placeholder="Select category"
                  variant="bordered"
                  labelPlacement="outside"
                  {...register(`skills.${index}.category`)}
                  isInvalid={!!errors.skills?.[index]?.category}
                  errorMessage={errors.skills?.[index]?.category?.message}
                >
                  <SelectItem key="Programming" value="Programming">
                    Programming
                  </SelectItem>
                  <SelectItem key="Framework" value="Framework">
                    Framework
                  </SelectItem>
                  <SelectItem key="Database" value="Database">
                    Database
                  </SelectItem>
                  <SelectItem key="Tool" value="Tool">
                    Tool
                  </SelectItem>
                  <SelectItem key="Language" value="Language">
                    Language
                  </SelectItem>
                  <SelectItem key="Other" value="Other">
                    Other
                  </SelectItem>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Proficiency Level"
                  placeholder="Select level"
                  variant="bordered"
                  labelPlacement="outside"
                  {...register(`skills.${index}.proficiencyLevel`)}
                  isInvalid={!!errors.skills?.[index]?.proficiencyLevel}
                  errorMessage={errors.skills?.[index]?.proficiencyLevel?.message}
                >
                  <SelectItem key="Beginner" value="Beginner">
                    Beginner
                  </SelectItem>
                  <SelectItem key="Intermediate" value="Intermediate">
                    Intermediate
                  </SelectItem>
                  <SelectItem key="Advanced" value="Advanced">
                    Advanced
                  </SelectItem>
                  <SelectItem key="Expert" value="Expert">
                    Expert
                  </SelectItem>
                </Select>

                <Input
                  type="number"
                  label="Years of Experience"
                  placeholder="e.g., 3"
                  variant="bordered"
                  labelPlacement="outside"
                  {...register(`skills.${index}.yearsOfExperience`)}
                  isInvalid={!!errors.skills?.[index]?.yearsOfExperience}
                  errorMessage={errors.skills?.[index]?.yearsOfExperience?.message}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            type="button"
            variant="bordered"
            onPress={addNewSkill}
            startContent={<Icon icon="lucide:plus" className="w-4 h-4" />}
          >
            Add Another Skill
          </Button>
        </div>

        {errors.skills && (
          <p className="text-red-500 text-sm text-center">
            {errors.skills.message}
          </p>
        )}

        <Divider className="my-8" />
        
        {profileCompletion ? (
          <div className="flex justify-between items-center pt-6">
            <Button
              variant="bordered"
              onPress={isEditing ? cancelEdit : prevStep}
              isDisabled={!isEditing && currentStep === 0}
              startContent={
                <Icon icon="lucide:chevron-left" className="w-4 h-4" />
              }
              className="min-w-[120px]"
            >
              {isEditing ? "Cancel" : "Previous"}
            </Button>
            <div className="flex gap-3">
              {!isEditing && currentStep < steps.length - 1 && (
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
                className="min-w-[140px] bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
                endContent={
                  currentStep === steps.length - 1 ? (
                    <Icon icon="lucide:check-circle" className="w-4 h-4" />
                  ) : (
                    <Icon icon="lucide:save" className="w-4 h-4" />
                  )
                }
              >
                {currentStep === steps.length - 1
                  ? "Complete Profile"
                  : isEditing
                  ? "Update Skills"
                  : "Save & Continue"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex justify-end gap-3">
            {isEditing && (
              <Button
                variant="bordered"
                onPress={cancelEdit}
                startContent={<Icon icon="lucide:x" className="w-4 h-4" />}
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              color="primary"
              className="min-w-[140px] bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
              endContent={<Icon icon="lucide:save" className="w-4 h-4" />}
            >
              {isEditing ? "Update Skills" : "Save Skills"}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Skills;