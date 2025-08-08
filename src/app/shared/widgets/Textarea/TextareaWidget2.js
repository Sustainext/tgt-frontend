import React from "react";
import { GlobalState } from "../../../../Context/page";
import { MdKeyboardArrowDown, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const TextareaWidget2 = (props) => {
  const { open } = GlobalState();
  const { onChange, value = "", uiSchema = {}, formContext, id, name } = props;

  const { validationErrors } = formContext || {};
  const rowIndex = parseInt(id.split("_")[1], 10);
  const rowErrors = (validationErrors && validationErrors[rowIndex]) || {};
  const hasError =
    (!value || value.trim() === "") && rowErrors && rowErrors[name];

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <>
      <div className="mb-6 px-1">
        <div className="flex justify-between items-center mb-2 w-full xl:w-[95%] lg:w-[95%] 2xl:w-[95%] 4k:w-[95%] 2k:w-[95%] md:w-[95%]">
          <div className="flex relative">
            <div>
              <h6
                className="text-[14px] font-medium text-[#344054] flex"
                style={{ display: uiSchema["ui:haddingdisplay"] }}
              >
                {uiSchema["ui:hadding"]}
              </h6>
            </div>
            <div>
              <MdInfoOutline
                data-tooltip-id={`tooltip-${uiSchema["ui:hadding"].replace(
                  /\s+/g,
                  "-"
                )}`}
                data-tooltip-html={uiSchema["ui:tooltipshadding"]}
                className="mt-1 ml-1 text-[14px]"
                style={{ display: uiSchema["ui:haddingtooltipdisplay"] }}
              />
              {/* Tooltip */}
              <ReactTooltip
                id={`tooltip-${uiSchema["ui:hadding"].replace(/\s+/g, "-")}`}
                place="top"
                effect="solid"
                scrollHide={true}
                globalEventOff="scroll"
                style={{
                  width: "300px",
                  backgroundColor: "#000",
                  color: "white",
                  fontSize: "12px",
                  boxShadow: 3,
                  borderRadius: "8px",
                  zIndex: 100,
                }}
              ></ReactTooltip>
            </div>
          </div>
          <div style={{ display: uiSchema["ui:gridisplay"] }} className="ml-2 xl:ml-0 lg:ml-0 2xl:ml-0 4k:ml-0 2k:ml-0 md:w-0 mr-[28px]">
            <div className="bg-sky-100 h-[25px] w-[70px] rounded-md">
              <p className="text-[#395f81] text-[10px] inline-block align-middle px-2 font-semibold">
                {uiSchema["ui:Gri"]}
              </p>
            </div>
          </div>
        </div>
        <div className="flex mb-2">
          <div className="relative flex">
            <h6 className="text-[14px] text-[#727272]">
              {uiSchema["ui:title"]}
            </h6>
            <MdInfoOutline
              data-tooltip-id={`tooltip-${uiSchema["ui:title"].replace(
                /\s+/g,
                "-"
              )}`}
              data-tooltip-html={uiSchema["ui:tooltipstitle"]}
              className="mt-1 mr-3 text-[#344054] text-[14px] w-[20%] xl:w-0 lg:w-0 2xl:w-0 md:w-0 4k:w-0 2k:w-0"
              style={{ display: uiSchema["ui:titletooltipdisplay"] }}
            />

            <ReactTooltip
              id={`tooltip-${uiSchema["ui:title"].replace(/\s+/g, "-")}`}
              place="top"
              effect="solid"
              scrollHide={true}
              globalEventOff="scroll"
              style={{
                width: "300px",
                backgroundColor: "#000",
                color: "white",
                fontSize: "12px",
                boxShadow: 3,
                borderRadius: "8px",
              }}
            ></ReactTooltip>
          </div>
        </div>

        <textarea
          placeholder="Enter a description..."
          className={`backdrop:before: w-full border appearance-none text-[12px] 
            ${hasError ? "border-red-500" : "border-gray-400"} 
            text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none 
            focus:bg-white focus:border-gray-400 cursor-pointer`}
          value={value}
          onChange={handleChange}
          rows={7}
        />

        {hasError && (
          <div className="text-red-500 text-xs mt-1">
            This field is required
          </div>
        )}
      </div>
    </>
  );
};

export default TextareaWidget2;
