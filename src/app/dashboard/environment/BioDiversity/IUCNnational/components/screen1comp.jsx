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
  "environment_biodiversity_iucn_national_conservation_list_species_in_affected_areas";
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
        title:
          "Have any species been affected due to significant direct or indirect impacts?",
        enum: ["Yes", "No"],
      },
      col3: {
        type: "string",
        title: "Species Affected",
      },
      col4: {
        type: "string",
        title: "IUCN Red List Species",
        enum: ["Yes", "No"],
      },
      col5: {
        type: "string",
        title: "National Conservation List Species",
        enum: ["Yes", "No"],
      },

      col6: {
        type: "string",
        title: "Level of extinction risk",
        enum: [
          "Critically endangered",
          "Endangered ",
          "Vulnerable",
          "Near threatened",
          "Least concern",
        ],
      },
      col7: {
        type: "string",
        title: "Number of species affected ",
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
          "<p>Select the locations of operations where significant direct or indirect impacts on biodiversity are occurring.</p>",
        layouttype: "locationsearch",
        tooltipdispaly: "block",
      },
      {
        key: "col2",
        title:
          "Have any species been affected due to significant direct or indirect impacts?",
        tooltip:
          "Indicate whether any species are affected due to direct or indirect, positive or negative impacts on biodiversity.  ",
        layouttype: "select",
        tooltipdispaly: "block",
      },
      {
        key: "col3",
        title: "Species Affected",
        tooltip:
          "Identify the species (plants, animals, and other organisms) that are affected by the operations. This could include both species that are positively impacted (such as species that benefit from habitat restoration efforts) and negatively impacted (such as species that are harmed by pollution or habitat destruction)",
        layouttype: "multilinetextbox",
        tooltipdispaly: "block",
        keytack: "col2",
        disable: "col3",
        disableIfNotValue: "Yes",
      },
      {
        key: "col4",
        title: "IUCN Red List Species",
        tooltip:
          "<p>Indicate if the mentioned species are lised in IUCN Red List species.</p> <p>IUCN Red list: <a href=https://www.iucnredlist.org' target='_blank'>https://www.iucnredlist.org/</a></p>.",
        layouttype: "select",
        tooltipdispaly: "block",
      },
      {
        key: "col5",
        title: "National Conservation List Species",
        tooltip:
          "<p>Indicate if the mentioned species are listed in National Conservation list.National conservation list refers to lists of species that are officially recognized by national governments as being threatened, endangered, or requiring conservation efforts.</p>",
        layouttype: "select",
        tooltipdispaly: "block",
      },
      {
        key: "col6",
        title: "Level of extinction risk",
        tooltip:
          "Indicate the level of extinction risk of the species with habitats in areas affected by the operations of the organization.Critically Endangered: Species facing an extremely high risk of extinction in the wild in the immediate future.Endangered: Species facing a very high risk of extinction in the wild in the near future.Vulnerable: Species considered to be facing a high risk of extinction in the wild in the medium term.Near Threatened: Species that do not currently meet the criteria for being endangered or vulnerable but are close to qualifying or are likely to qualify in the near future.Least Concern: Species that have been evaluated and found to be at low ",
        layouttype: "select",
        tooltipdispaly: "block",
      },
      {
        key: "col7",
        title: "Number of species affected ",
        tooltip: "Mention the total number of species affected.",
        layouttype: "inputonlynumber",
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
        formContext={{ locationdata }}
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
