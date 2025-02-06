import React from "react";
import { MdKeyboardArrowDown, MdInfoOutline } from "react-icons/md";
import { GlobalState } from "../../../../Context/page";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const RichTextAreaWidget = (props) => {
  const { open } = GlobalState();
  const { onChange, value = "", uiSchema = {},formContext,name } = props;
  const { validationErrors } = formContext || {};
  const rowErrors = validationErrors || {};
  const hasError = !value && rowErrors && rowErrors[name]

  const handleChange = (value) => {
    onChange(value);
  };

  const config = {
    enter: "BR", // Or customize behavior on Enter key
  cleanHTML: true,
    enablePasteHTMLFilter: false, 
    askBeforePasteHTML: false, 
    askBeforePasteFromWord: false,
    style: {
      fontSize: "14px",
      color: "#667085"
    },
    allowResizeY: false,
    defaultActionOnPaste: 'insert_clear_html',
    toolbarSticky: false,
    toolbar: true,
    buttons: [
      'bold',
      'italic',
      'underline',
      'strikeThrough',
      'align',
      'outdent',
      'indent',
      'ul',
      'ol',
      'paragraph',
      'link',
      'table',
      'undo',
      'redo',
      'hr',
      'fontsize',
      'selectall'
    ],
    removeButtons: ['fullsize', 'preview', 'source', 'print', 'about', 'find', 'changeMode', 'paintFormat', 'image', 'brush', 'font'],
  };

  return (
    <>
      <div className="px-1">
      <div className="flex mb-2">
          <div className=" relative">
            <p className="text-[14px] text-gray-700 font-[500] flex">
              {uiSchema["ui:title"]}
              <MdInfoOutline
                data-tooltip-id={`tooltip-${uiSchema["ui:title"].replace(
                  /\s+/g,
                  "-"
                )}`}
                data-tooltip-html={uiSchema["ui:tooltipstitle"]}
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
        </div>
        {/* <div className="">
          <textarea
           placeholder="Enter a description..."
           className={`w-full border appearance-none text-[12px] 
           ${hasError ? "border-red-500" : "border-gray-400"} 
           text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none 
           focus:bg-white focus:border-gray-400 cursor-pointer`}
            value={value}
            onChange={handleChange}
            rows={7}
          />
        </div> */}
         <div className={`${hasError} ? "border-red-500" : "border-gray-400"`}>
          <JoditEditor
            value={value}
            config={config}
            tabIndex={1}
            onBlur={handleChange}
          />
        </div>
        {hasError && (
          <div className="text-red-500 text-[12px] mt-1">
           {hasError}
          </div>
        )}
      </div>
    </>
  );
};

export default RichTextAreaWidget;
