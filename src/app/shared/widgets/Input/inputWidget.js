import React from 'react';

const inputWidget = (props) => {
  const { onChange, value = "", placeholder, label, title, uiSchema = {}} = props;

  // Determine the input type from uiSchema or default to "text"
  const inputType = uiSchema['ui:inputtype'] || "text";

  // Define restricted keys based on input type
  const restrictedKeysNumber = ["e", "E", "+", "-"];
  const restrictedKeysText = uiSchema.restrictedKeysText || [];  // Configurable for text inputs

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (inputType === "number" && restrictedKeysNumber.includes(event.key)) {
      event.preventDefault();
    } else if (inputType === "text" && restrictedKeysText.includes(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <div className="mb-3">
      <input
        className={`block w-[20vw] py-2 mx-2 text-sm leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 `}
        placeholder={placeholder || `Enter ${label || title}`}
        type={inputType}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default inputWidget;
