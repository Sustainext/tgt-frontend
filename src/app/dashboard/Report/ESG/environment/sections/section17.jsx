'use client'
import { useState, useRef, useEffect } from "react";
import WaterTable from "../tables/waterTable";

const Section17=({section12_3_3Ref,data})=>{
    const [content,setContent] = useState(
        `We manage water discharge to minimize its impact on local ecosystems. This includes treating wastewater to meet regulatory standards and monitoring the quality of discharged water. Following are the standards used`
    )

    let waterDischargeByLocation={
       total:'',
      unit:''
    }
    let waterDischargeBySource={
        total:'',
      unit:''
    }
    let waterDischargeByBusinessOperation={
        total:'',
      unit:''
    }
    let waterDischargeByBusiness={
       total:'',
      unit:''
    }
    let waterDischargeByStressArea={
       total:'',
      unit:''
    }

    const column2 = [
        'Source', 
        'Water Type', 
        'Contribution %', 
        'Total water Discharge', 
        'Unit'
      ];

      const data2 =
      data["water_analyse"] &&
      data["water_analyse"]["total_water_discharge_by_water_type"].length > 0
        ? data["water_analyse"]["total_water_discharge_by_water_type"].reduce(
            (acc, val) => {
              if (val.Total !== undefined) {
                waterDischargeBySource = {
                  total: val.Total,
                  unit: val.Unit,
                };
              } else {
                acc.push({
                  Source: val.source,
        
          'Water Type': val.water_type,
          'Contribution %': val.contribution+"%",
          'Total water Discharge': val.total_water_discharge,
          Unit: val.Unit
                });
              }
              return acc;
            },
            []
          )
        : [
            {
              Source: 'No data available',
        
          'Water Type': 'No data available',
          'Contribution %': 'No data available',
          'Total water Discharge': 'No data available',
          Unit: 'No data available'
            },
          ];


      const column1 = [
        'Business Operation', 
        'Contribution %', 
        'Total water Discharge', 
        'Unit', 
      ];


      const data1 =
      data["water_analyse"] &&
      data["water_analyse"]["total_fresh_water_discharge_by_business_operation"].length > 0
        ? data["water_analyse"]["total_fresh_water_discharge_by_business_operation"].reduce(
            (acc, val) => {
              if (val.Total !== undefined) {
                waterDischargeByBusiness = {
                  total: val.Total,
                  unit: val.Unit,
                };
              } else {
                acc.push({
                  "Business Operation": val.business_operation,
          'Contribution %': val.contribution+"%",
          'Total water Discharge': val.discharge,
          "Unit": val.Unit
                });
              }
              return acc;
            },
            []
          )
        : [
            {
              "Business Operation": 'No data available',
          'Contribution %': 'No data available',
          'Total water Discharge': 'No data available',
          "Unit": 'No data available'
            },
          ]

      const column3 = [
        'Location/country', 
        'Contribution %', 
        'Total water Discharge', 
        'Unit', 
      ];
    

      const data3 =
      data["water_analyse"] &&
      data["water_analyse"]["get_total_fresh_water_discharge_by_location_country"].length > 0
        ? data["water_analyse"]["get_total_fresh_water_discharge_by_location_country"].reduce(
            (acc, val) => {
              if (val.Total !== undefined) {
                waterDischargeByLocation = {
                  total: val.Total,
                  unit: val.Unit,
                };
              } else {
                acc.push({
                  "Location/country": val.location,
                  'Contribution %': val.contribution+"%",
                  'Total water Discharge': val.total_water_discharge,
                  "Unit": val.Unit
                });
              }
              return acc;
            },
            []
          )
        : [
            {
              "Location/country": 'No data available',
              'Contribution %': 'No data available',
              'Total water Discharge': 'No data available',
              "Unit": 'No data available'
            },
          ];

      const column4 = [
        'Name of Water Stress Area', 
        "Business Operation",
        'Contribution %', 
        'Total water Discharge', 
        'Unit', 
      ];
     
      const data4 =
      data["water_analyse"] &&
      data["water_analyse"]["total_water_discharge_from_water_stress_area_by_business_operation"].length > 0
        ? data["water_analyse"]["total_water_discharge_from_water_stress_area_by_business_operation"].reduce(
            (acc, val) => {
              if (val.Total !== undefined) {
                waterDischargeByBusinessOperation = {
                  total: val.Total,
                  unit: val.Unit,
                };
              } else {
                acc.push({
                  "Name of Water Stress Area": val.water_stress,
            "Business Operation":val.business_operation,
          "Contribution %":val.contribution+"%",
          'Total water Discharge': val.total_discharge,
          "Unit": val.Unit
                });
              }
              return acc;
            },
            []
          )
        : [
            {
              "Name of Water Stress Area": 'No data available',
            "Business Operation":"No data available",
          "Contribution %":"No data available",
          'Total water Discharge': 'No data available',
          "Unit": 'No data available'
            },
          ]
      const column5 = [
        'Name of Water Stress Area', 
        "Type of water",
        'Contribution %', 
        'Total water Discharge', 
        'Unit', 
      ];

      const data5 =
      data["water_analyse"] &&
      data["water_analyse"]["total_water_discharge_by_water_type_from_water_stress_area"].length > 0
        ? data["water_analyse"]["total_water_discharge_by_water_type_from_water_stress_area"].reduce(
            (acc, val) => {
              if (val.Total !== undefined) {
                waterDischargeByStressArea = {
                  total: val.Total,
                  unit: val.Unit,
                };
              } else {
                acc.push({
                  "Name of Water Stress Area": val.water_stress,
            "Type of water":val.water_type,
          "Contribution %":val.contribution+"%",
          'Total water Discharge': val.total_discharge,
          "Unit": val.Unit
                });
              }
              return acc;
            },
            []
          )
        : [
            {
              "Name of Water Stress Area": 'No data available',
            "Type of water":"No data available",
          "Contribution %":"No data available",
          'Total water Discharge': 'No data available',
          "Unit": 'No data available'
            },
          ]

      const column6 = [
        'Volume of third-party water send  to use for other organizations', 
        'Contribution %', 
        'Unit', 
      ];
      
      const data6 =
      data["water_analyse"] &&
      data["water_analyse"]["third_party_water_discharge_sent_to_use_for_other_organizations"].length > 0
        ? data["water_analyse"]["third_party_water_discharge_sent_to_use_for_other_organizations"].reduce(
            (acc, val) => {
              if (val.Total !== undefined) {
              } else {
                acc.push({
                  "Volume of third-party water send  to use for other organizations": val.volume,
          "Contribution %":val.contribution+"%",
          "Unit": val.Unit
                });
              }
              return acc;
            },
            []
          )
        : [
            {
              "Volume of third-party water send  to use for other organizations": 'No data available',
              "Contribution %":"No data available",
              "Unit": 'No data available'
            },
          ]
      
    
    return (
        <>
       
        <div id="section12_3_3" ref={section12_3_3Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
12.3.3 Water Discharge & Management of Associated Impacts
</h3>

<p className="text-sm mb-4">{content}</p>
        
<p className="text-[15px]  mb-2 font-semibold">
Total Water Discharge by Location
        </p>
<div className="shadow-md rounded-md mb-4">
<WaterTable columns={column3} data={data3} consumption="Total water discharge" unit={waterDischargeByLocation.unit}
            total={waterDischargeByLocation.total}/>
</div>

<p className="text-[15px]  mb-2 font-semibold">
Total Water Discharge by source and type of water
        </p>
<div className="shadow-md rounded-md mb-4">
<WaterTable columns={column2} data={data2} consumption="Total water discharge" unit={waterDischargeBySource.unit}
            total={waterDischargeBySource.total}/>
</div>
{/* <p className="text-[15px]  mb-2 font-semibold">
Water withdrawal by water type 

        </p> */}
<p className="text-[15px]  mb-2 font-semibold">
Total Water Discharge (from water stress area) by Business Operation
        </p>
<div className="shadow-md rounded-md mb-4">
<WaterTable columns={column4} data={data4} consumption="Total water discharge" 
unit={waterDischargeByBusinessOperation.unit}
total={waterDischargeByBusinessOperation.total}
/>
</div>


<p className="text-[15px]  mb-2 font-semibold">
Total Water Discharge by Business Operation
        </p>
<div className="shadow-md rounded-md mb-4">
<WaterTable columns={column1} data={data1} consumption="Total water discharge" 
unit={waterDischargeByBusiness.unit}
total={waterDischargeByBusiness.total}
/>
</div>

{/* <p className="text-[15px]  mb-2 font-semibold">
Water discharge (from water stress areas) by water type 


        </p> */}

<p className="text-[15px]  mb-2 font-semibold">
Total Water Discharge by Water type (from water stress area)
        </p>
<div className="shadow-md rounded-md mb-4">
<WaterTable columns={column5} data={data5} consumption="Total water discharge" unit={waterDischargeByStressArea.unit} total={waterDischargeByStressArea.total}/>
</div>

<p className="text-[15px]  mb-2 font-semibold">
Third-party Water discharge sent to use for other organizations
        </p>
<div className="shadow-md rounded-md mb-4">
<WaterTable columns={column6} data={data6}/>
</div>





<p className="text-[15px]  mb-2 font-semibold">
Discharge Standard used: 
        </p>
        <p className="text-sm mb-4">{data["303-2a-management_water_discharge"]?data["303-2a-management_water_discharge"].data?data["303-2a-management_water_discharge"].data.length>0?data["303-2a-management_water_discharge"].data[0].Q1?data["303-2a-management_water_discharge"].data[0].Q1:"No data available":"No data available":"No data available":"No data available"}</p>
        <p className="text-[15px]  mb-2 font-semibold">
        Process to determine discharge standards: 
        </p>
        <p className="text-sm mb-4">{data["303-2a-management_water_discharge"]?data["303-2a-management_water_discharge"].data?data["303-2a-management_water_discharge"].data.length>0?data["303-2a-management_water_discharge"].data[0].Q2?data["303-2a-management_water_discharge"].data[0].Q2:"No data available":"No data available":"No data available":"No data available"}</p>
        <p className="text-[15px]  mb-2 font-semibold">
        Internal water quality standards:
        </p>
        <p className="text-sm mb-4">{data["303-2a-management_water_discharge"]?data["303-2a-management_water_discharge"].data?data["303-2a-management_water_discharge"].data.length>0?data["303-2a-management_water_discharge"].data[0].Q3?data["303-2a-management_water_discharge"].data[0].Q3:"No data available":"No data available":"No data available":"No data available"}</p>
</div>
        </>
    )
}

export default Section17