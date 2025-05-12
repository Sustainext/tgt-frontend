"use client";
import React, { useState, useEffect, useRef } from "react";
import TableSidebar from "./TableSidebar";
import DynamicTable2 from "./customTable2";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { columns1, columns2 } from "./data";
import { Oval } from 'react-loader-spinner';
const Section = ({ selectedOrg, selectedCorp, year, isBoxOpen }) => {

  const [compulsaryLabour1, setCompulsaryLabour1] = useState([]);
  const [compulsaryLabour2, setCompulsaryLabour2] = useState([]);
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
    setCompulsaryLabour1([]);
    setCompulsaryLabour2([]);
    try {
      const response = await axiosInstance.get(
        `sustainapp/get_forced_labor_analysis?corporate=${selectedCorp}&organisation=${selectedOrg}&start=${year}-01-01&end=${year}-12-31`,
     
      );

      const data = response.data;
      console.log(data, "testing");

      function formatArray1(operations) {
        return operations.map((operation, index) => ({
          "Operations considered to have significant risk for incidents of forced or compulsory labor": operation.childlabor,
          "Type of Operation": operation.TypeofOperation,
          "Countries or Geographic Areas": operation.geographicareas,
        }));
      }

      function formatArray2(operations) {
        return operations.map((operation, index) => ({
          "Suppliers considered to have significant risk for incidents of forced or compulsory labor": operation.compulsorylabor,
          "Type of Supplier": operation.TypeofOperation,
          "Countries or Geographic Areas": operation.geographicareas,
        }));
      }

      const {
        operations_considered_to_have_significant_risk_for_incidents_of_forced_or_compulsary_labor,
        suppliers_at_significant_risk_for_incidents_of_forced_or_compulsory_labor,
      } = data;

      const operations_considered_to_have_significant_risk_for_incidents_of_forced_or_compulsary_labor_formatted =
        formatArray1(
          operations_considered_to_have_significant_risk_for_incidents_of_forced_or_compulsary_labor
        );
      setCompulsaryLabour1(
        operations_considered_to_have_significant_risk_for_incidents_of_forced_or_compulsary_labor_formatted
      );

      const suppliers_at_significant_risk_for_incidents_of_forced_or_compulsory_labor_formatted = formatArray2(
        suppliers_at_significant_risk_for_incidents_of_forced_or_compulsory_labor
      );
      setCompulsaryLabour2(
        suppliers_at_significant_risk_for_incidents_of_forced_or_compulsory_labor_formatted
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
    
      <div className="flex">
      <div className={`ps-4 w-[100%] me-4`}>
          <div className="mb-6">
            <div
              id="ep1"
              className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 "
            >
              <div className="flex justify-between items-center mb-2">
                <p>
                  Operations considered to have significant risk for incidents
                  of forced or compulsary labor
                </p>

                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 409-1a
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <DynamicTable2 columns={columns1} data={compulsaryLabour1} />
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
                  Suppliers at significant risk for incidents of forced or
                  compulsory labor
                </p>

                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 409-1a
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <DynamicTable2 columns={columns2} data={compulsaryLabour2} />
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
  );
};

export default Section;
