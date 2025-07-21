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
import BioDiversityTwoTableWidget from "../../../../../shared/widgets/Environment/BioDiversityTwoTableWidget";
const widgets = {
  BioDiversityTwoTableWidget: BioDiversityTwoTableWidget,
};

const view_path =
  "environment_biodiversity_location_with_significant_impacts_on_biodiversity_gri101-6b";
const client_id = 1;
const user_id = 1;

const schema = {
  type: "object",
  properties: {
    wildSpecies: {
      type: "array",
      items: {
        type: "object",
        properties: {
          Type: {
            type: "string",
            title: "Type",
            enum: [
              "Plant",
              "Animal",
              "Fungi",
              "Coral",
              "Others (please specify)",
            ],
          },

          HarvestedWildSpecies: {
            type: "string",
            title: "Harvested Wild Species",
          },
          Quantity: {
            type: "string",
            title: "Quantity",
          },
          ExtinctionRisk: {
            type: "string",
            title: "Extinction Risk",
            enum: [
              "Least Concern",
              "Near Threatened",
              "Vulnerable",
              "Endangered",
              "Critically Endangered",
              "Extinct in the Wild",
              "Extinct",
            ],
          },
        },
      },
    },
    waterConsumption: {
      type: "array",
      items: {
        type: "object",
        properties: {
          WaterWithdrawal: {
            type: "string",
            title: "Water Withdrawal",
          },

          WaterConsumption: {
            type: "string",
            title: "Water Consumption",
          },
          Unit: {
            type: "string",
            title: "Unit",
            enum: [
              "Liter",
              "Megalitre",
              "Cubic meter",
              "Kiloliter",
              "Milion litres per day",
            ],
          },
        },
      },
    },
  },
  dependencies: {
    wildSpecies: {},
    waterConsumption: {},
  },
};

const uiSchema = {
  wildSpecies: {
    "ui:widget": "BioDiversityTwoTableWidget",
    "ui:options": {
      titles: [
        {
          key: "Type",
          title: "Type",
          tooltip: "<p>Please specify the type of wild species harvested</p>",
          layouttype: "select",
          tooltipdispaly: "block",
        },
        {
          key: "HarvestedWildSpecies",
          title: "Harvested Wild Species",
          tooltip:
            "Provide information on wild species harvested at the selected location. Harvesting wild species means collecting, catching, or hunting wild animals, plants, or fungi including any taken by accident as part of the organization’s activities.",
          layouttype: "input",
          tooltipdispaly: "block",
        },
        {
          key: "Quantity",
          title: "Quantity",
          tooltip:
            "Provide details on total quantity of wild species harvested.",
          layouttype: "alphaNum",
          tooltipdispaly: "block",
        },
        {
          key: "ExtinctionRisk",
          title: "Extinction Risk",
          tooltip:
            "<p>Indicate the level of extinction risk of the species harvested.<br/> Critically Endangered: Species facing an extremely high risk of extinction in the wild in the immediate future.<br/> Endangered: Species facing a very high risk of extinction in the wild in the near future.<br/> Vulnerable: Species considered to be facing a high risk of extinction in the wild in the medium term.<br/> Near Threatened: Species that do not currently meet the criteria for being endangered or vulnerable but are close to qualifying or are likely to qualify in the near future.<br/> Least Concern: Species that have been evaluated and found to be at low risk of extinction. They are widespread and abundant.<br/> Extinct in the Wild: Survives only in captivity or outside its natural habitat; no individuals left in the wild.<br/> Extinct: No known individuals remaining anywhere. </p>",
          layouttype: "select",
          tooltipdispaly: "block",
        },
      ],
    },
  },
  waterConsumption: {
    "ui:widget": "BioDiversityTwoTableWidget",
    "ui:options": {
      titles: [
        {
          key: "WaterWithdrawal",
          title: "Water withdrawal",
          tooltip:
            "<p>What is the total amount of water withdrawn at the site?<br/> Water withdrawal: sum of all water drawn from surface water, groundwater, seawater, or a third party for any use over the course of the reporting period.</p>",
          layouttype: "inputDecimal",
          tooltipdispaly: "block",
        },
        {
          key: "WaterConsumption",
          title: "Water Consumption",
          tooltip:
            "<p>What is the total water consumption at the site?<br/> Water consumption: sum of all water that has been withdrawn and incorporated into products, used in the production of crops or generated as waste, has evaporated, transpired, or been consumed by humans or livestock, or is polluted to the point of being unusable by other users, and is therefore not released back to surface water, groundwater, seawater, or a third party over the course of the reporting period.</p>",
          layouttype: "inputDecimal",
          tooltipdispaly: "block",
        },
        {
          key: "Unit",
          title: "Unit",
          tooltip:
            "Select the correct unit corresponding to the quantity of water withdrawal/consumption.",
          layouttype: "select",
          tooltipdispaly: "block",
        },
      ],
    },
  },
  "ui:options": {
    orderable: false,
    addable: false,
    removable: false,
    layout: "horizontal",
  },
};

const Screen2Comp = ({ location, year,handleTabClick }) => {
  const [r_schema, setRemoteSchema] = useState({});
  const [r_ui_schema, setRemoteUiSchema] = useState({});
  const [apiDataAvailable, setApiDataAvailable] = useState(false);
  const [isMaterialTopic, setIsMaterialTopic] = useState(false);
  const [formData, setFormData] = useState({
    wildSpecies: [{}],
    waterConsumption: [{}],
  });
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
  const handleFormChange = (formKey) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [formKey]: e.formData,
    }));
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const loadFormData = async () => {
    LoaderOpen();
    // setFormData({
    //   wildSpecies: [{}],
    //   waterConsumption: [{}],
    // });
    setSelectedOption("");
    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&location=${location}&year=${year}`;
    try {
      const response = await axiosInstance.get(url);
      console.log("API called successfully:", response.data);
      
      setRemoteSchema(response.data.form[0].schema);
      setRemoteUiSchema(response.data.form[0].ui_schema);
      setIsMaterialTopic(response.data.is_water_material_topic);

      const form_parent = response.data.form_data || [];
      const waterData = response.data.water_analyze_data || {};
      const hasWaterData =
        waterData.water_withdrawal !== "" ||
        waterData.water_consumption !== "" ||
        waterData.water_unit !== "";

      let newFormData={
        wildSpecies: [{}],
        waterConsumption: [{}],
      };
      // Set API availability flag
      if (hasWaterData) {
        setApiDataAvailable(true);
      }
      else{
        setApiDataAvailable(false);
      }

      if (form_parent.length > 0) {
       
        const f_data = form_parent[0]?.data?.[0]?.formData || {
        wildSpecies: [{}],
        waterConsumption: [{}],
      };
      if(!f_data.waterConsumption[0].WaterWithdrawal && hasWaterData){
        f_data.waterConsumption= [
            {
              WaterWithdrawal: waterData.water_withdrawal || "",
              WaterConsumption: waterData.water_consumption || "",
              Unit: waterData.water_unit || "",
            },
          ]
      }
        newFormData=f_data
      } else if (hasWaterData) {
       
        const fallbackFormData = {
          wildSpecies: [{}],
          waterConsumption: [
            {
              WaterWithdrawal: waterData.water_withdrawal || "",
              WaterConsumption: waterData.water_consumption || "",
              Unit: waterData.water_unit || "",
            },
          ],
        };
       
        newFormData=fallbackFormData
      }
      
      setFormData(newFormData);
      const option_data = form_parent[0]?.data[0]?.selectedOption || "";
      setSelectedOption(option_data);
    } catch (error) {
      setFormData({
        wildSpecies: [{}],
        waterConsumption: [{}],
      });
      setSelectedOption("");
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
      year,
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
      LoaderClose();
    }
  };

  //Reloading the forms -- White Beard
  // useEffect(() => {
  //   //console.long(r_schema, '- is the remote schema from django), r_ui_schema, '- is the remote ui schema from django')
  // }, [r_schema, r_ui_schema]);

  // console log the form data change

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
      <div className="w-full max-w-[546px] mb-2 px-2">
        <label className="text-sm leading-5 text-gray-700 flex w-full">
          Do the organization’s activities lead to the exploitation of natural
          resources?
          <div className="ml-2 relative">
            <MdInfoOutline
              data-tooltip-id={`tooltip-$ebr1`}
              data-tooltip-html="<p>Indicate whether your organization currently uses or could use natural resources in a way that may deplete or damage them (e.g. water, minerals, plants, animals etc.)</p>"
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
          <option>Select Yes/No</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      {selectedOption === "yes" && (
        <>
          <div className="mb-4 mt-2">
            <label className="text-sm leading-5 mb-2 text-gray-700 flex w-[546px] px-2">
              Exploitation of natural resources (Wild species harvested)
              <div className="mt-1 ml-2 relative">
                <MdInfoOutline
                  data-tooltip-id={`tooltip-$ebr2`}
                  data-tooltip-html="<p>This section documents data corresponding to the sites where organisation's activities lead or could lead to the exploitation of natural resources.</p>"
                  className=" ml-2 text-[15px]"
                />
                <ReactTooltip
                  id={`tooltip-$ebr2`}
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
            <div>
              <Form
                schema={r_schema}
                uiSchema={{
                  ...r_ui_schema,
                  waterConsumption: { "ui:widget": () => null }, // Hide
                }}
                formData={formData}
                onChange={handleChange}
                validator={validator}
                widgets={widgets}
              />
            </div>
          </div>
          <div className="mb-4 mt-2">
            <label className="text-sm leading-5 mb-2 text-gray-700 flex w-[546px] px-2">
              Exploitation of natural resources (Water consumption)
            </label>
            <div>
              <Form
                schema={r_schema}
                uiSchema={{
                  ...r_ui_schema,
                  wildSpecies: { "ui:widget": () => null }, // Hide
                }}
                formData={formData}
                onChange={handleChange}
                validator={validator}
                widgets={widgets}
                formContext={{
                  readonlyData: apiDataAvailable, 
                  topicSelected: isMaterialTopic,
                  handleTabClick:handleTabClick,
                }}
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

export default Screen2Comp;
