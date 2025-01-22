"use client";
import React, { useState, useEffect, useRef } from "react";
import DynamicTable2 from "./table";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { columns1, columns2, columns3 } from "./data";
import { yearInfo } from "@/app/shared/data/yearInfo";
import { Oval } from "react-loader-spinner";
import TableSidebar from "./TableSidebar";
const Effluents = ({ selectedOrg, selectedCorp, year, isBoxOpen }) => {

  const [Effdata1, setEffdata1] = useState([]);
  const [Effdata2, setEffdata2] = useState([]);
  const [Effdata3, setEffdata3] = useState([]);
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
  
    setEffdata1([]);
    setEffdata2([]);
    setEffdata3([]);
  
    try {
      const response = await axiosInstance.get(
        `/sustainapp/get_analyze_waste_significant_spills?corporate=${selectedCorp}&organisation=${selectedOrg}&start=${year}-01-01&end=${year}-12-31`
      );
  
      const data = response.data;
      console.log(data, "testing");
  
      const {
        total_number_and_volume_by_material,
        total_number_and_volume_by_location,
        total_number_and_volume_significant_spills,
      } = response.data;
      
      const formattedMaterialData = formatMaterialData(total_number_and_volume_by_material || []);
      const formattedLocationData = formatLocationData(total_number_and_volume_by_location || []);
      const formattedSignificantSpillsData = formatSignificantSpillsData(total_number_and_volume_significant_spills || []);
      
      setEffdata1(formattedMaterialData);
      setEffdata2(formattedLocationData);
      setEffdata3(formattedSignificantSpillsData);
  
      function formatMaterialData(materialData) {
        return materialData.map((item) => ({
          "Material of the spill": item.material || "N/A",
          "Volume of the spill": item.volume_of_spills || "N/A",
          Unit: item.unit || "N/A",
        }));
      }
      
      function formatLocationData(locationData) {
        return locationData.map((item) => ({
          "Location of the spill": item.location || "N/A",
          "Volume of the spill": item.volume_of_spills || "N/A",
          Unit: item.unit || "N/A",
        }));
      }
      
      function formatSignificantSpillsData(significantSpills) {
        return significantSpills.map((item) => ({
          "Total number of Significant spill": item.number_of_significant_spills || "N/A",
          "Total volume of Significant spill": item.volume_of_spills || "N/A",
          Unit: item.unit || "N/A",
        }));
      }
      
  

      LoaderClose();
    } catch (error) {
      LoaderClose();
  
   
  
      setEffdata1([]);
      setEffdata2([]);
      setEffdata3([]);
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
            <div className="mb-8">
              <div
                id="eff1"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 "
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="text-neutral-700 text-[15px] font-bold">
                    Total number & volume of spills by material
                  </p>

                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 306-3b
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <DynamicTable2 columns={columns1} data={Effdata1} />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div
                id="eff2"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 "
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="text-neutral-700 text-[15px] font-bold w-[880px]">
                    Total number & volume of by location
                  </p>

                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 306-3d
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <DynamicTable2 columns={columns2} data={Effdata2} />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div
                id="eff3"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 "
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="text-neutral-700 text-[15px] font-bold">
                    Total number & volume of significant spills
                  </p>

                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 306-3a
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <DynamicTable2
                    columns={columns3}
                    data={Effdata3}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
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

export default Effluents;
