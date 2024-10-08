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
const widgets = {
  TableWidget: GovernancetableWidget4,
};

const view_path = "gri-governance-policy_commitments-2-23-a-business_conduct";
const client_id = 1;
const user_id = 1;

const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      column1: { type: "string", title: "Policy Commitment" },
      column2: {
        type: "string",
        title:
          "Level at which the policy commitments was approved within the organization",
      },
    },
  },
};

const uiSchema = {
  "ui:widget": "TableWidget",
  "ui:options": {
    titles: [
      {
        key: "column1",
        title: "column1",
        type: "text",
        display: "none",
      },
      {
        key: "column2",
        title: "column2",
        type: "text",
        display: "none",
        tooltip:
          "Indicate whether the given conflict of interest are disclosed to stakeholders.",
      },
    ],
    rowLabels: [
      {
        key: "text1",
        title: "Overall",
        tooltip:
          "If the organisation's policy commitment covers all internationally recognized human rights, a brief statement of this fact is sufficient to comply with the requirement. The organization can also state if the policy commitment references certain rights that require particular attention.",
        display: "none",
        type: "text",
        file: "yes",
      },
      {
        key: "text2",
        title:
          "Authoritative governmental instruments that the commitments reference",
        tooltip:
          "See the Bibliographies of the GRI Standards for a list of authoritative intergovernmental instruments for responsible business conduct.",
        display: "block",
        type: "text",
        file: "yes",
      },
      {
        key: "text3",
        title: "Whether the commitments stipulate conducting due diligence",
        tooltip:
          "Due diligence: Process to identify, prevent, mitigate, and account for how the organization addresses its actual and potential negative impacts.",
        display: "block",
        type: "select",
        file: "yes",
        selectoption: ["Yes", "No", "NA"],
      },
      {
        key: "text4",
        title:
          "Whether the commitments stipulate applying the precautionary principle",
        tooltip:
          "The precautionary principle means taking early action to prevent and mitigate potential negative impacts in situations where conclusive scientific understanding or evidence is lacking, but there is sufficient reason to expect serious or irreversible damage. (The precautionary principle is set out in Principle 15 of the UN Rio Declaration on Environment and Development.)",
        display: "block",
        type: "select",
        file: "yes",
        selectoption: ["Yes", "No", "NA"],
      },
      {
        key: "text5",
        title: "Whether the commitments stipulate respecting human rights",
        tooltip:
          "If the organisation's policy commitment covers all internationally recognized human rights, a brief statement of this fact is sufficient to comply with the requirement. The organization can also state if the policy commitment references certain rights that require particular attention.",
        display: "none",
        type: "select",
        file: "yes",
        selectoption: ["Yes", "No", "NA"],
      },
    ],
  },
};

const Screen1 = ({ selectedOrg, selectedCorp, location, year, month }) => {
  const initialFormData = [
    {
      column1: "",
      column2: "",
      column1_details: "",
      fileUrl: "",
      fileName: "",
    },
    {
      column1: "",
      column2: "",
      column1_details: "",
      fileUrl: "",
      fileName: "",
    },
    {
      column1: "",
      column2: "",
      column1_details: "",
      fileUrl: "",
      fileName: "",
    },
    {
      column1: "",
      column2: "",
      column1_details: "",
      fileUrl: "",
      fileName: "",
    },
    {
      column1: "",
      column2: "",
      column1_details: "",
      fileUrl: "",
      fileName: "",
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
    e.preventDefault(); // Prevent the default form submission
    console.log("Form data:", formData);
    updateFormData();
  };

  return (
    <>
      <div
        className="mx-2 p-3 mb-6 rounded-md"
        style={{
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        }}
      >
        <div className="mb-4 flex">
          <div className="w-[80%] relative">
            <h2 className="flex mx-2 text-[15px] text-[#344054] font-[500]">
              Describe the organization's policy commitments for "responsible
              business conduct", including:
              <MdInfoOutline
                data-tooltip-id={`tooltip-$e80`}
                data-tooltip-content="Provide a description of organisation's policy commitments for responsible business conduct."
                className="mt-1.5 ml-2 text-[15px]"
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
              ></ReactTooltip>
            </h2>
          </div>

          <div className="w-[20%]">
            <div className="float-end">
              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 2-23-a
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
            formContext={{
              view: "0",
            }}
          />
        </div>

        <div className="mb-6">
          <button
            type="button"
            className={`text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end ${
              !selectedOrg || !year ? "cursor-not-allowed" : ""
            }`}
            onClick={handleSubmit}
            disabled={!selectedOrg || !year}
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
