import React, { useState, useContext } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import ActivitiesGraph from './ActivitiesGraph'; // Import your graph component
import { GlobalState } from "@/Context/page";

const ExpandableActivityItem = ({ activity }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { open, setOpen } = GlobalState();

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Handle field mappings from API response structure
  const scope = activity.scope || '';
  const category = activity.category || '';
  const subCategory = activity.sub_category || activity.subCategory || '';
  const activityName = activity.activity_name || activity.activity || '';
  const region = activity.region || '';
  const uuid = activity.uuid || '';
  const activityId = activity.activity_id || activity.id || '';
  const factorId = activity.factor_id || '';
  
  // Additional fields that might be useful for further details
  const quantity = activity.quantity || 0;
  const unit = activity.unit || '';
  const co2eTotal = activity.co2e_total || 0;
  const unitType = activity.unit_type || '';

  return (
    <div className={`border rounded-lg mb-4 overflow-hidden bg-white shadow-md text-slate-700 ${open ? "max-w-[105vw]": "max-w-[116vw]"}`}>
      {/* Header - Always visible */}
      <div 
        className="grid grid-cols-7 gap-4 p-4 cursor-pointer hover:bg-gray-50 relative"
        onClick={toggleExpand}
      >
        <div className='col-span-1'>
          <div className="text-xs text-gray-500">Scope</div>
          <div className="font-medium">{scope}</div>
        </div>
        <div className='col-span-1'>
          <div className="text-xs text-gray-500">Category</div>
          <div className="font-medium">{category}</div>
        </div>
        <div className='col-span-2'>
          <div className="text-xs text-gray-500">Subcategory</div>
          <div className="font-medium">{subCategory}</div>
        </div>
        <div className="col-span-2">
          <div className="text-xs text-gray-500">Activity</div>
          <div className="font-medium truncate pr-4" title={activityName}>{activityName}</div>
        </div>
        <div className="col-span-1 flex justify-between items-center">
          <div>
            <div className="text-xs text-gray-500">Region</div>
            <div className="font-medium">{region}</div>
          </div>
          <button className="text-gray-500 hover:text-gray-700">
            {isExpanded ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
          </button>
        </div>
      </div>

      {/* Expandable content */}
      {isExpanded && (
        <div className="p-4 border-t border-gray-200">
          {/* Additional activity details */}
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <span className="text-gray-500">UUID:</span> {uuid}
            </div>
            <div>
              <span className="text-gray-500">Activity ID:</span> {activityId}
            </div>
            <div>
              <span className="text-gray-500">Factor ID:</span> {factorId}
            </div>
            <div>
              <span className="text-gray-500">Quantity:</span> {quantity} {unit}
            </div>
            <div>
              <span className="text-gray-500">Unit Type:</span> {unitType}
            </div>
            <div>
              <span className="text-gray-500">CO2e Total:</span> {co2eTotal.toFixed(2)}
            </div>
          </div>
          
          {/* Activities graph for this activity */}
          <div className="min-h-80 p-2">
            <ActivitiesGraph
              activityName={activityName}
              baseYear={2025} // You may want to get these from props or context
              targetYear={2030}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpandableActivityItem;