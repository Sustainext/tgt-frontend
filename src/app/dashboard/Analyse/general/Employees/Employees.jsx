"use client";
import { useState, useEffect,useRef } from "react";
import DynamicTable from "./customTable";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { columns1 } from "./data";
import { Oval } from "react-loader-spinner";
const Employeessection = ({selectedOrg,selectedCorp,year,togglestatus}) => {
  const [childdata1, setChilddata1] = useState([]);
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
    setChilddata1([]);
    try {
      const response = await axiosInstance.get(
        `/sustainapp/get_general_employee_analysis?corporate=${selectedCorp}&organisation=${selectedOrg}&start=${year}-01-01&end=${year}-12-31`,
       
      );

      const data = response.data;

      const { total_number_of_employees } = data;

      const formatEmployee = (data) => {
        return data.map((item) => ({
          type: item.type_of_employee.replace("_", " "), // Formatting the type to be more readable
          male: item.male.total,
          female: item.female.total,
          nonBinary: item.others.total,
          ageBelow30:
            item.male.yearsold30 +
            item.female.yearsold30 +
            item.others.yearsold30,
          age30To50:
            item.male.yearsold30to50 +
            item.female.yearsold30to50 +
            item.others.yearsold30to50,
          ageAbove50:
            item.male.yearsold50 +
            item.female.yearsold50 +
            item.others.yearsold50,
          total: item.male.total + item.female.total + item.others.total,
        }));
      };

      setChilddata1(formatEmployee(total_number_of_employees));
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
        setChilddata1([]);
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
    
      <div className="flex justify-between">
        <div className={`w-full max-w-full overflow-hidden px-4`}>
          <div className="mb-6">
            <div
              id="ep1"
              className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 "
            >
              <div className="xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center mb-2">
                <p>Total number of employees</p>
                <div className="flex xl:float-end lg:float-end md:float-end 2xl:float-end  4k:float-end  2k:float-end  gap-2">
                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 2-7a
                    </div>
                  </div>
                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 2-7b
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <DynamicTable columns={columns1} data={childdata1} />
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
  );
};

export default Employeessection;
