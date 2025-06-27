import { useState, useEffect } from "react";
import { Energydata } from "./../../../shared/data/Energydata";
import { MdOutlineClear, MdInfoOutline,MdChevronRight,MdKeyboardArrowDown } from "react-icons/md";
import { toast } from "react-toastify";
import { patch } from "../../../utils/axiosMiddleware";
const Header = ({ activeTab, setIsBoxOpen,setMobileopen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [data, setData] = useState([]);
  const toggleSidebar = () => {
    setMobileopen(true);
  };
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
      category: "Tab1",
      tags: [
        {
          label: "GRI 403",
          data: [
            { tagid: "4", infoid: "22" },
            { tagid: "8", infoid: "23" },
            { tagid: "9", infoid: "24" },
            { tagid: "10", infoid: "25" },
          ],
        },
  
      ],
    },
    {
      category: "Tab2",
      tags: [
        {
          label: "GRI 413",
          data: [
            { tagid: "1", infoid: "37" },
          
          ],
        },
        {
          label: "GRI 410",
          data: [
            { tagid: "1", infoid: "52" },
          ],
        },
      ],
    },
    {
      category: "Tab3",
      tags: [
        {
          label: "GRI 407",
          data: [{ tagid: "1a", infoid: "36" }],
        },
  
      ],
    },
    {
      category: "Tab4",
      tags: [
        {
          label: "GRI 408",
          data: [{ tagid: "1", infoid: "26" }],
        },
        {
          label: "GRI 409",
          data: [{ tagid: "1", infoid: "27" }],
        },
      ],
    },
    {
      category: "Tab5",
      tags: [
        {
          label: "GRI 401",
          data: [
            { tagid: "1", infoid: "19" },
        { tagid: "3", infoid: "21" },
          ],
        },
        {
          label: "GRI 405",
          data: [{ tagid: "1", infoid: "28" }],
        },
      ],
    },
    {
      category: "Tab6",
      tags: [
        {
          label: "GRI 404",
          data: [ { tagid: "1", infoid: "38" },
            { tagid: "3", infoid: "39" }],
        },
  
      ],
    },
    {
      category: "Tab7",
      tags: [
        {
          label: "GRI 418",
          data: [{ tagid: "1", infoid: "34" }],
        },
  
      ],
    },
    {
      category: "Tab8",
      tags: [
        {
          label: "GRI 416",
          data: [{ tagid: "1", infoid: "32" }],
        },
  
      ],
    },
    {
      category: "Tab9",
      tags: [
        {
          label: "GRI 417",
          data: [{ tagid: "1", infoid: "33" }],
        },
  
      ],
    },
    {
      category: "Tab10",
      tags: [
        {
          label: "GRI 414",
          data: [  { tagid: "1", infoid: "29" },
            { tagid: "2", infoid: "30" },],
        },
  
      ],
    },
    {
      category: "Tab11",
      tags: [
        {
          label: "GRI 405",
          data: [
            { tagid: "1", infoid: "28" },
        { tagid: "2", infoid: "53" },
          ],
        },
        {
          label: "GRI 202",
          data: [{ tagid: "1", infoid: "48" }],
        },
      ],
    },
    {
      category: "Tab12",
      tags: [
        {
          label: "GRI 406",
          data: [{ tagid: "1", infoid: "35" }],
        },
  
      ],
    },
  ];

  const sdg = [
    {
      category: "Tab1",
      data: [
        { id: "sd14", label: "SDG 3", bgColor: "bg-[#4C9F38]" },
        { id: "sd15", label: "SDG 8", bgColor: "bg-red-900" },
        { id: "sd16", label: "SDG 16", bgColor: "bg-blue-950" },
      ],
    },
    {
      category: "Tab2",
      data: [
        { id: "sd29", label: "SDG 16", bgColor: "bg-blue-950" },
      ],
    },
    {
      category: "Tab3",
      data: [
        { id: "sd18", label: "SDG 8", bgColor: "bg-red-900" },
      ],
    },
    {
      category: "Tab4",
      data: [
        { id: "sd11", label: "SDG 5", bgColor: "bg-orange-600" },
        { id: "sd18", label: "SDG 8", bgColor: "bg-red-900" },
        { id: "sd30", label: "SDG 16", bgColor: "bg-blue-950" },
      ],
    },
    {
      category: "Tab5",
      data: [
        { id: "sd10", label: "SDG 3", bgColor: "bg-[#4C9F38]" },
        { id: "sd31", label: "SDG 5", bgColor: "bg-orange-600" },
        { id: "sd12", label: "SDG 8", bgColor: "bg-red-900" },
        { id: "sd13", label: "SDG 10", bgColor: "bg-pink-500" },
      ],
    },
    {
      category: "Tab6",
      data: [
        { id: "sd21", label: "SDG 4", bgColor: "bg-[#C22033]"},
        { id: "sd22", label: "SDG 5", bgColor: "bg-orange-600"},
        { id: "sd23", label: "SDG 8", bgColor: "bg-red-900"},
        { id: "sd13", label: "SDG 10", bgColor: "bg-[#E01A83]"},
      ],
    },
    {
      category: "Tab7",
      data: [
        { id: "sd20", label: "SDG 16", bgColor: "bg-blue-950" },
      ],
    },
    {
      category: "Tab9",
      data: [
        { id: "sd19", label: "SDG 12", bgColor: "bg-[#CD8B2A]" },
      ],
    },
    {
      category: "Tab10",
      data: [
        { id: "sd11", label: "SDG 5", bgColor: "bg-orange-600" },
        { id: "sd15", label: "SDG 8", bgColor: "bg-red-900" },
        { id: "sd16", label: "SDG 16", bgColor: "bg-blue-950" },
      ],
    },
    {
      category: "Tab11",
      data: [
        { id: "sd26", label: "SDG 1", bgColor: "bg-[#EA1D2D]"},
        { id: "sd32", label: "SDG 5", bgColor: "bg-orange-600"},
        { id: "sd33", label: "SDG 8", bgColor: "bg-red-900"},
        { id: "sd13", label: "SDG 10", bgColor: "bg-[#E01A83]"},
        // { id: "sd16", label: "SDG 16", bgColor: "bg-blue-950" },
      ],
    },
    {
      category: "Tab12",
      data: [
        { id: "sd11", label: "SDG 5", bgColor: "bg-orange-600" },
        { id: "sd18", label: "SDG 8", bgColor: "bg-red-900" },
      ],
    },
  ];

  return (
    <>
       <div className="flex justify-between items-center  xl:border-b border-gray-200 pb-4 xl:z-[100] relative">
        <div className="hidden xl:block lg:block md:hidden 2xl:block 4k:block ">
          <div className="h-[46px] flex-col justify-start items-start gap-0.5 inline-flex ms-4 mt-8">
            <div className="text-black text-opacity-50 text-[11px] font-semibold font-['Manrope'] capitalize leading-[14px]">
            Social
            </div>
            <div className="h-[30px]">
              <div className=" flex justify-start items-end gap-3">
                <div className="h-[28px] gradient-text text-opacity-20 text-[22px] font-medium font-['Manrope'] leading-[1.425rem] pt-1">
                {activeTab === "Tab2"
                  ? "Human Rights and Community Impact"
                  : activeTab === "Tab1"
                  ? "Occupational Health and Safety 2018"
                  : activeTab === "Tab3"
                  ? "Labor Management"
                  : activeTab === "Tab4"
                  ? "Forced or Compulsory Labor 2016"
                  : activeTab === "Tab5"
                  ? "Employment"
                  : activeTab === "Tab6"
                  ? "Training and Development"
                  : activeTab === "Tab7"
                  ? "Customer Privacy & Data Security"
                  : activeTab === "Tab8"
                  ? "Product safety and quality"
                  : activeTab === "Tab9"
                  ? "Marketing and labeling"
                  : activeTab === "Tab10"
                  ? "Supply Chain Labor Standards"
                  : activeTab === "Tab11"
                  ? "Diversity & Equal Opportunity"
                  : activeTab === "Tab12"
                  ? " Non-discrimination"
                  : activeTab === "Tab13"
                  ? "Marketing and labeling"
                   : activeTab === "Tab14"
                  ? "Customer Privacy"
                   : activeTab === "Tab15"
                  ? "Security Practices 2016"
                  : ""}
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
          <div className="flex flex-col border-l gap-2 absolute right-[1rem] top-8">
            <div className="flex">
            {gri
            .filter((g) => g.category === activeTab)
            .flatMap((g) =>
              g.tags.map((tag, index) =>
                tag.data.map((item) => (
                  <button
                    key={`${tag.label}-${item.tagid}`}
                    className="text-[#007EEF] bg-slate-200 rounded-full text-[11px] w-[80px] h-[22px] ml-2 text-center"
                    onClick={() => toggleDrawer(item.infoid)}
                  >
                    {tag.label} - {item.tagid}
                  </button>
                ))
              )
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
        </div>
        {/* mobile version */}
        <div className="block justify-between items-center border-b border-gray-200 mb-5 w-full xl:hidden lg:hidden md:hidden  2xl:hidden 4k:hidden">
          <div
            className="w-full  py-4 h-auto  rounded-md  shadow-[0px_6px_12px_0px_rgba(0,0,0,0.08),0px_1px_3px_0px_rgba(0,0,0,0.10)]"
            onClick={toggleSidebar}
          >
            <div className="text-left mb-2 ml-3 pt-0 flex justify-between">
              <div className="">
                <p className="text-[11px]">Social</p>
                <div className=" ">
                  <div className="">
                    <p className="gradient-text text-[21px] font-bold  pt-1">
                    {activeTab === "Tab2"
                  ? "Human Rights and Community Impact"
                  : activeTab === "Tab1"
                  ? "Occupational Health and Safety 2018"
                  : activeTab === "Tab3"
                  ? "Labor Management"
                  : activeTab === "Tab4"
                  ? "Forced or Compulsory Labor 2016"
                  : activeTab === "Tab5"
                  ? "Employment"
                  : activeTab === "Tab6"
                  ? "Training and Development"
                  : activeTab === "Tab7"
                  ? "Customer Privacy & Data Security"
                  : activeTab === "Tab8"
                  ? "Product safety and quality"
                  : activeTab === "Tab9"
                  ? "Marketing and labeling"
                  : activeTab === "Tab10"
                  ? "Supply Chain Labor Standards"
                  : activeTab === "Tab11"
                  ? "Diversity & Equal Opportunity"
                  : activeTab === "Tab12"
                  ? " Non-discrimination"
                  : activeTab === "Tab13"
                  ? "Marketing and labeling"
                   : activeTab === "Tab14"
                  ? "Customer Privacy"
                   : activeTab === "Tab15"
                  ? "Security Practices 2016"
                  : ""}
                    </p>
                  </div>
                  {activeTab === "Tab1" && (
            <div className="w-[95px] pl-1 pr-0.5 mt-2 bg-slate-200 rounded justify-center items-center flex">
            <div className="text-zinc-600 text-xs font-normal font-['Manrope'] leading-[21px]">
              Material Topic
            </div>
          </div>
              )}
               
                </div>
              </div>

              <div className="flex items-center me-5">
                <MdKeyboardArrowDown className={`text-2xl float-end `} />
              </div>
            </div>
          </div>

          <div className="w-full float-end pt-2 me-1 my-4">
            <div className="">
              <div className="flex mb-2">
              {gri
            .filter((g) => g.category === activeTab)
            .flatMap((g) =>
              g.tags.map((tag, index) =>
                tag.data.map((item) => (
                  <button
                    key={`${tag.label}-${item.tagid}`}
                    className="text-[#007EEF] bg-slate-200 rounded-full text-[11px] w-[80px] h-[22px] ml-2 text-center"
                    onClick={() => toggleDrawer(item.infoid)}
                  >
                    {tag.label} - {item.tagid}
                  </button>
                ))
              )
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
          </div>
        </div>

           {/* tablet version */}
           <div className="hidden justify-between items-center border-b border-gray-200 mb-5 w-full xl:hidden lg:hidden md:block  2xl:hidden 4k:hidden">
          <div
            className="w-full  py-4 h-auto  rounded-md  shadow-[0px_6px_12px_0px_rgba(0,0,0,0.08),0px_1px_3px_0px_rgba(0,0,0,0.10)]"
            onClick={toggleSidebar}
          >
            <div className="text-left mb-2 ml-3 pt-0 flex justify-between">
              <div className="">
                <p className="text-[11px]">Social</p>
                <div className=" ">
                  <div className="">
                    <p className="gradient-text text-[21px] font-bold h-[50px]  pt-1">
                    {activeTab === "Tab2"
                  ? "Human Rights and Community Impact"
                  : activeTab === "Tab1"
                  ? "Occupational Health and Safety 2018"
                  : activeTab === "Tab3"
                  ? "Labor Management"
                  : activeTab === "Tab4"
                  ? "Forced or Compulsory Labor 2016"
                  : activeTab === "Tab5"
                  ? "Employment"
                  : activeTab === "Tab6"
                  ? "Training and Development"
                  : activeTab === "Tab7"
                  ? "Customer Privacy & Data Security"
                  : activeTab === "Tab8"
                  ? "Product safety and quality"
                  : activeTab === "Tab9"
                  ? "Marketing and labeling"
                  : activeTab === "Tab10"
                  ? "Supply Chain Labor Standards"
                  : activeTab === "Tab11"
                  ? "Diversity & Equal Opportunity"
                  : activeTab === "Tab12"
                  ? " Non-discrimination"
                  : activeTab === "Tab13"
                  ? "Marketing and labeling"
                   : activeTab === "Tab14"
                  ? "Customer Privacy"
                   : activeTab === "Tab15"
                  ? "Security Practices 2016"
                  : ""}
                    </p>
                  </div>
                  {activeTab === "Tab1" && (
            <div className="w-[95px] pl-1 pr-0.5 mt-2 bg-slate-200 rounded justify-center items-center flex">
            <div className="text-zinc-600 text-xs font-normal font-['Manrope'] leading-[21px]">
              Material Topic
            </div>
          </div>
              )}
               
                </div>
              </div>

              <div className="flex items-center me-5">
                <MdKeyboardArrowDown className={`text-2xl float-end `} />
              </div>
            </div>
          </div>

          <div className="w-full float-end pt-2 me-1 my-4">
            <div className="">
              <div className="flex mb-2">
              {gri
            .filter((g) => g.category === activeTab)
            .flatMap((g) =>
              g.tags.map((tag, index) =>
                tag.data.map((item) => (
                  <button
                    key={`${tag.label}-${item.tagid}`}
                    className="text-[#007EEF] bg-slate-200 rounded-full text-[11px] w-[80px] h-[22px] ml-2 text-center"
                    onClick={() => toggleDrawer(item.infoid)}
                  >
                    {tag.label} - {item.tagid}
                  </button>
                ))
              )
            )}
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
{/* 
      <div className="flex justify-between items-center border-b border-gray-200 pb-4 z-[100] relative">
        <div className="h-[46px] flex-col justify-start items-start gap-0.5 inline-flex ms-4 mt-8">
          <div className="text-black text-opacity-50 text-[11px] font-semibold font-['Manrope'] capitalize leading-[14px]">
            Social
          </div>
          <div className="h-[35px]">
            <div className="h-[30px] flex justify-start items-end gap-3">
              <div className="gradient-text text-opacity-20 text-[22px] font-medium font-['Manrope'] leading-[1.425rem]">
                {activeTab === "Tab2"
                  ? "Human Rights and Community Impact"
                  : activeTab === "Tab1"
                  ? "Occupational Health and Safety 2018"
                  : activeTab === "Tab3"
                  ? "Labor Management"
                  : activeTab === "Tab4"
                  ? "Forced or Compulsory Labor 2016"
                  : activeTab === "Tab5"
                  ? "Employment"
                  : activeTab === "Tab6"
                  ? "Training and Development"
                  : activeTab === "Tab7"
                  ? "Customer Privacy & Data Security"
                  : activeTab === "Tab8"
                  ? "Product safety and quality"
                  : activeTab === "Tab9"
                  ? "Marketing and labeling"
                  : activeTab === "Tab10"
                  ? "Supply Chain Labor Standards"
                  : activeTab === "Tab11"
                  ? "Diversity & Equal Opportunity"
                  : activeTab === "Tab12"
                  ? " Non-discrimination"
                  : activeTab === "Tab13"
                  ? "Marketing and labeling"
                   : activeTab === "Tab14"
                  ? "Customer Privacy"
                   : activeTab === "Tab15"
                  ? "Security Practices 2016"
                  : ""}
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
          {gri
            .filter((g) => g.category === activeTab)
            .flatMap((g) =>
              g.tags.map((tag, index) =>
                tag.data.map((item) => (
                  <button
                    key={`${tag.label}-${item.tagid}`}
                    className="text-[#007EEF] bg-slate-200 rounded-full text-[11px] w-[80px] h-[22px] ml-2 text-center"
                    onClick={() => toggleDrawer(item.infoid)}
                  >
                    {tag.label} - {item.tagid}
                  </button>
                ))
              )
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
      </div> */}
    </>
  );
};

export default Header;
