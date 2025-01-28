
import {React,useState} from 'react';
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { MdInfoOutline } from "react-icons/md";
const CustomUnitWidget =  ({onChange, value = "", placeholder, label, title, uiSchema = {}, schema = {}, id,options,formContext,
  props,
  name,}) => {
    const { validationErrors } = formContext || {};
    const rowIndex = parseInt(id.split('_')[1], 10);
    const rowErrors = validationErrors && validationErrors[rowIndex] || {};
    const hasError = !value && rowErrors && rowErrors[name];
    const [otherValue, setOtherValue] = useState(value || ""); // Initialize with value or empty
    const [showOtherInput, setShowOtherInput] = useState(
        value && !options?.enumOptions?.some((option) => option.value === value)
      );
    const handleChange = (e) => {
        const selectedValue=e.target.value;
        if (selectedValue === "Other (please specify)") {
            setShowOtherInput(true); 
            setOtherValue("");
            onChange(""); 
          } else {
            setShowOtherInput(false); 
            onChange(selectedValue); 
          }
    };
    const handleOtherInputChange = (e) => {
        const inputValue = e.target.value;
        setOtherValue(inputValue);
        onChange(inputValue); // Send the "Other" input value to the parent
      };

    const randomId = Math.floor(Math.random() * 10000); // Generate a random number between 0 and 9999
    const tooltipId = schema.title
      ? `tooltip-${schema.title.replace(/\s+/g, "-")}-${randomId}`
      : `tooltip-${id}-${randomId}`;
    return (
      <div className="mb-3 px-1">
       {id.startsWith("root_0") && ( 
         <div className={`relative flex ${label!== "Metric Unit" ? 'justify-center' : 'pl-2'}`}>
          <p className={`flex text-[13px] h-[35px] text-neutral-950 font-[400] mb-1 ${label !== "Metric Unit" && schema.display !== "none" ? 'pl-5' : ''}`}>
            {label}
            <MdInfoOutline
              data-tooltip-id={tooltipId}
              data-tooltip-content={schema.tooltiptext}
              className={`mt-0.5   text-[14px] ${label!== "Metric Unit" ? 'ml-5 w-[30px]' : 'w-[20px] ml-1'}`}
              style={{display:schema.display}}
            />
            <ReactTooltip
              id={tooltipId}
              place="top"
              effect="solid"
              style={{
                width: "300px",
                backgroundColor: "#000",
                color: "white",
                fontSize: "12px",
                boxShadow: 3,
                borderRadius: "8px",
                zIndex: "1000",
              }}
            />
          </p>
        </div>
      )}
      {!showOtherInput?(
             <div className="flex justify-center items-center mt-2">
             <select
               className={`text-center py-1 text-[12px] w-[100px] rounded-md ${
                 value ? 'bg-white text-blue-500 shadow' : 'bg-blue-500 text-white'
               }`}
               value={value || ''}
               onChange={handleChange}
             >
               <option value="" disabled={!!value}>{`Unit` || "Select..."}</option>
               {options.enumOptions.map((option) => (
                 <option key={option.value} value={option.value}>
                   {option.label}
                 </option>
               ))}
             </select>
           </div>
      ):(
        <div>
            <input
            type="text"
            className={`block text-center py-2 text-[12px] w-[100px]  border-b-2 border-gray-300 ${
              id.startsWith("root_0") ? "mt-[0.38rem]" : "mt-0.5"
            }`}
            placeholder={`Specify other ${label}`}
            value={otherValue}
            onChange={handleOtherInputChange}
          />
        </div>
      )}
      
      {hasError && (
        <div className="text-red-500 text-[12px] mt-2 text-center">
          {hasError}
        </div>
      )}
      </div>
    );
  };

  export default CustomUnitWidget;
