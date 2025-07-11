import { format, isToday, isYesterday } from 'date-fns';

export const groupMessagesByDate = (messages = []) => {
  if (!messages.length) return [];
  
  return messages.reduce((acc, message) => {
    const date = new Date(message.createdAt).toDateString();
    
    if (!acc[date]) {
      acc[date] = [];
    }
    
    acc[date].push(message);
    return acc;
  }, {});
};

export const formatDateHeader = (dateString) => {
  const date = new Date(dateString);
  
  if (isToday(date)) return 'Today';
  if (isYesterday(date)) return 'Yesterday';
  
  return format(date, 'MMMM d, yyyy');
};

export const formatMessageTime = (dateString) => {
  return format(new Date(dateString), 'h:mm a');
};
