// organisations,corporates and year///
"use client";
import { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { yearInfo, months } from "@/app/shared/data/yearInfo";
import axiosInstance from "@/app/utils/axiosMiddleware";
const SocialBillS211Header = ({
  activeMonth,
  setActiveMonth,
  selectedOrg,
  setSelectedOrg,
  selectedCorp,
  setSelectedCorp,
  year,
  setYear,
  reportType,
  setReportType
}) => {
  const [formState, setFormState] = useState({
    selectedCorp: selectedCorp,
    selectedOrg: selectedOrg,
    year: year,
    month: activeMonth,
  });
  const handleReportTypeChange = (type) => {
    setReportType(type);
  };
  const [locations, setLocations] = useState([]);
  const [errors, setErrors] = useState({
    organization: "Please select Organization",
    corporate: "Please select Corporate",
    year: year ? "" : "Please select year",
  });

  const [organisations, setOrganisations] = useState([]);
  const [corporates, setCorporates] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "month") {
      setActiveMonth(monthMapping[value]);
    } else if (name === "year") {
      setYear(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        year: value ? "" : "Please select year",
      }));
    } else if (name === "selectedOrg") {
      setSelectedOrg(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        organization: value ? "" : "Please select Organization",
      }));
    } else if (name === "selectedCorp") {
      setSelectedCorp(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        corporate: value ? "" : "Please select Corporate",
      }));
    }
  };

  useEffect(() => {
    const fetchOrg = async () => {
      try {
        const response = await axiosInstance.get(`/canadabills211/canada_section/`);
        setOrganisations(response.data.org_list);
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
          const response = await axiosInstance.get(`/canadabills211/corporate_list/`, {
            params: { org_id: selectedOrg },
          });
          setCorporates(response.data);
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

  useEffect(() => {
    setFormState({
      selectedCorp: selectedCorp,
      selectedOrg: selectedOrg,
      year: year,
      month: activeMonth,
    });
  }, [selectedOrg, selectedCorp, year]);

  const handleOrgChange = (e) => {
    const newOrg = e.target.value;
    setSelectedOrg(newOrg);
    setSelectedCorp("");
    setErrors((prevErrors) => ({
      ...prevErrors,
      organization: newOrg ? "" : "Please select Organization",
    }));
  };

  const handleCorpChange = (e) => {
    const newCorp = e.target.value;
    setSelectedCorp(newCorp);
    setErrors((prevErrors) => ({
      ...prevErrors,
      corporate: newCorp ? "" : "Please select Corporate",
    }));
  };

  return (
    <>
      <div>
        <div className="flex-col items-center ">
          <div className="mt-4 pb-3 mx-5 text-left">
            <div className="mb-2 flex-col items-center">
              <div className="justify-start items-center gap-4 inline-flex">
                <div className="text-zinc-600 text-[12px] font-semibold font-['Manrope']">
                  Add By:
                </div>
                <div className="rounded-lg shadow justify-start items-start flex">
                  <div
                    className={`w-[111px] px-4 py-2.5 border rounded-l-lg border-gray-300 justify-center items-center gap-2 flex cursor-pointer ${
                      reportType === "Organization" ? "bg-[#d2dfeb]" : "bg-white"
                    }`}
                    onClick={() => {handleReportTypeChange("Organization")
                        setSelectedCorp("")
                        
                    }

                    }
                  >
                    <div className="text-slate-800 text-[12px] font-medium font-['Manrope'] leading-tight">
                      Organization
                    </div>
                  </div>
                  <div
                    className={`w-[111px] px-4 py-2.5 border-r border-y border-gray-300 rounded-r-lg justify-center items-center gap-2 flex cursor-pointer ${
                      reportType === "Corporate" ? "bg-[#d2dfeb]" : "bg-white"
                    }`}
                    onClick={() => {handleReportTypeChange("Corporate")

                        setErrors((prevErrors) => ({
                            ...prevErrors,
                            corporate: selectedCorp ? "" : "Please select Corporate",
                          }));
                    }}
                  >
                    <div className="text-slate-800 text-[12px] font-medium font-['Manrope'] leading-tight">
                      Corporate
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`grid grid-cols-1 md:grid-cols-4 w-[80%] mb-2 pt-4 ${
                  reportType !== "" ? "visible" : "hidden"
                }`}
              >
                <div className="mr-2">
                  <label
                    htmlFor="cname"
                    className="text-neutral-800 text-[12px] font-normal ml-1"
                  >
                    Select Organization*
                  </label>
                  <div className="mt-2">
                    <select
                      className="block w-full rounded-md border-0 py-1.5 pl-4 text-neutral-500 text-[12px] font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      value={selectedOrg}
                      onChange={handleOrgChange}
                    >
                      <option disabled value="" >Select Organization</option>
                      {organisations &&
                        organisations.map((org) => (
                          <option key={org.id} value={org.id}>
                            {org.name}
                          </option>
                        ))}
                    </select>
                    {errors.organization && (
                      <p className="text-[#007EEF] text-[12px] top=16  left-0 pl-2 mt-2">
                        {errors.organization}
                      </p>
                    )}
                  </div>
                </div>
                {reportType === "Corporate" && (
                  <div className="mr-2">
                    <label
                      htmlFor="cname"
                      className="text-neutral-800 text-[12px] font-normal ml-1"
                    >
                      Select Corporate
                    </label>
                    <div className="mt-2">
                      <select
                        className="block w-full rounded-md border-0 py-1.5 pl-4 text-neutral-500 text-[12px] font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        value={selectedCorp}
                        onChange={handleCorpChange}
                      >
                        <option disabled value="">Select Corporate </option>
                        {corporates &&
                          corporates.map((corp) => (
                            <option key={corp.id} value={corp.id}>
                              {corp.name}
                            </option>
                          ))}
                      </select>
                      {errors.corporate && (
                        <p className="text-[#007EEF] text-[12px] top=16  left-0 pl-2 mt-2">
                          {errors.corporate}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <div className="mr-2">
                  <label
                    htmlFor="cname"
                    className="text-neutral-800 text-[12px] font-normal ml-1"
                  >
                    Select year
                  </label>
                  <div className="mt-2">
                    <select
                      name="year"
                      className="block w-full rounded-md border-0 py-1.5 pl-4 text-neutral-500 text-[12px] font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      value={formState.year}
                      onChange={handleChange}
                    >
                      <option disabled value="">Select year</option>
                      {yearInfo.map((item) => (
                        <option value={item.slice(0, 4)} key={item}>
                          {item.slice(0, 4)}
                        </option>
                      ))}
                    </select>
                    {errors.year && (
                      <p className="text-[#007EEF] text-[12px] top=16  left-0 pl-2 mt-2">
                        {errors.year}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SocialBillS211Header;
