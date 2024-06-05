
'use client'
import React, { useState,useEffect  } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import CustomTableWidget6 from '../../../../../shared/widgets/Table/tableWidget6';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from 'react-loader-spinner';

const widgets = {
    TableWidget: CustomTableWidget6,
};

const view_path = 'gri-social-employee_hires-401-1a-emp_turnover-permanent_emp'
const client_id = 1
const user_id = 1

const schema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            yearsold30: { type: "number", title: "< 30 years old" },
            yearsold30to50: { type: "number", title: "30 - 50 years old" },
            yearsold50: { type: "number", title: "> 50 years old" },
            beginning: { type: "number", title: "Total1" },
            end: { type: "number", title: "Total2" },
        },
    },
};


const uiSchema = {
    "ui:widget": "TableWidget",
    'ui:options': {
        titles: [
            { key: "yearsold30", title: "< 30 years old", tooltip:"Please mention the total  employees <30 years old who has left the organisation. Employee Turnover definition: employees who leave the organization voluntarily or due to dismissal, retirement, or death in service."},
            { key: "yearsold30to50", title: "30 - 50 years old", tooltip:"Please mention the total  employees 30-50 years old who has left the organisation. Employee Turnover definition: employees who leave the organization voluntarily or due to dismissal, retirement, or death in service."},
            { key: "yearsold50", title: "> 50 years old", tooltip:"Please mention the total  employees >50 years old who has left the organisation. Employee Turnover definition: employees who leave the organization voluntarily or due to dismissal, retirement, or death in service."},

        ],
        rowLabels: [
            {title:"Male", tooltip:"Please mention the total male employee who has left the organisation. Employees Turnover definition: employees who leave the organization voluntarily or due to dismissal, retirement, or death in service."},
            {title:"Female",tooltip:"Please mention the total female employees who left the organization. Employee Turnover definition: employees who leave the organization voluntarily or due to dismissal, retirement, or death in service."},
            {title:"Others",tooltip:"Please mention the total non-binary employees who has left the organisation. Employee Turnover definition: employees who leave the organization voluntarily or due to dismissal, retirement, or death in service."},

        ]
    },
};

const Tab1 = ({fullName}) => {

    const [formData, setFormData] = useState([
        { yearsold30: "", yearsold30to50: "", yearsold50: "", beginning:"", end:"" },
        { yearsold30: "", yearsold30to50: "", yearsold50: "", beginning:"", end:"" },
        { yearsold30: "", yearsold30to50: "", yearsold50: "", beginning:"", end:'' },
    ]);
    const [r_schema, setRemoteSchema] = useState({})
    const [r_ui_schema, setRemoteUiSchema] = useState({})
    const [loopen, setLoOpen] = useState(false);
    
    const LoaderOpen = () => {
        setLoOpen(true);
      };
      const LoaderClose = () => {
        setLoOpen(false);
      };

    const handleChange = (e) => {
        setFormData(e.formData); // Ensure you are extracting formData from the event
    };

    // The below code on updateFormData
    const updateFormData = async () => {
        LoaderOpen();
        console.log('in the updateFormData function')
        const data = {
        client_id : client_id,
        user_id : user_id,
        path: view_path,
        form_data: formData
        }

        const url = `${process.env.BACKEND_API_URL}/datametric/update-fieldgroup`
        try{
        console.log('Blasting the URL', url);
        const response = await axios.post(url,
            {
            ...data
            }
        );
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
        }
        // console.log('Response:', response.data);
        // } catch (error) {
        // console.error('Error:', error);
        // }
    };

    const loadFormData = async () => {
        LoaderOpen();
        const base_url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path=`;
        const url = `${base_url}${view_path}&&client_id=${client_id}&&user_id=${user_id}`
        console.log(url, 'is the url to be fired')

        //making the GET request
        axios.get(url)
        .then(response => {
        //handling the successful response
        console.log(response.data, 'is the response data')
        setRemoteSchema(response.data.form[0].schema)
        setRemoteUiSchema(response.data.form[0].ui_schema)
        const form_parent = response.data.form_data
        const f_data = form_parent[0].data
        setFormData(f_data)
        LoaderClose();
        // setting the setFormData(response.data.form[0].form_data)
        })
        .catch(error =>{
            const errorMessage =
            error.response && error.response.data && error.response.data.message
              ? error.response.data.message
              : "Oops, something went wrong";
          toast.error(errorMessage, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          LoaderClose();
        //handling the error response
        // console.log('Error:', error);
        });
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
        console.log('From loaded , ready for trigger')
        loadFormData()
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('Form data:', formData);
        updateFormData()
    };

    return (
        <>
            <div className="mx-2 p-3 mb-6 rounded-md">

                <Form
                    schema={r_schema}
                    uiSchema={r_ui_schema}
                    formData={formData}
                    onChange={handleChange}
                    validator={validator}
                    formContext={{ newMonth: fullName }}
                    widgets={widgets}
                />
                <div className='mb-8'>
                    <button type="button" className="text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end" onClick={handleSubmit}>Submit</button>
                </div>
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

export default Tab1;
