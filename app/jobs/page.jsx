"use client";

import React from "react";
import JobList from "@/components/jobs/JobList";

export default function JobsPage() {
  return <JobList />;
}

// 'use client';

// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { Button, Card, CardBody, CardHeader, Input, Textarea, Select, SelectItem } from '@heroui/react';
// import { useRouter } from 'next/navigation';
// import { createJobSeekerProfile, updateJobSeekerProfile, createExperience, createEducation, createProject, createCertification, addSkill, generateResume, uploadResume } from '@/services/jobSeekerService';
// import { Icon } from '@iconify/react';
// // Form schemas for each step
// const personalInfoSchema = z.object({
//   headline: z.string().min(1, 'Headline is required'),
//   summary: z.string().min(1, 'Summary is required'),
//   gender: z.string().min(1, 'Gender is required'),
//   date_of_birth: z.string().min(1, 'Date of birth is required'),
//   current_salary: z.number().min(0, 'Current salary must be positive'),
//   expected_salary: z.number().min(0, 'Expected salary must be positive'),
//   experience_years: z.number().min(0, 'Experience years must be positive'),
//   notice_period: z.number().min(0, 'Notice period must be positive'),
//   availability_status: z.string().min(1, 'Availability status is required'),
//   languages: z.array(z.string()).min(1, 'At least one language is required'),
// });

// const preferencesSchema = z.object({
//   preferredJobPost: z.string().min(1, 'Preferred job post is required'),
//   preferredJobType: z.string().min(1, 'Preferred job type is required'),
//   preferredLocation: z.string().min(1, 'Preferred location is required'),
//   industryInterest: z.string().min(1, 'Industry interest is required'),
//   workingHoursPreference: z.string().min(1, 'Working hours preference is required'),
//   preferredCompanySize: z.string().min(1, 'Preferred company size is required'),
//   willingToRelocate: z.boolean(),
//   employmentMode: z.string().min(1, 'Employment mode is required'),
// });

// const experienceSchema = z.object({
//   company_name: z.string().min(1, 'Company name is required'),
//   job_title: z.string().min(1, 'Job title is required'),
//   start_date: z.string().min(1, 'Start date is required'),
//   end_date: z.string().optional(),
//   is_current_job: z.boolean(),
//   description: z.string().min(1, 'Description is required'),
//   location: z.string().min(1, 'Location is required'),
//   employment_type: z.string().min(1, 'Employment type is required'),
// });

// const educationSchema = z.object({
//   education_level: z.string().min(1, 'Education level is required'),
//   course_name: z.string().min(1, 'Course name is required'),
//   specialization: z.string().optional(),
//   institution_name: z.string().min(1, 'Institution name is required'),
//   start_date: z.string().min(1, 'Start date is required'),
//   end_date: z.string().optional(),
//   is_currently_studying: z.boolean(),
//   grade: z.string().optional(),
//   description: z.string().optional(),
// });

// const projectSchema = z.object({
//   title: z.string().min(1, 'Project title is required'),
//   description: z.string().min(1, 'Description is required'),
//   start_date: z.string().min(1, 'Start date is required'),
//   end_date: z.string().optional(),
//   is_current_project: z.boolean(),
//   project_url: z.string().url().optional(),
//   technologies: z.array(z.string()).min(1, 'At least one technology is required'),
// });

// const certificationSchema = z.object({
//   name: z.string().min(1, 'Certification name is required'),
//   issuing_organization: z.string().min(1, 'Issuing organization is required'),
//   issue_date: z.string().min(1, 'Issue date is required'),
//   expiry_date: z.string().optional(),
//   credential_id: z.string().optional(),
//   credential_url: z.string().url().optional(),
// });

// const skillsSchema = z.object({
//   skills: z.array(z.string()).min(1, 'At least one skill is required'),
//   proficiency_level: z.string().min(1, 'Proficiency level is required'),
// });

// const resumeSchema = z.object({
//   resume_file: z.instanceof(File).optional(),
//   generate_resume: z.boolean().optional(),
// });

// const steps = [
//   {
//     id: 'personal',
//     title: 'Personal Information',
//     icon: "mdi:account",
//     schema: personalInfoSchema,
//   },
//   {
//     id: 'preferences',
//     title: 'Job Preferences',
//     icon: "mdi:briefcase",
//     schema: preferencesSchema,
//   },
//   {
//     id: 'experience',
//     title: 'Work Experience',
//     icon: "mdi:briefcase",
//   },
//   {
//     id: 'education',
//     title: 'Education',
//     icon: "mdi:trophy-award",
//   },
//   {
//     id: 'projects',
//     title: 'Projects',
//     icon: "mdi:code-tags",
//   },
//   {
//     id: 'certifications',
//     title: 'Certifications',
//     icon: "mdi:trophy-award",
//   },
//   {
//     id: 'skills',
//     title: 'Skills',
//     icon: "mdi:code-tags",
//   },
//   {
//     id: 'resume',
//     title: 'Resume',
//     icon: "mdi:file-document-outline",
//   },
// ];

// export default function ProfileCompletion() {
//   const [currentStep, setCurrentStep] = useState(0);
//   const router = useRouter();
//   const currentStepData = steps[currentStep];

//   const getSchemaForStep = (step) => {
//     switch (step) {
//       case 0:
//         return personalInfoSchema;
//       case 1:
//         return preferencesSchema;
//       case 2:
//         return experienceSchema;
//       case 3:
//         return educationSchema;
//       case 4:
//         return projectSchema;
//       case 5:
//         return certificationSchema;
//       case 6:
//         return skillsSchema;
//       case 7:
//         return resumeSchema;
//       default:
//         return personalInfoSchema;
//     }
//   };

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver: zodResolver(getSchemaForStep(currentStep)),
//   });

//   const onSubmit = async (data) => {
//     try {
//       if (currentStep === 0) {
//         // Handle personal info submission
//         const response = await createJobSeekerProfile(data);
//         if (response.data.success) {
//           setCurrentStep(prev => prev + 1);
//         }
//       } else if (currentStep === 1) {
//         // Handle preferences submission
//         const response = await updateJobSeekerProfile(data);
//         if (response.data.success) {
//           setCurrentStep(prev => prev + 1);
//         }
//       } else if (currentStep === 2) {
//         // Handle experience submission
//         const response = await createExperience(data);
//         if (response.data.success) {
//           setCurrentStep(prev => prev + 1);
//         }
//       } else if (currentStep === 3) {
//         // Handle education submission
//         const response = await createEducation(data);
//         if (response.data.success) {
//           setCurrentStep(prev => prev + 1);
//         }
//       } else if (currentStep === 4) {
//         // Handle project submission
//         const response = await createProject(data);
//         if (response.data.success) {
//           setCurrentStep(prev => prev + 1);
//         }
//       } else if (currentStep === 5) {
//         // Handle certification submission
//         const response = await createCertification(data);
//         if (response.data.success) {
//           setCurrentStep(prev => prev + 1);
//         }
//       } else if (currentStep === 6) {
//         // Handle skills submission
//         const response = await addSkill(data);
//         if (response.data.success) {
//           setCurrentStep(prev => prev + 1);
//         }
//       } else if (currentStep === 7) {
//         // Handle resume submission
//         if (data.generate_resume) {
//           const response = await generateResume();
//           if (response.data.success) {
//             router.push('/dashboard');
//           }
//         } else if (data.resume_file) {
//           const response = await uploadResume({ resume: data.resume_file });
//           if (response.data.success) {
//             router.push('/dashboard');
//           }
//         }
//       }
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto">
//         {/* Progress Steps */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between">
//             {steps.map((step, index) => (
//               <div
//                 key={step.id}
//                 className={`flex items-center ${
//                   index < currentStep ? 'text-blue-600' : 'text-gray-400'
//                 }`}
//               >
//                 <div
//                   className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                     index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200'
//                   }`}
//                 >
//                   <Icon icon={step.icon} className="w-4 h-4" />
//                 </div>
//                 {index < steps.length - 1 && (
//                   <div
//                     className={`w-full h-1 mx-2 ${
//                       index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
//                     }`}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Form Card */}
//         <Card>
//           <CardHeader className="flex gap-3">
//             <Icon icon={currentStepData.icon} className="w-6 h-6" />
//             <div className="flex flex-col">
//               <p className="text-xl font-semibold">{currentStepData.title}</p>
//               <p className="text-small text-default-500">
//                 Step {currentStep + 1} of {steps.length}
//               </p>
//             </div>
//           </CardHeader>
//           <CardBody>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//               {currentStep === 0 && (
//                 <>
//                   <Input
//                     label="Professional Headline"
//                     placeholder="e.g., Senior Software Engineer"
//                     {...register('headline')}
//                     errorMessage={errors.headline?.message}
//                   />
//                   <Textarea
//                     label="Professional Summary"
//                     placeholder="Write a brief summary about yourself"
//                     {...register('summary')}
//                     errorMessage={errors.summary?.message}
//                   />
//                   <Select
//                     label="Gender"
//                     placeholder="Select your gender"
//                     {...register('gender')}
//                     errorMessage={errors.gender?.message}
//                   >
//                     <SelectItem key="male" value="male">Male</SelectItem>
//                     <SelectItem key="female" value="female">Female</SelectItem>
//                     <SelectItem key="other" value="other">Other</SelectItem>
//                   </Select>
//                   <Input
//                     type="date"
//                     label="Date of Birth"
//                     {...register('date_of_birth')}
//                     errorMessage={errors.date_of_birth?.message}
//                   />
//                   <Input
//                     type="number"
//                     label="Current Salary"
//                     placeholder="Enter your current salary"
//                     {...register('current_salary', { valueAsNumber: true })}
//                     errorMessage={errors.current_salary?.message}
//                   />
//                   <Input
//                     type="number"
//                     label="Expected Salary"
//                     placeholder="Enter your expected salary"
//                     {...register('expected_salary', { valueAsNumber: true })}
//                     errorMessage={errors.expected_salary?.message}
//                   />
//                   <Input
//                     type="number"
//                     label="Years of Experience"
//                     placeholder="Enter your years of experience"
//                     {...register('experience_years', { valueAsNumber: true })}
//                     errorMessage={errors.experience_years?.message}
//                   />
//                   <Input
//                     type="number"
//                     label="Notice Period (days)"
//                     placeholder="Enter your notice period in days"
//                     {...register('notice_period', { valueAsNumber: true })}
//                     errorMessage={errors.notice_period?.message}
//                   />
//                   <Select
//                     label="Availability Status"
//                     placeholder="Select your availability"
//                     {...register('availability_status')}
//                     errorMessage={errors.availability_status?.message}
//                   >
//                     <SelectItem key="immediate" value="immediate">Immediate</SelectItem>
//                     <SelectItem key="notice_period" value="notice_period">Notice Period</SelectItem>
//                     <SelectItem key="not_available" value="not_available">Not Available</SelectItem>
//                   </Select>
//                 </>
//               )}

//               {currentStep === 1 && (
//                 <>
//                   <Input
//                     label="Preferred Job Post"
//                     placeholder="e.g., Software Engineer"
//                     {...register('preferredJobPost')}
//                     errorMessage={errors.preferredJobPost?.message}
//                   />
//                   <Select
//                     label="Preferred Job Type"
//                     placeholder="Select job type"
//                     {...register('preferredJobType')}
//                     errorMessage={errors.preferredJobType?.message}
//                   >
//                     <SelectItem key="full_time" value="full_time">Full-time</SelectItem>
//                     <SelectItem key="part_time" value="part_time">Part-time</SelectItem>
//                     <SelectItem key="contract" value="contract">Contract</SelectItem>
//                     <SelectItem key="internship" value="internship">Internship</SelectItem>
//                     <SelectItem key="freelance" value="freelance">Freelance</SelectItem>
//                   </Select>
//                   <Input
//                     label="Preferred Location"
//                     placeholder="Enter preferred location"
//                     {...register('preferredLocation')}
//                     errorMessage={errors.preferredLocation?.message}
//                   />
//                   <Input
//                     label="Industry Interest"
//                     placeholder="Enter industry interest"
//                     {...register('industryInterest')}
//                     errorMessage={errors.industryInterest?.message}
//                   />
//                   <Select
//                     label="Working Hours Preference"
//                     placeholder="Select working hours"
//                     {...register('workingHoursPreference')}
//                     errorMessage={errors.workingHoursPreference?.message}
//                   >
//                     <SelectItem key="day_shift" value="day_shift">Day Shift</SelectItem>
//                     <SelectItem key="night_shift" value="night_shift">Night Shift</SelectItem>
//                     <SelectItem key="flexible" value="flexible">Flexible</SelectItem>
//                   </Select>
//                   <Select
//                     label="Preferred Company Size"
//                     placeholder="Select company size"
//                     {...register('preferredCompanySize')}
//                     errorMessage={errors.preferredCompanySize?.message}
//                   >
//                     <SelectItem key="startup" value="startup">Startup (1-50)</SelectItem>
//                     <SelectItem key="small" value="small">Small (51-200)</SelectItem>
//                     <SelectItem key="medium" value="medium">Medium (201-1000)</SelectItem>
//                     <SelectItem key="large" value="large">Large (1000+)</SelectItem>
//                   </Select>
//                   <Select
//                     label="Employment Mode"
//                     placeholder="Select employment mode"
//                     {...register('employmentMode')}
//                     errorMessage={errors.employmentMode?.message}
//                   >
//                     <SelectItem key="remote" value="remote">Remote</SelectItem>
//                     <SelectItem key="hybrid" value="hybrid">Hybrid</SelectItem>
//                     <SelectItem key="onsite" value="onsite">On-site</SelectItem>
//                   </Select>
//                 </>
//               )}

//               {currentStep === 2 && (
//                 <>
//                   <Input
//                     label="Company Name"
//                     placeholder="Enter company name"
//                     {...register('company_name')}
//                     errorMessage={errors.company_name?.message}
//                   />
//                   <Input
//                     label="Job Title"
//                     placeholder="Enter job title"
//                     {...register('job_title')}
//                     errorMessage={errors.job_title?.message}
//                   />
//                   <Input
//                     type="date"
//                     label="Start Date"
//                     {...register('start_date')}
//                     errorMessage={errors.start_date?.message}
//                   />
//                   <Input
//                     type="date"
//                     label="End Date"
//                     {...register('end_date')}
//                     errorMessage={errors.end_date?.message}
//                   />
//                   <Textarea
//                     label="Description"
//                     placeholder="Describe your responsibilities and achievements"
//                     {...register('description')}
//                     errorMessage={errors.description?.message}
//                   />
//                   <Input
//                     label="Location"
//                     placeholder="Enter work location"
//                     {...register('location')}
//                     errorMessage={errors.location?.message}
//                   />
//                   <Select
//                     label="Employment Type"
//                     placeholder="Select employment type"
//                     {...register('employment_type')}
//                     errorMessage={errors.employment_type?.message}
//                   >
//                     <SelectItem key="full_time" value="full_time">Full-time</SelectItem>
//                     <SelectItem key="part_time" value="part_time">Part-time</SelectItem>
//                     <SelectItem key="contract" value="contract">Contract</SelectItem>
//                     <SelectItem key="internship" value="internship">Internship</SelectItem>
//                     <SelectItem key="freelance" value="freelance">Freelance</SelectItem>
//                   </Select>
//                 </>
//               )}

//               {currentStep === 3 && (
//                 <>
//                   <Select
//                     label="Education Level"
//                     placeholder="Select education level"
//                     {...register('education_level')}
//                     errorMessage={errors.education_level?.message}
//                   >
//                     <SelectItem key="high_school" value="high_school">High School</SelectItem>
//                     <SelectItem key="diploma" value="diploma">Diploma</SelectItem>
//                     <SelectItem key="bachelors" value="bachelors">Bachelor's Degree</SelectItem>
//                     <SelectItem key="masters" value="masters">Master's Degree</SelectItem>
//                     <SelectItem key="phd" value="phd">PhD</SelectItem>
//                   </Select>
//                   <Input
//                     label="Course Name"
//                     placeholder="Enter course name"
//                     {...register('course_name')}
//                     errorMessage={errors.course_name?.message}
//                   />
//                   <Input
//                     label="Specialization"
//                     placeholder="Enter specialization (optional)"
//                     {...register('specialization')}
//                     errorMessage={errors.specialization?.message}
//                   />
//                   <Input
//                     label="Institution Name"
//                     placeholder="Enter institution name"
//                     {...register('institution_name')}
//                     errorMessage={errors.institution_name?.message}
//                   />
//                   <Input
//                     type="date"
//                     label="Start Date"
//                     {...register('start_date')}
//                     errorMessage={errors.start_date?.message}
//                   />
//                   <Input
//                     type="date"
//                     label="End Date"
//                     {...register('end_date')}
//                     errorMessage={errors.end_date?.message}
//                   />
//                   <Input
//                     label="Grade"
//                     placeholder="Enter grade (optional)"
//                     {...register('grade')}
//                     errorMessage={errors.grade?.message}
//                   />
//                   <Textarea
//                     label="Description"
//                     placeholder="Additional details about your education"
//                     {...register('description')}
//                     errorMessage={errors.description?.message}
//                   />
//                 </>
//               )}

//               {currentStep === 4 && (
//                 <>
//                   <Input
//                     label="Project Title"
//                     placeholder="Enter project title"
//                     {...register('title')}
//                     errorMessage={errors.title?.message}
//                   />
//                   <Textarea
//                     label="Description"
//                     placeholder="Describe your project"
//                     {...register('description')}
//                     errorMessage={errors.description?.message}
//                   />
//                   <Input
//                     type="date"
//                     label="Start Date"
//                     {...register('start_date')}
//                     errorMessage={errors.start_date?.message}
//                   />
//                   <Input
//                     type="date"
//                     label="End Date"
//                     {...register('end_date')}
//                     errorMessage={errors.end_date?.message}
//                   />
//                   <Input
//                     label="Project URL"
//                     placeholder="Enter project URL (optional)"
//                     {...register('project_url')}
//                     errorMessage={errors.project_url?.message}
//                   />
//                   <Input
//                     label="Technologies"
//                     placeholder="Enter technologies (comma-separated)"
//                     {...register('technologies')}
//                     errorMessage={errors.technologies?.message}
//                   />
//                 </>
//               )}

//               {currentStep === 5 && (
//                 <>
//                   <Input
//                     label="Certification Name"
//                     placeholder="Enter certification name"
//                     {...register('name')}
//                     errorMessage={errors.name?.message}
//                   />
//                   <Input
//                     label="Issuing Organization"
//                     placeholder="Enter issuing organization"
//                     {...register('issuing_organization')}
//                     errorMessage={errors.issuing_organization?.message}
//                   />
//                   <Input
//                     type="date"
//                     label="Issue Date"
//                     {...register('issue_date')}
//                     errorMessage={errors.issue_date?.message}
//                   />
//                   <Input
//                     type="date"
//                     label="Expiry Date"
//                     placeholder="Enter expiry date (optional)"
//                     {...register('expiry_date')}
//                     errorMessage={errors.expiry_date?.message}
//                   />
//                   <Input
//                     label="Credential ID"
//                     placeholder="Enter credential ID (optional)"
//                     {...register('credential_id')}
//                     errorMessage={errors.credential_id?.message}
//                   />
//                   <Input
//                     label="Credential URL"
//                     placeholder="Enter credential URL (optional)"
//                     {...register('credential_url')}
//                     errorMessage={errors.credential_url?.message}
//                   />
//                 </>
//               )}

//               {currentStep === 6 && (
//                 <>
//                   <Input
//                     label="Skills"
//                     placeholder="Enter skills (comma-separated)"
//                     {...register('skills')}
//                     errorMessage={errors.skills?.message}
//                   />
//                   <Select
//                     label="Proficiency Level"
//                     placeholder="Select proficiency level"
//                     {...register('proficiency_level')}
//                     errorMessage={errors.proficiency_level?.message}
//                   >
//                     <SelectItem key="beginner" value="beginner">Beginner</SelectItem>
//                     <SelectItem key="intermediate" value="intermediate">Intermediate</SelectItem>
//                     <SelectItem key="advanced" value="advanced">Advanced</SelectItem>
//                     <SelectItem key="expert" value="expert">Expert</SelectItem>
//                   </Select>
//                 </>
//               )}

//               {currentStep === 7 && (
//                 <>
//                   <div className="space-y-4">
//                     <div className="flex items-center space-x-4">
//                       <input
//                         type="file"
//                         accept=".pdf,.doc,.docx"
//                         onChange={(e) => {
//                           const file = e.target.files[0];
//                           if (file) {
//                             register('resume_file').onChange(e);
//                           }
//                         }}
//                         className="hidden"
//                         id="resume-upload"
//                       />
//                       <label
//                         htmlFor="resume-upload"
//                         className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                       >
//                         Upload Resume
//                       </label>
//                       <span className="text-sm text-gray-500">
//                         Supported formats: PDF, DOC, DOCX
//                       </span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <input
//                         type="checkbox"
//                         id="generate-resume"
//                         {...register('generate_resume')}
//                       />
//                       <label htmlFor="generate-resume" className="text-sm">
//                         Generate resume from profile information
//                       </label>
//                     </div>
//                   </div>
//                 </>
//               )}

//               <div className="flex justify-between mt-6">
//                 <Button
//                   color="default"
//                   variant="flat"
//                   onPress={() => setCurrentStep(prev => prev - 1)}
//                   isDisabled={currentStep === 0}
//                 >
//                   Previous
//                 </Button>
//                 <Button
//                   color="primary"
//                   type="button"
//                   isLoading={isSubmitting}
//                   onPress={() => setCurrentStep(prev => Math.min(prev + 1, steps.length))}
//                 >
//                   {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
//                 </Button>
//               </div>
//             </form>
//           </CardBody>
//         </Card>
//       </div>
//     </div>
//   );
// } 