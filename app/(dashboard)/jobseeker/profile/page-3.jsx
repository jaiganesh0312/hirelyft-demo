"use client";
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Avatar,
  Chip,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Spinner,
  Progress
} from '@heroui/react';
import { Icon } from '@iconify/react';
import {
  getMyJobSeekerProfile,
  getAllEducation,
  getAllExperiences,
  getAllSkills,
  getAllProjects,
  getAllCertifications,
  getAllResumes,
  deleteEducation,
  deleteExperience,
  deleteSkill,
  deleteProject,
  deleteCertification,
  getUnfilledSections
} from '@/services/jobSeekerService';

// Mock form components - replace with your actual components
const PersonalInfo = ({ onSave, initialData, showModal }) => (
  <div className="p-4">Personal Info Form Component</div>
);
const Experience = ({ onSave, initialData, showModal }) => (
  <div className="p-4">Experience Form Component</div>
);
const Education = ({ onSave, initialData, showModal }) => (
  <div className="p-4">Education Form Component</div>
);
const Skills = ({ onSave, initialData, showModal }) => (
  <div className="p-4">Skills Form Component</div>
);
const Projects = ({ onSave, initialData, showModal }) => (
  <div className="p-4">Projects Form Component</div>
);
const Certifications = ({ onSave, initialData, showModal }) => (
  <div className="p-4">Certifications Form Component</div>
);
const Resume = ({ onSave, initialData, showModal }) => (
  <div className="p-4">Resume Form Component</div>
);

export default function MyProfile() {
  const [profile, setProfile] = useState(null);
  const [education, setEducation] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [unfilledSections, setUnfilledSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileCompletion, setProfileCompletion] = useState(0);
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentSection, setCurrentSection] = useState('');
  const [modalType, setModalType] = useState('add'); // 'add' or 'edit'
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [
        profileRes,
        educationRes,
        experiencesRes,
        skillsRes,
        projectsRes,
        certificationsRes,
        resumesRes,
        unfilledRes
      ] = await Promise.all([
        getMyJobSeekerProfile(),
        getAllEducation(),
        getAllExperiences(),
        getAllSkills(),
        getAllProjects(),
        getAllCertifications(),
        getAllResumes(),
        getUnfilledSections()
      ]);

      if (profileRes.data.success) {
        setProfile(profileRes.data.jobSeeker);
      }
      
      if (educationRes.data.success) {
        setEducation(educationRes.data.educations || []);
      }
      
      if (experiencesRes.data.success) {
        setExperiences(experiencesRes.data.experiences || []);
      }
      
      if (skillsRes.data.success) {
        setSkills(skillsRes.data.skills || []);
      }
      
      if (projectsRes.data.success) {
        setProjects(projectsRes.data.projects || []);
      }
      
      if (certificationsRes.data.success) {
        setCertifications(certificationsRes.data.certifications || []);
      }
      
      if (resumesRes.data.success) {
        setResumes(resumesRes.data.resumes || []);
      }
      
      if (unfilledRes.data.success) {
        setUnfilledSections(unfilledRes.data.unfilledSections || []);
        // Calculate completion percentage
        const totalSections = 9; // adjust based on your total sections
        const filledSections = totalSections - unfilledRes.data.unfilledSections.length;
        setProfileCompletion((filledSections / totalSections) * 100);
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
      showAlert('Error fetching profile data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (message, type = 'success') => {
    // Implement your alert/toast system here
    console.log(`${type}: ${message}`);
  };

  const handleAdd = (section) => {
    setCurrentSection(section);
    setModalType('add');
    setCurrentItem(null);
    onOpen();
  };

  const handleEdit = (section, item) => {
    setCurrentSection(section);
    setModalType('edit');
    setCurrentItem(item);
    onOpen();
  };

  const handleDelete = async (section, itemId) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      let response;
      switch (section) {
        case 'education':
          response = await deleteEducation(itemId);
          if (response.data.success) {
            setEducation(prev => prev.filter(item => item.id !== itemId));
          }
          break;
        case 'experience':
          response = await deleteExperience(itemId);
          if (response.data.success) {
            setExperiences(prev => prev.filter(item => item.id !== itemId));
          }
          break;
        case 'skills':
          response = await deleteSkill(itemId);
          if (response.data.success) {
            setSkills(prev => prev.filter(item => item.id !== itemId));
          }
          break;
        case 'projects':
          response = await deleteProject(itemId);
          if (response.data.success) {
            setProjects(prev => prev.filter(item => item.id !== itemId));
          }
          break;
        case 'certifications':
          response = await deleteCertification(itemId);
          if (response.data.success) {
            setCertifications(prev => prev.filter(item => item.id !== itemId));
          }
          break;
      }
      showAlert('Item deleted successfully');
    } catch (error) {
      console.error('Error deleting item:', error);
      showAlert('Error deleting item', 'error');
    }
  };

  const handleSave = async (data) => {
    // This will be called from the form components
    onClose();
    await fetchAllData(); // Refresh data
    showAlert('Item saved successfully');
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header Section */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardBody className="p-8">
          <div className="flex items-center gap-6">
            <Avatar
              src={profile?.user_jobseeker?.avatarUrl}
              className="w-24 h-24 text-large"
              name={profile?.user_jobseeker?.name}
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">
                {profile?.user_jobseeker?.name || 'Your Name'}
              </h1>
              <p className="text-xl opacity-90 mb-4">
                {profile?.headline || 'Professional Headline'}
              </p>
              <div className="flex items-center gap-4 text-sm opacity-80">
                <span className="flex items-center gap-1">
                  <Icon icon="lucide:mail" className="w-4 h-4" />
                  {profile?.user_jobseeker?.email}
                </span>
                <span className="flex items-center gap-1">
                  <Icon icon="lucide:phone" className="w-4 h-4" />
                  {profile?.user_jobseeker?.phone_number}
                </span>
              </div>
            </div>
            <Button
              color="primary"
              variant="solid"
              onPress={() => handleEdit('personalInfo', profile)}
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <Icon icon="lucide:edit" className="w-4 h-4" />
              Edit Profile
            </Button>
          </div>
          
          {/* Profile Completion */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Profile Completion</span>
              <span className="text-sm">{Math.round(profileCompletion)}%</span>
            </div>
            <Progress 
              value={profileCompletion} 
              className="max-w-full"
              color="success"
              size="sm"
            />
          </div>
        </CardBody>
      </Card>

      {/* Profile Summary */}
      {profile?.summary && (
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">About</h2>
          </CardHeader>
          <CardBody>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {profile.summary}
            </p>
          </CardBody>
        </Card>
      )}

      {/* Experience Section */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon icon="lucide:briefcase" className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold">Experience</h2>
          </div>
          <Button
            color="primary"
            variant="flat"
            size="sm"
            onPress={() => handleAdd('experience')}
          >
            <Icon icon="lucide:plus" className="w-4 h-4" />
            Add Experience
          </Button>
        </CardHeader>
        <CardBody>
          {experiences.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No experience added yet</p>
          ) : (
            <div className="space-y-4">
              {experiences.map((exp, index) => (
                <div key={exp.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{exp.position}</h3>
                      <p className="text-blue-600 font-medium">{exp.companyName}</p>
                      <p className="text-gray-600 text-sm">
                        {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                      </p>
                      <p className="text-gray-600 text-sm mb-2">{exp.location}</p>
                      {exp.jobDescription && (
                        <p className="text-gray-700 dark:text-gray-300 mt-2">{exp.jobDescription}</p>
                      )}
                      {exp.skills && exp.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {exp.skills.split(",").map((skill, idx) => (
                            <Chip key={idx} size="sm" variant="flat" color="primary">
                              {skill}
                            </Chip>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        onPress={() => handleEdit('experience', exp)}
                      >
                        <Icon icon="lucide:edit" className="w-4 h-4" />
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        color="danger"
                        onPress={() => handleDelete('experience', exp.id)}
                      >
                        <Icon icon="lucide:trash" className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>

      {/* Education Section */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon icon="lucide:graduation-cap" className="w-5 h-5 text-green-600" />
            <h2 className="text-xl font-semibold">Education</h2>
          </div>
          <Button
            color="primary"
            variant="flat"
            size="sm"
            onPress={() => handleAdd('education')}
          >
            <Icon icon="lucide:plus" className="w-4 h-4" />
            Add Education
          </Button>
        </CardHeader>
        <CardBody>
          {education.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No education added yet</p>
          ) : (
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{edu.courseName}</h3>
                      <p className="text-green-600 font-medium">{edu.institutionName}</p>
                      <p className="text-gray-600 text-sm">
                        {edu.educationLevel} {edu.specialization && `in ${edu.specialization}`}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {formatDate(edu.startDate)} - {edu.isCurrentlyStudying ? 'Present' : formatDate(edu.endDate)}
                      </p>
                      {edu.grade && (
                        <p className="text-gray-600 text-sm">Grade: {edu.grade}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        onPress={() => handleEdit('education', edu)}
                      >
                        <Icon icon="lucide:edit" className="w-4 h-4" />
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        color="danger"
                        onPress={() => handleDelete('education', edu.id)}
                      >
                        <Icon icon="lucide:trash" className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>

      {/* Skills Section */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon icon="lucide:code" className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-semibold">Skills</h2>
          </div>
          <Button
            color="primary"
            variant="flat"
            size="sm"
            onPress={() => handleAdd('skills')}
          >
            <Icon icon="lucide:plus" className="w-4 h-4" />
            Add Skill
          </Button>
        </CardHeader>
        <CardBody>
          {skills.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No skills added yet</p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <div key={skill.id} className="group relative">
                  <Chip
                    size="lg"
                    variant="flat"
                    color="secondary"
                    className="pr-8"
                  >
                    {skill.name}
                    {skill.proficiencyLevel && (
                      <span className="text-xs opacity-70 ml-1">
                        ({skill.proficiencyLevel})
                      </span>
                    )}
                  </Chip>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="flat"
                      className="h-6 w-6 min-w-6"
                      onPress={() => handleEdit('skills', skill)}
                    >
                      <Icon icon="lucide:edit" className="w-3 h-3" />
                    </Button>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="flat"
                      color="danger"
                      className="h-6 w-6 min-w-6"
                      onPress={() => handleDelete('skills', skill.id)}
                    >
                      <Icon icon="lucide:trash" className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>

      {/* Projects Section */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon icon="lucide:folder" className="w-5 h-5 text-orange-600" />
            <h2 className="text-xl font-semibold">Projects</h2>
          </div>
          <Button
            color="primary"
            variant="flat"
            size="sm"
            onPress={() => handleAdd('projects')}
          >
            <Icon icon="lucide:plus" className="w-4 h-4" />
            Add Project
          </Button>
        </CardHeader>
        <CardBody>
          {projects.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No projects added yet</p>
          ) : (
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{project.projectTitle}</h3>
                      {project.linkedTo && (
                        <p className="text-orange-600 font-medium">{project.linkedTo}</p>
                      )}
                      <p className="text-gray-600 text-sm">
                        {formatDate(project.workedFrom)} - {project.isCurrentProject ? 'Present' : formatDate(project.workedTo)}
                      </p>
                      {project.projectDetails && (
                        <p className="text-gray-700 dark:text-gray-300 mt-2">{project.projectDetails}</p>
                      )}
                      <div className="flex gap-4 mt-2">
                        {project.gitRepoLink && (
                          <a
                            href={project.gitRepoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                          >
                            <Icon icon="lucide:github" className="w-4 h-4" />
                            GitHub
                          </a>
                        )}
                        {project.demoLink && (
                          <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                          >
                            <Icon icon="lucide:external-link" className="w-4 h-4" />
                            Demo
                          </a>
                        )}
                      </div>
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {project.tags.map((tag, idx) => (
                            <Chip key={idx} size="sm" variant="flat" color="warning">
                              {tag.name}
                            </Chip>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        onPress={() => handleEdit('projects', project)}
                      >
                        <Icon icon="lucide:edit" className="w-4 h-4" />
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        color="danger"
                        onPress={() => handleDelete('projects', project.id)}
                      >
                        <Icon icon="lucide:trash" className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>

      {/* Certifications Section */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon icon="lucide:award" className="w-5 h-5 text-yellow-600" />
            <h2 className="text-xl font-semibold">Certifications</h2>
          </div>
          <Button
            color="primary"
            variant="flat"
            size="sm"
            onPress={() => handleAdd('certifications')}
          >
            <Icon icon="lucide:plus" className="w-4 h-4" />
            Add Certification
          </Button>
        </CardHeader>
        <CardBody>
          {certifications.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No certifications added yet</p>
          ) : (
            <div className="space-y-4">
              {certifications.map((cert) => (
                <div key={cert.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{cert.name}</h3>
                      <p className="text-yellow-600 font-medium">{cert.issuingOrganization}</p>
                      <p className="text-gray-600 text-sm">
                        Issued: {formatDate(cert.issueDate)}
                        {cert.expiryDate && ` • Expires: ${formatDate(cert.expiryDate)}`}
                      </p>
                      {cert.credentialId && (
                        <p className="text-gray-600 text-sm">ID: {cert.credentialId}</p>
                      )}
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1 mt-1"
                        >
                          <Icon icon="lucide:external-link" className="w-4 h-4" />
                          View Credential
                        </a>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        onPress={() => handleEdit('certifications', cert)}
                      >
                        <Icon icon="lucide:edit" className="w-4 h-4" />
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        color="danger"
                        onPress={() => handleDelete('certifications', cert.id)}
                      >
                        <Icon icon="lucide:trash" className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>

      {/* Resume Section */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon icon="lucide:file-text" className="w-5 h-5 text-red-600" />
            <h2 className="text-xl font-semibold">Resume</h2>
          </div>
          <Button
            color="primary"
            variant="flat"
            size="sm"
            onPress={() => handleAdd('resume')}
          >
            <Icon icon="lucide:plus" className="w-4 h-4" />
            Upload Resume
          </Button>
        </CardHeader>
        <CardBody>
          {resumes.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No resumes uploaded yet</p>
          ) : (
            <div className="space-y-3">
              {resumes.map((resume) => (
                <div key={resume.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon icon="lucide:file-text" className="w-8 h-8 text-red-600" />
                    <div>
                      <h4 className="font-medium">{resume.title}</h4>
                      <p className="text-sm text-gray-600">
                        {resume.fileType} • {formatDate(resume.createdAt)}
                        {resume.isDefault && (
                          <Chip size="sm" color="success" className="ml-2">Default</Chip>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="flat"
                      as="a"
                      href={resume.fileUrl}
                      target="_blank"
                    >
                      <Icon icon="lucide:download" className="w-4 h-4" />
                      Download
                    </Button>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="flat"
                      onPress={() => handleEdit('resume', resume)}
                    >
                      <Icon icon="lucide:edit" className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};