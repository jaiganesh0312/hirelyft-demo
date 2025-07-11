"use client";
import React from 'react';
import { Spinner } from '@heroui/react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Spinner size="lg" color="primary" />
        <p className="mt-4 text-gray-600">Loading chat...</p>
      </div>
    </div>
  );
}
