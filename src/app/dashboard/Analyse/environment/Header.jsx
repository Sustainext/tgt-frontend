import { useState, useEffect } from 'react';
import { Energydata } from './../../../shared/data/Energydata';
import { MdOutlineClear, MdKeyboardArrowDown } from 'react-icons/md';
import { MdChevronRight } from 'react-icons/md';

const Header = ({ activeTab, setIsBoxOpen, setMobileopen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState('');
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

  const toggleSidebar = () => {
    setMobileopen(true);
  };

  const gri = [
    {
      category: 'Emissions',
      tag: 'GRI 305',
      data: [
        { tagid: '1', infoid: '43' },
        { tagid: '2', infoid: '44' },
        { tagid: '3', infoid: '45' },
      ],
    },
    {
      category: 'Energy',
      tag: 'GRI 302',
      data: [
        { tagid: '1', infoid: '1' },
        { tagid: '2', infoid: '2' },
        { tagid: '3', infoid: '3' },
        { tagid: '4', infoid: '4' },
        { tagid: '5', infoid: '5' },
      ],
    },
    {
      category: 'Waste Management',
      tag: 'GRI 306',
      data: [
        { tagid: '1', infoid: '6' },
        { tagid: '2', infoid: '7' },
        { tagid: '3', infoid: '8' },
        { tagid: '4', infoid: '9' },
        { tagid: '5', infoid: '10' },
        { tagid: '3, 2016', infoid: '54' },
      ],
    },
    {
      category: 'Material Use and Efficiency',
      tag: 'GRI 301',
      data: [
        { tagid: '1', infoid: '11' },
        { tagid: '2', infoid: '12' },
      ],
    },
    {
      category: 'Packaging Materials',
      tag: 'GRI 301',
      data: [{ tagid: '3', infoid: '13' }],
    },
    {
      category: 'Water and effluents',
      tag: 'GRI 303',
      data: [
        { tagid: '1', infoid: '14' },
        { tagid: '2', infoid: '15' },
        { tagid: '3', infoid: '16' },
        { tagid: '4', infoid: '17' },
        { tagid: '5', infoid: '18' },
      ],
    },
    {
      category: 'Supplier Environmental Assessment',
      tag: 'GRI 308',
      data: [
        { tagid: '1', infoid: '49' },
        { tagid: '2', infoid: '50' },
      ],
    },
    {
      category: 'Air Quality & other emissions',
      tag: 'GRI 305',
      data: [
        { tagid: '7', infoid: '58' },
        { tagid: '6', infoid: '57' },
      ],
    },
  ];

  const sdg = [
    {
      category: 'Emissions',
      data: [
        { id: 'sd5', label: 'SDG 3', bgColor: 'bg-[#4c9f38]' },
        { id: 'sd3', label: 'SDG 12', bgColor: 'bg-yellow-600' },
        { id: 'sd4', label: 'SDG 13', bgColor: 'bg-[#3f7e44]' },
        { id: 'sd24', label: 'SDG 14', bgColor: 'bg-[#007dbc]' },
        { id: 'sd8', label: 'SDG 15', bgColor: 'bg-[#4c9f38]' },
      ],
    },
    {
      category: 'Energy',
      data: [
        { id: 'sd1', label: 'SDG 7', bgColor: 'bg-amber-400' },
        { id: 'sd2', label: 'SDG 8', bgColor: 'bg-red-900' },
        { id: 'sd3', label: 'SDG 12', bgColor: 'bg-yellow-600' },
        { id: 'sd4', label: 'SDG 13', bgColor: 'bg-lime-900' },
      ],
    },
    {
      category: 'Waste Management',
      data: [
        { id: 'sd5', label: 'SDG 3', bgColor: 'bg-[#4C9F38]' },
        { id: 'sd6', label: 'SDG 6', bgColor: 'bg-cyan-500' },
        { id: 'sd2', label: 'SDG 8', bgColor: 'bg-red-900' },
        { id: 'sd7', label: 'SDG 11', bgColor: 'bg-amber-400' },
        { id: 'sd37', label: 'SDG 12', bgColor: 'bg-yellow-600' },
        { id: 'sd8', label: 'SDG 15', bgColor: 'bg-[#56C02B]' },
      ],
    },
    {
      category: 'Material Use and Efficiency',
      data: [
        { id: 'sd2', label: 'SDG 8', bgColor: 'bg-red-900' },
        { id: 'sd9', label: 'SDG 12', bgColor: 'bg-yellow-600' },
      ],
    },
    {
      category: 'Packaging Materials',
      data: [
        { id: 'sd2', label: 'SDG 8', bgColor: 'bg-red-900' },
        { id: 'sd9', label: 'SDG 12', bgColor: 'bg-yellow-600' },
      ],
    },
    {
      category: 'Water and effluents',
      data: [{ id: 'sd6', label: 'SDG 6', bgColor: 'bg-cyan-500' }],
    },
    {
      category: 'Air Quality & other emissions',
      data: [
        { id: 'sd5', label: 'SDG 3', bgColor: 'bg-[#4c9f38]' },
        { id: 'sd9', label: 'SDG 12', bgColor: 'bg-yellow-600' },
        { id: 'sd24', label: 'SDG 14', bgColor: 'bg-[#007dbc]' },
        { id: 'sd38', label: 'SDG 15', bgColor: 'bg-[#4c9f38]' },
      ],
    },
  ];

  return (
    <>
      <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-gray-200 pb-4 relative z-40 gap-4'>
        {/* Desktop Version */}
        <div className='hidden lg:block w-full'>
          <div className='flex justify-between items-start'>
            {/* Left side - Title and activeTab */}
            <div className='flex-shrink-0 ms-4 mt-8'>
              <div className='h-[46px] flex-col justify-start items-start gap-0.5 inline-flex'>
                <div className="text-black text-opacity-50 text-[11px] font-semibold font-['Manrope'] capitalize leading-[14px]">
                  Environment
                </div>
                <div className='min-h-[30px]'>
                  <div className='flex justify-start items-end gap-3 flex-wrap'>
                    <div className="gradient-text text-opacity-20 text-lg sm:text-xl lg:text-[22px] font-medium font-['Manrope'] leading-[1.425rem] pt-1 break-words">
                      {activeTab}
                    </div>
                    <div className='w-[95px] pl-1 pr-0.5 bg-slate-200 rounded justify-center items-center flex flex-shrink-0'>
                      <div className="text-zinc-600 text-xs font-normal font-['Manrope'] leading-[21px]">
                        Material Topic
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Tags */}
            <div className='flex flex-col gap-2 mt-8 mr-4 min-w-0 flex-1 max-w-lg'>
              {/* GRI Tags */}
              <div className='flex flex-wrap gap-2'>
                {gri
                  .filter((g) => g.category === activeTab)
                  .map((g) =>
                    g.data.map((item) => (
                      <button
                        key={item.tagid}
                        className={`text-[#007EEF] bg-slate-200 rounded-full text-[11px] ${
                          item.tagid === '3, 2016' ? 'min-w-[100px]' : 'min-w-[72px]'
                        } h-[22px] px-2 text-center flex items-center justify-center flex-shrink-0`}
                        onClick={() => toggleDrawer(item.infoid)}
                      >
                        {g.tag} - {item.tagid}
                      </button>
                    ))
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
                <p className='text-[11px] text-black text-opacity-50 font-semibold'>Environment</p>
                <div className='mt-1'>
                  <p className='gradient-text text-lg sm:text-xl md:text-[22px] font-bold leading-tight break-words'>
                    {activeTab}
                  </p>
                  <div className='w-[100px] pl-1 mt-2 pr-0.5 bg-slate-200 rounded flex justify-center items-center'>
                    <div className="text-zinc-600 text-xs font-normal font-['Manrope'] leading-[21px]">
                      Material Topic
                    </div>
                  </div>
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
                .map((g) =>
                  g.data.map((item) => (
                    <button
                      key={item.tagid}
                      className={`text-[#007EEF] bg-slate-200 rounded-full text-[11px] ${
                        item.tagid === '3, 2016' ? 'min-w-[100px]' : 'min-w-[72px]'
                      } h-[22px] px-2 text-center flex items-center justify-center flex-shrink-0`}
                      onClick={() => toggleDrawer(item.infoid)}
                    >
                      {g.tag} - {item.tagid}
                    </button>
                  ))
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