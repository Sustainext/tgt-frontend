"use client";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import Scope1 from "./scope1";
import Scope2 from "./scope2";
import Scope3 from "./scope3";

const AccordionItem = ({
  title,
  children,
  scops,
  icons,
  tooltiptext,
  sdg,
  visible,
  open,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`shadow-md py-1  mb-4 rounded-[8px] cursor-pointer border border-b-3 border-neutral-200 ${
        open ? "w-[100%]" : "w-[100%]"
      }`}
    >
      <button
        className="py-3  w-[100%]  text-left flex"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center px-3 w-[30%] ">
          <h5 className="text-[18px]">{icons}</h5>{" "}
          <h5 className="text-[12px]  text-[#344054] pt-1 px-3 font-semibold">
            {scops}
          </h5>
        </div>
        <div className="w-[40%]">
          <h5 className="text-[12px]  text-[#344054] pt-1 px-3 font-semibold text-center">
            {title}
          </h5>
        </div>

        <div className="w-[30%] ">
          <div className="float-end">
            <span>
              <MdKeyboardArrowDown
                className={`text-2xl ${isOpen && "rotate-i80"}`}
              />
            </span>
          </div>
        </div>
      </button>
      {isOpen && <div className="p-4">{children}</div>}
    </div>
  );
};
const Emissionsnbody = ({  location, year, month, countryCode }) => {
  return (
    <>
      <div className="mx-3">
        <AccordionItem
          title="Direct emission from operations"
          scops="Scope 1"
          icons={<IoHomeOutline />}
        >
          <Scope1 location={location} year={year} month={month} countryCode={countryCode} />
        </AccordionItem>

        <AccordionItem
          title="InDirect emission from operations"
          scops="Scope 2"
          icons={<IoHomeOutline />}
        >
          <Scope2 location={location} year={year} month={month} countryCode={countryCode}/>
        </AccordionItem>

        <AccordionItem
          title="All other emissions (associated)"
          scops="Scope 3"
          icons={<IoHomeOutline />}
        >
          <Scope3 location={location} year={year} month={month} countryCode={countryCode}/>
        </AccordionItem>
      </div>
    </>
  );
};

export default Emissionsnbody;
