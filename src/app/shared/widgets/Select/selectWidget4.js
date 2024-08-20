import React from 'react';
import { MdKeyboardArrowDown, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const selectWidget4 = (props) => {
    const { onChange, value = "", uiSchema = {} } = props;
    const handleChange = (event) => {
        onChange(event.target.value);
      };

    return (
        <>
        <div className=" relative">
        <p className="text-sm text-gray-700 flex">
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
          {/* Tooltip */}
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
          ></ReactTooltip>
        </p>
      </div>
      <div className="flex justify-center items-center mt-2">

        <select
        className="block w-full rounded-md border-0 py-4 pl-4 text-neutral-500 text-xs font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
          onChange={handleChange}
        >
          <option value="" disabled={!!props.value}>{`Select`}</option>
          {props.options.enumOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      </>
    );
  };

  export default selectWidget4;
