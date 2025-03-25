"use client";
import { useState, useRef, useEffect } from "react";
import TableSidebar from "./TableSidebar";
import Table1 from "./Table1";
import Table3 from "./Table3";
import Table2 from "./Table2";
import Table4 from "./Table4";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { columns1, columns2, columns3, columns4, columns5,columns6 } from "./data";
import { Oval } from "react-loader-spinner";
const Section = ({
  selectedOrg,
  selectedCorp,
  dateRange,
  selectedLocation,
  isBoxOpen,
  togglestatus,
}) => {
  const [analyseData, setAnalyseData] = useState([]);

  const [childdata1, setChilddata1] = useState([]);
  const [childdata2, setChilddata2] = useState([]);
  const [childdata4, setChilddata4] = useState([]);
  const [childdata3, setChilddata3] = useState([]);
  const toastShown = useRef(false);
  const [loopen, setLoOpen] = useState(false);
  const [locationdata, setLocationdata] = useState([]);
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
        `/sustainapp/get_diversity_inclusion_analyse`,
        {
          params: {
            organisation: selectedOrg,
            corporate: selectedCorp,
            location: selectedLocation,
            start: dateRange.start,
            end: dateRange.end,
          },
        }
      );

      const data = response.data;
      

      const formattedData = data.percentage_of_employees_within_government_bodies.map((item) => [
        item.male_percentage,
        item.female_percentage,
        item.nonBinary_percentage,
        item.lessThan30_percentage,
        item.between30and50_percentage,
        item.moreThan50_percentage,
        item.minorityGroup_percentage,
        item.vulnerableCommunities_percentage,
      ]);
      
      
     
      setChilddata1(formattedData);
      setChilddata2(data.ratio_of_basic_salary_of_women_to_men);
      setChilddata4(data.marketing_presence);
      setChilddata3(data.ratio_of_remuneration_of_women_to_men);


  
      LoaderClose();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      LoaderClose();
    }
  };

  const fetchLocationData = async () => {
    LoaderOpen();
    try {
      const response = await axiosInstance.get(
        `${process.env.BACKEND_API_URL}/sustainapp/get_location_as_per_org_or_corp/?corporate=${selectedCorp}&organization=${selectedOrg}`
      );
      setLocationdata(response.data);
    } catch (error) {
      console.error("Failed to fetch location data", error);
    } finally {
      LoaderClose();
    }
  };
  useEffect(() => {

    if (selectedOrg && dateRange.start && dateRange.end && togglestatus) {
      if (togglestatus === "Corporate") {
        if (selectedCorp) {
          fetchData();
          fetchLocationData();
        } else {
          setChilddata1([]);
          setChilddata2([]);
          setChilddata3([]);
          setChilddata4([]);
          setLocationdata([]);
        
        }
      } else if (togglestatus === "Location") {
        if (selectedLocation) {
          fetchData();
          fetchLocationData();
        } else {
          setChilddata1([]);
          setChilddata2([]);
          setChilddata3([]);
          setChilddata4([]);
          setLocationdata([]);
        }
      } else {
        console.log("Calling loadFormData for Other");
        fetchData();
        fetchLocationData();
      }
  
      toastShown.current = false;
    } else {
      if (!toastShown.current) {
        console.log("Toast should be shown");
        toastShown.current = true;
      }
    }
  }, [selectedOrg, dateRange, selectedCorp, togglestatus, selectedLocation]);



  return (
    <div>
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
                      Percentage of individuals within the organization’s
                      governance bodies{" "}
                    </p>
 
                    <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                      <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                        GRI 405-1a
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <Table1
                   data={childdata1}
                    />
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
                    Ratio of basic salary by Gender					
                    </p>
 
                    <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                      <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                        GRI 405-2a
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <Table3
                   data={childdata2}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <div
                  id="ep3"
                  className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 "
                >
                  <div className="flex justify-between items-center mb-2">
                    <p>
                    Ratio of remuneration by Gender										
                    </p>
 
                    <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                      <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                        GRI 405-2a
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <Table4
                   data={childdata3}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <div
                  id="ep4"
                  className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 "
                >
                  <div className="flex justify-between items-center mb-2">
                    <p>
                    Ratio of the entry-level wage to the minimum wage by gender and significant locations of operation 													
                    </p>
 
                    <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                      <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                        GRI 202-1a
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <Table2
                   data={childdata4}
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
