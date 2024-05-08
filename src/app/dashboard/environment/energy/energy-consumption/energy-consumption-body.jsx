'use client';
import { useState } from "react";
import { MdKeyboardArrowDown, MdInfoOutline } from "react-icons/md";
import ConsumedFuel from "./Consumed-fuel/Consumed-fuel";
import { GlobalState } from "../../../../../Context/page";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'
const AccordionItem = ({ title, children, tooltiptext, sdg, visible }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { open } = GlobalState();

  return (
    <div className={`shadow-md py-1 mb-4 rounded-[8px] cursor-pointer border border-b-3 border-neutral-200 ${open ? "w-[100%]" : "w-[100%]"}`}>
      <button
        className="py-3 w-[100%] text-left flex"
        onClick={() => setIsOpen(!isOpen)}// Unique ID for the tooltip, spaces replaced by dashes
      >
        <div className="flex items-center">
          <h5 className="text-[14px] text-[#344054] px-3">{title}</h5>
        </div>

        <div className="flex items-center justify-center">
          <MdInfoOutline
            data-tooltip-id={`tooltip-${title.replace(/\s+/g, '-')}`} data-tooltip-content={tooltiptext} className="mt-1" />
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
        <div className={`absolute flex justify-between ${isOpen ? 'right-[3rem]' : 'right-[3rem]'}`}>
          {sdg && sdg.map((sdgItem, index) => (
            <div key={index} className="bg-sky-100 h-[25px] w-[70px] rounded-md mx-1 flex justify-center items-center" style={{ visibility: visible }}>
              <p className="text-[#0057A5] text-[10px] flex justify-center items-center px-1 font-semibold">{sdgItem}</p>
            </div>
          ))}
          <MdKeyboardArrowDown className={`text-2xl ${isOpen ? "rotate-180" : ""}`} />
        </div>
      </button>
      {isOpen && <div className="p-4">{children}</div>}
    </div>
  );
};

const EnergyConsumptionBody = () => {
  return (
    <>
      <div className="mx-3">
        <AccordionItem
          title="Consumed fuel and energy, including self generated"
          tooltiptext={`This section documents data corresponding to energy consumed - including fuels.
          Include:
          Self-Generated Energy shall be incorporated in this context.
          Exclude: Direct purchased Heating, Cooling, Electricity, and Steam.`}
          sdg={['GRI 302-1c', 'GRI 302-1e']}
          visible="visible"
        >
          <ConsumedFuel />
        </AccordionItem>
        {/* Add more accordion items here */}
      </div>
    </>
  );
};

export default EnergyConsumptionBody;
