import { MdInfoOutline } from "react-icons/md";
import React from "react";
import { Tooltip } from "react-tooltip";

const CheckboxTable = ({
  title,
  isParent = false,
  options,
  onToggle,
  selections,
  tooltipContent,
}) => {
  return (
    <div className="w-[454px] my-6 h-[420px] border-2 border-[#edeae9] rounded-lg flex flex-col">
      <div
        className={`flex justify-start items-center w-full gradient-background bg-opacity-10 sticky top-0 z-10 ${
          title === "Select Organizations" ? "bg-[rgba(106, 223, 35, 0.07)]" : ""
        }`}
      >
        <h3 className="py-2 px-4 font-semibold text-[#344053] text-[17px]">
          {title}
        </h3>
        <a
          data-tooltip-id={`tooltip-${title}`}
          data-tooltip-html={tooltipContent}
          data-tooltip-variant="dark"
        >
          <MdInfoOutline
            className="ml-2 text-gray-500 cursor-pointer"
            style={{ fontSize: "16px" }}
          />
        </a>
        <Tooltip
          id={`tooltip-${title}`}
          className="absolute rounded py-1 px-2 leading-5 border border-gray-300 bg-gray-800 text-white shadow-md text-xs"
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {options.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center w-full py-2 px-4"
          >
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selections.includes(item.id)} // Check if item.id is in selections array
                onChange={() => onToggle(item.id)} // Call onToggle with item.id on change
              />
              <span className="text-[13px] font-medium font-['Manrope'] leading-tight">
                {item.name}
              </span>
            </div>
            {isParent && (
              <span className="text-xs font-medium font-['Manrope'] leading-tight text-[#838383]">
                {item.parent}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckboxTable;
