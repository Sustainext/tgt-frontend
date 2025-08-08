'use client';
import { useState, useEffect } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import TableSidebar from './TableSidebar';
import DynamicTable from './customTable';
import DateRangePicker from '@/app/utils/DatePickerComponent';
import axiosInstance from '../../../../utils/axiosMiddleware';
import {
  columns1,
  columns2,
  columns3,
  columns4,
  columns5,
  columns6,
  columns7,
  columns8,
  columns9,
  columns10,
  columns11,
  columns12,
  columns13,
} from './data';

const AnalyseEnergy = ({ isBoxOpen }) => {
  const [organisations, setOrganisations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState('');
  const [selectedCorp, setSelectedCorp] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedsetLocation, setSelectedSetLocation] = useState('');
  const [corporates, setCorporates] = useState([]);
  const [reportType, setReportType] = useState('Organization');
  const [loopen, setLoOpen] = useState(false);
  const [dateRange, setDateRange] = useState({ end: '', start: '' });
  const [isDateRangeValid, setIsDateRangeValid] = useState(true);
  const [datasetparams, setDatasetparams] = useState({
    organisation: '',
    corporate: '',
    location: '',
    start: null,
    end: null,
  });

  // States for each table's data
  const [fuelConsumptionRenewable, setFuelConsumptionRenewable] = useState([]);
  const [fuelConsumptionNonRenewable, setFuelConsumptionNonRenewable] =
    useState([]);
  const [energyWithinOrganization, setEnergyWithinOrganization] = useState([]);
  const [directFromRenewable, setDirectFromRenewable] = useState([]);
  const [directFromNonRenewable, setDirectFromNonRenewable] = useState([]);
  const [selfGenFromRenewable, setSelfGenFromRenewable] = useState([]);
  const [selfGenFromNonRenewable, setSelfGenFromNonRenewable] = useState([]);
  const [energySoldRenewable, setEnergySoldRenewable] = useState([]);
  const [energySoldNonRenewable, setEnergySoldNonRenewable] = useState([]);
  const [energyOutsideOrganization, setEnergyOutsideOrganization] = useState(
    []
  );
  const [energyIntensity, setEnergyIntensity] = useState([]);
  const [reductionOfEnergy, setReductionOfEnergy] = useState([]);
  const [reductionInEnergyOfPS, setReductionInEnergyOfPS] = useState([]);
  const [errors, setErrors] = useState({
    organization: 'Please select Organisation',
    corporate: 'Please select Corporate',
    location: 'Please select Location',
  });
  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };
  const handleReportTypeChange = (type) => {
    setReportType(type);

    if (type === 'Organization') {
      setSelectedCorp('');
      setSelectedLocation('');
    }
    if (type === 'Corporate') {
      setFuelConsumptionRenewable([]);
      setFuelConsumptionNonRenewable([]);
      setEnergyWithinOrganization([]);
      setDirectFromRenewable([]);
      setDirectFromNonRenewable([]);
      setSelfGenFromRenewable([]);
      setSelfGenFromNonRenewable([]);
      setEnergySoldRenewable([]);
      setEnergySoldNonRenewable([]);
      setEnergyOutsideOrganization([]);
      setEnergyIntensity([]);
      setReductionOfEnergy([]);
      setReductionInEnergyOfPS([]);
      setDateRange({
        start: null,
        end: null,
      });
      setIsDateRangeValid(false);
    }
    if (type === 'Location') {
      setFuelConsumptionRenewable([]);
      setFuelConsumptionNonRenewable([]);
      setEnergyWithinOrganization([]);
      setDirectFromRenewable([]);
      setDirectFromNonRenewable([]);
      setSelfGenFromRenewable([]);
      setSelfGenFromNonRenewable([]);
      setEnergySoldRenewable([]);
      setEnergySoldNonRenewable([]);
      setEnergyOutsideOrganization([]);
      setEnergyIntensity([]);
      setReductionOfEnergy([]);
      setReductionInEnergyOfPS([]);
      setDateRange({
        start: null,
        end: null,
      });
      setIsDateRangeValid(false);
    }
  };
  const fetchData = async (params) => {
    if (!params.start || !params.end) {
      setIsDateRangeValid(false);
      console.error('Invalid date range selected');
      return;
    } else {
      const startDate = new Date(params.start);
      const endDate = new Date(params.end);

      if (endDate < startDate) {
        setIsDateRangeValid(false);
        setDateRange({
          start: null,
          end: null,
        });
        console.error('End date cannot be before start date');
        return;
      } else {
        setIsDateRangeValid(true);
      }
    }
    LoaderOpen();
    try {
      const response = await axiosInstance.get(
        `/sustainapp/get_energy_analysis`,
        {
          params: params,
        }
      );

      const data = response.data;
      console.log(data, 'testing');

      const {
        fuel_consumption_from_renewable,
        fuel_consumption_from_non_renewable,
        energy_consumption_within_the_org,
        direct_purchased_from_renewable,
        direct_purchased_from_non_renewable,
        self_generated_from_renewable,
        self_generated_from_non_renewable,
        energy_sold_from_renewable,
        energy_sold_from_non_renewable,
        energy_consumption_outside_the_org,
        energy_intensity,
        reduction_of_ene_consump,
        reduction_of_ene_prod_and_services,
      } = data;

      const removeAndStoreLastObject = (array) => {
        if (array.length > 0) {
          return array.pop();
        } else {
          return {};
        }
      };

      // Handle fuel consumption from renewable
      const fuel_consumption_from_renewable_total = removeAndStoreLastObject(
        fuel_consumption_from_renewable
      );
      fuel_consumption_from_renewable.push({
        Energy_type: 'Total Renewable Energy consumption',
        Source: '',
        Quantity: fuel_consumption_from_renewable_total.Total,
        Unit: fuel_consumption_from_renewable_total.Unit,
      });
      setFuelConsumptionRenewable(fuel_consumption_from_renewable);

      // Handle fuel consumption from non-renewable
      const fuel_consumption_from_non_renewable_total =
        removeAndStoreLastObject(fuel_consumption_from_non_renewable);
      fuel_consumption_from_non_renewable.push({
        Energy_type: 'Total Non-Renewable Energy consumption',
        Source: '',
        Quantity: fuel_consumption_from_non_renewable_total.Total,
        Unit: fuel_consumption_from_non_renewable_total.Unit,
      });
      setFuelConsumptionNonRenewable(fuel_consumption_from_non_renewable);

      // Handle energy consumption within the organization
      const energy_consumption_within_the_org_total = removeAndStoreLastObject(
        energy_consumption_within_the_org
      );
      const updatedArray = energy_consumption_within_the_org.map((item) => {
        return {
          ...item,
          Energy_type: item.type_of_energy_consumed,
          consumption: item.consumption,
          unit: item.unit,
        };
      });
      updatedArray.push({
        Energy_type: 'Total Energy Consumption Within the Organization',
        Quantity: energy_consumption_within_the_org_total.Total,
        Unit: energy_consumption_within_the_org_total.unit,
      });
      setEnergyWithinOrganization(updatedArray);

      // Handle direct purchase from renewable
      const direct_purchased_from_renewable_total = removeAndStoreLastObject(
        direct_purchased_from_renewable
      );
      direct_purchased_from_renewable.push({
        Energy_type: 'Total Direct Purchase from Renewable',
        Source: '',
        Quantity: direct_purchased_from_renewable_total.Total,
        Unit: direct_purchased_from_renewable_total.Unit,
      });
      setDirectFromRenewable(direct_purchased_from_renewable);

      // Handle direct purchase from non-renewable
      const direct_purchased_from_non_renewable_total =
        removeAndStoreLastObject(direct_purchased_from_non_renewable);
      direct_purchased_from_non_renewable.push({
        Energy_type: 'Total Direct Purchase from Non-Renewable',
        Source: '',
        purpose: '',
        Quantity: direct_purchased_from_non_renewable_total.Total,
        Unit: direct_purchased_from_non_renewable_total.Unit,
      });
      setDirectFromNonRenewable(direct_purchased_from_non_renewable);

      // Handle self-generated from renewable
      const self_generated_from_renewable_total = removeAndStoreLastObject(
        self_generated_from_renewable
      );
      self_generated_from_renewable.push({
        Energy_type: 'Total Self-Generated from Renewable',
        Source: '',
        Quantity: self_generated_from_renewable_total.Total,
        Unit: self_generated_from_renewable_total.Unit,
      });
      console.log('self generated', self_generated_from_renewable);
      setSelfGenFromRenewable(self_generated_from_renewable);

      // Handle self-generated from non-renewable
      const self_generated_from_non_renewable_total = removeAndStoreLastObject(
        self_generated_from_non_renewable
      );
      self_generated_from_non_renewable.push({
        Energy_type: 'Total Self-Generated from Non-Renewable',
        Source: '',
        Quantity: self_generated_from_non_renewable_total.Total,
        Unit: self_generated_from_non_renewable_total.Unit,
      });
      setSelfGenFromNonRenewable(self_generated_from_non_renewable);

      // Handle energy sold from renewable
      const energy_sold_from_renewable_total = removeAndStoreLastObject(
        energy_sold_from_renewable
      );
      energy_sold_from_renewable.push({
        Energy_type: 'Total Energy Sold from Renewable',
        Source: '',
        Entity_type: '',
        Entity_name: '',
        Quantity: energy_sold_from_renewable_total.Total,
        Unit: energy_sold_from_renewable_total.Unit,
      });
      setEnergySoldRenewable(energy_sold_from_renewable);

      // Handle energy sold from non-renewable
      const energy_sold_from_non_renewable_total = removeAndStoreLastObject(
        energy_sold_from_non_renewable
      );
      energy_sold_from_non_renewable.push({
        Energy_type: 'Total Energy Sold from Non-Renewable',
        Source: '',
        Entity_type: '',
        Entity_name: '',
        Quantity: energy_sold_from_non_renewable_total.Total,
        Unit: energy_sold_from_non_renewable_total.Unit,
      });
      setEnergySoldNonRenewable(energy_sold_from_non_renewable);

      // Handle energy consumption outside the organization
      const energy_consumption_outside_the_org_total = removeAndStoreLastObject(
        energy_consumption_outside_the_org
      );
      energy_consumption_outside_the_org.push({
        Energy_type: 'Total Energy Consumption Outside the Organization',
        Source: '',
        Quantity: energy_consumption_outside_the_org_total.Total,
        Unit: energy_consumption_outside_the_org_total.Unit,
      });
      setEnergyOutsideOrganization(energy_consumption_outside_the_org);

      // Handle energy intensity
      // const energy_intensity_total = removeAndStoreLastObject(energy_intensity);
      // energy_intensity.push({
      //   Energy_type: "Total Energy Intensity",
      //   Organization_metric: "",
      //   Energy_intensity1: "",
      //   Unit1: "",
      //   Energy_intensity2: energy_intensity_total.Total,
      //   Unit2: energy_intensity_total.Unit,
      // });
      setEnergyIntensity(energy_intensity);

      // Handle reduction of energy consumption
      const reduction_of_ene_consump_total = removeAndStoreLastObject(
        reduction_of_ene_consump
      );
      reduction_of_ene_consump.push({
        Type_of_intervention: '',
        Energy_type: 'Total Reduction of Energy Consumption',
        Energy_reduction: '',
        Base_year: '',
        Methodology: '',
        Quantity1: reduction_of_ene_consump_total.Total1,
        Unit1: reduction_of_ene_consump_total.Unit1,
        Quantity2: reduction_of_ene_consump_total.Total2,
        Unit2: reduction_of_ene_consump_total.Unit2,
      });
      setReductionOfEnergy(reduction_of_ene_consump);

      // Handle reduction of energy in production and services
      const reduction_of_ene_prod_and_services_total = removeAndStoreLastObject(
        reduction_of_ene_prod_and_services
      );
      reduction_of_ene_prod_and_services.push({
        Energy_type: 'Total Reduction of Energy in Production and Services',
        Quantity1: reduction_of_ene_prod_and_services_total.Total1,
        Unit1: reduction_of_ene_prod_and_services_total.Unit1,
        Quantity2: reduction_of_ene_prod_and_services_total.Total2,
        Unit2: reduction_of_ene_prod_and_services_total.Unit2,
      });
      setReductionInEnergyOfPS(reduction_of_ene_prod_and_services);

      LoaderClose();
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      LoaderClose();
    }
  };

  useEffect(() => {
    fetchData(datasetparams);
  }, [datasetparams]);

  useEffect(() => {
    const fetchOrg = async () => {
      try {
        const response = await axiosInstance.get(`/orggetonly`);
        setOrganisations(response.data);
        // setSelectedOrg(response.data[0].id);
        setDatasetparams((prevParams) => ({
          ...prevParams,
          organisation: response.data[0].id,
        }));
      } catch (e) {
        console.error('Failed fetching organization:', e);
      }
    };

    fetchOrg();
  }, []);

  useEffect(() => {
    const fetchCorporates = async () => {
      if (selectedOrg) {
        try {
          const response = await axiosInstance.get(`/corporate/`, {
            params: { organization_id: selectedOrg },
          });
          setCorporates(response.data);
        } catch (e) {
          if (e.status === 404) {
            setCorporates([]);
          } else {
            console.error('Failed fetching corporates:', e);
          }
        }
      }
    };

    fetchCorporates();
  }, [selectedOrg]);

  useEffect(() => {
    const fetchLocation = async () => {
      if (selectedCorp) {
        try {
          const response = await axiosInstance.get(
            `/sustainapp/get_location_as_per_corporate/`,
            {
              params: { corporate: selectedCorp },
            }
          );
          setSelectedLocation(response.data || []);
          console.log(response.data, 'location test');
        } catch (e) {
          console.error('Failed fetching locations:', e);
          setSelectedLocation([]);
        }
      }
    };

    fetchLocation();
  }, [selectedCorp]);

  const handleOrganizationChange = (e) => {
    const newOrg = e.target.value;
    setSelectedOrg(newOrg);
    setSelectedCorp('');
    setSelectedSetLocation('');

    setDatasetparams((prevParams) => ({
      ...prevParams,
      organisation: newOrg,
      corporate: '',
      location: '',
    }));
    if (!newOrg) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        organization: 'Please select Organisation',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        organization: '',
      }));
    }
  };

  const handleOrgChange = (e) => {
    const newCorp = e.target.value;
    setSelectedCorp(newCorp);
    setSelectedSetLocation('');

    setDatasetparams((prevParams) => ({
      ...prevParams,
      corporate: newCorp,
      location: '',
    }));
    if (!newCorp) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        corporate: 'Please select Corporate',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        corporate: '',
      }));
    }
  };

  const handleLocationChange = (e) => {
    const newLocation = e.target.value;
    setSelectedSetLocation(newLocation);

    setDatasetparams((prevParams) => ({
      ...prevParams,
      location: newLocation,
    }));
    if (!newLocation) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        location: 'Please select Location',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        location: '',
      }));
    }
  };

  const handleDateChange = (newRange) => {
    setDateRange(newRange);

    setDatasetparams((prevParams) => ({
      ...prevParams,
      start: newRange.start,
      end: newRange.end,
    }));
  };

  return (
    <div>
      <div className='mb-2 flex-col items-center xl:pt-4  gap-6'>
        <div className='mt-4 pb-3 xl:mx-5 lg:mx-5 md:mx-5 2xl:mx-5 4k:mx-5 2k:mx-5 mx-2  text-left'>
          <div className='mb-2 flex-col items-center pt-2  gap-6'>
            <div className='justify-start items-center gap-4 inline-flex'>
              <div className="text-zinc-600 text-[12px]  font-semibold font-['Manrope']">
                View By:
              </div>
              <div className='rounded-lg shadow  justify-start items-start flex'>
                <div
                  className={`w-[111px] px-4 py-2.5 border rounded-l-lg border-gray-300 justify-center items-center gap-2 flex cursor-pointer ${
                    reportType === 'Organization' ? 'bg-[#d2dfeb]' : 'bg-white'
                  }`}
                  onClick={() => handleReportTypeChange('Organization')}
                >
                  <div className="text-slate-800 text-[12px]  font-medium font-['Manrope'] leading-tight">
                    Organization
                  </div>
                </div>
                <div
                  className={`w-[111px] px-4 py-2.5 border-y border-r border-gray-300 justify-center items-center gap-2 flex cursor-pointer ${
                    reportType === 'Corporate' ? 'bg-[#d2dfeb]' : 'bg-white'
                  }`}
                  onClick={() => handleReportTypeChange('Corporate')}
                >
                  <div className="text-slate-700 text-[12px]  font-medium font-['Manrope'] leading-tight">
                    Corporate
                  </div>
                </div>
                <div
                  className={`w-[111px] px-4 py-2.5 border-y border-r rounded-r-lg border-gray-300 justify-center items-center gap-2 flex cursor-pointer ${
                    reportType === 'Location' ? 'bg-[#d2dfeb]' : 'bg-white'
                  }`}
                  onClick={() => handleReportTypeChange('Location')}
                >
                  <div className="text-slate-700 text-[12px]  font-medium font-['Manrope'] leading-tight">
                    Location
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`grid grid-cols-1 md:grid-cols-4 w-full max-w-full mb-2 pt-4 ${
                reportType !== '' ? 'visible' : 'hidden'
              }`}
            >
              <div className='mr-2'>
                <label
                  htmlFor='cname'
                  className='text-neutral-800 text-[12px] font-normal'
                >
                  Select Organization*
                </label>
                <div className='mt-2 relative'>
                  <select
                    className='block w-full rounded-md border-0 py-1.5 pl-4 pr-8 text-neutral-500 text-[12px] font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 appearance-none'
                    value={selectedOrg}
                    onChange={handleOrganizationChange}
                  >
                    <option value='01'>--Select Organization--- </option>
                    {organisations &&
                      organisations.map((org) => (
                        <option key={org.id} value={org.id}>
                          {org.name}
                        </option>
                      ))}
                  </select>
                  <div className='absolute right-2 top-2 pointer-events-none'>
                    <MdKeyboardArrowDown
                      className='text-neutral-500'
                      style={{ fontSize: '16px' }}
                    />
                  </div>
                  {errors.organization && (
                    <p className='text-[#007EEF] text-[12px] pl-2 mt-2'>
                      {errors.organization}
                    </p>
                  )}
                </div>
              </div>
              {(reportType === 'Corporate' || reportType === 'Location') && (
                <div className='mr-2'>
                  <label
                    htmlFor='cname'
                    className='text-neutral-800 text-[12px] font-normal ml-1'
                  >
                    Select Corporate
                  </label>
                  <div className='mt-2 relative'>
                    <select
                      className='block w-full rounded-md border-0 py-1.5 pl-4 pr-8 text-neutral-500 text-[12px] font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 appearance-none'
                      value={selectedCorp}
                      onChange={handleOrgChange}
                    >
                      <option value=''>--Select Corporate--- </option>
                      {corporates &&
                        corporates.map((corp) => (
                          <option key={corp.id} value={corp.id}>
                            {corp.name}
                          </option>
                        ))}
                    </select>
                    <div className='absolute right-2 top-2 pointer-events-none'>
                      <MdKeyboardArrowDown
                        className='text-neutral-500'
                        style={{ fontSize: '16px' }}
                      />
                    </div>
                    {errors.corporate && (
                      <p className='text-[#007EEF] text-[12px] pl-2 mt-2'>
                        {errors.corporate}
                      </p>
                    )}
                  </div>
                </div>
              )}
              {reportType === 'Location' && (
                <div className='mr-2'>
                  <label
                    htmlFor='cname'
                    className='text-neutral-800 text-[12px] font-normal ml-1'
                  >
                    Select Location
                  </label>
                  <div className='mt-2 relative'>
                    <select
                      className='block w-full rounded-md border-0 py-1.5 pl-4 pr-8 text-neutral-500 text-[12px] font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 appearance-none'
                      value={selectedsetLocation}
                      onChange={handleLocationChange}
                    >
                      <option value=''>--Select Location--- </option>
                      {selectedLocation &&
                        selectedLocation.map((location) => (
                          <option key={location.id} value={location.id}>
                            {location.name}
                          </option>
                        ))}
                    </select>
                    <div className='absolute right-2 top-2 pointer-events-none'>
                      <MdKeyboardArrowDown
                        className='text-neutral-500'
                        style={{ fontSize: '16px' }}
                      />
                    </div>
                    {errors.location && (
                      <p className='text-[#007EEF] text-[12px] pl-2 mt-2'>
                        {errors.location}
                      </p>
                    )}
                  </div>
                </div>
              )}
              <div className='mr-2'>
                <label
                  htmlFor='cname'
                  className='text-neutral-800 text-[12px] font-normal'
                >
                  Select Date
                </label>
                <div className='mt-2'>
                  <DateRangePicker
                    startDate={dateRange.start}
                    endDate={dateRange.end}
                    onDateChange={handleDateChange}
                  />
                  {!isDateRangeValid && (
                    <p className='text-[#007EEF] text-[12px] pl-2 mt-2'>
                      Please select a date range
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block'>
        <div className='flex-1 pr-4 max-w-full overflow-hidden'>
          <div className='mb-6'>
            <div
              id='fuelFromRenewable'
              className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
            >
              <p className='mb-2 ml-1'>
                Fuel Consumption within the organisation from Renewable sources
              </p>
              <div className='w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex'>
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 302-1a
                </div>
              </div>
            </div>
            <DynamicTable columns={columns1} data={fuelConsumptionRenewable} />
          </div>
          <div className='mb-6'>
            <div
              id='fuelFromNonRenewable'
              className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
            >
              <p className='mb-2 ml-1'>
                Fuel Consumption within the organisation from Non-renewable
                sources
              </p>
              <div className='w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex'>
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 302-1b
                </div>
              </div>
            </div>
            <DynamicTable
              columns={columns2}
              data={fuelConsumptionNonRenewable}
            />
          </div>
          <div className='mb-6'>
            <div
              id='EnergyWithinOrganization'
              className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
            >
              <p className='mb-2 ml-1'>
                Energy Consumption Within the organisation
              </p>
              <div className='w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex'>
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 302-1e
                </div>
              </div>
            </div>
            <DynamicTable columns={columns3} data={energyWithinOrganization} />
          </div>
          <div className='mb-6'>
            <div
              id='DirectFromRenewable'
              className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
            >
              <p className='mb-2 ml-1'>
                Direct Purchased Heating, Cooling, Electricity and Steam from
                renewable sources
              </p>
              <div className='w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex'>
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 302-1
                </div>
              </div>
            </div>
            <DynamicTable columns={columns4} data={directFromRenewable} />
          </div>
          <div className='mb-6'>
            <div
              id='DirectFromNonRenewable'
              className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
            >
              <p className='mb-2 ml-1'>
                Direct Purchased Heating, Cooling, Electricity and Steam from
                non-renewable sources
              </p>
              <div className='w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex'>
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 302-1
                </div>
              </div>
            </div>
            <DynamicTable columns={columns5} data={directFromNonRenewable} />
          </div>
          <div className='mb-6'>
            <div
              id='SelfGenFromRenewable'
              className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
            >
              <p className='mb-2 ml-1'>
                Self Generated Energy - not consumed or sold (Renewable Energy)
              </p>
              <div className='w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex'>
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 302-1
                </div>
              </div>
            </div>
            <DynamicTable columns={columns6} data={selfGenFromRenewable} />
          </div>
          <div className='mb-6'>
            <div
              id='SelfGenFromNonRenewable'
              className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
            >
              <p className='mb-2 ml-1'>
                Self Generated Energy - not consumed or sold (non-renewable
                Energy)
              </p>
              <div className='w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex'>
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 302-1
                </div>
              </div>
            </div>
            <DynamicTable columns={columns7} data={selfGenFromNonRenewable} />
          </div>
          <div className='mb-6'>
            <div
              id='EnergySoldRenewable'
              className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
            >
              <p className='mb-2 ml-1'> Energy Sold (Renewable energy)</p>
              <div className='w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex'>
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 302-1d
                </div>
              </div>
            </div>
            <DynamicTable columns={columns8} data={energySoldRenewable} />
          </div>
          <div className='mb-6'>
            <div
              id='EnergySoldNonRenewable'
              className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
            >
              <p className='mb-2 ml-1'> Energy Sold (non-renewable energy)</p>
              <div className='w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex'>
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 302-1d
                </div>
              </div>
            </div>
            <DynamicTable columns={columns9} data={energySoldNonRenewable} />
          </div>
          <div className='mb-6'>
            <div
              id='EnergyOutsideOrganization'
              className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
            >
              <p className='mb-2 ml-1'>
                {' '}
                Energy Consumption outside of the organization
              </p>
              <div className='w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex'>
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 302-2a
                </div>
              </div>
            </div>
            <DynamicTable
              columns={columns10}
              data={energyOutsideOrganization}
            />
          </div>
          <div className='mb-6'>
            <div
              id='EnergyIntensity'
              className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
            >
              <p className='mb-2 ml-1'> Energy Intensity</p>
              <div className='w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex'>
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 302-3a
                </div>
              </div>
            </div>
            <DynamicTable columns={columns13} data={energyIntensity} />
          </div>
          <div className='mb-6'>
            <div
              id='ReductionOfEnergy'
              className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
            >
              <p className='mb-2 ml-1'> Reduction of energy consumption</p>
              <div className=''>
                <div className='w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center mx-2 inline-flex'>
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 302-5a
                  </div>
                </div>
                <div className='w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center  inline-flex'>
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 302-5b
                  </div>
                </div>
              </div>
            </div>
            <DynamicTable columns={columns11} data={reductionOfEnergy} />
          </div>
          <div className='mb-6'>
            <div
              id='ReductionInEnergyOfPS'
              className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
            >
              <p className='mb-2 ml-1'>
                {' '}
                Reductions in energy requirements of products and services
              </p>
              <div className='gap-4'>
                <div className='w-[70px] h-[26px] p-2  bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center mx-2 inline-flex'>
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 302-4a
                  </div>
                </div>
                <div className='w-[70px] h-[26px] p-2  bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center  inline-flex'>
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 302-4b
                  </div>
                </div>
              </div>
            </div>
            <DynamicTable columns={columns12} data={reductionInEnergyOfPS} />
          </div>
        </div>
        <div
          style={{
            position: `${isBoxOpen ? 'unset' : 'sticky'}`,
            top: '10rem',
            // zIndex: "0",
            height: 'fit-content',
            backgroundColor: 'white',
            paddingBottom: '1rem',
          }}
          className=' mb-8 me-2 hidden xl:block lg:block md:hidden 2xl:block 4k:block 2k:block '
        >
          <TableSidebar />
        </div>
      </div>
    </div>
  );
};

export default AnalyseEnergy;
