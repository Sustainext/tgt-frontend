import React from "react";
import {
  MdClose,
  MdCorporateFare,
  MdOutlineSecurity,
  MdCheckCircle,
  MdPerson,
} from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import Moment from 'react-moment';
const UserProfile = ({ onClose, user }) => {
  return (
    <div className="relative bg-white px-6 py-4  w-full xl:max-h-[95vh] min-h-[92vh] max-h-[110vh] overflow-y-auto scrollable-content   pb-4">
      {/* Close button in top-right corner */}
  

      {/* Header Section */}
      <div className="flex">
      <h2 className="text-[18px] font-semibold"> User Profile</h2>
      <button onClick={onClose} className="absolute right-3">
        <MdClose />
      </button>
      </div>
   

      {/* User Role */}
      <div className="mt-6 flex items-center">
        <span className="text-gray-700 font-medium flex text-[14px]">
          <MdPerson className="text-gray-500 text-[18px]" /> User Role
        </span>
        <div
  className={`ml-2 rounded-[4px] px-2 py-1 text-[11px] font-bold w-[74px]  text-center capitalize ${
    user.custom_role === 'Employee' ? 'text-[#0057A5] bg-blue-200' : user.admin === true ? 'text-[#9823DF] bg-purple-100' :'text-[#EF007E] bg-pink-100'
  }`}
>
  {user.custom_role|| 'Manager'}
</div>
      </div>

      {/* User Details Section */}
      <div className="my-6">
        <div className="grid grid-cols-2 gap-4 justify-items-end text-sm">
          <div className="justify-self-start">
            <div className="font-semibold text-[13px]">
              {user.first_name}{" "}
              {user.last_name || ""}
            </div>
            <div className="text-gray-500 text-left text-[13px]">
              {user.email || ""}
            </div>
          </div>
          <div>
            <div className="text-[13px] font-semibold">Created on</div>
            <div className=" text-gray-500 text-[13px]">
            <Moment format="DD-MM-YYYY">{user?.date_joined && new Date(user.date_joined)}</Moment>
             
            </div>
          </div>
          <div className="justify-self-start">
            <div className="font-semibold text-[13px]">Job Title</div>
            <div className="text-gray-500 text-left text-[13px]">
              {user.job_title || ""}
            </div>
          </div>
          <div>
            <div className="text-[13px] font-semibold">Department</div>
            <div className="text-[13px] text-gray-500">
              {user.department || ""}
            </div>
          </div>
        </div>
      </div>

      <hr className="my-6 text-gray-500" />

      <div className="my-6">
        <div className="font-semibold overflow-x-auto text-[13px] flex text-gray-700">
          <MdOutlineSecurity className="text-gray-500 text-[14px] mt-0.5" />
          <span className="ml-2">Module Permissions</span>
        </div>
        <div className="flex flex-wrap mt-2 ml-6">
          {user.collect && user.collect && (
            <div className="flex items-center me-2">
              <MdCheckCircle className="text-green-600" fontSize="small " />
              <span className="ml-1 text-[#667085] text-[14px]">Collect</span>
            </div>
          )}
          {user.analyse && user.analyse && (
            <div className="flex items-center me-2">
              <MdCheckCircle className="text-green-600" fontSize="small " />
              <span className="ml-1 text-[#667085] text-[14px]">Analyse</span>
            </div>
          )}
          {user.report && user.report && (
            <div className="flex items-center me-2">
              <MdCheckCircle className="text-green-600" fontSize="small " />
              <span className="ml-1 text-[#667085] text-[14px]">Report</span>
            </div>
          )}
          {user.optimise && user.optimise && (
            <div className="flex items-center me-2">
              <MdCheckCircle className="text-green-600" fontSize="small " />
              <span className="ml-1 text-[#667085] text-[14px]">Optimise</span>
            </div>
          )}
          {user.track && user.track && (
            <div className="flex items-center me-2">
              <MdCheckCircle className="text-green-600" fontSize="small " />
              <span className="ml-1 text-[#667085] text-[14px]">Track</span>
            </div>
          )}
        </div>
      </div>

      <hr className="my-6 text-gray-500" />

      {/* Organization Access Permissions */}
      <div className="my-6">
        <div className="font-semibold overflow-x-auto text-[13px] flex text-gray-700">
          <MdCorporateFare className="text-gray-500 text-[14px] mt-0.5" />
          <span className="ml-2">Organization Access Permissions</span>
        </div>
        <ul className="list-disc ml-12 text-[#667085] mt-3 text-[14px]">
          {user.orgs?.map((org) => (
            <li key={org}>{org.name}</li>
          ))}
        </ul>
      </div>

      {/* Corporate Access Permissions */}
      <div className="my-6">
        <div className="font-semibold overflow-x-auto text-[13px] flex text-gray-700">
          <MdCorporateFare className="text-gray-500 text-[14px] mt-0.5" />
          <span className="ml-2">Corporate Access Permissions</span>
        </div>
        <ul className="list-disc ml-12 text-[#667085] mt-3 text-[14px]">
          {user.corps?.map((corp) => (
            <li key={corp}>{corp.name}</li>
          ))}
        </ul>
      </div>

      {/* Locations Access Permissions */}
      <div className="my-6">
        <div className="font-semibold overflow-x-auto text-[13px] flex text-gray-700">
          <IoLocationOutline className="text-gray-500 text-[14px] mt-0.5" />
          <span className="ml-2">Locations Access Permissions</span>
        </div>
        <ul className="list-disc ml-12 text-[#667085] mt-3 text-[14px]">
          {user.locs?.map((location) => (
            <li key={location}>{location.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
