'use client';
import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdOutlineEdit, MdOutlineDeleteOutline } from "react-icons/md";

const EditStakeholderGroup = ({ isModalOpen, setIsModalOpen }) => {
 
    const router=useRouter();
    const [groupName,setgroupName]=useState('')
    const [stakeholderType,setstakeholderType]=useState('')
    const [selectBy,setselectBy]=useState('')
    const [showOrgCorp,setShowOrgCorp]=useState(false)
    const [selectedOptions, setSelectedOptions] = useState([])

  const corporates = [
    { value: "group1", label: "Group 1" },
    { value: "corporate223", label: "Corporate name 223" },
    { value: "group2", label: "Group 2" },
  ];

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

    const renderSecondSelect = () => {
        if (selectBy === "Organization") {
          return (
            <div className="grid grid-cols-1">
                 <label
                      className="block text-[13px] font-medium text-[#344054]"
                    >
                      Organization
                    </label>
              <select
                className="mt-1 block px-3 py-3 w-full rounded-md  text-sm border border-gray-300"
                // value={selectedOrg}
                // onChange={handleChangeallcrop}
                // onChange={(e) => setSelectedOrg(e.target.value)}
              >
                <option value="">--Select Organization--- </option>
                {/* {organisations?.map((org) => (
                  <option key={org.id} value={org.id}>
                    {org.name}
                  </option>
                ))}{" "} */}
              </select>
              {/* {error.selectedOrgrs && (
                <p className="text-red-500 ml-1">{error.selectedOrgrs}</p>
              )} */}
            </div>
          );
        } else if (selectBy === "Corporate") {
          return (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 mb-4">
                <div className="mr-2">
                <label
                      className="block text-[13px] font-medium text-[#344054]"
                    >
                      Organization
                    </label>
                  <div className="mt-2">
                    <select
                      className="mt-1 block px-3 py-3 w-full rounded-md  text-sm border border-gray-300"
                    //   value={selectedOrg}
                      // onChange={(e) => setSelectedOrg(e.target.value)}
                    //   onChange={handleChangecrop}
                    >
                      <option value="">--Select Organization--- </option>
                      {/* {organisations?.map((org) => (
                        <option key={org.id} value={org.id}>
                          {org.name}
                        </option>
                      ))}{" "} */}
                    </select>
    
                    {/* {error.selectedOrgs && (
                      <p className="text-red-500 ml-1">{error.selectedOrgs}</p>
                    )} */}
                  </div>
                </div>
                <div>
      <label className="block text-[13px] font-medium text-[#344054]">
        Corporate
      </label>
      <div className="mt-2">
        <Select
          isMulti
          options={corporates}
          value={selectedOptions}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md text-sm"
          placeholder="--Select Corporate--"
          styles={{
            control: (base) => ({
              ...base,
              padding: '4px 12px', // Equivalent to py-3
              minHeight: '48px', // Ensure height matches your other elements
              borderColor: '#d1d5db', // Matches Tailwind's gray-300 border
              borderRadius: '0.375rem', // Matches Tailwind's rounded-md
            }),
            valueContainer: (base) => ({
              ...base,
              padding: '0', // Reset inner padding to fit the custom height
            }),
            menu: (base) => ({
                ...base,
                maxHeight: '150px', // Set max height for the dropdown menu
                overflowY: 'auto', // Enable vertical scrolling
              }),
          }}
        />
      </div>
    </div>
              </div>
            </>
          );
        } else {
          return null;
        }
      };
 

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-[#00000080] z-50 mt-12">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-[40%] max-w-3xl">
            {/* Header */}
            <div>

<div className="flex justify-between items-center mb-2">
    
                <h2 className="text-black text-[18px] font-bold">
                Edit Stakeholder Group
                    </h2>
    
                  <button
                    className="absolute top-6 right-4 text-gray-500 hover:text-gray-700"
                    onClick={()=>{setIsModalOpen(false)}}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
    
                <p className="text-[#667085] text-[14px] mb-4">Modify details of this Stakeholder group. Click on Edit Stakeholders list to modify the stakeholders that are inside this group.</p>
                <form>
                      <div className="mb-4">
                        <label
                          htmlFor="groupName"
                          className="block text-[13px] font-medium text-[#344054]"
                        >
                          Group Name
                        </label>
                        <input
                          type="text"
                          id="groupName"
                          value={groupName}
                          onChange={(e) => setgroupName(e.target.value)}
                          placeholder="Enter Group name"
                          className="mt-1 block px-3 py-3 w-full rounded-md border border-gray-300 text-sm"
                          required
                        />
                      </div>
    
                      <div className="mb-4">
                        <label
                          htmlFor="stakeholderType"
                          className="block text-[13px] font-medium text-[#344054]"
                        >
                          Stakeholder Type
                        </label>
                        <input
                          type="text"
                          id="stakeholderType"
                          value={stakeholderType}
                          onChange={(e) => setstakeholderType(e.target.value)}
                          placeholder="Enter Stakeolder Type"
                          className="mt-1 block px-3 py-3 w-full rounded-md border border-gray-300 text-sm"
                          required
                        />
                      </div>
    
                      <div className="mb-4">
                        <label
                          htmlFor="select by"
                          className="block text-[13px] font-medium text-[#344054]"
                        >
                         Select by
                        </label>
                        <select
                          id="select by"
                          value={selectBy}
                          onChange={(e) => {setselectBy(e.target.value);setShowOrgCorp(true)}}
                          className={`mt-1 block px-3 py-3 w-full rounded-md  text-sm border border-gray-300`}
                          required
                        >
                          <option value="" disabled>
                              Select by
                            </option>
    
                            <option value="Organization">
                              Organization
                            </option>
                            <option value="Corporate">
                              Corporate
                            </option>
                        </select>
                      </div>
    
                     
                    <div className="mb-4">
                        {showOrgCorp && renderSecondSelect()}
    
                    </div>
    
                      <div className="flex justify-end gap-3 mt-6">
                      <button
                  type="button"
                 onClick={()=>{
                    router.push('/dashboard/SupplierAssessment/stakeholders')
                 }}
                  className="bg-transparent flex gap-2 text-[#344054] text-[15px] font-medium px-3 py-2 rounded-md border border-gray-300"
                >
                 <MdOutlineEdit className="w-4 h-4 mt-1" /> Edit Stakeholders List
                </button>
                        <button
                          type="button"
                        //   onClick={()=>{ 
                        //     setGroupCreated(true)
    
                        //   }}
                          className="bg-blue-500 text-[15px] text-white px-10 py-2 rounded-md hover:bg-blue-600"
                        >
                        Save
                        </button>
                      </div>
                </form>

               </div>  
           
          </div>
        </div>
      )}
    </>
  );
};

export default EditStakeholderGroup;
