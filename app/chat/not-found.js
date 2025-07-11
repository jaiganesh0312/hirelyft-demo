'use client';

import React from 'react';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Icon icon="solar:chat-round-dots-linear" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Chat Not Found</h2>
        <p className="text-gray-600 mb-4">The chat you're looking for doesn't exist or has been removed.</p>
        <Button
          as={Link}
          href="/chat"
          color="primary"
          startContent={<Icon icon="solar:arrow-left-linear" />}
        >
          Back to Chats
        </Button>
      </div>
    </div>
  );
} 