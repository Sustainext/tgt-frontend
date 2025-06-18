"use client";
import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import GovernanceWidget from "../../../../../shared/widgets/Governance/Structure2";
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import axiosInstance from "@/app/utils/axiosMiddleware";
const widgets = {
  inputWidget: GovernanceWidget,
};

const view_path = "gri-governance-structure-2-9-b-committees";
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
          "List the committees of the highest governance body that are responsible for decision-making on and overseeing the management of the organization's impacts on the economy, environment and people",
        items: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
    },
  },
};

const uiSchema = {
  items: {
    "ui:order": ["Q1"],
    Q1: {
      "ui:title":
        "List the committees of the highest governance body that are responsible for decision-making on and overseeing the management of the organization's impacts on the economy, environment and people",
      "ui:tooltip":
        "Provide a list of committees of the highest governance body, including those responsible for overseeing the management of the organization's impacts on the economy, environment, and people (e.g., Sustainability Committee, Corporate Social Responsibility Committee etc.).",
      "ui:tooltipdisplay": "block",
      "ui:widget": "inputWidget",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },

    "ui:options": {
      orderable: false,
      addable: true,
      removable: false,
      layout: "horizontal",
    },
  },
};

const CommitteeOfHighestGovernanceBody = ({
  selectedOrg,
  selectedCorp,
  year,
  togglestatus,
  tcfdtag,
}) => {
  const [formData, setFormData] = useState([
    {
      Q1: [["", ""]],
    },
  ]);
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
      console.log("structure formdata", formData);

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
    setFormData([
      {
        Q1: [["", ""]],
      },
    ]);
    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&organisation=${selectedOrg}&corporate=${selectedCorp}&year=${year}`;
    try {
      const response = await axiosInstance.get(url);
      console.log("API called successfully:", response.data);
      setRemoteSchema(response.data.form[0].schema);
      setRemoteUiSchema(response.data.form[0].ui_schema);
      if (response.data.form_data[0].data.length === 0) {
        setFormData([
          {
            Q1: [["", ""]],
          },
        ]);
      } else setFormData(response.data.form_data[0].data);
    } catch (error) {
      setFormData([
        {
          Q1: [["", ""]],
        },
      ]);
    } finally {
      LoaderClose();
    }
  };

useEffect(() => {
    if (selectedOrg && year && togglestatus) {
      if (togglestatus === "Corporate" && selectedCorp) {
        loadFormData();
      } else if (togglestatus === "Corporate" && !selectedCorp) {
        setFormData([
          {
            Q1: [["", ""]],
          },
        ]);
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
        className="mx-2 pb-11 pt-3 px-3 mb-6 rounded-md mt-8 xl:mt-0 lg:mt-0 md:mt-0 2xl:mt-0 4k:mt-0 2k:mt-0 "
        style={{
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        }}
      >
        <div className="xl:mb-4 md:mb-4 2xl:mb-4 lg:mb-4 4k:mb-4 2k:mb-4 mb-6 block xl:flex lg:flex md:flex 2xl:flex 4k:flex 2k:flex">
          <div className="w-[100%] xl:w-[80%] lg:w-[80%] md:w-[80%] 2xl:w-[80%] 4k:w-[80%] 2k:w-[80%] relative mb-2 xl:mb-0 lg:mb-0 md:mb-0 2xl:mb-0 4k:mb-0 2k:mb-0">
           <h2 className="flex mx-2 text-[15px] text-neutral-950 font-[500]">
              Committees of the highest governance body
              <MdInfoOutline
                data-tooltip-id={`tooltip-$e155`}
                data-tooltip-content="This section documents data corresponding to the committees of the highest governance body that are responsible for decision making on and overseeing the management of the organization’s impacts on the economy, environment, and people."
                className="mt-1.5 ml-2 text-[15px]"
              />
              <ReactTooltip
                id={`tooltip-$e155`}
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
           <div className="w-full xl:w-[35%] lg:w-[35%] md:w-[35%] 2xl:w-[35%] 4k:w-[35%] 2k:w-[35%] mb-4">
            <div
              className={`flex flex-wrap gap-2 items-center ${
              tcfdtag.length === 0 ? "justify-end" : "justify-end"
              }`}
            >
              {/* Static GRI tag */}
              <div className="w-[80px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg flex justify-center items-center">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight text-center">
                   GRI 2-9-b
                </div>
              </div>

              {/* Dynamic TCFD tags */}
              {tcfdtag.map((item, index) => (
                <div
                  key={index}
                  className="w-[110px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg flex justify-center items-center"
                >
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight text-center">
                    {item.tagName}
                  </div>
                </div>
              ))}
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

export default CommitteeOfHighestGovernanceBody;
