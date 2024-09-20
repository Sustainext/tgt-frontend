'use client';
import { useState} from "react";
import { MdKeyboardArrowDown, MdInfoOutline } from "react-icons/md";
import { GlobalState } from "../../../../../Context/page";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'
import Reclaimedproductspackdging from "./reclaimed-products-packaging";
import Datacollection from "./data-collection"

const AccordionItem = ({ title, children, tooltiptext, sdg, display,location,setLocationMessage,year, setYearMessage  }) => {
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
    <div className={`shadow-md py-1 mb-4 rounded-[8px] cursor-pointer border border-b-3 border-neutral-200 `}>
      <button
        className="py-3 text-left flex w-[100%]"
        onClick={handleClick}// Unique ID for the tooltip, spaces replaced by dashes
      >
        <div className="flex w-full">
        <div className={`flex ${open ? "w-[75%]" : "w-[75%]"}`}>
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

const Reclaimedproductsbody = ({location, year, month,setLocationMessage, setYearMessage}) => {
  return (
    <>
      <div className="mx-3">
      <AccordionItem
          title="Reclaimed products and their packaging materials"
          tooltiptext={`This section documents data corresponding to the amount
          of recycled material used for packaging of the goods/services
          during the reporting period. Reclaimed products are products
           that have been used and then collected, processed, and
          marketed for reuse. They can be reused in their original form
          or they can be used to manufacture new products.
          Examples include refurbished electronics, recycled clothing,
          reclaimed wood, and reclaimed building materials.
          Exclude: rejects and recalls of products`}
          sdg={['GRI 301-3a','GRI 301-3b']}
          display="block"
          sdgdiplay="block"
          location={location}
          setLocationMessage={setLocationMessage}
          year={year}
          setYearMessage={setYearMessage}
        >

          <Reclaimedproductspackdging location={location} year={year} month={month}/>
        </AccordionItem>

        <AccordionItem
          title="Data Collection method"
          tooltiptext={`  This section documents data corresponding to the organizational interactions with water.`}
          sdg={['GRI 303-1b']}
          display="block"
          sdgdiplay="none"
          location={location}
          setLocationMessage={setLocationMessage}
          year={year}
          setYearMessage={setYearMessage}
        >

          <Datacollection location={location} year={year} month={month}/>
        </AccordionItem>
        {/* Add more accordion items here */}
      </div>

    </>
  );
};

export default Reclaimedproductsbody;
