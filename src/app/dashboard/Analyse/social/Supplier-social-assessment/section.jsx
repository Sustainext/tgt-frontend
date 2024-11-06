"use client";
import React, { useState, useEffect, useRef } from "react";
import TableSidebar from "./TableSidebar";
import DynamicTable2 from "./customTable2";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { columns1, columns2 } from "./data";

import { Oval } from "react-loader-spinner";
const Section = ({ selectedOrg, selectedCorp, year, isBoxOpen }) => {
  const [Suppliersocialassessment1, setSuppliersocialassessment1] = useState(
    []
  );
  const [Suppliersocialassessment2, setSuppliersocialassessment2] = useState(
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
    setSuppliersocialassessment1([]);
    setSuppliersocialassessment2([]);
    try {
      const response = await axiosInstance.get(
        `/sustainapp/get_supplier_social_assessment_analysis?corporate=${selectedCorp}&organisation=${selectedOrg}&start=${year}-01-01&end=${year}-12-31`,
     
      );
      const data = response.data;

      const {
        new_suppliers_that_were_screened_using_social_criteria,
        negative_social_impacts_in_the_supply_chain_and_actions_taken,
      } = data;

      const formatGovernanceBodiesData = (data) => {
        return [
          {
            "Organisation/Corporation":
            data.org_or_corp,
            "Percentage of suppliers screened using social criteria":
              data.percentage.toFixed(2),
          },
        ];
      };

      const formatEmployeeCategoryData = (data) => {
        return [
          {
            "Percentage of suppliers having negative social impacts with which improvements were agreed upon":
              data.percentage_negative.toFixed(2),
            "Percentage of suppliers having negative social impacts with which services were terminated":
              data.percentage_improved.toFixed(2),
          },
        ];
      };

      setSuppliersocialassessment1(
        formatGovernanceBodiesData(
          new_suppliers_that_were_screened_using_social_criteria
        )
      );
      setSuppliersocialassessment2(
        formatEmployeeCategoryData(
          negative_social_impacts_in_the_supply_chain_and_actions_taken
        )
      );

      LoaderClose();
    } catch (error) {
        setSuppliersocialassessment1([]);
        setSuppliersocialassessment2([]);
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
        setSuppliersocialassessment1([]);
        setSuppliersocialassessment2([]);
      }
    }
  }, [selectedOrg, year, selectedCorp]);

  return (
    <div>
      <div>
       
        <div className="flex">
          <div className={`ps-4 w-[100%] me-4`}>
            <div className="mb-6">
              <div
                id="ep1"
                className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 "
              >
                <div>
                  <p className="text-[15px] font-bold">
                    New suppliers that were screened using social criteria
                  </p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-500 text-[13px] ">
                    Percentage of suppliers screened using social criteria
                  </p>

                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 414-1a
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <DynamicTable2
                    columns={columns1}
                    data={Suppliersocialassessment1}
                  />
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div
                id="ep2"
                className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 "
              >
                <div>
                  <p className="text-[15px] font-bold">
                    Negative social impacts in the supply chain and actions
                    taken
                  </p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-500 text-[13px]">
                    Percentage of Suppliers
                  </p>

                  <div className="flex justify-between gap-2">
                    <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                      <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                        GRI 414-2d
                      </div>
                    </div>
                    <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                      <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                        GRI 414-2e
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <DynamicTable2
                    columns={columns2}
                    data={Suppliersocialassessment2}
                  />
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
