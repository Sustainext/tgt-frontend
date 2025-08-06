"use client";
import { useState, useRef, useEffect } from "react";
import TableSidebar from "./TableSidebar";
import DynamicTable from "./customTable";
import Table from "./Table";
import DynamicTable2 from "./customTable2";
import BenefitTable from "./benefitsTable";
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
  const [childdata5, setChilddata5] = useState([]);
  const [childdata3, setChilddata3] = useState([]);
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
        number_of_employee_per_employee_category,
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
        const formattedemployeecategory = number_of_employee_per_employee_category.map((etc) => ({
          "Employee category": etc.Category,
          Male: etc.percentage_of_male_with_org_governance,
          Female: etc.percentage_of_female_with_org_governance,
          NonBinary: etc.percentage_of_non_binary_with_org_governance,
          ageBelow30: etc.percentage_of_employees_within_30_age_group,
          age30To50: etc.percentage_of_employees_within_30_to_50_age_group,
          ageAbove50: etc.percentage_of_employees_more_than_50_age_group,
          Minoritygroup:etc.percentage_of_employees_in_minority_group,
          VulnerableCommunities:etc.percentage_of_employees_in_vulnerable_communities,
        }));
      setChilddata1(formattedLocation);
      setChilddata2(formattedScope);
      setChilddata4(formattedSuppliers);
      setChilddata5(returnemployee);
      setChilddata3(formattedemployeecategory);
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
          setChilddata5([]);
          setFulltimebe([]);
          setParttimbe([]);
          setTempebe([]);
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
          setChilddata5([]);
          setFulltimebe([]);
          setParttimbe([]);
          setTempebe([]);
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


  const data = [
    {
      hadername: "Life Insurance",
      selected: [149, 148],
    },
    {
      hadername: "Health Care",
      selected: [144, 149],
    },
    {
      hadername: "Life Insurance",
      selected: [149, 148],
    },
    {
      hadername: "Health Care",
      selected: [144, 149],
    },
    {
      hadername: "Life Insurance",
      selected: [149, 148],
    },
    {
      hadername: "Health Care",
      selected: [144, 149],
    },
    {
      hadername: "Life Insurance",
      selected: [149, 148],
    },
    {
      hadername: "Health Care",
      selected: [144, 149],
    },
    {
      hadername: "Life Insurance",
      selected: [149, 148],
    },
    {
      hadername: "Health Care",
      selected: [144, 149],
    },
    {
      hadername: "Life Insurance",
      selected: [149, 148],
    },
    {
      hadername: "Health Care",
      selected: [144, 149],
    },
    {
      hadername: "Life Insurance",
      selected: [149, 148],
    },
    {
      hadername: "Health Care",
      selected: [144, 149],
    },
    {
      hadername: "Life Insurance",
      selected: [149, 148],
    },
    {
      hadername: "Health Care",
      selected: [144, 149],
    },
    {
      hadername: "Life Insurance",
      selected: [149, 148],
    },
    {
      hadername: "Health Care",
      selected: [144, 149],
    },
  ];
  return (
    <div>
      <div>
        <div className="xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block">
          <div className="flex-1 ps-4 me-4 max-w-full overflow-hidden">
            <div className="mb-6">
              <p className="text-black text-[15px] font-bold ">
                Employee Hires & Turnover
              </p>
              <div
                id="ep1"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 "
              >
                <div className="xl:flex lg:flex md:flex 2xl:flex 2k:flex 4k:flex  justify-between items-center mb-2">
                  <p className="text-black text-[13px] font-[400]">
                    New Employee Hires
                  </p>
                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 401-1a
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <DynamicTable columns={columns1} data={childdata1} />
                </div>
                <div className="xl:flex lg:flex md:flex 2xl:flex 2k:flex 4k:flex  justify-between items-center mb-2">
                  <p className="text-black text-[13px] font-[400]">
                    New Employee Turnover
                  </p>
                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 401-1a
                    </div>
                  </div>
                </div>

                <div>
                  <DynamicTable columns={columns2} data={childdata2} />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-black text-[15px] font-bold ">Benefits</p>
              <div
                id="ep2"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 "
              >
                <div className="xl:flex lg:flex md:flex 2xl:flex 2k:flex 4k:flex  justify-between items-center mb-2">
                  <p className="text-black text-[13px] font-[400]">
                    Benefits provided to full-time employees by location
                  </p>
                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 401-2a
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <BenefitTable locationdata={locationdata} data={fulltimebe} />
                </div>

                <div className="xl:flex lg:flex md:flex 2xl:flex 2k:flex 4k:flex  justify-between items-center mb-2">
                  <p className="text-black text-[13px] font-[400]">
                    Benefits provided to part-time employees by location
                  </p>
                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 401-2a
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <BenefitTable locationdata={locationdata} data={parttimebe} />
                </div>

                <div className="xl:flex lg:flex md:flex 2xl:flex 2k:flex 4k:flex  justify-between items-center mb-2">
                  <p className="text-black text-[13px] font-[400]">
                    Benefits provided to temporary-time employees by location
                  </p>
                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 401-2a
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <BenefitTable locationdata={locationdata} data={tempebe} />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-black text-[15px] font-bold ">
                Parental leave
              </p>
              <div
                id="ep3"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 "
              >
                <div className="xl:flex lg:flex md:flex 2xl:flex 2k:flex 4k:flex  justify-between items-center mb-2">
                  <p className="text-black text-[13px] font-[400]">
                    Parental leave
                  </p>
                  <div className="flex gap-2">
                    <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                      <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                        GRI 401-3a
                      </div>
                    </div>
                    <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                      <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                        GRI 401-3b
                      </div>
                    </div>
                    <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                      <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                        GRI 401-3c
                      </div>
                    </div>
                    <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                      <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                        GRI 401-3d
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <DynamicTable2 columns={columns4} data={childdata4} />
                </div>
               
              </div>
            </div>
            <div
                id="ep4"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 "
              >
            <div className="xl:flex lg:flex md:flex 2xl:flex 2k:flex 4k:flex  justify-between items-center mb-2">
                  <p className="text-black text-[15px] font-bold ">
                    Return to work rate and retention rate of employee
                  </p>
                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 401-3e
                    </div>
                  </div>
                </div>

                <div>
                  <DynamicTable2 columns={columns5} data={childdata5} />
                </div>
                </div>
                <div
                id="ep5"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 "
              >
            <div className="xl:flex lg:flex md:flex 2xl:flex 2k:flex 4k:flex  justify-between items-center mb-2">
                  <p className="text-black text-[15px] font-bold ">
                  Percentage of employee per employee category 
                  </p>
                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 405-1b
                    </div>
                  </div>
                </div>

                <div>
                  <Table columns={columns6} data={childdata3} />
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
    </div>
  );
};

export default Section;
