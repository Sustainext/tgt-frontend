import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import GovernancetableWidget4 from "../../../../shared/widgets/Governance/governancetableWidget4.js";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import { GlobalState } from "@/Context/page";
import axiosInstance from "@/app/utils/axiosMiddleware";
import BrsrPolicyTableWidget from "../../../../shared/widgets/BRSR/BrsrPolicyTableWidget.js";
const widgets = {
  TableWidget: BrsrPolicyTableWidget,
};

const view_path = "gri-governance-policy_commitments-2-23-a-business_conduct";
const client_id = 1;
const user_id = 1;

const schema = {
  type: "object",
  properties: {
    policyDetails: {
      type: "array",
      items: {
        type: "object",
        properties: {
          P1: { type: "string" },
          P2: { type: "string" },
          P3: { type: "string" },
          P4: { type: "string" },
          P5: { type: "string" },
          P6: { type: "string" },
          P7: { type: "string" },
          P8: { type: "string" },
          P9: { type: "string" },
        },
      },
    },
    reasonsNotCovered: {
      type: "array",
      items: {
        type: "object",
        properties: {
          P1: { type: "string" },
          P2: { type: "string" },
          P3: { type: "string" },
          P4: { type: "string" },
          P5: { type: "string" },
          P6: { type: "string" },
          P7: { type: "string" },
          P8: { type: "string" },
          P9: { type: "string" },
        },
      },
    },
  },
};


const uiSchema = {
  policyDetails: {
    "ui:widget": "TableWidget",
    "ui:options": {
      titles: [
  {
    key: "P1",
    title: "P1",
    layout: "inputDropdown",
    tooltip: "Businesses should conduct and govern themselves with integrity and in a manner that is Ethical, Transparent and Accountable.",
  },
  {
    key: "P2",
    title: "P2",
    layout: "inputDropdown",
    tooltip: "Businesses should provide goods and services in a manner that is sustainable and safe.",
  },
  {
    key: "P3",
    title: "P3",
    layout: "input",
    tooltip: "Businesses should respect and promote the well-being of all employees, including those in their value chains.",
  },
  {
    key: "P4",
    title: "P4",
    layout: "inputDropdown",
    tooltip: "Businesses should respect the interests of and be responsive to all their stakeholders.",
  },
  {
    key: "P5",
    title: "P5",
    layout: "inputDropdown",
    tooltip: "Businesses should respect and promote human rights.",
  },
  {
    key: "P6",
    title: "P6",
    layout: "input",
    tooltip: "Businesses should respect and make efforts to protect and restore the environment.",
  },
  {
    key: "P7",
    title: "P7",
    layout: "input",
    tooltip: "Businesses, when engaging in influencing public and regulatory policy, should do so in a manner that is responsible and transparent.",
  },
  {
    key: "P8",
    title: "P8",
    layout: "input",
    tooltip: "Businesses should promote inclusive growth and equitable development.",
  },
  {
    key: "P9",
    title: "P9",
    layout: "input",
    tooltip: "Businesses should engage with and provide value to their consumers in a responsible manner.",
  }
]
,
      rowLabels: [
        {
          key: "row1",
          title: "Whether your entity’s policy covers one or more principles",
          tooltip: "Answer Yes/No for each principle",
          layout: "inputDropdown",
          options: ["Yes", "No"],
        },
        {
          key: "row2",
          title: "Has the policy been approved by the Board?",
          tooltip: "Board-level approval confirms top-level commitment",
          layout: "inputDropdown",
          options: ["Yes", "No"],
        },
        {
          key: "row3",
          title: "Web Link of the Policy, if available",
          tooltip: "Provide direct URLs if available",
          layout: "input", // <-- text input
        },
        {
          key: "row4",
          title: "Whether the policy covers Value Chain Partners (Y/N)",
          tooltip: "Covers suppliers/vendors/joint ventures",
          layout: "inputDropdown",
          options: ["Yes", "No"],
        },
        {
          key: "row5",
          title: "If the policy was translated into policy into procedures",
          tooltip: "Whether internal SOPs or frameworks were derived",
          layout: "inputDropdown",
          options: ["Yes", "No"],
        },
        {
          key: "row6",
          title: "Web Link of procedures if available",
          tooltip: "Provide URLs to internal policy documents",
          layout: "multiline",
        },
        {
          key: "row7",
          title: "Specific commitments towards stakeholders and their coverage",
          tooltip: "e.g. consumers, employees, communities",
          layout: "multiline",
        },
        {
          key: "row8",
          title: "Performance of the entity against the policy",
          tooltip: "Give qualitative or quantitative metrics",
          layout: "multiline",
        },
      ],
    },
  },



  reasonsNotCovered: {
    "ui:widget": "TableWidget",
    "ui:options": {
      titles: Array.from({ length: 9 }, (_, i) => ({
        key: `P${i + 1}`,
        title: `P${i + 1}`,
        layout: "inputDropdown",
      })),
      rowLabels: [
        {
          key: "row1",
          title:
            "The entity does not consider the Principles material to its business",
          tooltip: "Mark this if principle is not relevant to operations",
          layout: "inputDropdown",
          options: ["Yes", "No"],
        },
        {
          key: "row2",
          title:
            "The entity is not at a stage where it is in a position to formulate a policy on the Principle",
          tooltip: "Mark if policy development is in early stages",
          layout: "inputDropdown",
          options: ["Yes", "No"],
        },
        {
          key: "row3",
          title:
            "The entity does not have the financial or/human and technical resources available for the task",
          tooltip: "Mark if policy development is in early stages",
          layout: "inputDropdown",
          options: ["Yes", "No"],
        },
        {
          key: "row4",
          title: "It is planned to be done in the next financial year",
          tooltip: "Planned development in next FY",
          layout: "inputDropdown",
          options: ["Yes", "No"],
        },
        {
          key: "row5",
          title: "Any other reason (please specify)",
          tooltip: "Provide other reasons where applicable",
          layout: "input",
        },
      ],
    },
  },
};



const Screen1 = ({
  selectedOrg,
  selectedCorp,
  location,
  year,
  month,
  togglestatus,
}) => {
  const initialFormData = {
  policyDetails: [
    {
      P1: "Select",
      P2: "Select",
      P3: "Select",
      P4: "Select",
      P5: "Select",
      P6: "Select",
      P7: "Select",
      P8: "Select",
      P9: "Select",
    },
    {
      P1: "",
      P2: "",
      P3: "",
      P4: "",
      P5: "",
      P6: "",
      P7: "",
      P8: "",
      P9: "",
    },
    {
      P1: "",
      P2: "",
      P3: "",
      P4: "",
      P5: "",
      P6: "",
      P7: "",
      P8: "",
      P9: "",
    },
    {
      P1: "",
      P2: "",
      P3: "",
      P4: "",
      P5: "",
      P6: "",
      P7: "",
      P8: "",
      P9: "",
    },
    {
      P1: "",
      P2: "",
      P3: "",
      P4: "",
      P5: "",
      P6: "",
      P7: "",
      P8: "",
      P9: "",
    },
    {
      P1: "",
      P2: "",
      P3: "",
      P4: "",
      P5: "",
      P6: "",
      P7: "",
      P8: "",
      P9: "",
    },
    {
      P1: "",
      P2: "",
      P3: "",
      P4: "",
      P5: "",
      P6: "",
      P7: "",
      P8: "",
      P9: "",
    },
    {
      P1: "",
      P2: "",
      P3: "",
      P4: "",
      P5: "",
      P6: "",
      P7: "",
      P8: "",
      P9: "",
    },
  ],
  reasonsNotCovered: [
    {
      P1: "Select",
      P2: "Select",
      P3: "Select",
      P4: "Select",
      P5: "Select",
      P6: "Select",
      P7: "Select",
      P8: "Select",
      P9: "Select",
    },
    {
      P1: "Select",
      P2: "Select",
      P3: "Select",
      P4: "Select",
      P5: "Select",
      P6: "Select",
      P7: "Select",
      P8: "Select",
      P9: "Select",
    },
    {
      P1: "",
      P2: "",
      P3: "",
      P4: "",
      P5: "",
      P6: "",
      P7: "",
      P8: "",
      P9: "",
    },
    {
      P1: "",
      P2: "",
      P3: "",
      P4: "",
      P5: "",
      P6: "",
      P7: "",
      P8: "",
      P9: "",
    },
  ],
};

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

  const loadFormData = async () => {
    console.log("loadFormData screen 2");
    LoaderOpen();
    setFormData(initialFormData);
    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&corporate=${selectedCorp}&organisation=${selectedOrg}&year=${year}`;
    try {
      const response = await axiosInstance.get(url);
      console.log("API called successfully:", response.data);
      setRemoteSchema(response.data.form[0].schema);
      setRemoteUiSchema(response.data.form[0].ui_schema);
      setFormData(response.data.form_data[0].data);

      console.log(formData, "afterapi");
    } catch (error) {
      setFormData(initialFormData);
    } finally {
      LoaderClose();
    }
  };

//   useEffect(() => {
//     if (selectedOrg && year && togglestatus) {
//       if (togglestatus === "Corporate" && selectedCorp) {
//         loadFormData();
//       } else if (togglestatus === "Corporate" && !selectedCorp) {
//         setFormData(initialFormData);
//         setRemoteSchema({});
//         setRemoteUiSchema({});
//       } else {
//         loadFormData();
//       }

//       toastShown.current = false;
//     } else {
//       if (!toastShown.current) {
//         toastShown.current = true;
//       }
//     }
//   }, [selectedOrg, year, selectedCorp, togglestatus]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log("Form data:", formData);
    updateFormData();
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
              Policy and Management Processes
              {/* <MdInfoOutline
                data-tooltip-id={`tooltip-$e80`}
                data-tooltip-content="Provide a description of organisation's policy commitments for responsible business conduct."
                className="mt-1.5 ml-2 text-[15px] w-[10%] xl:w-[5%] md:w-[5%] lg:w-[5%] 2xl:w-[5%] 3xl:w-[5%] 4k:w-[5%] 2k:w-[5%]"
              />
              <ReactTooltip
                id={`tooltip-$e80`}
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
              <div className="">
                <div className="text-[#18736B] bg-slate-200 justify-center items-center gap-2 inline-flex w-[70px] h-[26px] p-2  rounded-lg  text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  BRSR-B
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-2">
          <Form
            schema={schema}
            uiSchema={{
      ...uiSchema,
     reasonsNotCovered : { "ui:widget": () => null } // Hide
    }}
            formData={formData}
            onChange={handleChange}
            validator={validator}
            widgets={widgets}
            formContext={{
              view: "0",
               formData: formData
            }}
          />
        </div>
        <h2 className="flex mx-2 text-[15px] text-neutral-950 font-[500] mt-10 mb-4">
              For Each Principle Not Covered by Policy, Select the Applicable Reason(s) From Below
              </h2>
               <div className="mx-2">
          <Form
            schema={schema}
             uiSchema={{
      ...uiSchema,
     policyDetails : { "ui:widget": () => null } // Hide
    }}
            formData={formData}
            onChange={handleChange}
            validator={validator}
            widgets={widgets}
            formContext={{
              view: "0",
               formData: formData
            }}
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

export default Screen1;
