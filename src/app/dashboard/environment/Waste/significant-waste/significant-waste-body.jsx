"use client";
import { useState } from "react";
import { MdKeyboardArrowDown, MdInfoOutline } from "react-icons/md";
import { GlobalState } from "../../../../../Context/page";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import Significantwasteimpact from "./significant-waste-impact";

const AccordionItem = ({
  title,
  children,
  tooltiptext,
  sdg,
  display,
  selectedOrg,
  selectedCorp,
  year,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { open } = GlobalState();
  const handleClick = () => {
    if (!selectedOrg) {
      console.log("Please select Org");

      return;
    }
    if (!year) {
      console.log("Please select year");

      return;
    }
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`shadow-md py-1 mb-4 rounded-[8px] cursor-pointer border border-b-3 border-neutral-200 `}
    >
      <button
        className="py-3 text-left flex w-[100%]"
        onClick={handleClick} // Unique ID for the tooltip, spaces replaced by dashes
      >
        <div className="flex w-full">
          <div className={`flex ${open ? "w-[75%]" : "w-[75%]"}`}>
            <div className="flex items-center">
              <h5 className="text-[15px] text-[#344054] px-3 font-[500]">
                {title}
              </h5>
            </div>

            <div className="flex items-center justify-center relative">
              <MdInfoOutline
                data-tooltip-id={`tooltip-${title.replace(/\s+/g, "-")}`}
                data-tooltip-content={tooltiptext}
                className="mt-0.5 text-[14px]"
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
              ></ReactTooltip>
            </div>
          </div>
          <div className=" w-[25%] ">
            <div className={`flex float-end`}>
              {isOpen ? (
                <>
                  {sdg &&
                    sdg.map((sdgItem, index) => (
                      <div
                        key={index}
                        className="bg-sky-100 h-[25px] w-[70px] rounded-md mx-2"
                        style={{ display: "none" }}
                      >
                        <p className="text-[#0057A5] text-[10px] inline-block align-middle px-2 font-semibold">
                          {sdgItem}
                        </p>
                      </div>
                    ))}
                </>
              ) : (
                <>
                  {sdg &&
                    sdg.map((sdgItem, index) => (
                      <div
                        key={index}
                        className="bg-sky-100 h-[25px] w-[70px] rounded-md mx-2"
                      >
                        <p className="text-[#0057A5] text-[10px] inline-block align-middle px-2 font-semibold">
                          {sdgItem}
                        </p>
                      </div>
                    ))}
                </>
              )}
              <MdKeyboardArrowDown
                className={`text-2xl ${isOpen ? "rotate-180" : ""}`}
              />
            </div>
          </div>
        </div>
      </button>
      {isOpen && <div className="py-4 px-2">{children}</div>}
    </div>
  );
};

const Significantwastebody = ({ selectedOrg, selectedCorp, year,togglestatus }) => {
  return (
    <>
      <div className="mx-3">
        <AccordionItem
          title="Significant waste related impact"
          tooltiptext={`This section contains disclosures for organizations to report information about their waste-related impacts`}
          sdg={["GRI 306-1"]}
          display="block"
          selectedOrg={selectedOrg}
          selectedCorp={selectedCorp}
          year={year}
          togglestatus={togglestatus}
        >
          <Significantwasteimpact
            selectedOrg={selectedOrg}
            selectedCorp={selectedCorp}
            year={year}
            togglestatus={togglestatus}
          />
        </AccordionItem>

        {/* Add more accordion items here */}
      </div>
    </>
  );
};

export default Significantwastebody;
