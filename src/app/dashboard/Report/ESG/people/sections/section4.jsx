"use client";
import { useState, useRef, useEffect } from "react";
import BenefitsTable from "../tables/benifitsTable";
import axiosInstance from "../../../../../utils/axiosMiddleware";

const Section4 = ({ section13_1_3Ref, data,reportType }) => {
  const [locationdata, setLocationdata] = useState([]);
  const selectedCorp = data?.["corporate_id"] ? data["corporate_id"] : "";
  const selectedOrg = data?.["organisation_id"] ? data["organisation_id"] : "";

  const fetchLocationData = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.BACKEND_API_URL}/sustainapp/get_location_as_per_org_or_corp/?corporate=${selectedCorp}&organization=${selectedOrg}`
      );
      setLocationdata(response.data);
    } catch (error) {
      console.error("Failed to fetch location data", error);
    } finally {
    }
  };

  useEffect(() => {
    if (selectedOrg) {
      fetchLocationData();
    }
  }, [selectedOrg, selectedCorp]);

  const benefits = data["401_social_analyse"]?.["data"]?.["benefits"] || {};

  // Destructure with default values to handle undefined cases
  const {
    benefits_full_time_employees = [],
    benefits_part_time_employees = [],
    benefits_temporary_employees = [],
  } = benefits;

  // Format the data while ensuring safety for undefined cases
  const formattedFullTimeBenefits = benefits_full_time_employees.map((bft) => ({
    hadername: bft.name || "No name available",
    selected: bft.selectedLocations || [],
  }));

  const formattedPartTimeBenefits = benefits_part_time_employees.map((bpt) => ({
    hadername: bpt.name || "No name available",
    selected: bpt.selectedLocations || [],
  }));

  const formattedTemporaryBenefits = benefits_temporary_employees.map((bt) => ({
    hadername: bt.name || "No name available",
    selected: bt.selectedLocations || [],
  }));

  // Assign the processed data
  const fullTimeData = formattedFullTimeBenefits;
  const partTimeData = formattedPartTimeBenefits;
  const temporaryData = formattedTemporaryBenefits;

  return (
    <>
      <div id="section13_1_3" ref={section13_1_3Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
        {reportType=='GRI Report: In accordance With'?'13.1.3':'13.1.2'} Employee Benefits and Health Services
        </h3>
        <p className="text-[#344054] text-sm mb-4">
        We offer comprehensive benefits and health services to support the well-being of our employees, including medical insurance, wellness programs, and mental health resources.
        </p>
        {/* <p className="text-[15px] mb-2 font-semibold">
          Significant locations of operation
        </p> */}
        <p className="text-sm mb-4">
          {data["401-2b-significant_loc"]?.data?.[0]?.Q1 || "No data available"}
        </p>
       
        <p className="text-[15px] mb-2 font-semibold">
          Benefits provided to full-time employees by location
        </p>
        <div className="shadow-md rounded-md mb-4">
          <BenefitsTable locationdata={locationdata} data={fullTimeData} />
        </div>
        <p className="text-[15px] mb-2 font-semibold">
          Benefits provided to part-time employees by location
        </p>
        <div className="shadow-md rounded-md mb-4">
          <BenefitsTable locationdata={locationdata} data={partTimeData} />
        </div>
        <p className="text-[15px] mb-2 font-semibold">
          Benefits provided to temporary employees by location
        </p>
        <div className="shadow-md rounded-md mb-4">
          <BenefitsTable locationdata={locationdata} data={temporaryData} />
        </div>
        <p className="text-[15px] mb-2 font-semibold">
        Standard notice periods for all employees provided before any significant operational changes:
        </p>
        <p className="text-sm mb-4">
          {data["402_1a_minimum_number_of_weeks"]?.data?.[0]?.Q1 ||
            "No data available"}
        </p>
      </div>
    </>
  );
};

export default Section4;
