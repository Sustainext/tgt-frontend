import React, { useEffect, useState } from 'react';

const PermissionToggle = ({ label, description, enabled, onChange, disabled }) => {
  // Use internal state to track changes, initialized from the prop
  const [isChecked, setIsChecked] = useState(enabled);

  // Update internal state and call onChange when the checkbox is toggled
  const handleToggle = () => {
    setIsChecked(!isChecked);
    onChange(); // Propagate the change to the parent component
  };

  useEffect(() => {
    setIsChecked(enabled);
  }, [enabled]);

  return (
    <div className="flex items-start gap-2 mb-5">
      <div className='w-[20%] xl:w-[5%] lg:w-[5%] md:w-[5%] 2xl:w-[5%] 4k:w-[5%] 2k:w-[5%]'>
      <label className="relative inline-block w-12  h-6">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleToggle}
          className="sr-only" // Hide the default checkbox visually
          disabled={disabled}
        />
        {/* Slider */}
        <span
          className={`block w-full  h-full rounded-full transition-colors duration-300 ${
            isChecked ? 'bg-green-500' : 'bg-gray-300'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        ></span>
        {/* Toggle Button */}
        <span
          className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
            isChecked ? 'translate-x-6' : 'translate-x-0'
          } ${disabled ? 'bg-white' : 'bg-white'}`}
        ></span>
      </label>
      </div>
      <div className='w-[80%]'>
        <h3 className="font-semibold">{label}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default PermissionToggle;
