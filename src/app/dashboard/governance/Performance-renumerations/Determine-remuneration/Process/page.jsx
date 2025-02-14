"use client";
import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import inputWidget2 from "../../../../../shared/widgets/Input/inputWidget2";
import GovernancetableWidget2 from "../../../../../shared/widgets/Governance/governancetableWidget2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import { GlobalState } from "@/Context/page";
import axiosInstance from "@/app/utils/axiosMiddleware";

const widgets = {
  inputWidget: inputWidget2,
  TableWidget: GovernancetableWidget2,
};

const view_path = "gri-governance-determine-remuneration-2-20-a-process";
const client_id = 1;
const user_id = 1;

const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      processDescription: {
        type: "string",
        title: "Process Description",
      },
      tableData: {
        type: "array",
        items: {
          type: "object",
          properties: {
            Criteria: { type: "string", title: "Criteria" },
            Whethertakenintoconsideration: {
              type: "string",
              enum: ["Yes", "No", "N/A"],
              title: "",
            },
            How: { type: "string", title: "Total no. of operations" },
          },
        },
      },
    },
  },
};

const uiSchema = {
  "ui:order": ["processDescription", "tableData"],
  items: {
    processDescription: {
      "ui:widget": "inputWidget",
      "ui:title": "",
      "ui:tooltip":
        "Describe the process for designing remuneration policies and determining remuneration",
      "ui:tooltipdisplay": "none",
      "ui:label": false,
    },
    tableData: {
      "ui:widget": "TableWidget",
      "ui:title": null,
      "ui:label": false,
      "ui:options": {
        hideLabel: true,
        titles: [
          { key: "Criteria", title: "", type: "number", display: "none" },
          {
            key: "Whethertakenintoconsideration",
            title: "",
            type: "number",
            display: "block",
          },
          { key: "How", title: "", type: "number", display: "block" },
        ],
        rowLabels: [
          {
            title:
              "Whether independent highest governance body members or an independent remuneration committee oversees the process for determining remuneration",
            tooltip: "",
            display: "none",
          },
          {
            title:
              "Weather and how the views of stakeholders (including shareholders) regarding remuneration are sought and taken into consideration",
            tooltip: "",
            display: "none",
          },
          {
            title:
              "Whether remuneration consultants are involved in determining remuneration and, if so, whether they are independent of the organization, its highest governance body and senior executives;",
            tooltip: "",
            display: "none",
          },
        ],
      },
    },
  },
};

const Process = ({ selectedOrg, selectedCorp, year, togglestatus }) => {
  const { open } = GlobalState();
  const initialFormData = [
    {
      processDescription: "",
      tableData: [
        { Whethertakenintoconsideration: "", How: "" },
        { Whethertakenintoconsideration: "", How: "" },
        { Whethertakenintoconsideration: "", How: "" },
      ],
    },
  ];
  const [formData, setFormData] = useState(initialFormData);
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
      organisation: selectedOrg,
      corporate: selectedCorp,
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
    setFormData(initialFormData);
    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&organisation=${selectedOrg}&corporate=${selectedCorp}&year=${year}`;
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
    console.log("Form data:", formData);
    updateFormData();
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
        <div className="mb-4 flex">
          <div className="w-[80%] relative flex">
            <h2 className="flex mx-2 text-[15px] text-neutral-950 font-[500]">
              Describe the process for designing its remuneration policies and
              for determining remuneration
            </h2>
            <MdInfoOutline
              data-tooltip-id={`tooltip-$e1`}
              data-tooltip-content="What is the process for designing its remuneration policies and for determining remuneration?"
              className="mt-1.5 ml-2 text-[15px]"
            />
            <ReactTooltip
              id={`tooltip-$e1`}
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
          </div>
          <div className="w-[20%]">
            <div className="float-end">
              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 2-20-a
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
          />
        </div>
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

export default Process;
