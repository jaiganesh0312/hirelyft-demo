import axiosInstance from '../utils/axiosInstance';
import io from 'socket.io-client';

let socket = null;

/**
 * Initialize the socket connection
 * @param {string} token - Authentication token
 * @param {Function} onConnect - Callback for connection success
 * @param {Function} onError - Callback for connection error
 * @returns {Object} - Socket instance
 */
export const initializeSocket = (token, onConnect, onError) => {
  if (socket) {
    socket.disconnect();
  }

  // Create socket connection
  socket = io(process.env.NEXT_PUBLIC_API_URL || 'https://my-hirelyft-backend-production.up.railway.app', {
    auth: { token },
    transports: ['websocket'],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  // Setup event handlers
  socket.on('connect', () => {
    console.log('Socket connected');
    if (onConnect) onConnect();
  });

  socket.on('connect_error', (err) => {
    console.error('Socket connection error:', err);
    if (onError) onError(err);
  });

  socket.on('error', (err) => {
    console.error('Socket error:', err);
    if (onError) onError(err);
  });

  return socket;
};

/**
 * Get the current socket instance
 * @returns {Object|null} - Socket instance or null if not initialized
 */
export const getSocket = () => socket;

/**
 * Disconnect the socket
 */
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

/**
 * Get all conversations for the current user
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the request was successful
 *   - conversations: {Array<Object>} - List of conversations
 *     - id: {string} - Conversation ID
 *     - participant: {Object} - Other participant's information
 *     - lastMessage: {Object|null} - Last message in the conversation
 *     - unreadCount: {number} - Number of unread messages
 *     - updatedAt: {string} - Last update timestamp
 */
export const getConversations = async () => {
  return axiosInstance.post('/messages/get-all-conversations');
};

/**
 * Get messages for a specific conversation
 * @param {string} conversationId - ID of the conversation
 * @param {Object} [options] - Options for pagination
 * @param {number} [options.page=1] - Page number
 * @param {number} [options.limit=20] - Number of messages per page
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the request was successful
 *   - messages: {Array<Object>} - List of messages
 *   - totalPages: {number} - Total pages available
 *   - currentPage: {number} - Current page number
 *   - totalMessages: {number} - Total number of messages
 */
export const getMessages = async (conversationId, options = {}) => {
  const { page = 1, limit = 20 } = options;
  return axiosInstance.post(`/messages/get-conversation-messages/${conversationId}?page=${page}&limit=${limit}`);
};

/**
 * Start a new conversation with another user
 * @param {Object} conversationData - Conversation data
 * @param {string} conversationData.recipientId - ID of the user to start a conversation with
 * @param {string} [conversationData.initialMessage] - Optional initial message text
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if conversation was created successfully
 *   - conversation: {Object} - Created conversation details
 */
export const startConversation = async (conversationData) => {
  return axiosInstance.post('/messages/create-conversation', conversationData);
};

/**
 * Send a message in a conversation
 * @param {string} conversationId - ID of the conversation
 * @param {Object} messageData - Message data
 * @param {string} messageData.text - Message text
 * @param {string} [messageData.attachmentUrl] - URL of an attachment
 * @param {string} [messageData.attachmentType] - Type of attachment
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if message was sent successfully
 *   - message: {Object} - Sent message with sender information
 */
export const sendMessage = async (conversationId, messageData) => {
  return axiosInstance.post(`/messages/send-message/${conversationId}`, messageData);
};

/**
 * Delete a message
 * @param {string} messageId - ID of the message to delete
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if message was deleted successfully
 *   - message: {string} - Success message
 */
export const deleteMessage = async (messageId) => {
  return axiosInstance.post(`/messages/delete-message/${messageId}`);
};

/**
 * Delete a conversation
 * @param {string} conversationId - ID of the conversation to delete
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if conversation was deleted successfully
 *   - message: {string} - Success message
 */
export const deleteConversation = async (conversationId) => {
  return axiosInstance.post(`/messages/delete-conversation/${conversationId}`);
};

/**
 * Search for users to message
 * @param {string} query - Search query (name or email)
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if search was successful
 *   - users: {Array<Object>} - List of matched users
 */
export const searchUsers = async (query) => {
  return axiosInstance.post(`/messages/search-users?query=${encodeURIComponent(query)}`);
};

/**
 * Join a conversation room for real-time messaging
 * @param {string} conversationId - ID of the conversation to join
 * @returns {Promise<Object>} - Promise that resolves when joined
 */
export const joinConversation = (conversationId) => {
  return new Promise((resolve, reject) => {
    if (!socket || !socket.connected) {
      reject(new Error('Socket is not connected'));
      return;
    }

    socket.emit('join_conversation', conversationId);
    
    const handleJoined = (data) => {
      if (data.conversationId === conversationId) {
        socket.off('joined_conversation', handleJoined);
        socket.off('error', handleError);
        resolve(data);
      }
    };
    
    const handleError = (error) => {
      socket.off('joined_conversation', handleJoined);
      socket.off('error', handleError);
      reject(error);
    };
    
    socket.on('joined_conversation', handleJoined);
    socket.on('error', handleError);
  });
};

/**
 * Leave a conversation room
 * @param {string} conversationId - ID of the conversation to leave
 */
export const leaveConversation = (conversationId) => {
  if (socket && socket.connected) {
    socket.emit('leave_conversation', conversationId);
  }
};

/**
 * Send a real-time message via socket
 * @param {Object} messageData - Message data
 * @param {string} messageData.conversationId - ID of the conversation
 * @param {string} messageData.text - Message text
 * @param {string} messageData.recipientId - Recipient's user ID
 * @param {string} [messageData.attachmentUrl] - URL of an attachment
 * @param {string} [messageData.attachmentType] - Type of attachment
 * @returns {Promise<Object>} - Promise that resolves with sent message
 */
export const sendSocketMessage = (messageData) => {
  return new Promise((resolve, reject) => {
    if (!socket || !socket.connected) {
      reject(new Error('Socket is not connected'));
      return;
    }

    socket.emit('send_message', messageData);
    
    // Since we don't get a direct response for the specific message, 
    // we'll set up a listener for the next new message in this conversation
    const handleNewMessage = (message) => {
      if (message.conversationId === messageData.conversationId && 
          message.senderId === socket.user?.id && 
          message.text === messageData.text) {
        socket.off('new_message', handleNewMessage);
        socket.off('error', handleError);
        resolve(message);
      }
    };
    
    const handleError = (error) => {
      socket.off('new_message', handleNewMessage);
      socket.off('error', handleError);
      reject(error);
    };
    
    socket.on('new_message', handleNewMessage);
    socket.on('error', handleError);
    
    // Set a timeout in case we don't get a response
    setTimeout(() => {
      socket.off('new_message', handleNewMessage);
      socket.off('error', handleError);
      resolve({ sent: true });  // Assume it sent anyway after timeout
    }, 5000);
  });
};

/**
 * Set typing status in a conversation
 * @param {string} conversationId - ID of the conversation
 * @param {boolean} isTyping - Whether the user is typing
 */
export const setTypingStatus = (conversationId, isTyping) => {
  if (socket && socket.connected) {
    socket.emit('typing', { conversationId, isTyping });
  }
};

/**
 * Mark messages as read
 * @param {string} conversationId - ID of the conversation
 * @param {string} [messageId] - Specific message ID (optional)
 */
export const markAsRead = (conversationId, messageId = null) => {
  if (socket && socket.connected) {
    socket.emit('mark_read', { conversationId, messageId });
  }
};

/**
 * Delete a message via socket
 * @param {string} messageId - ID of the message to delete
 * @returns {Promise<Object>} - Promise that resolves when deleted
 */
export const deleteSocketMessage = (messageId) => {
  return new Promise((resolve, reject) => {
    if (!socket || !socket.connected) {
      reject(new Error('Socket is not connected'));
      return;
    }

    socket.emit('delete_message', { messageId });
    
    const handleDeleted = (data) => {
      if (data.messageId === messageId) {
        socket.off('message_deleted', handleDeleted);
        socket.off('error', handleError);
        resolve(data);
      }
    };
    
    const handleError = (error) => {
      socket.off('message_deleted', handleDeleted);
      socket.off('error', handleError);
      reject(error);
    };
    
    socket.on('message_deleted', handleDeleted);
    socket.on('error', handleError);
    
    // Set a timeout in case we don't get a response
    setTimeout(() => {
      socket.off('message_deleted', handleDeleted);
      socket.off('error', handleError);
      resolve({ deleted: true });  // Assume it deleted anyway after timeout
    }, 5000);
  });
}; 