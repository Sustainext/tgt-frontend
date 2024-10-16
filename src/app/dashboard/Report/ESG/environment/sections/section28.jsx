'use client'
import { useState, useRef, useEffect } from "react";
import WasteTable from "../tables/waterTable";
import WasteTable2 from '../tables/wasteTable'


const Section28=({section12_5_5Ref,data})=>{
    const [content,setContent] = useState(
        `We set targets for reducing energy consumption and implement various initiatives, such as upgrading equipment, improving insulation, and optimizing processes to achieve these goals.`
    )


      const column1 = [
        'Recovery operation', 
        'Material Type', 
        "Qty of total waste",
        '% of total waste',
        'Unit'
      ];

      let wasteDirectedDisposalMaterialType={
        total:"",
        unit:""
      }
      let nonHazardeousWasteDivertedFromDisposal={
         total:"",
        unit:""
      }
      let hazardeousWasteDivertedFromDisposal={
        total:"",
       unit:""
     }
      const Tabledata =
      data["waste_analyse"] &&
      data["waste_analyse"]["waste_directed_to_disposal_by_material_type"].length > 1
        ? data["waste_analyse"]["waste_directed_to_disposal_by_material_type"].reduce(
            (acc, val) => {
              if (val.total_waste_generated !== undefined) {
                wasteDirectedDisposalMaterialType = {
                  total: val.total_waste_generated,
                  unit: val.units,
                };
              } else {
                acc.push({
                 'Recovery operation':val.disposal_method, 
              'Material Type':val.material_type, 
              "Qty of total waste":val.total_waste,
              '% of total waste':val.contribution+"%",
              'Unit':val.units
                });
              }
              return acc;
            },
            []
          )
        : [
            {
              'Recovery operation':"No data available", 
              'Material Type':"No data available", 
              "Qty of total waste":"No data available",
              '% of total waste':"No data available",
              'Unit':"No data available"
            },
          ];
  


      const column2 = [
        'Waste Type', 
        'Quantity', 
        'Unit',
        'Recycled %', 
        'Preparation of reuse %',
        "Other recovery options  %",
        "Site"
      ];
      const Tabledata2 =
      data["waste_analyse"] &&
      data["waste_analyse"]["non_hazardeous_waste_diverted_from_disposal"].length > 1
        ? data["waste_analyse"]["non_hazardeous_waste_diverted_from_disposal"].reduce(
            (acc, val) => {
              if (val.total_waste_generated !== undefined) {
                nonHazardeousWasteDivertedFromDisposal = {
                  total: val.total_waste_generated,
                  unit: val.units,
                };
              } else {
                acc.push({
                'Waste Type':val.material_type, 
        'Quantity':val.total_waste, 
        'Unit':val.units,
        'Recycled %':val.recycled_percentage+"%", 
        'Preparation of reuse %':val.preparation_of_reuse_percentage+"%",
        "Other recovery options  %":val.other_percentage+"%",
        "Site":val.site
                });
              }
              return acc;
            },
            []
          )
        : [
            {
              'Waste Type':"No data available", 
        'Quantity':"No data available", 
        'Unit':"No data available",
        'Recycled %':"No data available", 
        'Preparation of reuse %':"No data available",
        "Other recovery options  %":"No data available",
        "Site":"No data available"
            },
          ];


      const Tabledata3 =
      data["waste_analyse"] &&
      data["waste_analyse"]["hazardous_waste_diverted_form_disposal"].length > 1
        ? data["waste_analyse"]["hazardous_waste_diverted_form_disposal"].reduce(
            (acc, val) => {
              if (val.total_waste_generated !== undefined) {
                hazardeousWasteDivertedFromDisposal = {
                  total: val.total_waste_generated,
                  unit: val.units,
                };
              } else {
                acc.push({
                'Waste Type':val.material_type, 
        'Quantity':val.total_waste, 
        'Unit':val.units,
        'Recycled %':val.recycled_percentage+"%", 
        'Preparation of reuse %':val.preparation_of_reuse_percentage+"%",
        "Other recovery options  %":val.other_percentage+"%",
        "Site":val.site
                });
              }
              return acc;
            },
            []
          )
        : [
            {
              'Waste Type':"No data available", 
        'Quantity':"No data available", 
        'Unit':"No data available",
        'Recycled %':"No data available", 
        'Preparation of reuse %':"No data available",
        "Other recovery options  %":"No data available",
        "Site":"No data available"
            },
          ];


     
      
    
    return (
        <>
       
        <div id="section12_5_5" ref={section12_5_5Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
12.5.5  Waste Diverted from Disposal
</h3>

        
        <p className="text-sm mb-4">We focus on diverting waste from disposal through recycling, composting, and other sustainable practices. Our initiatives aim to increase the proportion of waste diverted from landfills. </p>

        <p className="text-[15px]  mb-2 font-semibold">
        Waste diverted from disposal by material type

        </p>
<div className="shadow-md rounded-md mb-4">
<WasteTable columns={column1} data={Tabledata} consumption="Total" unit={wasteDirectedDisposalMaterialType.unit} total={wasteDirectedDisposalMaterialType.total}/>
</div>

<p className="text-[15px]  mb-2 font-semibold">
Hazardous waste diverted form disposal
        </p>
<div className="shadow-md rounded-md mb-4">
<WasteTable2 columns={column2} data={Tabledata3} consumption="Total" unit={hazardeousWasteDivertedFromDisposal.unit} total={hazardeousWasteDivertedFromDisposal.total}/>
</div>

<p className="text-[15px]  mb-2 font-semibold">
Non-hazardous waste diverted form disposal
        </p>
<div className="shadow-md rounded-md mb-4">
<WasteTable2 columns={column2} data={Tabledata2} consumption="Total" unit={nonHazardeousWasteDivertedFromDisposal.unit} total={nonHazardeousWasteDivertedFromDisposal.total}/>
</div>


</div>
        </>
    )
}

export default Section28