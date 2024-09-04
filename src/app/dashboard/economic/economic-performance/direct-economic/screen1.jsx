"use client";
import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import inputWidget3 from "../../../../shared/widgets/Input/inputWidget3";
import AddmultiInput from "../../../../shared/widgets/Economic/addmultiInput";
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import { GlobalState } from "@/Context/page";
import axiosInstance from "@/app/utils/axiosMiddleware";
import CurrencyselectWidget from "../../../../shared/widgets/Select/currencyselectWidget";
const widgets = {
  inputWidget: inputWidget3,
  selectWidget:CurrencyselectWidget,
  AddmultiInput:AddmultiInput,
};

const view_path = "gri-economic-direct_economic_value-report-201-1a-1b";
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
          "Select Currency",

      },
      Q2: {
        type: "string",
        title: "Direct Economic value generated (Revenues)",
      },
      Q3: {
        type: "string",
        title: "Economic Value distributed",
      },
      Q4: {
        type: "string",
        title: "Operating costs",
      },
      Q5: {
        type: "string",
        title: "Employee wages & benefits",
      },
      Q6: {
        type: "string",
        title: "Payments to providers of capital",
      },
      Q7: {
        type: "string",
        title: "Payments to governments by country",
      },
      Q8: {
        type: "string",
        title: "Enter Country name",
      },
      Q9: {
        type: "string",
        title: "Community investments",
      },
      Q10: {
        type: "string",
        title: "Direct economic value generated",
      },
      Q11: {
        type: "string",
        title: "Economic value distributed",
      },
    },
  },
};

const uiSchema = {
  items: {
    "ui:order": ["Q1","Q2","Q3","Q4","Q5","Q6","Q7","Q8","Q9","Q10","Q11"],
    Q1: {
        "ui:title":
        "Select Currency",
      "ui:tooltip": "Specify the frequency of sustainability reporting..",
      "ui:tooltipdisplay": "none",
      "ui:widget": "selectWidget",
      "ui:widgtclass":"block w-[20vw] text-sm leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300 mb-4",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    Q2: {
        "ui:title":
          "1.Direct Economic value generated (Revenues)",
        "ui:tooltip":
          "An organization can calculate revenues as net sales plus revenues from financial investments and sales of assets. Net sales can be calculated as gross sales from products and services minus returns,discounts, and allowances. ",
        "ui:tooltipdisplay": "block",
        "ui:widget": "inputWidget",
        "ui:horizontal": true,
        "ui:options": {
          label: false,
        },
      },
      Q3: {
        "ui:title":
          "2.Economic Value distributed",
        "ui:tooltip":
          "An organization can calculate revenues as net sales plus revenues from financial investments and sales of assets. Net sales can be calculated as gross sales from products and services minus returns,discounts, and allowances. ",
        "ui:tooltipdisplay": "none",
        "ui:widget": "inputWidget",
        "ui:horizontal": true,
        "ui:options": {
          label: false,
        },
      },
      Q4: {
        "ui:title":
          "2.1) Operating costs",
        "ui:tooltip":
          "An organization can calculate operating costs as cash payments made outside the organizationfor materials, product components, facilities, and services purchased. ",
        "ui:tooltipdisplay": "block",
        "ui:widget": "inputWidget",
        "ui:horizontal": true,
        "ui:options": {
          label: false,
        },
      },
      Q5: {
        "ui:title":
          "2.2) Employee wages & benefits",
        "ui:tooltip":
          "An organization can calculate employee wages and benefits as total payroll (including employee salaries and amounts paid to government institutions on behalf of employees) plus total benefits (excluding training, costs of protective equipment or other cost items directly related to the employee’s job function).",
        "ui:tooltipdisplay": "block",
        "ui:widget": "inputWidget",
        "ui:horizontal": true,
        "ui:options": {
          label: false,
        },
      },
      Q6: {
        "ui:title":
          "2.3) Payments to providers of capital",
        "ui:tooltip":
          "An organization can calculate employee wages and benefits as total payroll (including employee salaries and amounts paid to government institutions on behalf of employees) plus total benefits (excluding training, costs of protective equipment or other cost items directly related to the employee’s job function).",
        "ui:tooltipdisplay": "none",
        "ui:widget": "inputWidget",
        "ui:horizontal": true,
        "ui:options": {
          label: false,
        },
      },
      Q7: {
        "ui:title":
          "2.4) Payments to governments by country",
        "ui:tooltip":
          "An organization can calculate payments to governments as all of the organization’s taxes plus related penalties paid at the international, national, and local levels. Organization taxes can include corporate, income, and property..",
        "ui:tooltipdisplay": "block",
        "ui:widget": "inputWidget",
        "ui:horizontal": true,
        "ui:options": {
          label: false,
        },
      },
      Q8: {
        "ui:title":
          "Enter Country name",
        "ui:tooltip":
          "Enter Country name",
        "ui:tooltipdisplay": "none",
        "ui:titledisplay": "none",
        "ui:widget": "AddmultiInput",
        "ui:inputtype1": "text",
        "ui:inputtype2": "number",
        "ui:widgetplaceholder": "Enter Country name",
        "ui:widgetplaceholder2": "Enter Value",
        "ui:widgtclass":"block w-[30vw] py-2 mb-2 text-sm leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300",
        "ui:widgtclass2":"backdrop:before:w-[48rem] mb-2 border appearance-none text-xs border-gray-400 text-neutral-600 pl-2 rounded-md py-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full",
        "ui:horizontal": true,
        "ui:options": {
          label: false,
        },
      },
      Q9: {
        "ui:title":
          "2.5) Community investments",
        "ui:tooltip":
          "Total community investments refers to actual expenditures in the reporting period, not commitments. An organization can calculate community investments as voluntary donations plus investment of funds in the broader community where the target beneficiaries are external tothe organization.",
        "ui:tooltipdisplay": "block",
        "ui:widget": "inputWidget",
        "ui:horizontal": true,
        "ui:options": {
          label: false,
        },
      },
      Q10: {
        "ui:title":
          "3.Direct economic value generated",
        "ui:tooltip":
          "Specify direct economic value generated.Direct economic value generated: Refers to the revenue of an organization.",
        "ui:tooltipdisplay": "block",
        "ui:widget": "inputWidget",
        "ui:horizontal": true,
        "ui:options": {
          label: false,
        },
      },
      Q11: {
        "ui:title":
          "4.Economic value distributed",
        "ui:tooltip":
          "Specify economic value distributed. Economic value distributed (EVD): Refers to the way a company distributes the wealth it has generated through its operations. It represents the various outflows of cash or economic benefits from the organization.",
        "ui:tooltipdisplay": "block",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData();
    // console.log("test form data", formData);
  };

  return (
    <>
      <div
        className="mx-2  p-3 mb-6 pb-6 rounded-md"
        style={{
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        }}
      >
        <div className="mb-4 flex">
          <div className="w-[80%] relative">
            <h2 className="flex mx-2 text-[15px] text-gray-500 font-semibold">
            Report the direct economic value generated and distributed (EVG&D) on an accruals basis for the reporting period, including the basic components for the organization’s global operations as listed below:
              <MdInfoOutline
                data-tooltip-id={`es25`}
                data-tooltip-html="
                <p>Provide a details of direct economic value generated and distributed (EVG&D) on an accruals basis, including the basic
components for the organization’s global operations as per the given list. Where significant,
report EVG&D separately at country, regional, or market levels, and the criteria used for defining significance.
</p>
<p>
Note: Compile the EVG&D from data in the organization’s audited financial or profit and loss
(P&L) statement, or its internally audited management accounts.</p> "
                className=" ml-2 text-[25px]"
              />
              <ReactTooltip
                id={`es25`}
                place="bottom"
                effect="solid"
                style={{
                  width: "290px",
                  backgroundColor: "#000",
                  color: "white",
                  fontSize: "12px",
                  boxShadow: 3,
                  borderRadius: "8px",
                  textAlign: "left",
                  zIndex: "100",
                }}
              ></ReactTooltip>
            </h2>
          </div>
          <div className="w-[20%]">
            <div className="flex float-end gap-2">
              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 201-1a
                </div>
              </div>
              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 201-2b
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-2 mb-2">
          <Form
            schema={r_schema}
            uiSchema={r_ui_schema}
            formData={formData}
            onChange={handleChange}
            validator={validator}
            widgets={widgets}
          />
        </div>
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

export default Screen1;
