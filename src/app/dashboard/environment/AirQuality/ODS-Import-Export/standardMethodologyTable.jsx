"use client";
import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { MdAdd } from "react-icons/md";
import { GlobalState } from "../../../../../Context/page";
import selectWidget from "../../../../shared/widgets/Select/selectWidget";
import inputWidget from "../../../../shared/widgets/Input/inputWidget";
import CustomFileUploadWidget from "../../../../shared/widgets/CustomFileUploadWidget";
import AssignToWidget from "../../../../shared/widgets/assignToWidget";
import RemoveWidget from "../../../../shared/widgets/RemoveWidget";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";

const widgets = {
  inputWidget,
  selectWidget,
  FileUploadWidget: CustomFileUploadWidget,
  AssignTobutton: AssignToWidget,
  RemoveWidget,
};

const view_path = "gri-environment-waste-306-3a-3b-waste_generated";
const client_id = 1;
const user_id = 1;

// const schema = {
//   type: "array",
//   items: {
//     type: "object",
//     properties: {
//       StandardsUsed: {
//         type: "string",
//         title: "Standards Used",
//         enum: [
//           "GRI 305-6 (2016)",
//           "Montreal Protocol",
//           "Intergovernmental Panel on Climate Change (IPCC)",
//           "Others (please specify)",
//         ],
//         tooltiptext: "Please select the standard used to calculate the ODS emissions.",
//       },
//       MethodologiesUsed: {
//         type: "string",
//         title: "Methodologies Used",
//         enum: [
//           "Calculation based on site-specific data",
//           "Calculations based on published criteria",
//           "Direct measurements of ODS",
//           "Estimation",
//           "Others (please specify)",
//         ],
//         tooltiptext: "Specify methodologies used to calculate ODS emissions.",
//       },
//       AssumptionsConsidered: {
//         type: "string",
//         title: "Assumptions Considered",
//         tooltiptext: "Include the description of assumptions  considered to compile data. ",
//       },
//       CalculationToolsUsed: {
//         type: "string",
//         title: "Calculation tools used",
//         tooltiptext: "Include the description of calculation tools used to calculate ODS emissions.",
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
//     required: ["StandardsUsed", "MethodologiesUsed", "AssumptionsConsidered", "CalculationToolsUsed"],
//   },
// };

// const uiSchema = {
//   items: {
//     classNames: "fieldset",
//     "ui:order": [
//       "StandardsUsed",
//       "MethodologiesUsed",
//       "AssumptionsConsidered",
//       "CalculationToolsUsed",
//       "AssignTo",
//       "FileUpload",
//       "Remove",
//     ],
//     StandardsUsed: {
//       "ui:widget": "selectWidget",
//       "ui:options": { label: false },
//     },
//     MethodologiesUsed: {
//       "ui:widget": "selectWidget",
//       "ui:options": { label: false },
//     },
//     AssumptionsConsidered: {
//       "ui:widget": "inputWidget",
//       "ui:options": { label: false },
//     },
//     CalculationToolsUsed: {
//       "ui:widget": "inputWidget",
//       "ui:options": { label: false },
//     },
//     AssignTo: {
//       "ui:widget": "AssignTobutton",
//       "ui:options": { label: false },
//     },
//     FileUpload: {
//       "ui:widget": "FileUploadWidget",
//       "ui:options": { label: false },
//     },
//     Remove: {
//       "ui:widget": "RemoveWidget",
//       "ui:options": { label: false },
//     },
//     "ui:options": {
//       orderable: false,
//       addable: false,
//       removable: false,
//       layout: "horizontal",
//     },
//   },
// };

const StandardMethodologyTable = ({ location, year, month }) => {
  const { open } = GlobalState();
  const [formData, setFormData] = useState([{}]);
  const [loopen, setLoOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const toastShown = useRef(false);

  const LoaderOpen = () => setLoOpen(true);
  const LoaderClose = () => setLoOpen(false);

  const validateRows = (data) => {
    return data.map((row) => {
      const errors = {};
      if (!row.StandardsUsed) errors.StandardsUsed = "Standards Used is required.";
      if (!row.MethodologiesUsed) errors.MethodologiesUsed = "Methodologies Used is required.";
      if (!row.AssumptionsConsidered) errors.AssumptionsConsidered = "Assumptions Considered is required.";
      if (!row.CalculationToolsUsed) errors.CalculationToolsUsed = "Calculation Tools Used is required.";
      return errors;
    });
  };

  const updateFormData = async () => {
    LoaderOpen();
    const data = {
      client_id,
      user_id,
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
        toast.success("Data added successfully");
        loadFormData();
      } else {
        toast.error("Oops, something went wrong");
      }
    } catch (error) {
      toast.error("Oops, something went wrong");
    } finally {
      LoaderClose();
    }
  };

  const loadFormData = async () => {
    LoaderOpen();
    setFormData([{}]);
    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&location=${location}&year=${year}&month=${month}`;
    try {
      const response = await axiosInstance.get(url);
      setFormData(response.data.form_data?.[0]?.data || [{}]);
    } catch (error) {
      console.error("API call failed:", error);
    } finally {
      LoaderClose();
    }
  };

  useEffect(() => {
    if (location && year && month) {
      loadFormData();
    }
  }, [location, year, month]);

  const handleChange = (e) => {
    setFormData(e.formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateRows(formData);
    setValidationErrors(errors);

    if (errors.some((rowErrors) => Object.keys(rowErrors).length > 0)) return;
    updateFormData();
  };

  return (
    <>
      <div className={`overflow-auto custom-scrollbar flex py-4`}>
        <Form
          className="flex"
          schema={schema}
          uiSchema={uiSchema}
          formData={formData}
          onChange={handleChange}
          validator={validator}
          widgets={widgets}
          formContext={{ validationErrors }}
        />
      </div>

      {loopen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <Oval height={50} width={50} color="#00BFFF" />
        </div>
      )}

      <div className="flex justify-start mt-4">
        <button className="text-[#007EEF] text-[12px] flex cursor-pointer mt-5 mb-5" onClick={() => setFormData([...formData, {}])}>
          <MdAdd className="text-lg" /> Add Row
        </button>
      </div>

      <div className="mb-4">
        <button className="text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 float-end" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
};

export default StandardMethodologyTable;
