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
import CustomUnitWidget from '../../../../shared/widgets/Select/CustomUnitWidget'
const widgets = {
  inputWidget: inputWidget,
  dateWidget: dateWidget,
  selectWidget: selectWidget,
  FileUploadWidget: CustomFileUploadWidget,
  AssignTobutton: AssignToWidget,
  CustomSelectInputWidget: CustomSelectInputWidget,
  RemoveWidget: RemoveWidget,
  selectWidget3: selectWidget3,
  CustomUnitWidget:CustomUnitWidget
};

const view_path = "gri-environment-air-quality-nitrogen-oxide";
const client_id = 1;
const user_id = 1;

// const schema = {
//   type: "array",
//   items: {
//     type: "object",
//     properties: {
//         EmissionSource: {
//         type: "string",
//         title: "Emission Source",
//         tooltiptext: "Emission sources in this context are where these air emissions, such as NOx, SOx, PM, etc. are released. Examples: Combustion processes in power plants and industrial boilers. Emissions from vehicle tailpipes, including cars, trucks, and buses. Energy production from fossil fuel-based power generation. Agricultural activities, such as methane emissions from livestock.",
//         display: "block",
//       },
//       AirPollutant: {
//         type: "string",
//         title: "Air Pollutant",
//         enum:["NOx","SOx","Persistent organic pollutants (POP)","Volatile organic compounds (VOC)","Hazardous air pollutants (HAP)","Particulate matter (PM 10)","Particulate matter (PM 2.5)","Carbon Monoxide(CO)","Other (please specify)"],
//         tooltiptext:
//           "Select the air pollutant from the given dropdown.",
//         display: "block",
//       },
//       Totalemissions: {
//         type: "string",
//         title: "Total emissions",
//         tooltiptext:
//           "Specify the total emissions of the selected air pollutant.",
//         display: "block",
//       },
//       Unit: {
//         type: "string",
//         title: "Unit",
//         enum: ["ppm", "µµg/m³", "ton (US Short ton)", "Gram (g)", "Kilograms (kg)","tonnes (t)","Pound (lb)","Other (please specify)"],
//         // tooltiptext: "Use 1000 kilograms as the measure for a metric ton.",
//         display: "none",
//       },
//       SourceofEmissionFactorused: {
//         type: "string",
//         title: "Source of Emission Factor used",
//         tooltiptext: "Specify the source of emission factors used for air emissions calculation.",
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
//       "AirPollutant",
//       "Totalemissions",
//       "Unit",
//       "SourceofEmissionFactorused",
//       "AssignTo",
//       "FileUpload",
//       "Remove",
//     ],
//     EmissionSource: {
//       "ui:widget": "inputWidget",
//       "ui:horizontal": true,
//       "ui:options": {
//         label: false,
//       },
//     },
//     AirPollutant: {
//       "ui:widget": "selectWidget",
//       "ui:options": {
//         label: false,
//       },
//     },
//     Totalemissions: {
//      "ui:widget": "inputWidget",
//       "ui:inputtype": "number",
//       "ui:horizontal": true,
//       "ui:options": {
//         label: false,
//       },
//     },
//     Unit: {
//       "ui:widget": "CustomUnitWidget",
//       "ui:inputtype": "number",
//       "ui:horizontal": true,
//       "ui:options": {
//         label: false,
//       },
//     },
//     SourceofEmissionFactorused: {
//         "ui:widget": "inputWidget",
//         "ui:horizontal": true,
//         "ui:options": {
//           label: false,
//         },
//       },

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
//       orderable: false,
//       addable: false,
//       removable: false,
//       layout: "horizontal",
//     },
//   },
// };
const NitrogenOxideTable = ({ location, year, month }) => {
  const { open } = GlobalState();
  const [formData, setFormData] = useState([{}]);
  const [r_schema, setRemoteSchema] = useState({});
  const [r_ui_schema, setRemoteUiSchema] = useState({});
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
      setRemoteUiSchema(response.data.form[0].ui_schema);
      const form_parent = response.data.form_data;
      setFormData(form_parent[0].data);
    } catch (error) {
      console.error("API call failed:", error);
    } finally {
      LoaderClose();
    }
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
  }, [location, year, month]); // Dependencies // React only triggers this effect if these dependencies change
  const handleChange = (e) => {
    const newData = e.formData.map((item, index) => ({
      ...item, // Ensure each item retains its structure
    }));
    setFormData(newData); // Update the formData with new values
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   updateFormData();
  // };

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
  const validateRows = (data) => {
    return data.map((row) => {
      const rowErrors = {};
      if (!row.EmissionSource) {
        rowErrors.EmissionSource = "Emission Source is required";
      }
      if (!row.AirPollutant) {
        rowErrors.AirPollutant = "Air Pollutant is required";
      }
  
      if (!row.Unit) {
        rowErrors.Unit = "Unit is required";
      }
      if (!row.Totalemissions) {
        rowErrors.Totalemissions = "Total Emissions is required";
      }
      if(!row.SourceofEmissionFactorused){
        rowErrors.SourceofEmissionFactorused = "Source of Emission Factor used is required";
      }
  
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
    const errors = validateRows(formData);
    setValidationErrors(errors);

    const hasErrors = errors.some(
      (rowErrors) => Object.keys(rowErrors).length > 0
    );
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

export default NitrogenOxideTable;
