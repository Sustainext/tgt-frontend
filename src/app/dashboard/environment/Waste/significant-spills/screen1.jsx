'use client';
import { useState} from "react";
import { MdKeyboardArrowDown, MdInfoOutline } from "react-icons/md";
import { GlobalState } from "../../../../../Context/page";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'
import SignificantSpillsTable from "./significantSpillsTable";

const AccordionItem = ({ title, children, tooltiptext, sdg, display,selectedOrg, year, selectedCorp,setSelectedOrg, setSelectedCorp,setYear,setOrganisationMessage,setCorporateMessage,setYearMessage,isSidepanelOpen}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { open } = GlobalState();
  const handleClick = () => {
    if (!selectedOrg) {
        setOrganisationMessage("Please select organisation")

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
        <div className="flex items-center justify-center relative">
         <h5 className="text-[15px] text-[#344054] px-3 font-[500]">{title}</h5>
         <MdInfoOutline
            data-tooltip-id={`tooltip-${title.replace(/\s+/g, '-')}`} data-tooltip-content={tooltiptext} className={`${isSidepanelOpen?'-mt-5':''} text-[14px]`} style={{display:display}} />
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

        {/* <div className="flex items-center ">
          
        </div> */}
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

const Screen1 = ({selectedOrg, year, selectedCorp,setSelectedOrg, setSelectedCorp,setYear,setOrganisationMessage,setCorporateMessage,setYearMessage,isSidepanelOpen,togglestatus}) => {
  return (
    <>
      <div className="mx-3">
      <AccordionItem
          title="Please report the following information for each spill that was reported in the organization’s financial statements:"
          tooltiptext={`Spill:
accidental release of a hazardous substance that can affect human health, land, vegetation,
waterbodies, and groundwater.`}
          sdg={['GRI 306-3b','GRI 306-3c']}
          display="block"
          selectedOrg={selectedOrg}
          selectedCorp={selectedCorp}
          year={year}
          setSelectedOrg={setSelectedOrg}
          setSelectedCorp={setSelectedCorp}
          setYear={setYear}
          setOrganisationMessage={setOrganisationMessage}
          setCorporateMessage={setCorporateMessage}
          setYearMessage={setYearMessage}
          isSidepanelOpen={isSidepanelOpen}
        >

          <SignificantSpillsTable selectedOrg={selectedOrg} year={year} selectedCorp={selectedCorp} togglestatus={togglestatus}/>

        </AccordionItem>

      </div>

    </>
  );
};

export default Screen1;
