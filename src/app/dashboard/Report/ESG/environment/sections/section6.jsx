'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../../people/tables/leaveTable";
import AnalyseTable from "../tables/analyseTable"
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {setScopeThreeEmission} from "../../../../../../lib/redux/features/ESGSlice/screen12Slice"
import ScopeTable from "../tables/scopeTable"

const Section6=({section12_1_4Ref,data})=>{
    
    const content = useSelector(state => state.screen12Slice.scope_three_emissions);
    const dispatch = useDispatch();
    const loadContent = () => {
      dispatch(setScopeThreeEmission(
        `Scope 3 emissions include all other indirect emissions in our value chain, such as those from suppliers and product use. We collaborate with suppliers to reduce these emissions and support initiatives that encourage sustainable practices throughout our supply chain.`))
    }
  
    const handleEditorChange=(e)=>{
      dispatch(setScopeThreeEmission(e.target.value))
    }
    const scope3col=[
        "Category",
        "Sub Category",
        "Activity",
        "Value"
    ]

    const col1=[
        "Source",
        "Percentage contribution",
        "Total Emission",
        "Unit"
    ]
    const data1=[
        {
           
        "Source":"data",
        "Percentage contribution":"data",
        "Total Emission":"data",
        "Unit":"data"
        }
    ]
    const col2=[
      
        "Location",
        "Percentage contribution",
        "Total Emission",
        "Unit"
    ]
    const data2=[
        {
           
        "Location":"data",
        "Percentage contribution":"data",
        "Total Emission":"data",
        "Unit":"data"
        }
    ]

    const col3=[
        "Method",
        "Source",
        "Total Emission",
        "Unit"
    ]
    const data3=[
        {
        "Method":"No data available",
        "Source":"No data available",
        "Total Emission":"No data available",
        "Unit":"No data available"
        }
    ]
    
    return (
        <>
       
        <div id="section12_1_4" ref={section12_1_4Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
12.1.4 Scope 3 GHG Emissions
</h3>

<div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">Add statement about company’s scope 3 emissions</p>
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
            Scope 3
            </p>
            <div className="shadow-md rounded-md mb-4">
<ScopeTable columns={scope3col} data={data["305_123_collect"]?data["305_123_collect"]["gri-environment-emissions-301-a-scope-3"]?data["305_123_collect"]["gri-environment-emissions-301-a-scope-3"]:"":""}/>
</div>
            <p className="text-[15px]  mb-2 font-semibold">
            Top Emissions by Source
        </p>
<div className="shadow-md rounded-md mb-4">
<AnalyseTable columns={col1} data={data["305_123_analyse"]?data["305_123_analyse"]["all_emission_by_source"]?data["305_123_analyse"]["all_emission_by_source"]:[]:[]}/>
</div>
<p className="text-[15px]  mb-2 font-semibold">
Top Emissions by Location
        </p>
<div className="shadow-md rounded-md mb-4">
<AnalyseTable columns={col2} data={data["305_123_analyse"]?data["305_123_analyse"]["all_emission_by_location"]?data["305_123_analyse"]["all_emission_by_location"]:[]:[]}/>
</div>
<p className="text-[15px]  mb-2 font-semibold">
Emissions by Scope
        </p>
<div className="shadow-md rounded-md mb-4">
<AnalyseTable columns={col1} data={data["305_123_analyse"]?data["305_123_analyse"]["all_emission_by_scope"]?data["305_123_analyse"]["all_emission_by_scope"]:[]:[]}/>
</div>
<p className="text-[15px]  mb-2 font-semibold">
305-3-c. Biogenic CO2 emissions
        </p>
<div className="shadow-md rounded-md mb-4">
<LeaveTable columns={col3} data={data3}/>
</div>
</div>
        </>
    )
}

export default Section6