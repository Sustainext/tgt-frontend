'use client'
import { useState, useEffect } from "react";
import { Energydata } from "../../shared/data/Energydata";
import { IoCloseOutline } from "react-icons/io5";
import { toast } from 'react-toastify';
import { patch } from '../../utils/axiosMiddleware'; // Assuming axiosInstance is in utils folder

const Header = ({ activeTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [data, setData] = useState([]);

  const toggleDrawerClose = () => {
    setIsOpen(!isOpen);
  };

  const toggleDrawer = (selected) => {
    setIsOpen(!isOpen);
    setCategory(selected);
  };

  useEffect(() => {
    const newData = Energydata.filter(program =>
      program.category.includes(category)
    );
    setData(newData);
  }, [category]);

  return (
    <div className="flex justify-between items-center border-b border-gray-200 pb-4 z-10">
      <div className="h-[46px] flex-col justify-start items-start gap-0.5 inline-flex ms-8 mt-8">
        <div className="text-black text-opacity-50 text-[11px] font-semibold font-['Manrope'] capitalize leading-[14px]">
          Environment
        </div>
        <div className="h-[30px]">
          <div className="h-[26px] flex justify-start items-end gap-3">
            <div className="gradient-text text-opacity-20 text-[22px] font-medium font-['Manrope'] leading-[1.425rem]">
              {activeTab}
            </div>
            <div className="w-[95px] pl-1 pr-0.5 bg-slate-200 rounded justify-center items-center flex">
              <div className="text-zinc-600 text-xs font-normal font-['Manrope'] leading-[21px]">
                Material Topic
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col border-l gap-2 absolute right-12 top-8">
        <div className="flex">
          {['1', '15', '16', '17', '18'].map((gri) => (
            <button
              key={gri}
              className="text-[#007EEF] bg-slate-200 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5"
              onClick={() => toggleDrawer(gri)}
            >
              GRI 302-{gri}
            </button>
          ))}
        </div>
        <div className="flex">
          {[
            { id: '2', label: 'SDG 7', bgColor: 'bg-amber-400' },
            { id: '3', label: 'SDG 8', bgColor: 'bg-red-900' },
            { id: '4', label: 'SDG 12', bgColor: 'bg-yellow-600' },
            { id: '5', label: 'SDG 13', bgColor: 'bg-lime-900' },
          ].map((sdg) => (
            <button
              key={sdg.id}
              className={`text-[#fff] ${sdg.bgColor} rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5`}
              onClick={() => toggleDrawer(sdg.id)}
            >
              {sdg.label}
            </button>
          ))}
        </div>
      </div>
      <div
        className={`${
          isOpen ? "translate-x-[15%] block" : "translate-x-[120%] hidden"
        }
        fixed right-[51px] top-0 w-[340px] h-full bg-white rounded-md
        transition-transform duration-300 ease-in-out z-[100] shadow-2xl px-2`}
      >
        {data.map((program) => (
          <div key={program.id}>
            <div className="flex justify-between p-2 pt-5 pb-4 border-b-2">
              <div className="ml-2">{program.header}</div>
              <div className="ml-2 float-right">
                <h5
                  className="text-[#727272] text-[17px] font-bold cursor-pointer"
                  onClick={toggleDrawerClose}
                >
                  <IoCloseOutline />
                </h5>
              </div>
            </div>
            <div>{program.data}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
