"use client";
import React, { useState, useEffect, useRef,useImperativeHandle, forwardRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import { GlobalState } from "@/Context/page";
import axiosInstance from "@/app/utils/axiosMiddleware";
import AllTableWidget from "../../../../../shared/widgets/BRSR/allTableWidget";
import {FaExclamationTriangle} from 'react-icons/fa'
const widgets = {
  AllTableWidget: AllTableWidget,
};

const view_path = "brsr-general-business-details-products-services-brsr-a-ii-17";
const client_id = 1;
const user_id = 1;

const schema = {
    type: "array",
    items: {
      type: "object",
      properties: {
        ProductServices : {
          type: "string",
          title: "Product/Services",
        },
  
        NICCode : {
          type: "string",
          title: "NIC Code",
        },
        PercentageTurnOver: {
          type: "string",
          title: "% of total Turnover contributed",
        },
      },
    },
  };
  
  const uiSchema = {
    "ui:widget": "AllTableWidget",
    "ui:options": {
      titles: [
        {
          key: "ProductServices",
          title: "Product/Services",
          tooltip:
            "<p>Disclose the names of top products manufactured or services provided by the listed entity that account for 90% of its turnover (in descending order)</p>",
          layouttype: "input",
          tooltipdispaly: "block",
        },
        {
          key: "NICCode",
          title: "NIC Code",
          tooltip:
            "Mention the NIC (National Industrial Classification) code for the selected product/service",
          layouttype: "inputonlynumber",
          tooltipdispaly: "block",
          inputLimit:'5'
        },
        {
          key: "PercentageTurnOver",
          title: "% of total Turnover contributed",
          tooltip:
            "Indicate the percentage contribution of the mentioned product/service to the total turnover of the entity",
          layouttype: "inputDecimal",
          tooltipdispaly: "block",
        },
       
      ],
    },
  };

const Screen3 = forwardRef(({ selectedOrg, year, selectedCorp,togglestatus }, ref) => {
  const [formData, setFormData] = useState([{}]);
  const [r_schema, setRemoteSchema] = useState({});
  const [r_ui_schema, setRemoteUiSchema] = useState({});
  const [loopen, setLoOpen] = useState(false);
  const toastShown = useRef(false);
  const { open } = GlobalState();
  const [showWarning,setShowWarning] = useState(false)
    const [showPercentage,setShowPercentage] = useState(false)
    const [formContext, setFormContext] = useState({
      validationErrors: {}, // Initialize validation errors
      showPercentage: false // Track if any percentage exceeds 100%
    });
  
    // Update formContext when showPercentage changes
    useEffect(() => {
      setFormContext(prev => ({
        ...prev,
        showPercentage: showPercentage
      }));
    }, [showPercentage]);
    const clearFieldError = (rowIndex, fieldName) => {
      setFormContext(prev => {
        // If no error exists for this field, do nothing
        if (!prev.validationErrors[rowIndex]?.[fieldName]) {
          return prev;
        }
        
        // Create a deep copy of validationErrors
        const newErrors = JSON.parse(JSON.stringify(prev.validationErrors));
        
        // Remove the specific error
        delete newErrors[rowIndex][fieldName];
        
        // If no more errors for this row, remove the row entry
        if (Object.keys(newErrors[rowIndex]).length === 0) {
          delete newErrors[rowIndex];
        }
        
        return {
          ...prev,
          validationErrors: newErrors
        };
      });
    };

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
     let total = 0;
    let hasInvalidRow = false;
    const validationErrors = {};
    
    setShowWarning(false);
    setShowPercentage(false);

    for (let i = 0; i < formData.length; i++) {
      const row = formData[i];
      const value = parseFloat(row.PercentageTurnOver);
      validationErrors[i] = {};

      if (!isNaN(value)) {
        if (value > 100) {
          validationErrors[i].PercentageTurnOver = "Ensure the % of Turnover of the Entity does not exceed 100%";
          setShowPercentage(true);
          hasInvalidRow = true;
        }
        total += value;
      }
    }

    if (total < 90) {
      setShowWarning(true);
      return;
    }

    if (hasInvalidRow) {
      setFormContext(prev => ({ ...prev, validationErrors }));
      return;
    }
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
      console.log("test data",error);
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
    if (togglestatus === "Corporate") {
      if (selectedCorp) {
        loadFormData();           // <-- Only load if a corporate is picked
      } else {
        setFormData([{}]); 
        setRemoteSchema({});
        setRemoteUiSchema({});       // <-- Clear the form if no corporate is picked
      }
    } else {
      loadFormData();             // Organization tab: always try to load
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
  const handleAddNew = () => {
    const newData = [...formData, {}];
    setFormData(newData);
    console.log("Form data newData:", newData);
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
            Products/Services
            </h2>
          </div>

          <div className="w-[100%] xl:w-[20%]  lg:w-[20%]  md:w-[20%]  2xl:w-[20%]  4k:w-[20%]  2k:w-[20%] h-[26px] mb-4 xl:mb-0 lg:mb-0 md:mb-0 2xl:mb-0 4k:mb-0 2k:mb-0  ">
            <div className="flex xl:float-end lg:float-end md:float-end 2xl:float-end 4k:float-end 2k:float-end float-start gap-2 mb-4 xl:mb-0 lg:mb-0 md:mb-0 2xl:mb-0 4k:mb-0 2k:mb-0">
               <div className="w-[90px] h-[26px] p-2 bg-[#0057a50d] bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-[#18736B] text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                 BRSR-A-II-17
                </div>
              </div>
            </div>
          </div>
        </div>
        {(togglestatus === "Corporate" && selectedCorp) ||
        (togglestatus !== "Corporate" && selectedOrg && year) ? (
          <p className="flex mb-4 mx-2 text-sm text-gray-700 relative">
          Products/Services Sold by the Entity (Accounting for 90% of the Entity’s Turnover)
          <MdInfoOutline
            data-tooltip-id={`tooltip-$e1`}
            data-tooltip-content="This section documents data corresponding to products/services 
that contribute to 90% or more of the entity’s total turnover"
            className="mt-1 ml-2 text-[15px]"
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
        </p>
        ) : null}
        {/* {selectedOrg && year && (
          <p className="flex mx-2 text-sm text-gray-700 relative">
            List all entities included in the sustainability report
            <MdInfoOutline
              data-tooltip-id={`tooltip-$e1`}
              data-tooltip-content="Provide a list of all entities included in the sustainability report. "
              className="mt-1.5 ml-2 text-[15px]"
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
          </p>
        )} */}
         {showWarning && (
                   <div className="bg-orange-50 border-l-2 flex items-start gap-4 border-orange-500 p-4 mb-4 text-sm rounded max-w-[800px]">
                               <div className="flex-shrink-0">
                                            <FaExclamationTriangle className="text-[#F98845] w-4 h-4 mt-1" />
                                          </div>
                           <div>
                               {/* <strong className="text-[#0D024D] text-[14px]">Data Missing in Water and Effluents Section</strong><br /> */}
                            <p className="mb-2">As per disclosure requirements, ensure the listed items together account for at least 90% of the entity’s total turnover</p>
                            {/* <strong className="text-[#0D024D] text-[14px]">Proceed to:</strong> */}
                           </div>
                          </div>
                )}
        <div className="mx-2 mb-2">
          <Form
            schema={r_schema}
            uiSchema={r_ui_schema}
            formData={formData}
            onChange={handleChange}
            validator={validator}
            widgets={widgets}
            formContext={{
        ...formContext,
        clearFieldError // Add the error-clearing function
      }}
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
});

export default Screen3;
