"use client";
import React, { useState, useEffect, useRef } from "react";
import TableSidebar from "./TableSidebar";
import axiosInstance from "../../../../utils/axiosMiddleware";
import Table1 from "./Table";
import { columns } from "./data";
import { Oval } from "react-loader-spinner";
const Section = ({ location, dateRange, isBoxOpen }) => {
  const [incidentsOfDiscrimination, setIncidentsOfDiscrimination] = useState(
    []
  );
  const toastShown = useRef(false);
  const [loopen, setLoOpen] = useState(false);
  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };


  const fetchData = async () => {
  

    LoaderOpen();
    setIncidentsOfDiscrimination([]);
    try {
      const response = await axiosInstance.get(
        `/sustainapp/get_non_discrimination_analysis?location=${location}&start=${dateRange.start}&end=${dateRange.end}`,
     
      );
      const data = response.data;
      const { incidents_of_discrimination } = data;

      setIncidentsOfDiscrimination(incidents_of_discrimination);
      LoaderClose();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setIncidentsOfDiscrimination([]);
      LoaderClose();
    }
  };

  useEffect(() => {
    // Only fetch data if both start and end dates are present
    if (location && dateRange.start && dateRange.end) {
      fetchData();
      toastShown.current = false;
    } else if (!toastShown.current) {
      toastShown.current = true;
    }
  }, [location, dateRange]);
  return (
    <div className="h-[100vh]">
    <div>
    <div className="flex">
          <div className={`ps-4 w-[100%] me-4`}>
          <div className="mb-6">
            <div
              id="ep1"
              className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3"
            >
              <div className="xl:flex lg:flex md:flex 2xl:flex 2k:flex 4k:flex justify-between items-center mb-2">
                <p className="mb-2">Incidents of discrimination and corrective actions taken</p>
                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 406-1a
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <Table1 data={incidentsOfDiscrimination} columns={columns} />
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
          <TableSidebar />
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
    </div>
  );
};

export default Section;
