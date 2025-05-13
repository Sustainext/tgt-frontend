import React from 'react';

const CircularProgressBar = ({ percentage }) => {
  const radius = 10;
  const stroke = 2;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center space-x-1">
      {/* Circle */}
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#d1d5db" // Tailwind gray-300
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#047857" // Tailwind green-700
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

      {/* Percentage Display */}
      <div className="px-1 py-1 text-[12px] ">
        {percentage}%
      </div>
    </div>
  );
};

export default CircularProgressBar;
