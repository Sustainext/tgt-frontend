"use client";
import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { GlobalState } from "../../../../../../Context/page";
import TextareaWidget from "../../../../../shared/widgets//Textarea/TextareaWidget";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { Oval } from "react-loader-spinner";
// import MultitypefiledWidget from "../../../../../shared/widgets/Environment/MultitypefiledWidget";
import BioDiversityTwoTableWidget from "../../../../../shared/widgets/Environment/BioDiversityTwoTableWidget";
const widgets = {
  BioDiversityTwoTableWidget: BioDiversityTwoTableWidget,
};

const view_path =
  "environment_biodiversity_products_services_with_impact_on_biodiversity_screen5";
const client_id = 1;
const user_id = 1;

const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      NameOfProductService: {
        type: "string",
        title: "Name of Product/Service",
      },
      Country: {
        type: "string",
        title: "Country or Jurisdiction",
        enum: [
          "Afghanistan",
          "Albania",
          "Algeria",
          "Andorra",
          "Angola",
          "Antigua and Barbuda",
          "Argentina",
          "Armenia",
          "Australia",
          "Austria",
          "Austrian Empire",
          "Azerbaijan",
          "Baden",
          "Bahamas",
          "Bahrain",
          "Bangladesh",
          "Barbados",
          "Bavaria",
          "Belarus",
          "Belgium",
          "Belize",
          "Benin (Dahomey)",
          "Bolivia",
          "Bosnia and Herzegovina",
          "Botswana",
          "Brazil",
          "Brunei",
          "Brunswick and Lüneburg",
          "Bulgaria",
          "Burkina Faso (Upper Volta)",
          "Burma",
          "Burundi",
          "Cabo Verde",
          "Cambodia",
          "Cameroon",
          "Canada",
          "Cayman Islands, The",
          "Central African Republic",
          "Central American Federation",
          "Chad",
          "Chile",
          "China",
          "Colombia",
          "Comoros",
          "Congo Free State",
          "Cook Islands",
          "Costa Rica",
          "Cote d’Ivoire (Ivory Coast)",
          "Croatia",
          "Cuba",
          "Cyprus",
          "Czechia",
          "Czechoslovakia",
          "Democratic Republic of the Congo",
          "Denmark",
          "Djibouti",
          "Dominica",
          "Dominican Republic",
          "Duchy of Parma",
          "East Germany (German Democratic Republic)",
          "Ecuador",
          "Egypt",
          "El Salvador",
          "Equatorial Guinea",
          "Eritrea",
          "Estonia",
          "Eswatini",
          "Ethiopia",
          "Fiji",
          "Finland",
          "France",
          "Gabon",
          "Gambia, The",
          "Georgia",
          "Germany",
          "Ghana",
          "Grand Duchy of Tuscany",
          "Greece",
          "Grenada",
          "Guatemala",
          "Guinea",
          "Guinea-Bissau",
          "Guyana",
          "Haiti",
          "Hanover",
          "Hanseatic Republics",
          "Hawaii",
          "Hesse",
          "Holy See",
          "Honduras",
          "Hungary",
          "Iceland",
          "India",
          "Indonesia",
          "Iran",
          "Iraq",
          "Ireland",
          "Israel",
          "Italy",
          "Jamaica",
          "Japan",
          "Jordan",
          "Kazakhstan",
          "Kenya",
          "Kingdom of Serbia/Yugoslavia",
          "Kiribati",
          "Korea",
          "Kosovo",
          "Kuwait",
          "Kyrgyzstan",
          "Laos",
          "Latvia",
          "Lebanon",
          "Lesotho",
          "Lew Chew (Loochoo)",
          "Liberia",
          "Libya",
          "Liechtenstein",
          "Lithuania",
          "Luxembourg",
          "Madagascar",
          "Malawi",
          "Malaysia",
          "Maldives",
          "Mali",
          "Malta",
          "Marshall Islands",
          "Mauritania",
          "Mauritius",
          "Mecklenburg-Schwerin",
          "Mecklenburg-Strelitz",
          "Mexico",
          "Micronesia",
          "Moldova",
          "Monaco",
          "Mongolia",
          "Montenegro",
          "Morocco",
          "Mozambique",
          "Namibia",
          "Nassau",
          "Nauru",
          "Nepal",
          "Netherlands, The",
          "New Zealand",
          "Nicaragua",
          "Niger",
          "Nigeria",
          "Niue",
          "North German Confederation",
          "North German Union",
          "North Macedonia",
          "Norway",
          "Oldenburg",
          "Oman",
          "Orange Free State",
          "Pakistan",
          "Palau",
          "Panama",
          "Papal States",
          "Papua New Guinea",
          "Paraguay",
          "Peru",
          "Philippines",
          "Piedmont-Sardinia",
          "Poland",
          "Portugal",
          "Qatar",
          "Republic of Genoa",
          "Republic of Korea (South Korea)",
          "Republic of the Congo",
          "Romania",
          "Russia",
          "Rwanda",
          "Saint Kitts and Nevis",
          "Saint Lucia",
          "Saint Vincent and the Grenadines",
          "Samoa",
          "San Marino",
          "Sao Tome and Principe",
          "Saudi Arabia",
          "Schaumburg-Lippe",
          "Senegal",
          "Serbia",
          "Seychelles",
          "Sierra Leone",
          "Singapore",
          "Slovakia",
          "Slovenia",
          "Solomon Island",
          "Somalia",
          "South Africa",
          "South Sudan",
          "Spain",
          "Sri Lanka",
          "Sudan",
          "Suriname",
          "Sweden",
          "Switzerland",
          "Syria",
          "Tajikistan",
          "Tanzania",
          "Texas",
          "Thailand",
          "Timor-Leste",
          "Togo",
          "Tonga",
          "Trinidad and Tobago",
          "Tunisia",
          "Turkey",
          "Turkmenistan",
          "Tuvalu",
          "Two Sicilies",
          "Uganda",
          "Ukraine",
          "Union of Soviet Socialist Republics",
          "United Arab Emirates, The",
          "United Kingdom",
          "Uruguay",
          "Uzbekistan",
          "Vanuatu",
          "Venezuela",
          "Vietnam",
          "Württemberg",
          "Yemen",
          "Zambia",
          "Zimbabwe",
          "Others (please specify)",
        ],
      },
      Size: {
        type: "string",
        title: "Size",
      },

      Unit: {
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
      TypeOfEcosystemConverted: {
        type: "string",
        title: "Type of ecosystem converted",
        enum: [
          "Converted from natural ecosystem",
          "Converted from one intensively used or modified ecosystem to another",
        ],
      },
      ReferenceDate: {
        type: "string",
        title: "Cut-off/Reference Date",
      },
      EcosystemBeforeConversion: {
        type: "string",
        title: "Ecosystem Before Conversion",
        enum: [
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
      },
      EcosystemAfterConversion: {
        type: "string",
        title: "Ecosystem After Conversion",
        enum: [
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
          "Others (please specify)",
        ],
      },
    },
  },
};

const uiSchema = {
  "ui:widget": "BioDiversityTwoTableWidget",
  "ui:options": {
    titles: [
      {
        key: "NameOfProductService",
        title: "Name of Product/Service",
        tooltip:
          "<p>Specify size of natural ecosystem converted or land or sea converted from one intensively used or modified ecosystem to another during the reporting period.</p>",
        layouttype: "input",
        tooltipdispaly: "none",
      },
      {
        key: "Country",
        title: "Country or Jurisdiction",
        tooltip:
          "<p>Specify size of natural ecosystem converted or land or sea converted from one intensively used or modified ecosystem to another during the reporting period.</p>",
        layouttype: "select",
        tooltipdispaly: "none",
      },
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
        tooltip: "Select the unit of measurement for the area reported.",
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
        disableIfNotValue: [
          "Converted from natural ecosystem",
          "Converted from one intensively used or modified ecosystem to another",
        ],
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
          "Converted from one intensively used or modified ecosystem to another":
            [
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
            ],
        },
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
        disableIfNotValue: [
          "Converted from natural ecosystem",
          "Converted from one intensively used or modified ecosystem to another",
        ],
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
          "Converted from one intensively used or modified ecosystem to another":
            [
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
              "Others (please specify)",
            ],
        },
      },
    ],
  },
};
const Screen5Comp = ({ handleQ6Change, location, year }) => {
  const { open } = GlobalState();
  const [formData, setFormData] = useState([{}]);
  const [r_schema, setRemoteSchema] = useState({});
  const [r_ui_schema, setRemoteUiSchema] = useState({});
  const [loopen, setLoOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
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
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // The below code
  let axiosConfig = {
    headers: {
      Authorization: "Bearer " + token,
    },
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

  const loadFormData = async () => {
    LoaderOpen();
    setFormData([{}]);
    setSelectedOption("");
    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&location=${location}&year=${year}`;
    try {
      const response = await axios.get(url, axiosConfig);
      console.log("API called successfully:", response.data);
      setRemoteSchema(response.data.form[0].schema);
      setRemoteUiSchema(response.data.form[0].ui_schema);
      const form_parent = response.data.form_data;
      const formValues = response.data.products_services_data || [];
      const f_data = form_parent[0]?.data[0]?.formData || [{}];
      const option_data = form_parent[0]?.data[0]?.selectedOption || "";
      let finalFormData;

      if (formValues.length > 0 && form_parent.length === 0) {
        finalFormData = formValues.map((item) => ({
          NameOfProductService: item.NameOfProductService || "",
          Country: item.Country || "",
          Size: "",
          Unit: "",
          TypeOfEcosystemConverted: "",
          ReferenceDate: "",
          EcosystemBeforeConversion: "",
          EcosystemAfterConversion: "",
        }));
        // setReadOnly(["NameOfProductService", "Country"]);
      } else {
        const baseFormData = Array.isArray(f_data) ? [...f_data] : [{}];

        // Extract only extra rows (those beyond baseFormData length)
        const extraRows = formValues.slice(baseFormData.length).map((item) => ({
          NameOfProductService: item.NameOfProductService || "",
          Country: item.Country || "",
          Size: "",
          Unit: "",
          TypeOfEcosystemConverted: "",
          ReferenceDate: "",
          EcosystemBeforeConversion: "",
          EcosystemAfterConversion: "",
        }));

        finalFormData = [...baseFormData, ...extraRows];
      }
      setFormData(finalFormData);
      setSelectedOption(option_data);
    } catch (error) {
      console.error("API call failed:", error);
    } finally {
      LoaderClose();
    }
  };
  //Reloading the forms -- White Beard
 
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
      <div className="w-full max-w-[570px] mb-2 px-2">
        <label className="text-sm leading-5 text-gray-700 flex w-full">
          Do any products or services in the organization’s supply chain result
          in land / sea use change?
          <div className="ml-2 relative">
            <MdInfoOutline
              data-tooltip-id={`tooltip-$ebr1`}
              data-tooltip-html="<p>Indicate whether any products/services in the organisation's supply chain has resulted in the conversion of a natural ecosystem or change in the state of biodiversity.<br/>

Land and sea use change: Land and sea use change refers to how humans use and manage land and seascapes, which may lead to a change in land and sea cover.</p>"
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
        <div className="">
          <div>
            <Form
              schema={r_schema}
              uiSchema={r_ui_schema}
              formData={formData}
              onChange={handleChange}
              validator={validator}
              widgets={widgets}
            />
          </div>
        </div>
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
      {/* Add a submit button */}
    </>
  );
};

export default Screen5Comp;
