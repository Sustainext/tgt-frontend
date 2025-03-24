'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../../people/tables/leaveTable";
import dynamic from 'next/dynamic';
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {setSignificantSpills} from "../../../../../../lib/redux/features/ESGSlice/screen12Slice"

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const Section29=({section12_5_6Ref,orgName,data})=>{
    
    const content = useSelector(state => state.screen12Slice.significant_spills);
    const dispatch = useDispatch();
    const loadContent = () => {
      dispatch(setSignificantSpills(
        `${orgName ? orgName : "[Company Name]"} organization is committed to preventing and managing significant spills that can negatively impact the environment, biodiversity, and local communities.As part of our sustainability strategy, we have implemented a`))
    }
  
    const handleEditorChange=(e)=>{
      dispatch(setSignificantSpills(e.target.value))
    }
    const config = {
      enter: "BR", // Or customize behavior on Enter key
  cleanHTML: true,
      enablePasteHTMLFilter: false, 
    askBeforePasteHTML: false, 
    askBeforePasteFromWord: false,
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
    const col1=[
        "Material of the spill",
        "Volume of the spill",
        "Unit",
        "Impacts of Significant Spill"
        
    ]

   
    const col2=[
        "Location of spill",
        "Volume of the spill",
        "Unit",
        
    ]

    const col3=[
      "Total number of Significant spill",
      "Total volume of Significant spill",
      "Unit",
      
  ]

    const TableData1=data&&data['waste_analyse']?data['waste_analyse']['total_number_and_volume_by_material']?data['waste_analyse']['total_number_and_volume_by_material'].length>0?
    data['waste_analyse']['total_number_and_volume_by_material'].map((val)=>{
      return (
        {
          "Material of the spill":val.material,
          "Volume of the spill":val.volume_of_spills,
          "Unit":val.unit,
           "Impacts of Significant Spill":val.impact && val.impact.length > 0 ? (() => {
            const filteredImpact = val.impact.filter(item => item !== 'N/A');
        
            if (filteredImpact.length === 0) {
              return <span>This spill has no significant impact.</span>;
            } else {
              return <span>{filteredImpact.join(', ')}</span>;
            }
          })() : ''
      }
      )
    }):[
      {
        "Material of the spill":"No data available",
        "Volume of the spill":"No data available",
        "Unit":"No data available",
         "Impacts of Significant Spill":"No data available"
    }
    ]:[
      {
        "Material of the spill":"No data available",
        "Volume of the spill":"No data available",
        "Unit":"No data available",
         "Impacts of Significant Spill":"No data available"
    }
    ]:[
      {
        "Material of the spill":"No data available",
        "Volume of the spill":"No data available",
        "Unit":"No data available",
         "Impacts of Significant Spill":"No data available"
    }
    ]
    const TableData2=data&&data['waste_analyse']?data['waste_analyse']['total_number_and_volume_by_location']?data['waste_analyse']['total_number_and_volume_by_location'].length>0?
    data['waste_analyse']['total_number_and_volume_by_location'].map((val)=>{
      return (
        {
          "Location of spill":val.location,
          "Volume of the spill":val.volume_of_spills,
          "Unit":val.unit,
      }
      )
    }):[
       {
            "Location of spill":"No data available",
            "Volume of the spill":"No data available",
            "Unit":"No data available",
        }
    ]:[
       {
            "Location of spill":"No data available",
            "Volume of the spill":"No data available",
            "Unit":"No data available",
        }
    ]:[
       {
            "Location of spill":"No data available",
            "Volume of the spill":"No data available",
            "Unit":"No data available",
        }
    ]


    const TableData3=data&&data['waste_analyse']?data['waste_analyse']['total_number_and_volume_significant_spills']?data['waste_analyse']['total_number_and_volume_significant_spills'].length>0?
    data['waste_analyse']['total_number_and_volume_significant_spills'].map((val)=>{
      return (
        {
          "Total number of Significant spill":val.number_of_significant_spills,
          "Total volume of Significant spill":val.volume_of_spills,
          "Unit":val.unit,
      }
      )
    }):[
      {
            "Total number of Significant spill":"No data available",
            "Total volume of Significant spill":"No data available",
            "Unit":"No data available",
        }
    ]:[
      {
            "Total number of Significant spill":"No data available",
            "Total volume of Significant spill":"No data available",
            "Unit":"No data available",
        }
    ]:[
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
         {/* <div className="mb-4">
              <JoditEditor
              // ref={editor}
              value={content}
              config={config}
              tabIndex={1}
              onBlur={handleEditorChange}
              />
            </div> */}
<p className="text-[15px]  mb-2 font-semibold">
Total number & volume of spills by material 
        </p>
<div className="shadow-md rounded-md mb-4">
<LeaveTable columns={col1} data={TableData1}/>
</div>

<p className="text-[15px]  mb-2 font-semibold">
Total number & volume of spills by location 
        </p>
<div className="shadow-md rounded-md mb-4">
<LeaveTable columns={col2} data={TableData2}/>
</div>

<p className="text-[15px]  mb-2 font-semibold">
Total number & volume of significant spills 
        </p>
<div className="shadow-md rounded-md mb-4">
<LeaveTable columns={col3} data={TableData3}/>
</div>
</div>
        </>
    )
}

export default Section29