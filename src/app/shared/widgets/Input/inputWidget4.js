import React from "react";
import { GlobalState } from "../../../../Context/page";
import { MdKeyboardArrowDown, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const InputWidget4 = (props) => {
  const { open } = GlobalState();
  const { onChange, value = "", uiSchema = {} } = props;

  const handleChange = (event) => {
    onChange(event.target.value);
  };
  const handleKeyDown = (event) => {
    // Prevent 'e', '+', '-', and '.' from being entered
    if (["e", "E", "+", "-"].includes(event.key)) {
      event.preventDefault();
    }
  };
  return (
    <>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div>
            <div className="flex relative">
              <div className="mb-2">
                <h6 className="text-[14px] font-medium text-[#344054] flex" style={{ display: uiSchema["ui:haddingdisplay"] }}>
                  {uiSchema["ui:hadding"]}

                </h6>
              </div>
              <div>
                <MdInfoOutline
                  data-tooltip-id={`tooltip-${uiSchema["ui:hadding"].replace(
                    /\s+/g,
                    "-"
                  )}`}
                  data-tooltip-content={uiSchema["ui:tooltipshadding"]}
                  className="mt-1 ml-2 text-[14px]"
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
                  }}
                ></ReactTooltip>
              </div>
            </div>
            <div className="flex">
              <div className=" relative">
                <h6 className="text-[13px] xl:w-[860px] md:w-[860px] lg:w-[860px] 4k:w-[860px] 2k:w-[860px] 2xl:w-[860px] flex text-gray-700 font-[500]">
                  {uiSchema["ui:title"]} <MdInfoOutline
                  data-tooltip-id={`tooltip-${uiSchema["ui:title"].replace(/\s+/g, "-")}`}
                  data-tooltip-content={uiSchema["ui:tooltipstitle"]}
                  className="mt-1 ml-2 w-[30px] text-[#344054] text-[14px]"
                  style={{ display: uiSchema["ui:titletooltipdisplay"] }}
                />
                {/* Tooltip */}
                <ReactTooltip
                  id={`tooltip-${uiSchema["ui:title"].replace(/\s+/g, "-")}`}
                  place="top"
                  effect="solid"
                   scrollHide={true}
                  globalEventOff="scroll"
                  style={{
                    minWidth: "200px", // Minimum width
                    maxWidth: "500px", // Maximum width
                    backgroundColor: "#000",
                    color: "white",
                    fontSize: "12px",
                    boxShadow: 3,
                    borderRadius: "8px",

                  }}
                ></ReactTooltip>

                </h6>
              </div>

            </div>
          </div>
          <div className={`float-end`}   style={{ display: uiSchema["ui:gridisplay"] }}>
          <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                {uiSchema["ui:Gri"]}
                </div>
              </div>
        
          </div>
        </div>

        <input
        className="backdrop:before:w-[48rem] border appearance-none text-xs border-gray-400 text-neutral-600 pl-2 rounded-md py-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full"
              placeholder={props.placeholder || `Enter ${props.label || props.title}`}
              type="number"
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
          />
      </div>
    </>
  );
};

export default InputWidget4;
