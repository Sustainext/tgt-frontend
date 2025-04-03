"use client";
import React, { useState, useEffect } from "react";
import GRISVG from "../../../../../public/gri.svg";
import Image from "next/image";
import DateRangePicker from "@/app/utils/DatePickerComponent";
import { useRouter } from 'next/navigation';
import axiosInstance from "../../../utils/axiosMiddleware";
import { Oval } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewMaterialityAssement = ({ isModalOpen, setIsModalOpen, existingData }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(1);
  const [assessmentApproach, setAssessmentApproach] = useState("");
  const [isDateRangeValid, setIsDateRangeValid] = useState(true);
  const [organisations, setOrganisations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState("");
  const [corporates, setCorporates] = useState([]);
  const [selectedCorp, setSelectedCorp] = useState("");
  const [loopen, setLoOpen] = useState(false);
  const [framework, setFramework] = useState("");
  const [overlapError, setOverlapError] = useState("");
  const [dateExist,setDateexist]=useState(false)
  const [organizationName,setOrganizationName]=useState("")
  const [corporateName,setCorporateName]=useState("")

  const [errors, setErrors] = useState({
    organization: "",
    corporate: "",
    dateRange: "",
    assessmentApproach: "",
    dateExist:""
  });

  const [dateRange, setDateRange] = useState({
    start: null,
    end: null
  });

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

  

  const getMonthYear = (date) => {
    return {
      month: date.getMonth() + 1, // getMonth is zero-indexed, so add 1
      year: date.getFullYear(),
    };
  };
  
  // Helper function to convert the timePeriod string into a start and end object
  const parseTimePeriod = (timePeriod) => {
    const [startStr, endStr] = timePeriod.split(" to ");
  
    // Convert month names to numbers
    const monthNames = {
      Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
      Jul: 7, Aug: 8, Sept: 9, Oct: 10, Nov: 11, Dec: 12
    };
  
    const parseDate = (str) => {
      const [monthName, year] = str.split(" ");
      return { month: monthNames[monthName], year: parseInt(year, 10) };
    };
  
    const start = parseDate(startStr);
    const end = parseDate(endStr);
  
    return { start, end };
  };

  const checkAssessment = (existingAssessments, newAssessment) => {
    const newStart = getMonthYear(newAssessment.startDate);
    const newEnd = getMonthYear(newAssessment.endDate);
  
    for (let assessment of existingAssessments) {
      const { start, end } = parseTimePeriod(assessment.timePeriod);
  
      // Check if the type is the same
      // if (assessment.type === newAssessment.type) {
        // Check for overlap: new range must not be within or equal to the existing range
        const isOverlapping = !(
          (newEnd.year < start.year) || // New range ends before the existing range starts
          (newEnd.year === start.year && newEnd.month < start.month) || // Same year, but new end is before existing start
          (newStart.year > end.year) || // New range starts after the existing range ends
          (newStart.year === end.year && newStart.month > end.month) // Same year, but new start is after existing end
        );
       
        const isSameTypeAndOrganization = 
        assessment.type === newAssessment.type &&
        assessment.organization === newAssessment.organization

        // if(isOverlapping && isSameTypeAndOrganization){
        //     return true
        // }
        const isSameCorporate = assessment.corporate === newAssessment.corporate;
        

        if(isOverlapping && isSameTypeAndOrganization && isSameCorporate){
          return true
      }
  };
  return false
}
  
  


  // const handleOrgChange = (e) => {
  //   console.log(e.target.value,"see")
  //   const newOrg = e.target.value;
  //   setSelectedOrg(newOrg);
  //   setOrganizationName(e.target.name)
  //   setSelectedCorp("");
  //   setErrors((prevErrors) => ({
  //     ...prevErrors,
  //     organization: newOrg ? "" : "Please select Organisation",
  //   }));
  // };

  const handleOrgChange = (e) => {
    const newOrgId = e.target.value;
  
    // Find the selected organization in the `organisations` array by its ID
    const selectedOrganization = organisations.find(org => org.id === parseInt(newOrgId));
  
    // If the organization is found, set the organization name
    const newOrgName = selectedOrganization ? selectedOrganization.name : "";
  
    // Update the selected organization ID and name in the state
    setSelectedOrg(newOrgId);
    setOrganizationName(newOrgName);
  
    // Reset selected corporate (if applicable) and manage errors
    setSelectedCorp("");
    setErrors((prevErrors) => ({
      ...prevErrors,
      organization: newOrgId ? "" : "Please select Organisation",
    }));
  };

  const handleCorpChange = (e) => {
    const newCorp = e.target.value;
    const selectedCorporate = corporates.find(corp => corp.id === parseInt(newCorp));
  
    // If the organization is found, set the organization name
    const newCorpName = selectedCorporate ? selectedCorporate.name : "";
    setSelectedCorp(newCorp);
    setCorporateName(newCorpName)
    setErrors((prevErrors) => ({
      ...prevErrors,
      corporate: newCorp ? "" : "Please select Corporate",
    }));
  };
  

  // const handleDateChange = (newRange) => {
  //   setDateRange(newRange);
  //   setIsDateRangeValid(newRange.start !== null && newRange.end !== null);
  //   const newAssessment = {
  //     type: assessmentApproach=="accordance"?"GRI: In accordance with":"GRI: With reference to", // Type chosen by the user
  //     startDate: new Date(newRange.start), 
  //     endDate: new Date(newRange.end),
  //     organization:organizationName

  //   };
  //   const overlap = checkAssessment(existingData, newAssessment);
    
  //   if (overlap) {
  //     setDateexist(true)
  //           setOverlapError("An assessment already exists for this date range and type.");
  //         } else {
  //           setDateexist(false)
  //           setOverlapError("");
  //         }
  //   setErrors((prevErrors) => ({
  //     ...prevErrors,
  //     dateRange: newRange.start && newRange.end ? "" : "Please select a valid date range",
  //   }));
  // };

  //new one
//   const handleDateChange = (newRange) => {
//     const currentDate = new Date();
    
//     // Calculate two years forward from today
//     const twoYearsForward = new Date(currentDate);
//     twoYearsForward.setFullYear(currentDate.getFullYear() + 2);
    
//     // Calculate two years backward from today (if required)
//     const twoYearsBackward = new Date(currentDate);
//     twoYearsBackward.setFullYear(currentDate.getFullYear() - 2);

//     const startDate = new Date(newRange.start);
//     const endDate = new Date(newRange.end);
    
//     // Check if the date range is within two years from the current date
//     const isWithinTwoYears = (startDate >= twoYearsBackward && endDate <= twoYearsForward);

//     // Set date range validity based on start, end, and the two-year restriction
//     const isDateRangeValid = newRange.start !== null && newRange.end !== null && isWithinTwoYears;
    
//     setDateRange(newRange);
//     setIsDateRangeValid(isDateRangeValid);
    
//     const newAssessment = {
//       type: assessmentApproach === "accordance" ? "GRI: In accordance with" : "GRI: With reference to", // Type chosen by the user
//       startDate: startDate,
//       endDate: endDate,
//       organization: organizationName
//     };
    
//     const overlap = checkAssessment(existingData, newAssessment);
    
//     if (overlap) {
//       setDateexist(true);
//       setOverlapError("An assessment already exists for this date range and type.");
//     } else {
//       setDateexist(false);
//       setOverlapError("");
//     }
    
//     // Set errors, including date range validity message if outside the allowed two-year window
//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       dateRange: newRange.start && newRange.end
//         ? isWithinTwoYears
//           ? ""
//           : "Please select a date range within two years from today."
//         : "Please select a valid date range",
//     }));
// };


const handleDateChange = (newRange) => {
  const currentDate = new Date();
  
  // Calculate two years forward from today
  const twoYearsForward = new Date(currentDate);
  twoYearsForward.setFullYear(currentDate.getFullYear() + 2);
  
  // Calculate two years backward from today
  const twoYearsBackward = new Date(currentDate);
  twoYearsBackward.setFullYear(currentDate.getFullYear() - 2);

  const startDate = new Date(newRange.start);
  const endDate = new Date(newRange.end);
  
  // Check if the date range is within the backward and forward two-year limit
  const isStartDateValid = startDate >= twoYearsBackward && startDate <= twoYearsForward;
  const isEndDateValid = endDate >= twoYearsBackward && endDate <= twoYearsForward;

  // Set date range validity based on the validity of start and end date
  const isDateRangeValid = newRange.start !== null && newRange.end !== null && isStartDateValid && isEndDateValid && startDate<endDate;

  // Update the state
  setDateRange(newRange);
  setIsDateRangeValid(isDateRangeValid);
  
  const newAssessment = {
    type: assessmentApproach === "accordance" ? "GRI: In accordance with" : "GRI: With reference to", // Type chosen by the user
    startDate: startDate,
    endDate: endDate,
    organization: organizationName,
    corporate:corporateName
  };
  
  const overlap = checkAssessment(existingData, newAssessment);
  
  if (overlap) {
    setDateexist(true);
    setOverlapError("An assessment already exists for this date range and type.");
  } else {
    setDateexist(false);
    setOverlapError("");
  }
  
  // Set errors based on date range validity
  setErrors((prevErrors) => ({
    ...prevErrors,
    dateRange: newRange.start && newRange.end
      ? isDateRangeValid
        ? ""
        : "Please choose a date range within two years from today, ensuring the start date is before the end date"
      : "Please select a valid date range",
  }));
};




  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
    setSelectedOrg("");
    setSelectedCorp("");
  };

  

  const handleChangeRadio = (event) => {
    let approach = "";
    let frameworkId = "";

    if (event === "reference") {
      approach = "reference";
      frameworkId = 1;
    } else if (event === "accordance") {
      approach = "accordance";
      frameworkId = 2;
    }

    setAssessmentApproach(approach);
    setFramework(frameworkId);

    setErrors((prevErrors) => ({
      ...prevErrors,
      assessmentApproach: approach ? "" : "Please select an assessment approach",
    }));
  };

  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };

  // const validateForm = () => {
  //   const newErrors = {};

  //   if (!selectedOrg) {
  //     newErrors.organization = "Please select Organisation";
  //   }

  //   if (activeTab === 2 && !selectedCorp) {
  //     newErrors.corporate = "Please select Corporate";
  //   }

  //   if (!dateRange.start || !dateRange.end) {
  //     newErrors.dateRange = "Please select a valid date range";
  //   }

  //   if (!assessmentApproach) {
  //     newErrors.assessmentApproach = "Please select an assessment approach";
  //   }
  //   if(dateExist){
  //     newErrors.dateExist = "An assessment already exists for this date range and type.";
  //   }

  //   setErrors(newErrors);

  //   return Object.keys(newErrors).length === 0;
  // };

  const validateForm = () => {
    const newErrors = {};

    // Validate organization selection
    if (!selectedOrg) {
      newErrors.organization = "Please select Organisation";
    }

    // If active tab requires corporate selection, validate it
    if (activeTab === 2 && !selectedCorp) {
      newErrors.corporate = "Please select Corporate";
    }

    // Validate the date range, including whether a valid date range was chosen
    if (!dateRange.start || !dateRange.end) {
      newErrors.dateRange = "Please select a valid date range";
    } else if (!isDateRangeValid) {
      newErrors.dateRange = "Please select a date range within two years before or after today.";
    }

    // Validate assessment approach selection
    if (!assessmentApproach) {
      newErrors.assessmentApproach = "Please select an assessment approach";
    }

    // Check if there is an overlap in the date range and add the appropriate error message
    if (dateExist) {
      newErrors.dateExist = "An assessment already exists for this date range and type.";
    }

    // Set errors to state
    setErrors(newErrors);

    // Return whether the form is valid
    return Object.keys(newErrors).length === 0;
};


  const handleSubmit = async () => {
    if (!validateForm()) {  
      return;
    }

    LoaderOpen();

    const data = {
      organization: selectedOrg,
      corporate: selectedCorp,
      start_date: dateRange.start,
      end_date: dateRange.end,
      framework: framework,
      approach: assessmentApproach === "accordance" ? "GRI: In accordance with" : "GRI: With Reference to",
      status: "in_progress",
      esg_selected:{"environmentChecked":false,"socialChecked":false,"governanceChecked":false}
    };

    const url = `${process.env.BACKEND_API_URL}/materiality_dashboard/materiality-assessments/`;

    try {
      const response = await axiosInstance.post(url, data);
      if (response.status === 201) {
        toast.success("Assessment Created", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        LoaderClose();
        localStorage.setItem("id", response.data.id);
        if (assessmentApproach === "accordance") {
          localStorage.setItem("hasVisitedacc",'true');
          router.push("Materiality/accordance");
        } else if (assessmentApproach === "reference") {
          localStorage.setItem("hasVisitedref",'true');
          router.push("Materiality/reference");
        }
      } else {
        toast.error("Oops, something went wrong", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        LoaderClose();
      }
    } catch (error) {
      toast.error("Oops, something went wrong", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      LoaderClose();
    }
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-[#00000080] z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-3xl">
            <div className="flex justify-between items-center drop-shadow-lg w-full">
              <div className="flex">
                <Image src={GRISVG} className="w-7 h-7 mr-2" alt="GRI Logo" />
                <h2 className="text-black text-[18px] font-bold">
                  Creating New Materiality Assessment
                </h2>
              </div>
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => {
                  setOverlapError("");
                  setErrors(
                    {
                      organization: "",
                      corporate: "",
                      dateRange: "",
                      assessmentApproach: "",
                      dateExist:""
                    }
                  )
                  setDateRange(
                    {
                      start: null,
                      end: null
                    }
                  )
                  setAssessmentApproach("")
                  setSelectedOrg("");
                  setSelectedCorp("");
                  setIsModalOpen(false);
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
            <div>
              <p className="text-[13px] text-[#495057] font-[600] px-3 pt-5">
                Select Materiality Assessment Approach
              </p>
            </div>
            <div>
              <form className="space-y-2 px-6 pt-4">
                <div
                  className="flex items-center"
                  onClick={() => {
                    handleChangeRadio("accordance");
                    setDateRange(
                      {
                        start: null,
                        end: null
                      }
                    )
                  }}
                >
                  <input
                    id="accordance"
                    name="radio"
                    type="radio"
                    value="accordance"
                    checked={assessmentApproach === "accordance"}
                    className="form-radio h-4 w-4 accent-[#008000]"
                  />
                  <label
                    htmlFor="accordance"
                    className="ml-2 text-gray-600 text-[15px] cursor-pointer"
                  >
                    GRI: In Accordance With
                  </label>
                </div>
               
                <div
                  className="flex items-center"
                  onClick={() => {
                    handleChangeRadio("reference");
                    setDateRange(
                      {
                        start: null,
                        end: null
                      }
                    )
                  }}
                >
                  <input
                    id="reference"
                    name="radio"
                    type="radio"
                    value="reference"
                    checked={assessmentApproach === "reference"}
                    className="form-radio h-4 w-4 accent-[#008000]"
                  />
                  <label
                    htmlFor="reference"
                    className="ml-2 text-gray-600 text-[15px] cursor-pointer"
                  >
                    GRI: with Reference To
                  </label>
                </div>
                {errors.assessmentApproach && (
                  <div className="text-red-600 text-xs mt-1">
                    {errors.assessmentApproach}
                  </div>
                )}
              </form>
            </div>

            <div>
              <p className="text-[13px] text-[#495057] font-[600] px-3 pt-8">
                Select Topic by
              </p>
            </div>
            <div className="w-full mx-3 mt-4">
              <div className="rounded-lg shadow border border-gray-300 justify-start items-start flex w-[207px]">
                <div
                  className={`w-[111px] px-4 py-2.5 border-r rounded-l-lg border-gray-300 justify-center items-center gap-2 flex cursor-pointer ${
                    activeTab === 1 ? "bg-sky-100" : "bg-white"
                  }`}
                  onClick={() => {
                    setOverlapError("");
                    setErrors(
                      {
                        organization: "",
                        corporate: "",
                        dateRange: "",
                        assessmentApproach: "",
                        dateExist:""
                      }
                    )
                    setDateRange(
                      {
                        start: null,
                        end: null
                      }
                    )
                    setAssessmentApproach("")
                    setSelectedOrg("");
                    setSelectedCorp("");
                    handleTabClick(1);
                  }}
                >
                  <div className="text-slate-800 text-[12px] font-medium font-['Manrope'] leading-tight">
                    Organization
                  </div>
                </div>
                <div
                  className={`w-[111px] px-4 py-2.5 border-r rounded-r-lg border-gray-300 justify-center items-center gap-2 flex cursor-pointer ${
                    activeTab === 2 ? "bg-sky-100" : "bg-white"
                  }`}
                  onClick={() => {
                    setOverlapError("");
                    setErrors(
                      {
                        organization: "",
                        corporate: "",
                        dateRange: "",
                        assessmentApproach: "",
                        dateExist:""
                      }
                    )
                    setDateRange(
                      {
                        start: null,
                        end: null
                      }
                    )
                    setAssessmentApproach("")
                    setSelectedOrg("");
                    setSelectedCorp("");
                    handleTabClick(2);

                  }}
                >
                  <div className="text-slate-800 text-[12px] font-medium font-['Manrope'] leading-tight">
                    Corporate
                  </div>
                </div>
              </div>

              <div className="mt-4 w-full">
                {activeTab === 1 ? (
                  <div className="flex justify-between items-center">
                    <div className="mr-2 w-full">
                      <label
                        htmlFor="cname"
                        className="text-neutral-800 text-[12px] font-normal"
                      >
                        Select Organization
                      </label>
                      <div className="mt-2">
                        <select
                          className="py-1.5 border border-gray-300 rounded-md w-full text-sm pl-2"
                          value={selectedOrg}
                          onChange={handleOrgChange}
                          name={organizationName}
                        >
                          <option disabled={true} value="">
                            Select Organization
                          </option>
                          {organisations &&
                            organisations.map((org) => (
                              <option key={org.id} value={org.id} name={org.name}>
                                {org.name}
                              </option>
                            ))}
                        </select>
                        {errors.organization && (
                          <div className="text-red-600 text-xs mt-1">
                            {errors.organization}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mr-2 w-full">
                      <label
                        htmlFor="cname"
                        className="text-neutral-800 text-[12px] font-normal"
                      >
                        Specify Reporting Period
                      </label>
                      <div className="mt-2">
                        <DateRangePicker
                          startDate={dateRange.start}
                          endDate={dateRange.end}
                          onDateChange={handleDateChange}
                        />
                        {errors.dateRange && (
                          <div className="text-red-600 text-xs mt-1">
                            {errors.dateRange}
                          </div>
                        )}
                        {overlapError && (
                            <div className="text-red-600 text-xs mt-1">
                              {overlapError}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-center">
                      <div className="mr-2 w-full">
                        <label
                          htmlFor="cname"
                          className="text-neutral-800 text-[12px] font-normal"
                        >
                          Select Organization
                        </label>
                        <div className="mt-2">
                          <select
                            className="py-1.5 border border-gray-300 rounded-md w-full text-sm pl-2"
                            value={selectedOrg}
                            onChange={handleOrgChange}
                            name={organizationName}
                          >
                            <option disabled={true} value="">
                              Select Organization
                            </option>
                            {organisations &&
                              organisations.map((org) => (
                                <option key={org.id} value={org.id} name={org.name}>
                                  {org.name}
                                </option>
                              ))}
                          </select>
                          {errors.organization && (
                            <div className="text-red-600 text-xs mt-1">
                              {errors.organization}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mr-2 w-full">
                        <label
                          htmlFor="cname"
                          className="text-neutral-800 text-[12px] font-normal"
                        >
                          Select Corporate
                        </label>
                        <div className="mt-2">
                          <select
                            className="py-1.5 border border-gray-300 rounded-md w-full text-sm pl-2"
                            value={selectedCorp}
                            onChange={handleCorpChange}
                          >
                            <option disabled={true} value="">
                              Select Corporate
                            </option>
                            {corporates &&
                              corporates.map((corp) => (
                                <option key={corp.id} value={corp.id} name={corp.name}>
                                  {corp.name}
                                </option>
                              ))}
                          </select>
                          {errors.corporate && (
                            <div className="text-red-600 text-xs mt-1">
                              {errors.corporate}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="mr-2 w-full mt-2">
                        <label
                          htmlFor="cname"
                          className="text-neutral-800 text-[12px] font-normal"
                        >
                          Specify Reporting Period
                        </label>
                        <div className="mt-2 w-[50%]">
                          <DateRangePicker
                            startDate={dateRange.start}
                            endDate={dateRange.end}
                            onDateChange={handleDateChange}
                          />
                          {errors.dateRange && (
                            <div className="text-red-600 text-xs mt-1">
                              {errors.dateRange}
                            </div>
                          )}
                          {overlapError && (
                            <div className="text-red-600 text-xs mt-1">
                              {overlapError}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-end items-center mt-5">
                <button
                  className="xl:w-2/6 h-full mr-2 py-2 px-3 bg-[#007EEF] text-white rounded-[8px] shadow cursor-pointer"
                  onClick={handleSubmit}
                >
                  Start Materiality Assessment
                </button>
              </div>
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
      {/* <ToastContainer /> */}
    </>
  );
};

export default NewMaterialityAssement;
