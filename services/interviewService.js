import axiosInstance from '../utils/axiosInstance';

/**
 * Schedule an interview for a shortlisted application
 * @param {Object} interviewData - Interview data
 * @param {string} interviewData.applicationId - ID of the application to schedule interview for
 * @param {string} interviewData.scheduledDate - Date and time of the interview
 * @param {string} interviewData.endTime - End time of the interview
 * @param {string} interviewData.interviewType - Type of interview (e.g., In-person, Virtual, Phone)
 * @param {string} [interviewData.location] - Location of the interview (required for in-person interviews)
 * @param {string} [interviewData.description] - Additional details about the interview
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if interview was scheduled successfully
 *   - message: {string} - Success or error message
 *   - interview: {Object} - Created interview with related data
 */
export const scheduleInterview = async (interviewData) => {
  return axiosInstance.post('/interviews/schedule-interview', interviewData);
};

/**
 * Get interviews for a specific application
 * @param {string} applicationId - ID of the application
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the request was successful
 *   - count: {number} - Number of interviews found
 *   - interviews: {Array<Object>} - List of interviews
 */
export const getInterviewsByApplication = async (applicationId) => {
  return axiosInstance.post(`/interviews/get-by-application/${applicationId}`);
};

/**
 * Get upcoming interviews for the current user (employer or jobseeker)
 * @param {Object} [options] - Options for filtering and pagination
 * @param {number} [options.page=1] - Page number for pagination
 * @param {number} [options.limit=10] - Number of interviews per page
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the request was successful
 *   - count: {number} - Total number of interviews matching criteria
 *   - interviews: {Array<Object>} - List of upcoming interviews
 *   - pagination: {Object} - Pagination details
 *     - currentPage: {number} - Current page
 *     - totalPages: {number} - Total pages
 *     - hasNextPage: {boolean} - Whether there are more pages after current
 *     - hasPreviousPage: {boolean} - Whether there are pages before current
 *     - totalInterviews: {number} - Total number of interviews
 */
export const getUpcomingInterviews = async (options = {}) => {
  const { page, limit } = options;
  let url = '/interviews/get-upcoming-interviews';
  
  const queryParams = [];
  if (page) queryParams.push(`page=${page}`);
  if (limit) queryParams.push(`limit=${limit}`);
  
  if (queryParams.length > 0) {
    url = `${url}?${queryParams.join('&')}`;
  }
  
  return axiosInstance.post(url);
};

/**
 * Get interview by ID
 * @param {string} interviewId - ID of the interview
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the request was successful
 *   - interview: {Object} - Interview details with related data
 */
export const getInterviewById = async (interviewId) => {
  return axiosInstance.post(`/interviews/get-by-id/${interviewId}`);
};

/**
 * Update interview details
 * @param {string} interviewId - ID of the interview to update
 * @param {Object} interviewData - Updated interview data
 * @param {string} [interviewData.scheduledDate] - New date and time
 * @param {string} [interviewData.endTime] - New end time
 * @param {string} [interviewData.interviewType] - New interview type
 * @param {string} [interviewData.location] - New location
 * @param {string} [interviewData.description] - New description
 * @param {string} [interviewData.status] - New status (e.g., Scheduled, Completed, Cancelled, Rescheduled)
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if interview was updated successfully
 *   - message: {string} - Success or error message
 *   - interview: {Object} - Updated interview with related data
 */
export const updateInterview = async (interviewId, interviewData) => {
  return axiosInstance.post(`/interviews/update-interview/${interviewId}`, interviewData);
};

/**
 * Submit employer feedback for an interview
 * @param {string} interviewId - ID of the interview
 * @param {Object} feedbackData - Feedback data
 * @param {string} feedbackData.feedback - Employer's feedback for the interview
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if feedback was submitted successfully
 *   - message: {string} - Success or error message
 *   - interview: {Object} - Updated interview with the feedback
 */
export const submitEmployerFeedback = async (interviewId, feedbackData) => {
  return axiosInstance.post(`/interviews/submit-employer-feedback/${interviewId}`, feedbackData);
};

/**
 * Submit candidate feedback for an interview
 * @param {string} interviewId - ID of the interview
 * @param {Object} feedbackData - Feedback data
 * @param {string} feedbackData.candidateFeedback - Candidate's feedback for the interview
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if feedback was submitted successfully
 *   - message: {string} - Success or error message
 *   - interview: {Object} - Updated interview with the candidate feedback
 */
export const submitCandidateFeedback = async (interviewId, feedbackData) => {
  return axiosInstance.post(`/interviews/submit-candidate-feedback/${interviewId}`, feedbackData);
}; 