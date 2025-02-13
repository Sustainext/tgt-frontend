"use client";
import React, { useState, useEffect, useRef } from "react";
import DynamicTable2 from "./customTable";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { columns1 } from "./data";
import { Oval } from "react-loader-spinner";
const Operationsassessedsection = ({ selectedOrg, selectedCorp, year,togglestatus }) => {
  const [strategypolicy, setStrategypolicy] = useState([]);
  const [loopen, setLoOpen] = useState(false);
  const toastShown = useRef(false);
  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };

  const fetchData = async () => {
    LoaderOpen();
    setStrategypolicy([]);
    try {
      const response = await axiosInstance.get(
        `/sustainapp/get_economic_operations_assessed?corporate=${selectedCorp}&organisation=${selectedOrg}&start=${year}-01-01&end=${year}-12-31`
      );

      const data = response.data;

      const { operations_assesed } = data;

      const formatcollectivebargaining = (data) => {
        return data.map((data, index) => {
          const percentage = data.percentage;
          const formattedPercentage = percentage
          return {
            "Organisation/Corporation": data.org_or_corp,
            "Total number of operations assessed for risks related to corruption":
              data.total_number_of_operations_assesed,
            "Total number of operations": data.number_of_operations,
            "Percentage of operations asssessed for risks related to corruption":
              formattedPercentage,
          };
        });
      };
      setStrategypolicy(formatcollectivebargaining(operations_assesed));
      LoaderClose();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      LoaderClose();
    }
  };
  useEffect(() => {
    if (selectedOrg && year && togglestatus) {
      if (togglestatus === "Corporate" && selectedCorp) {
        fetchData();
      } else if (togglestatus === "Corporate" && !selectedCorp) {
        setStrategypolicy([]);
      } else {
        fetchData();
      }

      toastShown.current = false;
    } else {
      if (!toastShown.current) {
        toastShown.current = true;
      }
    }
  }, [selectedOrg, year, selectedCorp, togglestatus]);


  return (
    <div>
      <div>
        <div className="mb-2 flex-col items-center pt-4 gap-6"></div>
        <div className="flex justify-between">
          <div className={`ps-4  w-full me-4`}>
            <div className="mb-6">
              <div
                id="ep1"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 "
              >
                <div className="flex justify-between items-center mb-2">
                  <p>Operations assessed for risks related to corruption</p>

                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 205-1a
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <DynamicTable2 columns={columns1} data={strategypolicy} />
                </div>
              </div>
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
    </div>
  );
};

export default Operationsassessedsection;
