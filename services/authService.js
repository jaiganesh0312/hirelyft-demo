import axiosInstance from '@/utils/axiosInstance';

const API_URL = '/auth'; // Base path for auth endpoints

export const registerUser = (userData) => {
  return axiosInstance.post(`${API_URL}/register`, userData);
};

export const loginUser = (credentials) => {
  return axiosInstance.post(`${API_URL}/login`, credentials);
};

export const logoutUser = () => {
  // Retrieve token from localStorage to send in header (handled by interceptor)
  return axiosInstance.post(`${API_URL}/logout`);
};

export const verifyEmail = (data) => {
  // data should contain { email, otp }
  return axiosInstance.post(`${API_URL}/verify-email`, data);
};

export const resendOtp = (data) => {
  // data should contain { email }
  return axiosInstance.post(`${API_URL}/resend-otp`, data);
};

export const forgotPassword = (data) => {
  // data should contain { email }
  return axiosInstance.post(`${API_URL}/forgot-password`, data);
};

export const resetPassword = (data) => {
  // data should contain { token (from email link), password, confirmPassword }
  // Note: The backend auth.routes.js uses a POST with token in the body
  return axiosInstance.post(`${API_URL}/reset-password`, data);
};

export const updatePassword = (data) => {
  // data should contain { currentPassword, newPassword, confirmPassword }
  // Requires auth token (handled by interceptor)
  return axiosInstance.put(`${API_URL}/update-password`, data);
};

// --- OTP Login --- TODO
export const requestOtpLogin = (data) => {
  // data should contain { email }
  return axiosInstance.post(`${API_URL}/request-otp`, data);
};

export const verifyOtpLogin = (data) => {
  // data should contain { email, otp }
  return axiosInstance.post(`${API_URL}/verify-otp`, data);
};


// --- 2FA --- TODO
export const initialize2FA = () => {
  // Requires auth token
  return axiosInstance.post(`${API_URL}/initialize-2fa`);
};

export const enable2FA = (data) => {
  // data should contain { token } (the TOTP code)
  // Requires auth token
  return axiosInstance.post(`${API_URL}/enable-2fa`, data);
};

export const disable2FA = (data) => {
   // data should contain { token } (the TOTP code)
   // Requires auth token
  return axiosInstance.post(`${API_URL}/disable-2fa`, data);
};

// --- Token Refresh (handled by interceptor, but might need explicit call sometimes) ---
// export const refreshToken = (data) => {
//   // data should contain { refreshToken }
//   return axiosInstance.post(`${API_URL}/refresh-token`, data);
// }; 