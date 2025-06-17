"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/app/utils/axiosMiddleware";
import { useDispatch } from "react-redux";
import { setOrganization,setCorporate } from "../../lib/redux/features/TCFD/TcfdSlice";
const Fillterorgcorp = ({
  activeMonth,
  setActiveMonth,
  selectedOrg,
  setSelectedOrg,
  selectedCorp,
  setSelectedCorp,
  year,
  setYear,
  setToggleStatus,
}) => {
  const [reportType, setReportType] = useState("Organization");
  const dispatch = useDispatch();
  const [organisations, setOrganisations] = useState([]);
  const [corporates, setCorporates] = useState([]);

  const [errors, setErrors] = useState({
    organization: "Please select Organisation",
    corporate: "Please select Corporate",
  });

  const handleReportTypeChange = (type) => {
    setReportType(type);
    setToggleStatus(type);
    setErrors({ organization: "", corporate: "" });

    if (type === "Organization") {
      setSelectedCorp("");
    }
  };

  const validateField = (name, value) => {
    let message = "";
    if (name === "selectedOrg" && !value) {
      message = "Please select Organisation";
    }
    if (name === "selectedCorp" && reportType === "Corporate" && !value) {
      message = "Please select Corporate";
    }

    setErrors((prev) => ({
      ...prev,
      [name === "selectedOrg" ? "organization" : "corporate"]: message,
    }));
  };

  const handleOrgChange = (e) => {
    const value = e.target.value;
    setSelectedOrg(value);
    dispatch(setOrganization(value));
    setSelectedCorp(""); // reset corp when org changes
    validateField("selectedOrg", value);
  };

  const handleCorpChange = (e) => {
    const value = e.target.value;
    setSelectedCorp(value);
    dispatch(setCorporate(value));
    validateField("selectedCorp", value);
  };

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
          setCorporates(response.data);
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

  useEffect(() => {
    if (selectedCorp) {
      setReportType("Corporate");
    }
  }, [selectedCorp]);

  return (
    <div>
      <div className="flex-col items-center">
        <div className="mt-4 pb-3 xl:mx-5 mx-2 text-left">
          <div className="mb-2 flex-col items-center">
            {/* Report Type Switch */}
            <div className="justify-start items-center gap-4 inline-flex">
              <div className="text-zinc-600 text-[12px] font-semibold font-['Manrope']">
                Add By:
              </div>
              <div className="rounded-lg shadow justify-start items-start flex">
                <div
                  className={`w-[111px] px-4 py-2.5 border rounded-l-lg border-gray-300 flex cursor-pointer ${
                    reportType === "Organization" ? "bg-[#d2dfeb]" : "bg-white"
                  }`}
                  onClick={() => handleReportTypeChange("Organization")}
                >
                  <div className="text-slate-800 text-[12px] font-medium">
                    Organization
                  </div>
                </div>
                <div
                  className={`w-[111px] px-4 py-2.5 border-r border-y border-gray-300 rounded-r-lg flex cursor-pointer ${
                    reportType === "Corporate" ? "bg-[#d2dfeb]" : "bg-white"
                  }`}
                  onClick={() => handleReportTypeChange("Corporate")}
                >
                  <div className="text-slate-800 text-[12px] font-medium">
                    Corporate
                  </div>
                </div>
              </div>
            </div>

            {/* Selection Fields */}
            <div
              className={`grid grid-cols-1 md:grid-cols-4 xl:w-[80%] w-[100%] mb-2 pt-4 ${
                reportType !== "" ? "visible" : "hidden"
              }`}
            >
              {/* Organization */}
              <div className="mr-2">
                <label
                  className="text-neutral-800 text-[12px] font-normal ml-1"
                >
                  Select Organization*
                </label>
                <div className="mt-2">
                  <select
                    value={selectedOrg}
                    onChange={handleOrgChange}
                    className="block w-full rounded-md border-0 py-1.5 pl-4 text-neutral-500 text-[12px] leading-tight ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600"
                  >
                    <option value="">Select Organization</option>
                    {organisations.map((org) => (
                      <option key={org.id} value={org.id}>
                        {org.name}
                      </option>
                    ))}
                  </select>
                  {errors.organization && (
                    <p className="text-[#007EEF] text-[12px] pl-2 mt-2">
                      {errors.organization}
                    </p>
                  )}
                </div>
              </div>

              {/* Corporate (only for corporate report type) */}
              {reportType === "Corporate" && (
                <div className="mr-2">
                  <label
                    className="text-neutral-800 text-[12px] font-normal ml-1"
                  >
                    Select Corporate*
                  </label>
                  <div className="mt-2">
                    <select
                      value={selectedCorp}
                      onChange={handleCorpChange}
                      className="block w-full rounded-md border-0 py-1.5 pl-4 text-neutral-500 text-[12px] leading-tight ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600"
                    >
                      <option value="">Select Corporate</option>
                      {corporates.map((corp) => (
                        <option key={corp.id} value={corp.id}>
                          {corp.name}
                        </option>
                      ))}
                    </select>
                    {errors.corporate && (
                      <p className="text-[#007EEF] text-[12px] pl-2 mt-2">
                        {errors.corporate}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fillterorgcorp;
