'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, Badge, Input, Spinner } from '@heroui/react';
import { Icon } from '@iconify/react';

export default function ConversationList({
  conversations,
  selectedConversationId,
  onSelectConversation,
  isLoading = false,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const filteredConversations = conversations.filter(conversation => {
    if (!searchQuery) return true;
    const searchLower = searchQuery.toLowerCase();
    return (
      conversation.participant?.name?.toLowerCase().includes(searchLower) ||
      conversation.lastMessage?.text?.toLowerCase().includes(searchLower)
    );
  });

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold mb-4">Messages</h2>
        <div className="relative">
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startContent={
              <Icon icon="mdi:magnify" className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            variant="bordered"
            size="sm"
            classNames={{
              input: 'text-sm',
            }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                selectedConversationId === conversation.id ? 'bg-blue-50' : ''
              }`}
              onClick={() => onSelectConversation(conversation)}
            >
              <div className="flex items-center gap-3">
                <Badge
                  content=""
                  color="success"
                  size="sm"
                  isInvisible={!conversation.participant?.isOnline}
                  placement="bottom-right"
                  shape="circle"
                >
                  <Avatar
                    src={conversation.participant?.avatarUrl || '/default-avatar.png'}
                    name={conversation.participant?.name || 'User'}
                    size="md"
                    className="flex-shrink-0"
                  />
                </Badge>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium truncate">
                      {conversation.participant?.name || 'Unknown User'}
                    </h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {conversation.lastMessage && formatTime(conversation.lastMessage.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {conversation.lastMessage?.text || 'No messages yet'}
                  </p>
                </div>
                {conversation.unreadCount > 0 && (
                  <span className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center p-4">
            <Icon icon="mdi:message-outline" className="text-4xl text-gray-300 mb-2" />
            <p className="text-gray-500">
              {searchQuery
                ? 'No conversations match your search'
                : 'No conversations yet'}
            </p>
            {!searchQuery && (
              <button
                onClick={() => router.push('/messages/new')}
                className="mt-2 text-sm text-blue-500 hover:text-blue-600 font-medium"
              >
                Start a conversation
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
