'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../../people/tables/leaveTable";
import dynamic from 'next/dynamic';
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {setGHGEmissionReductionEfforts} from "../../../../../../lib/redux/features/ESGSlice/screen12Slice"

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });



const Section8=({section12_1_6Ref})=>{
    
    const content = useSelector(state => state.screen12Slice.ghg_emission_reduction_efforts);
    const dispatch = useDispatch();
    const loadContent = () => {
      dispatch(setGHGEmissionReductionEfforts(
      `<p>
        Our efforts to reduce GHG emissions include investing in energy-efficient equipment, optimizing production processes, and sourcing renewable energy. We set ambitious reduction targets and report our progress annually. (Initiatives taken by an organisation to reduce emissions can be represented with graphics) 
        </p>`  
      ))
    }

    const col1=[
        "Initiatve taken to reduce GHG emissions ",
       "Method to account for reductions ",
        "Base Year or Baseline ",
        "Year",
        "Rationale for choosing base year or baseline",
        "GHG Emission reduced (tCO2e)",
        "Scopes in which reduction took place",
        "Gases included in the calculations",
        "Standard, Methodology, Assumptions and/or Calculation tools used"
    ]
    const data1=[
        {
            "Initiatve taken to reduce GHG emissions ":"No data available",
        "Method to account for reductions ":"No data available",
        "Base Year or Baseline ":"No data available",
        "Year":"No data available",
        "Rationale for choosing base year or baseline":"No data available",
        "GHG Emission reduced (tCO2e)":"No data available",
        "Scopes in which reduction took place":"No data available",
        "Gases included in the calculations":"No data available",
        "Standard, Methodology, Assumptions and/or Calculation tools used":"No data available"
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
      
      
      const handleEditorChange=(value)=>{
        dispatch(setGHGEmissionReductionEfforts(value))
      }
    
    return (
        <>
       
        <div id="section12_1_6" ref={section12_1_6Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
12.1.6 Reduction in GHG Emissions 
</h3>

<div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">Add statement about efforts  to reduce GHG emission</p>
          <button
            className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
            onClick={loadContent}
          >
            {/* <MdOutlinePlaylistAdd className="mr-1 w-[20px] h-[20px]"/> */}
            <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
            Auto Fill
          </button>
        </div>
            <div className="mb-4">
              <JoditEditor
              // ref={editor}
              value={content}
              config={config}
              tabIndex={1}
              onBlur={handleEditorChange}
              />
            </div>
           
{/* <div className="shadow-md rounded-md mb-4">
<LeaveTable columns={col1} data={data1}/>
</div> */}

</div>
        </>
    )
}

export default Section8