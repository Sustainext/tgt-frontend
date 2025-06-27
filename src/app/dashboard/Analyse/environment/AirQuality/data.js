export const columns1 = [
    {
        label: "S.No",
        dataIndex: "SNO",
        headerClass:
          "px-4 py-2 text-[12px]  text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
        cellClass:
          "px-4 py-2 border-y text-slate-500 font-normal text-[12px]  w-[13%] text-left",
      },
    {
      label: "Air Pollutants",
      dataIndex: "pollutant",
      headerClass:
        "px-4 py-2 text-[12px]  text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
      cellClass:
        "px-4 py-2 border-y text-slate-500 font-normal text-[12px]  w-[13%] text-left",
    },
    {
      label: "Total Emissions",
      dataIndex: "total_emission_kg",
      headerClass: "px-2 py-2 text-[12px]  text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
    },
    {
      label: "Contribution %",
      dataIndex: "contribution",
      headerClass: "px-2 py-2 text-[12px]  text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
    },
    {
      label: "Source of emission factor",
      dataIndex: "source_of_emission",
      headerClass: "px-2 py-2 text-[12px]  text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
    },
  ];


  export const columns2 = [
    {
        label: "S.No",
        dataIndex: "SNO",
        headerClass:
          "px-4 py-2 text-[12px]  text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
        cellClass:
          "px-4 py-2 border-y text-slate-500 font-normal text-[12px]  w-[13%] text-left",
      },
    {
        label: "Air Pollutants",
        dataIndex: "pollutant",
        headerClass:
          "px-4 py-2 text-[12px]  text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
        cellClass:
          "px-4 py-2 border-y text-slate-500 font-normal text-[12px]  w-[13%] text-left",
      },
      {
        label: "Total Emissions",
        dataIndex: "total_emission",
        headerClass: "px-2 py-2 text-[12px]  text-[#727272] w-[10%] text-center",
        cellClass:
          "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
      },
      {
        label: "Source of emission factor",
        dataIndex: "source_of_emission",
        headerClass: "px-2 py-2 text-[12px]  text-[#727272] w-[10%] text-center",
        cellClass:
          "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
      },
  ];

  columns2.totalLabelKey="Average emission"


  export let columns3 = [
    {
        label: "S.No",
        dataIndex: "SNO",
        headerClass:
          "px-4 py-2 text-[12px]  text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
        cellClass:
          "px-4 py-2 border-y text-slate-500 font-normal text-[12px]  w-[13%] text-left",
      },
    {
      label: "Location",
      dataIndex: "location",
      headerClass:
        "px-4 py-2 text-[12px]  text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
      cellClass:
        "px-4 py-2 border-y text-slate-500 font-normal text-[12px]  w-[13%] text-left",
    },
    {
      label: "NOx",
      dataIndex: "NOx",
      headerClass: "px-2 py-2 text-[12px]  text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
    },
    {
        label: "SOx",
        dataIndex: "SOx",
        headerClass: "px-2 py-2 text-[12px]  text-[#727272] w-[10%] text-center",
        cellClass:
          "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
      },

      {
        label: "Persistent organic pollutants (POP)",
        dataIndex: "Persistent organic pollutants (POP)",
        headerClass: "px-2 py-2 text-[12px]  text-[#727272] w-[10%] text-center",
        cellClass:
          "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
      },

      {
        label: "Volatile organic compounds (VOC)",
        dataIndex: "Volatile organic compounds (VOC)",
        headerClass: "px-2 py-2 text-[12px]  text-[#727272] w-[10%] text-center",
        cellClass:
          "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
      },

      {
        label: "Hazardous air pollutants (HAP)",
        dataIndex: "Hazardous air pollutants (HAP)",
        headerClass: "px-2 py-2 text-[12px]  text-[#727272] w-[10%] text-center",
        cellClass:
          "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
      },
      {
        label: "Particulate matter (PM 2.5)",
        dataIndex: "Particulate matter (PM 2.5)",
        headerClass: "px-2 py-2 text-[12px]  text-[#727272] w-[10%] text-center",
        cellClass:
          "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
      },
       {
        label: "Carbon Monoxide(CO)",
        dataIndex: "Carbon Monoxide(CO)",
        headerClass: "px-2 py-2 text-[12px]  text-[#727272] w-[10%] text-center",
        cellClass:
          "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
      },
  ];


  export let columns4 = [
    {
        label: "S.No",
        dataIndex: "SNO",
        headerClass:
          "px-4 py-2 text-[12px]  text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
        cellClass:
          "px-4 py-2 border-y text-slate-500 font-normal text-[12px]  w-[13%] text-left",
      },
    {
      label: "Location",
      dataIndex: "location",
      headerClass:
        "px-4 py-2 text-[12px]  text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
      cellClass:
        "px-4 py-2 border-y text-slate-500 font-normal text-[12px]  w-[13%] text-left",
    },
    {
      label: "NOx",
      dataIndex: "NOx",
      headerClass: "px-2 py-2 text-[12px]  text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
    },
    {
        label: "SOx",
        dataIndex: "SOx",
        headerClass: "px-2 py-2 text-[12px]  text-[#727272] w-[10%] text-center",
        cellClass:
          "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
      },

      {
        label: "Persistent organic pollutants (POP)",
        dataIndex: "Persistent organic pollutants (POP)",
        headerClass: "px-2 py-2 text-[12px]  text-[#727272] w-[10%] text-center",
        cellClass:
          "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
      },

      {
        label: "Volatile organic compounds (VOC)",
        dataIndex: "Volatile organic compounds (VOC)",
        headerClass: "px-2 py-2 text-[12px]  text-[#727272] w-[10%] text-center",
        cellClass:
          "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
      },

      {
        label: "Hazardous air pollutants (HAP)",
        dataIndex: "Hazardous air pollutants (HAP)",
        headerClass: "px-2 py-2 text-[12px]  text-[#727272] w-[10%] text-center",
        cellClass:
          "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
      },
      {
        label: "Particulate matter (PM 2.5)",
        dataIndex: "Particulate matter (PM 2.5)",
        headerClass: "px-2 py-2 text-[12px]  text-[#727272] w-[10%] text-center",
        cellClass:
          "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
      },
       {
        label: "Carbon Monoxide(CO)",
        dataIndex: "Carbon Monoxide(CO)",
        headerClass: "px-2 py-2 text-[12px]  text-[#727272] w-[10%] text-center",
        cellClass:
          "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
      },
  ];

  export let columns5 = [
    {
        label: "S.No",
        dataIndex: "SNO",
        headerClass:
          "px-4 py-2 text-[12px]  text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
        cellClass:
          "px-4 py-2 border-y text-slate-500 font-normal text-[12px]  w-[13%] text-left",
      },
    {
      label: "Location",
      dataIndex: "location",
      headerClass:
        "px-4 py-2 text-[12px]  text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
      cellClass:
        "px-4 py-2 border-y text-slate-500 font-normal text-[12px]  w-[13%] text-left",
    },
    {
      label: "NOx",
      dataIndex: "NOx",
      headerClass: "px-2 py-2 text-[12px]  text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
    },
    {
        label: "SOx",
        dataIndex: "SOx",
        headerClass: "px-2 py-2 text-[12px]  text-[#727272] w-[10%] text-center",
        cellClass:
          "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
      },

      {
        label: "Persistent organic pollutants (POP)",
        dataIndex: "Persistent organic pollutants (POP)",
        headerClass: "px-2 py-2 text-[12px]  text-[#727272] w-[10%] text-center",
        cellClass:
          "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
      },

      {
        label: "Volatile organic compounds (VOC)",
        dataIndex: "Volatile organic compounds (VOC)",
        headerClass: "px-2 py-2 text-[12px]  text-[#727272] w-[10%] text-center",
        cellClass:
          "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
      },

      {
        label: "Hazardous air pollutants (HAP)",
        dataIndex: "Hazardous air pollutants (HAP)",
        headerClass: "px-2 py-2 text-[12px]  text-[#727272] w-[10%] text-center",
        cellClass:
          "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
      },
      {
        label: "Particulate matter (PM 2.5)",
        dataIndex: "Particulate matter (PM 2.5)",
        headerClass: "px-2 py-2 text-[12px]  text-[#727272] w-[10%] text-center",
        cellClass:
          "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
      },
       {
        label: "Carbon Monoxide(CO)",
        dataIndex: "Carbon Monoxide(CO)",
        headerClass: "px-2 py-2 text-[12px]  text-[#727272] w-[10%] text-center",
        cellClass:
          "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
      },
  ];

  export const columns6 = [
    {
        label: "S.No",
        dataIndex: "SNO",
        headerClass:
          "px-4 py-2 text-[12px]  text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
        cellClass:
          "px-4 py-2 border-y text-slate-500 font-normal text-[12px]  w-[10%] text-left",
      },
    {
      label: "Source",
      dataIndex: "source",
      headerClass:
        "px-4 py-2 text-[12px]  text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
      cellClass:
        "px-4 py-2 border-y text-slate-500 font-normal text-[12px]  w-[10%] text-left",
    },
    {
      label: "ODS",
      dataIndex: "ods",
      headerClass: "px-2 py-2 text-[12px]  text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
    },
    {
        label: "Net ODS Emitted (tCFC-11e)",
        dataIndex: "net_ods_emitted",
        headerClass: "px-2 py-2 text-[12px]  text-[#727272] w-[10%] text-center",
        cellClass:
          "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
      },

      {
        label: "Contribution %",
        dataIndex: "contribution_percentage",
        headerClass: "px-2 py-2 text-[12px]  text-[#727272] w-[10%] text-center",
        cellClass:
          "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
      },

      {
        label: "ODS Production (t)",
        dataIndex: "net_ods_production_ton",
        headerClass: "px-2 py-2 text-[12px]  text-[#727272] w-[10%] text-center",
        cellClass:
          "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
      },

      {
        label: "ODS Import (t)",
        dataIndex: "total_ods_imported_ton",
        headerClass: "px-2 py-2 text-[12px]  text-[#727272] w-[10%] text-center",
        cellClass:
          "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
      },
      {
        label: "ODS Export (t)",
        dataIndex: "total_ods_exported_ton",
        headerClass: "px-2 py-2 text-[12px]  text-[#727272] w-[10%] text-center",
        cellClass:
          "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
      },
       {
        label: "Source of emission factor used",
        dataIndex: "source_of_emission_factor",
        headerClass: "px-2 py-2 text-[12px]  text-[#727272] w-[10%] text-center",
        cellClass:
          "px-4 py-2 border-y text-center text-slate-500 font-normal text-[12px] ",
      },
  ];

  columns6.totalLabelKey="Total"


 