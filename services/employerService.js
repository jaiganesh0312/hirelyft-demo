import axiosInstance from '@/utils/axiosInstance';

const API_URL = '/employers'; // Base path for employer endpoints

/**
 * Fetches the logged-in employer's profile.
 * @route GET /api/employers/me
 * @returns {Promise} Axios response promise
 * @response {boolean} success - Indicates if request was successful
 * @response {Object} employer - Employer profile data
 * @response {number} employer.id - Employer ID
 * @response {string} employer.company_name - Company name
 * @response {string} employer.company_website - Company website URL
 * @response {string} employer.company_logo - Company logo URL
 * @response {string} employer.company_size - Company size
 * @response {string} employer.industry - Industry sector
 * @response {string} employer.location - Company location
 * @response {number} employer.members_count - Number of team members
 * @response {number} employer.max_members - Maximum allowed team members
 * @response {Object} employer.user - Associated user data
 * @response {number} employer.user.id - User ID
 * @response {string} employer.user.name - User's name
 * @response {string} employer.user.email - User's email
 * @response {string} employer.user.phone_number - User's phone number
 * @response {string} employer.user.avatarUrl - User's avatar URL
 * @description Retrieves the profile of the authenticated employer.
 * Requires authentication token in the header with employer role.
 */
export const getMyEmployerProfile = () => {
  return axiosInstance.get(`${API_URL}/me`);
};

/**
 * Updates the logged-in employer's profile.
 * @route PUT /api/employers/me
 * @param {object} profileData - The profile data to update
 * @param {string} [profileData.company_name] - Employer's company name
 * @param {string} [profileData.company_website] - Company website URL
 * @param {string} [profileData.company_logo] - URL for the company logo
 * @param {string} [profileData.company_size] - Size of the company (e.g., '1-10 employees')
 * @param {string} [profileData.industry] - Company's industry sector
 * @param {string} [profileData.location] - Company's primary location
 * @returns {Promise} Axios response promise
 * @response {boolean} success - Indicates if update was successful
 * @response {string} message - Success/error message
 * @response {Object} employer - Updated employer profile data
 * @description Updates the profile of the authenticated employer. Only specified fields will be updated.
 * Requires authentication token in the header with employer role.
 */
export const updateMyEmployerProfile = (profileData) => {
  return axiosInstance.put(`${API_URL}/me`, profileData);
};

/**
 * Fetches a specific member employer profile by ID.
 * @route GET /api/employers/:id
 * @param {string|number} memberId - The ID of the member employer to fetch
 * @param {object} params - Query parameters
 * @param {string|number} params.head_id - The ID of the head employer (required)
 * @returns {Promise} Axios response promise
 * @response {boolean} success - Indicates if request was successful
 * @response {Object} member - Member employer profile data with user information
 * @description Used to fetch a member profile under a specific head employer.
 * The head_id query parameter is required to verify access rights.
 * Requires authentication token in the header.
 */
export const getMemberById = (memberId, params) => {
  return axiosInstance.get(`${API_URL}/${memberId}`, { params });
};

/**
 * Creates a new member profile under the logged-in employer.
 * @route POST /api/employers/member
 * @param {object} memberData - Data for the new member
 * @param {string|number} memberData.head_id - ID of the head employer (required)
 * @param {string} memberData.name - Member's name (required)
 * @param {string} memberData.email - Member's email (required)
 * @param {string} memberData.phone_number - Member's phone number
 * @param {string} memberData.password - Member's password (required)
 * @returns {Promise} Axios response promise
 * @response {boolean} success - Indicates if creation was successful
 * @response {string} message - Success/error message
 * @response {Object} member - Created member profile data
 * @description Creates a new member employer profile under the authenticated head employer.
 * The head employer must not exceed their maximum allowed members.
 * Member's email is automatically verified.
 * Requires authentication token in the header with employer role.
 */
export const createMember = (memberData) => {
  return axiosInstance.post(`${API_URL}/member`, memberData);
};

/**
 * Fetches all members associated with the logged-in employer.
 * @route GET /api/employers/:id/members
 * @returns {Promise} Axios response promise
 * @response {boolean} success - Indicates if request was successful
 * @response {number} count - Total number of members
 * @response {number} max_members - Maximum allowed members for the employer
 * @response {Array} members - Array of member profile objects with user information
 * @description Returns all members linked to the authenticated employer.
 * Requires authentication token in the header with employer role.
 */
export const getMyMembers = () => {
  return axiosInstance.get(`${API_URL}/members`);
};

/**
 * Removes (deletes) a member associated with the logged-in employer.
 * @route DELETE /api/employers/members/:id
 * @param {string|number} memberId - The ID of the member employer to remove
 * @returns {Promise} Axios response promise
 * @response {boolean} success - Indicates if removal was successful
 * @response {string} message - Success/error message
 * @description Deletes a member profile and the associated user account.
 * Updates the head employer's member count.
 * Requires authentication token in the header with employer role.
 */
export const removeMember = (memberId) => {
  return axiosInstance.delete(`${API_URL}/members/${memberId}`);
}; 


export const getEmployerStats = () => {
  return true;
};
export const  getRecentApplications = () => {
  return true;
}