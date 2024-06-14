'use client';
import { useState} from "react";
import { MdKeyboardArrowDown, MdInfoOutline } from "react-icons/md";
import { GlobalState } from "../../../../../Context/page";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'
import SubstancesconcernQ1 from "./substances-concernQ1"
import SubstancesconcernQ2 from "./substances-concernQ2"
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
        <div className={`absolute flex justify-between ${isOpen ? 'right-[3rem]' : 'right-[3rem]'}`}>

            <>
              {sdg && sdg.map((sdgItem, index) => (
                <div key={index} className="bg-sky-100 h-[25px] w-[70px] rounded-md mx-2">
                  <p className="text-[#0057A5] text-[10px] inline-block align-middle px-2 font-semibold">{sdgItem}</p>
                </div>
              ))}
            </>

          <MdKeyboardArrowDown className={`text-2xl ${isOpen ? "rotate-180" : ""}`} />
        </div>
      </button>
      {isOpen && <div className="p-4">{children}</div>}
    </div>
  );
};

const Substancesconcernbody = ({location, year, month,setLocationMessage}) => {


  return (
    <>
      <div className="mx-3">
      <AccordionItem
          title="Substances of concern"
          tooltiptext={`This section documents data corresponding to substances of concern which the discharges are treated for`}
          sdg={['GRI 303-4d']}
          display="block"
          location={location}
          setLocationMessage={setLocationMessage}
        >

          <SubstancesconcernQ1 location={location} year={year} month={month}/>
        </AccordionItem>

        <AccordionItem
          title="Standards, methodologies, and assumptions used"
          tooltiptext={`This section documents data corresponding to change in water storage where
          water storage has been identified as having a significant water-related impact.`}
          sdg={['GRI 303-3d','GRI 303-4e']}
          display="block"
          location={location}
          setLocationMessage={setLocationMessage}
        >

          <SubstancesconcernQ2 location={location} year={year} month={month}/>
        </AccordionItem>
        {/* Add more accordion items here */}
      </div>

    </>
  );
};

export default Substancesconcernbody;
