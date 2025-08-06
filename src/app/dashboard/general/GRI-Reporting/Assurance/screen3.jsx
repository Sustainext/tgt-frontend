"use client";
import React, { useState, useEffect, useRef,useImperativeHandle, forwardRef  } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import inputWidget2 from "../../../../shared/widgets/Input/inputWidget2";
import TextareaWidget3 from "../../../../shared/widgets/Textarea/TextareaWidget3";
import Textboxwithfileupload from "../../../../shared/widgets/Input/Textboxwithfileupload"
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import RadioWidget2 from "../../../../shared/widgets/Input/radioWidget2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import { GlobalState } from "@/Context/page";
import axiosInstance from '@/app/utils/axiosMiddleware'
import inputWidget from "../../../../shared/widgets/Input/inputWidget6";

const widgets = {
  inputWidget: inputWidget,
  RadioWidget2: RadioWidget2,
  TextareaWidget3:TextareaWidget3,
  Textboxwithfileupload:Textboxwithfileupload,
};

const view_path = "gri-general-assurance-external-2-5-b";
const client_id = 1;
const user_id = 1;

const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      Q1: {
        type: "string",
        title: "Has the organization's sustainability report been externally assured?",
        enum: ["Yes", "No"],
      },
      Q3: {
        type: "string",
        title: "Please describe what has been assured and on what basis",
      },
      Q4: {
        type: "string",
        title: "What is the Assurance Standard used?",
      },
      Q5: {
        type: "string",
        title: "What is the level of Assurance obtained?",
      },
      Q6: {
        type: "string",
        title: "Please describe any limitations of the assurance process",
      },
      Q7: {
        type: "string",
        title: "Please describe the relationship between the organization and the assurance provider",
      },
    },
    dependencies: {
      Q1: {
        oneOf: [
          {
            properties: {
              Q1: {
                enum: ["Yes"],
              },
              Q2: {
                type: "string",
                title: "If yes, please provide a link or reference to the external assurance reports or assurance statements",
              },
               Q8: {
        type: "string",
        title: "What is the name of assurance provider?",
      },

            },
          },
        ],
      },
      
    },
  },
};

const uiSchema = {
  items: {
    "ui:order": ["Q1","Q8", "Q2","Q3","Q4","Q5","Q6","Q7"],
    Q1: {
      "ui:title": "Has the organization's sustainability report been externally assured?",
      "ui:tooltip":
        "Indicate whether the organization's sustainability report has been externally assured.",
      "ui:tooltipdisplay": "block",
      "ui:widget": "RadioWidget2",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    Q2: {
        "ui:hading": "Link/Reference",
        "ui:hadingtooltip": "This section documents data corresponding to the reference of the external assurance report or assurance statement. Include: Link/reference to the external assurance report or assurance statement.",
        "ui:hadingtooltipdisplay": "block",
        "ui:hadingdisplay": "block",
      "ui:title":
        "If yes, please provide a link or reference to the external assurance reports or assurance statements",
      "ui:tooltip":
        "Provide a link or reference  to the external assurance reports or assurance statements",
      "ui:tooltipdisplay": "block",
      "ui:widget": "Textboxwithfileupload",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    Q3: {
        "ui:hading": "What has been assured and on what basis",
        "ui:hadingtooltip": "This section documents data corresponding to what has been assured and on what basis.  ",
        "ui:hadingtooltipdisplay": "block",
        "ui:title":
          "Please describe what has been assured and on what basis",
        "ui:tooltip":
          " Please specify what has been assured and on what basis it has been assured.",
        "ui:tooltipdisplay": "block",
        "ui:widget": "TextareaWidget3",
        "ui:horizontal": true,
        "ui:options": {
          label: false,
        },
      },
      Q4: {
        "ui:hading": "Assurance standard",
        "ui:hadingtooltip": "This section documents data corresponding to the assurance standard used.",
        "ui:hadingtooltipdisplay": "block",
        "ui:title":
          "What is the Assurance Standard used?",
        "ui:tooltip":
          "Please specify the standard used for assurance. ",
        "ui:tooltipdisplay": "block",
        "ui:widget": "TextareaWidget3",
        "ui:horizontal": true,
        "ui:options": {
          label: false,
        },
      },
      Q5: {
        "ui:hading": "Level of assurance",
        "ui:hadingtooltip": "This section documents data corresponding to the level of assurance. ",
        "ui:hadingtooltipdisplay": "block",
        "ui:title":
          "What is the level of Assurance obtained?",
        "ui:tooltip":
          "Please specify the level of assurance obtained. ",
        "ui:tooltipdisplay": "block",
        "ui:widget": "TextareaWidget3",
        "ui:horizontal": true,
        "ui:options": {
          label: false,
        },
      },
      Q6: {
        "ui:hading": "Limitation of the assurance process",
        "ui:hadingtooltip": "This section documents data corresponding to the limitation of the assurance process. ",
        "ui:hadingtooltipdisplay": "block",
        "ui:title":
          "Please describe any limitations of the assurance process",
        "ui:tooltip":
          "Please provide a description of any limitations of the assurance process.  ",
        "ui:tooltipdisplay": "block",
        "ui:widget": "TextareaWidget3",
        "ui:horizontal": true,
        "ui:options": {
          label: false,
        },
      },
      Q7: {
        "ui:hading": "Relationship between organization and the assurance provider ",
        "ui:hadingtooltip": "This section documents data corresponding to the relationship between the organization and the assurance provider",
        "ui:hadingtooltipdisplay": "block",
        "ui:title":
          "Please describe the relationship between the organization and the assurance provider",
        "ui:tooltip":
          "What is the relationship between the organization and the assurance provider?",
        "ui:tooltipdisplay": "block",
        "ui:widget": "TextareaWidget3",
        "ui:horizontal": true,
        "ui:options": {
          label: false,
        },
      },
      Q8: {
        "ui:hading": "",
        "ui:hadingtooltip": "",
        "ui:hadingtooltipdisplay": "none",
        "ui:title":
          "What is the name of assurance provider?",
        "ui:tooltip":
          "Specify the name of external assurance provider",
        "ui:tooltipdisplay": "block",
        "ui:widget": "inputWidget",
        "ui:horizontal": true,
        "ui:options": {
          label: false,
        },
      },
    "ui:options": {
      orderable: false, // Prevent reordering of items
      addable: false, // Prevent adding items from UI
      removable: false, // Prevent removing items from UI
      layout: "horizontal", // Set layout to horizontal
    },
  },
};

const Screen3 = forwardRef(({ selectedOrg, year, selectedCorp,togglestatus,brsrFrameworkId }, ref) => {
  const [formData, setFormData] = useState([{}]);
  const [r_schema, setRemoteSchema] = useState({});
  const [r_ui_schema, setRemoteUiSchema] = useState({});
  const [loopen, setLoOpen] = useState(false);
  const toastShown = useRef(false);
  const { open } = GlobalState();
   const [validationErrors, setValidationErrors] = useState([]);

  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };

   const validateRows = (data) => {
    const errors = {};
    data.forEach((row) => {
      if (!row.Q8 && brsrFrameworkId ==4) {
        errors.Q1 = "This field is required";
      }
    });
    return errors;
  };

  const handleChange = (e) => {
    let newFormData = { ...e.formData[0] };
    if (newFormData.Q1 === "No") {
      newFormData.Q2 = "";

    }
    setFormData([newFormData]);
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
      // if (response.status === 200) {
      //   toast.success("Data added successfully", {
      //     position: "top-right",
      //     autoClose: 3000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "light",
      //   });
      //   LoaderClose();
      //   loadFormData();
      // } else {
      //   toast.error("Oops, something went wrong", {
      //     position: "top-right",
      //     autoClose: 1000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "colored",
      //   });
      //   LoaderClose();
      // }
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
        if (togglestatus === "Corporate" && selectedCorp) {
          loadFormData();
        } else if (togglestatus === "Corporate" && !selectedCorp) {
          setFormData([{}]);
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
  useImperativeHandle(ref, () => updateFormData);
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
            External assurance of sustainability report
              <MdInfoOutline data-tooltip-id={`tooltip-employees`}
                data-tooltip-content="This section documents data corresponding to the
external assurance of the sustainability report. " className="mt-1.5 ml-2 text-[15px]" />
              <ReactTooltip id={`tooltip-employees`} place="top" effect="solid" style={{
                width: "290px", backgroundColor: "#000",
                color: "white",
                fontSize: "12px",
                boxShadow: 3,
                borderRadius: "8px",
                textAlign: 'left',
              }}>
              </ReactTooltip>
            </h2>
          </div>

          <div className="w-[100%] xl:w-[20%]  lg:w-[20%]  md:w-[20%]  2xl:w-[20%]  4k:w-[20%]  2k:w-[20%] h-[26px] mb-4 xl:mb-0 lg:mb-0 md:mb-0 2xl:mb-0 4k:mb-0 2k:mb-0  ">
            <div className="flex xl:float-end lg:float-end md:float-end 2xl:float-end 4k:float-end 2k:float-end float-start gap-2 mb-4 xl:mb-0 lg:mb-0 md:mb-0 2xl:mb-0 4k:mb-0 2k:mb-0">
              <div className="w-[80px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 2-5-b
                </div>
              </div>
               <div className="w-[80px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-[#18736B] text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  BRSR-A-I-14
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
            formContext={{validationErrors}}
          />
        </div>
        {/* <div className="mb-6">
          <button type="button"
            className={`text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end ${!selectedOrg || !year  ? 'cursor-not-allowed' : ''}`}
            onClick={handleSubmit}
            // disabled={!selectedOrg || !year }
            >
            Submit
          </button>
        </div> */}
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
});

export default Screen3;
