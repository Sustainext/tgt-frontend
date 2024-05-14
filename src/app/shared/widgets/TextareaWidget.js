import React from "react";
import { GlobalState } from "../../../Context/page";
const TextareaWidget = (props) => {
  const { open } = GlobalState();
  const handleChange = (event) => {
    props.onChange(event.target.value);
  };
  return (
    <>
    <div className='flex justify-between items-center mb-2'>
    <div >
        <h6 className="text-sm text-[#727272]">{props.uiSchema["ui:title"]}</h6>
      </div>
      <div className={`${open ? 'w-[20%]' : 'w-[20%]'}`}>
        <div className="bg-sky-100 h-[25px] w-[70px] rounded-md mx-2">
          <p className="text-[#395f81] text-[10px] inline-block align-middle px-2 font-semibold">
            {props.uiSchema["ui:Gri"]}
          </p>
        </div>
      </div>
    </div>


      <textarea
        placeholder={`Enter a description...`}
        className={`backdrop:before:w-[48rem] border appearance-none text-xs border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer ${
          open
            ? "sm:w-[48rem] md:w-[89%] lg:w-[87%] xl:w-[90.5%] 2xl:w-[85%] "
            : "sm:w-[85%] md:w-[92%] lg:w-[88%] xl:w-[88.5%] 2xl:sm:w-[86%]"
        }`}
        value={props.value || ""}
        onChange={(event) => handleChange(event.target.value)}
        rows={7}
      />
    </>
  );
};

export default TextareaWidget;
