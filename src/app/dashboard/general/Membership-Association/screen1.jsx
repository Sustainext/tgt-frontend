"use client";
import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import axiosInstance from "@/app/utils/axiosMiddleware";
import FileUploadWithAddRowAndCol from "../../../shared/widgets/General/FileUploadWithAddRowAndCol.js";

const widgets = {
  FileUploadWithAddRowAndCols: FileUploadWithAddRowAndCol,
};

const view_path = "gri-general-membership_association-2-28-a-report";
const client_id = 1;
const user_id = 1;

const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      MembershipAssociations: {
        type: "string",
        title: "Report industry associations, other membership associations, and national or international advocacy organizations in which it participates in a significant role."
      }
    }
  }
};


const uiSchema = {
  items: {
    "ui:order": ["MembershipAssociations"],
    MembershipAssociations: {
      "ui:title": "Report industry associations, other membership associations, and national or international advocacy organizations in which it participates in a significant role",
      "ui:tooltip": "Describe an organization's involvement in  industry associations,other membership associations, and national or international advocacy organizations where it plays a significant role.",
      "ui:tooltipdisplay": "block",  // Ensure tooltip is displayed
      "ui:widget": "FileUploadWithAddRowAndCols",  // Use your custom widget
      "ui:horizontal": true,
      "ui:options": {
        label: false
      }
    },
    "ui:options": {
      orderable: false,
      addable: false,
      removable: false,
      layout: "horizontal"
    }
  }
};


const Screen1 = ({ selectedOrg, selectedCorp, year }) => {
  const [formData, setFormData] = useState([{ MembershipAssociations: [[]], fileName: '', fileUrl: '' }]);
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
    LoaderOpen();
    const data = {
      client_id: client_id,
      user_id: user_id,
      path: view_path,
      form_data: formData,
      organisation: selectedOrg,
      corporate: selectedCorp,
      year,
    };

    const url = `${process.env.BACKEND_API_URL}/datametric/update-fieldgroup`;
    try {
      const response = await axiosInstance.post(url, data);
      console.log("structure formdata", formData);

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
    } finally {
      LoaderClose();
    }
  };

  const loadFormData = async () => {
    LoaderOpen();
    // Initialize formData with default values
    setFormData([{ MembershipAssociations: [[]], fileName: '', fileUrl: '' }]);

    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&organisation=${selectedOrg}&corporate=${selectedCorp}&year=${year}`;

    try {
      const response = await axiosInstance.get(url);

      // Check if form_data is present and not empty
      const responseData = response.data.form_data[0].data;
      if (responseData && responseData.length > 0) {
        setFormData(responseData);
      } else {
        // Set formData to default values if response is empty
        setFormData([{ MembershipAssociations: [[]], fileName: '', fileUrl: '' }]);
      }

      // Set schemas
      setRemoteSchema(response.data.form[0].schema);
      setRemoteUiSchema(response.data.form[0].ui_schema);
    } catch (error) {
      console.error("Error loading form data:", error);
      // Set to default values on error
      setFormData([{ MembershipAssociations: [[]], fileName: '', fileUrl: '' }]);
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
    console.log("Form data:", formData);
  };

  return (
    <>
      <div
        className="mx-2 p-3 mb-6 pb-6 rounded-md"
        style={{
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        }}
      >
        <div className="mb-4 flex">
          <div className="w-[80%]"></div>

          <div className="w-[20%]">
            <div className="bg-sky-100 h-[25px] w-[70px] rounded-md mx-2 float-end">
              <p className="text-[#395f81] text-[10px] inline-block align-middle px-2 font-semibold">
                GRI 2-28-a
              </p>
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
