'use client'
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import Scope1 from "./scope1";
// import Consumedfuel from "./Consumed-fuel/Consumed-fuel";

const AccordionItem = ({ title, children,scops,icons, tooltiptext, sdg, visible, open }) => {
    const [isOpen, setIsOpen] = useState(false);

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


                <div className="w-[30%] ">
                    <div className="float-end">

                    <span>
                        <MdKeyboardArrowDown className={`text-2xl ${isOpen && "rotate-i80"}`} />
                    </span>
                    </div>

                </div>
            </button>
            {isOpen && <div className="p-4">{children}</div>}
        </div>
    );
};

const Emissionsnbody = ({ open }) => {

    return (
        <>
            <div className="mx-3">

                <AccordionItem
                    title="Direct emission from operations"
                    scops="Scope 1"
                    icons={<IoHomeOutline/>}
                // tooltiptext="This section documents data corresponding to energy consumed - including fuels.
                // Include:
                // Self-Generated Energy shall be incorporated in this context.
                // Exclude: Direct purchased Heating, Cooling, Electricity, and Steam. "

                >
                    <Scope1 open={open}/>
                </AccordionItem>


            </div>

        </>
    );
};

export default Emissionsnbody;
