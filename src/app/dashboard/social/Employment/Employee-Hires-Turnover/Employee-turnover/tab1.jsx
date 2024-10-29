"use client";
import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import CustomTableWidget6 from "../../../../../shared/widgets/Table/tableWidget6";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";

const widgets = {
  TableWidget: CustomTableWidget6,
};

const view_path = "gri-social-employee_hires-401-1a-emp_turnover-permanent_emp";
const client_id = 1;
const user_id = 1;

const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      yearsold30: { type: "number", title: "< 30 years old" },
      yearsold30to50: { type: "number", title: "30 - 50 years old" },
      yearsold50: { type: "number", title: "> 50 years old" },
      beginning: { type: "number", title: "Total1" },
      end: { type: "number", title: "Total2" },
    },
  },
};

const uiSchema = {
  "ui:widget": "TableWidget",
  "ui:options": {
    titles: [
      {
        key: "yearsold30",
        title: "< 30 years old",
        tooltip:
          "Please mention the total  employees <30 years old who has left the organisation. Employee Turnover definition: employees who leave the organization voluntarily or due to dismissal, retirement, or death in service.",
      },
      {
        key: "yearsold30to50",
        title: "30 - 50 years old",
        tooltip:
          "Please mention the total  employees 30-50 years old who has left the organisation. Employee Turnover definition: employees who leave the organization voluntarily or due to dismissal, retirement, or death in service.",
      },
      {
        key: "yearsold50",
        title: "> 50 years old",
        tooltip:
          "Please mention the total  employees >50 years old who has left the organisation. Employee Turnover definition: employees who leave the organization voluntarily or due to dismissal, retirement, or death in service.",
      },
    ],
    rowLabels: [
      {
        title: "Male",
        tooltip:
          "Please mention the total male employee who has left the organisation. Employees Turnover definition: employees who leave the organization voluntarily or due to dismissal, retirement, or death in service.",
      },
      {
        title: "Female",
        tooltip:
          "Please mention the total female employees who left the organization. Employee Turnover definition: employees who leave the organization voluntarily or due to dismissal, retirement, or death in service.",
      },
      {
        title: "Others",
        tooltip:
          "Please mention the total non-binary employees who has left the organisation. Employee Turnover definition: employees who leave the organization voluntarily or due to dismissal, retirement, or death in service.",
      },
    ],
  },
};

const Tab1 = ({ fullName, year, month, selectedOrg, selectedCorp }) => {
  const initialFormData = [
    {
      yearsold30: "",
      yearsold30to50: "",
      yearsold50: "",
      beginning: "",
      end: "",
    },
    {
      yearsold30: "",
      yearsold30to50: "",
      yearsold50: "",
      beginning: "",
      end: "",
    },
    {
      yearsold30: "",
      yearsold30to50: "",
      yearsold50: "",
      beginning: "",
      end: "",
    },
  ];
  const [formData, setFormData] = useState(initialFormData);
  const [r_schema, setRemoteSchema] = useState({});
  const [r_ui_schema, setRemoteUiSchema] = useState({});
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

  const handleChange = (e) => {
    setFormData(e.formData); // Ensure you are extracting formData from the event
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
  };

  const loadFormData = async () => {
    LoaderOpen();
    setFormData(initialFormData);
    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&corporate=${selectedCorp}&organisation=${selectedOrg}&year=${year}&month=${month}`;
    try {
      const response = await axios.get(url, axiosConfig);
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
  //Reloading the forms -- White Beard
  useEffect(() => {
    //console.long(r_schema, '- is the remote schema from django), r_ui_schema, '- is the remote ui schema from django')
  }, [r_schema, r_ui_schema]);

  // console log the form data change
  useEffect(() => {
    console.log("Form data is changed -", formData);
  }, [formData]);

  useEffect(() => {
    if (selectedOrg && year && month) {
      loadFormData();
      toastShown.current = false; // Reset the flag when valid data is present
    } else {
      // Only show the toast if it has not been shown already
      if (!toastShown.current) {
        toastShown.current = true; // Set the flag to true after showing the toast
      }
    }
  }, [selectedOrg, year, selectedCorp, month]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    updateFormData();
  };
  return (
    <>
      <div className="pb-11 rounded-md">
        <Form
          schema={r_schema}
          uiSchema={r_ui_schema}
          formData={formData}
          onChange={handleChange}
          validator={validator}
          formContext={{ newMonth: fullName }}
          widgets={widgets}
        />
        <div className="mt-4 me-1">
          <button
            type="button"
            className={`text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end ${
              !selectedOrg || !year || !month ? "cursor-not-allowed" : ""
            }`}
            onClick={handleSubmit}
            disabled={!selectedOrg || !year || !month}
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

export default Tab1;
