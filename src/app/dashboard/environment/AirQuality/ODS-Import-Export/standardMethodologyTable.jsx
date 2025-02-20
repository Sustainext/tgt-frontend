"use client";
import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { MdAdd } from "react-icons/md";
import { GlobalState } from "../../../../../Context/page";
import selectWidget from "../../../../shared/widgets/Select/selectWidget";
import inputWidget from "../../../../shared/widgets/Input/inputWidget";
import CustomFileUploadWidget from "../../../../shared/widgets/CustomFileUploadWidget";
import AssignToWidget from "../../../../shared/widgets/assignToWidget";
import RemoveWidget from "../../../../shared/widgets/RemoveWidget";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";

const widgets = {
  inputWidget,
  selectWidget,
  FileUploadWidget: CustomFileUploadWidget,
  AssignTobutton: AssignToWidget,
  RemoveWidget,
};

const view_path = "gri-environment-air-quality-ods_production-standard-methodologies";
const client_id = 1;
const user_id = 1;

const StandardMethodologyTable = ({ selectedOrg, selectedCorp, year, togglestatus }) => {
  const { open } = GlobalState();
  const [formData, setFormData] = useState([{}]);
  const [loopen, setLoOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [r_schema, setRSchema] = useState({});
  const [r_uiSchema, setRUiSchema] = useState({});
  const toastShown = useRef(false);

  const LoaderOpen = () => setLoOpen(true);
  const LoaderClose = () => setLoOpen(false);

  /** ✅ Fix: Correct Validation Function */
  const validateRows = (data) => {
    return data.map((row) => {
      let errors = {};
      if (!row.StandardsUsed) errors.StandardsUsed = "Standards Used is required.";
      if (!row.MethodologiesUsed) errors.MethodologiesUsed = "Methodologies Used is required.";
      if (!row.AssumptionsConsidered) errors.AssumptionsConsidered = "Assumptions Considered is required.";
      if (!row.CalculationToolsUsed) errors.CalculationToolsUsed = "Calculation Tools Used is required.";
      return errors;
    });
  };

  const updateFormData = async () => {
    LoaderOpen();
    const data = {
      client_id,
      user_id,
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
        loadFormData();
      } else {
        throw new Error();
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
    } finally {
      LoaderClose();
    }
  };

  /** ✅ Fix: Removed extra useEffect and structured dependencies correctly */
  const loadFormData = async () => {
    LoaderOpen();
    setFormData([{}]);

    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&corporate=${selectedCorp}&organisation=${selectedOrg}&year=${year}`;
    
    try {
      const response = await axiosInstance.get(url);
      console.log("API Response:", response.data);
      setRSchema(response.data.form[0]?.schema || {});
      setRUiSchema(response.data.form[0]?.ui_schema || {});
      setFormData(response.data.form_data[0]?.data || [{}]);
    } catch (error) {
      console.error("Error loading data:", error);
      setFormData([{}]);
    } finally {
      LoaderClose();
    }
  };

  /** ✅ Fix: Restructured useEffect for fetching data */
  useEffect(() => {
    if (selectedOrg && year && togglestatus) {
      if (togglestatus === "Corporate" && selectedCorp) {
        loadFormData();
      } else if (togglestatus === "Corporate" && !selectedCorp) {
        setFormData([{}]);
        setRSchema({});
        setRUiSchema({});
      } else {
        loadFormData();
      }

      toastShown.current = false;
    } else if (!toastShown.current) {
      toastShown.current = true;
    }
  }, [selectedOrg, year, selectedCorp, togglestatus]);

  /** ✅ Fix: Correctly handles form changes */
  const handleChange = (e) => {
    setFormData(e.formData);
  };

  /** ✅ Fix: Prevent API call if errors exist */
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateRows(formData);
    setValidationErrors(errors);

    // Check if any row has an error
    const hasErrors = errors.some((rowErrors) => Object.keys(rowErrors).length > 0);
    if (hasErrors) {
      toast.error("Please fill all required fields before submitting", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    updateFormData();
  };

  return (
    <>
      <div className="overflow-auto custom-scrollbar flex py-4">
        <Form
          className="flex"
          schema={r_schema}
          uiSchema={r_uiSchema}
          formData={formData}
          onChange={handleChange}
          validator={validator}
          widgets={widgets}
          formContext={{ validationErrors }}
        />
      </div>

      {loopen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <Oval height={50} width={50} color="#00BFFF" />
        </div>
      )}

      <div className="flex justify-start mt-4">
        <button className="text-[#007EEF] text-[12px] flex cursor-pointer mt-5 mb-5" onClick={() => setFormData([...formData, {}])}>
          <MdAdd className="text-lg" /> Add Row
        </button>
      </div>

      <div className="mb-4">
        <button className="text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 float-end" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
};

export default StandardMethodologyTable;
