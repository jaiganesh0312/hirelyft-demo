import axiosInstance from '../utils/axiosInstance';
import io from 'socket.io-client';

/**
 * Create a new complaint
 * @param {Object} complaintData - Complaint data
 * @param {string} complaintData.subject - Subject of the complaint
 * @param {string} complaintData.description - Detailed description of the complaint
 * @param {string} [complaintData.priority='Medium'] - Priority level (High, Medium, Low)
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if complaint was created successfully
 *   - message: {string} - Success or error message
 *   - complaint: {Object} - Created complaint with user information
 */
export const createComplaint = async (complaintData) => {
  return axiosInstance.post('/complaints/create-complaint', complaintData);
};

/**
 * Get all complaints (filtered by user role)
 * @param {Object} [options] - Filter and pagination options
 * @param {number} [options.page=1] - Page number for pagination
 * @param {number} [options.limit=10] - Number of complaints per page
 * @param {string} [options.status] - Filter by status (Open, In Progress, Closed)
 * @param {string} [options.priority] - Filter by priority (High, Medium, Low)
 * @param {boolean} [options.assigned] - For admins, filter to show only complaints assigned to them
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the request was successful
 *   - count: {number} - Total number of complaints matching criteria
 *   - complaints: {Array<Object>} - List of complaints with unread message counts
 *   - pagination: {Object} - Pagination details
 */
export const getComplaints = async (options = {}) => {
  const { page = 1, limit = 10, status, priority, assigned } = options;
  
  let url = `/complaints/get-all-complaints?page=${page}&limit=${limit}`;
  
  if (status) url += `&status=${status}`;
  if (priority) url += `&priority=${priority}`;
  if (assigned) url += `&assigned=${assigned}`;
  
  return axiosInstance.post(url);
};

/**
 * Get a specific complaint by ID
 * @param {string} complaintId - ID of the complaint to retrieve
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the request was successful
 *   - complaint: {Object} - Complaint details with related users and messages
 */
export const getComplaintById = async (complaintId) => {
  return axiosInstance.post(`/complaints/get-by-id/${complaintId}`);
};

/**
 * Update complaint status (admin only)
 * @param {string} complaintId - ID of the complaint to update
 * @param {Object} statusData - Status update data
 * @param {string} statusData.status - New status (Open, In Progress, Closed)
 * @param {string} [statusData.assignedTo] - ID of admin user to assign the complaint to (null to unassign)
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if status was updated successfully
 *   - message: {string} - Success or error message
 *   - complaint: {Object} - Updated complaint with related users
 */
export const updateComplaintStatus = async (complaintId, statusData) => {
  return axiosInstance.post(`/complaints/update-status/${complaintId}`, statusData);
};

/**
 * Close a complaint (admin only)
 * @param {string} complaintId - ID of the complaint to close
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if complaint was closed successfully
 *   - message: {string} - Success or error message
 *   - complaint: {Object} - Closed complaint with related users
 */
export const closeComplaint = async (complaintId) => {
  return axiosInstance.post(`/complaints/close-complaint/${complaintId}`);
};

/**
 * Send a message in a complaint chat
 * @param {string} complaintId - ID of the complaint
 * @param {Object} messageData - Message data
 * @param {string} messageData.text - Message text
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if message was sent successfully
 *   - message: {string} - Success or error message
 *   - chatMessage: {Object} - Created message with sender information
 */
export const sendMessage = async (complaintId, messageData) => {
  return axiosInstance.post('/complaints/send-message', {
    id: complaintId,
    ...messageData
  });
};

/**
 * Delete a message (soft delete)
 * @param {string} messageId - ID of the message to delete
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if message was deleted successfully
 *   - message: {string} - Success or error message
 */
export const deleteMessage = async (messageId) => {
  return axiosInstance.post(`/complaints/delete-message/${messageId}`);
};

/**
 * Get unread message count for the current user
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the request was successful
 *   - unreadCount: {number} - Number of unread messages
 */
export const getUnreadMessageCount = async () => {
  return axiosInstance.post('/complaints/get-unread-message-count');
};

/**
 * Join a complaint chat room for real-time messaging
 * @param {string} complaintId - ID of the complaint
 * @param {Object} socket - Socket.io instance
 * @returns {Promise<Object>} - Promise that resolves when joined
 */
export const joinComplaintChat = (complaintId, socket) => {
  return new Promise((resolve, reject) => {
    if (!socket || !socket.connected) {
      reject(new Error('Socket is not connected'));
      return;
    }

    socket.emit('join_complaint_chat', complaintId);
    
    const handleJoined = (data) => {
      if (data.complaintId === complaintId) {
        socket.off('joined_complaint_chat', handleJoined);
        socket.off('error', handleError);
        resolve(data);
      }
    };
    
    const handleError = (error) => {
      socket.off('joined_complaint_chat', handleJoined);
      socket.off('error', handleError);
      reject(error);
    };
    
    socket.on('joined_complaint_chat', handleJoined);
    socket.on('error', handleError);
  });
};

/**
 * Send a real-time message via socket in a complaint chat
 * @param {Object} messageData - Message data
 * @param {string} messageData.complaintId - ID of the complaint
 * @param {string} messageData.text - Message text
 * @param {Object} socket - Socket.io instance
 * @returns {Promise<Object>} - Promise that resolves with sent message
 */
export const sendSocketMessage = (messageData, socket) => {
  return new Promise((resolve, reject) => {
    if (!socket || !socket.connected) {
      reject(new Error('Socket is not connected'));
      return;
    }

    socket.emit('send_complaint_message', messageData);
    
    // Since we don't get a direct response for the specific message, 
    // we'll set up a listener for the next new complaint message
    const handleNewMessage = (message) => {
      if (message.complaintId === messageData.complaintId && 
          message.text === messageData.text) {
        socket.off('new_complaint_message', handleNewMessage);
        socket.off('error', handleError);
        resolve(message);
      }
    };
    
    const handleError = (error) => {
      socket.off('new_complaint_message', handleNewMessage);
      socket.off('error', handleError);
      reject(error);
    };
    
    socket.on('new_complaint_message', handleNewMessage);
    socket.on('error', handleError);
    
    // Set a timeout in case we don't get a response
    setTimeout(() => {
      socket.off('new_complaint_message', handleNewMessage);
      socket.off('error', handleError);
      resolve({ sent: true });  // Assume it sent anyway after timeout
    }, 5000);
  });
}; 