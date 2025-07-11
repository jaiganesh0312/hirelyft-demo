'use client';

import React from 'react';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Icon icon="solar:danger-triangle-linear" className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Something went wrong!</h2>
        <p className="text-gray-600 mb-4">{error.message || 'An error occurred while loading the chat.'}</p>
        <Button
          color="primary"
          onClick={reset}
          startContent={<Icon icon="solar:refresh-linear" />}
        >
          Try again
        </Button>
      </div>
    </div>
  );
} 