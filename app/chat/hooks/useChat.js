'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  initializeSocket, 
  disconnectSocket, 
  getMessages, 
  sendMessage as sendMessageApi,
  markAsRead
} from '@/services/messagingService';

export function useChat(conversationId, session) {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState(null);
  const queryClient = useQueryClient();
  const socket = useRef(null);
  const typingTimeout = useRef(null);

  // Fetch messages for the conversation
  const { data: messagesData, isLoading } = useQuery({
    queryKey: ['messages', conversationId],
    queryFn: async () => {
      if (!conversationId) return { messages: [] };
      const response = await getMessages(conversationId);
      return response;
    },
    onSuccess: (data) => {
      setMessages(data.messages || []);
    },
    enabled: !!conversationId,
  });

  // Initialize socket connection
  useEffect(() => {
    if (session?.user?.accessToken) {
      socket.current = initializeSocket(
        session.user.accessToken,
        () => {
          console.log('Socket connected');
          if (conversationId) {
            socket.current.emit('join_conversation', conversationId);
            markAsRead(conversationId);
          }
        },
        (error) => console.error('Socket error:', error)
      );

      // Set up event listeners
      const handleNewMessage = (message) => {
        setMessages(prev => [...prev, message]);
        if (message.conversationId === conversationId) {
          markAsRead(conversationId);
        }
        queryClient.invalidateQueries({ queryKey: ['conversations'] });
      };

      const handleTypingStatus = ({ userId, isTyping, userName }) => {
        if (userId !== session.user.id) {
          setIsTyping(isTyping);
          setTypingUser(isTyping ? userName : null);
        }
      };

      socket.current.on('new_message', handleNewMessage);
      socket.current.on('typing_status', handleTypingStatus);

      return () => {
        if (socket.current) {
          socket.current.off('new_message', handleNewMessage);
          socket.current.off('typing_status', handleTypingStatus);
          if (conversationId) {
            socket.current.emit('leave_conversation', conversationId);
          }
          disconnectSocket();
        }
      };
    }
  }, [conversationId, session, queryClient]);

  const sendMessage = useCallback(async (content) => {
    if (!conversationId || !content.trim()) return null;

    try {
      const response = await sendMessageApi(conversationId, { text: content });
      return response;
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  }, [conversationId]);

  const handleTyping = useCallback(() => {
    if (!isTyping) {
      socket.current?.emit('typing', {
        conversationId,
        isTyping: true,
        userId: session?.user?.id,
        userName: session?.user?.name
      });
      setIsTyping(true);
    }

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      socket.current?.emit('typing', {
        conversationId,
        isTyping: false,
        userId: session?.user?.id,
        userName: session?.user?.name
      });
      setIsTyping(false);
    }, 2000);
  }, [conversationId, isTyping, session?.user?.id, session?.user?.name]);

  return {
    messages,
    isLoading,
    isTyping,
    typingUser,
    sendMessage,
    handleTyping,
  };
}
