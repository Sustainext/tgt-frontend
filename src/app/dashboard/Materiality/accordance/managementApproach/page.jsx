"use client";
import React, { useState, useEffect } from "react";
import { GRIData } from "../../data/GRIinfo";
import { MdOutlineClear, MdInfoOutline, MdOutlineDone } from "react-icons/md";
import InputField from "./InputField";
import Table from "./table";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const ManagementApproach = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState();
  const [category, setCategory] = useState("");
  const [tableDataSubmit, setTableDataSubmit] = useState(false);

  const toggleDrawerclose = () => {
    setIsOpen(!isOpen);
  };
  const toggleDrawer = (selected) => {
    setIsOpen(!isOpen);
    setCategory(selected);
  };

  useEffect(() => {
    const newData = GRIData.filter((program) =>
      program.category.includes(category)
    );
    setData(newData);
  }, [category]);

  return (
    <>
      {/* side pannel for GRI 3-2 detail */}
      <div
        className={`${
          isOpen ? "translate-x-[15%] block" : "translate-x-[120%] hidden"
        }
      fixed right-[51px]  w-[340px] h-[93%] bg-white  rounded-md
      transition-transform duration-300 ease-in-out z-[100] shadow-2xl px-2`}
      >
        {data &&
          data.map((program) => (
            <>
              <div className="flex justify-between p-2 pt-5 pb-4 border-b-2 ">
                <div className="ml-2">{program.header}</div>

                <div className="ml-2 float-right">
                  <h5
                    className="text-[#727272] text-[17px] font-bold cursor-pointer"
                    onClick={toggleDrawerclose}
                  >
                    <MdOutlineClear />
                  </h5>
                </div>
              </div>
              <div> {program.data}</div>
            </>
          ))}
      </div>
      {/* select Materiality topic start */}
      <div className="w-full">
        <div className="flex flex-col justify-start overflow-x-hidden ">
          <div className="flex justify-between items-center border-b border-gray-200 w-full">
            <div className="w-full">
              <div className="text-left mb-2 ml-3 pt-5">
                <div className="flex justify-between items-center">
                  <div className="w-[70%]">
                    <p className="gradient-text text-[22px] font-bold pt-4 pb-4 mx-2">
                      Management Approach
                    </p>
                  </div>
                  <div className="w-full float-end px-5 ">
                    <div className="flex float-end border-l">
                      <div>
                        <button
                          className="text-[#007EEF] bg-slate-200 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5"
                          onClick={() => toggleDrawer("3")}
                        >
                          GRI 3-3
                        </button>
                      </div>
                      <div className=" relative">
                        <button
                          data-tooltip-id={`tooltip-$brsr2`}
                          data-tooltip-content="BRSR-Section A-VII-26"
                          className="text-[#18736B] bg-slate-200 rounded-full text-[11px] w-[90px] h-[22px] ml-2 text-center pt-0.5"
                          // onClick={() => toggleDrawer("92")}
                        >
                          BRSR A-VII-26
                        </button>
                        <ReactTooltip
                          id={`tooltip-$brsr2`}
                          place="bottom"
                          effect="solid"
                          style={{
                            width: "290px",
                            backgroundColor: "#000",
                            color: "white",
                            fontSize: "12px",
                            boxShadow: 3,
                            borderRadius: "8px",
                            textAlign: "center",
                          }}
                        ></ReactTooltip>
                      </div>
                      <div className=" relative">
                        <button
                          data-tooltip-id={`tooltip-$brsr3`}
                          data-tooltip-content="BRSR-Section C-Principle 4-Leadership  Indicators-2"
                          className="text-[#18736B] bg-slate-200 rounded-full text-[11px] w-[90px] h-[22px] ml-2 text-center pt-0.5"
                          // onClick={() => toggleDrawer("92")}
                        >
                          BRSR C-P4-L2
                        </button>
                        <ReactTooltip
                          id={`tooltip-$brsr3`}
                          place="bottom"
                          effect="solid"
                          style={{
                            width: "290px",
                            backgroundColor: "#000",
                            color: "white",
                            fontSize: "12px",
                            boxShadow: 3,
                            borderRadius: "8px",
                            textAlign: "center",
                          }}
                        ></ReactTooltip>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Table
        setTableDataSubmit={setTableDataSubmit}
        tableDataSubmit={tableDataSubmit}
      />
      <InputField
        setTableDataSubmit={setTableDataSubmit}
        tableDataSubmit={tableDataSubmit}
      />
    </>
  );
};

export default ManagementApproach;
