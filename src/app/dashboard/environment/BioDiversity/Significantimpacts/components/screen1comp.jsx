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

const view_path =
  "environment_biodiversity_significant_impacts_on_biodiversity";
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
        title: "Name of product/ Service",
      },
      col3: {
        type: "string",
        title: "Cause of Impact",
        enum: [
          "Construction or use of manufacturing plants mines and transport infrastructure",
          "Pollution (introduction of substances that do not naturally occur in the habitat)",
          " Introduction of invasive species pests & pathogens",
          "Reduction of species",
          "Habitat conversion",
          "Changes in ecological processes outside the natural range of variation (such as salinity or changes in groundwater level)",
        ],
      },
      col4: {
        type: "string",
        title: "Nature of Impact",
        enum: [
          "Direct positive",
          "Direct negative",
          "Indirect positive",
          "Indirect negative",
        ],
      },
      col5: {
        type: "string",
        title: "Describe the Impact",
      },

      col6: {
        type: "string",
        title: "Size ( Extent of area impacted)",
      },
      col7: {
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
      col8: {
        type: "string",
        title: "Duration of Impact",
      },
      col9: {
        type: "string",
        title: "Reversibility/Irreversibility. ",
        enum: ["Reversible", "Irreversible"],
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
          "<p>Identify the operational locations where biodiversity is being significantly impacted, either directly or indirectly.</p>",
        layouttype: "locationsearch",
        tooltipdispaly: "block",
      },
      {
        key: "col2",
        title: "Name of product/ Service",
        tooltip:
          "Mention the name of product/ service resulting in significant direct or indirect, positive or negative impacts on biodiversity. ",
        layouttype: "multilinetextbox",
        tooltipdispaly: "block",
      },
      {
        key: "col3",
        title: "Cause of Impact",
        tooltip:
          "Select the cause of significant direct or indirect impacts on biodiversity resulting from the Organization's activities, products or services. E.g. If the organisation's operations significantly impact biodiversity, either directly (e.g., through construction, pollution, or species reduction) or indirectly (e.g., habitat conversion, invasive species, or altered ecological processes).",
        layouttype: "select",
        tooltipdispaly: "block",
      },
      {
        key: "col4",
        title: "Nature of Impact",
        tooltip:
          "Mention the nature of impact. If it is a significant direct or indirect, positive or negative impacts with reference to species affected, extent of areas impacted, duration of impacts, reversibility or irreversibility of the impacts.",
        layouttype: "select",
        tooltipdispaly: "block",
      },
      {
        key: "col5",
        title: "Describe the Impact",
        tooltip:
          "<p>Describe the impact in detail.Significant impact on biodiversity:impact that can adversely affect the integrity of a geographic area or region, either directly or indirectly, by substantially changing its ecological features, structures, and functions across its whole area, and over the long term, so that habitat, its population levels, and the particular species that make the habitat important cannot be sustained.</p>",
        layouttype: "multilinetextbox",
        tooltipdispaly: "block",
      },
      {
        key: "col6",
        title: "Size ( Extent of area impacted)",
        tooltip:
          "Specify the size of the areas that are affected by the operations. This could include the area directly impacted by the operations (such as the area of land cleared for a construction project) as well as areas indirectly impacted (such as downstream areas affected by pollution).",
        layouttype: "inputonlynumber",
        tooltipdispaly: "block",
      },
      {
        key: "col7",
        title: "Unit",
        tooltip: "Indicate unit for the area.",
        layouttype: "select",
        tooltipdispaly: "block",
      },
      {
        key: "col8",
        title: "Duration of Impact",
        tooltip:
          "Report the length of time that the impacts are expected to last. This could include both the duration of the direct impacts (such as the time it takes for a construction project to be completed) and the duration of any long-term or ongoing impacts (such as the time it takes for a polluted area to recover).",
        layouttype: "alphaNum",
        tooltipdispaly: "block",
      },
      {
        key: "col9",
        title: "Reversibility/Irreversibility",
        tooltip:
          "Reversibility or irreversibility of the impacts: Assess whether the impacts are reversible or irreversible. Reversible impacts can be mitigated or reversed through restoration or other measures, while irreversible impacts cannot be undone. This assessment should consider both the direct and indirect impacts of the operations.",
        layouttype: "select",
        tooltipdispaly: "block",
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
      <Form
        schema={r_schema}
        uiSchema={r_ui_schema}
        formData={formData}
        onChange={handleChange}
        validator={validator}
        widgets={widgets}
        formContext={{ locationdata,scopes: "bio2" }}
      />

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
