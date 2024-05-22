import React from "react";
import { GlobalState } from "../../../Context/page";
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
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div>
            <div className="flex">
              <div>
                <h6 className="text-sm font-medium text-[#344054] flex" style={{ display: uiSchema["ui:haddingdisplay"] }}>
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
              <div>
                <h6 className="text-sm text-[#727272] w-[560px] flex">
                  {uiSchema["ui:title"]} <MdInfoOutline
                  data-tooltip-id={`tooltip-${uiSchema["ui:title"].replace(
                    /\s+/g,
                    "-"
                  )}`}
                  data-tooltip-content={uiSchema["ui:tooltipstitle"]}
                  className="mt-1 ml-2 w-[30px] text-[#344054] text-[14px]"
                  style={{ display: uiSchema["ui:titletooltipdisplay"] }}
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

                </h6>
              </div>

            </div>
          </div>
          <div className={`${open ? "w-[20%]" : "w-[20%]"}`}   style={{ display: uiSchema["ui:gridisplay"] }}>
            <div className="bg-sky-100 h-[25px] w-[70px] rounded-md mx-2">
              <p className="text-[#395f81] text-[10px] inline-block align-middle px-2 font-semibold">
                {uiSchema["ui:Gri"]}
              </p>
            </div>
          </div>
        </div>

        <textarea
          placeholder="Enter a description..."
          className={`backdrop:before:w-[48rem] border appearance-none text-xs border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-[90%]`}
          value={value}
          onChange={handleChange}
          rows={7}
        />
      </div>
    </>
  );
};

export default TextareaWidget2;
