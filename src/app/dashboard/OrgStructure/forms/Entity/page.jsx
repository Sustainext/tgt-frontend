"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import GeneralInfo from "../Organization/GeneralInfo";
import { post, put,patch } from "../../../../utils/axiosMiddleware";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";

const Entity = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryData = searchParams.get("data");
  let brsrFrameworkId = Cookies.get('selected_brsr_framework_id') || 0

  const [data, setData] = useState(null);

  useEffect(() => {
    if (queryData) {
      try {
        const decodedData = decodeURIComponent(queryData);
        const parsedData = JSON.parse(decodedData);
        setData(parsedData);
      } catch (error) {
        console.error("Failed to parse query data:", error);
      }
    }
  }, [queryData]);

  const handleGeneralDetailsSubmit = async (event, data) => {
    event.preventDefault();
    await handleGeneralDetails("post", data);
  };

  const handleGeneralDetailsEdit = async (event, data, id) => {
    event.preventDefault();
    await handleGeneralDetails("patch", data, id);
  };

  const handleGeneralDetails = async (method, data, id = "") => {
    const url = `/corporate${id ? `/${id}/` : ""}`;
    const payload = {
      name: data.generalDetails.name || "Test Corp",
      corporatetype: data.generalDetails.type || "Not Specified",
      ownershipnature: data.generalDetails.ownership || "",
      email:data.generalDetails.email || '',
      location_headquarters: data.generalDetails.location || null,
      phone: data.generalDetails.phone || 9999999999,
      mobile: data.generalDetails.mobile || '',
      website: data.generalDetails.website || 'Not Provided',
      fax: data.generalDetails.fax || '',
      employeecount: data.generalDetails.Empcount || 0,
      revenue: data.generalDetails.revenue || 0,
      sector: data.generalDetails.sector || "General",
      subindustry: data.generalDetails.subIndustry || "General",
      address: data.addressInformation.street || "Not Provided",
      country: data.addressInformation.country || "N/A",
      state: data.addressInformation.state || "N/A",
      city: data.addressInformation.city || "N/A",
      // zipcode: data.addressInformation.zipCode || null,
      date_format: data.generalDetails.dateFormat || "YYYY/MM/DD",
      currency: data.generalDetails.currency || "USD",
      timezone: data.generalDetails.timeZone || "UTC",
      from_date: data.reportingPeriodInformation.fromDate || null,
      to_date: data.reportingPeriodInformation.toDate || null,
      // legalform: "1",
      // ownership: data.generalDetails.ownership || "",
      // group: null,
      // location_of_headquarters: null,
      // amount: null,
      // type_of_business_activities: null,
      // type_of_product: null,
      // type_of_services: null,
      // type_of_business_relationship: null,

    };

    // Add organization property if the method is 'post'
    if (method === "post") {
      payload.organization = data.generalDetails.organisation || null;
      payload.framework=[1],
    payload.sdg= [],
    payload.rating= [],
    payload.certification= [],
    payload.target= []
      // payload.framework = "GRI: With reference to";
    }

    try {
      const response =
        method === "post" ? await post(url, payload) : await patch(url, payload);

      const messageAction = method === "post" ? "Corporate added successfully" : `Changes made to Corporate '${data.generalDetails.name}' has been saved`;
      toast.success(`${messageAction}`);

      console.log(`${method.toUpperCase()} request successful:`, response.data);

      setTimeout(() => {
        router.push('/dashboard/OrgStructure');
      }, 2500);
    } catch (error) {
      console.error("Error:", error);
      const messageAction = method === "post" ? "add" : "update";
      const message = error?.response?.data?.message[0] || `Failed to ${messageAction} corporate entity`
      toast.error(message, "error");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // logic for submitting full form
  };

  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
    <form onSubmit={handleSubmit} className="p-4 rounded-md m-0">
      <GeneralInfo
        handleGeneralDetailsSubmit={
          data ? handleGeneralDetailsEdit : handleGeneralDetailsSubmit
        }
        heading={data ? "Edit Corporate Details" : "Corporate Entity Details"}
        editData={data}
         brsrFrameworkId={brsrFrameworkId}
      />
    </form>
    </>
  );
};

export default Entity;
