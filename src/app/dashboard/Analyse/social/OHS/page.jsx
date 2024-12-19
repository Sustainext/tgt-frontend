"use client";
import { useState } from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import Section1 from "./Section1/page";
import Section2 from "./Section2/page";

const AnalyseOHS = () => {
  // State to track the current active screen
  const [activeScreen, setActiveScreen] = useState(1);

  // Handlers to move between screens
  const handleNextScreen = () => {
    setActiveScreen((prevScreen) => (prevScreen < 2 ? prevScreen + 1 : prevScreen));
  };

  const handlePreviousScreen = () => {
    setActiveScreen((prevScreen) => (prevScreen > 1 ? prevScreen - 1 : prevScreen));
  };

  return (
    <div className="analyse-container">
      {activeScreen === 1 && <Section1 />}
      {activeScreen === 2 && <Section2 />}

      <div className="fixed bottom-8 right-8 flex gap-2">
        <button
          onClick={handlePreviousScreen}
          disabled={activeScreen === 1}
          className={`flex items-center h-8 px-4 py-2 text-black/opacity-40 ${
            activeScreen === 1 ? "cursor-not-allowed" : "hover:bg-gray-200"
          }`}
        >
          <GrFormPrevious className="mr-2" />
          Previous
        </button>
        <button
          onClick={handleNextScreen}
          disabled={activeScreen === 2}
          className={`flex items-center h-8 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 ${
            activeScreen === 2 ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          Next
          <GrFormNext className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default AnalyseOHS;
