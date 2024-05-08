'use client'
import { useState } from "react";
import { MdKeyboardArrowDown, MdPower, MdOutlineLocalShipping,MdInfoOutline  } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import Scope1 from "./scope1";
import Scope2 from "./scope2";
import Scope3 from "./scope3";
// import Consumedfuel from "./Consumed-fuel/Consumed-fuel";
import { GlobalState } from "../../../../Context/page";
const AccordionItem = ({ title, children, scops, icons,activeMonth, tooltiptext, sdg, visible }) => {
    const [isOpen, setIsOpen] = useState(false);
    const {open} = GlobalState();
    return (
        <div className={`shadow-md py-1  mb-4 rounded-[8px] cursor-pointer border border-b-3 border-neutral-200 ${open ? "w-[100%]" : "w-[100%]"}`}>
            <button
                className="py-3  w-[100%]  text-left flex"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center px-3 w-[30%] ">
                    <h5 className="text-[18px]">{icons}</h5> <h5 className="text-[12px]  text-[#344054] pt-1 px-3 font-semibold">{scops}</h5>
                </div>
                <div className="w-[40%]">
                    <h5 className="text-[12px]  text-[#344054] pt-1 px-3 font-semibold text-center">{title}</h5>
                </div>


                <div className="w-[30%] mx-2">
                    <div className="float-end">

                        <span>
                            <MdKeyboardArrowDown className={`text-2xl ${isOpen && "rotate-i80"}`} />
                        </span>
                    </div>

                </div>
            </button>
            {isOpen && <div className="py-4 px-4 w-full">
            <div className="h-4 px-1 py-0.5 opacity-80 bg-gradient-to-r from-[#007EEF] to-[#2AE4FF] rounded-sm justify-start items-start gap-2.5 inline-flex ms-5"><div className="text-white text-[11px] font-bold uppercase leading-none">{activeMonth}</div></div>
                {children}

                </div>}
        </div>
    );
};

const Emissionsnbody = ({ activeMonth }) => {

    return (
        <>
            <div className="mx-3">

                <AccordionItem
                    title="Direct emission from operations"
                    scops="Scope 1"
                    icons={<IoHomeOutline />}
activeMonth={activeMonth}

                >
                    <Scope1  />
                </AccordionItem>

                <AccordionItem
                    title="InDirect emission from operations"
                    scops="Scope 2"
                    icons={<MdPower />}
                    activeMonth={activeMonth}

                >
                    <Scope2 />
                </AccordionItem>
                <AccordionItem
                    title="All other emissions (associated)"
                    scops="Scope 3"
                    icons={<MdOutlineLocalShipping />}
                    activeMonth={activeMonth}

                >
                    <Scope3 />
                </AccordionItem>
            </div>

        </>
    );
};

export default Emissionsnbody;
