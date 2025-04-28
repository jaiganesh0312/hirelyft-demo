'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, CardFooter, Button, Spinner, Divider, Chip, Avatar, Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Progress, Badge } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getJobseekerStats } from '@/services/jobseekerService';
import { getMyApplications } from '@/services/applicationService';
import { getUnreadMessageCount } from '@/services/messagingService';
import { getRecommendedJobs } from '@/services/jobService';
import { formatDistance } from 'date-fns';

const formatSalary = (min, max) => {
  if (min && max) return `$${min} - $${max}`;
  if (min) return `From $${min}`;
  if (max) return `Up to $${max}`;
  return 'Not specified';
};

export default function JobseekerDashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [applications, setApplications] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState(0);

  // Fetch jobseeker dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Fetch jobseeker stats
        const statsResponse = await getJobseekerStats();
        setStats(statsResponse.data);
        
        // Fetch recent applications
        const applicationsResponse = await getMyApplications({ 
          limit: 5,
          sortBy: 'created_at',
          sortDirection: 'desc'
        });
        setApplications(applicationsResponse.data.applications || []);
        
        // Fetch recommended jobs
        const jobsResponse = await getRecommendedJobs({ limit: 5 });
        setRecommendedJobs(jobsResponse.data.jobs || []);
        
        // Fetch unread message count
        const messagesResponse = await getUnreadMessageCount();
        setUnreadMessages(messagesResponse.data.count || 0);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner size="lg" color="primary" labelColor="primary" label="Loading dashboard..." />
      </div>
    );
  }

  // Application status color mapping
  const applicationStatusColorMap = {
    'Pending': 'warning',
    'Viewed': 'primary',
    'Shortlisted': 'secondary',
    'Rejected': 'danger',
    'Hired': 'success'
  };

  // Calculate profile completion
  const profileCompletion = stats?.profile_completion || 0;

  return (
    <div className="px-4 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-default-900">Welcome back, {user?.name || 'Job Seeker'}</h1>
          <p className="text-default-600">Your Jobseeker Dashboard</p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            color="primary" 
            startContent={<Icon icon="mdi:magnify" />}
            onPress={() => router.push('/jobs')}
          >
            Find Jobs
          </Button>
          
          <Button 
            variant="flat" 
            color="secondary"
            startContent={<Icon icon="mdi:file-document-edit-outline" />}
            onPress={() => router.push('/jobseeker/resume')}
          >
            Edit Resume
          </Button>
        </div>
      </div>
      
      {profileCompletion < 100 && (
        <Card className="border shadow-sm bg-gradient-to-r from-blue-50 to-primary-50 dark:from-blue-900/20 dark:to-primary-900/20">
          <CardBody className="gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary-100 dark:bg-primary-800/60 p-2 rounded-full">
                  <Icon icon="mdi:account-circle" className="text-2xl text-primary-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-default-800">Complete Your Profile</h3>
                  <p className="text-sm text-default-600">A complete profile improves your chances of getting hired</p>
                </div>
              </div>
              <Button 
                color="primary"
                variant="flat"
                endContent={<Icon icon="mdi:arrow-right" />}
                onPress={() => router.push('/jobseeker/profile')}
              >
                Complete Profile
              </Button>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-default-700">{profileCompletion}% complete</span>
                <span className="text-xs text-default-500">{100 - profileCompletion}% remaining</span>
              </div>
              <Progress 
                value={profileCompletion} 
                color={profileCompletion < 50 ? "warning" : profileCompletion < 80 ? "primary" : "success"}
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
                <Icon icon="mdi:file-document-outline" className="text-2xl text-primary-500" />
              </div>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-default-900">{stats?.total_applications || 0}</span>
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
              onPress={() => router.push('/jobseeker/applications')}
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
                <Icon icon="mdi:account-tie-outline" className="text-2xl text-secondary-500" />
              </div>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-default-900">{stats?.interviews_count || 0}</span>
              {stats?.upcoming_interviews > 0 && (
                <Chip color="success" variant="flat" size="sm">
                  {stats.upcoming_interviews} Upcoming
                </Chip>
              )}
            </div>
            <Button 
              size="sm" 
              variant="flat" 
              color="primary" 
              className="mt-1"
              endContent={<Icon icon="mdi:arrow-right" />}
              onPress={() => router.push('/jobseeker/interviews')}
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
                <Icon icon="mdi:message-outline" className="text-2xl text-warning-500" />
              </div>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-default-900">{unreadMessages || 0}</span>
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
              onPress={() => router.push('/jobseeker/messages')}
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
              onPress={() => router.push('/jobseeker/applications')}
            >
              View All
            </Button>
          </CardHeader>
          <Divider />
          <CardBody className="p-0">
            {applications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 px-2 text-center">
                <Icon icon="mdi:file-document-outline" className="text-4xl text-default-300 mb-3" />
                <p className="text-default-600 mb-1">No applications yet</p>
                <p className="text-sm text-default-400 mb-3">Start applying to jobs to track your progress</p>
                <Button 
                  color="primary" 
                  onPress={() => router.push('/jobs')}
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
                  {applications.map((application) => (
                    <TableRow 
                      key={application.id}
                      className="cursor-pointer hover:bg-default-50"
                      onClick={() => router.push(`/jobseeker/applications/${application.id}`)}
                    >
                      <TableCell>
                        <div className="font-medium">{application.job?.title}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar 
                            src={application.job?.employer?.logo_url} 
                            name={application.job?.employer?.company_name?.charAt(0) || '?'} 
                            size="sm" 
                            className="bg-primary-100 text-primary-500"
                          />
                          <span>{application.job?.employer?.company_name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          color={applicationStatusColorMap[application.status] || 'default'} 
                          size="sm"
                          variant="flat"
                        >
                          {application.status}
                        </Chip>
                      </TableCell>
                      <TableCell className="text-default-500 text-sm">
                        {formatDistance(new Date(application.createdAt), new Date(), { addSuffix: true })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardBody>
        </Card>
        
        {/* Job Recommendations */}
        <Card className="border shadow-sm">
          <CardHeader className="flex justify-between">
            <h3 className="text-xl font-semibold">Recommended for You</h3>
            <Button 
              size="sm" 
              variant="light" 
              color="primary" 
              endContent={<Icon icon="mdi:arrow-right" />}
              onPress={() => router.push('/jobs')}
            >
              View More
            </Button>
          </CardHeader>
          <Divider />
          <CardBody className="p-0">
            {recommendedJobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 px-2 text-center">
                <Icon icon="mdi:briefcase-search-outline" className="text-4xl text-default-300 mb-3" />
                <p className="text-default-600 mb-1">No recommendations yet</p>
                <p className="text-sm text-default-400 mb-3">Complete your profile to get personalized job recommendations</p>
                <Button 
                  color="primary" 
                  onPress={() => router.push('/jobseeker/profile')}
                  startContent={<Icon icon="mdi:account-edit" />}
                >
                  Update Profile
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-default-200">
                {recommendedJobs.map((job) => (
                  <div 
                    key={job.id} 
                    className="p-4 hover:bg-default-50 cursor-pointer"
                    onClick={() => router.push(`/jobs/${job.id}`)}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar 
                        src={job.company?.logo_url} 
                        name={job.employer.company_name?.charAt(0) || '?'} 
                        size="md" 
                        className="bg-primary-100 text-primary-500"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-default-800 truncate">{job.title}</h4>
                        <p className="text-sm text-default-600 truncate">{job.company?.name}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-default-500">
                          <Chip size='sm' variant='bordered' color='primary'  startContent={<Icon icon="mdi:map-marker" />} >{job.location_city}</Chip>
                          <Chip size='sm' variant='bordered' color='secondary' startContent={<Icon icon="mdi:clock-outline" />} >{job.job_type}</Chip>
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
                            <Chip size="sm" variant="flat" color='secondary'>
                              Remote
                            </Chip>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <span className="text-xs text-default-500">
                          {formatDistance(new Date(job.created_at), new Date(), { addSuffix: true }) }
                        </span>
                        <Button 
                          size="sm" 
                          color="primary"
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
          {recommendedJobs.length > 0 && (
            <>
              <Divider />
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant="flat" 
                  color="primary"
                  onPress={() => router.push('/jobs')}
                  startContent={<Icon icon="mdi:magnify" />}
                >
                  Browse All Jobs
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
      
      {/* Activity Timeline */}
      <Card className="border shadow-sm">
        <CardHeader className="flex justify-between">
          <h3 className="text-xl font-semibold">Your Activity</h3>
        </CardHeader>
        <Divider />
        <CardBody className="p-0">
          <div className="relative py-4">
            {/* Timeline */}
            <div className="absolute top-0 bottom-0 left-7 w-0.5 bg-default-200"></div>
            
            <div className="space-y-6 pl-4 pr-2">
              {stats?.recent_activities?.length > 0 ? (
                stats.recent_activities.map((activity, index) => (
                  <div key={index} className="relative flex items-start gap-4">
                    <div className="absolute -left-3 mt-0.5 bg-white dark:bg-gray-950 p-1 rounded-full shadow">
                      <div className={`p-1.5 rounded-full ${
                        activity.type === 'application' ? 'bg-primary-100 text-primary-500' :
                        activity.type === 'view' ? 'bg-secondary-100 text-secondary-500' :
                        activity.type === 'message' ? 'bg-warning-100 text-warning-500' :
                        'bg-default-100 text-default-500'
                      }`}>
                        <Icon 
                          icon={
                            activity.type === 'application' ? 'mdi:file-document-outline' :
                            activity.type === 'view' ? 'mdi:eye-outline' :
                            activity.type === 'message' ? 'mdi:message-outline' :
                            'mdi:information-outline'
                          } 
                          className="text-lg"
                        />
                      </div>
                    </div>
                    
                    <div className="flex-1 bg-default-50 rounded-lg p-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <p className="font-medium text-default-800">{activity.title}</p>
                        <span className="text-xs text-default-500">
                          {formatDistance(new Date(activity.timestamp), new Date(), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm text-default-600 mt-1">{activity.description}</p>
                      
                      {activity.actionUrl && (
                        <Button 
                          size="sm" 
                          variant="light" 
                          color="primary" 
                          className="mt-2"
                          onPress={() => router.push(activity.actionUrl)}
                        >
                          {activity.actionText || 'View Details'}
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Icon icon="mdi:timeline-outline" className="text-4xl text-default-300 mb-2" />
                  <p className="text-default-600">No recent activity</p>
                  <p className="text-sm text-default-400 max-w-md mt-1">
                    Your job applications, profile views, and messages will appear here
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
} 