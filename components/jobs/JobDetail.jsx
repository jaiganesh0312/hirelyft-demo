'use client';

import React, { useState, useEffect } from 'react';
import { getJobById } from '@/services/jobService';
import { applyForJob } from '@/services/applicationService';
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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
  useDisclosure,
  addToast,
  Progress,
  Avatar,
  Badge
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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

export default function JobDetail({ jobId, onClose, isMobileView = false }) {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const { isOpen, onOpen, onClose: closeModal } = useDisclosure();
  
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [applicationInfo, setApplicationInfo] = useState(null);
  const [similarJobs, setSimilarJobs] = useState([]);

  useEffect(() => {
    if (!jobId) {
      setIsLoading(false);
      return;
    }

    const fetchJobDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getJobById(jobId);
        setJob(response.data.job);
        
        // Check if user has already applied from backend response
        if (response.data.application) {
          setApplicationInfo(response.data.application);
        } else {
          setApplicationInfo(null);
        }
        
        // Get similar jobs if available in response
        if (response.data.similarJobs) {
          setSimilarJobs(response.data.similarJobs);
        }
      } catch (err) {
        console.error("Error fetching job details:", err);
        setError('Failed to load job details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleApply = async (e) => {
    e.preventDefault?.();
    
    if (!isAuthenticated) {
      router.push('/auth/login?redirect=/jobs');
      return;
    }
    
    if (user?.role !== 'jobseeker') {
      addToast({
        title: "Error!",
        description: 'Only jobseekers can apply for jobs',
        color: 'danger'
      });
      return;
    }
    
    setIsApplying(true);
    try {
      const response = await applyForJob({
        jobId: jobId,
        coverLetter: coverLetter
      });
      addToast({
        title: "Success!",
        description: 'Application submitted successfully!',
        color: 'success'
      });
      
      // Update application info with the response data
      if (response.data.application) {
        setApplicationInfo(response.data.application);
      }
      
      closeModal();
    } catch (err) {
      console.error("Error applying for job:", err);
      addToast({
        title: "Error!",
        description: err.response?.data?.message || 'Failed to submit application. Please try again.',
        color: 'danger'
      });
    } finally {
      setIsApplying(false);
    }
  };

  // Function to format salary range
  const formatSalary = (min, max) => {
    if (min && max) return `₹${min} - ₹${max}`;
    if (min) return `From ₹${min}`;
    if (max) return `Up to ₹${max}`;
    return 'Not specified';
  };

  const containerClass = isMobileView 
    ? "bg-white z-50 overflow-y-auto" 
    : "h-[calc(100vh-64px)] overflow-y-auto border-l border-gray-200 fixed top-16";

  if (!jobId) {
    return (
      <div className={containerClass}>
        <div className="flex flex-col items-center justify-center h-full p-4 text-center text-gray-500">
          <Icon icon="mdi:briefcase-outline" className="text-7xl mb-4" />
          <h3 className="text-lg font-medium mb-2">Select a job to view details</h3>
          <p className="text-sm">Click on any job from the list to see more information</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={containerClass}>
        <div className="flex justify-center items-center h-full">
          <Spinner label="Loading job details..." size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={containerClass}>
        <div className="flex flex-col items-center justify-center h-full p-4 text-center">
          <Icon icon="mdi:alert-circle-outline" className="text-5xl text-danger mb-4" />
          <h3 className="text-lg font-medium mb-2">{error}</h3>
          <Button color="primary" onPress={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className={containerClass}>
        <div className="flex flex-col items-center justify-center h-full p-4 text-center text-gray-500">
          <Icon icon="mdi:file-document-outline" className="text-7xl mb-4" />
          <h3 className="text-lg font-medium mb-2">Job not found</h3>
          <p className="text-sm">The requested job details could not be loaded</p>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      {/* Sticky header with close button */}
      <div className="sticky top-0 bg-white z-10 px-4 py-6 border-b shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center">
              <h2 className="text-xl font-bold text-primary">{job.title}</h2>
            </div>
            <p className="text-sm text-gray-600 flex items-center mt-1">
              <Icon icon="mdi:office-building-outline" className="mr-1" />
              {job.employer?.company_name || 'Unknown Employer'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {applicationInfo ? (
              <Button 
                as={Link}
                href={`/jobseeker/applications/${applicationInfo.id}`}
                size="sm"
                color="success"
                variant="flat"
                startContent={<Icon icon="mdi:check" />}
              >
                Applied
              </Button>
            ) : job.deadline && new Date(job.deadline) < new Date() ? (
              <Button 
                size="sm"
                color="danger" 
                variant="flat" 
                isDisabled
                startContent={<Icon icon="mdi:calendar-remove" />}
              >
                Deadline Passed
              </Button>
            ) : (
              <Button 
                size="sm"
                color="primary" 
                startContent={<Icon icon="mdi:send" />}
                onPress={isAuthenticated ? onOpen : () => router.push('/auth/login?redirect=/jobs')}
                disabled={isApplying}
              >
                {isAuthenticated ? 'Apply Now' : 'Login to Apply'}
              </Button>
            )}
            
            {onClose && (
              <Button 
                isIconOnly
                size="sm"
                variant="light"
                onPress={onClose}
                aria-label="Close details"
                className='absolute top-0 right-0 '
              >
                <Icon icon="mdi:close" className='text-lg' />
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6">
        {/* Application Status Banner - show only if user has applied */}
        {applicationInfo && (
          <div className={`mb-6 p-4 rounded-lg border border-${getStatusColor(applicationInfo.status)}-300 bg-${getStatusColor(applicationInfo.status)}-50`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <Icon icon="mdi:file-document-check-outline" />
                  Application Status: 
                  <Chip color={getStatusColor(applicationInfo.status)}>
                    {applicationInfo.status}
                  </Chip>
                </h3>
                <p className="text-sm mt-1">
                  Applied on: {formatDate(new Date(applicationInfo.appliedAt || applicationInfo.created_at))}
                </p>
                {/* <p className="text-xs text-gray-500 mt-1">
                  Application ID: {applicationInfo.id?.substring(0, 8)}
                </p> */}
              </div>
              <Tooltip content="View application details">
                <Button 
                  as={Link}
                  href={`/jobseeker/applications/${applicationInfo.id}`}
                  size="sm"
                  variant="flat"
                  color="primary"
                >
                  View Application
                </Button>
              </Tooltip>
            </div>
          </div>
        )}

        {/* Quick Info & Actions */}
        <div className="mb-6">
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
            <Chip variant="flat" color="default" size="sm" startContent={<Icon icon="mdi:calendar-outline" />}>
              Posted: {formatDate(new Date(job.created_at))}
            </Chip>
          </div>
          
          {/* Job Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4 bg-gray-50 p-4 rounded-lg">
            {(job.salary_min || job.salary_max) && (
              <div className="flex items-start gap-2">
                <Icon icon="mdi:cash" className="text-success text-lg mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Salary</p>
                  <p className="text-sm text-gray-600">{formatSalary(job.salary_min, job.salary_max)}</p>
                </div>
              </div>
            )}
            
            {job.openings && (
              <div className="flex items-start gap-2">
                <Icon icon="mdi:account-multiple-outline" className="text-primary text-lg mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Openings</p>
                  <p className="text-sm text-gray-600">{job.openings} position{job.openings !== 1 ? 's' : ''}</p>
                </div>
              </div>
            )}
            
            {job.education_level && (
              <div className="flex items-start gap-2">
                <Icon icon="mdi:school-outline" className="text-warning text-lg mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Education</p>
                  <p className="text-sm text-gray-600">{job.education_level}</p>
                </div>
              </div>
            )}
            
            {job.experience_minimum && (
              <div className="flex items-start gap-2">
                <Icon icon="mdi:briefcase-outline" className="text-secondary text-lg mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Experience</p>
                  <p className="text-sm text-gray-600">
                    {job.experience_minimum} - {job.experience_maximun || '∞'} years
                  </p>
                </div>
              </div>
            )}
            
            {job.deadline && (
              <div className="flex items-start gap-2">
                <Icon icon="mdi:calendar-clock" className="text-danger text-lg mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Deadline</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-600">{formatDate(new Date(job.deadline))}</p>
                    {job.deadline && new Date(job.deadline) < new Date() && (
                      <Badge color="danger" variant="flat" size="sm">Expired</Badge>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {job.availableOn && (
              <div className="flex items-start gap-2">
                <Icon icon="mdi:calendar-check" className="text-info text-lg mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Start Date</p>
                  <p className="text-sm text-gray-600">{formatDate(new Date(job.availableOn))}</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Share & Save buttons */}
          <div className="flex gap-2">
            <Button 
              size="sm"
              variant="flat" 
              color="secondary"
              startContent={<Icon icon="mdi:share-variant" />}
              onPress={() => {
                if (navigator.share) {
                  navigator.share({
                    title: job.title,
                    text: `${job.title} at ${job.employer?.company_name}`,
                    url: window.location.href
                  })
                } else {
                  // Copy to clipboard instead
                  navigator.clipboard.writeText(window.location.href);
                  addToast({
                    title: "Link copied!",
                    description: "Job link copied to clipboard",
                    color: 'success'
                  });
                }
              }}
            >
              Share
            </Button>
            
            <Button 
              size="sm"
              variant="flat" 
              startContent={<Icon icon="mdi:bookmark-outline" />}
            >
              Save
            </Button>
          </div>
        </div>
        
        <Divider className="my-6" />
        
        {/* Main Content */}
        <div className="space-y-8">
          {/* Job Match Score (if available) */}
          {job.matchScore && (
            <section className="p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg border border-primary-100">
              <h2 className="text-lg font-semibold mb-2">Match Score</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Profile Match</span>
                  <span className="text-sm font-medium">{job.matchScore}%</span>
                </div>
                <Progress 
                  value={job.matchScore} 
                  color={job.matchScore > 80 ? 'success' : job.matchScore > 50 ? 'warning' : 'danger'} 
                  className="h-2" 
                />
                <p className="text-xs text-gray-500 mt-1">Based on your profile skills and experience</p>
              </div>
            </section>
          )}
        
          {/* Company Info (if available) */}
          {/* {job.employer && (
            <section>
              <h2 className="text-lg font-semibold mb-3">About the Company</h2>
              <Card shadow="sm">
                <CardBody>
                  <div className="flex items-start gap-4">
                    {job.employer.logo_url ? (
                      <Avatar src={job.employer.logo_url} size="lg" />
                    ) : (
                      <div className="w-12 h-12 bg-primary-100 rounded-md flex items-center justify-center">
                        <Icon icon="mdi:office-building" className="text-2xl text-primary" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-medium">{job.employer.company_name}</h3>
                      {job.employer.website && (
                        <a 
                          href={job.employer.website.startsWith('http') ? job.employer.website : `https://${job.employer.website}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline flex items-center gap-1"
                        >
                          <Icon icon="mdi:web" />
                          Website
                        </a>
                      )}
                      {job.employer.industry && (
                        <p className="text-sm text-gray-600 mt-2">{job.employer.industry}</p>
                      )}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </section>
          )} */}

          {/* Skills & Tags */}
          {(job.skills || job.tags && job.tags.length > 0) && (
            <section>
              <h2 className="text-lg font-semibold mb-3">Skills & Requirements</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {job.skills && job.skills.split(', ').map((skill, index) => (
                  <Chip key={`skill-${index}`} color="primary" variant="flat">
                    {skill.trim()}
                  </Chip>
                ))}
                {job.tags && job.tags.map(tag => (
                  <Chip key={`tag-${tag.id}`} color="secondary" variant="flat">
                    {tag.name}
                  </Chip>
                ))}
              </div>
              
              {job.experience_level && (
                <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                  <Icon icon="mdi:chart-line-variant" className="text-warning" />
                  <span>Experience Level: <strong>{job.experience_level}</strong></span>
                </div>
              )}
              
              {job.education_level && (
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Icon icon="mdi:school-outline" className="text-warning" />
                  <span>Education: <strong>{job.education_level}</strong></span>
                </div>
              )}
            </section>
          )}

          {/* Description */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Job Description</h2>
            <Card shadow="sm">
              <CardBody>
                <p className="whitespace-pre-line text-gray-700">{job.description}</p>
              </CardBody>
            </Card>
          </section>

          {/* Responsibilities */}
          {job.responsibilities && (
            <section>
              <h2 className="text-lg font-semibold mb-3">Responsibilities</h2>
              <Card shadow="sm">
                <CardBody>
                  <p className="whitespace-pre-line text-gray-700">{job.responsibilities}</p>
                </CardBody>
              </Card>
            </section>
          )}

          {/* Requirements */}
          {job.requirements && (
            <section>
              <h2 className="text-lg font-semibold mb-3">Requirements</h2>
              <Card shadow="sm">
                <CardBody>
                  <p className="whitespace-pre-line text-gray-700">{job.requirements}</p>
                </CardBody>
              </Card>
            </section>
          )}
          
          {/* Benefits (if provided) */}
          {job.benefits && (
            <section>
              <h2 className="text-lg font-semibold mb-3">Benefits</h2>
              <Card shadow="sm">
                <CardBody>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {job.benefits.split(',').map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Icon icon="mdi:check-circle" className="text-success" />
                        <span className="text-gray-700">{benefit.trim()}</span>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </section>
          )}
          
          {/* Contact Information (if provided) */}
          {(job.contact_person_name || job.contact_email || job.contact_number) && (
            <section>
              <h2 className="text-lg font-semibold mb-3">Contact Information</h2>
              <Card shadow="sm" className="bg-gray-50">
                <CardBody>
                  <div className="space-y-3">
                    {job.contact_person_name && (
                      <div className="flex items-center gap-2">
                        <Icon icon="mdi:account" className="text-gray-500" />
                        <span>{job.contact_person_name}</span>
                      </div>
                    )}
                    {job.contact_email && (
                      <div className="flex items-center gap-2">
                        <Icon icon="mdi:email-outline" className="text-gray-500" />
                        <a href={`mailto:${job.contact_email}`} className="text-primary hover:underline">
                          {job.contact_email}
                        </a>
                      </div>
                    )}
                    {job.contact_number && (
                      <div className="flex items-center gap-2">
                        <Icon icon="mdi:phone-outline" className="text-gray-500" />
                        <a href={`tel:${job.contact_number}`} className="text-primary hover:underline">
                          {job.contact_number}
                        </a>
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            </section>
          )}
          
          {/* Similar Jobs */}
          {similarJobs && similarJobs.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold mb-3">Similar Jobs You Might Like</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {similarJobs.map(similarJob => (
                  <Card shadow="sm" key={similarJob.id} className="w-full hover:shadow-md transition-shadow">
                    <CardBody className="p-3">
                      <div className="flex flex-col">
                        <Link href={`/jobs/${similarJob.id}`} className="text-md font-semibold text-primary hover:underline">
                          {similarJob.title}
                        </Link>
                        <p className="text-sm text-gray-600">{similarJob.employer?.company_name || 'Unknown Employer'}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {similarJob.location_city && (
                            <Chip size="sm" variant="flat" color="primary">{similarJob.location_city}</Chip>
                          )}
                          {similarJob.job_type && (
                            <Chip size="sm" variant="flat" color="secondary">{similarJob.job_type}</Chip>
                          )}
                          {similarJob.salary_min && (
                            <Chip size="sm" variant="flat" color="success" startContent={<Icon icon="mdi:cash" />}>
                              {formatSalary(similarJob.salary_min, similarJob.salary_max)}
                            </Chip>
                          )}
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </section>
          )}
          
          {/* Apply Button (Bottom) */}
          <div className="mt-8 flex justify-center">
            {applicationInfo ? (
              <div className="text-center">
                <Button 
                  size="lg"
                  color="success" 
                  variant="flat" 
                  startContent={<Icon icon="mdi:check" />}
                  as={Link}
                  href={`/jobseeker/applications/${applicationInfo.id}`}
                  className="px-8"
                >
                  View Your Application
                </Button>
                <p className="text-sm text-gray-500 mt-2">
                  Status: <span className="font-medium">{applicationInfo.status}</span>
                </p>
              </div>
            ) : job.deadline && new Date(job.deadline) < new Date() ? (
              <div className="text-center">
                <Button 
                  size="lg"
                  color="danger" 
                  variant="flat" 
                  isDisabled
                  startContent={<Icon icon="mdi:calendar-remove" />}
                  className="px-8"
                >
                  Application Deadline Passed
                </Button>
                <p className="text-sm text-gray-500 mt-2">
                  This job is no longer accepting applications
                </p>
              </div>
            ) : (
              <Button 
                size="lg"
                color="primary" 
                startContent={<Icon icon="mdi:send" />}
                onPress={isAuthenticated ? onOpen : () => router.push('/auth/login?redirect=/jobs')}
                disabled={isApplying}
              >
                {isAuthenticated ? 'Apply for This Job' : 'Login to Apply'}
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Application Modal */}
      <Modal isOpen={isOpen} onOpenChange={closeModal} size="lg">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Apply for {job.title}</ModalHeader>
          <ModalBody>
            <form onSubmit={handleApply}>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  You're applying to {job.title} at {job.employer?.company_name}
                </p>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Cover Letter
                  </label>
                  <Textarea
                    placeholder="Tell the employer why you're a good fit for this position"
                    minRows={6}
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={closeModal}>
              Cancel
            </Button>
            <Button 
              color="primary" 
              onPress={handleApply} 
              isLoading={isApplying}
              startContent={!isApplying && <Icon icon="mdi:send" />}
            >
              Submit Application
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
