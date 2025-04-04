"use client";
import { useState,useRef,useEffect } from "react";
import TableSidebar from "./TableSidebar";
import DynamicTable2 from "./customTable2";
import Table from './customTable'
import DateRangePicker from "../../../../utils/DatePickerComponent";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { columns1, columns2, columns3, columns4 } from "./data";
import { Oval } from "react-loader-spinner";

const Section = ({selectedOrg,selectedCorp,dateRange,isBoxOpen,togglestatus}) => {
 
  const [loopen, setLoOpen] = useState(false);
  const [table1, setTable1] = useState([]);
  const [table2, setTable2] = useState([]);
  const [table3, setTable3] = useState([]);
  const toastShown = useRef(false);

  
  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };
  const fetchData = async () => {

    LoaderOpen();
    setTable1([]);
    setTable2([]);
    setTable3([]);
 
    try {
      const response = await axiosInstance.get(
        `sustainapp/get_training_social_analysis?corporate=${selectedCorp}&organisation=${selectedOrg}&start=${dateRange.start}&end=${dateRange.end}`,


      );

      const data = response.data;

      const {
        average_hours_of_training_provided_to_employees,
        average_hours_of_training_provided_to_employees_per_category,
        percentage_of_employees_receiving_regular_performance_and_career_development_reviews,
      
      } = data;

      const formatTable1 = (data) => {
        return data.map((data, index) => {
      
          const formattedPercentage1 = data.average_training_hours_per_employee;
          const formattedPercentage2 = data.average_training_hours_per_female_employee;
          const formattedPercentage3 = data.average_training_hours_per_male_employee;
             
          return {
            "Average training hours per employee": formattedPercentage1,
            "Average training hours per Female employee": formattedPercentage2,
            "Average training hours per Male employee": formattedPercentage3,
          };
        });
      };
      const formatTable2 = (data) => {
        return data.map((data, index) => {
        
          const formattedPercentage1 = data.avg_training_hrs_per_employee;
          const formattedPercentage2 = data.avg_training_hrs_male_employee;
           const formattedPercentage3 = data.avg_training_hrs_female_employee;
         const formattedPercentage4 = data.avg_training_hrs_other_employee;
          
          return {
            Categories: data.category,
            "Average training hours per employee category":
              formattedPercentage1,
            "Average training hours of male employee in category":
              formattedPercentage2,
            "Average training hours of female employee in category":
              formattedPercentage3,
            "Average training hours of non-binary employee in category":
              formattedPercentage4,
          };
        });
      };
   
     
      setTable1(formatTable1(average_hours_of_training_provided_to_employees));
      setTable2(formatTable2(average_hours_of_training_provided_to_employees_per_category));
      setTable3(
        
          percentage_of_employees_receiving_regular_performance_and_career_development_reviews
        
      );
   
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
        setTable1([]);
        setTable2([]);
        setTable3([]);
      
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
      <div>
      <div className="flex">
          <div className={`ps-4 w-[100%] me-4`}>
            <div className="mb-6">
              <div
                id="ep1"
                className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 "
              >
              
                <div className="xl:flex lg:flex md:flex 2xl:flex 2k:flex 4k:flex justify-between items-center mb-2">
                  <p className="text-[15px] font-bold mb-2">
                    Average hours of training provided to employees
                  </p>

                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 404-1a
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <DynamicTable2 columns={columns1} data={table1} />
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div
                id="ep2"
                className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 "
              >
            
                <div className="xl:flex lg:flex md:flex 2xl:flex 2k:flex 4k:flex justify-between items-center mb-2">
                  <p className="text-[15px] font-bold mb-2">
                    Average hours of training provided to employees
                  </p>

                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 404-1a
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <DynamicTable2 columns={columns2} data={table2} />
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div
                id="ep3"
                className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 "
              >
               
                <div className="xl:flex lg:flex md:flex 2xl:flex 2k:flex 4k:flex justify-between items-center">
                  <p className="text-[15px] font-bold mb-2">
                  Percentage of employees receiving regular performance and career development reviews
                  </p>

                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 404-3a
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <Table  data={table3} />
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
            className="mb-8 me-2 hidden xl:block lg:block md:block 2xl:block 4k:block 2k:block"
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
