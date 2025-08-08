"use client";
import React, { useState, useEffect,useRef } from "react";
import DynamicTable2 from "./table";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { columns1, columns2, columns3 } from "./data";
import { yearInfo } from "@/app/shared/data/yearInfo";
import { Oval } from "react-loader-spinner";

const Supplierassessment = ({ selectedOrg, selectedCorp, year,togglestatus }) => {
  const [newSuppliers, setNewSuppliers] = useState([]);
  const [negativeEnvImpact, setNegativeEnvImpact] = useState([]);
  const [terminatedRelationship, setTerminatedRelationship] = useState([]);
  
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
    setNewSuppliers([]);
    try {
        const response = await axiosInstance.get(
            `/sustainapp/get_analyze_supplier_assesment?corporate=${selectedCorp}&organisation=${selectedOrg}&start=${year}-01-01&end=${year}-12-31`
          );
   

      const data = response.data;

      const formatNewSppliers = (data) => {
        return data.map((data, index) => {
          const percentage = parseFloat(data.percentage);
          const formattedPercentage = percentage
          return {
            "Organisation/Corporation": data.org_or_corp,
            "Percentage of new suppliers that were screened using environmental criteria":
              formattedPercentage,
          };
        });
      };
      const formatNegativeEnvImpact = (data) => {
        return data.map((data, index) => {
          const percentage = parseFloat(data.percentage);
          const formattedPercentage = percentage
          return {
            "Organisation/Corporation": data.org_or_corp,
            "Percentage of suppliers identified as having significant actual and potential negative environmental impacts with which improvements were agreed upon as a result of assessment":
              formattedPercentage,
          };
        });
      };
      const formatTerminatedRelationship = (data) => {
        return data.map((data, index) => {
          const percentage = parseFloat(data.percentage);
          const formattedPercentage = percentage
          return {
            "Organisation/Corporation": data.org_or_corp,
            "Percentage of Suppliers identified as having significant actual and potential negative environmental impacts with terminated Relationship":
              formattedPercentage,
          };
        });
      };
      setNewSuppliers(formatNewSppliers(data.gri_308_1a));
      setTerminatedRelationship(formatTerminatedRelationship(data.gri_308_2e));
      setNegativeEnvImpact(formatNegativeEnvImpact(data.gri_308_2d));
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
        setNewSuppliers([]);
        setTerminatedRelationship([]);
        setNegativeEnvImpact([]);
    
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
      
        <div className="xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between">
          <div className="flex-1 ps-4 me-4 max-w-full overflow-hidden">
            <div className="mb-8">
              <div
                id="ep1"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 "
              >
                <div className="xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex justify-between items-center mb-2">
                  <p className="text-neutral-700 text-[15px] font-bold mb-3">
                    Percentage of new suppliers that were screened using
                    environmental criteria.
                  </p>

                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 308-1a
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <DynamicTable2 columns={columns1} data={newSuppliers} />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div
                id="ep1"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 "
              >
                <div className="xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex justify-between items-center mb-2">
                  <p className="text-neutral-700 text-[15px] font-bold mb-3">
                    Percentage of suppliers identified as having significant
                    actual and potential negative environmental impacts with
                    which improvements were agreed upon as a result of
                    assessment
                  </p>

                  <div className="w-[70px] md:w-[120px] xl:w-[70px] lg:w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 308-2d
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <DynamicTable2 columns={columns2} data={negativeEnvImpact} />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div
                id="ep1"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 "
              >
                <div className="xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex justify-between items-center mb-2">
                  <p className="text-neutral-700 text-[15px] font-bold mb-3">
                    Percentage of Suppliers identified as having significant
                    actual and potential negative environmental impacts with
                    terminated Relationship
                  </p>

                  <div className="w-[70px] md:w-[120px] xl:w-[70px] lg:w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 308-2e
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <DynamicTable2
                    columns={columns3}
                    data={terminatedRelationship}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* <div
            style={{
              position: `${isBoxOpen ? "unset" : "sticky"}`,
              top: "10rem",
              height: "fit-content",
              backgroundColor: "white",
              paddingBottom: "1rem",
            }}
            className="me-8 mb-8 -right-2"
          >
            <TableSidebar />
          </div> */}
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

export default Supplierassessment;
