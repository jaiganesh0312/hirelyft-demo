import axiosInstance from '@/utils/axiosInstance';

const API_URL = '/applications'; // Base path for application endpoints

/**
 * Submits an application for a specific job.
 * @route POST /api/applications
 * @param {object} applicationData - Application details
 * @param {number} applicationData.jobId - ID of the job being applied for (required)
 * @param {string} applicationData.coverLetter - Cover letter text (optional)
 * @param {string} applicationData.resumeUrl - URL to the resume file (optional)
 * @returns {Promise} Axios response promise with newly created application details
 * @description Creates a new job application. The user must be logged in as a jobseeker.
 * The backend validates if the job exists, is active, and if the user has already applied.
 * @response {boolean} success - Indicates if the operation was successful
 * @response {string} message - Success message
 * @response {object} application - The created application with related data
 * @response {object} application.jobseeker - Applicant information with user details
 * @response {object} application.job - Job details with employer information and tags
 */
export const applyForJob = (applicationData) => {
    // Auth token for job seeker role check will be added by interceptor
    return axiosInstance.post(API_URL, applicationData);
};

/**
 * Fetches the logged-in job seeker's applications.
 * @route GET /api/applications/me
 * @param {object} params - Query parameters
 * @param {number} [params.page=1] - Page number for pagination
 * @param {number} [params.limit=10] - Number of results per page
 * @param {string} [params.status] - Filter by application status (e.g., 'Pending', 'Viewed', 'Interviewing', 'Rejected', 'Hired')
 * @returns {Promise} Axios response promise with paginated list of applications and job details
 * @description Returns all applications submitted by the current jobseeker with pagination support
 * and optional status filtering. Includes job and employer details for each application.
 * @response {boolean} success - Indicates if the operation was successful
 * @response {number} count - Total number of applications matching filters
 * @response {Array} applications - List of application objects with job and employer details
 * @response {object} pagination - Pagination information
 * @response {number} pagination.currentPage - Current page number
 * @response {number} pagination.totalPages - Total number of pages
 * @response {boolean} pagination.hasNextPage - Whether there are more pages
 * @response {boolean} pagination.hasPreviousPage - Whether there are previous pages
 * @response {number} pagination.totalApplications - Total number of applications matching filters
 */
export const getMyApplications = (params) => {
    return axiosInstance.get(`${API_URL}/me`, { params });
};

/**
 * Fetches applications for a specific job (employer only).
 * @route GET /api/applications/job/:jobId
 * @param {string} jobId - ID of the job to fetch applications for
 * @param {object} params - Query parameters
 * @param {number} [params.page=1] - Page number for pagination
 * @param {number} [params.limit=10] - Number of results per page
 * @param {string} [params.status] - Filter by application status
 * @returns {Promise} Axios response promise with paginated list of applications with applicant details
 * @description Returns all applications for a specific job posting. The user must be logged in as the employer
 * who posted the job. Includes jobseeker details for each application.
 * @response {boolean} success - Indicates if the operation was successful
 * @response {number} count - Total number of applications matching filters
 * @response {Array} applications - List of application objects with applicant details
 * @response {object} pagination - Pagination information
 * @response {number} pagination.currentPage - Current page number
 * @response {number} pagination.totalPages - Total number of pages
 * @response {boolean} pagination.hasNextPage - Whether there are more pages
 * @response {boolean} pagination.hasPreviousPage - Whether there are previous pages
 * @response {number} pagination.totalApplications - Total number of applications matching filters
 */
export const getApplicationsForJob = (jobId, params) => {
    return axiosInstance.get(`${API_URL}/job/${jobId}`, { params });
};

/**
 * Fetches details for a specific application.
 * @route GET /api/applications/:id
 * @param {string|number} applicationId - ID of the application to fetch
 * @returns {Promise} Axios response promise with detailed application information
 * @description Returns detailed information about a specific application. Access is restricted to
 * the jobseeker who submitted the application or the employer who owns the job.
 * When an employer views a 'Pending' application, its status is automatically updated to 'Viewed'.
 * @response {boolean} success - Indicates if the operation was successful
 * @response {object} application - Detailed application information with related data
 * @response {object} application.jobseeker - Applicant information with user details
 * @response {object} application.job - Job details with employer information and tags
 */
export const getApplicationById = (applicationId) => {
    return axiosInstance.get(`${API_URL}/${applicationId}`);
};

/**
 * Updates the status of a specific application (employer only).
 * @route PUT /api/applications/:id/status
 * @param {string} applicationId - ID of the application to update
 * @param {object} statusData - Data containing the new status
 * @param {string} statusData.status - New application status (e.g., 'Interviewing', 'Rejected', 'Hired')
 * @returns {Promise} Axios response promise with updated application details
 * @description Updates the status of a job application. The user must be logged in as the employer
 * who owns the job. This triggers notifications to the applicant.
 * @response {boolean} success - Indicates if the operation was successful
 * @response {string} message - Success message
 * @response {object} application - Updated application with related data
 */
export const updateApplicationStatus = (applicationId, statusData) => {
    return axiosInstance.put(`${API_URL}/${applicationId}/status`, statusData);
};

/**
 * Fetches applications for a specific job with advanced filtering (employer only).
 * @route GET /api/applications/job/:jobId/filtered
 * @param {string|number} jobId - ID of the job to fetch applications for
 * @param {object} params - Filter and pagination parameters
 * @param {number} [params.page=1] - Page number for pagination
 * @param {number} [params.limit=10] - Number of results per page
 * @param {string} [params.status] - Filter by application status
 * @param {string} [params.appliedAfter] - Filter applications after this date (ISO format)
 * @param {string} [params.appliedBefore] - Filter applications before this date (ISO format)
 * @param {number} [params.experience_min] - Minimum years of experience
 * @param {number} [params.experience_max] - Maximum years of experience
 * @param {string} [params.education_level] - Filter by education level
 * @param {string} [params.skills] - Comma-separated list of required skills
 * @param {string} [params.search] - Search term for applicant name or email
 * @param {string} [params.sortBy] - Field to sort by (appliedAt, name, status, experience, education)
 * @param {string} [params.sortDirection] - Sort direction (asc, desc)
 * @returns {Promise} Axios response promise with filtered applications
 * @description Returns applications for a job with advanced filtering options. The user must be logged in
 * as the employer who posted the job. Includes comprehensive applicant details.
 * @response {boolean} success - Indicates if the operation was successful
 * @response {number} count - Total number of applications matching filters
 * @response {Array} applications - List of filtered application objects with detailed applicant info
 * @response {object} pagination - Pagination information
 * @response {object} filters - Applied filter criteria
 * @response {object} sorting - Applied sorting criteria
 */
export const getFilteredApplicationsForJob = (jobId, params) => {
    return axiosInstance.get(`${API_URL}/job/${jobId}/filtered`, { params });
};

/**
 * Fetches application statistics for a specific job (employer only).
 * @route GET /api/applications/job/:jobId/stats
 * @param {string|number} jobId - ID of the job to fetch statistics for
 * @returns {Promise} Axios response promise with application statistics
 * @description Returns statistical information about applications for a specific job.
 * The user must be logged in as the employer who posted the job.
 * @response {boolean} success - Indicates if the operation was successful
 * @response {object} statistics - Application statistics
 * @response {number} statistics.totalApplications - Total number of applications
 * @response {object} statistics.byStatus - Count of applications by status
 * @response {object} statistics.byDate - Applications received by date (last 30 days)
 * @response {Array} statistics.topSkills - Top 10 skills among applicants
 */
export const getApplicationStats = (jobId) => {
    return axiosInstance.get(`${API_URL}/job/${jobId}/stats`);
};

/**
 * Batch updates multiple application statuses (employer only).
 * @route PUT /api/applications/batch-update
 * @param {object} batchData - Batch update data
 * @param {Array} batchData.applications - Array of application objects to update
 * @param {string|number} batchData.applications[].id - Application ID
 * @param {string} batchData.applications[].status - New status for this application
 * @returns {Promise} Axios response promise with batch update results
 * @description Updates the status of multiple applications in a single request.
 * The user must be logged in as the employer who owns all the jobs.
 * @response {boolean} success - Indicates if the operation was successful
 * @response {string} message - Success message with count of updated applications
 * @response {Array} applications - List of updated application objects with related data
 */
export const batchUpdateApplicationStatus = (batchData) => {
    return axiosInstance.put(`${API_URL}/batch-update`, batchData);
};

// Add other application-related functions here (e.g., withdrawApplication) 