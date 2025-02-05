import React, { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaFilter } from "react-icons/fa";

const FilterComponent = ({ data,setData,originalData,setIsFilterOpen,search,setSearch,selectedCreators,setSelectedCreators }) => {

    // const [originalData]=useState(data)

    const uniqueCreators = [...new Set(originalData.map(item => item.created_by))];
 
    // Filter creators based on search term
    const filteredCreators = uniqueCreators.filter(creator =>
        creator.toLowerCase().includes(search.toLowerCase())
    );


    useEffect(() => {
        if (selectedCreators.length > 0) {
            // Filter data based on selected creators
            const filteredData = data.filter(item => selectedCreators.includes(item.created_by));
            setData(filteredData);
        } else {
            // If no creators are selected, show all data
            setData(data);
        }
    }, [selectedCreators]);

     useEffect(() => {
        const handleClickOutside = (event) => {
          if (!event.target.closest(".filter-dropdown")) {
            setIsFilterOpen(false);
          }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, []);

    // Handle checkbox change
    const handleCheckboxChange = (creator) => {
        setSelectedCreators(prev => 
            prev.includes(creator) 
                ? prev.filter(item => item !== creator) 
                : [...prev, creator]
        );
    };

    return (
     

<div className="filter-dropdown absolute w-[250px]  bg-white shadow-xl border border-gray-200 rounded z-10">
<div className="px-3 py-2">
  {/* Title */}
  <div className='flex gap-1'>
    <FaFilter className='w-5 h-5 pt-2' />
    <h3 className="text-left text-[#344054] font-semibold text-[14px] mb-2 pt-2">
    Filter by User
  </h3>
  </div>
  

  {/* Search Input */}
  <input
    type="text"
    placeholder="Search..."
    value={search}
    onChange={(e) => setSearch(e.target.value)} 
    className="text-left border border-gray-300 w-full p-2 mb-2 rounded-md placeholder:text-sm"
  />

  {/* Checkbox List */}
  <div className="flex flex-col gap-1 max-h-40 overflow-y-auto table-scrollbar">
    {filteredCreators.map((creator,i) => (
      <div
        key={creator}
        className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded-md"
      >
        <input
          type="checkbox"
          className="h-4 w-4 accent-green-600"
          checked={selectedCreators.includes(creator)}
                            onChange={() => handleCheckboxChange(creator)} 
        />
        <label className="text-sm text-[#344054]">{creator}</label>
      </div>
    ))}
  </div>
</div>
</div>
    );
};

export default FilterComponent;
