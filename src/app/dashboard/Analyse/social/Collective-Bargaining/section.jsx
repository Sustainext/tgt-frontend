"use client";
import React, { useState, useEffect,useRef } from "react";
import TableSidebar from "./TableSidebar";
import axiosInstance from "../../../../utils/axiosMiddleware";
import Table1 from "./Table";
import { columns1, columns2 } from "./data"; // Assuming these are correct
import { Oval } from "react-loader-spinner";
const Section = ({ selectedOrg,selectedCorp,year,isBoxOpen }) => {

  const [loopen, setLoOpen] = useState(false);
  const [operationBargainingData, setOperationBargainingData] = useState([]);
  const [supplierBargainingData, setSupplierBargainingData] = useState([]);
  const toastShown = useRef(false);
  const LoaderOpen = () => setLoOpen(true);
  const LoaderClose = () => setLoOpen(false);



  const fetchData = async () => {

    LoaderOpen();
    try {
      const response = await axiosInstance.get(
        `sustainapp/get_collective_bargaining_analysis?corporate=${selectedCorp}&organisation=${selectedOrg}&start=${year}-01-01&end=${year}-12-31`,
      
      );
      const { operation_bargaining, supplier_bargaining } = response.data;
      setOperationBargainingData(operation_bargaining);
      setSupplierBargainingData(supplier_bargaining);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      LoaderClose();
    }
  };

  useEffect(() => {
    if (selectedOrg && year) {
        fetchData();
        toastShown.current = false;
    } else {
        if (!toastShown.current) {
            toastShown.current = true;
        }
    }
}, [selectedOrg, year, selectedCorp]);

  return (
    <div>
      <div className="mb-2 flex-col items-center gap-6">
     
        <div className="flex">
          <div className={`ps-4 w-[100%] me-4`}>
            <div className="mb-6">
              <div
                id="ep1"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 "
              >
                <div className="flex justify-between items-center mb-2">
                  <p>
                    Operations where workers' freedom of association or
                    collective bargaining is at risk
                  </p>
                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 407-1a
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <Table1 columns={columns1} data={operationBargainingData} />
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div
                id="ep2"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 "
              >
                <div className="flex justify-between items-center mb-2">
                  <p>
                    Suppliers in which the right to freedom of association or
                    collective bargaining may be at risk
                  </p>
                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 407-1a
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <Table1 columns={columns2} data={supplierBargainingData} />
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
            <TableSidebar />
          </div>
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

export default Section;
