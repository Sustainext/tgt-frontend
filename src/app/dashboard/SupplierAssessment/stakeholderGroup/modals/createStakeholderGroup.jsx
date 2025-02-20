'use client';
import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { IoIosInformationCircleOutline } from "react-icons/io";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateStakeholderGroup = ({ isModalOpen,groupId,setGroupId, setIsModalOpen,setStakeholderList,showStakeholderList,refresh,
    setRefresh }) => {
 
    const router=useRouter();
    const [groupName,setgroupName]=useState('')
    const [stakeholderType,setstakeholderType]=useState('')
    const [selectBy,setselectBy]=useState('')
    const [showOrgCorp,setShowOrgCorp]=useState(false)
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [groupCreated, setGroupCreated] = useState(false);
    const [organisations,setOrganisations]=useState([])
    const [corporates,setCorporates]=useState([])
    const [selectedOrg,setSelelectedOrg]=useState('')
    const [loopen, setLoOpen] = useState(false);
    const [groupDetails,setGroupDetails]=useState({})

    const refreshForm=()=>{
        setgroupName('')
        setstakeholderType('')
        setSelectedOptions([])
        setSelelectedOrg('')
        setselectBy('')
    }

    useEffect(() => {
        const fetchOrg = async () => {
          try {
            const response = await axiosInstance.get(`/orggetonly`);
            setOrganisations(response.data);
          } catch (e) {
            console.error("Failed fetching organization:", e);
          }
        };
    
        fetchOrg();
      }, []);
    
      useEffect(() => {
         const fetchCorporates = async () => {
          if (selectedOrg) {
            try {
              const response = await axiosInstance.get(`/corporate/`, {
                params: { organization_id: selectedOrg },
              });
              if(response.data){
                const obj=response.data.map((corp)=>(
                    {
                        value: corp.id,  
                        label: corp.name
                    }
                  ))
                  setCorporates(obj);
              }
              
            } catch (e) {
              if(e.status === 404) {
                setCorporates([]);
              }
              else{
                console.error("Failed fetching corporates:", e);
              }
              
            }
          }
        };
    
        fetchCorporates();
      }, [selectedOrg]);

      const handleOrgChange=(e)=>{
        setSelelectedOrg(e.target.value)
        setSelectedOptions([])
      }


  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };

  const handleSubmit= async(e)=>{
    e.preventDefault();
    LoaderOpen()
    try{
        const data = {
           name:groupName,
           group_type:stakeholderType,
           organization:selectedOrg,
           corporate_entity:selectedOptions?selectedOptions.map((val)=> val.value ):[]
          };
          const url = `${process.env.BACKEND_API_URL}/supplier_assessment/stakeholder-group/`;
        if(groupName&&stakeholderType&&selectedOrg){
            const response = await axiosInstance.post(url,data);
             if (response.status === 201) {
                    LoaderClose();
                    setGroupDetails(response.data)
                    setGroupCreated(true)
                    refreshForm()
                  } else {
                    toast.error("Oops, something went wrong", {
                      position: "top-right",
                      autoClose: 1000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    });
                    LoaderClose();
                  }
        }
        else{
            toast.error("Please fill all the required fields", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
        }
    }
    catch(e){
        LoaderClose()
        console.error(e)
        toast.error("Oops, something went wrong", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
    }
   
  }
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
              required
                className="mt-1 block px-3 py-3 w-full rounded-md  text-sm border border-gray-300"
                value={selectedOrg}
                onChange={handleOrgChange}
              >
                <option value="" disabled>-Select Organization-</option>
                {organisations?.map((org) => (
                  <option key={org.id} value={org.id}>
                    {org.name}
                  </option>
                ))}{" "}
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
                    required
                      className="mt-1 block px-3 py-3 w-full rounded-md  text-sm border border-gray-300"
                      value={selectedOrg}
                      onChange={handleOrgChange}
                    >
                      <option value="" disabled>-Select Organization-</option>
                      {organisations?.map((org) => (
                        <option key={org.id} value={org.id}>
                          {org.name}
                        </option>
                      ))}{" "}
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
          required={true}
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
              multiValue: (base) => ({
                ...base,
                backgroundColor: '#dbeafe', // Light blue background (Tailwind's blue-100)
                borderRadius: '0.375rem', // Rounded corners
              }),
              multiValueLabel: (base) => ({
                ...base,
                color: '#1e40af', // Blue text (Tailwind's blue-800)
                fontWeight: '600',
              }),
              multiValueRemove: (base) => ({
                ...base,
                color: '#454545'
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
            {groupCreated?(
                <div>
                    <div className="flex justify-between items-center mb-2">
                 <div className="flex gap-3">
    <div className="mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                    >
                      <path
                        d="M10 0.364746C15.5228 0.364746 20 4.8419 20 10.3647C20 15.8876 15.5228 20.3647 10 20.3647C4.47715 20.3647 0 15.8876 0 10.3647C0 4.8419 4.47715 0.364746 10 0.364746ZM14.198 7.4228C13.9811 7.20585 13.6443 7.18174 13.4007 7.35048L13.3141 7.4228L8.75 11.9872L6.69194 9.92889L6.60538 9.85657C6.3618 9.68783 6.02502 9.71193 5.80806 9.92889C5.5911 10.1458 5.56699 10.4826 5.73574 10.7262L5.80806 10.8128L8.30806 13.3128L8.39462 13.3851C8.60775 13.5327 8.89225 13.5327 9.10538 13.3851L9.19194 13.3128L14.198 8.30669L14.2703 8.22013C14.4391 7.97654 14.415 7.63976 14.198 7.4228Z"
                        fill="#54B054"
                      />
                    </svg>
                  </div>
                <h2 className="text-black text-[18px] font-bold">
                Stakeholder Group Created
                    </h2>
    </div>
    
                  <button
                    className="absolute top-6 right-4 text-gray-500 hover:text-gray-700"
                    onClick={()=>{setIsModalOpen(false);setGroupCreated(false); setRefresh((prevRefresh) => !prevRefresh);}}
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
                <p className="text-[#667085] text-[14px] mb-4">{`New Stakeholder group ${groupName?groupName:''} has been created.`}</p>
                 <div className="p-3 bg bg-[#F1F7FF] flex gap-2 rounded-md">
                                  <IoIosInformationCircleOutline className="w-8 h-8 text-[#197AFF] my-2 -mt-0.5" />
                                  <p className="text-[13px] text-[#051833]">
                                  To send assessments to this group, at least one stakeholder must be present in it. Click Add Now to include stakeholders in the group.
                                  </p>
                                </div>
                                <div className="flex gap-3 mt-6 justify-end">
                                <button
                          type="button"
                          onClick={()=>{ 
                            setIsModalOpen(false)
                            setGroupCreated(false)
                            setRefresh((prevRefresh) => !prevRefresh);
    
                          }}
                          className="bg-transparent text-[#344054] px-10 py-2 rounded-md border border-gray-300"
                        >
                       Add later
                        </button>
                        <button
                          type="button"
                          onClick={()=>{ 
                            setGroupId({
                                id:groupDetails.id,
                                name:groupDetails.name,
                                organization:groupDetails.organization_name,
                                corporate:groupDetails.corporate_names
                              })
                            setStakeholderList(true)
                       
    
                          }}
                          className="bg-blue-500 text-white px-10 py-2 rounded-md hover:bg-blue-600"
                        >
                        Add now
                        </button>
                                </div>
                </div>
            ):(
               <div>

<div className="flex justify-between items-center mb-2">
    
                <h2 className="text-black text-[18px] font-bold">
                Create New Stakeholder Group
                    </h2>
    
                  <button
                    className="absolute top-6 right-4 text-gray-500 hover:text-gray-700"
                    onClick={()=>{setIsModalOpen(false);refreshForm()}}
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
    
                <p className="text-[#667085] text-[14px] mb-4">Assessments are send to stakeholder groups. Create stakeholder group and add stakeholders in it to send assessments.</p>
                <form onSubmit={handleSubmit}>
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
                          placeholder="Enter Stakeholder Type"
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
    
                      <div className="flex justify-end mt-6">
                        <button
                        disabled={!(groupName && stakeholderType && selectedOrg && (selectBy !== "Corporate" || selectedOptions.length > 0))
}
                          type="submit"
                        //   onClick={handleSubmit}
                          className={`bg-blue-500 ${!(groupName && stakeholderType && selectedOrg && (selectBy !== "Corporate" || selectedOptions.length > 0))?'opacity-30 cursor-not-allowed':'cursor-pointer'}
 text-white px-10 py-2 rounded-md hover:bg-blue-600`}
                        >
                        Create Group
                        </button>
                      </div>
                </form>

               </div>            )}
           
          </div>
        </div>
      )}
      {loopen && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <Oval
                  height={50}
                  width={50}
                  color="#00BFFF"
                  secondaryColor="#f3f3f3"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                />
              </div>
            )}
    </>
  );
};

export default CreateStakeholderGroup;
