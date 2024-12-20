"use client";
import React, { useState, useEffect, useRef } from "react";
import DynamicTable2 from "./customTable";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { columns1 } from "./data";
import { Oval } from "react-loader-spinner";

const Ratioentrysection = ({ selectedOrg, selectedCorp, year }) => {
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

    // Prepare API parameters based on report type
    try {
      const response = await axiosInstance.get(
        `/sustainapp/get_economic_market_presence?corporate=${selectedCorp}&organisation=${selectedOrg}&start=${year}-01-01&end=${year}-12-31`
      );

      const data = response.data;
      console.log(response.data, "responsedata");
      const { marketing_presence } = data;

      const formatcollectivebargaining = (data) => {
        return data.map((data) => {
          const Male = parseFloat(data.Male);
          const formattedMale = Male;
          const Female = parseFloat(data.Female);
          const formattedFemale = Female
          const Nonbinary = parseFloat(data["Non-binary"]);
          const formattedNonbinary = Nonbinary
          return {
            Location: data.Location,
            Male: formattedMale,
            Female: formattedFemale,
            "Non-binary": formattedNonbinary,
          };
        });
      };

      setStrategypolicy(formatcollectivebargaining(marketing_presence));
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
                  <p>
                    Ratio of the entry-level wage to the minimum wage by gender
                    at significant locations of operation
                  </p>

                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 202-1a
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

export default Ratioentrysection;
