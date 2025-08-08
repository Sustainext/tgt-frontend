"use client";
import { useState, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { yearInfo } from "../../../../shared/data/yearInfo";
import { AiOutlineCalendar } from "react-icons/ai";
import TableSidebar from "./TableSidebar";
import DynamicTable from "./customTable";
import DateRangePicker from "@/app/utils/DatePickerComponent";
import { Oval } from "react-loader-spinner";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { columns1, columns2, columns3,columns4, columns5, columns6 } from "./data";

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

function generateColumns(apiResponse) {

    const dataKeys = Object.keys(apiResponse[0] || {});
  
    const columns = dataKeys.map((key, index) => {
      return {
        label: capitalizeFirstLetter(key.replace(/_/g, " ")),
        dataIndex: key,
        headerClass:
          "px-2 py-2 text-[12px] text-[#727272] w-[10%] text-center",
        cellClass:
          "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px]",
      };
    });
  
    return columns;
  }

  function removeContributionColumn(columns) {
    return columns.filter(column => column.dataIndex !== "contribution");
  }
  

const AnalyseAirQuality = ({ isBoxOpen }) => {
  const [analyseData, setAnalyseData] = useState([]);
  const [organisations, setOrganisations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedCorp, setSelectedCorp] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedsetLocation, setSelectedSetLocation] = useState("");
  const [airPollutantinKg, setairPollutantinKg] = useState([]);
  const [airPollutantinPpm, setairPollutantinPpm] = useState([]);
  const [airPollutantByLOcation, setairPollutantByLOcation] = useState([]);
  const [airEmissionByLocationKg, setairEmissionByLocationKg] = useState([]);
  const [airEmissionByLocationPpm, setairEmissionByLocationPpm] = useState([]);
  const [odsSubstance, setOdsSubstance] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2023");
  const [corporates, setCorporates] = useState([]);
  const [reportType, setReportType] = useState("Organization");
  const [loopen, setLoOpen] = useState(false);
  const [dynamicColumn1,setdynamicColumn1]=useState(columns1)
  const [dynamicColumn3,setdynamicColumn3]=useState(columns3)
  const [dynamicColumn4,setdynamicColumn4]=useState(columns4)
  const [dynamicColumn5,setdynamicColumn5]=useState(columns5)
  const [show,setShow]=useState(false)
  const [dateRange, setDateRange] = useState({
    start: null,
    end: null,
  });

  const [isDateRangeValid, setIsDateRangeValid] = useState(true);
  const [datasetparams, setDatasetparams] = useState({
    organisation: "",
    corporate: "",
    location: "",
    start: null,
    end: null,
  });
  const [errors, setErrors] = useState({
    organization: 'Please select Organisation',
    corporate: 'Please select Corporate',
    location: 'Please select Location',
  });
  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };

 

  const fetchData = async (params) => {
    if (!params.start || !params.end) {
      setIsDateRangeValid(false);
      console.error("Invalid date range selected");
      return;
    } else {
      const startDate = new Date(params.start);
      const endDate = new Date(params.end);

      if (endDate < startDate) {
        setIsDateRangeValid(false);
        setDateRange({
          start: null,
          end: null,
        });
        console.error("End date cannot be before start date");
        return;
      } else {
        setIsDateRangeValid(true);
      }
    }
    LoaderOpen();
    setairPollutantinKg([])
    setairPollutantinPpm([])
    setairPollutantByLOcation([])
    try {
      const response = await axiosInstance.get(
        `sustainapp/get_air_quality_analyze/`,
        {
          params: params,
        }
      );

      const data = response.data;

      const {
        air_emission_by_pollution, air_emission_by_pollution_ppm_or_ugm2,percentage_contribution_of_pollutant_by_location,total_air_pollution_by_location,total_air_pollution_by_location_ppm_or_ugm2,
        ozone_depleting_substances
      } = data;

      if(air_emission_by_pollution && air_emission_by_pollution.length>0 && air_emission_by_pollution[0].contribution==""){
        setdynamicColumn1(air_emission_by_pollution?.length>0?removeContributionColumn(columns1):columns1)
        setShow(true)
      }
      else{
        setdynamicColumn1(columns1)
        setShow(false)
      }
      
      setdynamicColumn3(percentage_contribution_of_pollutant_by_location.length>0?generateColumns(percentage_contribution_of_pollutant_by_location):columns3)
      setdynamicColumn4(total_air_pollution_by_location.length>0?generateColumns(total_air_pollution_by_location):columns4)
      setdynamicColumn5(total_air_pollution_by_location_ppm_or_ugm2.length>0?generateColumns(total_air_pollution_by_location_ppm_or_ugm2):columns5)
      
      setairPollutantinKg(air_emission_by_pollution)
      setairPollutantinPpm(air_emission_by_pollution_ppm_or_ugm2)
      setairPollutantByLOcation(percentage_contribution_of_pollutant_by_location)
      setairEmissionByLocationKg(total_air_pollution_by_location)
      setairEmissionByLocationPpm(total_air_pollution_by_location_ppm_or_ugm2)
      setOdsSubstance(ozone_depleting_substances)

     

      const resultArray = Object.keys(data).map((key) => ({
        key: key,
        value: data[key],
      }));

      setAnalyseData(resultArray);
      LoaderClose();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      LoaderClose();
    }
  };

  useEffect(() => {
    fetchData(datasetparams);
  }, [datasetparams]);

  useEffect(() => {
    const fetchOrg = async () => {
      try {
        const response = await axiosInstance.get(`/orggetonly`);
        setOrganisations(response.data);
        // setSelectedOrg(response.data[0].id);
        setDatasetparams((prevParams) => ({
          ...prevParams,
          organisation: response.data[0].id,
        }));
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
          setSelectedLocation(response.data || []);
          console.log(response.data, "location test");
        } catch (e) {
          console.error("Failed fetching locations:", e);
          setSelectedLocation([]); // Set as an empty array on error
        }
      }
    };

    fetchLocation();
  }, [selectedCorp]);

  const handleReportTypeChange = (type) => {
    setReportType(type);
    
    if (type === "Organization") {
      setSelectedCorp(""); 
      setSelectedLocation(""); 
    }
    if(type === "Corporate"){
        setairPollutantinKg([])
        setairPollutantinPpm([])
        setairPollutantByLOcation([])
      setDateRange({
        start: null,
        end: null
      });
      setIsDateRangeValid(false);
    }
    if(type === "Location"){
        setairPollutantinKg([])
        setairPollutantinPpm([])
        setairPollutantByLOcation([])
      setDateRange({
        start: null,
        end: null
      });
      setIsDateRangeValid(false);
    }
  };

  const handleOrganizationChange = (e) => {
    const newOrg = e.target.value;
    setSelectedOrg(newOrg);
    setSelectedCorp("");
    setSelectedSetLocation("");
    setairPollutantinKg([])
    setairPollutantinPpm([])
    setairPollutantByLOcation([])

    setDatasetparams((prevParams) => ({
      ...prevParams,
      organisation: newOrg,
      corporate: "",
      location: "",
    }));
    if (!newOrg) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        organization: "Please select Organisation",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        organization: "",
      }));
    }
  };

  const handleOrgChange = (e) => {
    const newCorp = e.target.value;
    setSelectedCorp(newCorp);
    setSelectedSetLocation("");

    setDatasetparams((prevParams) => ({
      ...prevParams,
      corporate: newCorp,
      location: "",
    }));
    if (!newCorp) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        corporate: "Please select Corporate",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        corporate: "",
      }));
    }
  };

  const handleLocationChange = (e) => {
    const newLocation = e.target.value;
    setSelectedSetLocation(newLocation);

    setDatasetparams((prevParams) => ({
      ...prevParams,
      location: newLocation,
    }));
    if (!newLocation) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        location: "Please select Location",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        location: "",
      }));
    }
  };

  const handleDateChange = (newRange) => {
    setDateRange(newRange);

    setDatasetparams((prevParams) => ({
      ...prevParams,
      start: newRange.start,
      end: newRange.end,
    }));
  };

  return (
    <>
      <div>
      <div className="mb-2 flex-col items-center xl:pt-4  gap-6">
      <div className="mt-4 pb-3 xl:mx-5 lg:mx-5 md:mx-5 2xl:mx-5 4k:mx-5 2k:mx-5 mx-2  text-left">
            <div className="mb-2 flex-col items-center gap-6">
            <div className="justify-start items-center gap-4 inline-flex">
                <div className="text-zinc-600 text-[12px]  font-semibold font-['Manrope']">
                  View By:
                </div>
                <div className="rounded-lg shadow  justify-start items-start flex">
                  <div
                    className={`w-[111px] px-4 py-2.5 border rounded-l-lg border-gray-300 justify-center items-center gap-2 flex cursor-pointer ${
                      reportType === "Organization" ? "bg-[#d2dfeb]" : "bg-white"
                    }`}
                    onClick={() => handleReportTypeChange("Organization")}
                  >
                    <div className="text-slate-800 text-[12px]  font-medium font-['Manrope'] leading-tight">
                      Organization
                    </div>
                  </div>
                  <div
                    className={`w-[111px] px-4 py-2.5 border-y border-r border-gray-300 justify-center items-center gap-2 flex cursor-pointer ${
                      reportType === "Corporate" ? "bg-[#d2dfeb]" : "bg-white"
                    }`}
                    onClick={() => handleReportTypeChange("Corporate")}
                  >
                    <div className="text-slate-700 text-[12px]  font-medium font-['Manrope'] leading-tight">
                      Corporate
                    </div>
                  </div>
                  <div
                    className={`w-[111px] px-4 py-2.5 border-y border-r rounded-r-lg border-gray-300 justify-center items-center gap-2 flex cursor-pointer ${
                      reportType === "Location" ? "bg-[#d2dfeb]" : "bg-white"
                    }`}
                    onClick={() => handleReportTypeChange("Location")}
                  >
                    <div className="text-slate-700 text-[12px]  font-medium font-['Manrope'] leading-tight">
                      Location
                    </div>
                  </div>
                </div>
              </div>
              <div
                  className={`grid grid-cols-1 md:grid-cols-4 xl:w-[80%] lg:w-[80%] 2xl:w-[80%] md:w-[100%] 4k:w-[80%] 2k:w-[80%] w-[100%] mb-2 pt-4 ${reportType !== "" ? "visible" : "hidden"
                  }`}
              >
                <div className="mr-2">
                  <label
                    htmlFor="cname"
                    className="text-neutral-800 text-[12px] font-normal ml-1"
                  >
                    Select Organization*
                  </label>
                  <div className="mt-2 relative">
                    <select
                      className="block w-full rounded-md border-0 py-1.5 pl-4 pr-8 text-neutral-500 text-[12px] font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 appearance-none"
                      value={selectedOrg}
                      onChange={handleOrganizationChange}
                    >
                      <option value="01">--Select Organization--- </option>
                      {organisations &&
                        organisations.map((org) => (
                          <option key={org.id} value={org.id}>
                            {org.name}
                          </option>
                        ))}
                    </select>
                    <MdKeyboardArrowDown className="absolute right-2 top-2 pointer-events-none" size={16} />
                    {errors.organization && (
                    <p className="text-[#007EEF] text-[12px] pl-2 mt-2">
                      {errors.organization}
                    </p>
                  )}
                  </div>
                </div>
                {(reportType === "Corporate" || reportType === "Location") && (
                  <div className="mr-2">
                    <label
                      htmlFor="cname"
                      className="text-neutral-800 text-[12px] font-normal ml-1"
                    >
                      Select Corporate
                    </label>
                    <div className="mt-2 relative">
                      <select
                        className="block w-full rounded-md border-0 py-1.5 pl-4 pr-8 text-neutral-500 text-[12px] font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 appearance-none"
                        value={selectedCorp}
                        onChange={handleOrgChange}
                      >
                        <option value="">--Select Corporate--- </option>
                        {corporates &&
                          corporates.map((corp) => (
                            <option key={corp.id} value={corp.id}>
                              {corp.name}
                            </option>
                          ))}
                      </select>
                      <MdKeyboardArrowDown className="absolute right-2 top-2 pointer-events-none" size={16} />
                      {errors.corporate && (
                      <p className="text-[#007EEF] text-[12px] pl-2 mt-2">
                        {errors.corporate}
                      </p>
                    )}
                    </div>
                  </div>
                )}
                {reportType === "Location" && (
                  <div className="mr-2">
                    <label
                      htmlFor="cname"
                      className="text-neutral-800 text-[12px] font-normal ml-1"
                    >
                      Select Location
                    </label>
                    <div className="mt-2 relative">
                      <select
                        className="block w-full rounded-md border-0 py-1.5 pl-4 pr-8 text-neutral-500 text-[12px] font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 appearance-none"
                        value={selectedsetLocation}
                        onChange={handleLocationChange}
                      >
                        <option value="">--Select Location--- </option>
                        {selectedLocation &&
                          selectedLocation.map((location) => (
                            <option key={location.id} value={location.id}>
                              {location.name}
                            </option>
                          ))}
                      </select>
                      <MdKeyboardArrowDown className="absolute right-2 top-2 pointer-events-none" size={16} />
                      {errors.location && (
                      <p className="text-[#007EEF] text-[12px] pl-2 mt-2">{errors.location}</p>
                    )}
                    </div>
                  </div>
                )}
                <div className="mr-2">
                  <label
                    htmlFor="cname"
                    className="text-neutral-800 text-[12px] font-normal ml-1"
                  >
                    Select Date
                  </label>
                  <div className="mt-2">
                    <DateRangePicker
                      startDate={dateRange.start}
                      endDate={dateRange.end}
                      onDateChange={handleDateChange}
                    />
                  {!isDateRangeValid && (
                     <p className="text-[#007EEF] text-[12px] top=16  left-0 pl-2 mt-2">
                     Please select a date range
                    </p>
                  )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block">
          <div className="flex-1 ps-4 me-4 max-w-full overflow-hidden">
            {airPollutantinKg && airPollutantinKg.length>0 && (
               <div className="mb-6">
               <p className="text-black text-[15px] font-bold ">
               Air Emissions by Pollutants (in Kg)
               </p>
               <div
                 id="materials1"
  className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
               >
                {show? <p className="text-neutral-500 text-[13px] font-semibold mt-1 mb-2">
               Contribution % calculation cannot be performed due to differing units of the air pollutants.
               </p>:(<div></div>)}
                
               <div className="flex gap-2">
               <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                   <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                     GRI 305-7a
                   </div>
                 </div>
                 <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                   <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                     GRI 305-7b
                   </div>
                 </div>
               </div>
                 
               </div>
               <DynamicTable columns={dynamicColumn1} data={airPollutantinKg} />
             </div>
            )}
           
            {airPollutantinPpm && airPollutantinPpm.length>0 && (
               <div className="mb-6">
               <p className="text-black text-[15px] font-bold mb-2 ">
               Air Emissions by Pollutants (in ppm or µg/m³)
               </p>
               <div
                 id="materials2"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
               >
                 <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                   <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                     GRI 305-7
                   </div>
                 </div>
                 
               </div>
               <DynamicTable columns={columns2} data={airPollutantinPpm} />
             </div>
            )}

            {airPollutantByLOcation && airPollutantByLOcation.length>0 && (
              (
                <div className="mb-6">
                <p className="text-black text-[15px] font-bold mb-2">
                Percentage Contribution of Air Pollutants by Location
                </p>
                <div
                  id="materials3"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
                >
                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 305-7
                    </div>
                  </div>
                </div>
                <DynamicTable columns={dynamicColumn3} data={airPollutantByLOcation} />
              </div>
              )
            )}
           
           
            {airEmissionByLocationKg && airEmissionByLocationKg.length>0 && (
               <div className="mb-6">
               <p className="text-black text-[15px] font-bold mb-2">
               Total  Air Emissions by Location (in Kg)		
               </p>
               <div
                 id="materials4"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
               >
                 <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                   <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                     GRI 305-7a
                   </div>
                 </div>
                 <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                   <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                     GRI 305-7b
                   </div>
                 </div>
               </div>
               <DynamicTable columns={dynamicColumn4} data={airEmissionByLocationKg} />
             </div>
            )}
           
            {airEmissionByLocationPpm && airEmissionByLocationPpm.length>0 && (
               <div className="mb-6">
               <p className="text-black text-[15px] font-bold mb-2">
               Total Air Emissions by Location (in ppm or µg/m³)
               </p>
               <div
                 id="materials5"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
               >
                 <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                   <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                     GRI 305-7
                   </div>
                 </div>
                 
               </div>
               <DynamicTable columns={dynamicColumn5} data={airEmissionByLocationPpm} />
             </div>
            )}
           
            <div className="mb-6">
              <p className="text-black text-[15px] font-bold ">
              Ozone Depleting Substances
              </p>
              <div
                id="materials6"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
                >
                  <p className="mb-2 ml-1"> Total ODS Emissions by Source</p>
                <div className="flex xl:justify-end lg:justify-end md:justify-end 2xl:justify-end 4k:justify-end 2k:justify-end gap-2">
                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 305-6a
                  </div>
                </div>
                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 305-6b
                  </div>
                </div>
                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 305-6c
                  </div>
                </div>
                </div>
               
              </div>
              <DynamicTable columns={columns6} data={odsSubstance} />
            </div>
          
          </div>
          <div
            style={{
              position: `${isBoxOpen ? "unset" : "sticky"}`,
              top: "10rem",
              // zIndex: "0",
              height: "fit-content",
              backgroundColor: "white",
              paddingBottom: "1rem",
            }}
                   className="mb-8 me-2 hidden xl:block lg:block md:hidden 2xl:block 4k:block 2k:block"
          >
            <TableSidebar />
          </div>
        </div>
      </div>
      {loopen && (
        <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50 z-[100]">
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

export default AnalyseAirQuality;
