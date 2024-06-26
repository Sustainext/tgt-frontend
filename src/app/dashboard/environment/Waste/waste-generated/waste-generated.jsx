
'use client'
import React, { useState, useEffect } from 'react';
import EnvironmentHeader from '../../environmentheader';
import { MdOutlineClear, MdInfoOutline } from "react-icons/md";
import { Energydata } from '../../data/griinfo';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'
import Wastegeneratedbody from './waste-generated-body';
const Wastegenerated = () => {
    const [activeMonth, setActiveMonth] = useState(1);
    const [location, setLocation] = useState("");
    const [year, setYear] = useState("");
    const [data, setData] = useState();
    const [category, setCategory] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [locationMessage, setLocationMessage] = useState("");

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
                            <p className="text-sm">Environment</p>
                            <div className='flex'>
                                <div>
                                    <p className="gradient-text text-[22px] font-bold pt-1">
                                        Waste
                                    </p>
                                </div>
                                <div className="bg-gray-100 h-[22px] w-[100px]  mx-2 mt-2 rounded-md" >
                                    <p className="text-gray-500 text-[12px] pt-0.5 px-2">Material Topic</p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='w-full float-end '>
                        <div className="flex float-end border-l">
                            <button className="text-[#007EEF] bg-slate-200 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5" onClick={() => toggleDrawer('26')}>GRI 306 - 3</button>
                            <button className="text-[#fff] bg-[#4C9F38] rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5 " onClick={() => toggleDrawer('46')}>SDG 3</button>
                            <button className="text-[#fff] bg-cyan-500 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5" onClick={() => toggleDrawer('49')}>SDG 6</button>
                            <button className="text-[#fff] bg-[#FD9D24] rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5 " onClick={() => toggleDrawer('48')}>SDG 11</button>
                            <button className="text-[#fff] bg-yellow-600 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5" onClick={() => toggleDrawer('45')}>SDG 12</button>
                            <button className="text-[#fff] bg-[#56C02B] rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5" onClick={() => toggleDrawer('23')}>SDG 15</button>
                        </div>
                    </div>
                </div>


                <div className="ml-3 flex">
                    <h6 className="text-[17px] mb-4 font-semibold flex">

                        Topic disclosure
                        {/* <MdInfoOutline data-tooltip-id={`tooltip-$e1`}
                            data-tooltip-content="This section is dedicated to the calculation of Energy Intensity Ratios based on organizational metrics. These ratios quantify the energy demand per unit of activity, output, or any other organization-specific metric" className="mt-1.5 ml-2 text-[14px]" />
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
            <EnvironmentHeader
            activeMonth={activeMonth}
            setActiveMonth={setActiveMonth}
            location={location}
            setLocation={setLocation}
            year={year}
            setYear={setYear}
            locationMessage={locationMessage}
            setLocationMessage={setLocationMessage} />
            <Wastegeneratedbody location={location} year={year} month={activeMonth} setLocationMessage={setLocationMessage} />
        </>
    );
};
export default Wastegenerated;
