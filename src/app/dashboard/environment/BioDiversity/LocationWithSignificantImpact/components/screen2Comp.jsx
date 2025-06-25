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
import MultitypefiledWidget from "../../../../../shared/widgets/Environment/MultitypefiledWidget";
const widgets = {
  MultitypefiledWidget: MultitypefiledWidget,
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
        title: "Operational sites",
      },

      col2: {
        type: "string",
        title: "Size of Operational Site",
      },
      col3: {
        type: "string",
        title: "Unit",
        enum: [
          "Square meter (m²)",
          "Hectare (ha)",
          "Square kilometer (km²)",
          "Square foot (ft²)",
          "Square yard (yd²)",
          "Acre",
          "Square mile (mi²)",
        ],
      },
      col4: {
        type: "string",
        title: "Metric Unit",
        enum: [
          "Office",
          "Manufacturing",
          "Extractive",
          "Others (please specify)",
        ],
      },
      col5: {
        type: "string",
        title: "Position in Relation to Protected Area",
        enum: [
          "in the area",
          "in adjacent to the area",
          "Containing portions of the protected area",
        ],
      },

      col6: {
        type: "string",
        title: "Is the operational site subsurface or underground land?",
        enum: ["Subsurface", "Underground land"],
      },
      col7: {
        type: "string",
        title: "Does the operational site contain biodiversity value?",
        enum: ["Yes", "No"],
      },
      col8: {
        type: "string",
        title: "Ecosystem Type",
        enum: ["Terrestrial", "Freshwater", "Maritime Ecosystem"],
      },
      col9: {
        type: "string",
        title: "Target Goals",
        enum: [
          "IUCN",
          "Protected Area Management Categories",
          "Ramsar Convention",
          "National Legislation",
          "Others (please specify)",
        ],
      },
      AssignTo: {
        type: "string",
        title: "Assign To",
      },
      FileUpload: {
        type: "string",
        format: "data-url",
        title: "File Upload",
      },
    },
  },
};

const uiSchema = {
  "ui:widget": "MultitypefiledWidget",
  "ui:options": {
    titles: [
      {
        key: "col1",
        title: "Operational sites",
        tooltip:
          "<p>List each operational site owned, leased, managed in, or adjacent to, protected areas and areas of high biodiversity value outside protected areas.</p> <p>Areas of high biodiversity value include habitats that are a priority for conservation,which are often defined in National Biodiversity Strategies and Action Plansprepared under the United Nations (UN) Convention, ‘Convention on Biological Diversity’, 1992.</p> <p>GRI defines Area of high biodiversity value as:area not subject to legal protection, but recognized for important biodiversity features by a number of governmental and non-governmental organizations.</p>",
        layouttype: "locationsearch",
        tooltipdispaly: "block",
      },
      {
        key: "col2",
        title: "Size of Operational Site",
        tooltip:
          "Report the size of the operational site in square kilometers (km2) or another appropriate unit of measurement.",
        layouttype: "inputonlynumber",
        tooltipdispaly: "block",
      },
      {
        key: "col3",
        title: "Unit",
        tooltip:
          "Select whether the target is absolute (total change) or intensity based (change per unit of business activity)",
        layouttype: "select",
        tooltipdispaly: "block",
      },
      {
        key: "col4",
        title: "Type of Operation",
        tooltip:
          "Specify the type of operation being conducted at the site, such as office, manufacturing or production, or extractive operations.",
        layouttype: "select",
        tooltipdispaly: "block",
      },
      {
        key: "col5",
        title: "Position in Relation to Protected Area",
        tooltip:
          " <p>Admin:Position in relation to the protected area or the high biodiversity value area outside protected areas:</p> <p>Indicate whether the site is within the protected area, adjacent to it, or contains portions of the protected area.</p>",
        layouttype: "select",
        tooltipdispaly: "block",
      },
      {
        key: "col6",
        title: "Is the operational site subsurface or underground land?",
        tooltip:
          "Indicate whether the organisation's site is subsurface or underground land. (that could be owned, leased or managed).",
        layouttype: "select",
        tooltipdispaly: "block",
      },
      {
        key: "col7",
        title: "Does the operational site contain biodiversity value?",
        tooltip:
          "Indicate whether the company's operational site contains any high biodiveristy value area (e.g.terrestrial, freshwater, or maritime ecosystem).",
        layouttype: "select",
        tooltipdispaly: "block",
      },
      {
        key: "col8",
        title: "Ecosystem Type",
        tooltip:
          "Indicate the ecosystem type, such as terrestrial, freshwater, or maritime present at the operational site. ",
        layouttype: "multiselect",
        tooltipdispaly: "block",
        keytack: "col7",
        disable: "col8",
        disableIfNotValue: "Yes",
      },
      {
        key: "col9",
        title: "Protection Status",
        tooltip:
          "Describe any regulatory requirements or market constraints or other goals (may include efficiency or financial goals, financial loss tolerances, avoided GHG emissions through the entire product life cycle, or net revenue goals for products and services designed for a low-carbon economy) linked to the specified target.",
        layouttype: "select",
        tooltipdispaly: "none",
      },
    
          {
        key: "AssignTo",
        title: "",
        tooltip:
          "",
        layouttype: "AssignTo",
        tooltipdispaly: "none",
      },
            {
        key: "FileUpload",
         title: "",
        tooltip:
          "",
        layouttype: "FileUpload",
        tooltipdispaly: "none",
         scopes:"bio1"
      },
    ],
  },
};

const Screen2Comp = ({ location, year, month }) => {
  const [formData, setFormData] = useState([{}]);
//   const [formData, setFormData] = useState({
//     wildSpecies: [{}],
//     waterConsumption: [{}]
//   });
  const [r_schema, setRemoteSchema] = useState({});
  const [r_ui_schema, setRemoteUiSchema] = useState({});
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
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
 

  const loadFormData = async () => {
    LoaderOpen();
    setFormData([{}]);
    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&location=${location}&year=${year}&month=${month}`;
    try {
      const response = await axiosInstance.get(url);
      console.log("API called successfully:", response.data);
      setRemoteSchema(response.data.form[0].schema);
      setRemoteUiSchema(response.data.form[0].ui_schema);
const form_parent = response.data.form_data;
      const f_data = form_parent[0].data[0].formData;
      const option_data = form_parent[0].data[0].selectedOption;
    //   setFormData({
    //     wildSpecies: fetchedData.wildSpecies || [{}],
    //     waterConsumption: fetchedData.waterConsumption || [{}]
    //   });
      setFormData(f_data);
      setSelectedOption(option_data);
    } catch (error) {
      setFormData([{}]);
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
      form_data: [
        {
          formData: formData,
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
  useEffect(() => {
    //console.long(r_schema, '- is the remote schema from django), r_ui_schema, '- is the remote ui schema from django')
  }, [r_schema, r_ui_schema]);

  // console log the form data change
  useEffect(() => {
    console.log("Form data is changed -", formData);
  }, [formData]);

  // fetch backend and replace initialized forms
  useEffect(() => {
    if (location && year && month) {
      loadFormData();
      toastShown.current = false; // Reset the flag when valid data is present
    } else {
      // Only show the toast if it has not been shown already
      if (!toastShown.current) {
        toastShown.current = true; // Set the flag to true after showing the toast
      }
    }
    // console.log('From loaded , ready for trigger')
    // loadFormData()
  }, [location, year, month]);

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
              <Form
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
              />
            </div>
          </div>
          <div className="mb-4 mt-2">
          <label className="text-sm leading-5 mb-2 text-gray-700 flex w-[546px] px-2">
          Exploitation of natural resources (Water consumption)
        </label>
            <div>
              <Form
                schema={schema}
                uiSchema={uiSchema}
                // formData.waterConsumption
                formData={formData}
                // onChange={(e) =>
                //     setFormData((prev) => ({ ...prev, waterConsumption: e.formData }))
                //   }
                onChange={handleChange}
                validator={validator}
                widgets={widgets}
                formContext={{ locationdata }}
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
