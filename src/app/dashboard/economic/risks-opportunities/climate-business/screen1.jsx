"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import TcfdTable from "../../../../shared/widgets/Tcfd/TcfdTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import { GlobalState } from "@/Context/page";
import axiosInstance from "@/app/utils/axiosMiddleware";
import inputWidget2 from "../../../../shared/widgets/Input/inputWidget2";
import { GoArrowRight } from "react-icons/go";
import { IoIosWarning } from "react-icons/io";
import { FaExclamationTriangle } from "react-icons/fa";
import Link from "next/link";
const widgets = {
  TableWidget: TcfdTable,
  inputWidget: inputWidget2,
};

const view_path = "impact-of-climate-related-issues-on-business";
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
          "For each of the following business areas, describe how climate-related issues have influenced your organization's strategy, planning, or operations:,including in a 2°C or lower scenario.",
      },
      Q2: {
        type: "string",
        title:
          "Describe how climate-related risks and opportunities are prioritized in financial planning.",
      },
      Q3: {
        type: "string",
        title:
          "What impacts have climate-related issues had on your financial planning?.",
      },
    },
  },
};

const uiSchema = {
  items: {
    "ui:order": ["Q1", "Q2", "Q3"],
    Q1: {
      "ui:title":
        "Does the Board and/or Board Committees consider climate-related issues when reviewing and guiding key strategic and governance decisions?",
      "ui:tooltip":
        "If climate-related issues are considered in the following areas: Reviewing and guiding strategy, major plans of action, risk management policies, annual budgets, and business plans...",
      "ui:tooltipdisplay": "block",
      "ui:widget": "TcfdTable",
      "ui:horizontal": true,
      "ui:options": { label: false },
    },
    Q2: {
      "ui:title":
        "Describe how climate-related risks and opportunities are prioritized in financial planning.",
      "ui:tooltip":
        "Describe how climate-related issues serve as an input to financial planning process...",
      "ui:tooltipdisplay": "block",
      "ui:widget": "inputWidget",
      "ui:horizontal": true,
      "ui:options": { label: false },
    },
    Q3: {
      "ui:title":
        "What impacts have climate-related issues had on your financial planning?",
      "ui:tooltip":
        "Explain the impact of the identified climate-related risks and opportunities...",
      "ui:tooltipdisplay": "block",
      "ui:widget": "inputWidget",
      "ui:horizontal": true,
      "ui:options": { label: false },
    },
    "ui:options": {
      orderable: false,
      addable: false,
      removable: false,
      layout: "horizontal",
    },
  },
};

const Screen1 = ({
  selectedOrg,
  selectedCorp,
  year,
  togglestatus,
  setActiveTab,
}) => {
  const { open } = GlobalState();
  const [formData, setFormData] = useState([{}]);
  const [r_schema, setRemoteSchema] = useState({});
  const [r_ui_schema, setRemoteUiSchema] = useState({});
  const [loopen, setLoOpen] = useState(false);
  const [riskdata, setRiskdata] = useState();
  const toastShown = useRef(false);

  const BusinessAffected = [
    "Products and services",
    "Supply chain and/or value chain",
    "Adaptation and mitigation activities",
    "Investment in research and development",
    "Operations (including types of operations and location of facilities)",
    "Acquisitions or divestments",
    "Access to capital",
    "Others (please specify)",
  ];

  const LoaderOpen = () => setLoOpen(true);
  const LoaderClose = () => setLoOpen(false);

  const handleChange = (e) => {
    const updated = Array.isArray(e.formData) ? e.formData : [e.formData];
    setFormData(updated);
  };

  const updateFormData = async () => {
    LoaderOpen();
    const data = {
      client_id,
      user_id,
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
        toast.success("Data added successfully");
        loadFormData();
        loadFormData2();
      } else {
        toast.error("Oops, something went wrong");
      }
    } catch (error) {
      toast.error("Oops, something went wrong");
    } finally {
      LoaderClose();
    }
    console.log(data, "test");
  };

  const loadFormData2 = async () => {
    LoaderOpen();
    setRiskdata();
    const url = `${process.env.BACKEND_API_URL}/tcfd_framework/get-climate-related-data/?organization=${selectedOrg}&corporate=${selectedCorp}&year=${year}`;
    try {
      const response = await axiosInstance.get(url);
      setRiskdata(response.data.data);
      console.log(response.data.data, "set data riskdata");
    } catch (error) {
      console.error("Failed to load risk data", error);
    } finally {
      LoaderClose();
    }
  };

  const loadFormData = async () => {
    LoaderOpen();

    setFormData([{}]);
    setRemoteSchema({});
    setRemoteUiSchema({});

    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&corporate=${selectedCorp}&organisation=${selectedOrg}&year=${year}`;
    try {
      const response = await axiosInstance.get(url);
      setRemoteSchema(response.data.form[0]?.schema || {});
      setRemoteUiSchema(response.data.form[0]?.ui_schema || {});
      setFormData(response.data.form_data[0]?.data || [{}]);
    } catch (error) {
      console.error("Form load failed", error);
    } finally {
      LoaderClose();
    }
  };
  useEffect(() => {
    if (selectedOrg && year && togglestatus) {
      if (togglestatus === "Corporate") {
        if (selectedCorp) {
          loadFormData();
          loadFormData2(); // <-- Only load if a corporate is picked
        } else {
          setFormData([{}]);
          setRemoteSchema({});
          setRemoteUiSchema({}); // <-- Clear the form if no corporate is picked
        }
      } else {
        loadFormData();
        loadFormData2(); // Organization tab: always try to load
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
  };

  const customWidgets = useMemo(
    () => ({
      ...widgets,
      TcfdTable: (props) => {
        const handleQ1Change = (updatedQ1) => {
          setFormData((prev) => {
            const newData = [...prev];
            if (!newData[0]) newData[0] = {};
            newData[0].Q1 = updatedQ1;
            return newData;
          });
        };

        return (
          <TcfdTable
            {...props}
            formData={formData?.[0]?.Q1 || []}
            onChange={handleQ1Change}
            riskdata={riskdata}
            BusinessAffected={BusinessAffected}
          />
        );
      },
    }),
    [widgets, riskdata, formData]
  );
  console.log(togglestatus, "set Corporate");
  return (
    <>
      <div
        className="mx-2 pb-11 pt-3 px-3 mb-2 rounded-md mt-8"
        style={{
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        }}
      >
        {(riskdata?.climate_data?.length === 0 ||
          riskdata?.opportunities_data?.length === 0) && (
          <div className="mt-1 mb-4">
            <div className="flex items-start p-2 border-t-2 border-[#F98845] bg-orange-50 rounded">
              <div className="flex-shrink-0">
                <FaExclamationTriangle className="text-[#F98845] w-6 h-6" />
              </div>
              <div className="ml-3">
                <p className="font-bold text-left text-[#0D024D]">
                  Data Missing in Climate-Related Opportunities Section
                </p>
                <p className="text-[12px] text-[#0D024D] mt-1 text-start">
                  To complete this section, please enter the required data in
                  Climate related opportunities section.
                </p>
                <div className="mt-2 text-left flex gap-2">
                  <p className="text-[#0D024D] text-[12px]">Proceed to</p>
                  <div className="text-blue-500 text-sm font-semibold flex flex-wrap items-center gap-2">
                    Collect &gt; Economic &gt;&nbsp;
                    {riskdata?.climate_data?.length === 0 && (
                      <>
                        <span
                          onClick={() => setActiveTab("Climate related Risks")}
                          className="underline cursor-pointer text-blue-600 hover:text-blue-800"
                        >
                          Climate related risks
                        </span>
                        {/* Only show & if both are missing */}
                        {riskdata?.opportunities_data?.length === 0 && (
                          <span className="px-1">&</span>
                        )}
                      </>
                    )}
                    {riskdata?.opportunities_data?.length === 0 && (
                      <span
                        onClick={() =>
                          setActiveTab("Climate Related Opportunities")
                        }
                        className="underline cursor-pointer text-blue-600 hover:text-blue-800"
                      >
                        Climate related opportunities
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mb-2 flex justify-between items-start">
          <h2 className="flex text-[15px] text-neutral-950 font-[500]">
            General Business Impact
            <MdInfoOutline
              data-tooltip-id={`tooltip-employees`}
              data-tooltip-content="This section documents data corresponding to how identified climate-related issues have affected their businesses, strategy, and financial planning. "
              className="mt-1.5 ml-2 text-[15px]"
            />
            <ReactTooltip
              id={`tooltip-employees`}
              place="top"
              effect="solid"
              style={{
                width: "290px",
                backgroundColor: "#000",
                color: "white",
                fontSize: "12px",
                borderRadius: "8px",
                textAlign: "left",
              }}
            />
          </h2>
          <div className="w-[100%] xl:w-[20%]  lg:w-[20%]  md:w-[20%]  2xl:w-[20%]  4k:w-[20%]  2k:w-[20%] h-[26px] mb-4 xl:mb-0 lg:mb-0 md:mb-0 2xl:mb-0 4k:mb-0 2k:mb-0  ">
            <div className="flex xl:float-end lg:float-end md:float-end 2xl:float-end 4k:float-end 2k:float-end float-start gap-2 mb-4 xl:mb-0 lg:mb-0 md:mb-0 2xl:mb-0 4k:mb-0 2k:mb-0">
              <div className="w-[80px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight text-center">
                  TCFD-STG-B
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <p className="text-[13px] text-gray-500">
            For each of the following business areas, describe how
            climate-related issues have influenced your organization's strategy,
            planning, or operations:
          </p>
        </div>

        {riskdata?.climate_data?.length > 0 &&
        riskdata?.opportunities_data?.length > 0 ? (
          <>
            <Form
              schema={r_schema}
              uiSchema={r_ui_schema}
              formData={formData}
              onChange={handleChange}
              validator={validator}
              widgets={customWidgets}
            />
            <div className="mt-4">
              <button
                type="button"
                className={`py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 float-end ${
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
          </>
        ) : (
          <table className="w-full border border-gray-300 text-sm mb-6 opacity-50">
            <thead>
              <tr className="text-[12px] text-gray-800">
                <th className="p-2 border w-1/3 font-medium relative">
                  Climate-related risks/opportunities
                  <MdInfoOutline className="inline ml-1 text-[14px] cursor-pointer align-middle" />
                </th>
                <th className="p-2 border w-1/3 font-medium relative">
                  Business Areas Affected
                  <MdInfoOutline className="inline ml-1 text-[14px] cursor-pointer align-middle" />
                </th>
                <th className="p-2 border w-1/3 font-medium">
                  Impact
                  <MdInfoOutline className="inline ml-1 text-[14px] cursor-pointer align-middle" />
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="border p-2 text-[11px] text-center">
                  Fetched Data..
                </td>
                <td className="border p-2 text-[11px]">
                  <div className="border-b border-gray-300 pb-1">
                    <select
                      className=" px-2 py-1 rounded w-full text-[12px]"
                      disabled
                    >
                      <option value="">Select</option>
                    </select>
                  </div>
                </td>
                <td className="border p-2 text-[11px]">
                  <input
                    type="text"
                    className="w-full p-1 border-b rounded text-[11px]"
                    placeholder="Enter impact"
                    disabled
                  />
                </td>
              </tr>
            </tbody>
          </table>
        )}
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
