"use client";
import { useState,useRef,useEffect } from "react";
import TableSidebar1 from "./TableSidebar1";
import TableSidebar2 from "./TableSidebar2";
import axiosInstance from "../../../../utils/axiosMiddleware";
import Table1 from "./Table1";
import Table2 from "./Table2";
import Table3 from "./Table3";
import { column1 } from "./data";
import NavigationButtons from "./NavigationButtons";
import { yearInfo } from "@/app/shared/data/yearInfo";
import { Oval } from 'react-loader-spinner';
import AnalyseHeader2 from "../../AnalyseHeader2";
import AnalyseHeader3 from "../../AnalyseHeader3";
import { setYear } from "date-fns";

const Section2 = ({selectedOrg,selectedCorp,year,isBoxOpen,setSelectedYear,selectedLocation,setSelectedLocation}) => {
   
      const [
        numberOfEmployeesPerEmployeeCategory,
        setNumberOfEmployeesPerEmployeeCategory,
      ] = useState([]);
      const [ratioOfBasicSalaryOfWomenToMen, setRatioOfBasicSalaryOfWomenToMen] =
        useState([]);
      const [ratioOfRemunerationOfWomenToMen, setRatioOfRemunerationOfWomenToMen] =
        useState([]);
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
    setNumberOfEmployeesPerEmployeeCategory([]);
    setRatioOfBasicSalaryOfWomenToMen([]);
    setRatioOfRemunerationOfWomenToMen([]);
    try {
      const response = await axiosInstance.get(
        `/sustainapp/get_diversity_inclusion_second_screen_analyse/`,
        { params: {
            organisation: selectedOrg,
            corporate: selectedCorp,
            start: `${year}-01-01`,
            end: `${year}-12-31`,
        
          } }
      );
      const data = response.data;

      const {
        number_of_employee_per_employee_category,
        ratio_of_basic_salary_of_women_to_men,
        ratio_of_remuneration_of_women_to_men,
      } = data;

      

      const formatEmployeeCategoryData = (data) => {
        return data.map((item) => ({
          Category: item.Category,
          Male: item.percentage_of_male_with_org_governance,
          Female: item.percentage_of_female_with_org_governance,
          "Non-Binary": item.percentage_of_non_binary_with_org_governance,
          "<30 years": item.percentage_of_employees_within_30_age_group,
          "30-50 years": item.percentage_of_employees_within_30_to_50_age_group,
          ">50 years": item.percentage_of_employees_more_than_50_age_group,
          "Minority group": item.percentage_of_employees_in_minority_group,
        }));
      };

       
        setNumberOfEmployeesPerEmployeeCategory(
          formatEmployeeCategoryData(number_of_employee_per_employee_category)
        );
        setRatioOfBasicSalaryOfWomenToMen(
          ratio_of_basic_salary_of_women_to_men
        );
        setRatioOfRemunerationOfWomenToMen(
          ratio_of_remuneration_of_women_to_men
        );


      LoaderClose();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      LoaderClose();
    }
  };





  useEffect(() => {
    if (selectedLocation && year) {
        fetchData();
        toastShown.current = false;
    } else {
        if (!toastShown.current) {
            toastShown.current = true;
        }
    }
}, [ year,selectedLocation]);

  return (
    <div>
      <div>
      <div>
           <div className="mt-5 mb-2 mx-4 text-[15px] text-[#344054]">Diversity and Inclusion (2/2)</div>
           <AnalyseHeader3
           setSelectedLocation={setSelectedLocation}
          selectedLocation={selectedLocation}
          year={year}
          setYear={setSelectedYear}
        />
          <div className="flex">
        <div className={`ps-4 w-[100%] me-4`}>
              <div className="mb-6">
                <div
                  id="ep2"
                  className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 "
                >
                  <div className="flex justify-between items-center mb-2">
                    <p>
                      Percentage of individuals within the organization’s
                      governance bodies
                    </p>

                    <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                      <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                        GRI 405-1b
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <Table2 data={numberOfEmployeesPerEmployeeCategory} />
                </div>
              </div>
              <div className="mb-6">
                <div
                  id="ep3"
                  className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 "
                >
                  <div className="flex justify-between items-center mb-2">
                    <p>Ratio of basic salary of women to men </p>

                    <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                      <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                        GRI 405-2a
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <Table3 data={ratioOfBasicSalaryOfWomenToMen} />
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <div
                  id="ep4"
                  className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 "
                >
                  <div className="flex justify-between items-center mb-2">
                    <p>Ratio of remuneration of women to men</p>

                    <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                      <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                        GRI 405-2a
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <Table3 data={ratioOfRemunerationOfWomenToMen} />
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
          <TableSidebar2 />
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

export default Section2;
