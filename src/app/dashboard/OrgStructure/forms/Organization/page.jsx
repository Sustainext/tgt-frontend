'use client';

import { useState, useEffect } from 'react';
import GeneralInfo from './GeneralInfo';
import { useRouter } from 'next/navigation';
import { post, put,patch } from '../../../../utils/axiosMiddleware';
import { showToast } from '@/app/utils/toastUtils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

  function convertDateFormat(inputDate, targetFormat) {
    // Validate the target format
    const validFormats = ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY/MM/DD'];
    if (!validFormats.includes(targetFormat)) {
      throw new Error('Invalid target format. Must be one of: dd/mm/yyyy, mm/dd/yyyy, yyyy/mm/dd');
    }
  
    // Extract date components (works with / or - separators)
    const dateParts = inputDate.split(/[/-]/);
    
    // Determine the order of components in the input date
    let day, month, year;
    
    if (dateParts[0].length === 4) {
      // Assuming yyyy/mm/dd format
      [year, month, day] = dateParts;
    } else if (parseInt(dateParts[0]) > 12) {
      // First part > 12, assuming dd/mm/yyyy
      [day, month, year] = dateParts;
    } else {
      // Default to mm/dd/yyyy
      [month, day, year] = dateParts;
    }
  
    // Pad single-digit day/month with leading zero
    day = day.padStart(2, '0');
    month = month.padStart(2, '0');
  
    // Create the output based on target format
    switch (targetFormat) {
      case 'DD/MM/YYYY':
        return `${day}/${month}/${year}`;
      case 'MM/DD/YYYY':
        return `${month}/${day}/${year}`;
      case 'YYYY/MM/DD':
        return `${year}/${month}/${day}`;
      default:
        return inputDate; // should never reach here due to validation
    }
  }

  const handleGeneralDetailsSubmit = async (event, data) => {
    console.log('called')
    event.preventDefault();

    const url = '/organization';

    const payload = {
      name: data.generalDetails.name || 'Entity 1',
      type_corporate_entity: data.generalDetails.type || 'Not Specified',
      owner: data.generalDetails.ownership || '',
      location_of_headquarters: data.generalDetails.location || 'Not Specified',
      phone: data.generalDetails.phone || 9999999999,
      mobile: data.generalDetails.mobile || '',
      website: data.generalDetails.website || 'Not Provided',
      fax: data.generalDetails.fax || "",
      employeecount: data.generalDetails.Empcount || 0,
      revenue: data.generalDetails.revenue || 0,
      sector: data.generalDetails.sector || 'General',
      subindustry: data.generalDetails.subIndustry || 'General',
      address: data.addressInformation.street || 'Not Provided',
      country: data.addressInformation.country || 'N/A',
      state: data.addressInformation.state || 'N/A',
      city: data.addressInformation.city || 'N/A',
      date_format: data.generalDetails.dateFormat || "YYYY/MM/DD",
      currency: data.generalDetails.currency || 'USD',
      timezone: data.generalDetails.timeZone || 'UTC',
      from_date: data.reportingPeriodInformation.fromDate || null,
      to_date: data.reportingPeriodInformation.toDate || null,
      sdg: [],
      rating: [],
      certification: [],
      target: [],
      framework: [1],
      // language: data.generalDetails.language || 'English',
      // active: true,
      // no_of_employees: 100,
       // amount: null,
      // ownership_and_legal_form: null,
      // group: null,
      // type_of_corporate_entity: data.generalDetails.type || 'Default',
      // sub_industry: 'General',
      // type_of_business_activities: null,
      // type_of_product: null,
      // type_of_services: null,
      // username: 'mahinder.singh@sustainext.ai',
    };

    try {
      const response = await post(url, payload);
      toast.success('Organization added successfully');
      setTimeout(() => {
        router.push('/dashboard/OrgStructure');
      }, 1000);
    } catch (error) {
       const message = error?.response?.data?.message[0] || 'Failed to add organization'
      toast.error(message, 'error');
      console.error('Error:', error);
    }
  };

  const handleGeneralDetailsEdit = async (event, data, id) => {
    event.preventDefault();

    const url = `/organization_activity/${id}/`;

    const payload = {
      name: data.generalDetails.name || 'Entity 1',
      type_corporate_entity: data.generalDetails.type || 'Not Specified',
      owner: data.generalDetails.ownership || '',
      location_of_headquarters: data.generalDetails.location || 'Not Specified',
      phone: data.generalDetails.phone || 9999999999,
      mobile: data.generalDetails.mobile || '',
      website: data.generalDetails.website || 'Not Provided',
      fax: data.generalDetails.fax || "",
      employeecount: data.generalDetails.Empcount || 0,
      revenue: data.generalDetails.revenue || 0,
      sector: data.generalDetails.sector || 'General',
      subindustry: data.generalDetails.subIndustry || 'General',
      address: data.addressInformation.street || 'Not Provided',
      country: data.addressInformation.country || 'N/A',
      state: data.addressInformation.state || 'N/A',
      city: data.addressInformation.city || 'N/A',
      date_format: data.generalDetails.dateFormat || "YYYY/MM/DD",
      currency: data.generalDetails.currency || 'USD',
      timezone: data.generalDetails.timeZone || 'UTC',
      from_date: data.reportingPeriodInformation.fromDate || null,
      to_date: data.reportingPeriodInformation.toDate || null,
      // sdg: [],
      // rating: [],
      // certification: [],
      // target: [],
      // framework: [1],
      // language: data.generalDetails.language || 'English',
      // active: true,
      // no_of_employees: 100,
       // amount: null,
      // ownership_and_legal_form: null,
      // group: null,
      // type_of_corporate_entity: data.generalDetails.type || 'Default',
      // sub_industry: 'General',
      // type_of_business_activities: null,
      // type_of_product: null,
      // type_of_services: null,
      // username: 'mahinder.singh@sustainext.ai',
    };

    try {
      const response = await patch(url, payload);
      // showToast('Organization updated successfully');
      toast.success(`Changes made to Organization '${data.generalDetails.name}' has been saved`);
      
      // Delay navigation to allow toast to be visible
      setTimeout(() => {
        router.push('/dashboard/OrgStructure');
      }, 2500);
      console.log(response,"Organization updated successfully");
    } catch (error) {
      showToast('Failed to update organization', 'error');
      console.error('Error:', error);
    }

    console.log(payload, 'payload');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // logic for submitting full form
  };

  

  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
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
    </>
  );
}

export default Organization;
