'use client';
import { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdKeyboardArrowDown, MdSearch } from 'react-icons/md';
import { yearInfo, months } from '@/app/shared/data/yearInfo';
import {
  fetchPreviousMonthData,
  fetchEmissionsData,
  fetchAssignedTasks,
  fetchApprovedTasks,
  setLocation,
  f_setLocationName,
  setYear,
  setMonth,
  f_setMonthName,
  setCountryCode,
  clearSelectedRows,
  fetchLocations,
  setValidationErrors,
} from '@/lib/redux/features/emissionSlice';
import EmissionsFactorsSearchModal from '../../../shared/components/EmissionFactorsSearchModal';

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

const EmissionsHeader = ({
  locationError,
  setLocationError,
  yearError,
  setYearError,
  setLocationname,
}) => {
  const dispatch = useDispatch();
  const { location, year, month, climatiqData } = useSelector(
    (state) => state.emissions
  );

  const {
    data: locations,
    status: locationsStatus,
    error: locationsError,
  } = useSelector((state) => state.emissions.locations);

  // State for controlling the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   if (locationsStatus === "idle") {
  //     dispatch(fetchLocations());
  //   }
  // }, [locationsStatus, dispatch]);

  useEffect(() => {
    if (location && year) {
      dispatch(fetchEmissionsData({ location, year, month }));
      // dispatch(fetchPreviousMonthData({ location, year, month }));
      dispatch(fetchAssignedTasks({ location, year, month }));
      dispatch(fetchApprovedTasks({ location, year, month }));
      dispatch(clearSelectedRows());
    }
    dispatch(setValidationErrors({}));
  }, [location, year, month, dispatch]);

  useEffect(() => {
    if (locationsStatus === 'idle' && locations.length === 0) {
      dispatch(fetchLocations());
    }
  }, [locationsStatus, dispatch, locations.data]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setLocationError('');
    setYearError('');

    if (name === 'month') {
      const monthNumber = monthMapping[value];
      dispatch(setMonth(monthNumber));
      dispatch(f_setMonthName(value));
      localStorage.setItem('selectedMonth', monthNumber);
    } else if (name === 'location') {
      const selectedLocation = locations.find(
        (loc) => loc.id === Number(value)
      );
      if (selectedLocation) {
        dispatch(setCountryCode(selectedLocation.country));
        setLocationname(selectedLocation.name);
        dispatch(f_setLocationName(selectedLocation.name));
      }
      dispatch(setLocation(Number(value)));
      localStorage.setItem('selectedLocation', value);
    } else if (name === 'year') {
      dispatch(setYear(value));
      localStorage.setItem('selectedYear', value);
    }
  };

  const getLocationSelectorMessage = (status, error = null) => {
    switch (status) {
      case 'loading':
        return 'Loading locations...';
      case 'failed':
        return error?.message || 'Failed to load locations';
      case 'succeeded':
        return 'Select location';
      case 'idle':
      default:
        return 'Select location';
    }
  };

  // Function to open the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className='mb-5 relative'>
        <div className='block mb-5 xl:flex md:flex lg:flex 2xl:flex 4k:flex'>
          <div>
            <div className='relative mb-4 md:mb-0 xl:mb-0 lg:mb-0 2xl:mb-0 4k:mb-0'>
              <select
                name='location'
                className='border m-0.5 text-[12px] pr-7 text-neutral-500 appearance-none xl:w-[240px] lg:w-[240px] md:w-[240px] 2xl:w-[240px] 4k:w-[240px] w-[98%] rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                value={location}
                onChange={handleChange}
              >
                <option value=''>
                  {getLocationSelectorMessage(locationsStatus, locationsError)}
                </option>
                {/* {locations?.map((loc, index) => (
                  <option key={index} value={loc.id}>
                    {loc.name}
                  </option>
                ))} */}
                {locations &&
                  [...locations]
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((loc, index) => (
                      <option key={index} value={loc.id}>
                        {loc.name}
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
                />
              </div>
              {locationError && (
                <p className='text-red-500 text-[12px] absolute top-9 left-0 pl-3'>
                  {locationError}
                </p>
              )}
            </div>
          </div>
          <div>
            <div className='xl:ml-3 md:ml-3 lg:ml-3 2xl:ml-3 4k:ml-3 ml-0 relative mb-4 md:mb-0 xl:mb-0 lg:mb-0 2xl:mb-0 4k:mb-0'>
              <select
                name='year'
                className='border m-0.5 text-[12px] text-neutral-500 appearance-none xl:w-[240px] lg:w-[240px] md:w-[240px] 2xl:w-[240px] 4k:w-[240px] w-[98%] rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                value={year}
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
                />
              </div>
              {yearError && (
                <p className='text-red-500 text-[12px] absolute top-9 left-0 pl-3'>
                  {yearError}
                </p>
              )}
            </div>
          </div>

          <div className='relative xl:ml-3 md:ml-3 lg:ml-3 2xl:ml-3 4k:ml-3 ml-0  mb-2 block xl:hidden lg:hidden md:hidden 2xl:hidden 4k:hidden'>
            <select
              name='month'
              className='border m-0.5 text-[12px] text-neutral-500 appearance-none xl:w-[240px] lg:w-[240px] md:w-[240px] 2xl:w-[240px] 4k:w-[240px] w-[98%] rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              value={Object.keys(monthMapping).find(
                (key) => monthMapping[key] === month
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
            <div
              className='absolute inset-y-0 right-2 flex items-center pl-3 pointer-events-none'
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            >
              <MdKeyboardArrowDown
                className='text-neutral-500'
                style={{ fontSize: '16px' }}
              />
            </div>
          </div>
          <div className='w-full flex items-center xl:justify-end  lg:justify-end  md:justify-end 2xl:justify-end 4k:justify-end 2k:justify-end justify-start  me-4'>
            <div className='float-start xl:float-end  lg:float-end  md:float-end 2xl:float-end 4k:float-end  2k:float-end '>
              <p className='text-[14px] text-[#0057A5]'>
                GHG Emissions for the month ={' '}
                <span className='text-[#146152] text-[14px]'>
                  {climatiqData.totalScore} tCO2e{' '}
                </span>
              </p>
              <p></p>
            </div>
          </div>
        </div>
        <div className='hidden xl:block lg:block md:hidden 2xl:block 4k:block'>
          <div className='flex justify-between mb-4'>
            <div className='flex bg-[#f7f7f7] py-1 rounded-lg'>
              {months.map((monthName, index) => (
                <button
                  key={index}
                  className={`text-[12px] border-r mx-1 ${
                    month === monthMapping[monthName]
                      ? 'bg-white shadow-md rounded-lg'
                      : ''
                  }`}
                  onClick={() =>
                    handleChange({
                      target: { name: 'month', value: monthName },
                    })
                  }
                >
                  <p
                    className={`text-center ${
                      month === monthMapping[monthName]
                        ? 'custom-gradient-text'
                        : 'text-[#A1A1A1]'
                    } hover:bg-[#f7f7f7] py-1 w-[55px] ${
                      index === 0 ? 'rounded-l' : ''
                    } ${index === months.length - 1 ? 'rounded-r' : ''}`}
                  >
                    {monthName}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Button to open Emissions Factors Search Modal - positioned at bottom right */}
        <button
          onClick={handleOpenModal}
          className='float-right bg-[#004080] text-white rounded-full p-2 transition-all duration-300 z-50 group mb-4 mr-4'
          title='Search Emission Factors'
        >
          <MdSearch className='text-xl' />
          {/* <span className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Search Emission Factors
          </span> */}
        </button>
      </div>

      {/* Emissions Factors Search Modal */}
      {isModalOpen && (
        <EmissionsFactorsSearchModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default EmissionsHeader;
