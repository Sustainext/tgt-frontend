export const columns1 = [
    {
      label: "Material Type",
      dataIndex: "material_type",
      headerClass:
        "px-4 py-2 text-[14px] text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
      cellClass:
        "px-4 py-2 border-y text-slate-500 font-normal text-sm w-[13%] text-left h-14",
    },
    {
      label: "Contribution %",
      dataIndex: "contribution",
      headerClass: "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Total in Qt",
      dataIndex: "total_waste",
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



  // ------------------------Fuel Consumption within the organisation from Non-renewable sources

  export const columns2 = [
    {
      label: "Location",
      dataIndex: "location",
      headerClass:
        "px-4 py-2 text-[14px] text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
      cellClass:
        "px-4 py-2 border-y text-slate-500 font-normal text-sm w-[13%] text-left h-14",
    },
    {
      label: "Material Type",
      dataIndex: "material_type",
      headerClass: "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Contribution %",
      dataIndex: "contribution",
      headerClass: "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Qty of total waste",
      dataIndex: "total_waste",
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



  // ------------------------------------Energy Consumption Within the organisation

  export const columns3 = [
    {
      label: "Total Waste by Category",
      dataIndex: "material_type",
      headerClass:
        "px-4 py-2 text-[14px] text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
      cellClass:
        "px-4 py-2 border-y text-slate-500 font-normal text-sm w-[13%] text-left h-14",
    },
    {
      label: "Contribution %",
      dataIndex: "contribution",
      headerClass: "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Total in Qty",
      dataIndex: "total_waste",
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



  // ------------------------------Direct Purchased Heating, Cooling, Electricity and Steam from renewable sources

  export const columns4 = [
    {
      label: "Disposal Method",
      dataIndex: "disposal_method",
      headerClass:
        "px-4 py-2 text-[14px] text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
      cellClass:
        "px-4 py-2 border-y text-slate-500 font-normal text-sm w-[13%] text-left h-14",
    },
    {
      label: "Material Type",
      dataIndex: "material_type",
      headerClass: "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Qty of total waste",
      dataIndex: "total_waste",
      headerClass: "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "% of total waste ",
      dataIndex: "contribution",
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
      method: "Incineration",
      type: "Chemical",
      total: "x",
      contribution: "X%",
      units: "Metric tons (t)",
    },
    {
      method: "Landfiling",
      type: "Organic",
      total: "x",
      contribution: "X%",
      units: "Metric tons (t)",
    },
    {
      method: "Other",
      type: "Oil",
      total: "x",
      contribution: "X%",
      units: "Metric tons (t)",
    },
    {
      type: "E-Waste",
      total: "x",
      contribution: "X%",
      units: "Metric tons (t)",
    },
    {
      type: "Total",
      contribution: "X%",
      total: "x",
      totalrow: 3,
      maprow:1,
      units: "Metric tons (t)",
    },
  ];

  // -------------------Direct Purchased Heating, Cooling, Electricity and Steam from non-renewable sources

  export const columns5 = [
    {
      label: "Recovery operation",
      dataIndex: "method",
      headerClass:
        "px-4 py-2 text-[14px] text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
      cellClass:
        "px-4 py-2 border-y text-slate-500 font-normal text-sm w-[13%] text-left h-14",
    },
    {
      label: "Material Type",
      dataIndex: "type",
      headerClass: "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Qty of total waste",
      dataIndex: "total",
      headerClass: "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "% of total waste ",
      dataIndex: "contribution",
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
      method: "Reuse ",
      type: "Chemical",
      total: "x",
      contribution: "X%",
      units: "Metric tons (t)",
    },
    {
      method: "Recycle",
      type: "Organic",
      total: "x",
      contribution: "X%",
      units: "Metric tons (t)",
    },
    {
      method: "Other",
      type: "Oil",
      total: "x",
      contribution: "X%",
      units: "Metric tons (t)",
    },
    {
      type: "E-Waste",
      total: "x",
      contribution: "X%",
      units: "Metric tons (t)",
    },
    {
      type: "Total",
      contribution: "X%",
      total: "x",
      totalrow: 3,
      maprow:1,
      units: "Metric tons (t)",
    },
  ];

  // --------------------Self Generated Energy - not consumed or sold (Renewable Energy)

  export const columns6 = [
    {
      label: "Waste Type",
      dataIndex: "type",
      headerClass:
        "px-4 py-2 text-[14px] text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
      cellClass:
        "px-4 py-2 border-y text-slate-500 font-normal text-sm w-[13%] text-left h-14",
    },
    {
      label: "Quantity",
      dataIndex: "total",
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
    {
      label: "Recycled %",
      dataIndex: "recycled",
      headerClass:
        "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tr-lg",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Preparation of reuse %",
      dataIndex: "preparation",
      headerClass:
        "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tr-lg",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Other recovery options  %",
      dataIndex: "otherrecovery",
      headerClass:
        "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tr-lg",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Site",
      dataIndex: "site",
      headerClass:
        "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tr-lg",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
  ];

  export const data6 = [
    {
      type: "Chemical Waste",
      total:"x",
      units: "Metric tons (t)",
      recycled: "x%",
      preparation: "x%",
      otherrecovery:"x%",
      site:"On-site",


    },
    {
      type: "Used Oil",
      total:"x",
      units: "Metric tons (t)",
      recycled: "x%",
      preparation: "x%",
      otherrecovery:"x%",
      site:"On-site",

    },
    {
      type: "E-Waste",
      total:"x",
      units: "Metric tons (t)",
      recycled: "x%",
      preparation: "x%",
      otherrecovery:"x%",
      site:"On-site",

    },
    {
      type: "Total",
      total: "212123545",
      units: "Metric tons (t)",
      totalrow: 6,
      recycled: "x%",
      preparation: "x%",
      otherrecovery:"x%",
      site:"On-site",

    },
  ];

  //Self Generated Energy - not consumed or sold (non-renewable Energy)

  export const columns7 = [
    {
      label: "Waste Type",
      dataIndex: "type",
      headerClass:
        "px-4 py-2 text-[14px] text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
      cellClass:
        "px-4 py-2 border-y text-slate-500 font-normal text-sm w-[13%] text-left h-14",
    },
    {
      label: "Quantity",
      dataIndex: "total",
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
    {
      label: "Recycled %",
      dataIndex: "recycled",
      headerClass:
        "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tr-lg",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Preparation of reuse %",
      dataIndex: "preparation",
      headerClass:
        "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tr-lg",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Other recovery options  %",
      dataIndex: "otherrecovery",
      headerClass:
        "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tr-lg",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Site",
      dataIndex: "site",
      headerClass:
        "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tr-lg",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
  ];

  export const data7 = [
    {
      type: "Paper",
      total:"x",
      units: "Metric tons (t)",
      recycled: "x%",
      preparation: "x%",
      otherrecovery:"x%",
      site:"On-site",


    },
    {
      type: "Paper",
      total:"x",
      units: "Metric tons (t)",
      recycled: "x%",
      preparation: "x%",
      otherrecovery:"x%",
      site:"On-site",

    },
    {
      type: "waste3",
      total:"x",
      units: "Metric tons (t)",
      recycled: "x%",
      preparation: "x%",
      otherrecovery:"x%",
      site:"On-site",

    },
    {
      type: "Total",
      total: "212123545",
      units: "Metric tons (t)",
      totalrow: 6,
      recycled: "x%",
      preparation: "x%",
      otherrecovery:"x%",
      site:"On-site",

    },
  ];
  // -------------------------Energy Sold (Renewable energy)

  export const columns8 = [
    {
      label: "Waste Type",
      dataIndex: "type",
      headerClass:
        "px-4 py-2 text-[14px] text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
      cellClass:
        "px-4 py-2 border-y text-slate-500 font-normal text-sm w-[13%] text-left h-14",
    },
    {
      label: "Quantity",
      dataIndex: "total",
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
    {
      label: "Incineration (with energy) %",
      dataIndex: "incinerationwithenergy",
      headerClass:
        "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tr-lg",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Incineration (without energy) %",
      dataIndex: "incinerationwithoutenergy",
      headerClass:
        "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tr-lg",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Landfill %",
      dataIndex: "landfill",
      headerClass:
        "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tr-lg",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Other disposal method  %",
      dataIndex: "otherdisposal",
      headerClass:
        "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tr-lg",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "External Vendor",
      dataIndex: "externalvendor",
      headerClass:
        "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tr-lg",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Site",
      dataIndex: "site",
      headerClass:
        "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tr-lg",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
  ];

  export const data8 = [
    {
      type: "Paper",
      total:"x",
      units: "Metric tons (t)",
      incinerationwithenergy: "x%",
      incinerationwithoutenergy: "x%",
      landfill:"x%",
      otherdisposal:"x%",
      externalvendor:"x%",
      site:"On-site",


    },
    {
      type: "Paper",
      total:"x",
      units: "Metric tons (t)",
      incinerationwithenergy: "x%",
      incinerationwithoutenergy: "x%",
      landfill:"x%",
      otherdisposal:"x%",
      externalvendor:"x%",
      site:"On-site",

    },
    {
      type: "waste3",
      total:"x",
      units: "Metric tons (t)",
      incinerationwithenergy: "x%",
      incinerationwithoutenergy: "x%",
      landfill:"x%",
      otherdisposal:"x%",
      externalvendor:"x%",
      site:"On-site",

    },
    {
      type: "Total",
      total: "212123545",
      units: "Metric tons (t)",
      totalrow: 9,
      incinerationwithenergy: "x%",
      incinerationwithoutenergy: "x%",
      landfill:"x%",
      otherdisposal:"x%",
      externalvendor:"x%",
      site:"On-site",

    },
  ];

  // --------------------- Energy Sold (non-renewable energy)

  export const columns9 = [
    {
      label: "Waste Type",
      dataIndex: "type",
      headerClass:
        "px-4 py-2 text-[14px] text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
      cellClass:
        "px-4 py-2 border-y text-slate-500 font-normal text-sm w-[13%] text-left h-14",
    },
    {
      label: "Quantity",
      dataIndex: "total",
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
    {
      label: "Incineration (with energy) %",
      dataIndex: "incinerationwithenergy",
      headerClass:
        "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tr-lg",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Incineration (without energy) %",
      dataIndex: "incinerationwithoutenergy",
      headerClass:
        "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tr-lg",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Landfill %",
      dataIndex: "landfill",
      headerClass:
        "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tr-lg",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Other disposal method  %",
      dataIndex: "otherdisposal",
      headerClass:
        "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tr-lg",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "External Vendor",
      dataIndex: "externalvendor",
      headerClass:
        "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tr-lg",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
    {
      label: "Site",
      dataIndex: "site",
      headerClass:
        "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tr-lg",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
    },
  ];

  export const data9 = [
    {
      type: "Paper",
      total:"x",
      units: "Metric tons (t)",
      incinerationwithenergy: "x%",
      incinerationwithoutenergy: "x%",
      landfill:"x%",
      otherdisposal:"x%",
      externalvendor:"x%",
      site:"On-site",


    },
    {
      type: "Paper",
      total:"x",
      units: "Metric tons (t)",
      incinerationwithenergy: "x%",
      incinerationwithoutenergy: "x%",
      landfill:"x%",
      otherdisposal:"x%",
      externalvendor:"x%",
      site:"On-site",

    },
    {
      type: "waste3",
      total:"x",
      units: "Metric tons (t)",
      incinerationwithenergy: "x%",
      incinerationwithoutenergy: "x%",
      landfill:"x%",
      otherdisposal:"x%",
      externalvendor:"x%",
      site:"On-site",

    },
    {
      type: "Total",
      total: "212123545",
      units: "Metric tons (t)",
      totalrow: 9,
      incinerationwithenergy: "x%",
      incinerationwithoutenergy: "x%",
      landfill:"x%",
      otherdisposal:"x%",
      externalvendor:"x%",
      site:"On-site",

    },
  ];



