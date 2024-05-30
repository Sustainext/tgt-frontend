'use client'
import React, { useState, useEffect } from 'react';
import { MdOutlineClear, MdInfoOutline } from "react-icons/md";
import { Energydata } from "../../../environment/data/griinfo"
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'
import Socialheader from "../../socialheader"
import Ohsservicesmain from "./ohs-services"
const Ohsservices = () => {
    const [activeMonth, setActiveMonth] = useState("Jan");
    const [data, setData] = useState();
    const [category, setCategory] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawerclose = () => {
        setIsOpen(!isOpen);
    }
    const toggleDrawer = (selected) => {
        setIsOpen(!isOpen);
        setCategory(selected);
    };
    useEffect(() => {
        var newData = [];
        Energydata.map((program) => {
            program.category.map((tag) => {
                if (tag === category) {
                    newData.push(program);
                }
            })
        })
        // //console.log(newData);
        setData(newData);
    }, [category])

    return (
        <>
            <div className="flex flex-col justify-start overflow-x-hidden ">
                <div className="flex justify-between items-center border-b border-gray-200 mb-5 w-full">
                    <div className='w-full'>
                        <div className="text-left mb-4 ml-3 pt-5">
                            <p className="text-sm">Social</p>
                            <div className='flex'>
                                <div>
                                    <p className="gradient-text text-[22px] font-bold">
                                    Ocupational Health and Safety 2018
                                    </p>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div className='w-full float-end '>
                        <div className="flex float-end border-l">
                            <button className="text-[#007EEF] bg-slate-200 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5" onClick={() => toggleDrawer('33')}>GRI 403 - 3</button>

                            <button className="text-[#fff] bg-red-900 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5" onClick={() => toggleDrawer('29')}>SDG 8</button>
                        </div>
                    </div>
                </div>


                <div className="ml-3 flex">
                    <h6 className="text-[17px] mb-4 font-semibold flex">

                    Occupational Health Services
                        {/* <MdInfoOutline data-tooltip-id={`tooltip-$e1`}
                            data-tooltip-content="This section documents data corresponding to total water
                            withdrawn and total water discharged from areas with water stress." className="mt-1.5 ml-2 text-[14px]" />
                        <ReactTooltip id={`tooltip-$e1`} place="top" effect="solid" style={{
                            width: "290px", backgroundColor: "#000",
                            color: "white",
                            fontSize: "12px",
                            boxShadow: 3,
                            borderRadius: "8px",
                            textAlign: 'left',
                        }}>

                        </ReactTooltip> */}
                    </h6>
                </div>
                <div className={`${isOpen ? "translate-x-[15%] block" : "translate-x-[120%] hidden"}
fixed right-[51px]  w-[340px] h-full bg-white  rounded-md
transition-transform duration-300 ease-in-out z-[100] shadow-2xl px-2`}>

                    {data && data.map((program) => (
                        <>
                            <div className="flex justify-between p-2 pt-5 pb-4 border-b-2 ">
                                <div className="ml-2">
                                    {program.header}
                                </div>

                                <div className="ml-2 float-right">
                                    <h5 className="text-[#727272] text-[17px] font-bold cursor-pointer" onClick={toggleDrawerclose}><MdOutlineClear /></h5>
                                </div>

                            </div>
                            <div> {program.data}</div>
                        </>
                    ))}

                </div>
            </div>
            <Socialheader activeMonth={activeMonth} setActiveMonth={setActiveMonth} />
            <Ohsservicesmain />

        </>
    );
};
export default Ohsservices;
