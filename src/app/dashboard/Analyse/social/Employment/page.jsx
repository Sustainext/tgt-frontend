'use client'
import { useState, useEffect } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import TableSidebar from "./TableSidebar";
import DynamicTable from "./customTable";
import DynamicTable2 from "./customTable2";
import DateRangePicker from "../../../../utils/DatePickerComponent";
import axiosInstance from "../../../../utils/axiosMiddleware";
import {
  columns1,
  data1,
  columns2,
  data2,
  columns3,
  data3,
  columns4,
  data4,
  columns5,
  data5,
} from "./data";

const AnalyseEmployment = ({ isBoxOpen }) => {
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
      setIsDateRangeValid(true);
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
          total_waste: item.total_waste.toFixed(2),
        })
      );
      roundedWasteGeneratedByMaterial.push({
        material_type: "Total",
        contribution: "",
        totalrow: 2,
        total_waste:
          waste_generated_by_material_total.total_waste_generated.toFixed(2),
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
          total_waste: item.total_waste.toFixed(2),
        })
      );
      wastegeneratedbylocation.push({
        material_type: "Total",
        location: "",
        contribution: "",
        totalrow: 2,
        total_waste:
          waste_generated_by_location_total.total_waste_generated.toFixed(2),
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
          total_waste: item.total_waste.toFixed(2),
        }));
      wastegeneratedbycategory.push({
        material_type: "Total",
        contribution: "",
        totalrow: 2,
        total_waste: nonhazardous_total.total_waste_generated.toFixed(2),
        units: "t (metric tons)",
      });
      setWastedata3(wastegeneratedbycategory);

      //---table3--//
      const waste_directed_to_disposal_by_material_total =
        removeAndStoreLastObject(waste_directed_to_disposal_by_material_type);
      const wastedirectedtodisposalbymaterialtype =
        waste_directed_to_disposal_by_material_type.map((item) => ({
          ...item,
          total_waste: item.total_waste.toFixed(2),
        }));
      wastedirectedtodisposalbymaterialtype.push({
        disposal_method: "",
        material_type: "Total",
        contribution: "",
        totalrow: 3,
        maprow: 1,
        total_waste:
          waste_directed_to_disposal_by_material_total.total_waste_generated.toFixed(
            2
          ),
        units: "t (metric tons)",
      });
      setWastedata4(wastedirectedtodisposalbymaterialtype);

      //---table4--//
      const waste_diverted_from_disposal_by_material_type_total =
        removeAndStoreLastObject(waste_diverted_from_disposal_by_material_type);
      const wastedivertedfromdisposalbymaterialtype =
        waste_diverted_from_disposal_by_material_type.map((item) => ({
          ...item,
          total_waste: item.total_waste.toFixed(2),
        }));
      wastedivertedfromdisposalbymaterialtype.push({
        recovery_operation: "",
        material_type: "Total",
        contribution: "",
        totalrow: 3,
        maprow: 1,
        total_waste:
          waste_diverted_from_disposal_by_material_type_total.total_waste_generated.toFixed(
            2
          ),
        units: "t (metric tons)",
      });
      setWastedata5(wastedivertedfromdisposalbymaterialtype);
      //---table5--//
      const hazardous_waste_diverted_form_disposal_total =removeAndStoreLastObject(hazardous_waste_diverted_form_disposal);
    const hazardouswastedivertedformdisposaltotal =
    hazardous_waste_diverted_form_disposal.map((item) => ({
        ...item,
        total_waste: item.total_waste.toFixed(2),
      }));
      hazardouswastedivertedformdisposaltotal.push({
      material_type: "Total",
      total_waste:
      hazardous_waste_diverted_form_disposal_total.total_waste_generated.toFixed(
          2
        ),

      units: "t (metric tons)",
      recycled_percentage:"",
      preparation_of_reuse_percentage:"",
      other_percentage: "",
      site:"",
      totalrow: 6,

    });
    setWastedata6(hazardouswastedivertedformdisposaltotal);
     //---table6--//
     const hnon_hazardeous_waste_diverted_from_disposal_total =removeAndStoreLastObject(non_hazardeous_waste_diverted_from_disposal);
     const non_hazardeouswastedivertedfromdisposal =
     non_hazardeous_waste_diverted_from_disposal.map((item) => ({
         ...item,
         total_waste: item.total_waste.toFixed(2),
       }));
       non_hazardeouswastedivertedfromdisposal.push({
       material_type: "Total",
       total_waste:
       hnon_hazardeous_waste_diverted_from_disposal_total.total_waste_generated.toFixed(
           2
         ),

       units: "t (metric tons)",
       recycled_percentage:"",
       preparation_of_reuse_percentage:"",
       other_percentage: "",
       site:"",
       totalrow: 6,

     });
     setWastedata7(non_hazardeouswastedivertedfromdisposal);
      //---table7--//
      const hazardeous_waste_directed_to_disposal_total =removeAndStoreLastObject(hazardeous_waste_directed_to_disposal);
      const hazardeous_wastedirectedtodisposal =
      hazardeous_waste_directed_to_disposal.map((item) => ({
          ...item,
          total_waste: item.total_waste.toFixed(2),
        }));
        hazardeous_wastedirectedtodisposal.push({
        material_type: "Total",
        total_waste:
        hazardeous_waste_directed_to_disposal_total.total_waste_generated.toFixed(
            2
          ),

        units: "t (metric tons)",
        inceneration_with_energy_percentage:"",
        inceneration_without_energy_percentage:"",
        landfill_percentage: "",
        other_disposal_percentage:"",
        external_percentage:"",
        site:"",
        totalrow: 9,

      });
      setWastedata8(hazardeous_wastedirectedtodisposal);
       //---table8--//
       const non_hazardeous_waste_directed_to_disposal_total =removeAndStoreLastObject(non_hazardeous_waste_directed_to_disposal);
       const non_hazardeouswastedirectedtodisposal =
       non_hazardeous_waste_directed_to_disposal.map((item) => ({
           ...item,
           total_waste: item.total_waste.toFixed(2),
         }));
         non_hazardeouswastedirectedtodisposal.push({
         material_type: "Total",
         total_waste:non_hazardeous_waste_directed_to_disposal_total.total_waste_generated.toFixed(2),

         units: "t (metric tons)",
         inceneration_with_energy_percentage:"",
         inceneration_without_energy_percentage:"",
         landfill_percentage: "",
         other_disposal_percentage:"",
         external_percentage:"",
         site:"",
         totalrow: 9,

       });
       setWastedata9(non_hazardeouswastedirectedtodisposal);
        //---table9--//
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
        // // setSelectedOrg(response.data[0].id);
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
          console.error("Failed fetching corporates:", e);
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
  };

  const handleLocationChange = (e) => {
    const newLocation = e.target.value;
    setSelectedSetLocation(newLocation);

    setDatasetparams((prevParams) => ({
      ...prevParams,
      location: newLocation,
    }));
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
    <div>
      <div className="mb-2 flex-col items-center pt-4  gap-6">
        <div className="mt-4 pb-3 mx-5 text-left">
          <div className="mb-2 flex-col items-center pt-2  gap-6">
            <div className="justify-start items-center gap-4 inline-flex">
              <div className="text-zinc-600 text-[15px] font-semibold font-['Manrope']">
                View By:
              </div>
              <div className="rounded-lg shadow border border-gray-300 justify-start items-start flex">
                <div
                  className={`w-[111px] px-4 py-2.5 border-r rounded-l-lg border-gray-300 justify-center items-center gap-2 flex cursor-pointer ${reportType === "Organization" ? "bg-sky-100" : "bg-white"
                    }`}
                  onClick={() => handleReportTypeChange("Organization")}
                >
                  <div className="text-slate-800 text-[13px] font-medium font-['Manrope'] leading-tight">
                    Organization
                  </div>
                </div>
                <div
                  className={`w-[111px] px-4 py-2.5 border-r border-gray-300 justify-center items-center gap-2 flex cursor-pointer ${reportType === "Corporate" ? "bg-sky-100" : "bg-white"
                    }`}
                  onClick={() => handleReportTypeChange("Corporate")}
                >
                  <div className="text-slate-700 text-[13px] font-medium font-['Manrope'] leading-tight">
                    Corporate
                  </div>
                </div>
                <div
                  className={`w-[111px] px-4 py-2.5 border-r rounded-r-lg border-gray-300 justify-center items-center gap-2 flex cursor-pointer ${reportType === "Location" ? "bg-sky-100" : "bg-white"
                    }`}
                  onClick={() => handleReportTypeChange("Location")}
                >
                  <div className="text-slate-700 text-[13px] font-medium font-['Manrope'] leading-tight">
                    Location
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`grid grid-cols-1 md:grid-cols-4 w-[80%] mb-2 pt-4 ${reportType !== "" ? "visible" : "hidden"
                }`}
            >
              <div className="mr-2">
                <label
                  htmlFor="cname"
                  className="text-neutral-800 text-[13px] font-normal"
                >
                  Select Organization*
                </label>
                <div className="mt-2">
                  <select
                    className="block w-full rounded-md border-0 py-1.5 pl-4 text-neutral-500 text-xs font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                </div>
              </div>
              {(reportType === "Corporate" || reportType === "Location") && (
                <div className="mr-2">
                  <label
                    htmlFor="cname"
                    className="text-neutral-800 text-[13px] font-normal"
                  >
                    Select Corporate
                  </label>
                  <div className="mt-2">
                    <select
                      className="block w-full rounded-md border-0 py-1.5 pl-4 text-neutral-500 text-xs font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  </div>
                </div>
              )}
              {reportType === "Location" && (
                <div className="mr-2">
                  <label
                    htmlFor="cname"
                    className="text-neutral-800 text-[13px] font-normal"
                  >
                    Select Location
                  </label>
                  <div className="mt-2">
                    <select
                      className="block w-full rounded-md border-0 py-1.5 pl-4 text-neutral-500 text-xs font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  </div>
                </div>
              )}
              <div className="mr-2">
                <label
                  htmlFor="cname"
                  className="text-neutral-800 text-[13px] font-normal"
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
                    <div className="text-red-600 text-xs mt-2">
                      Please select a valid date range.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="flex justify-between">
        <div className={`ps-4  w-[78%] me-4`}>
          <div className="mb-6">
            <p className="text-black text-[16px] ">Employee Hires  & Turnover</p>
            <div
              id="ep1"
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 "
            >
              <div className="flex justify-between items-center mb-2">
                <p>
                  New Employee Hires
                </p>
                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 401-1a
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <DynamicTable columns={columns1} data={data1} />
              </div>
              <div className="flex justify-between items-center mb-2">
                <p>
                  New Employee Turnover
                </p>
                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 401-1a
                  </div>
                </div>
              </div>

              <div>
                <DynamicTable columns={columns2} data={data2} />
              </div>
            </div>

          </div>

          <div className="mb-6">
            <p className="text-black text-[16px] ">Benefits</p>
            <div
              id="ep2"
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 "
            >
              <div className="flex justify-between items-center mb-2">
                <p>
                Benefits provided to full-time employees that are not provided to temporary or part-time employees
                </p>
                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 401-2a
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <DynamicTable2 columns={columns3} data={data3} />
              </div>



            </div>

          </div>

          <div className="mb-6">
            <p className="text-black text-[16px] ">Parental leave</p>
            <div
              id="ep3"
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 "
            >
              <div className="flex justify-between items-center mb-2">
                <p>
                Parental leave
                </p>
                <div className="flex gap-2">
                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 401-3a
                  </div>
                </div>
                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 401-3b
                  </div>
                </div>
                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 401-3c
                  </div>
                </div>
                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 401-3d
                  </div>
                </div>
              </div>
              </div>

              <div className="mb-4">
              <DynamicTable2 columns={columns4} data={data4} />
              </div>
              <div className="flex justify-between items-center mb-2">
                <p>
                Return to work rate and retention rate of employee
                </p>
                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 401-3e
                  </div>
                </div>
              </div>

              <div>
              <DynamicTable2 columns={columns5} data={data5} />
              </div>
            </div>

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
          className="me-8 mb-8 -right-2"
        >
          <TableSidebar />
        </div>
      </div>
    </div>
  );
};

export default AnalyseEmployment;
