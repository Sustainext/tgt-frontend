"use client";
import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import axiosInstance from "@/app/utils/axiosMiddleware";
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";

import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import MultitypefiledWidget from "../../../../../shared/widgets/Environment/MultitypefiledWidget";
const widgets = {
  MultitypefiledWidget: MultitypefiledWidget,
};

const view_path = "environment_biodiversity_habitat_protected_or_restored";
const client_id = 1;
const user_id = 1;

const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      col1: {
        type: "string",
        title: "Location",
      },

      col2: {
        type: "string",
        title: "Habitat area Protected or restored",
        enum: ["Habitat protected", "Habitat restored"],
      },
      col3: {
        type: "string",
        title: "Size of Habitat Area",
      },
      col4: {
        type: "string",
        title: "Unit",
        enum: [
          "Square meter (m²)",
          "Hectare (ha)",
          "Square kilometer (km²)",
          "Square foot (ft²)",
          "Square yard (yd²)",
          "Acre",
          "Square mile (mi²)",
        ],
      },
      col5: {
        type: "string",
        title: "Partnership with Third Party(s) (Yes/No)",
        enum: ["Yes", "No"],
      },

      col6: {
        type: "string",
        title: "Name of third party(s)",
      },
      col7: {
        type: "string",
        title: "Details of Partnership",
      },
      col8: {
        type: "string",
        title: "Status at the close of Reporting Period",
      },
      col9: {
        type: "string",
        title: "Standards/Methodologies/Assumptions",
      },
      col10: {
        type: "string",
        title:
          "Has the success of the restoration effort been validated by independent external professionals?",
        enum: ["Yes", "No"],
      },
        AssignTo: {
        type: "string",
        title: "Assign To",
      },
      FileUpload: {
        type: "string",
        format: "data-url",
        title: "File Upload",
      },
    },
  },
};

const uiSchema = {
  "ui:widget": "MultitypefiledWidget",
  "ui:options": {
    titles: [
      {
        key: "col1",
        title: "Location",
        tooltip:
          "<p>Select the geographic location of each habitat area that has been protected or restored.</p>",
        layouttype: "locationsearch",
        tooltipdispaly: "block",
        otheroption: "Others (please specify)",
      },
      {
        key: "col2",
        title: "Habitat area Protected or restored",
        tooltip:
          "Indicate whether the mentioned habitat area is protected or restored by the organisation. ",
        layouttype: "select",
        tooltipdispaly: "block",
      },
      {
        key: "col3",
        title: "Size of Habitat Area",
        tooltip:
          "Mention the size of all habitat areas that the organization has protected or restored. This could include both land and water areas.",
        layouttype: "input",
        tooltipdispaly: "block",
      },
      {
        key: "col4",
        title: "Unit",
        tooltip: "Indicate unit for the area. ",
        layouttype: "select",
        tooltipdispaly: "block",
      },
      {
        key: "col5",
        title: "Partnership with Third Party(s) (Yes/No)",
        tooltip:
          "<p>Does the organization work with other groups (like NGOs, government bodies, or local communities) to help protect or restore natural habitats in areas where it is not directly carrying out such activities itself?</p>",
        layouttype: "select",
        tooltipdispaly: "block",
      },
      {
        key: "col6",
        title: "Name of third party(s)",
        tooltip:
          "Please list the names of third-party organizations the company has collaborated with for the protection and restoration of the area.",
        layouttype: "input",
        tooltipdispaly: "block",
        keytack: "col5",
        disable: "col6",
        disableIfNotValue: "Yes",
      },
      {
        key: "col7",
        title: "Details of Partnership",
        tooltip:
          "Details of partnerships: If partnerships exist, provide details on the third parties involved, the nature of the partnerships, and the specific areas or projects covered by the partnerships.",
        layouttype: "multilinetextbox",
        tooltipdispaly: "block",
      },
      {
        key: "col8",
        title: "Status at the close of Reporting Period",
        tooltip:
          "Report the status of each area based on its condition at the close of the reporting period. This could include details on the health of the habitat, the presence of key species, and any ongoing restoration or protection efforts.",
        layouttype: "multilinetextbox",
        tooltipdispaly: "block",
      },
      {
        key: "col9",
        title: "Standards/Methodologies/Assumptions",
        tooltip:
          "Specify if any standards, methodologies or assumptions used to compile information.",
        layouttype: "multilinetextbox",
        tooltipdispaly: "block",
      },
      {
        key: "col10",
        title:
          "Has the success of the restoration effort been validated by independent external professionals?",
        tooltip:
          "Indicate whether the success of the restoration measures was or is approved by independent external professionals. ",
        layouttype: "select",
        tooltipdispaly: "block",
        keytack: "col2", // depends on col2
        disable: "col10", // disables col10
        disableIfNotValue: "Habitat restored",
      },
      {
        key: "AssignTo",
        title: "",
        tooltip: "",
        layouttype: "AssignTo",
        tooltipdispaly: "none",
      },
      {
        key: "FileUpload",
        title: "",
        tooltip: "",
        layouttype: "FileUpload",
        tooltipdispaly: "none",
        scopes: "bio2",
      },
    ],
  },
};

const Screen1comp = ({ selectedOrg, selectedCorp, togglestatus, year }) => {
  const [formData, setFormData] = useState([{}]);
  const [r_schema, setRemoteSchema] = useState({});
  const [r_ui_schema, setRemoteUiSchema] = useState({});
  const [loopen, setLoOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [locationdata, setLocationdata] = useState();
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
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const updateFormData = async () => {
    const data = {
      client_id: client_id,
      user_id: user_id,
      path: view_path,
      form_data: [
        {
          formData: formData,
          selectedOption: selectedOption,
        },
      ],
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
    LoaderOpen();
    setFormData([{}]);
    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&corporate=${selectedCorp}&organisation=${selectedOrg}&year=${year}`;
    try {
      const response = await axiosInstance.get(url);
      console.log("API called successfully:", response.data);
      setRemoteSchema(response.data.form[0].schema);
      setRemoteUiSchema(response.data.form[0].ui_schema);
      const form_parent = response.data.form_data;
      const f_data = form_parent[0].data[0].formData;
      const option_data = form_parent[0].data[0].selectedOption;
      setFormData(f_data);
      setSelectedOption(option_data);
    } catch (error) {
      setFormData([{}]);
      LoaderClose();
    } finally {
      LoaderClose();
    }
  };
  const facthloctiondata = async () => {
    setLocationdata();
    const url = `${process.env.BACKEND_API_URL}/sustainapp/get_location_as_per_org_or_corp/?corporate=${selectedCorp}&organization=${selectedOrg}`;
    try {
      const response = await axiosInstance.get(url);
      console.log("Location data:", response.data);
      setLocationdata(response.data);
    } catch (error) {
      setLocationdata();
    } finally {
      LoaderClose();
    }
  };

  useEffect(() => {
    if (selectedOrg && year && togglestatus) {
      if (togglestatus === "Corporate") {
        if (selectedCorp) {
          loadFormData();
          facthloctiondata();
        } else {
          setFormData([{}]);
          setRemoteSchema({});
          setRemoteUiSchema({});
        }
      } else {
        loadFormData();
        facthloctiondata();
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
      <div className="w-full max-w-xs mb-2 px-2">
        <label className="text-sm leading-5 text-gray-700 flex w-[546px]">
          Has the organization protected or restored any habitat areas?
          <div className="ml-2 relative">
            <MdInfoOutline
              data-tooltip-id={`tooltip-$ebr1`}
              data-tooltip-html="<p>Indicate whether the organisation has protected or restored any habitat areas. This could include both land and water areas.
</p> <p>Area protected:
area that is protected from any harm during operational activities, and where the environment remains in its original state with a healthy and functioning ecosystem.</p>
<p>Area restored:
area that was used during or affected by operational activities, and where remediation
measures have either restored the environment to its original state, or to a state where it has a healthy and functioning ecosystem.</p>"
              className="mt-1.5 ml-2 text-[15px]"
            />
            <ReactTooltip
              id={`tooltip-$ebr1`}
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
                zIndex: 1000,
              }}
            ></ReactTooltip>
          </div>
        </label>
        <select
          className={`block w-[270px] py-2 text-sm leading-6  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300 }`}
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option>Select Yes/No</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      {selectedOption === "yes" && (
        <>
          <div>
            <div>
              <Form
                schema={r_schema}
                uiSchema={r_ui_schema}
                formData={formData}
                onChange={handleChange}
                validator={validator}
                widgets={widgets}
                formContext={{ locationdata,scopes: "bio3" }}
              />
            </div>
          </div>
        </>
      )}
      <div className="mb-6 pb-2">
        <button
          type="button"
          className=" text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end"
          onClick={handleSubmit}
        >
          Submit
        </button>
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

export default Screen1comp;
