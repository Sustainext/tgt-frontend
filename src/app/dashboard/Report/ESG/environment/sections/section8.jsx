'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../../people/tables/leaveTable";
import dynamic from 'next/dynamic';
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {setGHGEmissionReductionEfforts} from "../../../../../../lib/redux/features/ESGSlice/screen12Slice"

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });



const Section8=({section12_1_8Ref})=>{
    
    const content = useSelector(state => state.screen12Slice.ghg_emission_reduction_efforts);
    const dispatch = useDispatch();
    const loadContent = () => {
      dispatch(setGHGEmissionReductionEfforts(
      `Our efforts to reduce GHG emissions include investing in energy-efficient equipment, optimizing production processes, and sourcing renewable energy. We set ambitious reduction targets and report our progress annually. (Initiatives taken by an organisation to reduce emissions can be represented with graphics)`  
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
      
      
      const handleEditorChange=(e)=>{
            dispatch(setGHGEmissionReductionEfforts(e.target.value))
          }
    
    return (
        <>
       
        <div id="section12_1_8" ref={section12_1_8Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
12.1.8 Reduction in GHG Emissions 
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
            {/* <div className="mb-4">
              <JoditEditor
              // ref={editor}
              value={content}
              config={config}
              tabIndex={1}
              onBlur={handleEditorChange}
              />
            </div> */}
           <textarea
            onChange={handleEditorChange}
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
          rows={4}
        />
<div className="shadow-md rounded-md mb-4">
<LeaveTable columns={col1} data={data1}/>
</div>

<p className="text-[15px]  mb-2 font-semibold">
Standards 
        </p>
        <p className="text-sm mb-4">
        This report outlines the Greenhouse Gas (GHG) emissions accounting for the organization [Organization Name], following industry-leading standards. The methodologies and calculations adhere to the guidelines provided by the Greenhouse Gas Protocol, including both "A Corporate Accounting and Reporting Standard (Revised Edition)" and the "Corporate Value Chain (Scope 3) Standard," developed by the World Business Council for Sustainable Development (WBCSD) and the World Resources Institute (WRI). These standards ensure a comprehensive and accurate assessment of the organization's GHG emissions across all relevant scopes and categories. 
        </p>

        <p className="text-[15px]  mb-2 font-semibold">
        Methodology  
        </p>
        <p className="text-sm mb-4">
        Data Collection and Monitoring Methodology<br/>Emission activity data is systematically collected from multiple data owners through the Sustainext platform. This platform centralizes the data, which is then meticulously reviewed to ensure completeness, accuracy, and the elimination of any duplication or human errors.<br/><br/>Quantification Methodology<br/>The quantification of GHG emissions begins with the identification of all relevant GHG emission sources within the organization. These sources are classified according to the GHG Protocol – Corporate Standard. Accurate activity data is then gathered, followed by the selection of emission factors from nationally or internationally recognized sources such as DEFRA, IPCC, GHG Protocol and National GHG Inventories. These emission factors are integral to the precise calculation of GHG emissions.<br/><br/>Calculation Methodology<br/>Understanding the methodology for calculating greenhouse gas (GHG) emissions is essential for effectively tracking and mitigating our environmental impact. The calculation process involves the following key components:<br/><br/>Activity Data: This refers to the measurable data associated with activities that lead to GHG emissions, such as the amount of fuel consumed, the kilowatt-hours (kWh) of electricity used, or the miles traveled by air.<br/><br/>Emissions Factor: A coefficient used to convert activity data into the corresponding amount of GHG emissions. Emission factors are specific to each type of activity or emission source and are typically measured per unit of activity.<br/><br/>Calculation Formula:<br/><br/>Emissions = Activity Data × Emission Factor<br/>Where:<br/><br/>Activity Data is measured in units relevant to the activity (e.g., liters of fuel).<br/>Emission Factor is expressed in terms such as kilograms of CO₂ equivalent per unit of activity (e.g., kg CO₂e/Liter).<br/><br/>Example Calculation:<br/><br/>Fuel Consumed: 100 Liters<br/>Emission Factor: 0.001557 kg CO₂e/Liter<br/>Emissions from Fuel Combustion: <br/>100×0.001557=0.1557 tCO₂e
        </p>

        <p className="text-[15px]  mb-2 font-semibold">
        Calculation Tool 
        </p>
        <p className="text-sm mb-4">
        The calculation of GHG emissions in this report was performed using Sustainext’s SaaS-based platform. This tool is specifically designed to minimize errors and ensure the accuracy and reliability of sustainability metrics. The platform streamlines the GHG accounting process by allowing for the effortless creation of GHG inventories, accurate emission calculations, and ongoing performance tracking, all within a single, integrated system. Sustainext’s platform adheres to industry standards, including the GHG Protocol and ISO 14064, ensuring that the calculations are consistent with best practices and globally recognized methodologies.  
        </p>

        <p className="text-[15px]  mb-2 font-semibold">
        Assumptions Considered
        </p>
        <p className="text-sm mb-4">
        The assumptions underpinning the GHG emissions calculations are based on established international protocols and standards, including the GHG Protocol. Notable considerations include:  
        </p>

</div>
        </>
    )
}

export default Section8