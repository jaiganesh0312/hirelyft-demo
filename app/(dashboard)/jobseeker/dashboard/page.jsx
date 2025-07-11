"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Spinner,
  Divider,
  Chip,
  Avatar,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Progress,
  Badge,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getJobSeekerDashboard } from "@/services/jobSeekerService";
import { formatDistance } from "date-fns";
import Link from "next/link";

const formatSalary = (min, max) => {
  if (min && max) return `₹${min} - ₹${max}`;
  if (min) return `From ₹${min}`;
  if (max) return `Up to ₹${max}`;
  return "Not specified";
};

export default function JobseekerDashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  // Fetch jobseeker dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const response = await getJobSeekerDashboard();
        console.log("Response recieved");
        if (response.data.success) {
          setDashboardData(response.data.data);
        } else {
          console.log("No profile found redirecting ...")
          router.push("/jobseeker/profile-completion");
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner
          size="lg"
          color="primary"
          labelColor="primary"
          label="Loading dashboard..."
        />
      </div>
    );
  }

  if (!dashboardData) {
    return null;
  }

  // Application status color mapping
  const applicationStatusColorMap = {
    Pending: "warning",
    Viewed: "primary",
    Shortlisted: "secondary",
    Rejected: "danger",
    Hired: "success",
  };

  return (
    <div className="px-4 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-default-900">
            Welcome back, {dashboardData.userName}
          </h1>
          <p className="text-default-600">Your Jobseeker Dashboard</p>
        </div>

        <div className="flex gap-2">
          <Button
            color="primary"
            as={Link}
            href="/jobs"
            startContent={<Icon icon="mdi:magnify" />}
          >
            Find Jobs
          </Button>

          <Button
            variant="flat"
            as={Link}
            href="/jobseeker/resume"
            color="secondary"
            startContent={<Icon icon="mdi:file-document-edit-outline" />}
          >
            Edit Resume
          </Button>
        </div>
      </div>

      {dashboardData.profileCompletion < 100 && (
        <Card className="border shadow-sm bg-gradient-to-r from-blue-50 to-primary-50 dark:from-blue-900/20 dark:to-primary-900/20">
          <CardBody className="gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary-100 dark:bg-primary-800/60 p-2 rounded-full">
                  <Icon
                    icon="mdi:account-circle"
                    className="text-2xl text-primary-500"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-default-800">
                    Complete Your Profile
                  </h3>
                  <p className="text-sm text-default-600">
                    A complete profile improves your chances of getting hired
                  </p>
                </div>
              </div>
              <Button
                color="primary"
                variant="flat"
                endContent={<Icon icon="mdi:arrow-right" />}
                onPress={() => router.push("/jobseeker/profile-completion")}
              >
                <span className="hidden md:inline">Complete Profile</span>
              </Button>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-default-700">
                  {dashboardData.profileCompletion}% complete
                </span>
                <span className="text-xs text-default-500">
                  {100 - dashboardData.profileCompletion}% remaining
                </span>
              </div>
              <Progress
                value={dashboardData.profileCompletion}
                color={
                  dashboardData.profileCompletion < 50
                    ? "warning"
                    : dashboardData.profileCompletion < 80
                    ? "primary"
                    : "success"
                }
                className="h-2"
                showValueLabel={false}
              />
            </div>
          </CardBody>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <Card className="border shadow-sm">
          <CardBody className="gap-3">
            <div className="flex justify-between items-center">
              <h3 className="text-default-600">Applications</h3>
              <div className="p-2 rounded-full bg-primary-100">
                <Icon
                  icon="mdi:file-document-outline"
                  className="text-2xl text-primary-500"
                />
              </div>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-default-900">
                {dashboardData.applicationsThisMonth}
              </span>
              <Chip color="primary" variant="flat" size="sm">
                This Month
              </Chip>
            </div>
            <Button
              size="sm"
              variant="flat"
              color="primary"
              className="mt-1"
              endContent={<Icon icon="mdi:arrow-right" />}
              onPress={() => router.push("/jobseeker/applications")}
            >
              View Applications
            </Button>
          </CardBody>
        </Card>

        <Card className="border shadow-sm">
          <CardBody className="gap-3">
            <div className="flex justify-between items-center">
              <h3 className="text-default-600">Interviews</h3>
              <div className="p-2 rounded-full bg-secondary-100">
                <Icon
                  icon="mdi:account-tie-outline"
                  className="text-2xl text-secondary-500"
                />
              </div>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-default-900">
                {dashboardData.interviewsScheduled}
              </span>
              <Chip color="success" variant="flat" size="sm">
                Scheduled
              </Chip>
            </div>
            <Button
              size="sm"
              variant="flat"
              color="primary"
              className="mt-1"
              endContent={<Icon icon="mdi:arrow-right" />}
              onPress={() => router.push("/jobseeker/interviews")}
            >
              View Interviews
            </Button>
          </CardBody>
        </Card>

        <Card className="border shadow-sm">
          <CardBody className="gap-3">
            <div className="flex justify-between items-center">
              <h3 className="text-default-600">Messages</h3>
              <div className="p-2 rounded-full bg-warning-100">
                <Icon
                  icon="mdi:message-outline"
                  className="text-2xl text-warning-500"
                />
              </div>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-default-900">
                {dashboardData.unreadMessages}
              </span>
              <Chip color="warning" variant="flat" size="sm">
                Unread
              </Chip>
            </div>
            <Button
              size="sm"
              variant="flat"
              color="primary"
              className="mt-1"
              endContent={<Icon icon="mdi:arrow-right" />}
              onPress={() => router.push("/jobseeker/messages")}
            >
              View Messages
            </Button>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <Card className="border shadow-sm">
          <CardHeader className="flex justify-between">
            <h3 className="text-xl font-semibold">Recent Applications</h3>
            <Button
              size="sm"
              variant="light"
              color="primary"
              endContent={<Icon icon="mdi:arrow-right" />}
              onPress={() => router.push("/jobseeker/applications")}
            >
              View All
            </Button>
          </CardHeader>
          {/* <CardBody>
            <Table aria-label="Recent applications">
              <TableHeader>
                <TableColumn>JOB</TableColumn>
                <TableColumn>COMPANY</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>APPLIED</TableColumn>
              </TableHeader>
              <TableBody>
                {dashboardData.recentApplications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{application.job?.title}</span>
                        <span className="text-sm text-default-500">{application.job?.job_type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar
                          src={application.job?.employer?.logo}
                          size="sm"
                          fallback={application.job?.employer?.company_name?.charAt(0)}
                        />
                        <span>{application.job?.employer?.company_name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Chip color={applicationStatusColorMap[application.status] || 'default'}>
                        {application.status}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-default-500">
                        {formatDistance(new Date(application.appliedAt), new Date(), { addSuffix: true })}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody> */}

          <CardBody className="p-0">
            {dashboardData.recentApplications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 px-2 text-center">
                <Icon
                  icon="mdi:file-document-outline"
                  className="text-4xl text-default-300 mb-3"
                />
                <p className="text-default-600 mb-1">No applications yet</p>
                <p className="text-sm text-default-400 mb-3">
                  Start applying to jobs to track your progress
                </p>
                <Button
                  color="primary"
                  onPress={() => router.push("/jobs")}
                  startContent={<Icon icon="mdi:magnify" />}
                >
                  Browse Jobs
                </Button>
              </div>
            ) : (
              <Table removeWrapper aria-label="Recent applications">
                <TableHeader>
                  <TableColumn>Position</TableColumn>
                  <TableColumn>Company</TableColumn>
                  <TableColumn>Status</TableColumn>
                  <TableColumn>Applied</TableColumn>
                </TableHeader>
                <TableBody>
                  {dashboardData.recentApplications.map((application) => (
                    <TableRow
                      key={application.id}
                      className="cursor-pointer hover:bg-default-50"
                      onClick={() =>
                        router.push(`/jobseeker/applications/${application.id}`)
                      }
                    >
                      <TableCell>
                        <div className="font-medium">
                          {application.job?.title}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar
                            src={application.job?.employer?.logo_url}
                            name={
                              application.job?.employer?.company_name?.charAt(
                                0
                              ) || "?"
                            }
                            size="sm"
                            className="bg-primary-100 text-primary-500"
                          />
                          <span>{application.job?.employer?.company_name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Chip
                          color={
                            applicationStatusColorMap[application.status] ||
                            "default"
                          }
                          size="sm"
                          variant="flat"
                        >
                          {application.status}
                        </Chip>
                      </TableCell>
                      <TableCell className="text-default-500 text-sm">
                        {/* {formatDistance(Date.now())} */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardBody>
        </Card>

        {/* Recommended Jobs */}
        <Card className="border shadow-sm">
          <CardHeader className="flex justify-between">
            <h3 className="text-xl font-semibold">Recommended Jobs</h3>
            <Button
              size="sm"
              variant="light"
              color="primary"
              endContent={<Icon icon="mdi:arrow-right" />}
              onPress={() => router.push("/jobs")}
            >
              View All
            </Button>
          </CardHeader>
          {/* <CardBody>
            <div className="space-y-4">
              {dashboardData.recommendedJobs.map((job) => (
                <div key={job.id} className="flex gap-4 p-4 border rounded-lg hover:bg-default-50 cursor-pointer" onClick={() => router.push(`/jobs/${job.id}`)}>
                  <Avatar
                    src={job.employer?.logo}
                    size="lg"
                    fallback={job.employer?.company_name?.charAt(0)}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{job.title}</h4>
                        <p className="text-sm text-default-500">{job.employer?.company_name}</p>
                      </div>
                      <Chip size="sm" color={job.is_remote ? "success" : "default"}>
                        {job.is_remote ? 'Remote' : job.location_city}
                      </Chip>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Chip size="sm" variant="flat">{job.job_type}</Chip>
                      <Chip size="sm" variant="flat">{job.experience_level}</Chip>
                      <Chip size="sm" variant="flat">{formatSalary(job.salary_min, job.salary_max)}</Chip>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {job.skills?.slice(0, 3).map((skill, index) => (
                        <Chip key={index} size="sm" variant="flat" color="primary">{skill}</Chip>
                      ))}
                      {job.skills?.length > 3 && (
                        <Chip size="sm" variant="flat">+{job.skills.length - 3} more</Chip>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody> */}
          <Divider />
          <CardBody className="p-0">
            {dashboardData.recommendedJobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 px-2 text-center">
                <Icon
                  icon="mdi:briefcase-search-outline"
                  className="text-4xl text-default-300 mb-3"
                />
                <p className="text-default-600 mb-1">No recommendations yet</p>
                <p className="text-sm text-default-400 mb-3">
                  Complete your profile to get personalized job recommendations
                </p>
                <Button
                  color="primary"
                  onPress={() => router.push("/jobseeker/profile")}
                  startContent={<Icon icon="mdi:account-edit" />}
                >
                  Update Profile
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-default-200">
                {dashboardData.recommendedJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-4 hover:bg-default-50 cursor-pointer"
                    onClick={() => router.push(`/jobs/${job.id}`)}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar
                        src={job.company?.logo_url}
                        name={job.employer?.company_name?.charAt(0) || "?"}
                        size="md"
                        className="bg-primary-100 text-primary-500"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-default-800 truncate">
                          {job.title}
                        </h4>
                        <p className="text-sm text-default-600 truncate">
                          {job.company?.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-default-500">
                          <Chip
                            size="sm"
                            variant="bordered"
                            color="primary"
                            startContent={<Icon icon="mdi:map-marker" />}
                          >
                            {job.location_city}
                          </Chip>
                          <Chip
                            size="sm"
                            variant="bordered"
                            color="secondary"
                            startContent={<Icon icon="mdi:clock-outline" />}
                          >
                            {job.job_type}
                          </Chip>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {(job.salary_min || job.salary_max) && (
                            <Chip size="sm" variant="flat" color="success">
                              {formatSalary(job.salary_min, job.salary_max)}
                            </Chip>
                          )}
                          {job.match_percentage && (
                            <Chip size="sm" variant="flat" color="primary">
                              {job.match_percentage}% Match
                            </Chip>
                          )}
                          {job.is_remote && (
                            <Chip size="sm" variant="flat" color="secondary">
                              Remote
                            </Chip>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border shadow-sm">
        <CardHeader>
          <h3 className="text-xl font-semibold">Recent Activity</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {dashboardData.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-default-100">
                  <Icon
                    icon={
                      activity.type === "application"
                        ? "mdi:file-document-outline"
                        : activity.type === "interview"
                        ? "mdi:account-tie-outline"
                        : activity.type === "message"
                        ? "mdi:message-outline"
                        : "mdi:information-outline"
                    }
                    className="text-xl text-default-500"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-default-900">{activity.message}</p>
                  <p className="text-sm text-default-500">
                    {formatDistance(new Date(activity.date), new Date(), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                {activity.status && (
                  <Badge
                    color={
                      activity.status === "success"
                        ? "success"
                        : activity.status === "warning"
                        ? "warning"
                        : activity.status === "error"
                        ? "danger"
                        : "default"
                    }
                  >
                    {activity.status}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
