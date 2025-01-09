"use client";
import React, { useState, useEffect, useRef } from "react";
import TableSidebar from "./TableSidebar";
import axiosInstance from "../../../../utils/axiosMiddleware";
import Table1 from "./Table";
import Table2 from "./Table2";
import { columns,columns2 } from "./data"; // assuming columns are predefined
import { Oval } from "react-loader-spinner";

const Section = ({selectedLocation,dateRange,selectedOrg, selectedCorp, isBoxOpen }) => {
  const [OperationsWithLocalCommunity, setOperationsWithLocalCommunity] = useState([]);
  const [loopen, setLoOpen] = useState(false);
  const toastShown = useRef(false);

  const LoaderOpen = () => setLoOpen(true);
  const LoaderClose = () => setLoOpen(false);

  const fetchData = async () => {
    LoaderOpen();
    setOperationsWithLocalCommunity([]);
    try {
      const response = await axiosInstance.get(
        `/sustainapp/get_community_development_analysis??corporate=${selectedCorp}&organisation=${selectedOrg}&location=${selectedLocation}&start=${dateRange.start}&end=${dateRange.end}`
      );
      setOperationsWithLocalCommunity(response.data.community_engagement);
      LoaderClose();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setOperationsWithLocalCommunity([]);
      LoaderClose();
    }
  };

  useEffect(() => {
    // Only fetch data if both start and end dates are present
    if (selectedOrg && dateRange.start && dateRange.end)  {
      fetchData();
      toastShown.current = false;
    } else if (!toastShown.current) {
      toastShown.current = true;
    }
  }, [selectedOrg,selectedLocation, selectedCorp,dateRange]);

  return (
    <div>
      <div className="mb-2 flex-col items-center gap-6"></div>
      <div className="flex">
        <div className={`ps-4 w-[100%] me-4`}>
          <div className="mb-6">
            <div
              id="ep1"
              className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3"
            >
              <div className="flex justify-between items-center mb-2">
                <p>
                Percentage of operations implemented by engaging local communities
                </p>
                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 413-1a
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <Table1 data={OperationsWithLocalCommunity} columns={columns} />
              </div>
            </div>
          </div>
          <div className="mb-6">
            <p className="text-black text-[15px] font-bold  ">
            Security personnel trained in human rights policies or procedures
            </p>
            <div
              id="ep2"
              className="text-neutral-700 text-[13px] font-normal font-['Manrope'] leading-tight mb-3 "
            >
              <div className="flex justify-between items-center mb-2">
                <p className="text-black text-[13px] font-[400]">
                Percentage of security personnel who have received formal training
                </p>
                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 410-1a
                  </div>
                </div>
              </div>

              <div className="mb-4">
              <Table2 data={[]} columns={columns2} />
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            position: `${isBoxOpen ? "unset" : "sticky"}`,
            top: "10rem",
            height: "fit-content",
            backgroundColor: "white",
            paddingBottom: "1rem",
          }}
          className="mb-8 me-2"
        >
          <TableSidebar />
        </div>
      </div>
      {loopen && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] bg-black bg-opacity-50">
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

export default Section;
