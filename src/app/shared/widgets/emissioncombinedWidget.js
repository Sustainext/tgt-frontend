import React, { useState, useEffect } from 'react';

const CombinedWidget = ({ formData = {}, onChange }) => {
  const [category, setCategory] = useState(formData.Category || '');
  const [subcategory, setSubcategory] = useState(formData.Subcategory || '');
  const [activity, setActivity] = useState(formData.Activity || '');
  const [quantityUnit, setQuantityUnit] = useState(formData.QuantityUnit || '');
  const [subcategories, setSubcategories] = useState([]);
  const [activities, setActivities] = useState([]);
  const [quantityUnits, setQuantityUnits] = useState([]);

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
    // Define quantity units based on the activity
    if (activity === 'Renewable' || activity === 'Photovoltaic') {
      setQuantityUnits(['Joules', 'KJ']);
    } else if (activity === 'Non-renewable' || activity === 'Thermal') {
      setQuantityUnits(['Wh']);
    } else {
        setQuantityUnits([]);
    }
  }, [activity]);

  const handleCategoryChange = (value) => {
    setCategory(value);
    setSubcategory('');
    setActivity('');
    setQuantityUnit('');
    onChange({ ...formData, Category: value, Subcategory: '', Activity: '', QuantityUnit: '' });
  };

  const handleSubcategoryChange = (value) => {
    setSubcategory(value);
    setActivity('');
    setQuantityUnit('');
    onChange({ ...formData, Subcategory: value, Activity: '', QuantityUnit: '' });
  };

  const handleActivityChange = (value) => {
    setActivity(value);
    setQuantityUnit('');
    onChange({ ...formData, Activity: value, QuantityUnit: '' });
  };

  const handleQuantityUnitChange = (value) => {
    setQuantityUnit(value);
    onChange({ ...formData, QuantityUnit: value });
  };

  return (
    <div className='flex mb-5'>
      <select value={category} onChange={(e) => handleCategoryChange(e.target.value)}   className="block w-[220px] py-2 mx-2 text-sm leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300">
        <option value="">Select Category</option>
        <option value="Heating">Heating</option>
        <option value="Cooling">Cooling</option>
        <option value="Steam">Steam</option>
      </select>

      <select value={subcategory} onChange={(e) => handleSubcategoryChange(e.target.value)}   className="block w-[220px] py-2 mx-2 text-sm leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300">
        <option value="">Select Subcategory</option>
        {subcategories.map((sub, index) => (
          <option key={index} value={sub}>{sub}</option>
        ))}
      </select>

      <select value={activity} onChange={(e) => handleActivityChange(e.target.value)}   className="block w-[220px] py-2 mx-2 text-sm leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300">
        <option value="">Select Activity</option>
        {activities.map((act, index) => (
          <option key={index} value={act}>{act}</option>
        ))}
      </select>

      <div className='flex'>
        <input
          type="text"
          value={quantityUnit}
          onChange={(e) => handleQuantityUnitChange(e.target.value)}
          className="w-[150px] py-1 mt-2 pl-2 rounded-sm"
        />
        <select
          value={quantityUnit}
          onChange={(e) => handleQuantityUnitChange(e.target.value)}
          className="cursor-pointer appearance-none px-2 py-1 rounded-md leading-tight outline-none mt-1.5 font-bold text-xs bg-sky-600 text-white -ml-12"
        >
          <option value="">Unit</option>
          {quantityUnits.map((unit, index) => (
            <option key={index} value={unit}>{unit}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CombinedWidget;
