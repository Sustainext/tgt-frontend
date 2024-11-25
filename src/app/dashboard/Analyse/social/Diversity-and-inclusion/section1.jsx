"use client";
import { useState, useRef, useEffect } from "react";
import TableSidebar1 from "./TableSidebar1";
import TableSidebar2 from "./TableSidebar2";
import axiosInstance from "../../../../utils/axiosMiddleware";
import Table1 from "./Table1";
import Table2 from "./Table2";
import Table3 from "./Table3";
import { column1 } from "./data";
import { yearInfo } from "@/app/shared/data/yearInfo";
import { Oval } from "react-loader-spinner";
import AnalyseHeader2 from "../../AnalyseHeader2";
import AnalyseHeader3 from "../../AnalyseHeader3";
import { setYear } from "date-fns";

const Section1 = ({
  selectedOrg,
  selectedCorp,
  year,
  isBoxOpen,
  activeMonth,
  setSelectedOrg,
  setSelectedCorp,
  setSelectedYear,
  setActiveMonth,
}) => {
  const [
    percentageOfEmployeesWithinGovernmentBodies,
    setPercentageOfEmployeesWithinGovernmentBodies,
  ] = useState([]);

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
    setPercentageOfEmployeesWithinGovernmentBodies([]);

    try {
      const response = await axiosInstance.get(
        `/sustainapp/get_diversity_inclusion_analysis/`,
        {
          params: {
            organisation: selectedOrg,
            corporate: selectedCorp,
            start: `${year}-01-01`,
            end: `${year}-12-31`,
          },
        }
      );
      const data = response.data;

      const { percentage_of_employees_within_government_bodies } = data;

      const formatGovernanceBodiesData = (data) => {
        return data.map((item) => ({
          "Percentage of female within organisation's governance bodies":
            item.percentage_of_female_with_org_governance,
          "Percentage of male within organisation's governance bodies":
            item.percentage_of_male_with_org_governance,
          "Percentage of Non-binary within organisation's governance bodies":
            item.percentage_of_non_binary_with_org_governance,
          "Percentage of employee within age group of (under 30 years old) organisation's governance bodies":
            item.percentage_of_employees_within_30_age_group,
          "Percentage of employee within age group of (30-50 years old) organisation's governance bodies":
            item.percentage_of_employees_within_30_to_50_age_group,
          "Percentage of employee within age group of (over 50 years old) organisation's governance bodies":
            item.percentage_of_employees_more_than_50_age_group,
          "Percentage of minority group of organisation's governance bodies":
            item.percentage_of_employees_in_minority_group,
        }));
      };

      setPercentageOfEmployeesWithinGovernmentBodies(
        formatGovernanceBodiesData(
          percentage_of_employees_within_government_bodies
        )
      );

      LoaderClose();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      LoaderClose();
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
        <div>
          <div className="mt-5 mb-2 mx-5 text-[15px] text-[#344054]">
            Diversity and Inclusion (1/2)
          </div>
          <AnalyseHeader2
            activeMonth={activeMonth}
            setActiveMonth={setActiveMonth}
            selectedOrg={selectedOrg}
            setSelectedOrg={setSelectedOrg}
            selectedCorp={selectedCorp}
            setSelectedCorp={setSelectedCorp}
            year={year}
            setYear={setSelectedYear}
          />
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
                      columns={column1}
                      data={percentageOfEmployeesWithinGovernmentBodies}
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
              <TableSidebar1 />
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

export default Section1;
