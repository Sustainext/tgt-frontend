import React from "react";

const AssignToWidget = (props) => {
  return (
    <div className="flex justify-center items-center mt-2">
      <button className=" text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline">
        AssignTo
      </button>
    </div>
  );
};

export default AssignToWidget;
