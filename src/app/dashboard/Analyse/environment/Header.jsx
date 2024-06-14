import { useState, useEffect } from "react";
import { Energydata } from "./../../../shared/data/Energydata";
import { MdOutlineClear, MdInfoOutline } from "react-icons/md";
import { toast } from 'react-toastify';
import { patch } from '../../../utils/axiosMiddleware';

const Header = ({ activeTab, setIsBoxOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [data, setData] = useState([]);

  const toggleDrawerClose = () => {
    setIsOpen(!isOpen);
    setIsBoxOpen(prev => !prev);
  };

  const toggleDrawer = (selected) => {
    setIsOpen(!isOpen);
    setCategory(selected);
    setIsBoxOpen(prev => !prev);
  };

  useEffect(() => {
    const newData = Energydata.filter(program =>
      program.category.includes(category)
    );
    setData(newData);
  }, [category]);

  const gri = [
    {
      category: "Energy",
      tag: "GRI 302",
      data: [
        { tagid: "1", infoid: "1" },
        { tagid: "2", infoid: "2" },
        { tagid: "3", infoid: "3" },
        { tagid: "4", infoid: "4" },
        { tagid: "5", infoid: "5" },
      ]
    },
    {
      category: "Waste",
      tag: "GRI 306",
      data: [
        { tagid: "1", infoid: "6" },
        { tagid: "2", infoid: "7" },
        { tagid: "3", infoid: "8" },
        { tagid: "4", infoid: "9" },
        { tagid: "5", infoid: "10" },
      ]
    },
    {
      category: "Materials",
      tag: "GRI 301",
      data: [
        { tagid: "1", infoid: "11" },
        { tagid: "2", infoid: "12" },
        { tagid: "3", infoid: "13" },

      ]
    },
    {
      category: "Water and effluents",
      tag: "GRI 303",
      data: [
        { tagid: "1", infoid: "14" },
        { tagid: "2", infoid: "15" },
        { tagid: "3", infoid: "16" },
        { tagid: "4", infoid: "17" },
        { tagid: "5", infoid: "18" },

      ]
    }
  ];
  const sdg = [
    {
      category: "Energy",
      data: [
        { id: 'sd1', label: 'SDG 7', bgColor: 'bg-amber-400' },
        { id: 'sd2', label: 'SDG 8', bgColor: 'bg-red-900' },
        { id: 'sd3', label: 'SDG 12', bgColor: 'bg-yellow-600' },
        { id: 'sd4', label: 'SDG 13', bgColor: 'bg-lime-900' },
      ]
    },
    {
      category: "Waste",
      data: [
        { id: 'sd5', label: 'SDG 3', bgColor: 'bg-[#4C9F38]' },
        { id: 'sd6', label: 'SDG 6', bgColor: 'bg-cyan-500' },
        { id: 'sd2', label: 'SDG 8', bgColor: 'bg-red-900' },
        { id: 'sd7', label: 'SDG 11', bgColor: 'bg-amber-400' },
        { id: 'sd3', label: 'SDG 12', bgColor: 'bg-yellow-600' },
        { id: 'sd8', label:'SDG 15', bgColor: 'bg-[#56C02B]' },
      ]
    },
    {
      category: "Materials",
      data: [

        { id: 'sd2', label: 'SDG 8', bgColor: 'bg-red-900' },
        { id: 'sd9', label: 'SDG 12', bgColor: 'bg-yellow-600' },

      ]
    },
    {
      category: "Water and effluents",
      data: [

        { id: 'sd6', label: 'SDG 6', bgColor: 'bg-cyan-500' },


      ]
    }
  ];
  return (
    <>
    <div className="flex justify-between items-center border-b border-gray-200 pb-4 z-[100] relative">
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
          {gri.filter(g => g.category === activeTab).map((g) => (
            g.data.map((item) => (
              <button
                key={item.tagid}
                className="text-[#007EEF] bg-slate-200 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5"
                onClick={() => toggleDrawer(item.infoid)}
              >
                {g.tag} - {item.tagid}
              </button>
            ))
          ))}
        </div>
        <div className="flex">
          {sdg.filter(s => s.category === activeTab).map((s) => (
            s.data.map((item) => (
              <button
                key={item.id}
                className={`text-[#fff] ${item.bgColor} rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5`}
                onClick={() => toggleDrawer(item.id)}
              >
                {item.label}
              </button>
            ))
          ))}
        </div>
      </div>
      <div className={`${isOpen ? "translate-x-[15%] block top-16" : "translate-x-[120%] hidden top-16"}
     fixed right-[51px]  w-[340px] h-full bg-white  rounded-md
     transition-transform duration-300 ease-in-out z-[100] shadow-2xl px-2`}>

         {data && data.map((program) => (
           <>
             <div className="flex justify-between p-2 pt-5 pb-4 border-b-2 ">
               <div className="ml-2">
                 {program.header}
               </div>

               <div className="ml-2 float-right">
                 <h5 className="text-[#727272] text-[17px] font-bold cursor-pointer"
                 onClick={toggleDrawerClose}>
                   <MdOutlineClear />
                   </h5>
               </div>

             </div>
             <div> {program.data}</div>
           </>
         ))}

       </div>
    </div>

       </>
  );
};

export default Header;
