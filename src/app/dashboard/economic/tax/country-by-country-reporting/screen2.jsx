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
  type: "array",
  items: {
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
  },
};

const uiSchema = {
  items: {
    "ui:order": ["Q1", "Q2"],
    Q1: {
      "ui:hadding":
        "If yes, then specify the relevant entry level wage by gender at significant locations of operation to the minimum wage:",
      "ui:haddingtooltips":
        "If yes, then specify the relevant entry level wage by gender at significant locations of operation to the minimum wage:",
      "ui:haddingdisplay": "none",
      "ui:haddingtooltipdisplay": "none",
      "ui:title": "Select Currency",
      "ui:tooltip": "Specify the frequency of sustainability reporting..",
      "ui:tooltipdisplay": "none",
      "ui:widget": "CurrencyselectWidget",
      "ui:widgtclass":
        "block w-[64vw] xl:w-[20vw] lg:w-[20vw] md:w-[20vw] 2x:w-[20vw] 4k:w-[20vw] 2k:w-[20vw] 3xl:w-[20vw] py-2  text-sm leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300 mb-4",
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
            tooltip: "Mention profit/Loss before tax for a tax jurisdiction.",
            type: "text",
            tooltipdisplay: "block",
            widgettype: "input",
          },
          {
            title: "Tangible assets other than cash and cash equivalents",
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

    "ui:options": {
      orderable: false,
      addable: false,
      removable: false,
      layout: "horizontal",
    },
  },
};

const Screen2 = ({ selectedOrg, selectedCorp, year, togglestatus }) => {
  const initialFormData = [
    {
      Q1: "", // For the currency selection widget
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
    },
  ];

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
    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&corporate=${selectedCorp}&organisation=${selectedOrg}&year=${year}`;
    try {
      const response = await axiosInstance.get(url);
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
    updateFormData();
    console.log("test form data", formData);
  };
  const handleAddCommittee = () => {
    setFormData((prevData) => {
      // Ensure Q2 is always an array within the first item of the formData array
      const updatedQ2 = Array.isArray(prevData[0]?.Q2) ? prevData[0].Q2 : [];

      // Add a new committee row
      const newCommittee = {
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
      };

      // Update the formData with the new Q2 array
      const updatedFormData = [
        {
          ...prevData[0],
          Q2: [...updatedQ2, newCommittee], // Add the new row to the Q2 array
        },
      ];

      return updatedFormData;
    });
  };

  const handleRemoveCommittee = (index) => {
    setFormData((prevData) => {
      // Ensure Q2 is an array within the first item of the formData array
      const updatedQ2 = Array.isArray(prevData[0]?.Q2) ? prevData[0].Q2 : [];

      // Filter out the item at the given index
      const filteredQ2 = updatedQ2.filter((_, i) => i !== index);

      // Update the formData with the filtered Q2 array
      const updatedFormData = [
        {
          ...prevData[0],
          Q2: filteredQ2, // Remove the row from the Q2 array
        },
      ];

      return updatedFormData;
    });
  };

  return (
    <>
   <div
        className="mx-2 pb-11 pt-3 px-3 mb-6 rounded-md mt-8 xl:mt-0 lg:mt-0 md:mt-0 2xl:mt-0 4k:mt-0 2k:mt-0 "
        style={{
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        }}
      >
        <div className="xl:mb-4 md:mb-4 2xl:mb-4 lg:mb-4 4k:mb-4 2k:mb-4 mb-6 block xl:flex lg:flex md:flex 2xl:flex 4k:flex 2k:flex">
          <div className="w-[100%] xl:w-[80%] lg:w-[80%] md:w-[80%] 2xl:w-[80%] 4k:w-[80%] 2k:w-[80%] relative mb-2 xl:mb-0 lg:mb-0 md:mb-0 2xl:mb-0 4k:mb-0 2k:mb-0">
            <h2 className="flex mx-2 text-[15px] text-neutral-950 font-[500]">
              For each tax jurisdiction reported above (for the reporting
              period),
              <MdInfoOutline
                data-tooltip-id={`tooltip-$e18`}
                data-tooltip-content="In this disclosure, country-by-country information is to be reported at the level of tax jurisdictions and not at the level of individual entities."
                className="mt-1.5 ml-2 text-[15px] w-[20%] xl:w-[5%] md:w-[5%] lg:w-[5%] 2xl:w-[5%] 3xl:w-[5%] 4k:w-[5%] 2k:w-[5%]"
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
          <div className="w-[100%] xl:w-[20%]  lg:w-[20%]  md:w-[20%]  2xl:w-[20%]  4k:w-[20%]  2k:w-[20%] h-[26px] mb-4 xl:mb-0 lg:mb-0 md:mb-0 2xl:mb-0 4k:mb-0 2k:mb-0  ">
            <div className="flex xl:float-end lg:float-end md:float-end 2xl:float-end 4k:float-end 2k:float-end float-start gap-2 mb-4 xl:mb-0 lg:mb-0 md:mb-0 2xl:mb-0 4k:mb-0 2k:mb-0">
              <div className="w-[80px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 207-4b
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
        {(togglestatus === "Corporate" && selectedCorp) ||
        (togglestatus !== "Corporate" && selectedOrg && year) ? (
          <div className="flex right-1 mx-2">
            <button
              type="button"
              className="text-[#007EEF] text-[13px] flex cursor-pointer mt-5 mb-5"
              onClick={handleAddCommittee}
            >
              Add Row <MdAdd className="text-lg" />
            </button>
          </div>
        ) : null}

        <div className="mt-4">
          <button
            type="button"
            className={`text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end ${
              (!selectedCorp && togglestatus === "Corporate") ||
              !selectedOrg ||
              !year
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
