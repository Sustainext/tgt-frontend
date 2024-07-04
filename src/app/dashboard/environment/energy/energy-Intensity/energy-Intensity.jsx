
'use client'
import React, { useState, useEffect } from 'react';
import EnvironmentHeader from '../../environmentheader';
import { MdOutlineClear, MdInfoOutline } from "react-icons/md";
import { Energydata } from '../../data/griinfo';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'
import Energyintensitybody from './energy-Intensity-body';

const Energyintensity = () => {
    const [activeMonth, setActiveMonth] = useState(1);
    const [location, setLocation] = useState("");
    const [year, setYear] = useState("");
    const [data, setData] = useState();
    const [category, setCategory] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [locationMessage, setLocationMessage] = useState("");
    const [yearMessage, setYearMessage] = useState('')

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
                        <div className="text-left mb-4 ml-3 pt-5 mb-3">
                            <p className="text-sm">Environment</p>
                            <div className='flex h-[28px]'>
                                <div className='h-[28px]'>
                                    <p className="gradient-text text-[22px] font-bold h-[28px] pt-1">
                                        Energy
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
                            <button className="text-[#007EEF] bg-slate-200 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5" onClick={() => toggleDrawer('16')}>GRI 302-3</button>
                            <button className="text-[#fff] bg-amber-400 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5 " onClick={() => toggleDrawer('2')}>SDG 7</button>
                            <button className="text-[#fff] bg-red-900 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5" onClick={() => toggleDrawer('3')}>SDG 8</button>
                            <button className="text-[#fff] bg-yellow-600 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5 " onClick={() => toggleDrawer('4')}>SDG 12</button>
                            <button className="text-[#fff] bg-lime-900 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5" onClick={() => toggleDrawer('5')}>SDG 13</button>
                        </div>
                    </div>
                </div>


                <div className="ml-3 flex mt-2">
                    <h6 className="text-[17px] mb-4 font-semibold flex">

                        Energy Intensity
                        <MdInfoOutline data-tooltip-id={`tooltip-$e1`}
                            data-tooltip-content="This section is dedicated to the calculation of Energy Intensity Ratios based on organizational metrics. These ratios quantify the energy demand per unit of activity, output, or any other organization-specific metric" className="mt-1.5 ml-2 text-[14px]" />
                        <ReactTooltip id={`tooltip-$e1`} place="bottom" effect="solid" style={{
                            width: "290px", backgroundColor: "#000",
                            color: "white",
                            fontSize: "12px",
                            boxShadow: 3,
                            borderRadius: "8px",
                            textAlign: 'left',
                            zIndex: 100,
                        }}>

                        </ReactTooltip>
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
            setLocationMessage={setLocationMessage}
            yearMessage={yearMessage}
            setYearMessage={setYearMessage}
             />
            <Energyintensitybody location={location} year={year} month={activeMonth} setLocationMessage={setLocationMessage} setYearMessage={setYearMessage} />
        </>
    );
};
export default Energyintensity;
