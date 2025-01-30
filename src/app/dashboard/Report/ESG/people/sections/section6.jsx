'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../tables/leaveTable";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {setStandardWage} from "../../../../../../lib/redux/features/ESGSlice/screen13Slice"

const Section6=({section13_1_5Ref,data})=>{
    
    const content = useSelector(state => state.screen13Slice.standard_wage);
    const dispatch = useDispatch();
    const loadContent = () => {
      dispatch(setStandardWage(
        `We are committed to providing fair and competitive wages that meet or exceed industry standards. Our compensation packages are designed to reflect the skills, experience, and performance of our employees.`))
    }
  
    const handleEditorChange=(e)=>{
      dispatch(setStandardWage(e.target.value))
    }
    const [table1Columns] = useState([
        "Location",
        "Male",
        "Female",
        "Non-binary"
      ]);
    
     

      const table1Data=data["405_1a_analyse"]?data["405_1a_analyse"]["marketing_presence"]?data["405_1a_analyse"]["marketing_presence"].length>0?

      data["405_1a_analyse"]["marketing_presence"].map((val,index)=>{
          return (
              
            {
              "Location":val.Location,
              "Male":val.Male,
              "Female":val.Female,
              "Non-binary":val["Non-binary"]
          
          }
              
          )
      })
  :[
    {
       "Location":"No data available",
        "Male":"No data available",
        "Female":"No data available",
        "Non-binary":"No data available"
  },
  ]:[
    {
   "Location":"No data available",
        "Male":"No data available",
        "Female":"No data available",
        "Non-binary":"No data available"
  },
  ]:[
    {
   "Location":"No data available",
        "Male":"No data available",
        "Female":"No data available",
        "Non-binary":"No data available"
  },
  ]
    
      const [table2Columns] = useState([
        "Significant location of operations", 
        "Gender", 
        "Minimum Wage"
      ]);
    
      const table2Data = data["202_1c"] && data["202_1c"].length > 0 ? 

    data["202_1c"].map(item => {
        const locationData = item.Locationofoperation;
        const currencyValue = locationData.currencyValue || "No currency data available";

        return locationData.locations.map(location => {
            const locationName = location.value;
            const wages = locationData.wages[locationName] || {};

            return [
                {
                    "Significant location of operations": locationName,
                    "Gender": "Male",
                    "Minimum Wage": wages.Male ? wages.Male + ` ${currencyValue}` : "No data available"
                },
                {
                    "Significant location of operations": locationName,
                    "Gender": "Female",
                    "Minimum Wage": wages.Female ? wages.Female + ` ${currencyValue}` : "No data available"
                },
                {
                    "Significant location of operations": locationName,
                    "Gender": "Non-binary",
                    "Minimum Wage": wages["Non-binary"] ? wages["Non-binary"] + ` ${currencyValue}` : "No data available"
                }
            ];
        }).flat();
    }).flat()
    : [
        {
            "Significant location of operations": "No data available",
            "Gender": "No data available",
            "Minimum Wage": "No data available"
        }
    ];


    return (
        <>
        <div id="section13_1_5" ref={section13_1_5Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
13.1.5 Standard Wage
</h3>
<div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">Add statement about company’s Policy on employee compensation</p>
          <button
            className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
            onClick={loadContent}
          >
            {/* <MdOutlinePlaylistAdd className="mr-1 w-[20px] h-[20px]"/> */}
            <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
            Auto Fill
          </button>
        </div>
            <textarea
            onChange={handleEditorChange}
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
          rows={4}
        />

<p className="text-sm mb-2">{data["202_1b"]?data["202_1b"].length>0?data["202_1b"][0].Q3?data["202_1b"][0].Q3:"No data available":"No data available":"No data available"}</p>
<p className="text-sm mb-2">{data["202_1c"]?data["202_1c"].length>0?data["202_1c"][0].Currency?data["202_1c"][0].Currency:"No data available":"No data available":"No data available"}</p>
<p className="text-sm mb-4">{data["202_1d"]?data["202_1d"].length>0?data["202_1d"][0].Q1?data["202_1d"][0].Q1:"No data available":"No data available":"No data available"}</p>
        <p className="text-[15px]  mb-2 font-semibold">
        Ratio of the entry-level wage to the minimum wage by gender at significant locations of operation
            </p>
            <div className="shadow-md rounded-md mb-4">
                <LeaveTable columns={table1Columns} data={table1Data} />
            </div>
            {
              data["202_1c"]?data["202_1c"].length>0?data["202_1c"][0].Locationofoperation?data["202_1c"][0].Locationofoperation.radioValue?data["202_1c"][0].Locationofoperation.radioValue=="Variable"?(
                <div> 
                   <p className="text-[15px]  mb-2 font-semibold">
            Local minimum wage is absent or variable at significant locations of operation, by gender: 
            </p>
            <div className="shadow-md rounded-md mb-4">
                <LeaveTable columns={table2Columns} data={table2Data} />
            </div>
                </div>
              ):(
                <div></div>
              ):"":"":"":""
            }
           
            

</div>
        </>
    )
}

export default Section6