"use client";
import React, { useState, useEffect,useRef } from "react";
import TableSidebar from "./TableSidebar";
import DynamicTable2 from "./customTable2";
import DateRangePicker from "../../../../utils/DatePickerComponent";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { columns1 } from "./data";
import { yearInfo } from "@/app/shared/data/yearInfo";
import { Oval } from "react-loader-spinner";
const Section = ({ selectedOrg,selectedCorp,dateRange,isBoxOpen }) => {
  const [customerhealth, setCustomerhealth] = useState([]);
  const [loopen, setLoOpen] = useState(false);
  const toastShown = useRef(false);

  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };


  const fetchData = async (params) => {


    LoaderOpen();
    setCustomerhealth([]);
    try {
      const response = await axiosInstance.get(
        `/sustainapp/get_customer_health_safety_analysis?corporate=${selectedCorp}&organisation=${selectedOrg}&start=${dateRange.start}&end=${dateRange.end}`,
      
      );

      const data = response.data;

      const { customer_health_percent } = data;

      const formatcustomerhealth = (data) => {
        return data.map((data, index) => {
          const percentage = parseFloat(data.percentage);
          const formattedPercentage = percentage
          return {
            "Organisation/Corporation": data.org_or_corp,
            "Percentage of significant product and service categories for which health and safety impacts are assessed for improvement":
              formattedPercentage,
          };
        });
      };
      setCustomerhealth(formatcustomerhealth(customer_health_percent));
      LoaderClose();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setCustomerhealth([]);
      LoaderClose();
    }
  };

  useEffect(() => {
    if (selectedOrg && dateRange.start<dateRange.end) {
        fetchData();
        toastShown.current = false;
    } else {
        if (!toastShown.current) {
            toastShown.current = true;
        }
    }
}, [selectedOrg, dateRange, selectedCorp]);
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
                    Assessment of the health and safety impacts of product and
                    service categories
                  </p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-500 text-[13px]">
                    Percentage of significant product and service categories
                  </p>

                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 416-1a
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <DynamicTable2 columns={columns1} data={customerhealth} />
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
