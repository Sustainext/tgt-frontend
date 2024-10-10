"use client";
import { useState, useRef, useEffect } from "react";
import {useSelector } from "react-redux";
const Section5 = ({ section11_2Ref }) => {
    const data = useSelector(state => state.screen11Slice.getdata);
  
  return (
    <>
      <div id="section11_2" ref={section11_2Ref}>
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
          11.2 Infrastructure Investment and Services Supported
        </h3>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-[500]">
          Extent of development of significant infrastructure investments and
          services supported
        </h3>
        <p className="text-sm mb-4">{ data?.['203_1a']}</p>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-[500]">
          Current or expected impacts on communities and local economies:
        </h3>
        <p className="text-sm mb-4">{ data?.['203_1b']}</p>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-[500]">
          Nature of the investments and services:
        </h3>
        <p className="text-sm mb-4">{ data?.['203_1c']}</p>
      </div>
    </>
  );
};

export default Section5;
