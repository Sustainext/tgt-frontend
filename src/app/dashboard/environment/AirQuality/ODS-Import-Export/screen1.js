"use client";
import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import RadioWidget2 from "../../../../shared/widgets/Input/radioWidget2";
import { MdInfoOutline, MdKeyboardArrowDown } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { Oval } from "react-loader-spinner";
import { GlobalState } from "@/Context/page";
import axiosInstance from "@/app/utils/axiosMiddleware";

// 🟢 Custom Radio Widget
const widgets = { RadioWidget2 };

const view_path = "gri-environment-ods-production-import-export";
const client_id = 1;
const user_id = 1;

// 🟢 Form Schema & UI Schema
const schema = {
  type: "object",
  properties: {
    produceODS: {
      type: "string",
      title: "Does your organisation produce ODS?",
      enum: ["Yes", "No"],
    },
    importODS: {
      type: "string",
      title: "Does your organisation import ODS?",
      enum: ["Yes", "No"],
    },
    exportODS: {
      type: "string",
      title: "Does your organisation export ODS?",
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
  required: ["produceODS", "importODS", "exportODS", "useODSFeedstock", "destroyODS"],
};

const uiSchema = {
  produceODS: {
    "ui:title": "Does your organisation produce ODS?",
    "ui:widget": "RadioWidget2",
    "ui:options": { label: true },
  },
  importODS: {
    "ui:title": "Does your organisation import ODS?",
    "ui:widget": "RadioWidget2",
    "ui:options": { label: true },
  },
  exportODS: {
    "ui:title": "Does your organisation export ODS?",
    "ui:widget": "RadioWidget2",
    "ui:options": { label: true },
  },
  useODSFeedstock: {
    "ui:title": "Does your organisation use ODS as feedstock?",
    "ui:widget": "RadioWidget2",
    "ui:options": { label: true },
  },
  destroyODS: {
    "ui:title": "Does your organisation destroy ODS using approved technologies?",
    "ui:widget": "RadioWidget2",
    "ui:options": { label: true },
  },
};


// 🟢 Accordion Item Component
const AccordionItem = ({ title, children, tooltiptext, selectedOrg, setOrgMessage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { open } = GlobalState();

  const handleClick = () => {
    if (!selectedOrg) {
      setOrgMessage("Please select an organization.");
      return;
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="shadow-md py-1 mb-4 rounded-[8px] cursor-pointer border border-neutral-200 mx-3">
      <button className="py-3 text-left flex w-full" onClick={handleClick}>
        <div className="flex w-full">
          <div className={`flex ${open ? "w-[75%]" : "w-[75%]"}`}>
            <div className="flex items-center">
              <h5 className="text-[15px] text-[#344054] px-3 font-[500]">{title}</h5>
            </div>

            {tooltiptext && (
              <div className="flex items-center relative">
                <MdInfoOutline
                  data-tooltip-id={`tooltip-${title.replace(/\s+/g, "-")}`}
                  data-tooltip-content={tooltiptext}
                  className="text-[14px] ml-2"
                />
                <ReactTooltip
                  id={`tooltip-${title.replace(/\s+/g, "-")}`}
                  place="top"
                  effect="solid"
                  style={{
                    width: "300px",
                    backgroundColor: "#000",
                    color: "white",
                    fontSize: "12px",
                    boxShadow: 3,
                    borderRadius: "8px",
                  }}
                />
              </div>
            )}
          </div>

          <div className="w-[25%] flex justify-end">
            <MdKeyboardArrowDown className={`text-2xl transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </div>
        </div>
      </button>

      {isOpen && <div className="py-4 px-3">{children}</div>}
    </div>
  );
};

// 🟢 Main Screen1 Component (Inside AccordionItem)
const Screen1 = forwardRef(({ selectedOrg, year, selectedCorp, togglestatus, setOrgMessage }, ref) => {
  const [formData, setFormData] = useState({});
  const [loopen, setLoOpen] = useState(false);
  const { open } = GlobalState();

  const LoaderOpen = () => setLoOpen(true);
  const LoaderClose = () => setLoOpen(false);

  const updateFormData = async () => {
    if (!selectedOrg || !year) return;

    LoaderOpen();
    try {
      await axiosInstance.post(`${process.env.BACKEND_API_URL}/datametric/update-fieldgroup`, {
        client_id,
        user_id,
        path: view_path,
        form_data: formData,
        corporate: selectedCorp,
        organisation: selectedOrg,
        year,
      });
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
      const response = await axiosInstance.get(
        `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&corporate=${selectedCorp}&organisation=${selectedOrg}&year=${year}`
      );
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
      } else if (togglestatus !== "Corporate") {
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
    <AccordionItem
      title="ODS Production, Import & Export"
      tooltiptext="This section documents data corresponding to the production, import, export, and destruction of ODS."
      selectedOrg={selectedOrg}
      setOrgMessage={setOrgMessage}
    >
      <div className="mx-2">
        <Form schema={schema} uiSchema={uiSchema} formData={formData} onChange={handleChange} validator={validator} widgets={widgets} />
      </div>

      <div className="mb-4">
        <button className="text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 float-end" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      {loopen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <Oval height={50} width={50} color="#00BFFF" />
        </div>
      )}
    </AccordionItem>
  );
});

export default Screen1;
