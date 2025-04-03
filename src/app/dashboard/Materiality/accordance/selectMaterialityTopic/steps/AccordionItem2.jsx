import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const AccordionItemstep2 = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-lg mb-4 shadow-md">
      {/* Accordion Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-3 gradient-background rounded-t-lg text-left"
      >
        <span className="text-[#2E0B34] text-[16px] font-semibold">{title}</span>
        {isOpen ? (
          <MdKeyboardArrowUp className="text-xl" />
        ) : (
          <MdKeyboardArrowDown className="text-xl" />
        )}
      </button>

      {/* Accordion Body */}
      {isOpen && <div className="px-4 pb-4 pt-2 bg-white">{children}</div>}
    </div>
  );
};

export default AccordionItemstep2;
