'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import JobDetail from '@/components/jobs/JobDetail';

export default function JobDetailPage() {
    const params = useParams();
    const jobId = params.jobId; // Extract jobId from URL parameters

    return (
        <div>
             <div> {/* Adjust pt to match Navbar height */} 
                {jobId ? (
                    <JobDetail jobId={jobId} />
                ) : (
                    <div className="text-center py-20">Invalid Job ID</div> // Handle case where jobId is missing
                )}
             </div>
            {/* Optional: Add a Footer component here */}
        </div>
    );
} 