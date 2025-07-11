"use client";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Button, Spinner, Card, CardHeader, CardBody, Divider, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Progress, useDisclosure } from "@heroui/react";
import PersonalInfo from "@/components/profile-completion/PersonalInfo";
import Preferences from "@/components/profile-completion/Preferences";
import Experience from "@/components/profile-completion/Experience";
import Education from "@/components/profile-completion/Education";
import Projects from "@/components/profile-completion/Projects";
import Certifications from "@/components/profile-completion/Certifications";
import Skills from "@/components/profile-completion/Skills";
import Resume from "@/components/profile-completion/Resume";

import { getUnfilledSections } from "@/services/jobSeekerService";

const Items = () => {
  return <div>Items</div>;
};

const Avatar = () => {
  return <div>Avatar</div>
}

const stepsInfo = {
  personalInfo: { id: "personal-info", title: "Personal Info", icon: "mdi:account", component: PersonalInfo },
  preferences: { id: "preferences", title: "Preferences", icon: "mdi:settings", component: Preferences },
  experience: { id: "experience", title: "Experience", icon: "mdi:briefcase", component: Experience },
  education: { id: "education", title: "Education", icon: "mdi:school", component: Education },
  project: { id: "projects", title: "Projects", icon: "mdi:code-tags", component: Projects },
  certifications: {
    id: "certifications",
    title: "Certifications",
    icon: "mdi:certificate",
    component: Certifications,
  },
  skills : { id: "skills", title: "Skills", icon: "mdi:star-circle-outline", component: Skills },
  items: { id: "items", title: "Assets", icon: "mdi:package-variant", component: Items },
  resume: { id: "resume", title: "Resume", icon:"mdi:file", component: Resume},
  avatar: {id: "avatar", title: "Profile Picture", icon:"mdi:user", component: Avatar}
};

const ProfileCompletion = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [steps, setSteps] = useState([]);
  const [fetchingUnfilledSections, setFetchingUnfilledSections] = useState(false);
  const {isOpen, onOpen, onClose} = useDisclosure();

  const [modalData, setModalData] = useState({
    title: "",
    message: "",
    type: "success",
  });

  const showModal = (title, message, type = "success") => {
    setModalData({ title, message, type });
    onOpen();
  };

  useEffect(() => {
    const fetchUnfilledSections = async () => {
      setFetchingUnfilledSections(true);
      const response = await getUnfilledSections();
      if(response.data.success){
        const {unfilledSections} = response.data;
        const sections = unfilledSections.map(section => stepsInfo[section]);
        setSteps(sections)
      }
      else if(!response.data.success && response.data.noProfile){
        const sections = Object.values(stepsInfo);
        setSteps(sections);
      }
      setFetchingUnfilledSections(false);
    }

    fetchUnfilledSections();
  }, []);
  const handleSave = async (data) => {
    setFormData((prev) => ({
      ...prev,
      [steps[currentStep].id]: data,
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  if(fetchingUnfilledSections){
    return <div className="flex justify-center items-center h-screen">
      <Spinner className="text-center" label="Fetching unfilled sections..." size="lg" />
    </div>
  }

  const CurrentStepComponent = steps[currentStep]?.component;

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//             Complete Your Profile
//           </h1>
//           <p className="mt-2 text-gray-600 dark:text-gray-400">
//             Fill in your details to create a compelling profile that stands out to
//             employers.
//           </p>
//         </div>

//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
//           <div className="p-4 border-b border-gray-200 dark:border-gray-700">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <Icon
//                   icon={steps[currentStep]?.icon}
//                   className="w-5 h-5 text-blue-600"
//                 />
//                 <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
//                   {steps[currentStep]?.title}
//                 </h2>
//               </div>
//               <div className="text-sm text-gray-500 dark:text-gray-400">
//                 Step {currentStep + 1} of {steps.length}
//               </div>
//             </div>
//           </div>

//           <div className="p-6">
//             {CurrentStepComponent && (
//               <CurrentStepComponent
//                 onNext={handleNext}
//                 onSave={handleSave}
//                 initialData={formData[steps[currentStep]?.id]}
//               />
//             )}
//           </div>

//           <div className="p-4 border-t border-gray-200 dark:border-gray-700">
//             <div className="flex justify-between">
//               <Button
//                 variant="flat"
//                 onPress={handlePrevious}
//                 isDisabled={currentStep === 0}
//                 startContent={
//                   <Icon icon="lucide:arrow-left" className="w-4 h-4" />
//                 }
//               >
//                 Previous
//               </Button>
//               <div className="flex gap-2">
//                 {steps.map((step, index) => (
//                   <div
//                     key={step.id}
//                     className={`w-2 h-2 rounded-full ${
//                       index === currentStep
//                         ? "bg-blue-600"
//                         : index < currentStep
//                         ? "bg-green-500"
//                         : "bg-gray-300 dark:bg-gray-600"
//                     }`}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-900 py-8">
  <div className="max-w-4xl mx-auto p-6">
    <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <CardHeader className="pb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-large">
        {!fetchingUnfilledSections && (
        <div className="flex flex-col space-y-6 w-full">
          <div className="text-center">
            <h1 className="text-3xl font-bold flex items-center justify-center gap-3">
              <Icon icon="lucide:user-circle" className="w-8 h-8" />
              Complete Your Professional Profile
            </h1>
            <p className="text-blue-100 mt-2">
              Build a comprehensive profile to attract the right
              opportunities
            </p>
          </div>

          <Progress
            label={`Step ${currentStep + 1} of ${steps.length}`}
            showValueLabel={true}
            value={Math.round(((currentStep + 1)/ steps.length) * 100)}
            formatOptions={{ style: "percent" }}
            color='success'
          />
          {/* Step Navigation */}
          <div className="flex justify-center gap-4 flex-wrap">
            {steps.map((step, index) => (
              <div className="flex flex-col items-center" key={step?.title}>
              <Button
                key={index}
                color={
                  index === currentStep
                    ? "warning"
                    : index < currentStep
                    ? "success"
                    : "default"
                }
                variant={index <= currentStep ? "solid" : "bordered"}
                // startContent={}
                isIconOnly
                size="sm"
                className={`cursor-pointer transition-all duration-200 rounded-full ${
                  index === currentStep ? "scale-110 shadow-lg" : ""
                } ${index < currentStep ? "opacity-80" : ""}`}
                onPress={() => setCurrentStep(index)}
              >
                {<Icon icon={step?.icon} className="w-4 h-4" />}
              </Button>
              <span className="text-sm">{step?.title}</span>
              </div>
            ))}
            
          </div>
        </div>
        )}
      </CardHeader>

      <CardBody className="p-8">
        {fetchingUnfilledSections && (
          <div className="text-center flex justify-center items-center h-full">
            <Spinner size="md" label="Fetching unfilled sections..." />
          </div>
        )}
        {!fetchingUnfilledSections && (
        <div
          className="space-y-8"
        >
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <Icon
                  icon={steps[currentStep]?.icon}
                  className="w-6 h-6 text-white"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {steps[currentStep]?.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Step {currentStep + 1} of {steps.length}
                </p>
              </div>
            </div>

            {CurrentStepComponent && (
              <CurrentStepComponent
                onNext={handleNext}
                onSave={handleSave}
                initialData={formData[steps[currentStep]?.id]}
                prevStep={prevStep}
                currentStep={currentStep}
                steps={steps}
                showModal={showModal}
                nextStep={nextStep}
                profileCompletion={true}
              />
            )}
          </div>
        </div>
        )}
      </CardBody>
    </Card>

    {/* Success/Error Modal */}
    <Modal isOpen={isOpen} onClose={onClose} backdrop="blur">
      <ModalContent>
        <ModalHeader className="flex gap-3 items-center">
          <div
            className={`p-2 rounded-full ${
              modalData.type === "success" ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <Icon
              icon={
                modalData.type === "success"
                  ? "lucide:check-circle"
                  : "lucide:alert-circle"
              }
              className={`w-6 h-6 ${
                modalData.type === "success"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            />
          </div>
          <span className="text-lg font-semibold">{modalData?.title}</span>
        </ModalHeader>
        <ModalBody>
          <p className="text-gray-600 dark:text-gray-400">
            {modalData?.message}
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            variant="flat"
            onPress={onClose}
            className="min-w-[80px]"
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>

    {/* Completion Summary */}
    {currentStep === steps.length - 1 && (
      <Card className="mt-8 shadow-lg border-0 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
              <Icon
                icon="lucide:clipboard-check"
                className="w-6 h-6 text-white"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-900 dark:text-green-100">
                Profile Completion Summary
              </h3>
              <p className="text-sm text-green-700 dark:text-green-300">
                Review your progress across all sections
              </p>
            </div>
          </div>
        </CardHeader>
        <CardBody className="pt-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div
                  className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-200 group-hover:scale-105 ${
                    formData[steps[index]?.id]
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  }`}
                >
                    <Icon icon={step?.icon} className="w-7 h-7" />
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  {step?.title}
                </p>
                <div className="flex items-center justify-center gap-1">
                  <Icon
                    icon={
                      formData[steps[index]?.id]
                        ? "lucide:check-circle"
                        : "lucide:clock"
                    }
                    className={`w-3 h-3 ${
                      formData[steps[index]?.id] ? "text-green-500" : "text-gray-400"
                    }`}
                  />
                  <p
                    className={`text-xs ${
                      formData[steps[index]?.id] ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {formData[steps[index]?.id] ? "Completed" : "Pending"}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Icon
                icon="lucide:lightbulb"
                className="w-5 h-5 text-amber-500"
              />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Pro Tip
              </p>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Complete all sections to maximize your profile visibility and
              attract better job opportunities
            </p>
          </div>
        </CardBody>
      </Card>
    )}
  </div>
</div>
)
}

export default ProfileCompletion;
