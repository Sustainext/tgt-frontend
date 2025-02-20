"use client";
import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { GlobalState } from "../../../../../Context/page";
import dateWidget from "../../../../shared/widgets/Input/dateWidget";
import selectWidget from "../../../../shared/widgets/Select/selectWidget";
import inputWidget from "../../../../shared/widgets/Input/inputWidget";
import CustomFileUploadWidget from "../../../../shared/widgets/CustomFileUploadWidget";
import AssignToWidget from "../../../../shared/widgets/assignToWidget";
import CustomSelectInputWidget from "../../../../shared/widgets/CustomSelectInputWidget";
import RemoveWidget from "../../../../shared/widgets/RemoveWidget";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import selectWidget3 from "../../../../shared/widgets/Select/selectWidget3";
import axiosInstance from "../../../../utils/axiosMiddleware";
import CustomUnitWidget from "../../../../shared/widgets/Select/CustomUnitWidget";
const widgets = {
  inputWidget: inputWidget,
  dateWidget: dateWidget,
  selectWidget: selectWidget,
  FileUploadWidget: CustomFileUploadWidget,
  AssignTobutton: AssignToWidget,
  CustomSelectInputWidget: CustomSelectInputWidget,
  RemoveWidget: RemoveWidget,
  selectWidget3: selectWidget3,
  CustomUnitWidget: CustomUnitWidget,
};

const view_path = "gri-environment-air-quality-emission-ods";
const client_id = 1;
const user_id = 1;

const view_path_prev =
  "gri-environment-air-quality-ods_production-import-export";

// const schema = {
//   type: "array",
//   items: {
//     type: "object",
//     properties: {
//         EmissionSource: {
//         type: "string",
//         title: "Emission Source",
//         tooltiptext: "Emission sources are where ozone-depleting substances (ODS) are released or emitted. Examples include refrigerators, freezers, dehumidifiers, water coolers, ice machines, air conditioning and heat pump units, aerosol products (propellants), insulation boards, panels, and pipe covers (foam-blowing agents), and pre-polymers (manufacturing processes).",
//         display: "block",
//       },
//       ODS: {
//         type: "string",
//         title: "ODS",
//         enum:["halon-1211","(CFC-12)","(CFC-114)","(CFC-214)","(CFC-215)","(HCFC-141b)**"],
//         tooltiptext:
//           "Please select the appropriate Ozone Depleting Substance used from the given dropdown. ",
//         display: "block",
//       },
//       Unit: {
//         type: "string",
//         title: "Unit",
//         enum: ["Tons","Kilogram(Kg)","Gram(g)","Pound (lb)","ton(US Short ton)"],
//         tooltiptext: "Select correct unit from the given dropdown.",
//         display: "none",
//       },
//       ODSProduced: {
//         type: "string",
//         title: "ODS Produced",
//         tooltiptext:
//           "Mention the quantity of Ozone Depleting Substance (ODS) produced.",
//         display: "block",
//       },
//       ODSDestroyedbyapprovedtechnologies: {
//         type: "string",
//         title: "ODS destroyed by approved technologies",
//         tooltiptext:
//           "Mention the quantity of Ozone Depleting Substance destroyed by approved technologies",
//         display: "block",
//       },
//       ODSUsedasfeedstock: {
//         type: "string",
//         title: "ODS used as feedstock",
//         tooltiptext:
//           "Mention the quantity of Ozone Depleting Substance entirely used as feedstock in the manufacture of other chemicals. ",
//         display: "block",
//       },
//       ODSImported: {
//         type: "string",
//         title: "ODS Imported ",
//         tooltiptext:
//           "Mention the quantity of Ozone Depleting Substance imported.",
//         display: "block",
//       },
//       ODSExported: {
//         type: "string",
//         title: "ODS Exported",
//         tooltiptext:
//           "Mention the quantity of Ozone Depleting Substance exported ",
//         display: "block",
//       },

//       AssignTo: {
//         type: "string",
//         title: "Assign To",
//       },
//       FileUpload: {
//         type: "string",
//         format: "data-url",
//         title: "File Upload",
//       },
//       Remove: {
//         type: "string",
//         title: "Remove",
//       },
//     },
//   },
// };

// const uiSchema = {
//   items: {
//     classNames: "fieldset",
//     "ui:order": [
//       "EmissionSource",
//       "ODS",
//       "Unit",
//       "ODSProduced",
//       "ODSDestroyedbyapprovedtechnologies",
//       "ODSUsedasfeedstock",
//       "ODSImported",
//       "ODSExported",
//       "AssignTo",
//       "FileUpload",
//       "Remove",
//     ],

//     EmissionSource: {
//       "ui:widget": "inputWidget",  // Text Entry
//       "ui:tooltip": "Emission sources are where ozone-depleting substances (ODS) are released or emitted. Examples include refrigerators, freezers, dehumidifiers, water coolers, ice machines, air conditioning and heat pump units, aerosol products (propellants), insulation boards, panels, and pipe covers (foam-blowing agents), and pre-polymers (manufacturing processes).",
//       "ui:tooltipdisplay": "block",
//       "ui:options": {
//         label: false,
//       },
//     },

//     ODS: {
//       "ui:widget": "selectWidget",  // Dropdown (Select Entry)
//       "ui:tooltip": "Please select the appropriate Ozone Depleting Substance used from the given dropdown.",
//       "ui:tooltipdisplay": "block",
//       "ui:options": {
//         label: false,
//       },
//     },

//     Unit: {
//       "ui:widget": "selectWidget",  // Dropdown (Select Entry)
//       "ui:tooltip": "Select correct unit from the given dropdown.",
//       "ui:tooltipdisplay": "block",
//       "ui:options": {
//         label: false,
//       },
//     },

//     ODSProduced: {
//       "ui:widget": "inputWidget",  // Numeric Entry
//       "ui:inputtype": "number",
//       "ui:tooltip": "Mention the quantity of Ozone Depleting Substance produced.",
//       "ui:tooltipdisplay": "block",
//       "ui:options": {
//         label: false,
//       },
//     },

//     ODSDestroyedbyapprovedtechnologies: {
//       "ui:widget": "inputWidget",  // Numeric Entry
//       "ui:inputtype": "number",
//       "ui:tooltip": "Mention the quantity of Ozone Depleting Substance destroyed by approved technologies.",
//       "ui:tooltipdisplay": "block",
//       "ui:options": {
//         label: false,
//       },
//     },

//     ODSUsedasfeedstock: {
//       "ui:widget": "inputWidget",  // Numeric Entry
//       "ui:inputtype": "number",
//       "ui:tooltip": "Mention the quantity of Ozone Depleting Substance entirely used as feedstock in the manufacture of other chemicals.",
//       "ui:tooltipdisplay": "block",
//       "ui:options": {
//         label: false,
//       },
//     },

//     ODSImported: {
//       "ui:widget": "inputWidget",  // Numeric Entry
//       "ui:inputtype": "number",
//       "ui:tooltip": "Mention the quantity of Ozone Depleting Substance imported.",
//       "ui:tooltipdisplay": "block",
//       "ui:options": {
//         label: false,
//       },
//     },

//     ODSExported: {
//       "ui:widget": "inputWidget",  // Numeric Entry
//       "ui:inputtype": "number",
//       "ui:tooltip": "Mention the quantity of Ozone Depleting Substance exported.",
//       "ui:tooltipdisplay": "block",
//       "ui:options": {
//         label: false,
//       },
//     },

//     AssignTo: {
//       "ui:widget": "AssignTobutton",
//       "ui:horizontal": true,
//       "ui:options": {
//         label: false,
//       },
//     },

//     FileUpload: {
//       "ui:widget": "FileUploadWidget",
//       "ui:horizontal": true,
//       "ui:options": {
//         label: false,
//       },
//     },

//     Remove: {
//       "ui:widget": "RemoveWidget",
//       "ui:options": {
//         label: false,
//       },
//     },

//     "ui:options": {
//       orderable: false, // Prevents reordering
//       addable: false, // Prevents adding more rows
//       removable: false, // Prevents removing fields
//       layout: "horizontal", // Maintains layout consistency
//     },
//   },
// };

const EmissionsODSTable = ({ location, year, month }) => {
  const { open } = GlobalState();
  const [formData, setFormData] = useState([{}]);
  const [formDataPrev, setFormDataPrev] = useState([
        {
          produceODS: "No",
          importODS: "No",
          exportODS: "No",
          useODSFeedstock: "No",
          destroyODS: "No",
        },
  ]);
  const [r_schema, setRemoteSchema] = useState({});
  const [r_ui_schema, setRemoteUiSchema] = useState({});
  const [activeFields, setActiveFields] = useState({});
  const [loopen, setLoOpen] = useState(false);
  const toastShown = useRef(false);
  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };

  const updateFormData = async () => {
    LoaderOpen();
    const data = {
      client_id: client_id,
      user_id: user_id,
      path: view_path,
      form_data: formData,
      location,
      year,
      month,
    };

    const url = `${process.env.BACKEND_API_URL}/datametric/update-fieldgroup`;
    try {
      const response = await axiosInstance.post(url, data);
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
    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&location=${location}&year=${year}&month=${month}`;
    try {
      const response = await axiosInstance.get(url);
      console.log("API called successfully:", response.data);
      setRemoteSchema(response.data.form[0].schema);
      const form_parent = response.data.form_data;
      if(form_parent[0]?.data)
      setFormData(form_parent[0]?.data);
      if(response.data.pre_form_data)
      setFormDataPrev(response.data.pre_form_data)
      setRemoteUiSchema(generateUiSchema(response.data.pre_form_data));

    } catch (error) {
      console.error("API call failed:", error);
    } finally {
      LoaderClose();
    }
  };

  // Disable fields based on previous screen data
  const getActiveFields = (formDataPrev) => {
    if (!formDataPrev || formDataPrev.length === 0) return {};
  
    const latestData = formDataPrev[0]; 
    console.log("Latest Data:", latestData);
  
    // Individual field activations
    const isODSProducedActive = latestData.produceODS === "Yes";
    const isODSImportedActive = latestData.importODS === "Yes";
    const isODSExportedActive = latestData.exportODS === "Yes";
    const isODSUsedAsFeedstockActive = latestData.useODSFeedstock === "Yes";
    const isODSDestroyedActive = latestData.destroyODS === "Yes";
  
    // "EmissionSource", "ODS", and "Unit" should only be enabled if ALL are "Yes"
    const areMainFieldsEnabled =
      isODSProducedActive ||
      isODSImportedActive ||
      isODSExportedActive ||
      isODSUsedAsFeedstockActive ||
      isODSDestroyedActive;

      setActiveFields({
        EmissionSource: areMainFieldsEnabled,
        ODS: areMainFieldsEnabled,
        Unit: areMainFieldsEnabled,
        ODSProduced: isODSProducedActive,
        ODSImported: isODSImportedActive,
        ODSExported: isODSExportedActive,
        ODSUsedasfeedstock: isODSUsedAsFeedstockActive,
        ODSDestroyedbyapprovedtechnologies: isODSDestroyedActive,
      })
  
    return {
      EmissionSource: areMainFieldsEnabled,
      ODS: areMainFieldsEnabled,
      Unit: areMainFieldsEnabled,
      ODSProduced: isODSProducedActive,
      ODSImported: isODSImportedActive,
      ODSExported: isODSExportedActive,
      ODSUsedasfeedstock: isODSUsedAsFeedstockActive,
      ODSDestroyedbyapprovedtechnologies: isODSDestroyedActive,
    };
  };
  

  const generateUiSchema = (formDataPrev) => {
    const activeFields = getActiveFields(formDataPrev);

    console.log('Generating UI Schema for formDataPrev:', formDataPrev);
    console.log("Active Fields:", activeFields);
    
    return {
      items: {
        classNames: "fieldset",
        "ui:order": [
          "EmissionSource",
          "ODS",
          "Unit",
          "ODSProduced",
          "ODSDestroyedbyapprovedtechnologies",
          "ODSUsedasfeedstock",
          "ODSImported",
          "ODSExported",
          "AssignTo",
          "FileUpload",
          "Remove",
        ],
        EmissionSource: {
          "ui:widget": "inputWidget",
          "ui:options": { label: false, disabled: !activeFields.EmissionSource },
        },
        ODS: {
          "ui:widget": "selectWidget",
          "ui:options": { label: false, disabled: !activeFields.ODS },
        },
        Unit: {
          "ui:widget": "selectWidget",
          "ui:options": { label: false, disabled: !activeFields.Unit },
        },
        ODSProduced: {
          "ui:widget": "inputWidget",
          "ui:inputtype": "number",
          "ui:options": {
            label: false,
            disabled: !activeFields.ODSProduced,
          },
        },
        ODSDestroyedbyapprovedtechnologies: {
          "ui:widget": "inputWidget",
          "ui:inputtype": "number",
          "ui:options": {
            label: false,
            disabled: !activeFields.ODSDestroyedbyapprovedtechnologies,
          },
        },
        ODSUsedasfeedstock: {
          "ui:widget": "inputWidget",
          "ui:inputtype": "number",
          "ui:options": {
            label: false,
            disabled: !activeFields.ODSUsedasfeedstock,
          },
        },
        ODSImported: {
          "ui:widget": "inputWidget",
          "ui:inputtype": "number",
          "ui:options": {
            label: false,
            disabled: !activeFields.ODSImported,
          },
        },
        ODSExported: {
          "ui:widget": "inputWidget",
          "ui:inputtype": "number",
          "ui:options": {
            label: false,
            disabled: !activeFields.ODSExported,
          },
        },
        AssignTo: {
          "ui:widget": "AssignTobutton",
          "ui:options": { label: false },
        },
        FileUpload: {
          "ui:widget": "FileUploadWidget",
          "ui:options": { label: false },
        },
        Remove: {
          "ui:widget": "RemoveWidget",
          "ui:options": { label: false },
        },
      },
    };
  };

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
  }, [location, year, month]);

  const handleChange = (e) => {
    const newData = e.formData.map((item, index) => ({
      ...item, // Ensure each item retains its structure
    }));
    setFormData(newData); // Update the formData with new values
  };

  const handleAddNew = () => {
    const newData = [...formData, {}];
    setFormData(newData);
  };

  const updateFormDatanew = (updatedData) => {
    setFormData(updatedData);
  };

  const handleRemove = (index) => {
    const updatedData = [...formData];
    updatedData.splice(index, 1);
    setFormData(updatedData);
  };

  // Add validation state
  const [validationErrors, setValidationErrors] = useState([]);

  // Add validation function
  const validateRows = (data, activeFields) => {
    return data.map((row) => {
      const rowErrors = {};
  
      // Define required fields and their respective error messages
      const requiredFields = {
        EmissionSource: "Emission Source is required",
        ODS: "ODS is required",
        Unit: "Unit is required",
        ODSProduced: "ODS Produced is required",
        ODSDestroyedbyapprovedtechnologies:
          "ODS Destroyed by approved technologies is required",
        ODSUsedasfeedstock: "ODS Used as feedstock is required",
        ODSImported: "ODS Imported is required",
        ODSExported: "ODS Exported is required",
      };
  
      // ✅ Check if the field is active before validating
      Object.keys(requiredFields).forEach((field) => {
        if (activeFields[field] && (!row[field] || row[field].trim() === "")) {
          rowErrors[field] = requiredFields[field];
        }
      });
  
      return rowErrors;
    });
  };
  

  // Add renderError helper function
  const renderError = (rowIndex, fieldName) => {
    const rowErrors = validationErrors[rowIndex] || {};
    return rowErrors[fieldName] ? (
      <div className="text-red-500 text-sm mt-1">{rowErrors[fieldName]}</div>
    ) : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateRows(formData, activeFields);
    setValidationErrors(errors);

    const hasErrors = errors.some(
      (rowErrors) => Object.keys(rowErrors).length > 0
    );
    console.log("has errors", hasErrors, errors);
    if (!hasErrors) {
      updateFormData();
    }
  };

  return (
    <>
      <div className={`overflow-auto custom-scrollbar flex py-4`}>
        <div>
          <Form
            className="flex"
            schema={r_schema}
            uiSchema={r_ui_schema}
            formData={formData}
            formDataPrev={formDataPrev}
            onChange={handleChange}
            validator={validator}
            formContext={{ validationErrors }}
            widgets={{
              ...widgets,

              RemoveWidget: (props) => {
                const match = props.id.match(/^root_(\d+)/);
                const index = match ? parseInt(match[1], 10) : null;

                return (
                  <RemoveWidget
                    {...props}
                    index={index}
                    onRemove={handleRemove}
                  />
                );
              },
              FileUploadWidget: (props) => (
                <CustomFileUploadWidget
                  {...props}
                  scopes="ec2"
                  setFormData={updateFormDatanew}
                />
              ),
            }}
          ></Form>
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
      <div></div>

      <div className="flex justify-start mt-4 right-1">
        <button
          type="button"
          className="text-[#007EEF] text-[12px] flex cursor-pointer mt-5 mb-5"
          onClick={handleAddNew}
        >
          <MdAdd className="text-lg" /> Add Row
        </button>
      </div>
      <div className="mb-4">
        <button
          type="button"
          className=" text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default EmissionsODSTable;
