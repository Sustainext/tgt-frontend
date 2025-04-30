"use client";
import React, { useState,useEffect } from "react";
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
import { useSearchParams } from "next/navigation"; // Import useSearchParams
import {MdChevronRight } from "react-icons/md";
import Link from "next/link";
import {
  setHeadertext1,
  setHeadertext2,
  setHeaderdisplay,
  setMiddlename
} from "../../../../lib/redux/features/topheaderSlice";
const AddNewUser = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const dispatch = useDispatch();
  const searchParams = useSearchParams(); // Get search params
  const edit = searchParams.get("edit"); // Extract the 'edit' parameter

  const handleNext = (newData) => {
 
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
  useEffect(() => {

    if (edit === "true") {
      dispatch(setHeadertext1("User"));
      dispatch(setHeaderdisplay("none"));
      dispatch(setHeadertext2("Manage Users"));
      dispatch(setMiddlename("Social"));
     
    } else {
      dispatch(setHeadertext1("User"));
      dispatch(setHeaderdisplay("none"));
      dispatch(setHeadertext2("Create New User"));
      dispatch(setMiddlename("Social"));
 
    }
  }, [dispatch, edit]);
  return (
    <>
      <ToastContainer />
      <div className="w-full xl:px-6 md:px-2 py-4 border-b border-[#edeae9] justify-between items-center inline-flex mt-2">
        <div className="flex-col justify-start items-start gap-1 inline-flex">
          {/* Conditionally render heading based on 'edit' parameter */}
          {!edit && (
            <div className="text-[#727272] text-[11px] font-semibold font-['Manrope'] leading-none mb-1">
              Users
            </div>
          )}
          <div className="relative">
            <div className="gradient-text text-[22px] font-medium font-['Manrope'] leading-relaxed">
              {edit === "true" ? "Manage Users" : "Create New User"}
            </div>
          </div>
        </div>
        <div className="w-[19px] h-[9px]" />
    
      </div>
      <div className="container  xl:px-8 lg:px-8 md:px-2 2k:px-8 4k:px-8 mx-2 pb-10">
      {edit && (
          <Link href="/dashboard/Users/manage-users" className="text-[#007EEF] text-[12px] flex mt-5"> 
          <div className="flex">
          <MdChevronRight className=" rotate-180 text-[20px] mt-1" />
            <span className="text-[18px] font-['Manrope'] font-semibold">Back</span>
           
            </div>
            </Link>
          )}
   
        <ProgressBar currentStep={currentStep} />
        {currentStep === 1 && <PersonalDetailsForm onNext={handleNext} />}
        {currentStep === 2 && (
          <OrganizationDetailsForm onNext={handleNext} onPrev={handlePrev} />
        )}
        {currentStep === 3 && (
          <PermissionsForm
            onPrev={handlePrev}
            // onNext={handleFinalize}
            reset={resetCurrentStep}
          />
        )}
      </div>
    </>
  );
};

export default AddNewUser;
