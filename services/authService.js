import axiosInstance from '@/utils/axiosInstance';

const API_URL = '/auth'; // Base path for auth endpoints

/**
 * Register a new user
 * @route POST /api/auth/register
 * @param {Object} userData - User registration data
 * @param {string} userData.name - User's full name
 * @param {string} userData.email - User's email address
 * @param {string} userData.phone_number - User's phone number
 * @param {string} userData.password - User's password
 * @param {string} userData.role - User role ('jobseeker' or 'employer')
 * @param {string} [userData.company_name] - Company name (required if role is 'employer')
 * @returns {Promise} Axios response promise
 * @response {boolean} success - Indicates if registration was successful
 * @response {string} message - Success/error message
 * @response {Object} user - User data (id, name, email, role, isEmailVerified, is2FAEnabled, avatarUrl)
 * @description Creates a new user account and sends a verification email with OTP.
 */
export const registerUser = (userData) => {
  return axiosInstance.post(`${API_URL}/register`, userData);
};

/**
 * Login user
 * @route POST /api/auth/login
 * @param {Object} credentials - Login credentials
 * @param {string} credentials.email - User's email address
 * @param {string} credentials.password - User's password
 * @param {string} [credentials.totpToken] - 2FA token (required if 2FA is enabled)
 * @returns {Promise} Axios response promise
 * @response {boolean} success - Indicates if login was successful
 * @response {string} message - Success/error message
 * @response {string} token - JWT access token
 * @response {string} refreshToken - JWT refresh token
 * @response {Object} user - User data (id, name, email, role, isEmailVerified, is2FAEnabled, avatarUrl)
 * @response {boolean} [require2FA] - Indicates if 2FA code is required (if 2FA is enabled)
 * @description Authenticates user credentials and returns tokens for authenticated requests.
 */
export const loginUser = (credentials) => {
  return axiosInstance.post(`${API_URL}/login`, credentials);
};

/**
 * Logout user
 * @route POST /api/auth/logout
 * @returns {Promise} Axios response promise
 * @response {boolean} success - Indicates if logout was successful
 * @response {string} message - Success/error message
 * @description Logs out the current user and updates their login status.
 * Requires authentication token in the header.
 */
export const logoutUser = () => {
  // Retrieve token from localStorage to send in header (handled by interceptor)
  return axiosInstance.post(`${API_URL}/logout`);
};

/**
 * Verify email with OTP
 * @route POST /api/auth/verify-email
 * @param {Object} data - Verification data
 * @param {string} data.email - User's email address
 * @param {string} data.otp - One-time password sent to email
 * @returns {Promise} Axios response promise
 * @response {boolean} success - Indicates if verification was successful
 * @response {string} message - Success/error message
 * @response {string} token - JWT access token
 * @response {string} refreshToken - JWT refresh token
 * @response {Object} user - User data (id, name, email, role, isEmailVerified, is2FAEnabled, avatarUrl)
 * @description Verifies a user's email using the OTP sent during registration.
 * If successful, user is marked as verified and logged in.
 */
export const verifyEmail = (data) => {
  return axiosInstance.post(`${API_URL}/verify-email`, data);
};

/**
 * Resend verification OTP
 * @route POST /api/auth/resend-otp
 * @param {Object} data - Request data
 * @param {string} data.email - User's email address
 * @returns {Promise} Axios response promise
 * @response {boolean} success - Indicates if OTP was sent successfully
 * @response {string} message - Success/error message
 * @description Generates a new OTP and sends it to the user's email for verification.
 */
export const resendOtp = (data) => {
  return axiosInstance.post(`${API_URL}/resend-otp`, data);
};

/**
 * Forgot password
 * @route POST /api/auth/forgot-password
 * @param {Object} data - Request data
 * @param {string} data.email - User's email address
 * @returns {Promise} Axios response promise
 * @response {boolean} success - Indicates if password reset email was sent
 * @response {string} message - Success/error message
 * @description Generates a password reset token and sends a reset link to the user's email.
 */
export const forgotPassword = (data) => {
  return axiosInstance.post(`${API_URL}/forgot-password`, data);
};

/**
 * Reset password
 * @route POST /api/auth/reset-password
 * @param {Object} data - Reset password data
 * @param {string} data.token - Reset token from email link
 * @param {string} data.password - New password
 * @returns {Promise} Axios response promise
 * @response {boolean} success - Indicates if password reset was successful
 * @response {string} message - Success/error message
 * @description Resets a user's password using the token sent via email.
 * Token is valid for 10 minutes.
 */
export const resetPassword = (data) => {
  return axiosInstance.post(`${API_URL}/reset-password`, data);
};

/**
 * Update password
 * @route PUT /api/auth/update-password
 * @param {Object} data - Update password data
 * @param {string} data.currentPassword - Current password
 * @param {string} data.password - New password
 * @returns {Promise} Axios response promise
 * @response {boolean} success - Indicates if password update was successful
 * @response {string} message - Success/error message
 * @description Updates the password for the authenticated user.
 * Requires authentication token in the header.
 */
export const updatePassword = (data) => {
  return axiosInstance.put(`${API_URL}/update-password`, data);
};

/**
 * Request OTP for login
 * @route POST /api/auth/request-otp
 * @param {Object} data - Request data
 * @param {string} data.email - User's email address
 * @returns {Promise} Axios response promise
 * @response {boolean} success - Indicates if OTP was sent successfully
 * @response {string} message - Success/error message
 * @description Generates an OTP and sends it to the user's email for passwordless login.
 */
export const requestOtpLogin = (data) => {
  return axiosInstance.post(`${API_URL}/request-otp`, data);
};

/**
 * Verify OTP and login
 * @route POST /api/auth/verify-otp
 * @param {Object} data - Verification data
 * @param {string} data.email - User's email address
 * @param {string} data.otp - One-time password sent to email
 * @returns {Promise} Axios response promise
 * @response {boolean} success - Indicates if verification was successful
 * @response {string} message - Success/error message
 * @response {string} token - JWT access token
 * @response {string} refreshToken - JWT refresh token
 * @response {Object} user - User data (id, name, email, role, isEmailVerified, is2FAEnabled, avatarUrl)
 * @description Verifies OTP for passwordless login and returns authentication tokens.
 */
export const verifyOtpLogin = (data) => {
  return axiosInstance.post(`${API_URL}/verify-otp`, data);
};

/**
 * Initialize two-factor authentication
 * @route POST /api/auth/initialize-2fa
 * @returns {Promise} Axios response promise
 * @response {boolean} success - Indicates if 2FA initialization was successful
 * @response {string} message - Success/error message
 * @response {string} secret - 2FA secret key (base32 encoded)
 * @response {string} qrCode - QR code data URL for scanning with authenticator app
 * @description Initializes 2FA for the authenticated user by generating a secret key.
 * Requires authentication token in the header.
 */
export const initialize2FA = () => {
  return axiosInstance.post(`${API_URL}/initialize-2fa`);
};

/**
 * Enable two-factor authentication
 * @route POST /api/auth/enable-2fa
 * @param {Object} data - Verification data
 * @param {string} data.token - TOTP code from authenticator app
 * @returns {Promise} Axios response promise
 * @response {boolean} success - Indicates if 2FA was enabled successfully
 * @response {string} message - Success/error message
 * @description Enables 2FA for the authenticated user after verifying the token.
 * Requires authentication token in the header.
 */
export const enable2FA = (data) => {
  return axiosInstance.post(`${API_URL}/enable-2fa`, data);
};

/**
 * Disable two-factor authentication
 * @route POST /api/auth/disable-2fa
 * @param {Object} data - Verification data
 * @param {string} data.token - TOTP code from authenticator app
 * @returns {Promise} Axios response promise
 * @response {boolean} success - Indicates if 2FA was disabled successfully
 * @response {string} message - Success/error message
 * @description Disables 2FA for the authenticated user after verifying the token.
 * Requires authentication token in the header.
 */
export const disable2FA = (data) => {
  return axiosInstance.post(`${API_URL}/disable-2fa`, data);
};

/**
 * Refresh token
 * @route POST /api/auth/refresh-token
 * @param {Object} data - Refresh data
 * @param {string} data.refreshToken - JWT refresh token
 * @returns {Promise} Axios response promise
 * @response {boolean} success - Indicates if token refresh was successful
 * @response {string} message - Success/error message
 * @response {string} token - New JWT access token
 * @description Generates a new access token using the refresh token.
 */
export const refreshToken = (data) => {
  return axiosInstance.post(`${API_URL}/refresh-token`, data);
}; 