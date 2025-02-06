"use client";
import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import inputWidget3 from "../../../../shared/widgets/Input/inputWidget3";
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import { GlobalState } from "@/Context/page";
import axiosInstance from "@/app/utils/axiosMiddleware";
import TextareaWidgetnew from '../../../../shared/widgets/Textarea/TextAreaWidget5';
import RadioWidget2 from '../../../../shared/widgets/Input/radioWidget2'
import MonthPicker from '../../../../shared/widgets/Input/monthPicker'
import DateRangeWidget from '../../../../shared/widgets/Input/dateRangeWidget'
const widgets = {
  inputWidget: inputWidget3,
  TextareaWidgetnew:TextareaWidgetnew,
  RadioWidget2:RadioWidget2,
  DateWidget:MonthPicker,
  DateRangeWidget:DateRangeWidget
};

const view_path = "gri-environment-emissions-base_year";
const client_id = 1;
const user_id = 1;

const schema = {
    type: "array",
    items: {
      type: "object",
      properties: {
        Q1: {
          type: "string",
          title: "What is the selected Base Year for the calculation?",
          startDate: { type: "string", format: "date" },
          endDate: { type: "string", format: "date" },
        },
      },
      dependencies: {
        Q1: {
          oneOf: [
            {
              properties: {
                Q1: {
                    startDate: { type: "string", format: "date" },
                    endDate: { type: "string", format: "date" },
                  minLength: 1, // Ensures Q1 is not empty
                },
                Q2: {
                  type: "string",
                  title: "Describe the rationale for choosing the base year.",
                },
                Q3: {
                  type: "string",
                  title: "Specify the emissions in the Base year (tCO2e)",
                },
                Q4: {
                  type: "string",
                  title: "Have the base year emissions been recalculated?",
                  enum: ["Yes", "No"],
                },
              },
              required: ["Q1"], // Ensures Q1 is required for Q2, Q3, and Q4 to show
            },
          ],
        },
        Q4: {
          oneOf: [
            {
              properties: {
                Q4: {
                  enum: ["Yes"],
                },
                Q5: {
                  type: "string",
                  title: "In which year have the base year emissions been recalculated?",
                },
                Q6: {
                  type: "string",
                  title: "What are the significant changes in emissions that triggered the recalculation of the base year emissions?",
                },
                Q7: {
                  type: "string",
                  title: "Provide the context for base year recalculations. (if applicable)",
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
    "ui:order": ["Q1","Q2","Q3","Q4","Q5","Q6","Q7"],
    Q1: {
        "ui:title":
          "What is the selected Base Year for the calculation?",
        "ui:tooltipstitle":
          "Please specify base year. Base year definition: historical datum (such as year) against which a measurement is tracked over time.",
        "ui:titlediplay": "block",
        "ui:titletooltipdisplay": "block",
        "ui:widget": "DateRangeWidget",
        "ui:options": {
          label: false,
        },
      },
    Q2: {
        "ui:title":
          "Describe the rationale for choosing the base year.",
        "ui:tooltipstitle":
          "Specify the rationale for choosing base year.",
        "ui:titlediplay": "block",
        "ui:titletooltipdisplay": "block",
        "ui:widget": "TextareaWidgetnew",
        "ui:options": {
          label: false,
        },
      },
      Q3: {
        "ui:title":
          "Specify the emissions in the Base year (tCO2e)",
        "ui:tooltip":
          "Please specify the emissions in the base year, whether CO2 , CH4 , N2O, HFCs, PFCs, SF6 , NF3 , or all.",
        "ui:tooltipdisplay": "block",
        "ui:widget": "inputWidget",
        "ui:horizontal": true,
        "ui:options": {
          label: false,
        },
      },
      Q4: {
        "ui:title":
          "Have the base year emissions been recalculated?",
        "ui:tooltip":
          "Please indicate, whether the base year has been recalculated.",
        "ui:tooltipdisplay": "block",
        "ui:widget": "RadioWidget2",
        "ui:horizontal": true,
        "ui:options": {
          label: false,
        },
      },
      Q5: {
        "ui:title":
          "In which year have the base year emission been recalculated.",
        "ui:tooltip":
          "Please specify any significant changes in the emissions that triggered the base year recalculation. ",
        "ui:tooltipdisplay": "block",
        "ui:widget": "DateWidget",
        "ui:horizontal": true,
        "ui:options": {
          label: false,
        },
      },
      Q6: {
        "ui:title":
          "What are the significant changes in emissions that triggered the recalculation of the base year emissions?",
        "ui:tooltipstitle":
          "Please specify any significant changes in the emissions that triggered the base year recalculation.",
          "ui:titlediplay": "block",
          "ui:titletooltipdisplay": "block",
          "ui:widget": "TextareaWidgetnew",
          "ui:options": {
            label: false,
          },
      },
      Q7: {
        "ui:title":
          "Provide the context for base year recalculations. (if applicable)",
        "ui:tooltipstitle":
          "Please explain the context for any significant changes in emissions that triggered recalculations of base year emissions.",
        "ui:titlediplay": "block",
        "ui:titletooltipdisplay": "block",
        "ui:widget": "TextareaWidgetnew",
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

const Screen1 = ({ selectedOrg, year, selectedCorp }) => {
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

  const handleChange = (e) => {
    setFormData(e.formData);
  };
 
  const validateRows = (data) => {
    const errors = {};
    data.forEach((row) => {
      if (!row.Q2 || row.Q2.trim() === "") {
        errors.Q2 = "This field is required";
      }
      if (!row.Q3) {
        errors.Q3 = "This field is required";
      }
      if (!row.Q4) {
        errors.Q4 = "This field is required";
      }
      if (!row.Q5) {
        errors.Q5 = "This field is required";
      }
      if (!row.Q6 || row.Q6.trim() === "") {
        errors.Q6 = "This field is required";
      }
      if (!row.Q7 || row.Q7.trim() === "") {
        errors.Q7 = "This field is required";
      }
    });
    return errors;
  };

//   const validateRows=(data)=>{
//     return data.map((row) => {
//         const rowErrors = {};
  
//         if (!row.Q2 || row.Q2.trim() === "") {
//           rowErrors.Q2 =
//             "This field is required";
//         }
//         if (!row.Q3) {
//             rowErrors.Q3 = "This field is required";
//           }
//           if (!row.Q4) {
//             rowErrors.Q4 = "This field is required";
//           }
//           if (!row.Q5) {
//             rowErrors.Q5 = "This field is required";
//           }
//           if (!row.Q6 || row.Q6.trim() === "") {
//             rowErrors.Q6 = "This field is required";
//           }
//           if (!row.Q7 || row.Q7.trim() === "") {
//             rowErrors.Q7 = "This field is required";
//           }
  
//         return rowErrors;
//   })
// }
  
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
    const errors = validateRows(formData);
    setValidationErrors(errors);
  
    const hasErrors = Object.keys(errors).length > 0;
    if (!hasErrors) {
      updateFormData();
    } else {
      console.log("validation error");
    }
  };

  return (
    <>
      <div className="mx-2 pb-11 pt-3 px-3 mb-6 rounded-md " style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" }}>
        <div className="mb-4 flex">
          <div className="w-[80%] relative">
           <h2 className="flex mx-2 gap-6 text-[15px] text-neutral-950 font-[500]">
           Base year for the calculation (If applicable)
              <MdInfoOutline
                data-tooltip-id={`es25`}
                data-tooltip-html="This section documents the data corresponding to the base year considered for the GHG emission calculation."
                className="text-[14px] mt-1"
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
                GRI 305-1d
                </div>
              </div>
              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                GRI 305-2d
                </div>
              </div>
              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                GRI 305-3e
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
            widgets={{
                ...widgets,
                DateRangeWidget: (props) => (
                    <DateRangeWidget
                      {...props}
                      dateRangeValidation={true} // Pass the prop here
                    />
                  ),

            }}
            formContext={{ validationErrors }}
          />
        </div>
        <div className="mt-4">
          <button
            type="button"
            className={`text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end ${
                (selectedOrg && year) && formData[0].Q1?false:true ? "cursor-not-allowed" : ""
            }`}
            onClick={handleSubmit}
            disabled={(selectedOrg && year) && formData[0].Q1?false:true }
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
