'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { getJobById } from '@/services/jobService';
import { applyForJob } from '@/services/applicationService'; // Import apply service
import { Card, CardHeader, CardBody, CardFooter, Button, Spinner, Chip, Divider, Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, addToast } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Helper to format salary
const formatSalary = (min, max) => {
    if (min && max) return `$${min} - $${max}`;
    if (min) return `From $${min}`;
    if (max) return `Up to $${max}`;
    return 'Not specified';
};

// Helper to format date
function formatDate(date) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }

export default function JobDetail({ jobId }) {
    const { user, isAuthenticated } = useAuth();
    const [job, setJob] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isApplying, setIsApplying] = useState(false);
    const [coverLetter, setCoverLetter] = useState('');
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure(); // For apply modal
    const router = useRouter();

    const fetchJob = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getJobById(jobId);
            setJob(response.data.job);
        } catch (err) {
            console.error("Error fetching job details:", err);
            setError(err.response?.data?.message || 'Failed to load job details. It might be inactive or no longer available.');
            addToast({
                title: "Error!",
                description: err.response?.data?.message || 'Failed to load job details',
                color: 'danger'
            });
        } finally {
            setIsLoading(false);
        }
    }, [jobId]);

    useEffect(() => {
        if (jobId) {
            fetchJob();
        }
    }, [jobId, fetchJob]);

    const handleApply = async () => {
        if (!isAuthenticated || user?.role !== 'jobseeker') {
            toast.error('Please log in as a job seeker to apply.');
            // Optional: Redirect to login
            // router.push('/auth/login?redirect=/jobs/' + jobId);
            return;
        }
        onOpen(); // Open the modal to add cover letter
    };

    const submitApplication = async () => {
        setIsApplying(true);
        try {
            const applicationData = {
                jobId: job.id,
                coverLetter: coverLetter || undefined, // Send only if not empty
                // resumeUrl: 'TODO' // Add resume selection logic here if needed
            };
            await applyForJob(applicationData);
            addToast({
                title: "Success!",
                description: 'Application submitted successfully!',
                color: 'success'
            });
            onClose(); // Close modal on success
            setCoverLetter(''); // Clear cover letter
            // Optionally, disable apply button or fetch job again to update applied status if API returns it
        } catch (error) {
            console.error("Error submitting application:", error);
             const errMsg = error.response?.data?.message || 'Failed to submit application.';
             addToast({
                title: "Error!",
                description: errMsg,
                color: 'danger'
            });
        } finally {
            setIsApplying(false);
            onOpenChange();
        }
    };

    if (isLoading) {
        return <div className="flex justify-center items-center py-20"><Spinner label="Loading job details..." size="lg" /></div>;
    }

    if (error) {
        return <div className="text-center text-danger py-20">{error}</div>;
    }

    if (!job) {
        return <div className="text-center text-gray-500 py-20">Job not found.</div>;
    }

    // Determine if the current user (jobseeker) has already applied (requires API support)
    // const hasApplied = job.applications?.some(app => app.jobseeker?.user?.id === user?.id);
    const hasApplied = false; // Placeholder - implement logic if API provides application status for jobseeker

    const isEmployerOwner = isAuthenticated && user?.role === 'employer' && job?.employer?.userId === user?.id;

    return (
        <div className="container mx-auto max-w-4xl">
            <Card>
                <CardHeader className="flex flex-col md:flex-row justify-between items-start gap-4 p-6">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold mb-1">{job.title}</h1>
                        <p className="text-lg text-gray-600 mb-2">
                            <Link href={`/employer/${job.employer?.id}`} className="hover:underline">
                                {job.employer?.company_name || 'Unknown Employer'}
                            </Link>
                         </p>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                            <span className="flex items-center"><Icon icon="mdi:map-marker-outline" className="mr-1"/> {job.location_city}{job.location_area ? `, ${job.location_area}` : ''} {job.is_remote && "(Remote Available)"}</span>
                            <span className="flex items-center"><Icon icon="mdi:clock-outline" className="mr-1"/> {job.job_type}</span>
                             <span className="flex items-center"><Icon icon="mdi:calendar-blank-outline" className="mr-1"/> Posted: {formatDate(new Date(job.created_at))}</span>
                             {job.deadline && <span className="flex items-center"><Icon icon="mdi:calendar-remove-outline" className="mr-1"/> Deadline: {formatDate(new Date(job.deadline))}</span>}
                        </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        {isEmployerOwner && (
                            <Button 
                                as={Link} 
                                href={`/employer/jobs/${jobId}/edit`} 
                                color="secondary" 
                                variant="flat" 
                                size="lg"
                                startContent={<Icon icon="mdi:pencil-outline" />}
                            >
                                Edit Job
                            </Button>
                        )}
                        {isAuthenticated && user?.role === 'jobseeker' && (
                            <Button 
                                color="primary" 
                                size="lg" 
                                onPress={handleApply}
                                disabled={hasApplied || isApplying}
                                isLoading={isApplying}
                                startContent={!isApplying ? <Icon icon="mdi:send-outline" /> : null}
                            >
                                {hasApplied ? 'Applied' : (isApplying ? 'Applying...' : 'Apply Now')}
                            </Button>
                        )}
                        {!isAuthenticated && (
                            <Button 
                                color="primary" 
                                size="lg" 
                                as={Link} href={`/auth/login?redirect=/jobs/${jobId}`}
                                startContent={<Icon icon="mdi:login" />}
                            >
                                Login to Apply
                            </Button>
                        )}
                    </div>
                 </CardHeader>
                <Divider />
                <CardBody className="p-6 space-y-6">
                     {/* Key Details Section */}
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                         <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-xs text-gray-500 uppercase">Salary</p>
                            <p className="font-medium">{formatSalary(job.salary_min, job.salary_max)}</p>
                         </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-xs text-gray-500 uppercase">Experience</p>
                            <p className="font-medium">{job.experience_level || 'Any'}{job.experience_minimum !== null ? ` (${job.experience_minimum}${job.experience_maximun ? `-${job.experience_maximun}` : '+'} yrs)` : ''}</p>
                         </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-xs text-gray-500 uppercase">Openings</p>
                            <p className="font-medium">{job.openings || 1}</p>
                         </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-xs text-gray-500 uppercase">Education</p>
                            <p className="font-medium">{job.education_level || 'Any'}</p>
                         </div>
                     </div>
                    
                    {/* Description */} 
                     <div>
                        <h2 className="text-xl font-semibold mb-2">Job Description</h2>
                         <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
                     </div>

                    {/* Requirements */} 
                    {job.requirements && (
                         <div>
                            <h2 className="text-xl font-semibold mb-2">Requirements</h2>
                             <p className="text-gray-700 whitespace-pre-wrap">{job.requirements}</p>
                         </div>
                    )}

                    {/* Responsibilities */} 
                    {job.responsibilities && (
                         <div>
                            <h2 className="text-xl font-semibold mb-2">Responsibilities</h2>
                             <p className="text-gray-700 whitespace-pre-wrap">{job.responsibilities}</p>
                         </div>
                    )}
                     
                     {/* Skills/Tags */} 
                    {job.skills && (
                         <div>
                            <h2 className="text-xl font-semibold mb-2">Skills</h2>
                            <div className="flex flex-wrap gap-2">
                                 {job.skills.split(',').map(skill => skill.trim()).filter(Boolean).map((skill, index) => (
                                    <Chip key={`${skill}-${index}`} variant="flat" color="default">{skill}</Chip>
                                ))}
                             </div>
                         </div>
                    )}
                    {job.tags && job.tags.length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Tags</h2>
                            <div className="flex flex-wrap gap-2">
                                {job.tags.map(tag => (
                                    <Chip key={tag.id} variant="flat" color="secondary">{tag.name}</Chip>
                                ))}
                            </div>
                        </div>
                    )}

                     {/* Contact Info */} 
                    {(job.contact_person_name || job.contact_email || job.contact_number) && (
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
                             <ul className="list-none space-y-1 text-gray-700">
                                {job.contact_person_name && <li><Icon icon="mdi:account-outline" className="inline mr-2"/>{job.contact_person_name}</li>}
                                {job.contact_email && <li><Icon icon="mdi:email-outline" className="inline mr-2"/><a href={`mailto:${job.contact_email}`} className="text-primary hover:underline">{job.contact_email}</a></li>}
                                {job.contact_number && <li><Icon icon="mdi:phone-outline" className="inline mr-2"/>{job.contact_number}</li>}
                             </ul>
                        </div>
                    )}

                 </CardBody>
                 {/* Optional Footer */} 
                 {/* <Divider />
                 <CardFooter>
                    <p className="text-xs text-gray-500">Job ID: {job.id}</p>
                 </CardFooter> */} 
             </Card>

            {/* Application Modal */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
                <ModalContent>
                    {(modalOnClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Apply for {job.title}</ModalHeader>
                            <ModalBody>
                                <p className="text-sm text-gray-600 mb-4">
                                    Submit your application for this role. You can add an optional cover letter below.
                                </p>
                                {/* TODO: Add Resume Selection Dropdown if multiple resumes exist */} 
                                <Textarea
                                    label="Cover Letter (Optional)"
                                    placeholder="Write a brief message to the employer..."
                                    value={coverLetter}
                                    onValueChange={setCoverLetter}
                                    minRows={4}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={modalOnClose}>
                                    Cancel
                                </Button>
                                <Button color="primary" isLoading={isApplying} onPress={submitApplication}>
                                    {isApplying ? 'Submitting...' : 'Submit Application'}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
} 