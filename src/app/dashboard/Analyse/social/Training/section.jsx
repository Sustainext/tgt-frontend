"use client";
import { useState,useRef,useEffect } from "react";
import TableSidebar from "./TableSidebar";
import DynamicTable2 from "./customTable2";
import Table from './customTable'
import DateRangePicker from "../../../../utils/DatePickerComponent";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { columns1, columns2, columns3, columns4 } from "./data";
import { Oval } from "react-loader-spinner";

const Section = ({selectedOrg,selectedCorp,dateRange,isBoxOpen}) => {
 
  const [loopen, setLoOpen] = useState(false);
  const [table1, setTable1] = useState([]);
  const [table2, setTable2] = useState([]);
  const [table3, setTable3] = useState([]);
  const [table4, setTable4] = useState([]);
  const toastShown = useRef(false);

  
  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };
  const fetchData = async (params) => {

    LoaderOpen();
    setTable1([]);
    setTable2([]);
    setTable3([]);
    setTable4([]);
    try {
      const response = await axiosInstance.get(
        `/sustainapp/get_training_social_analysis`,
        {
          params: params,
        }
      );

      const data = response.data;

      const {
        average_hours_of_training_provided_to_employees,
        average_training_hours_per_employee_category,
        percentage_of_employees_receiving_regular_performance_and_career_development_reviews,
        percentage_of_employees_receiving_regular_performance_and_career_development_reviews_by_gender,
      } = data;

      const formatTable1 = (data) => {
        return data.map((data, index) => {
          const average_training_hours_per_employee = parseFloat(
            data.average_training_hours_per_employee
          ).toFixed(2);
          const formattedPercentage1 =
            average_training_hours_per_employee.endsWith(".00")
              ? average_training_hours_per_employee.slice(0, -3)
              : average_training_hours_per_employee;
          const formattedPercentageWithIcon1 = formattedPercentage1 + "%";
          const average_training_hours_per_female_employee = parseFloat(
            data.average_training_hours_per_female_employee
          ).toFixed(2);
          const formattedPercentage2 =
            average_training_hours_per_female_employee.endsWith(".00")
              ? average_training_hours_per_female_employee.slice(0, -3)
              : average_training_hours_per_employee;
          const average_training_hours_per_male_employee = parseFloat(
            data.average_training_hours_per_male_employee
          ).toFixed(2);
          const formattedPercentage3 =
            average_training_hours_per_male_employee.endsWith(".00")
              ? average_training_hours_per_male_employee.slice(0, -3)
              : average_training_hours_per_male_employee;
          return {
            "Average training hours per employee": formattedPercentageWithIcon1,
            "Average training hours per Female employee": formattedPercentage2,
            "Average training hours per Male employee": formattedPercentage3,
          };
        });
      };
      const formatTable2 = (data) => {
        return data.map((data, index) => {
          const average_training_hours_per_employee = parseFloat(
            data.average_training_hours_per_employee
          ).toFixed(2);
          const formattedPercentage1 =
            average_training_hours_per_employee.endsWith(".00")
              ? average_training_hours_per_employee.slice(0, -3)
              : average_training_hours_per_employee;
          const average_training_hours_per_female_employee = parseFloat(
            data.average_training_hours_per_female_employee
          ).toFixed(2);
          const formattedPercentage2 =
            average_training_hours_per_female_employee.endsWith(".00")
              ? average_training_hours_per_female_employee.slice(0, -3)
              : average_training_hours_per_female_employee;
          const average_training_hours_per_male_employee = parseFloat(
            data.average_training_hours_per_male_employee
          ).toFixed(2);
          const formattedPercentage3 =
            average_training_hours_per_male_employee.endsWith(".00")
              ? average_training_hours_per_male_employee.slice(0, -3)
              : average_training_hours_per_male_employee;
          const average_training_hours_per_non_binary_employee = parseFloat(
            data.average_training_hours_per_male_employee
          ).toFixed(2);
          const formattedPercentage4 =
            average_training_hours_per_non_binary_employee.endsWith(".00")
              ? average_training_hours_per_non_binary_employee.slice(0, -3)
              : average_training_hours_per_non_binary_employee;
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
      const formatTable3 = (data) => {
        return data.map((data, index) => {
          const percentage_of_employees_who_received_regular_performance_reviews =
            parseFloat(
              data.percentage_of_employees_who_received_regular_performance_reviews
            ).toFixed(2);
          const formattedPercentage1 =
            percentage_of_employees_who_received_regular_performance_reviews.endsWith(
              ".00"
            )
              ? percentage_of_employees_who_received_regular_performance_reviews.slice(
                  0,
                  -3
                )
              : percentage_of_employees_who_received_regular_performance_reviews;
          const percentage_of_employees_who_received_regular_career_development_reviews =
            parseFloat(
              data.percentage_of_employees_who_received_regular_career_development_reviews
            ).toFixed(2);
          const formattedPercentage2 =
            percentage_of_employees_who_received_regular_career_development_reviews.endsWith(
              ".00"
            )
              ? percentage_of_employees_who_received_regular_career_development_reviews.slice(
                  0,
                  -3
                )
              : percentage_of_employees_who_received_regular_career_development_reviews;

          return {
            "Employee Category": data.Category,
            "Percentage of employees who received regular performance review":
              formattedPercentage1,
            "Percentage of employees who received regular career development review":
              formattedPercentage2,
          };
        });
      };
      const formatTable4 = (data) => {
        return data.map((data, index) => {
          const percentage_of_employees_who_received_regular_performance_reviews =
            parseFloat(
              data.percentage_of_employees_who_received_regular_performance_reviews
            ).toFixed(2);
          const formattedPercentage1 =
            percentage_of_employees_who_received_regular_performance_reviews.endsWith(
              ".00"
            )
              ? percentage_of_employees_who_received_regular_performance_reviews.slice(
                  0,
                  -3
                )
              : percentage_of_employees_who_received_regular_performance_reviews;
          const percentage_of_employees_who_received_regular_career_development_reviews =
            parseFloat(
              data.percentage_of_employees_who_received_regular_career_development_reviews
            ).toFixed(2);
          const formattedPercentage2 =
            percentage_of_employees_who_received_regular_career_development_reviews.endsWith(
              ".00"
            )
              ? percentage_of_employees_who_received_regular_career_development_reviews.slice(
                  0,
                  -3
                )
              : percentage_of_employees_who_received_regular_career_development_reviews;

          return {
            Gender: data.Gender,
            "Percentage of employees who received regular performance review":
              formattedPercentage1,
            "Percentage of employees who received regular career development review":
              formattedPercentage2,
          };
        });
      };
      setTable1(formatTable1(average_hours_of_training_provided_to_employees));
      setTable2(formatTable2(average_training_hours_per_employee_category));
      setTable3(
        formatTable3(
          percentage_of_employees_receiving_regular_performance_and_career_development_reviews
        )
      );
      setTable4(
        formatTable4(
          percentage_of_employees_receiving_regular_performance_and_career_development_reviews_by_gender
        )
      );
      LoaderClose();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      LoaderClose();
    }
  };


  useEffect(() => {
    if (selectedOrg && dateRange.start<dateRange.end) {
        fetchData();
        toastShown.current = false;
    } else {
        if (!toastShown.current) {
            toastShown.current = true;
        }
    }
}, [selectedOrg, dateRange, selectedCorp]);

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
                <div>
                  <p className="text-[15px] font-bold">
                    Average hours of training provided to employees
                  </p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-500 text-[13px]">
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
                <div>
                  <p className="text-[15px] font-bold">
                    Average hours of training provided to employees
                  </p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-500 text-[13px]">
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
                <div>
                  <p className="text-[15px] font-bold">
                  Percentage of employees receiving regular performance and career development reviews
                  </p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-500">
                  Percentage of employees receiving regular performance and career development reviews
                  </p>

                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 404-3a
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <Table columns={columns3} data={table3} />
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
