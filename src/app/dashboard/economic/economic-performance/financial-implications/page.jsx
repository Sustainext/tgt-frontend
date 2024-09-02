'use client';
import React, { useState } from 'react';
import { MdChevronRight, MdChevronLeft } from "react-icons/md";
import Section1 from "./Section1/page";
import Section2 from "./Section2/page";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Financialimplications = () => {
    // State to track the current section
    const [currentSection, setCurrentSection] = useState(1);

    return (
        <>
            <ToastContainer style={{ fontSize: "12px" }} />
            {currentSection === 1 && <Section1 />}
            {currentSection === 2 && <Section2 />}

            {/* Navigation buttons */}
            <div className="flex space-x-2 justify-end mr-4">
                {/* Show the Previous button, disable and style differently if on the first section */}
                <button
                    onClick={() => currentSection > 1 && setCurrentSection(currentSection - 1)}
                    className={` text-gray-800 font-semibold py-1 w-[100px] rounded inline-flex items-center ${currentSection === 1 ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    disabled={currentSection === 1}
                >
                    <MdChevronLeft className='text-[20px]' /> Previous
                </button>

                {/* Show the Next button only if it's not the last section */}
                {currentSection < 2 && (
                    <button
                        onClick={() => setCurrentSection(currentSection + 1)}
                        className={`flex justify-center  items-center text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline`}
                    >
                        Next  <MdChevronRight className='text-[20px] ml-4' />
                    </button>
                )}
            </div>
        </>
    );
};

export default Financialimplications;
