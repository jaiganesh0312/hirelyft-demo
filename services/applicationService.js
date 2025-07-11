import axiosInstance from '../utils/axiosInstance';

/**
 * Apply for a job
 * @param {Object} applicationData - Application data
 * @param {number} applicationData.jobId - ID of the job being applied for
 * @param {string} [applicationData.coverLetter] - Cover letter text
 * @param {string} [applicationData.resumeUrl] - URL to the applicant's resume
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the application was submitted successfully
 *   - message: {string} - Success or error message
 *   - application: {Object} - The submitted application with details
 *     - id: {number} - Application ID
 *     - jobseekerId: {number} - Job seeker ID
 *     - userId: {number} - User ID
 *     - jobId: {number} - Job ID
 *     - coverLetter: {string} - Cover letter text
 *     - resumeUrl: {string} - URL to resume
 *     - status: {string} - Application status (e.g., "Pending")
 *     - appliedAt: {string} - Application submission date
 *     - jobseeker_application: {Object} - Job seeker details
 *     - applicant: {Object} - Applicant user details
 *     - job: {Object} - Job details including employer information
 */
export const applyForJob = async (applicationData) => {
  return axiosInstance.post('/applications/create-application', applicationData);
};

/**
 * Get all applications for the current job seeker
 * @param {Object} [params] - Query parameters
 * @param {number} [params.page] - Page number for pagination
 * @param {number} [params.limit] - Number of items per page
 * @param {string} [params.status] - Filter by application status
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the request was successful
 *   - count: {number} - Total number of applications (after filtering)
 *   - applications: {Array<Object>} - List of applications
 *     - id: {number} - Application ID
 *     - status: {string} - Application status
 *     - appliedAt: {string} - Application date
 *     - job: {Object} - Job details
 *       - id: {number} - Job ID
 *       - title: {string} - Job title
 *       - description: {string} - Job description
 *       - employer: {Object} - Employer details
 *   - pagination: {Object} - Pagination details
 *     - currentPage: {number} - Current page
 *     - totalPages: {number} - Total number of pages
 *     - hasNextPage: {boolean} - Whether there is a next page
 *     - hasPreviousPage: {boolean} - Whether there is a previous page
 *     - totalApplications: {number} - Total number of applications
 */
export const getMyApplications = async (params = {}) => {
  return axiosInstance.post('/applications/get-my-applications', params);
};

/**
 * Get applications for a specific job (employer only)
 * @param {string} jobId - ID of the job
 * @param {Object} [params] - Query parameters
 * @param {number} [params.page] - Page number for pagination
 * @param {number} [params.limit] - Number of items per page
 * @param {string} [params.status] - Filter by application status
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the request was successful
 *   - count: {number} - Total number of applications
 *   - applications: {Array<Object>} - List of applications
 *     - id: {number} - Application ID
 *     - status: {string} - Application status
 *     - appliedAt: {string} - Application date
 *     - jobseeker_application: {Object} - Job seeker details
 *       - id: {number} - Job seeker ID
 *       - user_jobseeker: {Object} - User details
 *       - my_educations: {Array<Object>} - Educational background
 *       - experiences: {Array<Object>} - Work experience
 *   - pagination: {Object} - Pagination details
 *     - currentPage: {number} - Current page
 *     - totalPages: {number} - Total number of pages
 *     - hasNextPage: {boolean} - Whether there is a next page
 *     - hasPreviousPage: {boolean} - Whether there is a previous page
 *     - totalApplications: {number} - Total number of applications
 */
export const getApplicationsByJob = async (jobId, params = {}) => {
  return axiosInstance.post(`/applications/get-by-job/${jobId}`, params);
};

/**
 * Get filtered applications for a specific job (employer only)
 * @param {string} jobId - ID of the job
 * @param {Object} [filters] - Filter parameters
 * @param {number} [filters.page] - Page number for pagination
 * @param {number} [filters.limit] - Number of items per page
 * @param {string} [filters.status] - Filter by application status
 * @param {string} [filters.appliedAfter] - Filter by date applied after
 * @param {string} [filters.appliedBefore] - Filter by date applied before
 * @param {number} [filters.experience_min] - Filter by minimum experience
 * @param {number} [filters.experience_max] - Filter by maximum experience
 * @param {string} [filters.education_level] - Filter by education level
 * @param {Array<string>} [filters.skills] - Filter by skills
 * @param {string} [filters.search] - Search term for applicant name/details
 * @param {string} [filters.sortBy] - Field to sort by
 * @param {string} [filters.sortOrder] - Order to sort (asc/desc)
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the request was successful
 *   - count: {number} - Total number of applications matching filters
 *   - applications: {Array<Object>} - List of filtered applications
 *   - pagination: {Object} - Pagination details
 *     - currentPage: {number} - Current page
 *     - totalPages: {number} - Total number of pages
 *     - hasNextPage: {boolean} - Whether there is a next page
 *     - hasPreviousPage: {boolean} - Whether there is a previous page
 *     - totalItems: {number} - Total number of applications matching filters
 */
export const getFilteredApplicationsByJob = async (jobId, filters = {}) => {
  return axiosInstance.post(`/applications/get-filtered-by-job/${jobId}`, filters);
};

/**
 * Get statistics for applications to a specific job
 * @param {string} jobId - ID of the job
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the request was successful
 *   - statistics: {Object} - Application statistics
 *     - totalApplications: {number} - Total number of applications
 *     - byStatus: {Object} - Applications count by status
 *       - Pending: {number} - Number of pending applications
 *       - Viewed: {number} - Number of viewed applications
 *       - Shortlisted: {number} - Number of shortlisted applications
 *       - Rejected: {number} - Number of rejected applications
 *     - byDate: {Object} - Applications count by date (last 30 days)
 *     - topSkills: {Array<Object>} - Top skills among applicants
 *       - name: {string} - Skill name
 *       - count: {number} - Number of applicants with this skill
 */
export const getApplicationStatsByJob = async (jobId) => {
  return axiosInstance.post(`/applications/get-stats-by-job/${jobId}`);
};

/**
 * Get a specific application by ID
 * @param {string} applicationId - ID of the application
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the request was successful
 *   - application: {Object} - Complete application details
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
 *     - job: {Object} - Job details including employer information
 * 
 * Note: When an employer views an application with "Pending" status,
 * the status will automatically be updated to "Viewed".
 */
export const getApplicationById = async (applicationId) => {
  return axiosInstance.post(`/applications/get-by-id/${applicationId}`);
};

/**
 * Update the status of an application (employer only)
 * @param {string} applicationId - ID of the application
 * @param {Object} updateData - Update data
 * @param {string} updateData.status - New application status
 * @param {Object} [updateData.interviewDetails] - Interview details if status is "Shortlisted"
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the update was successful
 *   - message: {string} - Success or error message
 *   - application: {Object} - The updated application with details
 *   - interview: {Object|null} - Interview details if an interview was scheduled
 */
export const updateApplicationStatus = async (applicationId, updateData) => {
  return axiosInstance.post(`/applications/update-status/${applicationId}`, updateData);
};

/**
 * Update the status of multiple applications in batch (employer only)
 * @param {Object} batchData - Batch update data
 * @param {Array<Object>} batchData.applications - Applications to update
 * @param {string} batchData.applications[].id - ID of the application
 * @param {string} batchData.applications[].status - New status for the application
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the update was successful
 *   - message: {string} - Success message including number of applications updated
 *   - applications: {Array<Object>} - Array of updated applications with details
 */
export const batchUpdateApplicationStatus = async (batchData) => {
  return axiosInstance.post('/applications/batch-update-status', batchData);
};

/**
 * Withdraw a job application (job seeker only)
 * @param {string} applicationId - ID of the application
 * @param {Object} [withdrawData] - Withdrawal data
 * @param {string} [withdrawData.reason] - Reason for withdrawal
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the withdrawal was successful
 *   - message: {string} - Success or error message
 *   - applicationId: {string} - ID of the withdrawn application
 *   - reason: {string} - Withdrawal reason or "No reason provided"
 */
export const withdrawApplication = async (applicationId, withdrawData = {}) => {
  return axiosInstance.post(`/applications/withdraw/${applicationId}`, withdrawData);
}; 