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
      <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-gray-200 pb-4 relative z-40 gap-4'>
        {/* Desktop Version */}
        <div className='hidden lg:block w-full'>
          <div className='flex justify-between items-start gap-8'>
            {/* Left side - Title and activeTab */}
            <div className='flex-shrink-0 ms-4 mt-8'>
              <div className='h-[46px] flex-col justify-start items-start gap-0.5 inline-flex'>
                <div className="text-black text-opacity-50 text-[11px] font-semibold font-['Manrope'] capitalize leading-[14px]">
                  Social
                </div>
                <div className='min-h-[30px]'>
                  <div className='flex justify-start items-end gap-3 flex-wrap'>
                    <div className="gradient-text text-opacity-20 text-lg sm:text-xl lg:text-[22px] font-medium font-['Manrope'] leading-[1.425rem] pt-1 break-words">
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
                      <div className='w-[95px] pl-1 pr-0.5 bg-slate-200 rounded justify-center items-center flex flex-shrink-0'>
                        <div className="text-zinc-600 text-xs font-normal font-['Manrope'] leading-[21px]">
                          Material Topic
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Tags */}
            <div className='flex flex-col gap-2 mt-8 mr-4 min-w-0 flex-1 max-w-lg border-l border-gray-200 pl-4'>
              {/* GRI Tags */}
              <div className='flex flex-wrap gap-2'>
                {gri
                  .filter((g) => g.category === activeTab)
                  .flatMap((g) =>
                    g.tags.map((tag, index) =>
                      tag.data.map((item) => (
                        <button
                          key={`${tag.label}-${item.tagid}`}
                          className="text-[#007EEF] bg-slate-200 rounded-full text-[11px] min-w-[80px] h-[22px] px-2 text-center flex items-center justify-center flex-shrink-0"
                          onClick={() => toggleDrawer(item.infoid)}
                        >
                          {tag.label} - {item.tagid}
                        </button>
                      ))
                    )
                  )}
              </div>

              {/* SDG Tags */}
              <div className='flex flex-wrap gap-2'>
                {sdg
                  .filter((s) => s.category === activeTab)
                  .map((s) =>
                    s.data.map((item) => (
                      <button
                        key={item.id}
                        className={`text-white ${item.bgColor} rounded-full text-[11px] min-w-[72px] h-[22px] px-2 text-center flex items-center justify-center flex-shrink-0`}
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
        {/* Mobile & Tablet Version */}
        <div className='block lg:hidden w-full'>
          {/* Clickable header section */}
          <div
            className='w-full py-4 min-h-[100px] rounded-md shadow-[0px_6px_12px_0px_rgba(0,0,0,0.08),0px_1px_3px_0px_rgba(0,0,0,0.10)] mb-5 cursor-pointer'
            onClick={toggleSidebar}
          >
            <div className='flex justify-between items-start px-3 pt-0'>
              <div className='flex-1 min-w-0'>
                <p className='text-[11px] text-black text-opacity-50 font-semibold'>
                  Social
                </p>
                <div className='mt-1'>
                  <p className='gradient-text text-lg sm:text-xl md:text-[22px] font-bold leading-tight break-words'>
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
                  {activeTab === "Tab1" && (
                    <div className='w-[100px] pl-1 mt-2 pr-0.5 bg-slate-200 rounded flex justify-center items-center'>
                      <div className="text-zinc-600 text-xs font-normal font-['Manrope'] leading-[21px]">
                        Material Topic
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className='flex items-center ml-4 flex-shrink-0'>
                <MdKeyboardArrowDown className='text-2xl' />
              </div>
            </div>
          </div>

          {/* Tags section */}
          <div className='w-full'>
            {/* GRI Tags */}
            <div className='flex flex-wrap gap-2 mb-2'>
              {gri
                .filter((g) => g.category === activeTab)
                .flatMap((g) =>
                  g.tags.map((tag, index) =>
                    tag.data.map((item) => (
                      <button
                        key={`${tag.label}-${item.tagid}`}
                        className="text-[#007EEF] bg-slate-200 rounded-full text-[11px] min-w-[80px] h-[22px] px-2 text-center flex items-center justify-center flex-shrink-0"
                        onClick={() => toggleDrawer(item.infoid)}
                      >
                        {tag.label} - {item.tagid}
                      </button>
                    ))
                  )
                )}
            </div>

            {/* SDG Tags */}
            <div className='flex flex-wrap gap-2'>
              {sdg
                .filter((s) => s.category === activeTab)
                .map((s) =>
                  s.data.map((item) => (
                    <button
                      key={item.id}
                      className={`text-white ${item.bgColor} rounded-full text-[11px] min-w-[72px] h-[22px] px-2 text-center flex items-center justify-center flex-shrink-0`}
                      onClick={() => toggleDrawer(item.id)}
                    >
                      {item.label}
                    </button>
                  ))
                )}
            </div>
          </div>
        </div>

        {/* Drawer/Modal */}
        <div
          className={`${
            isOpen
              ? 'translate-x-0 opacity-100'
              : 'translate-x-full opacity-0 pointer-events-none'
          }
          fixed right-4 top-16 w-[90vw] max-w-[360px] h-[calc(100vh-80px)] bg-white rounded-md
          transition-all duration-300 ease-in-out z-[125] shadow-2xl px-2 overflow-hidden`}
        >
          {data &&
            data.map((program, index) => (
              <div key={index} className='h-full flex flex-col'>
                {/* Header */}
                <div className='flex justify-between items-center p-2 pt-5 pb-4 border-b-2 flex-shrink-0'>
                  <div className='ml-2 h-[38px] flex items-center flex-1 min-w-0'>
                    <div className='break-words'>{program.header}</div>
                  </div>
                  <div className='ml-2 flex-shrink-0'>
                    <button
                      className='text-[#727272] text-[17px] font-bold cursor-pointer p-1 hover:bg-gray-100 rounded'
                      onClick={toggleDrawerClose}
                    >
                      <MdOutlineClear />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className='flex-1 overflow-y-auto custom-scrollbar p-2'>
                  {program.data}
                </div>

                {/* Footer */}
                <div className='pt-2 pb-4 ml-4 flex-shrink-0'>
                  <a
                    className='text-[14px] text-[#2196F3] inline-flex items-center hover:underline'
                    href={program.link}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Learn more <MdChevronRight className='text-lg ml-1' />
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
