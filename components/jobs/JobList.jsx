'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { getJobs } from '@/services/jobService';
import { Card, CardHeader, CardBody, CardFooter, Button, Pagination, Spinner, Input, Chip, Checkbox, Select, SelectItem, Tooltip, Divider } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useAuth } from '@/context/AuthContext';
import { useDebouncedCallback } from 'use-debounce';
import JobDetail from './JobDetail';
import { useMediaQuery } from '@/hooks/useMediaQuery';

// Example options - might come from API/constants
const jobTypeOptions = ["Full-time", "Part-time", "Contract", "Internship", "Temporary"];
const experienceLevelOptions = ["Entry", "Junior", "Mid-level", "Senior", "Executive"];

function formatDate(date) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }

function JobCard({ job, isAuthenticated, onSelect, isSelected }) {
    // Function to format salary range
    const formatSalary = (min, max) => {
        if (min && max) return `₹${min} - ₹${max}`;
        if (min) return `From ₹${min}`;
        if (max) return `Up to ₹${max}`;
        return 'Not specified';
    };

    return (
        <Card 
            shadow="sm" 
            className={`w-full transition-shadow duration-300 ${isSelected ? 'border-primary border-2' : 'hover:shadow-md'}`}
            
        >
            <CardHeader className="flex justify-between items-start gap-3">
                <div className="flex flex-col">
                    <div className="text-lg font-semibold text-primary hover:underline" onClick={() => onSelect(job.id)}>
                         {job.title}
                    </div>
                    <p className="text-sm text-gray-600">{job.employer?.company_name || 'Unknown Employer'}</p>
                </div>
                 {job.is_remote && (
                    <Chip color="secondary" variant="flat" size="sm">Remote</Chip>
                )}
            </CardHeader>
            <CardBody className="pt-0">
                <p className="text-sm text-gray-700 line-clamp-3 mb-2">{job.description}</p>
                <div className="flex flex-wrap gap-2 text-xs mb-3">
                    {job.location_city && <Chip radius="sm" variant="flat" color='primary' startContent={<Icon icon="mdi:map-marker-outline" />}>{job.location_city}{job.location_area ? `, ${job.location_area}` : ''}</Chip>}
                    {job.job_type && <Chip radius="sm" variant="flat" color='secondary' startContent={<Icon icon="mdi:clock-outline" />} >{job.job_type}</Chip>}
                    {job.experience_level && <Chip radius="sm" variant="flat" color='warning' startContent={<Icon icon="mdi:chart-line-variant" />}>{job.experience_level}</Chip>}
                    {(job.salary_min || job.salary_max) && <Chip radius="sm" variant="flat" color='success' startContent={<Icon icon="mdi:cash" />} >{formatSalary(job.salary_min, job.salary_max)}</Chip>}
                </div>
            </CardBody>
            <CardFooter className="flex justify-between items-center">
                 <p className="text-xs text-gray-500">
                     Posted: {formatDate(new Date(job.created_at))}
                 </p>
                <Button 
                    color="primary" 
                    size="sm"
                    variant="ghost"
                    onPress={() => {
                        
                        onSelect(job.id);
                    }}
                >
                    View Details
                </Button>
            </CardFooter>
        </Card>
    );
}

export default function JobList() {
    const { isAuthenticated } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalJobs, setTotalJobs] = useState(0);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const isMobile = useMediaQuery('(max-width: 900px)');

    // Filter States
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [isRemoteFilter, setIsRemoteFilter] = useState(false);
    const [jobTypeFilter, setJobTypeFilter] = useState('');
    const [experienceFilter, setExperienceFilter] = useState('');
    const [minSalaryFilter, setMinSalaryFilter] = useState('');
    const [maxSalaryFilter, setMaxSalaryFilter] = useState('');

    // Track active filters count
    const activeFiltersCount = [
        locationFilter !== '',
        isRemoteFilter,
        jobTypeFilter.size > 0,
        experienceFilter.size > 0,
        minSalaryFilter !== '',
        maxSalaryFilter !== ''
    ].filter(Boolean).length;

    const fetchJobs = useCallback(async (currentPage, filters) => {
        setIsLoading(true);
        setError(null);
        try {
            const params = { 
                page: currentPage, 
                limit: 9,
                search: filters.searchTerm,
                location: filters.locationFilter,
                is_remote: filters.isRemoteFilter ? true : undefined,
                job_type: filters.jobTypeFilter?.size > 0 ? Array.from(filters.jobTypeFilter).join(',') : undefined,
                experience_level: filters.experienceFilter?.size > 0 ? Array.from(filters.experienceFilter).join(',') : undefined,
                salary_min: filters.minSalaryFilter ? parseFloat(filters.minSalaryFilter) : undefined,
                salary_max: filters.maxSalaryFilter ? parseFloat(filters.maxSalaryFilter) : undefined,
            };
            Object.keys(params).forEach(key => (params[key] === undefined || params[key] === '' || params[key] === null) && delete params[key]);

            const response = await getJobs(params);
            setJobs(response.data.jobs || []);
            setTotalPages(response.data.pagination?.totalPages || 1);
            setTotalJobs(response.data.pagination?.totalJobs || 0);
        } catch (err) {
            console.error("Error fetching jobs:", err);
            setError('Failed to load jobs. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const debouncedFetchJobs = useDebouncedCallback(() => {
        setPage(1);
        fetchJobs(1, { 
            searchTerm, 
            locationFilter, 
            isRemoteFilter, 
            jobTypeFilter, 
            experienceFilter, 
            minSalaryFilter, 
            maxSalaryFilter 
        });
    }, 500);

    useEffect(() => {
        fetchJobs(page, { 
            searchTerm, 
            locationFilter, 
            isRemoteFilter, 
            jobTypeFilter, 
            experienceFilter, 
            minSalaryFilter, 
            maxSalaryFilter 
        });
    }, [page]);

    useEffect(() => {
         debouncedFetchJobs();
    }, [searchTerm, locationFilter, isRemoteFilter, jobTypeFilter, experienceFilter, minSalaryFilter, maxSalaryFilter, debouncedFetchJobs]);

    const handleClearFilters = () => {
        setSearchTerm('');
        setLocationFilter('');
        setIsRemoteFilter(false);
        setJobTypeFilter(new Set());
        setExperienceFilter(new Set());
        setMinSalaryFilter('');
        setMaxSalaryFilter('');
        setPage(1);
        // Immediately refetch after clearing
        fetchJobs(1, {}); 
    };

    const handleSelectJob = (jobId) => {
        setSelectedJobId(jobId);
    };

    const handleCloseJobDetail = () => {
        setSelectedJobId(null);
    };

    return (
        <div className="container mx-auto px-2 py-4">
            {/* If on mobile and a job is selected, only show the job details */}
            {isMobile && selectedJobId ? (
                <JobDetail 
                    jobId={selectedJobId} 
                    onClose={handleCloseJobDetail} 
                    isMobileView={true} 
                />
            ) : (
                <div className={`${!isMobile && selectedJobId ? 'flex flex-row gap-6' : ''}`}>
                    {/* Main job list column */}
                    <div className={`${!isMobile && selectedJobId ? 'w-1/2' : 'w-full'}`}>
                        <Card className="mb-4">
                            <div className="p-4">
                                <div className="flex flex-col md:flex-row gap-4 items-center">
                                    <Input
                                        isClearable
                                        placeholder="Find your next opportunity..."
                                        startContent={<Icon icon="mdi:magnify" />}
                                        value={searchTerm}
                                        onClear={() => setSearchTerm('')}
                                        onValueChange={setSearchTerm}
                                        className="flex-grow"
                                    />
                                    <div className="flex gap-2">
                                        <Button 
                                            color="primary" 
                                            variant="flat" 
                                            endContent={<Icon icon={showFilters ? "mdi:chevron-up" : "mdi:chevron-down"} />}
                                            onPress={() => setShowFilters(!showFilters)}
                                            className="whitespace-nowrap"
                                        >
                                            {showFilters ? "Hide Filters" : "Show Filters"}
                                            {activeFiltersCount > 0 && (
                                                <Chip size="sm" className="ml-2" color="primary">{activeFiltersCount}</Chip>
                                            )}
                                        </Button>
                                        
                                        {activeFiltersCount > 0 && (
                                            <Button 
                                                variant="light" 
                                                color='danger'
                                                onPress={handleClearFilters} 
                                                startContent={<Icon icon="mdi:filter-remove-outline" />}
                                            >
                                                Clear
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Collapsible Filters */}
                        {showFilters && (
                            <Card className="mb-8">
                                <CardBody>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {/* Location Section */}
                                        <div className="space-y-4">
                                            <Input
                                                label="Location"
                                                isClearable
                                                placeholder="City, Area"
                                                startContent={<Icon icon="mdi:map-marker-outline" />}
                                                value={locationFilter}
                                                onClear={() => setLocationFilter('')}
                                                onValueChange={setLocationFilter}
                                                className="w-full"
                                            />
                                            <Checkbox 
                                                isSelected={isRemoteFilter} 
                                                onValueChange={setIsRemoteFilter}
                                            >
                                                Remote Jobs Only
                                            </Checkbox>
                                        </div>
                                        
                                        {/* Job Type & Experience */}
                                        <div className="flex flex-col gap-4">
                                            <Select
                                                label="Job Type"
                                                placeholder="Select job types"
                                                selectionMode="single"
                                                selectedKeys={jobTypeFilter}
                                                onSelectionChange={setJobTypeFilter}
                                                className="w-full"
                                            >
                                                {jobTypeOptions.map((type) => (
                                                    <SelectItem key={type} value={type}>
                                                        {type}
                                                    </SelectItem>
                                                ))}
                                            </Select>
                                            <Select
                                                label="Experience Level"
                                                placeholder="Select experience levels"
                                                selectionMode="single"
                                                selectedKeys={experienceFilter}
                                                onSelectionChange={setExperienceFilter}
                                                className="w-full"
                                            >
                                                {experienceLevelOptions.map((level) => (
                                                    <SelectItem key={level} value={level}>
                                                        {level}
                                                    </SelectItem>
                                                ))}
                                            </Select>
                                        </div>
                                        
                                        {/* Salary Range */}
                                        <div className="space-y-4">
                                            <p className="text-sm font-medium mb-1">Salary Range</p>
                                            <div className="flex gap-4">
                                                <Input
                                                    type="number"
                                                    label="Minimum"
                                                    placeholder="50000"
                                                    startContent="$"
                                                    value={minSalaryFilter}
                                                    onValueChange={setMinSalaryFilter}
                                                    className="flex-1"
                                                    min="0"
                                                />
                                                <Input
                                                    type="number"
                                                    label="Maximum"
                                                    placeholder="120000"
                                                    startContent="$"
                                                    value={maxSalaryFilter}
                                                    onValueChange={setMaxSalaryFilter}
                                                    className="flex-1"
                                                    min="0"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        )}

                        {/* Loading State */}
                        {isLoading && (
                            <div className="flex justify-center items-center py-20">
                                <Spinner label="Finding jobs..." size="lg" />
                            </div>
                        )}

                        {/* Error State */}
                        {!isLoading && error && (
                            <div className="text-center py-20">
                                <div className="text-danger mb-4">
                                    <Icon icon="mdi:alert-circle-outline" className="text-5xl inline-block" />
                                    <p className="text-xl font-semibold mt-2">{error}</p>
                                </div>
                                <Button color="primary" onPress={() => fetchJobs(page, { searchTerm, locationFilter, isRemoteFilter, jobTypeFilter, experienceFilter, minSalaryFilter, maxSalaryFilter })} className="mt-4">
                                    Retry
                                </Button>
                            </div>
                        )}

                        {/* Empty State */}
                        {!isLoading && !error && jobs.length === 0 && (
                            <div className="text-center text-gray-500 py-20">
                                <Icon icon="mdi:file-search-outline" className="text-5xl inline-block text-gray-400" />
                                <p className="text-xl font-semibold mt-4">No jobs found</p>
                                <p className="mt-2">Try adjusting your search filters or try again later.</p>
                                {activeFiltersCount > 0 && (
                                    <Button color="primary" variant="flat" onPress={handleClearFilters} className="mt-4">
                                        Clear All Filters
                                    </Button>
                                )}
                            </div>
                        )}

                        {/* Results Count */}
                        {!isLoading && !error && jobs.length > 0 && (
                            <>
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-sm text-gray-600">
                                        Showing <span className="font-medium">{jobs.length}</span> of <span className="font-medium">{totalJobs}</span> jobs
                                    </p>
                                    <div className="text-sm text-gray-600">
                                        Page <span className="font-medium">{page}</span> of <span className="font-medium">{totalPages}</span>
                                    </div>
                                </div>
                                
                                {/* Job Cards Grid */}
                                <div className={`grid grid-cols-1 ${!selectedJobId ? 'md:grid-cols-2 lg:grid-cols-3' : ''} gap-6 mb-8`}>
                                    {jobs.map(job => (
                                        <JobCard 
                                            key={job.id} 
                                            job={job} 
                                            isAuthenticated={isAuthenticated} 
                                            onSelect={handleSelectJob}
                                            isSelected={job.id === selectedJobId}
                                        />
                                    ))}
                                </div>
                            </>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex w-full justify-center mt-8">
                                <Pagination
                                    showControls
                                    showShadow
                                    color="primary"
                                    page={page}
                                    total={totalPages}
                                    onChange={(newPage) => setPage(newPage)}
                                    classNames={{
                                        wrapper: "gap-0 overflow-visible h-auto",
                                        item: "w-8 h-8"
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Job Details Column - Only displayed on desktop when a job is selected */}
                    {!isMobile && selectedJobId && (
                        <div className="w-1/2">
                            <JobDetail jobId={selectedJobId} onClose={handleCloseJobDetail} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}