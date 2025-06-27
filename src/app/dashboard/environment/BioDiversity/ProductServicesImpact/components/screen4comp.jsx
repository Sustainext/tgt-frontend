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
import MultitypefiledWidget from "../../../../../shared/widgets/Environment/MultitypefiledWidget";
const widgets = {
  MultitypefiledWidget: MultitypefiledWidget,
};

const view_path = "gri-environment-energy-302-1g-2c-conversion_factor";
const client_id = 1;
const user_id = 1;

const schema = {
    type: "array",
    items: {
      type: "object",
      properties: {
        col1: {
          type: "string",
          title: "Name of Product/Service",
        },
         col2: {
          type: "string",
          title: "Country or Jurisdiction",
          enum:[
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
  "Others (please specify)"
            ]
        },
  
        col3: {
          type: "string",
          title: "Introduction Method",
           enum: [
            "Accidentally",
            "On ppurpose",
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
          key: "col1",
          title: "Name of Product/Service",
          tooltip:
            "<p>Specify the name of the product or service in organisation's supply chain with the most significant impacts on biodiversity.<br/> Supply chain: range of activities carried out by entities upstream from the organization, which provide products or services that are used in the development of the organization’s own products or services.",
          layouttype: "input",
          tooltipdispaly: "none",
        },
         {
          key: "col2",
          title: "Country or Jurisdiction",
          tooltip:
            "Enter the name of the country or specific jurisdiction where mentioned activity occurs (e.g., Indonesia, Amazon Basin, Alberta - Canada).",
          layouttype: "select",
          tooltipdispaly: "none",
        },
        {
          key: "col3",
          title: "Introduction Method",
          tooltip:
            "Please specify the type of wild species harvested",
          layouttype: "select",
          tooltipdispaly: "none",
        },
      ],
    },
  };
const Screen4Comp = ({ handleQ6Change, location, year, month }) => {
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
      form_data: formData,
      location,
      year,
      month,
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
    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&location=${location}&year=${year}&month=${month}`;
    try {
      const response = await axios.get(url, axiosConfig);
      console.log("API called successfully:", response.data);
      setRemoteSchema(response.data.form[0].schema);
      setRemoteUiSchema(response.data.form[0].ui_schema);
      const form_parent = response.data.form_data;
      setFormData(form_parent[0].data);
    } catch (error) {
      console.error("API call failed:", error);
    } finally {
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
    if (location && year && month) {
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
  }, [location, year, month]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log("Form data:", formData);
    updateFormData();
  };

  return (
    <>
    <div className="w-full max-w-[570px] mb-2 px-2">
            <label className="text-sm leading-5 text-gray-700 flex w-full">
          Do any products or services in the organization’s supply chain result in, the introduction of invasive alien species into natural ecosystems?
              <div className="ml-2 relative">
                <MdInfoOutline
                  data-tooltip-id={`tooltip-$ebr1`}
                  data-tooltip-html="<p>Indicate whether any products or services in the organisation's supply chain  result in the introduction of, or have the potential to result in introduction of, any invasive alien species.<br/>

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
              <option>Select Yes/No</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
    {selectedOption ==='yes' && (
          <div className="">
             <label className="text-sm px-2 mb-4 leading-5 text-gray-700 flex w-full">
         How are invasive alien species introduced or potentially introduced by the organisation?
              <div className="ml-2 relative">
                <MdInfoOutline
                  data-tooltip-id={`tooltip-$ebr1`}
                  data-tooltip-html="<p>Indicate the species that are or may be introduced by the organisation. Invasive alien species can be introduced accidentally (e.g., transport, discharge of ballast waters) or on purpose (e.g., for pest control, horticulture, pets, zoological gardens, and aquaria). For example, an organization imports ornamental plants to new areas, which may threaten local biodiversity.<br/> 

Note: Non-invasive alien species are not required to be reported under 101-6-d</p>"
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
        <div>
          <Form
            schema={schema}
            uiSchema={uiSchema}
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

export default Screen4Comp;
