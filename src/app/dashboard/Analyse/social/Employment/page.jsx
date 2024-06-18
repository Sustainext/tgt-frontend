'use client'
import { useState, useEffect } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import TableSidebar from "./TableSidebar";
import DynamicTable from "./customTable";
import DynamicTable2 from "./customTable2";
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
  const [organisations, setOrganisations] = useState([]);
  const [corporates, setCorporates] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedCorp, setSelectedCorp] = useState("");
  const [selectedYear, setSelectedYear] = useState("2023");
  const [collapsed, setCollapsed] = useState(false);
  const [reportType, setReportType] = useState("Organization");

  // Fetching organisations and corporates
  useEffect(() => {
    const fetchOrganisations = async () => {
      const response = await fetch("/api/organisations");
      const data = await response.json();
      setOrganisations(data);
    };

    const fetchCorporates = async () => {
      const response = await fetch("/api/corporates");
      const data = await response.json();
      setCorporates(data);
    };

    fetchOrganisations();
    fetchCorporates();
  }, []);

  const handleReportTypeChange = (type) => {
    setReportType(type);
  };

  return (
    <div>
      <div className="mb-2 flex-col items-center py-4 px-3 gap-6">
        <div className="justify-start items-center gap-4 inline-flex my-6">
          <div className="text-zinc-600 text-[13px] font-semibold font-['Manrope']">
            Report By:
          </div>
          <div className="w-[292px] rounded-lg shadow border border-gray-300 justify-start items-start flex">
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
              className={`w-[95px] px-4 py-2.5 border-r border-gray-300 justify-center items-center gap-2 flex cursor-pointer ${reportType === "Corporate" ? "bg-sky-100" : "bg-white"
                }`}
              onClick={() => handleReportTypeChange("Corporate")}
            >
              <div className="text-slate-700 text-[13px] font-medium font-['Manrope'] leading-tight">
                Corporate
              </div>
            </div>
            <div
              className={`w-[86px] px-4 py-2.5 border-r rounded-r-lg border-gray-300 justify-center items-center gap-2 flex cursor-pointer ${reportType === "Location" ? "bg-sky-100" : "bg-white"
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
          className={`grid grid-cols-1 md:grid-cols-4 w-[80%] mb-4 p-4 ${reportType !== "" ? "visible" : "hidden"
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
                onChange={(e) => setSelectedOrg(e.target.value)}
              >
                <option value="">--Select Organization--- </option>
                {organisations?.map((org) => (
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
                  onChange={(e) => setSelectedCorp(e.target.value)}
                >
                  <option value="">--Select Corporate--- </option>
                  {corporates?.map((corp) => (
                    <option key={corp.id} value={corp.name}>
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
                <select className="block w-full rounded-md border-0 py-1.5 pl-4 text-neutral-500 text-xs font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  <option value="">--Select Location--- </option>
                  {/* Add locations dropdown options here */}
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
              <div className="border border-neutral-300 w-[208.52px] h-8 px-1.5 bg-white rounded justify-start items-center gap-2.5 inline-flex">
                <div className="grow shrink basis-0 h-[32px] justify-start items-center flex">
                  <div className="grow shrink basis-0 h-7 px-0.5 pt-[4px] pb-[5px] justify-start items-start flex">
                    <div className="text-neutral-500 text-[14px] font-normal font-['Manrope']">
                      30/05/2023 - 05/06/2023
                    </div>
                  </div>
                </div>
                <div className="w-3.5 h-3.5">
                  <AiOutlineCalendar style={{ zIndex: "-10px" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className={`ps-4 ${collapsed ? "w-[81%]" : "w-[78%]"} me-4`}>
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
