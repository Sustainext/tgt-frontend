
import React from 'react';
import { motion } from 'framer-motion';
import { FiX, FiCalendar, FiMapPin, FiHome } from 'react-icons/fi';

const EntityView = ({ onClose, data, viewType }) => {
  const d = data[0];
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'tween', duration: 0.3 }}
      className='fixed top-[60px] right-0 h-full flex flex-col items-end z-50'
    >
      {data && viewType === 'Corporate Entity' && (
        <div className='w-[354px] h-[565px] relative bg-white border rounded-md shadow-md'>
          <div className='flex justify-between items-center border-b-2 border-sky-600 py-6 pe-6 ps-12'>
            <div className="relative text-neutral-800 text-[17px] font-medium font-['Manrope'] leading-snug tracking-tight">
              <div className='absolute top-[-3px] left-[-35px]'>
                <FiHome />
              </div>
              {d.name}
            </div>
            <div className=''>
              <FiX className='cursor-pointer' onClick={onClose} />
            </div>
          </div>
          <div className="w-[57px] ps-6 pt-4 text-neutral-800 text-xs font-semibold font-['Manrope'] uppercase leading-relaxed tracking-wide">
            Details
          </div>
          <div className='px-6 py-4'>
            <div className='flex pt-4 justify-between items-center'>
              <div className="text-neutral-500 text-xs font-normal font-['Manrope'] leading-[15px]">
                Sector
              </div>
              <div className="text-neutral-800 text-xs font-normal font-['Manrope'] leading-[15px]">
                {d.sector}
              </div>
            </div>
            <div className='flex pt-4 justify-between items-center'>
              <div className="text-neutral-500 text-xs font-normal font-['Manrope'] leading-[15px]">
                Employee count
              </div>
              <div className="w-[94px] text-right text-neutral-800 text-xs font-normal font-['Manrope'] leading-[15px]">
                {d.employeecount}
              </div>
            </div>
            <div className='flex pt-4 justify-between items-center'>
              <div className="text-neutral-500 text-xs font-normal font-['Manrope'] leading-[15px]">
                Address
              </div>
              <div className="relative w-[94px] text-right text-neutral-800 text-xs font-normal font-['Manrope'] leading-[15px]">
                <div className='w-2.5 h-2.5 left-[-22px] top-0 absolute text-sky-500'>
                  <FiMapPin />
                </div>
                {d.address} {d.city} {d.state} {d.country}
              </div>
            </div>
            <div className='flex pt-4 justify-between items-center'>
              <div className="text-neutral-500 text-xs font-normal font-['Manrope'] leading-[15px]">
                Reporting Period
              </div>
              <div className="relative w-[94px] text-right text-neutral-800 text-xs font-normal font-['Manrope'] leading-[15px]">
                <div className='w-2.5 h-2.5 left-[-18px] top-0 absolute text-sky-500'>
                  <FiCalendar />
                </div>
                {d.from_date} to {d.to_date}
              </div>
            </div>
          </div>
        </div>
      )}
      {data && viewType === 'Location' && (
        <div className='w-[354px] h-[565px] relative bg-white border rounded-md shadow-md'>
          <div className='flex justify-between items-center border-b-2 border-sky-600 py-6 pe-6 ps-12'>
            <div className="relative text-neutral-800 text-[17px] font-medium font-['Manrope'] leading-snug tracking-tight">
              <div className='absolute top-[-3px] left-[-35px]'>
                <FiHome />
              </div>
              {d.name}
            </div>
            <div className=''>
              <FiX className='cursor-pointer' onClick={onClose} />
            </div>
          </div>
          <div className="w-[57px] ps-6 pt-4 text-neutral-800 text-xs font-semibold font-['Manrope'] uppercase leading-relaxed tracking-wide">
            Details
          </div>
          <div className='px-6 py-4'>
            <div className='flex pt-4 justify-between items-center'>
              <div className="text-neutral-500 text-xs font-normal font-['Manrope'] leading-[15px]">
                Sector
              </div>
              <div className="text-neutral-800 text-xs font-normal font-['Manrope'] leading-[15px]">
                {d.sector}
              </div>
            </div>
            <div className='flex pt-4 justify-between items-center'>
              <div className="text-neutral-500 text-xs font-normal font-['Manrope'] leading-[15px]">
                Employee count
              </div>
              <div className="w-[94px] text-right text-neutral-800 text-xs font-normal font-['Manrope'] leading-[15px]">
                {d.employeecount}
              </div>
            </div>
            <div className='flex pt-4 justify-between items-center'>
              <div className="text-neutral-500 text-xs font-normal font-['Manrope'] leading-[15px]">
                Address
              </div>
              <div className="relative w-[94px] text-right text-neutral-800 text-xs font-normal font-['Manrope'] leading-[15px]">
                <div className='w-2.5 h-2.5 left-[-22px] top-0 absolute text-sky-500'>
                  <FiMapPin />
                </div>
                {d.address} {d.city} {d.state} {d.country}
              </div>
            </div>
            <div className='flex pt-4 justify-between items-center'>
              <div className="text-neutral-500 text-xs font-normal font-['Manrope'] leading-[15px]">
                Reporting Period
              </div>
              <div className="relative w-[94px] text-right text-neutral-800 text-xs font-normal font-['Manrope'] leading-[15px]">
                <div className='w-2.5 h-2.5 left-[-18px] top-0 absolute text-sky-500'>
                  <FiCalendar />
                </div>
                {d.from_date} to {d.to_date}
              </div>
            </div>
          </div>
        </div>
      )}
      {data && viewType === undefined && (
        <div className='w-[354px] h-[565px] relative bg-white border rounded-md shadow-md'>
          <div className='flex justify-between items-center border-b-2 border-sky-600 py-6 pe-6 ps-12'>
            <div className="relative text-neutral-800 text-[17px] font-medium font-['Manrope'] leading-snug tracking-tight">
              <div className='absolute top-[-3px] left-[-35px]'>
                <FiHome />
              </div>
              {d.name}
            </div>
            <div className=''>
              <FiX className='cursor-pointer' onClick={onClose} />
            </div>
          </div>
          <div className="w-[57px] ps-6 pt-4 text-neutral-800 text-xs font-semibold font-['Manrope'] uppercase leading-relaxed tracking-wide">
            Details
          </div>
          <div className='px-6 py-4'>
            <div className='flex pt-4 justify-between items-center'>
              <div className="text-neutral-500 text-xs font-normal font-['Manrope'] leading-[15px]">
                Sector
              </div>
              <div className="text-neutral-800 text-xs font-normal font-['Manrope'] leading-[15px]">
                {d.sector}
              </div>
            </div>
            <div className='flex pt-4 justify-between items-center'>
              <div className="text-neutral-500 text-xs font-normal font-['Manrope'] leading-[15px]">
                Employee count
              </div>
              <div className="w-[94px] text-right text-neutral-800 text-xs font-normal font-['Manrope'] leading-[15px]">
                {d.employeecount}
              </div>
            </div>
            <div className='flex pt-4 justify-between items-center'>
              <div className="text-neutral-500 text-xs font-normal font-['Manrope'] leading-[15px]">
                Address
              </div>
              <div className="relative w-[94px] text-right text-neutral-800 text-xs font-normal font-['Manrope'] leading-[15px]">
                <div className='w-2.5 h-2.5 left-[-22px] top-0 absolute text-sky-500'>
                  <FiMapPin />
                </div>
                {d.address} {d.city} {d.state} {d.country}{' '}
              </div>
            </div>
            <div className='flex pt-4 justify-between items-center'>
              <div className="text-neutral-500 text-xs font-normal font-['Manrope'] leading-[15px]">
                Reporting Period
              </div>
              <div className="relative w-[94px] text-right text-neutral-800 text-xs font-normal font-['Manrope'] leading-[15px]">
                <div className='w-2.5 h-2.5 left-[-18px] top-0 absolute text-sky-500'>
                  <FiCalendar />
                </div>
                {d.from_date} to {d.to_date}
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default EntityView;
