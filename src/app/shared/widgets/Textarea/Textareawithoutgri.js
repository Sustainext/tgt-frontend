import React from "react";
import { GlobalState } from "../../../../Context/page";

const Textareawithoutgri = (props) => {
  const { open } = GlobalState();
  const { onChange, value = "", uiSchema = {} } = props;

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <>
      <div className="px-1">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h6 className="text-[14px] text-neutral-900">
              {uiSchema["ui:title"]}
            </h6>
          </div>
     
        </div>
        <div className="">
          <textarea
            placeholder="Enter a description..."
            className={`backdrop:before:w-[48rem] border appearance-none text-[12px] border-gray-400 text-neutral-900 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full
          `}
            value={value}
            onChange={handleChange}
            rows={7}
          />
        </div>
      </div>
    </>
  );
};

export default Textareawithoutgri;
