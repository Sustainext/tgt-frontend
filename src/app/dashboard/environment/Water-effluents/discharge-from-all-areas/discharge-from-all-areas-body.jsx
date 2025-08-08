"use client";
import { useState } from "react";
import { MdKeyboardArrowDown, MdInfoOutline } from "react-icons/md";
import { GlobalState } from "../../../../../Context/page";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import Waterwithdrawal from "./water-withdrawal";
import Waterdischarge from "./Water-discharge";

const AccordionItem = ({
  title,
  children,
  tooltiptext,
  sdg,
  display,
  location,
  setLocationMessage,
  year,
  setYearMessage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { open } = GlobalState();
  const handleClick = () => {
    if (!location) {
      setLocationMessage("Please select location");

      return;
    }
    if (!year) {
      setYearMessage("Please select year");

      return;
    }
    setIsOpen(!isOpen);
  };
 return (
  <div className="shadow-md py-1 mb-4 rounded-[8px] cursor-pointer border border-b-3 border-neutral-200">
    <button
      className="py-3 text-left w-full"
      onClick={handleClick}
    >
      <div className="flex items-center justify-between gap-4 px-3">
        {/* Left side - Title and Tooltip */}
        <div className="flex items-center gap-1 min-w-0 flex-1">
          <h5 className="text-[15px] text-[#344054] font-[500] flex items-center gap-2 min-w-0">
            <span className="truncate">{title}</span>
            <MdInfoOutline
              data-tooltip-id={`tooltip-${title.replace(/\s+/g, "-")}`}
              data-tooltip-content={tooltiptext}
              className="text-[14px] flex-shrink-0"
              style={{ display: display }}
            />
            {/* Tooltip */}
            <ReactTooltip
              id={`tooltip-${title.replace(/\s+/g, "-")}`}
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
          </h5>
        </div>

        {/* Right side - SDG Tags and Arrow */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* SDG Tags */}
          <div className="hidden md:flex items-center gap-2">
            {sdg &&
              sdg.map((sdgItem, index) => (
                <div
                  key={index}
                  className="bg-sky-100 h-[25px] min-w-[70px] rounded-md px-2 flex items-center justify-center"
                  style={{ display: isOpen ? display : 'block' }}
                >
                  <p className="text-[#0057A5] text-[10px] font-semibold whitespace-nowrap">
                    {sdgItem}
                  </p>
                </div>
              ))}
          </div>
          
          {/* Arrow Icon */}
          <MdKeyboardArrowDown
            className={`text-2xl flex-shrink-0 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* Mobile SDG Tags - Show below title on mobile */}
      <div className="block md:hidden px-3 mt-2">
        <div className="flex items-center gap-2 flex-wrap">
          {sdg &&
            sdg.map((sdgItem, index) => (
              <div
                key={index}
                className="bg-sky-100 h-[25px] min-w-[70px] rounded-md px-2 flex items-center justify-center"
                style={{ display: isOpen ? display : 'block' }}
              >
                <p className="text-[#0057A5] text-[10px] font-semibold whitespace-nowrap">
                  {sdgItem}
                </p>
              </div>
            ))}
        </div>
      </div>
    </button>
    
    {isOpen && <div className="py-4 px-3">{children}</div>}
  </div>
);
};

const Dischargefromareasbody = ({
  location,
  year,
  month,
  setLocationMessage,
  setYearMessage,
}) => {
  return (
    <>
      <div className="xl:mx-3 lg:mx-3 md:mx-3 2xl:mx-3 4k:mx-3 2k:mx-3 mx-1">
        <AccordionItem
          title=" Water Withdrawal and Water Discharge from All Areas"
          tooltiptext={`This section documents data corresponding
          to total water withdrawal and total water discharge. `}
          sdg={["GRI 303-3a", "GRI 303-3c", "GRI 303-4a", "GRI 303-4b"]}
          display="block"
          location={location}
          setLocationMessage={setLocationMessage}
          year={year}
          setYearMessage={setYearMessage}
        >
          <Waterwithdrawal location={location} year={year} month={month} />
        </AccordionItem>

        <AccordionItem
          title="Third-party Water discharge sent to use for other organizations"
          tooltiptext={`This section documents data corresponding
          to total water withdrawal and total water discharge. `}
          sdg={["GRI 303-4a"]}
          display="block"
          location={location}
          setLocationMessage={setLocationMessage}
          year={year}
          setYearMessage={setYearMessage}
        >
          <Waterdischarge location={location} year={year} month={month} />
        </AccordionItem>
        {/* Add more accordion items here */}
      </div>
    </>
  );
};

export default Dischargefromareasbody;
