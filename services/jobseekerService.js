import axiosInstance from '../utils/axiosInstance';

/**
 * Create a job seeker profile
 * @param {Object} profileData - Profile data
 * @param {string} [profileData.headline] - Professional headline
 * @param {string} [profileData.summary] - Professional summary
 * @param {string} [profileData.gender] - Gender
 * @param {string} [profileData.date_of_birth] - Date of birth
 * @param {string} [profileData.suburb] - Suburb
 * @param {string} [profileData.county] - County
 * @param {string} [profileData.state_district] - State district
 * @param {string} [profileData.state] - State
 * @param {string} [profileData.pincode] - Pincode
 * @param {number} [profileData.latitude] - Latitude
 * @param {number} [profileData.longitude] - Longitude
 * @param {number} [profileData.current_salary] - Current salary
 * @param {number} [profileData.expected_salary] - Expected salary
 * @param {number} [profileData.experience_years] - Years of experience
 * @param {number} [profileData.notice_period] - Notice period in days
 * @param {string} [profileData.availability_status] - Availability status
 * @param {string} [profileData.preferredJobPost] - Preferred Job Post 
 * @param {string} [profileData.preferredJobType] - Preferred Job Type (Full-time, Part-time, Contract, Internship, Freelance)
 * @param {string} [profileData.preferredLocation] - Preferred Job Location
 * @param {string} [profileData.industryInterest] - Preferred Industry Interest
 * @param {string} [profileData.workingHoursPreference] - working hours preference (Day Shift, Night Shift, Flexible)
 * @param {string} [profileData.preferredCompanySize] - Preferred Company Size
 * @param {Boolean} [profileData.willingToRelocate] - willing to relocate
 * @param {string} [profileData.employmentMode] - employement mode (Remote, Hybrid, On-site)
 * @param {Array<string>} [profileData.languages] - Languages spoken (send as array)
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if profile was created successfully
 *   - message: {string} - Success or error message
 *   - jobSeeker: {Object} - Created job seeker profile
 *   - location: {Object} - Location information
 */
export const createJobSeekerProfile = async (profileData) => {
  return axiosInstance.post('/jobseekers/create-profile', profileData);
};

/**
 * Get current job seeker profile
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the request was successful
 *   - jobSeeker: {Object} - Job seeker profile data
 *     - id: {number} - Job seeker ID
 *     - userId: {number} - User ID
 *     - headline: {string} - Professional headline
 *     - summary: {string} - Professional summary
 *     - gender: {string} - Gender
 *     - date_of_birth: {string} - Date of birth
 *     - current_salary: {number} - Current salary
 *     - expected_salary: {number} - Expected salary
 *     - experience_years: {number} - Years of experience
 *     - notice_period: {number} - Notice period in days
 *     - availability_status: {string} - Availability status
 *     - languages: {string} - Languages spoken
 *     - preferredJobPost {string} - Preferred Job Post 
 *     - preferredJobType {string} - Preferred Job Type (Full-time, Part-time, Contract, Internship, Freelance)
 *     - preferredLocation {string} - Preferred Job Location
 *     - industryInterest {string} - Preferred Industry Interest
 *     - workingHoursPreference {string} - working hours preference (Day Shift, Night Shift, Flexible)
 *     - preferredCompanySize {string} - Preferred Company Size
 *     - willingToRelocate {boolean} - willing to relocate
 *     - employmentMode {string} - employement mode (Remote, Hybrid, On-site)
 *     
 *     - user_jobseeker: {Object} - Associated user data
 *       - id: {number} - User ID
 *       - name: {string} - User's name
 *       - email: {string} - User's email
 *       - phone_number: {string} - User's phone number
 *       - avatarUrl: {string} - URL to user's avatar
 */
export const getMyJobSeekerProfile = async () => {
  return axiosInstance.post('/jobseekers/get-my-profile');
};

/**
 * Update job seeker profile
 * @param {Object} profileData - Profile data to update
 * @param {string} [profileData.headline] - Professional headline
 * @param {string} [profileData.summary] - Professional summary
 * @param {number} [profileData.current_salary] - Current salary
 * @param {number} [profileData.expected_salary] - Expected salary
 * @param {number} [profileData.experience_years] - Years of experience
 * @param {number} [profileData.notice_period] - Notice period in days
 * @param {string} [profileData.availability_status] - Availability status
 * @param {Array<string>} [profileData.languages] - Languages spoken
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if profile was updated successfully
 *   - message: {string} - Success or error message
 *   - jobSeeker: {Object} - Updated job seeker profile
 */
export const updateJobSeekerProfile = async (profileData) => {
  return axiosInstance.post('/jobseekers/update-my-profile', profileData);
};

/**
 * Delete job seeker profile
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if profile was deleted successfully
 *   - message: {string} - Success or error message
 */
export const deleteJobSeekerProfile = async () => {
  return axiosInstance.post('/jobseekers/delete-my-profile');
};

/**
 * Get job seeker dashboard data
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the request was successful
 *   - data: {Object} - Dashboard data
 *     - userName: {string} - User's name
 *     - profileCompletion: {number} - Profile completion percentage
 *     - applicationsThisMonth: {number} - Number of applications this month
 *     - interviewsScheduled: {number} - Number of scheduled interviews
 *     - unreadMessages: {number} - Number of unread messages
 *     - recentApplications: {Array<Object>} - Recent job applications
 *     - id: {number} - Application ID
 *     - jobseekerId: {number} - Job seeker ID
 *     - userId: {number} - User ID
 *     - jobId: {number} - Job ID
 *     - coverLetter: {string} - Cover letter text
 *     - resumeUrl: {string} - URL to resume
 *     - status: {string} - Application status (e.g., "Pending", "Viewed")
 *     - appliedAt: {string} - Application submission date
 *     - jobseeker_application: {Object} - Job seeker profile details
 *     - applicant: {Object} - Applicant user details
 *       - id: {number} - User ID
 *       - name: {string} - User's name
 *       - email: {string} - User's email
 *       - avatarUrl: {string} - User's avatar URL
 *     - recommendedJobs: {Array<Object>} - Recommended jobs
]*      - id: {number} - Job ID
 *      - title: {string} - Job title
 *      - description: {string} - Job description
 *      - requirements: {string} - Job requirements
 *      - responsibilities: {string} - Job responsibilities
 *      - location_city: {string} - City location
 *      - location_area: {string} - Area within city
 *      - openings: {number} - Number of open positions
 *      - salary_min: {number} - Minimum salary
 *      - salary_max: {number} - Maximum salary
 *      - job_type: {string} - Type of job
 *      - experience_level: {string} - Required experience level
 *      - experience_minimum: {number} - Minimum years of experience
 *      - experience_maximun: {number} - Maximum years of experience
 *      - education_level: {string} - Required education level
 *      - deadline: {string} - Application deadline date
 *      - is_remote: {boolean} - Whether job is remote
 *      - bonus: {boolean} - Whether job offers a bonus
 *      - bonusType: {string} - Type of bonus offered
 *      - maxBonusAmount: {number} - Maximum bonus amount
 *      - availableOn: {string} - Date job is available
 *      - skills: {Array<string>} - Required skills
 *      - contact_person_name: {string} - Contact person name
 *      - contact_number: {string} - Contact phone number
 *      - contact_email: {string} - Contact email
 *      - createdAt: {string} - Creation date
 *      - updatedAt: {string} - Last update date
 *      - employer: {Object} - Employer information
 *       - id: {number} - Employer ID
 *       - company_name: {string} - Company name
 *       - company_website: {string} - Company website
 *       - industry: {string} - Industry
 *       - company_size: {string} - Company size
 *       - logo: {string} - Company logo URL
 *     - tags: {Array<Object>} - Associated tags
 *       - id: {number} - Tag ID
 *       - name: {string} - Tag name
 *       - category: {string} - Tag category
 *     - applicationCount: {number} - Number of applications received
 *     - recentActivity: {Array<Object>} - Recent activity
 *       - date: {string} - Activity date
 *       - type: {string} - Activity type
 *       - job: {Object} - Related job
 *       - status: {string} - Status
 */
export const getJobSeekerDashboard = async () => {
  return axiosInstance.post('/jobseekers/get-dashboard');
};

/**
 * Get unfilled profile sections
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the request was successful
 *   - unfilledSections: {Array<string>} - List of unfilled sections (education, experience, resume, skills, certifications, languages, location, preferences, avatar)
 *   - message: {string} - Message indicating number of unfilled sections
 */
export const getUnfilledSections = async () => {
  return axiosInstance.post('/jobseekers/get-unfilled-sections');
};

/**
 * Create education entry
 * @param {Object} educationData - Education data
 * @param {string} educationData.educationLevel - Level of education (e.g., Diploma, Bachelors, Masters, Doctorate)
 * @param {string} educationData.courseName - Name of the course
 * @param {string} [educationData.specialization] - Specialization or major
 * @param {string} [educationData.courseType] - Type of course
 * @param {string} educationData.institutionName - Name of the educational institution
 * @param {string} educationData.startDate - Start date
 * @param {string} [educationData.endDate] - End date (null if currently studying)
 * @param {boolean} [educationData.isCurrentlyStudying] - Whether currently studying
 * @param {string} [educationData.courseDuration] - Duration of the course
 * @param {string} [educationData.gradingSystem] - Grading system used
 * @param {string|number} [educationData.grade] - Grade or score obtained
 * @param {string} [educationData.description] - Additional description
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if education was created successfully
 *   - message: {string} - Success or error message
 *   - education: {Object} - Created education entry
 */
export const createEducation = async (educationData) => {
  
  return axiosInstance.post('/jobseekers/create-education', {educations: [educationData]});
};

/**
 * Get all education entries for current job seeker
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the request was successful
 *   - count: {number} - Number of education entries
 *   - educations: {Array<Object>} - List of education entries
 */
export const getAllEducation = async () => {
  return axiosInstance.post('/jobseekers/get-all-education');
};

/**
 * Get education by ID
 * @param {string} educationId - Education ID
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the request was successful
 *   - education: {Object} - Education entry details
 */
export const getEducationById = async (educationId) => {
  return axiosInstance.post(`/jobseekers/get-education-by-id/${educationId}`);
};

/**
 * Update education entry
 * @param {string} educationId - Education ID
 * @param {Object} educationData - Updated education data
 * @param {string} [educationData.educationLevel] - Level of education
 * @param {string} [educationData.courseName] - Name of the course
 * @param {string} [educationData.specialization] - Specialization or major
 * @param {string} [educationData.courseType] - Type of course
 * @param {string} [educationData.institutionName] - Name of the educational institution
 * @param {string} [educationData.startDate] - Start date
 * @param {string} [educationData.endDate] - End date
 * @param {boolean} [educationData.isCurrentlyStudying] - Whether currently studying
 * @param {string} [educationData.courseDuration] - Duration of the course
 * @param {string} [educationData.gradingSystem] - Grading system used
 * @param {string|number} [educationData.grade] - Grade or score obtained
 * @param {string} [educationData.description] - Additional description
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if education was updated successfully
 *   - message: {string} - Success or error message
 *   - education: {Object} - Updated education entry
 */
export const updateEducation = async (educationId, educationData) => {
  return axiosInstance.post(`/jobseekers/update-education/${educationId}`, educationData);
};

/**
 * Delete education entry
 * @param {string} educationId - Education ID
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if education was deleted successfully
 *   - message: {string} - Success or error message
 */
export const deleteEducation = async (educationId) => {
  return axiosInstance.post(`/jobseekers/delete-education/${educationId}`);
};

/**
 * Get college names based on education level and search term
 * @param {Object} params - Search parameters
 * @param {string} params.level - Education level (Diploma, Bachelors, Masters, Doctorate)
 * @param {string} [params.search=""] - Search term for college name
 * @param {number} [params.page=1] - Page number for pagination
 * @param {number} [params.limit=10] - Number of results per page
 * @returns {Promise<Object>} Response containing:
 *   - colleges: {Array<Object>} - List of colleges with id and name
 */
export const getCollegeNames = async (params) => {
  return axiosInstance.post('/jobseekers/colleges', params);
};

/**
 * Add skill(s) to job seeker profile
 * @param {Object|Array} skillData - Skill data or array of skill data
 * @param {string} skillData.name - Skill name
 * @param {string} [skillData.category] - Skill category
 * @param {string} [skillData.proficiencyLevel="Intermediate"] - Skill proficiency level
 * @param {number} [skillData.yearsOfExperience] - Years of experience with the skill
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if skill(s) were added successfully
 *   - message: {string} - Success or error message
 *   - skills: {Array<Object>} - Added skills with details
 *   - failed: {string|null} - Names of skills that failed to add, if any
 */
export const addSkill = async (skillData) => {
  return axiosInstance.post('/jobseekers/add-skill', skillData);
};

/**
 * Get all skills for current job seeker
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the request was successful
 *   - count: {number} - Number of skills
 *   - skills: {Array<Object>} - List of skills with details
 */
export const getAllSkills = async () => {
  return axiosInstance.post('/jobseekers/get-all-skills');
};

/**
 * Update skill
 * @param {string} skillId - Skill ID
 * @param {Object} skillData - Updated skill data
 * @param {string} [skillData.proficiencyLevel] - Skill proficiency level
 * @param {number} [skillData.yearsOfExperience] - Years of experience with the skill
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if skill was updated successfully
 *   - message: {string} - Success or error message
 *   - skill: {Object} - Updated skill with details
 */
export const updateSkill = async (skillId, skillData) => {
  return axiosInstance.post(`/jobseekers/update-skill/${skillId}`, skillData);
};

/**
 * Delete skill
 * @param {string} skillId - Skill ID
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if skill was deleted successfully
 *   - message: {string} - Success or error message
 */
export const deleteSkill = async (skillId) => {
  return axiosInstance.post(`/jobseekers/delete-skill/${skillId}`);
};

/**
 * Create certification
 * @param {Object} certificationData - Certification data
 * @param {string} certificationData.name - Name of the certification
 * @param {string} certificationData.issuingOrganization - Organization that issued the certification
 * @param {string} certificationData.issueDate - Date when the certification was issued
 * @param {string} [certificationData.expiryDate] - Date when the certification expires
 * @param {string} [certificationData.credentialId] - Unique identifier for the certification
 * @param {string} [certificationData.credentialUrl] - URL to verify the certification
 * @param {string} [certificationData.description] - Additional description
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if certification was created successfully
 *   - message: {string} - Success or error message
 *   - certification: {Object} - Created certification
 */
export const createCertification = async (certificationData) => {
  return axiosInstance.post('/jobseekers/create-certification', certificationData);
};

/**
 * Get all certifications for current job seeker
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the request was successful
 *   - count: {number} - Number of certifications
 *   - certifications: {Array<Object>} - List of certifications
 */
export const getAllCertifications = async () => {
  return axiosInstance.post('/jobseekers/get-all-certifications');
};

/**
 * Get certification by ID
 * @param {string} certificationId - Certification ID
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the request was successful
 *   - certification: {Object} - Certification details
 */
export const getCertificationById = async (certificationId) => {
  return axiosInstance.post(`/jobseekers/get-certification-by-id/${certificationId}`);
};

/**
 * Update certification
 * @param {string} certificationId - Certification ID
 * @param {Object} certificationData - Updated certification data
 * @param {string} [certificationData.name] - Name of the certification
 * @param {string} [certificationData.issuingOrganization] - Organization that issued the certification
 * @param {string} [certificationData.issueDate] - Date when the certification was issued
 * @param {string} [certificationData.expiryDate] - Date when the certification expires
 * @param {string} [certificationData.credentialId] - Unique identifier for the certification
 * @param {string} [certificationData.credentialUrl] - URL to verify the certification
 * @param {string} [certificationData.description] - Additional description
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if certification was updated successfully
 *   - message: {string} - Success or error message
 *   - certification: {Object} - Updated certification
 */
export const updateCertification = async (certificationId, certificationData) => {
  return axiosInstance.post(`/jobseekers/update-certification/${certificationId}`, certificationData);
};

/**
 * Delete certification
 * @param {string} certificationId - Certification ID
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if certification was deleted successfully
 *   - message: {string} - Success or error message
 */
export const deleteCertification = async (certificationId) => {
  return axiosInstance.post(`/jobseekers/delete-certification/${certificationId}`);
};

/**
 * Upload resume
 * @param {Object} resumeData - Resume data
 * @param {File} resumeData.file - Resume file
 * @param {string} resumeData.title - Resume title
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if resume was uploaded successfully
 *   - message: {string} - Success or error message
 *   - resume: {Object} - Uploaded resume details
 *     - id: {number} - Resume ID
 *     - title: {string} - Resume title
 *     - fileUrl: {string} - URL to resume file
 *     - fileType: {string} - File type
 *     - isDefault: {boolean} - Whether this is the default resume
 *     - createdAt: {string} - Creation date
 */
export const uploadResume = async (resumeData) => {
  const formData = new FormData();
  
  if (resumeData.file) {
    formData.append('file', resumeData.file);
  }
  
  if (resumeData.title) {
    formData.append('title', resumeData.title);
  }
  
  return axiosInstance.post('/jobseekers/upload-resume', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

/**
 * Get all resumes for current job seeker
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the request was successful
 *   - count: {number} - Number of resumes
 *   - resumes: {Array<Object>} - List of resumes
 *     - id: {number} - Resume ID
 *     - title: {string} - Resume title
 *     - fileUrl: {string} - URL to resume file
 *     - fileType: {string} - File type
 *     - isDefault: {boolean} - Whether this is the default resume
 *     - isGenerated: {boolean} - Whether this is a generated resume
 *     - createdAt: {string} - Creation date
 */
export const getAllResumes = async () => {
  return axiosInstance.post('/jobseekers/get-all-resumes');
};

/**
 * Generate resume from profile data
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if resume was generated successfully
 *   - message: {string} - Success or error message
 *   - resume: {Object} - Generated resume details
 *     - id: {number} - Resume ID
 *     - title: {string} - Resume title
 *     - fileUrl: {string} - URL to resume file
 *     - fileType: {string} - File type
 *     - isGenerated: {boolean} - Whether this is a generated resume
 *     - createdAt: {string} - Creation date
 */
export const generateResume = async () => {
  return axiosInstance.post('/jobseekers/generate-resume');
};

/**
 * Generate PDF resume
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if PDF was generated successfully
 *   - message: {string} - Success or error message
 *   - pdfUrl: {string} - URL to download the generated PDF
 */
export const generatePdfResume = async () => {
  return axiosInstance.post('/jobseekers/generate-pdf-resume');
};

/**
 * Set default resume
 * @param {string} resumeId - Resume ID to set as default
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if default was set successfully
 *   - message: {string} - Success or error message
 *   - resume: {Object} - Updated resume details
 */
export const setDefaultResume = async (resumeId) => {
  return axiosInstance.post(`/jobseekers/set-default-resume/${resumeId}`);
};

/**
 * Download resume
 * @param {string} resumeId - Resume ID to download
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if download was successful
 *   - url: {string} - Download URL
 */
export const downloadResume = async (resumeId) => {
  return axiosInstance.post(`/jobseekers/download-resume/${resumeId}`);
};

/**
 * Create project
 * @param {Object} projectData - Project data
 * @param {string} projectData.projectTitle - Project title
 * @param {string} [projectData.linkedTo] - Project linked to (e.g., company, organization)
 * @param {string} [projectData.clientName] - Client name
 * @param {string} [projectData.projectStatus] - Project status
 * @param {string} projectData.workedFrom - Start date
 * @param {string} [projectData.workedTo] - End date
 * @param {boolean} [projectData.isCurrentProject] - Whether this is current project
 * @param {string} [projectData.projectDetails] - Project details/description
 * @param {string} [projectData.gitRepoLink] - GitHub repository link
 * @param {string} [projectData.demoLink] - Demo link
 * @param {Array<string>} [projectData.tags] - Project tags
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if project was created successfully
 *   - message: {string} - Success or error message
 *   - project: {Object} - Created project with tags
 */
export const createProject = async (projectData) => {
  return axiosInstance.post('/jobseekers/create-project', projectData);
};

/**
 * Get all projects for current job seeker
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the request was successful
 *   - count: {number} - Number of projects
 *   - projects: {Array<Object>} - List of projects with tags
 */
export const getAllProjects = async () => {
  return axiosInstance.post('/jobseekers/get-all-projects');
};

/**
 * Get project by ID
 * @param {string} projectId - Project ID
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the request was successful
 *   - project: {Object} - Project details with tags
 */
export const getProjectById = async (projectId) => {
  return axiosInstance.post(`/jobseekers/get-project-by-id/${projectId}`);
};

/**
 * Update project
 * @param {string} projectId - Project ID
 * @param {Object} projectData - Updated project data
 * @param {string} [projectData.projectTitle] - Project title
 * @param {string} [projectData.linkedTo] - Project linked to
 * @param {string} [projectData.clientName] - Client name
 * @param {string} [projectData.projectStatus] - Project status
 * @param {string} [projectData.workedFrom] - Start date
 * @param {string} [projectData.workedTo] - End date
 * @param {boolean} [projectData.isCurrentProject] - Whether this is current project
 * @param {string} [projectData.projectDetails] - Project details/description
 * @param {string} [projectData.gitRepoLink] - GitHub repository link
 * @param {string} [projectData.demoLink] - Demo link
 * @param {Array<string>} [projectData.tags] - Project tags
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if project was updated successfully
 *   - message: {string} - Success or error message
 *   - project: {Object} - Updated project with tags
 */
export const updateProject = async (projectId, projectData) => {
  return axiosInstance.post(`/jobseekers/update-project/${projectId}`, projectData);
};

/**
 * Delete project
 * @param {string} projectId - Project ID
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if project was deleted successfully
 *   - message: {string} - Success or error message
 */
export const deleteProject = async (projectId) => {
  return axiosInstance.post(`/jobseekers/delete-project/${projectId}`);
};

/**
 * Create experience entry
 * @param {Object} experienceData - Experience data
 * @param {string} experienceData.companyName - Company name
 * @param {string} experienceData.position - Job position
 * @param {string} experienceData.location - Job location
 * @param {string} experienceData.startDate - Start date
 * @param {string} [experienceData.endDate] - End date (null if current)
 * @param {boolean} [experienceData.isCurrentJob] - Whether this is current position
 * @param {string} [experienceData.jobDescription] - Job description
 * @param {string} [experienceData.responsibilities] - Job responsibilities
 * @param {Array<string>} [experienceData.skills] - Skills used in this role
 * @param {string} [experienceData.companyWebsite] - Company website URL
 * @param {string} [experienceData.employmentType] - Type of employment (Full-time, Part-time, etc.)
 * @param {string} [experienceData.workMode] - Work mode (Remote, Hybrid, On-site)
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if experience was created successfully
 *   - message: {string} - Success or error message
 *   - experience: {Object} - Created experience entry
 */
export const createExperience = async (experienceData) => {
  return axiosInstance.post('/jobseekers/create-experience', experienceData);
};

/**
 * Get all experience entries for current job seeker
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the request was successful
 *   - count: {number} - Number of experiences
 *   - experiences: {Array<Object>} - List of experience entries
 */
export const getAllExperiences = async () => {
  return axiosInstance.post('/jobseekers/get-all-experiences');
};

/**
 * Get experience by ID
 * @param {string} experienceId - Experience ID
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the request was successful
 *   - experience: {Object} - Experience entry details
 */
export const getExperienceById = async (experienceId) => {
  return axiosInstance.post(`/jobseekers/get-experience-by-id/${experienceId}`);
};

/**
 * Update experience entry
 * @param {string} experienceId - Experience ID
 * @param {Object} experienceData - Updated experience data
 * @param {string} [experienceData.companyName] - Company name
 * @param {string} [experienceData.position] - Job position
 * @param {string} [experienceData.location] - Job location
 * @param {string} [experienceData.startDate] - Start date
 * @param {string} [experienceData.endDate] - End date
 * @param {boolean} [experienceData.isCurrentJob] - Whether this is current position
 * @param {string} [experienceData.jobDescription] - Job description
 * @param {string} [experienceData.responsibilities] - Job responsibilities
 * @param {Array<string>} [experienceData.skills] - Skills used in this role
 * @param {string} [experienceData.companyWebsite] - Company website URL
 * @param {string} [experienceData.employmentType] - Type of employment
 * @param {string} [experienceData.workMode] - Work mode
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if experience was updated successfully
 *   - message: {string} - Success or error message
 *   - experience: {Object} - Updated experience entry
 */
export const updateExperience = async (experienceId, experienceData) => {
  return axiosInstance.post(`/jobseekers/update-experience/${experienceId}`, experienceData);
};

/**
 * Delete experience entry
 * @param {string} experienceId - Experience ID
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if experience was deleted successfully
 *   - message: {string} - Success or error message
 */
export const deleteExperience = async (experienceId) => {
  return axiosInstance.post(`/jobseekers/delete-experience/${experienceId}`);
}; 


export const searchItems = (query) => {
  return axiosInstance.post('/jobseekers/get-items', {query});
}

export const addItems = (data) => {
  data.items = items.split(",").trim();
  return axiosInstance.post('/jobseekers/add-item', data);
}
