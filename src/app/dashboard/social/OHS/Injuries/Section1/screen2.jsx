"use client";
import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import CustomTableWidget from "../../../../../shared/widgets/Table/tableWidget";
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import axios from "axios";
import { update } from "lodash";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import axiosInstance from "@/app/utils/axiosMiddleware";
// Simple Custom Table Widget
const widgets = {
  TableWidget: CustomTableWidget,
};

const view_path = "gri-social-ohs-403-9b-number_of_injuries_workers";
const client_id = 1;
const user_id = 1;

const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      employeeCategory: { type: "string", title: "employeeCategory" },
      fatalities: { type: "string", title: "fatalities" },
      highconsequence: { type: "string", title: "highconsequence" },
      recordable: { type: "string", title: "recordable" },
      maintypes: { type: "string", title: "maintypes" },
      numberofhoursworked: { type: "string", title: "numberofhoursworked" },
    },
  },
};

const uiSchema = {
  "ui:widget": "TableWidget",
  "ui:options": {
    titles: [
      {
        title: "Worker Category",
        tooltip:
          "Please specify the category of workers who are not employees but whose work and/or workplace is controlled by the organization.",
        type: "text",
      },
      {
        title: "Number of fatalities as a result of work-related injury",
        tooltip:
          "Please specify the number of fatalities as a result of work-related injury.Work-related injury: negative impacts on health arising from exposure to hazards at work.",
        type: "number",
      },
      {
        title:
          "Number of high-consequence work-related injuries (excluding fatalities)",
        tooltip:
          "Please specify the number of high-consequence work-related injuries (excluding fatalities).High-consequence work-related injury: work-related injury that results in a fatality or in an injury from  which the worker cannot, does not, or is not expected to  recover fully to pre-injury health status within six months.",
        type: "number",
      },
      {
        title: "Number of recordable work-related injuries",
        tooltip:
          "Please specify the number of recordable work-related injuries. Recordable work-related injury: work-related injury or ill health that results in any of the following: death, days away from work,restricted work or transfer to another job, medical treatment beyond first aid,or loss of consciousness",
        type: "number",
      },
      {
        title: "Main types of work-related injury",
        tooltip: "Please specify the main types of work-related injury.",
        type: "text",
      },
      {
        title: "Total number of hours worked by worker category",
        tooltip:
          "Please provide the total number of hours worked by total number of workers within each specific worker category.",
        type: "number",
      },
    ],
  },
};
const validateRows = (data) => {
  return data.map((row) => {
    const rowErrors = {};
    if (!row.employeeCategory) {
      rowErrors.employeeCategory = "This field is required";
    }
    if (!row.fatalities) {
      rowErrors.fatalities = "This field is required";
    }
    if (!row.highconsequence) {
      rowErrors.highconsequence = "This field is required";
    }
    if (!row.recordable) {
      rowErrors.recordable = "This field is required";
    }
    if (!row.maintypes) {
      rowErrors.maintypes = "This field is required";
    }
    if (!row.numberofhoursworked) {
      rowErrors.numberofhoursworked = "This field is required";
    }
    return rowErrors;
  });
};
const Screen2 = ({ location, year, month }) => {
  const initialFormData = [
    {
      employeeCategory: "",
      fatalities: "",
      highconsequence: "",
      recordable: "",
      maintypes: "",
      numberofhoursworked: "",
    },
  ];
  const [formData, setFormData] = useState(initialFormData);
  const [r_schema, setRemoteSchema] = useState({});
  const [r_ui_schema, setRemoteUiSchema] = useState({});
  const [loopen, setLoOpen] = useState(false);
  const toastShown = useRef(false);
  const [validationErrors, setValidationErrors] = useState([]);

  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };

  const handleChange = (e) => {
    setFormData(e.formData);
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
    // console.log('Response:', response.data);
    // } catch (error) {
    // console.error('Error:', error);
    // }
  };

  const loadFormData = async () => {
    LoaderOpen();
    setFormData(initialFormData);
    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&location=${location}&year=${year}&month=${month}`;
    try {
      const response = await axiosInstance.get(url);
      console.log("API called successfully:", response.data);
      setRemoteSchema(response.data.form[0].schema);
      setRemoteUiSchema(response.data.form[0].ui_schema);
      setFormData(response.data.form_data[0].data);
    } catch (error) {
      setFormData(initialFormData);
    } finally {
      LoaderClose();
    }
  };
  //Reloading the forms
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
  const handleAddCommittee = () => {
    const newCommittee = {
      employeeCategory: "",
      fatalities: "",
      highconsequence: "",
      recordable: "",
      maintypes: "",
      numberofhoursworked: "",
    };
    setFormData([...formData, newCommittee]);
  };

  // const handleRemoveCommittee = (index) => {
  //   const newFormData = formData.filter((_, i) => i !== index);
  //   setFormData(newFormData);
  // };

  return (
    <>
      <div
        className="mx-2 pb-11 pt-3 px-3 mb-6 rounded-md mt-8 xl:mt-0 lg:mt-0 md:mt-0 2xl:mt-0 4k:mt-0 2k:mt-0 "
        style={{
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        }}
      >
        <div className="xl:mb-4 md:mb-4 2xl:mb-4 lg:mb-4 4k:mb-4 2k:mb-4 mb-6 block xl:flex lg:flex md:flex 2xl:flex 4k:flex 2k:flex">
          <div className="w-[100%] xl:w-[80%] lg:w-[80%] md:w-[80%] 2xl:w-[80%] 4k:w-[80%] 2k:w-[80%] relative mb-2 xl:mb-0 lg:mb-0 md:mb-0 2xl:mb-0 4k:mb-0 2k:mb-0">
            <h2 className="flex mx-2 text-[15px] text-neutral-950 font-[500]">
              The Number of Injuries
              <MdInfoOutline
                data-tooltip-id={`tooltip-$e1`}
                data-tooltip-content="This section documents data corresponding to the
                                number of fatalities as a result of a work-related
                                injury, high-consequence work-related injuries,
                                recordable work-related injuries, type of work-related
                                injury and number of hours worked
                                for all workers who are not employees but whose work and/or
                                workplace is controlled by the organization."
                className="mt-1.5 ml-2 text-[15px]"
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
            </h2>
            <h2 className="flex mx-2 text-[13px] text-gray-500 font-semibold">
              for workers who are not employees but whose work and workplace is
              controlled by the organization
            </h2>
          </div>
          <div className="w-[100%] xl:w-[20%]  lg:w-[20%]  md:w-[20%]  2xl:w-[20%]  4k:w-[20%]  2k:w-[20%] h-[26px] mb-4 xl:mb-0 lg:mb-0 md:mb-0 2xl:mb-0 4k:mb-0 2k:mb-0  ">
            <div className="flex xl:float-end lg:float-end md:float-end 2xl:float-end 4k:float-end 2k:float-end float-start gap-2 mb-4 xl:mb-0 lg:mb-0 md:mb-0 2xl:mb-0 4k:mb-0 2k:mb-0">
              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 403-9b
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-2">
          <Form
            schema={r_schema}
            uiSchema={r_ui_schema}
            formData={formData}
            onChange={handleChange}
            validator={validator}
            widgets={widgets}
            formContext={{ validationErrors }}
            // formContext={{
            //   onRemove: handleRemoveCommittee,
            // }}
          />
        </div>
        {location && year && (
          <div className="flex right-1 mx-2">
            <button
              type="button"
              className="text-[#007EEF] text-[13px] flex cursor-pointer mt-5 mb-5"
              onClick={handleAddCommittee}
            >
              Add category <MdAdd className="text-[14px] mt-1 text-[#007EEF]" />
            </button>
          </div>
        )}
        <div className="mt-4">
          <button
            type="button"
            className={`text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end ${
              !location || !year ? "cursor-not-allowed" : ""
            }`}
            onClick={handleSubmit}
            disabled={!location || !year}
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

export default Screen2;
