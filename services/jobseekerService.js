import axiosInstance from '@/utils/axiosInstance';

const API_URL = '/jobseekers'; // Base path for job seeker endpoints

/**
 * Creates a job seeker profile for the logged-in user.
 * @route POST /api/jobseekers
 * @param {object} profileData - Data for the new job seeker profile
 * @param {string} [profileData.headline] - Profile headline
 * @param {string} [profileData.summary] - Profile summary
 * @param {string} [profileData.location] - Job seeker's location
 * @param {number} [profileData.current_salary] - Current salary
 * @param {number} [profileData.expected_salary] - Expected salary
 * @param {number} [profileData.experience_years] - Years of experience
 * @param {number} [profileData.notice_period] - Notice period in days/weeks/months
 * @param {string} [profileData.availability_status] - Current availability status (e.g., 'Actively Looking', 'Open to Offers')
 * @returns {Promise} Axios response promise
 * @response {boolean} success - Indicates if creation was successful
 * @response {string} message - Success/error message
 * @response {Object} jobSeeker - Created job seeker profile data
 * @description Creates a job seeker profile for the authenticated user.
 * A user can only have one job seeker profile.
 * Requires authentication token in the header with jobseeker role.
 */
export const createJobSeekerProfile = (profileData) => {
  return axiosInstance.post(API_URL, profileData);
};

/**
 * Fetches the logged-in user's job seeker profile.
 * @route GET /api/jobseekers/me
 * @returns {Promise} Axios response promise
 * @response {boolean} success - Indicates if request was successful
 * @response {Object} jobSeeker - Job seeker profile data
 * @response {number} jobSeeker.id - Profile ID
 * @response {string} jobSeeker.headline - Profile headline
 * @response {string} jobSeeker.summary - Profile summary
 * @response {string} jobSeeker.location - Job seeker's location
 * @response {number} jobSeeker.current_salary - Current salary
 * @response {number} jobSeeker.expected_salary - Expected salary
 * @response {number} jobSeeker.experience_years - Years of experience
 * @response {number} jobSeeker.notice_period - Notice period
 * @response {string} jobSeeker.availability_status - Availability status
 * @response {Object} jobSeeker.user - Associated user data
 * @response {number} jobSeeker.user.id - User ID
 * @response {string} jobSeeker.user.name - User's name
 * @response {string} jobSeeker.user.email - User's email
 * @response {string} jobSeeker.user.phone_number - User's phone number
 * @response {string} jobSeeker.user.avatarUrl - User's avatar URL
 * @description Retrieves the job seeker profile of the authenticated user.
 * Requires authentication token in the header with jobseeker role.
 */
export const getMyJobSeekerProfile = () => {
  return axiosInstance.get(`${API_URL}/me`);
};

/**
 * Updates the logged-in user's job seeker profile.
 * @route PUT /api/jobseekers/me
 * @param {object} profileData - The profile data to update
 * @param {string} [profileData.headline] - Profile headline
 * @param {string} [profileData.summary] - Profile summary
 * @param {string} [profileData.location] - Job seeker's location
 * @param {number} [profileData.current_salary] - Current salary
 * @param {number} [profileData.expected_salary] - Expected salary
 * @param {number} [profileData.experience_years] - Years of experience
 * @param {number} [profileData.notice_period] - Notice period in days/weeks/months
 * @param {string} [profileData.availability_status] - Current availability status
 * @returns {Promise} Axios response promise
 * @response {boolean} success - Indicates if update was successful
 * @response {string} message - Success/error message
 * @response {Object} jobSeeker - Updated job seeker profile data
 * @description Updates the job seeker profile of the authenticated user.
 * Requires authentication token in the header with jobseeker role.
 */
export const updateMyJobSeekerProfile = (profileData) => {
  return axiosInstance.put(`${API_URL}/me`, profileData);
};

/**
 * Deletes the logged-in user's job seeker profile.
 * @route DELETE /api/jobseekers/me
 * @returns {Promise} Axios response promise
 * @response {boolean} success - Indicates if deletion was successful
 * @response {string} message - Success/error message
 * @description Permanently deletes the job seeker profile of the authenticated user.
 * Does not delete the associated user account.
 * Requires authentication token in the header with jobseeker role.
 */
export const deleteMyJobSeekerProfile = () => {
  return axiosInstance.delete(`${API_URL}/me`);
};

/**
 * Fetches a specific job seeker profile by ID.
 * @route GET /api/jobseekers/:id
 * @param {string|number} jobSeekerId - The ID of the job seeker to fetch
 * @returns {Promise} Axios response promise
 * @response {boolean} success - Indicates if request was successful
 * @response {Object} jobSeeker - Job seeker profile data with user information
 * @description Retrieves a job seeker profile by its ID.
 * Typically used by employers to view job seeker profiles.
 * Access control is handled by the backend.
 */
export const getJobSeekerById = (jobSeekerId) => {
  return axiosInstance.get(`${API_URL}/${jobSeekerId}`);
};

/**
 * Fetches all job seeker profiles.
 * @route GET /api/jobseekers
 * @returns {Promise} Axios response promise
 * @response {boolean} success - Indicates if request was successful
 * @response {number} count - Total number of job seekers
 * @response {Array} jobSeekers - Array of job seeker profile objects with user information
 * @description Retrieves all job seeker profiles.
 * This endpoint is typically restricted to admin users or employers with proper permissions.
 * Access control is handled by the backend.
 */
export const getAllJobSeekers = () => {
  return axiosInstance.get(API_URL);
};

/**
 * Fetches statistics for the job seeker dashboard.
 * @returns {Promise} Axios response promise with job seeker statistics
 * @description This is a placeholder function for future implementation.
 */
export const getJobseekerStats = () => {
  // TODO: Implement backend endpoint and connect
  return true;
};