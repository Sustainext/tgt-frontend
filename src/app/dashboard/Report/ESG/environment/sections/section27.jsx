"use client";
import { useState, useRef, useEffect } from "react";
import WasteTable from "../tables/waterTable";
import WasteTable2 from "../tables/wasteTable";

const Section27 = ({ section12_5_4Ref, data }) => {
  const [content, setContent] = useState(
    `We set targets for reducing energy consumption and implement various initiatives, such as upgrading equipment, improving insulation, and optimizing processes to achieve these goals.`
  );

  const column1 = [
    "Disposal Method",
    "Material Type",
    "Qty of total waste",
    "% of total waste",
    "Unit",
  ];
  let wasteDirectedMaterialType = {
    total: "",
    unit: "",
  };
  let hazardeousWasteDirectedToDisposal = {
    total: "",
    unit: "",
  };
  let NonhazardeousWasteDirectedToDisposal = {
    total: "",
    unit: "",
  };
  const Tabledata =
    data["waste_analyse"] &&
    data["waste_analyse"]["waste_directed_to_disposal_by_material_type"]
      .length > 1
      ? data["waste_analyse"][
          "waste_directed_to_disposal_by_material_type"
        ].reduce((acc, val) => {
          if (val.total_waste_generated !== undefined) {
            wasteDirectedMaterialType = {
              total: val.total_waste_generated,
              unit: val.units,
            };
          } else {
            acc.push({
              "Disposal Method": val.disposal_method,
              "Material Type": val.material_type,
              "Qty of total waste": val.total_waste,
              "% of total waste": val.contribution + "%",
              Unit: val.units,
            });
          }
          return acc;
        }, [])
      : [
          {
            "Disposal Method": "No data available",
            "Material Type": "No data available",
            "Qty of total waste": "No data available",
            "% of total waste": "No data available",
            Unit: "No data available",
          },
        ];

  const column2 = [
    "Waste Type",
    "Quantity",
    "Unit",
    "Incineration (with energy) %",
    "Incineration (without energy) %",
    "Landfill %",
    "Other disposal method  %",
    "External Vendor",
    "Site",
  ];
  const Tabledata2 =
    data["waste_analyse"] &&
    data["waste_analyse"]["hazardeous_waste_directed_to_disposal"].length > 1
      ? data["waste_analyse"]["hazardeous_waste_directed_to_disposal"].reduce(
          (acc, val) => {
            if (val.total_waste_generated !== undefined) {
              hazardeousWasteDirectedToDisposal = {
                total: val.total_waste_generated,
                unit: val.units,
              };
            } else {
              acc.push({
                "Waste Type": val.material_type,
                Quantity: val.total_waste,
                Unit: val.units,
                "Incineration (with energy) %":
                  val.inceneration_with_energy_percentage + "%",
                "Incineration (without energy) %":
                  val.inceneration_without_energy_percentage + "%",
                "Landfill %": val.landfill_percentage + "%",
                "Other disposal method  %": val.other_disposal_percentage + "%",
                "External Vendor": val.external_percentage,
                Site: val.site,
              });
            }
            return acc;
          },
          []
        )
      : [
          {
            "Waste Type": "No data available",
            Quantity: "No data available",
            Unit: "No data available",
            "Incineration (with energy) %": "No data available",
            "Incineration (without energy) %": "No data available",
            "Landfill %": "No data available",
            "Other disposal method  %": "No data available",
            "External Vendor": "No data available",
            Site: "No data available",
          },
        ];

  const Tabledata3 =
    data["waste_analyse"] &&
    data["waste_analyse"]["non_hazardeous_waste_directed_to_disposal"].length >
      1
      ? data["waste_analyse"][
          "non_hazardeous_waste_directed_to_disposal"
        ].reduce((acc, val) => {
          if (val.total_waste_generated !== undefined) {
            NonhazardeousWasteDirectedToDisposal = {
              total: val.total_waste_generated,
              unit: val.units,
            };
          } else {
            acc.push({
              "Waste Type": val.material_type,
              Quantity: val.total_waste,
              Unit: val.units,
              "Incineration (with energy) %":
                val.inceneration_with_energy_percentage + "%",
              "Incineration (without energy) %":
                val.inceneration_without_energy_percentage + "%",
              "Landfill %": val.landfill_percentage + "%",
              "Other disposal method  %": val.other_disposal_percentage + "%",
              "External Vendor": val.external_percentage,
              Site: val.site,
            });
          }
          return acc;
        }, [])
      : [
          {
            "Waste Type": "No data available",
            Quantity: "No data available",
            Unit: "No data available",
            "Incineration (with energy) %": "No data available",
            "Incineration (without energy) %": "No data available",
            "Landfill %": "No data available",
            "Other disposal method  %": "No data available",
            "External Vendor": "No data available",
            Site: "No data available",
          },
        ];

  return (
    <>
      <div id="section12_5_4" ref={section12_5_4Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
          12.5.4 Waste Disposed
        </h3>

        <p className="text-sm mb-4">
          We report on the quantity of waste disposed of through landfilling,
          incineration, or other methods. Our aim is to reduce the amount of
          waste sent to disposal by increasing recycling and reuse.
        </p>

        <p className="text-[15px]  mb-2 font-semibold">
          Waste directed to disposal by material type
        </p>
        <div className="shadow-md rounded-md mb-4">
          <WasteTable
            columns={column1}
            data={Tabledata}
            consumption="Total"
            unit={Tabledata[0].Unit}
            total={wasteDirectedMaterialType.total}
          />
        </div>

        <p className="text-[15px]  mb-2 font-semibold">
          Hazardous waste directed to disposal
        </p>
        <div className="shadow-md rounded-md mb-4">
          <WasteTable2
            columns={column2}
            data={Tabledata2}
            consumption="Total"
            unit={Tabledata2[0].Unit}
            total={hazardeousWasteDirectedToDisposal.total}
          />
        </div>

        <p className="text-[15px]  mb-2 font-semibold">
          Non-hazardous waste directed to disposal
        </p>
        <div className="shadow-md rounded-md mb-4">
          <WasteTable2
            columns={column2}
            data={Tabledata3}
            consumption="Total"
            unit={Tabledata3[0].Unit}
            total={NonhazardeousWasteDirectedToDisposal.total}
          />
        </div>
      </div>
    </>
  );
};

export default Section27;
