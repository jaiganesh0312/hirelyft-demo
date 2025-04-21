import axiosInstance from '@/utils/axiosInstance';

const API_URL = '/users'; // Base path for user endpoints

/**
 * Updates the logged-in user's profile information.
 * @param {object} profileData - The profile data to update (e.g., { name, phone_number, avatarUrl }).
 *                                The backend controller dictates the allowed fields.
 * @returns {Promise} Axios response promise
 */
export const updateProfile = (profileData) => {
  // The auth token will be added automatically by the axios interceptor
  return axiosInstance.put(`${API_URL}/me`, profileData);
  // Note: If the backend expects form-data (e.g., for file uploads), the Content-Type
  // and data format need to be adjusted here and in the axiosInstance for this specific call.
};

/**
 * Fetches the logged-in user's profile information.
 * (Optional: Often user data is already available in AuthContext,
 * but this can be used for fresh data retrieval if needed).
 * @returns {Promise} Axios response promise
 */
export const getProfile = () => {
    return axiosInstance.get(`${API_URL}/me`);
};

// Add other user-related service functions here (e.g., uploadAvatar, etc.) 