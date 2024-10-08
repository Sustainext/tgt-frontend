"use client";
import { useEffect, useState } from "react";
import { yearInfo } from "@/app/shared/data/yearInfo";
import axiosInstance from "@/app/utils/axiosMiddleware";

const EconomicHeader5 = ({
  activeMonth,
  setActiveMonth,
  selectedOrg,
  setSelectedOrg,
  selectedCorp,
  setSelectedCorp,
  year,
  setYear,
}) => {
  const [formState, setFormState] = useState({
    selectedCorp: selectedCorp,
    selectedOrg: selectedOrg,
    year: year,
    month: activeMonth,
    location: "", // Adding location to the form state
  });
  const [reportType, setReportType] = useState("Organization");
  const [locations, setLocations] = useState([]);
  const [errors, setErrors] = useState({
    organization: "Please select Organisation",
    corporate: "Please select Corporate", // Corporate error default message
    year: year ? "" : "Please select year",
    location: "Please select location", // Location validation error
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
        organization: value ? "" : "Please select Organisation",
      }));
    } else if (name === "selectedCorp") {
      setSelectedCorp(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        corporate: value ? "" : "Please select Corporate", // Corporate error logic
      }));
    } else if (name === "location") {
      // Handling location change
      setFormState((prevState) => ({
        ...prevState,
        location: value,
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        location: value ? "" : "Please select location", // Location error logic
      }));
    }
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
          console.error("Failed fetching corporates:", e);
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
      location: formState.location, // Keep location updated
    });
  }, [selectedOrg, selectedCorp, year]);

  const handleOrgChange = (e) => {
    const newOrg = e.target.value;
    setSelectedOrg(newOrg);
    setSelectedCorp("");
    setLocations([]); // Clear locations when organization is changed
    setErrors((prevErrors) => ({
      ...prevErrors,
      organization: newOrg ? "" : "Please select Organisation",
      corporate: "Please select Corporate", // Reset corporate error
    }));
  };

  const handleCorpChange = (e) => {
    const newCorp = e.target.value;
    setSelectedCorp(newCorp);
    setErrors((prevErrors) => ({
      ...prevErrors,
      corporate: newCorp ? "" : "Please select Corporate", // Proper error handling for corporate
    }));
  };

  useEffect(() => {
    const fetchLocation = async () => {
      if (selectedCorp) {
        try {
          const response = await axiosInstance.get(
            `/sustainapp/get_location_as_per_corporate/`,
            {
              params: { corporate: selectedCorp },
            }
          );
          setLocations(response.data);
        } catch (e) {
          console.error("Failed fetching locations:", e);
          setLocations([]); // Clear locations if there's an error
        }
      }
    };

    fetchLocation();
  }, [selectedCorp]);

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
                <div className="rounded-lg shadow border border-gray-300 justify-start items-start flex">
                  <div
                    className={`w-[111px] px-4 py-2.5 border-r rounded-l-lg border-gray-300 justify-center items-center gap-2 flex cursor-pointer ${reportType === "Organization" ? "bg-[#D2DFEB]" : "bg-white"}`}
                    onClick={() => setReportType("Organization")}
                  >
                    <div className="text-slate-800 text-[12px] font-medium font-['Manrope'] leading-tight">
                      Organization
                    </div>
                  </div>
                  <div
                    className={`w-[111px] px-4 py-2.5 border-r border-gray-300 justify-center items-center gap-2 flex cursor-pointer ${reportType === "Corporate" ? "bg-[#D2DFEB]" : "bg-white"}`}
                    onClick={() => setReportType("Corporate")}
                  >
                    <div className="text-slate-800 text-[12px] font-medium font-['Manrope'] leading-tight">
                    Corporate
                    </div>
                  </div>
                  <div
                    className={`w-[111px] px-4 py-2.5 rounded-r-lg justify-center items-center gap-2 flex cursor-pointer ${reportType === "Location" ? "bg-[#D2DFEB]" : "bg-white"}`}
                    onClick={() => setReportType("Location")}
                  >
                    
                    <div className="text-slate-800 text-[12px] font-medium font-['Manrope'] leading-tight">
                    Location
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`grid grid-cols-1 md:grid-cols-4 w-[80%] mb-2 pt-4 ${reportType !== "" ? "visible" : "hidden"}`}
              >
                <div className="mr-2">
                  <label htmlFor="cname" className="text-neutral-800 text-[12px] font-normal ml-1">
                    Select Organization*
                  </label>
                  <div className="mt-2">
                    <select
                      className="block w-full rounded-md border-0 py-1.5 pl-4 text-neutral-500 text-[12px] font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      value={selectedOrg}
                      onChange={handleOrgChange}
                    >
                      <option value="01">Select Organization</option>
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

                {(reportType === "Corporate" || reportType === "Location") && (
                  <div className="mr-2">
                    <label htmlFor="cname" className="text-neutral-800 text-[12px] font-normal ml-1">
                      Select Corporate
                    </label>
                    <div className="mt-2">
                      <select
                        className="block w-full rounded-md border-0 py-1.5 pl-4 text-neutral-500 text-[12px] font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        value={selectedCorp}
                        onChange={handleCorpChange}
                      >
                        <option value="">Select Corporate </option>
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

                {reportType === "Location" && (
                  <div className="mr-2">
                    <label htmlFor="cname" className="text-neutral-800 text-[12px] font-normal ml-1">
                      Select Location
                    </label>
                    <div className="mt-2">
                      <select
                        name="location"
                        className="block w-full rounded-md border-0 py-1.5 pl-4 text-neutral-500 text-[12px] font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        value={formState.location} // Using formState.location
                        onChange={handleChange}
                      >
                        <option value="">Select location</option>
                        {locations.map((location, index) => (
                          <option key={index} value={location.id}>
                            {location.name}
                          </option>
                        ))}
                      </select>
                      {errors.location && (
                         <p className="text-[#007EEF] text-[12px] top=16  left-0 pl-2 mt-2">
                          {errors.location}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <div className="mr-2">
                  <label htmlFor="cname" className="text-neutral-800 text-[12px] font-normal ml-1">
                    Select year
                  </label>
                  <div className="mt-2">
                    <select
                      name="year"
                      className="block w-full rounded-md border-0 py-1.5 pl-4 text-neutral-500 text-[12px] font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      value={formState.year}
                      onChange={handleChange}
                    >
                      <option value="">Select year</option>
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

export default EconomicHeader5;
