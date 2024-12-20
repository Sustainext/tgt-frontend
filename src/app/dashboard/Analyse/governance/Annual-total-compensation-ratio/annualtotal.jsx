"use client";
import React, { useState, useEffect, useRef } from "react";
import DynamicTable2 from "./customTable2";
import { columns1 } from "./data";
import { Oval } from "react-loader-spinner";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { MdInfoOutline } from "react-icons/md";
import axiosInstance from "../../../../utils/axiosMiddleware";
const AnalyseAnnualtotalsection = ({ selectedOrg, selectedCorp, year }) => {
  const [customerhealth, setCustomerhealth] = useState([]);
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
    setCustomerhealth([]);

    try {
      const response = await axiosInstance.get(
        `/sustainapp/get_governance_analysis?corporate=${selectedCorp}&organisation=${selectedOrg}&start=${year}-01-01&end=${year}-12-31`
      );

      const data = response.data;

      const { compensation_ratio_annual_total_and_increase } = data;
      const formatcustomerhealth = (data) => {
        return data.map((data, index) => {
          return {
            "Ratio of annual total compensation":
              data.ratio_of_annual_total_compensation,
            "Ratio of percentage increase in annual total compensation":
              data.ratio_of_percentage_increase_in_annual_total_compensation,
          };
        });
      };
      setCustomerhealth(
        formatcustomerhealth(compensation_ratio_annual_total_and_increase)
      );
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
        <div className="flex justify-between">
          <div className={`ps-4  w-full me-4`}>
            <div className="mb-6">
              <div
                id="ReductionOfEnergy"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
              >
                <h2 className="flex mx-2 text-[15px] text-neutral-700  font-bold mb-2">
                  Ratio of annual total compensation & ratio of percentage
                  increase in annual total compensation
                  <MdInfoOutline
                    data-tooltip-id={`tooltip-$e1`}
                    data-tooltip-content="This section documents data corresponding to the
total number and rate of new employee hires during
the reporting period, categorized by age group,
gender, and region.
Note: When compiling the information specified
in Disclosure 401-1, the reporting organization
should use data from Disclosure 2-7 in
GRI 2: General Disclosures 2021 to identify the
total number of employees"
                    className="mt-1.5 ml-2 text-[15px]"
                  />
                  <ReactTooltip
                    id={`tooltip-$e1`}
                    place="top"
                    effect="solid"
                    style={{
                      width: "290px",
                      backgroundColor: "#000",
                      color: "white",
                      fontSize: "12px",
                      boxShadow: 3,
                      borderRadius: "8px",
                      textAlign: "left",
                    }}
                  ></ReactTooltip>
                </h2>
                <div className="flex justify-between gap-2">
                  <div className="w-[70px] h-[26px] p-2  bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 2-21a
                    </div>
                  </div>
                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 2-21b
                    </div>
                  </div>
                </div>
              </div>
              <DynamicTable2 columns={columns1} data={customerhealth} />
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

export default AnalyseAnnualtotalsection;
