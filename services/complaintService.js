import axiosInstance from '@/utils/axiosInstance';

const API_URL = '/complaints'; // Base path for complaint endpoints

/**
 * Creates a new complaint.
 * @route POST /api/complaints
 * @param {object} complaintData - Data for the new complaint
 * @param {string} complaintData.subject - Subject/title of the complaint (required)
 * @param {string} complaintData.description - Detailed description of the issue (required)
 * @param {string} [complaintData.priority='Medium'] - Priority level ('Low', 'Medium', 'High')
 * @returns {Promise} Axios response promise with the created complaint data
 * @description Creates a new support complaint/ticket. Any authenticated user can create complaints.
 * The complaint will be automatically assigned a status of 'Open'.
 * @response {boolean} success - Indicates if the operation was successful
 * @response {string} message - Success message
 * @response {object} complaint - The created complaint with user information
 */
export const createComplaint = (complaintData) => {
    return axiosInstance.post(API_URL, complaintData);
};

/**
 * Fetches complaints.
 * @route GET /api/complaints
 * @param {object} params - Query parameters
 * @param {number} [params.page=1] - Page number for pagination
 * @param {number} [params.limit=10] - Number of results per page
 * @param {string} [params.status] - Filter by status ('Open', 'In Progress', 'Closed')
 * @param {string} [params.priority] - Filter by priority ('Low', 'Medium', 'High')
 * @param {boolean} [params.assigned] - For admins, whether to show only complaints assigned to them
 * @returns {Promise} Axios response promise with paginated list of complaints
 * @description For regular users, fetches their own complaints.
 * For admins, fetches all complaints or only those assigned to them (if 'assigned=true').
 * Includes unread message counts for each complaint.
 * @response {boolean} success - Indicates if the operation was successful
 * @response {number} count - Total number of complaints matching filters
 * @response {Array} complaints - List of complaints with user info and unread message counts
 * @response {object} pagination - Pagination information
 * @response {number} pagination.currentPage - Current page number
 * @response {number} pagination.totalPages - Total number of pages
 * @response {boolean} pagination.hasNextPage - Whether there are more pages
 * @response {boolean} pagination.hasPreviousPage - Whether there are previous pages
 * @response {number} pagination.totalComplaints - Total number of complaints matching filters
 */
export const getComplaints = (params) => {
    return axiosInstance.get(API_URL, { params });
};

/**
 * Fetches details for a single complaint.
 * @route GET /api/complaints/:id
 * @param {string|number} complaintId - The ID of the complaint
 * @returns {Promise} Axios response promise with complaint details and message history
 * @description Returns detailed information about a specific complaint, including all messages.
 * Access is restricted to the user who created the complaint and admin users.
 * Automatically marks unread messages as read when accessed.
 * @response {boolean} success - Indicates if the operation was successful
 * @response {object} complaint - Complete complaint details including:
 * @response {object} complaint.user - User who created the complaint
 * @response {object} complaint.assignedAdmin - Admin assigned to the complaint (if any)
 * @response {object} complaint.closingUser - Admin who closed the complaint (if closed)
 * @response {Array} complaint.messages - All messages in the complaint thread
 */
export const getComplaintById = (complaintId) => {
    return axiosInstance.get(`${API_URL}/${complaintId}`);
};

/**
 * Updates the status and/or assigned admin of a complaint (Admin only).
 * @route PUT /api/complaints/:id/status
 * @param {string|number} complaintId - The ID of the complaint
 * @param {object} updateData - Data for updating the complaint
 * @param {string} [updateData.status] - New status ('Open', 'In Progress', 'Closed')
 * @param {string|number|null} [updateData.assignedTo] - ID of admin to assign or null to unassign
 * @returns {Promise} Axios response promise with updated complaint details
 * @description Updates a complaint's status and/or assigns it to an admin. Admin-only function.
 * If status is set to 'Closed', the closing time and admin are automatically recorded.
 * @response {boolean} success - Indicates if the operation was successful
 * @response {string} message - Success message
 * @response {object} complaint - Updated complaint with all related data
 */
export const updateComplaintStatus = (complaintId, updateData) => {
    return axiosInstance.put(`${API_URL}/${complaintId}/status`, updateData);
};

/**
 * Closes a complaint (Admin only).
 * @route PUT /api/complaints/:id/close
 * @param {string|number} complaintId - The ID of the complaint
 * @returns {Promise} Axios response promise with updated complaint details
 * @description Marks a complaint as 'Closed'. Admin-only function.
 * Automatically records the closing time and admin who closed it.
 * @response {boolean} success - Indicates if the operation was successful
 * @response {string} message - Success message
 * @response {object} complaint - Updated complaint with closing information
 */
export const closeComplaint = (complaintId) => {
    return axiosInstance.put(`${API_URL}/${complaintId}/close`);
};

/**
 * Sends a message in a complaint chat.
 * @route POST /api/complaints/:id/messages
 * @param {string|number} complaintId - The ID of the complaint
 * @param {object} messageData - Message data
 * @param {string} messageData.text - The message text
 * @returns {Promise} Axios response promise with the sent message details
 * @description Sends a new message in a complaint conversation. Access is restricted to the
 * complaint creator, assigned admin, or any admin. Increments unread count for recipients.
 * @response {boolean} success - Indicates if the operation was successful
 * @response {string} message - Success message
 * @response {object} chatMessage - The created message with sender information
 * @response {object} chatMessage.sender - User who sent the message with id, name, email, avatarUrl
 */
export const sendComplaintMessage = (complaintId, messageData) => {
    return axiosInstance.post(`${API_URL}/${complaintId}/messages`, messageData);
};

/**
 * Deletes a message from a complaint chat (Admin or message owner).
 * @route DELETE /api/complaints/messages/:messageId
 * @param {string|number} messageId - The ID of the message
 * @returns {Promise} Axios response promise with success status
 * @description Soft-deletes a message from a complaint chat. Only the message 
 * sender or an admin can delete messages.
 * @response {boolean} success - Indicates if the operation was successful
 * @response {string} message - Success message
 */
export const deleteComplaintMessage = (messageId) => {
    return axiosInstance.delete(`${API_URL}/messages/${messageId}`);
};

/**
 * Gets the unread message count across all user's complaints.
 * @route GET /api/complaints/messages/unread/count
 * @returns {Promise} Axios response promise with unread count data
 * @description Returns the total number of unread messages across all of the user's complaints.
 * For regular users, counts messages in their complaints. For admins, counts messages in complaints assigned to them.
 * @response {boolean} success - Indicates if the operation was successful
 * @response {number} unreadCount - Total number of unread messages
 */
export const getUnreadMessageCount = () => {
    return axiosInstance.get(`${API_URL}/messages/unread/count`);
}; 

export const getComplaintsStats = () => {
    return true;
}
export const getRecentComplaints = () => {
    return true;
}