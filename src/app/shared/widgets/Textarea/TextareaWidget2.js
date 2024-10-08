import React from "react";
import { GlobalState } from "../../../../Context/page";
import { MdKeyboardArrowDown, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const TextareaWidget2 = (props) => {
  const { open } = GlobalState();
  const { onChange, value = "", uiSchema = {} } = props;

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <>
      <div className="mb-6 px-1">
        <div className="flex justify-between items-center mb-2">
          <div>
            <div className="flex relative">
              <div>
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
              <div className="relative flex">
                <h6 className="text-[14px] text-[#727272] flex">
                  {uiSchema["ui:title"]} 
                  <MdInfoOutline
                  data-tooltip-id={`tooltip-${uiSchema["ui:title"].replace(/\s+/g, "-")}`}
                  data-tooltip-content={uiSchema["ui:tooltipstitle"]}
                  className="mt-1 ml-1 text-[#344054] text-[14px]"
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

                </h6>
              </div>

            </div>
          </div>
          <div   style={{ display: uiSchema["ui:gridisplay"] }}>
            <div className="bg-sky-100 h-[25px] w-[70px] rounded-md">
              <p className="text-[#395f81] text-[10px] inline-block align-middle px-2 font-semibold">
                {uiSchema["ui:Gri"]}
              </p>
            </div>
          </div>
        </div>

        <textarea
          placeholder="Enter a description..."
          className={`backdrop:before: w-full border appearance-none text-[12px] border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer`}
          value={value}
          onChange={handleChange}
          rows={7}
        />
      </div>
    </>
  );
};

export default TextareaWidget2;
