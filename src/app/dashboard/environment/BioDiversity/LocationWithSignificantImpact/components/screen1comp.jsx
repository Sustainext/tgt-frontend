"use client";
import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { GlobalState } from "../../../../../../Context/page";
import TextareaWidget from "../../../../../shared/widgets//Textarea/TextareaWidget";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import TextareaWidgetnew from "../../../../../shared/widgets/Textarea/TextAreaWidget5";
import SelectWidget from '../../../../../shared/widgets/Select/selectWidget5'
import InputnewnumberWidget from '../../../../../shared/widgets/Input/newInputNumberWidget'
const widgets = {
  TextareaWidgetnew: TextareaWidgetnew,
  SelectWidget:SelectWidget,
  InputnewnumberWidget:InputnewnumberWidget
};

const view_path = "environment_biodiversity_location_with_significant_impacts_on_biodiversity_gri101-5a_gri101-5b";
const client_id = 1;
const user_id = 1;

// const schema = {
//   type: "array",
//   items: {
//     type: "object",
//     properties: {
//       Q1: {
//         type: "string",
//         title:
//           "Please mention the source of conversion factor used while compiling the information for 302-1 & 302-2 ?",
//         format: "textarea",
//       },

//       // Define other properties as needed
//     },
//   },
// };

// const uiSchema = {
//   items: {
//     Q1: {
//       "ui:title":
//         "Please mention the source of conversion factor used while compiling the information for 302-1 & 302-2 ?",

//       "ui:widget": "Textareawithoutgri",
//       "ui:options": {
//         label: false,
//       },
//     },

//     "ui:options": {
//       orderable: false,
//       addable: false,
//       removable: false,
//       layout: "horizontal",
//     },
//   },
// };


const schema = {
    type: "array",
    items: {
      type: "object",
      properties: {
        Q1: {
          type: "string",
          title: "What is the size of the site?",
        },
        Q2: {
          type: "string",
          title: "What is the unit of measurement for the area reported?",
          enum:[
            "Square meter (m²)",
            "Hectare (ha)",
            "Square kilometer (km²)",
            "Square foot (ft²)",
            "Square yard (yd²)",
            "Acre",
            "Square mile (mi²)"
          ]
        },
        Q3: {
          type: "string",
          title: "What is the site's proximity to an ecologically sensitive area?",
          enum:[
            "Site is in ecologically sensitive area",
            "Site is near ecologically sensitive area"
          ]
        },
         Q5: {
          type: "string",
          title: "What is the unit of measurement for the distance reported?",
          enum:[
            "Meters (m)",
            "Kilometers (km)",
            "Inches (in)",
            "Feet (ft)",
            "Yards (yd)",
            "Miles (mi)"
          ]
        },
         Q6: {
          type: "string",
          title: "Select the type of ecologically sensitive area the site is located in or close to.",
          enum:[
            "Areas of biodiversity importance",
            "Areas of high ecosystem integrity",
            "Areas of rapid decline in ecosystem integrity",
            "Areas of high physical water risks",
            "Areas important for the delivery of ecosystem service benefits to Indigenous Peoples, local communities, and other stakeholders",
          ]
        },
         Q7: {
          type: "string",
          title: "Describe the activities taking place at this site.",
        },
      },
      dependencies: {
        Q3: {
          oneOf: [
            {
              properties: {
                Q3: {
                  enum: ["Site is near ecologically sensitive area"],
                },
                Q4: {
                  type: "string",
                  title: "What is the distance of the site from the ecologically sensitive area?",
                },
              },
            },
          ],
        },
      },
    },
  };

const uiSchema = {
  items: {
    "ui:order": ["Q1","Q2","Q3","Q4","Q5","Q6","Q7"],
    Q1: {
        "ui:title":
          "What is the size of the site?",
        "ui:tooltipstitle":
          "Specify size of the area with the most significant impacts on biodiversity.",
        "ui:titlediplay": "block",
        "ui:titletooltipdisplay": "block",
        "ui:widget": "InputnewnumberWidget",
        "ui:options": {
          label: false,
        },
      },
    Q2: {
        "ui:title":
          "What is the unit of measurement for the area reported?",
        "ui:tooltipstitle":
          "",
        "ui:titlediplay": "block",
        "ui:titletooltipdisplay": "none",
        "ui:widget": "SelectWidget",
        "ui:options": {
          label: false,
        },
      },
      Q3: {
        "ui:title":
          "What is the site's proximity to an ecologically sensitive area?",
        "ui:tooltipstitle":
          "<p>Indicate whether the specified site is in or near an ecologically sensitive area.<br/> An ecologically sensitive area is a location that holds high environmental value due to its importance for biodiversity, ecosystem health, water resources, or the wellbeing of local and Indigenous communities.</p>",
        "ui:titletooltipdisplay": "block",
        "ui:widget": "SelectWidget",
        "ui:horizontal": true,
        "ui:options": {
          label: false,
        },
      },
      Q4: {
        "ui:title":
          "What is the distance of the site from the ecologically sensitive area?",
        "ui:tooltipstitle":
          "",
        "ui:titletooltipdisplay": "none",
        "ui:widget": "InputnewnumberWidget",
        "ui:horizontal": true,
        "ui:options": {
          label: false,
        },
      },
      Q5: {
        "ui:title":
          "What is the unit of measurement for the distance reported?",
        "ui:tooltipstitle":
          "",
        "ui:titletooltipdisplay": "none",
        "ui:widget": "SelectWidget",
        "ui:horizontal": true,
        "ui:options": {
          label: false,
        },
      },
      Q6: {
        "ui:title":
          "Select the type of ecologically sensitive area the site is located in or close to.",
        "ui:tooltipstitle":
          "<p>Indicate the type of ecologically sensitive area using given dropdown.<br/> Biodiversity importance – Areas that are rich in species or habitats.<br/> High ecosystem integrity – Areas where natural ecosystems are still healthy and undisturbed.<br/> Rapid decline in ecosystem integrity – Areas where ecosystems are quickly degrading.<br/> High physical water risks – Areas facing droughts, floods, or water shortages.<br/> Ecosystem services for communities – Areas vital for providing water, food, cultural, or other benefits to Indigenous Peoples, local communities, or others.</p>",
          "ui:titlediplay": "block",
          "ui:titletooltipdisplay": "block",
          "ui:widget": "SelectWidget",
          "ui:options": {
            label: false,
          },
      },
      Q7: {
        "ui:title":
          "Describe the activities taking place at this site.",
        "ui:tooltipstitle":
          "<p>Specify all activities take place by the organisation in the mentioned site with the most significant impacts on biodiversity.</p>",
        "ui:titlediplay": "block",
        "ui:titletooltipdisplay": "block",
        "ui:widget": "TextareaWidgetnew",
        "ui:options": {
          label: false,
        },
      },
      
     
   "ui:options": {
      orderable: false, // Prevent reordering of items
      addable: false, // Prevent adding items from UI
      removable: false, // Prevent removing items from UI
      layout: "horizontal", // Set layout to horizontal
    },  
  },
};
const Screen1Comp = ({ handleQ6Change, location, year }) => {
  const { open } = GlobalState();
  const [formData, setFormData] = useState([{}]);
  const [r_schema, setRemoteSchema] = useState({});
  const [r_ui_schema, setRemoteUiSchema] = useState({});
  const [loopen, setLoOpen] = useState(false);
  const toastShown = useRef(false);
  const getAuthToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token")?.replace(/"/g, "");
    }
    return "";
  };
  const token = getAuthToken();

  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };
  const handleChange = (e) => {
    setFormData(e.formData);
  };

  // The below code
  let axiosConfig = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const updateFormData = async () => {
    LoaderOpen();
    const data = {
      client_id: client_id,
      user_id: user_id,
      path: view_path,
      form_data: formData,
      location,
      year
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

  const loadFormData = async () => {
    LoaderOpen();
    setFormData([{}]);
    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&location=${location}&year=${year}`;
    try {
      const response = await axios.get(url, axiosConfig);
      console.log("API called successfully:", response.data);
      setRemoteSchema(response.data.form[0].schema);
      setRemoteUiSchema(response.data.form[0].ui_schema);
      const form_parent = response.data.form_data;
      setFormData(form_parent[0].data);
    } catch (error) {
      console.error("API call failed:", error);
    } finally {
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
    if (location && year) {
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
  }, [location, year]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log("Form data:", formData);
    updateFormData();
  };

  return (
    <>
      <div>
        <div className="">
          <Form
            schema={r_schema}
            uiSchema={r_ui_schema}
            formData={formData}
            onChange={handleChange}
            validator={validator}
            widgets={widgets}
          />
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
      </div>

      <div className="mb-4 pb-2 mt-2">
        <button
          type="button"
          className=" text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      {/* Add a submit button */}
    </>
  );
};

export default Screen1Comp;
