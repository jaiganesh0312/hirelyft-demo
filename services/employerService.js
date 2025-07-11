import axiosInstance from '../utils/axiosInstance';

/**
 * Create an employer profile
 * @param {Object} profileData - Profile data
 * @param {string} profileData.company_name - Company name
 * @param {string} [profileData.company_website] - Company website
 * @param {string} [profileData.company_logo] - Company logo URL
 * @param {string} [profileData.company_size] - Company size
 * @param {string} [profileData.industry] - Industry
 * @param {string} [profileData.location] - Location
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if profile was created successfully
 *   - message: {string} - Success or error message
 *   - employer: {Object} - Created employer profile
 */
export const createEmployerProfile = async (profileData) => {
  return axiosInstance.post('/employers/create-employer', profileData);
};

/**
 * Get current employer profile
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the request was successful
 *   - employer: {Object} - Employer profile data
 *     - id: {number} - Employer ID
 *     - userId: {number} - User ID
 *     - company_name: {string} - Company name
 *     - company_website: {string} - Company website
 *     - company_logo: {string} - Company logo URL
 *     - company_size: {string} - Company size
 *     - industry: {string} - Industry
 *     - location: {string} - Location
 *     - user_employer: {Object} - Associated user data
 *       - id: {number} - User ID
 *       - name: {string} - User's name
 *       - email: {string} - User's email
 *       - phone_number: {string} - User's phone number
 *       - avatarUrl: {string} - URL to user's avatar
 */
export const getMyEmployerProfile = async () => {
  return axiosInstance.post('/employers/get-my-profile');
};

/**
 * Update employer profile
 * @param {Object} profileData - Profile data to update
 * @param {string} [profileData.company_name] - Company name
 * @param {string} [profileData.company_website] - Company website
 * @param {string} [profileData.company_logo] - Company logo URL
 * @param {string} [profileData.company_size] - Company size
 * @param {string} [profileData.industry] - Industry
 * @param {string} [profileData.location] - Location
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if profile was updated successfully
 *   - message: {string} - Success or error message
 *   - employer: {Object} - Updated employer profile
 */
export const updateEmployerProfile = async (profileData) => {
  return axiosInstance.post('/employers/update-my-profile', profileData);
};

/**
 * Get employer dashboard statistics
 * @param {Object} [options] - Options
 * @param {number} [options.limit=5] - Limit for recent items
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the request was successful
 *   - data: {Object} - Dashboard data
 *     - stats: {Object} - Statistics
 *       - active_jobs: {number} - Number of active jobs
 *       - jobs_growth: {number} - Jobs growth percentage
 *       - total_applications: {number} - Total applications
 *       - applications_growth: {number} - Applications growth percentage
 *       - job_views: {number} - Job views
 *       - weekly_applications: {number} - Weekly applications
 *       - conversion_rate: {number} - Conversion rate
 *       - total_interviews: {number} - Total interviews
 *       - total_hired: {number} - Total hired
 *     - recentApplications: {Array<Object>} - Recent job applications
 *       - id: {string} - Application ID
 *       - created_at: {string} - Application date
 *       - status: {string} - Application status
 *       - applicant: {Object} - Applicant information
 *       - job: {Object} - Job information
 *     - activeJobs: {Array<Object>} - Active jobs
 *       - id: {string} - Job ID
 *       - title: {string} - Job title
 *       - location: {string} - Job location
 *       - is_active: {boolean} - Job active status
 *       - applications_count: {number} - Number of applications
 *     - unreadMessages: {Object} - Unread messages info
 *       - unreadMessages: {number} - Count of unread messages
 */
export const getEmployerDashboard = async (options = {}) => {
  const { limit } = options;
  let url = '/employers/get-dashboard';
  
  if (limit) {
    url += `?limit=${limit}`;
  }
  
  return axiosInstance.post(url);
};

/**
 * Create a member profile for the employer
 * @param {Object} memberData - Member data
 * @param {string} memberData.name - Name of the member
 * @param {string} memberData.email - Email of the member
 * @param {string} memberData.phone_number - Phone number of the member
 * @param {string} memberData.password - Password for the member account
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if member was created successfully
 *   - message: {string} - Success or error message
 *   - member: {Object} - Created member profile
 */
export const createMember = async (memberData) => {
  return axiosInstance.post('/employers/create-member', memberData);
};

/**
 * Get all members for the employer
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the request was successful
 *   - count: {number} - Number of members
 *   - max_members: {number} - Maximum allowed members
 *   - members: {Array<Object>} - List of member profiles
 *     - id: {number} - Member ID
 *     - userId: {number} - User ID
 *     - head_id: {number} - Head employer ID
 *     - company_name: {string} - Company name
 *     - user_employer: {Object} - Associated user data
 */
export const getAllMembers = async () => {
  return axiosInstance.post('/employers/get-all-members');
};

/**
 * Get member by ID
 * @param {string} memberId - Member ID
 * @param {string} headId - Head employer ID
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the request was successful
 *   - member: {Object} - Member profile
 */
export const getMemberById = async (memberId, headId) => {
  return axiosInstance.post(`/employers/get-member-by-id/${memberId}?head_id=${headId}`);
};

/**
 * Remove a member
 * @param {string} memberId - ID of the member to remove
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if member was removed successfully
 *   - message: {string} - Success or error message
 */
export const removeMember = async (memberId) => {
  return axiosInstance.post(`/employers/remove-member/${memberId}`);
}; 