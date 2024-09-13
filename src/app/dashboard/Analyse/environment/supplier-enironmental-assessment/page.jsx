"use client";
import React, { useState, useEffect } from "react";
import { MdOutlineClear, MdInfoOutline } from "react-icons/md";
import "react-tooltip/dist/react-tooltip.css";
import Header from "./header";
import { Socialdata } from "../../../social/data/socialgriinfo";
import { Tooltip as ReactTooltip} from "react-tooltip";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Screen1 from "./screen1";
import Screen2 from "./screen2";
import Screen3 from "./screen3";

const SupplierEnvironmental = () => {
  const [activeMonth, setActiveMonth] = useState(1);
  const [year, setYear] = useState(2024);
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedCorp, setSelectedCorp] = useState("");

  const toggleDrawerclose = () => {
    setIsOpen(false);
  };

  const toggleDrawer = (selected) => {
    setIsOpen(true);
    setCategory(selected);
  };

  useEffect(() => {
    const newData = [];
    Socialdata.forEach((program) => {
      program.category.forEach((tag) => {
        if (tag === category) {
          newData.push(program);
        }
      });
    });
    setData(newData);
  }, [category]);

  return (
    <>
      <ToastContainer style={{ fontSize: "12px" }} />
      <div className="flex flex-col justify-start overflow-x-hidden">
       

      <div className="ml-3 flex relative mt-5">
          <h6 className="text-[17px] mb-4 font-semibold flex mx-1">
          New suppliers that were screened using environmental criteria
          </h6>
          {/* <MdInfoOutline
                data-tooltip-id={`tooltip-$e1`}
                data-tooltip-content="This section documents the data corresponding to the negative environmental impacts in the supply chain and actions taken."
                className="mt-1.5 ml-2 text-[14px]"
              />
              <ReactTooltip
                id={`tooltip-$e1`}
                place="top"
                effect="solid"
                style={{
                  width: "290px",
                  backgroundColor: "#000",
                  color: "white",
                  fontSize: "12px",
                  boxShadow: 3,
                  borderRadius: "8px",
                  textAlign: "left",
                }}
              ></ReactTooltip> */}
        </div>
       
      </div>
      <Header
        activeMonth={activeMonth}
        setActiveMonth={setActiveMonth}
        selectedOrg={selectedOrg}
        setSelectedOrg={setSelectedOrg}
        selectedCorp={selectedCorp}
        setSelectedCorp={setSelectedCorp}
        year={year}
        setYear={setYear}
      />
     
     <Screen1
        selectedOrg={selectedOrg}
        selectedCorp={selectedCorp}
        year={year}
      />
       <Screen2
        selectedOrg={selectedOrg}
        selectedCorp={selectedCorp}
        year={year}
      />
      <Screen3
        selectedOrg={selectedOrg}
        selectedCorp={selectedCorp}
        year={year}
      />
      
    </>
  );
};

export default SupplierEnvironmental;
