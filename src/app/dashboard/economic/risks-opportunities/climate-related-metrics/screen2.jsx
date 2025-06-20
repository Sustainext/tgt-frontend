"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import inputWidget2 from "../../../../shared/widgets/Input/inputWidget2";
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import RadioWidget2 from "../../../../shared/widgets/Input/radioWidget2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import { GlobalState } from "@/Context/page";
import axiosInstance from "@/app/utils/axiosMiddleware";
import TcfdMetrics from "../../../../shared/widgets/Tcfd/TcfdMetrics";
import { GoArrowRight } from "react-icons/go";
import { FaExclamationTriangle } from "react-icons/fa";
const widgets = {
  inputWidget: inputWidget2,
  RadioWidget2: RadioWidget2,
  TcfdMetrics: TcfdMetrics,
};

const view_path =
  "economic-climate-risks-and-opportunities-climate-related-metrics-screen2";
const client_id = 1;
const user_id = 1;

const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      Q1: {
        type: "array",
        title:
          "Describe how your organization’s strategy is resilient to climate-related risks and opportunities.",
        items: {
          type: "object",
          properties: {
            ClimateRelatedRisk: { type: "string" },
            MetricCategory: { type: "array", items: { type: "string" } },
            KeyMetric: { type: "string" },
            MetricValue: { type: "string" },
            MetricUnit: { type: "string" },
            Scope: { type: "array", items: { type: "string" } },
            HistoricalMetric: { type: "string" },
            HistoricalPeriodCovered: { type: "string" },
            MetricReported: { type: "string" },
            TimeHorizon: { type: "string" },
            MethodologyUsed: { type: "string" },
          },
        },
      },
      Q2: {
        type: "string",
        title: "Has your organization conducted a scenario analysis?",
        enum: ["Yes", "No"],
      },
      Q4: {
        type: "string",
        title: "Are climate metrics tied to performance evaluation?",
        enum: ["Yes", "No"],
      },
    },
    dependencies: {
      Q2: {
        oneOf: [
          {
            properties: {
              Q2: { enum: ["Yes"] },
              Q3: {
                type: "string",
                title:
                  "Describe how these metrics are integrated (Q2 response).",
              },
            },
          },
          {
            properties: {
              Q2: { enum: ["No"] },
            },
          },
        ],
      },
      Q4: {
        oneOf: [
          {
            properties: {
              Q4: { enum: ["Yes"] },
              Q5: {
                type: "string",
                title:
                  "Describe how these metrics are integrated (Q4 response).",
              },
            },
          },
          {
            properties: {
              Q4: { enum: ["No"] },
            },
          },
        ],
      },
    },
  },
};

const uiSchema = {
  items: {
    "ui:order": ["Q1", "Q2", "Q3", "Q4", "Q5"],
    Q1: {
      "ui:widget": "TcfdMetrics",
      "ui:table": [
        {
          key: "ClimateRelatedRisk",
          title: "Climate Related Opportunity",
        },
        {
          key: "MetricCategory",
          title: "Metric Category",
          tooltip:
            "Indicate the appropriate metric category related to the selected climate opportunity.",
          option: [
            "GHG Emissions",
            "Transition Risks",
            "Physical Risks",
            "Reputational risks",
            "Climate Related Opportunities",
            "Capital Deployment",
            "Internal Carbon Prices",
            "Remuneration",
            "Others (please specify)",
          ],
          type: "multiselect",
        },
        {
          key: "KeyMetric",
          title: "Key Metric",
          tooltip:
            "Specify the key metric used to measure the climate-related opportunity.",
          type: "input",
        },
        {
          key: "MetricValue",
          title: "Metric Value",
          tooltip:
            "Enter the value of the metric used to measure the climate-related opportunity.",
          type: "input",
        },
        {
          key: "MetricUnit",
          title: "Metric Unit",
          tooltip: "Select the unit of measurement for the key metric..",
          type: "input",
        },
        {
          key: "Scope",
          title: "Scope",
          tooltip:
            "Specify the scope of the metric, such as GHG emissions, water usage, energy usage, or other relevant categories.",
          option: [
            "Water",
            "Energy",
            "Land Use",
            "Waste Management",
            "Others (please specify)",
          ],
          type: "multiselect",
        },
        {
          key: "HistoricalMetric",
          title: "Historical Metric Reported?",
          tooltip:
            "Indicate if historical data for this metric has been reported.",
          option: ["Yes", "No"],
          type: "select",
        },
        {
          key: "HistoricalPeriodCovered",
          title: "Historical Period Covered",
          tooltip: "If historical data is reported, Provide details.",
          type: "textarea",
        },
        {
          key: "MetricReported",
          title: "Forward-Looking Metric Reported?",
          tooltip:
            "Indicate if forward-looking data for this metric has been reported.",
          option: ["Yes", "No"],
          type: "select",
        },
        {
          key: "TimeHorizon",
          title: "Forward-Looking Time Horizon",
          tooltip: "If forward-looking data is reported, provide details.",
          type: "textarea",
        },
        {
          key: "MethodologyUsed",
          title: "Methodology Used",
          tooltip:
            "Describe the methodology applied to calculate or estimate the metric.",
          type: "textarea",
        },
      ],
    },
    Q2: {
      "ui:title":
        "Has your organization implemented an internal carbon pricing mechanism?",
      "ui:tooltip":
        "Indicate whether your organization applies a monetary value to its greenhouse gas emissions",
      "ui:tooltipdisplay": "block",
      "ui:widget": "RadioWidget2",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    Q3: {
      "ui:title": "If Yes, provide details:",
      "ui:tooltip":
        "Provide details about the climate scenarios used and specify the time frames (short-, medium-, or long-term) over which these scenarios were assessed.",
      "ui:tooltipdisplay": "none",
      "ui:widget": "inputWidget",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    Q4: {
      "ui:title":
        "Does your organization generate revenue from products or services designed for a low-carbon economy?",
      "ui:tooltip":
        "Indicate whether climate related performace metrics are tied to executive or employee compensation",
      "ui:tooltipdisplay": "none",
      "ui:widget": "RadioWidget2",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    Q5: {
      "ui:title": "If Yes, provide details:",
      "ui:tooltip":
        "Provide details about the climate scenarios used and specify the time frames (short-, medium-, or long-term) over which these scenarios were assessed.",
      "ui:tooltipdisplay": "none",
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

const Screen2 = ({ selectedOrg, year, selectedCorp, togglestatus,setActiveTab }) => {
  const [formData, setFormData] = useState([{}]);
  const [r_schema, setRemoteSchema] = useState({});
  const [r_ui_schema, setRemoteUiSchema] = useState({});
  const [loopen, setLoOpen] = useState(false);
  const toastShown = useRef(false);
  const { open } = GlobalState();
  const [riskdata, setRiskdata] = useState();
  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };
  // const handleChange = (e) => {
  //   const newFormData = { ...e.formData[0] };

  //   // Clear Q3 if Q2 is "No"
  //   if (newFormData.Q2 === "No") {
  //     newFormData.Q3 = "";
  //   }

  //   // Only populate Q1 if it's not already set and riskdata is available
  //   if (
  //     (!Array.isArray(newFormData.Q1) || newFormData.Q1.length === 0) &&
  //     Array.isArray(riskdata) &&
  //     riskdata.length > 0
  //   ) {
  //     newFormData.Q1 = riskdata.map((item) =>
  //       typeof item === "string"
  //         ? { ClimateRelatedRisk: item }
  //         : { ClimateRelatedRisk: item["Climate Related Risk"] || "" }
  //     );
  //   }

  //   setFormData([newFormData]);
  // };
  const handleChange = (e) => {
    const updated = Array.isArray(e.formData) ? e.formData : [e.formData];
    let newFormData = { ...updated[0] };

    if (newFormData.Q2 === "No") {
      newFormData.Q3 = "";
    }
    if (newFormData.Q4 === "No") {
      newFormData.Q5 = "";
    }

    // ✅ Merge Q1 if not present from current state
    if (!Array.isArray(newFormData.Q1) && formData?.[0]?.Q1) {
      newFormData.Q1 = formData[0].Q1;
    }

    console.log("formData updated:", newFormData);
    setFormData([newFormData]);
  };
  //   const handleChange = (e) => {
  //     let newFormData = { ...e.formData[0] };
  //     if (newFormData.Q1 === "No") {
  //       newFormData.Q2 = "";
  //     }
  //     setFormData([newFormData]);
  //   };

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
  const loadFormData2 = async () => {
    LoaderOpen();
    setRiskdata();
    const url = `${process.env.BACKEND_API_URL}/tcfd_framework/get-climate-related-data/?organization=${selectedOrg}&corporate=${selectedCorp}&year=${year}`;
    try {
      const response = await axiosInstance.get(url);
      setRiskdata(response.data.data.opportunities_data);
      console.log(response.data.data.opportunities_data, "set data riskdata");
    } catch (error) {
      console.error("Failed to load risk data", error);
    } finally {
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
  if (selectedOrg && year && togglestatus) {
    if (togglestatus === "Corporate") {
      if (selectedCorp) {
        loadFormData();
        loadFormData2();         // <-- Only load if a corporate is picked
      } else {
        setFormData([{}]); 
        setRemoteSchema({});
        setRemoteUiSchema({});       // <-- Clear the form if no corporate is picked
      }
    } else {
        loadFormData();
        loadFormData2();           // Organization tab: always try to load
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

  const customWidgets = useMemo(
    () => ({
      ...widgets,
      TcfdMetrics: (props) => {
        const handleQ1Change = (updatedQ1) => {
          setFormData((prev) => {
            const newData = [...prev];
            if (!newData[0]) newData[0] = {};
            newData[0].Q1 = updatedQ1;
            return newData;
          });
        };

        return (
          <TcfdMetrics
            {...props}
            formData={formData?.[0]?.Q1 || []}
            onChange={handleQ1Change}
            formContext={{ riskdata }}
          />
        );
      },
    }),
    [widgets, riskdata, formData]
  );
  return (
    <>
      <div
        className="mx-2 pb-11 pt-3 px-3 mb-6 rounded-md mt-8 xl:mt-0 lg:mt-0 md:mt-0 2xl:mt-0 4k:mt-0 2k:mt-0 "
        style={{
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        }}
      >
        {!riskdata?.length && (
          <div className="mt-1 mb-4">
            <div className="flex items-start p-2 border-t-2 border-[#F98845] bg-orange-50 rounded">
              <div className="flex-shrink-0">
                <FaExclamationTriangle className="text-[#F98845] w-6 h-6" />
              </div>
              <div className="ml-3">
                <p className="font-bold text-left text-[#0D024D]">
                  Data Missing in Climate-Related Risks Section
                </p>
                <p className="text-[12px] text-[#0D024D] mt-1 text-start">
                  To complete this section, please enter the required data in
                  Climate related risks section.
                </p>
                <div className="mt-2 text-left flex gap-2">
                  <p className="text-[#0D024D] text-[12px]">Proceed to</p>
                  <p className="text-blue-500 text-sm font-semibold flex flex-wrap">
                    Collect &gt; Economic &gt;&nbsp;
                    <span
                      onClick={() => setActiveTab("Climate related Risks")}
                      className="underline cursor-pointer text-blue-600 hover:text-blue-800"
                    >
                      Climate related opportunities
                    </span>
                    <GoArrowRight className="font-bold mt-1 ml-2" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="xl:mb-4 md:mb-4 2xl:mb-4 lg:mb-4 4k:mb-4 2k:mb-4 mb-6 block xl:flex lg:flex md:flex 2xl:flex 4k:flex 2k:flex">
          <div className="w-[100%] xl:w-[80%] lg:w-[80%] md:w-[80%] 2xl:w-[80%] 4k:w-[80%] 2k:w-[80%] relative mb-2 xl:mb-0 lg:mb-0 md:mb-0 2xl:mb-0 4k:mb-0 2k:mb-0">
            <h2 className="flex mx-2 text-[15px] text-neutral-950 font-[500]">
              Metrics used to assess climate related opportunities
              {/* <MdInfoOutline
                data-tooltip-id={`tooltip-employees`}
                data-tooltip-content="This section documents data corresponding to how the organization’s strategy addresses climate-related risks and opportunities. It also explores how resilient your strategy is under different climate scenarios, including transition and physical risks."
                className="mt-1.5 ml-2 text-[15px] w-[10%] xl:w-[5%] md:w-[5%] lg:w-[5%] 2xl:w-[5%] 3xl:w-[5%] 4k:w-[5%] 2k:w-[5%]"
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
                  boxShadow: 3,
                  borderRadius: "8px",
                  textAlign: "left",
                }}
              ></ReactTooltip> */}
            </h2>
          </div>
          <div className="w-[100%] xl:w-[20%]  lg:w-[20%]  md:w-[20%]  2xl:w-[20%]  4k:w-[20%]  2k:w-[20%] h-[26px] mb-4 xl:mb-0 lg:mb-0 md:mb-0 2xl:mb-0 4k:mb-0 2k:mb-0  ">
            <div className="flex xl:float-end lg:float-end md:float-end 2xl:float-end 4k:float-end 2k:float-end float-start gap-2 mb-4 xl:mb-0 lg:mb-0 md:mb-0 2xl:mb-0 4k:mb-0 2k:mb-0">
              <div className="w-[80px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight text-center">
                  TCFD-M&T-A
                </div>
              </div>
            </div>
          </div>
        </div>

        {riskdata?.length > 0 ? (
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
          </>
        ) : (
          <table className="w-full border border-gray-300 text-sm mb-6 opacity-50">
            <thead className="gradient-background">
              <tr className="text-[12px] text-gray-800">
                <th className="p-2 border w-1/4 font-medium relative">
                  Climate Related Risk
                  <MdInfoOutline className="inline ml-1 text-[14px] cursor-pointer align-middle" />
                </th>
                <th className="p-2 border w-1/4 font-medium relative">
                  Metric Category
                  <MdInfoOutline className="inline ml-1 text-[14px] cursor-pointer align-middle" />
                </th>
                <th className="p-2 border w-1/4 font-medium">
                  Key Metric
                  <MdInfoOutline className="inline ml-1 text-[14px] cursor-pointer align-middle" />
                </th>
                <th className="p-2 border w-1/4 font-medium">
                  Metric Value
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

export default Screen2;
