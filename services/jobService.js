import axiosInstance from '../utils/axiosInstance';

/**
 * Get all jobs with filtering options
 * @param {Object} filters - Job search filters
 * @param {string} [filters.search] - Search term for job title or description
 * @param {Array<string>} [filters.job_type] - Job types to filter by (e.g., ["full-time", "part-time"])
 * @param {number} [filters.salary_min] - Minimum salary filter
 * @param {number} [filters.salary_max] - Maximum salary filter
 * @param {Array<string>} [filters.experience_level] - Experience levels to filter by
 * @param {number} [filters.experience_minimum] - Minimum experience in years
 * @param {Array<string>} [filters.education_level] - Education levels to filter by
 * @param {boolean} [filters.is_remote] - Filter for remote jobs only
 * @param {string} [filters.location_city] - City filter
 * @param {string} [filters.location_area] - Area filter
 * @param {number} [filters.radius] - Location radius in km (requires location_city or location_area)
 * @param {Array<string>} [filters.tags] - Tags to filter by
 * @param {Array<string>} [filters.skills] - Skills to filter by
 * @param {boolean} [filters.bonus] - Filter for jobs with bonuses
 * @param {number} [filters.page] - Page number for pagination
 * @param {number} [filters.limit] - Number of results per page
 * @param {string} [filters.sortBy] - Sort field
 * @param {string} [filters.sortOrder] - Sort order ('asc' or 'desc')
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the request was successful
 *   - message: {string} - Success or error message
 *   - jobs: {Array<Object>} - Array of job listings matching the filters
 *     - id: {number} - Job ID
 *     - title: {string} - Job title
 *     - description: {string} - Job description
 *     - requirements: {string} - Job requirements
 *     - responsibilities: {string} - Job responsibilities
 *     - location_city: {string} - City location
 *     - location_area: {string} - Area within city
 *     - openings: {number} - Number of open positions
 *     - salary_min: {number} - Minimum salary
 *     - salary_max: {number} - Maximum salary
 *     - job_type: {string} - Type of job (full-time, part-time, etc.)
 *     - experience_level: {string} - Required experience level
 *     - experience_minimum: {number} - Minimum years of experience
 *     - experience_maximun: {number} - Maximum years of experience
 *     - education_level: {string} - Required education level
 *     - deadline: {string} - Application deadline date
 *     - is_remote: {boolean} - Whether job is remote
 *     - bonus: {boolean} - Whether job offers a bonus
 *     - bonusType: {string} - Type of bonus offered
 *     - maxBonusAmount: {number} - Maximum bonus amount
 *     - availableOn: {string} - Date job is available
 *     - skills: {Array<string>} - Required skills
 *     - employer: {Object} - Employer data
 *     - tags: {Array<Object>} - Associated tags
 *     - status: {string} - Job status
 *     - createdAt: {string} - Creation date
 *     - updatedAt: {string} - Last update date
 *   - pagination: {Object} - Pagination details
 *     - currentPage: {number} - Current page number
 *     - totalPages: {number} - Total number of pages
 *     - totalItems: {number} - Total number of jobs matching filters
 *     - limit: {number} - Items per page
 */
export const getJobs = async (filters = {}) => {
  return axiosInstance.post('/jobs/get-all-jobs', filters);
};

/**
 * Create a new job posting
 * @param {Object} jobData - Job data
 * @param {string} jobData.title - Job title
 * @param {string} jobData.description - Job description
 * @param {string} jobData.requirements - Job requirements
 * @param {string} jobData.responsibilities - Job responsibilities
 * @param {string} jobData.location_city - Job city location
 * @param {string} [jobData.location_area] - Job area within city
 * @param {number} jobData.openings - Number of job openings
 * @param {number} [jobData.salary_min] - Minimum salary
 * @param {number} [jobData.salary_max] - Maximum salary
 * @param {string} jobData.job_type - Job type (e.g., "full-time")
 * @param {string} jobData.experience_level - Experience level
 * @param {number} [jobData.experience_minimum] - Minimum required experience in years
 * @param {number} [jobData.experience_maximun] - Maximum experience in years
 * @param {string} jobData.education_level - Required education level
 * @param {string} jobData.deadline - Application deadline
 * @param {boolean} [jobData.is_remote] - Whether job is remote
 * @param {boolean} [jobData.bonus] - Whether job offers a bonus
 * @param {string} [jobData.bonusType] - Type of bonus offered
 * @param {number} [jobData.maxBonusAmount] - Maximum bonus amount
 * @param {string} [jobData.availableOn] - Date when job is available
 * @param {Array<string>} [jobData.skills] - Required skills
 * @param {string} [jobData.contact_person_name] - Contact person name
 * @param {string} [jobData.contact_number] - Contact phone number
 * @param {string} [jobData.contact_email] - Contact email
 * @param {Array<Object>} [jobData.tags] - Job tags
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the job was created successfully
 *   - message: {string} - Success or error message
 *   - job: {Object} - The created job with full details
 *     - id: {number} - Job ID
 *     - title: {string} - Job title
 *     - description: {string} - Job description
 *     - requirements: {string} - Job requirements
 *     - responsibilities: {string} - Job responsibilities
 *     - location_city: {string} - City location
 *     - location_area: {string} - Area within city
 *     - openings: {number} - Number of open positions
 *     - salary_min: {number} - Minimum salary
 *     - salary_max: {number} - Maximum salary
 *     - job_type: {string} - Type of job
 *     - experience_level: {string} - Required experience level
 *     - experience_minimum: {number} - Minimum years of experience
 *     - experience_maximun: {number} - Maximum years of experience
 *     - education_level: {string} - Required education level
 *     - deadline: {string} - Application deadline date
 *     - is_remote: {boolean} - Whether job is remote
 *     - bonus: {boolean} - Whether job offers a bonus
 *     - bonusType: {string} - Type of bonus offered
 *     - maxBonusAmount: {number} - Maximum bonus amount
 *     - availableOn: {string} - Date job is available
 *     - skills: {Array<string>} - Required skills
 *     - employer: {Object} - Employer data
 *     - tags: {Array<Object>} - Associated tags
 *     - status: {string} - Job status
 *     - createdAt: {string} - Creation date
 *     - updatedAt: {string} - Last update date
 */
export const createJob = async (jobData) => {
  return axiosInstance.post('/jobs/create-job', jobData);
};

/**
 * Get jobs posted by the authenticated employer
 * @param {Object} [params] - Optional parameters
 * @param {string} [params.status] - Filter by job status ('active', 'inactive', 'expired', 'all')
 * @param {number} [params.page] - Page number for pagination
 * @param {number} [params.limit] - Number of results per page
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the request was successful
 *   - message: {string} - Success or error message
 *   - jobs: {Array<Object>} - Array of job listings posted by the employer
 *     - id: {number} - Job ID
 *     - title: {string} - Job title
 *     - description: {string} - Job description
 *     - location_city: {string} - City location
 *     - location_area: {string} - Area within city
 *     - salary_min: {number} - Minimum salary
 *     - salary_max: {number} - Maximum salary
 *     - job_type: {string} - Type of job
 *     - status: {string} - Job status (active, inactive, expired)
 *     - createdAt: {string} - Creation date
 *     - applicationCount: {number} - Number of applications received
 *     - viewCount: {number} - Number of times the job was viewed
 *   - pagination: {Object} - Pagination details
 *     - currentPage: {number} - Current page number
 *     - totalPages: {number} - Total number of pages
 *     - totalItems: {number} - Total number of jobs
 *     - limit: {number} - Items per page
 */
export const getEmployerJobs = async (params = {}) => {
  return axiosInstance.post('/jobs/get-employer-jobs', params);
};

/**
 * Get job recommendations for the authenticated job seeker
 * @param {Object} [filters] - Optional filters
 * @param {number} [filters.page] - Page number for pagination
 * @param {number} [filters.limit] - Number of results per page
 * @param {Array<string>} [filters.job_type] - Job types to filter by
 * @param {boolean} [filters.is_remote] - Filter for remote jobs only
 * @param {string} [filters.location_city] - City filter
 * @param {string} [filters.location_area] - Area filter
 * @param {number} [filters.radius] - Location radius in km
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the request was successful
 *   - message: {string} - Success or error message
 *   - jobs: {Array<Object>} - Array of recommended job listings
 *     - id: {number} - Job ID
 *     - title: {string} - Job title
 *     - description: {string} - Job description
 *     - location_city: {string} - City location
 *     - location_area: {string} - Area within city
 *     - salary_min: {number} - Minimum salary
 *     - salary_max: {number} - Maximum salary
 *     - job_type: {string} - Type of job
 *     - status: {string} - Job status
 *     - is_remote: {boolean} - Whether job is remote
 *     - matchScore: {number} - Score indicating how well the job matches the job seeker's profile
 *     - employer: {Object} - Employer data
 *     - tags: {Array<Object>} - Associated tags
 *     - createdAt: {string} - Creation date
 *   - pagination: {Object} - Pagination details
 *     - currentPage: {number} - Current page number
 *     - totalPages: {number} - Total number of pages
 *     - totalItems: {number} - Total number of recommended jobs
 *     - limit: {number} - Items per page
 *   - matchInfo: {Object} - Additional matching information
 *     - skillsMatch: {Array<string>} - Skills that matched
 *     - locationMatch: {boolean} - Whether location matched
 *     - experienceMatch: {boolean} - Whether experience matched
 */
export const getRecommendedJobs = async (filters = {}) => {
  return axiosInstance.post('/jobs/get-recommended-jobs', filters);
};

/**
 * Update an existing job posting
 * @param {string} jobId - ID of the job to update
 * @param {Object} jobData - Updated job data
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the job was updated successfully
 *   - message: {string} - Success or error message
 *   - job: {Object} - The updated job with full details
 *     - id: {number} - Job ID
 *     - title: {string} - Job title
 *     - description: {string} - Job description
 *     - requirements: {string} - Job requirements
 *     - responsibilities: {string} - Job responsibilities
 *     - location_city: {string} - City location
 *     - location_area: {string} - Area within city
 *     - openings: {number} - Number of open positions
 *     - salary_min: {number} - Minimum salary
 *     - salary_max: {number} - Maximum salary
 *     - job_type: {string} - Type of job
 *     - experience_level: {string} - Required experience level
 *     - experience_minimum: {number} - Minimum years of experience
 *     - experience_maximun: {number} - Maximum years of experience
 *     - education_level: {string} - Required education level
 *     - deadline: {string} - Application deadline date
 *     - is_remote: {boolean} - Whether job is remote
 *     - bonus: {boolean} - Whether job offers a bonus
 *     - updatedAt: {string} - Last update date
 *     - employer: {Object} - Employer data
 *     - tags: {Array<Object>} - Associated tags
 */
export const updateJob = async (jobId, jobData) => {
  return axiosInstance.post(`/jobs/update-job/${jobId}`, jobData);
};

/**
 * Deactivate (soft delete) a job posting
 * @param {string} jobId - ID of the job to deactivate
 * @param {Object} [params] - Optional parameters
 * @param {string} [params.reason] - Reason for deactivation
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the job was deactivated successfully
 *   - message: {string} - Success or error message
 *   - job: {Object} - Basic information about the deactivated job
 *     - id: {number} - Job ID
 *     - title: {string} - Job title
 *     - status: {string} - Updated status (inactive)
 * 
 * Note: This performs a soft delete, making the job inactive rather than removing it from the database.
 */
export const deactivateJob = async (jobId, params = {}) => {
  return axiosInstance.post(`/jobs/deactivate-job/${jobId}`, params);
};

/**
 * Get a job by its ID
 * @param {string} jobId - ID of the job to retrieve
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the request was successful
 *   - message: {string} - Success or error message
 *   - job: {Object} - The requested job with full details
 *     - id: {number} - Job ID
 *     - title: {string} - Job title
 *     - description: {string} - Job description
 *     - requirements: {string} - Job requirements
 *     - responsibilities: {string} - Job responsibilities
 *     - location_city: {string} - City location
 *     - location_area: {string} - Area within city
 *     - openings: {number} - Number of open positions
 *     - salary_min: {number} - Minimum salary
 *     - salary_max: {number} - Maximum salary
 *     - job_type: {string} - Type of job
 *     - experience_level: {string} - Required experience level
 *     - experience_minimum: {number} - Minimum years of experience
 *     - experience_maximun: {number} - Maximum years of experience
 *     - education_level: {string} - Required education level
 *     - deadline: {string} - Application deadline date
 *     - is_remote: {boolean} - Whether job is remote
 *     - bonus: {boolean} - Whether job offers a bonus
 *     - bonusType: {string} - Type of bonus offered
 *     - maxBonusAmount: {number} - Maximum bonus amount
 *     - availableOn: {string} - Date job is available
 *     - skills: {Array<string>} - Required skills
 *     - contact_person_name: {string} - Contact person name
 *     - contact_number: {string} - Contact phone number
 *     - contact_email: {string} - Contact email
 *     - createdAt: {string} - Creation date
 *     - updatedAt: {string} - Last update date
 *     - employer: {Object} - Employer information
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
 *     - viewCount: {number} - Number of times the job was viewed
 *     - similarJobs: {Array<Object>} - Similar jobs that might interest the viewer
 */
export const getJobById = async (jobId) => {
  return axiosInstance.post(`/jobs/get-job-by-id/${jobId}`);
}; 