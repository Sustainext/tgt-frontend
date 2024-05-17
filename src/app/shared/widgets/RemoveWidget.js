import React from 'react';
import { MdOutlineDeleteOutline } from "react-icons/md";

const RemoveWidget = ({ index, onRemove }) => {
  const handleRemove = () => {
    onRemove(parseInt(index, 10));
    console.log(parseInt(index, 10));
  };

  return (
    <div className='flex justify-center items-center mt-2'>
  <button type="button" onClick={handleRemove} className=" text-red-500">
      <MdOutlineDeleteOutline className='text-[23px]' />
    </button>
    </div>

  );
};

export default RemoveWidget;
