"use client";
import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import RadioWidget2 from "../../../../../shared/widgets/Input/radioWidget2"; // Ensure this path is correct
import "react-tooltip/dist/react-tooltip.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import { GlobalState } from "@/Context/page";
import axiosInstance from "@/app/utils/axiosMiddleware";
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import CustomTableWidget from "@/app/shared/widgets/Table/tableWidget";

const widgets = {
  RadioWidget2: RadioWidget2,
  TableWidget: CustomTableWidget,
};

const view_path = "gri-governance-chair_of_board-2-11-b-chair";
const client_id = 1;
const user_id = 1;

const schema = {
    type: "array",
    items: {
      type: "object",
      properties: {
        Q2: {
          type: "string",
          title: "Is the chair of the highest governance body also a senior executive in the organization?",
          enum: ["Yes", "No"],
        },
      },
      dependencies: {
        Q2: {
          oneOf: [
            {
              properties: {
                Q2: {
                  enum: ["Yes"],
                },
                Q3: {
                  type: "array",
                  title: "If yes, please explain the following:",
                  items: {
                    type: "object",
                    properties: {
                      TheirFunctionWithinTheOrganization: {
                        type: "string",
                        title: "Their function within the organization",
                      },
                      ReasonsForThisArrangement: {
                        type: "string",
                        title: "Reasons for this arrangement",
                      },
                      HowConFlictsArePrevented: { type: "string", title: "How conflicts of interest are prevented and mitigated" },
                    },
                  },
                },
              },
            },
            {
              properties: {
                Q2: {
                  enum: ["No"],
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
      "ui:order": ["Q2", "Q3"],
      Q2: {
        "ui:title": "Is the chair of the highest governance body also a senior executive in the organization?",
        "ui:tooltip": "Indicate whether the chair of the highest governance body is also a senior executive in the organization.",
        "ui:tooltipdisplay": "block",
        "ui:widget": "RadioWidget2",
        "ui:horizontal": true,
        "ui:options": {
          label: false,
        },
      },
      Q3: {
        "ui:widget": "TableWidget",
        "ui:options": {
          titles: [
            {
              title: "Their function within the organization",
              tooltip: "Provide an explanation on the function of the senior executive within the organization’s management.",
            },
            {
              title: "Reasons for this arrangement",
              tooltip: "If the chair of the highest governance body is also a senior executive in the organization; explain the reason for this arrangement.",
            },
            {
              title: "How conflicts of interest are prevented and mitigated",
              tooltip: "Conflict of interest:situation where an individual is confronted with choosing between the requirements of their function in the organization and their other personal or professional interests or responsibilities",
            },
          ],
        },
        "ui:description": " ", // Add this line
        "ui:descriptionClassNames": "mb-4", // Add this line
      },
      "ui:options": {
        orderable: false,
        addable: false,
        removable: false,
        layout: "horizontal",
      },
    },
  };

const ChairOfHighestGovernance = ({ selectedOrg, year, selectedCorp }) => {
  const [formData, setFormData] = useState([{
    Q2: "",
    Q3: [
      {
        TheirFunctionWithinTheOrganization: "",
        ReasonsForThisArrangement: "",
        HowConFlictsArePrevented: "",
      }
    ]
  }]);
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
    let newFormData = { ...e.formData[0] };
    if (newFormData.Q2 === "Yes") {
      // Initialize Q3 as an array with one object if it doesn't exist
      if (!Array.isArray(newFormData.Q3) || newFormData.Q3.length === 0) {
        newFormData.Q3 = [{
            TheirFunctionWithinTheOrganization: "",
            ReasonsForThisArrangement: "",
            HowConFlictsArePrevented: "",
          }];
      }
    } else {
      // If "No" is selected, remove Q3
      delete newFormData.Q3;
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
    setFormData([{
    Q2: "",
    Q3: [
      {
        TheirFunctionWithinTheOrganization: "",
        ReasonsForThisArrangement: "",
        HowConFlictsArePrevented: "",
      }
    ]
  }]);
    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&corporate=${selectedCorp}&organisation=${selectedOrg}&year=${year}`;
    try {
      const response = await axiosInstance.get(url);
      console.log("API called successfully:", response.data);
      setRemoteSchema(response.data.form[0].schema);
      setRemoteUiSchema(response.data.form[0].ui_schema);
      setFormData(response.data.form_data[0].data);
    } catch (error) {
      setFormData([{
    Q2: "",
    Q3: [
      {
        TheirFunctionWithinTheOrganization: "",
        ReasonsForThisArrangement: "",
        HowConFlictsArePrevented: "",
      }
    ]
  }]);
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
    console.log("test form data", formData);
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
        <div className="w-[80%]">
          <h2 className="flex mx-2 text-[17px] text-gray-500 font-semibold">
          Chair of the highest governance body
            <MdInfoOutline
              data-tooltip-id={`tooltip-$e1`}
              data-tooltip-content="This section documents data corresponding to the chair of the highest governance body."
              className="mt-1.5 ml-2 text-[14px]"
            />
            <ReactTooltip
              id={`tooltip-$e1`}
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
        <div className="mx-2 flex">
          <div className="w-[92%] relative">
            <Form
              schema={r_schema}
              uiSchema={r_ui_schema}
              formData={formData}
              onChange={handleChange}
              validator={validator}
              widgets={widgets}
            />
          </div>
          <div className={`${open ? "w-[8%]" : "w-[8%]"}`}>
            <div className={`flex float-end`}>
              <div className="bg-sky-100 h-[25px] w-[70px] rounded-md mx-2 ">
                <p className="text-[#395f81] text-[10px] inline-block align-middle px-2 font-semibold">
                  GRI 2-11-b
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <button
            type="button"
            className={`text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end ${
              !selectedOrg || !year ? "cursor-not-allowed" : ""
            }`}
            onClick={handleSubmit}
            // disabled={!selectedOrg || !year}
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

export default ChairOfHighestGovernance;
