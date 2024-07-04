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
      category: "Tab1",
      tag: "GRI 401",
      data: [
        { tagid: "1", infoid: "19" },
        { tagid: "2", infoid: "20" },
        { tagid: "3", infoid: "21" },

      ]
    },
    {
      category: "Tab2",
      tag: "GRI 403",
      data: [
        { tagid: "4", infoid: "22" },
        { tagid: "8", infoid: "23" },
        { tagid: "9", infoid: "24" },
        { tagid: "10", infoid: "25"},

      ]
    },
    {
      category: "Tab3",
      tag: "GRI 408",
      data: [
        { tagid: "1", infoid: "26" },



      ]
    },
    {
      category: "Tab4",
      tag: "GRI 409",
      data: [
        { tagid: "1", infoid: "27" },


      ]
    }
  ];
  const sdg = [
    {
      category: "Tab1",
      data: [
        { id: 'sd10', label: 'SDG 3', bgColor: 'bg-[#4C9F38]' },
        { id: 'sd11', label: 'SDG 5', bgColor: 'bg-orange-600' },
        { id: 'sd12', label: 'SDG 8', bgColor: 'bg-red-900' },
        { id: 'sd13', label: 'SDG 10', bgColor: 'bg-pink-500' },
      ]
    },
    {
      category: "Tab2",
      data: [
        { id: 'sd14', label: 'SDG 3', bgColor: 'bg-[#4C9F38]'},
        { id: 'sd15', label: 'SDG 8', bgColor: 'bg-red-900' },
        { id: 'sd16', label: 'SDG 16', bgColor: 'bg-blue-950' },
      ]
    },
    {
      category: "Tab3",
      data: [
        { id: 'sd11', label: 'SDG 5', bgColor: 'bg-orange-600' },
        { id: 'sd18', label: 'SDG 8', bgColor: 'bg-red-900' },
        { id: 'sd17', label: 'SDG 16', bgColor: 'bg-blue-950' },

      ]
    },
    {
      category: "Tab4",
      data: [

        { id: 'sd11', label: 'SDG 5', bgColor: 'bg-orange-600' },
        { id: 'sd18', label: 'SDG 8', bgColor: 'bg-red-900' },


      ]
    }
  ];
  return (
    <>
      <div className="flex justify-between items-center border-b border-gray-200 pb-4 z-[100] relative">
        <div className="h-[46px] flex-col justify-start items-start gap-0.5 inline-flex ms-4 mt-8">
          <div className="text-black text-opacity-50 text-[11px] font-semibold font-['Manrope'] capitalize leading-[14px]">
            Social
          </div>
          <div className="h-[35px]">
            <div className="h-[26px] flex justify-start items-end gap-3">
              <div className="gradient-text text-opacity-20 text-[22px] font-medium font-['Manrope'] leading-[1.425rem]">
                {activeTab === "Tab1" ? "Employment 2016" :
                  activeTab === "Tab2" ? "Occupational Health and Safety 2018" :
                    activeTab === "Tab3" ? "Operations and suppliers at significant risk for incidents of child labor" :
                      activeTab === "Tab4" ? "Forced or Compulsory Labor 2016" :
                        ""}
              </div>
              {activeTab === "Tab1" && (
                <div className="w-[95px] pl-1 pr-0.5 bg-slate-200 rounded justify-center items-center flex">
                  <div className="text-zinc-600 text-xs font-normal font-['Manrope'] leading-[21px]">
                    Material Topic
                  </div>
                </div>
              )}
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
