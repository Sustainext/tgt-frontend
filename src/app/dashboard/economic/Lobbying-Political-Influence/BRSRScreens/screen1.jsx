"use client";
import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
// import CustomtextareaTableWidget from "../../../../shared/widgets/Table/CustomtextareaTableWidget";
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import axiosInstance from "@/app/utils/axiosMiddleware";
import AllTableWidget from "../../../../shared/widgets/BRSR/allTableWidget";
const widgets = {
  AllTableWidget: AllTableWidget,
};



const view_path = "gri-economic-anti_competitive_behavior-206-1b-judgements";
const client_id = 1;
const user_id = 1;

const schema = {
    type: "array",
    items: {
      type: "object",
      properties: {
        PublicPolicyAdvocated: {
          type: "string",
          title: "Public Policy Advocated",
        },
  
        MethodResorted : {
          type: "string",
          title: "Method Resorted for Such Advocacy",
        },
        WhetherInformationAvailable : {
          type: "string",
          title: "Whether Information Available in Public Domain?",
          enum:['Yes','No']
        },
        FrequencyofReviewbyBoard: {
          type: "string",
          title: "Frequency of Review by Board",
          enum:['Quarterly','Half-yearly','Annually','Others (please specify)']
        },
        WebLink: {
          type: "string",
          title: "Web Link",
        },
      },
    },
  };
  
  const uiSchema = {
    "ui:widget": "AllTableWidget",
    "ui:options": {
      titles: [
        {
          key: "PublicPolicyAdvocated",
          title: "Public Policy  Advocated",
          tooltip:
            "<p>Disclose the specific issues or topics the company focuses on when contributing to public policy discussions or advocacy efforts.</p>",
          layouttype: "multilinetextbox",
          tooltipdispaly: "block",
        },
        {
          key: "MethodResorted",
          title: "Method Resorted for Such Advocacy",
          tooltip:
            "Provide the details of methods resorted to in each case including affiliation with other similar business entities by forming coalitions, representing through trade chambers, social marketing, etc.",
          layouttype: "multilinetextbox",
          tooltipdispaly: "block",
        },
        {
          key: "WhetherInformationAvailable",
          title: "Whether Information Available in Public Domain?",
          tooltip:
            "Indicate whether information about the public policy advocacy mentioned is available in the public domain.",
          layouttype: "select",
          tooltipdispaly: "block",
        },
         {
          key: "FrequencyofReviewbyBoard",
          title: "Frequency of Review by Board",
          tooltip:
            "Select how often the Board of Directors reviews the company's public policy positions and advocacy efforts.",
          layouttype: "select",
          tooltipdispaly: "block",
        },
         {
          key: "WebLink",
          title: "Web Link",
          tooltip:
            "Provide the link of the document containing details of such public policy position advocated in the public domain, if available.",
          layouttype: "inputWebsite",
          tooltipdispaly: "block",
        },
       
      ],
    },
  };
const Screen1 = ({ selectedOrg, selectedCorp, year,togglestatus }) => {
//   const initialFormData = [
//     {
//       NameofAuthority: "",
//       BriefOftheCase: "",
//       CorrectiveActionTaken: "",
//     },
//   ];
  const [formData, setFormData] = useState([{}]);
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

// useEffect(() => {
//     if (selectedOrg && year && togglestatus) {
//       if (togglestatus === "Corporate" && selectedCorp) {
//         loadFormData();
//       } else if (togglestatus === "Corporate" && !selectedCorp) {
//         setFormData(initialFormData);
//         setRemoteSchema({});
//         setRemoteUiSchema({});
//       } else {
//         loadFormData();
//       }

//       toastShown.current = false;
//     } else {
//       if (!toastShown.current) {
//         toastShown.current = true;
//       }
//     }
//   }, [selectedOrg, year, selectedCorp, togglestatus]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log("Form data:", formData);
    updateFormData();
  };

  const handleAddCommittee = () => {
    const newCommittee =  {
      NameofAuthority: "",
      BriefOftheCase: "",
      CorrectiveActionTaken: "",
    };
    setFormData([...formData, newCommittee]);
  };

  const handleRemoveCommittee = (index) => {
    const newFormData = formData.filter((_, i) => i !== index);
    setFormData(newFormData);
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
            Public Policy Positions
              {/* <MdInfoOutline
                data-tooltip-id={`tooltip-$e18`}
                data-tooltip-content="Mention main outcomes of completed legal actions,
including any decisions or judgements in detail."
                className="mt-1.5 ml-2 text-[15px] w-[20%] xl:w-[5%] md:w-[5%] lg:w-[5%] 2xl:w-[5%] 3xl:w-[5%] 4k:w-[5%] 2k:w-[5%]"
              />
              <ReactTooltip
                id={`tooltip-$e18`}
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
          <div className="w-[100%] xl:w-[20%]  lg:w-[20%]  md:w-[20%]  2xl:w-[20%]  4k:w-[20%]  2k:w-[20%] h-[26px] mb-4 xl:mb-0 lg:mb-0 md:mb-0 2xl:mb-0 4k:mb-0 2k:mb-0  ">
            <div className="flex xl:float-end lg:float-end md:float-end 2xl:float-end 4k:float-end 2k:float-end float-start gap-2 mb-4 xl:mb-0 lg:mb-0 md:mb-0 2xl:mb-0 4k:mb-0 2k:mb-0">
              <div className="w-[80px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-[#18736B] text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                C-P7-LI-1
                </div>
              </div>
            </div>
          </div>
       
        </div>
        <h2 className="flex mx-2 mb-4 text-[14px]">
            Details of Public Policy Positions Advocated By the Organisation:
              <MdInfoOutline
                data-tooltip-id={`tooltip-$e18`}
                data-tooltip-content="This section documents data on details of the key 
public policy issues or topics the organization
 has supported or advocated for, such as 
environmental regulations,
 industry reforms, labor laws, digital data 
protection, or sustainability policies."
                className="mt-1 text-[15px] w-[20%] xl:w-[5%] md:w-[5%] lg:w-[5%] 2xl:w-[5%] 3xl:w-[5%] 4k:w-[5%] 2k:w-[5%]"
              />
              <ReactTooltip
                id={`tooltip-$e18`}
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
        <div className="mx-2">
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
        {/* {(togglestatus === "Corporate" && selectedCorp) ||
        (togglestatus !== "Corporate" && selectedOrg && year) ? (
          <div className="flex right-1 mx-2">
            <button
            type="button"
            className="text-[#007EEF] text-[13px] flex cursor-pointer mt-2 mb-5"
            onClick={handleAddCommittee}
          >
            Add Row <MdAdd className="text-lg" />
          </button>
          </div>
        ) : null} */}
   
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

export default Screen1;
