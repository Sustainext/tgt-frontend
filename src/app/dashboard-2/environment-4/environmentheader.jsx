
'use client'
import { useState} from "react";
import {MdKeyboardArrowDown} from "react-icons/md";
const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const EnvironmentHeader = ({ activeMonth, setActiveMonth }) => {
  const [locations, setLocations] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');

  return (
    <>
      <div className="ml-2 mb-5">


        <div className="flex mb-5">
        <div className=''>

            <select
              className={`border m-0.5 text-sm text-neutral-500 appearance-none pr-24 rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 `}
            > <option value="location1">Select location</option>
            </select>
            {/* <div className='absolute inset-y-0 right-2 flex items-center pl-3 pointer-events-none'>
              <MdKeyboardArrowDown
                className='text-neutral-500'
                style={{ fontSize: '16px' }}
              />
            </div> */}

          </div>
 <div className=' ml-3'>
            <select
              className={`border m-0.5 text-sm text-neutral-500 appearance-none pr-32 rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 `}
            > <option value="location1">Select year</option>
            </select>
            {/* <div className='absolute inset-y-0 right-2 flex items-center pl-3 pointer-events-none'>
              <MdKeyboardArrowDown
                className='text-neutral-500'
                style={{ fontSize: '16px' }}
              />
            </div> */}
          </div>


        </div>
        <div className="flex justify-between mb-4">
          <div className="flex  bg-[#f7f7f7] py-1 rounded-lg">
            {months.map((month, index) => (
              <button
                key={index}
                className={`text-[12px] border-r mx-1 ${activeMonth === month ? 'bg-white shadow-md rounded-lg' :''}`}
                onClick={() => setActiveMonth(month)}
              >
                <p className={`text-center ${activeMonth === month ? 'custom-gradient-text' : 'text-[#A1A1A1]'} hover:bg-[#f7f7f7]  py-1 w-[55px] ${index === 0 ? 'rounded-l' : ''} ${index === months.length - 1 ? 'rounded-r' : ''}`}>{month}</p>
              </button>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}

export default EnvironmentHeader;

