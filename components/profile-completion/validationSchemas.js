import { z } from "zod";

export const personalInfoSchema = z.object({
  headline: z.string().min(1, "Headline is required"),
  summary: z.string().min(1, "Summary is required"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Gender is required",
    invalid_type_error: "Gender must be a string",
  }),
  date_of_birth: z
    .date()
    .max(new Date(Date.now() - 18 * 365.25 * 24 * 60 * 60 * 1000), "Age must be greater than or equal to 18"),
  current_salary: z.number().min(0, "Current salary must be positive"),
  expected_salary: z.number().min(0, "Expected salary must be positive"),
  experience_years: z.number().min(0, "Experience years must be positive"),
  notice_period: z.number().min(0, "Notice period must be positive"),
  availability_status: z.enum(["Available", "Not Available", "Passive"], {
    required_error: "Availability status is required",
    invalid_type_error: "Availability status must be a string",
  }),
  languages: z.union([
    z.string().min(3, "At least one language is required"),
    z.array(z.string()).min(1, "At least one language is required"),
  ]),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export const preferencesSchema = z.object({
  preferredJobPost: z.string().min(1, "Preferred job post is required"),
  preferredJobType: z.enum(
    ["Full-time", "Part-time", "Contract", "Freelance", "Internship"],
    {
      required_error: "Preferred job type is required",
      invalid_type_error: "Preferred job type must be a string",
    }
  ),
  preferredLocation: z.string().min(1, "Preferred location is required"),
  industryInterest: z.string().min(1, "Industry interest is required"),
  workingHoursPreference: z.enum(["Day shift", "Night shift", "Flexible"], {
    required_error: "Working hours preference is required",
    invalid_type_error: "Working hours preference must be a string",
  }),
  preferredCompanySize: z.enum(
    [
      "1-10",
      "11-50",
      "51-100",
      "101-500",
      "501-1000",
      "1001-5000",
      "5001-10000",
      "10001-50000",
      "50001-100000",
      "100001-500000",
      "500001-1000000",
    ],
    {
      required_error: "Preferred company size is required",
      invalid_type_error: "Preferred company size must be a string",
    }
  ),
  willingToRelocate: z.boolean(),
  employmentMode: z.enum(["Hybrid", "On-site", "Remote"], {
    required_error: "Employment mode is required",
    invalid_type_error: "Employment mode must be a string",
  }),
});

export const experienceSchema = z
  .object({
    companyName: z.string().min(1, "Company name is required"),
    position: z.string().min(1, "Job title is required"),
    startDate: z.string().refine((date) => new Date(date) <= new Date(), {
      message: "Start date must not be in the future",
    }),
    endDate: z.string().optional(),
    isCurrentJob: z.boolean(),
    jobDescription: z.string().min(1, "Description is required"),
    responsibilities: z.string().min(1, "Responsibilities is required"),
    skills: z.string().min(1, "Skills are required"),
    location: z.string().min(1, "Location is required"),
    employmentType: z.enum(
      ["Full Time", "Part Time", "Contract", "Freelance", "Internship"],
      {
        required_error: "Employment type is required",
        invalid_type_error: "Employment type must be a string",
      }
    ),
    workMode: z.enum(["Hybrid", "Onsite", "Remote"], {
      required_error: "Work mode is required",
      invalid_type_error: "Work mode must be a string",
    }),
  })
  .refine(
    (data) => {
      if (data.endDate) {
        return new Date(data.endDate) >= new Date(data.startDate);
      }
      return true;
    },
    {
      message: "End date must not be earlier than start date",
      path: ["endDate"],
    }
  );

export const educationSchema = z.object({
  educationLevel: z.enum(
    ["Doctorate", "Masters", "Bachelors", "Diploma", "High School", "Other"],
    {
      required_error: "Education level is required",
      invalid_type_error: "Education level must be a string",
    }
  ),
  courseName: z.string().min(1, "Course name is required"),
  courseType: z.enum(["Full Time", "Part Time", "Online", "Other"], {
    required_error: "Course type is required",
    invalid_type_error: "Course type must be a string",
  }),
  courseDuration: z.number().min(0, "Course duration must be positive"),
  specialization: z.string().optional(),
  institutionName: z.string().min(1, "Institution name is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  isCurrentlyStudying: z.boolean(),
  gradingSystem: z.enum(["GPA", "Percentage", "CGPA", "Other"], {
    required_error: "Grading system is required",
    invalid_type_error: "Grading system must be a string",
  }),
  grade: z.string().optional(),
  description: z.string().optional(),
});

export const projectSchema = z.object({
  projectTitle: z.string().min(1, "Project title is required"),
  clientName: z.string().optional(),
  projectDetails: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  isCurrentProject: z.boolean(),
  gitRepoLink: z.string().url().optional(),
});

export const certificationSchema = z.object({
  name: z.string().min(1, "Certification name is required"),
  issuingOrganization: z.string().min(1, "Issuing organization is required"),
  issueDate: z.string().min(1, "Issue date is required"),
  expiryDate: z.string().optional(),
  credentialId: z.string().optional(),
  credentialUrl: z.string().url().optional(),
  description: z.string().optional(),
});

export const skillsSchema = z.array(z.object({
  name: z.string().min(1, "At least one skill is required"),
  category: z.string().optional(),
  proficiencyLevel: z.string().min(1, "Proficiency level is required"),
  yearsOfExperience: z.number().min(0, "Years of experience must be positive"),
}));

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
];

export const resumeSchema = z.object({
  resume: z
    .any()
    .refine((file) => file instanceof File, {
      message: "File is required",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "File size must be less than 5MB",
    })
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
      message: "Only PDF or DOCX files are accepted",
    }),
});

export const itemsSchema = z.object({
  items: z.string().min(1, "At least one skill is required"),
}); 