"use client";
import React, { useState, useEffect,useRef } from "react";
import TableSidebar2 from "../TableSidebar2";
import DynamicTable2 from "../customTable2";
import axiosInstance from "../../../../../utils/axiosMiddleware";
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
const Screen2 = ({ isBoxOpen,location,dateRange }) => {
  const [analyseData, setAnalyseData] = useState([]);
  const toastShown = useRef(false);
  const [OHSdata1, setOHSData1] = useState([]);
  const [OHSdata2, setOHSData2] = useState([]);
  const [OHSdata3, setOHSData3] = useState([]);
  const [OHSdata4, setOHSData4] = useState([]);
  const [OHSdata5, setOHSData5] = useState([]);
  const [OHSdata6, setOHSData6] = useState([]);

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
    setOHSData3([]);
    setOHSData4([]);
    setOHSData5([]);
    setOHSData6([]);
    try {
      const response = await axiosInstance.get(
        `/sustainapp/get_ohs_analysis?location=${location}&start=${dateRange.start}&end=${dateRange.end}`,
     
      );

      const data = response.data;
      console.log(data, "testing");

      const {
        formal_joint_management,
        workers_covered_by_an_occupational_health_and_safety_management_system,
        rate_of_injuries_for_all_employees,
        rate_of_injuries_for_not_included_in_company_employees,
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

      function formatArray3(operations) {
        return operations.map((operation, index) => ({
          "Rate of fatalities as a result of work-related injury": Number(
            operation.rate_of_fatalities_as_a_result_of_work_related_injury.toFixed(
              2
            )
          ),
          "Rate of high-consequence work-related injuries (excluding fatalities)":
            Number(
              operation.rate_of_high_consequence_work_related_injuries_excluding_fatalities.toFixed(
                2
              )
            ),
          "Rate  of recordable work-related injuries": Number(
            operation.rate_of_recordable_work_related_injuries.toFixed(2)
          ),
        }));
      }

      function formatArray4(operations) {
        return operations.map((operation, index) => ({
          "Rate of fatalities as a result of work-related injury": Number(
            operation.rate_of_fatalities_as_a_result_of_work_related_injury.toFixed(
              2
            )
          ),
          "Rate of high-consequence work-related injuries (excluding fatalities)":
            Number(
              operation.rate_of_high_consequence_work_related_injuries_excluding_fatalities.toFixed(
                2
              )
            ),
          "Rate  of recordable work-related injuries": Number(
            operation.rate_of_recordable_work_related_injuries.toFixed(2)
          ),
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
      setOHSData3(formatArray3(rate_of_injuries_for_all_employees));
      setOHSData4(
        formatArray4(rate_of_injuries_for_not_included_in_company_employees)
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
      setOHSData3([]);
      setOHSData4([]);
      setOHSData5([]);
      setOHSData6([]);
    }
  };



 
  useEffect(() => {
    // Only fetch data if both start and end dates are present
    if (location && dateRange.start && dateRange.end) {
      fetchData();
      toastShown.current = false;
    } else if (!toastShown.current) {
      toastShown.current = true;
      setOHSData1([]);
      setOHSData2([]);
      setOHSData3([]);
      setOHSData4([]);
      setOHSData5([]);
      setOHSData6([]);
    }
  }, [location, dateRange]);


  return (
    <div>
      <div className="mb-2 flex-col items-center pt-4  gap-6">
     
      </div>
      <div className="flex">
        <div className={`ps-4 w-[100%] me-4`}>
        
          <div className="mb-6">
            <p className="text-black text-[15px] font-bold  ">
              Work related ill health  
            </p>
            <div
              id="ep3"
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 "
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-black text-[13px] font-[400]">
                    Rate of injuries
                  </p>
                  <p className="text-black text-[13px] font-[400]">
                    For all employees
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

              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-black text-[13px] font-[400]">
                    Rate of injuries
                  </p>
                  <p className="text-black text-[13px] font-[400]">
                    For all workers who are not employees but whose work and/or
                    workplace is controlled by the organization
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
            </div>
          </div>
          <div className="mb-6">
            <p className="text-black text-[15px] font-bold  ">Ill Health  </p>
            <div
              id="ep4"
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 "
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-black text-[13px] font-[400]">
                    Ill health
                  </p>
                  <p className="text-black text-[13px] font-[400]">
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

              <div className="flex justify-between items-center mb-2"     id="ep5">
                <div>
                  <p className="text-black text-[15px] font-bold  ">
                    Ill health
                  </p>
                  <p className="text-black text-[13px] font-[400]">
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
          className=" mb-8 me-2"
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
  );
};

export default Screen2;
