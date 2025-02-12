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
import axiosInstance from "../../../../utils/axiosMiddleware";
import SelectdisableWidget from "../../../../shared/widgets/Select/selectdisableWidget";
import InputdiableWidget from "../../../../shared/widgets/Input/inputdisableWidget";
const widgets = {
  InputdiableWidget: InputdiableWidget,
  dateWidget: dateWidget,
  SelectdisableWidget: SelectdisableWidget,
  selectWidget: selectWidget,
  FileUploadWidget: CustomFileUploadWidget,
  AssignTobutton: AssignToWidget,
  CustomSelectInputWidget: CustomSelectInputWidget,
  RemoveWidget: RemoveWidget,
};

const view_path = "gri-environment-water-303-4d-substances_of_concern";
const client_id = 1;
const user_id = 1;

const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      Discharge: {
        type: "string",
        title: "Do you discharge any substances of concern",
        enum: ["Yes", "No"],
        tooltiptext:
          "Do you withdraw water from third parties? if yes then please provide a breakdown of the total third party-water withdrawn by the withdrawal sources. Third-party water: municipal water suppliers and municipal wastewater treatment plants, public or private utilities, and other organizations involved in the provision, transport, treatment, disposal, or use of water and effluent",
        display: "none",
      },
      Substanceconcern: {
        type: "string",
        title: "Substance of concern",
        tooltiptext:
          "Mention the substances of concern for which discharges are treated.In the context of GRI Standard, substances of concern are those that cause irreversible damage to the waterbody,ecosystem, or human health. For example: chemicals, pollutants, heavy metals, contaminants or any toxic substances.",
        display: "block",
      },
      Priority: {
        type: "string",
        title: "Method used to define priority",
        enum: [
          "international standard",
          "authoritative list",
          "Other (please specify)",
        ],
        tooltiptext:
          "Indicate how does the company define the priority substances of concern",
        display: "block",
      },
      Noncompliance: {
        type: "string",
        title: "No. of non-compliance incidents",
        tooltiptext:
          "Indicate the number of times the organization has engaged in unauthorized discharges (non-compliance incidents) exceeding compliance limits? (if any)",
        display: "block",
      },
      Approach: {
        type: "string",
        title:
          "Approach for setting discharge limits for priority substances of concern",
        tooltiptext:
          "Provide a description of the approach used for setting discharge limits for priority substances of concern.",
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
      // Define other properties as needed
    },
  },
};

const uiSchema = {
  items: {
    classNames: "fieldset",
    "ui:order": [
      "Discharge",
      "Substanceconcern",
      "Priority",
      "Noncompliance",
      "Approach",
      "AssignTo",
      "FileUpload",
      "Remove",
    ],
    Discharge: {
      "ui:widget": "selectWidget",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    Substanceconcern: {
      "ui:widget": "InputdiableWidget",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    Priority: {
      "ui:widget": "SelectdisableWidget",
      "ui:options": {
        label: false,
      },
    },
    Noncompliance: {
      "ui:widget": "InputdiableWidget",
      "ui:inputtype": "number",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    Approach: {
      "ui:widget": "InputdiableWidget",
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
    if (!row.Discharge) {
      rowErrors.Discharge = "substances of concern is required";
    }
    if (row.Discharge === "Yes") {
      if (!row.Substanceconcern) {
        rowErrors.Substanceconcern = "Substance of concern  is required";
      }

      if (!row.Priority) {
        rowErrors.Priority = "Method used to define priority is required";
      }
      if (!row.Noncompliance) {
        rowErrors.Noncompliance = "No. of non-compliance incidents is required";
      }
      if (!row.Approach) {
        rowErrors.Approach = "Approach for setting discharge is required";
      }
    }
    return rowErrors;
  });
};
const SubstancesconcernQ1 = ({
  selectedOrg,
  year,
  selectedCorp,
  togglestatus,
}) => {
  const { open } = GlobalState();
  const [formData, setFormData] = useState([{}]);
  const [r_schema, setRemoteSchema] = useState({});
  const [r_ui_schema, setRemoteUiSchema] = useState({});
  const [validationErrors, setValidationErrors] = useState([]);
  const [enabledRows, setEnabledRows] = useState([]);
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
      corporate: selectedCorp,
      organisation: selectedOrg,
      year,
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
    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&corporate=${selectedCorp}&organisation=${selectedOrg}&year=${year}`;
    try {
      const response = await axiosInstance.get(url);
      console.log("API called successfully:", response.data);
      setRemoteSchema(response.data.form[0].schema);
      setRemoteUiSchema(response.data.form[0].ui_schema);
      const form_parent = response.data.form_data;
      setFormData(form_parent[0].data);
      const initialEnabledRows = form_parent[0].data.map(
        (item) => item.Discharge === "Yes"
      );
      setEnabledRows(initialEnabledRows);
    } catch (error) {
      console.error("API call failed:", error);
    } finally {
      LoaderClose();
    }
  };
  useEffect(() => {
    if (selectedOrg && year && togglestatus) {
      if (togglestatus === "Corporate" && selectedCorp) {
        loadFormData();
      } else if (togglestatus === "Corporate" && !selectedCorp) {
        setFormData([{}]);
        setRemoteSchema({});
        setRemoteUiSchema({});
      } else {
        loadFormData();
      }

      toastShown.current = false;
    } else {
      if (!toastShown.current) {
        toastShown.current = true;
      }
    }
  }, [selectedOrg, year, selectedCorp, togglestatus]);

  const handleChange = (e) => {
    const newData = e.formData.map((item, index) => {
      const updatedItem = { ...item };

      if (updatedItem.Discharge === "Yes") {
        setEnabledRows((prev) => {
          const newEnabledRows = [...prev];
          newEnabledRows[index] = true;
          return newEnabledRows;
        });
      } else if (updatedItem.Discharge === "No") {
        setEnabledRows((prev) => {
          const newEnabledRows = [...prev];
          newEnabledRows[index] = false;
          return newEnabledRows;
        });
      }
      return updatedItem;
    });
    setFormData(newData);
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

  const handleAddNew = () => {
    const newData = [...formData, {}];
    setFormData(newData);
    setEnabledRows((prev) => [...prev, false]);
  };

  const updateFormDatanew = (updatedData) => {
    setFormData(updatedData);
  };

  const handleRemove = (index) => {
    const updatedData = [...formData];
    updatedData.splice(index, 1);
    setFormData(updatedData);
    setEnabledRows((prev) => prev.filter((_, i) => i !== index));
  };
  useEffect(() => {
    console.log("Enabled rows updated test", enabledRows);
  }, [enabledRows]);
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
            formContext={{ enabledRows, validationErrors }}
            widgets={{
              ...widgets,
              InputdiableWidget: (props) => {
                const match = props.id.match(/^root_(\d+)/);
                const index = match ? parseInt(match[1], 10) : null;
                const isEnabled = index !== null ? enabledRows[index] : false; // Get the enable state for the row
                return (
                  <InputdiableWidget
                    {...props}
                    isEnabled={isEnabled} // Pass it as a prop if needed
                  />
                );
              },
              SelectdisableWidget: (props) => {
                const match = props.id.match(/^root_(\d+)/);
                const index = match ? parseInt(match[1], 10) : null;
                const isEnabled = index !== null ? enabledRows[index] : false; // Get the enable state for the row
                return (
                  <SelectdisableWidget
                    {...props}
                    isEnabled={isEnabled} // Pass it as a prop if needed
                  />
                );
              },
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
                  scopes="wec4"
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
      {(togglestatus === "Corporate" && selectedCorp) ||
      (togglestatus !== "Corporate" && selectedOrg && year) ? (
        <div className="flex justify-start mt-4 right-1">
          <button
            type="button"
            className="text-[#007EEF] text-[12px] flex cursor-pointer mt-5 mb-5"
            onClick={handleAddNew}
          >
            <MdAdd className="text-lg" /> Add Row
          </button>
        </div>
      ) : null}

      <div className="mb-4">
        <button
          type="button"
          className={`text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end ${
            (!selectedCorp && togglestatus === "Corporate") ||
            !selectedOrg ||
            !year
              ? "cursor-not-allowed opacity-90"
              : ""
          }`}
          onClick={handleSubmit}
          disabled={
            (togglestatus === "Corporate" && !selectedCorp) ||
            (togglestatus !== "Corporate" && (!selectedOrg || !year))
          }
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default SubstancesconcernQ1;
