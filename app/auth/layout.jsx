'use client';

import { Icon } from '@iconify/react';
import { Image } from '@heroui/react';


export default function AuthLayout({ children }) {
  return (
    <div className="grid md:grid-cols-2 h-screen items-stretch gap-0">
      {/* Left side - Auth form */}
      <div className="flex w-full flex-col justify-center">
        <div>
          {children}
        </div>
      </div>

      {/* Right side - Image and info */}
      <div className="hidden bg-blue-600 md:flex w-full md:flex-col md:items-center md:justify-center md:pb-12 h-full">
        <div className="w-full max-w-md px-4 text-white">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold">Welcome to HireLyft</h2>
            <p className="mt-2 text-blue-100">
              Connect with top companies and find your dream job
            </p>
          </div>

          <div className="relative mx-auto mb-12 aspect-video w-full max-w-sm overflow-hidden rounded-lg">
            <Image
              src={"https://res.cloudinary.com/dxs6wjuur/image/upload/v1744705723/job_search_illustration_hw8jk7.png"}
              alt="Job search illustration"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-3">
              <div className="rounded-full bg-blue-500 p-2">
                <Icon icon="mdi:check" className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium">Thousands of Jobs</h3>
                <p className="text-sm text-blue-100">
                  Access thousands of job listings from verified employers
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="rounded-full bg-blue-500 p-2">
                <Icon icon="mdi:check" className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium">Easy Application</h3>
                <p className="text-sm text-blue-100">
                  Apply with just a few clicks and track your application status
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="rounded-full bg-blue-500 p-2">
                <Icon icon="mdi:check" className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium">Connect Directly</h3>
                <p className="text-sm text-blue-100">
                  Chat directly with employers and receive fast feedback
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 