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
import TextareasectionWidgets from "../../../../shared/widgets/Textarea/TextareasectionWidgets";
import LocationSelectWidget from "../../../../shared/widgets/Select/locationSelectWidget";
const widgets = {
  inputWidget: inputWidget,
  dateWidget: dateWidget,
  selectWidget: selectWidget,
  FileUploadWidget: CustomFileUploadWidget,
  AssignTobutton: AssignToWidget,
  CustomSelectInputWidget: CustomSelectInputWidget,
  RemoveWidget: RemoveWidget,
  selectWidget3: selectWidget3,
  TextareasectionWidgets: TextareasectionWidgets,
  LocationSelectWidget: LocationSelectWidget,
};

const view_path = "gri_environment_waste_significant_spills_306_3b_3c_q1";
const client_id = 1;
const user_id = 1;

const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      Location: {
        type: "string",
        title: "Location of the spill",
        // enum: ['Surface Water', 'Ground water', 'Sea water', 'Municipal water', 'Third party water', 'Other (please specify)'],
        tooltiptext: "Specify the location of the spill",
      },
      Material: {
        type: "string",
        title: "Material of the spill ",
        enum: [
          "Oil spills (soil or water surfaces)",
          "Fuel spills (soil or water surfaces)",
          "Spills of wastes (soil or water surfaces)",
          "Spills of chemicals (mostly soil or water surfaces)",
          "Other (please specify)",
        ],
        tooltiptext:
          "<p>Mention the material of spill categorised by, oil spills (soil or water surfaces), fuel spills (soil or water surfaces), spills of wastes (soil or water surfaces), spills of chemicals (mostly soil or water surfaces), and other (to be specified by the organization). </p> ",
      },
      VolumeofSpill: {
        type: "string",
        title: "Volume of the spill ",
        tooltiptext: "Please specify the volume of the spill",
      },
      Unit: {
        type: "string",
        title: "Unit",
        enum: [
          "Litre",
          "Megalitre",
          "Cubic meter",
          "Kilolitre",
          "Million litres  per day",
          "Tonne",
          "Standard cubic foot",
          "Gallon (US)",
          "Barrel (bb)",
          "Thousands of barrel",
        ],
        tooltiptext: "Select the correct unit from the given dropdown",
        display: "block",
      },
      SpillSignificant: {
        type: "string",
        title: "Is this spill significant?",
        enum: ["Yes", "No"],
        tooltiptext:
          "<p>Please indicate if the mentioned spill is significant or not.</p> ",
      },
      Impact: {
        type: "string",
        title: "Specify impacts",
        tooltiptext:
          "If the mentioned spill is significant then please specify the impacts of significant spill.",
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
      "Location",
      "Material",
      "VolumeofSpill",
      "Unit",
      "SpillSignificant",
      "Impact",
      "AssignTo",
      "FileUpload",
      "Remove",
    ],
    Location: {
      "ui:widget": "LocationSelectWidget",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    Material: {
      "ui:widget": "selectWidget",
      "ui:options": {
        label: false,
      },
    },
    VolumeofSpill: {
      "ui:widget": "inputWidget",
      "ui:inputtype": "number",
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
    SpillSignificant: {
      "ui:widget": "selectWidget",
      "ui:options": {
        label: false,
      },
    },

    Impact: {
      "ui:widget": "TextareasectionWidgets",
      "ui:inputtype": "text",
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
    if (!row.Location) {
      rowErrors.Location = "Location is required";
    }
    if (!row.Material) {
      rowErrors.Material = "Material of Spill is required";
    }

    if (!row.Unit) {
      rowErrors.Unit = "Unit is required";
    }
    if (!row.VolumeofSpill) {
      rowErrors.VolumeofSpill = "Volume of Spill is required";
    }
    if (!row.SpillSignificant) {
      rowErrors.SpillSignificant = "Significant of Spill is required";
    }
    if (!row.Impact) {
      rowErrors.Impact = "Impact is required";
    }

    return rowErrors;
  });
};

const SignificantSpillsTable = ({ selectedCorp, year, selectedOrg }) => {
  const { open } = GlobalState();
  const [formData, setFormData] = useState([{}]);
  const [r_schema, setRemoteSchema] = useState({});
  const [r_ui_schema, setRemoteUiSchema] = useState({});
  const [loopen, setLoOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [locationData, setLocationdata] = useState([]);

  const toastShown = useRef(false);
  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };

  const fetchloctiondata = async () => {
    setLocationdata();
    LoaderOpen();
    const url = `${process.env.BACKEND_API_URL}/sustainapp/get_location_as_per_org_or_corp/?corporate=${selectedCorp}&organization=${selectedOrg}`;
    try {
      const response = await axiosInstance.get(url);
      setLocationdata(response.data);
    } catch (error) {
      LoaderClose();
      setLocationdata();
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
    } catch (error) {
      console.error("API call failed:", error);
    } finally {
      LoaderClose();
    }
  };
  useEffect(() => {
    if (selectedOrg && year) {
      loadFormData();
      fetchloctiondata();
      toastShown.current = false; // Reset the flag when valid data is present
    } else {
      // Only show the toast if it has not been shown already
      if (!toastShown.current) {
        toastShown.current = true; // Set the flag to true after showing the toast
      }
    }
  }, [selectedOrg, year, selectedCorp]);

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
        {Array.isArray(locationData) && locationData.length > 0 ? (
          <div className="mx-2">
            <div>
              <Form
                className="flex"
                schema={schema}
                uiSchema={uiSchema}
                formData={formData}
                onChange={handleChange}
                validator={validator}
                formContext={{ validationErrors }}
                widgets={{
                  ...widgets,

                  LocationSelectWidget: (props) => (
                    <LocationSelectWidget
                      {...props}
                      locationData={locationData}
                    />
                  ),

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
                      scopes="wec3"
                      setFormData={updateFormDatanew}
                    />
                  ),
                }}
              ></Form>
            </div>
          </div>
        ) : (
          <div className="mx-2"></div>
        )}

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

export default SignificantSpillsTable;
