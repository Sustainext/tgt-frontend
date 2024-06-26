
import React from 'react';
import { MdOutlineDeleteOutline } from "react-icons/md";
const RemoveWidget = ({ id, onRemove}) => {

  const index = id.split('_')[1]; // Extract index from id (assuming id is like "root_0", "root_1", etc.)

  const handleClick = () => {
    onRemove(parseInt(index)); // Convert index to integer and pass to onRemove function
  };

  return (
    <div className='flex justify-between items-center mt-2 ml-2'>

      <button type="button" onClick={handleClick} className="text-red-500">
        <MdOutlineDeleteOutline className='text-[23px]' />
      </button>
    </div>
  );
};

export default RemoveWidget;