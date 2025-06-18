"use client";
import React, { useState, useEffect, useRef } from "react";
import Fillterorgcorp from "../../../../fillter/fillter-org-corp";
import { MdChevronLeft } from "react-icons/md";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { Oval } from "react-loader-spinner";
import { useSelector } from "react-redux";
const ReportingInfo = ({ showToast,setView,fetchTcfdStatus }) => {
    const selectedOrgnew = useSelector((state) => state.Tcfd.Organization);
    const selectedCorpnew = useSelector((state) => state.Tcfd.Corporate);
  const [selectedOrg, setSelectedOrg] = useState(selectedOrgnew);
  const [selectedCorp, setSelectedCorp] = useState(selectedCorpnew);
  const [sectorType, setSectorType] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [errors, setErrors] = useState({});
  const [loopen, setLoOpen] = useState(false);
  const [togglestatus, setToggleStatus] = useState("Organization");
  const toastShown = useRef(false);
  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };
  const Back = () =>{
    setView("home");
    fetchTcfdStatus();
  }
  const clearError = (field) => setErrors((prev) => ({ ...prev, [field]: "" }));

  const validate = () => {
    const newErrors = {};
    if (!sectorType) newErrors.sectorType = "Sector type is required";
    if (sectorType === "financial" && !selectedSector)
      newErrors.selectedSector = "Sector is required";
    if (!fromDate) newErrors.fromDate = "From date is required";
    if (!toDate) newErrors.toDate = "To date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const loadFormData = async () => {
    LoaderOpen();
    setSectorType("");
    setSelectedSector("");
    setFromDate("");
    setToDate("");
    const url = `${process.env.BACKEND_API_URL}/tcfd_framework/tcfd-reporting-information/?organization=${selectedOrg}&corporate=${selectedCorp}`;
    try {
      const response = await axiosInstance.get(url);
      console.log("API called successfully:", response.data);
      setSectorType(response.data.sector_type);
      setSelectedSector(response.data.sector);
      setFromDate(response.data.from_date);
      setToDate(response.data.to_date);
    } catch (error) {
      setSectorType("");
      setSelectedSector("");
      setFromDate("");
      setToDate("");
    } finally {
      LoaderClose();
    }
  };
  useEffect(() => {
    if (selectedOrg && togglestatus) {
      if (togglestatus === "Corporate" && selectedCorp) {
        loadFormData();
      } else {
        loadFormData();
      }

      toastShown.current = false;
    } else {
      if (!toastShown.current) {
        toastShown.current = true;
      }
    }
  }, [selectedOrg, selectedCorp, togglestatus]);

  const handleSave = async () => {
    if (!validate()) return;
    LoaderOpen();
    try {
      const response = await axiosInstance.put(
        `${process.env.BACKEND_API_URL}/tcfd_framework/tcfd-reporting-information/`,
        {
          organization: selectedOrg,
          corporate: selectedCorp,
          sector_type: sectorType,
          sector: selectedSector || null,
          from_date: fromDate,
          to_date: toDate,
          status: true,
        }
      );
      LoaderClose();
      if (response.status === 200) {
        const msg = response.data?.message;

        showToast(
          msg?.header || "Import Successful",
          msg?.body || "Data has been imported successfully.",
          msg?.gradient || "linear-gradient(to right, #F98845, #6ADF23)"
        );
   setView("home");
    fetchTcfdStatus();
      }
    } catch (err) {
      console.error("Error saving data", err);
      LoaderClose();
    }
  };

  return (
    <>
      <div className="flex justify-between items-center border-b border-gray-200 mb-5 px-4 pt-4">
        <h2 className="text-[22px] font-bold gradient-text mb-2">
          TCFD Reporting Information
        </h2>
        <button className="bg-transparent text-gray-900 text-sm border border-gray-300 rounded-md flex items-center py-1 px-3 mb-2"
        onClick={Back}
        >
          <MdChevronLeft className="text-xl mr-1" />
          Back
        </button>
      </div>

      <div className="px-4">
           <Fillterorgcorp
                 selectedOrg={selectedOrg}
                 setSelectedOrg={setSelectedOrg}
                 selectedCorp={selectedCorp}
                 setSelectedCorp={setSelectedCorp}
                 setToggleStatus={setToggleStatus}
               />

        <div className="px-4 shadow-md rounded-md py-4 mt-6">
          <p className="text-[15px] text-gray-700 font-[500] mb-4">
            Select the sector for which the TCFD disclosures shall be mapped
          </p>

          {/* Sector Type */}
          <div className="mb-4">
            <label className="text-[14px] text-gray-700 font-[500]">
              Select Sector Type
            </label>
            <div className="flex gap-4 pt-2">
              <label className="flex items-center gap-2 text-[13px] cursor-pointer">
                <input
                  type="radio"
                  name="sectorType"
                  value="financial"
                  checked={sectorType === "financial"}
                  onChange={(e) => {
                    setSectorType(e.target.value);
                    clearError("sectorType");
                  }}
                />
                Financial Sector
              </label>
              <label className="flex items-center gap-2 text-[13px] cursor-pointer">
                <input
                  type="radio"
                  name="sectorType"
                  value="non_financial"
                  checked={sectorType === "non_financial"}
                  onChange={(e) => {
                    const selected = e.target.value;
  setSectorType(selected);
                    clearError("sectorType");
                    if (selected === "non_financial") {
                      setSelectedSector("");
                      setFromDate("");
                       setToDate("");
                    }
                  }}
                />
                Non-Financial Sector
              </label>
            </div>
            {errors.sectorType && (
              <p className="text-red-500 text-xs mt-1">{errors.sectorType}</p>
            )}
          </div>

          {/* Conditional Sector Dropdown */}
          {sectorType === "financial" && (
            <div className="mb-4">
              <label className="text-[14px] text-gray-700 font-[500]">
                Select Sector
              </label>
              <select
                className="mt-2 w-full rounded-md text-[13px] py-2 px-2 border border-gray-400 text-neutral-600"
                value={selectedSector}
                onChange={(e) => {
                  setSelectedSector(e.target.value);
                  clearError("selectedSector");
                }}
              >
                <option value="">Select Sector</option>
                <option value="banking">Banking</option>
                <option value="insurance">Insurance</option>
                <option value="asset_management">Asset Management</option>
                <option value="asset_owner">Asset Owner</option>
              </select>
              {errors.selectedSector && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.selectedSector}
                </p>
              )}
            </div>
          )}

          {/* Date Inputs */}
          <div className="mb-2">
            <label className="text-[14px] text-gray-700 font-[500]">
              Select the financial year for disclosing TCFD information
            </label>
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => {
                  setFromDate(e.target.value);
                  clearError("fromDate");
                }}
                className="w-full rounded-md text-[13px] py-2 px-2 border border-gray-400 text-neutral-600"
              />
              {errors.fromDate && (
                <p className="text-red-500 text-xs mt-1">{errors.fromDate}</p>
              )}
            </div>
            <div className="w-1/2">
              <input
                type="date"
                value={toDate}
                onChange={(e) => {
                  setToDate(e.target.value);
                  clearError("toDate");
                }}
                className="w-full rounded-md text-[13px] py-2 px-2 border border-gray-400 text-neutral-600"
              />
              {errors.toDate && (
                <p className="text-red-500 text-xs mt-1">{errors.toDate}</p>
              )}
            </div>
          </div>

          {errors.selectedOrg && (
            <p className="text-red-500 text-xs mt-1">{errors.selectedOrg}</p>
          )}

          {/* Save Button */}
          <div className="mt-6 text-right">
            <button
              onClick={handleSave}
              disabled={!fromDate}
              className={`px-6 py-2 rounded text-white ${
                fromDate
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Save
            </button>
          </div>
        </div>
      </div>
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

export default ReportingInfo;
