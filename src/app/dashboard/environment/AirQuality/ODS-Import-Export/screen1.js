"use client";
import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import RadioWidget2 from "../../../../shared/widgets/Input/radioWidget2";
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { Oval } from "react-loader-spinner";
import { GlobalState } from "@/Context/page";
import axiosInstance from '@/app/utils/axiosMiddleware';

const widgets = {
  RadioWidget2,
};

const view_path = "gri-environment-ods-production-import-export";
const client_id = 1;
const user_id = 1;

// 🟢 Ensure schema is well-defined
const schema = {
  type: "object",
  properties: {
    produceODS: {
      type: "string",
      title: "Does your organisation produce ODS in its processes, products and services?",
      enum: ["Yes", "No"],
    },
    importODS: {
      type: "string",
      title: "Does your organisation import ODS in its processes, products and services?",
      enum: ["Yes", "No"],
    },
    exportODS: {
      type: "string",
      title: "Does your organisation export ODS in its processes, products and services?",
      enum: ["Yes", "No"],
    },
    useODSFeedstock: {
      type: "string",
      title: "Does your organisation use ODS as feedstock?",
      enum: ["Yes", "No"],
    },
    destroyODS: {
      type: "string",
      title: "Does your organisation destroy ODS using approved technologies?",
      enum: ["Yes", "No"],
    },
  },
  required: ["produceODS", "importODS", "exportODS", "useODSFeedstock", "destroyODS"], // Ensures validation works
};

const uiSchema = {
    "ui:order": ["produceODS", "importODS", "exportODS", "useODSFeedstock", "destroyODS"],
    
    produceODS: {
      "ui:widget": "RadioWidget2",
      "ui:title": "Does your organisation produce ODS in its processes, products and services?",
      "ui:tooltip": "Select 'Yes' if your organisation produces ODS in its processes, products, or services.",
      "ui:tooltipdisplay": "block",
      "ui:options": { label: false },
    },
  
    importODS: {
      "ui:widget": "RadioWidget2",
      "ui:title": "Does your organisation import ODS in its processes, products and services?",
      "ui:tooltip": "Select 'Yes' if your organisation imports ODS in its processes, products, or services.",
      "ui:tooltipdisplay": "block",
      "ui:options": { label: false },
    },
  
    exportODS: {
      "ui:widget": "RadioWidget2",
      "ui:title": "Does your organisation export ODS in its processes, products and services?",
      "ui:tooltip": "Select 'Yes' if your organisation exports ODS in its processes, products, or services.",
      "ui:tooltipdisplay": "block",
      "ui:options": { label: false },
    },
  
    useODSFeedstock: {
      "ui:widget": "RadioWidget2",
      "ui:title": "Does your organisation use ODS as feedstock?",
      "ui:tooltip": "Select 'Yes' if your organisation uses ODS as feedstock in any capacity.",
      "ui:tooltipdisplay": "block",
      "ui:options": { label: false },
    },
  
    destroyODS: {
      "ui:widget": "RadioWidget2",
      "ui:title": "Does your organisation destroy ODS using approved technologies?",
      "ui:tooltip": "Select 'Yes' if your organisation follows approved technologies for ODS destruction.",
      "ui:tooltipdisplay": "block",
      "ui:options": { label: false },
    },
  
    "ui:options": {
      orderable: false, // Prevents reordering
      addable: false, // Prevents adding more rows
      removable: false, // Prevents removing fields
      layout: "horizontal", // Maintains layout consistency
    },
  };
  

const Screen1 = forwardRef(({ selectedOrg, year, selectedCorp, togglestatus }, ref) => {
  const [formData, setFormData] = useState({});
  const [loopen, setLoOpen] = useState(false);
  const toastShown = useRef(false);
  const { open } = GlobalState();

  const LoaderOpen = () => setLoOpen(true);
  const LoaderClose = () => setLoOpen(false);

  const updateFormData = async () => {
    if (!selectedOrg || !year) return; // Prevent unnecessary API calls

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

    try {
      await axiosInstance.post(`${process.env.BACKEND_API_URL}/datametric/update-fieldgroup`, data);
    } catch (error) {
      console.error("Error updating form data", error);
    } finally {
      LoaderClose();
    }
  };

  const loadFormData = async () => {
    if (!selectedOrg || !year) return;

    LoaderOpen();
    try {
      const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&corporate=${selectedCorp}&organisation=${selectedOrg}&year=${year}`;
      const response = await axiosInstance.get(url);
      setFormData(response.data.form_data?.[0]?.data || {});
    } catch (error) {
      setFormData({});
    } finally {
      LoaderClose();
    }
  };

  useEffect(() => {
    if (selectedOrg && year && togglestatus) {
      if (togglestatus === "Corporate" && selectedCorp) {
        loadFormData();
      } else if (togglestatus === "Corporate" && !selectedCorp) {
        setFormData({});
      } else {
        loadFormData();
      }
    }
  }, [selectedOrg, year, selectedCorp, togglestatus]);

  const handleChange = (e) => {
    setFormData(e.formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData();
  };

  useImperativeHandle(ref, () => updateFormData);

  return (
    <>
      <div
        className="mx-2 pb-11 pt-3 px-3 mb-6 rounded-md"
        style={{
          boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        }}
      >
        <div className="mb-4 flex">
          <div className="w-[80%] relative">
            <h2 className="flex mx-2 text-[15px] text-neutral-950 font-[500]">
              ODS Production, Import & Export
              <MdInfoOutline
                data-tooltip-id={`tooltip-ods`}
                data-tooltip-content="This section documents data corresponding to the production, import, export, and destruction of ODS."
                className="mt-1.5 ml-2 text-[15px]"
              />
              <ReactTooltip
                id={`tooltip-ods`}
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
              />
            </h2>
          </div>

          <div className="w-[20%]">
            <div className="float-end">
              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg inline-flex items-center justify-center">
                <div className="text-sky-700 text-[10px] font-semibold tracking-tight">GRI 305-6a</div>
              </div>
              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg inline-flex items-center justify-center ml-2">
                <div className="text-sky-700 text-[10px] font-semibold tracking-tight">GRI 305-6d</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-2">
          <Form schema={schema} uiSchema={uiSchema} formData={formData} onChange={handleChange} validator={validator} widgets={widgets} />
        </div>

        <div className="mb-4">
        <button className="text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 float-end" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      </div>

      {loopen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <Oval height={50} width={50} color="#00BFFF" />
        </div>
      )}
    </>
  );
});

export default Screen1;
