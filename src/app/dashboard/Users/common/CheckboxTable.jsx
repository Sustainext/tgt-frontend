import React from "react";
import { MdInfoOutline } from "react-icons/md";
import { Tooltip } from "react-tooltip";

const CheckboxTable = ({
  title,
  isParent = false,
  options = [], // Ensure options default to an empty array
  onToggle,
  selections = [], // Ensure selections default to an empty array
  tooltipContent,
  loading, // New loading prop to show loading state
}) => {
  return (
    <div className="w-full my-6 h-[420px] border-2 border-[#edeae9] rounded-lg flex flex-col">
      <div
        className={`flex justify-start items-center w-full gradient-background bg-opacity-10 sticky top-0 z-10 ${
          title === "Select Organizations"
            ? "bg-[rgba(106, 223, 35, 0.07)]"
            : ""
        }`}
      >
        <h3 className="py-2 px-4 font-semibold text-[#344053] text-[17px]">
          {title}
        </h3>
        {tooltipContent && (
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
        )}
        <Tooltip
          id={`tooltip-${title}`}
          className="absolute rounded py-1 px-2 leading-5 border border-gray-300 bg-gray-800 text-white shadow-md text-xs"
          style={{
            width: "400px",
            backgroundColor: "#000",
            color: "white",
            fontSize: "12px",
            boxShadow: 3,
            borderRadius: "8px",
            zIndex: "1000",
          }}
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="loader border-t-4 border-b-4 border-gray-300 rounded-full w-10 h-10 animate-spin"></div>
          </div>
        ) : Array.isArray(options) && options.length > 0 ? (
          options.map((item, index) => (
            <div key={index} className="w-full py-2 px-4">
              <div className="flex items-center w-full">
                <div className="flex items-center gap-2 w-full">
                  <input
                    type="checkbox"
                    checked={selections.includes(item.id)} // Check if item.id is in selections array
                    onChange={() => onToggle(item.id)} // Call onToggle with item.id on change
                  />
                  <span className="text-[13px] font-medium font-['Manrope'] leading-tight">
                    {item.name}
                  </span>
                </div>
                <div className="float-end w-full">
                  <span className="text-[13px] font-medium font-['Manrope'] leading-tight text-gray-300 float-end">
                    {item.corporate_name || ""}
                  </span>
                  <span className="text-[13px] font-medium font-['Manrope'] leading-tight text-gray-300 float-end">
                    {item.organization_name || ""}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">No options available</div>
        )}
      </div>
    </div>
  );
};

export default CheckboxTable;
