"use client";
import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import { GlobalState } from "@/Context/page";
import axiosInstance from "@/app/utils/axiosMiddleware";
import TextareaWidgetnew from '../../../../../shared/widgets/Textarea/TextAreaWidget5';

const widgets = {
  TextareaWidgetnew:TextareaWidgetnew
};

const view_path = "environment_biodiversity_standards_methodologies_assumptions_and_calculation_tools_used";
const client_id = 1;
const user_id = 1;

const schema = {
    type: "array",
    items: {
      type: "object",
      properties: {
        Q1: {
          type: "string",
          title: "Please mention the standards used while compiling the information for GRI 101 Biodiversity disclosures?",
        },
         Q2: {
          type: "string",
          title: "Please mention the methodologies used while compiling the information for  for GRI 101 Biodiversity disclosures?",
        },
         Q3: {
          type: "string",
          title: "Please mention the assumptions used while compiling the information for  for GRI 101 Biodiversity disclosures?",
        },
      }
    }
  };
  

  const uiSchema = {
    items: {
      "ui:order": ["Q1","Q2","Q3"],
      Q1: {
        "ui:title":
          "Please mention the standards used while compiling the information for GRI 101 Biodiversity disclosures?",
        "ui:tooltipstitle":
          "Here, the organization can describe the methods used and the assumptions made to determine which of its sites and which products and services in its supply chain have the most significant actual and potential impacts on biodiversity. Supply chain: range of activities carried out by entities upstream from the organization, which provide products or services that are used in the development of the organization’s own products or services. Impact: effect the organization has or could have on the economy, environment, and people, including on their human rights, which in turn can indicate its contribution (negative or positive) to sustainable development.",
        "ui:titlediplay": "block",
        "ui:titletooltipdisplay": "none",
        "ui:widget": "TextareaWidgetnew",
        "ui:options": {
          label: false,
        },
      },
       Q2: {
        "ui:title":
          "Please mention the methodologies used while compiling the information for  for GRI 101 Biodiversity disclosures?",
        "ui:tooltipstitle":
          "Here, the organization can describe the methods used and the assumptions made to determine which of its sites and which products and services in its supply chain have the most significant actual and potential impacts on biodiversity. Supply chain: range of activities carried out by entities upstream from the organization, which provide products or services that are used in the development of the organization’s own products or services. Impact: effect the organization has or could have on the economy, environment, and people, including on their human rights, which in turn can indicate its contribution (negative or positive) to sustainable development.",
        "ui:titlediplay": "block",
        "ui:titletooltipdisplay": "none",
        "ui:widget": "TextareaWidgetnew",
        "ui:options": {
          label: false,
        },
      },
       Q3: {
        "ui:title":
          "Please mention the assumptions used while compiling the information for  for GRI 101 Biodiversity disclosures?",
        "ui:tooltipstitle":
          "Here, the organization can describe the methods used and the assumptions made to determine which of its sites and which products and services in its supply chain have the most significant actual and potential impacts on biodiversity. Supply chain: range of activities carried out by entities upstream from the organization, which provide products or services that are used in the development of the organization’s own products or services. Impact: effect the organization has or could have on the economy, environment, and people, including on their human rights, which in turn can indicate its contribution (negative or positive) to sustainable development.",
        "ui:titlediplay": "block",
        "ui:titletooltipdisplay": "none",
        "ui:widget": "TextareaWidgetnew",
        "ui:options": {
          label: false,
        },
      },
      "ui:options": {
        orderable: false,
        addable: false,
        removable: false,
        layout: "horizontal"
      }
    }
  };
  

const Screen1Comp = ({ selectedOrg, year, selectedCorp, togglestatus }) => {
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
  if (selectedOrg && year && togglestatus) {
    if (togglestatus === "Corporate") {
      if (selectedCorp) {
        loadFormData();           // <-- Only load if a corporate is picked
      } else {
        setFormData([{}]); 
        setRemoteSchema({});
        setRemoteUiSchema({});       // <-- Clear the form if no corporate is picked
      }
    } else {
      loadFormData();             // Organization tab: always try to load
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

  return (
    <>
      <div
        className="pb-2 mb-6 rounded-md xl:mt-0 lg:mt-0 md:mt-0 2xl:mt-0 4k:mt-0 2k:mt-0"
      >
        {/* <div className="xl:mb-4 md:mb-4 2xl:mb-4 lg:mb-4 4k:mb-4 2k:mb-4 mb-6 block xl:flex lg:flex md:flex 2xl:flex 4k:flex 2k:flex">
          <div className="w-[100%] xl:w-[80%] lg:w-[80%] md:w-[80%] 2xl:w-[80%] 4k:w-[80%] 2k:w-[80%] relative mb-2 xl:mb-0 lg:mb-0 md:mb-0 2xl:mb-0 4k:mb-0 2k:mb-0">
            <h2 className="flex mx-2 text-[14px] text-neutral-950 font-[500]">
            Does the organization have a formal biodiversity policy or commitments?
              <MdInfoOutline
                data-tooltip-id={`es30`}
                data-tooltip-html="Indicate whether the organisation have a formal biodiversity policy or commitment to halt and reverse biodiversity loss."
                className="mt-1.5 ml-2 text-[15px] w-[20%] xl:w-[5%] md:w-[5%] lg:w-[5%] 2xl:w-[5%] 3xl:w-[5%] 4k:w-[5%] 2k:w-[5%]"
              />
              <ReactTooltip
                id={`es30`}
                place="top"
                effect="solid"
                style={{
                  width: "390px",
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
          <div className="w-[100%] xl:w-[20%]  lg:w-[20%]  md:w-[20%]  2xl:w-[20%]  4k:w-[20%]  2k:w-[20%] h-[26px] mb-4 xl:mb-0 lg:mb-0 md:mb-0 2xl:mb-0 4k:mb-0 2k:mb-0  ">
            <div className="flex xl:float-end lg:float-end md:float-end 2xl:float-end 4k:float-end 2k:float-end float-start gap-2 mb-4 xl:mb-0 lg:mb-0 md:mb-0 2xl:mb-0 4k:mb-0 2k:mb-0">
              <div className="w-[80px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 205-3d
                </div>
              </div>
            </div>
          </div>
        </div> */}
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

export default Screen1Comp;
