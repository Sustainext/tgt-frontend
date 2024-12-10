import React from "react";
import { GlobalState } from "../../../../Context/page";
import { MdKeyboardArrowDown, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const MaterialtopicWidget = (props) => {
  const { open } = GlobalState();
  const { onChange, value = "", uiSchema = {}, formContext, id, name } = props;

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  const { validationErrors } = formContext || {};
  const rowIndex = parseInt(id.split("_")[1], 10);
  const rowErrors = (validationErrors && validationErrors[rowIndex]) || {};
  const hasError = !value || value.trim() === "";

  return (
    <>
      <div className="mb-6 px-1">
        <div className="flex justify-between items-center mb-2">
          <div>
            <div className="flex">
              <div className="relative flex">
                <div>
                  <h6
                    className="text-[15px] text-gray-700 font-[400] flex"
                    style={{ display: uiSchema["ui:titiledisplay"] }}
                  >
                    {uiSchema["ui:title"]}
                  </h6>
                </div>
                <div>
                  <MdInfoOutline
                    data-tooltip-id={`tooltip-${uiSchema["ui:title"].replace(
                      /\s+/g,
                      "-"
                    )}`}
                    data-tooltip-html={uiSchema["ui:tooltip"]}
                    className="mt-1 ml-1 text-[#344054] text-[14px]"
                    style={{ display: uiSchema["ui:toltipdisplay"] }}
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
            </div>
          </div>

          {/* Mapping through GRI values */}
          <div
            className="w-[20%]"
            style={{ display: uiSchema["ui:gridisplay"] }}
          >
            <div className="float-end flex flex-wrap gap-2">
              {uiSchema["ui:gri"]?.map((gri, index) => (
                <div
                  key={index}
                  className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center inline-flex"
                >
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    {gri}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <textarea
          placeholder="Enter a description..."
          className={`w-full border appearance-none text-[12px] 
          ${
            hasError && validationErrors.length > 0
              ? "border-red-500"
              : "border-gray-400"
          } 
          text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none 
          focus:bg-white focus:border-gray-400 cursor-pointer`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={7}
        />
        {hasError && (
          <div className="text-red-500 text-[12px] mt-1">
            This field is required
          </div>
        )}
      </div>
    </>
  );
};

export default MaterialtopicWidget;
