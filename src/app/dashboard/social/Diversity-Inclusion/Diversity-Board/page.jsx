'use client';
import React, { useState } from 'react';

import Section1 from "./Section1/page";
import Section2 from "./Section2/page";

const DiversityBoard = () => {
    // State to track the current section
    const [currentSection, setCurrentSection] = useState(1);

    return (
        <>
            {/* Conditionally render sections based on the current state */}
            {currentSection === 1 && <Section1 />}
            {currentSection === 2 && <Section2 />}

            {/* Navigation buttons */}
            <div className="flex space-x-2 justify-end">
                {/* Show the Previous button, disable and style differently if on the first section */}
                <button
                    onClick={() => currentSection > 1 && setCurrentSection(currentSection - 1)}
                    className={` text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center ${
                        currentSection === 1 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={currentSection === 1}
                >
                    Previous
                </button>

                {/* Show the Next button only if it's not the last section */}
                {currentSection < 2 && (
                    <button
                        onClick={() => setCurrentSection(currentSection + 1)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
                    >
                        Next
                    </button>
                )}
            </div>
        </>
    );
};

export default DiversityBoard;
