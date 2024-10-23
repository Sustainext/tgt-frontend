'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../../people/tables/leaveTable";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {setSignificantSpills} from "../../../../../../lib/redux/features/ESGSlice/screen12Slice"

const Section29=({section12_5_6Ref,orgName})=>{
    
    const content = useSelector(state => state.screen12Slice.significant_spills);
    const dispatch = useDispatch();
    const loadContent = () => {
      dispatch(setSignificantSpills(
        `${orgName ? orgName : "[Company Name]"} organization is committed to preventing and managing significant spills that can negatively impact the environment, biodiversity, and local communities.As part of our sustainability strategy, we have implemented a`))
    }
  
    const handleEditorChange=(e)=>{
      dispatch(setSignificantSpills(e.target.value))
    }

    const col1=[
        "Material of the spill",
        "Volume of the spill",
        "Unit",
        
    ]
    const data1=[
        {
            "Material of the spill":"No data available",
            "Volume of the spill":"No data available",
            "Unit":"No data available",
        }
    ]

    const col2=[
        "Location of spill",
        "Volume of the spill",
        "Unit",
        
    ]
    const data2=[
        {
            "Location of spill":"No data available",
            "Volume of the spill":"No data available",
            "Unit":"No data available",
        }
    ]

    const col3=[
        "Total number of Significant spill",
        "Total volume of Significant spill",
        "Unit",
        
    ]
    const data3=[
        {
            "Total number of Significant spill":"No data available",
            "Total volume of Significant spill":"No data available",
            "Unit":"No data available",
        }
    ]
    
    return (
        <>
       
        <div id="section12_5_6" ref={section12_5_6Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
12.5.6 Significant Spills
</h3>

<div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">Add statement about company’s programs for preventing and managing significant spills</p>
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
        
<p className="text-[15px]  mb-2 font-semibold">
Total number & volume of spills by material 
        </p>
<div className="shadow-md rounded-md mb-4">
<LeaveTable columns={col1} data={data1}/>
</div>

<p className="text-[15px]  mb-2 font-semibold">
Total number & volume of spills by location 
        </p>
<div className="shadow-md rounded-md mb-4">
<LeaveTable columns={col2} data={data2}/>
</div>

<p className="text-[15px]  mb-2 font-semibold">
Total number & volume of significant spills 
        </p>
<div className="shadow-md rounded-md mb-4">
<LeaveTable columns={col3} data={data3}/>
</div>
</div>
        </>
    )
}

export default Section29