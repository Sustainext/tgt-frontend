"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
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
import MultitypefiledWidget from "../../../../../shared/widgets/Environment/MultitypefiledWidget";
const widgets = {
  MultitypefiledWidget: MultitypefiledWidget,
};

const view_path =
  "environment_biodiversity_products_services_with_impact_on_biodiversity_screen2";
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

      TypeOfWildSpeciesHarvested: {
        type: "string",
        title: "Type of wild species harvested",
        enum: ["Plant", "Animals", "Fungi", "Coral", "Others (please specify)"],
      },
      HarvestedWildSpecies: {
        type: "string",
        title: "Harvested wild species",
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
      WaterWithdrawal: {
        type: "string",
        title: "Water withdrawal",
      },
      WaterConsumption: {
        type: "string",
        title: "Water consumption",
      },
      Unit: {
        type: "string",
        title: "Unit",
        enum: [
          "Litre",
          "MegaLitre",
          "Cubic meter",
          "KiloLlitre",
          "Million Litres Per Day",
        ],
      },
    },
  },
};

const uiSchema = {
  "ui:widget": "MultitypefiledWidget",
  "ui:options": {
    titles: [
      {
        key: "NameOfProductService",
        title: "Name of Product/Service",
        tooltip:
          "<p>Specify the name of the product or service in organisation's supply chain with the most significant impacts on biodiversity.<br/> Supply chain: range of activities carried out by entities upstream from the organization, which provide products or services that are used in the development of the organization’s own products or services.",
        layouttype: "input",
        tooltipdispaly: "none",
      },
      {
        key: "Country",
        title: "Country or Jurisdiction",
        tooltip:
          "Enter the name of the country or specific jurisdiction where mentioned activity occurs (e.g., Indonesia, Amazon Basin, Alberta - Canada).",
        layouttype: "select",
        tooltipdispaly: "none",
      },
      {
        key: "TypeOfWildSpeciesHarvested",
        title: "Type of wild species harvested",
        tooltip: "Please specify the type of wild species harvested",
        layouttype: "select",
        tooltipdispaly: "block",
      },
      {
        key: "HarvestedWildSpecies",
        title: "Harvested wild species",
        tooltip:
          "Provide information on wild species harvested at the selected location. Harvesting wild species means collecting, catching, or hunting wild animals, plants, or fungi including any taken by accident as part of the organization’s activities.",
        layouttype: "input",
        tooltipdispaly: "block",
      },
      {
        key: "Quantity",
        title: "Quantity",
        tooltip:
          "<p>Provide details on total quantity of wild species harvested with appropriate unit.</p>",
        layouttype: "input",
        tooltipdispaly: "block",
      },
      {
        key: "ExtinctionRisk",
        title: "Extinction Risk",
        tooltip:
          "<p>Indicate the level of extinction risk of the species harvested.<br/> Critically Endangered: Species facing an extremely high risk of extinction in the wild in the immediate future.<br/> Endangered: Species facing a very high risk of extinction in the wild in the near future.<br/> Vulnerable: Species considered to be facing a high risk of extinction in the wild in the medium term.<br/> Near Threatened: Species that do not currently meet the criteria for being endangered or vulnerable but are close to qualifying or are likely to qualify in the near future.<br/> Least Concern: Species that have been evaluated and found to be at low risk of extinction. They are widespread and abundant.<br/> Extinct in the Wild: Survives only in captivity or outside its natural habitat; no individuals left in the wild.<br/> Extinct: No known individuals remaining anywhere.</p>",
        layouttype: "select",
        tooltipdispaly: "block",
      },
      {
        key: "WaterWithdrawal",
        title: "Water withdrawal",
        tooltip:
          "<p>What is the total amount of water withdrawn at the site?<br/> Water withdrawal: sum of all water drawn from surface water, groundwater, seawater, or a third party for any use over the course of the reporting period.</p>",
        layouttype: "inputonlynumber",
        tooltipdispaly: "block",
      },
      {
        key: "WaterConsumption",
        title: "Water consumption",
        tooltip:
          "<p>What is the total water consumption at the site?<br/> Water consumption: sum of all water that has been withdrawn and incorporated into products, used in the production of crops or generated as waste, has evaporated, transpired, or been consumed by humans or livestock, or is polluted to the point of being unusable by other users, and is therefore not released back to surface water, groundwater, seawater, or a third party over the course of the reporting period.</p>",
        layouttype: "inputonlynumber",
        tooltipdispaly: "block",
      },
      {
        key: "Unit",
        title: "Unit",
        tooltip:
          "<p>Select the correct unit corresponding to the quantity of water withdrawal/consumption.</p>",
        layouttype: "select",
        tooltipdispaly: "block",
      },
    ],
  },
};
const Screen2Comp = ({ handleQ6Change, location, year }) => {
  const { open } = GlobalState();
  const [formData, setFormData] = useState([{}]);
  const [r_schema, setRemoteSchema] = useState({});
  const [r_ui_schema, setRemoteUiSchema] = useState({});
  const [loopen, setLoOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const toastShown = useRef(false);
  const [readOnly, setReadOnly] = useState([]);

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
      // console.log("API called successfully:", response.data);
      setRemoteSchema(response.data.form[0].schema);
      setRemoteUiSchema(response.data.form[0].ui_schema);
     const form_parent = response.data.form_data;
const formValues = response.data.products_services_data || [];
const f_data = form_parent[0]?.data[0]?.formData || [{}];
const option_data = form_parent[0]?.data[0]?.selectedOption || "";
let finalFormData;

if (formValues.length > 0 && form_parent.length === 0) {
  // No form data, only formValues available
  finalFormData = formValues.map((item) => ({
    NameOfProductService: item.NameOfProductService || "",
    Country: item.Country || "",
    TypeOfWildSpeciesHarvested: "",
    HarvestedWildSpecies: "",
    Quantity: "",
    ExtinctionRisk: "",
    WaterWithdrawal: "",
    WaterConsumption: "",
    Unit: "",
  }));
  // setReadOnly(["NameOfProductService", "Country"]);
} else {
  // Existing formData is available, append extra rows from formValues if any
  const baseFormData = Array.isArray(f_data) ? [...f_data] : [{}];

  // Extract only extra rows (those beyond baseFormData length)
  const extraRows = formValues.slice(baseFormData.length).map((item) => ({
    NameOfProductService: item.NameOfProductService || "",
    Country: item.Country || "",
    TypeOfWildSpeciesHarvested: "",
    HarvestedWildSpecies: "",
    Quantity: "",
    ExtinctionRisk: "",
    WaterWithdrawal: "",
    WaterConsumption: "",
    Unit: "",
  }));

  finalFormData = [...baseFormData, ...extraRows];
  // setReadOnly(form_parent.length > 0 ? ["NameOfProductService", "Country"] : []);
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
          Do the products or services in the supply chain lead to exploitation
          of natural resources affecting biodiversity?
          <div className="ml-2 relative">
            <MdInfoOutline
              data-tooltip-id={`tooltip-$ebr1`}
              data-tooltip-html="<p>Indicate whether any products or services in organisation's supply chain use or extract natural resources (such as water, forests, minerals, or wildlife) in ways that may contribute to biodiversity loss. This includes activities like deforestation, overfishing, mining, or excessive water withdrawal.</p>"
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
        <div>
          <div>
            <Form
              schema={r_schema}
              uiSchema={r_ui_schema}
              formData={formData}
              onChange={handleChange}
              validator={validator}
              widgets={widgets}
              // formContext={{ readOnlyFields: readOnly }}
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

export default Screen2Comp;
