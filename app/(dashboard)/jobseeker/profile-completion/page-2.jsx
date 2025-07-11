'use client';

import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
  Checkbox,
  Progress,
  Divider,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@heroui/react';
import { Icon } from '@iconify/react';
import {
  createJobSeekerProfile,
  updateJobSeekerProfile,
  createExperience,
  createEducation,
  createProject,
  createCertification,
  addSkill,
  updateCertification,
  updateEducation,
  updateExperience,
  updateProject,
  updateSkill
} from '@/services/jobSeekerService';

// Form schemas
const personalInfoSchema = z.object({
  headline: z.string().min(1, 'Headline is required'),
  summary: z.string().min(1, 'Summary is required'),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Gender is required',
    invalid_type_error: 'Gender must be a string'
  }),
  date_of_birth: z.string().min(1, 'Date of birth is required'),
  current_salary: z.number().min(0, 'Current salary must be positive'),
  expected_salary: z.number().min(0, 'Expected salary must be positive'),
  experience_years: z.number().min(0, 'Experience years must be positive'),
  notice_period: z.number().min(0, 'Notice period must be positive'),
  availability_status: z.enum(["Available", "Not Available", "Passive"], {
    required_error: 'Availability status is required',
    invalid_type_error: 'Availability status must be a string'
  }),
  languages: z.string().min(1, 'At least one language is required'),
});

const preferencesSchema = z.object({
  preferredJobPost: z.string().min(1, 'Preferred job post is required'),
  preferredJobType: z.enum(["Full-time", "Part-time", "Contract", "Freelance", "Internship"], {
    required_error: 'Preferred job type is required',
    invalid_type_error: 'Preferred job type must be a string'
  }),
  preferredLocation: z.string().min(1, 'Preferred location is required'),
  industryInterest: z.string().min(1, 'Industry interest is required'),
  workingHoursPreference: z.enum(['Day shift', 'Night shift', 'Flexible'], {
    required_error: 'Working hours preference is required',
    invalid_type_error: 'Working hours preference must be a string'
  }),
  preferredCompanySize: z.enum(['1-10', '11-50', '51-100', '101-500', '501-1000', '1001-5000', '5001-10000', '10001-50000', '50001-100000', '100001-500000', '500001-1000000'], {
    required_error: 'Preferred company size is required',
    invalid_type_error: 'Preferred company size must be a string'
  }),
  willingToRelocate: z.boolean(),
  employmentMode: z.enum(["Hybrid", "On-site", "Remote"], {
    required_error: 'Employment mode is required',
    invalid_type_error: 'Employment mode must be a string'
  }),
});

const experienceSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  jobTitle: z.string().min(1, 'Job title is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  isCurrentJob: z.boolean(),
  description: z.string().min(1, 'Description is required'),
  location: z.string().min(1, 'Location is required'),
  employmentType: z.enum(["Full Time", "Part Time", "Contract", "Freelance", "Internship"], {
    required_error: 'Employment type is required',
    invalid_type_error: 'Employment type must be a string'
  }),
  workMode: z.enum(["Hybrid", "On-site", "Remote"], {
    required_error: 'Work mode is required',
    invalid_type_error: 'Work mode must be a string'
  }),
});

const educationSchema = z.object({
  educationLevel: z.enum(["Doctorate", "Masters", "Bachelors", "Diploma", "High School", "Other"], {
    required_error: 'Education level is required',
    invalid_type_error: 'Education level must be a string'
  }),
  courseName: z.string().min(1, 'Course name is required'),
  courseType: z.enum(["Full Time", "Part Time", "Online", "Other"], {
    required_error: 'Course type is required',
    invalid_type_error: 'Course type must be a string'
  }),
  courseDuration: z.number().min(0, 'Course duration must be positive'),
  specialization: z.string().optional(),
  institutionName: z.string().min(1, 'Institution name is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  isCurrentlyStudying: z.boolean(),
  gradingSystem: z.enum(["GPA", "Percentage", "CGPA", "Other"], {
    required_error: 'Grading system is required',
    invalid_type_error: 'Grading system must be a string'
  }),
  grade: z.string().optional(),
  description: z.string().optional(),
});

const projectSchema = z.object({
  projectTitle: z.string().min(1, 'Project title is required'),
  clientName: z.string().optional(),
  projectDetails: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  isCurrentProject: z.boolean(),
  gitRepoLink: z.string().url().optional().or(z.literal('')),
});

const certificationSchema = z.object({
  name: z.string().min(1, 'Certification name is required'),
  issuingOrganization: z.string().min(1, 'Issuing organization is required'),
  issueDate: z.string().min(1, 'Issue date is required'),
  expiryDate: z.string().optional(),
  credentialId: z.string().optional(),
  credentialUrl: z.string().url().optional().or(z.literal('')),
  description: z.string().optional(),
});

const skillsSchema = z.object({
  name: z.string().min(1, 'Skill name is required'),
  category: z.string().optional(),
  proficiencyLevel: z.string().min(1, 'Proficiency level is required'),
  yearsOfExperience: z.number().min(0, 'Years of experience must be positive'),
});

const steps = [
  { id: 'personal', title: 'Personal Information', icon: 'mdi:account' },
  { id: 'preferences', title: 'Job Preferences', icon: 'mdi:briefcase' },
  { id: 'experience', title: 'Work Experience', icon: 'mdi:work' },
  { id: 'education', title: 'Education', icon: 'mdi:school' },
  { id: 'projects', title: 'Projects', icon: 'mdi:folder-multiple' },
  { id: 'certifications', title: 'Certifications', icon: 'mdi:certificate' },
  { id: 'skills', title: 'Skills', icon: 'mdi:cog' },
];

export default function ProfileCompletionForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalMessage, setModalMessage] = useState('');

  // Form configurations for each step
  const getForm = (step) => {
    const schemas = {
      0: personalInfoSchema,
      1: preferencesSchema,
      2: experienceSchema,
      3: educationSchema,
      4: projectSchema,
      5: certificationSchema,
      6: skillsSchema,
    };

    return useForm({
      resolver: zodResolver(schemas[step]),
      defaultValues: profileData[steps[step].id] || {},
    });
  };

  const personalForm = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: profileData.personal || {},
  });

  const preferencesForm = useForm({
    resolver: zodResolver(preferencesSchema),
    defaultValues: profileData.preferences || {},
  });

  const experienceForm = useForm({
    resolver: zodResolver(experienceSchema),
    defaultValues: profileData.experience || {},
  });

  const educationForm = useForm({
    resolver: zodResolver(educationSchema),
    defaultValues: profileData.education || {},
  });

  const projectForm = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: profileData.projects || {},
  });

  const certificationForm = useForm({
    resolver: zodResolver(certificationSchema),
    defaultValues: profileData.certifications || {},
  });

  const skillsForm = useForm({
    resolver: zodResolver(skillsSchema),
    defaultValues: profileData.skills || {},
  });

  const forms = [
    personalForm,
    preferencesForm,
    experienceForm,
    educationForm,
    projectForm,
    certificationForm,
    skillsForm,
  ];

  const showMessage = (message) => {
    setModalMessage(message);
    onOpen();
  };

  const handleNext = async () => {
    const currentForm = forms[currentStep];
    const isValid = await currentForm.trigger();

    if (!isValid) {
      showMessage('Please fix the validation errors before proceeding.');
      return;
    }

    const formData = currentForm.getValues();
    setLoading(true);

    try {
      let response;
      const stepId = steps[currentStep].id;

      switch (currentStep) {
        case 0: // Personal Info
          response = profileData.personal
            ? await updateJobSeekerProfile(formData)
            : await createJobSeekerProfile(formData);
          break;

        case 1: // Preferences
          response = profileData.preferences
            ? await updateJobSeekerProfile(formData)
            : await createJobSeekerProfile(formData);
          break;

        case 2: // Experience
          response = profileData.experience && profileData.experience.id
            ? await updateExperience(profileData.experience.id, formData)
            : await createExperience(formData);
          break;

        case 3: // Education
          response = profileData.education && profileData.education.id
            ? await updateEducation(profileData.education.id, formData)
            : await createEducation(formData);
          break;

        case 4: // Projects
          response = profileData.projects && profileData.projects.id
            ? await updateProject(profileData.projects.id, formData)
            : await createProject(formData);
          break;

        case 5: // Certifications
          response = profileData.certifications && profileData.certifications.id
            ? await updateCertification(profileData.certifications.id, formData)
            : await createCertification(formData);
          break;

        case 6: // Skills
          response = profileData.skills && profileData.skills.id
            ? await updateSkill(profileData.skills.id, formData)
            : await addSkill(formData);
          break;
      }

      if (response.data.success) {
        setProfileData(prev => ({
          ...prev,
          [stepId]: { ...formData, id: response.data[stepId]?.id || prev[stepId]?.id }
        }));

        if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1);
        } else {
          showMessage('Profile completed successfully!');
        }
      } else {
        showMessage('Failed to save data. Please try again.');
      }
    } catch (error) {
      console.error('API Error:', error);
      showMessage('An error occurred while saving. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      // Reset form with stored data
      const stepId = steps[currentStep - 1].id;
      if (profileData[stepId]) {
        forms[currentStep - 1].reset(profileData[stepId]);
      }
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoStep form={personalForm} />;
      case 1:
        return <PreferencesStep form={preferencesForm} />;
      case 2:
        return <ExperienceStep form={experienceForm} />;
      case 3:
        return <EducationStep form={educationForm} />;
      case 4:
        return <ProjectsStep form={projectForm} />;
      case 5:
        return <CertificationsStep form={certificationForm} />;
      case 6:
        return <SkillsStep form={skillsForm} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Complete Your Profile</h1>
          <p className="text-gray-600">Let's build your professional profile step by step</p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-6">
          <CardBody>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-sm font-medium text-gray-600">
                {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
              </span>
            </div>
            <Progress
              value={((currentStep + 1) / steps.length) * 100}
              className="mb-4"
              color="primary"
            />
            <div className="flex justify-between">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex flex-col items-center ${
                    index <= currentStep ? 'text-blue-600' : 'text-gray-400'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                      index <= currentStep
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    <Icon icon={step.icon} className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-center hidden sm:block">{step.title}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Step Content */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Icon icon={steps[currentStep].icon} className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold">{steps[currentStep].title}</h2>
            </div>
          </CardHeader>
          <CardBody>
            {renderStepContent()}
          </CardBody>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            variant="bordered"
            onPress={handlePrevious}
            isDisabled={currentStep === 0}
            startContent={<Icon icon="mdi:arrow-left" />}
          >
            Previous
          </Button>
          <Button
            color="primary"
            onPress={handleNext}
            isLoading={loading}
            endContent={
              currentStep === steps.length - 1 ?
                <Icon icon="mdi:check" /> :
                <Icon icon="mdi:arrow-right" />
            }
          >
            {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
          </Button>
        </div>
      </div>

      {/* Modal for messages */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Information</ModalHeader>
          <ModalBody>
            <p>{modalMessage}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={onClose}>
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

// Personal Info Step Component
function PersonalInfoStep({ form }) {
  const { register, formState: { errors }, watch, setValue } = form;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Headline"
          placeholder="Enter your professional headline"
          {...register('headline')}
          isInvalid={!!errors.headline}
          errorMessage={errors.headline?.message}
        />
        <Select
          label="Gender"
          placeholder="Select gender"
          {...register('gender')}
          isInvalid={!!errors.gender}
          errorMessage={errors.gender?.message}
        >
          <SelectItem key="male" value="male">Male</SelectItem>
          <SelectItem key="female" value="female">Female</SelectItem>
          <SelectItem key="other" value="other">Other</SelectItem>
        </Select>
      </div>

      <Textarea
        label="Professional Summary"
        placeholder="Write a brief summary about yourself"
        {...register('summary')}
        isInvalid={!!errors.summary}
        errorMessage={errors.summary?.message}
        minRows={4}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="date"
          label="Date of Birth"
          {...register('date_of_birth')}
          isInvalid={!!errors.date_of_birth}
          errorMessage={errors.date_of_birth?.message}
        />
        <Input
          label="Languages"
          placeholder="e.g., English, Spanish, French"
          {...register('languages')}
          isInvalid={!!errors.languages}
          errorMessage={errors.languages?.message}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="number"
          label="Current Salary"
          placeholder="Enter current salary"
          {...register('current_salary', { valueAsNumber: true })}
          isInvalid={!!errors.current_salary}
          errorMessage={errors.current_salary?.message}
        />
        <Input
          type="number"
          label="Expected Salary"
          placeholder="Enter expected salary"
          {...register('expected_salary', { valueAsNumber: true })}
          isInvalid={!!errors.expected_salary}
          errorMessage={errors.expected_salary?.message}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          type="number"
          label="Years of Experience"
          placeholder="Enter years"
          {...register('experience_years', { valueAsNumber: true })}
          isInvalid={!!errors.experience_years}
          errorMessage={errors.experience_years?.message}
        />
        <Input
          type="number"
          label="Notice Period (days)"
          placeholder="Enter notice period"
          {...register('notice_period', { valueAsNumber: true })}
          isInvalid={!!errors.notice_period}
          errorMessage={errors.notice_period?.message}
        />
        <Select
          label="Availability Status"
          placeholder="Select status"
          {...register('availability_status')}
          isInvalid={!!errors.availability_status}
          errorMessage={errors.availability_status?.message}
        >
          <SelectItem key="Available" value="Available">Available</SelectItem>
          <SelectItem key="Not Available" value="Not Available">Not Available</SelectItem>
          <SelectItem key="Passive" value="Passive">Passive</SelectItem>
        </Select>
      </div>
    </div>
  );
}

// Preferences Step Component
function PreferencesStep({ form }) {
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Preferred Job Position"
          placeholder="e.g., Software Engineer"
          {...register('preferredJobPost')}
          isInvalid={!!errors.preferredJobPost}
          errorMessage={errors.preferredJobPost?.message}
        />
        <Select
          label="Preferred Job Type"
          placeholder="Select job type"
          {...register('preferredJobType')}
          isInvalid={!!errors.preferredJobType}
          errorMessage={errors.preferredJobType?.message}
        >
          <SelectItem key="Full-time" value="Full-time">Full-time</SelectItem>
          <SelectItem key="Part-time" value="Part-time">Part-time</SelectItem>
          <SelectItem key="Contract" value="Contract">Contract</SelectItem>
          <SelectItem key="Freelance" value="Freelance">Freelance</SelectItem>
          <SelectItem key="Internship" value="Internship">Internship</SelectItem>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Preferred Location"
          placeholder="e.g., New York, Remote"
          {...register('preferredLocation')}
          isInvalid={!!errors.preferredLocation}
          errorMessage={errors.preferredLocation?.message}
        />
        <Input
          label="Industry Interest"
          placeholder="e.g., Technology, Healthcare"
          {...register('industryInterest')}
          isInvalid={!!errors.industryInterest}
          errorMessage={errors.industryInterest?.message}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Working Hours Preference"
          placeholder="Select preference"
          {...register('workingHoursPreference')}
          isInvalid={!!errors.workingHoursPreference}
          errorMessage={errors.workingHoursPreference?.message}
        >
          <SelectItem key="Day shift" value="Day shift">Day shift</SelectItem>
          <SelectItem key="Night shift" value="Night shift">Night shift</SelectItem>
          <SelectItem key="Flexible" value="Flexible">Flexible</SelectItem>
        </Select>
        <Select
          label="Employment Mode"
          placeholder="Select mode"
          {...register('employmentMode')}
          isInvalid={!!errors.employmentMode}
          errorMessage={errors.employmentMode?.message}
        >
          <SelectItem key="Hybrid" value="Hybrid">Hybrid</SelectItem>
          <SelectItem key="On-site" value="On-site">On-site</SelectItem>
          <SelectItem key="Remote" value="Remote">Remote</SelectItem>
        </Select>
      </div>

      <Select
        label="Preferred Company Size"
        placeholder="Select company size"
        {...register('preferredCompanySize')}
        isInvalid={!!errors.preferredCompanySize}
        errorMessage={errors.preferredCompanySize?.message}
      >
        <SelectItem key="1-10" value="1-10">1-10 employees</SelectItem>
        <SelectItem key="11-50" value="11-50">11-50 employees</SelectItem>
        <SelectItem key="51-100" value="51-100">51-100 employees</SelectItem>
        <SelectItem key="101-500" value="101-500">101-500 employees</SelectItem>
        <SelectItem key="501-1000" value="501-1000">501-1000 employees</SelectItem>
        <SelectItem key="1001-5000" value="1001-5000">1001-5000 employees</SelectItem>
        <SelectItem key="5001-10000" value="5001-10000">5001-10000 employees</SelectItem>
        <SelectItem key="10001-50000" value="10001-50000">10001-50000 employees</SelectItem>
        <SelectItem key="50001-100000" value="50001-100000">50001-100000 employees</SelectItem>
        <SelectItem key="100001-500000" value="100001-500000">100001-500000 employees</SelectItem>
        <SelectItem key="500001-1000000" value="500001-1000000">500001+ employees</SelectItem>
      </Select>

      <Checkbox {...register('willingToRelocate')}>
        Willing to relocate for the right opportunity
      </Checkbox>
    </div>
  );
}

// Experience Step Component
function ExperienceStep({ form }) {
  const { register, formState: { errors }, watch } = form;
  const isCurrentJob = watch('isCurrentJob');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Company Name"
          placeholder="Enter company name"
          {...register('companyName')}
          isInvalid={!!errors.companyName}
          errorMessage={errors.companyName?.message}
        />
        <Input
          label="Job Title"
          placeholder="Enter job title"
          {...register('jobTitle')}
          isInvalid={!!errors.jobTitle}
          errorMessage={errors.jobTitle?.message}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="date"
          label="Start Date"
          {...register('startDate')}
          isInvalid={!!errors.startDate}
          errorMessage={errors.startDate?.message}
        />
        {!isCurrentJob && (
          <Input
            type="date"
            label="End Date"
            {...register('endDate')}
            isInvalid={!!errors.endDate}
            errorMessage={errors.endDate?.message}
          />
        )}
      </div>

      <Checkbox {...register('isCurrentJob')}>
        This is my current job
      </Checkbox>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Location"
          placeholder="Enter job location"
          {...register('location')}
          isInvalid={!!errors.location}
          errorMessage={errors.location?.message}
        />
        <Select
          label="Employment Type"
          placeholder="Select type"
          {...register('employmentType')}
          isInvalid={!!errors.employmentType}
          errorMessage={errors.employmentType?.message}
        >
          <SelectItem key="Full Time" value="Full Time">Full Time</SelectItem>
          <SelectItem key="Part Time" value="Part Time">Part Time</SelectItem>
          <SelectItem key="Contract" value="Contract">Contract</SelectItem>
          <SelectItem key="Freelance" value="Freelance">Freelance</SelectItem>
          <SelectItem key="Internship" value="Internship">Internship</SelectItem>
        </Select>
      </div>

      <Select
        label="Work Mode"
        placeholder="Select work mode"
        {...register('workMode')}
        isInvalid={!!errors.workMode}
        errorMessage={errors.workMode?.message}
      >
        <SelectItem key="Hybrid" value="Hybrid">Hybrid</SelectItem>
        <SelectItem key="On-site" value="On-site">On-site</SelectItem>
        <SelectItem key="Remote" value="Remote">Remote</SelectItem>
      </Select>

      <Textarea
        label="Job Description"
        placeholder="Describe your responsibilities and achievements"
        {...register('description')}
        isInvalid={!!errors.description}
        errorMessage={errors.description?.message}
        minRows={4}
      />
    </div>
  );
}

// Education Step Component
function EducationStep({ form }) {
  const { register, formState: { errors }, watch } = form;
  const isCurrentlyStudying = watch('isCurrentlyStudying');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Education Level"
          placeholder="Select level"
          {...register('educationLevel')}
          isInvalid={!!errors.educationLevel}
          errorMessage={errors.educationLevel?.message}
        >
          <SelectItem key="Doctorate" value="Doctorate">Doctorate</SelectItem>
          <SelectItem key="Masters" value="Masters">Masters</SelectItem>
          <SelectItem key="Bachelors" value="Bachelors">Bachelors</SelectItem>
          <SelectItem key="Diploma" value="Diploma">Diploma</SelectItem>
          <SelectItem key="High School" value="High School">High School</SelectItem>
          <SelectItem key="Other" value="Other">Other</SelectItem>
        </Select>
        <Input
          label="Course Name"
          placeholder="Enter course name"
          {...register('courseName')}
          isInvalid={!!errors.courseName}
          errorMessage={errors.courseName?.message}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Course Type"
          placeholder="Select type"
          {...register('courseType')}
          isInvalid={!!errors.courseType}
          errorMessage={errors.courseType?.message}
        >
          <SelectItem key="Full Time" value="Full Time">Full Time</SelectItem>
          <SelectItem key="Part Time" value="Part Time">Part Time</SelectItem>
          <SelectItem key="Online" value="Online">Online</SelectItem>
          <SelectItem key="Other" value="Other">Other</SelectItem>
        </Select>
        <Input
          type="number"
          label="Course Duration (years)"
          placeholder="Enter duration"
          {...register('courseDuration', { valueAsNumber: true })}
          isInvalid={!!errors.courseDuration}
          errorMessage={errors.courseDuration?.message}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Specialization"
          placeholder="Enter specialization (optional)"
          {...register('specialization')}
        />
        <Input
          label="Institution Name"
          placeholder="Enter institution name"
          {...register('institutionName')}
          isInvalid={!!errors.institutionName}
          errorMessage={errors.institutionName?.message}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="date"
          label="Start Date"
          {...register('startDate')}
          isInvalid={!!errors.startDate}
          errorMessage={errors.startDate?.message}
        />
        {!isCurrentlyStudying && (
          <Input
            type="date"
            label="End Date"
            {...register('endDate')}
          />
        )}
      </div>

      <Checkbox {...register('isCurrentlyStudying')}>
        I am currently studying here
      </Checkbox>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Grading System"
          placeholder="Select system"
          {...register('gradingSystem')}
          isInvalid={!!errors.gradingSystem}
          errorMessage={errors.gradingSystem?.message}
        >
          <SelectItem key="GPA" value="GPA">GPA</SelectItem>
          <SelectItem key="Percentage" value="Percentage">Percentage</SelectItem>
          <SelectItem key="CGPA" value="CGPA">CGPA</SelectItem>
          <SelectItem key="Other" value="Other">Other</SelectItem>
        </Select>
        <Input
          label="Grade"
          placeholder="Enter your grade (optional)"
          {...register('grade')}
        />
      </div>

      <Textarea
        label="Description"
        placeholder="Additional details about your education (optional)"
        {...register('description')}
        minRows={3}
      />
    </div>
  );
}

// Projects Step Component
function ProjectsStep({ form }) {
  const { register, formState: { errors }, watch } = form;
  const isCurrentProject = watch('isCurrentProject');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Project Title"
          placeholder="Enter project title"
          {...register('projectTitle')}
          isInvalid={!!errors.projectTitle}
          errorMessage={errors.projectTitle?.message}
        />
        <Input
          label="Client Name"
          placeholder="Enter client name (optional)"
          {...register('clientName')}
        />
      </div>

      <Textarea
        label="Project Details"
        placeholder="Describe the project (optional)"
        {...register('projectDetails')}
        minRows={4}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="date"
          label="Start Date"
          {...register('startDate')}
          isInvalid={!!errors.startDate}
          errorMessage={errors.startDate?.message}
        />
        {!isCurrentProject && (
          <Input
            type="date"
            label="End Date"
            {...register('endDate')}
          />
        )}
      </div>

      <Checkbox {...register('isCurrentProject')}>
        This is an ongoing project
      </Checkbox>

      <Input
        type="url"
        label="Git Repository Link"
        placeholder="https://github.com/username/project (optional)"
        {...register('gitRepoLink')}
        isInvalid={!!errors.gitRepoLink}
        errorMessage={errors.gitRepoLink?.message}
      />
    </div>
  );
}

// Certifications Step Component
function CertificationsStep({ form }) {
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Certification Name"
          placeholder="Enter certification name"
          {...register('name')}
          isInvalid={!!errors.name}
          errorMessage={errors.name?.message}
        />
        <Input
          label="Issuing Organization"
          placeholder="Enter issuing organization"
          {...register('issuingOrganization')}
          isInvalid={!!errors.issuingOrganization}
          errorMessage={errors.issuingOrganization?.message}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="date"
          label="Issue Date"
          {...register('issueDate')}
          isInvalid={!!errors.issueDate}
          errorMessage={errors.issueDate?.message}
        />
        <Input
          type="date"
          label="Expiry Date"
          placeholder="Leave blank if no expiry"
          {...register('expiryDate')}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Credential ID"
          placeholder="Enter credential ID (optional)"
          {...register('credentialId')}
        />
        <Input
          type="url"
          label="Credential URL"
          placeholder="Enter verification URL (optional)"
          {...register('credentialUrl')}
          isInvalid={!!errors.credentialUrl}
          errorMessage={errors.credentialUrl?.message}
        />
      </div>

      <Textarea
        label="Description"
        placeholder="Additional details about the certification (optional)"
        {...register('description')}
        minRows={3}
      />
    </div>
  );
}

// Skills Step Component
function SkillsStep({ form }) {
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Skill Name"
          placeholder="e.g., JavaScript, Project Management"
          {...register('name')}
          isInvalid={!!errors.name}
          errorMessage={errors.name?.message}
        />
        <Input
          label="Category"
          placeholder="e.g., Programming, Soft Skills (optional)"
          {...register('category')}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Proficiency Level"
          placeholder="Select proficiency"
          {...register('proficiencyLevel')}
          isInvalid={!!errors.proficiencyLevel}
          errorMessage={errors.proficiencyLevel?.message}
        >
          <SelectItem key="Beginner" value="Beginner">Beginner</SelectItem>
          <SelectItem key="Intermediate" value="Intermediate">Intermediate</SelectItem>
          <SelectItem key="Advanced" value="Advanced">Advanced</SelectItem>
          <SelectItem key="Expert" value="Expert">Expert</SelectItem>
        </Select>
        <Input
          type="number"
          label="Years of Experience"
          placeholder="Enter years of experience"
          {...register('yearsOfExperience', { valueAsNumber: true })}
          isInvalid={!!errors.yearsOfExperience}
          errorMessage={errors.yearsOfExperience?.message}
        />
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <Icon icon="mdi:information" className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Adding Multiple Skills</h4>
            <p className="text-sm text-blue-700">
              You can add multiple skills by completing this form for each skill.
              After saving this skill, you'll be able to add more skills in your profile.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// // // 'use client';

// // // import { useState, useEffect } from 'react';
// // // import { useForm } from 'react-hook-form';
// // // import { zodResolver } from '@hookform/resolvers/zod';
// // // import * as z from 'zod';
// // // import { Button, Card, CardBody, CardHeader, Input, Textarea, Select, SelectItem, Checkbox, Spinner } from '@heroui/react';
// // // import { useRouter } from 'next/navigation';
// // // import { createJobSeekerProfile, updateJobSeekerProfile, createExperience, createEducation, createProject, createCertification, addSkill, generateResume, uploadResume
// // //   , getMyJobSeekerProfile, getAllCertifications, getAllExperiences, getAllEducation, getAllProjects, getAllSkills,
// // //   updateCertification, updateEducation, updateExperience, updateProject, updateSkill
// // //  } from '@/services/jobSeekerService';
// // // import { Icon } from '@iconify/react';

// // // // Form schemas for each step
// // // const personalInfoSchema = z.object({
// // //   headline: z.string().min(1, 'Headline is required'),
// // //   summary: z.string().min(1, 'Summary is required'),
// // //   gender: z.string().min(1, 'Gender is required'),
// // //   date_of_birth: z.string().min(1, 'Date of birth is required'),
// // //   current_salary: z.number().min(0, 'Current salary must be positive'),
// // //   expected_salary: z.number().min(0, 'Expected salary must be positive'),
// // //   experience_years: z.number().min(0, 'Experience years must be positive'),
// // //   notice_period: z.number().min(0, 'Notice period must be positive'),
// // //   availability_status: z.string().min(1, 'Availability status is required'),
// // //   languages: z.union([
// // //     z.string().min(3, 'At least one language is required'),
// // //     z.array(z.string()).min(1, 'At least one language is required')
// // //   ]),
// // // });

// // // const preferencesSchema = z.object({
// // //   preferredJobPost: z.string().min(1, 'Preferred job post is required'),
// // //   preferredJobType: z.string().min(1, 'Preferred job type is required'),
// // //   preferredLocation: z.string().min(1, 'Preferred location is required'),
// // //   industryInterest: z.string().min(1, 'Industry interest is required'),
// // //   workingHoursPreference: z.string().min(1, 'Working hours preference is required'),
// // //   preferredCompanySize: z.string().min(1, 'Preferred company size is required'),
// // //   willingToRelocate: z.boolean(),
// // //   employmentMode: z.string().min(1, 'Employment mode is required'),
// // // });

// // // const experienceSchema = z.object({
// // //   company_name: z.string().min(1, 'Company name is required'),
// // //   job_title: z.string().min(1, 'Job title is required'),
// // //   start_date: z.string().min(1, 'Start date is required'),
// // //   end_date: z.string().optional(),
// // //   is_current_job: z.boolean(),
// // //   description: z.string().min(1, 'Description is required'),
// // //   location: z.string().min(1, 'Location is required'),
// // //   employment_type: z.string().min(1, 'Employment type is required'),
// // // });

// // // const educationSchema = z.object({
// // //   education_level: z.string().min(1, 'Education level is required'),
// // //   course_name: z.string().min(1, 'Course name is required'),
// // //   specialization: z.string().optional(),
// // //   institution_name: z.string().min(1, 'Institution name is required'),
// // //   start_date: z.string().min(1, 'Start date is required'),
// // //   end_date: z.string().optional(),
// // //   is_currently_studying: z.boolean(),
// // //   grade: z.string().optional(),
// // //   description: z.string().optional(),
// // // });

// // // const projectSchema = z.object({
// // //   title: z.string().min(1, 'Project title is required'),
// // //   description: z.string().min(1, 'Description is required'),
// // //   start_date: z.string().min(1, 'Start date is required'),
// // //   end_date: z.string().optional(),
// // //   is_current_project: z.boolean(),
// // //   project_url: z.string().url().optional(),
// // //   technologies: z.array(z.string()).min(1, 'At least one technology is required'),
// // // });

// // // const certificationSchema = z.object({
// // //   name: z.string().min(1, 'Certification name is required'),
// // //   issuing_organization: z.string().min(1, 'Issuing organization is required'),
// // //   issue_date: z.string().min(1, 'Issue date is required'),
// // //   expiry_date: z.string().optional(),
// // //   credential_id: z.string().optional(),
// // //   credential_url: z.string().url().optional(),
// // // });

// // // const skillsSchema = z.object({
// // //   skills: z.array(z.string()).min(1, 'At least one skill is required'),
// // //   proficiency_level: z.string().min(1, 'Proficiency level is required'),
// // //   years_of_experience: z.number().min(0, 'Years of experience must be positive'),
// // // });

// // // const resumeSchema = z.object({
// // //   resume_file: z.instanceof(File).optional(),
// // //   generate_resume: z.boolean().optional(),
// // // });
// // // const indianLanguages = [
// // //   "Assamese",
// // //   "Bengali",
// // //   "Bodo",
// // //   "Dogri",
// // //   "English",
// // //   "Gujarati",
// // //   "Hindi",
// // //   "Kannada",
// // //   "Kashmiri",
// // //   "Konkani",
// // //   "Maithili",
// // //   "Malayalam",
// // //   "Manipuri",
// // //   "Marathi",
// // //   "Nepali",
// // //   "Odia",
// // //   "Punjabi",
// // //   "Sanskrit",
// // //   "Santali",
// // //   "Sindhi",
// // //   "Tamil",
// // //   "Telugu",
// // //   "Urdu"
// // // ];

// // // const steps = [
// // //   {
// // //     id: 'personal',
// // //     title: 'Personal Information',
// // //     icon: "mdi:account",
// // //     schema: personalInfoSchema,
// // //     description: "Tell us about yourself and your professional background"
// // //   },
// // //   {
// // //     id: 'preferences',
// // //     title: 'Job Preferences',
// // //     icon: "mdi:briefcase",
// // //     schema: preferencesSchema,
// // //     description: "Let us know what kind of opportunities you're looking for"
// // //   },
// // //   {
// // //     id: 'experience',
// // //     title: 'Work Experience',
// // //     icon: "mdi:briefcase-outline",
// // //     description: "Share your professional work experience"
// // //   },
// // //   {
// // //     id: 'education',
// // //     title: 'Education',
// // //     icon: "mdi:school",
// // //     description: "Tell us about your educational background"
// // //   },
// // //   {
// // //     id: 'projects',
// // //     title: 'Projects',
// // //     icon: "mdi:code-tags",
// // //     description: "Showcase your projects and achievements"
// // //   },
// // //   {
// // //     id: 'certifications',
// // //     title: 'Certifications',
// // //     icon: "mdi:certificate",
// // //     description: "Add your professional certifications"
// // //   },
// // //   {
// // //     id: 'skills',
// // //     title: 'Skills',
// // //     icon: "mdi:lightbulb",
// // //     description: "Highlight your technical and professional skills"
// // //   },
// // //   {
// // //     id: 'resume',
// // //     title: 'Resume',
// // //     icon: "mdi:file-document-outline",
// // //     description: "Upload or generate your professional resume"
// // //   },
// // // ];

// // // const getSchemaForStep = (step) => {
// // //   switch (step) {
// // //     case 0: return personalInfoSchema;
// // //     case 1: return preferencesSchema;
// // //     case 2: return experienceSchema;
// // //     case 3: return educationSchema;
// // //     case 4: return projectSchema;
// // //     case 5: return certificationSchema;
// // //     case 6: return skillsSchema;
// // //     case 7: return resumeSchema;
// // //     default: return personalInfoSchema;
// // //   }
// // // };

// // // export default function ProfileCompletion() {
// // //   const [currentStep, setCurrentStep] = useState(0);
// // //   const router = useRouter();
// // //   const currentStepData = steps[currentStep];
// // //   const [resumeFileName, setResumeFileName] = useState('');

// // //   // State for existing data
// // //   const [existingProfile, setExistingProfile] = useState(null);
// // //   const [existingExperiences, setExistingExperiences] = useState([]);
// // //   const [existingEducation, setExistingEducation] = useState([]);
// // //   const [existingProjects, setExistingProjects] = useState([]);
// // //   const [existingCertifications, setExistingCertifications] = useState([]);
// // //   const [existingSkills, setExistingSkills] = useState([]);

// // //   const [loading, setLoading] = useState(false);

// // //   // Fetch existing data when component mounts
// // //   useEffect(() => {
// // //     const fetchExistingData = async () => {
// // //       setLoading(true);
// // //       try {
// // //         // Fetch profile data
// // //         const profileResponse = await getMyJobSeekerProfile();
// // //         if (profileResponse.data.success) {
// // //           setExistingProfile(profileResponse.data.jobSeeker || {});
// // //         }

// // //         // Fetch experiences
// // //         const experiencesResponse = await getAllExperiences();
// // //         if (experiencesResponse.data.success) {
// // //           setExistingExperiences(experiencesResponse.data.experiences || []);
// // //         }

// // //         // Fetch education
// // //         const educationResponse = await getAllEducation();
// // //         if (educationResponse.data.success) {
// // //           setExistingEducation(educationResponse.data.educations || []);
// // //         }

// // //         // Fetch projects
// // //         const projectsResponse = await getAllProjects();
// // //         if (projectsResponse.data.success) {
// // //           setExistingProjects(projectsResponse.data.projects || []);
// // //         }

// // //         // Fetch certifications
// // //         const certificationsResponse = await getAllCertifications();
// // //         if (certificationsResponse.data.success) {
// // //           setExistingCertifications(certificationsResponse.data.certifications || []);
// // //         }

// // //         // Fetch skills
// // //         const skillsResponse = await getAllSkills();
// // //         if (skillsResponse.data.success) {
// // //           setExistingSkills(skillsResponse.data.skills || []);
// // //         }
// // //       } catch (error) {
// // //         console.error('Error fetching existing data:', error);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchExistingData();
// // //   }, []);

// // //   // Get default values based on current step and entry index
// // //   const getDefaultValues = () => {
// // //     switch (currentStep) {
// // //       case 0: // Personal Info
// // //       return existingProfile || {};
// // //       case 1: // Preferences
// // //       return existingProfile || {};
// // //       case 2: // Experience
// // //       return existingExperiences[0] || {};
// // //       case 3: // Education
// // //       return existingEducation[0] || {};
// // //       case 4: // Projects
// // //       return existingProjects[0] || {};
// // //       case 5: // Certifications
// // //       return existingCertifications[0] || {};
// // //       case 6: // Skills
// // //       return existingSkills[0] || {};
// // //       case 7: // Resume
// // //       return {};
// // //       default:
// // //         return {};
// // //     }
// // //   };

// // //   const {
// // //     register,
// // //     handleSubmit,
// // //     formState: { errors, isSubmitting },
// // //     watch,
// // //     setValue,
// // //     reset,
// // //   } = useForm({
// // //     resolver: zodResolver(getSchemaForStep(currentStep)),
// // //   });

// // //   const defaultValues = getDefaultValues();
// // //   useEffect(() => {
// // //     reset(getDefaultValues());
// // //   }, [currentStep, currentEntryIndex]);

// // //   // Handle adding new entry

// // //   // Handle editing existing entry
// // //   const handleEditEntry = (index) => {
// // //     setCurrentEntryIndex(index);
// // //     reset(existingEntries[index]);
// // //   };

// // //   // Get existing entries based on current step
// // //   const getExistingEntries = () => {
// // //     switch (currentStep) {
// // //       case 2: return existingExperiences;
// // //       case 3: return existingEducation;
// // //       case 4: return existingProjects;
// // //       case 5: return existingCertifications;
// // //       case 6: return existingSkills;
// // //       default: return [];
// // //     }
// // //   };

// // //   const existingEntries = getExistingEntries();

// // //   // Modify onSubmit to handle both create and update
// // //   const onSubmit = async (data) => {
// // //     try {
// // //       if (currentStep === 0) {
// // //         // Handle personal info submission
// // //         if(typeof data.langauges === "string")data.languages = data.languages.split(",");
// // //         const response = existingProfile
// // //         ? await updateJobSeekerProfile(data)
// // //           : await createJobSeekerProfile(data);
// // //         if(response.data.success){
// // //           setExistingProfile(response.data.jobSeeker);
// // //         }
// // //       } else if (currentStep === 1) {
// // //         // Handle preferences submission
// // //         const response = await updateJobSeekerProfile(data);
// // //         if(response.data.success){
// // //           setExistingProfile(response.data.jobSeeker);
// // //         }
// // //       } else if (currentStep === 2) {
// // //         // Handle experience submission
// // //         const response = existingExperiences[0]
// // //         ? await updateExperience(existingExperiences[0].id, data)
// // //           : await createExperience(data);
// // //           if (response.data.success) {
// // //           // Refresh experiences list
// // //           const experiencesResponse = await getAllExperiences();
// // //           if (experiencesResponse.data.success) {
// // //             setExistingExperiences(experiencesResponse.data.experiences);
// // //           }
// // //         }
// // //       } else if (currentStep === 3) {
// // //         // Handle education submission
// // //         const response = existingEducation[0]
// // //         ? await updateEducation(existingEducation[0].id, data)
// // //         : await createEducation(data);
// // //         if (response.data.success) {
// // //           // Refresh education list
// // //           const educationResponse = await getAllEducation();
// // //           if (educationResponse.data.success) {
// // //             setExistingEducation(educationResponse.data.educations);
// // //           }
// // //         }
// // //       } else if (currentStep === 4) {
// // //         // Handle project submission
// // //         const response = existingProjects[0]
// // //         ? await updateProject(existingProjects[0].id, data)
// // //         : await createProject(data);
// // //         if (response.data.success) {
// // //           // Refresh projects list
// // //           const projectsResponse = await getAllProjects();
// // //           if (projectsResponse.data.success) {
// // //             setExistingProjects(projectsResponse.data.projects);
// // //           }
// // //         }
// // //       } else if (currentStep === 5) {
// // //         // Handle certification submission
// // //         const response = existingCertifications[0]
// // //         ? await updateCertification(existingCertifications[0].id, data)
// // //         : await createCertification(data);
// // //         if (response.data.success) {
// // //           // Refresh certifications list
// // //           const certificationsResponse = await getAllCertifications();
// // //           if (certificationsResponse.data.success) {
// // //             setExistingCertifications(certificationsResponse.data.certifications);
// // //           }
// // //         }
// // //       } else if (currentStep === 6) {
// // //         // Handle skills submission
// // //         const response = existingSkills[0]
// // //           ? await updateSkill(existingSkills[0].id, data)
// // //           : await addSkill(data);
// // //           if (response.data.success) {
// // //             // Refresh skills list
// // //             const skillsResponse = await getAllSkills();
// // //             if (skillsResponse.data.success) {
// // //               setExistingSkills(skillsResponse.data.skills);
// // //             }
// // //         }
// // //       } else if (currentStep === 7) {
// // //         // Handle resume submission
// // //         if (data.generate_resume) {
// // //           const response = await generateResume();
// // //           if (response.data.success) {
// // //             router.push('/dashboard');
// // //           }
// // //         } else if (data.resume_file) {
// // //           const response = await uploadResume({ resume: data.resume_file });
// // //           if (response.data.success) {
// // //             router.push('/dashboard');
// // //           }
// // //         }
// // //       }
// // //       setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
// // //     } catch (error) {
// // //       console.error('Error submitting form:', error);
// // //     }
// // //   };

// // //   const handlePrevious = () => {
// // //     setCurrentStep(prev => Math.max(prev - 1, 0));
// // //   };

// // //   console.log(watch('languages'));

// // //   if(loading){
// // //     return <Spinner className='mx-auto top-1/3' label='Loading...'/>
// // //   }
// // //   return (
// // //     <div className="min-h-screen bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
// // //       <div className="max-w-4xl mx-auto">
// // //         <div className="text-center mb-6">
// // //           <h1 className="text-3xl font-bold text-gray-900">Complete Your Profile</h1>
// // //           <p className=" mt-1 text-lg text-gray-600">Help employers discover your talents and find the perfect job match.</p>
// // //         </div>

// // //         {/* Progress Steps */}
// // //         <div className="mb-12">
// // //           <div className="flex items-center justify-between">
// // //             {steps.map((step, index) => (
// // //               <div
// // //                 key={step.id}
// // //                 className={`flex flex-col items-center ${
// // //                   index === currentStep
// // //                     ? 'text-indigo-600'
// // //                     : index < currentStep
// // //                       ? 'text-green-600'
// // //                       : 'text-gray-400'
// // //                 }`}
// // //               >
// // //                 <div
// // //                   className={`w-12 h-12 rounded-full flex items-center justify-center mb-2
// // //                   ${
// // //                     index === currentStep
// // //                       ? 'bg-indigo-100 border-2 border-indigo-600 text-indigo-600'
// // //                       : index < currentStep
// // //                         ? 'bg-green-100 border-2 border-green-600 text-green-600'
// // //                         : 'bg-gray-100 border border-gray-300'
// // //                   }`}
// // //                 >
// // //                   <Icon icon={step.icon} className="w-5 h-5" />
// // //                 </div>
// // //                 {index < steps.length - 1 && (
// // //                   <div
// // //                     className={`hidden sm:block absolute left-0 w-full h-0.5 -z-10 top-6
// // //                       ${index < currentStep ? 'bg-green-600' : 'bg-gray-200'}`}
// // //                     style={{ width: '100%', left: `${(index * 100) / (steps.length - 1)}%` }}
// // //                   />
// // //                 )}
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>

// // //         {/* Form Card */}
// // //         <Card className="shadow-lg border-0 rounded-xl overflow-hidden">
// // //           <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
// // //             <div className="flex items-center gap-4">
// // //               <div className="bg-white bg-opacity-20 p-3 rounded-full">
// // //                 <Icon icon={currentStepData.icon} className="w-8 h-8" />
// // //               </div>
// // //               <div>
// // //                 <h2 className="text-2xl font-bold">{currentStepData.title}</h2>
// // //                 <p className="text-indigo-100 mt-1">
// // //                   {currentStepData.description}
// // //                 </p>
// // //               </div>
// // //             </div>
// // //             <div className="mt-4 bg-white bg-opacity-10 rounded-full h-2 w-full">
// // //               <div
// // //                 className="bg-white h-2 rounded-full"
// // //                 style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
// // //               ></div>
// // //             </div>
// // //             <p className="text-right text-sm mt-2 text-indigo-100">
// // //               Step {currentStep + 1} of {steps.length}
// // //             </p>
// // //           </CardHeader>

// // //           <CardBody className="p-8">
// // //             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
// // //               {/* Add entry list for multiple entry sections */}
// // //                   <div className="space-y-2">
// // //                     {existingEntries.map((entry, index) => (
// // //                       <div
// // //                         key={entry.id}
// // //                         className={`p-4 rounded-lg border ${
// // //                           currentEntryIndex === index
// // //                             ? 'border-indigo-500 bg-indigo-50'
// // //                             : 'border-gray-200 hover:border-indigo-300'
// // //                         } cursor-pointer`}
// // //                         onClick={() => handleEditEntry(index)}
// // //                       >
// // //                         <div className="flex justify-between items-center">
// // //                           <div>
// // //                             <h4 className="font-medium text-gray-900">
// // //                               {currentStep === 2 ? entry.job_title :
// // //                                currentStep === 3 ? entry.course_name :
// // //                                currentStep === 4 ? entry.title :
// // //                                currentStep === 5 ? entry.name :
// // //                                entry.skills?.join(', ')}
// // //                             </h4>
// // //                             <p className="text-sm text-gray-600">
// // //                               {currentStep === 2 ? entry.company_name :
// // //                                currentStep === 3 ? entry.institution_name :
// // //                                currentStep === 4 ? entry.description :
// // //                                currentStep === 5 ? entry.issuing_organization :
// // //                                entry.proficiency_level}
// // //                             </p>
// // //                           </div>
// // //                           <Icon
// // //                             icon={currentEntryIndex === index ? "mdi:check-circle" : "mdi:chevron-right"}
// // //                             className={`w-5 h-5 ${
// // //                               currentEntryIndex === index ? 'text-indigo-600' : 'text-gray-400'
// // //                             }`}
// // //                           />
// // //                         </div>
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 </div>
// // //               )}

// // //               {currentStep === 0 && (
// // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //                   <div className="md:col-span-2">
// // //                     <Input
// // //                       isRequired
// // //                       label="Professional Headline"
// // //                       placeholder="e.g., Senior Software Engineer"
// // //                       {...register('headline')}
// // //                       errorMessage={errors.headline?.message}
// // //                       isInvalid={!!errors.headline}
// // //                       className="w-full"
// // //                       defaultValue={defaultValues['headline']}
// // //                     />
// // //                   </div>
// // //                   <div className="md:col-span-2">
// // //                     <Textarea
// // //                       isRequired
// // //                       label="Professional Summary"
// // //                       placeholder="Write a brief summary about yourself"
// // //                       {...register('summary')}
// // //                       errorMessage={errors.summary?.message}
// // //                       isInvalid={!!errors.summary}
// // //                       className="w-full"
// // //                       minRows={4}
// // //                       defaultValue={defaultValues['summary']}

// // //                     />
// // //                   </div>
// // //                   <Select
// // //                     isRequired
// // //                     label="Gender"
// // //                     placeholder="Select your gender"
// // //                     {...register('gender')}
// // //                     errorMessage={errors.gender?.message}
// // //                     isInvalid={!!errors.gender}
// // //                     defaultSelectedKeys={[defaultValues['gender']]}
// // //                   >
// // //                     <SelectItem key="male" value="male">Male</SelectItem>
// // //                     <SelectItem key="female" value="female">Female</SelectItem>
// // //                     <SelectItem key="other" value="other">Other</SelectItem>
// // //                   </Select>
// // //                   <Input
// // //                     isRequired
// // //                     type="date"
// // //                     label="Date of Birth"
// // //                     {...register('date_of_birth')}
// // //                     errorMessage={errors.date_of_birth?.message}
// // //                     isInvalid={!!errors.date_of_birth}
// // //                     defaultValue={defaultValues['date_of_birth']?.split("T")[0]}
// // //                   />
// // //                   <Input
// // //                     isRequired
// // //                     type="number"
// // //                     label="Current Salary (USD)"
// // //                     placeholder="Enter your current annual salary"
// // //                     {...register('current_salary', { valueAsNumber: true })}
// // //                     defaultValue={defaultValues['current_salary']}
// // //                     errorMessage={errors.current_salary?.message}
// // //                     isInvalid={!!errors.current_salary}
// // //                     startContent={<span className="text-gray-500">$</span>}
// // //                   />
// // //                   <Input
// // //                     isRequired
// // //                     type="number"
// // //                     label="Expected Salary (USD)"
// // //                     placeholder="Enter your expected annual salary"
// // //                     {...register('expected_salary', { valueAsNumber: true })}
// // //                     defaultValue={defaultValues['expected_salary']}
// // //                     errorMessage={errors.expected_salary?.message}
// // //                     isInvalid={!!errors.expected_salary}
// // //                     startContent={<span className="text-gray-500">$</span>}
// // //                   />
// // //                   <Input
// // //                     isRequired
// // //                     type="number"
// // //                     label="Years of Experience"
// // //                     placeholder="Enter your years of experience"
// // //                     {...register('experience_years', { valueAsNumber: true })}
// // //                     defaultValue={defaultValues['experience_years']}
// // //                     errorMessage={errors.experience_years?.message}
// // //                     isInvalid={!!errors.experience_years}
// // //                   />
// // //                   <Input
// // //                     type="number"
// // //                     label="Notice Period (days)"
// // //                     placeholder="Enter your notice period in days"
// // //                     {...register('notice_period', { valueAsNumber: true })}
// // //                     defaultValue={defaultValues['notice_period']}
// // //                     errorMessage={errors.notice_period?.message}
// // //                     isInvalid={!!errors.notice_period}
// // //                   />
// // //                   <Select
// // //                     isRequired
// // //                     label="Availability Status"
// // //                     placeholder="Select your availability"
// // //                     {...register('availability_status')}
// // //                     errorMessage={errors.availability_status?.message}
// // //                     isInvalid={!!errors.availability_status}
// // //                     defaultSelectedKeys={[defaultValues["availability_status"]]}
// // //                   >
// // //                     <SelectItem key="Available" value="Available">Available</SelectItem>
// // //                     <SelectItem key="Passive" value="Passive">Notice Period</SelectItem>
// // //                     <SelectItem key="Not Available" value="Not Available">Not Available</SelectItem>
// // //                   </Select>
// // //                   <Select
// // //                     isRequired
// // //                     selectionMode='multiple'
// // //                     label="Languages"
// // //                     placeholder='Select one or more languages'
// // //                     {...register('languages')}

// // //                     defaultSelectedKeys={defaultValues['languages']?.split(", ")}
// // //                     errorMessage={errors.languages?.message}
// // //                     isInvalid={!!errors.languages}
// // //                   >
// // //                     {indianLanguages.map((value) => <SelectItem key={value}>{value}</SelectItem>)}

// // //                   </Select>
// // //                 </div>
// // //               )}

// // //               {currentStep === 1 && (
// // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //                   <div className="md:col-span-2">
// // //                     <Input
// // //                       isRequired
// // //                       label="Preferred Job Post"
// // //                       placeholder="e.g., Software Engineer, Project Manager"
// // //                       defaultValue={defaultValues['preferredJobPost']}
// // //                       {...register('preferredJobPost')}
// // //                       errorMessage={errors.preferredJobPost?.message}
// // //                       isInvalid={!!errors.preferredJobPost}
// // //                     />
// // //                   </div>
// // //                   <Select
// // //                     label="Preferred Job Type"
// // //                     isRequired
// // //                     placeholder="Select job type"
// // //                     defaultSelectedKeys={[defaultValues['preferredJobType']]}
// // //                     {...register('preferredJobType')}
// // //                     errorMessage={errors.preferredJobType?.message}
// // //                     isInvalid={!!errors.preferredJobType}
// // //                   >
// // //                     <SelectItem key="Full-time" value="Full-time">Full-time</SelectItem>
// // //                     <SelectItem key="Part-time" value="Part-time">Part-time</SelectItem>
// // //                     <SelectItem key="Contract" value="Contract">Contract</SelectItem>
// // //                     <SelectItem key="Internship" value="Internship">Internship</SelectItem>
// // //                     <SelectItem key="Freelance" value="Freelance">Freelance</SelectItem>
// // //                   </Select>
// // //                   <Input
// // //                     isRequired
// // //                     label="Preferred Location"
// // //                     placeholder="Enter preferred location"
// // //                     {...register('preferredLocation')}
// // //                     defaultValue={defaultValues['preferredLocation']}
// // //                     errorMessage={errors.preferredLocation?.message}
// // //                     isInvalid={!!errors.preferredLocation}
// // //                   />
// // //                   <Input
// // //                     isRequired
// // //                     label="Industry Interest"
// // //                     placeholder="e.g., Technology, Healthcare, Finance"
// // //                     {...register('industryInterest')}
// // //                     defaultValue={defaultValues['industryInterest']}
// // //                     errorMessage={errors.industryInterest?.message}
// // //                     isInvalid={!!errors.industryInterest}
// // //                   />
// // //                   <Select
// // //                     isRequired
// // //                     label="Working Hours Preference"
// // //                     placeholder="Select working hours"
// // //                     {...register('workingHoursPreference')}
// // //                     errorMessage={errors.workingHoursPreference?.message}
// // //                     isInvalid={!!errors.workingHoursPreference}
// // //                     defaultSelectedKeys={[defaultValues['workingHoursPreference']]}
// // //                   >
// // //                     <SelectItem key="Day Shift" value="Day Shift">Day Shift</SelectItem>
// // //                     <SelectItem key="Night Shift" value="Night Shift">Night Shift</SelectItem>
// // //                     <SelectItem key="Flexible" value="Flexible">Flexible</SelectItem>
// // //                   </Select>
// // //                   <Select
// // //                     isRequired
// // //                     label="Preferred Company Size"
// // //                     placeholder="Select company size"
// // //                     {...register('preferredCompanySize')}
// // //                     defaultSelectedKeys={[defaultValues['preferredCompanySize']]}
// // //                     errorMessage={errors.preferredCompanySize?.message}
// // //                     isInvalid={!!errors.preferredCompanySize}
// // //                   >
// // //                     <SelectItem key="startup" value="startup">Startup (1-50)</SelectItem>
// // //                     <SelectItem key="small" value="small">Small (51-200)</SelectItem>
// // //                     <SelectItem key="medium" value="medium">Medium (201-1000)</SelectItem>
// // //                     <SelectItem key="large" value="large">Large (1000+)</SelectItem>
// // //                   </Select>
// // //                   <Select
// // //                     isRequired
// // //                     label="Employment Mode"
// // //                     placeholder="Select employment mode"
// // //                     {...register('employmentMode')}
// // //                     defaultSelectedKeys={[defaultValues['employmentMode']]}
// // //                     errorMessage={errors.employmentMode?.message}
// // //                     isInvalid={!!errors.employmentMode}
// // //                   >
// // //                     <SelectItem key="Remote" value="Remote">Remote</SelectItem>
// // //                     <SelectItem key="Hybrid" value="Hybrid">Hybrid</SelectItem>
// // //                     <SelectItem key="On-site" value="On-site">On-site</SelectItem>
// // //                   </Select>
// // //                   <Checkbox isRequired {...register('willingToRelocate')} color='primary'> I am willing to relocate for the right opportunity
// // //                   </Checkbox>
// // //                 </div>
// // //               )}

// // //               {currentStep === 2 && (
// // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //                   <div className="md:col-span-2">
// // //                     <Input
// // //                       isRequired
// // //                       label="Company Name"
// // //                       placeholder="Enter company name"
// // //                       {...register('companyName')}
// // //                       defaultValue={defaultValues['companyName']}
// // //                       errorMessage={errors.company_name?.message}
// // //                       isInvalid={!!errors.company_name}
// // //                     />
// // //                   </div>
// // //                   <div className="md:col-span-2">
// // //                     <Input
// // //                       isRequired
// // //                       label="Job Title"
// // //                       placeholder="Enter job title"
// // //                       {...register('position')}
// // //                       defaultValue={defaultValues['postion']}
// // //                       errorMessage={errors.position?.message}
// // //                       isInvalid={!!errors.position}
// // //                     />
// // //                   </div>
// // //                   <Input
// // //                     isRequired
// // //                     type="date"
// // //                     label="Start Date"
// // //                     {...register('startDate')}
// // //                     defaultValue={defaultValues['startDate']}
// // //                     errorMessage={errors.start_date?.message}
// // //                     isInvalid={!!errors.start_date}
// // //                   />
// // //                   {!watch('is_current_job', false) && (
// // //                     <Input
// // //                       isRequired
// // //                       type="date"
// // //                       label="End Date"
// // //                       {...register('endDate')}
// // //                       defaultValue={defaultValues['endDate']}
// // //                       errorMessage={errors.end_date?.message}
// // //                       isInvalid={!!errors.end_date}
// // //                     />
// // //                   )}
// // //                   {/* <div className="md:col-span-2 flex items-center gap-2">
// // //                     <input
// // //                       type="checkbox"
// // //                       id="is-current-job"
// // //                       {...register('is_current_job')}
// // //                       className="w-5 h-5 rounded text-indigo-600"
// // //                     />
// // //                     <label htmlFor="is-current-job" className="text-gray-700">
// // //                       I currently work here
// // //                     </label>
// // //                   </div> */}
// // //                   <Checkbox className='md:col-span-2' {...register('is_current_job')}>I currently work here</Checkbox>
// // //                   <div className="md:col-span-2">
// // //                     <Textarea
// // //                       isRequired
// // //                       label="Description"
// // //                       placeholder="Describe your responsibilities and achievements"
// // //                       defaultValue={defaultValues['description']}
// // //                       {...register('description')}
// // //                       errorMessage={errors.description?.message}
// // //                       minRows={4}
// // //                       isInvalid={!!errors.description}
// // //                     />
// // //                   </div>
// // //                   <Input
// // //                     isRequired
// // //                     label="Location"
// // //                     placeholder="Enter work location"
// // //                     {...register('location')}
// // //                     errorMessage={errors.location?.message}
// // //                     defaultValue={defaultValues['location']}
// // //                     isInvalid={!!errors.location}
// // //                   />
// // //                   <Select
// // //                     isRequired
// // //                     label="Employment Type"
// // //                     placeholder="Select employment type"
// // //                     {...register('employmentType')}
// // //                     errorMessage={errors.employment_type?.message}
// // //                     defaultValue={defaultValues['employmentType']}
// // //                     isInvalid={!!errors.employment_type}
// // //                   >
// // //                     <SelectItem key="full_time" value="full_time">Full-time</SelectItem>
// // //                     <SelectItem key="part_time" value="part_time">Part-time</SelectItem>
// // //                     <SelectItem key="contract" value="contract">Contract</SelectItem>
// // //                     <SelectItem key="internship" value="internship">Internship</SelectItem>
// // //                     <SelectItem key="freelance" value="freelance">Freelance</SelectItem>
// // //                   </Select>
// // //                 </div>
// // //               )}

// // //               {currentStep === 3 && (
// // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //                   <Select
// // //                     isRequired
// // //                     label="Education Level"
// // //                     placeholder="Select education level"
// // //                     {...register('education_level')}
// // //                     errorMessage={errors.education_level?.message}
// // //                     defaultValue={defaultValues['education_level']}
// // //                     isInvalid={!!errors.education_level}
// // //                   >
// // //                     <SelectItem key="high_school" value="high_school">High School</SelectItem>
// // //                     <SelectItem key="diploma" value="diploma">Diploma</SelectItem>
// // //                     <SelectItem key="bachelors" value="bachelors">Bachelor's Degree</SelectItem>
// // //                     <SelectItem key="masters" value="masters">Master's Degree</SelectItem>
// // //                     <SelectItem key="phd" value="phd">PhD</SelectItem>
// // //                   </Select>
// // //                   <div className="md:col-span-2">
// // //                     <Input
// // //                       isRequired
// // //                       label="Course Name"
// // //                       placeholder="Enter course name"
// // //                       {...register('course_name')}
// // //                       errorMessage={errors.course_name?.message}
// // //                       defaultValue={defaultValues['course_name']}
// // //                       isInvalid={!!errors.course_name}
// // //                     />
// // //                   </div>
// // //                   <Input
// // //                     isRequired
// // //                     label="Specialization"
// // //                     placeholder="Enter specialization (optional)"
// // //                     {...register('specialization')}
// // //                     errorMessage={errors.specialization?.message}
// // //                     defaultValue={defaultValues['specialization']}
// // //                     isInvalid={!!errors.specialization}
// // //                   />
// // //                   <div className="md:col-span-2">
// // //                     <Input
// // //                       isRequired
// // //                       label="Institution Name"
// // //                       placeholder="Enter institution name"
// // //                       {...register('institution_name')}
// // //                       errorMessage={errors.institution_name?.message}
// // //                       defaultValue={defaultValues['institution_name']}
// // //                       isInvalid={!!errors.institution_name}
// // //                     />
// // //                   </div>
// // //                   <Input
// // //                     isRequired
// // //                     type="date"
// // //                     label="Start Date"
// // //                     {...register('start_date')}
// // //                     errorMessage={errors.start_date?.message}
// // //                     defaultValue={defaultValues['start_date']}
// // //                     isInvalid={!!errors.start_date}
// // //                   />
// // //                   {!watch('is_currently_studying', false) && (
// // //                     <Input
// // //                       isRequired
// // //                       type="date"
// // //                       label="End Date"
// // //                       {...register('end_date')}
// // //                       errorMessage={errors.end_date?.message}
// // //                       defaultValue={defaultValues['end_date']}
// // //                       isInvalid={!!errors.end_date}
// // //                     />
// // //                   )}
// // //                   <Checkbox {...register('is_currently_studying')}>
// // //                     I am currently studying here
// // //                   </Checkbox>
// // //                   <Input
// // //                     isRequired
// // //                     label="Grade"
// // //                     placeholder="Enter grade (optional)"
// // //                     {...register('grade')}
// // //                     errorMessage={errors.grade?.message}
// // //                     defaultValue={defaultValues['grade']}
// // //                     isInvalid={!!errors.grade}
// // //                   />
// // //                   <div className="md:col-span-2">
// // //                     <Textarea
// // //                       isRequired
// // //                       label="Description"
// // //                       placeholder="Additional details about your education"
// // //                       {...register('description')}
// // //                       errorMessage={errors.description?.message}
// // //                       defaultValue={defaultValues['description']}
// // //                       minRows={3}
// // //                       isInvalid={!!errors.description}
// // //                     />
// // //                   </div>
// // //                 </div>
// // //               )}

// // //               {currentStep === 4 && (
// // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //                   <div className="md:col-span-2">
// // //                     <Input
// // //                       isRequired
// // //                       label="Project Title"
// // //                       placeholder="Enter project title"
// // //                       {...register('title')}
// // //                       errorMessage={errors.title?.message}
// // //                       defaultValue={defaultValues['title']}
// // //                       isInvalid={!!errors.title}
// // //                     />
// // //                   </div>
// // //                   <div className="md:col-span-2">
// // //                     <Textarea
// // //                       isRequired
// // //                       label="Description"
// // //                       placeholder="Describe your project, its purpose, and your role"
// // //                       {...register('description')}
// // //                       errorMessage={errors.description?.message}
// // //                       defaultValue={defaultValues['description']}
// // //                       minRows={4}
// // //                       isInvalid={!!errors.description}
// // //                     />
// // //                   </div>
// // //                   <Input
// // //                     isRequired
// // //                     type="date"
// // //                     label="Start Date"
// // //                     {...register('start_date')}
// // //                     errorMessage={errors.start_date?.message}
// // //                     defaultValue={defaultValues['start_date']}
// // //                     isInvalid={!!errors.start_date}
// // //                   />
// // //                   {!watch('is_current_project', false) && (
// // //                     <Input
// // //                       isRequired
// // //                       type="date"
// // //                       label="End Date"
// // //                       {...register('end_date')}
// // //                       errorMessage={errors.end_date?.message}
// // //                       defaultValue={defaultValues['end_date']}
// // //                       isInvalid={!!errors.end_date}
// // //                     />
// // //                   )}
// // //                   <Checkbox {...register('is_current_project')}>
// // //                     This is an ongoing project
// // //                   </Checkbox>
// // //                   <div className="md:col-span-2">
// // //                     <Input
// // //                       isRequired
// // //                       label="Project URL"
// // //                       placeholder="Enter project URL (optional)"
// // //                       {...register('project_url')}
// // //                       errorMessage={errors.project_url?.message}
// // //                       defaultValue={defaultValues['project_url']}
// // //                       isInvalid={!!errors.project_url}
// // //                     />
// // //                   </div>
// // //                   <div className="md:col-span-2">
// // //                     <Input
// // //                       isRequired
// // //                       label="Technologies"
// // //                       placeholder="Enter technologies used (comma-separated)"
// // //                       {...register('technologies')}
// // //                       errorMessage={errors.technologies?.message}
// // //                       defaultValue={defaultValues['technologies']}
// // //                       isInvalid={!!errors.technologies}
// // //                     />
// // //                   </div>
// // //                 </div>
// // //               )}

// // //               {currentStep === 5 && (
// // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //                   <div className="md:col-span-2">
// // //                     <Input
// // //                       isRequired
// // //                       label="Certification Name"
// // //                       placeholder="Enter certification name"
// // //                       {...register('name')}
// // //                       errorMessage={errors.name?.message}
// // //                       defaultValue={defaultValues['name']}
// // //                       isInvalid={!!errors.name}
// // //                     />
// // //                   </div>
// // //                   <div className="md:col-span-2">
// // //                     <Input
// // //                       isRequired
// // //                       label="Issuing Organization"
// // //                       placeholder="Enter issuing organization"
// // //                       {...register('issuing_organization')}
// // //                       errorMessage={errors.issuing_organization?.message}
// // //                       defaultValue={defaultValues['issuing_organization']}
// // //                       isInvalid={!!errors.issuing_organization}
// // //                     />
// // //                   </div>
// // //                   <Input
// // //                     isRequired
// // //                     type="date"
// // //                     label="Issue Date"
// // //                     {...register('issue_date')}
// // //                     errorMessage={errors.issue_date?.message}
// // //                     defaultValue={defaultValues['issue_date']}
// // //                     isInvalid={!!errors.issue_date}
// // //                   />
// // //                   <Input
// // //                     isRequired
// // //                     type="date"
// // //                     label="Expiry Date (if applicable)"
// // //                     placeholder="Enter expiry date (optional)"
// // //                     {...register('expiry_date')}
// // //                     errorMessage={errors.expiry_date?.message}
// // //                     defaultValue={defaultValues['expiry_date']}
// // //                     isInvalid={!!errors.expiry_date}
// // //                   />
// // //                   <Input
// // //                     isRequired
// // //                     label="Credential ID"
// // //                     placeholder="Enter credential ID (optional)"
// // //                     {...register('credential_id')}
// // //                     errorMessage={errors.credential_id?.message}
// // //                     defaultValue={defaultValues['credential_id']}
// // //                     isInvalid={!!errors.credential_id}
// // //                   />
// // //                   <div className="md:col-span-2">
// // //                     <Input
// // //                       isRequired
// // //                       label="Credential URL"
// // //                       placeholder="Enter credential URL (optional)"
// // //                       {...register('credential_url')}
// // //                       errorMessage={errors.credential_url?.message}
// // //                       defaultValue={defaultValues['credential_url']}
// // //                       isInvalid={!!errors.credential_url}
// // //                     />
// // //                   </div>
// // //                 </div>
// // //               )}

// // //               {currentStep === 6 && (
// // //                 <div className="space-y-8">
// // //                   <div>
// // //                     <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
// // //                     <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
// // //                       <p className="text-sm text-gray-600 mb-4">Add your technical and professional skills that are relevant to your career path.</p>
// // //                       <Input
// // //                         isRequired
// // //                         label="Skills"
// // //                         placeholder="Enter a skill"
// // //                         {...register('name')}
// // //                         errorMessage={errors.skills?.message}
// // //                         isInvalid={!!errors.skills}
// // //                         defaultValue={defaultValues['name']}
// // //                         className="mb-4"
// // //                       />
// // //                       <Select
// // //                         isRequired
// // //                         label="Overall Proficiency Level"
// // //                         placeholder="Select your proficiency level"
// // //                         {...register('proficiency_level')}
// // //                         errorMessage={errors.proficiency_level?.message}
// // //                         isInvalid={!!errors.proficiency_level}
// // //                         defaultSelectedKeys={[defaultValues['proficiency_level']]}
// // //                       >
// // //                         <SelectItem key="beginner" value="beginner">Beginner</SelectItem>
// // //                         <SelectItem key="intermediate" value="intermediate">Intermediate</SelectItem>
// // //                         <SelectItem key="advanced" value="advanced">Advanced</SelectItem>
// // //                         <SelectItem key="expert" value="expert">Expert</SelectItem>
// // //                       </Select>
// // //                       <Input
// // //                         isRequired
// // //                         label="Years of Experience in this skill"
// // //                         placeholder="Enter a proficiency level"
// // //                         {...register('yearsOfExperience')}
// // //                         defaultValue={defaultValues['yearsOfExperience']}
// // //                         errorMessage={errors.yearsOfExperience?.message}
// // //                         isInvalid={!!errors.yearsOfExperience}
// // //                       />
// // //                     </div>
// // //                   </div>

// // //                   <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
// // //                     <div className="flex items-center gap-3 mb-4">
// // //                       <Icon icon="mdi:lightbulb" className="text-indigo-600 w-6 h-6" />
// // //                       <h3 className="text-lg font-medium text-indigo-900">Skills Tips</h3>
// // //                     </div>
// // //                     <ul className="space-y-2 text-sm text-indigo-800">
// // //                       <li className="flex items-start gap-2">
// // //                         <Icon icon="mdi:check-circle" className="text-indigo-600 w-5 h-5 mt-0.5" />
// // //                         <span>Include both technical and soft skills</span>
// // //                       </li>
// // //                       <li className="flex items-start gap-2">
// // //                         <Icon icon="mdi:check-circle" className="text-indigo-600 w-5 h-5 mt-0.5" />
// // //                         <span>Be specific with technical skills (e.g., "React.js" instead of just "JavaScript")</span>
// // //                       </li>
// // //                       <li className="flex items-start gap-2">
// // //                         <Icon icon="mdi:check-circle" className="text-indigo-600 w-5 h-5 mt-0.5" />
// // //                         <span>List skills that are relevant to your target job positions</span>
// // //                       </li>
// // //                     </ul>
// // //                   </div>
// // //                 </div>
// // //               )}

// // //               {currentStep === 7 && (
// // //                 <div className="space-y-8">
// // //                   <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
// // //                     <div className="flex items-center justify-between mb-4">
// // //                       <h3 className="text-lg font-medium text-gray-900">Upload Your Resume</h3>
// // //                       <div className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">Recommended</div>
// // //                     </div>
// // //                     <p className="text-sm text-gray-600 mb-6">Upload your existing resume or CV in PDF, DOC, or DOCX format.</p>

// // //                     <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-8 rounded-lg bg-white">
// // //                       <Icon icon="mdi:cloud-upload" className="w-12 h-12 text-gray-400 mb-3" />
// // //                       <input
// // //                         type="file"
// // //                         accept=".pdf,.doc,.docx"
// // //                         onChange={(e) => {
// // //                           const file = e.target.files[0];
// // //                           if (file) {
// // //                             register('resume_file').onChange(e);
// // //                             setResumeFileName(file.name);
// // //                           }
// // //                         }}
// // //                         className="hidden"
// // //                         id="resume-upload"
// // //                       />
// // //                       <label
// // //                         htmlFor="resume-upload"
// // //                         className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors mb-2"
// // //                       >
// // //                         Select File
// // //                       </label>
// // //                       <p className="text-sm text-gray-500">
// // //                         {resumeFileName ?
// // //                           <span className="text-green-600 font-medium">{resumeFileName}</span> :
// // //                           "Supported formats: PDF, DOC, DOCX"}
// // //                       </p>
// // //                     </div>

// // //                     <div className="mt-8 pt-6 border-t border-gray-200">
// // //                       <div className="flex items-center gap-2">
// // //                         <input
// // //                           type="checkbox"
// // //                           id="generate-resume"
// // //                           {...register('generate_resume')}
// // //                           className="w-5 h-5 rounded text-indigo-600"
// // //                         />
// // //                         <div>
// // //                           <label htmlFor="generate-resume" className="text-gray-800 font-medium">
// // //                             Generate resume from my profile
// // //                           </label>
// // //                           <p className="text-sm text-gray-600 mt-1">
// // //                             Don't have a resume? We'll create one for you based on the information you've provided.
// // //                           </p>
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                   </div>

// // //                   {watch('generate_resume', false) && (
// // //                     <div className="bg-green-50 p-6 rounded-lg border border-green-100">
// // //                       <div className="flex items-center gap-3 mb-2">
// // //                         <Icon icon="mdi:check-circle" className="text-green-600 w-6 h-6" />
// // //                         <h3 className="text-lg font-medium text-green-900">Resume Generation Selected</h3>
// // //                       </div>
// // //                       <p className="text-sm text-green-800 ml-9">
// // //                         Your resume will be automatically generated based on your profile information.
// // //                       </p>
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               )}

// // //               <div className="flex justify-between mt-10 pt-6 border-t border-gray-200">
// // //                 <Button
// // //                   color="default"
// // //                   variant="flat"
// // //                   onPress={handlePrevious}
// // //                   isDisabled={currentStep === 0}
// // //                   startContent={<Icon icon="mdi:arrow-left" className="w-4 h-4" />}
// // //                   className="px-5"
// // //                 >
// // //                   Previous
// // //                 </Button>
// // //                 <Button
// // //                   color="primary"
// // //                   type={"submit"}
// // //                   isLoading={isSubmitting}
// // //                   endContent={currentStep === steps.length - 1 ? <Icon icon="mdi:check" className="w-4 h-4" /> : <Icon icon="mdi:arrow-right" className="w-4 h-4" />}
// // //                   className="bg-indigo-600 hover:bg-indigo-700 px-6"
// // //                 >
// // //                   {currentStep === steps.length - 1 ? 'Complete Profile' : 'Next Step'}
// // //                 </Button>
// // //               </div>
// // //             </form>
// // //           </CardBody>
// // //         </Card>

// // //         {/* Helpful tip at the bottom */}
// // //         <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3">
// // //           <Icon icon="mdi:information" className="text-blue-600 w-6 h-6 mt-1" />
// // //           <div>
// // //             <h4 className="font-medium text-blue-900">Need help?</h4>
// // //             <p className="text-sm text-blue-800 mt-1">
// // //               You can save your progress and come back later. All information will be saved as you complete each section.
// // //             </p>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // "use client";
// // import React, { useState, useEffect } from 'react';
// // import { useForm, useFieldArray } from 'react-hook-form';
// // import { zodResolver } from '@hookform/resolvers/zod';
// // import { z } from 'zod';
// // import {
// //   Card,
// //   CardBody,
// //   CardHeader,
// //   Button,
// //   Input,
// //   Textarea,
// //   Select,
// //   SelectItem,
// //   Checkbox,
// //   Progress,
// //   Divider,
// //   Chip,
// //   Modal,
// //   ModalContent,
// //   ModalHeader,
// //   ModalBody,
// //   ModalFooter,
// //   useDisclosure
// // } from '@heroui/react';
// // import { Icon } from '@iconify/react';
// // import {
// //   createJobSeekerProfile,
// //   updateJobSeekerProfile,
// //   createExperience,
// //   createEducation,
// //   createProject,
// //   createCertification,
// //   addSkill,
// //   updateCertification,
// //   updateEducation,
// //   updateExperience,
// //   updateProject,
// //   updateSkill
// // } from '@/services/jobSeekerService';

// // // Form schemas
// // const personalInfoSchema = z.object({
// //   headline: z.string().min(1, 'Headline is required'),
// //   summary: z.string().min(1, 'Summary is required'),
// //   gender: z.enum(['male', 'female', 'other'],{
// //     required_error: 'Gender is required',
// //     invalid_type_error: 'Gender must be a string'
// //   }),
// //   date_of_birth: z.date().min(new Date(Date.now()), 'Date of birth cannot be in future'),
// //   current_salary: z.number().min(0, 'Current salary must be positive'),
// //   expected_salary: z.number().min(0, 'Expected salary must be positive'),
// //   experience_years: z.number().min(0, 'Experience years must be positive'),
// //   notice_period: z.number().min(0, 'Notice period must be positive'),
// //   availability_status: z.enum(["Available", "Not Available", "Passive"],{
// //     required_error: 'Availability status is required',
// //     invalid_type_error: 'Availability status must be a string'
// //   }),
// //   languages: z.union([
// //     z.string().min(3, 'At least one language is required'),
// //     z.array(z.string()).min(1, 'At least one language is required')
// //   ]),
// // });

// // const preferencesSchema = z.object({
// //   preferredJobPost: z.string().min(1, 'Preferred job post is required'),
// //   preferredJobType: z.enum(["Full-time", "Part-time", "Contract", "Freelance", "Internship"],{
// //     required_error: 'Preferred job type is required',
// //     invalid_type_error: 'Preferred job type must be a string'
// //   }),
// //   preferredLocation: z.string().min(1, 'Preferred location is required'),
// //   industryInterest: z.string().min(1, 'Industry interest is required'),
// //   workingHoursPreference: z.enum(['Day shift', 'Night shift', 'Flexible'],{
// //     required_error: 'Working hours preference is required',
// //     invalid_type_error: 'Working hours preference must be a string'
// //   }),
// //   preferredCompanySize: z.enum(['1-10', '11-50', '51-100', '101-500', '501-1000', '1001-5000', '5001-10000', '10001-50000', '50001-100000', '100001-500000', '500001-1000000'],{
// //     required_error: 'Preferred company size is required',
// //     invalid_type_error: 'Preferred company size must be a string'
// //   }),
// //   willingToRelocate: z.boolean(),
// //   employmentMode: z.enum(["Hybrid", "On-site", "Remote"],{
// //     required_error: 'Employment mode is required',
// //     invalid_type_error: 'Employment mode must be a string'
// //   }),
// // });

// // const experienceSchema = z.object({
// //   companyName: z.string().min(1, 'Company name is required'),
// //   jobTitle: z.string().min(1, 'Job title is required'),
// //   startDate: z.string().min(1, 'Start date is required'),
// //   endDate: z.string().optional(),
// //   isCurrentJob: z.boolean(),
// //   description: z.string().min(1, 'Description is required'),
// //   location: z.string().min(1, 'Location is required'),
// //   employmentType: z.enum(["Full Time", "Part Time", "Contract", "Freelance", "Internship"],{
// //     required_error: 'Employment type is required',
// //     invalid_type_error: 'Employment type must be a string'
// //   }),
// //   workMode: z.enum(["Hybrid", "On-site", "Remote"],{
// //     required_error: 'Work mode is required',
// //     invalid_type_error: 'Work mode must be a string'
// //   }),
// // });

// // const educationSchema = z.object({
// //   educationLevel: z.enum(["Doctorate", "Masters", "Bachelors", "Diploma", "High School", "Other"],{
// //     required_error: 'Education level is required',
// //     invalid_type_error: 'Education level must be a string'
// //   }),
// //   courseName: z.string().min(1, 'Course name is required'),
// //   courseType: z.enum(["Full Time", "Part Time", "Online", "Other",],{
// //     required_error: 'Course type is required',
// //     invalid_type_error: 'Course type must be a string'
// //   }),
// //   courseDuration: z.number().min(0, 'Course duration must be positive'),
// //   specialization: z.string().optional(),
// //   institutionName: z.string().min(1, 'Institution name is required'),
// //   startDate: z.string().min(1, 'Start date is required'),
// //   endDate: z.string().optional(),
// //   isCurrentlyStudying: z.boolean(),
// //   gradingSystem: z.enum(["GPA", "Percentage", "CGPA", "Other"],{
// //     required_error: 'Grading system is required',
// //     invalid_type_error: 'Grading system must be a string'
// //   }),
// //   grade: z.string().optional(),
// //   description: z.string().optional(),
// // });

// // const projectSchema = z.object({
// //   projectTitle: z.string().min(1, 'Project title is required'),
// //   clientName: z.string().optional().min(1, 'Client name is required'),
// //   projectDetails: z.string().optional().min(1, 'Project details is required'),
// //   startDate: z.string().min(1, 'Start date is required'),
// //   endDate: z.string().optional(),
// //   isCurrentProject: z.boolean(),
// //   gitRepoLink: z.string().url().optional(),
// // });

// // const certificationSchema = z.object({
// //   name: z.string().min(1, 'Certification name is required'),
// //   issuingOrganization: z.string().min(1, 'Issuing organization is required'),
// //   issueDate: z.string().min(1, 'Issue date is required'),
// //   expiryDate: z.string().optional(),
// //   credentialId: z.string().optional(),
// //   credentialUrl: z.string().url().optional(),
// //   description: z.string().optional(),
// // });

// // const skillsSchema = z.object({
// //   name: z.string().min(1, 'At least one skill is required'),
// //   category: z.string().optional(),
// //   proficiencyLevel: z.string().min(1, 'Proficiency level is required'),
// //   yearsOfExperience: z.number().min(0, 'Years of experience must be positive'),
// // });

// // const ProfileCompletionForm = () => {
// //   const [currentStep, setCurrentStep] = useState(0);
// //   const [loading, setLoading] = useState(false);
// //   const [savedData, setSavedData] = useState({});
// //   const { isOpen, onOpen, onClose } = useDisclosure();
// //   const [modalData, setModalData] = useState({ title: '', message: '', type: 'success' });

// //   const steps = [
// //     { title: 'Personal Info', icon: 'mdi:account', schema: personalInfoSchema },
// //     { title: 'Preferences', icon: 'mdi:settings', schema: preferencesSchema },
// //     { title: 'Experience', icon: 'mdi:briefcase', schema: experienceSchema },
// //     { title: 'Education', icon: 'mdi:school', schema: educationSchema },
// //     { title: 'Projects', icon: 'mdi:code-tags', schema: projectSchema },
// //     { title: 'Certifications', icon: 'mdi:certificate', schema: certificationSchema },
// //     { title: 'Skills', icon: 'mdi:skill', schema: skillsSchema }
// //   ];

// //   const {
// //     register,
// //     handleSubmit,
// //     formState: { errors },
// //     reset,
// //     watch,
// //     setValue,
// //     control
// //   } = useForm({
// //     resolver: zodResolver(steps[currentStep].schema),
// //     defaultValues: savedData[currentStep] || {}
// //   });

// //   const { fields: techFields, append: appendTech, remove: removeTech } = useFieldArray({
// //     control,
// //     name: 'technologies'
// //   });

// //   const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
// //     control,
// //     name: 'skills'
// //   });

// //   const watchCurrentJob = watch('is_current_job');
// //   const watchCurrentStudy = watch('is_currently_studying');
// //   const watchCurrentProject = watch('is_current_project');

// //   useEffect(() => {
// //     const stepData = savedData[currentStep];
// //     if (stepData) {
// //       Object.keys(stepData).forEach(key => {
// //         setValue(key, stepData[key]);
// //       });
// //     } else {
// //       reset();
// //     }
// //   }, [currentStep, savedData, setValue, reset]);

// //   const showModal = (title, message, type = 'success') => {
// //     setModalData({ title, message, type });
// //     onOpen();
// //   };

// //   const handleStepSubmit = async (data) => {
// //     setLoading(true);
// //     try {
// //       let response;
// //       const isUpdate = savedData[currentStep]?.id;

// //       switch (currentStep) {
// //         case 0: // Personal Info
// //           response = isUpdate
// //             ? await updateJobSeekerProfile(data)
// //             : await createJobSeekerProfile(data);
// //           break;
// //         case 1: // Preferences
// //           response = isUpdate
// //             ? await updateJobSeekerProfile(data)
// //             : await createJobSeekerProfile(data);
// //           break;
// //         case 2: // Experience
// //           response = isUpdate
// //             ? await updateExperience(savedData[currentStep].id, data)
// //             : await createExperience(data);
// //           break;
// //         case 3: // Education
// //           response = isUpdate
// //             ? await updateEducation(savedData[currentStep].id, data)
// //             : await createEducation(data);
// //           break;
// //         case 4: // Projects
// //           response = isUpdate
// //             ? await updateProject(savedData[currentStep].id, data)
// //             : await createProject(data);
// //           break;
// //         case 5: // Certifications
// //           response = isUpdate
// //             ? await updateCertification(savedData[currentStep].id, data)
// //             : await createCertification(data);
// //           break;
// //         case 6: // Skills
// //           response = isUpdate
// //             ? await updateSkill(savedData[currentStep].id, data)
// //             : await addSkill(data);
// //           break;
// //       }

// //       if (response.data.success) {
// //         setSavedData(prev => ({
// //           ...prev,
// //           [currentStep]: response.data[Object.keys(response.data).find(key => key !== 'success')]
// //         }));

// //         showModal('Success!', 'Data saved successfully');

// //         if (currentStep < steps.length - 1) {
// //           setCurrentStep(currentStep + 1);
// //         }
// //       }
// //     } catch (error) {
// //       showModal('Error!', error.response?.data?.message || 'Something went wrong', 'error');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const nextStep = () => {
// //     if (currentStep < steps.length - 1) {
// //       setCurrentStep(currentStep + 1);
// //     }
// //   };

// //   const prevStep = () => {
// //     if (currentStep > 0) {
// //       setCurrentStep(currentStep - 1);
// //     }
// //   };

// //   const renderPersonalInfo = () => (
// //     <div className="space-y-4">
// //       <Input
// //         label="Professional Headline"
// //         placeholder="e.g., Senior Software Engineer"
// //         {...register('headline')}
// //         isInvalid={!!errors.headline}
// //         errorMessage={errors.headline?.message}
// //       />

// //       <Textarea
// //         label="Professional Summary"
// //         placeholder="Brief overview of your professional background..."
// //         {...register('summary')}
// //         isInvalid={!!errors.summary}
// //         errorMessage={errors.summary?.message}
// //       />

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //         <Select
// //           label="Gender"
// //           placeholder="Select gender"
// //           {...register('gender')}
// //           isInvalid={!!errors.gender}
// //           errorMessage={errors.gender?.message}
// //         >
// //           <SelectItem key="male" value="male">Male</SelectItem>
// //           <SelectItem key="female" value="female">Female</SelectItem>
// //           <SelectItem key="other" value="other">Other</SelectItem>
// //         </Select>

// //         <Input
// //           type="date"
// //           label="Date of Birth"
// //           {...register('date_of_birth')}
// //           isInvalid={!!errors.date_of_birth}
// //           errorMessage={errors.date_of_birth?.message}
// //         />
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //         <Input
// //           type="number"
// //           label="Current Salary"
// //           placeholder="0"
// //           {...register('current_salary', { valueAsNumber: true })}
// //           isInvalid={!!errors.current_salary}
// //           errorMessage={errors.current_salary?.message}
// //         />

// //         <Input
// //           type="number"
// //           label="Expected Salary"
// //           placeholder="0"
// //           {...register('expected_salary', { valueAsNumber: true })}
// //           isInvalid={!!errors.expected_salary}
// //           errorMessage={errors.expected_salary?.message}
// //         />
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //         <Input
// //           type="number"
// //           label="Years of Experience"
// //           placeholder="0"
// //           {...register('experience_years', { valueAsNumber: true })}
// //           isInvalid={!!errors.experience_years}
// //           errorMessage={errors.experience_years?.message}
// //         />

// //         <Input
// //           type="number"
// //           label="Notice Period (days)"
// //           placeholder="30"
// //           {...register('notice_period', { valueAsNumber: true })}
// //           isInvalid={!!errors.notice_period}
// //           errorMessage={errors.notice_period?.message}
// //         />
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //         <Select
// //           label="Availability Status"
// //           placeholder="Select availability"
// //           {...register('availability_status')}
// //           isInvalid={!!errors.availability_status}
// //           errorMessage={errors.availability_status?.message}
// //         >
// //           <SelectItem key="immediately" value="immediately">Immediately Available</SelectItem>
// //           <SelectItem key="within_week" value="within_week">Within a Week</SelectItem>
// //           <SelectItem key="within_month" value="within_month">Within a Month</SelectItem>
// //           <SelectItem key="notice_period" value="notice_period">Serving Notice Period</SelectItem>
// //         </Select>

// //         <Input
// //           label="Languages (comma separated)"
// //           placeholder="English, Hindi, Spanish"
// //           {...register('languages')}
// //           isInvalid={!!errors.languages}
// //           errorMessage={errors.languages?.message}
// //         />
// //       </div>
// //     </div>
// //   );

// //   const renderPreferences = () => (
// //     <div className="space-y-4">
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //         <Input
// //           label="Preferred Job Position"
// //           placeholder="e.g., Software Engineer"
// //           {...register('preferredJobPost')}
// //           isInvalid={!!errors.preferredJobPost}
// //           errorMessage={errors.preferredJobPost?.message}
// //         />

// //         <Select
// //           label="Preferred Job Type"
// //           placeholder="Select job type"
// //           {...register('preferredJobType')}
// //           isInvalid={!!errors.preferredJobType}
// //           errorMessage={errors.preferredJobType?.message}
// //         >
// //           <SelectItem key="full_time" value="full_time">Full Time</SelectItem>
// //           <SelectItem key="part_time" value="part_time">Part Time</SelectItem>
// //           <SelectItem key="contract" value="contract">Contract</SelectItem>
// //           <SelectItem key="freelance" value="freelance">Freelance</SelectItem>
// //         </Select>
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //         <Input
// //           label="Preferred Location"
// //           placeholder="e.g., New York, Remote"
// //           {...register('preferredLocation')}
// //           isInvalid={!!errors.preferredLocation}
// //           errorMessage={errors.preferredLocation?.message}
// //         />

// //         <Input
// //           label="Industry Interest"
// //           placeholder="e.g., Technology, Healthcare"
// //           {...register('industryInterest')}
// //           isInvalid={!!errors.industryInterest}
// //           errorMessage={errors.industryInterest?.message}
// //         />
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //         <Select
// //           label="Working Hours Preference"
// //           placeholder="Select working hours"
// //           {...register('workingHoursPreference')}
// //           isInvalid={!!errors.workingHoursPreference}
// //           errorMessage={errors.workingHoursPreference?.message}
// //         >
// //           <SelectItem key="standard" value="standard">Standard (9-5)</SelectItem>
// //           <SelectItem key="flexible" value="flexible">Flexible</SelectItem>
// //           <SelectItem key="night_shift" value="night_shift">Night Shift</SelectItem>
// //           <SelectItem key="weekend" value="weekend">Weekend</SelectItem>
// //         </Select>

// //         <Select
// //           label="Preferred Company Size"
// //           placeholder="Select company size"
// //           {...register('preferredCompanySize')}
// //           isInvalid={!!errors.preferredCompanySize}
// //           errorMessage={errors.preferredCompanySize?.message}
// //         >
// //           <SelectItem key="startup" value="startup">Startup (1-50)</SelectItem>
// //           <SelectItem key="small" value="small">Small (51-200)</SelectItem>
// //           <SelectItem key="medium" value="medium">Medium (201-1000)</SelectItem>
// //           <SelectItem key="large" value="large">Large (1000+)</SelectItem>
// //         </Select>
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //         <Select
// //           label="Employment Mode"
// //           placeholder="Select employment mode"
// //           {...register('employmentMode')}
// //           isInvalid={!!errors.employmentMode}
// //           errorMessage={errors.employmentMode?.message}
// //         >
// //           <SelectItem key="onsite" value="onsite">On-site</SelectItem>
// //           <SelectItem key="remote" value="remote">Remote</SelectItem>
// //           <SelectItem key="hybrid" value="hybrid">Hybrid</SelectItem>
// //         </Select>

// //         <div className="flex items-center pt-6">
// //           <Checkbox {...register('willingToRelocate')}>
// //             Willing to relocate
// //           </Checkbox>
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   const renderExperience = () => (
// //     <div className="space-y-4">
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //         <Input
// //           label="Company Name"
// //           placeholder="e.g., Google Inc."
// //           {...register('companyName')}
// //           isInvalid={!!errors.companyName}
// //           errorMessage={errors.companyName?.message}
// //         />

// //         <Input
// //           label="Job Title"
// //           placeholder="e.g., Senior Software Engineer"
// //           {...register('jobTitle')}
// //           isInvalid={!!errors.jobTitle}
// //           errorMessage={errors.jobTitle?.message}
// //         />
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //         <Input
// //           type="date"
// //           label="Start Date"
// //           {...register('startDate')}
// //           isInvalid={!!errors.startDate}
// //           errorMessage={errors.startDate?.message}
// //         />

// //         <Input
// //           type="date"
// //           label="End Date"
// //           {...register('endDate')}
// //           isDisabled={watchCurrentJob}
// //           isInvalid={!!errors.endDate}
// //           errorMessage={errors.endDate?.message}
// //         />
// //       </div>

// //       <Checkbox {...register('isCurrentJob')}>
// //         This is my current job
// //       </Checkbox>

// //       <Textarea
// //         label="Job Description"
// //         placeholder="Describe your responsibilities and achievements..."
// //         {...register('description')}
// //         isInvalid={!!errors.description}
// //         errorMessage={errors.description?.message}
// //       />

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //         <Input
// //           label="Location"
// //           placeholder="e.g., New York, NY"
// //           {...register('location')}
// //           isInvalid={!!errors.location}
// //           errorMessage={errors.location?.message}
// //         />

// //         <Select
// //           label="Employment Type"
// //           placeholder="Select employment type"
// //           {...register('employmentType')}
// //           isInvalid={!!errors.employmentType}
// //           errorMessage={errors.employmentType?.message}
// //         >
// //           <SelectItem key="full_time" value="full_time">Full Time</SelectItem>
// //           <SelectItem key="part_time" value="part_time">Part Time</SelectItem>
// //           <SelectItem key="contract" value="contract">Contract</SelectItem>
// //           <SelectItem key="internship" value="internship">Internship</SelectItem>
// //         </Select>
// //       </div>
// //     </div>
// //   );

// //   const renderEducation = () => (
// //     <div className="space-y-4">
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //         <Select
// //           label="Education Level"
// //           placeholder="Select education level"
// //           {...register('educationLevel')}
// //           isInvalid={!!errors.educationLevel}
// //           errorMessage={errors.educationLevel?.message}
// //         >
// //           <SelectItem key="high_school" value="high_school">High School</SelectItem>
// //           <SelectItem key="bachelor" value="bachelor">Bachelor's Degree</SelectItem>
// //           <SelectItem key="master" value="master">Master's Degree</SelectItem>
// //           <SelectItem key="doctorate" value="doctorate">Doctorate</SelectItem>
// //           <SelectItem key="diploma" value="diploma">Diploma</SelectItem>
// //         </Select>

// //         <Input
// //           label="Course Name"
// //           placeholder="e.g., Computer Science"
// //           {...register('courseName')}
// //           isInvalid={!!errors.courseName}
// //           errorMessage={errors.courseName?.message}
// //         />
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //         <Input
// //           label="Specialization"
// //           placeholder="e.g., Machine Learning"
// //           {...register('specialization')}
// //           isInvalid={!!errors.specialization}
// //           errorMessage={errors.specialization?.message}
// //         />

// //         <Input
// //           label="Institution Name"
// //           placeholder="e.g., MIT"
// //           {...register('institutionName')}
// //           isInvalid={!!errors.institutionName}
// //           errorMessage={errors.institutionName?.message}
// //         />
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //         <Input
// //           type="date"
// //           label="Start Date"
// //           {...register('startDate')}
// //           isInvalid={!!errors.startDate}
// //           errorMessage={errors.startDate?.message}
// //         />

// //         <Input
// //           type="date"
// //           label="End Date"
// //           {...register('endDate')}
// //           isDisabled={watchCurrentStudy}
// //           isInvalid={!!errors.endDate}
// //           errorMessage={errors.endDate?.message}
// //         />
// //       </div>

// //       <Checkbox {...register('isCurrentlyStudying')}>
// //         Currently studying here
// //       </Checkbox>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //         <Input
// //           label="Grade/CGPA"
// //           placeholder="e.g., 3.8/4.0"
// //           {...register('grade')}
// //           isInvalid={!!errors.grade}
// //           errorMessage={errors.grade?.message}
// //         />
// //       </div>

// //       <Textarea
// //         label="Description"
// //         placeholder="Additional details about your education..."
// //         {...register('description')}
// //         isInvalid={!!errors.description}
// //         errorMessage={errors.description?.message}
// //       />
// //     </div>
// //   );

// //   const renderProjects = () => (
// //     <div className="space-y-4">
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //         <Input
// //           label="Project Title"
// //           placeholder="e.g., E-commerce Platform"
// //           {...register('title')}
// //           isInvalid={!!errors.title}
// //           errorMessage={errors.title?.message}
// //         />

// //         <Input
// //           label="Project URL"
// //           placeholder="https://example.com"
// //           {...register('project_url')}
// //           isInvalid={!!errors.project_url}
// //           errorMessage={errors.project_url?.message}
// //         />
// //       </div>

// //       <Textarea
// //         label="Project Description"
// //         placeholder="Describe your project and your role..."
// //         {...register('description')}
// //         isInvalid={!!errors.description}
// //         errorMessage={errors.description?.message}
// //       />

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //         <Input
// //           type="date"
// //           label="Start Date"
// //           {...register('start_date')}
// //           isInvalid={!!errors.start_date}
// //           errorMessage={errors.start_date?.message}
// //         />

// //         <Input
// //           type="date"
// //           label="End Date"
// //           {...register('end_date')}
// //           isDisabled={watchCurrentProject}
// //           isInvalid={!!errors.end_date}
// //           errorMessage={errors.end_date?.message}
// //         />
// //       </div>

// //       <Checkbox {...register('is_current_project')}>
// //         Currently working on this project
// //       </Checkbox>

// //       <div className="space-y-2">
// //         <div className="flex justify-between items-center">
// //           <label className="text-sm font-medium">Technologies Used</label>
// //           <Button
// //             size="sm"
// //             color="primary"
// //             variant="flat"
// //             onClick={() => appendTech('')}
// //             startContent={<Icon icon="mdi:plus" />}
// //           >
// //             Add Technology
// //           </Button>
// //         </div>

// //         {techFields.map((field, index) => (
// //           <div key={field.id} className="flex gap-2">
// //             <Input
// //               placeholder="e.g., React, Node.js"
// //               {...register(`technologies.${index}`)}
// //               isInvalid={!!errors.technologies?.[index]}
// //               errorMessage={errors.technologies?.[index]?.message}
// //             />
// //             <Button
// //               size="sm"
// //               color="danger"
// //               variant="flat"
// //               isIconOnly
// //               onClick={() => removeTech(index)}
// //             >
// //               <Icon icon="mdi:delete" />
// //             </Button>
// //           </div>
// //         ))}

// //         {errors.technologies && (
// //           <p className="text-danger text-sm">{errors.technologies.message}</p>
// //         )}
// //       </div>
// //     </div>
// //   );

// //   const renderCertifications = () => (
// //     <div className="space-y-4">
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //         <Input
// //           label="Certification Name"
// //           placeholder="e.g., AWS Certified Solutions Architect"
// //           {...register('name')}
// //           isInvalid={!!errors.name}
// //           errorMessage={errors.name?.message}
// //         />

// //         <Input
// //           label="Issuing Organization"
// //           placeholder="e.g., Amazon Web Services"
// //           {...register('issuing_organization')}
// //           isInvalid={!!errors.issuing_organization}
// //           errorMessage={errors.issuing_organization?.message}
// //         />
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //         <Input
// //           type="date"
// //           label="Issue Date"
// //           {...register('issue_date')}
// //           isInvalid={!!errors.issue_date}
// //           errorMessage={errors.issue_date?.message}
// //         />

// //         <Input
// //           type="date"
// //           label="Expiry Date"
// //           {...register('expiry_date')}
// //           isInvalid={!!errors.expiry_date}
// //           errorMessage={errors.expiry_date?.message}
// //         />
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //         <Input
// //           label="Credential ID"
// //           placeholder="Certificate ID or Badge Number"
// //           {...register('credential_id')}
// //           isInvalid={!!errors.credential_id}
// //           errorMessage={errors.credential_id?.message}
// //         />

// //         <Input
// //           label="Credential URL"
// //           placeholder="https://credential-url.com"
// //           {...register('credential_url')}
// //           isInvalid={!!errors.credential_url}
// //           errorMessage={errors.credential_url?.message}
// //         />
// //       </div>
// //     </div>
// //   );

// //   const renderSkills = () => (
// //     <div className="space-y-4">
// //       <div className="space-y-2">
// //         <div className="flex justify-between items-center">
// //           <label className="text-sm font-medium">Skills</label>
// //           <Button
// //             size="sm"
// //             color="primary"
// //             variant="flat"
// //             onClick={() => appendSkill('')}
// //             startContent={<Icon icon="mdi:plus" />}
// //           >
// //             Add Skill
// //           </Button>
// //         </div>

// //         {skillFields.map((field, index) => (
// //           <div key={field.id} className="flex gap-2">
// //             <Input
// //               placeholder="e.g., JavaScript, Python"
// //               {...register(`skills.${index}`)}
// //               isInvalid={!!errors.skills?.[index]}
// //               errorMessage={errors.skills?.[index]?.message}
// //             />
// //             <Button
// //               size="sm"
// //               color="danger"
// //               variant="flat"
// //               isIconOnly
// //               onClick={() => removeSkill(index)}
// //             >
// //               <Icon icon="mdi:delete" />
// //             </Button>
// //           </div>
// //         ))}

// //         {errors.skills && (
// //           <p className="text-danger text-sm">{errors.skills.message}</p>
// //         )}
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //         <Select
// //           label="Proficiency Level"
// //           placeholder="Select proficiency level"
// //           {...register('proficiency_level')}
// //           isInvalid={!!errors.proficiency_level}
// //           errorMessage={errors.proficiency_level?.message}
// //         >
// //           <SelectItem key="beginner" value="beginner">Beginner</SelectItem>
// //           <SelectItem key="intermediate" value="intermediate">Intermediate</SelectItem>
// //           <SelectItem key="advanced" value="advanced">Advanced</SelectItem>
// //           <SelectItem key="expert" value="expert">Expert</SelectItem>
// //         </Select>

// //         <Input
// //           type="number"
// //           label="Years of Experience"
// //           placeholder="0"
// //           {...register('years_of_experience', { valueAsNumber: true })}
// //           isInvalid={!!errors.years_of_experience}
// //           errorMessage={errors.years_of_experience?.message}
// //         />
// //       </div>
// //     </div>
// //   );

// //   const renderStepContent = () => {
// //     switch (currentStep) {
// //       case 0: return renderPersonalInfo();
// //       case 1: return renderPreferences();
// //       case 2: return renderExperience();
// //       case 3: return renderEducation();
// //       case 4: return renderProjects();
// //       case 5: return renderCertifications();
// //       case 6: return renderSkills();
// //       default: return null;
// //     }
// //   };

// //   return (
// //     <div className="max-w-4xl mx-auto p-6">
// //       <Card>
// //         <CardHeader className="pb-2">
// //           <div className="flex flex-col space-y-4">
// //             <h1 className="text-2xl font-bold text-center">Complete Your Profile</h1>

// //             {/* Progress Bar */}
// //             <div className="w-full">
// //               <Progress
// //                 value={(currentStep + 1) / steps.length * 100}
// //                 color="primary"
// //                 className="mb-2"
// //               />
// //               <p className="text-sm text-gray-600 text-center">
// //                 Step {currentStep + 1} of {steps.length}
// //               </p>
// //             </div>

// //             {/* Step Navigation */}
// //             <div className="flex justify-center space-x-2 flex-wrap">
// //               {steps.map((step, index) => (
// //                 <Chip
// //                   key={index}
// //                   color={index === currentStep ? "primary" : index < currentStep ? "success" : "default"}
// //                   variant={index === currentStep ? "solid" : "flat"}
// //                   startContent={<Icon icon={step.icon} className="w-4 h-4" />}
// //                   size="sm"
// //                   className="cursor-pointer"
// //                   onClick={() => setCurrentStep(index)}
// //                 >
// //                   {step.title}
// //                 </Chip>
// //               ))}
// //             </div>
// //           </div>
// //         </CardHeader>

// //         <Divider />

// //         <CardBody>
// //           <form onSubmit={handleSubmit(handleStepSubmit)} className="space-y-6">
// //             <div className="mb-6">
// //               <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
// //                 <Icon icon={steps[currentStep].icon} className="w-6 h-6" />
// //                 {steps[currentStep].title}
// //               </h2>

// //               {renderStepContent()}
// //             </div>

// //             <Divider />

// //             {/* Navigation Buttons */}
// //             <div className="flex justify-between items-center pt-4">
// //               <Button
// //                 variant="flat"
// //                 onClick={prevStep}
// //                 isDisabled={currentStep === 0}
// //                 startContent={<Icon icon="mdi:chevron-left" />}
// //               >
// //                 Previous
// //               </Button>

// //               <div className="flex gap-2">
// //                 {currentStep < steps.length - 1 && (
// //                   <Button
// //                     color="secondary"
// //                     variant="flat"
// //                     onClick={nextStep}
// //                     endContent={<Icon icon="mdi:chevron-right" />}
// //                   >
// //                     Skip
// //                   </Button>
// //                 )}

// //                 <Button
// //                   type="submit"
// //                   color="primary"
// //                   isLoading={loading}
// //                   endContent={
// //                     currentStep === steps.length - 1 ?
// //                     <Icon icon="mdi:check" /> :
// //                     <Icon icon="mdi:content-save" />
// //                   }
// //                 >
// //                   {loading ? 'Saving...' : currentStep === steps.length - 1 ? 'Complete Profile' : 'Save & Continue'}
// //                 </Button>
// //               </div>
// //             </div>
// //           </form>
// //         </CardBody>
// //       </Card>

// //       {/* Success/Error Modal */}
// //       <Modal isOpen={isOpen} onClose={onClose}>
// //         <ModalContent>
// //           <ModalHeader className="flex gap-2 items-center">
// //             <Icon
// //               icon={modalData.type === 'success' ? 'mdi:check-circle' : 'mdi:alert-circle'}
// //               className={`w-6 h-6 ${modalData.type === 'success' ? 'text-success' : 'text-danger'}`}
// //             />
// //             {modalData.title}
// //           </ModalHeader>
// //           <ModalBody>
// //             <p>{modalData.message}</p>
// //           </ModalBody>
// //           <ModalFooter>
// //             <Button color="primary" variant="flat" onPress={onClose}>
// //               Close
// //             </Button>
// //           </ModalFooter>
// //         </ModalContent>
// //       </Modal>

// //       {/* Completion Summary */}
// //       {currentStep === steps.length - 1 && (
// //         <Card className="mt-6">
// //           <CardHeader>
// //             <h3 className="text-lg font-semibold flex items-center gap-2">
// //               <Icon icon="mdi:clipboard-check" className="w-5 h-5" />
// //               Profile Completion Summary
// //             </h3>
// //           </CardHeader>
// //           <CardBody>
// //             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// //               {steps.map((step, index) => (
// //                 <div key={index} className="text-center">
// //                   <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
// //                     savedData[index] ? 'bg-success text-white' : 'bg-gray-200 text-gray-500'
// //                   }`}>
// //                     <Icon icon={step.icon} className="w-6 h-6" />
// //                   </div>
// //                   <p className="text-sm font-medium">{step.title}</p>
// //                   <p className="text-xs text-gray-600">
// //                     {savedData[index] ? 'Completed' : 'Pending'}
// //                   </p>
// //                 </div>
// //               ))}
// //             </div>

// //             <div className="mt-6 text-center">
// //               <p className="text-sm text-gray-600 mb-4">
// //                 Complete all sections to maximize your profile visibility
// //               </p>
// //               <div className="flex justify-center gap-2">
// //                 <Button
// //                   color="success"
// //                   variant="flat"
// //                   startContent={<Icon icon="mdi:download" />}
// //                 >
// //                   Download Resume
// //                 </Button>
// //                 <Button
// //                   color="primary"
// //                   startContent={<Icon icon="mdi:eye" />}
// //                 >
// //                   Preview Profile
// //                 </Button>
// //               </div>
// //             </div>
// //           </CardBody>
// //         </Card>
// //       )}
// //     </div>
// //   );
// // };

// // export default ProfileCompletionForm;