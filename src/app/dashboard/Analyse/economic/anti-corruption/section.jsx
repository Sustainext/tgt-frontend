"use client";
import React, { useState, useEffect, useRef } from "react";
import DynamicTable2 from "./customTable";
import DynamicTable from "./customTable2";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { columns1, columns2, columns3, columns4, columns5 } from "./data";
import { Oval } from "react-loader-spinner";
const Section = ({ selectedOrg, selectedCorp, year, togglestatus }) => {
  const [strategypolicy, setStrategypolicy] = useState([]);
  const [strategypolicy2, setStrategypolicy2] = useState([]);
  const [strategypolicy3, setStrategypolicy3] = useState([]);
  const [strategypolicy4, setStrategypolicy4] = useState([]);
  const [strategypolicy5, setStrategypolicy5] = useState([]);
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
    try {
      const response = await axiosInstance.get(
        `/sustainapp/get_economic_communication_and_training?corporate=${selectedCorp}&organisation=${selectedOrg}&start=${year}-01-01&end=${year}-12-31`
      );

      const data = response.data;
      const {
        analyze_205_2a,
        analyze_205_2b,
        analyze_205_2c,
        analyze_205_2d,
        analyze_205_2e,
      } = data;

      const formatcollectivebargaining = (data) => {
        return data.map((data, index) => {
          const percentage = parseFloat(data.percentage).toFixed(2);
          const formattedPercentage = percentage.endsWith(".00")
            ? percentage.slice(0, -3)
            : percentage;
          return {
            Location: data.loc,
            "Total number of governance body members that the organization's anti-corruption policies and procedures have been communicated to":
              data.total_communicated,
            "Total number of governance body members in that region":
              data.total_region,
            "Percentage of governance body members that the organization's anti-corruption policies and procedures have been communicated to":
              formattedPercentage,
          };
        });
      };
      const formatcollectivebargaining2 = (data) => {
        const formattedData = {};

        // Iterate over each location
        Object.keys(data).forEach((location) => {
          // For each location, iterate over the array of employee data
          data[location].forEach((employeeData) => {
            const percentage = parseFloat(employeeData.percentage).toFixed(2);
            const formattedPercentage = percentage.endsWith(".00")
              ? percentage.slice(0, -3)
              : percentage;

            // If the location is not already in the formattedData, initialize it
            if (!formattedData[location]) {
              formattedData[location] = [];
            }

            // Push the formatted data into the location array
            formattedData[location].push({
              "Employee Category": employeeData.EmployeeCategory,
              "Total number of employees that the organization's anti-corruption policies and procedures have been communicated to":
                employeeData.Totalnumberemployees,
              "Total number of employee in this region":
                employeeData.Totalemployeeinthisregion,
              "Percentage of employees that the organization's anti-corruption policies and procedures have been communicated to":
                formattedPercentage,
            });
          });
        });

        return formattedData;
      };
      const formatcollectivebargaining3 = (data) => {
        const formattedData = {};

        // Iterate over each location
        Object.keys(data).forEach((location) => {
          // For each location, iterate over the array of employee data
          data[location].forEach((employeeData) => {
            const percentage = parseFloat(employeeData.percentage).toFixed(2);
            const formattedPercentage = percentage.endsWith(".00")
              ? percentage.slice(0, -3)
              : percentage;

            // If the location is not already in the formattedData, initialize it
            if (!formattedData[location]) {
              formattedData[location] = [];
            }

            // Push the formatted data into the location array
            formattedData[location].push({
              "Type of business partner": employeeData.Typeofbusinesspartner,
              "Total number of business partners that the organization's anti-corruption policies and procedures have been communicated to":
                employeeData.Totalnumberemployees,
              "Total number of business partners in this region":
                employeeData.Totalemployeeinthisregion,
              "Percentage of business partners that the organization's anti-corruption policies and procedures have been communicated to":
                formattedPercentage,
            });
          });
        });

        return formattedData;
      };
      const formatcollectivebargaining4 = (data) => {
        return data.map((data, index) => {
          const percentage = parseFloat(data.percentage).toFixed(2);
          const formattedPercentage = percentage.endsWith(".00")
            ? percentage.slice(0, -3)
            : percentage;
          return {
            Location: data.loc,
            "Total number of governance body members that have received training on anti-corruption":
              data.total_communicated,
            "Total number of governance body members": data.total_region,
            "Percentage of governance body members that have received training on anti-corruption":
              formattedPercentage,
          };
        });
      };
      const formatcollectivebargaining5 = (data) => {
        const formattedData = {};

        // Iterate over each location
        Object.keys(data).forEach((location) => {
          // For each location, iterate over the array of employee data
          data[location].forEach((employeeData) => {
            const percentage = parseFloat(employeeData.percentage).toFixed(2);
            const formattedPercentage = percentage.endsWith(".00")
              ? percentage.slice(0, -3)
              : percentage;

            // If the location is not already in the formattedData, initialize it
            if (!formattedData[location]) {
              formattedData[location] = [];
            }

            // Push the formatted data into the location array
            formattedData[location].push({
              "Employee Category": employeeData.EmployeeCategory,
              "Total number of employees  that have received training on anti-corruption":
                employeeData.Totalnumberemployees,
              "Total number of employee":
                employeeData.Totalemployeeinthisregion,
              "Percentage of employees that have received training on anti-corruption":
                formattedPercentage,
            });
          });
        });

        return formattedData;
      };
      setStrategypolicy(formatcollectivebargaining(analyze_205_2a));
      setStrategypolicy2(formatcollectivebargaining2(analyze_205_2b));
      setStrategypolicy3(formatcollectivebargaining3(analyze_205_2c));
      setStrategypolicy4(formatcollectivebargaining4(analyze_205_2d));
      setStrategypolicy5(formatcollectivebargaining5(analyze_205_2e));
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
        setStrategypolicy2([]);
        setStrategypolicy3([]);
        setStrategypolicy4([]);
        setStrategypolicy5([]);
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
        <h2 className="text-[17px] text-[#343A40] mx-5 mt-4 font-semibold">
          Communication and training about anti-corruption policies and
          procedures
        </h2>

        <div className="flex justify-between">
          <div className={`ps-4  w-full me-4`}>
            <div className="mb-6">
              <div
                id="ep1"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 "
              >
                <div className="xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center mb-2">
                  <p className="mb-2">
                    Total number of governance body members that the
                    organization’s anti-corruption policies and procedures have
                    been communicated to, broken down by region.
                  </p>

                  <div className="w-[95px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 205-2a
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <DynamicTable2 columns={columns1} data={strategypolicy} />
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div
                id="ep2"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 "
              >
                <div className="xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center mb-2">
                  <p className="mb-2">
                    Total number and percentage of employees that the
                    organization’s anti-corruption policies and procedures have
                    been communicated to, broken down by employee category and
                    region.
                  </p>

                  <div className="w-[95px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 205-2b
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <DynamicTable columns={columns2} data={strategypolicy2} />
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div
                id="ep3"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 "
              >
                <div className="xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center mb-2">
                  <p className="mb-2">
                    Total number and percentage of business partners that the
                    organization’s anti-corruption policies and procedures have
                    been communicated to, broken down by type of business
                    partner and region.
                  </p>

                  <div className="w-[95px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 205-2c
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <DynamicTable columns={columns3} data={strategypolicy3} />
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div
                id="ep1"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 "
              >
                <div className="xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center mb-2">
                  <p className="mb-2">
                    Total number and percentage of governance body members that
                    have received training on anti-corruption, broken down by
                    region.
                  </p>

                  <div className="w-[95px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 205-2d
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <DynamicTable2 columns={columns4} data={strategypolicy4} />
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div
                id="ep3"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 "
              >
                <div className="xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center mb-2">
                  <p className="mb-2">
                    Total number and percentage of employees that have received
                    training on anti-corruption, broken down by region.
                  </p>

                  <div className="w-[95px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 205-2e
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <DynamicTable columns={columns5} data={strategypolicy5} />
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

export default Section;
