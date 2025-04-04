import React, { useState, useRef, useEffect } from "react";
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import dynamic from 'next/dynamic';
const RichtextWidget = (props) => {
  const { onChange, value = "", uiSchema = {}, options, autofocus } = props;
  const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
  const editor = useRef(null);
  const config = {
    style: {
      fontSize: "12px",
      color: "#667085"
    },
    askBeforePasteHTML: false,
    allowResizeY: false,
    defaultActionOnPaste: 'insert_clear_html',
    toolbarSticky: false,
    height: 400,
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

  const handleEditorChange = (newContent) => {
    onChange(newContent);
  };
  return (
    <>
      <div className="mb-6">
        <div className="flex mb-2">
          <div className="relative flex">
            <div>
              <h2
                className="flex text-[14px] text-gray-700 font-[500]"
                style={{ display: uiSchema["ui:titledisplay"] }}
              >
                {uiSchema["ui:title"]}
              </h2>
            </div>

            <div>
              <MdInfoOutline
                data-tooltip-id={`tooltip-${uiSchema["ui:title"].replace(
                  /\s+/g,
                  "-"
                )}`}
                data-tooltip-html={uiSchema["ui:tooltip"]}
                className="mt-1.5 ml-2 w-[20px] text-[15px] text-gray-500"
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
              ></ReactTooltip>
            </div>
          </div>
        </div>
<div>
<JoditEditor
                ref={editor}
                value={value}
                config={config}
                tabIndex={1}
                onBlur={handleEditorChange}

              />
</div>
      </div>
    </>
  );
};

export default RichtextWidget;
