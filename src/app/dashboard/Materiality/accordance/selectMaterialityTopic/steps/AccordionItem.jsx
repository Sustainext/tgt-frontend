import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
const AccordionItem = ({ title, tooltipId, tooltipContent, checked, onCheck, children,name, id }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-lg mb-4 shadow-md">
      <div
        className="flex justify-between items-center px-4 py-3 gradient-background rounded-t-lg"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center text-[17px] text-[#2E0B34] font-medium relative">
          {title}
          <MdInfoOutline
            data-tooltip-id={tooltipId}
            data-tooltip-html={tooltipContent}
            className="ml-2 text-[16px]"
          />
          <ReactTooltip
            id={tooltipId}
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
        </div>
        <div className="flex items-center gap-2">
          <input
          id={id}
            type="checkbox"
            checked={checked}
            name={name}
            onChange={onCheck}
            className="h-3.5 w-3.5 green-checkbox"
          />
          {open ? (
            <MdKeyboardArrowUp className="text-[20px]" />
          ) : (
            <MdKeyboardArrowDown className="text-[20px]" />
          )}
        </div>
      </div>

      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
};

export default AccordionItem;
