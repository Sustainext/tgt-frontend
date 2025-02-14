"use client";
import { useState,useRef,useEffect } from "react";
import TableSidebar from "./TableSidebar";
import DynamicTable2 from "./customTable2";
import DateRangePicker from "../../../../utils/DatePickerComponent";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { columns1 } from "./data";
import { Oval } from "react-loader-spinner";

const Section = ({selectedOrg,selectedCorp,dateRange,isBoxOpen,togglestatus}) => {
 
  const [loopen, setLoOpen] = useState(false);
  const [customerhealth, setCustomerhealth] = useState([]);
  const toastShown = useRef(false);

  
  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };
  const fetchData = async () => {

    LoaderOpen();
    try {
      const response = await axiosInstance.get(
        `/sustainapp/get_customer_privacy_analysis`,
        {
          params: {
            organisation: selectedOrg,
            corporate: selectedCorp,
            start: dateRange.start,
            end: dateRange.end,
          },
        }
      );

      const data = response.data;

      const { customer_privacy_data } = data;

      const formatcustomerhealth = (data) => {
        console.log(data, "test loacl data");
        return data.map((data, index) => ({
          "Number of substantiated complaints received concerning breaches of customer privacy":
            data.customerprivacy,
          "Complaints received from outside parties and substantiated by the organization":
            data.substantiatedorganization,
          "Complaints from regulatory bodies": data.regulatorybodies,
        }));
      };
      setCustomerhealth(formatcustomerhealth(customer_privacy_data));
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
        setCustomerhealth([]);
    
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
                <div>
                  <p className="text-[15px] font-bold">
                    Substantiated complaints concerning breaches of customer
                    privacy and losses of customer data
                  </p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-500 text-[13px]">
                    Total number of substantiated complaints received concerning
                    breaches of customer privacy
                  </p>

                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 418-1a
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <DynamicTable2 columns={columns1} data={customerhealth} />
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
