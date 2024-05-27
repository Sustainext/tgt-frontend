'use client'
import React, { useState, useEffect } from 'react';
const CombinedWidget = ({ value = {}, onChange }) => {
  const [category, setCategory] = useState(value.Category || '');
  const [subcategory, setSubcategory] = useState(value.Subcategory || '');
  const [activity, setActivity] = useState(value.Activity || '');
  const [quantity, setQuantity] = useState(value.Quantity || '');
  const [unit, setUnit] = useState(value.Unit || '');
  const [subcategories, setSubcategories] = useState([]);
  const [activities, setActivities] = useState([]);
  const [units, setUnits] = useState([]);

  useEffect(() => {
    if (category === 'Heating') {
      setSubcategories(['Coal', 'Solar']);
    } else if (category === 'Cooling') {
      setSubcategories(['Electric', 'Natural Gas']);
    } else if (category === 'Steam') {
      setSubcategories(['Generated', 'Purchased']);
    } else {
      setSubcategories([]);
    }
  }, [category]);

  useEffect(() => {
    if (subcategory === 'Coal') {
      setActivities(['Renewable', 'Non-renewable']);
    } else if (subcategory === 'Solar') {
      setActivities(['Photovoltaic', 'Thermal']);
    } else {
      setActivities([]);
    }
  }, [subcategory]);

  useEffect(() => {
    if (activity === 'Renewable' || activity === 'Photovoltaic') {
      setUnits(['Joules', 'KJ']);
    } else if (activity === 'Non-renewable' || activity === 'Thermal') {
      setUnits(['Wh']);
    } else {
      setUnits([]);
    }
  }, [activity]);

  const handleCategoryChange = (value) => {
    setCategory(value);
    setSubcategory('');
    setActivity('');
    setQuantity('');
    setUnit('');
    onChange({ Category: value, Subcategory: '', Activity: '', Quantity: '', Unit: '' });
  };

  const handleSubcategoryChange = (value) => {
    setSubcategory(value);
    setActivity('');
    setQuantity('');
    setUnit('');
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
        <option value="Heating">Heating</option>
        <option value="Cooling">Cooling</option>
        <option value="Steam">Steam</option>
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
        {activities.map((act, index) => (
          <option key={index} value={act}>{act}</option>
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
