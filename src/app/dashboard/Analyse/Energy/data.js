export const columns1 = [
    {
      label: "Energy Type",
      dataIndex: "type",
      headerClass:
        "px-4 py-2 text-[14px] text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
      cellClass:
        "px-4 py-2 border-y text-slate-500 font-normal text-sm w-[13%] text-left h-14",
    },
    {
      label: "Source",
      dataIndex: "source",
      headerClass: "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Energy Consumption",
      dataIndex: "consumption",
      headerClass: "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Units",
      dataIndex: "units",
      headerClass:
        "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tr-lg",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
  ];
  
  export const data1 = [
    {
      type: "Electricity Consumption",
      source: "Wind",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: "Heating Consumption",
      source: "Solar",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: "Cooling Consumption",
      source: "Hydro",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: "Steam Consumption",
      source: "Wind",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: "Total Energy Consumption",
      source: "",
      consumption: 212123545,
      units: "GJ",
    },
  ];
  
  // ------------------------Fuel Consumption within the organisation from Non-renewable sources
  
  export const columns2 = [
    {
      label: "Energy Type",
      dataIndex: "type",
      headerClass:
        "px-4 py-2 text-[14px] text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
      cellClass:
        "px-4 py-2 border-y text-slate-500 font-normal text-sm w-[13%] text-left h-14",
    },
    {
      label: "Source",
      dataIndex: "source",
      headerClass: "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Energy Consumption",
      dataIndex: "consumption",
      headerClass: "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Units",
      dataIndex: "units",
      headerClass:
        "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tr-lg",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
  ];
  
  export const data2 = [
    {
      type: "Electricity Consumption",
      source: "Wind",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: "Heating Consumption",
      source: "Solar",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: "Cooling Consumption",
      source: "Hydro",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: "Steam Consumption",
      source: "Wind",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: "Total Non-renewable Energy consumption",
      source: "",
      consumption: 212123545,
      units: "GJ",
    },
  ];
  
  // ------------------------------------Energy Consumption Within the organisation
  
  export const columns3 = [
    {
      label: "Types of Energy Consumption",
      dataIndex: "type",
      headerClass:
        "px-4 py-2 text-[14px] text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
      cellClass:
        "px-4 py-2 border-y text-slate-500 font-normal text-sm w-[13%] text-left h-14",
    },
    {
      label: "Consumption",
      dataIndex: "consumption",
      headerClass: "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Units",
      dataIndex: "units",
      headerClass:
        "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tr-lg",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
  ];
  
  export const data3 = [
    {
      type: "Non-renewable fuel consumed",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: " Renewable fuel consumed",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: "Electricity, heating, cooling, and steam purchased for consumption",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: "Self-generated electricity, heating, cooling, and steam, which are not consumed",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: "Electricity, heating, cooling, and steam sold",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: "Total Energy Consumption Within the organization",
      consumption: 212123545,
      units: "GJ",
    },
  ];
  
  // ------------------------------Direct Purchased Heating, Cooling, Electricity and Steam from renewable sources
  
  export const columns4 = [
    {
      label: "Energy Type",
      dataIndex: "type",
      headerClass:
        "px-4 py-2 text-[14px] text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
      cellClass:
        "px-4 py-2 border-y text-slate-500 font-normal text-sm w-[13%] text-left h-14",
    },
    {
      label: "Source",
      dataIndex: "source",
      headerClass: "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Purpose",
      dataIndex: "purpose",
      headerClass: "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Energy Consumption",
      dataIndex: "consumption",
      headerClass: "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Units",
      dataIndex: "units",
      headerClass:
        "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tr-lg",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
  ];
  
  export const data4 = [
    {
      type: "Electricity Consumption",
      source: "Wind",
      purpose: "Purpose",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: "Heating Consumption",
      source: "Solar",
      purpose: "Purpose",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: "Cooling Consumption",
      source: "Hydro",
      purpose: "Purpose",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: "Steam Consumption",
      source: "Wind",
      purpose: "Purpose",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: "Total Energy Consumption Within the organization",
      source: "",
      purpose: "Purpose",
      consumption: 212123545,
      units: "GJ",
    },
  ];
  
  // -------------------Direct Purchased Heating, Cooling, Electricity and Steam from non-renewable sources
  
  export const columns5 = [
    {
      label: "Energy Type",
      dataIndex: "type",
      headerClass:
        "px-4 py-2 text-[14px] text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
      cellClass:
        "px-4 py-2 border-y text-slate-500 font-normal text-sm w-[13%] text-left h-14",
    },
    {
      label: "Source",
      dataIndex: "source",
      headerClass: "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Purpose",
      dataIndex: "purpose",
      headerClass: "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Energy Consumption",
      dataIndex: "consumption",
      headerClass: "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Units",
      dataIndex: "units",
      headerClass:
        "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tr-lg",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
  ];
  
  export const data5 = [
    {
      type: "Electricity Consumption",
      source: "Wind",
      purpose: "Purpose",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: "Heating Consumption",
      source: "Solar",
      purpose: "Purpose",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: "Cooling Consumption",
      source: "Hydro",
      purpose: "Purpose",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: "Steam Consumption",
      source: "Wind",
      purpose: "Purpose",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: "Total Energy Consumption Within the organization",
      source: "",
      purpose: "Purpose",
      consumption: 212123545,
      units: "GJ",
    },
  ];
  
  // --------------------Self Generated Energy - not consumed or sold (Renewable Energy)
  
  export const columns6 = [
    {
      label: "Types of self generated Electricity",
      dataIndex: "type",
      headerClass:
        "px-4 py-2 text-[14px] text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
      cellClass:
        "px-4 py-2 border-y text-slate-500 font-normal text-sm w-[13%] text-left h-14",
    },
    {
      label: "Source",
      dataIndex: "source",
      headerClass: "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Consumption",
      dataIndex: "consumption",
      headerClass: "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Units",
      dataIndex: "units",
      headerClass:
        "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tr-lg",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
  ];
  
  export const data6 = [
    {
      type: "Self Generated electricity",
      source: "Wind",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: "Self Generated electricity",
      source: "Solar",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: "Self Generated electricity",
      source: "Hydro",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: "Self Generated electricity",
      source: "Wind",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: "Total Self Generated Electricity (not consumed or sold)",
      source: "",
      consumption: 212123545,
      units: "GJ",
    },
  ];
  
  //Self Generated Energy - not consumed or sold (non-renewable Energy)
  
  export const columns7 = [
    {
      label: "Types of self generated Electricity",
      dataIndex: "type",
      headerClass:
        "px-4 py-2 text-[14px] text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
      cellClass:
        "px-4 py-2 border-y text-slate-500 font-normal text-sm w-[13%] text-left h-14",
    },
    {
      label: "Source",
      dataIndex: "source",
      headerClass: "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Consumption",
      dataIndex: "consumption",
      headerClass: "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Units",
      dataIndex: "units",
      headerClass:
        "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tr-lg",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
  ];
  
  export const data7 = [
    {
      type: "Self Generated electricity",
      source: "Wind",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: "Self Generated electricity",
      source: "Solar",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: "Self Generated electricity",
      source: "Hydro",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: "Self Generated electricity",
      source: "Wind",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: "Total Self Generated Electricity (not consumed or sold)",
      source: "",
      consumption: 212123545,
      units: "GJ",
    },
  ];
  
  // -------------------------Energy Sold (Renewable energy)
  
  export const columns8 = [
    {
      label: "Energy Type",
      dataIndex: "type",
      headerClass:
        "px-4 py-2 text-[14px] text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
      cellClass:
        "px-4 py-2 border-y text-slate-500 font-normal text-sm w-[13%] text-left h-14",
    },
    {
      label: "Source",
      dataIndex: "source",
      headerClass: "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Type of Entity",
      dataIndex: "entityType",
      headerClass: "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Name of Entity",
      dataIndex: "entityName",
      headerClass: "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Energy Consumption",
      dataIndex: "consumption",
      headerClass: "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Units",
      dataIndex: "units",
      headerClass:
        "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tr-lg",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
  ];
  
  export const data8 = [
    {
      type: "Electricity Consumption",
      source: "Wind",
      entityType: "entity",
      entityName: "entity",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: "Heating Consumption",
      source: "Solar",
      entityType: "entity",
      entityName: "entity",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: "Cooling Consumption",
      source: "Hydro",
      entityType: "entity",
      entityName: "entity",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: "Steam Consumption",
      source: "Wind",
      entityType: "entity",
      entityName: "entity",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: "Total Energy Sold",
      source: "",
      entityType: "entity",
      entityName: "entity",
      consumption: 212123545,
      units: "GJ",
    },
  ];
  
  // --------------------- Energy Sold (non-renewable energy)
  
  export const columns9 = [
    {
      label: "Energy Type",
      dataIndex: "type",
      headerClass:
        "px-4 py-2 text-[14px] text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
      cellClass:
        "px-4 py-2 border-y text-slate-500 font-normal text-sm w-[13%] text-left h-14",
    },
    {
      label: "Source",
      dataIndex: "source",
      headerClass: "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Type of Entity",
      dataIndex: "entityType",
      headerClass: "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Name of Entity",
      dataIndex: "entityName",
      headerClass: "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Energy Consumption",
      dataIndex: "consumption",
      headerClass: "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Units",
      dataIndex: "units",
      headerClass:
        "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tr-lg",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
  ];
  
  export const data9 = [
    {
      type: "Electricity Consumption",
      source: "Wind",
      entityType: "entity",
      entityName: "entity",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: "Heating Consumption",
      source: "Solar",
      entityType: "entity",
      entityName: "entity",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: "Cooling Consumption",
      source: "Hydro",
      entityType: "entity",
      entityName: "entity",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: "Steam Consumption",
      source: "Wind",
      entityType: "entity",
      entityName: "entity",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: "Total Energy Sold",
      source: "",
      entityType: "entity",
      entityName: "entity",
      consumption: 212123545,
      units: "GJ",
    },
  ];
  
  //Energy Consumption Outside the Organisation
  
  export const columns10 = [
    {
      label: "Energy Type",
      dataIndex: "type",
      headerClass:
        "px-4 py-2 text-[14px] text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
      cellClass:
        "px-4 py-2 border-y text-slate-500 font-normal text-sm w-[13%] text-left h-14",
    },
    {
      label: "Purpose",
      dataIndex: "purpose",
      headerClass: "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Consumption",
      dataIndex: "consumption",
      headerClass: "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Units",
      dataIndex: "units",
      headerClass:
        "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tr-lg",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
  ];
  
  export const data10 = [
    {
      type: "Coal",
      purpose: "Wind",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: "Solar",
      purpose: "Solar",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: "Wind",
      purpose: "Hydro",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: "Diesel",
      purpose: "Wind",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: "Crude Oil",
      purpose: "Sea",
      consumption: 212123545,
      units: "GJ",
    },
    {
      type: "Total Energy Consumption outside of the organization",
      purpose: "",
      consumption: 212123545,
      units: "GJ",
    },
  ];
  
  // -------------------------Reduction of energy consumption
  
  export const columns11 = [
    {
      label: "Type of Intervention",
      dataIndex: "intervention",
      headerClass:
        "px-4 py-2 text-[14px] text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
      cellClass:
        "px-4 py-2 border-y text-slate-500 font-normal text-sm w-[13%] text-left h-14",
    },
    {
      label: "Energy Type",
      dataIndex: "type",
      headerClass:
        "px-4 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tl-lg rounded-tr-lg h-[44px]",
      cellClass:
        "px-4 py-2 border-y text-slate-500 font-normal text-sm w-[13%] text-center h-14",
    },
    {
      label: "Energy Reduction",
      dataIndex: "reduction",
      headerClass:
        "px-4 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tl-lg rounded-tr-lg h-[44px]",
      cellClass:
        "px-4 py-2 border-y text-slate-500 font-normal text-sm w-[13%] text-center h-14",
    },
    {
      label: "Base Year",
      dataIndex: "year",
      headerClass:
        "px-4 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tl-lg rounded-tr-lg h-[44px]",
      cellClass:
        "px-4 py-2 border-y text-slate-500 font-normal text-sm w-[13%] text-center h-14",
    },
    {
      label: "Methodology",
      dataIndex: "methodology",
      headerClass:
        "px-4 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tl-lg rounded-tr-lg h-[44px]",
      cellClass:
        "px-4 py-2 border-y text-slate-500 font-normal text-sm w-[13%] text-center h-14",
    },
    {
      label: "Quantity",
      dataIndex: "quantity1",
      headerClass: "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Unit",
      dataIndex: "unit1",
      headerClass: "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Quantity",
      dataIndex: "quantity2",
      headerClass:
        "px-4 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tl-lg rounded-tr-lg h-[44px]",
      cellClass:
        "px-4 py-2 border-y text-slate-500 font-normal text-sm w-[13%] text-center h-14",
    },
    {
      label: "Units",
      dataIndex: "unit2",
      headerClass:
        "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tr-lg",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
  ];
  
  export const data11 = [
    {
      intervention: "Switching to LED",
      type: "Electricity Reduced",
      reduction: "Estimated",
      year: "1994",
      methodology: "methodology",
      quantity1: 2121212122,
      unit1: "GJ",
      quantity2: 212123545,
      unit2: "GJ",
    },
    {
      intervention: "Changing Fuel",
      type: "Heating Reduced",
      reduction: "Estimated",
      year: "1994",
      methodology: "methodology",
      quantity1: 2121212122,
      unit1: "GJ",
      quantity2: 212123545,
      unit2: "GJ",
    },
    {
      intervention: "Process changes",
      type: "Heating Reduced",
      reduction: "Cooling Reduced",
      year: "1994",
      methodology: "methodology",
      quantity1: 2121212122,
      unit1: "GJ",
      quantity2: 212123545,
      unit2: "GJ",
    },
    {
      intervention: "Process changes",
      type: "Renewable Energy Adoption",
      reduction: "Cooling Reduced",
      year: "1994",
      methodology: "methodology",
      quantity1: 2121212122,
      unit1: "GJ",
      quantity2: 212123545,
      unit2: "GJ",
    },
    {
      type: "Total Reduction in energy consumption",
      source: "",
      consumption: 212123545,
      units: "GJ",
    },
  ];
  
  // -------------------------Energy Intensity
  
  export const columns13 = [
    {
      label: "Energy Quantity",
      dataIndex: "type",
      headerClass:
        "px-4 py-2 text-[14px] text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
      cellClass:
        "px-4 py-2 border-y text-slate-500 font-normal text-sm w-[13%] text-left h-14",
    },
    {
      label: "Organization Metric",
      dataIndex: "metric",
      headerClass:
        "px-4 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tl-lg rounded-tr-lg h-[44px]",
      cellClass:
        "px-4 py-2 border-y text-slate-500 font-normal text-sm w-[13%] text-center h-14",
    },
    {
      label: "Energy Intensity",
      dataIndex: "intensity",
      headerClass:
        "px-4 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tl-lg rounded-tr-lg h-[44px]",
      cellClass:
        "px-4 py-2 border-y text-slate-500 font-normal text-sm w-[13%] text-center h-14",
    },
    {
      label: "Units",
      dataIndex: "unit1",
      headerClass: "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Energy Intensity",
      dataIndex: "intensity2",
      headerClass:
        "px-4 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tl-lg rounded-tr-lg h-[44px]",
      cellClass:
        "px-4 py-2 border-y text-slate-500 font-normal text-sm w-[13%] text-center h-14",
    },
    {
      label: "Units",
      dataIndex: "unit2",
      headerClass:
        "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tr-lg",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
  ];
  
  export const data13 = [
    {
      type: "Absolute energy consumption(no)",
      metric: "Production volume",
      intensity: 2121212122,
      unit1: "GJ/Organisation metric",
      intensity2: 212123545,
      unit2: "GJ/Organisation metric",
    },
    {
      type: "Absolute energy consumption(no)",
      metric: "Size",
      intensity: 2121212122,
      unit1: "GJ/Organisation metric",
      intensity2: 212123545,
      unit2: "GJ/Organisation metric",
    },
  ];
  
  // --------------------------------Reductions in energy requirements of products and services
  
  export const columns12 = [
    {
      label: "Name of Product/Service",
      dataIndex: "type",
      headerClass:
        "px-4 py-2 text-[14px] text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
      cellClass:
        "px-4 py-2 border-y text-slate-500 font-normal text-sm w-[13%] text-left h-14",
    },
    {
      label: "Reduction in Energy Consumption",
      dataIndex: "reduction",
      headerClass: "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Units",
      dataIndex: "unit1",
      headerClass:
        "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tr-lg",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Reduction in Energy Consumption",
      dataIndex: "consumption",
      headerClass: "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Units",
      dataIndex: "unit2",
      headerClass:
        "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tr-lg",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
  ];
  
  export const data12 = [
    {
      type: "Electricity Consumption",
      reduction: 212123545,
      unit1: "GJ",
      consumption: 212123545,
      unit2: "GJ",
    },
    {
      type: "Heating Consumption",
      reduction: 212123545,
      unit1: "GJ",
      consumption: 212123545,
      unit2: "GJ",
    },
    {
      type: "Cooling Consumption",
      reduction: 212123545,
      unit1: "GJ",
      consumption: 212123545,
      unit2: "GJ",
    },
    {
      type: "Steam Consumption",
      reduction: 212123545,
      unit1: "GJ",
      consumption: 212123545,
      unit2: "GJ",
    },
    {
      type: "Total reduction in energy requirements of products and services",
      reduction: 212123545,
      unit1: "GJ",
      consumption: 212123545,
      units: "GJ",
    },
  ];
  
  // -------------------------Reductions in energy requirements of products and services
  