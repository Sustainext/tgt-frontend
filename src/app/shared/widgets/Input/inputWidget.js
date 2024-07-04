import React from 'react';

const inputWidget = (props) => {
  const { onChange, value = "", placeholder, label, title, uiSchema = {}} = props;

  const handleChange = (event) => {
    onChange(event.target.value);
  };
  const handleKeyDown = (event) => {
    const inputType = uiSchema['ui:inputtype'];
    if (inputType === 'text') {
      // Prevent 'e', 'E', '+', '-', and '.' from being entered
      if (["e", "E", "+", "-", "."].includes(event.key)) {
        event.preventDefault();
      }
      // Prevent numbers from being entered
      if (!isNaN(Number(event.key))) {
        event.preventDefault();
      }
    }
  };
  return (
    <div className="mb-3">
      <input
        className={`block w-[20vw] py-2 mx-2 text-sm leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 `}
        placeholder={placeholder || `Enter ${label || title}`}
        type={uiSchema['ui:inputtype'] || "text"}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

    </div>
  );
};

export default inputWidget;
