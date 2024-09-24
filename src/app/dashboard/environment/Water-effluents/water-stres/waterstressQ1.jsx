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
const widgets = {
  inputWidget: inputWidget,
  dateWidget: dateWidget,
  selectWidget: selectWidget,
  FileUploadWidget: CustomFileUploadWidget,
  AssignTobutton: AssignToWidget,
  CustomSelectInputWidget: CustomSelectInputWidget,
  RemoveWidget: RemoveWidget,
  selectWidget3: selectWidget3,
};

const view_path =
  "gri-environment-water-303-3b-4c-water_withdrawal/discharge_areas_water_stress";
const client_id = 1;
const user_id = 1;

const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      Source: {
        type: "string",
        title: "Source",
        enum: [
          "Surface Water",
          "Ground water",
          "Sea water",
          "Municipal water",
          "Third party water",
          "Other",
        ],
        tooltiptext:
          "Indicate where the company withdraws water from or Where the company discharges water into.Include (where applicable)the breakdown of water withdrawal and discharge data by: Surface Water; Ground water; Seawater; Produced water Third-party water",
      },

      Watertype: {
        type: "string",
        title: "Water type",
        enum: [
          "reshwater (Below or equal to 1000 mg/L Total Dissolved Solids)",
          "other water (>1000 mg/L Total Dissolved Solids)",
        ],
        tooltiptext:
          "According to disclosure 303-3(c) of GRI company shall provide a breakdown of total water withdrawal from each of the sources by following categories of water: 1) Freshwater: water with concentration of total dissolved solids equal to or below 1,000 mg/L. 2) Other water: Other water constitutes any water that has a concentration of total dissolved solids higher than 1,000 mg/L.",
      },
      Unit: {
        type: "string",
        title: "Unit",
        enum: [
          "Litre",
          "Megalitre",
          "Cubic meter",
          "Kilolitre",
          "Million litres per day",
        ],
        tooltiptext:
          "Select the correct unit corresponding to the quantity of water withdrawal/discharge.",
      },
      Businessoperations: {
        type: "string",
        title: "Business operations",
        enum: [
          "Upstream operations",
          "onsite water usage",
          "downstream operations",
        ],
        tooltiptext:
          "Upstream operations: Upstream operations include identifying, extracting, or producing materials. For example, raw material extraction & transportation. Downstream operations: It refer to the final processes in the production and sale of goods, where finished products are created and sold to consumers. For example, logistic and packaging, distribution of product etc. Onsite water usage: For example, in service based companies water is used onsite for cleaning and maintenance, general sanitation etc. ",
      },
      waterstress: {
        type: "string",
        title: "Name of water stress area",
        tooltiptext:
          "Which area or location does the organization withdraw water from or discharge it into?",
      },
      Pincode: {
        type: "string",
        title: "Pin code",
        tooltiptext:
          "Mention the pin code of the area or location (of Water stress area) where the organization withdraws water from or discharges it into.",
      },
      Waterwithdrawal: {
        type: "string",
        title: "Water withdrawal",
        tooltiptext:
          "Indicate the total amount of water withdrawn by the organization from the water stress area",
      },
      Waterdischarge: {
        type: "string",
        title: "Water discharge",
        tooltiptext:
          "Indicate the total amount of water discharged by the company into the water stress area?",
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
      "Source",
      "Watertype",
      "Unit",
      "Businessoperations",
      "waterstress",
      "Pincode",
      "Waterwithdrawal",
      "Waterdischarge",
      "AssignTo",
      "FileUpload",
      "Remove",
    ],
    Source: {
      "ui:widget": "selectWidget",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    Watertype: {
      "ui:widget": "selectWidget",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    Unit: {
      "ui:widget": "selectWidget3",
      "ui:options": {
        label: false,
      },
    },
    Businessoperations: {
      "ui:widget": "selectWidget",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    waterstress: {
      "ui:widget": "inputWidget",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    Pincode: {
      "ui:widget": "inputWidget",
      "ui:inputtype": "number",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    Waterwithdrawal: {
      "ui:widget": "inputWidget",
      "ui:inputtype": "number",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    Waterdischarge: {
      "ui:widget": "inputWidget",
      "ui:inputtype": "number",
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

const WaterstressQ1 = ({ location, year, month }) => {
  const { open } = GlobalState();
  const [formData, setFormData] = useState([{}]);
  const [r_schema, setRemoteSchema] = useState({});
  const [r_ui_schema, setRemoteUiSchema] = useState({});
  const [selectedOption, setSelectedOption] = useState("");
  const [loopen, setLoOpen] = useState(false);
  const toastShown = useRef(false);

  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };

  const updateFormData = async () => {
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
    setSelectedOption("");
    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&location=${location}&year=${year}&month=${month}`;
    try {
      const response = await axiosInstance.get(url);
      console.log("API called successfully:", response.data);
      setRemoteSchema(response.data.form[0].schema);
      setRemoteUiSchema(response.data.form[0].ui_schema);
      const form_parent = response.data.form_data;
      const f_data = form_parent[0].data[0].formData;
      const option_data = form_parent[0].data[0].selectedOption;
      setFormData(f_data);
      setSelectedOption(option_data);
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
  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData();
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

  // Handle changing the select dropdown
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <div className="w-full max-w-xs mb-2">
        <label className="text-sm leading-5 text-gray-700 flex">
          Do you withdraw/discharge water from water stress areas?
          <div className="ml-2">
            <MdInfoOutline
              data-tooltip-id={`tooltip-$e1`}
              data-tooltip-content="This section documents data corresponding to total water withdrawn and total water discharge from areas with water stress."
              className="mt-1.5 ml-2 text-[14px]"
            />
            <ReactTooltip
              id={`tooltip-$e1`}
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
          className="block w-[270px] py-2 text-sm leading-6  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300"
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
          <div className={`overflow-auto custom-scrollbar flex`}>
            <div>
              <Form
                className="flex"
                schema={r_schema}
                uiSchema={r_ui_schema}
                formData={formData}
                onChange={handleChange}
                validator={validator}
                widgets={{
                  ...widgets,
                  RemoveWidget: (props) => (
                    <RemoveWidget
                      {...props}
                      index={props.id.split("_")[1]} // Pass the index
                      onRemove={handleRemove}
                    />
                  ),
                  FileUploadWidget: (props) => (
                    <CustomFileUploadWidget
                      {...props}
                      scopes="in1"
                      setFormData={updateFormDatanew}
                    />
                  ),
                }}
              />
            </div>
          </div>

          <div className="flex justify-start mt-4 right-1">
            <button
              type="button"
              className="text-[#007EEF] text-[12px] flex cursor-pointer mt-5 mb-5"
              onClick={handleAddNew}
            >
              <MdAdd className="text-lg" /> Add Row
            </button>
          </div>
        </>
      )}
      <div className="mb-6">
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

export default WaterstressQ1;
