import axiosInstance from '@/utils/axiosInstance';

const API_URL = '/messages'; // Base path for messaging endpoints

/**
 * Fetches the logged-in user's conversations.
 * @route GET /api/messages/conversations
 * @param {object} [params] - Query parameters
 * @returns {Promise} Axios response promise with list of conversations
 * @description Retrieves all conversations that the current user is part of.
 * Returns conversations with the most recent message first, including information
 * about the other participant, last message, and unread message count.
 * @response {boolean} success - Indicates if the operation was successful
 * @response {Array} conversations - List of conversation objects with:
 * @response {string} conversations[].id - Conversation ID
 * @response {object} conversations[].participant - Other user in the conversation (id, name, email, avatarUrl)
 * @response {object} conversations[].lastMessage - Most recent message in the conversation (if any)
 * @response {number} conversations[].unreadCount - Number of unread messages in this conversation
 * @response {Date} conversations[].updatedAt - When the conversation was last updated
 */
export const getConversations = (params) => {
    return axiosInstance.get(`${API_URL}/conversations`, { params });
};

/**
 * Fetches messages for a specific conversation.
 * @route GET /api/messages/conversations/:conversationId
 * @param {string|number} conversationId - The ID of the conversation
 * @param {object} [params] - Query parameters
 * @param {number} [params.page=1] - Page number for pagination
 * @param {number} [params.limit=20] - Number of messages per page
 * @returns {Promise} Axios response promise with paginated list of messages
 * @description Retrieves messages for a specific conversation, with newest messages first.
 * Automatically marks previously unread messages as read when accessed.
 * The user must be a participant in the conversation to access messages.
 * @response {boolean} success - Indicates if the operation was successful
 * @response {Array} messages - List of messages in the conversation
 * @response {number} totalPages - Total number of pages available
 * @response {number} currentPage - Current page number
 * @response {number} totalMessages - Total number of messages in the conversation
 */
export const getMessages = (conversationId, params) => {
    return axiosInstance.get(`${API_URL}/conversations/${conversationId}`, { params });
};

/**
 * Starts a new conversation with a recipient.
 * @route POST /api/messages/conversations
 * @param {object} data - Conversation data
 * @param {string|number} data.recipientId - ID of the user to start conversation with
 * @param {string} [data.initialMessage] - First message to send in the conversation
 * @returns {Promise} Axios response promise with the new conversation details
 * @description Creates a new conversation with another user and optionally sends an initial message.
 * Role-based rules apply: employers can only message jobseekers and vice versa.
 * If a conversation already exists between the users, it will be reused.
 * @response {boolean} success - Indicates if the operation was successful
 * @response {object} conversation - The created or existing conversation
 * @response {string} conversation.id - Conversation ID
 * @response {Date} conversation.createdAt - When the conversation was created
 * @response {string|number} conversation.recipientId - ID of the recipient
 * @response {object} conversation.initialMessage - First message if one was sent
 */
export const startConversation = (data) => {
    return axiosInstance.post(`${API_URL}/conversations`, data);
};

/**
 * Sends a message in a specific conversation.
 * @route POST /api/messages/conversations/:conversationId/messages
 * @param {string|number} conversationId - The ID of the conversation
 * @param {object} messageData - The message data
 * @param {string} messageData.text - The message text content
 * @param {string} [messageData.attachmentUrl] - URL to an attachment (if any)
 * @param {string} [messageData.attachmentType] - Type of attachment (if any)
 * @returns {Promise} Axios response promise with the sent message details
 * @description Sends a new message in an existing conversation.
 * The user must be a participant in the conversation.
 * Role-based messaging rules apply (employers can't message employers, jobseekers can't message jobseekers).
 * @response {boolean} success - Indicates if the operation was successful
 * @response {object} message - The sent message with full details including:
 * @response {string} message.id - Message ID
 * @response {string} message.text - Message content
 * @response {string} message.conversationId - ID of the conversation
 * @response {string} message.senderId - ID of the sender
 * @response {object} message.sender - Sender information (id, name, avatarUrl)
 * @response {Date} message.createdAt - When the message was sent
 * @response {boolean} message.isRead - Whether the message has been read
 * @response {string} [message.attachmentUrl] - URL to any attachment
 * @response {string} [message.attachmentType] - Type of any attachment
 */
export const sendMessage = (conversationId, messageData) => {
    return axiosInstance.post(`${API_URL}/conversations/${conversationId}/messages`, messageData);
};

/**
 * Deletes a specific message (only owner can delete).
 * @route DELETE /api/messages/:messageId
 * @param {string|number} messageId - The ID of the message
 * @returns {Promise} Axios response promise with success status
 * @description Soft-deletes a message. Only the sender of the message can delete it.
 * The message will be marked as deleted but not physically removed from the database.
 * @response {boolean} success - Indicates if the operation was successful
 * @response {string} message - Success message
 */
export const deleteMessage = (messageId) => {
    return axiosInstance.delete(`${API_URL}/${messageId}`);
};

/**
 * Deletes/leaves a conversation.
 * @route DELETE /api/messages/conversations/:conversationId
 * @param {string|number} conversationId - The ID of the conversation
 * @returns {Promise} Axios response promise with success status
 * @description Removes the user from a conversation. If both participants leave,
 * the conversation and its messages will be soft-deleted.
 * @response {boolean} success - Indicates if the operation was successful
 * @response {string} message - Success message
 */
export const deleteConversation = (conversationId) => {
    return axiosInstance.delete(`${API_URL}/conversations/${conversationId}`);
};

/**
 * Searches for users to start a conversation with.
 * @route GET /api/messages/users/search
 * @param {object} params - Search parameters
 * @param {string} params.query - Search term (minimum 2 characters)
 * @returns {Promise} Axios response promise with matching users
 * @description Searches for users by name or email that the current user can message.
 * Results are filtered based on role compatibility:
 * - Employers can only message jobseekers
 * - Jobseekers can only message employers
 * - Admins can message anyone
 * @response {boolean} success - Indicates if the operation was successful
 * @response {Array} users - List of matching users
 * @response {string} users[].id - User ID
 * @response {string} users[].name - User's name
 * @response {string} users[].email - User's email
 * @response {string} users[].avatarUrl - User's avatar URL
 * @response {string} users[].role - User's role
 */
export const searchUsers = (params) => {
    return axiosInstance.get(`${API_URL}/users/search`, { params });
};

/**
 * Gets the total unread message count for the user.
 * @returns {Promise} Axios response with unread message count
 * @description Returns the total number of unread messages for the current user.
 * @response {object} data - Response data
 * @response {number} data.count - Number of unread messages
 */
export const getUnreadMessageCount = () => {
    // Replace this mock with an actual API call when endpoint is available
    return {data: {count: 10}};
};