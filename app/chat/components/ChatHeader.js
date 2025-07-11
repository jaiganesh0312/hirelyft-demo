'use client';

import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { Icon } from '@iconify/react';

export default function ChatHeader({ conversation, onBack, onMenuAction }) {
  if (!conversation) return null;

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-3">
        <Button
          isIconOnly
          variant="light"
          size="sm"
          className="md:hidden"
          onPress={onBack}
        >
          <Icon icon="mdi:arrow-left" className="text-lg" />
        </Button>
        <div className="flex items-center gap-3">
          <Avatar
            src={conversation.participant?.avatarUrl || '/default-avatar.png'}
            name={conversation.participant?.name || 'User'}
            size="md"
            className="flex-shrink-0"
            isBordered
            color={conversation.participant?.isOnline ? 'success' : 'default'}
          />
          <div>
            <h2 className="font-semibold">
              {conversation.participant?.name || 'Unknown User'}
            </h2>
            <p className="text-sm text-gray-500">
              {conversation.participant?.isOnline ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button isIconOnly variant="light" size="sm">
          <Icon icon="mdi:phone" className="text-lg" />
        </Button>
        <Button isIconOnly variant="light" size="sm">
          <Icon icon="mdi:video" className="text-lg" />
        </Button>
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly variant="light" size="sm">
              <Icon icon="mdi:dots-vertical" className="text-lg" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu 
            aria-label="Conversation actions"
            onAction={onMenuAction}
          >
            <DropdownItem key="view_profile" startContent={<Icon icon="mdi:account" />}>
              View Profile
            </DropdownItem>
            <DropdownItem key="mute" startContent={<Icon icon="mdi:bell-off" />}>
              Mute Notifications
            </DropdownItem>
            <DropdownItem 
              key="delete" 
              className="text-danger" 
              color="danger"
              startContent={<Icon icon="mdi:delete" />}
            >
              Delete Conversation
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}
