import React from 'react';
import ExpandableActivityItem from './ExpandableActivityItem';

const ActivitySummarySection = ({ activities = [] }) => {
  return (
    <div className="space-y-6">
      {/* <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Selected Activities</h2>
        <div className="text-sm font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
          {activities.length} activities
        </div>
      </div> */}

      {activities.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-500">No activities have been selected</p>
        </div>
      ) : (
        <div className="space-y-2">
          {activities.map((activity, index) => (
            <ExpandableActivityItem key={index} activity={activity} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivitySummarySection;