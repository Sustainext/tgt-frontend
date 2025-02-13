"use client";
import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import CustomTableWidget8 from "../../../../shared/widgets/Table/tableWidget8";
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import axiosInstance from "@/app/utils/axiosMiddleware";
import CurrencyselectWidget from "../../../../shared/widgets/Select/currencyselectWidget";
// Simple Custom Table Widget
const widgets = {
  TableWidget: CustomTableWidget8,
  CurrencyselectWidget: CurrencyselectWidget,
};

const view_path = "gri-social-salary_ratio-405-2a-ratio_of_remuneration";
const client_id = 1;
const user_id = 1;

const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      Q1: {
        type: "string",
        title: "Select a currency to fill the  below table",
      },
      Q2: {
        type: "array",
        items: {
          type: "object",
          properties: {
            category: { type: "string", title: "Category" },
            male: { type: "integer", title: "Male" },
            female: { type: "integer", title: "Female" },
            nonBinary: { type: "integer", title: "Non-Binary" },
            locationandoperation: {
              type: "string",
              title: "Significant Location of Operation",
            },
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
        "Mention the relevant entry level wage by gender at significant locations of operation to the minimum wage.Entry level wage: full-time wage in the lowest employment category.:",
      "ui:haddingdisplay": "none",
      "ui:haddingtooltipdisplay": "none",
      "ui:title": "Select a currency to fill the  below table.",
      "ui:tooltip": "Specify the frequency of sustainability reporting..",
      "ui:tooltipdisplay": "none",
      "ui:widget": "CurrencyselectWidget",
      "ui:widgtclass":
        "block w-[20vw] text-sm leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300 mb-4",
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
            title: "Employee Category",
            tooltip:
              "What is the ratio of the basic salary of women to men for each employee category. Basic salary is the fixed, minimum amount paid to an employee for performing his or her duties.",
            colSpan: 1,
          },
          {
            title: "Average remuneration of employees by Gender",
            tooltip:
              "What is the average remuneration of employees by gender for each employee category.",
            colSpan: 3,
          },
          {
            title: "Significant Location of Operation",
            tooltip:
              "This section allows you to enter the organization's significant locations of operation.",
            colSpan: 1,
          },
        ],
        subTitles: [
          {
            title: "",
            tooltip: "Please specify the category.",
            colSpan: 1,
            type: "text",
            title2: "Category",
          },
          {
            title: "Male",
            tooltip: "Please specify the number of male individuals.",
            colSpan: 1,
            type: "number",
            title2: "Male",
          },
          {
            title: "Female",
            tooltip: "Please specify the number of female individuals.",
            colSpan: 1,
            type: "number",
            title2: "Female",
          },
          {
            title: "Non-Binary",
            tooltip: "Please specify the number of non-binary individuals.",
            colSpan: 1,
            type: "number",
            title2: "NonBinary",
          },
          {
            title: "",
            tooltip:
              "Please specify the number of vulnerable community individuals.",
            colSpan: 1,
            type: "text",
            title2: "locationandoperation",
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

const Screen2 = ({ selectedOrg, year, selectedCorp, togglestatus }) => {
  const initialFormData = [
    {
      Q1: "",
      Q2: [
        {
          category: "",
          male: 0,
          female: 0,
          nonBinary: 0,
          locationandoperation: [],
        },
      ],
    },
  ];
  const [locationdata, setLocationdata] = useState();
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
    // console.log('Response:', response.data);
    // } catch (error) {
    // console.error('Error:', error);
    // }
  };
  const facthloctiondata = async () => {
    setLocationdata();
    const url = `${process.env.BACKEND_API_URL}/sustainapp/get_location_as_per_org_or_corp/?corporate=${selectedCorp}&organization=${selectedOrg}`;
    try {
      const response = await axiosInstance.get(url);
      console.log("Location data:", response.data);
      setLocationdata(response.data);
    } catch (error) {
      setLocationdata();
    } finally {
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
        facthloctiondata();
      } else if (togglestatus === "Corporate" && !selectedCorp) {
        setFormData(initialFormData);
        setRemoteSchema({});
        setRemoteUiSchema({});
      } else {
        loadFormData();
        facthloctiondata();
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

  const handleRemoveCommittee = (index) => {
    const newFormData = formData.filter((_, i) => i !== index);
    setFormData(newFormData);
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
          <div className="w-[80%] relative">
            <h2 className="flex mx-2 text-[15px] text-neutral-950 font-[500]">
              Average Remuneration of Employees
              <MdInfoOutline
                data-tooltip-id={`tooltip-$e14`}
                data-tooltip-content="This section documents the data corresponding to the average remuneration of employees by gender for each employee category across significant locations of operation. Remuneration: basic salary plus additional amounts paid to a worker. Examples of additional amounts paid to a worker can include those based on years of service, bonuses including cash and equity such as stocks and shares, benefit payments, overtime, time owed, and any additional allowances, such as transportation, living and childcare allowances."
                className="mt-1.5 ml-2 text-[15px]"
              />
              <ReactTooltip
                id={`tooltip-$e14`}
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
              ></ReactTooltip>
            </h2>
          </div>

          <div className="w-[20%]">
            <div className="float-end">
              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 405-2a
                </div>
              </div>
            </div>
          </div>
        </div>
        {Array.isArray(locationdata) && locationdata.length > 0 ? (
          <div className="mx-2">
            <Form
              schema={r_schema}
              uiSchema={r_ui_schema}
              formData={formData}
              onChange={handleChange}
              validator={validator}
              formContext={{
                onRemove: handleRemoveCommittee,
              }}
              widgets={{
                ...widgets,
                TableWidget: (props) => (
                  <CustomTableWidget8 {...props} locationdata={locationdata} />
                ),
              }}
            />
          </div>
        ) : (
          <div className="mx-2"></div>
        )}

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
