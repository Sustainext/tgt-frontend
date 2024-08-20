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
import axiosInstance from '@/app/utils/axiosMiddleware'
import MaterialityTableWidget from "../../../../shared/widgets/Table/materialityTableWidget";

const widgets = {
  MaterialityTableWidget:MaterialityTableWidget
 
};

const view_path = "gri-governance-critical_concerns-2-16-a-critical_concerns";
const client_id = 1;
const user_id = 1;

const schema = {
    type: "array",
    items: {
      type: "object",
      properties: {
        MaterialTopic: { type: "string", title: "Material Topic", enum: ["Yes", "No"], },
        ImpactType: {
          type: "string",
          title:
            "Impact Type",
            enum: ["Yes", "No"],
        },
        ImpactOverview: {
          type: "string",
          title: "Impact Overview (if any)",
        }
      },
    },
  };
  
  const uiSchema = {
    "ui:widget": "MaterialityTableWidget",
    "ui:options": {
        titles: [
            {
            key:"MaterialTopic",
              title: "Materia Topic",
              tooltip: "Please specify the total number of incidents of discrimination on grounds  of race, color, sex, religion, political opinion, national extraction and social origin.",
            },
            {
                key:"ImpactType",
              title: "Impact Type",
              tooltip: "Please specify the total number of incidents of discrimination on grounds  of race, color, sex, religion, political opinion, national extraction and social origin. ",
            },
            {
                key:"ImpactOverview",
              title: "Impact overview (if any)",
              tooltip: "Please specify the total number of incidents of discrimination on grounds  of race, color, sex, religion, political opinion, national extraction and social origin.",
            },
          ],
    },
  };

const Table = ({ selectedOrg, year, selectedCorp }) => {
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

    const handleRemoveCommittee = (index) => {
        const newFormData = formData.filter((_, i) => i !== index);
        setFormData(newFormData);
      };

      const handleAddCommittee = () => {
        const newCommittee = {
            MaterialTopic: "",
            ImpactType: "",
            ImpactOverview: "",
        };
        setFormData([...formData, newCommittee]);
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
                // loadFormData();
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

   
    const handleSubmit = (e) => {
        e.preventDefault();
        // updateFormData();
        console.log("test form data", formData);
    };

    return (
        <>
            <div
        className="p-3 mb-6 pb-6 rounded-md shadow-lg mx-2 mt-10"
      >
        <div className="mb-4 flex">
          <div className="w-full relative">
            <h2 className="flex mx-2 text-[15px] mb-2">
            Describe actual and potential, negative and positive impacts on the economy, environment and people including impacts on their human rights.
              <MdInfoOutline
                data-tooltip-id={`tooltip-$e86`}
                data-tooltip-html={
                    
                    `
                    <p>Impact: </p><p>Effect the organization has or could have on the economy including on their human rights, which in turn can indicate its contribution (negative or positive) to sustainable development.</p><p>Human rights: </p><p>Rights inherent to all human beings, which include, at a minimum, the rights set out in the United Nations (UN) International Bill of Human Rights and the principles concerning fundamental rights set out in the International Labour Organization (ILO) Declaration on Fundamental Principles and Rights at Work.</p>
                    `
                }
                className="mt-1.5 ml-2 text-[14px]"
              />
              <ReactTooltip
                id="tooltip-$e86"
                place="bottom"
                effect="solid"
                style={{
                  width: "300px",
                  backgroundColor: "#000",
                  color: "white",
                  fontSize: "12px",
                  boxShadow: 3,
                  borderRadius: "8px",
                }}
              ></ReactTooltip>
            </h2>
          </div>

          <button className="text-[#007EEF] bg-slate-200 rounded-md text-[11px] w-[72px] h-[22px] ml-6 text-center mt-1">
           GRI-3-3-a
          </button>
        </div>
        <div className="mx-2 mb-4">
          <Form
            schema={schema}
            uiSchema={uiSchema}
            formData={formData}
            onChange={handleChange}
            validator={validator}
            widgets={widgets}
            formContext={{
              onRemove: handleRemoveCommittee,
            }}
          />
        </div>
        <div className="flex right-1 mx-2  border-gray-200">
        <button
              type="button"
              className="text-[#007EEF] text-[13px] flex cursor-pointer mt-5 mb-2 mx-2"
              onClick={handleAddCommittee}
            >
             Add row <MdAdd className="text-lg" />
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

export default Table;
