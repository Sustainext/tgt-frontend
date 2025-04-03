import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import NivoYearlyGrowth from './NivoYearlyGrowth'; // Import your graph component

const ExpandableActivityItem = ({ activity }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="border rounded-lg mb-4 overflow-hidden bg-white shadow-sm text-slate-700">
      {/* Header - Always visible */}
      <div 
        className="grid grid-cols-7 gap-4 p-4 cursor-pointer hover:bg-gray-50 relative"
        onClick={toggleExpand}
      >
        <div className='col-span-1'>
          <div className="text-xs text-gray-500">Scope</div>
          <div className="font-medium">{activity.scope}</div>
        </div>
        <div className='col-span-1'>
          <div className="text-xs text-gray-500">Category</div>
          <div className="font-medium">{activity.category}</div>
        </div>
        <div className='col-span-2'>
          <div className="text-xs text-gray-500">Subcategory</div>
          <div className="font-medium">{activity.subCategory}</div>
        </div>
        <div className="flex justify-between items-center">
          <div className='col-span-2'>
            <div className="text-xs text-gray-500">Activity</div>
            <div className="font-medium truncate pr-4">{activity.activity}</div>
          </div>
          <button className="text-gray-500 hover:text-gray-700 absolute right-4 top-1/2 transform -translate-y-1/2">
            {isExpanded ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
          </button>
        </div>
        <div></div>
      </div>

      {/* Expandable content */}
      {isExpanded && (
        <div className="p-6 border-t">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Emission Reduction Projection</h3>
          <div className="h-80">
            {/* <NivoYearlyGrowth /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpandableActivityItem;