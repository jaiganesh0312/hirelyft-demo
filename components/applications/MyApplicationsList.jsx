'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { getMyApplications } from '@/services/applicationService';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, Chip, Button } from '@heroui/react';
import Link from 'next/link';

const columns = [
    { key: "jobTitle", label: "Job Title" },
    { key: "company", label: "Company" },
    { key: "appliedDate", label: "Applied Date" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
];

const statusColorMap = {
    Pending: "warning",
    Viewed: "secondary",
    Interviewing: "primary",
    Hired: "success",
    Rejected: "danger",
    Withdrawn: "default",
};

export default function MyApplicationsList() {
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchApplications = useCallback(async (currentPage) => {
        setIsLoading(true);
        setError(null);
        try {
            // TODO: Add status filtering controls later if needed
            const params = { page: currentPage, limit: 10 }; 
            const response = await getMyApplications(params);
            setApplications(response.data.applications || []);
            setTotalPages(response.data.pagination?.totalPages || 1);
        } catch (err) {
            console.error("Error fetching applications:", err);
            setError('Failed to load your applications. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchApplications(page);
    }, [page, fetchApplications]);

    const renderCell = (application, columnKey) => {
        switch (columnKey) {
            case "jobTitle":
                return (
                    // Link to the original job posting
                    <Link href={`/jobs/${application.job?.id}`} className="text-primary hover:underline font-medium">
                        {application.job?.title || 'N/A'}
                    </Link>
                );
            case "company":
                // Assuming employer info is nested as shown in service docs
                 return application.job?.employer?.user?.name || 'N/A';
            case "appliedDate":
                return new Date(application.appliedAt).toLocaleDateString();
            case "status":
                return (
                    <Chip 
                        color={statusColorMap[application.status] || "default"}
                        variant="flat"
                        size="sm"
                    >
                       {application.status}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Button 
                            as={Link} 
                            href={`/jobs/${application.job?.id}`} 
                            size="sm" 
                            variant="light" 
                            color="primary"
                        >
                            View Job
                        </Button>
                         {/* Optional: Add Withdraw button later */}
                         {/* {application.status === 'Pending' && (
                            <Button size="sm" variant="light" color="danger">Withdraw</Button>
                         )} */} 
                    </div>
                );
            default:
                return application[columnKey];
        }
    };

    return (
        <div className='overflow-x-auto flex flex-col'>
            <h1 className="text-2xl font-semibold mb-4">My Job Applications</h1>

            {isLoading && (
                <div className="flex justify-center items-center py-10">
                    <Spinner label="Loading applications..." />
                </div>
            )}

            {!isLoading && error && (
                <div className="text-center text-danger py-10">{error}</div>
            )}

            {!isLoading && !error && applications.length === 0 && (
                <div className="text-center text-gray-500 py-10">
                    You haven't applied for any jobs yet.
                    <Link href="/jobs" className="text-primary hover:underline ml-1">Find jobs now!</Link>
                </div>
            )}

            {!isLoading && !error && applications.length > 0 && (
                <Table 
                    aria-label="My Job Applications Table"
                    classNames={{
                        base: "max-h-[520px] overflow-scroll",
                    }}
                    bottomContent={
                        totalPages > 1 ? (
                            <div className="flex w-full justify-center">
                                <Pagination
                                    isCompact
                                    showControls
                                    showShadow
                                    color="primary"
                                    page={page}
                                    total={totalPages}
                                    onChange={(newPage) => setPage(newPage)}
                                />
                            </div>
                        ) : null
                    }
                >
                    <TableHeader columns={columns}>
                        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={applications} emptyContent={isLoading ? " " : "No applications found."}>
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            )}
        </div>
    );
} 