'use client'
import { useState, useEffect } from 'react';
import { useRouter,useSearchParams } from 'next/navigation';
import GeneralInfo from '../Organization/GeneralInfo';
import  { post, put } from '../../../../utils/axiosMiddleware';

const Entity = () => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const queryData = searchParams.get('data');

  const [data, setData] = useState(null);

  useEffect(() => {
    if (queryData) {
      try {
        const decodedData = decodeURIComponent(queryData);
        const parsedData = JSON.parse(decodedData);
        setData(parsedData);
      } catch (error) {
        console.error('Failed to parse query data:', error);
      }
    }
  }, [queryData]);

  const handleGeneralDetailsSubmit = async (event, data) => {
    event.preventDefault();
    await handleGeneralDetails('post', data);
  };

  const handleGeneralDetailsEdit = async (event, data, id) => {
    event.preventDefault();
    await handleGeneralDetails('put', data, id);
  };

  const handleGeneralDetails = async (method, data, id = '') => {
    const url = `/corporate${id ? `/${id}/` : ''}?partial=true`;
    const payload = {
      name: data.generalDetails.name || 'Test Corp',
      corporatetype: data.generalDetails.type || 'Default',
      ownershipnature: data.generalDetails.ownership || 'Default',
      location_headquarters: data.generalDetails.location || null,
      phone: data.generalDetails.phone || null,
      mobile: data.generalDetails.mobile || null,
      website: data.generalDetails.website || null,
      fax: data.generalDetails.fax || null,
      employeecount: data.generalDetails.Empcount || 100,
      revenue: data.generalDetails.revenue || '100000',
      sector: data.generalDetails.sector || 'Default',
      subindustry: data.generalDetails.subIndustry || 'Default',
      address: data.addressInformation.street || 'Bengaluru',
      Country: data.addressInformation.country || 'IN',
      state: data.addressInformation.state || 'Karnataka',
      city: data.addressInformation.city || 'Bengaluru',
      zipcode: data.addressInformation.zipCode || null,
      date_format: data.generalDetails.dateFormat || null,
      currency: data.generalDetails.currency || 'USD',
      timezone: data.generalDetails.timeZone || '+00:00',
      language: data.generalDetails.language || 'English',
      from_date: data.reportingPeriodInformation.fromDate || null,
      to_date: data.reportingPeriodInformation.toDate || null,
      legalform: '1',
      ownership: data.generalDetails.ownership || 'Default',
      group: null,
      location_of_headquarters: null,
      amount: null,
      type_of_business_activities: null,
      type_of_product: null,
      type_of_services: null,
      type_of_business_relationship: null,
      framework: data.reportingPeriodInformation.reportingFramework || 'GRI: With reference to',
      // organization: data.generalDetails.organization || null,
    };

    try {
      const response = method === 'post'
        ? await post(url, payload)
        : await put(url, payload);
      
      console.log(`${method.toUpperCase()} request successful:`, response.data);
      router.push('/dashboard/OrgStructure');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // logic for submitting full form
  };

  return (
    <form onSubmit={handleSubmit} className='p-4 rounded-md m-0'>
      <GeneralInfo
        handleGeneralDetailsSubmit={data ? handleGeneralDetailsEdit : handleGeneralDetailsSubmit}
        heading={data ? 'Edit Corporate Details' : 'Corporate Entity Details'}
        editData={data}
      />
    </form>
  );
};

export default Entity;
