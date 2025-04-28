import axiosInstance from '@/utils/axiosInstance';

const API_URL = '/jobs'; // Base path for job endpoints

/**
 * Fetches a list of jobs with optional filtering.
 * @route GET /api/jobs
 * @param {object} params - Query parameters
 * @param {number} [params.page=1] - Page number for pagination
 * @param {number} [params.limit=10] - Number of results per page
 * @param {string} [params.search] - Search term for title, description, requirements, responsibilities
 * @param {string} [params.location] - Filter by location (city or area)
 * @param {string} [params.job_type] - Filter by job type (e.g., 'Full-time', 'Part-time', 'Contract')
 * @param {string} [params.experience_level] - Filter by experience level (e.g., 'Entry', 'Mid', 'Senior')
 * @param {boolean} [params.is_remote] - Filter by remote status
 * @param {string} [params.tag_ids] - Comma-separated tag IDs to filter by
 * @param {number} [params.salary_min] - Minimum salary filter
 * @param {number} [params.salary_max] - Maximum salary filter
 * @returns {Promise} Axios response promise
 * @response {boolean} success - Indicates if request was successful
 * @response {number} count - Total number of jobs matching the filters
 * @response {Array} jobs - Array of job objects with employer and tag information
 * @response {Object} pagination - Pagination metadata (currentPage, totalPages, hasNextPage, hasPreviousPage, totalJobs)
 * @description Returns active job listings with comprehensive filtering options. 
 * Results include employer information and associated tags.
 */
export const getJobs = (params) => {
    return axiosInstance.get(API_URL, { params });
};

/**
 * Fetches details for a single job.
 * @route GET /api/jobs/:id
 * @param {string|number} jobId - The ID of the job to fetch
 * @returns {Promise} Axios response promise
 * @response {boolean} success - Indicates if request was successful
 * @response {Object} job - Detailed job information
 * @response {Object} job.employer - Employer details including user info
 * @response {Array} job.tags - Tags associated with the job
 * @response {Array} job.applications - Applications for this job (if accessed by employer)
 * @description Returns detailed information about a specific job, including employer details,
 * tags, and applications (if accessed by the employer who posted the job).
 * Inactive jobs can only be viewed by the employer who posted them.
 */
export const getJobById = (jobId) => {
    return axiosInstance.get(`${API_URL}/${jobId}`);
};

/**
 * Creates a new job posting (Employer only).
 * @route POST /api/jobs
 * @param {object} jobData - Data for the new job
 * @param {string} jobData.title - Job title (required)
 * @param {string} jobData.description - Job description (required)
 * @param {string} [jobData.requirements] - Job requirements
 * @param {string} [jobData.responsibilities] - Job responsibilities
 * @param {string} [jobData.location_city] - City location
 * @param {string} [jobData.location_area] - Area/region location
 * @param {number} [jobData.openings] - Number of openings
 * @param {number} [jobData.salary_min] - Minimum salary
 * @param {number} [jobData.salary_max] - Maximum salary
 * @param {string} [jobData.job_type] - Job type (e.g., 'Full-time', 'Part-time')
 * @param {string} [jobData.experience_level] - Experience level required
 * @param {number} [jobData.experience_minimum] - Minimum years of experience
 * @param {number} [jobData.experience_maximun] - Maximum years of experience
 * @param {string} [jobData.education_level] - Required education level
 * @param {string} [jobData.deadline] - Application deadline date
 * @param {boolean} [jobData.is_remote] - Whether job is remote
 * @param {boolean} [jobData.bonus] - Whether job offers bonus
 * @param {string} [jobData.bonusType] - Type of bonus offered
 * @param {number} [jobData.maxBonusAmount] - Maximum bonus amount
 * @param {string} [jobData.availableOn] - Availability date
 * @param {string} [jobData.skills] - Required skills (comma-separated)
 * @param {string} [jobData.contact_person_name] - Contact person name
 * @param {string} [jobData.contact_number] - Contact phone number
 * @param {string} [jobData.contact_email] - Contact email
 * @param {Array} [jobData.tags] - Array of tag objects with id or name properties
 * @returns {Promise} Axios response promise
 * @response {boolean} success - Indicates if job creation was successful
 * @response {string} message - Success/error message
 * @response {Object} job - Created job details with employer and tag information
 * @description Creates a new job posting. The user must be logged in as an employer.
 * Tags can be specified by either ID (existing tags) or name (creates new tags if needed).
 */
export const postJob = (jobData) => {
    // Auth token for employer role check will be added by interceptor
    return axiosInstance.post(API_URL, jobData);
};

/**
 * Fetches jobs posted by the currently logged-in employer.
 * @route GET /api/jobs/employer/all
 * @param {object} params - Query parameters
 * @param {number} [params.page=1] - Page number for pagination
 * @param {number} [params.limit=10] - Number of results per page
 * @returns {Promise} Axios response promise
 * @response {boolean} success - Indicates if request was successful
 * @response {number} count - Total number of jobs posted by the employer
 * @response {Array} jobs - Array of job objects with tags and application counts
 * @response {Object} pagination - Pagination metadata (currentPage, totalPages, hasNextPage, hasPreviousPage, totalJobs)
 * @description Returns all jobs posted by the current employer, including inactive ones.
 * Each job includes the count of applications received.
 * Requires authentication token in the header with employer role.
 */
export const getMyPostedJobs = (params) => {
    return axiosInstance.get(`${API_URL}/employer/all`, { params });
};

/**
 * Updates an existing job posting (Employer only).
 * @route PUT /api/jobs/:id
 * @param {string|number} jobId - The ID of the job to update
 * @param {object} jobData - The updated job data
 * @param {string} [jobData.title] - Job title
 * @param {string} [jobData.description] - Job description
 * @param {string} [jobData.requirements] - Job requirements
 * @param {string} [jobData.responsibilities] - Job responsibilities
 * @param {string} [jobData.location_city] - City location
 * @param {string} [jobData.location_area] - Area/region location
 * @param {number} [jobData.openings] - Number of openings
 * @param {number} [jobData.salary_min] - Minimum salary
 * @param {number} [jobData.salary_max] - Maximum salary
 * @param {string} [jobData.job_type] - Job type
 * @param {string} [jobData.experience_level] - Experience level required
 * @param {number} [jobData.experience_minimum] - Minimum years of experience
 * @param {number} [jobData.experience_maximun] - Maximum years of experience
 * @param {string} [jobData.education_level] - Required education level
 * @param {string} [jobData.deadline] - Application deadline date
 * @param {boolean} [jobData.is_remote] - Whether job is remote
 * @param {boolean} [jobData.is_active] - Whether the job is active/visible
 * @param {boolean} [jobData.bonus] - Whether job offers bonus
 * @param {string} [jobData.bonusType] - Type of bonus offered
 * @param {number} [jobData.maxBonusAmount] - Maximum bonus amount
 * @param {string} [jobData.availableOn] - Availability date
 * @param {string} [jobData.skills] - Required skills (comma-separated)
 * @param {string} [jobData.contact_person_name] - Contact person name
 * @param {string} [jobData.contact_number] - Contact phone number
 * @param {string} [jobData.contact_email] - Contact email
 * @param {Array} [jobData.tags] - Array of tag objects with id or name properties
 * @returns {Promise} Axios response promise
 * @response {boolean} success - Indicates if job update was successful
 * @response {string} message - Success/error message
 * @response {Object} job - Updated job details with employer and tag information
 * @description Updates a job posting. The user must be logged in as the employer who created the job.
 * Only specified fields will be updated.
 * Requires authentication token in the header with employer role.
 */
export const updateJob = (jobId, jobData) => {
    return axiosInstance.put(`${API_URL}/${jobId}`, jobData);
};

/**
 * Deletes a job posting (Employer only).
 * @route DELETE /api/jobs/:id
 * @param {string|number} jobId - The ID of the job to delete
 * @returns {Promise} Axios response promise
 * @response {boolean} success - Indicates if job deletion was successful
 * @response {string} message - Success/error message
 * @description Permanently deletes a job posting and all associated applications.
 * The user must be logged in as the employer who created the job.
 * Requires authentication token in the header with employer role.
 */
export const deleteJob = (jobId) => {
    return axiosInstance.delete(`${API_URL}/${jobId}`);
};

/**
 * Fetches recommended jobs for the current jobseeker.
 * @route GET /api/jobs/recommended
 * @param {object} params - Query parameters
 * @param {number} [params.page=1] - Page number for pagination
 * @param {number} [params.limit=10] - Number of results per page
 * @param {string} [params.location] - Override jobseeker's location for filtering
 * @param {boolean} [params.is_remote] - Filter for remote jobs
 * @returns {Promise} Axios response promise
 * @response {boolean} success - Indicates if request was successful
 * @response {number} count - Total number of recommended jobs
 * @response {Array} jobs - Array of job objects with employer, tag information, and match scores
 * @response {boolean} jobs[].applied - Indicates if user has already applied to this job
 * @response {number} jobs[].matchScore - Score indicating how well the job matches user's profile
 * @response {Object} pagination - Pagination metadata (currentPage, totalPages, hasNextPage, hasPreviousPage, totalJobs)
 * @description Returns job recommendations based on the jobseeker's skills, tags, and location.
 * Jobs are scored based on matching tags, skills in job title/description, location, and remote preference.
 * Jobs are sorted by relevance score, with information about whether the user has already applied.
 * Requires authentication token in the header with jobseeker role.
 */
export const getRecommendedJobs = (params) => {
    return axiosInstance.get(`${API_URL}/recommended`, { params });
};

// Add other job-related functions here (e.g., updateJob, deleteJob for employers/admins) 