"use client";
import { useState, useEffect } from "react";
import { yearInfo } from "../../../../shared/data/yearInfo";
import { AiOutlineCalendar } from "react-icons/ai";
import TableSidebar from "./TableSidebar";
import DynamicTable from "./customTable";
import DateRangePicker from "@/app/utils/DatePickerComponent";
import { Oval } from "react-loader-spinner";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { columns1, columns2, columns3, columns4 } from "./data";

const AnalyseMaterials = ({ isBoxOpen }) => {
  const [analyseData, setAnalyseData] = useState([]);
  const [organisations, setOrganisations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedCorp, setSelectedCorp] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedsetLocation, setSelectedSetLocation] = useState("");
  const [materialdata1, setMaterialdata1] = useState([]);
  const [materialdata2, setMaterialdata2] = useState([]);
  const [materialdata3, setMaterialdata3] = useState([]);
  const [materialdata4, setMaterialdata4] = useState([]);
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
    setMaterialdata1([]);
    setMaterialdata2([]);
    setMaterialdata3([]);
    setMaterialdata4([]);
    try {
      const response = await axiosInstance.get(
        `/sustainapp/get_material_analysis`,
        {
          params: params,
        }
      );

      const data = response.data;
      console.log(data, "testing");

      const {
        non_renewable_materials,
        reclaimed_materials,
        recycled_materials,
        renewable_materials,
      } = data;
      const Nonrenewablematerials = non_renewable_materials
        .filter((item) => item.material_type)
        .map((Noremat, index) => ({
          type: Noremat.material_type,
          materialcategory: Noremat.material_category,
          source: Noremat.source,
          total: Noremat.total_quantity,
          units: Noremat.units,
          datasource: Noremat.data_source,
        }));
      Nonrenewablematerials.push({
        type: "Total Weight",
        total: non_renewable_materials.find((item) => item.total_weight)
          ?.total_weight,
      });

      const renewablematerials = renewable_materials
        .filter((item) => item.material_type)
        .map((renemat, index) => ({
          type: renemat.material_type,
          materialcategory: renemat.material_category,
          source: renemat.source,
          total: renemat.total_quantity,
          units: renemat.units,
          datasource: renemat.data_source,
        }));
      renewablematerials.push({
        type: "Total Weight",
        total: renewable_materials.find((item) => item.total_weight)
          ?.total_weight,
      });

      const recycledmaterials = recycled_materials.map((recyled, index) => ({
        type: recyled.type_of_recycled_material_used,
        consumption: recyled.percentage_of_recycled_input_materials_used,
      }));

      const reclaimedmaterials = reclaimed_materials.map(
        (reclaimed, index) => ({
          type: reclaimed.type_of_product,
          code: reclaimed.product_code,
          productname: reclaimed.product_name,
          total: reclaimed.total_quantity,
        })
      );
      setMaterialdata1(Nonrenewablematerials);
      setMaterialdata2(renewablematerials);
      setMaterialdata3(recycledmaterials);
      setMaterialdata4(reclaimedmaterials);

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
    setMaterialdata1([]);
    setMaterialdata2([]);
    setMaterialdata3([]);
    setMaterialdata4([]);

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
        <div className="mb-2 flex-col items-center pt-4  gap-6">
          <div className="mt-4 pb-3 mx-5 text-left">
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
                    <div className="mt-2">
                      <select
                        className="block w-full rounded-md border-0 py-1.5 pl-4 text-neutral-500 text-[12px] font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
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
                    <div className="mt-2">
                      <select
                        className="block w-full rounded-md border-0 py-1.5 pl-4 text-neutral-500 text-[12px] font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
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
        <div className="flex">
          <div className={`ps-4 w-[100%] me-4`}>
            <div className="mb-6">
              <p className="text-black text-[15px] font-bold ">
                Materials used by weight or volume
              </p>
              <div
                id="materials1"
                className="text-neutral-700 text-[13px] font-normal font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
              >
                <p>Non-Renewable materials used</p>
                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 301-1a
                  </div>
                </div>
              </div>
              <DynamicTable columns={columns1} data={materialdata1} />
            </div>
            <div className="mb-6">
              <div
                id="materials2"
                className="text-neutral-700 text-[15px] font-bold  font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
              >
                <p>Renewable materials used</p>
                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 301-1a
                  </div>
                </div>
              </div>
              <DynamicTable columns={columns2} data={materialdata2} />
            </div>
            <div className="mb-6">
              <p className="text-black text-[15px] font-bold ">
                Recycled input materials used
              </p>
              <div
                id="materials3"
                className="text-neutral-700 text-[13px] font-normal font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
              >
                <p>Percentage of recycled materials used (Production)</p>
                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 301-2a
                  </div>
                </div>
              </div>
              <DynamicTable columns={columns3} data={materialdata3} />
            </div>
            <div className="mb-6">
              <div
                id="materials4"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
              >
                <p>Reclaimed products and their packaging materials</p>
                <div className="flex gap-2">
                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 301-3a
                    </div>
                  </div>
                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 301-3b
                    </div>
                  </div>
                </div>
              </div>
              <DynamicTable columns={columns4} data={materialdata4} />
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
            className=" mb-8 me-2"
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

export default AnalyseMaterials;
