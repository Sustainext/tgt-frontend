"use client";
import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { IoIosInformationCircleOutline } from "react-icons/io";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineEdit, MdOutlineDeleteOutline } from "react-icons/md";

const EditStakeholderGroup = ({
  isModalOpen,
  setIsModalOpen,
  editData,
  refresh,
  setRefresh,
  setStakeholderList
}) => {
  const router = useRouter();
  const [groupName, setgroupName] = useState("");
  const [stakeholderType, setstakeholderType] = useState("");
  const [selectBy, setselectBy] = useState("");
  const [showOrgCorp, setShowOrgCorp] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [organisations, setOrganisations] = useState([]);
  const [corporates, setCorporates] = useState([]);
  const [selectedOrg, setSelelectedOrg] = useState("");
  const [loopen, setLoOpen] = useState(false);
  const [stakeholderCount, setStakeholderCount] = useState("");
  const [groupId, setGroupId] = useState("");

  const refreshForm = () => {
    setgroupName("");
    setstakeholderType("");
    setSelectedOptions([]);
    setSelelectedOrg("");
    setselectBy("");
  };

  useEffect(() => {
    if (editData.groupName) {
      setgroupName(editData.groupName || "");
      setstakeholderType(editData.type || "");
      setselectBy(editData.selectBy || "");
      setSelelectedOrg(editData.organization_id || "");
      setStakeholderCount(editData.noOfStakeholder || 0);
      setGroupId(editData.id || "");
      const combinedCorporates = editData.corporate_ids.map((id, index) => ({
        value: id,
        label: editData.corporate[index],
      }));
      setSelectedOptions(combinedCorporates);
      setShowOrgCorp(true);
    }
  }, [editData]);

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
          if (response.data) {
            const obj = response.data.map((corp) => ({
              value: corp.id,
              label: corp.name,
            }));
            setCorporates(obj);
          }
        } catch (e) {
          if (e.status === 404) {
            setCorporates([]);
          } else {
            console.error("Failed fetching corporates:", e);
          }
        }
      }
    };

    fetchCorporates();
  }, [selectedOrg]);

  const handleOrgChange = (e) => {
    setSelelectedOrg(e.target.value);
    setSelectedOptions([]);
  };

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };
  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    LoaderOpen();
    try {
      const data = {
        name: groupName,
        group_type: stakeholderType,
        organization: selectedOrg,
        corporate_entity: selectedOptions
          ? selectedOptions.map((val) => val.value)
          : [],
      };
      const url = `${process.env.BACKEND_API_URL}/supplier_assessment/stakeholder-group/${groupId}/edit/`;
      if (groupName && stakeholderType && selectedOrg) {
        const response = await axiosInstance.put(url, data);
        if (response.status === 200) {
          LoaderClose();
          toast.success(
            <div style={{ display: "flex", alignItems: "flex-start" }}>
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
              <div style={{marginLeft:"15px"}}>
                <strong
                  style={{
                    display: "block",
                    marginBottom: "4px",
                    fontSize: "16px",
                  }}
                >
                  {" "}
                  {/* Main heading */}
                  Changes saved
                </strong>
                <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.4" }}>
                  {" "}
                  {/* Paragraph aligned below heading */}
                  {`Changes made to the stakeholder group ${groupName} has been saved`}
                </p>
              </div>
            </div>,
            {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              style: {
                borderRadius: "8px",
                border: "1px solid #E5E5E5",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                width: "371px",
              },
              icon: false,
            }
          );

          setRefresh((prevRefresh) => !prevRefresh);
          setIsModalOpen(false);
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
      } else {
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
    } catch (e) {
      LoaderClose();
      console.error(e);
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
  };

  const renderSecondSelect = () => {
    if (selectBy === "Organization") {
      return (
        <div className="grid grid-cols-1">
          <label className="block text-[13px] font-medium text-[#344054]">
            Organization
          </label>
          <select
            required
            className="mt-1 block px-3 py-3 w-full rounded-md  text-sm border border-gray-300"
            value={selectedOrg}
            onChange={handleOrgChange}
          >
            <option value="" disabled>
              -Select Organization-
            </option>
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
              <label className="block text-[13px] font-medium text-[#344054]">
                Organization
              </label>
              <div className="mt-2">
                <select
                  required
                  className="mt-1 block px-3 py-3 w-full rounded-md  text-sm border border-gray-300"
                  value={selectedOrg}
                  onChange={handleOrgChange}
                >
                  <option value="" disabled>
                    -Select Organization-
                  </option>
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
                      padding: "4px 12px", // Equivalent to py-3
                      minHeight: "48px", // Ensure height matches your other elements
                      borderColor: "#d1d5db", // Matches Tailwind's gray-300 border
                      borderRadius: "0.375rem", // Matches Tailwind's rounded-md
                    }),
                    valueContainer: (base) => ({
                      ...base,
                      padding: "0", // Reset inner padding to fit the custom height
                    }),
                    menu: (base) => ({
                      ...base,
                      maxHeight: "150px", // Set max height for the dropdown menu
                      overflowY: "auto", // Enable vertical scrolling
                    }),
                    multiValue: (base) => ({
                      ...base,
                      backgroundColor: "#dbeafe", // Light blue background (Tailwind's blue-100)
                      borderRadius: "0.375rem", // Rounded corners
                    }),
                    multiValueLabel: (base) => ({
                      ...base,
                      color: "#1e40af", // Blue text (Tailwind's blue-800)
                      fontWeight: "600",
                    }),
                    multiValueRemove: (base) => ({
                      ...base,
                      color: "#454545",
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
          <div className="relative bg-white p-6 rounded-lg shadow-lg xl:w-[40%] max-w-3xl xl:mx-0 mx-2">
            {/* Header */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-black text-[18px] font-bold">
                  Edit Stakeholder Group
                </h2>

                <button
                  className="absolute top-6 right-4 text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    setIsModalOpen(false);
                    refreshForm();
                  }}
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

              <p className="text-[#667085] text-[14px] mb-4">
                Modify details of this Stakeholder group. Click on Edit
                Stakeholders list to modify the stakeholders that are inside
                this group.
              </p>
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
                    onChange={(e) => {
                      setselectBy(e.target.value);
                      setShowOrgCorp(true);
                    }}
                    className={`mt-1 block px-3 py-3 w-full rounded-md  text-sm border border-gray-300`}
                    required
                  >
                    <option value="" disabled>
                      Select by
                    </option>

                    <option value="Organization">Organization</option>
                    <option value="Corporate">Corporate</option>
                  </select>
                </div>

                <div className="mb-4">
                  {showOrgCorp && renderSecondSelect()}
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    disabled={stakeholderCount == 0}
                    onClick={() => {
                        setStakeholderList(true)
                    }}
                    className={`bg-transparent flex gap-2 ${
                      stakeholderCount == 0
                        ? "opacity-30 cursor-not-allowed"
                        : "cursor-pointer"
                    } text-[#344054] text-[15px] font-medium px-3 py-2 rounded-md border border-gray-300`}
                  >
                    <MdOutlineEdit className="w-4 h-4 mt-1" /> Edit Stakeholders
                    List
                  </button>
                  <button
                    type="submit"
                    className={`bg-blue-500 text-[15px] text-white px-10 py-2 rounded-md hover:bg-blue-600`}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
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

export default EditStakeholderGroup;
