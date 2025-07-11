// // "use client";
// // import React, { useState, useEffect } from "react";
// // import { Icon } from "@iconify/react";
// // import {
// //   Button,
// //   Card,
// //   CardHeader,
// //   CardBody,
// //   Divider,
// //   Modal,
// //   ModalContent,
// //   ModalHeader,
// //   ModalBody,
// //   ModalFooter,
// //   useDisclosure,
// //   Spinner,
// //   Chip,
// //   Tooltip,
// //   Avatar,
// // } from "@heroui/react";

// // // Import form components
// // import PersonalInfo from "@/components/profile-completion/PersonalInfo";
// // import Experience from "@/components/profile-completion/Experience";
// // import Education from "@/components/profile-completion/Education";
// // import Skills from "@/components/profile-completion/Skills";
// // import Projects from "@/components/profile-completion/Projects";
// // import Certifications from "@/components/profile-completion/Certifications";
// // import Resume from "@/components/profile-completion/Resume";

// // // Import services
// // import {
// //   getMyJobSeekerProfile,
// //   getAllEducation,
// //   getAllExperiences,
// //   getAllSkills,
// //   getAllProjects,
// //   getAllCertifications,
// //   getAllResumes,
// //   deleteEducation,
// //   deleteExperience,
// //   deleteSkill,
// //   deleteProject,
// //   deleteCertification,
// // } from "@/services/jobSeekerService";

// // const ProfilePage = () => {
// //   // State for profile data
// //   const [personalInfo, setPersonalInfo] = useState(null);
// //   const [experiences, setExperiences] = useState([]);
// //   const [education, setEducation] = useState([]);
// //   const [skills, setSkills] = useState([]);
// //   const [projects, setProjects] = useState([]);
// //   const [certifications, setCertifications] = useState([]);
// //   const [resumes, setResumes] = useState([]);

// //   // Loading states
// //   const [loading, setLoading] = useState(true);
// //   const [loadingSection, setLoadingSection] = useState("");

// //   // Modal states
// //   const { isOpen, onOpen, onClose } = useDisclosure();
// //   const [modalType, setModalType] = useState(""); // "add" or "edit"
// //   const [currentSection, setCurrentSection] = useState("");
// //   const [currentItem, setCurrentItem] = useState(null);

// //   // Alert modal
// //   const [alertModal, setAlertModal] = useState({
// //     isOpen: false,
// //     title: "",
// //     message: "",
// //     type: "success",
// //   });

// //   // Add new state for animations
// //   const [isVisible, setIsVisible] = useState(false);

// //   // Fetch all profile data on component mount
// //   useEffect(() => {
// //     fetchProfileData();
// //     setIsVisible(true);
// //   }, []);

// //   // Function to fetch all profile data
// //   const fetchProfileData = async () => {
// //     setLoading(true);
// //     try {
// //       // Fetch personal info
// //       const profileResponse = await getMyJobSeekerProfile();
// //       if (profileResponse.data.success) {
// //         setPersonalInfo(profileResponse.data.jobSeeker);
// //       }

// //       // Fetch experiences
// //       const experiencesResponse = await getAllExperiences();
// //       if (experiencesResponse.data.success) {
// //         setExperiences(experiencesResponse.data.experiences || []);
// //       }

// //       // Fetch education
// //       const educationResponse = await getAllEducation();
// //       if (educationResponse.data.success) {
// //         setEducation(educationResponse.data.educations || []);
// //       }

// //       // Fetch skills
// //       const skillsResponse = await getAllSkills();
// //       if (skillsResponse.data.success) {
// //         setSkills(skillsResponse.data.skills || []);
// //       }

// //       // Fetch projects
// //       const projectsResponse = await getAllProjects();
// //       if (projectsResponse.data.success) {
// //         setProjects(projectsResponse.data.projects || []);
// //       }

// //       // Fetch certifications
// //       const certificationsResponse = await getAllCertifications();
// //       if (certificationsResponse.data.success) {
// //         setCertifications(certificationsResponse.data.certifications || []);
// //       }

// //       // Fetch resumes
// //       const resumesResponse = await getAllResumes();
// //       if (resumesResponse.data.success) {
// //         setResumes(resumesResponse.data.resumes || []);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching profile data:", error);
// //       showAlert(
// //         "Error",
// //         "Failed to load profile data. Please try again later.",
// //         "error"
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Function to handle opening modal for add/edit
// //   const handleOpenModal = (section, type, item = null) => {
// //     setCurrentSection(section);
// //     setModalType(type);
// //     setCurrentItem(item);
// //     onOpen();
// //   };

// //   // Function to handle save after form submission
// //   const handleSave = async (data) => {
// //     onClose();
// //     setLoadingSection(currentSection);

// //     try {
// //       // Refetch the specific section data
// //       switch (currentSection) {
// //         case "personalInfo":
// //           const profileResponse = await getMyJobSeekerProfile();
// //           if (profileResponse.data.success) {
// //             setPersonalInfo(profileResponse.data.jobSeeker);
// //           }
// //           break;
// //         case "experience":
// //           const experiencesResponse = await getAllExperiences();
// //           if (experiencesResponse.data.success) {
// //             setExperiences(experiencesResponse.data.experiences || []);
// //           }
// //           break;
// //         case "education":
// //           const educationResponse = await getAllEducation();
// //           if (educationResponse.data.success) {
// //             setEducation(educationResponse.data.educations || []);
// //           }
// //           break;
// //         case "skills":
// //           const skillsResponse = await getAllSkills();
// //           if (skillsResponse.data.success) {
// //             setSkills(skillsResponse.data.skills || []);
// //           }
// //           break;
// //         case "projects":
// //           const projectsResponse = await getAllProjects();
// //           if (projectsResponse.data.success) {
// //             setProjects(projectsResponse.data.projects || []);
// //           }
// //           break;
// //         case "certifications":
// //           const certificationsResponse = await getAllCertifications();
// //           if (certificationsResponse.data.success) {
// //             setCertifications(certificationsResponse.data.certifications || []);
// //           }
// //           break;
// //         case "resume":
// //           const resumesResponse = await getAllResumes();
// //           if (resumesResponse.data.success) {
// //             setResumes(resumesResponse.data.resumes || []);
// //           }
// //           break;
// //         default:
// //           break;
// //       }

// //       showAlert("Success", "Profile updated successfully", "success");
// //     } catch (error) {
// //       console.error("Error updating profile:", error);
// //       showAlert(
// //         "Error",
// //         "Failed to update profile. Please try again later.",
// //         "error"
// //       );
// //     } finally {
// //       setLoadingSection("");
// //     }
// //   };

// //   // Function to handle delete
// //   const handleDelete = async (section, id) => {
// //     setLoadingSection(section);
// //     try {
// //       let response;
// //       switch (section) {
// //         case "education":
// //           response = await deleteEducation(id);
// //           if (response.data.success) {
// //             setEducation(education.filter(item => item.id !== id));
// //           }
// //           break;
// //         case "experience":
// //           response = await deleteExperience(id);
// //           if (response.data.success) {
// //             setExperiences(experiences.filter(item => item.id !== id));
// //           }
// //           break;
// //         case "skills":
// //           response = await deleteSkill(id);
// //           if (response.data.success) {
// //             setSkills(skills.filter(item => item.id !== id));
// //           }
// //           break;
// //         case "projects":
// //           response = await deleteProject(id);
// //           if (response.data.success) {
// //             setProjects(projects.filter(item => item.id !== id));
// //           }
// //           break;
// //         case "certifications":
// //           response = await deleteCertification(id);
// //           if (response.data.success) {
// //             setCertifications(certifications.filter(item => item.id !== id));
// //           }
// //           break;
// //         default:
// //           break;
// //       }
// //       showAlert("Success", "Item deleted successfully", "success");
// //     } catch (error) {
// //       console.error("Error deleting item:", error);
// //       showAlert(
// //         "Error",
// //         "Failed to delete item. Please try again later.",
// //         "error"
// //       );
// //     } finally {
// //       setLoadingSection("");
// //     }
// //   };

// //   // Function to show alert modal
// //   const showAlert = (title, message, type = "success") => {
// //     setAlertModal({
// //       isOpen: true,
// //       title,
// //       message,
// //       type,
// //     });
// //   };

// //   // Function to close alert modal
// //   const closeAlert = () => {
// //     setAlertModal({
// //       ...alertModal,
// //       isOpen: false,
// //     });
// //   };

// //   // Render section header with add button
// //   const renderSectionHeader = (title, icon, section) => (
// //     <div className="flex justify-between items-center mb-4">
// //       <div className="flex items-center gap-2">
// //         <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
// //           <Icon icon={icon} className="w-5 h-5 text-white" />
// //         </div>
// //         <h2 className="text-xl font-bold">{title}</h2>
// //       </div>
// //       <Button
// //         color="primary"
// //         variant="flat"
// //         startContent={<Icon icon="lucide:plus" className="w-4 h-4" />}
// //         onPress={() => handleOpenModal(section, "add")}
// //       >
// //         Add
// //       </Button>
// //     </div>
// //   );

// //   // Render loading spinner
// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-screen">
// //         <Spinner size="lg" label="Loading profile data..." />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-950 dark:to-purple-950 py-8 transition-all duration-500">
// //       <div className="max-w-6xl mx-auto p-6">
// //         {/* Profile Header */}
// //         <Card className="shadow-2xl border-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md mb-8 transform transition-all duration-500 hover:scale-[1.01]">
// //           <CardHeader className="pb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-t-large">
// //             <div className="flex flex-col md:flex-row items-center gap-6 w-full">
// //               <div className="relative group">
// //                 <Avatar
// //                   src={personalInfo?.user_jobseeker?.avatarUrl || ""}
// //                   name={personalInfo?.user_jobseeker?.name || "User"}
// //                   size="xl"
// //                   className="w-32 h-32 text-2xl border-4 border-white/80 shadow-lg transition-transform duration-300 group-hover:scale-105"
// //                 />
// //                 <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
// //                   <Icon icon="lucide:camera" className="w-8 h-8 text-white" />
// //                 </div>
// //               </div>
// //               <div className="flex-1 text-center md:text-left">
// //                 <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
// //                   {personalInfo?.user_jobseeker?.name || "Complete Your Profile"}
// //                 </h1>
// //                 <p className="text-blue-100 mt-2 text-lg">
// //                   {personalInfo?.headline || "Add your professional headline"}
// //                 </p>
// //                 <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
// //                   {personalInfo?.availability_status && (
// //                     <Chip
// //                       color={personalInfo.availability_status === "Available" ? "success" : "warning"}
// //                       variant="flat"
// //                       startContent={<Icon icon="lucide:clock" className="w-4 h-4" />}
// //                       className="text-sm font-medium"
// //                     >
// //                       {personalInfo.availability_status}
// //                     </Chip>
// //                   )}
// //                   {personalInfo?.experience_years && (
// //                     <Chip
// //                       color="primary"
// //                       variant="flat"
// //                       startContent={<Icon icon="lucide:briefcase" className="w-4 h-4" />}
// //                       className="text-sm font-medium"
// //                     >
// //                       {personalInfo.experience_years} Years Experience
// //                     </Chip>
// //                   )}
// //                 </div>
// //               </div>
// //               <Button
// //                 color="default"
// //                 variant="flat"
// //                 startContent={<Icon icon="lucide:edit" className="w-4 h-4" />}
// //                 onPress={() => handleOpenModal("personalInfo", "edit", personalInfo)}
// //                 className="bg-white/20 text-white hover:bg-white/30 transition-colors duration-300"
// //               >
// //                 Edit Profile
// //               </Button>
// //             </div>
// //           </CardHeader>
// //         </Card>

// //         {/* Profile Sections */}
// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //           {/* Left Column */}
// //           <div className="lg:col-span-2 space-y-6">
// //             {/* Personal Information */}
// //             <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md transform transition-all duration-500 hover:scale-[1.01]">
// //               <CardBody className="p-6">
// //                 <div className="flex justify-between items-center mb-4">
// //                   <div className="flex items-center gap-2">
// //                     <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
// //                       <Icon icon="lucide:user" className="w-5 h-5 text-white" />
// //                     </div>
// //                     <h2 className="text-xl font-bold">Personal Information</h2>
// //                   </div>
// //                   <Button
// //                     color="primary"
// //                     variant="flat"
// //                     startContent={<Icon icon="lucide:edit" className="w-4 h-4" />}
// //                     onPress={() => handleOpenModal("personalInfo", "edit", personalInfo)}
// //                     className="transition-transform duration-300 hover:scale-105"
// //                   >
// //                     Edit
// //                   </Button>
// //                 </div>

// //                 <Divider className="my-4" />

// //                 {loadingSection === "personalInfo" ? (
// //                   <div className="flex justify-center py-8">
// //                     <Spinner size="lg" color="primary" />
// //                   </div>
// //                 ) : (
// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                     {personalInfo ? (
// //                       <>
// //                         <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300">
// //                           <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Summary</p>
// //                           <p className="mt-1 text-gray-700 dark:text-gray-200">{personalInfo.summary || "Not provided"}</p>
// //                         </div>
// //                         <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300">
// //                           <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Gender</p>
// //                           <p className="mt-1 text-gray-700 dark:text-gray-200 capitalize">{personalInfo.gender || "Not provided"}</p>
// //                         </div>
// //                         <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300">
// //                           <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date of Birth</p>
// //                           <p className="mt-1 text-gray-700 dark:text-gray-200">
// //                             {personalInfo.date_of_birth
// //                               ? new Date(personalInfo.date_of_birth).toLocaleDateString()
// //                               : "Not provided"}
// //                           </p>
// //                         </div>
// //                         <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300">
// //                           <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Languages</p>
// //                           <p className="mt-1 text-gray-700 dark:text-gray-200">{personalInfo.languages || "Not provided"}</p>
// //                         </div>
// //                         <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300">
// //                           <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Salary</p>
// //                           <p className="mt-1 text-gray-700 dark:text-gray-200">
// //                             {personalInfo.current_salary
// //                               ? `$${personalInfo.current_salary.toLocaleString()}`
// //                               : "Not provided"}
// //                           </p>
// //                         </div>
// //                         <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300">
// //                           <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Expected Salary</p>
// //                           <p className="mt-1 text-gray-700 dark:text-gray-200">
// //                             {personalInfo.expected_salary
// //                               ? `$${personalInfo.expected_salary.toLocaleString()}`
// //                               : "Not provided"}
// //                           </p>
// //                         </div>
// //                         <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300">
// //                           <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Notice Period</p>
// //                           <p className="mt-1 text-gray-700 dark:text-gray-200">
// //                             {personalInfo.notice_period
// //                               ? `${personalInfo.notice_period} days`
// //                               : "Not provided"}
// //                           </p>
// //                         </div>
// //                       </>
// //                     ) : (
// //                       <p className="col-span-2 text-center py-4 text-gray-500">
// //                         No personal information available. Click Edit to add your details.
// //                       </p>
// //                     )}
// //                   </div>
// //                 )}
// //               </CardBody>
// //             </Card>

// //             {/* Experience Section */}
// //             <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md transform transition-all duration-500 hover:scale-[1.01]">
// //               <CardBody className="p-6">
// //                 {renderSectionHeader("Experience", "lucide:briefcase", "experience")}
// //                 <Divider className="my-4" />

// //                 {loadingSection === "experience" ? (
// //                   <div className="flex justify-center py-8">
// //                     <Spinner size="lg" color="primary" />
// //                   </div>
// //                 ) : experiences.length > 0 ? (
// //                   <div className="space-y-6">
// //                     {experiences.map((exp) => (
// //                       <div
// //                         key={exp.id}
// //                         className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-all duration-300"
// //                       >
// //                         <div className="flex justify-between items-start">
// //                           <div>
// //                             <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">{exp.position}</h3>
// //                             <p className="text-gray-600 dark:text-gray-300">{exp.companyName}</p>
// //                             <p className="text-sm text-gray-500 dark:text-gray-400">
// //                               {new Date(exp.startDate).toLocaleDateString()} -
// //                               {exp.isCurrentJob
// //                                 ? "Present"
// //                                 : exp.endDate ? new Date(exp.endDate).toLocaleDateString() : ""}
// //                             </p>
// //                             <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{exp.location}</p>
// //                           </div>
// //                           <div className="flex gap-2">
// //                             <Tooltip content="Edit">
// //                               <Button
// //                                 isIconOnly
// //                                 size="sm"
// //                                 variant="flat"
// //                                 onPress={() => handleOpenModal("experience", "edit", exp)}
// //                                 className="transition-transform duration-300 hover:scale-110"
// //                               >
// //                                 <Icon icon="lucide:edit" className="w-4 h-4" />
// //                               </Button>
// //                             </Tooltip>
// //                             <Tooltip content="Delete">
// //                               <Button
// //                                 isIconOnly
// //                                 size="sm"
// //                                 variant="flat"
// //                                 color="danger"
// //                                 onPress={() => handleDelete("experience", exp.id)}
// //                                 className="transition-transform duration-300 hover:scale-110"
// //                               >
// //                                 <Icon icon="lucide:trash" className="w-4 h-4" />
// //                               </Button>
// //                             </Tooltip>
// //                           </div>
// //                         </div>
// //                         {exp.jobDescription && (
// //                           <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{exp.jobDescription}</p>
// //                         )}
// //                         {exp.skills && exp.skills.length > 0 && (
// //                           <div className="mt-3 flex flex-wrap gap-1">
// //                             {exp.skills.split(",").map((skill, idx) => (
// //                               <Chip
// //                                 key={idx}
// //                                 size="sm"
// //                                 variant="flat"
// //                                 color="primary"
// //                                 className="transition-transform duration-300 hover:scale-105"
// //                               >
// //                                 {skill}
// //                               </Chip>
// //                             ))}
// //                           </div>
// //                         )}
// //                       </div>
// //                     ))}
// //                   </div>
// //                 ) : (
// //                   <div className="text-center py-8">
// //                     <Icon icon="lucide:briefcase" className="w-12 h-12 mx-auto text-gray-400 mb-4" />
// //                     <p className="text-gray-500">
// //                       No experience entries yet. Click Add to create your first experience.
// //                     </p>
// //                   </div>
// //                 )}
// //               </CardBody>
// //             </Card>

// //             {/* Education Section */}
// //             <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md transform transition-all duration-500 hover:scale-[1.01]">
// //               <CardBody className="p-6">
// //                 {renderSectionHeader("Education", "lucide:graduation-cap", "education")}
// //                 <Divider className="my-4" />

// //                 {loadingSection === "education" ? (
// //                   <div className="flex justify-center py-8">
// //                     <Spinner size="lg" color="primary" />
// //                   </div>
// //                 ) : education.length > 0 ? (
// //                   <div className="space-y-6">
// //                     {education.map((edu) => (
// //                       <div
// //                         key={edu.id}
// //                         className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-all duration-300"
// //                       >
// //                         <div className="flex justify-between items-start">
// //                           <div>
// //                             <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">{edu.courseName}</h3>
// //                             <p className="text-gray-600 dark:text-gray-300">{edu.institutionName}</p>
// //                             <p className="text-sm text-gray-500 dark:text-gray-400">
// //                               {edu.educationLevel} {edu.specialization ? `- ${edu.specialization}` : ""}
// //                             </p>
// //                             <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
// //                               {new Date(edu.startDate).toLocaleDateString()} -
// //                               {edu.isCurrentlyStudying
// //                                 ? "Present"
// //                                 : edu.endDate ? new Date(edu.endDate).toLocaleDateString() : ""}
// //                             </p>
// //                           </div>
// //                           <div className="flex gap-2">
// //                             <Tooltip content="Edit">
// //                               <Button
// //                                 isIconOnly
// //                                 size="sm"
// //                                 variant="flat"
// //                                 onPress={() => handleOpenModal("education", "edit", edu)}
// //                                 className="transition-transform duration-300 hover:scale-110"
// //                               >
// //                                 <Icon icon="lucide:edit" className="w-4 h-4" />
// //                               </Button>
// //                             </Tooltip>
// //                             <Tooltip content="Delete">
// //                               <Button
// //                                 isIconOnly
// //                                 size="sm"
// //                                 variant="flat"
// //                                 color="danger"
// //                                 onPress={() => handleDelete("education", edu.id)}
// //                                 className="transition-transform duration-300 hover:scale-110"
// //                               >
// //                                 <Icon icon="lucide:trash" className="w-4 h-4" />
// //                               </Button>
// //                             </Tooltip>
// //                           </div>
// //                         </div>
// //                         {edu.description && (
// //                           <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{edu.description}</p>
// //                         )}
// //                         {edu.grade && (
// //                           <p className="mt-1 text-sm">
// //                             <span className="font-medium">Grade:</span> {edu.grade} ({edu.gradingSystem})
// //                           </p>
// //                         )}
// //                       </div>
// //                     ))}
// //                   </div>
// //                 ) : (
// //                   <div className="text-center py-8">
// //                     <Icon icon="lucide:graduation-cap" className="w-12 h-12 mx-auto text-gray-400 mb-4" />
// //                     <p className="text-gray-500">
// //                       No education entries yet. Click Add to create your first education entry.
// //                     </p>
// //                   </div>
// //                 )}
// //               </CardBody>
// //             </Card>
// //           </div>

// //           {/* Right Column */}
// //           <div className="space-y-6">
// //             {/* Skills Section */}
// //             <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md transform transition-all duration-500 hover:scale-[1.01]">
// //               <CardBody className="p-6">
// //                 {renderSectionHeader("Skills", "lucide:code", "skills")}
// //                 <Divider className="my-4" />

// //                 {loadingSection === "skills" ? (
// //                   <div className="flex justify-center py-8">
// //                     <Spinner size="lg" color="primary" />
// //                   </div>
// //                 ) : skills.length > 0 ? (
// //                   <div className="grid grid-cols-1 gap-4">
// //                     {skills.map((skill) => (
// //                       <div
// //                         key={skill.id}
// //                         className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-all duration-300"
// //                       >
// //                         <div className="flex justify-between items-start">
// //                           <div>
// //                             <h3 className="font-semibold text-gray-800 dark:text-gray-100">{skill.name}</h3>
// //                             <p className="text-sm text-gray-500 dark:text-gray-400">
// //                               {skill.category || "General"}
// //                             </p>
// //                             <div className="mt-2">
// //                               <Chip
// //                                 size="sm"
// //                                 color="primary"
// //                                 variant="flat"
// //                                 className="transition-transform duration-300 hover:scale-105"
// //                               >
// //                                 {skill.proficiencyLevel || "Intermediate"}
// //                               </Chip>
// //                               {skill.yearsOfExperience && (
// //                                 <span className="text-xs ml-2 text-gray-500">
// //                                   {skill.yearsOfExperience} years
// //                                 </span>
// //                               )}
// //                             </div>
// //                           </div>
// //                           <div className="flex gap-2">
// //                             <Tooltip content="Edit">
// //                               <Button
// //                                 isIconOnly
// //                                 size="sm"
// //                                 variant="flat"
// //                                 onPress={() => handleOpenModal("skills", "edit", skill)}
// //                                 className="transition-transform duration-300 hover:scale-110"
// //                               >
// //                                 <Icon icon="lucide:edit" className="w-4 h-4" />
// //                               </Button>
// //                             </Tooltip>
// //                             <Tooltip content="Delete">
// //                               <Button
// //                                 isIconOnly
// //                                 size="sm"
// //                                 variant="flat"
// //                                 color="danger"
// //                                 onPress={() => handleDelete("skills", skill.id)}
// //                                 className="transition-transform duration-300 hover:scale-110"
// //                               >
// //                                 <Icon icon="lucide:trash" className="w-4 h-4" />
// //                               </Button>
// //                             </Tooltip>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 ) : (
// //                   <div className="text-center py-8">
// //                     <Icon icon="lucide:code" className="w-12 h-12 mx-auto text-gray-400 mb-4" />
// //                     <p className="text-gray-500">
// //                       No skills added yet. Click Add to showcase your skills.
// //                     </p>
// //                   </div>
// //                 )}
// //               </CardBody>
// //             </Card>

// //             {/* Projects Section */}
// //             <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md transform transition-all duration-500 hover:scale-[1.01]">
// //               <CardBody className="p-6">
// //                 {renderSectionHeader("Projects", "lucide:folder", "projects")}
// //                 <Divider className="my-4" />

// //                 {loadingSection === "projects" ? (
// //                   <div className="flex justify-center py-8">
// //                     <Spinner size="lg" color="primary" />
// //                   </div>
// //                 ) : projects.length > 0 ? (
// //                   <div className="space-y-6">
// //                     {projects.map((project) => (
// //                       <div
// //                         key={project.id}
// //                         className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-all duration-300"
// //                       >
// //                         <div className="flex justify-between items-start">
// //                           <div>
// //                             <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">{project.projectTitle}</h3>
// //                             {project.linkedTo && (
// //                               <p className="text-gray-600 dark:text-gray-300">{project.linkedTo}</p>
// //                             )}
// //                             <p className="text-sm text-gray-500 dark:text-gray-400">
// //                               {new Date(project.workedFrom).toLocaleDateString()} -
// //                               {project.isCurrentProject
// //                                 ? "Present"
// //                                 : project.workedTo ? new Date(project.workedTo).toLocaleDateString() : ""}
// //                             </p>
// //                           </div>
// //                           <div className="flex gap-2">
// //                             <Tooltip content="Edit">
// //                               <Button
// //                                 isIconOnly
// //                                 size="sm"
// //                                 variant="flat"
// //                                 onPress={() => handleOpenModal("projects", "edit", project)}
// //                                 className="transition-transform duration-300 hover:scale-110"
// //                               >
// //                                 <Icon icon="lucide:edit" className="w-4 h-4" />
// //                               </Button>
// //                             </Tooltip>
// //                             <Tooltip content="Delete">
// //                               <Button
// //                                 isIconOnly
// //                                 size="sm"
// //                                 variant="flat"
// //                                 color="danger"
// //                                 onPress={() => handleDelete("projects", project.id)}
// //                                 className="transition-transform duration-300 hover:scale-110"
// //                               >
// //                                 <Icon icon="lucide:trash" className="w-4 h-4" />
// //                               </Button>
// //                             </Tooltip>
// //                           </div>
// //                         </div>
// //                         {project.projectDetails && (
// //                           <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{project.projectDetails}</p>
// //                         )}
// //                         <div className="mt-3 flex flex-wrap gap-2">
// //                           {project.gitRepoLink && (
// //                             <Button
// //                               size="sm"
// //                               variant="flat"
// //                               color="default"
// //                               as="a"
// //                               href={project.gitRepoLink}
// //                               target="_blank"
// //                               startContent={<Icon icon="lucide:github" className="w-4 h-4" />}
// //                             >
// //                               Repository
// //                             </Button>
// //                           )}
// //                           {project.demoLink && (
// //                             <Button
// //                               size="sm"
// //                               variant="flat"
// //                               color="primary"
// //                               as="a"
// //                               href={project.demoLink}
// //                               target="_blank"
// //                               startContent={<Icon icon="lucide:external-link" className="w-4 h-4" />}
// //                             >
// //                               Live Demo
// //                             </Button>
// //                           )}
// //                         </div>
// //                         {project.tags && project.tags.length > 0 && (
// //                           <div className="mt-3 flex flex-wrap gap-1">
// //                             {project.tags.map((tag, idx) => (
// //                               <Chip
// //                                 key={idx}
// //                                 size="sm"
// //                                 variant="flat"
// //                                 color="secondary"
// //                                 className="transition-transform duration-300 hover:scale-105"
// //                               >
// //                                 {tag}
// //                               </Chip>
// //                             ))}
// //                           </div>
// //                         )}
// //                       </div>
// //                     ))}
// //                   </div>
// //                 ) : (
// //                   <div className="text-center py-8">
// //                     <Icon icon="lucide:folder" className="w-12 h-12 mx-auto text-gray-400 mb-4" />
// //                     <p className="text-gray-500">
// //                       No projects added yet. Click Add to showcase your projects.
// //                     </p>
// //                   </div>
// //                 )}
// //               </CardBody>
// //             </Card>

// //             {/* Certifications Section */}
// //             <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md transform transition-all duration-500 hover:scale-[1.01]">
// //               <CardBody className="p-6">
// //                 {renderSectionHeader("Certifications", "lucide:award", "certifications")}
// //                 <Divider className="my-4" />

// //                 {loadingSection === "certifications" ? (
// //                   <div className="flex justify-center py-8">
// //                     <Spinner size="lg" color="primary" />
// //                   </div>
// //                 ) : certifications.length > 0 ? (
// //                   <div className="space-y-6">
// //                     {certifications.map((cert) => (
// //                       <div
// //                         key={cert.id}
// //                         className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-all duration-300"
// //                       >
// //                         <div className="flex justify-between items-start">
// //                           <div>
// //                             <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">{cert.name}</h3>
// //                             <p className="text-gray-600 dark:text-gray-300">{cert.issuingOrganization}</p>
// //                             <p className="text-sm text-gray-500 dark:text-gray-400">
// //                               Issued: {new Date(cert.issueDate).toLocaleDateString()}
// //                               {cert.expiryDate && (
// //                                 <> · Expires: {new Date(cert.expiryDate).toLocaleDateString()}</>
// //                               )}
// //                             </p>
// //                           </div>
// //                           <div className="flex gap-2">
// //                             <Tooltip content="Edit">
// //                               <Button
// //                                 isIconOnly
// //                                 size="sm"
// //                                 variant="flat"
// //                                 onPress={() => handleOpenModal("certifications", "edit", cert)}
// //                                 className="transition-transform duration-300 hover:scale-110"
// //                               >
// //                                 <Icon icon="lucide:edit" className="w-4 h-4" />
// //                               </Button>
// //                             </Tooltip>
// //                             <Tooltip content="Delete">
// //                               <Button
// //                                 isIconOnly
// //                                 size="sm"
// //                                 variant="flat"
// //                                 color="danger"
// //                                 onPress={() => handleDelete("certifications", cert.id)}
// //                                 className="transition-transform duration-300 hover:scale-110"
// //                               >
// //                                 <Icon icon="lucide:trash" className="w-4 h-4" />
// //                               </Button>
// //                             </Tooltip>
// //                           </div>
// //                         </div>
// //                         {cert.credentialUrl && (
// //                           <Button
// //                             size="sm"
// //                             variant="flat"
// //                             color="primary"
// //                             as="a"
// //                             href={cert.credentialUrl}
// //                             target="_blank"
// //                             className="mt-3"
// //                             startContent={<Icon icon="lucide:external-link" className="w-4 h-4" />}
// //                           >
// //                             Verify Credential
// //                           </Button>
// //                         )}
// //                         {cert.description && (
// //                           <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{cert.description}</p>
// //                         )}
// //                       </div>
// //                     ))}
// //                   </div>
// //                 ) : (
// //                   <div className="text-center py-8">
// //                     <Icon icon="lucide:award" className="w-12 h-12 mx-auto text-gray-400 mb-4" />
// //                     <p className="text-gray-500">
// //                       No certifications added yet. Click Add to showcase your certifications.
// //                     </p>
// //                   </div>
// //                 )}
// //               </CardBody>
// //             </Card>

// //             {/* Resume Section */}
// //             <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md transform transition-all duration-500 hover:scale-[1.01]">
// //               <CardBody className="p-6">
// //                 {renderSectionHeader("Resume", "lucide:file-text", "resume")}
// //                 <Divider className="my-4" />

// //                 {loadingSection === "resume" ? (
// //                   <div className="flex justify-center py-8">
// //                     <Spinner size="lg" color="primary" />
// //                   </div>
// //                 ) : resumes.length > 0 ? (
// //                   <div className="space-y-4">
// //                     {resumes.map((resume) => (
// //                       <div
// //                         key={resume.id}
// //                         className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-all duration-300"
// //                       >
// //                         <div className="flex items-center gap-3">
// //                           <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
// //                             <Icon icon="lucide:file-text" className="w-6 h-6 text-blue-600 dark:text-blue-300" />
// //                           </div>
// //                           <div>
// //                             <h3 className="font-semibold text-gray-800 dark:text-gray-100">{resume.title}</h3>
// //                             <p className="text-sm text-gray-500 dark:text-gray-400">
// //                               {resume.fileType} · {resume.isDefault && "Default"} ·
// //                               {new Date(resume.createdAt).toLocaleDateString()}
// //                             </p>
// //                           </div>
// //                         </div>
// //                         <div className="mt-3 flex gap-2">
// //                           <Button
// //                             size="sm"
// //                             variant="flat"
// //                             color="primary"
// //                             as="a"
// //                             href={resume.fileUrl}
// //                             target="_blank"
// //                             startContent={<Icon icon="lucide:eye" className="w-4 h-4" />}
// //                           >
// //                             View
// //                           </Button>
// //                           <Button
// //                             size="sm"
// //                             variant="flat"
// //                             color="danger"
// //                             startContent={<Icon icon="lucide:trash" className="w-4 h-4" />}
// //                             onPress={() => handleDelete("resume", resume.id)}
// //                           >
// //                             Delete
// //                           </Button>
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 ) : (
// //                   <div className="text-center py-8">
// //                     <Icon icon="lucide:file-text" className="w-12 h-12 mx-auto text-gray-400 mb-4" />
// //                     <p className="text-gray-500">
// //                       No resumes uploaded yet. Click Add to upload your resume.
// //                     </p>
// //                   </div>
// //                 )}
// //               </CardBody>
// //             </Card>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Form Modal */}
// //       <Modal
// //         isOpen={isOpen}
// //         onClose={onClose}
// //         size="3xl"
// //         scrollBehavior="inside"
// //         classNames={{
// //           base: "bg-white dark:bg-gray-900",
// //           header: "border-b border-gray-200 dark:border-gray-700",
// //           body: "py-6",
// //           footer: "border-t border-gray-200 dark:border-gray-700",
// //         }}
// //       >
// //         <ModalContent>
// //           <ModalHeader className="flex gap-2">
// //             <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
// //               <Icon
// //                 icon={
// //                   currentSection === "personalInfo"
// //                     ? "lucide:user"
// //                     : currentSection === "experience"
// //                     ? "lucide:briefcase"
// //                     : currentSection === "education"
// //                     ? "lucide:graduation-cap"
// //                     : currentSection === "skills"
// //                     ? "lucide:code"
// //                     : currentSection === "projects"
// //                     ? "lucide:folder"
// //                     : currentSection === "certifications"
// //                     ? "lucide:award"
// //                     : "lucide:file-text"
// //                 }
// //                 className="w-5 h-5 text-white"
// //               />
// //             </div>
// //             <span className="text-xl font-semibold">
// //               {modalType === "add" ? "Add" : "Edit"}{" "}
// //               {currentSection === "personalInfo"
// //                 ? "Personal Information"
// //                 : currentSection === "experience"
// //                 ? "Experience"
// //                 : currentSection === "education"
// //                 ? "Education"
// //                 : currentSection === "skills"
// //                 ? "Skills"
// //                 : currentSection === "projects"
// //                 ? "Project"
// //                 : currentSection === "certifications"
// //                 ? "Certification"
// //                 : "Resume"}
// //             </span>
// //           </ModalHeader>
// //           <ModalBody>
// //             {currentSection === "personalInfo" && (
// //               <PersonalInfo
// //                 onSave={handleSave}
// //                 initialData={modalType === "edit" ? currentItem : null}
// //                 showModal={(title, message, type) => {
// //                   onClose();
// //                   showAlert(title, message, type);
// //                 }}
// //               />
// //             )}
// //             {currentSection === "experience" && (
// //               <Experience
// //                 onSave={handleSave}
// //                 initialData={modalType === "edit" ? currentItem : {}}
// //                 showModal={(title, message, type) => {
// //                   onClose();
// //                   showAlert(title, message, type);
// //                 }}
// //               />
// //             )}
// //             {currentSection === "education" && (
// //               <Education
// //                 onSave={handleSave}
// //                 initialData={modalType === "edit" ? currentItem : {}}
// //                 showModal={(title, message, type) => {
// //                   onClose();
// //                   showAlert(title, message, type);
// //                 }}
// //               />
// //             )}
// //             {currentSection === "skills" && (
// //               <Skills
// //                 onSave={handleSave}
// //                 initialData={modalType === "edit" ? currentItem : {}}
// //                 showModal={(title, message, type) => {
// //                   onClose();
// //                   showAlert(title, message, type);
// //                 }}
// //               />
// //             )}
// //             {currentSection === "projects" && (
// //               <Projects
// //                 onSave={handleSave}
// //                 initialData={modalType === "edit" ? currentItem : {}}
// //                 showModal={(title, message, type) => {
// //                   onClose();
// //                   showAlert(title, message, type);
// //                 }}
// //               />
// //             )}
// //             {currentSection === "certifications" && (
// //               <Certifications
// //                 onSave={handleSave}
// //                 initialData={modalType === "edit" ? currentItem : {}}
// //                 showModal={(title, message, type) => {
// //                   onClose();
// //                   showAlert(title, message, type);
// //                 }}
// //               />
// //             )}
// //             {currentSection === "resume" && (
// //               <Resume
// //                 onSave={handleSave}
// //                 initialData={modalType === "edit" ? currentItem : {}}
// //                 showModal={(title, message, type) => {
// //                   onClose();
// //                   showAlert(title, message, type);
// //                 }}
// //               />
// //             )}
// //           </ModalBody>
// //           <ModalFooter>
// //             <Button
// //               variant="flat"
// //               onPress={onClose}
// //               className="transition-transform duration-300 hover:scale-105"
// //             >
// //               Cancel
// //             </Button>
// //           </ModalFooter>
// //         </ModalContent>
// //       </Modal>

// //       {/* Alert Modal */}
// //       <Modal
// //         isOpen={alertModal.isOpen}
// //         onClose={closeAlert}
// //         classNames={{
// //           base: "bg-white dark:bg-gray-900",
// //           header: "border-b border-gray-200 dark:border-gray-700",
// //           body: "py-6",
// //           footer: "border-t border-gray-200 dark:border-gray-700",
// //         }}
// //       >
// //         <ModalContent>
// //           <ModalHeader className="flex gap-3 items-center">
// //             <div
// //               className={`p-2 rounded-full ${
// //                 alertModal.type === "success" ? "bg-green-100" : "bg-red-100"
// //               }`}
// //             >
// //               <Icon
// //                 icon={
// //                   alertModal.type === "success"
// //                     ? "lucide:check-circle"
// //                     : "lucide:alert-circle"
// //                 }
// //                 className={`w-6 h-6 ${
// //                   alertModal.type === "success"
// //                     ? "text-green-600"
// //                     : "text-red-600"
// //                 }`}
// //               />
// //             </div>
// //             <span className="text-lg font-semibold">{alertModal.title}</span>
// //           </ModalHeader>
// //           <ModalBody>
// //             <p className="text-gray-600 dark:text-gray-400">
// //               {alertModal.message}
// //             </p>
// //           </ModalBody>
// //           <ModalFooter>
// //             <Button
// //               color={alertModal.type === "success" ? "success" : "danger"}
// //               variant="flat"
// //               onPress={closeAlert}
// //               className="min-w-[80px] transition-transform duration-300 hover:scale-105"
// //             >
// //               Close
// //             </Button>
// //           </ModalFooter>
// //         </ModalContent>
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default ProfilePage;

// // "use client";
// // import React, { useState, useEffect } from "react";
// // import { Icon } from "@iconify/react";
// // import {
// //   Button,
// //   Card,
// //   CardHeader,
// //   CardBody,
// //   Divider,
// //   Modal,
// //   ModalContent,
// //   ModalHeader,
// //   ModalBody,
// //   ModalFooter,
// //   useDisclosure,
// //   Spinner,
// //   Chip,
// //   Tooltip,
// //   Avatar,
// // } from "@heroui/react";

// // // Import form components
// // import PersonalInfo from "@/components/profile-completion/PersonalInfo";
// // import Experience from "@/components/profile-completion/Experience";
// // import Education from "@/components/profile-completion/Education";
// // import Skills from "@/components/profile-completion/Skills";
// // import Projects from "@/components/profile-completion/Projects";
// // import Certifications from "@/components/profile-completion/Certifications";
// // import Resume from "@/components/profile-completion/Resume";

// // // Import services
// // import {
// //   getMyJobSeekerProfile,
// //   getAllEducation,
// //   getAllExperiences,
// //   getAllSkills,
// //   getAllProjects,
// //   getAllCertifications,
// //   getAllResumes,
// //   deleteEducation,
// //   deleteExperience,
// //   deleteSkill,
// //   deleteProject,
// //   deleteCertification,
// // } from "@/services/jobSeekerService";

// // const ProfilePage = () => {
// //   // State for profile data
// //   const [personalInfo, setPersonalInfo] = useState(null);
// //   const [experiences, setExperiences] = useState([]);
// //   const [education, setEducation] = useState([]);
// //   const [skills, setSkills] = useState([]);
// //   const [projects, setProjects] = useState([]);
// //   const [certifications, setCertifications] = useState([]);
// //   const [resumes, setResumes] = useState([]);

// //   // Loading states
// //   const [loading, setLoading] = useState(true);
// //   const [loadingSection, setLoadingSection] = useState("");

// //   // Modal states
// //   const { isOpen, onOpen, onClose } = useDisclosure();
// //   const [modalType, setModalType] = useState(""); // "add" or "edit"
// //   const [currentSection, setCurrentSection] = useState("");
// //   const [currentItem, setCurrentItem] = useState(null);

// //   // Alert modal
// //   const [alertModal, setAlertModal] = useState({
// //     isOpen: false,
// //     title: "",
// //     message: "",
// //     type: "success",
// //   });

// //   // Fetch all profile data on component mount
// //   useEffect(() => {
// //     fetchProfileData();
// //   }, []);

// //   // Function to fetch all profile data
// //   const fetchProfileData = async () => {
// //     setLoading(true);
// //     try {
// //       const profileResponse = await getMyJobSeekerProfile();
// //       if (profileResponse.data.success) {
// //         setPersonalInfo(profileResponse.data.jobSeeker);
// //       }

// //       const experiencesResponse = await getAllExperiences();
// //       if (experiencesResponse.data.success) {
// //         setExperiences(experiencesResponse.data.experiences || []);
// //       }

// //       const educationResponse = await getAllEducation();
// //       if (educationResponse.data.success) {
// //         setEducation(educationResponse.data.educations || []);
// //       }

// //       const skillsResponse = await getAllSkills();
// //       if (skillsResponse.data.success) {
// //         setSkills(skillsResponse.data.skills || []);
// //       }

// //       const projectsResponse = await getAllProjects();
// //       if (projectsResponse.data.success) {
// //         setProjects(projectsResponse.data.projects || []);
// //       }

// //       const certificationsResponse = await getAllCertifications();
// //       if (certificationsResponse.data.success) {
// //         setCertifications(certificationsResponse.data.certifications || []);
// //       }

// //       const resumesResponse = await getAllResumes();
// //       if (resumesResponse.data.success) {
// //         setResumes(resumesResponse.data.resumes || []);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching profile data:", error);
// //       showAlert(
// //         "Error",
// //         "Failed to load profile data. Please try again later.",
// //         "error"
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Function to handle opening modal for add/edit
// //   const handleOpenModal = (section, type, item = null) => {
// //     setCurrentSection(section);
// //     setModalType(type);
// //     setCurrentItem(item);
// //     onOpen();
// //   };

// //   // Function to handle save after form submission
// //   const handleSave = async (data) => {
// //     onClose();
// //     setLoadingSection(currentSection);

// //     try {
// //       switch (currentSection) {
// //         case "personalInfo":
// //           const profileResponse = await getMyJobSeekerProfile();
// //           if (profileResponse.data.success) {
// //             setPersonalInfo(profileResponse.data.jobSeeker);
// //           }
// //           break;
// //         case "experience":
// //           const experiencesResponse = await getAllExperiences();
// //           if (experiencesResponse.data.success) {
// //             setExperiences(experiencesResponse.data.experiences || []);
// //           }
// //           break;
// //         case "education":
// //           const educationResponse = await getAllEducation();
// //           if (educationResponse.data.success) {
// //             setEducation(educationResponse.data.educations || []);
// //           }
// //           break;
// //         case "skills":
// //           const skillsResponse = await getAllSkills();
// //           if (skillsResponse.data.success) {
// //             setSkills(skillsResponse.data.skills || []);
// //           }
// //           break;
// //         case "projects":
// //           const projectsResponse = await getAllProjects();
// //           if (projectsResponse.data.success) {
// //             setProjects(projectsResponse.data.projects || []);
// //           }
// //           break;
// //         case "certifications":
// //           const certificationsResponse = await getAllCertifications();
// //           if (certificationsResponse.data.success) {
// //             setCertifications(certificationsResponse.data.certifications || []);
// //           }
// //           break;
// //         case "resume":
// //           const resumesResponse = await getAllResumes();
// //           if (resumesResponse.data.success) {
// //             setResumes(resumesResponse.data.resumes || []);
// //           }
// //           break;
// //         default:
// //           break;
// //       }

// //       showAlert("Success", "Profile updated successfully", "success");
// //     } catch (error) {
// //       console.error("Error updating profile:", error);
// //       showAlert(
// //         "Error",
// //         "Failed to update profile. Please try again later.",
// //         "error"
// //       );
// //     } finally {
// //       setLoadingSection("");
// //     }
// //   };

// //   // Function to handle delete
// //   const handleDelete = async (section, id) => {
// //     setLoadingSection(section);
// //     try {
// //       let response;
// //       switch (section) {
// //         case "education":
// //           response = await deleteEducation(id);
// //           if (response.data.success) {
// //             setEducation(education.filter((item) => item.id !== id));
// //           }
// //           break;
// //         case "experience":
// //           response = await deleteExperience(id);
// //           if (response.data.success) {
// //             setExperiences(experiences.filter((item) => item.id !== id));
// //           }
// //           break;
// //         case "skills":
// //           response = await deleteSkill(id);
// //           if (response.data.success) {
// //             setSkills(skills.filter((item) => item.id !== id));
// //           }
// //           break;
// //         case "projects":
// //           response = await deleteProject(id);
// //           if (response.data.success) {
// //             setProjects(projects.filter((item) => item.id !== id));
// //           }
// //           break;
// //         case "certifications":
// //           response = await deleteCertification(id);
// //           if (response.data.success) {
// //             setCertifications(certifications.filter((item) => item.id !== id));
// //           }
// //           break;
// //         default:
// //           break;
// //       }
// //       showAlert("Success", "Item deleted successfully", "success");
// //     } catch (error) {
// //       console.error("Error deleting item:", error);
// //       showAlert(
// //         "Error",
// //         "Failed to delete item. Please try again later.",
// //         "error"
// //       );
// //     } finally {
// //       setLoadingSection("");
// //     }
// //   };

// //   // Function to show alert modal
// //   const showAlert = (title, message, type = "success") => {
// //     setAlertModal({
// //       isOpen: true,
// //       title,
// //       message,
// //       type,
// //     });
// //   };

// //   // Function to close alert modal
// //   const closeAlert = () => {
// //     setAlertModal({
// //       ...alertModal,
// //       isOpen: false,
// //     });
// //   };

// //   // Render section header with add button
// //   const renderSectionHeader = (title, icon, section) => (
// //     <div className="flex justify-between items-center mb-4">
// //       <div className="flex items-center gap-2">
// //         <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
// //           <Icon icon={icon} className="w-5 h-5 text-white" />
// //         </div>
// //         <h2 className="text-xl font-bold">{title}</h2>
// //       </div>
// //       <Button
// //         color="primary"
// //         variant="flat"
// //         startContent={<Icon icon="lucide:plus" className="w-4 h-4" />}
// //         onPress={() => handleOpenModal(section, "add")}
// //         className="transition-transform duration-300 hover:scale-105"
// //       >
// //         Add
// //       </Button>
// //     </div>
// //   );

// //   // Render loading spinner
// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-screen">
// //         <Spinner size="lg" label="Loading profile data..." />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-950 dark:to-purple-950 py-8">
// //       <div className="max-w-6xl mx-auto p-6">
// //         {/* Profile Header */}
// //         <Card
// //           className="shadow-2xl border-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md mb-8 transform transition-transform duration-300 hover:scale-[1.01]"
// //         >
// //           <CardHeader className="pb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-t-large">
// //             <div className="flex flex-col md:flex-row items-center gap-6 w-full">
// //               <div className="relative group">
// //                 <Avatar
// //                   src={personalInfo?.user_jobseeker?.avatarUrl || ""}
// //                   name={personalInfo?.user_jobseeker?.name || "User"}
// //                   size="xl"
// //                   className="w-32 h-32 text-2xl border-4 border-white/80 shadow-lg transition-transform duration-300 group-hover:scale-105"
// //                 />
// //                 <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
// //                   <Icon icon="lucide:camera" className="w-8 h-8 text-white" />
// //                 </div>
// //               </div>
// //               <div className="flex-1 text-center md:text-left">
// //                 <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
// //                   {personalInfo?.user_jobseeker?.name || "Complete Your Profile"}
// //                 </h1>
// //                 <p className="text-blue-100 mt-2 text-lg">
// //                   {personalInfo?.headline || "Add your professional headline"}
// //                 </p>
// //                 <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
// //                   {personalInfo?.availability_status && (
// //                     <Chip
// //                       color={
// //                         personalInfo.availability_status === "Available"
// //                           ? "success"
// //                           : "warning"
// //                       }
// //                       variant="flat"
// //                       startContent={<Icon icon="lucide:clock" className="w-4 h-4" />}
// //                       className="text-sm font-medium"
// //                     >
// //                       {personalInfo.availability_status}
// //                     </Chip>
// //                   )}
// //                   {personalInfo?.experience_years && (
// //                     <Chip
// //                       color="primary"
// //                       variant="flat"
// //                       startContent={<Icon icon="lucide:briefcase" className="w-4 h-4" />}
// //                       className="text-sm font-medium"
// //                     >
// //                       {personalInfo.experience_years} Years Experience
// //                     </Chip>
// //                   )}
// //                 </div>
// //               </div>
// //               <Button
// //                 color="default"
// //                 variant="flat"
// //                 startContent={<Icon icon="lucide:edit" className="w-4 h-4" />}
// //                 onPress={() => handleOpenModal("personalInfo", "edit", personalInfo)}
// //                 className="bg-white/20 text-white hover:bg-white/30 transition-colors duration-300"
// //               >
// //                 Edit Profile
// //               </Button>
// //             </div>
// //           </CardHeader>
// //         </Card>

// //         {/* Profile Sections */}
// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //           {/* Left Column */}
// //           <div className="lg:col-span-2 space-y-6">
// //             {/* Personal Information */}
// //             <Card
// //               className="shadow-xl border border-gray-100 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md transform transition-transform duration-300 hover:scale-[1.01]"
// //             >
// //               <CardBody className="p-6">
// //                 <div className="flex justify-between items-center mb-4">
// //                   <div className="flex items-center gap-2">
// //                     <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
// //                       <Icon icon="lucide:user" className="w-5 h-5 text-white" />
// //                     </div>
// //                     <h2 className="text-xl font-bold">Personal Information</h2>
// //                   </div>
// //                   <Button
// //                     color="primary"
// //                     variant="flat"
// //                     startContent={<Icon icon="lucide:edit" className="w-4 h-4" />}
// //                     onPress={() => handleOpenModal("personalInfo", "edit", personalInfo)}
// //                     className="transition-transform duration-300 hover:scale-105"
// //                   >
// //                     Edit
// //                   </Button>
// //                 </div>

// //                 <Divider className="my-4" />

// //                 {loadingSection === "personalInfo" ? (
// //                   <div className="flex justify-center py-8">
// //                     <Spinner size="lg" color="primary" />
// //                   </div>
// //                 ) : (
// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                     {personalInfo ? (
// //                       <>
// //                         <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300">
// //                           <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Summary</p>
// //                           <p className="mt-1 text-gray-700 dark:text-gray-200">
// //                             {personalInfo.summary || "Not provided"}
// //                           </p>
// //                         </div>
// //                         <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300">
// //                           <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Gender</p>
// //                           <p className="mt-1 text-gray-700 dark:text-gray-200 capitalize">
// //                             {personalInfo.gender || "Not provided"}
// //                           </p>
// //                         </div>
// //                         <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300">
// //                           <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date of Birth</p>
// //                           <p className="mt-1 text-gray-700 dark:text-gray-200">
// //                             {personalInfo.date_of_birth
// //                               ? new Date(personalInfo.date_of_birth).toLocaleDateString()
// //                               : "Not provided"}
// //                           </p>
// //                         </div>
// //                         <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300">
// //                           <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Languages</p>
// //                           <p className="mt-1 text-gray-700 dark:text-gray-200">
// //                             {personalInfo.languages || "Not provided"}
// //                           </p>
// //                         </div>
// //                         <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300">
// //                           <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Salary</p>
// //                           <p className="mt-1 text-gray-700 dark:text-gray-200">
// //                             {personalInfo.current_salary
// //                               ? `$${personalInfo.current_salary.toLocaleString()}`
// //                               : "Not provided"}
// //                           </p>
// //                         </div>
// //                         <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300">
// //                           <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Expected Salary</p>
// //                           <p className="mt-1 text-gray-700 dark:text-gray-200">
// //                             {personalInfo.expected_salary
// //                               ? `$${personalInfo.expected_salary.toLocaleString()}`
// //                               : "Not provided"}
// //                           </p>
// //                         </div>
// //                         <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300">
// //                           <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Notice Period</p>
// //                           <p className="mt-1 text-gray-700 dark:text-gray-200">
// //                             {personalInfo.notice_period
// //                               ? `${personalInfo.notice_period} days`
// //                               : "Not provided"}
// //                           </p>
// //                         </div>
// //                       </>
// //                     ) : (
// //                       <p className="col-span-2 text-center py-4 text-gray-500">
// //                         No personal information available. Click Edit to add your details.
// //                       </p>
// //                     )}
// //                   </div>
// //                 )}
// //               </CardBody>
// //             </Card>

// //             {/* Experience Section */}
// //             <Card
// //               className="shadow-xl border border-gray-100 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md transform transition-transform duration-300 hover:scale-[1.01]"
// //             >
// //               <CardBody className="p-6">
// //                 {renderSectionHeader("Experience", "lucide:briefcase", "experience")}
// //                 <Divider className="my-4" />

// //                 {loadingSection === "experience" ? (
// //                   <div className="flex justify-center py-8">
// //                     <Spinner size="lg" color="primary" />
// //                   </div>
// //                 ) : experiences.length > 0 ? (
// //                   <div className="space-y-6">
// //                     {experiences.map((exp) => (
// //                       <div
// //                         key={exp.id}
// //                         className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-all duration-300"
// //                       >
// //                         <div className="flex justify-between items-start">
// //                           <div>
// //                             <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
// //                               {exp.position}
// //                             </h3>
// //                             <p className="text-gray-600 dark:text-gray-300">{exp.companyName}</p>
// //                             <p className="text-sm text-gray-500 dark:text-gray-400">
// //                               {new Date(exp.startDate).toLocaleDateString()} -{" "}
// //                               {exp.isCurrentJob
// //                                 ? "Present"
// //                                 : exp.endDate
// //                                 ? new Date(exp.endDate).toLocaleDateString()
// //                                 : ""}
// //                             </p>
// //                             <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
// //                               {exp.location}
// //                             </p>
// //                           </div>
// //                           <div className="flex gap-2">
// //                             <Tooltip content="Edit">
// //                               <Button
// //                                 isIconOnly
// //                                 size="sm"
// //                                 variant="flat"
// //                                 onPress={() => handleOpenModal("experience", "edit", exp)}
// //                                 className="transition-transform duration-300 hover:scale-110"
// //                               >
// //                                 <Icon icon="lucide:edit" className="w-4 h-4" />
// //                               </Button>
// //                             </Tooltip>
// //                             <Tooltip content="Delete">
// //                               <Button
// //                                 isIconOnly
// //                                 size="sm"
// //                                 variant="flat"
// //                                 color="danger"
// //                                 onPress={() => handleDelete("experience", exp.id)}
// //                                 className="transition-transform duration-300 hover:scale-110"
// //                               >
// //                                 <Icon icon="lucide:trash" className="w-4 h-4" />
// //                               </Button>
// //                             </Tooltip>
// //                           </div>
// //                         </div>
// //                         {exp.jobDescription && (
// //                           <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
// //                             {exp.jobDescription}
// //                           </p>
// //                         )}
// //                         {exp.skills && exp.skills.length > 0 && (
// //                           <div className="mt-3 flex flex-wrap gap-1">
// //                             {exp.skills.split(",").map((skill, idx) => (
// //                               <Chip
// //                                 key={idx}
// //                                 size="sm"
// //                                 variant="flat"
// //                                 color="primary"
// //                                 className="transition-transform duration-300 hover:scale-105"
// //                               >
// //                                 {skill}
// //                               </Chip>
// //                             ))}
// //                           </div>
// //                         )}
// //                       </div>
// //                     ))}
// //                   </div>
// //                 ) : (
// //                   <div className="text-center py-8">
// //                     <div className="flex flex-col items-center">
// //                       <div className="p-4 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
// //                         <Icon
// //                           icon="lucide:briefcase"
// //                           className="w-12 h-12 text-gray-400"
// //                         />
// //                       </div>
// //                       <p className="text-gray-500">
// //                         No experience entries yet. Click Add to create your first experience.
// //                       </p>
// //                     </div>
// //                   </div>
// //                 )}
// //               </CardBody>
// //             </Card>

// //             {/* Education Section */}
// //             <Card
// //               className="shadow-xl border border-gray-100 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md transform transition-transform duration-300 hover:scale-[1.01]"
// //             >
// //               <CardBody className="p-6">
// //                 {renderSectionHeader("Education", "lucide:graduation-cap", "education")}
// //                 <Divider className="my-4" />

// //                 {loadingSection === "education" ? (
// //                   <div className="flex justify-center py-8">
// //                     <Spinner size="lg" color="primary" />
// //                   </div>
// //                 ) : education.length > 0 ? (
// //                   <div className="space-y-6">
// //                     {education.map((edu) => (
// //                       <div
// //                         key={edu.id}
// //                         className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-all duration-300"
// //                       >
// //                         <div className="flex justify-between items-start">
// //                           <div>
// //                             <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
// //                               {edu.courseName}
// //                             </h3>
// //                             <p className="text-gray-600 dark:text-gray-300">
// //                               {edu.institutionName}
// //                             </p>
// //                             <p className="text-sm text-gray-500 dark:text-gray-400">
// //                               {edu.educationLevel}{" "}
// //                               {edu.specialization ? `- ${edu.specialization}` : ""}
// //                             </p>
// //                             <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
// //                               {new Date(edu.startDate).toLocaleDateString()} -{" "}
// //                               {edu.isCurrentlyStudying
// //                                 ? "Present"
// //                                 : edu.endDate
// //                                 ? new Date(edu.endDate).toLocaleDateString()
// //                                 : ""}
// //                             </p>
// //                           </div>
// //                           <div className="flex gap-2">
// //                             <Tooltip content="Edit">
// //                               <Button
// //                                 isIconOnly
// //                                 size="sm"
// //                                 variant="flat"
// //                                 onPress={() => handleOpenModal("education", "edit", edu)}
// //                                 className="transition-transform duration-300 hover:scale-110"
// //                               >
// //                                 <Icon icon="lucide:edit" className="w-4 h-4" />
// //                               </Button>
// //                             </Tooltip>
// //                             <Tooltip content="Delete">
// //                               <Button
// //                                 isIconOnly
// //                                 size="sm"
// //                                 variant="flat"
// //                                 color="danger"
// //                                 onPress={() => handleDelete("education", edu.id)}
// //                                 className="transition-transform duration-300 hover:scale-110"
// //                               >
// //                                 <Icon icon="lucide:trash" className="w-4 h-4" />
// //                               </Button>
// //                             </Tooltip>
// //                           </div>
// //                         </div>
// //                         {edu.description && (
// //                           <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
// //                             {edu.description}
// //                           </p>
// //                         )}
// //                         {edu.grade && (
// //                           <p className="mt-1 text-sm">
// //                             <span className="font-medium">Grade:</span> {edu.grade} (
// //                             {edu.gradingSystem})
// //                           </p>
// //                         )}
// //                       </div>
// //                     ))}
// //                   </div>
// //                 ) : (
// //                   <div className="text-center py-8">
// //                     <div className="flex flex-col items-center">
// //                       <div className="p-4 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
// //                         <Icon
// //                           icon="lucide:graduation-cap"
// //                           className="w-12 h-12 text-gray-400"
// //                         />
// //                       </div>
// //                       <p className="text-gray-500">
// //                         No education entries yet. Click Add to create your first education entry.
// //                       </p>
// //                     </div>
// //                   </div>
// //                 )}
// //               </CardBody>
// //             </Card>
// //           </div>

// //           {/* Right Column */}
// //           <div className="space-y-6">
// //             {/* Skills Section */}
// //             <Card
// //               className="shadow-xl border border-gray-100 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md transform transition-transform duration-300 hover:scale-[1.01]"
// //             >
// //               <CardBody className="p-6">
// //                 {renderSectionHeader("Skills", "lucide:code", "skills")}
// //                 <Divider className="my-4" />

// //                 {loadingSection === "skills" ? (
// //                   <div className="flex justify-center py-8">
// //                     <Spinner size="lg" color="primary" />
// //                   </div>
// //                 ) : skills.length > 0 ? (
// //                   <div className="grid grid-cols-1 gap-4">
// //                     {skills.map((skill) => (
// //                       <div
// //                         key={skill.id}
// //                         className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-all duration-300"
// //                       >
// //                         <div className="flex justify-between items-start">
// //                           <div>
// //                             <h3 className="font-semibold text-gray-800 dark:text-gray-100">
// //                               {skill.name}
// //                             </h3>
// //                             <p className="text-sm text-gray-500 dark:text-gray-400">
// //                               {skill.category || "General"}
// //                             </p>
// //                             <div className="mt-2">
// //                               <Chip
// //                                 size="sm"
// //                                 color="primary"
// //                                 variant="flat"
// //                                 className="transition-transform duration-300 hover:scale-105"
// //                               >
// //                                 {skill.proficiencyLevel || "Intermediate"}
// //                               </Chip>
// //                               {skill.yearsOfExperience && (
// //                                 <span className="text-xs ml-2 text-gray-500">
// //                                   {skill.yearsOfExperience} years
// //                                 </span>
// //                               )}
// //                             </div>
// //                           </div>
// //                           <div className="flex gap-2">
// //                             <Tooltip content="Edit">
// //                               <Button
// //                                 isIconOnly
// //                                 size="sm"
// //                                 variant="flat"
// //                                 onPress={() => handleOpenModal("skills", "edit", skill)}
// //                                 className="transition-transform duration-300 hover:scale-110"
// //                               >
// //                                 <Icon icon="lucide:edit" className="w-4 h-4" />
// //                               </Button>
// //                             </Tooltip>
// //                             <Tooltip content="Delete">
// //                               <Button
// //                                 isIconOnly
// //                                 size="sm"
// //                                 variant="flat"
// //                                 color="danger"
// //                                 onPress={() => handleDelete("skills", skill.id)}
// //                                 className="transition-transform duration-300 hover:scale-110"
// //                               >
// //                                 <Icon icon="lucide:trash" className="w-4 h-4" />
// //                               </Button>
// //                             </Tooltip>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 ) : (
// //                   <div className="text-center py-8">
// //                     <div className="flex flex-col items-center">
// //                       <div className="p-4 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
// //                         <Icon icon="lucide:code" className="w-12 h-12 text-gray-400" />
// //                       </div>
// //                       <p className="text-gray-500">
// //                         No skills added yet. Click Add to showcase your skills.
// //                       </p>
// //                     </div>
// //                   </div>
// //                 )}
// //               </CardBody>
// //             </Card>

// //             {/* Projects Section */}
// //             <Card
// //               className="shadow-xl border border-gray-100 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md transform transition-transform duration-300 hover:scale-[1.01]"
// //             >
// //               <CardBody className="p-6">
// //                 {renderSectionHeader("Projects", "lucide:folder", "projects")}
// //                 <Divider className="my-4" />

// //                 {loadingSection === "projects" ? (
// //                   <div className="flex justify-center py-8">
// //                     <Spinner size="lg" color="primary" />
// //                   </div>
// //                 ) : projects.length > 0 ? (
// //                   <div className="space-y-6">
// //                     {projects.map((project) => (
// //                       <div
// //                         key={project.id}
// //                         className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-all duration-300"
// //                       >
// //                         <div className="flex justify-between items-start">
// //                           <div>
// //                             <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
// //                               {project.projectTitle}
// //                             </h3>
// //                             {project.linkedTo && (
// //                               <p className="text-gray-600 dark:text-gray-300">
// //                                 {project.linkedTo}
// //                               </p>
// //                             )}
// //                             <p className="text-sm text-gray-500 dark:text-gray-400">
// //                               {new Date(project.workedFrom).toLocaleDateString()} -{" "}
// //                               {project.isCurrentProject
// //                                 ? "Present"
// //                                 : project.workedTo
// //                                 ? new Date(project.workedTo).toLocaleDateString()
// //                                 : ""}
// //                             </p>
// //                           </div>
// //                           <div className="flex gap-2">
// //                             <Tooltip content="Edit">
// //                               <Button
// //                                 isIconOnly
// //                                 size="sm"
// //                                 variant="flat"
// //                                 onPress={() => handleOpenModal("projects", "edit", project)}
// //                                 className="transition-transform duration-300 hover:scale-110"
// //                               >
// //                                 <Icon icon="lucide:edit" className="w-4 h-4" />
// //                               </Button>
// //                             </Tooltip>
// //                             <Tooltip content="Delete">
// //                               <Button
// //                                 isIconOnly
// //                                 size="sm"
// //                                 variant="flat"
// //                                 color="danger"
// //                                 onPress={() => handleDelete("projects", project.id)}
// //                                 className="transition-transform duration-300 hover:scale-110"
// //                               >
// //                                 <Icon icon="lucide:trash" className="w-4 h-4" />
// //                               </Button>
// //                             </Tooltip>
// //                           </div>
// //                         </div>
// //                         {project.projectDetails && (
// //                           <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
// //                             {project.projectDetails}
// //                           </p>
// //                         )}
// //                         <div className="mt-3 flex flex-wrap gap-2">
// //                           {project.gitRepoLink && (
// //                             <Button
// //                               size="sm"
// //                               variant="flat"
// //                               color="default"
// //                               as="a"
// //                               href={project.gitRepoLink}
// //                               target="_blank"
// //                               startContent={<Icon icon="lucide:github" className="w-4 h-4" />}
// //                             >
// //                               Repository
// //                             </Button>
// //                           )}
// //                           {project.demoLink && (
// //                             <Button
// //                               size="sm"
// //                               variant="flat"
// //                               color="primary"
// //                               as="a"
// //                               href={project.demoLink}
// //                               target="_blank"
// //                               startContent={
// //                                 <Icon icon="lucide:external-link" className="w-4 h-4" />
// //                               }
// //                             >
// //                               Live Demo
// //                             </Button>
// //                           )}
// //                         </div>
// //                         {project.tags && project.tags.length > 0 && (
// //                           <div className="mt-3 flex flex-wrap gap-1">
// //                             {project.tags.map((tag, idx) => (
// //                               <Chip
// //                                 key={idx}
// //                                 size="sm"
// //                                 variant="flat"
// //                                 color="secondary"
// //                                 className="transition-transform duration-300 hover:scale-105"
// //                               >
// //                                 {tag}
// //                               </Chip>
// //                             ))}
// //                           </div>
// //                         )}
// //                       </div>
// //                     ))}
// //                   </div>
// //                 ) : (
// //                   <div className="text-center py-8">
// //                     <div className="flex flex-col items-center">
// //                       <div className="p-4 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
// //                         <Icon
// //                           icon="lucide:folder"
// //                           className="w-12 h-12 text-gray-400"
// //                         />
// //                       </div>
// //                       <p className="text-gray-500">
// //                         No projects added yet. Click Add to showcase your projects.
// //                       </p>
// //                     </div>
// //                   </div>
// //                 )}
// //               </CardBody>
// //             </Card>

// //             {/* Certifications Section */}
// //             <Card
// //               className="shadow-xl border border-gray-100 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md transform transition-transform duration-300 hover:scale-[1.01]"
// //             >
// //               <CardBody className="p-6">
// //                 {renderSectionHeader("Certifications", "lucide:award", "certifications")}
// //                 <Divider className="my-4" />

// //                 {loadingSection === "certifications" ? (
// //                   <div className="flex justify-center py-8">
// //                     <Spinner size="lg" color="primary" />
// //                   </div>
// //                 ) : certifications.length > 0 ? (
// //                   <div className="space-y-6">
// //                     {certifications.map((cert) => (
// //                       <div
// //                         key={cert.id}
// //                         className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-all duration-300"
// //                       >
// //                         <div className="flex justify-between items-start">
// //                           <div>
// //                             <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
// //                               {cert.name}
// //                             </h3>
// //                             <p className="text-gray-600 dark:text-gray-300">
// //                               {cert.issuingOrganization}
// //                             </p>
// //                             <p className="text-sm text-gray-500 dark:text-gray-400">
// //                               Issued: {new Date(cert.issueDate).toLocaleDateString()}
// //                               {cert.expiryDate && (
// //                                 <>
// //                                   {" · "}Expires:{" "}
// //                                   {new Date(cert.expiryDate).toLocaleDateString()}
// //                                 </>
// //                               )}
// //                             </p>
// //                           </div>
// //                           <div className="flex gap-2">
// //                             <Tooltip content="Edit">
// //                               <Button
// //                                 isIconOnly
// //                                 size="sm"
// //                                 variant="flat"
// //                                 onPress={() =>
// //                                   handleOpenModal("certifications", "edit", cert)
// //                                 }
// //                                 className="transition-transform duration-300 hover:scale-110"
// //                               >
// //                                 <Icon icon="lucide:edit" className="w-4 h-4" />
// //                               </Button>
// //                             </Tooltip>
// //                             <Tooltip content="Delete">
// //                               <Button
// //                                 isIconOnly
// //                                 size="sm"
// //                                 variant="flat"
// //                                 color="danger"
// //                                 onPress={() => handleDelete("certifications", cert.id)}
// //                                 className="transition-transform duration-300 hover:scale-110"
// //                               >
// //                                 <Icon icon="lucide:trash" className="w-4 h-4" />
// //                               </Button>
// //                             </Tooltip>
// //                           </div>
// //                         </div>
// //                         {cert.credentialUrl && (
// //                           <Button
// //                             size="sm"
// //                             variant="flat"
// //                             color="primary"
// //                             as="a"
// //                             href={cert.credentialUrl}
// //                             target="_blank"
// //                             className="mt-3"
// //                             startContent={
// //                               <Icon icon="lucide:external-link" className="w-4 h-4" />
// //                             }
// //                           >
// //                             Verify Credential
// //                           </Button>
// //                         )}
// //                         {cert.description && (
// //                           <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
// //                             {cert.description}
// //                           </p>
// //                         )}
// //                       </div>
// //                     ))}
// //                   </div>
// //                 ) : (
// //                   <div className="text-center py-8">
// //                     <div className="flex flex-col items-center">
// //                       <div className="p-4 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
// //                         <Icon icon="lucide:award" className="w-12 h-12 text-gray-400" />
// //                       </div>
// //                       <p className="text-gray-500">
// //                         No certifications added yet. Click Add to showcase your certifications.
// //                       </p>
// //                     </div>
// //                   </div>
// //                 )}
// //               </CardBody>
// //             </Card>

// //             {/* Resume Section */}
// //             <Card
// //               className="shadow-xl border border-gray-100 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md transform transition-transform duration-300 hover:scale-[1.01]"
// //             >
// //               <CardBody className="p-6">
// //                 {renderSectionHeader("Resume", "lucide:file-text", "resume")}
// //                 <Divider className="my-4" />

// //                 {loadingSection === "resume" ? (
// //                   <div className="flex justify-center py-8">
// //                     <Spinner size="lg" color="primary" />
// //                   </div>
// //                 ) : resumes.length > 0 ? (
// //                   <div className="space-y-4">
// //                     {resumes.map((resume) => (
// //                       <div
// //                         key={resume.id}
// //                         className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-all duration-300"
// //                       >
// //                         <div className="flex items-center gap-3">
// //                           <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
// //                             <Icon
// //                               icon="lucide:file-text"
// //                               className="w-6 h-6 text-blue-600 dark:text-blue-300"
// //                             />
// //                           </div>
// //                           <div>
// //                             <h3 className="font-semibold text-gray-800 dark:text-gray-100">
// //                               {resume.title}
// //                             </h3>
// //                             <p className="text-sm text-gray-500 dark:text-gray-400">
// //                               {resume.fileType} · {resume.isDefault && "Default"} ·{" "}
// //                               {new Date(resume.createdAt).toLocaleDateString()}
// //                             </p>
// //                           </div>
// //                         </div>
// //                         <div className="mt-3 flex gap-2">
// //                           <Button
// //                             size="sm"
// //                             variant="flat"
// //                             color="primary"
// //                             as="a"
// //                             href={resume.fileUrl}
// //                             target="_blank"
// //                             startContent={<Icon icon="lucide:eye" className="w-4 h-4" />}
// //                           >
// //                             View
// //                           </Button>
// //                           <Button
// //                             size="sm"
// //                             variant="flat"
// //                             color="danger"
// //                             startContent={<Icon icon="lucide:trash" className="w-4 h-4" />}
// //                             onPress={() => handleDelete("resume", resume.id)}
// //                           >
// //                             Delete
// //                           </Button>
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 ) : (
// //                   <div className="text-center py-8">
// //                     <div className="flex flex-col items-center">
// //                       <div className="p-4 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
// //                         <Icon
// //                           icon="lucide:file-text"
// //                           className="w-12 h-12 text-gray-400"
// //                         />
// //                       </div>
// //                       <p className="text-gray-500">
// //                         No resumes uploaded yet. Click Add to upload your resume.
// //                       </p>
// //                     </div>
// //                   </div>
// //                 )}
// //               </CardBody>
// //             </Card>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Form Modal */}
// //       <Modal
// //         isOpen={isOpen}
// //         onClose={onClose}
// //         size="3xl"
// //         scrollBehavior="inside"
// //         classNames={{
// //           base: "bg-white dark:bg-gray-900",
// //           header: "border-b border-gray-200 dark:border-gray-700",
// //           body: "py-6",
// //           footer: "border-t border-gray-200 dark:border-gray-700",
// //         }}
// //       >
// //         <ModalContent>
// //           <ModalHeader className="flex gap-2">
// //             <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
// //               <Icon
// //                 icon={
// //                   currentSection === "personalInfo"
// //                     ? "lucide:user"
// //                     : currentSection === "experience"
// //                     ? "lucide:briefcase"
// //                     : currentSection === "education"
// //                     ? "lucide:graduation-cap"
// //                     : currentSection === "skills"
// //                     ? "lucide:code"
// //                     : currentSection === "projects"
// //                     ? "lucide:folder"
// //                     : currentSection === "certifications"
// //                     ? "lucide:award"
// //                     : "lucide:file-text"
// //                 }
// //                 className="w-5 h-5 text-white"
// //               />
// //             </div>
// //             <span className="text-xl font-semibold">
// //               {modalType === "add" ? "Add" : "Edit"}{" "}
// //               {currentSection === "personalInfo"
// //                 ? "Personal Information"
// //                 : currentSection === "experience"
// //                 ? "Experience"
// //                 : currentSection === "education"
// //                 ? "Education"
// //                 : currentSection === "skills"
// //                 ? "Skills"
// //                 : currentSection === "projects"
// //                 ? "Project"
// //                 : currentSection === "certifications"
// //                 ? "Certification"
// //                 : "Resume"}
// //             </span>
// //           </ModalHeader>
// //           <ModalBody>
// //             {currentSection === "personalInfo" && (
// //               <PersonalInfo
// //                 onSave={handleSave}
// //                 initialData={modalType === "edit" ? currentItem : null}
// //                 showModal={(title, message, type) => {
// //                   onClose();
// //                   showAlert(title, message, type);
// //                 }}
// //               />
// //             )}
// //             {currentSection === "experience" && (
// //               <Experience
// //                 onSave={handleSave}
// //                 initialData={modalType === "edit" ? currentItem : {}}
// //                 showModal={(title, message, type) => {
// //                   onClose();
// //                   showAlert(title, message, type);
// //                 }}
// //               />
// //             )}
// //             {currentSection === "education" && (
// //               <Education
// //                 onSave={handleSave}
// //                 initialData={modalType === "edit" ? currentItem : {}}
// //                 showModal={(title, message, type) => {
// //                   onClose();
// //                   showAlert(title, message, type);
// //                 }}
// //               />
// //             )}
// //             {currentSection === "skills" && (
// //               <Skills
// //                 onSave={handleSave}
// //                 initialData={modalType === "edit" ? currentItem : {}}
// //                 showModal={(title, message, type) => {
// //                   onClose();
// //                   showAlert(title, message, type);
// //                 }}
// //               />
// //             )}
// //             {currentSection === "projects" && (
// //               <Projects
// //                 onSave={handleSave}
// //                 initialData={modalType === "edit" ? currentItem : {}}
// //                 showModal={(title, message, type) => {
// //                   onClose();
// //                   showAlert(title, message, type);
// //                 }}
// //               />
// //             )}
// //             {currentSection === "certifications" && (
// //               <Certifications
// //                 onSave={handleSave}
// //                 initialData={modalType === "edit" ? currentItem : {}}
// //                 showModal={(title, message, type) => {
// //                   onClose();
// //                   showAlert(title, message, type);
// //                 }}
// //               />
// //             )}
// //             {currentSection === "resume" && (
// //               <Resume
// //                 onSave={handleSave}
// //                 initialData={modalType === "edit" ? currentItem : {}}
// //                 showModal={(title, message, type) => {
// //                   onClose();
// //                   showAlert(title, message, type);
// //                 }}
// //               />
// //             )}
// //           </ModalBody>
// //           <ModalFooter>
// //             <Button
// //               variant="flat"
// //               onPress={onClose}
// //               className="transition-transform duration-300 hover:scale-105"
// //             >
// //               Cancel
// //             </Button>
// //           </ModalFooter>
// //         </ModalContent>
// //       </Modal>

// //       {/* Alert Modal */}
// //       <Modal
// //         isOpen={alertModal.isOpen}
// //         onClose={closeAlert}
// //         classNames={{
// //           base: "bg-white dark:bg-gray-900",
// //           header: "border-b border-gray-200 dark:border-gray-700",
// //           body: "py-6",
// //           footer: "border-t border-gray-200 dark:border-gray-700",
// //         }}
// //       >
// //         <ModalContent>
// //           <ModalHeader className="flex gap-3 items-center">
// //             <div
// //               className={`p-2 rounded-full ${
// //                 alertModal.type === "success" ? "bg-green-100" : "bg-red-100"
// //               }`}
// //             >
// //               <Icon
// //                 icon={
// //                   alertModal.type === "success"
// //                     ? "lucide:check-circle"
// //                     : "lucide:alert-circle"
// //                 }
// //                 className={`w-6 h-6 ${
// //                   alertModal.type === "success" ? "text-green-600" : "text-red-600"
// //                 }`}
// //               />
// //             </div>
// //             <span className="text-lg font-semibold">{alertModal.title}</span>
// //           </ModalHeader>
// //           <ModalBody>
// //             <p className="text-gray-600 dark:text-gray-400">{alertModal.message}</p>
// //           </ModalBody>
// //           <ModalFooter>
// //             <Button
// //               color={alertModal.type === "success" ? "success" : "danger"}
// //               variant="flat"
// //               onPress={closeAlert}
// //               className="min-w-[80px] transition-transform duration-300 hover:scale-105"
// //             >
// //               Close
// //             </Button>
// //           </ModalFooter>
// //         </ModalContent>
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default ProfilePage;

"use client";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Spinner,
  Chip,
  Tooltip,
  Avatar,
  Progress,
} from "@heroui/react";
import PersonalInfo from "@/components/profile-completion/PersonalInfo";
import Experience from "@/components/profile-completion/Experience";
import Education from "@/components/profile-completion/Education";
import Skills from "@/components/profile-completion/Skills";
import Projects from "@/components/profile-completion/Projects";
import Certifications from "@/components/profile-completion/Certifications";
import Resume from "@/components/profile-completion/Resume";
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
} from "@/services/jobSeekerService";

const ProfilePage = () => {
  const [personalInfo, setPersonalInfo] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSection, setLoadingSection] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState("");
  const [currentSection, setCurrentSection] = useState("");
  const [currentItem, setCurrentItem] = useState(null);
  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "success",
  });

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    setLoading(true);
    try {
      const profileResponse = await getMyJobSeekerProfile();
      if (profileResponse.data.success) {
        setPersonalInfo(profileResponse.data.jobSeeker);
      }
      const experiencesResponse = await getAllExperiences();
      if (experiencesResponse.data.success) {
        setExperiences(experiencesResponse.data.experiences || []);
      }
      const educationResponse = await getAllEducation();
      if (educationResponse.data.success) {
        setEducation(educationResponse.data.educations || []);
      }
      const skillsResponse = await getAllSkills();
      if (skillsResponse.data.success) {
        setSkills(skillsResponse.data.skills || []);
      }
      const projectsResponse = await getAllProjects();
      if (projectsResponse.data.success) {
        setProjects(projectsResponse.data.projects || []);
      }
      const certificationsResponse = await getAllCertifications();
      if (certificationsResponse.data.success) {
        setCertifications(certificationsResponse.data.certifications || []);
      }
      const resumesResponse = await getAllResumes();
      if (resumesResponse.data.success) {
        setResumes(resumesResponse.data.resumes || []);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      showAlert(
        "Error",
        "Failed to load profile data. Please try again later.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const handleOpenModal = (section, type, item = null) => {
    setCurrentSection(section);
    setModalType(type);
    setCurrentItem(item);
    onOpen();
  };

  const handleSave = async (data) => {
    onClose();
    setLoadingSection(currentSection);
    try {
      switch (currentSection) {
        case "personalInfo":
          const profileResponse = await getMyJobSeekerProfile();
          if (profileResponse.data.success) {
            setPersonalInfo(profileResponse.data.jobSeeker);
          }
          break;
        case "experience":
          const experiencesResponse = await getAllExperiences();
          if (experiencesResponse.data.success) {
            setExperiences(experiencesResponse.data.experiences || []);
          }
          break;
        case "education":
          const educationResponse = await getAllEducation();
          if (educationResponse.data.success) {
            setEducation(educationResponse.data.educations || []);
          }
          break;
        case "skills":
          const skillsResponse = await getAllSkills();
          if (skillsResponse.data.success) {
            setSkills(skillsResponse.data.skills || []);
          }
          break;
        case "projects":
          const projectsResponse = await getAllProjects();
          if (projectsResponse.data.success) {
            setProjects(projectsResponse.data.projects || []);
          }
          break;
        case "certifications":
          const certificationsResponse = await getAllCertifications();
          if (certificationsResponse.data.success) {
            setCertifications(certificationsResponse.data.certifications || []);
          }
          break;
        case "resume":
          const resumesResponse = await getAllResumes();
          if (resumesResponse.data.success) {
            setResumes(resumesResponse.data.resumes || []);
          }
          break;
        default:
          break;
      }
      showAlert("Success", "Profile updated successfully", "success");
    } catch (error) {
      console.error("Error updating profile:", error);
      showAlert(
        "Error",
        "Failed to update profile. Please try again later.",
        "error"
      );
    } finally {
      setLoadingSection("");
    }
  };

  const handleDelete = async (section, id) => {
    setLoadingSection(section);
    try {
      let response;
      switch (section) {
        case "education":
          response = await deleteEducation(id);
          if (response.data.success) {
            setEducation(education.filter((item) => item.id !== id));
          }
          break;
        case "experience":
          response = await deleteExperience(id);
          if (response.data.success) {
            setExperiences(experiences.filter((item) => item.id !== id));
          }
          break;
        case "skills":
          response = await deleteSkill(id);
          if (response.data.success) {
            setSkills(skills.filter((item) => item.id !== id));
          }
          break;
        case "projects":
          response = await deleteProject(id);
          if (response.data.success) {
            setProjects(projects.filter((item) => item.id !== id));
          }
          break;
        case "certifications":
          response = await deleteCertification(id);
          if (response.data.success) {
            setCertifications(certifications.filter((item) => item.id !== id));
          }
          break;
        default:
          break;
      }
      showAlert("Success", "Item deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting item:", error);
      showAlert(
        "Error",
        "Failed to delete item. Please try again later.",
        "error"
      );
    } finally {
      setLoadingSection("");
    }
  };

  const showAlert = (title, message, type = "success") => {
    setAlertModal({
      isOpen: true,
      title,
      message,
      type,
    });
  };

  const closeAlert = () => {
    setAlertModal({
      ...alertModal,
      isOpen: false,
    });
  };

  const renderSectionHeader = (title, icon, section) => (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-600 rounded-full">
          <Icon icon={icon} className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          {title}
        </h2>
      </div>
      {section !== "personalInfo" && (
        <Button
          color="primary"
          variant="solid"
          startContent={<Icon icon="lucide:plus" className="w-5 h-5" />}
          onPress={() => handleOpenModal(section, "add")}
          className="bg-indigo-600 hover:bg-indigo-700 transition-all duration-300"
        >
          Add
        </Button>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <Spinner size="lg" label="Loading profile..." color="primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <Card className="mb-8 overflow-hidden bg-white dark:bg-gray-800 shadow-lg rounded-2xl">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative">
                <Avatar
                  src={personalInfo?.user_jobseeker?.avatarUrl || ""}
                  name={personalInfo?.user_jobseeker?.name || "User"}
                  size="lg"
                  className="w-24 h-24 border-4 border-white shadow-md"
                />
                <div className="absolute inset-0 bg-black/30 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Icon icon="lucide:camera" className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-3xl font-bold text-white">
                  {personalInfo?.user_jobseeker?.name ||
                    "Complete Your Profile"}
                </h1>
                <p className="text-indigo-100 mt-2">
                  {personalInfo?.headline || "Add your professional headline"}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {personalInfo?.availability_status && (
                    <Chip
                      color={
                        personalInfo.availability_status === "Available"
                          ? "success"
                          : "warning"
                      }
                      variant="dot"
                      className="text-white"
                    >
                      {personalInfo.availability_status}
                    </Chip>
                  )}
                  {personalInfo?.experience_years && (
                    <Chip color="primary" variant="dot" className="text-white">
                      {personalInfo.experience_years} Years Experience
                    </Chip>
                  )}
                </div>
              </div>
              <Button
                color="default"
                variant="solid"
                startContent={<Icon icon="lucide:edit" className="w-5 h-5" />}
                onPress={() =>
                  handleOpenModal("personalInfo", "edit", personalInfo)
                }
                className="bg-white text-indigo-600 hover:bg-gray-100"
              >
                Edit Profile
              </Button>
            </div>
          </CardHeader>
          <CardBody className="p-6">
            <Progress
              value={
                [
                  personalInfo,
                  experiences.length,
                  education.length,
                  skills.length,
                  projects.length,
                  certifications.length,
                  resumes.length,
                ].filter(Boolean).length * 14.28
              }
              color="primary"
              showValueLabel
              label="Profile Completion"
              className="max-w-md mx-auto"
            />
          </CardBody>
        </Card>

        {/* Profile Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Personal Information */}
            <Card className="bg-white dark:bg-gray-800 shadow-md rounded-2xl">
              <CardBody className="p-6">
                {renderSectionHeader(
                  "Personal Information",
                  "lucide:user",
                  "personalInfo"
                )}
                <Divider className="my-4" />
                {loadingSection === "personalInfo" ? (
                  <Spinner size="lg" color="primary" className="mx-auto" />
                ) : personalInfo ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Summary
                      </p>
                      <p className="mt-1 text-gray-800 dark:text-gray-100">
                        {personalInfo.summary || "Not provided"}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Gender
                      </p>
                      <p className="mt-1 text-gray-800 dark:text-gray-100 capitalize">
                        {personalInfo.gender || "Not provided"}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Date of Birth
                      </p>
                      <p className="mt-1 text-gray-800 dark:text-gray-100">
                        {personalInfo.date_of_birth
                          ? new Date(
                              personalInfo.date_of_birth
                            ).toLocaleDateString()
                          : "Not provided"}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Languages
                      </p>
                      <p className="mt-1 text-gray-800 dark:text-gray-100">
                        {personalInfo.languages || "Not provided"}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Current Salary
                      </p>
                      <p className="mt-1 text-gray-800 dark:text-gray-100">
                        {personalInfo.current_salary
                          ? `$${personalInfo.current_salary.toLocaleString()}`
                          : "Not provided"}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Expected Salary
                      </p>
                      <p className="mt-1 text-gray-800 dark:text-gray-100">
                        {personalInfo.expected_salary
                          ? `$${personalInfo.expected_salary.toLocaleString()}`
                          : "Not provided"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                    Add your personal information to complete your profile.
                  </p>
                )}
              </CardBody>
            </Card>

            {/* Experience */}
            <Card className="bg-white dark:bg-gray-800 shadow-md rounded-2xl">
              <CardBody className="p-6">
                {renderSectionHeader(
                  "Experience",
                  "lucide:briefcase",
                  "experience"
                )}
                <Divider className="my-4" />
                {loadingSection === "experience" ? (
                  <Spinner size="lg" color="primary" className="mx-auto" />
                ) : experiences.length > 0 ? (
                  <div className="space-y-4">
                    {experiences.map((exp) => (
                      // <div
                      //   key={exp.id}
                      //   className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-transform duration-300 hover:-translate-y-1"
                      // >
                      //   <div className="flex justify-between items-start">
                      //     <div>
                      //       <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{exp.position}</h3>
                      //       <p className="text-gray-600 dark:text-gray-300">{exp.companyName}</p>
                      //       <p className="text-sm text-gray-500 dark:text-gray-400">
                      //         {new Date(exp.startDate).toLocaleDateString()} -{" "}
                      //         {exp.isCurrentJob ? "Present" : exp.endDate ? new Date(exp.endDate).toLocaleDateString() : ""}
                      //       </p>
                      //     </div>
                      //     <div className="flex gap-2">
                      //       <Tooltip content="Edit">
                      //         <Button
                      //           isIconOnly
                      //           variant="light"
                      //           onPress={() => handleOpenModal("experience", "edit", exp)}
                      //         >
                      //           <Icon icon="lucide:edit" className="w-5 h-5" />
                      //         </Button>
                      //       </Tooltip>
                      //       <Tooltip content="Delete">
                      //         <Button
                      //           isIconOnly
                      //           variant="light"
                      //           color="danger"
                      //           onPress={() => handleDelete("experience", exp.id)}
                      //         >
                      //           <Icon icon="lucide:trash" className="w-5 h-5" />
                      //         </Button>
                      //       </Tooltip>
                      //     </div>
                      //   </div>
                      //   {exp.jobDescription && (
                      //     <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{exp.jobDescription}</p>
                      //   )}
                      //   {exp.skills && (
                      //     <div className="mt-2 flex flex-wrap gap-2">
                      //       {exp.skills.split(",").map((skill, idx) => (
                      //         <Chip key={idx} color="primary" variant="flat" size="sm">
                      //           {skill}
                      //         </Chip>
                      //       ))}
                      //     </div>
                      //   )}
                      // </div>
                      <div
                        key={exp.id}
                        className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">
                              {exp.position}
                            </h3>
                            <p className="text-blue-600 font-medium">
                              {exp.companyName}
                            </p>
                            <p className="text-gray-600 text-sm">
                              {formatDate(exp.startDate)} -{" "}
                              {exp.isCurrentJob
                                ? "Present"
                                : formatDate(exp.endDate)}
                            </p>
                            <p className="text-gray-600 text-sm mb-2">
                              {exp.location}
                            </p>
                            {exp.jobDescription && (
                              <p className="text-gray-700 dark:text-gray-300 mt-2">
                                {exp.jobDescription}
                              </p>
                            )}
                            {exp.skills && exp.skills.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {exp.skills.split(",").map((skill, idx) => (
                                  <Chip
                                    key={idx}
                                    size="sm"
                                    variant="flat"
                                    color="primary"
                                  >
                                    {skill}
                                  </Chip>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Tooltip content="Edit">
                              <Button
                                isIconOnly
                                variant="light"
                                onPress={() =>
                                  handleOpenModal("experience", "edit", exp)
                                }
                              >
                                <Icon icon="lucide:edit" className="w-5 h-5" />
                              </Button>
                            </Tooltip>
                            <Tooltip content="Delete">
                              <Button
                                isIconOnly
                                variant="light"
                                color="danger"
                                onPress={() =>
                                  handleDelete("experience", exp.id)
                                }
                              >
                                <Icon icon="lucide:trash" className="w-5 h-5" />
                              </Button>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                    Add your work experience to showcase your career.
                  </p>
                )}
              </CardBody>
            </Card>

            {/* Education */}
            <Card className="bg-white dark:bg-gray-800 shadow-md rounded-2xl">
              <CardBody className="p-6">
                {renderSectionHeader(
                  "Education",
                  "lucide:graduation-cap",
                  "education"
                )}
                <Divider className="my-4" />
                {loadingSection === "education" ? (
                  <Spinner size="lg" color="primary" className="mx-auto" />
                ) : education.length > 0 ? (
                  // <div className="space-y-4">
                  //   {education.map((edu) => (
                  //     <div
                  //       key={edu.id}
                  //       className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-transform duration-300 hover:-translate-y-1"
                  //     >
                  //       <div className="flex justify-between items-start">
                  //         <div>
                  //           <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{edu.courseName}</h3>
                  //           <p className="text-gray-600 dark:text-gray-300">{edu.institutionName}</p>
                  //           <p className="text-sm text-gray-500 dark:text-gray-400">
                  //             {edu.educationLevel}{edu.specialization ? ` - ${edu.specialization}` : ""}
                  //           </p>
                  //           <p className="text-sm text-gray-500 dark:text-gray-400">
                  //             {new Date(edu.startDate).toLocaleDateString()} -{" "}
                  //             {edu.isCurrentlyStudying ? "Present" : edu.endDate ? new Date(edu.endDate).toLocaleDateString() : ""}
                  //           </p>
                  //         </div>
                  //         <div className="flex gap-2">
                  //           <Tooltip content="Edit">
                  //             <Button
                  //               isIconOnly
                  //               variant="light"
                  //               onPress={() => handleOpenModal("education", "edit", edu)}
                  //             >
                  //               <Icon icon="lucide:edit" className="w-5 h-5" />
                  //             </Button>
                  //           </Tooltip>
                  //           <Tooltip content="Delete">
                  //             <Button
                  //               isIconOnly
                  //               variant="light"
                  //               color="danger"
                  //               onPress={() => handleDelete("education", edu.id)}
                  //             >
                  //               <Icon icon="lucide:trash" className="w-5 h-5" />
                  //             </Button>
                  //           </Tooltip>
                  //         </div>
                  //       </div>
                  //       {edu.description && (
                  //         <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{edu.description}</p>
                  //       )}
                  //     </div>
                  //   ))}
                  // </div>
                  <div className="space-y-4">
                    {education.map((edu) => (
                      <div
                        key={edu.id}
                        className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">
                              {edu.courseName}
                            </h3>
                            <p className="text-green-600 font-medium">
                              {edu.institutionName}
                            </p>
                            <p className="text-gray-600 text-sm">
                              {edu.educationLevel}{" "}
                              {edu.specialization && `in ${edu.specialization}`}
                            </p>
                            <p className="text-gray-600 text-sm">
                              {formatDate(edu.startDate)} -{" "}
                              {edu.isCurrentlyStudying
                                ? "Present"
                                : formatDate(edu.endDate)}
                            </p>
                            {edu.grade && (
                              <p className="text-gray-600 text-sm">
                                Grade: {edu.grade}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Tooltip content="Edit">
                              <Button
                                isIconOnly
                                variant="light"
                                onPress={() =>
                                  handleOpenModal("education", "edit", edu)
                                }
                              >
                                <Icon icon="lucide:edit" className="w-5 h-5" />
                              </Button>
                            </Tooltip>
                            <Tooltip content="Delete">
                              <Button
                                isIconOnly
                                variant="light"
                                color="danger"
                                onPress={() =>
                                  handleDelete("education", edu.id)
                                }
                              >
                                <Icon icon="lucide:trash" className="w-5 h-5" />
                              </Button>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                    Add your education details to highlight your qualifications.
                  </p>
                )}
              </CardBody>
            </Card>

            {/* Projects */}
            <Card className="bg-white dark:bg-gray-800 shadow-md rounded-2xl">
              <CardBody className="p-6">
                {renderSectionHeader("Projects", "lucide:folder", "projects")}
                <Divider className="my-4" />
                {loadingSection === "projects" ? (
                  <Spinner size="lg" color="primary" className="mx-auto" />
                ) : projects.length > 0 ? (
                  <div className="space-y-4">
                    {projects.map((project) => (
                      <div
                        key={project.id}
                        className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">
                              {project.projectTitle}
                            </h3>
                            {project.linkedTo && (
                              <p className="text-orange-600 font-medium">
                                {project.linkedTo}
                              </p>
                            )}
                            <p className="text-gray-600 text-sm">
                              {formatDate(project.workedFrom)} -{" "}
                              {project.isCurrentProject
                                ? "Present"
                                : formatDate(project.workedTo)}
                            </p>
                            {project.projectDetails && (
                              <p className="text-gray-700 dark:text-gray-300 mt-2">
                                {project.projectDetails}
                              </p>
                            )}
                            <div className="flex gap-4 mt-2">
                              {project.gitRepoLink && (
                                <a
                                  href={project.gitRepoLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                                >
                                  <Icon
                                    icon="lucide:github"
                                    className="w-4 h-4"
                                  />
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
                                  <Icon
                                    icon="lucide:external-link"
                                    className="w-4 h-4"
                                  />
                                  Demo
                                </a>
                              )}
                            </div>
                            {project.tags && project.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {project.tags.map((tag, idx) => (
                                  <Chip
                                    key={idx}
                                    size="sm"
                                    variant="flat"
                                    color="warning"
                                  >
                                    {tag.name}
                                  </Chip>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Tooltip content="Edit">
                              <Button
                                isIconOnly
                                variant="light"
                                onPress={() =>
                                  handleOpenModal("projects", "edit", project)
                                }
                              >
                                <Icon icon="lucide:edit" className="w-5 h-5" />
                              </Button>
                            </Tooltip>
                            <Tooltip content="Delete">
                              <Button
                                isIconOnly
                                variant="light"
                                color="danger"
                                onPress={() =>
                                  handleDelete("projects", project.id)
                                }
                              >
                                <Icon icon="lucide:trash" className="w-5 h-5" />
                              </Button>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                    Add projects to highlight your work.
                  </p>
                )}
              </CardBody>
            </Card>

            {/* Certifications */}
            <Card className="bg-white dark:bg-gray-800 shadow-md rounded-2xl">
              <CardBody className="p-6">
                {renderSectionHeader(
                  "Certifications",
                  "lucide:award",
                  "certifications"
                )}
                <Divider className="my-4" />
                {loadingSection === "certifications" ? (
                  <Spinner size="lg" color="primary" className="mx-auto" />
                ) : certifications.length > 0 ? (
                  <div className="space-y-4">
                    {certifications.map((cert) => (
                      <div
                        key={cert.id}
                        className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">
                              {cert.name}
                            </h3>
                            <p className="text-yellow-600 font-medium">
                              {cert.issuingOrganization}
                            </p>
                            <p className="text-gray-600 text-sm">
                              Issued: {formatDate(cert.issueDate)}
                              {cert.expiryDate &&
                                ` • Expires: ${formatDate(cert.expiryDate)}`}
                            </p>
                            {cert.credentialId && (
                              <p className="text-gray-600 text-sm">
                                ID: {cert.credentialId}
                              </p>
                            )}
                            {cert.credentialUrl && (
                              <a
                                href={cert.credentialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1 mt-1"
                              >
                                <Icon
                                  icon="lucide:external-link"
                                  className="w-4 h-4"
                                />
                                View Credential
                              </a>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Tooltip content="Edit">
                              <Button
                                isIconOnly
                                variant="light"
                                onPress={() =>
                                  handleOpenModal("certifications", "edit", cert)
                                }
                              >
                                <Icon icon="lucide:edit" className="w-5 h-5" />
                              </Button>
                            </Tooltip>
                            <Tooltip content="Delete">
                              <Button
                                isIconOnly
                                variant="light"
                                color="danger"
                                onPress={() =>
                                  handleDelete("certifications", cert.id)
                                }
                              >
                                <Icon icon="lucide:trash" className="w-5 h-5" />
                              </Button>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                    Add certifications to boost your credentials.
                  </p>
                )}
              </CardBody>
            </Card>

            {/* Resume */}
            <Card className="bg-white dark:bg-gray-800 shadow-md rounded-2xl">
              <CardBody className="p-6">
                {renderSectionHeader("Resume", "lucide:file-text", "resume")}
                <Divider className="my-4" />
                {loadingSection === "resume" ? (
                  <Spinner size="lg" color="primary" className="mx-auto" />
                ) : resumes.length > 0 ? (
                  <div className="space-y-3">
                    {resumes.map((resume) => (
                      <div
                        key={resume.id}
                        className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Icon
                            icon="lucide:file-text"
                            className="w-8 h-8 text-red-600"
                          />
                          <div>
                            <h4 className="font-medium">{resume.title}</h4>
                            <p className="text-sm text-gray-600">
                              {resume.fileType} • {formatDate(resume.createdAt)}
                              {resume.isDefault && (
                                <Chip
                                  size="sm"
                                  color="success"
                                  className="ml-2"
                                >
                                  Default
                                </Chip>
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
                            onPress={() => handleEdit("resume", resume)}
                          >
                            <Icon icon="lucide:edit" className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                    Upload your resume to share with employers.
                  </p>
                )}
              </CardBody>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Skills */}
            <Card className="bg-white dark:bg-gray-800 shadow-md rounded-2xl">
              <CardBody className="p-6">
                {renderSectionHeader("Skills", "lucide:code", "skills")}
                {loadingSection === "skills" ? (
                  <Spinner size="lg" color="primary" className="mx-auto" />
                ) : skills.length > 0 ? (
                  <div className="space-y-4">
                    {skills.map((skill) => (
                      <div key={skill.id}>
                        <Divider className="my-4" />
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                              {skill.skill.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {skill.skill.category || "General"}
                            </p>
                            <Progress
                              value={
                                skill.proficiencyLevel === "Beginner"
                                  ? 33
                                  : skill.proficiencyLevel === "Intermediate"
                                  ? 66
                                  : 100
                              }
                              showValueLabel
                              color="primary"
                              size="sm"
                              className="mt-2"
                            />
                          </div>
                          <div className="flex gap-2">
                            <Tooltip content="Edit">
                              <Button
                                isIconOnly
                                variant="light"
                                onPress={() =>
                                  handleOpenModal("skills", "edit", skill)
                                }
                              >
                                <Icon icon="lucide:edit" className="w-5 h-5" />
                              </Button>
                            </Tooltip>
                            <Tooltip content="Delete">
                              <Button
                                isIconOnly
                                variant="light"
                                color="danger"
                                onPress={() => handleDelete("skills", skill.id)}
                              >
                                <Icon icon="lucide:trash" className="w-5 h-5" />
                              </Button>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                    Add skills to showcase your expertise.
                  </p>
                )}
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Form Modal */}
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size="2xl"
          scrollBehavior="inside"
          className="bg-white dark:bg-gray-800 rounded-2xl"
        >
          <ModalContent>
            <ModalHeader className="flex gap-3 items-center border-b border-gray-200 dark:border-gray-700">
              <Icon
                icon={
                  currentSection === "personalInfo"
                    ? "lucide:user"
                    : currentSection === "experience"
                    ? "lucide:briefcase"
                    : currentSection === "education"
                    ? "lucide:graduation-cap"
                    : currentSection === "skills"
                    ? "lucide:code"
                    : currentSection === "projects"
                    ? "lucide:folder"
                    : currentSection === "certifications"
                    ? "lucide:award"
                    : "lucide:file-text"
                }
                className="w-6 h-6 text-indigo-600"
              />
              <span className="text-xl font-semibold">
                {modalType === "add" ? "Add" : "Edit"}{" "}
                {currentSection.charAt(0).toUpperCase() +
                  currentSection.slice(1)}
              </span>
            </ModalHeader>
            <ModalBody className="py-6">
              {currentSection === "personalInfo" && (
                <PersonalInfo
                  onSave={handleSave}
                  initialData={modalType === "edit" ? currentItem : null}
                  showModal={showAlert}
                />
              )}
              {currentSection === "experience" && (
                <Experience
                  onSave={handleSave}
                  initialData={modalType === "edit" ? currentItem : {}}
                  showModal={showAlert}
                />
              )}
              {currentSection === "education" && (
                <Education
                  onSave={handleSave}
                  initialData={modalType === "edit" ? currentItem : {}}
                  showModal={showAlert}
                />
              )}
              {currentSection === "skills" && (
                <Skills
                  onSave={handleSave}
                  initialData={modalType === "edit" ? currentItem : {}}
                  showModal={showAlert}
                  isEditing={true}
                />
              )}
              {currentSection === "projects" && (
                <Projects
                  onSave={handleSave}
                  initialData={modalType === "edit" ? currentItem : {}}
                  showModal={showAlert}
                />
              )}
              {currentSection === "certifications" && (
                <Certifications
                  onSave={handleSave}
                  initialData={modalType === "edit" ? currentItem : {}}
                  showModal={showAlert}
                />
              )}
              {currentSection === "resume" && (
                <Resume
                  onSave={handleSave}
                  initialData={modalType === "edit" ? currentItem : {}}
                  showModal={showAlert}
                />
              )}
            </ModalBody>
            {/* <ModalFooter className="border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="flat"
                onPress={onClose}
                className="bg-gray-200 dark:bg-gray-700"
              >
                Cancel
              </Button>
            </ModalFooter> */}
          </ModalContent>
        </Modal>

        {/* Alert Modal */}
        <Modal
          isOpen={alertModal.isOpen}
          onClose={closeAlert}
          className="bg-white dark:bg-gray-800 rounded-2xl"
        >
          <ModalContent>
            <ModalHeader className="flex gap-3 items-center border-b border-gray-200 dark:border-gray-700">
              <Icon
                icon={
                  alertModal.type === "success"
                    ? "lucide:check-circle"
                    : "lucide:alert-circle"
                }
                className={`w-6 h-6 ${
                  alertModal.type === "success"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              />
              <span className="text-lg font-semibold">{alertModal.title}</span>
            </ModalHeader>
            <ModalBody className="py-6">
              <p className="text-gray-600 dark:text-gray-300">
                {alertModal.message}
              </p>
            </ModalBody>
            <ModalFooter className="border-t border-gray-200 dark:border-gray-700">
              <Button
                color={alertModal.type === "success" ? "success" : "danger"}
                variant="flat"
                onPress={closeAlert}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default ProfilePage;

