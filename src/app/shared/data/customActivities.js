export const categoriesToAppend = [
  // Existing categories
  "Vehicles",
  "Clothing and Footwear",
  "DIY and Gardening Equipment",
  "Domestic Services",
  "Education",
  "Electrical Equipment",
  "Equipment Rental",
  "Food and Beverage Services",
  "Furnishings and Household",
  "General Retail",
  "Government Activities",
  "Health and Social Care",
  "Information and Communication Services",
  "Office Equipment",
  "Plastics and Rubber Products",
  "Professional Services and Activities",
  "Waste Management",
  "Water Treatment",
  "Restaurants and Accommodation",
  "Recreation and Culture",
  "Accommodation",
  "Vehicle Maintenance and Services",
  "Road Travel",
  "Maintenance and Repair",
  "Electronics",
  "Paper Products",

  // From the new list (only the ones not already included)
  "Agriculture/Hunting/Forestry/Fishing",
  "Air Freight",
  "Air Travel",
  "Arable Farming",
  "Building Materials",
  "Ceramic Goods",
  "Chemical Products",
  "Cloud Computing - CPU",
  "Cloud Computing - Memory",
  "Cloud Computing - Networking",
  "Cloud Computing - Storage",
  "Construction",
  "Construction Waste",
  "Consumer Goods Rental",
  "Cooling",
  "Electrical Waste",
  "Electricity",
  "Energy Services",
  "Equipment Repair",
  "Fabricated Metal Products",
  "Financial Services",
  "Fishing/Aquaculture/Hunting",
  "Food and Organic Waste",
  "Food/Beverages/Tobacco",
  "Fuel",
  "General Waste",
  "Glass and Glass Products",
  "Glass Waste",
  "Heat & Steam",
  "Homeworking",
  "Housing",
  "Infrastructure",
  "Insurance Services",
  "Livestock Farming",
  "Machinery",
  "Manufacturing",
  "Metal Waste",
  "Metals",
  "Mined Materials",
  "Mining",
  "Non-profit Activities",
  "Operational Activities",
  "Organic Products",
  "Organizational Activities",
  "Other Materials",
  "Paper and Cardboard",
  "Paper and Cardboard Waste",
  "Pavement and Surfacing",
  "Personal Care and Accessories",
  "Plastic Waste",
  "Rail Freight",
  "Rail Travel",
  "Real Estate",
  "Refrigerants & Fugitive Gases",
  "Road Freight",
  "Sea Freight",
  "Sea Travel",
  "Social Care",
  "Textiles",
  "Timber and Forestry Products",
  "Transport Services and Warehousing",
  "Vehicle Parts",
  "Water Supply",
  "Wholesale Trade",
];

export const categoryMappings = {
  Accommodation: [
    {
      source: "BEIS",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Agriculture/Hunting/Forestry/Fishing": [
    {
      source: "BEIS",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Air Freight": [
    {
      source: "BEIS",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Air Travel": [
    {
      source: "BEIS",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Arable Farming": [
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Building Materials": [
    {
      source: "SEFR",
      year: "2020",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "SEFR",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "BEIS",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Ceramic Goods": [
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Chemical Products": [
    {
      source: "BEIS",
      year: "2023",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Clothing and Footwear": [
    {
      source: "BEIS",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Cloud Computing - CPU": [
    {
      source: "CCF",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Cloud Computing - Memory": [
    {
      source: "CCF",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Cloud Computing - Networking": [
    {
      source: "CCF",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Cloud Computing - Storage": [
    {
      source: "CCF",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  Construction: [
    {
      source: "BEIS",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Construction Waste": [
    {
      source: "BEIS",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Consumer Goods Rental": [
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  Cooling: [
    {
      source: "EPA",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "DIY and Gardening Equipment": [
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Domestic Services": [
    {
      source: "BEIS",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  Education: [
    {
      source: "BEIS",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Electrical Equipment": [
    {
      source: "SEFR",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "BEIS",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Electrical Waste": [
    {
      source: "BEIS",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  Electricity: [
    {
      source: "SEFR (custom)",
      year: "2023",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  Electronics: [
    {
      source: "SEFR",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "BEIS",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Energy Services": [
    {
      source: "BEIS",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Equipment Rental": [
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Equipment Repair": [
    {
      source: "BEIS",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Fabricated Metal Products": [
    {
      source: "BEIS",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Financial Services": [
    {
      source: "BEIS",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Fishing/Aquaculture/Hunting": [
    {
      source: "BEIS",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Food and Beverage Services": [
    {
      source: "BEIS",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Food and Organic Waste": [
    {
      source: "BEIS",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Food/Beverages/Tobacco": [
    {
      source: "BEIS",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  Fuel: [
    {
      source: "BEIS",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Furnishings and Household": [
    {
      source: "BEIS",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "General Retail": [
    {
      source: "BEIS",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "General Waste": [
    {
      source: "BEIS",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Glass and Glass Products": [
    {
      source: "BEIS",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Glass Waste": [
    {
      source: "BEIS",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Government Activities": [
    {
      source: "BEIS",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Health Care": [
    {
      source: "BEIS",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Heat & Steam": [
    {
      source: "BEIS",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  Homeworking: [
    {
      source: "BEIS",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  Housing: [
    {
      source: "BEIS",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Information and Communication Services": [
    {
      source: "BEIS",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  Infrastructure: [
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Insurance Services": [
    {
      source: "BEIS",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Livestock Farming": [
    {
      source: "BEIS",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  Machinery: [
    {
      source: "SEFR",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "BEIS",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Maintenance and Repair": [
    {
      source: "BEIS",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  Manufacturing: [
    {
      source: "BEIS",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Metal Waste": [
    {
      source: "BEIS",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  Metals: [
    {
      source: "BEIS",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Mined Materials": [
    {
      source: "BEIS",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  Mining: [
    {
      source: "BEIS",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Non-profit Activities": [
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Office Equipment": [
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Operational Activities": [
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Organic Products": [
    {
      source: "BEIS",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Organizational Activities": [
    {
      source: "BEIS",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Other Materials": [
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Paper and Cardboard": [
    {
      source: "BEIS",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Paper and Cardboard Waste": [
    {
      source: "BEIS",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Paper Products": [
    {
      source: "BEIS",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Pavement and Surfacing": [
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Personal Care and Accessories": [
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Plastic Waste": [
    {
      source: "BEIS",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Plastics and Rubber Products": [
    {
      source: "BEIS",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Professional Services": [
    {
      source: "BEIS",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Rail Freight": [
    {
      source: "BEIS",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Rail Travel": [
    {
      source: "SEFR",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "BEIS",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Real Estate": [
    {
      source: "BEIS",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Recreation and Culture": [
    {
      source: "BEIS",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Refrigerants & Fugitive Gases": [
    {
      source: "BEIS",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Road Freight": [
    {
      source: "BEIS",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Road Travel": [
    {
      source: "SEFR",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "BEIS",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Sea Freight": [
    {
      source: "BEIS",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Sea Travel": [
    {
      source: "BEIS",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Social Care": [
    {
      source: "BEIS",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  Textiles: [
    {
      source: "BEIS",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Timber and Forestry Products": [
    {
      source: "BEIS",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Transport Services and Warehousing": [
    {
      source: "BEIS",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Vehicle Maintenance and Services": [
    {
      source: "BEIS",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Vehicle Parts": [
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  Vehicles: [
    {
      source: "BEIS",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Waste Management": [
    {
      source: "BEIS",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Water Supply": [
    {
      source: "BEIS",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Water Treatment": [
    {
      source: "SEFR",
      year: "2023",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "BEIS",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
  "Wholesale Trade": [
    {
      source: "BEIS",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
    {
      source: "EPA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["SG"],
      },
    },
  ],
};

// Helper function to check if conditions are met
export const shouldFetchFromCustomMapping = (mapping, params) => {
  if (!mapping.checkConditions) return false;

  const { conditions } = mapping;

  if (!conditions) return false;

  const { years, regions } = conditions;

  const yearMatches = !years || years.includes(params.year);

  const regionMatches =
    !regions ||
    regions.includes("*") ||
    (params.region &&
      regions.some(
        (allowedRegion) => params.region.replace("*", "") === allowedRegion
      ));

  return yearMatches && regionMatches;
};