"use client";
import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import CustomTableWidget from "../../../../shared/widgets/Table/tableWidget";
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import { GlobalState } from "@/Context/page";
// Simple Custom Table Widget
const widgets = {
  TableWidget: CustomTableWidget,
};

const view_path =
  "gri-social-human_rights-408-1a-1b-supplier_young_worker_exposed";
const client_id = 1;
const user_id = 1;

const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      hazardouswork: { type: "string", title: "hazardouswork" },
      TypeofOperation: { type: "string", title: "TypeofOperation" },
      geographicareas: { type: "string", title: "geographicareas" },
    },
  },
};

const uiSchema = {
  "ui:widget": "TableWidget",
  "ui:options": {
    titles: [
      {
        title:
          "Suppliers considered to have significant risk of young workers exposed to hazardous work",
        tooltip:
          "Please indicate the suppliers considered to have significant risk for incidents of young workers exposed to hazardous work. ",
      },
      {
        title: "Type of Operation",
        tooltip:
          "This section allows you to enter the type of suppliers considered to have significant risk for incidents of young workers exposed to hazardous work. ",
      },
      {
        title: "Countries or Geographic Areas",
        tooltip:
          "This section allows you to enter the  countries or geographic area with suppliers considered at risk young workers exposed to hazardous work.",
      },
    ],
  },
};
const Screen4 = ({ location, year, month }) => {
  const initialFormData = [
    {
      hazardouswork: "",
      TypeofOperation: "",
      geographicareas: "",
    },
  ];
  const [formData, setFormData] = useState(initialFormData);
  const [r_schema, setRemoteSchema] = useState({});
  const [r_ui_schema, setRemoteUiSchema] = useState({});
  const [loopen, setLoOpen] = useState(false);
  const toastShown = useRef(false);
  const { open } = GlobalState();
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
      location,
      year,
      month,
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
      const response = await axios.get(url, axiosConfig);
      console.log("API called successfully:", response.data);
      setRemoteSchema(response.data.form[0].schema);
      setRemoteUiSchema(response.data.form[0].ui_schema);
      setFormData(response.data.form_data[0].data);
    } catch (error) {
      console.error("API call failed:", error);
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
    console.log("Form data:", formData);
    updateFormData();
  };

  const handleAddCommittee = () => {
    const newCommittee = {
      hazardouswork: "",
      TypeofOperation: "",
      geographicareas: "",
    };
    setFormData([...formData, newCommittee]);
  };

  const handleRemoveCommittee = (index) => {
    const newFormData = formData.filter((_, i) => i !== index);
    setFormData(newFormData);
  };

  return (
    <>
      <div
        className="mx-2 pb-11 pt-3 px-3 mb-6 rounded-md "
        style={{
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        }}
      >
        <div className="mb-4 flex">
          <div className="w-[80%] relative">
           <h2 className="flex mx-2 text-[15px] text-neutral-950 font-[500]">
              Suppliers at significant risk for incidents of young workers
              exposed to hazardous work
              <MdInfoOutline
                data-tooltip-id={`tooltip-$e1`}
                data-tooltip-content="This section documents the data corresponding to the suppliers considered to have significant risk for incidents of young workers exposed to hazardous work."
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
            {/* <h2 className='flex mx-2 text-[11px] text-gray-500 font-semibold mb-2'>
                        For all employees, please report the following

                        </h2> */}
          </div>

          <div className="w-[20%]">
            <div className="float-end">
              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 408-1a
                </div>
              </div>
              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex ml-2">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 408-1b
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
            formContext={{
              onRemove: handleRemoveCommittee,
            }}
          />
        </div>
        <div className="flex right-1 mx-2">
          {location && year && (
            <button
              type="button"
              className="text-[#007EEF] text-[13px] flex cursor-pointer mt-5 mb-5"
              onClick={handleAddCommittee}
            >
              Add category <MdAdd className="text-lg" />
            </button>
          )}
        </div>

        <div className="mb-6">
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

export default Screen4;
