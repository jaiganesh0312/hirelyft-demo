'use client';

import Link from 'next/link';

import { Button, Card, CardBody, Chip, Image } from "@heroui/react";
import { Icon } from '@iconify/react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-10 md:flex-row md:items-center">
            <div className="space-y-6 md:w-1/2">
              <div>
                <Chip color="warning" variant="bordered" className="mb-2">
                  Launch Offer - 30% off for employers
                </Chip>
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                  Find Your Dream Job or Perfect Candidate
                </h1>
                <p className="mt-6 text-lg text-white/80">
                  HireLyft connects talented professionals with top companies worldwide.
                  Start your journey to better career opportunities today.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button 
                  as={Link}
                  href="/auth/register?role=jobseeker"
                  color="warning" 
                  size="lg"
                  endContent={<Icon icon="mdi:arrow-right" />}
                >
                  Find Jobs
                </Button>
                <Button 
                  as={Link}
                  href="/auth/register?role=employer"
                  variant="shadow" 
                  color="success" 
                  size="lg"
                  endContent={<Icon icon="mdi:arrow-right" />}
                >
                  Hire Talent
                </Button>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Icon icon="mdi:shield-check" className="text-green-400" />
                <span>Trusted by 5000+ companies worldwide</span>
              </div>
            </div>
            <div className="md:w-1/2">
              <Image 
                src='https://res.cloudinary.com/dxs6wjuur/image/upload/v1744705723/job_search_illustration_hw8jk7.png'
                alt="Job search illustration" 
                className="h-auto w-full rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose HireLyft?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
              Our platform offers a seamless experience for both job seekers and employers
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-sm">
                <CardBody className="gap-4">
                  <div className="rounded-full bg-blue-100 p-3 w-fit">
                    <Icon icon={feature.icon} className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Job Categories */}
      <div className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Popular Job Categories
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
              Browse jobs by industry or specialization
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {jobCategories.map((category, index) => (
              <Card key={index} isPressable className="border-none">
                <CardBody className="flex flex-row items-center gap-4 p-4">
                  <div className="rounded-full bg-blue-100 p-3">
                    <Icon icon={category.icon} className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.jobCount} jobs</p>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
            <div className="space-y-4 md:w-2/3">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to Take the Next Step in Your Career?
              </h2>
              <p className="text-xl text-white/80">
                Join thousands of professionals finding their dream jobs on HireLyft
              </p>
            </div>
            <div className="md:w-1/3">
              <Button 
                as={Link}
                href="/auth/register"
                color="warning" 
                size="lg" 
                className="w-full"
              >
                Get Started Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-lg font-semibold">HireLyft</h3>
              <p className="mt-4 text-gray-400">
                Connecting talent with opportunity in a modern job marketplace.
              </p>
              <div className="mt-6 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Icon icon="mdi:twitter" className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Icon icon="mdi:facebook" className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Icon icon="mdi:linkedin" className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Icon icon="mdi:instagram" className="h-6 w-6" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold">For Job Seekers</h4>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Browse Jobs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Career Advice</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Create Resume</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Job Alerts</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold">For Employers</h4>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Post a Job</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Search Resumes</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Recruiting Solutions</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing Plans</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Company</h4>
              <ul className="mt-4 space-y-2">
                <li><a href="/about" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} HireLyft. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: 'mdi:magnify',
    title: 'Smart Job Matching',
    description: 'Our AI-powered system matches your skills and preferences with the perfect job opportunities.'
  },
  {
    icon: 'mdi:account-multiple',
    title: 'Direct Employer Contact',
    description: 'Connect directly with hiring managers and recruiters without intermediaries.'
  },
  {
    icon: 'mdi:shield-check',
    title: 'Verified Companies',
    description: 'All employers on our platform are verified to ensure legitimacy and safety.'
  },
  {
    icon: 'mdi:lightning-bolt',
    title: 'Real-time Updates',
    description: 'Get instant notifications about application status, new matches, and messages.'
  },
  {
    icon: 'mdi:video',
    title: 'Video Introductions',
    description: 'Stand out with a 45-second video introduction that showcases your personality.'
  },
  {
    icon: 'mdi:calendar-check',
    title: 'Interview Scheduling',
    description: 'Schedule interviews with integrated calendar functionality for a seamless experience.'
  },
];

const jobCategories = [
  { name: 'Technology', jobCount: 1243, icon: 'mdi:laptop' },
  { name: 'Healthcare', jobCount: 873, icon: 'mdi:medical-bag' },
  { name: 'Finance', jobCount: 642, icon: 'mdi:chart-line' },
  { name: 'Marketing', jobCount: 518, icon: 'mdi:chart-bubble' },
  { name: 'Education', jobCount: 392, icon: 'mdi:school' },
  { name: 'Design', jobCount: 307, icon: 'mdi:palette' },
  { name: 'Engineering', jobCount: 275, icon: 'mdi:wrench' },
  { name: 'Sales', jobCount: 186, icon: 'mdi:cart' },
]; 