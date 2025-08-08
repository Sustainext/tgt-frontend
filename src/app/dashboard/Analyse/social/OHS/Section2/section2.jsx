"use client";
import React, { useState, useEffect, useRef } from "react";
import TableSidebar2 from "../TableSidebar2";
import DynamicTable2 from "../customTable2";
import axiosInstance from "../../../../../utils/axiosMiddleware";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  columns1,
  columns2,
  columns3,
  columns4,
  columns5,
  columns6,
  data2,
} from "../data";
import { Oval } from "react-loader-spinner";
const Screen2 = ({
  isBoxOpen,
  selectedLocation,
  dateRange,
  selectedOrg,
  selectedCorp,
  togglestatus
}) => {
  const [analyseData, setAnalyseData] = useState([]);
  const toastShown = useRef(false);
  const [OHSdata1, setOHSData1] = useState([]);
  const [OHSdata2, setOHSData2] = useState([]);
  const [OHSdata3, setOHSData3] = useState([]);
  const [OHSdata4, setOHSData4] = useState([]);
  const [OHSdata5, setOHSData5] = useState([]);
  const [OHSdata6, setOHSData6] = useState([]);
  const [OHSdata7, setOHSData7] = useState([]);
  const [OHSdata8, setOHSData8] = useState([]);
  const [injuryrate, setInjuryrate] = useState();
  const [loopen, setLoOpen] = useState(false);

  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };
  const fetchData = async () => {
    LoaderOpen();
    setOHSData1([]);
    setOHSData2([]);
    setOHSData5([]);
    setOHSData6([]);
    try {
      const response = await axiosInstance.get(
        `/sustainapp/get_ohs_analysis?corporate=${selectedCorp}&organisation=${selectedOrg}&location=${selectedLocation}&start=${dateRange.start}&end=${dateRange.end}`
      );
     
      const data = response.data;
      console.log(data, "testing");
  
      const {
        formal_joint_management,
        workers_covered_by_an_occupational_health_and_safety_management_system,
        ill_health_for_all_employees_analysis,
        ill_health_for_all_workers_who_are_not_employees_analysis,
      } = data;

      function formatArray1(operations) {
        return operations.map((operation, index) => ({
          "Formal joint management-worker health and safety committees":
            operation.committeeName,
          Responsibilities: operation.responsibilities,
          "Meeting Frequency": operation.meetingFrequency,
          "Decision-making authority": operation.decisionMaking,
          "Exclusions (if any) & Reason for Exclusions": operation.exclusions,
        }));
      }

      function formatArray5(operations) {
        return operations.map((operation, index) => ({
          "Employee Category": operation.employeeCategory,
          "Number of fatalities as a result of work-related ill health":
            operation.fatalities,
          "Number of cases of recordable work-related ill health":
            operation.recordable,
          "Main types of work-related ill health": operation.highconsequence,
        }));
      }

      function formatArray6(operations) {
        return operations.map((operation, index) => ({
          "Employee Category": operation.employeeCategory,
          "Number of fatalities as a result of work-related ill health":
            operation.fatalities,
          "Number of cases of recordable work-related ill health":
            operation.recordable,
          "Main types of work-related ill health": operation.highconsequence,
        }));
      }

      setOHSData1(formatArray1(formal_joint_management));
      setOHSData2(
        workers_covered_by_an_occupational_health_and_safety_management_system
      );

      setOHSData5(formatArray5(ill_health_for_all_employees_analysis));
      setOHSData6(
        formatArray6(ill_health_for_all_workers_who_are_not_employees_analysis)
      );

      const resultArray = Object.keys(data).map((key) => ({
        key: key,
        value: data[key],
      }));

      setAnalyseData(resultArray);
      LoaderClose();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      LoaderClose();
      setOHSData1([]);
      setOHSData2([]);
      setOHSData5([]);
      setOHSData6([]);
    }
  };

  const ratefetchData = async () => {
    LoaderOpen();
  
    setOHSData3([]);
    setOHSData4([]);
  
    try {
      const response = await axiosInstance.get(
        `/sustainapp/get_illness_analysis?corporate=${selectedCorp}&organisation=${selectedOrg}&location=${selectedLocation}&start=${dateRange.start}&end=${dateRange.end}`
      );
  
      if (response.data?.status === 206 && response.data?.message) {
        console.log("Warning from API:", response.data.message);
        toast.warning(response.data.message, { position: "top-right", autoClose: 5000 });
      }
  
      const data = response.data.data;
      console.log(data, "testing data and test");
  
      const {
        rate_of_injuries_for_all_employees_100_injury_rate,
        rate_of_injuries_for_not_included_in_company_employees_100_injury_rate,
        rate_of_injuries_for_all_employees_500_injury_rate,
        rate_of_injuries_for_not_included_in_company_employees_500_injury_rate,
      } = data;
  
      function formatArray3(operations) {
        return operations.map((operation, index) => ({
          "Rate of fatalities as a result of work-related injury": Number(
            operation.rate_of_fatalities_as_a_result_of_work_related_injury
          ),
          "Rate of high-consequence work-related injuries (excluding fatalities)":
            Number(
              operation.rate_of_high_consequence_work_related_injuries_excluding_fatalities
            ),
          "Rate  of recordable work-related injuries": Number(
            operation.rate_of_recordable_work_related_injuries
          ),
        }));
      }
  
      function formatArray4(operations) {
        return operations.map((operation, index) => ({
          "Rate of fatalities as a result of work-related injury": Number(
            operation.rate_of_fatalities_as_a_result_of_work_related_injury
          ),
          "Rate of high-consequence work-related injuries (excluding fatalities)":
            Number(
              operation.rate_of_high_consequence_work_related_injuries_excluding_fatalities
            ),
          "Rate  of recordable work-related injuries": Number(
            operation.rate_of_recordable_work_related_injuries
          ),
        }));
      }
      function formatArray7(operations) {
        return operations.map((operation, index) => ({
          "Rate of fatalities as a result of work-related injury": Number(
            operation.rate_of_fatalities_as_a_result_of_work_related_injury
          ),
          "Rate of high-consequence work-related injuries (excluding fatalities)":
            Number(
              operation.rate_of_high_consequence_work_related_injuries_excluding_fatalities
            ),
          "Rate  of recordable work-related injuries": Number(
            operation.rate_of_recordable_work_related_injuries
          ),
        }));
      }
  
      function formatArray8(operations) {
        return operations.map((operation, index) => ({
          "Rate of fatalities as a result of work-related injury": Number(
            operation.rate_of_fatalities_as_a_result_of_work_related_injury
          ),
          "Rate of high-consequence work-related injuries (excluding fatalities)":
            Number(
              operation.rate_of_high_consequence_work_related_injuries_excluding_fatalities
            ),
          "Rate  of recordable work-related injuries": Number(
            operation.rate_of_recordable_work_related_injuries
          ),
        }));
      }
  
      setOHSData3(formatArray3(rate_of_injuries_for_all_employees_100_injury_rate));
      setOHSData4(
        formatArray4(rate_of_injuries_for_not_included_in_company_employees_100_injury_rate)
      );
      setOHSData7(formatArray7(rate_of_injuries_for_all_employees_500_injury_rate));
      setOHSData8(
        formatArray8(rate_of_injuries_for_not_included_in_company_employees_500_injury_rate)
      );
  
      const resultArray = Object.keys(data).map((key) => ({
        key: key,
        value: data[key],
      }));
  
      setAnalyseData(resultArray);
      LoaderClose();
    } catch (error) {
      LoaderClose();
  
   
  
      setOHSData3([]);
      setOHSData4([]);
    }
  };
  
  useEffect(() => {

    if (selectedOrg && dateRange.start && dateRange.end && togglestatus) {
      if (togglestatus === "Corporate") {
        if (selectedCorp) {
          fetchData();
          ratefetchData();
        } else {
          setOHSData1([]);
          setOHSData2([]);
          setOHSData3([]);
          setOHSData4([]);
          setOHSData5([]);
          setOHSData6([]);
          setOHSData7([]);
          setOHSData8([]);
        }
      } else if (togglestatus === "Location") {
        if (selectedLocation) {
          fetchData();
          ratefetchData();
        } else {
          setOHSData1([]);
          setOHSData2([]);
          setOHSData3([]);
          setOHSData4([]);
          setOHSData5([]);
          setOHSData6([]);
          setOHSData7([]);
          setOHSData8([]);
        }
      } else {
        console.log("Calling loadFormData for Other");
        fetchData();
        ratefetchData();
      }
  
      toastShown.current = false;
    } else {
      if (!toastShown.current) {
        console.log("Toast should be shown");
        toastShown.current = true;
      }
    }
  }, [selectedOrg, dateRange, selectedCorp, togglestatus, selectedLocation]);


  // useEffect(() => {
  //   // Only fetch data if both start and end dates are present
  //   if (selectedOrg && dateRange.start && dateRange.end) {
  //     fetchData();
  //     ratefetchData();
  //     toastShown.current = false;
  //   } else if (!toastShown.current) {
  //     toastShown.current = true;
  //     setOHSData1([]);
  //     setOHSData2([]);
  //     setOHSData3([]);
  //     setOHSData4([]);
  //     setOHSData5([]);
  //     setOHSData6([]);
  //   }
  // }, [selectedOrg, selectedLocation, selectedCorp, dateRange]);
  return (
    <>
      <ToastContainer style={{ fontSize: "12px" }} />
    <div>
      <div className="mb-2 flex-col items-center pt-4  gap-6"></div>
      <div className="xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block">
        <div className="flex-1 ps-4 me-4 max-w-full overflow-hidden">
          <div className="mb-6">
            <p className="text-black text-[15px] font-bold  ">
              Formal joint management-worker health and safety committees
            </p>
            <div
              id="ep1"
              className="text-neutral-700 text-[13px] font-normal font-['Manrope'] leading-tight mb-3 "
            >
              <div className="xl:flex lg:flex md:flex 2xl:flex 2k:flex 4k:flex justify-between items-center mb-2">
                <p className="text-black text-[13px] font-[400] mb-2">
                  Formal joint management-worker health and safety committees
                </p>
                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 403-4b
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <DynamicTable2 columns={columns1} data={OHSdata1} />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-black text-[15px] font-bold  ">
              Workers covered by an occupational health and safety management
              system 
            </p>
            <div
              id="ep2"
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 "
            >
              <div className="xl:flex lg:flex md:flex 2xl:flex 2k:flex 4k:flex justify-between items-center mb-2">
                 <p className="text-black text-[13px] font-[400] mb-2">
                  Percentage of employees/workers who are not employees
                </p>
                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 403-8a
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <DynamicTable2 columns={columns2} data={OHSdata2} />
              </div>
            </div>
          </div>
          <div className="mb-6">
            <p className="text-black text-[15px] font-bold  ">
              Work related ill health  
            </p>
            <div
              id="ep3"
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 "
            >
              <div className="xl:flex lg:flex md:flex 2xl:flex 2k:flex 4k:flex justify-between items-center mb-2">
                <div>
                  <p className="text-black text-[13px] font-[400] mb-2">
                  Rate of injuries : For all employees (per 100 employees)
                  </p>
            
              
                </div>

                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 403-9a
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <DynamicTable2 columns={columns3} data={OHSdata3} />
              </div>

              <div className="xl:flex lg:flex md:flex 2xl:flex 2k:flex 4k:flex justify-between items-center mb-2">
                <div>
                   <p className="text-black text-[13px] font-[400] mb-2">
                  Rate of injuries : For all workers who are not employees but whose work and/or workplace is 
                  controlled by the organization (per 100 workers)
                  </p>
                </div>

                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 403-9b
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <DynamicTable2 columns={columns4} data={OHSdata4} />
              </div>
              <div className="xl:flex lg:flex md:flex 2xl:flex 2k:flex 4k:flex justify-between items-center mb-2">
                <div>
                  <p className="text-black text-[13px] font-[400] mb-2">
                  Rate of injuries : For all employees (per 500 employees)
                  </p>
            
              
                </div>

                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 403-9a
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <DynamicTable2 columns={columns3} data={OHSdata7} />
              </div>

              <div className="xl:flex lg:flex md:flex 2xl:flex 2k:flex 4k:flex justify-between items-center mb-2">
                <div>
                   <p className="text-black text-[13px] font-[400] mb-2">
                  Rate of injuries : For all workers who are not employees but whose work and/or workplace is 
                  controlled by the organization (per 500 workers)
                  </p>
                </div>

                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 403-9b
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <DynamicTable2 columns={columns4} data={OHSdata8} />
              </div>
            </div>
          </div>
          <div className="mb-6">
            <p className="text-black text-[15px] font-bold  ">Ill Health  </p>
            <div
              id="ep4"
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 "
            >
              <div className="xl:flex lg:flex md:flex 2xl:flex 2k:flex 4k:flex justify-between items-center mb-2">
                <div>
                   <p className="text-black text-[13px] font-[400] mb-2">
                    Ill health
                  </p>
                   <p className="text-black text-[13px] font-[400] mb-2">
                    For all employees
                  </p>
                </div>

                <div className="w-[80px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 403-10a
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <DynamicTable2 columns={columns5} data={OHSdata5} />
              </div>

              <div className="xl:flex lg:flex md:flex 2xl:flex 2k:flex 4k:flex justify-between items-center mb-2" id="ep5">
                <div>
                  <p className="text-black text-[15px] font-bold  ">
                    Ill health
                  </p>
                   <p className="text-black text-[13px] font-[400] mb-2">
                    for workers who are not employees but whose work and
                    workplace is controlled by the organization
                  </p>
                </div>

                <div className="w-[80px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 403-10b
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <DynamicTable2 columns={columns6} data={OHSdata6} />
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
      className="mb-8 me-2 hidden xl:block lg:block md:hidden 2xl:block 4k:block 2k:block"
        >
          <TableSidebar2 />
        </div>
      </div>
      {loopen && (
        <div className=" fixed inset-0 flex items-center justify-center z-[100] bg-black bg-opacity-50">
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
    </div>
    </>
  );
};

export default Screen2;
