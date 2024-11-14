"use client";
import React, { useState } from "react";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";
import Section1 from "./Section1/page";
import Section4 from "./Section4/page";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Riskscreen = ({ location, year, month }) => {
  const [currentSection, setCurrentSection] = useState(1);

  const totalSections =2;

  const renderSection = () => {
    switch (currentSection) {
      case 1:
        return <Section1 />;
      case 2:
        return <Section4 />;
      default:
        return <Section1 />;
    }
  };

  return (
    <>
      <ToastContainer style={{ fontSize: "12px" }} />
      {renderSection()}

      {/* Pagination with Previous and Next icons */}
      <div className="flex space-x-2 justify-end mt-4">
        {/* Previous Icon */}
        <button
          onClick={() => setCurrentSection(currentSection - 1)}
          className={`py-1 px-3 rounded-md ${
            currentSection === 1
              ? "opacity-50 cursor-not-allowed"
              : "text-gray-800 hover:bg-blue-600 hover:text-white"
          } focus:outline-none`}
          disabled={currentSection === 1}
        >
          <MdChevronLeft className="text-[20px]" />
        </button>

        {/* Page numbers */}
        {[...Array(totalSections)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentSection(index + 1)}
            className={`py-1 px-3 rounded-md ${
              currentSection === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            } hover:bg-blue-600 hover:text-white focus:outline-none`}
          >
            {index + 1}
          </button>
        ))}

        {/* Next Icon */}
        <button
          onClick={() => setCurrentSection(currentSection + 1)}
          className={`py-1 px-2 rounded-md ${
            currentSection === totalSections
              ? "opacity-50 cursor-not-allowed"
              : " text-gray-800 hover:bg-blue-600 hover:text-white"
          } focus:outline-none`}
          disabled={currentSection === totalSections}
        >
          <MdChevronRight className="text-[20px]" />
        </button>
      </div>
    </>
  );
};

export default Riskscreen;
