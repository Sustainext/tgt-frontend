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
// import MultitypefiledWidget from "../../../../../shared/widgets/Environment/MultitypefiledWidget";
import SelectWidget from '../../../../../shared/widgets/Select/selectWidget5'
const widgets = {
  SelectWidget: SelectWidget,
};

const view_path =
  "environment_biodiversity_location_with_significant_impacts_on_biodiversity_gri101-6d";
const client_id = 1;
const user_id = 1;

const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      AlienInvasion: {
        type: "string",
        title: "How are invasive alien species introduced or potentially introduced by the organisation?",
        enum: [
          "Accidentally",
          "On Purpose",
        ],
        tooltiptext:
          "Indicate the species that are or may be introduced by the organisation. Invasive alien species can be introduced accidentally (e.g., transport, discharge of ballast waters) or on purpose (e.g., for pest control, horticulture, pets, zoological gardens, and aquaria). For example, an organization imports ornamental plants to new areas, which may threaten local biodiversity. Note: Non-invasive alien species are not required to be reported under 101-6-d",
        display: "block",
      },
     
    },
  },
};

const uiSchema = {
  items: {
    classNames: "fieldset",
    "ui:order": [
      "AlienInvasion",
    ],

    AlienInvasion: {
      "ui:title":"How are invasive alien species introduced or potentially introduced by the organisation?",
      "ui:widget": "SelectWidget",  // Dropdown (Select Entry)
      "ui:tooltipstitle": "Indicate the species that are or may be introduced by the organisation. Invasive alien species can be introduced accidentally (e.g., transport, discharge of ballast waters) or on purpose (e.g., for pest control, horticulture, pets, zoological gardens, and aquaria). For example, an organization imports ornamental plants to new areas, which may threaten local biodiversity. Note: Non-invasive alien species are not required to be reported under 101-6-d",
      "ui:titletooltipdisplay": "block",
      "ui:options": {
        label: false,
      },
    },


    "ui:options": {
      orderable: false, // Prevents reordering
      addable: false, // Prevents adding more rows
      removable: false, // Prevents removing fields
      layout: "horizontal", // Maintains layout consistency
    },
  },
};

const Screen4Comp = ({ location, year }) => {
  const [formData, setFormData] = useState([{}]);
//   const [formData, setFormData] = useState({
//     wildSpecies: [{}],
//     waterConsumption: [{}]
//   });
  const [r_schema, setRemoteSchema] = useState({});
  const [r_ui_schema, setRemoteUiSchema] = useState({});
  const [loopen, setLoOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [locationdata, setLocationdata] = useState();
  const toastShown = useRef(false);

  const getAuthToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token")?.replace(/"/g, "");
    }
    return "";
  };
  const token = getAuthToken();

  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };
  const handleChange = (e) => {
    setFormData(e.formData);
  };

  // The below code
  let axiosConfig = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
 

  const loadFormData = async () => {
    LoaderOpen();
    setFormData([{}]);
    setSelectedOption("")
    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&location=${location}&year=${year}`;
    try {
      const response = await axiosInstance.get(url);
      console.log("API called successfully:", response.data);
      setRemoteSchema(response.data.form[0].schema);
      setRemoteUiSchema(response.data.form[0].ui_schema);
const form_parent = response.data.form_data;
      const f_data = form_parent[0].data[0].formData;
      const option_data = form_parent[0].data[0].selectedOption || '';
    //   setFormData({
    //     wildSpecies: fetchedData.wildSpecies || [{}],
    //     waterConsumption: fetchedData.waterConsumption || [{}]
    //   });
      setFormData(f_data);
      setSelectedOption(option_data);
    } catch (error) {
      setFormData([{}]);
      setSelectedOption("")
      LoaderClose();
    } finally {
      LoaderClose();
    }
  };
 

  const updateFormData = async () => {
    LoaderOpen();
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
      location,
      year
    };

    const url = `${process.env.BACKEND_API_URL}/datametric/update-fieldgroup`;
    try {
      const response = await axios.post(url, data, axiosConfig);
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
      console.error(error)
      LoaderClose();
    }
  };

  
  //Reloading the forms -- White Beard
  useEffect(() => {
    //console.long(r_schema, '- is the remote schema from django), r_ui_schema, '- is the remote ui schema from django')
  }, [r_schema, r_ui_schema]);

  // console log the form data change
  useEffect(() => {
    console.log("Form data is changed -", formData);
  }, [formData]);

  // fetch backend and replace initialized forms
  useEffect(() => {
    if (location && year) {
      loadFormData();
      toastShown.current = false; // Reset the flag when valid data is present
    } else {
      // Only show the toast if it has not been shown already
      if (!toastShown.current) {
        toastShown.current = true; // Set the flag to true after showing the toast
      }
    }
    // console.log('From loaded , ready for trigger')
    // loadFormData()
  }, [location, year]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log("Form data:", formData);
    updateFormData();
  };
  return (
    <>
      <div className="w-full max-w-[555px] mb-2 px-2">
        <label className="text-sm leading-5 text-gray-700 flex w-full">
        Does the organization introduce or have the potential to introduce invasive alien species?
          <div className="ml-2 relative">
            <MdInfoOutline
              data-tooltip-id={`tooltip-$ebr1`}
              data-tooltip-html="<p>Indicate whether the organization has introduced, or has the potential to introduce, any invasive alien species.<br/>
Invasive alien species: Invasive alien species are animals, plants, and other organisms that are introduced, accidentally or deliberately by humans, to an area outside of their natural geographical range and cause negative impacts on local biodiversity.</p>"
              className="mt-1 ml-2 text-[15px]"
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
              }}
            ></ReactTooltip>
          </div>
        </label>
        <select
          className={`block  py-1 text-sm leading-6 mb-6  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-2 rounded-md p-2 mt-2 w-full border-gray-300 }`}
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option value=''>Select Yes/No</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      {selectedOption === "yes" && (
        <>
          <div className="mb-4 mt-2">
            <div>
              <Form
                schema={r_schema}
                uiSchema={r_ui_schema}
                // formData.waterConsumption
                formData={formData}
                // onChange={(e) =>
                //     setFormData((prev) => ({ ...prev, waterConsumption: e.formData }))
                //   }
                onChange={handleChange}
                validator={validator}
                widgets={widgets}
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

export default Screen4Comp;
