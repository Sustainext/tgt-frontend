// location year and month//
'use client';
import { useEffect, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { yearInfo, months } from '@/app/shared/data/yearInfo';
import axiosInstance from '@/app/utils/axiosMiddleware';

const monthMapping = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
};

const getMonthString = (monthNumber) => {
  return Object.keys(monthMapping).find(
    (key) => monthMapping[key] === monthNumber
  );
};

const Socialheader = ({
  activeMonth,
  setActiveMonth,
  location,
  setLocation,
  year,
  setYear,
}) => {
  const [formState, setFormState] = useState({
    location: location,
    year: year,
    month: activeMonth,
  });

  const [locations, setLocations] = useState([]);
  const [errors, setErrors] = useState({
    location: location ? '' : 'Please select location',
    year: year ? '' : 'Please select year',
  });

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axiosInstance.get('/sustainapp/get_location');
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'month') {
      setActiveMonth(monthMapping[value]);
    } else if (name === 'location') {
      setLocation(Number(value));
      setErrors((prevErrors) => ({
        ...prevErrors,
        location: value ? '' : 'Please select location',
      }));
    } else if (name === 'year') {
      setYear(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        year: value ? '' : 'Please select year',
      }));
    }
  };

  useEffect(() => {
    setFormState({
      location: location,
      year: year,
      month: activeMonth,
    });
  }, [location, year, activeMonth]);

  return (
    <>
      <div className='ml-2 mb-5'>
        <div className='block mb-5 xl:flex md:flex lg:flex 2xl:flex 4k:flex '>
          <div>
            <div className='relative mb-5 md:mb-4 xl:mb-0 lg:mb-0 2xl:mb-0 4k:mb-0'>
              <select
                name='location'
                className='border m-0.5 text-[12px] pr-7 text-neutral-500 appearance-none xl:w-[240px] lg:w-[240px] md:w-[240px] 2xl:w-[240px] 4k:w-[240px] w-[98%] rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                value={formState.location}
                onChange={handleChange}
              >
                <option value=''>Select location</option>
                {locations.map((location, index) => (
                  <option key={index} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
              <div
                className='absolute inset-y-0 right-2 flex items-center pointer-events-none'
                style={{ top: '50%', transform: 'translateY(-50%)' }}
              >
                <MdKeyboardArrowDown
                  className='text-neutral-500'
                  style={{ fontSize: '16px' }}
                />{' '}
              </div>
              {errors.location && (
                <p className='text-[#007EEF]  text-[12px] absolute top-10 left-0 pl-2'>
                  {errors.location}
                </p>
              )}
            </div>
          </div>
          <div>
            <div className='xl:ml-3 md:ml-3 lg:ml-3 2xl:ml-3 4k:ml-3 ml-0 relative mb-5 md:mb-0 xl:mb-0 lg:mb-0 2xl:mb-0 4k:mb-0'>
              <select
                name='year'
                className='border m-0.5 text-[12px] text-neutral-500 appearance-none xl:w-[240px] lg:w-[240px] md:w-[240px] 2xl:w-[240px] 4k:w-[240px] w-[98%] rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                value={formState.year}
                onChange={handleChange}
              >
                <option value=''>Select year</option>
                {yearInfo.map((item) => (
                  <option value={item.slice(0, 4)} key={item}>
                    {item.slice(0, 4)}
                  </option>
                ))}
              </select>
              <div
                className='absolute inset-y-0 right-2 flex items-center pointer-events-none'
                style={{ top: '50%', transform: 'translateY(-50%)' }}
              >
                <MdKeyboardArrowDown
                  className='text-neutral-500'
                  style={{ fontSize: '16px' }}
                />{' '}
              </div>
              {errors.year && (
                <p className='text-[#007EEF]  text-[12px] absolute top-10 left-0 pl-2'>
                  {errors.year}
                </p>
              )}
            </div>
          </div>
          <div>
            <div className='xl:ml-3 md:ml-3 lg:ml-3 2xl:ml-3 4k:ml-3 ml-0 relative mb-5 block xl:hidden lg:hidden md:hidden 2xl:hidden 4k:hidden'>
              <select
                name='month'
                className='border m-0.5 text-[12px] text-neutral-500 appearance-none xl:w-[240px] lg:w-[240px] md:w-[240px] 2xl:w-[240px] 4k:w-[240px] w-[98%] rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                value={Object.keys(monthMapping).find(
                  (key) => monthMapping[key] === formState.month
                )}
                onChange={handleChange}
              >
                <option value=''>Select month</option>
                {months.map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <div className='absolute inset-y-0 right-2 flex items-center pl-3 pointer-events-none'>
                <MdKeyboardArrowDown
                  className='text-neutral-500'
                  style={{ fontSize: '16px' }}
                />{' '}
              </div>
            </div>
          </div>
        </div>
        <div className='hidden xl:block lg:block md:hidden 2xl:block 4k:block'>
          <div className='flex justify-between mb-4 mt-6'>
            <div className='flex bg-[#f7f7f7] py-1 rounded-lg'>
              {months.map((month, index) => (
                <button
                  key={index}
                  className={`text-[12px] border-r mx-1 ${
                    formState.month === monthMapping[month]
                      ? 'bg-white shadow-md rounded-lg'
                      : ''
                  }`}
                  onClick={() =>
                    handleChange({ target: { name: 'month', value: month } })
                  }
                >
                  <p
                    className={`text-center ${
                      formState.month === monthMapping[month]
                        ? 'custom-gradient-text'
                        : 'text-[#A1A1A1]'
                    } hover:bg-[#f7f7f7] py-1 w-[55px] ${
                      index === 0 ? 'rounded-l' : ''
                    } ${index === months.length - 1 ? 'rounded-r' : ''}`}
                  >
                    {month}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Socialheader;
