import axiosInstance from '@/utils/axiosInstance';

const API_URL = '/jobseekers/resumes'; // Base path for resume endpoints

/**
 * Uploads a new resume for the jobseeker.
 * @route POST /api/jobseekers/resumes
 * @param {FormData} formData - FormData object containing resume file and metadata
 * @param {File} formData.file - The resume file to upload (PDF, DOCX, etc.)
 * @param {string} formData.title - Title/name for the resume
 * @returns {Promise} Axios response promise with uploaded resume details
 * @description Uploads a new resume for the logged-in jobseeker.
 * A jobseeker can have up to 3 resumes. The first uploaded resume becomes the default.
 * FormData must be used for file uploads.
 * @response {boolean} success - Indicates if the operation was successful
 * @response {string} message - Success message
 * @response {object} resume - The uploaded resume details
 */
export const uploadResume = (formData) => {
    return axiosInstance.post(API_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

/**
 * Fetches all resumes for the logged-in jobseeker.
 * @route GET /api/jobseekers/resumes
 * @returns {Promise} Axios response promise with array of resume objects
 * @description Returns all resumes belonging to the logged-in jobseeker,
 * ordered by upload date (newest first). Each resume includes fileUrl,
 * title, isDefault flag, and uploadDate.
 * @response {boolean} success - Indicates if the operation was successful
 * @response {number} count - Number of resumes
 * @response {Array} resumes - List of resume objects
 */
export const getMyResumes = () => {
    return axiosInstance.get(API_URL);
};

/**
 * Fetches a specific resume by ID.
 * @route GET /api/jobseekers/resumes/:id
 * @param {string|number} resumeId - ID of the resume to fetch
 * @returns {Promise} Axios response promise with resume details
 * @description Returns details for a specific resume. The user must
 * be the owner of the resume to access it.
 * @response {boolean} success - Indicates if the operation was successful
 * @response {object} resume - Resume details
 */
export const getResumeById = (resumeId) => {
    return axiosInstance.get(`${API_URL}/${resumeId}`);
};

/**
 * Updates a resume's metadata.
 * @route PUT /api/jobseekers/resumes/:id
 * @param {string|number} resumeId - ID of the resume to update
 * @param {object} updateData - Resume data to update
 * @param {string} updateData.title - New title for the resume
 * @returns {Promise} Axios response promise with updated resume details
 * @description Updates resume metadata (currently only the title).
 * The file itself cannot be updated - a new resume must be uploaded instead.
 * @response {boolean} success - Indicates if the operation was successful
 * @response {string} message - Success message
 * @response {object} resume - Updated resume details
 */
export const updateResume = (resumeId, updateData) => {
    return axiosInstance.put(`${API_URL}/${resumeId}`, updateData);
};

/**
 * Deletes a resume.
 * @route DELETE /api/jobseekers/resumes/:id
 * @param {string|number} resumeId - ID of the resume to delete
 * @returns {Promise} Axios response promise with success message
 * @description Permanently deletes a resume file and its record.
 * If the deleted resume was the default, another resume will automatically
 * be set as default (if any exist).
 * @response {boolean} success - Indicates if the operation was successful
 * @response {string} message - Success message
 */
export const deleteResume = (resumeId) => {
    return axiosInstance.delete(`${API_URL}/${resumeId}`);
};

/**
 * Sets a resume as the default resume.
 * @route PUT /api/jobseekers/resumes/:id/default
 * @param {string|number} resumeId - ID of the resume to set as default
 * @returns {Promise} Axios response promise with updated resume details
 * @description Sets a specific resume as the default resume for the jobseeker.
 * The previous default resume will be unset automatically.
 * The default resume is used for quick applications.
 * @response {boolean} success - Indicates if the operation was successful
 * @response {string} message - Success message
 * @response {object} resume - Updated resume with isDefault=true
 */
export const setDefaultResume = (resumeId) => {
    return axiosInstance.put(`${API_URL}/${resumeId}/default`);
};

/**
 * Generates an HTML resume based on jobseeker profile information.
 * @route GET /api/jobseekers/resumes/generate
 * @returns {Promise} Axios response promise with generated resume details
 * @description Automatically generates an HTML resume based on the jobseeker's profile data.
 * Includes education, experience, skills, projects, and achievements from the profile.
 * The generated resume is stored and linked to the jobseeker's account.
 * @response {boolean} success - Indicates if the operation was successful
 * @response {string} message - Success message
 * @response {object} resume - The generated resume information
 * @response {string} resume.id - Resume ID
 * @response {string} resume.title - Resume title
 * @response {string} resume.fileUrl - URL to access the resume
 * @response {string} resume.fileType - File type (html)
 * @response {boolean} resume.isGenerated - Always true for generated resumes
 * @response {Date} resume.createdAt - Creation timestamp
 */
export const generateResume = () => {
    return axiosInstance.get(`${API_URL}/generate`);
};

/**
 * Generates a PDF resume based on jobseeker profile information.
 * @route GET /api/jobseekers/resumes/generate-pdf
 * @returns {Promise} Axios response promise with generated PDF resume details
 * @description Automatically generates a PDF resume based on the jobseeker's profile data.
 * Uses the same template as HTML generation but converts to PDF format.
 * The generated PDF resume is stored and linked to the jobseeker's account.
 * @response {boolean} success - Indicates if the operation was successful
 * @response {string} message - Success message
 * @response {object} resume - The generated resume information
 * @response {string} resume.id - Resume ID
 * @response {string} resume.title - Resume title
 * @response {string} resume.fileUrl - URL to access the resume
 * @response {string} resume.fileType - File type (pdf)
 * @response {boolean} resume.isGenerated - Always true for generated resumes
 * @response {Date} resume.createdAt - Creation timestamp
 */
export const generatePdfResume = () => {
    return axiosInstance.get(`${API_URL}/generate-pdf`);
};

/**
 * Downloads a resume file.
 * @route GET /api/jobseekers/resumes/:id/download
 * @param {string|number} resumeId - ID of the resume to download
 * @returns {Promise} Axios response promise that returns the file blob
 * @description Downloads the resume file, whether user-uploaded or system-generated.
 * The user must be the owner of the resume to download it.
 * Returns a binary stream that can be saved as a file.
 */
export const downloadResume = (resumeId) => {
    return axiosInstance.get(`${API_URL}/${resumeId}/download`, {
        responseType: 'blob' // Important for file downloads
    });
};