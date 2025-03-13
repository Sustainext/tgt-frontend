'use client'
import { useState, useRef, useEffect } from "react";
import AirQualityTable from "../tables/airQualityTable";
import dynamic from 'next/dynamic';
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {setAirQualityProtectionCommitment} from "../../../../../../lib/redux/features/ESGSlice/screen12Slice"

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });



const Section33=({section12_7Ref})=>{
    
    const content = useSelector(state => state.screen12Slice.air_quality_protection_commitment);
    const dispatch = useDispatch();
    const loadContent = () => {
      dispatch(setAirQualityProtectionCommitment(
        `We recognize the importance of maintaining air quality and work to minimize air emissions from our operations. This includes implementing measures to reduce pollutants, monitoring air quality, and complying with regulatory standards.`))
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
    
    
    const handleEditorChange=(e)=>{
      dispatch(setAirQualityProtectionCommitment(e.taget.value))
    }


    const col1 = [
      {
          label: "S.No",
          dataIndex: "SNO",
          headerClass:
            "px-4 py-2 text-[12px] border-r  text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
          cellClass:
            "px-4 py-2 border-y text-slate-500 font-normal text-[12px]  w-[13%] text-left",
        },
      {
        label: "Air Pollutants",
        dataIndex: "pollutant",
        headerClass:
          "px-4 py-2 text-[12px] border-r  text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
        cellClass:
          "px-4 py-2 border-y text-slate-500 font-normal text-[12px]  w-[13%] text-left",
      },
      {
        label: "Total Emissions",
        dataIndex: "total_emission_kg",
        headerClass: "px-2 py-2 border-r text-[12px]  text-[#727272] w-[10%] text-center",
        cellClass:
          "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
      },
      {
        label: "Contribution %",
        dataIndex: "contribution",
        headerClass: "px-2 py-2 text-[12px] border-r  text-[#727272] w-[10%] text-center",
        cellClass:
          "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
      },
      {
        label: "Source of emission factor",
        dataIndex: "source_of_emission",
        headerClass: "px-2 py-2 text-[12px] border-r  text-[#727272] w-[10%] text-center",
        cellClass:
          "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
      },
    ];

    const col2 = [
      {
          label: "S.No",
          dataIndex: "SNO",
          headerClass:
            "px-4 py-2 text-[12px] border-r text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
          cellClass:
            "px-4 py-2 border-y text-slate-500 font-normal text-[12px]  w-[13%] text-left",
        },
      {
          label: "Air Pollutants",
          dataIndex: "pollutant",
          headerClass:
            "px-4 py-2 text-[12px] border-r text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
          cellClass:
            "px-4 py-2 border-y text-slate-500 font-normal text-[12px]  w-[13%] text-left",
        },
        {
          label: "Total Emissions",
          dataIndex: "total_emission",
          headerClass: "px-2 py-2 text-[12px] border-r  text-[#727272] w-[10%] text-center",
          cellClass:
            "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
        },
        {
          label: "Source of emission factor",
          dataIndex: "source_of_emission",
          headerClass: "px-2 py-2 text-[12px] border-r  text-[#727272] w-[10%] text-center",
          cellClass:
            "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
        },
    ];
  
    col2.totalLabelKey="Average emission"
  
  
    const col3 = [
      {
          label: "S.No",
          dataIndex: "SNO",
          headerClass:
            "px-4 py-2 text-[12px]  text-[#727272] border-r w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
          cellClass:
            "px-4 py-2 border-y text-slate-500 font-normal text-[12px]  w-[13%] text-left",
        },
      {
        label: "Location",
        dataIndex: "location",
        headerClass:
          "px-4 py-2 text-[12px]  text-[#727272] border-r w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
        cellClass:
          "px-4 py-2 border-y text-slate-500 font-normal text-[12px]  w-[13%] text-left",
      },
      {
        label: "NOx",
        dataIndex: "NOx",
        headerClass: "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
        cellClass:
          "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
      },
      {
          label: "SOx",
          dataIndex: "SOx",
          headerClass: "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
          cellClass:
            "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
        },
  
        {
          label: "Persistent organic pollutants (POP)",
          dataIndex: "Persistent organic pollutants (POP)",
          headerClass: "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
          cellClass:
            "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
        },
  
        {
          label: "Volatile organic compounds (VOC)",
          dataIndex: "Volatile organic compounds (VOC)",
          headerClass: "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
          cellClass:
            "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
        },
  
        {
          label: "Hazardous air pollutants (HAP)",
          dataIndex: "Hazardous air pollutants (HAP)",
          headerClass: "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
          cellClass:
            "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
        },
        {
          label: "Particulate matter (PM 2.5)",
          dataIndex: "Particulate matter (PM 2.5)",
          headerClass: "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
          cellClass:
            "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
        },
         {
          label: "Carbon Monoxide(CO)",
          dataIndex: "Carbon Monoxide(CO)",
          headerClass: "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
          cellClass:
            "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
        },
    ];
  
  
    const col4 = [
      {
          label: "S.No",
          dataIndex: "SNO",
          headerClass:
            "px-4 py-2 text-[12px]  text-[#727272] border-r w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
          cellClass:
            "px-4 py-2 border-y text-slate-500 font-normal text-[12px]  w-[13%] text-left",
        },
      {
        label: "Location",
        dataIndex: "location",
        headerClass:
          "px-4 py-2 text-[12px]  text-[#727272] border-r w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
        cellClass:
          "px-4 py-2 border-y text-slate-500 font-normal text-[12px]  w-[13%] text-left",
      },
      {
        label: "NOx",
        dataIndex: "NOx",
        headerClass: "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
        cellClass:
          "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
      },
      {
          label: "SOx",
          dataIndex: "SOx",
          headerClass: "px-2 py-2 text-[12px] border-r  text-[#727272] w-[10%] text-center",
          cellClass:
            "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
        },
  
        {
          label: "Persistent organic pollutants (POP)",
          dataIndex: "Persistent organic pollutants (POP)",
          headerClass: "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
          cellClass:
            "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
        },
  
        {
          label: "Volatile organic compounds (VOC)",
          dataIndex: "Volatile organic compounds (VOC)",
          headerClass: "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
          cellClass:
            "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
        },
  
        {
          label: "Hazardous air pollutants (HAP)",
          dataIndex: "Hazardous air pollutants (HAP)",
          headerClass: "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
          cellClass:
            "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
        },
        {
          label: "Particulate matter (PM 2.5)",
          dataIndex: "Particulate matter (PM 2.5)",
          headerClass: "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
          cellClass:
            "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
        },
         {
          label: "Carbon Monoxide(CO)",
          dataIndex: "Carbon Monoxide(CO)",
          headerClass: "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
          cellClass:
            "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
        },
    ];
  
    const col5 = [
      {
          label: "S.No",
          dataIndex: "SNO",
          headerClass:
            "px-4 py-2 text-[12px]  text-[#727272] border-r w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
          cellClass:
            "px-4 py-2 border-y text-slate-500 font-normal text-[12px]  w-[13%] text-left",
        },
      {
        label: "Location",
        dataIndex: "location",
        headerClass:
          "px-4 py-2 text-[12px]  text-[#727272] border-r w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
        cellClass:
          "px-4 py-2 border-y text-slate-500 font-normal text-[12px]  w-[13%] text-left",
      },
      {
        label: "NOx",
        dataIndex: "NOx",
        headerClass: "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
        cellClass:
          "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
      },
      {
          label: "SOx",
          dataIndex: "SOx",
          headerClass: "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
          cellClass:
            "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
        },
  
        {
          label: "Persistent organic pollutants (POP)",
          dataIndex: "Persistent organic pollutants (POP)",
          headerClass: "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
          cellClass:
            "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
        },
  
        {
          label: "Volatile organic compounds (VOC)",
          dataIndex: "Volatile organic compounds (VOC)",
          headerClass: "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
          cellClass:
            "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
        },
  
        {
          label: "Hazardous air pollutants (HAP)",
          dataIndex: "Hazardous air pollutants (HAP)",
          headerClass: "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
          cellClass:
            "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
        },
        {
          label: "Particulate matter (PM 2.5)",
          dataIndex: "Particulate matter (PM 2.5)",
          headerClass: "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
          cellClass:
            "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
        },
         {
          label: "Carbon Monoxide(CO)",
          dataIndex: "Carbon Monoxide(CO)",
          headerClass: "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
          cellClass:
            "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
        },
    ];

    const col6 = [
      {
        label: "Standards used",
        dataIndex: "standard",
        headerClass:
          "px-4 py-2 text-[12px] border-r text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
        cellClass:
          "px-4 py-2 border-y text-slate-500 font-normal text-[12px]  w-[13%] text-left",
      },
      {
        label: "Methodologies used",
        dataIndex: "methodologies",
        headerClass: "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
        cellClass:
          "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
      },
      {
          label: "Assumptions considered",
          dataIndex: "assumptions",
          headerClass: "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
          cellClass:
            "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
        },
  
        {
          label: "Calculation tools used",
          dataIndex: "calculation",
          headerClass: "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
          cellClass:
            "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
        },
  
    ];
  
    return (
        <>
       
        <div id="section12_7" ref={section12_7Ref}>

<h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
12.7 Air Quality
</h3>

<div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">Add statement about company’s commitment to protect and maintain air quality</p>
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
            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Air Emissions by Pollutants in (Kg)
</p>
<div className="shadow-md rounded-md mb-4">
<AirQualityTable columns={col1} data={[]}/>
</div>

<p className="text-[15px] text-[#344054] mb-2 font-semibold">
Air Emissions by Pollutants (in ppm or µg/m³)
</p>
<div className="shadow-md rounded-md mb-4">
<AirQualityTable columns={col2} data={[]}/>
</div>


<p className="text-[15px] text-[#344054] mb-2 font-semibold">
Percentage Contribution of Air Pollutants by Location
</p>
<div className="shadow-md rounded-md mb-4">
<AirQualityTable columns={col3} data={[]}/>
</div>


<p className="text-[15px] text-[#344054] mb-2 font-semibold">
Total  Air Emissions by Location (in Kg)
</p>
<div className="shadow-md rounded-md mb-4">
<AirQualityTable columns={col4} data={[]}/>
</div>


<p className="text-[15px] text-[#344054] mb-2 font-semibold">
Total  Air Emissions by Location (in ppm or µg/m³)
</p>
<div className="shadow-md rounded-md mb-4">
<AirQualityTable columns={col5} data={[]}/>
</div>

<p className="text-[15px] text-[#344054] mb-2 font-semibold">
Standards, methodologies, assumptions, and/or calculation tools used
</p>
<div className="shadow-md rounded-md mb-4">
<AirQualityTable columns={col6} data={[]}/>
</div>

</div>
        </>
    )
}

export default Section33