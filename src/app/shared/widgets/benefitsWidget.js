import React, { useState, useEffect } from 'react';
import { AiOutlinePlus, AiOutlineDelete, AiOutlineCheck } from 'react-icons/ai';
import {MdOutlineDeleteOutline } from "react-icons/md";
const BenefitSection = ({
  name,
  selectedLocations,
  onLocationToggle,
  onRemove,
  removable,
  editable,
  onNameChange,
  locationdata,
  isSelected,
  onToggleSelect,
}) => {
  const [isOpen, setIsOpen] = useState(editable);

  // Open location box when checkbox is checked
  useEffect(() => {
    setIsOpen(isSelected);
  }, [isSelected]);

  const handleSelectAll = () => {
    const allLocationIds = locationdata.map((loc) => loc.location_id);
    const allSelected = selectedLocations.length === allLocationIds.length;
    const newSelectedLocations = allSelected ? [] : allLocationIds;
    onLocationToggle(name, newSelectedLocations);
  };

  const handleLocationClick = (id) => {
    const isSelected = selectedLocations.includes(id);
    const newSelectedLocations = isSelected
      ? selectedLocations.filter((locId) => locId !== id)
      : [...selectedLocations, id];
    onLocationToggle(name, newSelectedLocations);
  };

  return (
    <div className="p-4 rounded-lg mb-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggleSelect}
            className="form-checkbox text-blue-500 w-4 h-4"
          />
          {isOpen && editable ? (
            <input
              type="text"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
             className="border-b border-gray-300 focus:border-blue-500 focus:outline-none rounded-none p-1 font-[400] text-[15px] text-[#667085]"
              placeholder="Enter benefit name"
             
            />
          ) : (
            <label className="font-[400] text-[15px] text-[#667085]">{name}</label>
          )}
        </div>
        {removable && (
          <button
            onClick={onRemove}
            className="text-red-500 hover:text-red-700 flex items-center gap-1"
          >
            <MdOutlineDeleteOutline size={20} />
          </button>
        )}
      </div>
      <p className="text-[13px] text-[#64748B]">
        Select one or more significant locations of operations applicable
      </p>

      {isOpen && (
        <div className="mt-4">
          <button
            onClick={handleSelectAll}
            className="text-blue-500  mb-2 text-[13px]"
          >
            {selectedLocations.length === locationdata.length ? 'Unselect All' : 'Select All'}
          </button>
          <div className="flex flex-wrap gap-2 border p-4 rounded-lg ">
            {locationdata.map((location) => (
              <button
                key={location.location_id}
                onClick={() => handleLocationClick(location.location_id)}
                className={`flex items-center border rounded-md py-1 gap-1 ${
                  selectedLocations.includes(location.location_id)
                    ? 'bg-[#f0f9ff] border-[#f0f9ff] text-[#0057A5]'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {selectedLocations.includes(location.location_id) ? (
                  <AiOutlineCheck className="text-[#0057A5] mx-2" />
                ) : (
                  <AiOutlinePlus className="text-gray-500 mx-2" />
                )}
                <p className="pr-2">{location.location_name}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const BenefitsWidget = ({ locationdata = [], initialBenefits = [], onBenefitsChange }) => {
    // Default benefits list if initialBenefits is empty
    const defaultBenefits = [
      {
        name: 'Life Insurance',
        selectedLocations: [],
        removable: false,
        editable: false,
        selected: false,
      },
      {
        name: 'Disability & Invalidity Coverage',
        selectedLocations: [],
        removable: false,
        editable: false,
        selected: false,
      },
      {
        name: 'Parental Leave',
        selectedLocations: [],
        removable: false,
        editable: false,
        selected: false,
      },
      {
        name: 'Retirement Provision',
        selectedLocations: [],
        removable: false,
        editable: false,
        selected: false,
      },
      {
        name: 'Stock Ownership',
        selectedLocations: [],
        removable: false,
        editable: false,
        selected: false,
      },
    ];
  
    // Initialize benefits with initialBenefits or defaultBenefits if empty
    const [benefits, setBenefits] = useState(
      initialBenefits.length > 0 ? initialBenefits : defaultBenefits
    );
  
    const addBenefit = () => {
      const newBenefits = [
        ...benefits,
        {
          name: '',
          selectedLocations: [],
          removable: true,
          editable: true,
          selected: true,
        },
      ];
      setBenefits(newBenefits);
      onBenefitsChange(newBenefits); // Update parent form data
    };
  
    const removeBenefit = (index) => {
      const newBenefits = benefits.filter((_, i) => i !== index);
      setBenefits(newBenefits);
      onBenefitsChange(newBenefits);
    };
  
    const handleLocationToggle = (benefitName, newSelectedLocations) => {
      const updatedBenefits = benefits.map((benefit) =>
        benefit.name === benefitName
          ? { ...benefit, selectedLocations: newSelectedLocations }
          : benefit
      );
      setBenefits(updatedBenefits);
      onBenefitsChange(updatedBenefits);
    };
  
    const handleNameChange = (index, newName) => {
      const updatedBenefits = benefits.map((benefit, i) =>
        i === index ? { ...benefit, name: newName } : benefit
      );
      setBenefits(updatedBenefits);
      onBenefitsChange(updatedBenefits);
    };
  
    const toggleSelect = (index) => {
      const updatedBenefits = benefits.map((benefit, i) =>
        i === index ? { ...benefit, selected: !benefit.selected } : benefit
      );
      setBenefits(updatedBenefits);
      onBenefitsChange(updatedBenefits);
    };
  
    return (
      <div>
        {benefits.map((benefit, index) => (
          <BenefitSection
            key={index}
            name={benefit.name}
            selectedLocations={benefit.selectedLocations}
            onLocationToggle={handleLocationToggle}
            onRemove={() => removeBenefit(index)}
            removable={benefit.removable}
            editable={benefit.editable}
            locationdata={locationdata}
            onNameChange={(newName) => handleNameChange(index, newName)}
            isSelected={benefit.selected}
            onToggleSelect={() => toggleSelect(index)}
          />
        ))}
        <button
          onClick={addBenefit}
          className="flex items-center gap-2 mt-4 text-[13px] text-blue-500 ml-3"
        >
         Add More Benefits  <AiOutlinePlus /> 
        </button>
      </div>
    );
  };
  
  export default BenefitsWidget;
  
