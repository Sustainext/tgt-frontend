'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../../people/tables/leaveTable";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {setRecyclingProcess} from "../../../../../../lib/redux/features/ESGSlice/screen12Slice"

const Section12=({section12_2_2Ref,data})=>{
    
    const content = useSelector(state => state.screen12Slice.recycling_process);
    const dispatch = useDispatch();
    const loadContent = () => {
      dispatch(setRecyclingProcess(
        `We prioritize the use of recycled materials in our products and processes. This not only reduces the demand for virgin materials but also helps to close the loop in our production cycle.`))
    }
  
    const handleEditorChange=(e)=>{
      dispatch(setRecyclingProcess(e.target.value))
    }

    const col=[
        "Types of recycled material used",
        "Percentage of recycled input materials used",
    ]
    const Tabledata=data["material_analyse"]?data["material_analyse"]["recycled_materials"].length>0?

    data["material_analyse"]["recycled_materials"].map((val,index)=>{
        return (
            
                {
                    "Types of recycled material used":val.type_of_recycled_material_used,
                    "Percentage of recycled input materials used":val.percentage_of_recycled_input_materials_used,
                }
            
        )
    })
:[
    {
        "Types of recycled material used":"No data available",
        "Percentage of recycled input materials used":"No data available",
    }
]:[
    {
        "Types of recycled material used":"No data available",
        "Percentage of recycled input materials used":"No data available",
    }
]

    
    return (
        <>
       
        <div id="section12_2_2" ref={section12_2_2Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
12.2.2 Recycled Input Materials Used
</h3>

<div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">Add statement about company’s process for recycling</p>
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
Percentage of recycled materials used (Production)
        </p>
<div className="shadow-md rounded-md mb-4">
<LeaveTable columns={col} data={Tabledata}/>
</div>
</div>
        </>
    )
}

export default Section12