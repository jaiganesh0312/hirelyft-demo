'use client';

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
import { getEmployerDashboard } from "@/services/employerService";
import { formatDistance } from "date-fns";
import Link from "next/link";

export default function EmployerDashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  // Fetch employer dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const response = await getEmployerDashboard();
        if (response.data.success) {
          setDashboardData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

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
    pending: "warning",
    viewed: "primary",
    shortlisted: "secondary",
    rejected: "danger",
    hired: "success",
  };

  return (
    <div className="px-4 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-default-900">
            Welcome back, {dashboardData.userName}
          </h1>
          <p className="text-default-600">Your Employer Dashboard</p>
        </div>

        <div className="flex gap-2">
          <Button
            color="primary"
            as={Link}
            href="/employer/jobs/create"
            startContent={<Icon icon="mdi:plus" />}
          >
            Post a Job
          </Button>

          <Button
            variant="flat"
            as={Link}
            href="/employer/profile"
            color="secondary"
            startContent={<Icon icon="mdi:account-edit" />}
          >
            Edit Profile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Stats Cards */}
        <Card className="border shadow-sm">
          <CardBody className="gap-3">
            <div className="flex justify-between items-center">
              <h3 className="text-default-600">Active Jobs</h3>
              <div className="p-2 rounded-full bg-primary-100">
                <Icon
                  icon="mdi:briefcase-outline"
                  className="text-2xl text-primary-500"
                />
              </div>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-default-900">
                {dashboardData.stats.active_jobs}
              </span>
              <Chip color="primary" variant="flat" size="sm">
                {dashboardData.stats.jobs_growth > 0 ? '+' : ''}{dashboardData.stats.jobs_growth}%
              </Chip>
            </div>
            <Button
              size="sm"
              variant="flat"
              color="primary"
              className="mt-1"
              endContent={<Icon icon="mdi:arrow-right" />}
              onPress={() => router.push("/employer/jobs")}
            >
              View Jobs
            </Button>
          </CardBody>
        </Card>

        <Card className="border shadow-sm">
          <CardBody className="gap-3">
            <div className="flex justify-between items-center">
              <h3 className="text-default-600">Applications</h3>
              <div className="p-2 rounded-full bg-secondary-100">
                <Icon
                  icon="mdi:file-document-outline"
                  className="text-2xl text-secondary-500"
                />
              </div>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-default-900">
                {dashboardData.stats.total_applications}
              </span>
              <Chip color="success" variant="flat" size="sm">
                {dashboardData.stats.applications_growth > 0 ? '+' : ''}{dashboardData.stats.applications_growth}%
              </Chip>
            </div>
            <Button
              size="sm"
              variant="flat"
              color="primary"
              className="mt-1"
              endContent={<Icon icon="mdi:arrow-right" />}
              onPress={() => router.push("/employer/applications")}
            >
              View Applications
            </Button>
          </CardBody>
        </Card>

        <Card className="border shadow-sm">
          <CardBody className="gap-3">
            <div className="flex justify-between items-center">
              <h3 className="text-default-600">Job Views</h3>
              <div className="p-2 rounded-full bg-warning-100">
                <Icon
                  icon="mdi:eye-outline"
                  className="text-2xl text-warning-500"
                />
              </div>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-default-900">
                {dashboardData.stats.job_views}
              </span>
              <Chip color="warning" variant="flat" size="sm">
                This Week
              </Chip>
            </div>
            <Button
              size="sm"
              variant="flat"
              color="primary"
              className="mt-1"
              endContent={<Icon icon="mdi:arrow-right" />}
              onPress={() => router.push("/employer/analytics")}
            >
              View Analytics
            </Button>
          </CardBody>
        </Card>

        <Card className="border shadow-sm">
          <CardBody className="gap-3">
            <div className="flex justify-between items-center">
              <h3 className="text-default-600">Interviews</h3>
              <div className="p-2 rounded-full bg-success-100">
                <Icon
                  icon="mdi:account-tie-outline"
                  className="text-2xl text-success-500"
                />
              </div>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-default-900">
                {dashboardData.stats.total_interviews}
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
              onPress={() => router.push("/employer/interviews")}
            >
              View Interviews
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
              onPress={() => router.push("/employer/applications")}
            >
              View All
            </Button>
          </CardHeader>
          <Divider />
          <CardBody className="p-0">
            {dashboardData.recentApplications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 px-2 text-center">
                <Icon
                  icon="mdi:file-document-outline"
                  className="text-4xl text-default-300 mb-3"
                />
                <p className="text-default-600 mb-1">No applications yet</p>
                <p className="text-sm text-default-400 mb-3">
                  Start posting jobs to receive applications
                </p>
                <Button
                  color="primary"
                  onPress={() => router.push("/employer/jobs/create")}
                  startContent={<Icon icon="mdi:plus" />}
                >
                  Post a Job
                </Button>
              </div>
            ) : (
              <Table removeWrapper aria-label="Recent applications">
                <TableHeader>
                  <TableColumn>Applicant</TableColumn>
                  <TableColumn>Position</TableColumn>
                  <TableColumn>Status</TableColumn>
                  <TableColumn>Applied</TableColumn>
                </TableHeader>
                <TableBody>
                  {dashboardData.recentApplications.map((application) => (
                    <TableRow
                      key={application.id}
                      className="cursor-pointer hover:bg-default-50"
                      onClick={() =>
                        router.push(`/employer/applications/${application.id}`)
                      }
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar
                            src={application.applicant?.avatarUrl}
                            name={application.applicant?.name?.charAt(0) || "?"}
                            size="sm"
                            className="bg-primary-100 text-primary-500"
                          />
                          <span>{application.applicant?.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {application.job?.title}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Chip
                          size="sm"
                          color={applicationStatusColorMap[application.status]}
                          variant="flat"
                        >
                          {application.status}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        {formatDistance(new Date(application.created_at), new Date(), {
                          addSuffix: true,
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardBody>
        </Card>

        {/* Active Jobs */}
        <Card className="border shadow-sm">
          <CardHeader className="flex justify-between">
            <h3 className="text-xl font-semibold">Active Jobs</h3>
            <Button
              size="sm"
              variant="light"
              color="primary"
              endContent={<Icon icon="mdi:arrow-right" />}
              onPress={() => router.push("/employer/jobs")}
            >
              View All
            </Button>
          </CardHeader>
          <Divider />
          <CardBody className="p-0">
            {dashboardData.activeJobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 px-2 text-center">
                <Icon
                  icon="mdi:briefcase-outline"
                  className="text-4xl text-default-300 mb-3"
                />
                <p className="text-default-600 mb-1">No active jobs</p>
                <p className="text-sm text-default-400 mb-3">
                  Start posting jobs to attract candidates
                </p>
                <Button
                  color="primary"
                  onPress={() => router.push("/employer/jobs/create")}
                  startContent={<Icon icon="mdi:plus" />}
                >
                  Post a Job
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-default-200">
                {dashboardData.activeJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-4 hover:bg-default-50 cursor-pointer"
                    onClick={() => router.push(`/employer/jobs/${job.id}`)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-default-800 truncate">
                          {job.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-xs text-default-500">
                          <Chip
                            size="sm"
                            variant="bordered"
                            color="primary"
                            startContent={<Icon icon="mdi:map-marker" />}
                          >
                            {job.location}
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
                        <div className="flex items-center gap-2 mt-2">
                          <Chip
                            size="sm"
                            variant="flat"
                            color="primary"
                            startContent={<Icon icon="mdi:account-group" />}
                          >
                            {job.applications_count} Applications
                          </Chip>
                          <Chip
                            size="sm"
                            variant="flat"
                            color="success"
                            startContent={<Icon icon="mdi:eye" />}
                          >
                            {job.view_count} Views
                          </Chip>
                        </div>
                      </div>
                      <Button
                        isIconOnly
                        variant="light"
                        color="primary"
                        onPress={() => router.push(`/employer/jobs/${job.id}`)}
                      >
                        <Icon icon="mdi:chevron-right" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
} 