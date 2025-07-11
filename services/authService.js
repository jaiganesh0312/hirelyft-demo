import axiosInstance from '../utils/axiosInstance';

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @param {string} userData.name - User's full name
 * @param {string} userData.email - User's email address
 * @param {string} userData.phone_number - User's phone number
 * @param {string} userData.password - User's password
 * @param {string} userData.role - User's role (jobseeker/employer)
 * @param {File} [avatar] - Optional avatar file
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the registration was successful
 *   - message: {string} - Success or error message
 *   - user: {Object} - User data if registration was successful
 *     - id: {number} - User ID
 *     - name: {string} - User's name
 *     - email: {string} - User's email
 *     - role: {string} - User's role
 *     - isEmailVerified: {boolean} - Email verification status
 *     - is2FAEnabled: {boolean} - Two-factor authentication status
 *     - avatarUrl: {string|null} - URL to the user's avatar if uploaded
 *   - avatarBlob: {string|null} - Base64 encoded avatar image if provided
 */
export const registerUser = async (userData, avatar = null) => {
  return axiosInstance.post('/auth/register', userData);
};

/**
 * Login user with email and password
 * @param {Object} credentials - Login credentials
 * @param {string} credentials.email - User's email
 * @param {string} credentials.password - User's password
 * @param {string} [credentials.totpToken] - TOTP token for 2FA if enabled
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the login was successful
 *   - message: {string} - Success or error message
 *   - token: {string} - JWT authentication token
 *   - refreshToken: {string} - JWT refresh token for obtaining new auth tokens
 *   - csrfToken: {string} - CSRF protection token
 *   - user: {Object} - Logged in user data
 *     - id: {number} - User ID
 *     - name: {string} - User's name
 *     - email: {string} - User's email
 *     - role: {string} - User's role (jobseeker/employer)
 *     - isEmailVerified: {boolean} - Email verification status
 *     - is2FAEnabled: {boolean} - Two-factor authentication status
 *     - avatarUrl: {string|null} - URL to the user's avatar
 *   - avatarBlob: {string|null} - Base64 encoded avatar image if available
 */
export const loginUser = async (credentials) => {
  return axiosInstance.post('/auth/login', credentials);
};

/**
 * Request OTP for passwordless login
 * @param {string} email - User's email
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Always true regardless of whether email exists (for security)
 *   - message: {string} - Generic message indicating OTP was sent if email exists
 *   
 * Note: The API intentionally returns a generic message even if the email
 * doesn't exist in the system to prevent user enumeration attacks.
 */
export const requestOTP = async (email) => {
  return axiosInstance.post('/auth/request-otp', { email });
};

/**
 * Verify OTP for login
 * @param {Object} params - OTP verification parameters
 * @param {string} params.email - User's email
 * @param {string} params.otp - OTP code
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if OTP verification was successful
 *   - message: {string} - Success or error message
 *   - token: {string} - JWT authentication token if successful
 *   - refreshToken: {string} - JWT refresh token if successful
 *   - user: {Object} - User data if verification was successful
 *     - id: {number} - User ID
 *     - name: {string} - User's name
 *     - email: {string} - User's email
 *     - role: {string} - User's role
 *     - isEmailVerified: {boolean} - Email verification status
 *     - is2FAEnabled: {boolean} - Two-factor authentication status
 *     - avatarUrl: {string|null} - URL to the user's avatar
 *   - avatarBlob: {string|null} - Base64 encoded avatar image if available
 */
export const verifyOTP = async (params) => {
  return axiosInstance.post('/auth/verify-otp', params);
};

/**
 * Logout user
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if logout was successful
 *   - message: {string} - Success or error message
 * 
 * Note: This will invalidate the user's session on the server side.
 * Client-side tokens should be removed after receiving a successful response.
 */
export const logoutUser = async () => {
  return axiosInstance.post('/auth/logout');
};

/**
 * Verify user's email with OTP
 * @param {Object} params - Email verification parameters
 * @param {string} params.email - User's email
 * @param {string} params.otp - OTP code for verification
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if email verification was successful
 *   - message: {string} - Success or error message
 *   - token: {string} - JWT authentication token if successful
 *   - refreshToken: {string} - JWT refresh token if successful
 *   - csrfToken: {string} - CSRF protection token if successful
 *   - user: {Object} - User data with updated verification status
 *     - id: {number} - User ID
 *     - name: {string} - User's name
 *     - email: {string} - User's email
 *     - role: {string} - User's role
 *     - isEmailVerified: {boolean} - Will be true if verification successful
 *     - is2FAEnabled: {boolean} - Two-factor authentication status
 *     - avatarUrl: {string|null} - URL to the user's avatar
 *   - avatarBlob: {string|null} - Base64 encoded avatar image if available
 */
export const verifyEmail = async (params) => {
  return axiosInstance.post('/auth/verify-email', params);
};

/**
 * Resend verification OTP
 * @param {string} email - User's email
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Always true regardless of whether email exists (for security)
 *   - message: {string} - Generic message indicating OTP was sent if email exists
 * 
 * Note: The API intentionally returns a success response even if the email
 * doesn't exist in the system to prevent user enumeration attacks.
 */
export const resendOtp = async (email) => {
  return axiosInstance.post('/auth/resend-otp', { email });
};

/**
 * Initialize 2FA setup
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if 2FA initialization was successful
 *   - message: {string} - Success or error message
 *   - secret: {string} - Base32-encoded secret key for TOTP setup
 *   - qrCode: {string} - Data URL containing QR code image to scan with authenticator app
 * 
 * Note: The returned secret should be stored temporarily until the user
 * confirms 2FA setup by validating a TOTP code.
 */
export const initialize2FA = async () => {
  return axiosInstance.post('/auth/initialize-2fa');
};

/**
 * Enable 2FA for user
 * @param {string} totpToken - TOTP token from authenticator app
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if 2FA was enabled successfully
 *   - message: {string} - Success or error message
 * 
 * Note: This confirms the 2FA setup after initialization. The user must provide
 * a valid token from their authenticator app to verify proper setup.
 */
export const enable2FA = async (totpToken) => {
  return axiosInstance.post('/auth/enable-2fa', { token: totpToken });
};

/**
 * Disable 2FA for user
 * @param {string} totpToken - TOTP token from authenticator app
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if 2FA was disabled successfully
 *   - message: {string} - Success or error message
 * 
 * Note: This requires verification with a valid token to ensure the request
 * is made by the account owner, not by someone who gained access to their session.
 */
export const disable2FA = async (totpToken) => {
  return axiosInstance.post('/auth/disable-2fa', { token: totpToken });
};

/**
 * Request password reset
 * @param {string} email - User's email
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Always true regardless of whether email exists (for security)
 *   - message: {string} - Generic message indicating reset email was sent if email exists
 * 
 * Note: The API intentionally returns a success response even if the email
 * doesn't exist in the system to prevent user enumeration attacks.
 * A password reset link will be sent to the email if it exists in the database.
 */
export const forgotPassword = async (email) => {
  return axiosInstance.post('/auth/forgot-password', { email });
};

/**
 * Reset password using token
 * @param {Object} params - Password reset parameters
 * @param {string} params.token - Reset token from email
 * @param {string} params.password - New password
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if password reset was successful
 *   - message: {string} - Success or error message
 * 
 * Note: This endpoint verifies the reset token received via email
 * and updates the user's password if the token is valid and not expired.
 */
export const resetPassword = async (params) => {
  return axiosInstance.post('/auth/reset-password', params);
};

/**
 * Update password (requires authentication)
 * @param {Object} params - Password update parameters
 * @param {string} params.currentPassword - Current password
 * @param {string} params.password - New password
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if password update was successful
 *   - message: {string} - Success or error message
 * 
 * Note: This endpoint requires the user to be authenticated and
 * verify their current password before allowing a password change.
 * This is different from the reset password flow, which is for users
 * who cannot access their account.
 */
export const updatePassword = async (params) => {
  return axiosInstance.post('/auth/update-password', params);
};

/**
 * Refresh access token using refresh token
 * @param {string} refreshToken - Refresh token
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if token refresh was successful
 *   - message: {string} - Success or error message
 *   - token: {string} - New JWT access token
 *   - csrfToken: {string} - New CSRF protection token
 * 
 * Note: This endpoint is used when the main JWT token expires.
 * The refresh token has a longer lifetime and can be used to obtain
 * a new access token without requiring the user to log in again.
 */
export const refreshToken = async (refreshToken) => {
  return axiosInstance.post('/auth/refresh-token', { refreshToken });
};

/**
 * Check auth service health
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the auth service is running properly
 *   - message: {string} - Service status message
 *   - timestamp: {string} - ISO timestamp of when the request was processed
 * 
 * Note: This is a simple health check endpoint to verify the auth service
 * is operational and responding to requests.
 */
export const checkHealth = async () => {
  return axiosInstance.post('/auth/check-health');
}; 