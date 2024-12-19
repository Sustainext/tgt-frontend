import React from 'react';
import DynamicTable from '../tables/dynamicTable';
import DynamicTable2 from '../tables/dynamicTable2';
import { useSelector } from "react-redux";

const Section19 = ({ section11_5_4Ref }) => {
  // Extract data from Redux state
  const data = useSelector((state) => state.screen11Slice.getdata);

  // Destructure communication_training_analyze data from the API response
  const {
    analyze_205_2a = [],
    analyze_205_2b = [],
    analyze_205_2c = [],
    analyze_205_2d = [],
    analyze_205_2e = []
  } = data?.economic_analyse?.communication_training_analyze || {}

  // Define titles and column headers for each table
  const title1 = "Total number and percentage of governance body members that the organization’s anti-corruption policies and procedures have been communicated to, by region:";
  const columns1 = ["Location", "Total Communicated", "Total Region", "Percentage"];

  const title2 = "Total number and percentage of employees that the organization’s anti-corruption policies and procedures have been communicated to, broken down by employee category and region:";
  const columns2 = ["Location", "Employee Category", "Total Communicated", "Total Employees in Region", "Percentage"];

  const title3 = "Total number and percentage of business partners that the organization’s anti-corruption policies and procedures have been communicated to, broken down by type of business partner and region:";
  const columns3 = ["Location", "Type of Business Partner", "Total Communicated", "Total Partners in Region", "Percentage"];

  const title4 = "Total number and percentage of governance body members that have received training on anti-corruption, broken down by region:";
  const columns4 = ["Location", "Total Received Training", "Total Members", "Percentage"];

  const title5 = "Total number and percentage of employees that have received training on anti-corruption, broken down by region:";
  const columns5 = ["Location", "Employee Category", "Total Received Training", "Total Employees", "Percentage"];

  // Function to format data for employees communication
  const formatcollectivebargaining2 = (data) => {
    const formattedData = {};

    // Iterate over each location
    Object.keys(data).forEach((location) => {
      // For each location, iterate over the array of employee data
      data[location].forEach((employeeData) => {
        const percentage = parseFloat(employeeData.percentage);
        const formattedPercentage = percentage.endsWith(".00")
          ? percentage.slice(0, -3)
          : percentage;

        // If the location is not already in the formattedData, initialize it
        if (!formattedData[location]) {
          formattedData[location] = [];
        }

        // Push the formatted data into the location array
        formattedData[location].push({
          "Employee Category": employeeData.EmployeeCategory,
          "Total Communicated": employeeData.Totalnumberemployees,
          "Total Employees in Region": employeeData.Totalemployeeinthisregion,
          "Percentage": formattedPercentage,
        });
      });
    });

    return formattedData;
  };

  // Function to format data for business partners communication
  const formatcollectivebargaining3 = (data) => {
    const formattedData = {};

    // Iterate over each location
    Object.keys(data).forEach((location) => {
      // For each location, iterate over the array of business partner data
      data[location].forEach((partnerData) => {
        const percentage = parseFloat(partnerData.percentage);
        const formattedPercentage = percentage.endsWith(".00")
          ? percentage.slice(0, -3)
          : percentage;

        // If the location is not already in the formattedData, initialize it
        if (!formattedData[location]) {
          formattedData[location] = [];
        }

        // Push the formatted data into the location array
        formattedData[location].push({
          "Type of Business Partner": partnerData.Typeofbusinesspartner,
          "Total Communicated": partnerData.Totalnumberemployees,
          "Total Partners in Region": partnerData.Totalemployeeinthisregion,
          "Percentage": formattedPercentage,
        });
      });
    });

    return formattedData;
  };

  // Function to format data for employees training
  const formatcollectivebargaining5 = (data) => {
    const formattedData = {};

    // Iterate over each location
    Object.keys(data).forEach((location) => {
      // For each location, iterate over the array of employee data
      data[location].forEach((employeeData) => {
        const percentage = parseFloat(employeeData.percentage);
        const formattedPercentage = percentage.endsWith(".00")
          ? percentage.slice(0, -3)
          : percentage;

        // If the location is not already in the formattedData, initialize it
        if (!formattedData[location]) {
          formattedData[location] = [];
        }

        // Push the formatted data into the location array
        formattedData[location].push({
          "Employee Category": employeeData.EmployeeCategory,
          "Total Received Training": employeeData.Totalnumberemployees,
          "Total Employees": employeeData.Totalemployeeinthisregion,
          "Percentage": formattedPercentage,
        });
      });
    });

    return formattedData;
  };

  // Apply formatting to each dataset
  const formattedData2b = formatcollectivebargaining2(analyze_205_2b);
  const formattedData3c = formatcollectivebargaining3(analyze_205_2c);
  const formattedData5e = formatcollectivebargaining5(analyze_205_2e);

  return (
    <div id="section11_5_4" ref={section11_5_4Ref}>
      <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
        11.5.4. Training on Anti-Corruption
      </h3>

      {/* Table 1: Governance Body Members - Communication */}
      <div className='rounded-md shadow-md mb-4'>
        <DynamicTable title={title1} columns={columns1} data={analyze_205_2a} />
      </div>

      {/* Table 2: Employees - Communication */}
      <div className='rounded-md shadow-md mb-4'>
        <DynamicTable2 title={title2} columns={columns2} data={formattedData2b} />
      </div>

      {/* Table 3: Business Partners - Communication */}
      <div className='rounded-md shadow-md mb-4'>
        <DynamicTable2 title={title3} columns={columns3} data={formattedData3c} />
      </div>

      {/* Table 4: Governance Body Members - Training */}
      <div className='rounded-md shadow-md mb-4'>
        <DynamicTable title={title4} columns={columns4} data={analyze_205_2d} />
      </div>

      {/* Table 5: Employees - Training */}
      <div className='rounded-md shadow-md mb-4'>
        <DynamicTable2 title={title5} columns={columns5} data={formattedData5e} />
      </div>
    </div>
  );
};

export default Section19;
