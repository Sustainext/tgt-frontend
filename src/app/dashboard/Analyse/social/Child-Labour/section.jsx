"use client";
import React, { useState, useEffect, useRef } from "react";
import TableSidebar from "./TableSidebar";
import DynamicTable2 from "./customTable2";
import DynamicTable from "./customTable"
import axiosInstance from "../../../../utils/axiosMiddleware";
import { columns1, columns2, columns3, columns4,columns5,columns6 } from "./data";
import { Oval } from "react-loader-spinner";
const Section = ({ selectedOrg,selectedCorp,dateRange, isBoxOpen,togglestatus }) => {
  const [childdata1, setChilddata1] = useState([]);
  const [childdata2, setChilddata2] = useState([]);
  const [childdata3, setChilddata3] = useState([]);
  const [childdata4, setChilddata4] = useState([]);
  const [childdata5, setChilddata5] = useState([]);
  const [childdata6, setChilddata6] = useState([]);
  const toastShown = useRef(false);
  const [loopen, setLoOpen] = useState(false);

  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };
  const fetchData = async () => {
    setChilddata1([]);
    setChilddata2([]);
    setChilddata3([]);
    setChilddata4([]);
    LoaderOpen();
    try {
      const response = await axiosInstance.get(
        `/sustainapp/get_child_labor_and_forced_labour_analysis?corporate=${selectedCorp}&organisation=${selectedOrg}&start=${dateRange.start}&end=${dateRange.end}`
      );

      const data = response.data;
      console.log(data, "testing");

      const {
        operation_significant_risk_of_child_labor,
        operation_significant_risk_of_young_workers,
        suppliers_significant_risk_of_child_labor,
        suppliers_significant_risk_of_young_workers,
        operations_considered_to_have_significant_risk_for_incidents_of_forced_or_compulsary_labor,
        suppliers_at_significant_risk_for_incidents_of_forced_or_compulsory_labor,
      } = data;
      const formattedLocation = operation_significant_risk_of_child_labor.map(
        (osrcl) => ({
          childlabor: osrcl.childlabor,
          TypeofOperation: osrcl.TypeofOperation,
          geographicareas: osrcl.geographicareas,
        })
      );
      const formattedScope = operation_significant_risk_of_young_workers.map(
        (osroyw) => ({
          hazardouswork: osroyw.hazardouswork,
          TypeofOperation1: osroyw.TypeofOperation,
          geographicareas1: osroyw.geographicareas,
        })
      );
      const formattedSource = suppliers_significant_risk_of_child_labor.map(
        (ssrocl) => ({
          childlabor1: ssrocl.childlabor,
          TypeofOperation2: ssrocl.TypeofOperation,
          geographicareas2: ssrocl.geographicareas,
        })
      );
      const formattedSuppliers =
        suppliers_significant_risk_of_young_workers.map((ssroyw) => ({
          hazardouswork1: ssroyw.hazardouswork,
          TypeofOperation3: ssroyw.TypeofOperation,
          geographicareas3: ssroyw.geographicareas,
        }));
        const formattedop1 =
        operations_considered_to_have_significant_risk_for_incidents_of_forced_or_compulsary_labor.map((op) => ({
          op1: op.childlabor,
          TypeofOperation3: op.TypeofOperation,
          geographicareas3: op.geographicareas,
        }));
        const formattedsp1 =
        suppliers_at_significant_risk_for_incidents_of_forced_or_compulsory_labor.map((sp) => ({
          sp1: sp.compulsorylabor,
          TypeofOperation3: sp.TypeofOperation,
          geographicareas3: sp.geographicareas,
        }));
      setChilddata1(formattedLocation);
      setChilddata2(formattedScope);
      setChilddata3(formattedSource);
      setChilddata4(formattedSuppliers);
      setChilddata5(formattedop1);
      setChilddata6(formattedsp1);
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
    if (selectedOrg &&  dateRange.start && dateRange.end && togglestatus) {
      if (togglestatus === "Corporate" && selectedCorp) {
        fetchData();
      } else if (togglestatus === "Corporate" && !selectedCorp) {
        setChilddata1([]);
        setChilddata2([]);
        setChilddata3([]);
        setChilddata4([]);
        setChilddata5([]);
        setChilddata6([]);
      } else {
        fetchData();
      }

      toastShown.current = false;
    } else {
      if (!toastShown.current) {
        toastShown.current = true;
      }
    }
  }, [selectedOrg, dateRange, selectedCorp, togglestatus]);

  return (
    <div>
      <div className="flex">
        <div className="flex-1 ps-4 me-4 max-w-full overflow-hidden">
          <div className="mb-6">
            <div
              id="ep1"
              className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 "
            >
              <div className="xl:flex lg:flex md:flex 2xl:flex 2k:flex 4k:flex justify-between items-center mb-2">
                <p className="mb-2">
                  Operations considered to have significant risk of child labor
                </p>
                <div className="xl:flex lg:flex md:flex 2xl:flex 2k:flex 4k:flex block justify-between gap-2">
                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 408-1a
                    </div>
                  </div>
                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex xl:ml-0 lg:ml-0 md:ml-0 2xl:ml-0 2k:ml-0 4k:ml-0 ml-2">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 408-1b
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <DynamicTable2 columns={columns1} data={childdata1} />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div
              id="ep2"
              className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 "
            >
              <div className="xl:flex lg:flex md:flex 2xl:flex 2k:flex 4k:flex  justify-between items-center mb-2">
                <p className="mb-2">
                  Operations at significant risk for incidents of young workers
                  exposed to hazardous work
                </p>
                <div className="xl:flex lg:flex md:flex 2xl:flex 2k:flex 4k:flex justify-between gap-2">
                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 408-1a
                    </div>
                  </div>
                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex xl:ml-0 lg:ml-0 md:ml-0 2xl:ml-0 2k:ml-0 4k:ml-0 ml-2">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 408-1b
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <DynamicTable2 columns={columns2} data={childdata2} />
              </div>
            </div>
          </div>
          <div className="mb-6">
            <div
              id="ep3"
              className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 "
            >
              <div className="xl:flex lg:flex md:flex 2xl:flex 2k:flex 4k:flex justify-between items-center mb-2">
                <p className="mb-2">
                  Suppliers at significant risk for incidents of child labor{" "}
                </p>
                <div className="xl:flex lg:flex md:flex 2xl:flex 2k:flex 4k:flex justify-between gap-2">
                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 408-1a
                    </div>
                  </div>
                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex xl:ml-0 lg:ml-0 md:ml-0 2xl:ml-0 2k:ml-0 4k:ml-0 ml-2">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 408-1b
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <DynamicTable2 columns={columns3} data={childdata3} />
              </div>
            </div>
          </div>
          <div className="mb-6">
            <div
              id="ep4"
              className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 "
            >
              <div className="xl:flex lg:flex md:flex 2xl:flex 2k:flex 4k:flex justify-between items-center mb-2">
                <p className="mb-2">
                  Suppliers at significant risk for incidents of young workers
                  exposed to hazardous work{" "}
                </p>
                <div className="xl:flex lg:flex md:flex 2xl:flex 2k:flex 4k:flex justify-between gap-2">
                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 408-1a
                    </div>
                  </div>
                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex xl:ml-0 lg:ml-0 md:ml-0 2xl:ml-0 2k:ml-0 4k:ml-0 ml-2">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 408-1b
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <DynamicTable2 columns={columns4} data={childdata4} />
              </div>
            </div>
          </div>
          <div className="mb-6">
            <div
              id="ep5"
              className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 "
            >
              <div className="xl:flex lg:flex md:flex 2xl:flex 2k:flex 4k:flex justify-between items-center mb-2">
                <p className="mb-2">
                  Operations considered to have significant risk for incidents
                  of forced or compulsory labor
                </p>

                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 409-1a
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <DynamicTable columns={columns5} data={childdata5} />
              </div>
            </div>
          </div>
          <div className="mb-6">
            <div
              id="ep6"
              className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 "
            >
              <div className="xl:flex lg:flex md:flex 2xl:flex 2k:flex 4k:flex justify-between items-center mb-2">
                <p className="mb-2">
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
              <DynamicTable columns={columns6} data={childdata6} />
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
