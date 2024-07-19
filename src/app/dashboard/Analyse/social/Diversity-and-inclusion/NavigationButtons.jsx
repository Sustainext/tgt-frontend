import { GrFormPrevious, GrFormNext } from "react-icons/gr";

const NavigationButtons = ({ activeScreen, handleNextScreen, handlePreviousScreen }) => {
  return (
    <div className="fixed bottom-8 right-8 flex gap-2">
      <button
        onClick={handlePreviousScreen}
        disabled={activeScreen === 1}
        className={`flex items-center h-8 px-4 py-2 text-black/opacity-40 ${
          activeScreen === 1
            ? "cursor-not-allowed"
            : ""
        }`}
      >
        <GrFormPrevious className="mr-2" />
        Previous
      </button>
      <button
        onClick={handleNextScreen}
        className="flex items-center h-8 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
      >
        Next
        <GrFormNext className="ml-2" />
      </button>
    </div>
  );
};

export default NavigationButtons;
