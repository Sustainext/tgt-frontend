'use client';

import { useState, useEffect } from 'react';
import GeneralInfo from './GeneralInfo';
import { useRouter } from 'next/navigation';
import axiosInstance, { post, put } from '../../../../utils/axiosMiddleware';

function Organization() {
  const [currentOrganization, setCurrentOrganization] = useState(null);
  const router = useRouter();
  const [data, setData] = useState(null);

  useEffect(() => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const dataParam = params.get('data');

    if (dataParam) {
      const decodedData = decodeURIComponent(dataParam);
      const parsedData = JSON.parse(decodedData);
      setData(parsedData);
    }
  }, []);

  const handleGeneralDetailsSubmit = async (event, data) => {
    event.preventDefault();

    const url = '/organization';

    const payload = {
      name: data.generalDetails.name || 'Entity 1',
      type_corporate_entity: data.generalDetails.type || 'Office',
      owner: data.generalDetails.ownership || 'Default',
      phone: data.generalDetails.phone || 9876543210,
      mobile: data.generalDetails.mobile || 9876543210,
      website: data.generalDetails.website || 'https://www.sustainext.ai',
      fax: data.generalDetails.fax || 234567,
      employeecount: data.generalDetails.Empcount || 100,
      subindustry: data.generalDetails.subIndustry || 'Default',
      address: data.addressInformation.street || 'Bengaluru',
      countryoperation: data.addressInformation.country || 'IN',
      state: data.addressInformation.state || 'Karnataka',
      city: data.addressInformation.city || 'Bengaluru',
      date_format: data.generalDetails.dateFormat || 'mm/dd/yyyy',
      currency: data.generalDetails.currency || 'INR',
      timezone: data.generalDetails.timeZone || '+00:00',
      language: data.generalDetails.language || 'English',
      from_date: data.reportingPeriodInformation.fromDate || null,
      to_date: data.reportingPeriodInformation.toDate || null,
      active: true,
      no_of_employees: 100,
      revenue: data.generalDetails.revenue || 100000,
      amount: null,
      sector: data.generalDetails.sector || 'Default',
      ownership_and_legal_form: null,
      group: null,
      type_of_corporate_entity: data.generalDetails.type || 'Default',
      location_of_headquarters: data.generalDetails.location || 'Bengaluru',
      sub_industry: 'Default',
      type_of_business_activities: null,
      type_of_product: null,
      type_of_services: null,
      sdg: 'SDG1',
      rating: 'rating1',
      certification: null,
      target: null,
      framework: data.reportingPeriodInformation.reportingFramework || 'GRI',
      username: 'mahinder.singh@sustainext.ai',
    };

    try {
      const response = await post(url, payload);
      router.push('/dashboard/OrgStructure');
      console.log('POST request successful:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }

    console.log(payload, 'payload');
  };

  const handleGeneralDetailsEdit = async (event, data, id) => {
    event.preventDefault();

    const url = `/organization_activity/${id}/`;

    const payload = {
      name: data.generalDetails.name || 'Edited Location',
      type_corporate_entity: data.generalDetails.type || null,
      owner: data.generalDetails.ownership || '',
      phone: data.generalDetails.phone || null,
      mobile: data.generalDetails.mobile || null,
      website: data.generalDetails.website || null,
      fax: data.generalDetails.fax || null,
      employeecount: data.generalDetails.Empcount || null,
      subindustry: data.generalDetails.subIndustry || null,
      address: data.addressInformation.street || null,
      countryoperation: data.addressInformation.country || null,
      state: data.addressInformation.state || null,
      city: data.addressInformation.city || null,
      date_format: data.generalDetails.dateFormat || null,
      currency: data.generalDetails.currency || null,
      timezone: data.generalDetails.timeZone || null,
      language: data.generalDetails.language || null,
      from_date: data.reportingPeriodInformation.fromDate || null,
      to_date: data.reportingPeriodInformation.toDate || null,
      active: true,
      no_of_employees: data.generalDetails.Empcount || null,
      revenue: data.generalDetails.revenue || null,
      amount: null,
      sector: data.generalDetails.sector || null,
      ownership_and_legal_form: null,
      group: null,
      type_of_corporate_entity: data.generalDetails.type || null,
      location_of_headquarters: data.generalDetails.location || null,
      sub_industry: data.generalDetails.subIndustry || null,
      type_of_business_activities: null,
      type_of_product: null,
      type_of_services: null,
      sdg: [],
      rating: [],
      certification: [],
      target: [],
      framework: data.reportingPeriodInformation.reportingFramework || 'GRI: With reference to',
      username: 'mahinder.singh@sustainext.ai',
    };

    try {
      const response = await put(url, payload);
      router.push('/dashboard/OrgStructure');
      alert('Organisation updated successfully');
    } catch (error) {
      console.error('Error:', error);
    }

    console.log(payload, 'payload');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // logic for submitting full form
  };

  return (
    <form onSubmit={handleSubmit} className='p-4 rounded-md m-0'>
      <GeneralInfo
        handleGeneralDetailsSubmit={
          data ? handleGeneralDetailsEdit : handleGeneralDetailsSubmit
        }
        heading={
          data ? 'Edit Organisation Details' : 'Add Organisation Details'
        }
        editData={data}
      />
    </form>
  );
}

export default Organization;
