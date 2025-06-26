"use client";
import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import axiosInstance from "@/app/utils/axiosMiddleware";
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";

import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
// import MultitypefiledWidget from "../../../../../shared/widgets/Environment/MultitypefiledWidget";
import BioDiversityTwoTableWidget from '../../../../../shared/widgets/Environment/BioDiversityTwoTableWidget'
const widgets = {
  BioDiversityTwoTableWidget: BioDiversityTwoTableWidget,
};

const view_path =
  "environment_biodiversity_operational_sites_innear_areas_of_high_biodiversity_value";
const client_id = 1;
const user_id = 1;

const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      col1: {
        type: "string",
        title: "Type",
         enum: [
          "Plant",
          "Animal",
          "Fungi",
          "Coral",
          "Others (please specify)",
        ],
      },

      col2: {
        type: "string",
        title: "Harvested Wild Species",
      },
      col3: {
        type: "string",
        title: "Quantity",
      },
      col4: {
        type: "string",
        title: "Extinction Risk",
        enum: [
          "Least Concern",
          "Near Threatened",
          "Vulnerable",
          "Endangered",
          "Critically Endangered",
          "Extinct in the Wild",
          "Extinct"
        ],
      },
      
    },
  },
};

const uiSchema = {
  "ui:widget": "BioDiversityTwoTableWidget",
  "ui:options": {
    titles: [
      {
        key: "col1",
        title: "Type",
        tooltip:
          "<p>Please specify the type of wild species harvested</p>",
        layouttype: "select",
        tooltipdispaly: "block",
      },
      {
        key: "col2",
        title: "Harvested Wild Species",
        tooltip:
          "Provide information on wild species harvested at the selected location. Harvesting wild species means collecting, catching, or hunting wild animals, plants, or fungi including any taken by accident as part of the organization’s activities.",
        layouttype: "input",
        tooltipdispaly: "block",
      },
      {
        key: "col3",
        title: "Quantity",
        tooltip:
          "Provide details on total quantity of wild species harvested.",
        layouttype: "inputonlynumber",
        tooltipdispaly: "block",
      },
      {
        key: "col4",
        title: "Extinction Risk",
        tooltip:
          "<p>Indicate the level of extinction risk of the species harvested.<br/> Critically Endangered: Species facing an extremely high risk of extinction in the wild in the immediate future.<br/> Endangered: Species facing a very high risk of extinction in the wild in the near future.<br/> Vulnerable: Species considered to be facing a high risk of extinction in the wild in the medium term.<br/> Near Threatened: Species that do not currently meet the criteria for being endangered or vulnerable but are close to qualifying or are likely to qualify in the near future.<br/> Least Concern: Species that have been evaluated and found to be at low risk of extinction. They are widespread and abundant.<br/> Extinct in the Wild: Survives only in captivity or outside its natural habitat; no individuals left in the wild.<br/> Extinct: No known individuals remaining anywhere. </p>",
        layouttype: "select",
        tooltipdispaly: "block",
      },
     
    ],
  },
};

const schema2 = {
  type: "array",
  items: {
    type: "object",
    properties: {
      col1: {
        type: "string",
        title: "Water withdrawal",
      },

      col2: {
        type: "string",
        title: "Water Consumption",
      },
      col3: {
        type: "string",
        title: "Unit",
        enum: [
          "Liter",
          "Megalitre",
          "Cubic meter",
          "Kiloliter",
          "Milion litres per day",
        ],
      },
    },
  },
};

const uiSchema2 = {
  "ui:widget": "BioDiversityTwoTableWidget",
  "ui:options": {
    titles: [
      {
        key: "col1",
        title: "Water withdrawal",
        tooltip:
          "<p>What is the total amount of water withdrawn at the site?<br/> Water withdrawal: sum of all water drawn from surface water, groundwater, seawater, or a third party for any use over the course of the reporting period.</p>",
        layouttype: "inputonlynumber",
        tooltipdispaly: "block",
      },
      {
        key: "col2",
        title: "Water Consumption",
        tooltip:
          "<p>What is the total water consumption at the site?<br/> Water consumption: sum of all water that has been withdrawn and incorporated into products, used in the production of crops or generated as waste, has evaporated, transpired, or been consumed by humans or livestock, or is polluted to the point of being unusable by other users, and is therefore not released back to surface water, groundwater, seawater, or a third party over the course of the reporting period.</p>",
        layouttype: "inputonlynumber",
        tooltipdispaly: "block",
      },
      {
        key: "col3",
        title: "Unit",
        tooltip:
          "Select the correct unit corresponding to the quantity of water withdrawal/consumption.",
        layouttype: "select",
        tooltipdispaly: "block",
      },
     
    ],
  },
};

const Screen2Comp = ({ location, year, month }) => {
  // const [formData, setFormData] = useState([{}]);
  // const [r_schema, setRemoteSchema] = useState({});
  // const [r_ui_schema, setRemoteUiSchema] = useState({});
  const apiDataAvailable=true;
  const isTopicSelected=false;
  const [formData, setFormData] = useState({
  wildSpecies: [{}],
  waterConsumption: [{}]
});

const [schemas, setSchemas] = useState({
  wildSpecies: {},
  waterConsumption: {}
});

const [uiSchemas, setUiSchemas] = useState({
  wildSpecies: {},
  waterConsumption: {}
});

  const [loopen, setLoOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [locationdata, setLocationdata] = useState();
  const toastShown = useRef(false);

  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };

  const handleChange = (e) => {
    setFormData(e.formData);
  };
  const handleFormChange = (formKey) => (e) => {
  setFormData((prev) => ({
    ...prev,
    [formKey]: e.formData,
  }));
};

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
 

//   const loadFormData = async () => {
//     LoaderOpen();
//     setFormData([{}]);
//     const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&location=${location}&year=${year}&month=${month}`;
//     try {
//       const response = await axiosInstance.get(url);
//       console.log("API called successfully:", response.data);
//       setRemoteSchema(response.data.form[0].schema);
//       setRemoteUiSchema(response.data.form[0].ui_schema);
// const form_parent = response.data.form_data;
//       const f_data = form_parent[0].data[0].formData;
//       const option_data = form_parent[0].data[0].selectedOption;
//     //   setFormData({
//     //     wildSpecies: fetchedData.wildSpecies || [{}],
//     //     waterConsumption: fetchedData.waterConsumption || [{}]
//     //   });
//       setFormData(f_data);
//       setSelectedOption(option_data);
//     } catch (error) {
//       setFormData([{}]);
//       LoaderClose();
//     } finally {
//       LoaderClose();
//     }
//   };
 
const loadFormData = async () => {
  LoaderOpen();
  const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&location=${location}&year=${year}&month=${month}`;
  
  try {
    const response = await axiosInstance.get(url);
    console.log("API called successfully:", response.data);

    const forms = response.data.form || [];
    const formDatas = response.data.form_data || [];

    const tempSchemas = {};
    const tempUiSchemas = {};
    const tempFormData = {};

    forms.forEach((form, idx) => {
      const key = form.slug || (idx === 0 ? "wildSpecies" : "waterConsumption");
      tempSchemas[key] = form.schema;
      tempUiSchemas[key] = form.ui_schema;

      const dataEntry = formDatas[idx]?.data?.[0] || {};
      tempFormData[key] = dataEntry.formData || [{}];
    });

    setSchemas(tempSchemas);
    setUiSchemas(tempUiSchemas);
    setFormData(tempFormData);

    const option_data = formDatas[0]?.data?.[0]?.selectedOption || "";
    setSelectedOption(option_data);
  } catch (error) {
    setFormData({ wildSpecies: [{}], waterConsumption: [{}] });
    LoaderClose();
  } finally {
    LoaderClose();
  }
};

  const updateFormData = async () => {
    LoaderOpen();
    const data = {
      client_id: client_id,
      user_id: user_id,
      path: view_path,
      // form_data: [
      //   {
      //     formData: formData,
      //     selectedOption: selectedOption,
      //   },
      // ],
      form_data: [
      {
        formData: formData.wildSpecies,
        selectedOption: selectedOption,
      },
      {
        formData: formData.waterConsumption,
        selectedOption: selectedOption,
      },
    ],
      location,
      year,
      month,
    };

    const url = `${process.env.BACKEND_API_URL}/datametric/update-fieldgroup`;
    try {
      const response = await axios.post(url, data, axiosConfig);
      if (response.status === 200) {
        toast.success("Data added successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        LoaderClose();
        loadFormData();
      } else {
        toast.error("Oops, something went wrong", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        LoaderClose();
      }
    } catch (error) {
      toast.error("Oops, something went wrong", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      LoaderClose();
    }
  };

  
  //Reloading the forms -- White Beard
  // useEffect(() => {
  //   //console.long(r_schema, '- is the remote schema from django), r_ui_schema, '- is the remote ui schema from django')
  // }, [r_schema, r_ui_schema]);

  // console log the form data change
  useEffect(() => {
    console.log("Form data is changed -", formData);
  }, [formData]);

  // fetch backend and replace initialized forms
  // useEffect(() => {
  //   if (location && year && month) {
  //     loadFormData();
  //     toastShown.current = false; // Reset the flag when valid data is present
  //   } else {
  //     // Only show the toast if it has not been shown already
  //     if (!toastShown.current) {
  //       toastShown.current = true; // Set the flag to true after showing the toast
  //     }
  //   }
  //   // console.log('From loaded , ready for trigger')
  //   // loadFormData()
  // }, [location, year, month]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log("Form data:", formData);
    updateFormData();
  };
  return (
    <>
      <div className="w-full max-w-[546px] mb-2 px-2">
        <label className="text-sm leading-5 text-gray-700 flex w-full">
        Do the organization’s activities lead to the exploitation of natural resources?
          <div className="ml-2 relative">
            <MdInfoOutline
              data-tooltip-id={`tooltip-$ebr1`}
              data-tooltip-html="<p>Indicate whether your organization currently uses or could use natural resources in a way that may deplete or damage them (e.g. water, minerals, plants, animals etc.)</p>"
              className="mt-1 ml-2 text-[15px]"
            />
            <ReactTooltip
              id={`tooltip-$ebr1`}
              place="top"
              effect="solid"
              style={{
                width: "290px",
                backgroundColor: "#000",
                color: "white",
                fontSize: "12px",
                boxShadow: 3,
                borderRadius: "8px",
                textAlign: "left",
              }}
            ></ReactTooltip>
          </div>
        </label>
        <select
           className={`block  py-1 text-sm leading-6 mb-6  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-2 rounded-md p-2 mt-2 w-full border-gray-300 }`}
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option>Select Yes/No</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      {selectedOption === "yes" && (
        <>
          <div className="mb-4 mt-2">
          <label className="text-sm leading-5 mb-2 text-gray-700 flex w-[546px] px-2">
          Exploitation of natural resources (Wild species harvested)
          <div className="mt-1 ml-2 relative">
            <MdInfoOutline
              data-tooltip-id={`tooltip-$ebr2`}
              data-tooltip-html="<p>This section documents data corresponding to the sites where organisation's activities lead or could lead to the exploitation of natural resources.</p>"
              className=" ml-2 text-[15px]"
            />
            <ReactTooltip
              id={`tooltip-$ebr2`}
              place="top"
              effect="solid"
              style={{
                width: "290px",
                backgroundColor: "#000",
                color: "white",
                fontSize: "12px",
                boxShadow: 3,
                borderRadius: "8px",
                textAlign: "left",
              }}
            ></ReactTooltip>
          </div>
        </label>
            <div>
              {/* <Form
                schema={schema}
                uiSchema={uiSchema}
                formData={formData}
                // onChange={(e) =>
                //     setFormData((prev) => ({ ...prev, wildSpecies: e.formData }))
                //   }
                onChange={handleChange}
                validator={validator}
                widgets={widgets}
                formContext={{ locationdata }}
              /> */}
              <Form
  schema={schema}
  uiSchema={uiSchema}
  formData={formData.wildSpecies}
  onChange={handleFormChange("wildSpecies")}
  validator={validator}
  widgets={widgets}
  // formContext={{ locationdata }}
/>
            </div>
          </div>
          <div className="mb-4 mt-2">
          <label className="text-sm leading-5 mb-2 text-gray-700 flex w-[546px] px-2">
          Exploitation of natural resources (Water consumption)
        </label>
            <div>
              {/* <Form
                schema={schema2}
                uiSchema={uiSchema2}
                // formData.waterConsumption
                formData={formData}
                // onChange={(e) =>
                //     setFormData((prev) => ({ ...prev, waterConsumption: e.formData }))
                //   }
                onChange={handleChange}
                validator={validator}
                widgets={widgets}
                formContext={{ locationdata }}
              /> */}
              <Form
  schema={schema2}
  uiSchema={uiSchema2}
  formData={formData.waterConsumption}
  onChange={handleFormChange("waterConsumption")}
  validator={validator}
  widgets={widgets}
  formContext={{
    readonlyData: apiDataAvailable,     // ✅ pass via formContext
    topicSelected: isTopicSelected      // ✅ pass via formContext
  }}
  // formContext={{ locationdata }}
/>
            </div>
          </div>
        </>
      )}
      <div className="mb-6 pb-2">
        <button
          type="button"
          className=" text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>

      {loopen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <Oval
            height={50}
            width={50}
            color="#00BFFF"
            secondaryColor="#f3f3f3"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      )}
    </>
  );
};

export default Screen2Comp;
