"use client";
import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import GovernanceRowWidget from "../../../../../shared/widgets/Governance/Structure3";
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import axiosInstance from "@/app/utils/axiosMiddleware";
const widgets = {
  GovernanceRowWidget: GovernanceRowWidget,
};

const view_path = "gri-governance-structure-2-9-c-composition";
const client_id = 1;
const user_id = 1;

const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      name: { type: "string", title: "Name" },
      executivePower: {
        type: "string",
        title: "Executive Power",
        enum: [
          "Executive Member",
          "Non-Executive Member",
          "Others (Please specify)",
        ],
      },
      independence: {
        type: "string",
        title: "Independence",
        enum: ["Independent", "Non-Independent"],
      },
      tenure: { type: "string", title: "Tenure On The Governance Body" },
      significantPositions: {
        type: "string",
        title: "Number Of Significant Positions",
      },
      commitmentsHeld: { type: "string", title: "Commitments Held By Member" },
      natureOfCommitments: {
        type: "string",
        title: "The Nature Of Commitments",
      },
      gender: {
        type: "string",
        title: "Gender",
        enum: ["Male", "Female", "Other"],
      },
      underRepresentedGroups: {
        type: "string",
        title: "Under-Represented Social Groups",
      },
      competencies: {
        type: "string",
        title: "Competencies Relevant To The Impacts Of The Organization",
      },
      stakeholderRepresentation: {
        type: "string",
        title: "Stakeholder Representation",
      },
    },
  },
};

const uiSchema = {
  "ui:widget": "GovernanceRowWidget",
  "ui:options": {
    orderable: false,
    titles: [
      {
        title: "Name",
        tooltip: "Mention name of the member of the governance body.",
      },
      {
        title: "Executive Power",
        tooltip: "Please indicate the executive power. ",
      },
      {
        title: "Independence",
        tooltip:
          "Indicate whether the highest governance body members are considered as independent or non-independent.‘Independence’ refers to conditions that enable the <br/>members of the highest governance body toexercise independent judgment free from any external <br/>influence or conflicts of interest.",
      },
      {
        title: "Tenure On The Governance Body",
        tooltip: "Specify the tenure of members <br/>on the governance body",
      },
      {
        title: "Number Of Significant Positions",
        tooltip: " Provide an information on number of significant positions.",
      },
      {
        title: "Commitments Held By Member",
        tooltip:
          "Describe the commitments held by member of the highest governance body.",
      },
      {
        title: "The Nature Of Commitments",
        tooltip: "Describe the nature of commitments",
      },
      {
        title: "Under-Represented Social Groups",
        tooltip:
          "Specify the number of members of the highest governance <br/>body who identify as under-represented groups represented on the board.(e.g., any minority groups etc.).",
      },
      {
        title: "Competencies Relevant To The Impacts Of The Organization",
        tooltip:
          "Describe competencies relevant to the impacts of the organization",
      },
    ],
    executivePower: {
      options: [
        { label: "Executive Member", value: "Executive Member" },
        { label: "Non-Executive Member", value: "Non-Executive Member" },
        { label: "Others (Please specify)", value: "Others (Please specify)" },
      ],
    },
    independence: {
      options: [
        { label: "Independent", value: "Independent" },
        { label: "Non-Independent", value: "Non-Independent" },
      ],
    },
    gender: {
      options: [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
        { label: "Other", value: "Other" },
      ],
    },
  },
};

const CompositionOfHighestGovernanceBody = ({
  selectedOrg,
  selectedCorp,
  year,
  togglestatus,
  tcfdtag,
}) => {
  const [formData, setFormData] = useState([{}]);
  const [r_schema, setRemoteSchema] = useState({});
  const [r_ui_schema, setRemoteUiSchema] = useState({});
  const [loopen, setLoOpen] = useState(false);
  const toastShown = useRef(false);
  const LoaderOpen = () => setLoOpen(true);
  const LoaderClose = () => setLoOpen(false);

  const updateFormData = async () => {
    LoaderOpen();
    const data = {
      client_id,
      user_id,
      path: view_path,
      form_data: formData,
      organisation: selectedOrg,
      corporate: selectedCorp,
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
        throw new Error("Failed to update data");
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
    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&organisation=${selectedOrg}&corporate=${selectedCorp}&year=${year}`;
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

  const handleSubmit = ({ formData }) => {
    console.log("Form data:", formData);
    updateFormData();
  };

  const handleChange = (e) => {
    setFormData(e.formData);
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
              Describe the composition of the highest governance body and its
              committees by the following:
              <MdInfoOutline
                data-tooltip-id={`tooltip-$e166`}
                data-tooltip-content="This section documents data corresponding to the composition of the highest governance body and its committees by executive and non-executive members, independence, tenure of members on the governance body, gender etc."
                className="mt-1.5 ml-2 text-[15px] w-[10%] xl:w-[5%] md:w-[5%] lg:w-[5%] 2xl:w-[5%] 3xl:w-[5%] 4k:w-[5%] 2k:w-[5%]"
              />
              <ReactTooltip
                id={`tooltip-$e166`}
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
                tcfdtag.length === 0 ? "justify-end" : ""
              }`}
            >
              {/* Static GRI tag */}
              <div className="w-[80px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg flex justify-center items-center">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight text-center">
                  GRI 2-9-c
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
            onSubmit={handleSubmit}
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

export default CompositionOfHighestGovernanceBody;
