"use client";
import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import CommoninputWidget from "../../../../shared/widgets/Input/commoninputWidget";
import inputWidget2 from "../../../../shared/widgets/Input/inputWidget2";
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import { GlobalState } from "@/Context/page";
import axiosInstance from "@/app/utils/axiosMiddleware";
import RichtextWidget from "../../../../shared/widgets/Economic/RichtextWidget";

const widgets = {
  inputWidget: CommoninputWidget,
  inputWidget2: inputWidget2,
  RichtextWidget: RichtextWidget,
};

const view_path = "gri-supplier_environmental_assessment-new_suppliers-308-1a";
const client_id = 1;
const user_id = 1;

const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      Q1: {
        type: "string",
        title:
          "Total Number of New Suppliers Screened using environmental criteria.",
      },
      Q2: {
        type: "string",
        title: "Total Number of New Suppliers",
      },
    },
  },
};

const uiSchema = {
  items: {
    "ui:order": ["Q1", "Q2"],
    Q1: {
      "ui:title":
        "Total Number of New Suppliers Screened using environmental criteria.",
      "ui:tooltip":
        "<p>Specify the total number of new suppliers that were screened using environmental criteria.</p><p>Supplier:</p><p>entity upstream from the organization (i.e., in the organization’s supply chain), which provides a product or service that is used in the development of the organization’s own products or services.</p>",
      "ui:tooltipdisplay": "block",
      "ui:titledisplay": "block",
      "ui:widgetType": "input",
      "ui:inputfildtype": "number",
      "ui:widget": "inputWidget",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    Q2: {
      "ui:title": "Total Number of New Suppliers.",
      "ui:tooltip":
        "<p>Specify the total number of new suppliers in the reporting period.</p>",
      "ui:tooltipdisplay": "block",
      "ui:titledisplay": "block",
      "ui:widgetType": "input",
      "ui:inputfildtype": "number",
      "ui:widget": "inputWidget",
      "ui:horizontal": true,
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

const Screen1 = ({ selectedOrg, year, selectedCorp }) => {
  const [formData, setFormData] = useState([{}]);
  const [r_schema, setRemoteSchema] = useState({});
  const [r_ui_schema, setRemoteUiSchema] = useState({});
  const [loopen, setLoOpen] = useState(false);
  const toastShown = useRef(false);
  const { open } = GlobalState();

  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };

  const handleChange = (e) => {
    setFormData(e.formData);
    setValidationErrors([]); // Reset validation errors
  };

  const updateFormData = async () => {
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
      setFormData(response.data.form_data[0].data);
    } catch (error) {
      setFormData([{}]);
    } finally {
      LoaderClose();
    }
  };
  useEffect(() => {
    if (selectedOrg && year) {
      loadFormData();
      toastShown.current = false;
    } else {
      if (!toastShown.current) {
        toastShown.current = true;
      }
    }
  }, [selectedOrg, year, selectedCorp]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   updateFormData();
  //   console.log("test form data", formData);
  // };

  const [validationErrors, setValidationErrors] = useState([]);

  // Add validation function
  const validateRows = (data) => {
    return data.map((row) => {
      const rowErrors = {};

      if (!row.Q1 || row.Q1.trim() === "") {
        rowErrors.Q1 = "This field is required";
      } else if (
        isNaN(Number(row.Q1)) ||
        Number(row.Q1) <= 0 ||
        !Number.isInteger(Number(row.Q1))
      ) {
        rowErrors.Q1 = "Please enter a positive whole number";
      }

      if (!row.Q2 || row.Q2.trim() === "") {
        rowErrors.Q2 = "This field is required";
      } else if (
        isNaN(Number(row.Q2)) ||
        Number(row.Q2) <= 0 ||
        !Number.isInteger(Number(row.Q2))
      ) {
        rowErrors.Q2 = "Please enter a positive whole number";
      }

      if (!rowErrors.Q1 && !rowErrors.Q2 && Number(row.Q1) > Number(row.Q2)) {
        rowErrors.Q1 = "Screened suppliers cannot exceed total suppliers";
      }

      return rowErrors;
    });
  };

  // Add renderError helper
  const renderError = (rowIndex, fieldName) => {
    const rowErrors = validationErrors[rowIndex] || {};
    return rowErrors[fieldName] ? (
      <div className="text-red-500 text-[12px] mt-1">
        {rowErrors[fieldName]}
      </div>
    ) : null;
  };

  // Update handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateRows(formData);
    setValidationErrors(errors);

    const hasErrors = errors.some(
      (rowErrors) => Object.keys(rowErrors).length > 0
    );
    if (!hasErrors) {
      updateFormData();
    } else {
      // toast.error("Please fill in all required fields correctly", {
      //   position: "top-right",
      //   autoClose: 3000,
      // });
    }
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
        <div className="flex">
          <div className="w-[80%] relative">
            <h2 className="flex mx-2 text-[15px] text-neutral-950 font-[500]">
              Number of new suppliers that were screened using environmental
              criteria.
              {/* <MdInfoOutline
                data-tooltip-id={`es30`}
                data-tooltip-html="Specify the total number of operations assessed for risks related to corruption."
                className="mt-1.5 ml-2 text-[15px]"
              />
              <ReactTooltip
                id={`es30`}
                place="top"
                effect="solid"
                style={{
                  width: "390px",
                  backgroundColor: "#000",
                  color: "white",
                  fontSize: "12px",
                  boxShadow: 3,
                  borderRadius: "8px",
                  textAlign: "left",
                }}
              ></ReactTooltip> */}
            </h2>
          </div>
          <div className="w-[20%]">
            <div className="float-end">
              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 308-1a
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
          />
        </div>
        <div className="mt-4">
          <button
            type="button"
            className={`text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end ${
              !selectedOrg || !year ? "cursor-not-allowed" : ""
            }`}
            onClick={handleSubmit}
            disabled={!selectedOrg || !year}
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

export default Screen1;
