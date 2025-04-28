import axiosInstance from '@/utils/axiosInstance';

const API_URL = '/users'; // Base path for user endpoints

/**
 * Updates the logged-in user's profile information.
 * @route PUT /api/users/me
 * @param {object} profileData - The profile data to update.
 * @param {string} [profileData.name] - User's name.
 * @param {string} [profileData.phone_number] - User's phone number.
 * @param {string} [profileData.avatarUrl] - URL of the user's avatar image.
 * @returns {Promise} Axios response promise with updated user data.
 */
export const updateProfile = (profileData) => {
  // The auth token will be added automatically by the axios interceptor
  return axiosInstance.put(`${API_URL}/me`, profileData);
};

/**
 * Fetches the logged-in user's profile information.
 * @route GET /api/users/me
 * @returns {Promise} Axios response promise with the user's data.
 */
export const getProfile = () => {
    return axiosInstance.get(`${API_URL}/me`);
};

/**
 * Fetches a specific user's profile information by ID (Admin only).
 * @route GET /api/users/:id
 * @param {string|number} userId - The ID of the user to fetch.
 * @returns {Promise} Axios response promise with the user's data.
 * @description Requires admin privileges.
 */
export const getUserById = (userId) => {
    return axiosInstance.get(`${API_URL}/${userId}`);
};

/**
 * Fetches all users (Admin only).
 * @route GET /api/users
 * @param {object} [params] - Optional query parameters (e.g., for pagination if implemented in backend).
 * @returns {Promise} Axios response promise with a list of all users.
 * @description Requires admin privileges.
 */
export const getAllUsers = (params) => {
    return axiosInstance.get(API_URL, { params });
};

/**
 * Deletes a specific user by ID (Admin only).
 * @route DELETE /api/users/:id
 * @param {string|number} userId - The ID of the user to delete.
 * @returns {Promise} Axios response promise with success message.
 * @description Requires admin privileges.
 */
export const deleteUser = (userId) => {
    return axiosInstance.delete(`${API_URL}/${userId}`);
};

export const updateNotificationPreferences = () => {
    return true;
}

export const updateAccessibilitySettings = () => {
    return true;
}

export const updatePrivacySettings = () => {
    return true;
}

export const getUsersStats = () => {
    return true;
}

export const getLatestUsers = () => {
    return true;
}

// Add other user-related service functions here (e.g., uploadAvatar, etc.) 