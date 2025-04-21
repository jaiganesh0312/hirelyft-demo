'use client';

import Link from 'next/link';
import { Button, Image } from "@heroui/react";
import { Icon } from '@iconify/react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-20 bg-gray-50">
      <div className="max-w-lg text-center">
        <h1 className="text-9xl font-bold text-blue-600">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            as={Link}
            href="/"
            color="primary" 
            size="lg"
            startContent={<Icon icon="mdi:home" />}
          >
            Back to Home
          </Button>
          <Button 
            as={Link}
            href="/auth/login"
            variant="ghost" 
            color="primary" 
            size="lg"
            startContent={<Icon icon="mdi:login" />}
          >
            Log In
          </Button>
        </div>
      </div>
      
      <div className="mt-16 text-center text-gray-500">
        <p>Need help? <a href="#" className="text-blue-600 hover:underline">Contact our support team</a></p>
      </div>
    </div>
  );
} 