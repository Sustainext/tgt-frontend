export const scope1Info = [
    {
      Category: [
        { name: 'Stationary Combustion', SubCategory: ['Fuel'] },
        {
          name: 'Mobile Combustion',
          SubCategory: ['Fuel', 'Vehicles', 'Road Travel', 'Rail Freight'],
        },
        {
          name: 'Refrigerants and Fugitive Gases',
          SubCategory: ['Refrigerants and Fugitive Gases'],
        },
      ],
      AssignTo: [
        'Human Resources',
        'Administration',
        'Procurement',
        'Operations',
        'Information Technology ',
        'Finance and Accounts',
      ],
    },
  ];
  
  export const scope2Info = [
    {
      Category: [
        {
          name: 'Purchased Electricity',
          SubCategory: ['Electricity', 'Energy Services', 'Utilities'],
        },
        {
          name: 'Purchased Heat & Steam',
          SubCategory: ['Heat and Steam', 'Energy Services', 'Utilities'],
        },
        {
          name: 'Purchased Cooling',
          SubCategory: ['Electricity', 'Energy Services', 'Utilities'],
        },
      ],
      AssignTo: [
        'Human Resources',
        'Administration',
        'Procurement',
        'Operations',
        'Information Technology ',
        'Finance and Accounts',
      ],
    },
  ];
  
  export const scope3Info = [
    {
      Category: [
        {
          name: 'Purchased Goods & Services',
          SubCategory: [
            'Agriculture/Hunting/Forestry/Fishing',
            'Arable Farming',
            'Building Materials',
            'Ceramic Goods',
            'Chemical Products',
            'Clothing and Footwear',
            'Cloud Computing - CPU',
            'Cloud Computing - Memory',
            'Cloud Computing - Networking',
            'Cloud Computing - Storage',
            'Consumer Goods Rental',
            'DIY and Gardening Equipment',
            'Domestic Services',
            'Education',
            'Electrical Equipment',
            'Electronics',
            'Equipment Rental',
            'Fabricated Metal Products',
            'Financial Services',
            'Fishing/Aquaculture/Hunting',
            'Food and Beverage Services',
            'Food/Beverages/Tobacco',
            'Furnishings and Household',
            'General Retail',
            'Glass and Glass Products',
            'Government Activities',
            'Health and Social Care',
            'Health Care',
            'Housing',
            'Information and Communication Services',
            'Insurance Services',
            'Livestock Farming',
            'Machinery',
            'Maintenance and Repair',
            'Manufacturing',
            'Metals',
            'Mined Materials',
            'Mining',
            'Non-profit Activities',
            'Office Equipment',
            'Operational Activities',
            'Organic Products',
            'Other Materials',
            'Paper and Cardboard',
            'Paper Products',
            'Pavement and Surfacing',
            'Personal Care and Accessories',
            'Plastics and Rubber Products',
            'Professional Services and Activities',
            'Real Estate',
            'Recreation and Culture',
            'Social Care',
            'Textiles',
            'Timber and Forestry Products',
            'Utilities',
            'Vehicle Maintenance and Services',
            'Vehicle Parts',
            'Waste Management',
            'Water Supply',
            'Water Treatment',
            'Wholesale Trade',
          ],
        },
        {
          name: 'Capital Goods',
          SubCategory: [
            'Construction',
            'Electrical Equipment',
            'Electronics',
            'Furnishings and Household',
            'Health Care',
            'Machinery',
            'Office Equipment',
          ],
        },
        {
          name: 'Fuel & Energy Related Activities',
          SubCategory: ['Electricity', 'Fuel'],
        },
        {
          name: 'Upstream Transportation & Distribution',
          SubCategory: [
            'Air Freight',
            'Energy Services',
            'Rail Freight',
            'Road Freight',
            'Sea Freight',
            'Transport Services and Warehousing',
            'Vehicles',
          ],
        },
        {
          name: 'Waste Generated in Operations',
          SubCategory: [
            'Construction Waste',
            'Electrical Waste',
            'Food and Organic Waste',
            'General Waste',
            'Glass Waste',
            'Metal Waste',
            'Paper and Cardboard Waste',
            'Plastic Waste',
            'Waste Management',
            'Water Treatment',
          ],
        },
        {
          name: 'Business Travel',
          SubCategory: [
            'Restaurants and Accommodation',
            'Accommodation',
            'Road Travel',
            'Air Travel',
            'Rail Travel',
            'Road Travel',
            'Sea Travel',
            'Tickets and Passes',
            'Vehicles',
          ],
        },
        {
          name: 'Employee Commuting',
          SubCategory: [
            'Homeworking',
            'Rail Travel',
            'Road Travel',
            'Tickets and Passes',
            'Vehicles',
          ],
        },
        {
          name: 'Upstream Leased Assets',
          SubCategory: ['Facility', 'Housing', 'Real Estate'],
        },
        {
          name: 'Downstream Transportation & Distribution',
          SubCategory: [
            'Air Freight',
            'Energy Services',
            'Infrastructure',
            'Rail Freight',
            'Road Freight',
            'Sea Freight',
            'Transport Services and Warehousing',
          ],
        },
        {
          name: 'Processing of Sold Products',
          SubCategory: [
            'Cloud Computing - CPU',
            'Cloud Computing - Memory',
            'Cloud Computing - Networking',
            'Cloud Computing - Storage',
            'Information and Communication Services',
          ],
        },
  
        {
          name: 'End of Life Treatment of Sold Products',
          SubCategory: ['Electricity', 'Fuel'],
        },
        {
          name: 'Downstream Leased Assets',
          SubCategory: ['Equipment Rental', 'Facility', 'Housing', 'Real Estate'],
        },
      ],
      AssignTo: [
        'Human Resources',
        'Administration',
        'Procurement',
        'Operations',
        'Information Technology ',
        'Finance and Accounts',
      ],
    },
  ];
  
  const AssignTo = [
    'Human Resources',
    'Administration',
    'Procurement',
    'Operations',
    'Information Technology ',
    'Finance and Accounts',
  ];
  
  function getRandomIndex(array) {
    return Math.floor(Math.random() * array?.length);
  }
  
  // Create the static array of objects
  export const TaskArray = [];
  
  const statusOptions = [
    'assigned',
    'to be reviewed',
    'completed',
    'approved',
    'under review',
  ];
  
  // Generate a random date within a given range
  const getRandomDate = (startDate, endDate) => {
    const startTimestamp = new Date(startDate).getTime();
    const endTimestamp = new Date(endDate).getTime();
    const randomTimestamp =
      startTimestamp + Math.random() * (endTimestamp - startTimestamp);
    return new Date(randomTimestamp).toISOString().split('T')[0];
  };
  
  export const getData = () => {
    let sNoCounter = 1;
  
    [scope1Info, scope2Info, scope3Info].forEach((scopeInfo) => {
      scopeInfo?.forEach((scopeItem) => {
        const categorySubcategories = scopeItem?.Category;
        categorySubcategories?.forEach((categorySubcategory, index) => {
          const name = `${categorySubcategory?.name}-${
            categorySubcategory?.SubCategory[0] || 'Other'
          }`;
          const assignedTo = AssignTo[getRandomIndex(scopeItem.AssignTo)];
          const status =
            statusOptions[Math.floor(Math.random() * statusOptions.length)];
          const assignedOn = getRandomDate('2022-01-01', '2023-12-31');
  
          TaskArray.push({
            s_no: sNoCounter,
            name,
            assigned_to: assignedTo,
            assigned_on: assignedOn,
            status,
          });
          sNoCounter++;
        });
      });
    });
  };