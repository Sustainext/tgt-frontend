"use client";
import { useState, useRef, useEffect } from "react";
import TableSidebar from "./TableSidebar";
import Table1 from "./Table1";
import Table3 from "./Table3";
import Table2 from "./Table2";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { columns1, columns2, columns3, columns4, columns5,columns6 } from "./data";
import { Oval } from "react-loader-spinner";
const Section = ({
  selectedOrg,
  selectedCorp,
  dateRange,
  selectedLocation,
  isBoxOpen,
}) => {
  const [analyseData, setAnalyseData] = useState([]);

  const [childdata1, setChilddata1] = useState([]);
  const [childdata2, setChilddata2] = useState([]);
  const [childdata4, setChilddata4] = useState([]);
  const [childdata5, setChilddata5] = useState([]);
  const [fulltimebe, setFulltimebe] = useState([]);
  const [parttimebe, setParttimbe] = useState([]);
  const [tempebe, setTempebe] = useState([]);
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

    setChilddata4([]);
    LoaderOpen();
    try {
      const response = await axiosInstance.get(
        `/sustainapp/get_employment_analysis`,
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

      const data = response.data.data;
      console.log(data, "testing");

      const {
        new_employee_hires,
        employee_turnover,
        benefits,
        parental_leave,
        return_to_work_rate_and_retention_rate_of_employee,
      } = data;
      const formattedLocation = new_employee_hires.map((neh) => ({
        type: neh.type_of_employee,
        Totalnoofemployees:neh.total,
        male: neh.percentage_of_male_employee,
        female: neh.percentage_of_female_employee,
        nonBinary: neh.percentage_of_non_binary_employee,
        ageBelow30: neh.yearsold30,
        age30To50: neh.yearsold30to50,
        ageAbove50: neh.yearsold50,
      }));
      const formattedScope = employee_turnover.map((et) => ({
        type: et.type_of_employee,
        Totalnoofemployees:et.total,
        male: et.percentage_of_male_employee,
        female: et.percentage_of_female_employee,
        nonBinary: et.percentage_of_non_binary_employee,
        ageBelow30: et.yearsold30,
        age30To50: et.yearsold30to50,
        ageAbove50: et.yearsold50,
      }));

      const formattedSuppliers = parental_leave.map((pl) => ({
        "Employee category": pl.employee_category,
        Male: pl.male,
        Female: pl.female,
        Total: pl.total,
      }));
      const returnemployee =
        return_to_work_rate_and_retention_rate_of_employee.map((rt) => ({
          "Employee category": rt.employee_category,
          Male: rt.male,
          Female: rt.female,
        }));
      setChilddata1(formattedLocation);
      setChilddata2(formattedScope);
      setChilddata4(formattedSuppliers);
      setChilddata5(returnemployee);
      const {
        benefits_full_time_employees,
        benefits_part_time_employees,
        benefits_temporary_employees,
      } = benefits;

      const formattedFullTimeBenefits = benefits_full_time_employees.map(
        (bft) => ({
          hadername: bft.name,
          selected: bft.selectedLocations,
        })
      );

      const formattedPartTimeBenefits = benefits_part_time_employees.map(
        (bpt) => ({
          hadername: bpt.name,
          selected: bpt.selectedLocations,
        })
      );

      const formattedTemporaryBenefits = benefits_temporary_employees.map(
        (bt) => ({
          hadername: bt.name,
          selected: bt.selectedLocations,
        })
      );

      // Update state with formatted benefits data
      setFulltimebe(formattedFullTimeBenefits);
      setParttimbe(formattedPartTimeBenefits);
      setTempebe(formattedTemporaryBenefits);

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
    if (selectedOrg && dateRange.start < dateRange.end) {
      fetchData();
      fetchLocationData();
      toastShown.current = false;
    } else {
      if (!toastShown.current) {
        toastShown.current = true;
      }
    }
  }, [selectedOrg, dateRange, selectedCorp, selectedLocation]);


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
                   data={[]}
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
                   data={[]}
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
                    <Table3
                   data={[]}
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
                   data={[]}
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
