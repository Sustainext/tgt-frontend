import React, { useState, useEffect, useRef } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
const DropdownList = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="text-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-blue-600  focus:outline-none"
      >
        {isOpen ? (
          <>
            <p className="flex text-[#007EEF] ">
              View All <MdKeyboardArrowUp className="text-[18px]" />
            </p>
          </>
        ) : (
          <>
            <p className="flex text-[#007EEF] ">
              View All <MdKeyboardArrowDown className="text-[18px]" />
            </p>
          </>
        )}
      </button>
      {isOpen && (
        <div className="mt-2 max-h-40 overflow-y-auto table-scrollbar">
          {items.map((topic, index) => (
            <div className="mb-1" key={index}>
              {topic}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default DropdownList;
