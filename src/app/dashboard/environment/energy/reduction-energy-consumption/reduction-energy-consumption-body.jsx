'use client';
import { useState } from "react";
import { MdKeyboardArrowDown, MdInfoOutline } from "react-icons/md";
import { GlobalState } from "../../../../../Context/page";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'
import Reductionenergy from "./reduction-energy";
import Baseyearenergy from "./base-year";
import Standardsenergy from "./standards-energy"
const AccordionItem = ({ title, children, tooltiptext, sdg, display,location,setLocationMessage,year, setYearMessage  }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { open } = GlobalState();
  const handleClick = () => {
    if (!location) {
      setLocationMessage("Please select location")

      return;
    }
    if (!year) {
      setYearMessage("Please select year")

      return;
    }
    setIsOpen(!isOpen);
  };
  return (
    <div className={`shadow-md py-1 mb-4 rounded-[8px] cursor-pointer border border-b-3 border-neutral-200 `}>
      <button
        className="py-3 text-left flex w-[100%]"
        onClick={handleClick}// Unique ID for the tooltip, spaces replaced by dashes
      >
        <div className="flex w-full">
        <div className={`flex ${open ? "w-[75%]" : "w-[75%]"}`}>
        <div className="flex items-center">
         <h5 className="text-[15px] text-[#344054] px-3 font-[500]">{title}</h5>
        </div>

        <div className="flex items-center justify-center relative">
          <MdInfoOutline
            data-tooltip-id={`tooltip-${title.replace(/\s+/g, '-')}`} data-tooltip-content={tooltiptext} className="mt-1 text-[14px]" style={{display:display}} />
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
       <div className=" w-[25%] ">
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
      {isOpen && <div className="py-4 px-3">{children}</div>}
    </div>
  );
};

const Reductionenergyconsumptionbody = ({location, year, month,setLocationMessage, setYearMessage}) => {
  return (
    <>
      <div className="mx-3">
      <AccordionItem
          title="Reduction of energy consumption"
          tooltiptext={`This section is dedicated to reporting the reduction in energy consumption within an organization. While calculating Reduction in Energy Consumption exclude reductions resulting from reduced production capacity or outsourcing`}
          sdg={['GRI 302-4a','GRI 302-4b']}
          display="block"
          location={location}
          setLocationMessage={setLocationMessage}
          year={year}
          setYearMessage={setYearMessage}
        >
          <Reductionenergy location={location} year={year} month={month}/>
        </AccordionItem>

        {/* <AccordionItem
          title="Base year or baseline"
          tooltiptext={`This section is dedicated to reporting the reduction in energy consumption within an organization. While calculating
          Reduction in Energy Consumption exclude reductions resulting from reduced production capacity or outsourcing.`}
          sdg={['GRI 302-4c']}
          display="none"
          location={location}
          setLocationMessage={setLocationMessage}
          year={year}
          setYearMessage={setYearMessage}
        >
          <Baseyearenergy location={location} year={year} month={month}/>
        </AccordionItem> */}
        {/* <AccordionItem
          title="Standards, methodologies, assumptions and calculation tools used"
          tooltiptext={`This section is dedicated to reporting the reduction in energy consumption within an organization. While calculating
          Reduction in Energy Consumption exclude reductions resulting from reduced production capacity or outsourcing.`}
          sdg={['GRI 302-4c']}
          display="none"
          location={location}
          setLocationMessage={setLocationMessage}
          year={year}
          setYearMessage={setYearMessage}
        >
          <Standardsenergy  location={location} year={year} month={month}/>
        </AccordionItem> */}
        {/* Add more accordion items here */}
      </div>
    </>
  );
};

export default Reductionenergyconsumptionbody;
