"use client";
import { useState } from "react";
import { MdKeyboardArrowDown, MdInfoOutline } from "react-icons/md";
import { GlobalState } from "../../../../../Context/page";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import StandardMethodologyTable from "./standardMethodologyTable";

const AccordionItem = ({
  title,
  children,
  tooltiptext,
  sdg,
  display,
  selectedOrg,
  setOrgMessage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { open } = GlobalState();

  const handleClick = () => {
    if (!selectedOrg) {
      setOrgMessage("Please select an organization.");
      return;
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="shadow-md py-1 mb-4 rounded-[8px] cursor-pointer border border-neutral-200">
      <button className="py-3 text-left flex w-full" onClick={handleClick}>
        <div className="flex w-full">
          <div className={`flex ${open ? "w-[75%]" : "w-[75%]"}`}>
            <div className="flex items-center">
              <h5 className="text-[15px] text-[#344054] px-3 font-[500]">
                {title}
              </h5>
            </div>

            {tooltiptext && (
              <div className="flex items-center justify-center relative">
                <MdInfoOutline
                  data-tooltip-id={`tooltip-${title.replace(/\s+/g, "-")}`}
                  data-tooltip-content={tooltiptext}
                  className="text-[14px]"
                  style={{ display: display }}
                />
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
              </div>
            )}
          </div>

          <div className="w-[25%] flex justify-end">
            {sdg &&
              sdg.map((sdgItem, index) => (
                <div
                  key={index}
                  className="bg-sky-100 h-[25px] w-[70px] rounded-md mx-2 flex items-center justify-center"
                >
                  <p className="text-[#0057A5] text-[10px] font-semibold">
                    {sdgItem}
                  </p>
                </div>
              ))}
            <MdKeyboardArrowDown
              className={`text-2xl transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
      </button>

      {isOpen && <div className="py-4 px-3">{children}</div>}
    </div>
  );
};

const Screen1 = ({ year, selectedOrg, selectedCorp, setOrgMessage, month, togglestatus }) => {
  return (
    <div className="mx-3">
      <AccordionItem
        title="Standards, methodologies, and assumptions used"
        tooltiptext="This section documents the data corresponding to the standards, methodologies, assumptions, and/or calculation tools used."
        sdg={["GRI 305-7c"]}
        display="block"
        selectedOrg={selectedOrg}
        setOrgMessage={setOrgMessage}
      >
        <StandardMethodologyTable selectedOrg={selectedOrg} selectedCorp={selectedCorp} year={year} month={month} togglestatus={togglestatus} />
      </AccordionItem>
    </div>
  );
};

export default Screen1;
