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
import axiosInstance from "@/app/utils/axiosMiddleware";
// Simple Custom Table Widget
const widgets = {
  TableWidget: CustomTableWidget,
};

const view_path = "gri-social-collective_bargaining-407-1a-suppliers";
const client_id = 1;
const user_id = 1;

const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      significantrisk: { type: "string", title: "significantrisk" },
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
          "Suppliers in which workers’ rights to exercise freedom of association or collective bargaining may be violated or at significant risk",
        tooltip:
          "Please specify the name and type of suppliers in which workers’ rights to exercise freedom of association or collective bargaining may be violated or at significant risk.",
      },
      {
        title: "Type of Operation",
        tooltip:
          "This section allows you to enter the type of suppliers in which workers’ rights to exercise freedom of association or collective bargaining may be violated or at significant risk.  ",
      },
      {
        title: "Countries or Geographic Areas",
        tooltip:
          "This section allows you to enter the countries or geographic area with operations considered at risk.",
      },
    ],
  },
};

const validateRows = (data) => {
  return data.map((row) => {
    const rowErrors = {};
    if (!row.significantrisk) {
      rowErrors.significantrisk = "This field is required";
    }
    if (!row.TypeofOperation) {
      rowErrors.TypeofOperation = "This field is required";
    }
    if (!row.geographicareas) {
      rowErrors.geographicareas = "This field is required";
    }
    return rowErrors;
  });
};

const Screen2 = ({ selectedOrg, selectedCorp, year,togglestatus }) => {
  const initialFormData = [
    {
      significantrisk: "",
      TypeofOperation: "",
      geographicareas: "",
    },
  ];
  const [formData, setFormData] = useState(initialFormData);
  const [r_schema, setRemoteSchema] = useState({});
  const [validationErrors, setValidationErrors] = useState([]);
  const [r_ui_schema, setRemoteUiSchema] = useState({});
  const [loopen, setLoOpen] = useState(false);
  const toastShown = useRef(false);

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
    // console.log('Response:', response.data);
    // } catch (error) {
    // console.error('Error:', error);
    // }
  };

  const loadFormData = async () => {
    LoaderOpen();
    setFormData(initialFormData);
    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&corporate=${selectedCorp}&organisation=${selectedOrg}&year=${year}`;

    try {
      const response = await axiosInstance.get(url);
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
  useEffect(() => {
    if (selectedOrg && year && togglestatus) {
      if (togglestatus === "Corporate" && selectedCorp) {
        loadFormData(); 
      } else if (togglestatus === "Corporate" && !selectedCorp) {
        setFormData(initialFormData);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit button clicked"); // Debugging log
    const errors = validateRows(formData);
    setValidationErrors(errors);
    console.log("Validation Errors:", errors); // Debugging log
  
    const hasErrors = errors.some(rowErrors => Object.keys(rowErrors).length > 0);
    if (!hasErrors) {
      console.log("No validation errors, proceeding to update data"); // Debugging log
      updateFormData();
    } else {
      console.log("Validation errors found, submission aborted"); // Debugging log
    }
  };

  const handleAddCommittee = () => {
    const newCommittee = {
      significantrisk: "",
      TypeofOperation: "",
      geographicareas: "",
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
        className="mx-2 pb-11 pt-3 px-3 mb-6 rounded-md "
        style={{
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        }}
      >
        <div className="mb-4 flex">
          <div className="w-[80%] relative">
           <h2 className="flex mx-2 text-[15px] text-neutral-950 font-[500]">
              Suppliers in which the right to freedom of association or
              collective bargaining may be at risk
              <MdInfoOutline
                data-tooltip-id={`tooltip-$e10`}
                data-tooltip-content="This section documents the data corresponding to the suppliers
in which workers’ rights to exercise freedom of association
or collective bargaining may be violated or at significant risk."
                className="mt-1.5 ml-2 text-[15px]"
              />
              <ReactTooltip
                id={`tooltip-$e10`}
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
          </div>
          <div className="w-[20%]">
            <div className="float-end">
              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 407-1a
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
        {(togglestatus === "Corporate" && selectedCorp) || 
 (togglestatus !== "Corporate" && selectedOrg && year) ? (
  <div className="flex right-1 mx-2">
    <button
      type="button"
      className="text-[#007EEF] text-[13px] flex cursor-pointer mt-5 mb-5"
      onClick={handleAddCommittee}
    >
      Add category <MdAdd className="text-lg" />
    </button>
  </div>
) : null}
     <div className="mt-4">
    <button
      type="button"
      className={`text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end ${
        (!selectedCorp && togglestatus === "Corporate") || (!selectedOrg || !year) 
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

export default Screen2;
