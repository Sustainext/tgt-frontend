"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation"; // Import from Next.js
import { MdPerson, MdChevronRight } from "react-icons/md";

const PersonalDetailsForm = ({ onNext }) => {
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    roleType: "",
    jobTitle: "",
    department: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ ...details });
  };

  // Edit user
  const searchParams = useSearchParams(); // Get search params using Next.js API

  const edit = searchParams.get("edit") === "true"; // Read search param
  const currentUser = useSelector((state) => state.users.currentUser);

  useEffect(() => {
    if (edit && currentUser?.personalDetails) {
      setDetails({
        firstName: currentUser.personalDetails.firstName || "",
        lastName: currentUser.personalDetails.lastName || "",
        email: currentUser.personalDetails.email || "",
        phoneNumber: currentUser.personalDetails.phoneNumber || "",
        roleType: currentUser.personalDetails.roleType || "",
        jobTitle: currentUser.personalDetails.jobTitle || "",
        department: currentUser.personalDetails.department || "",
        status: currentUser.personalDetails.status || "Active",
      });
    }
  }, [edit, currentUser]);

  return (
    <>
      <div className="flex justify-items-center items-center gap-2 mt-6 mb-2">
        <MdPerson className="text-[#68737D] text-[18px]"/>
        <div className="text-[#0f1728] text-[18px] font-medium font-['Manrope'] leading-7">
          Personal Details
        </div>
      </div>
      <div className="text-[#667084] text-[14px] font-normal font-['Manrope'] leading-tight mb-6">
        Please fill the personal details of the user.
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-[14px] font-medium text-gray-600"
            >
              First Name*
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              value={details.firstName}
              onChange={handleChange}
              className="form-input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-[12px]"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-[14px] font-medium text-gray-600"
            >
              Last Name*
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={details.lastName}
              onChange={handleChange}
              className="form-input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-[12px]"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-[14px] font-medium text-gray-600"
            >
              Work Email*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Work Email"
              value={details.email}
              onChange={handleChange}
              className="form-input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-[12px] "
            />
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-[14px] font-medium text-gray-600"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Phone Number"
              value={details.phoneNumber}
              onChange={handleChange}
              className="form-input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-[12px] "
            />
          </div>
          <div>
            <label
              htmlFor="roleType"
              className="block text-[14px] font-medium text-gray-600"
            >
              Role Type*
            </label>
            <select
              id="roleType"
              name="roleType"
              value={details.roleType}
              onChange={handleChange}
              className="form-input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-[12px] text-gray-400"
            >
             <option value="" disabled selected className="text-gray-400">Select Role Type</option>
              <option value="Manager" className="text-black">Manager</option>
              <option value="Employee" className="text-black">Employee</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="jobTitle"
              className="block text-[14px] font-medium text-gray-600"
            >
              Job Title*
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              placeholder="Job Title"
              value={details.jobTitle}
              onChange={handleChange}
              className="form-input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-[12px] "
            />
          </div>
          <div>
            <label
              htmlFor="department"
              className="block text-[14px] font-medium text-gray-600"
            >
              Department*
            </label>
            <select
              id="department"
              name="department"
              value={details.department}
              onChange={handleChange}
              className="form-input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-[12px] text-gray-400"
            >
              <option value="" disabled selected className="text-gray-400">Select Department</option>
              <option value="operations" className="text-black">Operations</option>
              <option value="hr" className="text-black">Human Resources</option>
            </select>
          </div>
        </div>
        <div className=" float-end">
          <button
            type="submit"
            className="mt-4 w-[12opx] bg-[#007eef] hover:shadow-lg text-white font-bold py-2 px-4 rounded flex justify-center items-center gap-2 shadow"
          >
            <span className="text-[12px] font-['Manrope']">Next</span>
            <MdChevronRight />
          </button>
        </div>
      </form>
    </>
  );
};

export default PersonalDetailsForm;
