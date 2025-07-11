'use client';

import { format } from 'date-fns';
import { Avatar, Tooltip } from '@heroui/react';
import { Icon } from '@iconify/react';

export default function Message({ message, isOwn, showAvatar, showHeader }) {
  const formatTime = (dateString) => {
    return format(new Date(dateString), 'h:mm a');
  };

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-2`}>
      {!isOwn && showAvatar && (
        <div className="flex-shrink-0 mr-2">
          <Avatar
            src={message.sender?.avatarUrl || '/default-avatar.png'}
            name={message.sender?.name || 'User'}
            size="sm"
          />
        </div>
      )}

      <div className={`max-w-[70%] ${isOwn ? 'order-2' : 'order-1'}`}>
        {showHeader && !isOwn && (
          <div className="text-xs font-medium text-gray-600 mb-1">
            {message.sender?.name || 'Unknown User'}
          </div>
        )}
        
        <div
          className={`inline-block rounded-2xl px-4 py-2 ${
            isOwn
              ? 'bg-blue-500 text-white rounded-br-none'
              : 'bg-gray-100 text-gray-800 rounded-bl-none'
          }`}
        >
          <div className="whitespace-pre-wrap break-words">{message.text}</div>
          <div className={`text-xs mt-1 flex items-center ${isOwn ? 'justify-end' : 'justify-start'}`}>
            <span className={`opacity-80 ${isOwn ? 'text-white/80' : 'text-gray-500'}`}>
              {formatTime(message.createdAt)}
            </span>
            {isOwn && message.isRead && (
              <span className="ml-1">
                <Icon icon="mdi:check-all" className="text-blue-300" />
              </span>
            )}
          </div>
        </div>
      </div>

      {isOwn && showAvatar && (
        <div className="flex-shrink-0 ml-2">
          <Tooltip content="You" placement="left">
            <Avatar
              src={message.sender?.avatarUrl || '/default-avatar.png'}
              name={message.sender?.name || 'User'}
              size="sm"
              className="ring-2 ring-offset-2 ring-blue-500"
            />
          </Tooltip>
        </div>
      )}
    </div>
  );
}
