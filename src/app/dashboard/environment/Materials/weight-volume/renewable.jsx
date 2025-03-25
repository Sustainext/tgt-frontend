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
import inputnumberWidget from "../../../../shared/widgets/Input/inputnumberWidget";
import axiosInstance from "../../../../utils/axiosMiddleware";
const widgets = {
  inputWidget: inputWidget,
  dateWidget: dateWidget,
  selectWidget: selectWidget,
  FileUploadWidget: CustomFileUploadWidget,
  AssignTobutton: AssignToWidget,
  CustomSelectInputWidget: CustomSelectInputWidget,
  RemoveWidget: RemoveWidget,
  selectWidget3: selectWidget3,
  inputnumberWidget: inputnumberWidget,
};

const view_path = "gri-environment-materials-301-1a-renewable_materials";
const client_id = 1;
const user_id = 1;

const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      Typeofmaterial: {
        type: "string",
        title: "Type of material",
        enum: [
          "Raw materials",
          "Associated process materials",
          "Semi-manufactured goods or parts",
          "Materials for packaging purposes",
        ],
        tooltiptext: "Select the waste category from the given dropdown.",
        display: "none",
      },
      Materialsused: {
        type: "string",
        title: "Materials used",
        enum: [
          "Cardboard",
          "Glass",
          "Hemp",
          "Kenaf",
          "Natural Rubber",
          "Paper",
          "Timber",
          "Wool",
          "Other (please specify)",
        ],
        tooltiptext:
          "What materials does the company use to produce its goods or services?",
        display: "block",
      },
      Source: {
        type: "string",
        title: "Source",
        enum: ["Externally sourced", "Internally sourced"],
        tooltiptext:
          "Where does the company get its materials from? Internally sourced materials: Materials that the company makes itself.Externally sourced materials: Materials that the company buys from other companies.",
        display: "block",
      },
      Totalweight: {
        type: "string",
        title: "Total weight/volume",
        tooltiptext:
          "How much material is used for the production of goods or services?(Please specify the total weight or volume.)",
        display: "block",
      },
      Unit: {
        type: "string",
        title: "Unit",
        enum: [
          "Cubic centimeter cm3",
          "Cubic decimeter dm3",
          "Cubic meter m3",
          "Gram",
          "Kilogram (Kg)",
          "Liter",
          "Milligram",
          "Milliliter",
          "Fluid Ounce fl Oz",
          "Gallon Gal",
          "Pint Pt",
          "Pound Lb",
          "Quart Qt",
          "Cubic foot ft3",
          "Metric ton",
          "US short ton (tn)",
        ],
        tooltiptext: "Use 1000 kilograms as the measure for a metric ton.",
        display: "none",
      },
      Datasource: {
        type: "string",
        title: "Data source",
        enum: ["Estimated", "Direct measurement"],
        tooltiptext:
          "What is the source of the data for the total weight or volume of materials used? Estimation: process of making an approximate calculation of something.Direct measurement: process of measuring something directly. For example, a company might directly measure the total weight or volume of materials used by weighing or measuring each batch of materials used.",
        display: "block",
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
      Remove: {
        type: "string",
        title: "Remove",
      },
    },
  },
};

const uiSchema = {
  items: {
    classNames: "fieldset",
    "ui:order": [
      "Typeofmaterial",
      "Materialsused",
      "Source",
      "Totalweight",
      "Unit",
      "Datasource",
      "AssignTo",
      "FileUpload",
      "Remove",
    ],
    Typeofmaterial: {
      "ui:widget": "selectWidget",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    Materialsused: {
      "ui:widget": "selectWidget",
      "ui:options": {
        label: false,
      },
    },
    Source: {
      "ui:widget": "selectWidget",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    Totalweight: {
      "ui:widget": "inputnumberWidget",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },

    Unit: {
      "ui:widget": "selectWidget3",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    Datasource: {
      "ui:widget": "selectWidget",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    AssignTo: {
      "ui:widget": "AssignTobutton",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    FileUpload: {
      "ui:widget": "FileUploadWidget",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    Remove: {
      "ui:widget": "RemoveWidget",
      "ui:options": {
        label: false,
      },
    },
    "ui:options": {
      orderable: false,
      addable: false,
      removable: false,
      layout: "horizontal",
    },
  },
};
const validateRows = (data) => {
  return data.map((row) => {
    const rowErrors = {};
    if (!row.Typeofmaterial) {
      rowErrors.Typeofmaterial = "Type of material is required";
    }
    if (!row.Materialsused) {
      rowErrors.Materialsused = "Materials used is required";
    }

    if (!row.Source) {
      rowErrors.Source = "Source is required";
    }
    if (!row.Totalweight) {
      rowErrors.Totalweight = "Total weight/volume is required";
    }
    if (!row.Unit) {
      rowErrors.Unit = "Unit is required";
    }
    if (!row.Datasource) {
      rowErrors.Datasource = "Data source is required";
    }
    return rowErrors;
  });
};
const Renewable = ({ location, year, month }) => {
  const { open } = GlobalState();
  const [formData, setFormData] = useState([{}]);
  const [r_schema, setRemoteSchema] = useState({});
  const [r_ui_schema, setRemoteUiSchema] = useState({});
  const [loopen, setLoOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit button clicked"); // Debugging log
    const errors = validateRows(formData);
    setValidationErrors(errors);
    console.log("Validation Errors:", errors); // Debugging log

    const hasErrors = errors.some(
      (rowErrors) => Object.keys(rowErrors).length > 0
    );
    if (!hasErrors) {
      console.log("No validation errors, proceeding to update data"); // Debugging log
      updateFormData();
    } else {
      console.log("Validation errors found, submission aborted"); // Debugging log
    }
  };

  const renderError = (rowIndex, fieldName) => {
    const rowErrors = validationErrors[rowIndex] || {};
    return rowErrors[fieldName] ? (
      <div className="text-red-500 text-sm mt-1">{rowErrors[fieldName]}</div>
    ) : null;
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

  return (
    <>
      <div className={`overflow-auto custom-scrollbar flex py-4`}>
        <div>
          <Form
            schema={schema}
            uiSchema={uiSchema}
            formData={formData}
            onChange={handleChange}
            validator={validator}
            formContext={{ validationErrors }}
            widgets={{

              ...widgets,

              RemoveWidget: (props) => {
                // Assuming the widget framework passes a unique ID that includes the index
                // Make sure this ID fetching logic is correct
                return (
                  <RemoveWidget
                    {...props}
                    index={props.id.split("_")[1]} // Pass the index
                    onRemove={handleRemove}
                  />
                );
              },
              FileUploadWidget: (props) => (
                <CustomFileUploadWidget
                  {...props}
                  scopes="ec1674"
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

export default Renewable;
