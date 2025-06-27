"use client";
import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import EmissionIntensityWidget from "../../../../shared/widgets/Emission/EmissionIntensityWidget"
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import axiosInstance from "../../../../utils/axiosMiddleware";

const widgets = {
  EmissionIntensityWidget: EmissionIntensityWidget,

};

const view_path = "gri-environment-emissions-GHG emission-intensity";
const client_id = 1;
const user_id = 1;

const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
        MetricType: {
        type: "string",
        title: "Organization-specific metric type",
        enum: ["Units of product sold", "Unit of energy consumed", "Production volume", "Area (such as m2 floor space)","Number of employees","Monetary units (such as revenue or sales)","Other (please specify)"],
        tooltiptext: "Please select organisation specific metric type for calculating GHG emission intensity.",
      },
      Metricname: {
        type: "string",
        title: "Metric name",
        required: true,
        tooltiptext:
          "Please mention the name of the metric.",
      },
      Quantity: {
        type: "string",
        title: "Quantity",
        required: true,
        tooltiptext:
          "Please specify the quantity for the selected organization-specific metric. ",
      },
      Units: {
        type: "string",
        title: "Units",
        tooltiptext:
          "Please select the correct unit.",
      },

      intensityratio: {
        type: "string",
        title: "Types of GHG emissions included in intensity ratio",
        tooltiptext: "Indicate the purchased quantity",
        enum: ["Direct (Scope 1)", "Energy indirect (Scope 2)", "Other indirect (Scope 3)", ],
      },
  
      // Define other properties as needed
    },
  },
};
const uiSchema = {
  "ui:widget": "EmissionIntensityWidget",
  "ui:options": {
    titles: [
      {
        key: "MetricType",
        title: "Organization-specific metric type",
        tooltiptext: "Please select organisation specific metric type for calculating GHG emission intensity.",
        tooltipdisplay: "block",
        enum: ["Units of product sold", "Unit of energy consumed", "Production volume", "Area (such as m2 floor space)","Number of employees","Monetary units (such as revenue or sales)","Other (please specify)"],
      },
      {
        key: "Metricname",
        title: "Metric name",
        tooltiptext:
        "Please mention the name of the metric.",
        tooltipdisplay: "block",
      },
      {
        key: "Quantity",
        title: "Quantity",
        tooltiptext:
          "Please specify the quantity for the selected organization-specific metric. ",
        tooltipdisplay: "block",
      },
      {
        key: "Units",
        title: "Units",
        tooltiptext:
          "Please select the correct unit.",
        tooltipdisplay: "block",
      },
      {
        key: "intensityratio",
        title: "Types of GHG emissions included in intensity ratio",
        tooltiptext: "Indicate the purchased quantity",
        tooltipdisplay: "none",
      },

    ],
  },
};


const Screen1 = ({ selectedOrg, year, selectedCorp,togglestatus}) => {
  const [formData, setFormData] = useState([{}]);
  const [r_schema, setRemoteSchema] = useState({});
  const [r_ui_schema, setRemoteUiSchema] = useState({});
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
    } catch (error) {
      console.error("API call failed:", error);
    } finally {
      LoaderClose();
    }
  };
  useEffect(() => {
    if (selectedOrg && year && togglestatus) {
      setFormData([{}]); 
      setRemoteSchema({});
      setRemoteUiSchema({});
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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Submit button clicked"); // Debugging log
  //   const errors = validateRows(formData);
  //   setValidationErrors(errors);
  //   console.log("Validation Errors:", errors); // Debugging log
  
  //   const hasErrors = errors.some(rowErrors => Object.keys(rowErrors).length > 0);
  //   if (!hasErrors) {
  //     console.log("No validation errors, proceeding to update data"); // Debugging log
  //     updateFormData();
  //   } else {
  //     console.log("Validation errors found, submission aborted"); // Debugging log
  //   }
  // };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("from data",formData)
    updateFormData();
  };


  const handleChange = (e) => {
    console.log(e.formData,"test data");
    setFormData(e.formData);
  };

  return (
    <>
  <div className={`overflow-auto custom-scrollbar flex pt-4 pb-2`}>
        <Form
            schema={r_schema}
            uiSchema={r_ui_schema}
            formData={formData}
            onChange={handleChange}
            validator={validator}
            widgets={widgets}
          >
          </Form>
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
      
 
      <div className="mb-6 mt-2">
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

export default Screen1;