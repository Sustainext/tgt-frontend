"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; // Import useDispatch and useSelector
import { useSearchParams } from "next/navigation"; // Import from Next.js
import { MdPerson, MdChevronRight } from "react-icons/md";
import {
  setfirstname,
  setlastname,
  setjobtitle,
  setdepartment,
  setworkemail,
  setroletype,
  setphonenumber
} from "../../../../../lib/redux/features/roles-permissionsSlice"; // Import your actions

const PersonalDetailsForm = ({ onNext }) => {
  const dispatch = useDispatch(); // Initialize useDispatch
  const [errors, setErrors] = useState({});

  // Use useSelector to get the current values from the Redux state
  const {
    first_name,
    last_name,
    work_email,
    phone_number,
    role_type,
    job_title,
    department,
  } = useSelector((state) => state.roleprmission); // Access your slice

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Dispatch based on the name of the input field
    switch (name) {
      case "firstName":
        dispatch(setfirstname(value));
        break;
      case "lastName":
        dispatch(setlastname(value));
        break;
      case "jobTitle":
        dispatch(setjobtitle(value));
        break;
      case "department":
        dispatch(setdepartment(value));
        break;
      case "email":
        dispatch(setworkemail(value));
        break;
      case "roleType":
        dispatch(setroletype(value));
        break;
        case "phoneNumber":
          dispatch(setphonenumber(value));
          break;
      default:
        break;
    }
  };

  // Updated to reject public domains like Gmail, Yahoo, and Outlook
  const validateEmail = (email) => {
    const publicDomains = ["gmail.com", "yahoo.com"];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const domain = email.split("@")[1];
    return emailRegex.test(email) && !publicDomains.includes(domain);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!first_name) {
      newErrors.firstName = "First Name is required";
    }
    if (!last_name) {
      newErrors.lastName = "Last Name is required";
    }
    if (!work_email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(work_email)) {
      newErrors.email = "Public domain emails (Gmail, Yahoo) are not allowed";
    }
    if (!role_type) {
      newErrors.roleType = "Role Type is required";
    }
    if (!job_title) {
      newErrors.jobTitle = "Job Title is required";
    }
    if (!department) {
      newErrors.department = "Department is required";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      onNext({
        first_name,
        last_name,
        work_email,
        phone_number,
        role_type,
        job_title,
        department,
      });
    }
  };

  const searchParams = useSearchParams(); // Get search params using Next.js API
  const edit = searchParams.get("edit") === "true"; // Read search param
  const currentUser = useSelector((state) => state.roleprmission.userlist);

  useEffect(() => {
    if (edit && currentUser) {
      // Prefill form fields with current user's details if editing
      dispatch(setfirstname(currentUser.first_name || ""));
      dispatch(setlastname(currentUser.last_name || ""));
      dispatch(setworkemail(currentUser.work_email || ""));
      dispatch(setroletype(currentUser.custom_role || ""));
      dispatch(setjobtitle(currentUser.job_title || ""));
      dispatch(setdepartment(currentUser.department || ""));
      dispatch(setphonenumber(currentUser.phone_number || ""));
    } else {
      // Clear form fields if not editing
      dispatch(setfirstname(""));
      dispatch(setlastname(""));
      dispatch(setworkemail(""));
      dispatch(setroletype(""));
      dispatch(setjobtitle(""));
      dispatch(setdepartment(""));
      dispatch(setphonenumber(""));
    }
  }, [edit, currentUser, dispatch]);

  return (
    <>
      <div className="flex justify-items-center items-center gap-2 mt-6 mb-2">
        <MdPerson className="text-[#68737D] text-[18px]" />
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
              value={first_name}
              onChange={handleChange}
              className={`form-input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-[12px] ${edit ? 'bg-gray-200' : ''}`}
              readOnly={edit} // Make this field read-only when editing
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
            )}
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
              value={last_name}
              onChange={handleChange}
              className={`form-input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-[12px] ${edit ? 'bg-gray-200' : ''}`}
              readOnly={edit} // Make this field read-only when editing
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
            )}
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
              value={work_email}
              onChange={handleChange}
              className={`form-input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-[12px] ${edit ? 'bg-gray-200' : ''}`}
              readOnly={edit} // Make this field read-only when editing
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
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
              value={phone_number}
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
              value={role_type}
              onChange={handleChange}
              className="form-input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-[12px] text-gray-400"
            >
              <option value="" disabled>
                Select Role Type
              </option>
              <option value="Manager">Manager</option>
              <option value="Employee">Employee</option>
            </select>
            {errors.roleType && (
              <p className="text-red-500 text-xs mt-1">{errors.roleType}</p>
            )}
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
              value={department}
              onChange={handleChange}
              className="form-input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-[12px] text-gray-400"
            >
              <option value="" disabled>
                Select Department
              </option>
              <option value="Operations">Operations</option>
              <option value="Human Resources">Human Resources</option>
            </select>
            {errors.department && (
              <p className="text-red-500 text-xs mt-1">{errors.department}</p>
            )}
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
              value={job_title}
              onChange={handleChange}
              className="form-input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-[12px] "
            />
            {errors.jobTitle && (
              <p className="text-red-500 text-xs mt-1">{errors.jobTitle}</p>
            )}
          </div>
       
        </div>
        <div className="float-end">
          <button
            type="submit"
            className="mt-4 w-[120px] bg-[#007eef] hover:shadow-lg text-white font-bold py-2 px-4 rounded flex justify-center items-center gap-2 shadow"
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
