'use client'
import React, { useState, useEffect, useRef  } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { GlobalState } from '../../../../../Context/page';
import dateWidget from '../../../../shared/widgets/Input/dateWidget';
import selectWidget from '../../../../shared/widgets/Select/selectWidget';
import inputWidget from '../../../../shared/widgets/Input/inputWidget';
import CustomFileUploadWidget from '../../../../shared/widgets/CustomFileUploadWidget';
import AssignToWidget from '../../../../shared/widgets/assignToWidget';
import CustomSelectInputWidget from '../../../../shared/widgets/CustomSelectInputWidget';
import RemoveWidget from '../../../../shared/widgets/RemoveWidget';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from 'react-loader-spinner';
const widgets = {
    inputWidget: inputWidget,
    dateWidget: dateWidget,
    selectWidget: selectWidget,
    FileUploadWidget: CustomFileUploadWidget,
    AssignTobutton: AssignToWidget,
    CustomSelectInputWidget: CustomSelectInputWidget,
    RemoveWidget: RemoveWidget,
};

const view_path = '	gri-environment-materials-301-3a-3b-reclaimed_products'
const client_id = 1
const user_id = 1

const schema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            Typesofproducts: {
                type: "string",
                title: "Types of products sold ",
                tooltiptext: "What types of products did the company sell in the reporting period?",
                display: "block",

            },
            Productclassification: {
                type: "string",
                title: "Product classification",
                enum: ['ASIN', 'DOI', 'EAN', 'GPC', 'ISBN', 'ISMN', 'ISRC', 'MPN', 'UPC', 'UNSPSC', 'Others'],
                tooltiptext: "Which type of global product classification code applies to this product?For example: ISSN, UNSPSC, GPC, etc.",
                display: "block",
            },
            Productcode: {
                type: "string",
                title: "Product code",
                tooltiptext: "Does the product have a globally recognized product classification code? If yes, please mention the product code. For example: ISSN number, GPC code, Global trade item number (GTIN), etc.",
                display: "block",
            },
            Productname: {
                type: "string",
                title: "Product name",
                tooltiptext: "Please mention the actual name of the product.",
                display: "block",
            },
            Amountofproducts: {
                type: "string",
                title: "Amount of products sold",
                tooltiptext: "Please specify the total amount of products sold by the company during the reporting period.",
                display: "block",
            },
            Unit: {
                type: "string",
                title: "Unit",
                enum: ['Cubic centimeter cm3', 'Cubic decimeter dm3', 'Cubic meter m3', 'Gram', 'Kilogram Kg', 'Liter', 'Milligram', 'Milliliter', 'Fluid Ounce fl Oz', 'Gallon Gal', 'Pint Pt', 'Pound Lb', 'Quart Qt', 'Cubic foot ft3', 'Metric ton', 'US short ton (tn)'],
                tooltiptext: "Use 1000 kilograms as the measure for a metric ton.",
                display: "none",
            },
            Recycledmaterialsused: {
                type: "string",
                title: "Recycled materials used ",
                enum: ['Yes', 'No'],
                tooltiptext: "Does the company use recycled materials in its packaging?",
                display: "block",
            },
            Typesofrecycledmaterials: {
                type: "string",
                title: "Types of recycled materials",
                enum: ['Cardboard', 'Folding carton', 'Glass Bottles', 'Glass Jars', 'Metal cans', 'Paper', 'Plastic', 'Wooden crates', 'Wood', 'Bamboo', 'Cellulose', 'Corn starch', 'Mushroom packaging', 'Organic Fabric', 'Others'],
                tooltiptext: "Does the company use recycled materials in its packaging?",
                display: "block",
            },
            Amountsproduct: {
                type: "string",
                title: "Amounts of product and packaging materials recycled",
                tooltiptext: "Please specify the amount of material the company recycled during the reporting period.",
                display: "block",
            },

            Unit2: {
                type: "string",
                title: "Unit",
                enum: ['Cubic centimeter cm3', 'Cubic decimeter dm3', 'Cubic meter m3', 'Gram', 'Kilogram Kg', 'Liter', 'Milligram', 'Milliliter', 'Fluid Ounce fl Oz', 'Gallon Gal', 'Pint Pt', 'Pound Lb', 'Quart Qt', 'Cubic foot ft3', 'Metric ton', 'US short ton (tn)'],
                tooltiptext: "Please specify the total weight or volume of recycled packaging material that the company used in the reporting period.",
                display: "block",
            },
            Datacollectionmethod: {
                type: "string",
                title: "Data collection method",
                tooltiptext: "Please specify how the data for the recycled materials was collected.",
                display: "block",
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
            Remove: {
                type: "string",
                title: "Remove",
            },
            // Define other properties as needed
        }
    }
};

const uiSchema = {
    // Add flex-wrap to wrap fields to the next line
    items: {
        classNames: 'fieldset',
        'ui:order': [
            'Typesofproducts', 'Productclassification', 'Productcode', 'Productname','Amountofproducts', 'Unit', 'Recycledmaterialsused','Typesofrecycledmaterials','Amountsproduct', 'Unit2','Datacollectionmethod', 'AssignTo', 'FileUpload', 'Remove'
        ],
        Typesofproducts: {
            'ui:widget': 'inputWidget',
            'ui:horizontal': true,
            'ui:options': {
                label: false // This disables the label for this field
            },
        },
        Productclassification: {
            'ui:widget': 'selectWidget',
            'ui:horizontal': true,
            'ui:options': {
                label: false,
            },
        },
        Productcode: {
            'ui:widget': 'inputWidget', // Use your custom widget for QuantityUnit
            'ui:options': {
                label: false // This disables the label for this field
            },
        },
        Productname: {
            'ui:widget': 'inputWidget',
            'ui:horizontal': true,
            'ui:options': {
                label: false // This disables the label for this field
            },
        },
        Amountofproducts: {
            'ui:widget': 'inputWidget',
            'ui:horizontal': true,
            'ui:options': {
                label: false // This disables the label for this field
            },
        },

        Unit: {
            'ui:widget': 'selectWidget',
            'ui:horizontal': true,
            'ui:options': {
                label: false // This disables the label for this field
            },
        },
        Recycledmaterialsused: {
            'ui:widget': 'selectWidget',
            'ui:horizontal': true,
            'ui:options': {
                label: false // This disables the label for this field
            },
        },
        Typesofrecycledmaterials: {
            'ui:widget': 'selectWidget',
            'ui:horizontal': true,
            'ui:options': {
                label: false // This disables the label for this field
            },
        },
        Amountsproduct: {
            'ui:widget': 'inputWidget',
            'ui:horizontal': true,
            'ui:options': {
                label: false // This disables the label for this field
            },
        },

        Unit2: {
            'ui:widget': 'selectWidget',
            'ui:horizontal': true,
            'ui:options': {
                label: false // This disables the label for this field
            },
        },
        Datacollectionmethod: {
            'ui:widget': 'inputWidget',
            'ui:horizontal': true,
            'ui:options': {
                label: false // This disables the label for this field
            },
        },
        AssignTo: {
            "ui:widget": "AssignTobutton",
            'ui:horizontal': true,
            'ui:options': {
                label: false // This disables the label for this field
            },
        },
        FileUpload: {
            'ui:widget': 'FileUploadWidget',
            'ui:horizontal': true,
            'ui:options': {
                label: false // This disables the label for this field
            },
        },
        Remove: {
            "ui:widget": "RemoveWidget",
            'ui:options': {
                label: false // This disables the label for this field
            },
        },
        'ui:options': {
            orderable: false, // Prevent reordering of items
            addable: false, // Prevent adding items from UI
            removable: false, // Prevent removing items from UI
            layout: 'horizontal', // Set layout to horizontal
        }
    }
};

const generateTooltip = (field, title, tooltipText, display) => {
    if (field === "FileUpload" || field === "AssignTo" || field === "Remove") {
        return null; // Return null to skip rendering tooltip for these fields
    }

    return (
        <div className='mx-2 flex w-[20vw]'>
            <label className="text-[13px] leading-5 text-gray-700 flex">{title}</label>
            <MdInfoOutline
                data-tooltip-id={field}
                data-tooltip-content={tooltipText}
                className="mt-1 ml-1 text-[12px]"
                style={{ display: display }}
            />
            <ReactTooltip
                id={field}
                place="top"
                effect="solid"
                style={{
                    width: "290px",
                    backgroundColor: "#000",
                    color: "white",
                    fontSize: "12px",
                    boxShadow: 3,
                    borderRadius: "8px",
                    textAlign: 'left',
                }}
            />
        </div>
    );
};

const Reclaimedproductspackdging = ({location, year, month}) => {
    const { open } = GlobalState();
    const [formData, setFormData] = useState([{}]);
    const [r_schema, setRemoteSchema] = useState({})
    const [r_ui_schema, setRemoteUiSchema] = useState({})
    const [loopen, setLoOpen] = useState(false);
    const toastShown = useRef(false);
    const getAuthToken = () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('token')?.replace(/"/g, "");
        }
        return '';
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

    const handleAddNew = () => {
        const newData = [...formData, {}];
        setFormData(newData);

    };

    // The below code on updateFormData
  let axiosConfig = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const updateFormData = async () => {
    const data = {
      client_id : client_id,
      user_id : user_id,
      path: view_path,
      form_data: formData,
      location,
      year,
      month
    }

    const url = `${process.env.BACKEND_API_URL}/datametric/update-fieldgroup`
    try{
      const response = await axios.post(url,data, axiosConfig);
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

      }else {
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
    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&location=${location}&year=${year}&month=${month}`;
    try {
        const response = await axios.get(url, axiosConfig);
        console.log('API called successfully:', response.data);
        setRemoteSchema(response.data.form[0].schema);
        setRemoteUiSchema(response.data.form[0].ui_schema);
        const form_parent = response.data.form_data;
        setFormData(form_parent[0].data);
    } catch (error) {
        console.error('API call failed:', error);
    } finally {
        LoaderClose();
    }
  }
  //Reloading the forms -- White Beard
  useEffect(() => {
    //console.long(r_schema, '- is the remote schema from django), r_ui_schema, '- is the remote ui schema from django')
  },[r_schema, r_ui_schema])

  // console log the form data change
  useEffect(() => {
    console.log('Form data is changed -', formData)
  },[formData])

  // fetch backend and replace initialized forms
  useEffect (()=> {
    if (location && year && month) {
        loadFormData();
        toastShown.current = false; // Reset the flag when valid data is present
    } else {
        // Only show the toast if it has not been shown already
        if (!toastShown.current) {
            toast.warn("Please select location, year, and month first", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            toastShown.current = true; // Set the flag to true after showing the toast
        }
    }
  },[location, year, month])

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission
        console.log('Form data:', formData);
        updateFormData();
    };
    const updateFormDatanew = (updatedData) => {
        setFormData(updatedData);

    };
    const handleRemove = (index) => {
        const updatedData = [...formData];
        updatedData.splice(index, 1);
        setFormData(updatedData);
    };
    const renderFields = () => {
        const fields = Object.keys(schema.items.properties);
        return fields.map((field, index) => (
            <div key={index}>
                {generateTooltip(field, schema.items.properties[field].title, schema.items.properties[field].tooltiptext, schema.items.properties[field].display)}
            </div>
        ));
    };
    return (
        <>

             <ToastContainer style={{ fontSize: "12px" }} />
        <ToastContainer style={{ fontSize: "12px" }} />
        <div className={`overflow-auto custom-scrollbar flex`}>
                <div>
                    <div>
                        <div className='flex'>
                            {renderFields()} {/* Render dynamic fields with tooltips */}
                        </div>
                    </div>

                    <Form
                        className='flex'
                        schema={r_schema}
                        uiSchema={r_ui_schema}
                        formData={formData}
                        onChange={handleChange}
                        validator={validator}
                        widgets={{
                            ...widgets,
                            RemoveWidget: (props) => (
                                <RemoveWidget
                                    {...props}
                                    index={props.id.split('_')[1]} // Pass the index
                                    onRemove={handleRemove}
                                />
                            ),
                            FileUploadWidget: (props) => (
                                <CustomFileUploadWidget
                                    {...props}
                                    scopes="in1"
                                    setFormData={updateFormDatanew}
                                />
                            )

                        }}

                    />
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
            </div>

            <div className="flex justify-start mt-4 right-1">
                <button type="button" className="text-[#007EEF] text-[12px] flex cursor-pointer mt-5 mb-5" onClick={handleAddNew}>
                    <MdAdd className='text-lg' /> Add Row
                </button>
            </div>
            <div className='mb-4'>
                <button type="button" className=" text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end" onClick={handleSubmit}>Submit</button>
            </div>

        </>
    );
};

export default Reclaimedproductspackdging;

