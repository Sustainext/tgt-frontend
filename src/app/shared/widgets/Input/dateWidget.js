import React from 'react';
import { MdKeyboardArrowDown, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const DateWidget = (props) => {
  const { onChange, value = "", uiSchema = {} } = props;

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  const handleClick = (event) => {
    event.target.showPicker();
  };

  return (
    <>
      <div className="mb-6">
        <div className="flex mb-2">
          <div className="relative">
            <p className="text-sm text-gray-700 font-[500] flex">
              {uiSchema["ui:title"]}
              <MdInfoOutline
                data-tooltip-id={`tooltip-${uiSchema["ui:title"].replace(
                  /\s+/g,
                  "-"
                )}`}
                data-tooltip-html={uiSchema["ui:tooltip"]}
                className="mt-1 ml-2 w-[30px] text-[14px]"
                style={{ display: uiSchema["ui:tooltipdisplay"] }}
              />

              <ReactTooltip
                id={`tooltip-${uiSchema["ui:title"].replace(/\s+/g, "-")}`}
                place="top"
                effect="solid"
                style={{
                  width: "300px",
                  backgroundColor: "#000",
                  color: "white",
                  fontSize: "12px",
                  boxShadow: 3,
                  borderRadius: "8px",
                }}
              />
            </p>
          </div>
        </div>
        <input
          placeholder="Enter date"
          className={`border appearance-none text-xs border-gray-400 text-neutral-600 pl-2 rounded-md py-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full`}
          value={value}
          onChange={handleChange}
          onClick={handleClick}
          type="date"
        />
      </div>
    </>
  );
};

export default DateWidget;