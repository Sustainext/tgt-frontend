'use client';
import { useState} from "react";
import { MdKeyboardArrowDown, MdInfoOutline } from "react-icons/md";
import { GlobalState } from "../../../../../Context/page";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'
import Waterwithdrawal from "./water-withdrawal";
import Waterdischarge from "./Water-discharge";

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

              <>
              {sdg && sdg.map((sdgItem, index) => (
                <div key={index} className="bg-sky-100 h-[25px] w-[70px] rounded-md mx-2">
                  <p className="text-[#0057A5] text-[10px] inline-block align-middle px-2 font-semibold">{sdgItem}</p>
                </div>
              ))}
            </>


          <MdKeyboardArrowDown className={`text-2xl ${isOpen ? "rotate-180" : ""}`} />
        </div>
       </div>
        </div>
      </button>
      {isOpen && <div className="p-4">{children}</div>}
    </div>
  );
};

const Dischargefromareasbody = ({location, year, month,setLocationMessage, setYearMessage}) => {


  return (
    <>
      <div className="mx-3">
      <AccordionItem
          title=" Water Withdrawal and Water Discharge from All Areas"
          tooltiptext={`This section documents data corresponding
          to total water withdrawal and total water discharge. `}
          sdg={['GRI 303-3a','GRI 303-3b','GRI 303-3c','GRI 303-3d']}
          display="block"
          location={location}
          setLocationMessage={setLocationMessage}
          year={year}
          setYearMessage={setYearMessage}
        >

          <Waterwithdrawal location={location} year={year} month={month}/>
        </AccordionItem>

        <AccordionItem
          title="Third-party Water discharge sent to use for other organizations"
          tooltiptext={`This section documents data corresponding
          to total water withdrawal and total water discharge. `}
          sdg={['GRI 303-4a']}
          display="none"
          location={location}
          setLocationMessage={setLocationMessage}
          year={year}
          setYearMessage={setYearMessage}
        >

          <Waterdischarge location={location} year={year} month={month}/>
        </AccordionItem>
        {/* Add more accordion items here */}
      </div>

    </>
  );
};

export default Dischargefromareasbody;
