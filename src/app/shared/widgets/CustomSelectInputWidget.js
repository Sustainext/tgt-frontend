'use client'
import React, { useState } from 'react';

const CustomSelectInputWidget = ({ id, value = '', required, onChange, schema }) => {
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('');

    const handleNumberChange = (e) => {
        setQuantity(e.target.value);
        updateCombinedValue(e.target.value, unit);
    };

    const handleUnitChange = (e) => {
        setUnit(e.target.value);
        updateCombinedValue(quantity, e.target.value);
    };

    const updateCombinedValue = (quantity, unit) => {
        onChange(`${quantity} ${unit}`.trim());
    };

    // Extract schema options
    const {  unitOptions = [] } = schema || {};

    return (
      <div className="flex justify-center items-center w-full mx-2">
        <input
            type="number"
            className="w-[120px] py-1 mt-2 pl-2 rounded-sm"
            placeholder="Quantity"
            value={quantity}
            onChange={handleNumberChange}
            required={required}
        />
        <select
            className="cursor-pointer appearance-none px-2 py-1 rounded-md leading-tight outline-none mt-1.5 font-bold text-xs bg-sky-600 text-white -ml-10"
            style={{ width: '40px' }}
            value={unit}
            onChange={handleUnitChange}
            required={required}
        >
            <option value="">Unit</option>
            {unitOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
        </select>
      </div>
    );
};

export default CustomSelectInputWidget;

