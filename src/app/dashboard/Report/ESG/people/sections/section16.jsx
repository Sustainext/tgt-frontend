"use client";
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../tables/leaveTable";
import { useDispatch, useSelector } from "react-redux";
import {
  setSecurityPersonnelInternalTraining,
  setSecurityPersonnelExternalTraining,
} from "../../../../../../lib/redux/features/ESGSlice/screen13Slice";

const Section16 = ({ section13_5Ref, section13_5_1Ref, data,reportType,
  sectionNumber = reportType=='GRI Report: In accordance With' || reportType==='Custom ESG Report'?'13.5.1':'',
  sectionTitle = "Management of material topic", 
  sectionOrder = 13
 }) => {
  const dispatch = useDispatch();
  const trainingIntheOrg = useSelector(
    (state) => state.screen13Slice.security_personnel_internal_training
  );
  const trainingOutsidetheOrg = useSelector(
    (state) => state.screen13Slice.security_personnel_external_training
  );
  const handleChangetrainingIntheOrg = (e) => {
    dispatch(setSecurityPersonnelInternalTraining(e.target.value));
  };
  const handleChangetrainingOutsidetheOrg = (e) => {
    dispatch(setSecurityPersonnelExternalTraining(e.target.value));
  };
  // const col = [
  //   "Categories",
  //   "Average training hours per employee category",
  //   "Average training hours of male employee in category",
  //   "Average training hours of female employee in category",
  //   "Average training hours of non-binary employee in category",
  // ];

  // const Tabledata = data["404_social_analyse"]
  //   ? data["404_social_analyse"][
  //       "average_hours_of_training_provided_to_employees_per_category"
  //     ].length > 0
  //     ? data["404_social_analyse"][
  //         "average_hours_of_training_provided_to_employees_per_category"
  //       ].map((val, index) => {
  //         return {
  //           Categories: val.category,
  //           "Average training hours per employee category":
  //             val.avg_training_hrs_per_employee,
  //           "Average training hours of male employee in category":
  //             val.avg_training_hrs_male_employee,
  //           "Average training hours of female employee in category":
  //             val.avg_training_hrs_female_employee,
  //           "Average training hours of non-binary employee in category":
  //             val.avg_training_hrs_other_employee,
  //         };
  //       })
  //     : [
  //         {
  //           Categories: "No data available",
  //           "Average training hours per employee category": "No data available",
  //           "Average training hours of male employee in category":
  //             "No data available",
  //           "Average training hours of female employee in category":
  //             "No data available",
  //           "Average training hours of non-binary employee in category":
  //             "No data available",
  //         },
  //       ]
  //   : [
  //       {
  //         Categories: "No data available",
  //         "Average training hours per employee category": "No data available",
  //         "Average training hours of male employee in category":
  //           "No data available",
  //         "Average training hours of female employee in category":
  //           "No data available",
  //         "Average training hours of non-binary employee in category":
  //           "No data available",
  //       },
  //     ];

  // const col2 = [
  //   "Security Personnel (in organisation)",
  //   "Security Personnel (from third-party organisation)",
  // ];

  // const Tabledata2 = data["analysis_security_personnel"]
  //   ? data["analysis_security_personnel"]["security_personnel"]
  //     ? data["analysis_security_personnel"]["security_personnel"].length > 0
  //       ? data["analysis_security_personnel"]["security_personnel"]?.map(
  //           (val, index) => {
  //             return {
  //               "Security Personnel (in organisation)": val.sp_in_org + "%",
  //               "Security Personnel (from third-party organisation)":
  //                 val.sp_3rd_org + "%",
  //             };
  //           }
  //         )
  //       : [
  //           {
  //             "Security Personnel (in organisation)": "No data available",
  //             "Security Personnel (from third-party organisation)":
  //               "No data available",
  //           },
  //         ]
  //     : [
  //         {
  //           "Security Personnel (in organisation)": "No data available",
  //           "Security Personnel (from third-party organisation)":
  //             "No data available",
  //         },
  //       ]
  //   : [
  //       {
  //         "Security Personnel (in organisation)": "No data available",
  //         "Security Personnel (from third-party organisation)":
  //           "No data available",
  //       },
  //     ];
  const shouldRender = useSelector((state)=> state.reportCreation.includeMaterialTopics)
  return (
    <>
     

     {reportType=='GRI Report: In accordance With' || (shouldRender && reportType==='Custom ESG Report')?(
         <div id="section13_5_1" ref={section13_5_1Ref}>
         <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
          {sectionNumber} {sectionTitle}
         </h3>
 
         {data["3-3cde_13-5-1"] && data["3-3cde_13-5-1"].length > 0 ? (
           data["3-3cde_13-5-1"].map((val, index) => (
             <div key={index}>
               <p className="text-sm mb-2">
                 {val.GRI33cd ? val.GRI33cd : "No data available"}
               </p>
               <p className="text-sm mb-4">
                 {val.GRI33e ? val.GRI33e : "No data available"}
               </p>
             </div>
           ))
         ) : (
           <p className="text-sm mb-4">No data available</p>
         )}
       </div>
      ):(
        <div></div>
      )}

    
    </>
  );
};

export default Section16;
