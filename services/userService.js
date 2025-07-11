import axiosInstance from '../utils/axiosInstance';

/**
 * Get current user's profile
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the request was successful
 *   - avatarBlob: {string|null} - Base64 encoded avatar image if exists
 *   - user: {Object} - User profile data
 *     - id: {number} - User ID
 *     - name: {string} - User's name
 *     - email: {string} - User's email
 *     - phone_number: {string} - User's phone number
 *     - role: {string} - User's role
 *     - isEmailVerified: {boolean} - Whether email is verified
 *     - is2FAEnabled: {boolean} - Whether 2FA is enabled
 *     - avatarUrl: {string} - URL to user's avatar
 *     - googleId: {string|null} - Google ID if linked
 *     - createdAt: {string} - Account creation date
 *     - updatedAt: {string} - Last update date
 *     - lastLogin: {string} - Last login date
 */
export const getProfile = async () => {
  return axiosInstance.post('/users/get-profile');
};

/**
 * Update current user's profile
 * @param {Object} userData - User data to update
 * @param {string} [userData.name] - User's name
 * @param {string} [userData.phone_number] - User's phone number
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if profile was updated successfully
 *   - message: {string} - Success message
 *   - avatarBlob: {string|null} - Base64 encoded avatar image if exists
 *   - user: {Object} - Updated user profile data
 *     - id: {number} - User ID
 *     - name: {string} - User's name
 *     - email: {string} - User's email
 *     - phone_number: {string} - User's phone number
 *     - role: {string} - User's role
 *     - isEmailVerified: {boolean} - Whether email is verified
 *     - is2FAEnabled: {boolean} - Whether 2FA is enabled
 *     - avatarUrl: {string} - URL to user's avatar
 */
export const updateProfile = async (userData) => {
  return axiosInstance.post('/users/update-profile', userData);
};

/**
 * Get user by ID (admin only)
 * @param {string} userId - User ID to retrieve
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the request was successful
 *   - user: {Object} - User profile data
 */
export const getUserById = async (userId) => {
  return axiosInstance.post(`/users/get-user-by-id/${userId}`);
};

/**
 * Get all users (admin only)
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the request was successful
 *   - count: {number} - Number of users
 *   - users: {Array<Object>} - List of user profiles
 */
export const getAllUsers = async () => {
  return axiosInstance.post('/users/get-all-users');
};

/**
 * Delete user (admin only)
 * @param {string} userId - User ID to delete
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if user was deleted successfully
 *   - message: {string} - Success message
 */
export const deleteUser = async (userId) => {
  return axiosInstance.post(`/users/delete-user/${userId}`);
};

export const updatePrivacySettings = () => {
  return {
    data: {
      success: true,
      message: "Privacy settings updated successfully",
    },
  };
};

export const updateAccessibilitySettings = () => {
  return {
    data: {
      success: true,
      message: "Accessibility settings updated successfully",
    },
  };
};

export const updateNotificationPreferences = () => {
  return {
    data: {
      success: true,
      message: "Notification preferences updated successfully",
    },
  };
};
