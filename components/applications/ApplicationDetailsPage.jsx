'use client';

import React, { useState, useEffect } from 'react';
import { getApplicationById } from '@/services/applicationService';
import { 
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter, 
  Button, 
  Spinner, 
  Chip, 
  Divider, 
  Tooltip,
  Badge,
  Progress,
  Avatar,
} from '@heroui/react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

// Helper function to format date
function formatDate(date) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

// Helper function to determine application status color
function getStatusColor(status) {
  const statusColors = {
    'Pending': 'warning',
    'Viewed': 'primary',
    'Interviewing': 'secondary',
    'Rejected': 'danger',
    'Hired': 'success',
    'Withdrawn': 'default'
  };
  
  return statusColors[status] || 'default';
}

// Helper function to get status icon
function getStatusIcon(status) {
  const statusIcons = {
    'Pending': 'mdi:clock-outline',
    'Viewed': 'mdi:eye-outline',
    'Interviewing': 'mdi:calendar-account',
    'Rejected': 'mdi:close-circle-outline',
    'Hired': 'mdi:check-circle-outline',
    'Withdrawn': 'mdi:file-cancel-outline'
  };
  
  return statusIcons[status] || 'mdi:help-circle-outline';
}

export default function ApplicationDetailsPage({applicationId}) {
  const { isAuthenticated, user } = useAuth();
  
  const [application, setApplication] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApplicationDetails();
  }, [isAuthenticated, user, applicationId]);

  const fetchApplicationDetails = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getApplicationById(applicationId);
      setApplication(response.data.application);
    } catch (err) {
      console.error("Error fetching application details:", err);
      setError('Failed to load application details. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to format salary range
  const formatSalary = (min, max) => {
    if (min && max) return `₹${min} - ₹${max}`;
    if (min) return `From ₹${min}`;
    if (max) return `Up to ₹${max}`;
    return 'Not specified';
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center items-center h-64">
          <Spinner label="Loading application details..." size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col items-center justify-center h-64 p-4 text-center">
          <Icon icon="mdi:alert-circle-outline" className="text-5xl text-danger mb-4" />
          <h3 className="text-lg font-medium mb-2">{error}</h3>
          <Button color="primary" onPress={fetchApplicationDetails}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col items-center justify-center h-64 p-4 text-center text-gray-500">
          <Icon icon="mdi:file-document-outline" className="text-7xl mb-4" />
          <h3 className="text-lg font-medium mb-2">Application not found</h3>
          <p className="text-sm mb-4">The requested application details could not be found</p>
          <Button 
            as={Link}
            href="/applications"
            color="primary"
            startContent={<Icon icon="mdi:arrow-left" />}
          >
            Back to Applications
          </Button>
        </div>
      </div>
    );
  }

  const job = application.job;
  const employer = job?.employer || {};

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Breadcrumb navigation */}
      <div className="flex items-center gap-2 mb-6 text-sm">
        <Link href="/jobseeker/applications" className="text-gray-500 hover:text-primary">
          My Applications
        </Link>
        <Icon icon="mdi:chevron-right" className="text-gray-400" />
        <span className="text-primary font-medium">Application Details</span>
      </div>

      {/* Application Status Banner */}
      <div className={`mb-6 p-4 rounded-lg border border-${getStatusColor(application.status)}-300 bg-${getStatusColor(application.status)}-50`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full bg-${getStatusColor(application.status)}-100`}>
              <Icon icon={getStatusIcon(application.status)} className={`text-2xl text-${getStatusColor(application.status)}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg">Application Status:</h3>
                <Chip color={getStatusColor(application.status)} size="lg">
                  {application.status}
                </Chip>
              </div>
              <p className="text-sm text-gray-600">
                Last updated: {formatDate(new Date(application.updatedAt || application.updated_at))}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              as={Link}
              href={`/jobs/${job?.id}`}
              color="primary"
              variant="flat"
              startContent={<Icon icon="mdi:briefcase-outline" />}
            >
              View Job
            </Button>
            {application.status !== 'Withdrawn' && (
              <Button 
                color="danger"
                variant="flat"
                startContent={<Icon icon="mdi:close-circle-outline" />}
                isDisabled
              >
                Withdraw Application
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Application ID and Date */}
      <Card className="mb-6">
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Application ID</span>
              <span className="font-medium">{application.id}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Date Applied</span>
              <span className="font-medium">{formatDate(new Date(application.appliedAt || application.created_at))}</span>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Job Information */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Job Information</h2>
        <Card>
          <CardHeader className="flex gap-3">
            <div className="w-12 h-12 flex items-center justify-center rounded bg-gray-100">
              {employer.logo_url ? (
                <Avatar src={employer.logo_url} alt={employer.company_name} />
              ) : (
                <Icon icon="mdi:office-building-outline" className="text-2xl text-primary" />
              )}
            </div>
            <div className="flex flex-col">
              <p className="text-lg font-semibold">{job.title}</p>
              <p className="text-sm text-gray-500">
                {employer.company_name}
                {employer.website && (
                  <Tooltip content={employer.website}>
                    <Link href={employer.website} target="_blank" className="inline-flex items-center ml-2 text-primary">
                      <Icon icon="mdi:link-variant" />
                    </Link>
                  </Tooltip>
                )}
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.is_remote && (
                    <Chip color="secondary" variant="flat" size="sm">Remote</Chip>
                  )}
                  {job.location_city && (
                    <Chip variant="flat" color="primary" size="sm" startContent={<Icon icon="mdi:map-marker-outline" />}>
                      {job.location_city}{job.location_area ? `, ${job.location_area}` : ''}
                    </Chip>
                  )}
                  {job.job_type && (
                    <Chip variant="flat" color="secondary" size="sm" startContent={<Icon icon="mdi:clock-outline" />}>
                      {job.job_type}
                    </Chip>
                  )}
                  {job.experience_level && (
                    <Chip variant="flat" color="warning" size="sm" startContent={<Icon icon="mdi:chart-line-variant" />}>
                      {job.experience_level}
                    </Chip>
                  )}
                </div>
                
                <div className="space-y-3">
                  {(job.salary_min || job.salary_max) && (
                    <div className="flex items-center gap-2">
                      <Icon icon="mdi:cash" className="text-success" />
                      <div>
                        <p className="text-sm font-medium">Salary</p>
                        <p className="text-sm text-gray-600">{formatSalary(job.salary_min, job.salary_max)}</p>
                      </div>
                    </div>
                  )}
                  
                  {job.education_level && (
                    <div className="flex items-center gap-2">
                      <Icon icon="mdi:school-outline" className="text-warning" />
                      <div>
                        <p className="text-sm font-medium">Education</p>
                        <p className="text-sm text-gray-600">{job.education_level}</p>
                      </div>
                    </div>
                  )}
                  
                  {job.experience_minimum && (
                    <div className="flex items-center gap-2">
                      <Icon icon="mdi:briefcase-outline" className="text-secondary" />
                      <div>
                        <p className="text-sm font-medium">Experience</p>
                        <p className="text-sm text-gray-600">
                          {job.experience_minimum} - {job.experience_maximun || '∞'} years
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-md font-semibold mb-2">Application Timeline</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                        <Icon icon="mdi:check" className="text-white" />
                      </div>
                      <div className="absolute top-8 bottom-0 left-1/2 w-0.5 -ml-px bg-gray-200"></div>
                    </div>
                    <div>
                      <p className="font-medium">Application Submitted</p>
                      <p className="text-sm text-gray-600">{formatDate(new Date(application.appliedAt || application.created_at))}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className={`w-8 h-8 ${application.status !== 'Pending' ? 'bg-success' : 'bg-gray-200'} rounded-full flex items-center justify-center`}>
                        {application.status !== 'Pending' ? (
                          <Icon icon="mdi:check" className="text-white" />
                        ) : (
                          <Icon icon="mdi:clock-outline" className="text-gray-500" />
                        )}
                      </div>
                      <div className="absolute top-8 bottom-0 left-1/2 w-0.5 -ml-px bg-gray-200"></div>
                    </div>
                    <div>
                      <p className="font-medium">Application Viewed</p>
                      {application.status !== 'Pending' ? (
                        <p className="text-sm text-gray-600">Your application has been viewed by the employer</p>
                      ) : (
                        <p className="text-sm text-gray-600">Waiting for the employer to review your application</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className={`w-8 h-8 ${application.status === 'Interviewing' || application.status === 'Hired' ? 'bg-success' : 'bg-gray-200'} rounded-full flex items-center justify-center`}>
                        {application.status === 'Interviewing' || application.status === 'Hired' ? (
                          <Icon icon="mdi:check" className="text-white" />
                        ) : (
                          <Icon icon="mdi:calendar-account" className="text-gray-500" />
                        )}
                      </div>
                      <div className="absolute top-8 bottom-0 left-1/2 w-0.5 -ml-px bg-gray-200"></div>
                    </div>
                    <div>
                      <p className="font-medium">Interview Stage</p>
                      {application.status === 'Interviewing' ? (
                        <p className="text-sm text-gray-600">Your application is in the interview stage</p>
                      ) : application.status === 'Hired' ? (
                        <p className="text-sm text-success">You've successfully completed the interview stage</p>
                      ) : (
                        <p className="text-sm text-gray-600">Waiting for interview opportunity</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className={`w-8 h-8 ${application.status === 'Hired' ? 'bg-success' : application.status === 'Rejected' ? 'bg-danger' : 'bg-gray-200'} rounded-full flex items-center justify-center`}>
                        {application.status === 'Hired' ? (
                          <Icon icon="mdi:check" className="text-white" />
                        ) : application.status === 'Rejected' ? (
                          <Icon icon="mdi:close" className="text-white" />
                        ) : (
                          <Icon icon="mdi:trophy-outline" className="text-gray-500" />
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">Final Decision</p>
                      {application.status === 'Hired' ? (
                        <p className="text-sm text-success">Congratulations! You've been hired for this position.</p>
                      ) : application.status === 'Rejected' ? (
                        <p className="text-sm text-danger">Unfortunately, your application was not selected for this position.</p>
                      ) : (
                        <p className="text-sm text-gray-600">Awaiting final decision</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Cover Letter */}
      {application.coverLetter && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Your Cover Letter</h2>
          <Card>
            <CardBody>
              <div className="whitespace-pre-wrap p-4 bg-gray-50 rounded-lg border border-gray-200">
                {application.coverLetter}
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Resume Information */}
      {application.resumeUrl && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Your Resume</h2>
          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon icon="mdi:file-document-outline" className="text-2xl text-primary" />
                  <div>
                    <p className="font-medium">Resume</p>
                    <p className="text-sm text-gray-600">Attached to your application</p>
                  </div>
                </div>
                <Button 
                  as={Link}
                  href={application.resumeUrl}
                  target="_blank"
                  color="primary"
                  variant="flat"
                  startContent={<Icon icon="mdi:file-download-outline" />}
                >
                  View Resume
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Employer Contact Information */}
      {employer.contact_email && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Employer Contact</h2>
          <Card>
            <CardBody>
              <div className="space-y-3">
                {employer.contact_name && (
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:account-outline" className="text-primary" />
                    <div>
                      <p className="text-sm font-medium">Contact Person</p>
                      <p className="text-sm text-gray-600">{employer.contact_name}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <Icon icon="mdi:email-outline" className="text-primary" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-gray-600">
                      <Link href={`mailto:${employer.contact_email}`} className="text-primary hover:underline">
                        {employer.contact_email}
                      </Link>
                    </p>
                  </div>
                </div>
                
                {employer.contact_phone && (
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:phone-outline" className="text-primary" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-gray-600">
                        <Link href={`tel:${employer.contact_phone}`} className="text-primary hover:underline">
                          {employer.contact_phone}
                        </Link>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}
