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

const view_path = "brsr-governance-independent-assessment-by-external-agency-brsr-b";
const client_id = 1;
const user_id = 1;

const schema = {
  type: "object",
  properties: {
    independentAssessmentTable: {
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
      minItems: 13,
      maxItems: 13,
    },
  },
};
 
// uiSchema.js
const uiSchema = {
  independentAssessmentTable: {
    "ui:widget": "TableWidget",
    "ui:options": {
      sectionTitles: [
        "Independent Assessment/ Evaluation of the Policies by an External Agency",
      ],
 
      titles: [
        {
          key: "P1",
          title: "P1",
          layout: "inputDropdown",
         },
        {
          key: "P2",
          title: "P2",
          layout: "inputDropdown",
          },
        {
          key: "P3",
          title: "P3",
          layout: "input",
          },
        {
          key: "P4",
          title: "P4",
          layout: "inputDropdown",
         },
        {
          key: "P5",
          title: "P5",
          layout: "inputDropdown",
         },
        {
          key: "P6",
          title: "P6",
          layout: "input",
         },
        {
          key: "P7",
          title: "P7",
          layout: "input",
          },
        {
          key: "P8",
          title: "P8",
          layout: "input",
          },
        {
          key: "P9",
          title: "P9",
          layout: "input",
          },
      ],
 
      // 8+5=13 rows (index 0-7: policy, 8-12: reason)
      rowLabels: [
        {
          key: "row1",
          title: "Has the entity carried out independent assessment/evaluation of the working of its policies by an external agency?",
          tooltip: "",
          tooltipshow: "none",
          layout: "inputDropdown",
          options: ["Yes", "No"],
          section: 0,
        },
        {
          key: "row2",
          title: "If yes, provide name of the agency.",
          tooltip: "",
          tooltipshow: "none",
          tooltipshow: "none",
          layout: "input",
          section: 0,
        },
      ],
    },
  },
};





const Screen3 = ({
  selectedOrg,
  selectedCorp,
  location,
  year,
  month,
  togglestatus,
}) => {
 const initialFormData = {
  independentAssessmentTable: Array(2)
    .fill()
    .map(() => ({
      P1: "",
      P2: "",
      P3: "",
      P4: "",
      P5: "",
      P6: "",
      P7: "",
      P8: "",
      P9: "",
    })),
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
      form_data: Array.isArray(formData) ? formData : [formData],
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
      setFormData(response.data.form_data[0].data[0]);

      console.log(formData, "afterapi");
    } catch (error) {
      setFormData(initialFormData);
    } finally {
      LoaderClose();
    }
  };

  useEffect(() => {
    if (selectedOrg && year && togglestatus) {
      if (togglestatus === "Corporate" && selectedCorp) {
        loadFormData();
      } else if (togglestatus === "Corporate" && !selectedCorp) {
        setFormData(initialFormData);
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
         {Object.keys(r_schema || {}).length == 0 && (
  <h2 className="flex justify-between mx-2 text-[15px] text-neutral-950 font-[500] mt-5 mb-4">
   Independent Assessment/ Evaluation of the Policies by an External Agency
    <div className="float-end">
      <div className="text-[#18736B] bg-slate-200 justify-center items-center gap-2 inline-flex w-[70px] h-[26px] p-2  rounded-lg  text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
        BRSR-B
      </div>
    </div>
  </h2>
)}
        <Form
          schema={r_schema}
          uiSchema={r_ui_schema}
          formData={formData}
          onChange={handleChange}
          validator={validator}
          widgets={widgets}
          formContext={{
            tableName: "independentAssessmentTable",
            formData: formData,
          }}
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

export default Screen3;
