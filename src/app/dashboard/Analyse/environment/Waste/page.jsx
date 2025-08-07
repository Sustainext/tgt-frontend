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
import DynamicTable2 from './customTable2'
import {
  columns1,
  columns2,
  columns3,
  columns4,
  columns5,
  columns6,
  columns7,
  columns8,
  columns9,
  columns10,
  columns11,
  columns12
} from "./data";

const AnalyseWaste = ({ isBoxOpen }) => {
  const [analyseData, setAnalyseData] = useState([]);
  const [organisations, setOrganisations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedCorp, setSelectedCorp] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedsetLocation, setSelectedSetLocation] = useState("");
  const [wastedata1, setWastedata1] = useState([]);
  const [wastedata2, setWastedata2] = useState([]);
  const [wastedata3, setWastedata3] = useState([]);
  const [wastedata4, setWastedata4] = useState([]);
  const [wastedata5, setWastedata5] = useState([]);
  const [wastedata6, setWastedata6] = useState([]);
  const [wastedata7, setWastedata7] = useState([]);
  const [wastedata8, setWastedata8] = useState([]);
  const [wastedata9, setWastedata9] = useState([]);
  const [Effdata1, setEffdata1] = useState([]);
  const [Effdata2, setEffdata2] = useState([]);
  const [Effdata3, setEffdata3] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2023");
  const [corporates, setCorporates] = useState([]);
  const [reportType, setReportType] = useState("Organization");
  const [loopen, setLoOpen] = useState(false);
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
    setWastedata1([]);
    setWastedata2([]);
    setWastedata3([]);
    setWastedata4([]);
    setWastedata5([]);
    setWastedata6([]);
    setWastedata7([]);
    setWastedata8([]);
    setWastedata9([]);
    setEffdata1([]);
    setEffdata2([]);
    setEffdata3([]);
    try {
      const response = await axiosInstance.get(
        `/sustainapp/get_waste_analysis`,
        {
          params: params,
        }
      );

      const data = response.data;
      console.log(data, "testing");

      const {
        waste_generated_by_material,
        waste_generated_by_location,
        hazardous_and_non_hazardous_waste_composition,
        waste_directed_to_disposal_by_material_type,
        waste_diverted_from_disposal_by_material_type,
        hazardous_waste_diverted_form_disposal,
        non_hazardeous_waste_diverted_from_disposal,
        hazardeous_waste_directed_to_disposal,
        non_hazardeous_waste_directed_to_disposal,
        total_number_and_volume_by_material,
        total_number_and_volume_by_location,
        total_number_and_volume_significant_spills,
      } = data;
      const removeAndStoreLastObject = (array) => {
        if (array.length > 0) {
          return array.pop();
        } else {
          return null;
        }
      };

      const waste_generated_by_material_total = removeAndStoreLastObject(
        waste_generated_by_material
      );
      const roundedWasteGeneratedByMaterial = waste_generated_by_material.map(
        (item) => ({
          ...item,
          total_waste: item.total_waste,
        })
      );
      roundedWasteGeneratedByMaterial.push({
        material_type: "Total",
        contribution: "",
        totalrow: 2,
        total_waste:
          waste_generated_by_material_total.total_waste_generated,
        units: "t (metric tons)",
      });
      setWastedata1(roundedWasteGeneratedByMaterial);
      //---table1--//
      const waste_generated_by_location_total = removeAndStoreLastObject(
        waste_generated_by_location
      );
      const wastegeneratedbylocation = waste_generated_by_location.map(
        (item) => ({
          ...item,
          total_waste: item.total_waste,
        })
      );
      wastegeneratedbylocation.push({
        material_type: "Total",
        location: "",
        contribution: "",
        totalrow: 2,
        total_waste:
          waste_generated_by_location_total.total_waste_generated,
        units: "t (metric tons)",
      });
      setWastedata2(wastegeneratedbylocation);
      //---table2--//
      const nonhazardous_total = removeAndStoreLastObject(
        hazardous_and_non_hazardous_waste_composition
      );
      const wastegeneratedbycategory =
        hazardous_and_non_hazardous_waste_composition.map((item) => ({
          ...item,
          total_waste: item.total_waste,
        }));
      wastegeneratedbycategory.push({
        material_type: "Total",
        contribution: "",
        totalrow: 2,
        total_waste: nonhazardous_total.total_waste_generated,
        units: "t (metric tons)",
      });
      setWastedata3(wastegeneratedbycategory);

      //---table3--//
      const waste_directed_to_disposal_by_material_total =
        removeAndStoreLastObject(waste_directed_to_disposal_by_material_type);
      const wastedirectedtodisposalbymaterialtype =
        waste_directed_to_disposal_by_material_type.map((item) => ({
          ...item,
          total_waste: item.total_waste,
        }));
      wastedirectedtodisposalbymaterialtype.push({
        disposal_method: "",
        material_type: "Total",
        contribution: "",
        totalrow: 3,
        maprow: 1,
        total_waste:
          waste_directed_to_disposal_by_material_total.total_waste_generated,
        units: "t (metric tons)",
      });
      setWastedata4(wastedirectedtodisposalbymaterialtype);

      //---table4--//
      const waste_diverted_from_disposal_by_material_type_total =
        removeAndStoreLastObject(waste_diverted_from_disposal_by_material_type);
      const wastedivertedfromdisposalbymaterialtype =
        waste_diverted_from_disposal_by_material_type.map((item) => ({
          ...item,
          total_waste: item.total_waste,
        }));
      wastedivertedfromdisposalbymaterialtype.push({
        recovery_operation: "",
        material_type: "Total",
        contribution: "",
        totalrow: 3,
        maprow: 1,
        total_waste:
          waste_diverted_from_disposal_by_material_type_total.total_waste_generated,
        units: "t (metric tons)",
      });
      setWastedata5(wastedivertedfromdisposalbymaterialtype);
      //---table5--//
      const hazardous_waste_diverted_form_disposal_total =
        removeAndStoreLastObject(hazardous_waste_diverted_form_disposal);
      const hazardouswastedivertedformdisposaltotal =
        hazardous_waste_diverted_form_disposal.map((item) => ({
          ...item,
          total_waste: item.total_waste,
        }));
      hazardouswastedivertedformdisposaltotal.push({
        material_type: "Total",
        total_waste:
          hazardous_waste_diverted_form_disposal_total.total_waste_generated,

        units: "t (metric tons)",
        recycled_percentage: "",
        preparation_of_reuse_percentage: "",
        other_percentage: "",
        site: "",
        totalrow: 6,
      });
      setWastedata6(hazardouswastedivertedformdisposaltotal);
      //---table6--//
      const hnon_hazardeous_waste_diverted_from_disposal_total =
        removeAndStoreLastObject(non_hazardeous_waste_diverted_from_disposal);
      const non_hazardeouswastedivertedfromdisposal =
        non_hazardeous_waste_diverted_from_disposal.map((item) => ({
          ...item,
          total_waste: item.total_waste,
        }));
      non_hazardeouswastedivertedfromdisposal.push({
        material_type: "Total",
        total_waste:
          hnon_hazardeous_waste_diverted_from_disposal_total.total_waste_generated,

        units: "t (metric tons)",
        recycled_percentage: "",
        preparation_of_reuse_percentage: "",
        other_percentage: "",
        site: "",
        totalrow: 6,
      });
      setWastedata7(non_hazardeouswastedivertedfromdisposal);
      //---table7--//
      const hazardeous_waste_directed_to_disposal_total =
        removeAndStoreLastObject(hazardeous_waste_directed_to_disposal);
      const hazardeous_wastedirectedtodisposal =
        hazardeous_waste_directed_to_disposal.map((item) => ({
          ...item,
          total_waste: item.total_waste,
        }));
      hazardeous_wastedirectedtodisposal.push({
        material_type: "Total",
        total_waste:
          hazardeous_waste_directed_to_disposal_total.total_waste_generated,

        units: "t (metric tons)",
        inceneration_with_energy_percentage: "",
        inceneration_without_energy_percentage: "",
        landfill_percentage: "",
        other_disposal_percentage: "",
        external_percentage: "",
        site: "",
        totalrow: 9,
      });
      setWastedata8(hazardeous_wastedirectedtodisposal);
      //---table8--//
      const non_hazardeous_waste_directed_to_disposal_total =
        removeAndStoreLastObject(non_hazardeous_waste_directed_to_disposal);
      const non_hazardeouswastedirectedtodisposal =
        non_hazardeous_waste_directed_to_disposal.map((item) => ({
          ...item,
          total_waste: item.total_waste,
        }));
      non_hazardeouswastedirectedtodisposal.push({
        material_type: "Total",
        total_waste:
          non_hazardeous_waste_directed_to_disposal_total.total_waste_generated,

        units: "t (metric tons)",
        inceneration_with_energy_percentage: "",
        inceneration_without_energy_percentage: "",
        landfill_percentage: "",
        other_disposal_percentage: "",
        external_percentage: "",
        site: "",
        totalrow: 9,
      });
      setWastedata9(non_hazardeouswastedirectedtodisposal);
      //---table9--//
      const resultArray = Object.keys(data).map((key) => ({
        key: key,
        value: data[key],
      }));

      const formattedMaterialData = formatMaterialData(total_number_and_volume_by_material || []);
      const formattedLocationData = formatLocationData(total_number_and_volume_by_location || []);
      const formattedSignificantSpillsData = formatSignificantSpillsData(total_number_and_volume_significant_spills || []);
      
      setEffdata1(formattedMaterialData);
      setEffdata2(formattedLocationData);
      setEffdata3(formattedSignificantSpillsData);
  
      function formatMaterialData(materialData) {
        return materialData.map((item) => ({
          "Material of the spill": item.material || "N/A",
          "Volume of the spill": item.volume_of_spills || "N/A",
          Unit: item.unit || "N/A",
        }));
      }
      
      function formatLocationData(locationData) {
        return locationData.map((item) => ({
          "Location of the spill": item.location || "N/A",
          "Volume of the spill": item.volume_of_spills || "N/A",
          Unit: item.unit || "N/A",
        }));
      }
      
      function formatSignificantSpillsData(significantSpills) {
        return significantSpills.map((item) => ({
          "Total number of Significant spill": item.number_of_significant_spills || "N/A",
          "Total volume of Significant spill": item.volume_of_spills || "N/A",
          Unit: item.unit || "N/A",
        }));
      }

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
      setWastedata1([]);
      setWastedata2([]);
      setWastedata3([]);
      setWastedata4([]);
      setWastedata5([]);
      setWastedata6([]);
      setWastedata7([]);
      setWastedata8([]);
      setWastedata9([]);
      setEffdata1([]);
      setEffdata2([]);
      setEffdata3([]);
      setDateRange({
        start: null,
        end: null
      });
      setIsDateRangeValid(false);
    }
    if(type === "Location"){
      setWastedata1([]);
    setWastedata2([]);
    setWastedata3([]);
    setWastedata4([]);
    setWastedata5([]);
    setWastedata6([]);
    setWastedata7([]);
    setWastedata8([]);
    setWastedata9([]);
    setEffdata1([]);
    setEffdata2([]);
    setEffdata3([]);
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
    setWastedata1([]);
    setWastedata2([]);
    setWastedata3([]);
    setWastedata4([]);
    setWastedata5([]);
    setWastedata6([]);
    setWastedata7([]);
    setWastedata8([]);
    setWastedata9([]);

    setDatasetparams((prevParams) => ({
      ...prevParams,
      organisation: newOrg,
      corporate: "",
      location: "",
    }));

    // Update error message
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

    // Update error message for corporate
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

    // Update error message for location
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
          <div className="mb-2 flex-col items-center pt-2  gap-6">
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
                 className={`grid grid-cols-1 md:grid-cols-4 w-full max-w-full mb-2 pt-4 ${reportType !== "" ? "visible" : "hidden"
                 }`}
            >
              <div className="mr-2">
                <label
                  htmlFor="cname"
                  className="text-neutral-800 text-[12px] font-normal"
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
                  <div className='absolute right-2 top-2 pointer-events-none'>
                    <MdKeyboardArrowDown className='text-neutral-500' style={{ fontSize: '16px' }} />
                  </div>
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
                    <div className='absolute right-2 top-2 pointer-events-none'>
                      <MdKeyboardArrowDown className='text-neutral-500' style={{ fontSize: '16px' }} />
                    </div>
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
                    <div className='absolute right-2 top-2 pointer-events-none'>
                      <MdKeyboardArrowDown className='text-neutral-500' style={{ fontSize: '16px' }} />
                    </div>
                    {errors.location && (
                      <p className="text-[#007EEF] text-[12px] pl-2 mt-2">{errors.location}</p>
                    )}
                  </div>
                </div>
              )}
              <div className="mr-2">
                <label
                  htmlFor="cname"
                  className="text-neutral-800 text-[12px] font-normal"
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
          <div className="flex-1 pr-4 max-w-full overflow-hidden">
            <div className="mb-6">
              <div
                id="waste1"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
            >
              <p className="mb-2 ml-1"> Waste generated by material</p>
                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 306-3a
                  </div>
                </div>
              </div>
              <DynamicTable columns={columns1} data={wastedata1} />
            </div>
            <div className="mb-6">
              <div
                id="waste2"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
            >
              <p className="mb-2 ml-1"> Waste Generated by Location</p>
                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 306-3
                  </div>
                </div>
              </div>
              <DynamicTable columns={columns2} data={wastedata2} />
            </div>
            <div className="mb-6">
              <div
                id="waste3"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
                >
                  <p className="mb-2 ml-1"> Hazardous and Non-Hazardous waste composition</p>
                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 306-3a
                  </div>
                </div>
              </div>
              <DynamicTable columns={columns3} data={wastedata3} />
            </div>
            <div className="mb-6">
              <div
                id="waste4"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
                >
                  <p className="mb-2 ml-1"> Waste directed to disposal by material type</p>
                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 306-5
                  </div>
                </div>
              </div>
              <DynamicTable columns={columns4} data={wastedata4} />
            </div>
            <div className="mb-6">
              <div
                id="waste5"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
                >
                  <p className="mb-2 ml-1"> Waste diverted from disposal by material type</p>
                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 306-4
                  </div>
                </div>
              </div>
              <DynamicTable columns={columns5} data={wastedata5} />
            </div>
            <div className="mb-6">
              <div
                id="waste6"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
                >
                  <p className="mb-2 ml-1"> Hazardous waste diverted from disposal</p>
                <div className="flex gap-2">
                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 306-4a
                    </div>
                  </div>
                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 306-4b
                    </div>
                  </div>
                </div>
              </div>
              <DynamicTable columns={columns6} data={wastedata6} />
            </div>
            <div className="mb-6">
              <div
                id="waste7"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
            >
              <p className="mb-2 ml-1"> Non-hazardous waste diverted from disposal</p>
                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 306-4c
                  </div>
                </div>
              </div>
              <DynamicTable columns={columns7} data={wastedata7} />
            </div>
            <div className="mb-6">
              <div
                id="waste8"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
            >
              <p className="mb-2 ml-1"> Hazardous waste directed to disposal</p>
                <div className="flex gap-2">
                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 306-5a
                    </div>
                  </div>
                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 306-5b
                    </div>
                  </div>
                </div>
              </div>
              <DynamicTable columns={columns8} data={wastedata8} />
            </div>
            <div className="mb-6">
              <div
                id="waste9"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
                >
                  <p className="mb-2 ml-1">Non-hazardous waste directed to disposal</p>
                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 306-5c
                  </div>
                </div>
              </div>
              <DynamicTable columns={columns9} data={wastedata9} />
            </div>
            <div className="mb-6">
              <div
                id="eff1"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
                >
                  <p className="mb-2 ml-1">
                    Total number & volume of spills by material
                  </p>
                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 306-3b
                    </div>
                  </div>
                  </div>
                  <DynamicTable2 columns={columns10} data={Effdata1} />
             
            </div>

            <div className="mb-6">
              <div
                id="eff2"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
                >
                  <p className="mb-2 ml-1">
                    Total number & volume of by location
                  </p>
              
                 

                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 306-3b
                    </div>
                  </div>
                </div>
                <DynamicTable2 columns={columns11} data={Effdata2} />
            </div>

            <div className="mb-6">
              <div
                id="eff3"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
                >
                  <p className="mb-2 ml-1">
                    Total number & volume of significant spills
                  </p>

                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 306-3a
                    </div>
                  </div>
                </div>
                <DynamicTable2
                    columns={columns12}
                    data={Effdata3}
                  />
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
           className=" mb-8 me-2 hidden xl:block lg:block md:hidden 2xl:block 4k:block 2k:block"
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

export default AnalyseWaste;
