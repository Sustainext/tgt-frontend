import React from "react";
import { MdCheckCircle } from "react-icons/md";
import { MdOutlineHome } from "react-icons/md";

// import { Link } from "react-router-dom";
import Link from "next/link";
const UserAddedModal = ({addNewUser, edit=false}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg min-w-[444px] mx-auto">
      <div className="flex items-center space-x-2 mb-2">
        <MdCheckCircle className="text-green-500 text-[20px]" />
        <h2 className="text-[18px] font-bold">{edit ? 'User details saved' : 'New User Added'}</h2>
      </div>
      <p className="text-gray-600 mb-6 text-[14px]">Select view all users to view or edit details of this user.</p>
      <div className="flex justify-between items-center mt-8">
        <div className="flex items-center space-x-2">
          <span className="text-blue-600">
            {/* <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18m-7 5h7" />
            </svg> */}
          </span>
          <Link href="/home" className="text-blue-600 hover:underline text-[12px] flex"> <MdOutlineHome className="me-2  text-[15px]"/>Sustainext HQ</Link>
        </div>
        <div className="flex space-x-2 text-md">
          <Link href='#' className="bg-white hover:bg-white text-gray-700 px-4 py-1 rounded-lg border border-gray-10 text-[12px]">View all Users</Link>
          <button onClick={addNewUser} className="bg-[#007EEF] hover:bg-[#007EEF] text-white px-4 py-1 rounded-md text-[12px]">Add User +</button>
        </div>
      </div>
    </div>
  );
};

export default UserAddedModal;