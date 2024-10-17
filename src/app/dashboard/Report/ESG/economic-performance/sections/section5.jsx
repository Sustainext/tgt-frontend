"use client";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

const Section5 = ({ section11_2Ref }) => {
    const data = useSelector(state => state.screen11Slice.getdata);
  
    return (
        <>
            <div id="section11_2" ref={section11_2Ref}>
                <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
                    11.2 Infrastructure Investment and Services Supported
                </h3>

                {/* Iterate over the array data in case there are multiple entries */}
                {data['203_1a']?.map((item, index) => (
                    <p key={`203_1a_${index}`} className="text-sm mb-4">
                        {item.Q1 || "No data available"}
                    </p>
                ))}

                {data['203_1b']?.map((item, index) => (
                    <p key={`203_1b_${index}`} className="text-sm mb-4">
                        {item.Q1 || "No data available"}
                    </p>
                ))}

                {data['203_1c']?.map((item, index) => (
                    <p key={`203_1c_${index}`} className="text-sm mb-4">
                        {item.Q1 || "No data available"}
                    </p>
                ))}
            </div>
        </>
    );
};

export default Section5;
