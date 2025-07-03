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
import BioDiversityTwoTableWidget from '../../../../../shared/widgets/Environment/BioDiversityTwoTableWidget'
import DateWidget from '../../../../../shared/widgets/Input/dateWidget'
const widgets = {
  BioDiversityTwoTableWidget: BioDiversityTwoTableWidget,
  DateWidget:DateWidget
};


const view_path =
  "environment_biodiversity_changes_in_ecosystem_use_and_biodiversity_condition";
const client_id = 1;
const user_id = 1;


const schema = {
  type: "object",
  properties: {
    ecosystemConversion: {
      type: "array",
      title: "Sites where activities lead to ecosystem conversion",
      items: {
    type: "object",
    properties: {
      Size: {
        type: "string",
        title: "Size",
      },

      Unit: {
        type: "string",
        title: "Unit",
        enum:[
            "Square meter (m²)",
            "Hectare (ha)",
            "Square kilometer (km²)",
            "Square foot (ft²)",
            "Square yard (yd²)",
            "Acre",
            "Square mile (mi²)"
        ]
      },
      TypeOfEcosystemConverted: {
        type: "string",
        title: "Type of ecosystem converted",
        enum:[
            "Converted from natural ecosystem",
            "Converted from one intensively used or modified ecosystem to another"
        ]
      },
      ReferenceDate: {
        type: "string",
        title: "Cut-off/Reference Date",
      },
      EcosystemBeforeConversion: {
        type: "string",
        title: "Ecosystem Before Conversion",
        enum:[
            "Forest (e.g., tropical, temperate, boreal)",
            "Grassland",
            "Wetland (e.g., marsh, swamp, peatland)",
            "Mangrove",
            "Coral reef",
            "Desert",
            "Tundra",
            "Freshwater ecosystem (e.g., rivers, lakes)",
            "Marine ecosystem (e.g., coastal, open sea)",
            "Shrubland",
            "Savannah",
            "Others (please specify)"
        ]
      },
      EcosystemAfterConversion: {
        type: "string",
        title: "Ecosystem After Conversion",
        enum:[
            "Agricultural land (e.g., cropland, pasture)",
            "Plantation (e.g., timber, palm oil)",
            "Urban or built-up area (e.g., industrial, residential)",
            "Mining or extraction site",
            "Aquaculture facility",
            "Infrastructure (e.g., roads, energy facilities)",
            "Degraded land / bare land",
            "Managed green space (e.g., parks, gardens)",
            "Artificial wetland or waterbody",
            "Artificial wetland or waterbody",
            "Others (please specify)"
        ]
      },
      
    },
  }, // Reuse original ecosystemConversion schema
    },
    biodiversityStateChange: {
      type: "array",
      title: "Changes to the state of biodiversity",
      items: {
    type: "object",
    properties: {
      BaseYear: {
        type: "string",
        title: "Base Year",
        enum:[

        ]
      },

      EcosystemTypeSource: {
        type: "string",
        title: "Ecosystem type & source",
        
      },
      Unit: {
        type: "string",
        title: "Unit",
       enum:[
            "Square meter (m²)",
            "Hectare (ha)",
            "Square kilometer (km²)",
            "Square foot (ft²)",
            "Square yard (yd²)",
            "Acre",
            "Square mile (mi²)"
        ]
      },
      EcosystemSizeHectares: {
        type: "string",
        title: "Ecosystem size (in hectares)",
      },
      EcosystemConditionBaseYear: {
        type: "string",
        title: "Ecosystem condition (in base year)",
       
      },
      EcosystemConditionReportingPeriod: {
        type: "string",
        title: "Ecosystem condition (in reporting period)",
       
      },
      
    },
  },
    },
  },
  dependencies: {
    ecosystemConversion: {},
    biodiversityStateChange: {}
  }
};

const uiSchema = {
  ecosystemConversion: {
    "ui:widget": "BioDiversityTwoTableWidget",
   "ui:options": {
    titles: [
      {
        key: "Size",
        title: "Size",
        tooltip:
          "<p>Specify size of natural ecosystem converted or land or sea converted from one intensively used or modified ecosystem to another during the reporting period.</p>",
        layouttype: "inputonlynumber",
        tooltipdispaly: "block",
      },
      {
        key: "Unit",
        title: "Unit",
        tooltip:
          "Select the unit of measurement for the area reported.",
        layouttype: "select",
        tooltipdispaly: "block",
      },
      {
        key: "TypeOfEcosystemConverted",
        title: "Type of ecosystem converted",
        tooltip:
          "<p>Indicate whether the site has resulted in the conversion of a <br/> 1) natural ecosystem: An ecosystem that is mostly untouched by humans and still has the same types of plants, animals, and natural processes that would exist in the area without major human interference. or <br/> 2)One intensively used or modified ecosystem into another: These are ecosystems where human activity has substantially modified an area’s primary ecological functions and species composition to ecosystems dominated by agriculture, urban, and other industrial activities.</p>",
        layouttype: "select",
        tooltipdispaly: "block",
      },
      {
        key: "ReferenceDate",
        title: "Cut-off/Reference Date",
        tooltip:
          "<p>Specify the the cut-off date or reference date since the natural ecosystem is converted.<br/> Cuf-off date: Natural ecosystem conversion is measured from a cut-off date associated with an organization’s policy related to natural ecosystem conversion (e.g., deforestation-free policy). If the organization does not have such a policy in place, it should select a reference date to measure natural ecosystem conversion.<br/> Reference Date: The starting point in time from which the organization begins tracking ecosystem conversion. </p>",
        layouttype: "inputDate",
        tooltipdispaly: "block",
        keytack: "TypeOfEcosystemConverted",
        disable: "ReferenceDate",
        disableIfNotValue: ["Converted from natural ecosystem"],
      },
      {
        key: "EcosystemBeforeConversion",
        title: "Ecosystem Before Conversion",
        tooltip:
          "<p>Select the original ecosystem type before any changes occurred</p>",
        layouttype: "select",
        tooltipdispaly: "block",
         keytack: "TypeOfEcosystemConverted",
        disable: "EcosystemBeforeConversion",
        disableIfNotValue: ["Converted from natural ecosystem","Converted from one intensively used or modified ecosystem to another"],
         dynamicEnumSourceKey: "TypeOfEcosystemConverted",
          dynamicEnumMapping: {
    "Converted from natural ecosystem": [
  "Forest (e.g., tropical, temperate, boreal)",
  "Grassland",
  "Wetland (e.g., marsh, swamp, peatland)",
  "Mangrove",
  "Coral reef",
  "Desert",
  "Tundra",
  "Freshwater ecosystem (e.g., rivers, lakes)",
  "Marine ecosystem (e.g., coastal, open sea)",
  "Shrubland",
  "Savannah",
  "Others (please specify)",
],
    "Converted from one intensively used or modified ecosystem to another": [
  "Cropland (e.g., annual/perennial crops, monocultures)",
  "Pastureland / Grazing land",
  "Plantation forest (e.g., timber, pulpwood)",
  "Urban area (e.g., residential, commercial)",
 " Industrial area (e.g., factories, processing facilities)",
"Mining or extraction site",
"Transport infrastructure (e.g., roads, railways, ports)",
"Artificial freshwater body (e.g., reservoirs, irrigation canals)",
"Anthropogenic subterranean freshwater system (e.g., wells, groundwater infrastructure)",
 "Anthropogenic marine systems",
"Artificial shoreline or coastal structure (e.g., seawalls, reclaimed land)",
"Aquaculture zone (marine or freshwater)",
"Recreational area (e.g., golf course, theme park)",
"Others (please specify)",
]
  }
      },
       {
        key: "EcosystemAfterConversion",
        title: "Ecosystem After Conversion",
        tooltip:
          "<p>Select the new land use or ecosystem type after conversion</p>",
        layouttype: "select",
        tooltipdispaly: "block",
         keytack: "TypeOfEcosystemConverted",
        disable: "EcosystemAfterConversion",
        disableIfNotValue: ["Converted from natural ecosystem","Converted from one intensively used or modified ecosystem to another"],
        dynamicEnumSourceKey: "TypeOfEcosystemConverted",
        dynamicEnumMapping: {
    "Converted from natural ecosystem": [
  "Agricultural land (e.g., cropland, pasture)",
  "Plantation (e.g., timber, palm oil)",
  "Urban or built-up area (e.g., industrial, residential)",
  "Mining or extraction site",
  "Aquaculture facility",
  "Infrastructure (e.g., roads, energy facilities)",
  "Degraded land / bare land",
  "Managed green space (e.g., parks, gardens)",
  "Artificial wetland or waterbody",
  "Others (please specify)",
],
    "Converted from one intensively used or modified ecosystem to another": [
  "Cropland (e.g., annual/perennial crops, monocultures)",
"Pastureland / Grazing land",
"Plantation forest (e.g., timber, pulpwood)",
"Urban area (e.g., residential, commercial)",
"Industrial area (e.g., factories, processing facilities)",
"Mining or extraction site",
"Transport infrastructure (e.g., roads, railways, ports)",
"Artificial freshwater body (e.g., reservoirs, irrigation canals)",
"Anthropogenic subterranean freshwater system (e.g., wells, groundwater infrastructure)",
 "Anthropogenic marine systems",
"Artificial shoreline or coastal structure (e.g., seawalls, reclaimed land)",
"Aquaculture zone (marine or freshwater)",
"Recreational area (e.g., golf course, theme park)",
"Others (please specify)"
]
  }
      },
     
    ],
  },
  },
  biodiversityStateChange: {
    "ui:widget": "BioDiversityTwoTableWidget",
    "ui:options": {
    titles: [
      {
        key: "BaseYear",
        title: "Base Year",
        tooltip:
          "<p>Specify base year for tracking changes in the condition of the ecosystem affected or potentially affected by the organization.<br/>Base year definition: historical datum (such as year) against which a measurement is tracked over time.</p>",
        layouttype: "select",
        tooltipdispaly: "block",
      },
      {
        key: "EcosystemTypeSource",
        title: "Ecosystem type & source",
        tooltip:
          "Specify the type of the ecosystem and source used to report type of ecosystem (for the base year). The organization can report ecosystem types using the biomes or ecosystem     functional groups in the IUCN Global Ecosystem Typology.",
        layouttype: "multilinetextbox",
        tooltipdispaly: "block",
      },
      {
        key: "Unit",
        title: "Unit",
        tooltip:
          "<p>Select the unit of measurement for the area reported.</p>",
        layouttype: "select",
        tooltipdispaly: "block",
      },
      {
        key: "EcosystemSizeHectares",
        title: "Ecosystem size (in hectares)",
        tooltip:
          "<p>Mention ecosystem size in hectares for the base year. Ecosystem size, also referred to as ecosystem extent, is the area coverage of the ecosystem that is affected or potentially affected by the organization’s activities. This is a fixed area over which the condition of the ecosystem is measured over time.</p>",
        layouttype: "inputonlynumber",
        tooltipdispaly: "block",
      },
      {
        key: "EcosystemConditionBaseYear",
        title: "Ecosystem condition (in base year)",
        tooltip:
          "<p>Describe the condition of the affected ecosystem in the base year. Ecosystem condition is the quality of an ecosystem measured by its living and non-living characteristics against a reference condition.</p>",
        layouttype: "multilinetextbox",
        tooltipdispaly: "block",
      },
       {
        key: "EcosystemConditionReportingPeriod",
        title: "Ecosystem condition (in reporting period)",
        tooltip:
          "<p>Mention condition for the current reporting period. </p>",
        layouttype: "multilinetextbox",
        tooltipdispaly: "block",
      },
     
    ],
  },
  },
  "ui:options": {
    orderable: false,
    addable: false,
    removable: false,
    layout: "horizontal"
  }
};



function getYearListFrom1995() {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= 1995; year--) {
    years.push(year.toString()); // If enum is string type
  }
  return years;
}



const Screen1Comp = ({ location, year }) => {
  // const [formData, setFormData] = useState([{}]);
  const [formData, setFormData] = useState({
  ecosystemConversion: [{}],
  biodiversityStateChange: [{}]
});
  const [r_schema, setRemoteSchema] = useState({});
  const [r_ui_schema, setRemoteUiSchema] = useState({});
  const apiDataAvailable=false;
  const isTopicSelected=false;
  const [loopen, setLoOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
   const [selectedOrgActivity, setSelectedOrgActivity] = useState("");
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
 
   const handleSelectOrgActivityChange = (event) => {
    setSelectedOrgActivity(event.target.value);
  };
 

  const loadFormData = async () => {
    LoaderOpen();
    setFormData({
  ecosystemConversion: [{}],
  biodiversityStateChange: [{}]
});
    setSelectedOption("")
    setSelectedOrgActivity("")
    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&location=${location}&year=${year}`;
    try {
      const response = await axiosInstance.get(url);
      console.log("API called successfully:", response.data);
      const loadedSchema = response.data.form[0].schema;
      const yearEnum = getYearListFrom1995();
    if (
      loadedSchema?.properties?.biodiversityStateChange?.items?.properties?.BaseYear
    ) {
      loadedSchema.properties.biodiversityStateChange.items.properties.BaseYear.enum = yearEnum;
    }
      setRemoteSchema(response.data.form[0].schema);
      setRemoteUiSchema(response.data.form[0].ui_schema);
const form_parent = response.data.form_data;
      const f_data = form_parent[0].data[0].formData;
      const option_data = form_parent[0].data[0].selectedOption;
      const org_activity=form_parent[0].data[0].TypeOfchangeToBioDiversity
    //   setFormData({
    //     wildSpecies: fetchedData.wildSpecies || [{}],
    //     waterConsumption: fetchedData.waterConsumption || [{}]
    //   });
      setFormData(f_data);
      setSelectedOption(option_data);
      setSelectedOrgActivity(org_activity)
    } catch (error) {
      setFormData({
  ecosystemConversion: [{}],
  biodiversityStateChange: [{}]
});
 setSelectedOption("")
    setSelectedOrgActivity("")
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
          TypeOfchangeToBioDiversity:selectedOrgActivity
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
       Do the organisation's activities lead or could lead to land / sea use change or change in the state of biodiversity?
          <div className="ml-2 relative">
            <MdInfoOutline
              data-tooltip-id={`tooltip-$ebr1`}
              data-tooltip-html="<p>Indicate whether the organisation's activities has resulted in the conversion of a natural ecosystem or change in the state of biodiversity.<br/>

Land and sea use change: Land and sea use change refers to how humans use and manage land and seascapes, which may lead to a change in land and sea cover.<br/>

Changes in the state of biodiversity: Refer to any alterations in the health, composition, structure, or functioning of ecosystems and the species within them. This includes changes in species populations (e.g., decline or increase in numbers), species extinction risk, ecosystem condition (e.g., degradation or recovery), genetic diversity etc.</p>"
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
        <div className="w-full max-w-[546px] mb-2 px-2">
        <label className="text-sm leading-5 text-gray-700 flex w-full">
      Select the type of change to the biodiversity that has resulted from, or could result from, the organization’s activities.
          <div className="ml-2 relative">
            <MdInfoOutline
              data-tooltip-id={`tooltip-$ebr1`}
              data-tooltip-html="<p>Select the type of change to biodiversity caused by your organisation’s activities. This includes past, current, or potential future impacts, such as changes in how land or sea is used, converting natural habitats, or altering the health and diversity of species in the area. Choose `No change` if there has been no impact.</p>"
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
          value={selectedOrgActivity}
          onChange={handleSelectOrgActivityChange}
        >
          <option>Select</option>
          <option value="Land or sea use change">Land or sea use change</option>
          <option value="Ecosystem conversion">Ecosystem conversion</option>
          <option value="Change in the state of biodiversity">Change in the state of biodiversity</option>
          <option value="No change">No change</option>
        </select>
      </div>

      {selectedOrgActivity==='No change' || selectedOrgActivity=='' ?(
        <div>

        </div>
      ):(
        <div>
            {["Ecosystem conversion","Land or sea use change"].includes(selectedOrgActivity)?(
                <div className="mb-4 mt-2">
          <label className="text-sm leading-5 mb-2 text-gray-700 flex w-[546px] px-2">
          Sites where its activities lead to land and sea use change
          <div className="mt-1 ml-2 relative">
            <MdInfoOutline
              data-tooltip-id={`tooltip-$ebr2`}
              data-tooltip-html="<p>This section documents the data corresponding to the organisation's site with most significant biodiveristy impact where its activities lead or could lead natural ecosystem change.</p>"
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
                // uiSchema={uiSchema}
                 uiSchema={{
      ...r_ui_schema,
      biodiversityStateChange: { "ui:widget": () => null } // Hide
    }}
                formData={formData}
                onChange={handleChange}
                validator={validator}
                widgets={widgets}
              />
            
            </div>
          </div>
            ):(
                <div className="mb-4 mt-2">
          <label className="text-sm leading-5 mb-2 text-gray-700 flex w-[546px] px-2">
          Changes to the state of biodiversity
          <div className="mt-1 ml-2 relative">
            <MdInfoOutline
              data-tooltip-id={`tooltip-$ebr2`}
              data-tooltip-html="<p>This section documents the data corresponding to the information about the changes in the condition of the ecosystem
affected or potentially affected by the organization.</p>"
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
                // uiSchema={uiSchema}
                 uiSchema={{
      ...r_ui_schema,
      ecosystemConversion: { "ui:widget": () => null } // Hide
    }}
                formData={formData}
                onChange={handleChange}
                validator={validator}
                widgets={widgets}
              />
            
            </div>
          </div>
            )}
        </div>
      )}
          
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

export default Screen1Comp;
