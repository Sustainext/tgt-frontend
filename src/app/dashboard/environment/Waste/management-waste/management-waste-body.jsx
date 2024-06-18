'use client';
import { useState,useCallback } from "react";
import { MdKeyboardArrowDown, MdInfoOutline } from "react-icons/md";
import { GlobalState } from "../../../../../Context/page";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'
import Managementwasteimpact from "./management-waste-impact";
const AccordionItem = ({ title, children, tooltiptext, sdg, display,location,setLocationMessage,year }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { open } = GlobalState();
  const handleClick = () => {
    if (!location) {
      setLocationMessage("Please select a location and year")

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


        <div className="flex items-center justify-center">
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
       <div className=" w-[20vw] ">
       <div className={`flex float-end`}>
        {isOpen ? (
            <>
              {sdg && sdg.map((sdgItem, index) => (
                <div key={index} className="bg-sky-100 h-[25px] w-[70px] rounded-md mx-2" style={{ display: 'none'}} >
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

const Managementwastebody = ({location, year, month,setLocationMessage}) => {


  return (
    <>
      <div className="mx-3">
      <AccordionItem
          title="Management of significant waste related impacts"
          tooltiptext={`This section contains disclosures for organizations to report information about how they manage waste related impacts`}
          sdg={['GRI 306-2a']}
          display="block"
          location={location}
          setLocationMessage={setLocationMessage}
        >

          <Managementwasteimpact location={location} year={year} month={month}/>
        </AccordionItem>


        {/* Add more accordion items here */}
      </div>

    </>
  );
};

export default Managementwastebody;
