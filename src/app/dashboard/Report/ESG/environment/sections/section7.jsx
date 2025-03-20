'use client'
import { useState, useRef, useEffect } from "react";
import EmissionTable from '../tables/emissionTable'
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {setGHGEmissionIntensityTracking} from "../../../../../../lib/redux/features/ESGSlice/screen12Slice"
import dynamic from 'next/dynamic';
import { TiTick } from "react-icons/ti";


const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const Section7=({section12_1_5Ref,section12_1_6Ref,section12_1_7Ref,data})=>{
  
    const consolidation=data&&data['emission_collect']?data['emission_collect']['consolidation_approach_for_emission'].length>0?data['emission_collect']['consolidation_approach_for_emission'][0].Q1?data['emission_collect']['consolidation_approach_for_emission'][0].Q1:"":"":""
    const content = useSelector(state => state.screen12Slice.ghg_emission_intensity_tracking);
    const [content2,setContent2] = useState("")
    const [content3,setContent3] =useState("")
    const dispatch = useDispatch();
    const loadContent = () => {
      dispatch(setGHGEmissionIntensityTracking(
        `We track GHG emission intensity to understand our emissions in relation to our business growth and efficiency improvements`))
    }
    const loadContent2 = () => {
      setContent2(
        `To ensure consistency and transparency in GHG reporting, the organization adheres to the ${consolidation} method for consolidation. This approach aligns with international best practices and reflects the organization’s direct and indirect emission sources effectively.`
      )
    }

    const loadContent3= () => {
      setContent3(
        `The total emissions for the base year amount to ${emisisonBaseYear} tCO2e, calculated using robust methodologies aligned with international standards. `
      )
    }
  
    const handleEditorChange=(e)=>{
      dispatch(setGHGEmissionIntensityTracking(e.target.value))
    }
    const handleEditorChange2=(e)=>{
      setContent2(e.target.value)
    }

    const handleEditorChange3=(e)=>{
      setContent3(e.target.value)
    }

    const columns = [
      { header: "S.No" },
        { header: "Organisation Metric" },
        { header: "Quantity" },
        { header: "Unit" },
        { header: "Type of GHGs"},
        { header: "GHG Emission Intensity" },
        { header: "Unit" },
        { header: "Gases included in the calculation", subHeaders: ["CO2", "N2O", "CH4", "HFCs", "PFCs", "SF6","NF3"] },
      ];
      
      const formattedIntensity=data&&data['305_123_analyse']?data['305_123_analyse']['ghg_emission_intensity']?data['305_123_analyse']['ghg_emission_intensity'].length>0?data['305_123_analyse']['ghg_emission_intensity'].map((s,index)=>
       {
        return(
          {
            "S.No": String(index + 1),
            "Organisation Metric": s.organization_metric,
            "Quantity":s.quantity,
            "Unit":s.unit,
            "Type of GHGs":s.type_of_ghg?.length>0?s.type_of_ghg.join(", "):'',
            "GHG Emission Intensity":s.ghg_emission_intensity,
            "Unit":s.ghg_intensity_unit,
           "CO2":s.ch4?<TiTick className="text-green-400 w-5 h-5" />:"",
           "N2O":s.n2o?<TiTick className="text-green-400 w-5 h-5" />:"",
           "CH4":s.co2?<TiTick className="text-green-400 w-5 h-5" />:"",
           "HFCs":s.HFCs?<TiTick className="text-green-400 w-5 h-5" />:"",
           "PFCs":s.PFCs?<TiTick className="text-green-400 w-5 h-5" />:"",
           "SF6":s.SF6?<TiTick className="text-green-400 w-5 h-5" />:"",
           "NF3":s.NF3?<TiTick className="text-green-400 w-5 h-5" />:""
          }
        )
       }
      ):[
        {
          "S.No": "No data available",
          "Organisation Metric": "No data available",
          "Quantity":"No data available",
          "Unit":"No data available",
          "Type of GHGs":"No data available",
          "GHG Emission Intensity":"No data available",
          "Unit":"No data available",
         "CO2":"No data available",
         "N2O":"No data available",
         "CH4":"No data available",
         "HFCs":"No data available",
         "PFCs":"No data available",
         "SF6":"No data available",
         "NF3":"No data available",
        }
      ]:[
        {
          "S.No": "No data available",
          "Organisation Metric": "No data available",
          "Quantity":"No data available",
          "Unit":"No data available",
          "Type of GHGs":"No data available",
          "GHG Emission Intensity":"No data available",
          "Unit":"No data available",
         "CO2":"No data available",
         "N2O":"No data available",
         "CH4":"No data available",
         "HFCs":"No data available",
         "PFCs":"No data available",
         "SF6":"No data available",
         "NF3":"No data available",
        }
      ]:[
        {
          "S.No": "No data available",
          "Organisation Metric": "No data available",
          "Quantity":"No data available",
          "Unit":"No data available",
          "Type of GHGs":"No data available",
          "GHG Emission Intensity":"No data available",
          "Unit":"No data available",
         "CO2":"No data available",
         "N2O":"No data available",
         "CH4":"No data available",
         "HFCs":"No data available",
         "PFCs":"No data available",
         "SF6":"No data available",
         "NF3":"No data available",
        }
      ]

      console.log(formattedIntensity,"kkkk")
     
      const baseYear=data&&data['emission_collect']?data['emission_collect']['base_year'].length>0?data['emission_collect']['base_year'][0].Q1?data['emission_collect']['base_year'][0].Q1.startDate+" to "+data['emission_collect']['base_year'][0].Q1.endDate:"":"":""
      const rationale=data&&data['emission_collect']?data['emission_collect']['base_year'].length>0?data['emission_collect']['base_year'][0].Q2?data['emission_collect']['base_year'][0].Q2:"":"":""
      const emisisonBaseYear=data&&data['emission_collect']?data['emission_collect']['base_year'].length>0?data['emission_collect']['base_year'][0].Q3?data['emission_collect']['base_year'][0].Q3:"":"":""
      const recalculatedYear= data&&data['emission_collect']?data['emission_collect']['base_year'].length>0?data['emission_collect']['base_year'][0].Q5?data['emission_collect']['base_year'][0].Q5:"":"":""
      const specificChanges=data&&data['emission_collect']?data['emission_collect']['base_year'].length>0?data['emission_collect']['base_year'][0].Q6?data['emission_collect']['base_year'][0].Q6:"":"":""
      const context=data&&data['emission_collect']?data['emission_collect']['base_year'].length>0?data['emission_collect']['base_year'][0].Q7?data['emission_collect']['base_year'][0].Q7:"":"":""
      return (
        <>
       
        <div>

<div id="section12_1_5" ref={section12_1_5Ref}>
<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
12.1.5 Base Year
</h3>
<p className="text-sm mb-4">
 {baseYear &&  rationale?(
  <>
  The organization has selected {baseYear} for calculating greenhouse gas (GHG) emissions. {rationale}<br/>
  </>
 ):(
  "No data available"
 )} 

</p>

<div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">Add statement</p>
          {emisisonBaseYear && (
            <button
            className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
            onClick={loadContent3}
          >
            {/* <MdOutlinePlaylistAdd className="mr-1 w-[20px] h-[20px]"/> */}
            <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
            Auto Fill
          </button>
          )}
          
        </div>
        <textarea
            onChange={handleEditorChange3}
          value={content3}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
          rows={4}
        />


<p className="text-sm mb-4">
 {recalculatedYear&& specificChanges?(
  <>
 The base year emissions have been recalculated in {recalculatedYear} due to significant changes such as:
{specificChanges}<br/><br/>
{context}
  </>
 ):(
  "No data available"
 )} 

</p>


</div>

<div id="section12_1_6" ref={section12_1_6Ref}>
<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
12.1.6 Consolidation Approach
</h3>

<div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">Add statement about tracking of Consolidation Approach</p>
         {consolidation && (
           <button
           className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
           onClick={loadContent2}
         >
           {/* <MdOutlinePlaylistAdd className="mr-1 w-[20px] h-[20px]"/> */}
           <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
           Auto Fill
         </button>
         )}
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
<EmissionTable columns={columns} data={formattedIntensity}/>
</div>
  </div>      



</div>
        </>
    )
}

export default Section7
