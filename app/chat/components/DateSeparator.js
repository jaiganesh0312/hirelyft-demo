'use client';

import { format, isToday, isYesterday } from 'date-fns';

export default function DateSeparator({ date }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    if (isToday(date)) return 'Today';
    if (isYesterday(date)) return 'Yesterday';
    
    return format(date, 'MMMM d, yyyy');
  };

  return (
    <div className="relative flex items-center justify-center my-4">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200"></div>
      </div>
      <div className="relative px-4 bg-white text-sm text-gray-500">
        {formatDate(date)}
      </div>
    </div>
  );
}
