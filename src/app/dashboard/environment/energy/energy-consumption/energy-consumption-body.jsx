'use client';
import { useState, useCallback } from "react";
import { MdKeyboardArrowDown, MdInfoOutline } from "react-icons/md";
import { GlobalState } from "../../../../../Context/page";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'
import Outsideorganization from "./outside-organization";
import OutsideStandards from"./outside-standards";
import OutsideSource from'./outside-source';
const AccordionItem = ({ title, children, tooltiptext, sdg, display,location,setLocationMessage,year, setYearMessage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { open } = GlobalState();
  const handleClick = () => {
    if (!location) {
      setLocationMessage("Please select a location")

      return;
    }
    if (!year) {
      setYearMessage("Please select a year")

      return;
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className={`shadow-md py-1 mb-4 rounded-[8px] cursor-pointer border border-b-3 border-neutral-200 ${open ? "w-[100%]" : "w-[100%]"}`}>
      <button
        className="py-3 w-[100%] text-left flex"
        onClick={handleClick}// Unique ID for the tooltip, spaces replaced by dashes
      >
        <div className="flex justify-between">
          <div className={`flex ${open ? "w-[65vw]" : "w-[74vw]"}`}>
            <div className="flex items-center">
              <h5 className="text-[14px] text-[#344054] px-3">{title}</h5>
            </div>


            <div className="flex items-center justify-center relative">
              <MdInfoOutline
                data-tooltip-id={`tooltip-${title.replace(/\s+/g, '-')}`} data-tooltip-content={tooltiptext} className="mt-1 text-[14px]" style={{ display: display }} />
              {/* Tooltip */}
              <ReactTooltip id={`tooltip-${title.replace(/\s+/g, '-')}`} place="top" effect="solid" style={{
                width: "300px", backgroundColor: "#000",
                color: "white",
                fontSize: "12px",
                boxShadow: 3,
                borderRadius: "8px",
              }}>

              </ReactTooltip>
            </div>
          </div>
          <div className=" w-[20vw] ">
            <div className={`flex float-end`}>
              {isOpen ? (
                <>
                  {sdg && sdg.map((sdgItem, index) => (
                    <div key={index} className="bg-sky-100 h-[25px] w-[70px] rounded-md mx-2" style={{ display: display }} >
                      <p className="text-[#0057A5] text-[10px] inline-block align-middle px-2 font-semibold">{sdgItem}</p>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {sdg && sdg.map((sdgItem, index) => (
                    <div key={index} className="bg-sky-100 h-[25px] w-[70px] rounded-md mx-2">
                      <p className="text-[#0057A5] text-[10px] inline-block align-middle px-2 font-semibold">{sdgItem}</p>
                    </div>
                  ))}
                </>
              )}
              <MdKeyboardArrowDown className={`text-2xl ${isOpen ? "rotate-180" : ""}`} />
            </div>
          </div>
        </div>
      </button>
      {isOpen && <div className="p-4">{children}</div>}
    </div>
  );
};

const EnergyConsumptionBody = ({location, year, month,setLocationMessage, setYearMessage}) => {
  return (
    <>
      <div className="mx-3">
        <AccordionItem
          title="Energy consumption outside organization"
          tooltiptext={`This section documents data corresponding to Energy Consumption  outside the Organization.
          Include: Input data related to fuel and energy consumed outside the organization.
          Exclude: Do not include data related to energy consumption within the organization reported
          in the previous section.`}
          sdg={['GRI 302-2a']}
          display="block"
          location={location}
          setLocationMessage={setLocationMessage}
          year={year}
          setYearMessage={setYearMessage}
        >

          <Outsideorganization location={location} year={year} month={month} />
        </AccordionItem>
        <AccordionItem
          title="Standards, methodologies, assumptions and calculation tools used"
          tooltiptext="Standards, methodologies, assumptions and calculation tools used"
          sdg={['GRI 302-2b']}
          display="none"
          location={location}
          setLocationMessage={setLocationMessage}
          year={year}
          setYearMessage={setYearMessage}
        >
          <OutsideStandards location={location} year={year} month={month} />
        </AccordionItem>
        <AccordionItem
          title="Source of conversion factor"
          tooltiptext="Source of conversion factor"
          sdg={['GRI 302-2c']}
          display="none"
          location={location}
          setLocationMessage={setLocationMessage}
          year={year}
          setYearMessage={setYearMessage}
        >
          <OutsideSource location={location} year={year} month={month} />
        </AccordionItem>
        {/* Add more accordion items here */}
      </div>
    </>
  );
};

export default EnergyConsumptionBody;
