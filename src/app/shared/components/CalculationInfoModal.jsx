import React from 'react';
import { IoClose } from 'react-icons/io5';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { searchClimatiqDataById } from '@/lib/redux/features/emissionSlice';

const CalculationInfoModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  const {
    calculatedAt,
    scope,
    category,
    subCategory,
    activity,
    quantity,
    unit,
    emissionFactorName,
    emissionFactorValue,
    totalEmission,
    unique_id
  } = data;

  const result = useSelector(state => searchClimatiqDataById(state, unique_id));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-8 mx-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className='flex justify-between items-start'>
            <h2 className="text-lg font-semibold text-gray-900">Calculated Result</h2>
            <div className="flex items-center ms-4 mt-1">
              <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-md">
                {scope}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Total Emission */}
        <div className="mb-6">
          <p className="text-3xl font-bold text-green-700">
            {result.co2e} tCO<sub>2</sub>e
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Calculated at {format(new Date(result.updated_at), 'd MMM yyyy HH:mm:ss aa')}
          </p>
        </div>

        {/* Divider */}
        <hr className="border-gray-200 mb-6" />

        {/* Details */}
        <div className="space-y-4 text-sm">
          {/* Category */}
          <div className="flex justify-start gap-4">
            <p className="text-gray-500">Category</p>
            <p className="font-medium text-gray-800">{category}</p>
          </div>

          {/* Sub Category */}
          <div className="flex justify-start gap-4">
            <p className="text-gray-500">Sub Category</p>
            <p className="font-medium text-gray-800">{subCategory}</p>
          </div>

          {/* Activity */}
          <div className="flex justify-start gap-4">
            <p className="text-gray-500">Activity</p>
            <p className="font-medium text-gray-800">{activity}</p>
          </div>

          {/* Quantity and Unit */}
          <div className="flex justify-start gap-4">
            <p className="text-gray-500">Quantity.Unit</p>
            <p className="font-medium text-gray-800">
              {quantity}.{unit}
            </p>
          </div>

          {/* Emission Factor */}
          <div className="space-y-2">
            <p className="text-gray-500">Emission Factor:</p>
            <div className="flex justify-start gap-4">
              <p className="text-gray-500">Name</p>
              <p className="font-medium text-gray-800">{emissionFactorName}</p>
            </div>
            <div className="flex justify-start gap-4">
              <p className="text-gray-500">Value</p>
              <p className="font-medium text-gray-800">{emissionFactorValue}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculationInfoModal;
