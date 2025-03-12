import { useState, useEffect } from "react";
import { Energydata } from "./../../../shared/data/Energydata";
import { MdOutlineClear } from "react-icons/md";
import { MdChevronRight } from "react-icons/md";
const Header = ({ activeTab, setIsBoxOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [data, setData] = useState([]);

  const toggleDrawerClose = () => {
    setIsOpen(!isOpen);
    setIsBoxOpen((prev) => !prev);
  };

  const toggleDrawer = (selected) => {
    setIsOpen(!isOpen);
    setCategory(selected);
    setIsBoxOpen((prev) => !prev);
  };

  useEffect(() => {
    const newData = Energydata.filter((program) =>
      program.category.includes(category)
    );
    setData(newData);
  }, [category]);

  const gri = [
    {
      category: "Emissions",
      tag: "GRI 305",
      data: [
        { tagid: "1", infoid: "43" },
        { tagid: "2", infoid: "44" },
        { tagid: "3", infoid: "45" },
      ],
    },
    {
      category: "Energy",
      tag: "GRI 302",
      data: [
        { tagid: "1", infoid: "1" },
        { tagid: "2", infoid: "2" },
        { tagid: "3", infoid: "3" },
        { tagid: "4", infoid: "4" },
        { tagid: "5", infoid: "5" },
      ],
    },
    {
      category: "Waste Management",
      tag: "GRI 306",
      data: [
        { tagid: "1", infoid: "6" },
        { tagid: "2", infoid: "7" },
        { tagid: "3", infoid: "8" },
        { tagid: "4", infoid: "9" },
        { tagid: "5", infoid: "10" },
        { tagid: "3, 2016", infoid: "54" },
      ],
    },
    // {
    //   category: "Effluents",
    //   tag: "GRI 306",
    //   data: [
    //     { tagid: "3", infoid: "54" },
   
    //   ],
    // },
    {
      category: "Material Use and Efficiency",
      tag: "GRI 301",
      data: [
        { tagid: "1", infoid: "11" },
        { tagid: "2", infoid: "12" },
        // { tagid: "3", infoid: "13" },
      ],
    },
    {
      category: "Packaging Materials",
      tag: "GRI 301",
      data: [
        { tagid: "3", infoid: "13" },
      ],
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
      ],
    },
    {
      category: "Supplier Environmental Assessment",
      tag: "GRI 308",
      data: [
        { tagid: "1", infoid: "49" },
        { tagid: "2", infoid: "50" },
      ],
    },
    {
      category: "Air Quality & other emissions",
      tag: "GRI 305",
      data: [
        { tagid: "7", infoid: "58" },
        { tagid: "6", infoid: "57" },
      ],
    },
  ];
  const sdg = [
    {
      category: "Emissions",
      data: [
        { id: "sd5", label: "SDG 3", bgColor: "bg-[#4c9f38]" },
        { id: "sd3", label: "SDG 12", bgColor: "bg-yellow-600" },
        { id: "sd4", label: "SDG 13", bgColor: "bg-[#3f7e44]" },
        { id: "sd24", label: "SDG 14", bgColor: "bg-[#007dbc]" },
        { id: "sd8", label: "SDG 15", bgColor: "bg-[#4c9f38]" },
      ],
    },
    {
      category: "Energy",
      data: [
        { id: "sd1", label: "SDG 7", bgColor: "bg-amber-400" },
        { id: "sd2", label: "SDG 8", bgColor: "bg-red-900" },
        { id: "sd3", label: "SDG 12", bgColor: "bg-yellow-600" },
        { id: "sd4", label: "SDG 13", bgColor: "bg-lime-900" },
      ],
    },
    {
      category: "Waste Management",
      data: [
        { id: "sd5", label: "SDG 3", bgColor: "bg-[#4C9F38]" },
        { id: "sd6", label: "SDG 6", bgColor: "bg-cyan-500" },
        { id: "sd2", label: "SDG 8", bgColor: "bg-red-900" },
        { id: "sd7", label: "SDG 11", bgColor: "bg-amber-400" },
        { id: "sd37",label: "SDG 12", bgColor: "bg-yellow-600" },
        { id: "sd8", label: "SDG 15", bgColor: "bg-[#56C02B]" },
      ],
    },
    // {
    //   category: "Effluents",
    //   data: [
       
    //     { id: "sd5", label: "SDG 3", bgColor: "bg-[#4c9f38]" },
    //     { id: "sd34", label: "SDG 6", bgColor: "bg-cyan-500" },
    //     { id: "sd35", label: "SDG 12", bgColor: "bg-yellow-600" },
    //     { id: "sd8", label: "SDG 15", bgColor: "bg-[#4c9f38]" },
    //   ],
    // },
    {
      category: "Material Use and Efficiency",
      data: [
        { id: "sd2", label: "SDG 8", bgColor: "bg-red-900" },
        { id: "sd9", label: "SDG 12", bgColor: "bg-yellow-600" },
      ],
    },
    {
      category: "Packaging Materials",
      data: [
        { id: "sd2", label: "SDG 8", bgColor: "bg-red-900" },
        { id: "sd9", label: "SDG 12", bgColor: "bg-yellow-600" },
      ],
    },
    {
      category: "Water and effluents",
      data: [{ id: "sd6", label: "SDG 6", bgColor: "bg-cyan-500" }],
    },
    {
      category:"Air Quality & other emissions",
      data: [
        { id: "sd5", label: "SDG 3", bgColor: "bg-[#4c9f38]" },
        { id: "sd9", label: "SDG 12", bgColor: "bg-yellow-600" },
        { id: "sd24", label: "SDG 14", bgColor: "bg-[#007dbc]" },
        { id: "sd38", label: "SDG 15", bgColor: "bg-[#4c9f38]" },
      ],

    }
  ];
  return (
    <>
      <div className="flex justify-between items-center border-b border-gray-200 pb-4 z-[100] relative">
        <div className="h-[46px] flex-col justify-start items-start gap-0.5 inline-flex ms-4 mt-8">
          <div className="text-black text-opacity-50 text-[11px] font-semibold font-['Manrope'] capitalize leading-[14px]">
            Environment
          </div>
          <div className="h-[30px]">
            <div className=" flex justify-start items-end gap-3">
              <div className="h-[28px] gradient-text text-opacity-20 text-[22px] font-medium font-['Manrope'] leading-[1.425rem] pt-1">
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
        <div className="flex flex-col border-l gap-2 absolute right-[1rem] top-8">
          <div className="flex">
            {gri
              .filter((g) => g.category === activeTab)
              .map((g) =>
                g.data.map((item) => (
                  <button
                    key={item.tagid}
                    className={`text-[#007EEF] bg-slate-200 rounded-full text-[11px] ${item.tagid=="3, 2016"?'w-[100px]': 'w-[72px]'} h-[22px] ml-2 text-center pt-0.5`}
                    onClick={() => toggleDrawer(item.infoid)}
                  >
                    {g.tag} - {item.tagid}
                  </button>
                ))
              )}
          </div>
          <div className="flex">
            {sdg
              .filter((s) => s.category === activeTab)
              .map((s) =>
                s.data.map((item) => (
                  <button
                    key={item.id}
                    className={`text-[#fff] ${item.bgColor} rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5`}
                    onClick={() => toggleDrawer(item.id)}
                  >
                    {item.label}
                  </button>
                ))
              )}
          </div>
        </div>
        <div
           className={`${
            isOpen
              ? "translate-x-[15%] block top-16"
              : "translate-x-[120%] hidden top-16"
          }
fixed right-[51px]  w-[360px] h-[92%] bg-white  rounded-md
transition-transform duration-300 ease-in-out z-[100] shadow-2xl px-2`}
        >
          {data &&
            data.map((program, index) => (
              <div key={index}>
                {/* Header */}
                <div className="flex justify-between p-2 pt-5 pb-4 border-b-2 ">
                  <div className="ml-2 h-[38px]">{program.header}</div>
                  <div className="ml-2 float-right ">
                    <h5
                      className="text-[#727272] text-[17px] font-bold cursor-pointer"
                      onClick={toggleDrawerClose}
                    >
                      <MdOutlineClear />
                    </h5>
                  </div>
                </div>

            
                    <div className="hidden xl:block lg:block md:block 2xl:block 4k:block 2k:block 3xl:block">
                <div className="h-[calc(100vh-30px)] overflow-y-auto custom-scrollbar p-2">
                  {program.data}
                </div>
                </div>
                <div className="block xl:hidden lg:hidden md:hidden 2xl:hidden 4k:hidden 2k:hidden 3xl:hidden">
                <div className="h-[calc(90vh-30px)] overflow-y-auto custom-scrollbar p-2">
                  {program.data}
                </div>
                </div>

                {/* Footer (Learn more link) */}
                <div className="pt-2 pb-4 ml-4">
                  <a
                    className="text-[14px] text-[#2196F3] pt-1 inline-flex"
                    href={program.link}
                    target="_blank"
                  >
                    Learn more <MdChevronRight className="text-lg pt-1" />
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Header;
