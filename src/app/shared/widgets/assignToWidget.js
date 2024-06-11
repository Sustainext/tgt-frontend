import React from "react";

const AssignToWidget = (props) => {
  return (
    <div className="flex justify-center items-center mt-2">
      <button className=" text-center py-1 text-sm w-[100px] bg-[rgb(2,132,199)] text-white rounded hover:bg-[rgb(2,132,199)/0.7] focus:outline-none focus:shadow-outline">
        AssignTo
      </button>
    </div>
  );
};

export default AssignToWidget;
