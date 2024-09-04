"use client";
import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import EconmiccutomTable from "../../../../shared/widgets/Economic/econmiccutomTable";
import { MdAdd, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import axiosInstance from "@/app/utils/axiosMiddleware";
import CurrencyselectWidget from "../../../../shared/widgets/Select/currencyselectWidget";
import { Oval } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const widgets = {
  TableWidget: EconmiccutomTable,
  CurrencyselectWidget: CurrencyselectWidget,
};

const view_path = "gri-economic-country_by_country_reporting-207-4b-for";
const client_id = 1;
const user_id = 1;

const schema = {
  type: "object",
  properties: {
    Q1: {
      type: "string",
      title: "Select Currency",
    },
    Q2: {
      type: "array",
      items: {
        type: "object",
        properties: {
          Taxjurisdictioncol1: { type: "string" },
          Taxjurisdictioncol2: { type: "string" },
          Taxjurisdictioncol3: { type: "string" },
          Taxjurisdictioncol4: { type: "string" },
          Taxjurisdictioncol5: { type: "string" },
          Taxjurisdictioncol6: { type: "string" },
          Taxjurisdictioncol7: { type: "string" },
          Taxjurisdictioncol8: { type: "string" },
          Taxjurisdictioncol9: { type: "string" },
          Taxjurisdictioncol10: { type: "string" },
          Taxjurisdictioncol11: { type: "string" },
        },
      },
    },
  },
};

const uiSchema = {
  Q1: {
    "ui:title": "Select Currency",
    "ui:tooltip": "Specify the frequency of sustainability reporting..",
    "ui:tooltipdisplay": "none",
    "ui:widget": "CurrencyselectWidget",
    "ui:widgtclass":
      "block w-[20vw]  py-2  text-sm leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300 mb-4",
    "ui:horizontal": true,
    "ui:options": {
      label: false,
    },
  },
  Q2: {
    "ui:widget": "TableWidget",
    "ui:options": {
      titles: [
        {
          title: "Tax Jurisdiction",
          tooltip:
            "How many substantiated complaints received concerning breaches of customer privacy?",
          type: "text",
          tooltipdisplay: "none",
          widgettype: "input",
        },
        {
          title: "Names of resident entities",
          tooltip: "Mention a list of entities by tax jurisdiction.",
          type: "text",
          tooltipdisplay: "block",
          widgettype: "input",
        },
        {
          title: "Primary activities of the organization",
          tooltip:
            "Specify the main activities of the organisation. e.g. sales, marketing, manufacturing, or distribution.",
          type: "text",
          tooltipdisplay: "block",
          widgettype: "textarea",
        },
        {
          title:
            "Number of employees and the basis of calculation of this number",
          tooltip:
            "Employee numbers can be reported using an appropriate calculation, such as head count at the end of the time period reported in Disclosure 207-4-c or a full-time equivalent (FTE) calculation",
          type: "text",
          tooltipdisplay: "block",
          widgettype: "input",
        },
        {
          title: "Revenues from third party sales",
          tooltip:
            "Mention revenues generated from third party sales for each tax jurisdiction.",
          type: "number",
          tooltipdisplay: "block",
          widgettype: "input",
        },
        {
          title:
            "Revenues from intra-group transactions with other tax jurisdictions",
          tooltip:
            "Mention revenues from intra-group transactions with other tax jurisdictions",
          type: "number",
          tooltipdisplay: "block",
          widgettype: "input",
        },
        {
          title: "Profit/Loss before tax",
          tooltip:
            "Mention profit/Loss before tax for a tax jurisdiction.",
          type: "text",
          tooltipdisplay: "block",
          widgettype: "input",
        },
        {
          title:
            "Tangible assets other than cash and cash equivalents",
          tooltip:
            "Specify tangible assets other than cash and cash equivalents for a tax jurisdiction.",
          type: "number",
          tooltipdisplay: "block",
          widgettype: "input",
        },
        {
          title: "Corporate income tax paid on a cash basis",
          tooltip:
            "When organisation's income tax paid on a cash basis for a tax jurisdiction, the organization can calculate the total actual corporate income tax paid during the time period reported in Disclosure 207-4-c by all its resident entities in the jurisdiction.",
          type: "number",
          tooltipdisplay: "block",
          widgettype: "input",
        },
        {
          title: "Corporate income tax accrued on profit/loss",
          tooltip: "Mention corporate income tax accrued on profit/loss.",
          type: "text",
          tooltipdisplay: "block",
          widgettype: "input",
        },
        {
          title:
            "Reasons for the difference between corporate income tax accrued on profit/loss and the tax due if the statutory tax rate is applied to profit/loss before tax.",
          tooltip:
            "When reporting the reasons for the difference between corporate income tax accrued on profit/loss and the tax due if the statutory tax rate is applied to profit/loss before tax, the organization can describe items that explain the difference, such as tax reliefs, allowances, incentives, or any special tax provisions where an entity benefits from preferential tax treatment.",
          type: "text",
          tooltipdisplay: "block",
          widgettype: "textarea",
        },
      ],
    },
  },
};

const Screen2 = ({ selectedOrg, selectedCorp, location, year, month }) => {
  const initialFormData = {
    Q1: "",
    Q2: [
      {
        Taxjurisdictioncol1: "",
        Taxjurisdictioncol2: "",
        Taxjurisdictioncol3: "",
        Taxjurisdictioncol4: "",
        Taxjurisdictioncol5: "",
        Taxjurisdictioncol6: "",
        Taxjurisdictioncol7: "",
        Taxjurisdictioncol8: "",
        Taxjurisdictioncol9: "",
        Taxjurisdictioncol10: "",
        Taxjurisdictioncol11: "",
      },
    ],
  };
  const [formData, setFormData] = useState(initialFormData);
  const [loopen, setLoOpen] = useState(false);
  const [r_schema, setRemoteSchema] = useState({});
  const [r_ui_schema, setRemoteUiSchema] = useState({});
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
    const data = {
      client_id,
      user_id,
      path: view_path,
      form_data: formData,
      corporate: selectedCorp,
      organisation: selectedOrg,
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
        });
        LoaderClose();
        loadFormData();
      } else {
        toast.error("Oops, something went wrong", {
          position: "top-right",
          autoClose: 1000,
        });
        LoaderClose();
      }
    } catch (error) {
      toast.error("Oops, something went wrong", {
        position: "top-right",
        autoClose: 1000,
      });
      LoaderClose();
    }
  };

  const loadFormData = async () => {
    LoaderOpen();
    setFormData(initialFormData);
    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&corporate=${selectedCorp}&organisation=${selectedOrg}&year=${year}&month=${month}`;
    try {
      const response = await axiosInstance.get(url);
      setRemoteSchema(response.data.form[0].schema);
      setRemoteUiSchema(response.data.form[0].ui_schema);
      setFormData(response.data.form_data[0].data);
    } catch (error) {
      setFormData(initialFormData);
    } finally {
      LoaderClose();
    }
  };

  useEffect(() => {
    if (selectedOrg && year && month) {
      loadFormData();
      toastShown.current = false;
    } else {
      if (!toastShown.current) {
        toastShown.current = true;
      }
    }
  }, [selectedOrg, year, selectedCorp, month]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData();
    console.log("test form data", formData);
  };

  const handleAddCommittee = () => {
    setFormData((prevData) => ({
      ...prevData,
      Q2: [
        ...prevData.Q2,
        {
          Taxjurisdictioncol1: "",
          Taxjurisdictioncol2: "",
          Taxjurisdictioncol3: "",
          Taxjurisdictioncol4: "",
          Taxjurisdictioncol5: "",
          Taxjurisdictioncol6: "",
          Taxjurisdictioncol7: "",
          Taxjurisdictioncol8: "",
          Taxjurisdictioncol9: "",
          Taxjurisdictioncol10: "",
          Taxjurisdictioncol11: "",
        },
      ],
    }));
  };

  const handleRemoveCommittee = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      Q2: prevData.Q2.filter((_, i) => i !== index),
    }));
  };

  return (
    <>
      <div
        className="mx-2 p-3 mb-6 rounded-md"
        style={{
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        }}
      >
        <div className="mb-4 flex">
          <div className="w-[80%] relative">
            <h2 className="flex mx-2 text-[15px] text-gray-500 font-semibold mb-2">
              For each tax jurisdiction reported above (for the reporting
              period),
              <MdInfoOutline
                data-tooltip-id={`tooltip-$e18`}
                data-tooltip-content="This section documents data corresponding to the number of employees by gender and geographic area, categorized by employment type."
                className="mt-1.5 ml-2 text-[14px]"
              />
              <ReactTooltip
                id={`tooltip-$e18`}
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
            <div className="bg-sky-100 h-[25px] w-[70px] rounded-md mx-2 float-end">
              <p className="text-[#395f81] text-[10px] inline-block align-middle px-2 font-semibold">
                GRI 207-4b
              </p>
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
        {selectedOrg && year && (
        <div className="flex right-1 mx-2">
          <button
            type="button"
            className="text-[#007EEF] text-[13px] flex cursor-pointer mt-5 mb-5"
            onClick={handleAddCommittee}
          >
            Add Row <MdAdd className="text-lg" />
          </button>
        </div>
      )}
        <div className="mb-6">
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

export default Screen2;
