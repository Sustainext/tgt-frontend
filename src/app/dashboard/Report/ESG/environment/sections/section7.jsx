'use client'
import { useState, useRef, useEffect } from "react";
import EmissionTable from '../tables/emissionTable'
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {setGHGEmissionIntensityTracking} from "../../../../../../lib/redux/features/ESGSlice/screen12Slice"
import dynamic from 'next/dynamic';


const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const Section7=({section12_1_5Ref,section12_1_6Ref,section12_1_7Ref})=>{
  
    
    const content = useSelector(state => state.screen12Slice.ghg_emission_intensity_tracking);
    const [content2,setContent2] = useState("")
    const dispatch = useDispatch();
    const loadContent = () => {
      dispatch(setGHGEmissionIntensityTracking(
        `We track GHG emission intensity to understand our emissions in relation to our business growth and efficiency improvements`))
    }
    const loadContent2 = () => {
      setContent2(
        'This approach aligns with international best practices and reflects the organization’s direct and indirect emission sources effectively.'
      )
    }
  
    const handleEditorChange=(e)=>{
      dispatch(setGHGEmissionIntensityTracking(e.target.value))
    }
    const handleEditorChange2=(e)=>{
      setContent2(e.target.value)
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
    const columns = [
        { header: "Organisation Metric" },
        { header: "Quantity" },
        { header: "Unit" },
        { header: "Type of GHGs", subHeaders: ["Direct (Scope 1)", "Energy indirect (Scope 2)", "Other indirect (Scope 3)"] },
        { header: "GHG Emission Intensity" },
        { header: "Units" },
        { header: "Gases included in the calculation", subHeaders: ["CO2", "N2O", "CH4", "HFCs", "PFCs", "SF6","NF3"] },
      ];
      
      const data = [
        {
          "Organisation Metric": "No data available",
          "Quantity": "No data available",
          "Unit": "No data available",
          "Direct (Scope 1)": "No data available",
          "Energy indirect (Scope 2)": "No data available",
          "Other indirect (Scope 3)": "No data available",
          "GHG Emission Intensity": "No data available",
          "Units": "No data available",
          "CO2": "No data available",
          "N2O": "No data available",
          "CH4": "No data available",
          "HFCs": "No data available",
          "PFCs": "No data available",
          "SF6": "No data available",
          "NF3":"No data available"
        }
      ];
    
    
    return (
        <>
       
        <div>

<div id="section12_1_5" ref={section12_1_5Ref}>
<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
12.1.5 Base Year
</h3>
<p className="text-sm mb-4">
The organization has selected [Base Year: YYYY-YYYY] for calculating greenhouse gas (GHG) emissions. This base year was chosen to establish a consistent and reliable benchmark for tracking emissions performance over time. 
The total emissions for the base year amount to [X tCO2e], calculated using robust methodologies aligned with international standards. 
The base year emissions have been recalculated in [Recalculation Year] due to significant changes such as:
</p>
</div>

<div id="section12_1_6" ref={section12_1_6Ref}>
<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
12.1.6 Consolidation Approach
</h3>
<p className="text-sm mb-4">
To ensure consistency and transparency in GHG reporting, the organization adheres to the [Selected Approach: Equity Share/Financial Control/Operational Control] method for consolidation. This approach aligns with international best practices and reflects the organization’s direct and indirect emission sources effectively. 
</p>
<div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">Add statement about tracking of Consolidation Approach</p>
          <button
            className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
            onClick={loadContent2}
          >
            {/* <MdOutlinePlaylistAdd className="mr-1 w-[20px] h-[20px]"/> */}
            <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
            Auto Fill
          </button>
        </div>
        <textarea
            onChange={handleEditorChange2}
          value={content2}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
          rows={4}
        />
</div>
       

 <div id="section12_1_7" ref={section12_1_7Ref}>
 <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
12.1.7 GHG Emission Intensity
</h3>

<div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">Add statement about tracking of GHG emission intensity</p>
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
        <p className="text-[14px] text-[#344054] mb-2 font-semibold">
        GHG Emission Intensity
            </p>
<div className="shadow-md rounded-md mb-4">
<EmissionTable columns={columns} data={data}/>
</div>
  </div>      



</div>
        </>
    )
}

export default Section7
