'use client'
import React, { useState, useEffect } from 'react';
import { scope1Info,scope2Info, scope3Info } from './scopeInfo';
import axios from 'axios';
const CombinedWidget = ({ value = {}, onChange }) => {
  const [category, setCategory] = useState(value.Category || '');
  const [subcategory, setSubcategory] = useState(value.Subcategory || '');
  const [activity, setActivity] = useState(value.Activity || '');
  const [quantity, setQuantity] = useState(value.Quantity || '');
  const [unit, setUnit] = useState(value.Unit || '');
  const [subcategories, setSubcategories] = useState([]);
  const [activities, setActivities] = useState([]);
  const [units, setUnits] = useState([]);
  const [base_categories, setBaseCategories] = useState([])
  
  useEffect(() => {
    console.log('category selected is', category)
    console.log('subcategory selected is', subcategory)
  }, [category, subcategory]);


  async function fetchActivities() {
    // console.log("Fetching activities", page);
    console.log(process.env, ' is the climatiq key')
    const baseURL = "https://api.climatiq.io";
    const resultsPerPage = 500;
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_APP_CLIMATIQ_KEY}`,
        Accept: "application/json",
        "Content-type": "application/json",
      },
    };
    const region = "US";
    let currentYear = '2023';
    let activitiesData=[];
    // let totalResults = 0;
    // let totalPages;

    try {

      const url = `${baseURL}/data/v1/search?results_per_page=500&year=${currentYear}&region=${region}*&category=${subcategory}&page=1&data_version=^${process.env.NEXT_PUBLIC_APP_CLIMATIQ_DATAVERSION}`;
      console.log(url, 'is the url')
      const response = await axios.get(url, axiosConfig);
      console.log(response.data, ' climatiq data ...')
      activitiesData = response.data.results;
      setActivities(activitiesData)

    } catch (error) {
      // ! Throws Error if couldn't fetch data
      console.error("Error fetching data from different regions: ", error);
      throw error;
    }
  }

  useEffect(() => {
    fetchActivities()
  }, [subcategory]);

  useEffect(() => {
    console.log('fetched activities are ', activities)
  }, [activities]);

  useEffect(()=>{
    console.log(
      'scope1Info is loading '
    )
    const b_categories = scope1Info[0].Category.map(item => item.name);
    setBaseCategories(b_categories)
  },[])

  useEffect(()=>{
    console.log(base_categories, ' is baseCategories')
  },[base_categories])
  
  useEffect(()=>{
    console.log(subcategories, 'is the subcategories')
  },[subcategories])

  const handleCategoryChange = (value) => {
    console.log('Handle category change triggered')
    setCategory(value);
    setSubcategory('');
    setActivity('');
    setQuantity('');
    setUnit('');
    const selectedCategory = scope1Info[0].Category.find(item => item.name === value);
    const subCategories = selectedCategory ? selectedCategory.SubCategory : [];
    console.log(subCategories, ' are the subcategories')
    setSubcategories(subCategories)
    onChange({ Category: value, Subcategory: '', Activity: '', Quantity: '', Unit: '' });
  };

  const handleSubcategoryChange = (value) => {
    setSubcategory(value);
    setActivity('');
    setQuantity('');
    setUnit('');

    // fetch activities

    onChange({ Category: category, Subcategory: value, Activity: '', Quantity: '', Unit: '' });
  };

  const handleActivityChange = (value) => {
    setActivity(value);
    setQuantity('');
    setUnit('');

    onChange({ Category: category, Subcategory: subcategory, Activity: value, Quantity: '', Unit: '' });
  };

  const handleQuantityChange = (value) => {
    setQuantity(value);
    onChange({ Category: category, Subcategory: subcategory, Activity: activity, Quantity: value, Unit: unit });
  };

  const handleUnitChange = (value) => {
    setUnit(value);
    onChange({ Category: category, Subcategory: subcategory, Activity: activity, Quantity: quantity, Unit: value });
  };

  return (
    <div className='flex mb-5'>
      <div>
      <select
        value={category}
        onChange={(e) => handleCategoryChange(e.target.value)}
        className="block w-[180px] py-2 text-sm leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300"
      >
        <option value="">Select Category</option>
            {base_categories.map((categoryName, index) => (
                <option key={index} value={categoryName}>{categoryName}</option>
            ))}
      </select>
      </div>

<div>
<select
        value={subcategory}
        onChange={(e) => handleSubcategoryChange(e.target.value)}
        className="block w-[180px] py-2 mx-2 text-sm leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300"
      >
        <option value="">Select Subcategory</option>
        {subcategories.map((sub, index) => (
          <option key={index} value={sub}>{sub}</option>
        ))}
      </select>
</div>

<div>
<select
        value={activity}
        onChange={(e) => handleActivityChange(e.target.value)}
        className="block w-[180px] py-2 mx-2 text-sm leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300"
      >
        <option value="">Select Activity</option>
        {activities.map((item, index) => (
          <option key={index} value={`${item.name} - ( ${item.source} ) - ${item.unit_type}`}
          >{item.name} - ( {item.source} ) - {item.unit_type} -{" "}
          {item.region} - {item.year}</option>
        ))}
      </select>
  </div>

<div>
<div className='flex mx-2'>
        <input
          type="number"
          value={quantity}
          onChange={(e) => handleQuantityChange(e.target.value)}
          className="w-[70px] py-1 mt-2 pl-2 rounded-sm"
        />
        <select
          value={unit}
          onChange={(e) => handleUnitChange(e.target.value)}
          className="w-[70px] ml-1 cursor-pointer appearance-none px-2 py-1 rounded-md leading-tight outline-none mt-1.5 font-bold text-xs bg-sky-600 text-white -ml-11"
        >
          <option value="">Unit</option>
          {units.map((unit, index) => (
            <option key={index} value={unit}>{unit}</option>
          ))}
        </select>
      </div>
</div>

    </div>
  );
};

export default CombinedWidget;
