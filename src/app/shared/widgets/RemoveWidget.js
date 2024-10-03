import React from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
const RemoveWidget = ({ index, onRemove, label, id }) => {
  const handleClick = () => {
    if (index !== null) {
      onRemove(index);
    } else {
      console.error("Index could not be determined from id:", id);
    }
  };

  return (
    <>
      <div className={id.startsWith("root_0") ? "mb-[3.2rem]" : "mb-[0.8rem]"}>
        <p className="text-[14px] h-[35px] text-neutral-950 font-[400] mb-1 hidden">
          {label}
        </p>
      </div>
      <div className="flex justify-between items-center mt-2">
        <button type="button" onClick={handleClick} className="text-red-500">
          <MdOutlineDeleteOutline className="text-[20px]" />
        </button>
      </div>
    </>
  );
};

export default RemoveWidget;
