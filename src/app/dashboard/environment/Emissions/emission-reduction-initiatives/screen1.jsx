"use client";
import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import EmissionreductioninitiativesWidgt from "../../../../shared/widgets/Emission/EmissionreductioninitiativesWidgt"
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import axiosInstance from "../../../../utils/axiosMiddleware";

const widgets = {
    EmissionreductioninitiativesWidgt: EmissionreductioninitiativesWidgt,

};

const view_path = "gri-environment-emissions-GHG emission-intensity";
const client_id = 1;
const user_id = 1;
const schema = {
    type: "array",
    items: {
      type: "object",
      properties: {
        Q1: {
            type: "string",
            title: "Has your organization taken any initiatives to reduce GHG emissions?",
            enum: ["Yes","No"],
            tooltiptext:
            "This section documents the data corresponding to the GHG emission reduction initiatives. Exclude: Reductions resulting from reduced production capacity or outsourcing.",
          },
          Q2: {
            type: "string",
            title: "Please specify Initiatve taken to reduce GHG emissions",
            tooltiptext:
              "Describe the initiatives taken to reduce GHG emissions.",
          },
          Q3: {
            type: "string",
            title: "Specify method to account for reductions",
            tooltiptext:
              "Inventory method: The inventory method is used to calculate and report GHG emissions by compiling and categorizing emissions data from the operations of an organization over a defined time period. It focuses on measuring total GHG emissions across all relevant sources. Project method: The project method is used to quantify GHG emission reductions resulting from specific projects or initiatives aimed at mitigating or reducing emissions.",
              enum: ["Inventory based Method","Project based Method","Other (please specify)"],
          },
          Q4: {
            type: "string",
            title: "Base Year or Baseline",
            tooltiptext:
              "Base year: historical datum (such as year) against which a measurement is tracked over time. Baseline: starting point used for comparisons.",
              enum: ["Base Year","Base Line"],
          },
    
          Q5: {
            type: "string",
            title: "Specify Year",
            startDate: { type: "string", format: "date" },
            endDate: { type: "string", format: "date" },
            tooltiptext:
            "Please specify Base year or baseline year.",
    
          },
          Q6: {
            type: "string",
            title: "Rationale for choosing base year or baseline",
            tooltiptext:
            "Specify the rationale for choosing base year.",
          },
          Q7: {
            type: "string",
            title: "GHG Emission reduced (tCO2e)",
            tooltiptext:
            "Specify the GHG emissions reduced as a direct result of reduction initiatives, in metric tons of CO2 equivalent.",
          },
          Q8: {
            type: "string",
            title: "Scopes in which reduction took place",
            tooltiptext:
            "Please select the Scopes in which reductions took place, whether direct (Scope 1), energy indirect (Scope 2), and/or other indirect (Scope 3).",
            enum: ["Direct (Scope 1)","Energy indirect (Scope 2)","Other indirect (Scope 3)"],
          },
          Q9: {
            type: "string",
            title: "Gases included in the calculations",
            tooltiptext:
            "Select gases which are included in the calculation.",
            enum: ["CO2","CO2e","CH4","N2O","HFC’s","PFCs","SF6","NF3"],
          },
          Q10: {
            type: "string",
            title: "Standard, Methodology, Assumptions and/or Calculation tools used.",
            tooltiptext:
            "Please specify the standards, methodologies, assumptions, and/or calculation tools used.",
          },
      },
     
    },
  };

const uiSchema = {
  "ui:widget": "EmissionreductioninitiativesWidgt",
  "ui:options": {
    titles: [
      {
        key: "Q1",
        type: "string",
        title: "Has your organization taken any initiatives to reduce GHG emissions?",
        enum: ["Yes","No"],
      },
      {
        key: "Q2",
        type: "string",
        title: "Please specify Initiatve taken to reduce GHG emissions",
        tooltiptext:
          "Describe the initiatives taken to reduce GHG emissions.",
        tooltipdisplay: "block",
      },
      {
        key: "Q3",
        type: "string",
        title: "Specify method to account for reductions",
        tooltiptext:
          "Inventory method: The inventory method is used to calculate and report GHG emissions by compiling and categorizing emissions data from the operations of an organization over a defined time period. It focuses on measuring total GHG emissions across all relevant sources. Project method: The project method is used to quantify GHG emission reductions resulting from specific projects or initiatives aimed at mitigating or reducing emissions.",
        tooltipdisplay: "block",
        enum: ["Inventory based Method","Project based Method","Other (please specify)"],
      },
      {
        key: "Q4",
        type: "string",
        title: "Base Year or Baseline",
        tooltiptext:
          "Base year: historical datum (such as year) against which a measurement is tracked over time. Baseline: starting point used for comparisons.",
        tooltipdisplay: "block",
        enum: ["Base Year","Base Line"],
      },
      {
        key: "Q5",
        type: "string",
        title: "Specify Year",
        tooltiptext:
        "Please specify Base year or baseline year.",
        startDate: { type: "string", format: "date" },
        endDate: { type: "string", format: "date" },
        tooltipdisplay: "block",
      },
      {
        key: "Q6",
        type: "string",
        title: "Rationale for choosing base year or baseline",
        tooltiptext:
        "Specify the rationale for choosing base year.",
        tooltipdisplay: "block",
      },
      {
        key: "Q7",
        type: "string",
        title: "Rationale for choosing base year or baseline",
        tooltiptext:
        "Specify the rationale for choosing base year.",
        tooltipdisplay: "block",
      },
      {
        key: "Q8",
        type: "string",
        title: "Scopes in which reduction took place",
        tooltiptext:
        "Please select the Scopes in which reductions took place, whether direct (Scope 1), energy indirect (Scope 2), and/or other indirect (Scope 3).",
        tooltipdisplay: "block",
        enum: ["Direct (Scope 1)","Energy indirect (Scope 2)","Other indirect (Scope 3)"],
      },
      {
        key: "Q9",
        type: "string",
        title: "Gases included in the calculations",
        tooltiptext:
        "Select gases which are included in the calculation.",
        tooltipdisplay: "block",
        enum: ["CO2","CO2e","CH4","N2O","HFC’s","PFCs","SF6","NF3"],
      },
      {
        key: "Q10",
        type: "string",
        title: "Standard, Methodology, Assumptions and/or Calculation tools used.",
        tooltiptext:
        "Please specify the standards, methodologies, assumptions, and/or calculation tools used.",
        tooltipdisplay: "block",
      },
    ],
  },
};


const Screen1 = ({ selectedOrg, year, selectedCorp,togglestatus }) => {
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
    // updateFormData();
  };


  const handleChange = (e) => {
    console.log(e.formData,"test data");
    setFormData(e.formData);
  };

  return (
    <>
  <div className={` pb-2`}>
        <Form
            schema={schema}
            uiSchema={uiSchema}
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