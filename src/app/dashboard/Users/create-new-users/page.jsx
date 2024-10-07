"use client";
import React, { useState } from "react";
import ProgressBar from "../common/Progressbar";
import PersonalDetailsForm from "./forms/UserDetails";
import OrganizationDetailsForm from "./forms/OrganizationDetails";
import PermissionsForm from "./forms/PermissionsForm";
import { useDispatch } from "react-redux";
import {
  addUser,
  setPersonalDetails,
  setOrganizationDetails,
  setPermissions,
} from "../../../../lib/redux/features/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddNewUser = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const dispatch = useDispatch();

  const handleNext = (newData) => {
    if (currentStep === 1) {
      dispatch(setPersonalDetails(newData));
    } else if (currentStep === 2) {
      dispatch(setOrganizationDetails(newData));
    }
    setCurrentStep(currentStep + 1);
  };

  const handleFinalize = (newData) => {
    dispatch(setPermissions(newData));
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const resetCurrentStep = () => {
    setCurrentStep(1);
  };

  return (
    <>
      <ToastContainer />
      <div className="w-full px-6 py-4 border-b border-[#edeae9] justify-between items-center inline-flex mt-2">
        <div className="flex-col justify-start items-start gap-1 inline-flex">
          <div className="text-[#727272] text-[11px] font-semibold font-['Manrope'] leading-none mb-1">
            Users
          </div>
          <div className="relative">
            <div className="gradient-text text-[22px] font-medium font-['Manrope'] leading-relaxed">
              Create New User
            </div>
          </div>
        </div>
        <div className="w-[19px] h-[9px]" />
      </div>
      <div className="container mx-auto px-8 pb-10">
        <ProgressBar currentStep={currentStep} />
        {currentStep === 1 && <PersonalDetailsForm onNext={handleNext} />}
        {currentStep === 2 && (
          <OrganizationDetailsForm onNext={handleNext} onPrev={handlePrev} />
        )}
        {currentStep === 3 && (
          <PermissionsForm
            onPrev={handlePrev}
            onNext={handleFinalize}
            reset={resetCurrentStep}
          />
        )}
      </div>
    </>
  );
};

export default AddNewUser;
