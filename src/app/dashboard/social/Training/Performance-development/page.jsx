'use client'
import React, { useState, useEffect } from 'react';
import { MdOutlineClear, MdInfoOutline,MdChevronRight } from "react-icons/md";
import {Socialdata} from "../../data/socialgriinfo"
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Socialheader from '../../socialheader';
import Screen1 from "./Screen1"
const Performancedevelopment = () => {
    const [activeMonth, setActiveMonth] = useState(1);
    const [location, setLocation] = useState("");
    const [year, setYear] = useState();
    const [data, setData] = useState();
    const [category, setCategory] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOrg, setSelectedOrg] = useState("");
    const [selectedCorp, setSelectedCorp] = useState("");
    const toggleDrawerclose = () => {
        setIsOpen(!isOpen);
    }
    const toggleDrawer = (selected) => {
        setIsOpen(!isOpen);
        setCategory(selected);
    };
    useEffect(() => {
        var newData = [];
        Socialdata.map((program) => {
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
         <ToastContainer style={{ fontSize: "12px" }} />
            <div className="flex flex-col justify-start overflow-x-hidden ">
                <div className="flex justify-between items-center border-b border-gray-200 mb-5 w-full">
                    <div className='w-full'>
                       <div className="text-left mb-2 ml-3 pt-5">
                            <p className="text-[11px]">Social</p>
                            <div className='flex'>
                                <div>
                                   <p className="gradient-text text-[22px] font-bold py-2">
                                   Training and Development
                                    </p>
                                </div>

                            </div>

                        </div>
                    </div>
                 <div className="w-full float-end pt-5 me-1">
                        <div className="flex float-end border-l">
                        <button className="text-[#007EEF] bg-slate-200 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5" onClick={() => toggleDrawer('56')}>GRI 404 - 3</button>
                            <button className="text-[#fff] bg-orange-600 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5" onClick={() => toggleDrawer('2')}>SDG 5</button>
                            <button className="text-[#fff] bg-red-900 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5" onClick={() => toggleDrawer('8')}>SDG 8</button>
                            <button className="text-[#fff] bg-[#E01A83] rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5" onClick={() => toggleDrawer('53')}>SDG 10</button>
                        </div>
                    </div>
                </div>


                <div className="ml-3 flex">
                    <h6 className="text-[17px] mb-4 font-semibold flex">

                    Percentage of employees receiving regular performance and career development reviews
                        {/* <MdInfoOutline data-tooltip-id={`tooltip-$e1`}
                            data-tooltip-content="This section documents data corresponding to total water
                            withdrawn and total water discharged from areas with water stress." className="mt-1.5 ml-2 text-[15px]" />
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
                    <div
           className={`${
            isOpen
              ? "translate-x-[15%] block top-16"
              : "translate-x-[120%] hidden top-16"
          }
fixed right-[51px]  w-[360px] h-[92%] bg-white  rounded-md
transition-transform duration-300 ease-in-out z-[100] shadow-2xl px-2`}
        >
          {data &&
            data.map((program, index) => (
              <div key={index}>
                {/* Header */}
                <div className="flex justify-between p-2 pt-5 pb-4 border-b-2 ">
                  <div className="ml-2 h-[38px]">{program.header}</div>
                  <div className="ml-2 float-right ">
                    <h5
                      className="text-[#727272] text-[17px] font-bold cursor-pointer"
                      onClick={toggleDrawerclose}
                    >
                      <MdOutlineClear />
                    </h5>
                  </div>
                </div>

                {/* Data Content */}
                <div className="h-[calc(100vh-30px)] overflow-y-auto custom-scrollbar p-2">
                  {program.data}
                </div>

                {/* Footer (Learn more link) */}
                <div className="pt-2 pb-4 ml-4">
                  <a
                    className="text-[14px] text-[#2196F3] pt-1 inline-flex"
                    href={program.link}
                    target="_blank"
                  >
                    Learn more <MdChevronRight className="text-lg pt-1" />
                  </a>
                </div>
              </div>
            ))}
        </div>
            </div>
            <Socialheader
                activeMonth={activeMonth}
                setActiveMonth={setActiveMonth}
                location={location}
                setLocation={setLocation}
                year={year}
                setYear={setYear}
            />
            <Screen1 location={location} year={year} month={activeMonth} />

        </>
    );
};
export default Performancedevelopment;
