import React from "react";
import JobDetail from "@/components/jobs/JobDetail";

export default async function JobDetailsPage({ params }) {
  const { id } = await params;

  return <div className="mx-auto w-full">
     <JobDetail jobId={id} isMobileView />
  </div>;
}
