"use client";
import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import axiosInstance from "@/app/utils/axiosMiddleware";
import GeneralWorkersEmployees from "../../../../../shared/widgets/Table/generalWorkersEmployees";
import MultiselectTableWidget from "../../../../../shared/widgets/Table/MultiselectTableWidget";
// Simple Custom Table Widget
const widgets = {
  TableWidget: MultiselectTableWidget,
};

const view_path = "gri-social-ohs-403-2a-process_for_hazard-new";
const client_id = 1;
const user_id = 1;

const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      GoalsTraget: {
        type: "string",
        title: "Goals or Traget",
        texttype: "text",
      },

      Description: {
        type: "string",
        title: "Description",
        texttype: "text",
      },
      IsScientificConsensus: {
        type: "string",
        title: "Whether these goals and targets are informed by scientific consensus?",
        enum:[
            "Yes","No"
        ]
      },
      ScientificConsensus: {
        type: "string",
        title: "Scientific Consensus",
        texttype: "text",
      },
      BaseYear: {
        type: "string",
        title: "Base Year",
        texttype: "text",
      },
      Indicatorsused: {
        type: "string",
        title: "Indicators used",
        texttype: "text",
      }
    },
  },
};

const uiSchema = {
  "ui:widget": "TableWidget",
  "ui:options": {
    titles: [
      {
        key: "GoalsTraget",
        title: "Goals or target",
        tooltip:
          "Mention organisation's goals or target to halt and reverse biodiversity loss. For example, organisation can use the Science Based Targets Network (SBTN) target-setting tools and guidance or the SBTN and the Taskforce on Nature-related Financial Disclosures (TNFD) Guidance for corporates  on science-based targets for nature.",
          layouttype: "input",
      },
      {
        key: "Description",
        title: "Description",
        tooltip:
          "Provide description of organisation's goals or targets to halt and reverse biodiversity loss.",
          layouttype: "input",
      },
      {
        key: "IsScientificConsensus",
        title: "Whether these goals and targets are informed by scientific consensus?",
        tooltip:
          "Indicate whether the mentioned goals and targets are informed by scientific consensus.",
          layouttype: "select",
      },
      {
        key: "ScientificConsensus",
        title: "Scientific Consensus",
        tooltip:
          "Explain the scientific consensus informed by goals and target.",
          layouttype: "input",
      },
      {
        key: "BaseYear",
        title: "Base year",
        tooltip:
          "Mention the base year for the mentioned goals and targets.",
          layouttype: "input",
      },
      {
        key: "Indicatorsused",
        title: "Indicators used",
        tooltip:
          "Mention the indicators used to evaluate progress of goals and targets.",
        layouttype: "input",
      },
    ],
  },
};
const Screen3comp = ({ selectedOrg, selectedCorp, year, togglestatus }) => {
  const initialFormData = [
    {
        GoalsTraget: "",
        Description: "",
        IsScientificConsensus: "",
        ScientificConsensus: "",
        BaseYear: "",
        Indicatorsused: "",
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
    const data = {
      client_id: client_id,
      user_id: user_id,
      path: view_path,
      form_data: formData,
      location,
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
    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&location=${location}&year=${year}`;
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

//   useEffect(() => {
//      if (selectedOrg && year && togglestatus) {
//        if (togglestatus === "Corporate" && selectedCorp) {
//          loadFormData();
//        } else if (togglestatus === "Corporate" && !selectedCorp) {
//          setFormData([{}]);
//          setRemoteSchema({});
//          setRemoteUiSchema({});
//        } else {
//          loadFormData();
//        }
 
//        toastShown.current = false;
//      } else {
//        if (!toastShown.current) {
//          toastShown.current = true;
//        }
//      }
//    }, [selectedOrg, year, selectedCorp, togglestatus]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log("Form data:", formData);
    updateFormData();
  };

  return (
    <>
      <div
        className="pb-2 mb-6 rounded-md xl:mt-0 lg:mt-0 md:mt-0 2xl:mt-0 4k:mt-0 2k:mt-0"
      >
        <div className="xl:mb-4 md:mb-4 2xl:mb-4 lg:mb-4 4k:mb-4 2k:mb-4 mb-6 block xl:flex lg:flex md:flex 2xl:flex 4k:flex 2k:flex">
          <div className="w-[100%] xl:w-[80%] lg:w-[80%] md:w-[80%] 2xl:w-[80%] 4k:w-[80%] 2k:w-[80%] relative mb-2 xl:mb-0 lg:mb-0 md:mb-0 2xl:mb-0 4k:mb-0 2k:mb-0">
            <h2 className="flex mx-2 text-[14px] text-neutral-950 font-[500]">
            Report the goals and targets to halt and reverse biodiversity loss - 
              {/* <MdInfoOutline
                data-tooltip-id={`tooltip-$e86`}
                data-tooltip-content="This section documents data corresponding to your organization's systematic approach to identifying work-related hazards, assessing their associated risks, and implementing effective control measures to minimize those risks, ensuring a safe and healthy work environment."
                className="mt-1.5 ml-2 text-[15px]"
              />
              <ReactTooltip
                id={`tooltip-$e86`}
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

        
        </div>
        <div className="mx-2">
          <Form
            schema={schema}
            uiSchema={uiSchema}
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
              !location || !year ? "cursor-not-allowed" : ""
            }`}
            onClick={handleSubmit}
            disabled={!location || !year}
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

export default Screen3comp;
