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

  //Sample for test
  "Agriculture/Hunting/Forestry/Fishing",
];

export const categoryMappings = {
  Accommodation: [
    {
      source: "BEIS",
      year: "2021",
      checkConditions: false,
    },
  ],
  "Clothing and Footwear": [
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: false,
    },
    {
      source: "EPA",
      year: "2018",
      checkConditions: false,
    },
  ],
  "DIY and Gardening Equipment": [
    {
      source: "EPA",
      year: "2019",
      checkConditions: false,
    },
  ],
  "Domestic Services": [
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: false,
    },
  ],
  Education: [
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: false,
    },
  ],
  "Electrical Equipment": [
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: false,
    },
  ],
  "Equipment Rental": [
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: false,
    },
  ],
  "Food and Beverage Services": [
    {
      source: "EPA",
      year: "2019",
      checkConditions: false,
    },
    {
      source: "BEIS",
      year: "2019",
      checkConditions: false,
    },
  ],
  "Furnishings and Household": [
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: false,
    },
    {
      source: "BEIS",
      year: "2020",
      checkConditions: false,
    },
  ],
  "General Retail": [
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: false,
    },
  ],
  "Government Activities": [
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: false,
    },
  ],
  "Health and Social Care": [
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: false,
    },
  ],
  "Information and Communication Services": [
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: false,
    },
    {
      source: "BEIS",
      year: "2020",
      checkConditions: false,
    },
  ],
  "Post and Telecommunication": [
    {
      source: "EXIPOBASE",
      year: "2019",
      checkConditions: false,
    },
  ],
  "Office Equipment": [
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: false,
    },
    {
      source: "EPA",
      year: "2018",
      checkConditions: false,
    },
    {
      source: "EPA",
      year: "2019",
      checkConditions: false,
    },
  ],
  "Paper Products": [
    {
      source: "EPA",
      year: "2018",
      checkConditions: false,
    },
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: false,
    },
    {
      source: "BEIS",
      year: "2020",
      checkConditions: false,
    },
  ],
  "Plastics and Rubber Products": [
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: false,
    },
  ],
  "Waste Management": [
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: false,
    },
  ],
  "Water Treatment": [
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: false,
    },
  ],
  "Restaurants and Accommodation": [
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: false,
    },
  ],
  "Recreation and Culture": [
    {
      source: "EPA",
      year: "2018",
      checkConditions: false,
    },
    {
      source: "EPA",
      year: "2019",
      checkConditions: false,
    },
  ],
  "Consumer Goods and Services": [
    {
      source: "EPA",
      year: "2018",
      checkConditions: false,
    },
  ],
  "Vehicle Maintenance and Services": [
    {
      source: "EPA",
      year: "2019",
      checkConditions: false,
    },
    {
      source: "EXIOBASE",
      year: "2019",
      region: "AU",
      category: "Vehicles",
      checkConditions: false,
    },
    {
      source: "BEIS",
      year: "2020",
      region: "GB",
      category: "Vehicles",
      checkConditions: false,
    },
  ],
  "Road Travel": [
    {
      source: "EPA",
      year: "2019",
      checkConditions: false,
    },
  ],
  "Maintenance and Repair": [
    {
      source: "EPA",
      year: "2018",
      checkConditions: false,
    },
  ],
  // with condition true
  Fuel: [
    {
      source: "UBA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2023", "2024"],
        regions: ["*"],
      },
    },
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: true,
      conditions: {
        years: ["2020", "2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
    {
      source: "Netherlands Enterprise Agency",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["*"],
      },
    },
    {
      source: "ADEME",
      year: "2024",
      checkConditions: true,
      conditions: {
        years: ["2024"],
        regions: ["*"],
      },
    },
  ],
  Electricity: [
    {
      source: "GEMIS",
      year: "2019",
      checkConditions: true,
      conditions: {
        years: ["2020", "2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
    {
      source: "ADEME",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2023", "2024"],
        regions: ["*"],
      },
    },
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: true,
      conditions: {
        years: ["2020", "2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Rail Freight": [
    {
      source: "UBA",
      year: "2020",
      checkConditions: true,
      conditions: {
        years: ["2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Road Freight": [
    {
      source: "UBA",
      year: "2020",
      checkConditions: true,
      conditions: {
        years: ["2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
    {
      source: "ADEME",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Air Freight": [
    {
      source: "UBA",
      year: "2020",
      checkConditions: true,
      conditions: {
        years: ["2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
    {
      source: "ADEME",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Road Travel": [
    {
      source: "UBA",
      year: "2020",
      checkConditions: true,
      conditions: {
        years: ["2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Sea Freight": [
    {
      source: "UBA",
      year: "2020",
      checkConditions: true,
      conditions: {
        years: ["2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
    {
      source: "ADEME",
      year: "2020",
      checkConditions: true,
      conditions: {
        years: ["2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Heat and Steam": [
    {
      source: "UBA",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2023", "2024"],
        regions: ["*"],
      },
    },
    {
      source: "GEMIS",
      year: "2015",
      checkConditions: true,
      conditions: {
        years: [
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
        ],
        regions: ["*"],
      },
    },
  ],
  "Agriculture/Hunting/Forestry/Fishing": [
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: true,
      conditions: {
        years: ["2020", "2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Arable Farming": [
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: true,
      conditions: {
        years: ["2020", "2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Chemical Products": [
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: true,
      conditions: {
        years: ["2020", "2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Consumer Goods Rental": [
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: true,
      conditions: {
        years: ["2020", "2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Fabricated Metal Products": [
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: true,
      conditions: {
        years: ["2020", "2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Financial Services": [
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: true,
      conditions: {
        years: ["2020", "2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Fishing/Aquaculture/Hunting": [
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: true,
      conditions: {
        years: ["2020", "2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Health Care": [
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: true,
      conditions: {
        years: ["2020", "2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  Housing: [
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: true,
      conditions: {
        years: ["2020", "2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Insurance Services": [
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: true,
      conditions: {
        years: ["2020", "2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Livestock Farming": [
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: true,
      conditions: {
        years: ["2020", "2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  Manufacturing: [
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: true,
      conditions: {
        years: ["2020", "2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Mined Materials": [
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: true,
      conditions: {
        years: ["2020", "2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  Mining: [
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: true,
      conditions: {
        years: ["2020", "2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Non-profit Activities": [
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: true,
      conditions: {
        years: ["2020", "2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Operational Activities": [
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: true,
      conditions: {
        years: ["2020", "2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Organic Products": [
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: true,
      conditions: {
        years: ["2020", "2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Other Materials": [
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: true,
      conditions: {
        years: ["2020", "2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Paper and Cardboard": [
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: true,
      conditions: {
        years: ["2020", "2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Personal Care and Accessories": [
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: true,
      conditions: {
        years: ["2020", "2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Real Estate": [
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: true,
      conditions: {
        years: ["2020", "2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Social Care": [
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: true,
      conditions: {
        years: ["2020", "2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Tickets and Passes": [
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: true,
      conditions: {
        years: ["2020", "2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Transport Services and Warehousing": [
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: true,
      conditions: {
        years: ["2020", "2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Vehicle Parts": [
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: true,
      conditions: {
        years: ["2020", "2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Wholesale Trade": [
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: true,
      conditions: {
        years: ["2020", "2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Cloud computing - CPU": [
    {
      source: "CCF",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Cloud computing - Memory": [
    {
      source: "CCF",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Cloud computing - Storage": [
    {
      source: "CCF",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Cloud computing - Networking": [
    {
      source: "CCF",
      year: "2022",
      checkConditions: true,
      conditions: {
        years: ["2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Building Materials": [
    {
      source: "GEMIS",
      year: "2015",
      checkConditions: true,
      conditions: {
        years: [
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
        ],
        regions: ["*"],
      },
    },
    {
      source: "OEKOBAUDAT",
      year: "2017",
      checkConditions: true,
      conditions: {
        years: ["2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Food/Beverages/Tobacco": [
    {
      source: "GEMIS",
      year: "2015",
      checkConditions: true,
      conditions: {
        years: [
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
        ],
        regions: ["*"],
      },
    },
  ],
  Metals: [
    {
      source: "GEMIS",
      year: "2015",
      checkConditions: true,
      conditions: {
        years: [
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
        ],
        regions: ["*"],
      },
    },
  ],
  "Plastic and Rubber Products": [
    {
      source: "GEMIS",
      year: "2015",
      checkConditions: true,
      conditions: {
        years: [
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
        ],
        regions: ["*"],
      },
    },
    {
      source: "OEKOBAUDAT",
      year: "2018",
      checkConditions: true,
      conditions: {
        years: ["2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Rail Travel": [
    {
      source: "ADEME",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  Vehicles: [
    {
      source: "ADEME",
      year: "2020",
      checkConditions: true,
      conditions: {
        years: ["2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
    {
      source: "EXIOBASE",
      year: "2019",
      checkConditions: false,
    },
  ],
  "Air Travel": [
    {
      source: "ADEME",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Electrical Waste": [
    {
      source: "ADEME",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "General Waste": [
    {
      source: "ADEME",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Construction Waste": [
    {
      source: "ADEME",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Plastic Waste": [
    {
      source: "ADEME",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Food and Organic Waste": [
    {
      source: "ADEME",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Metal Waste": [
    {
      source: "ADEME",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Paper and Cardboard Waste": [
    {
      source: "ADEME",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Glass Waste": [
    {
      source: "ADEME",
      year: "2021",
      checkConditions: true,
      conditions: {
        years: ["2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Timber and Forestry Products": [
    {
      source: "OEKOBAUDAT",
      year: "2020",
      checkConditions: true,
      conditions: {
        years: ["2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Furnishings and Household": [
    {
      source: "OEKOBAUDAT",
      year: "2018",
      checkConditions: true,
      conditions: {
        years: ["2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Ceramic Goods": [
    {
      source: "OEKOBAUDAT",
      year: "2018",
      checkConditions: true,
      conditions: {
        years: ["2019", "2020", "2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  Construction: [
    {
      source: "OEKOBAUDAT",
      year: "2018",
      checkConditions: true,
      conditions: {
        years: ["2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Electrical Equipment": [
    {
      source: "OEKOBAUDAT",
      year: "2018",
      checkConditions: true,
      conditions: {
        years: ["2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Energy Services": [
    {
      source: "OEKOBAUDAT",
      year: "2018",
      checkConditions: true,
      conditions: {
        years: ["2019", "2020", "2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  Facility: [
    {
      source: "OEKOBAUDAT",
      year: "2018",
      checkConditions: true,
      conditions: {
        years: ["2019", "2020", "2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Glass and Glass Products": [
    {
      source: "OEKOBAUDAT",
      year: "2018",
      checkConditions: true,
      conditions: {
        years: ["2019", "2020", "2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  Machinery: [
    {
      source: "OEKOBAUDAT",
      year: "2018",
      checkConditions: true,
      conditions: {
        years: ["2019", "2020", "2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Fabricated Metal Materials": [
    {
      source: "OEKOBAUDAT",
      year: "2017",
      checkConditions: true,
      conditions: {
        years: ["2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Mined Minerals": [
    {
      source: "OEKOBAUDAT",
      year: "2018",
      checkConditions: true,
      conditions: {
        years: ["2019", "2020", "2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Paper Products": [
    {
      source: "OEKOBAUDAT",
      year: "2018",
      checkConditions: true,
      conditions: {
        years: ["2019", "2020", "2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Pavement and Surfacing": [
    {
      source: "OEKOBAUDAT",
      year: "2018",
      checkConditions: true,
      conditions: {
        years: ["2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  Storage: [
    {
      source: "OEKOBAUDAT",
      year: "2018",
      checkConditions: true,
      conditions: {
        years: ["2019", "2020", "2021", "2022", "2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  Textiles: [
    {
      source: "OEKOBAUDAT",
      year: "2018",
      checkConditions: true,
      conditions: {
        years: ["2023", "2024"],
        regions: ["*"],
      },
    },
  ],
  "Water Supply": [
    {
      source: "OEKOBAUDAT",
      year: "2018",
      checkConditions: true,
      conditions: {
        years: ["2019", "2020", "2021", "2022", "2023", "2024"],
        regions: ["*"],
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
