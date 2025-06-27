"use client";
import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import TextareaWidget from "../../../../shared/widgets/Textarea/TextareaWidget";
import { GlobalState } from "../../../../../Context/page";
import { MdKeyboardArrowDown, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import selectWidget2 from "../../../../shared/widgets/Select/selectWidget2";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
const widgets = {
  TextareaWidgetnew: TextareaWidget,
  selectWidget: selectWidget2,
};

const view_path = "gri-environment-water-303-2a-profile_receiving_waterbody";
const client_id = 1;
const user_id = 1;
const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      Q1: {
        type: "string",
        enum: ["Yes", "No"],
        title: "option",
      },

      // Define other properties as needed
    },
  },
};

const uiSchema = {
  items: {
    Q1: {
      "ui:widget": "selectWidget",
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
const validateRows = (data) => {
  return data.map((row) => {
    const rowErrors = {};
    if (!row.Q1) {
      rowErrors.Q1 = "This field is required";
    }

    if (row.Q1 === "Yes" && (!row.details || row.details.trim() === "")) {
      rowErrors.details = "Details are required when 'Yes' is selected.";
    }
    return rowErrors;
  });
};
const Receivingwaterbody = ({
  selectedOrg,
  year,
  selectedCorp,
  togglestatus,
}) => {
  const { open } = GlobalState();
  const [formData, setFormData] = useState([{ Q1: "", details: "" }]); // Initial form data
  const [r_schema, setRemoteSchema] = useState({});
  const [r_ui_schema, setRemoteUiSchema] = useState({});
  const [validationErrors, setValidationErrors] = useState([]);
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
  // const handleChange = (e) => {
  //     const { formData } = e;
  //     // Remove any unwanted keys
  //     const cleanFormData = Object.keys(formData).reduce((acc, key) => {
  //         if (!isNaN(key)) { // Assuming numeric keys are unwanted
  //             return acc;
  //         }
  //         acc[key] = formData[key];
  //         return acc;
  //     }, {});

  //     setFormData(cleanFormData);
  // };
  const handleChange = (e) => {
    setFormData(e.formData);
  };
  // The below code on updateFormData
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
      corporate: selectedCorp,
      organisation: selectedOrg,
      year,
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
    setFormData([{ Q1: "", details: "" }]);
    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&corporate=${selectedCorp}&organisation=${selectedOrg}&year=${year}`;
    try {
      const response = await axios.get(url, axiosConfig);
      console.log("API called successfully:", response.data);
      setRemoteSchema(response.data.form[0].schema);
      setRemoteUiSchema(response.data.form[0].ui_schema);
      const form_parent = response.data.form_data;
      const f_data = form_parent[0].data;
      setFormData(f_data);

      // setFormData(form_parent[0].data);
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
  if (selectedOrg && year && togglestatus) {
    if (togglestatus === "Corporate") {
      if (selectedCorp) {
        loadFormData();           // <-- Only load if a corporate is picked
      } else {
        setFormData([{}]); 
        setRemoteSchema({});
        setRemoteUiSchema({});       // <-- Clear the form if no corporate is picked
      }
    } else {
      loadFormData();             // Organization tab: always try to load
    }
    toastShown.current = false;
  } else {
    if (!toastShown.current) {
      toastShown.current = true;
    }
  }
}, [selectedOrg, year, selectedCorp, togglestatus]);

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

  return (
    <>
      <div>
        <div className="flex mb-2">
          <div className="w-[80%] xl:w-[95%]  lg:w-[95%]  md:w-[95%] 2xl:w-[95%] 4k:w-[95%] 2k:w-[95%]  relative">
            <h2 className="text-[14px] font-medium text-[#344054]">
              Profile of Receiving Waterbody
            </h2>
            <p className="text-[14px] text-[#727272] w-[360px] xl:w-[560px] lg:w-[560px] 2xl:w-[560px] md:w-[560px] 4k:w-[560px] 2k:w-[560px] flex">
              Have you considered the profile of the receiving waterbody?
              <MdInfoOutline
                data-tooltip-id={`tooltip-$e1`}
                data-tooltip-content="Do you consider the profile of the receiving waterbody? if yes then please specify"
                className="mt-1 ml-2 text-[14px]"
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
            </p>
          </div>
          <div>
            <div>
              <div className="bg-sky-100 h-[25px] w-[70px] rounded-md">
                <p className="text-[#395f81] text-[10px] inline-block align-middle px-2 font-semibold">
                  GRI 303-2a
                </p>
              </div>
            </div>
          </div>
        </div>
        <Form
          schema={r_schema}
          formData={formData}
          onChange={handleChange}
          uiSchema={r_ui_schema}
          validator={validator}
          widgets={widgets}
          formContext={{ validationErrors }}
        >
          {formData[0].Q1 === "Yes" && (
            <>
              <h2 className="mb-2 text-sm">If yes please specify</h2>
              <textarea
                placeholder="Enter a description..."
                className={`backdrop:before:w-[48rem] border appearance-none text-xs border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full ${
                  validationErrors[0]?.details
                    ? "border-red-500"
                    : "border-gray-300"
                } `}
                id="details"
                value={formData[0].details}
                onChange={(e) => {
                  setFormData([{ ...formData[0], details: e.target.value }]);
                  if (validationErrors[0]?.details) {
                    // Clear the "details" error if it exists
                    const updatedErrors = [...validationErrors];
                    updatedErrors[0].details = null;
                    setValidationErrors(updatedErrors);
                  }
                }}
                rows={7}
              />
              {validationErrors[0]?.details && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors[0].details}
                </p>
              )}
            </>
          )}
        </Form>
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

export default Receivingwaterbody;
