import React from 'react';

const AssignToWidget = (props) => {
  const {label, onClick} = props;

  return (
    <div className="w-[85px] h-[30px] px-2.5 py-1 bg-[#007EEF] rounded-l flex-col justify-center items-center inline-flex"  onClick={onClick}>
    <div className="justify-center items-center gap-2 inline-flex">
      <div className="relative text-white text-[13px] font-medium leading-snug tracking-wide">
      AssignTo
      </div>
    </div>
  </div>

  );
};

export default AssignToWidget;