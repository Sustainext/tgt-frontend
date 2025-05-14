import React from 'react';
import { FaCheck } from 'react-icons/fa';

const CircularProgressBar = ({ percentage }) => {
  const radius = 10;
  const stroke = 2;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center space-x-1">
      {/* Progress circle container */}
      <div className="relative w-5 h-5">
        {/* Circular progress ring */}
        <svg height={radius * 2} width={radius * 2} className="absolute top-0 left-0">
          <circle
            stroke="#d1d5db"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke="#047857"
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            style={{ transition: 'stroke-dashoffset 0.35s ease' }}
          />
        </svg>

        {/* Show green circle with check icon ONLY at 100% */}
        {percentage === 100 && (
          <div className="absolute top-0 left-0 w-full h-full rounded-full bg-green-700 flex items-center justify-center">
            <FaCheck className="w-3 h-3 text-white" />
          </div>
        )}
      </div>

      {/* Percentage text */}
      <div className="px-1 py-1 text-[12px] text-gray-700">
        {percentage}%
      </div>
    </div>
  );
};

export default CircularProgressBar;
