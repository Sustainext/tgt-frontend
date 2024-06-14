export const columns1 = [
  {
    label: "Total water Consumption",
    dataIndex: "type",
    headerClass:
      "px-4 py-2 text-[14px] text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
    cellClass:
      "px-4 py-2 border-y text-slate-500 font-normal text-sm w-[13%] text-left h-14",
  },
  {
    label: "Water consumption from areas with water stress ",
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

export const data1 = [
  {
    type: "212123545",
    contribution: "Wind",
    units: "Megalitre",
  },
  {
    type: "212123545",
    contribution: "Wind",
    units: "Megalitre",
  },
  {
    type: "212123545",
    contribution: "Wind",
    units: "Megalitre",
  },
  {
    type: "212123545",
    contribution: "Wind",
    units: "Megalitre",
  },
];

// ------------------------Fuel Consumption within the organisation from Non-renewable sources

export const columns2 = [
  {
    label: "Name of water stress area",
    dataIndex: "type",
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
    label: "Water Consumption",
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
];

export const data2 = [
  {
    type: "Raw water",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {
    type: "Raw water",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {
    type: "Raw water",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {
    type: "Raw water",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {
    type: "Total Water Consumption",

    total: "212123545",
    units: "Megalitre",
  },
];

// ------------------------------------Energy Consumption Within the organisation

export const columns3 = [
  {
    label: "Business Operation",
    dataIndex: "type",
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
    label: "Total water Consumption",
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
];

export const data3 = [
  {
    type: "Upstream operations",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {
    type: "Onsite water usage",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {
    type: "downstream operations",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {
    type: "Total Water Consumption",
    contribution: "",

    total: "212123545",
    units: "Megalitre",
  },
];

// ------------------------------Direct Purchased Heating, Cooling, Electricity and Steam from renewable sources

export const columns4 = [
  {
    label: "Location/country",
    dataIndex: "type",
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
    label: "Total water Consumption",
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
];

export const data4 = [
  {
    type: "Location 1",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {
    type: "Location 2",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {
    type: "Location 3",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {
    type: "Total Water Consumption",
    contribution: "",

    total: "212123545",
    units: "Megalitre",
  },
];

// -------------------Direct Purchased Heating, Cooling, Electricity and Steam from non-renewable sources

export const columns5 = [
  {
    label: "Source",
    dataIndex: "type",
    headerClass:
      "px-4 py-2 text-[14px] text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
    cellClass:
      "px-4 py-2 border-y text-slate-500 font-normal text-sm w-[13%] text-left h-14",
  },
  {
    label: "Water Type",
    dataIndex: "water",
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
    label: "Total water Consumption",
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
];

export const data5 = [
  {
    type: "Surface water",
    water:"Freshwater (≤1000 mg/L Total Dissolved Solids)",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {
    type: "Ground Water",
    water:"other water (>1000 mg/L Total Dissolved Solids)",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {
    type: "Sea Water",
    water:"other water (>1000 mg/L Total Dissolved Solids)",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {
    type: "Municipal Water",
    water:"other water (>1000 mg/L Total Dissolved Solids)",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {
    type: "Other (Please specify)",
    water:"other water (>1000 mg/L Total Dissolved Solids)",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {
    type: "Total Water Consumption",
    water:"",
    contribution: "",
    total: "212123545",
    units: "Megalitre",
  },
];

// --------------------Self Generated Energy - not consumed or sold (Renewable Energy)

export const columns6 = [
  {
    label: "Business Operation",
    dataIndex: "type",
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
    label: "Total water withdrawal",
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
];

export const data6 = [
  {
    type: "Upstream operations",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {
    type: "Onsite water usage",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {
    type: "downstream operations",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {
    type: "Total Water Consumption",
    contribution: "",
    total: "212123545",
    units: "Megalitre",
  },
];

//Self Generated Energy - not consumed or sold (non-renewable Energy)

export const columns7 = [
  {
    label: "Source",
    dataIndex: "type",
    headerClass:
      "px-4 py-2 text-[14px] text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
    cellClass:
      "px-4 py-2 border-y text-slate-500 font-normal text-sm w-[13%] text-left h-14",
  },
  {
    label: "Name of Water Stress Area",
    dataIndex: "stressarea",
    headerClass: "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center",
    cellClass:
      "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
  },
  {
    label: "Water Type",
    dataIndex: "water",
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
    label: "Total water withdrawal",
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

];

export const data7 = [
  {
    type: "Surface water",
    stressarea:"x%",
    water:"Freshwater (≤1000 mg/L Total Dissolved Solids)",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {
  type: "Ground Water",
  stressarea:"x%",
  water:"other water (>1000 mg/L Total Dissolved Solids)",
  contribution: "x%",
  total: "212123545",
  units: "Megalitre",
  },
  {
    type: "Sea Water",
    stressarea:"x%",
    water:"other water (>1000 mg/L Total Dissolved Solids)",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
    },
    {
      type: "Municipal Water",
      stressarea:"x%",
      water:"other water (>1000 mg/L Total Dissolved Solids)",
      contribution: "x%",
      total: "212123545",
      units: "Megalitre",
      },
      {
        type: "Other (Please specify)",
        stressarea:"x%",
        water:"other water (>1000 mg/L Total Dissolved Solids)",
        contribution: "x%",
        total: "212123545",
        units: "Megalitre",
        },
        {
          type: "Total Water Consumption",
          stressarea:"",
          water:"",
          contribution: "",
          total: "212123545",
          units: "Megalitre",
          },
];
// -------------------------Energy Sold (Renewable energy)

export const columns8 = [
  {
    label: "Location/country",
    dataIndex: "type",
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
    label: "Total water Withdrawal",
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
];

export const data8 = [
  {
    type: "Location 1",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {
    type: "Location 2",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {
    type: "Location 3",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {
    type: "Total Water Withdrawal",
    contribution: "",

    total: "212123545",
    units: "Megalitre",
  },
];

// --------------------- Energy Sold (non-renewable energy)

export const columns9 = [

  {
    label: "Water Type",
    dataIndex: "water",
    headerClass:
      "px-4 py-2 text-[14px] text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
    cellClass:
      "px-4 py-2 border-y text-slate-500 font-normal text-sm w-[13%] text-left h-14",
  },
  {
    label: "Source",
    dataIndex: "type",
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
    label: "Total water Consumption",
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
];

export const data9 = [
  {
    type: "Surface water",
    water:"Freshwater (≤1000 mg/L Total Dissolved Solids)",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {
    type: "Ground Water",
    water:"other water (>1000 mg/L Total Dissolved Solids)",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },

  {
    type: "Total Water Consumption",
    water:"",
    contribution: "",
    total: "212123545",
    units: "Megalitre",
  },
];

export const columns10 = [
  {
    label: "Source of Water withdrawal from third party",
    dataIndex: "type",
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
    label: "Water Withdrawal",
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
];

export const data10 = [
  {
    type: "Ground water",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {
    type: "Third-party water",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {
    type: "Sea Water",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {
    type: "Municipal Water",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {
    type: "Surface water",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {
    type: "Total Water Withdrawal",
    contribution: "",
    total: "212123545",
    units: "Megalitre",
  },
];
export const columns11 = [
  {
    label: "Location/country",
    dataIndex: "type",
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
    label: "Total water Discharge",
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
];

export const data11 = [
  {
    type: "Location 1",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {
    type: "Location 2",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {
    type: "Location 3",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {
    type: "Total Water Discharge",
    contribution: "",
    total: "212123545",
    units: "Megalitre",
  },
];
export const columns12 = [
  {
    label: "Source",
    dataIndex: "type",
    headerClass:
      "px-4 py-2 text-[14px] text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
    cellClass:
      "px-4 py-2 border-y text-slate-500 font-normal text-sm w-[13%] text-left h-14",
  },
  {
    label: "Type of water",
    dataIndex: "water",
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
    label: "Total water Discharge",
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
];

export const data12 = [
  {
    type: "Surface water",
    water:"Freshwater (≤1000 mg/L Total Dissolved Solids)",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {
    type: "Ground Water",
    water:"other water (>1000 mg/L Total Dissolved Solids)",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {
    type: "Sea Water",
    water:"other water (>1000 mg/L Total Dissolved Solids)",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {
    type: "Municipal Water",
    water:"other water (>1000 mg/L Total Dissolved Solids)",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {
    type: "Other (Please specify)",
    water:"other water (>1000 mg/L Total Dissolved Solids)",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {
    type: "Total Water Consumption",
    water:"",
    contribution: "",
    total: "212123545",
    units: "Megalitre",
  },
];
export const columns13 = [
  {
    label: "Name of Water Stress Area",
    dataIndex: "area",
    headerClass:
      "px-4 py-2 text-[14px] text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
    cellClass:
      "px-4 py-2 border-y text-slate-500 font-normal text-sm w-[13%] text-left h-14",
  },
  {
    label: "Business Operation",
    dataIndex: "type",
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
    label: "Total water Discharge",
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
];

export const data13 = [
  {
    area:"Area 1",
    type: "Upstream operations",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {
    area:"Area 2",
    type: "Onsite water usage",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {
    area:"Area 3",
    type: "downstream operations",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {
    area:"",
    type: "Total Water Consumption",
    contribution: "",
    total: "212123545",
    units: "Megalitre",
  },
];
export const columns14 = [

  {
    label: "Business Operation",
    dataIndex: "type",
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
    label: "Total water Discharge",
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
];

export const data14 = [
  {

    type: "Upstream operations",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {

    type: "Onsite water usage",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {

    type: "downstream operations",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {

    type: "Total Water Consumption",
    contribution: "",
    total: "212123545",
    units: "Megalitre",
  },
];
export const columns15 = [
  {
    label: "Name of Water Stress Area",
    dataIndex: "area",
    headerClass:
      "px-4 py-2 text-[14px] text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
    cellClass:
      "px-4 py-2 border-y text-slate-500 font-normal text-sm w-[13%] text-left h-14",
  },
  {
    label: "Type of water",
    dataIndex: "type",
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
    label: "Total water Discharge",
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
];

export const data15 = [
  {
    area:"Area 1",
    type: "Freshwater (≤1000 mg/L total Dissolved Solids)",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {
    area:"Area 2",
    type: "other water (>1000 mg/L total Dissolved Solids)",
    contribution: "x%",
    total: "212123545",
    units: "Megalitre",
  },
  {
    area:"",
    type: "Total Water Consumption",
    contribution: "",
    total: "212123545",
    units: "Megalitre",
  },
];
export const columns16 = [
  {
    label: "Volume of third-party water send  to use for other organizations",
    dataIndex: "type",
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
    label: "Units",
    dataIndex: "units",
    headerClass:
      "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tr-lg",
    cellClass:
      "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
  },
];

export const data16 = [
  {
    type: "212123545",
    contribution: "Wind",
    units: "Megalitre",
  },
  {
    type: "212123545",
    contribution: "Wind",
    units: "Megalitre",
  },
];
export const columns17 = [
  {
    label: "Units",
    dataIndex: "units",
    headerClass:
      "px-2 py-2 text-[14px] text-[#727272] w-[10%] text-center rounded-tr-lg",
    cellClass:
      "px-4 py-2 border-y text-center text-slate-500 font-normal text-sm",
  },
  {
    label: "Change in water storage",
    dataIndex: "type",
    headerClass:
      "px-4 py-2 text-[14px] text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
    cellClass:
      "px-4 py-2 border-y text-slate-500 font-normal text-sm w-[13%] text-left h-14",
  },



];

export const data17 = [
  {
    type: "212123545",
    units: "Megalitre",
  },
  {
    type: "212123545",
    units: "Megalitre",
  },
];
