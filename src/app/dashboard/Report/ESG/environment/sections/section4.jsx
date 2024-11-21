'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../../people/tables/leaveTable";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {setScopeOneEmission, setBiogenicCO2Emission,
  setBiogenicCO2305} from "../../../../../../lib/redux/features/ESGSlice/screen12Slice"
import ScopeTable from '../tables/scopeTable'
import dynamic from 'next/dynamic';


const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const Section4=({section12_1_2Ref,data})=>{
   const biogenicStatement=useSelector(state=>state.screen12Slice.biogenic_c02_emissions)
    const content = useSelector(state => state.screen12Slice.scope_one_emissions);
    const dispatch = useDispatch();
    const loadContent = () => {
      dispatch(setScopeOneEmission(
        `Scope 1 emissions are direct greenhouse gas (GHG) emissions from our operations, such as fuel combustion on-site. We measure and report these emissions annually, striving to reduce them through process optimization and cleaner technologies.`))
    }
  
    const handleEditorChange=(e)=>{
      dispatch(setScopeOneEmission(e.target.value))
    }

    const col=[
        "Method",
        "Source",
        "Total Emission",
        "Unit"
    ]
    const col2=[
        "Category",
        "Sub Category",
        "Activity",
        "Value 1",
        "Value 2"
    ]
    const Tabledata=[
        {
            "Method":"No data available",
            "Source":"No data available",
            "Total Emission":"No data available",
            "Unit":"No data available"
        }
    ]
    const config = {
        style: {
          fontSize: "14px",
          color:"#667085"
        },
        allowResizeY: false,
        defaultActionOnPaste: 'insert_clear_html',
        toolbarSticky: false,
        toolbar: true,
        buttons: [
            'bold',
            'italic',
            'underline',
            'strikeThrough',
            'align',
            'outdent',
            'indent',
            'ul',
            'ol',
            'paragraph',
            'link',
            'table',
            'undo',
            'redo',
            'hr',
            'fontsize',
            'selectall'
        ],
        // Remove buttons from the extra buttons list
        removeButtons: ['fullsize', 'preview', 'source', 'print', 'about', 'find', 'changeMode','paintFormat','image','brush','font'],
      };
      
      
      const handleRichEditorChange=(value)=>{
        dispatch(setBiogenicCO2Emission(value))
      }
    return (
        <>
       
        <div id="section12_1_2" ref={section12_1_2Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
12.1.2 Scope 1 GHG Emissions
</h3>

<div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">Add statement about company’s scope 1 emissions</p>
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
            Scope 1
            </p>
            <div className="shadow-md rounded-md mb-4">
<ScopeTable columns={col2} data={data["305_123_collect"]?data["305_123_collect"]["gri-environment-emissions-301-a-scope-1"]?data["305_123_collect"]["gri-environment-emissions-301-a-scope-1"].length>0?data["305_123_collect"]["gri-environment-emissions-301-a-scope-1"]:[]:[]:[]}/>
</div>
            <p className="text-[15px]  mb-2 font-semibold">
            Biogenic CO2 emissions
        </p>
{/* <div className="shadow-md rounded-md mb-4">
<LeaveTable columns={col} data={Tabledata}/>
</div> */}

<div className="mb-4">
              <JoditEditor
              // ref={editor}
              value={biogenicStatement}
              config={config}
              tabIndex={1}
              onBlur={handleRichEditorChange}
              />
            </div>
</div>
        </>
    )
}

export default Section4