"use client";
import React, { useState, useEffect } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { MdAdd, MdOutlineDeleteOutline } from "react-icons/md";
import CustomFileUploadWidget from "../../../shared/widgets/CustomFileUploadWidget";
import AssignToWidget from "../../../shared/widgets/assignToWidget";
import CombinedWidget from "../../../shared/widgets/emissioncombinedWidget";
import { GlobalState } from "../../../../Context/page";
import RemoveWidget from "../../../shared/widgets/RemoveWidget";
import axios from "axios";
import axiosInstance, { post } from "@/app/utils/axiosMiddleware";

const widgets = {
  EmissonCombinedWidget: CombinedWidget,
  FileUploadWidget: CustomFileUploadWidget,
  AssignTobutton: AssignToWidget,
  RemoveWidget: RemoveWidget,
};

const view_path = "gri-environment-emissions-301-a-scope-2";
const client_id = 1;
const user_id = 1;
// const notify = (text) => toast(text);

const Scope2 = ({ location, year, month, countryCode }) => {
  const { open } = GlobalState();
  const [formData, setFormData] = useState([{}]);
  const [r_schema, setRemoteSchema] = useState({});
  const [r_ui_schema, setRemoteUiSchema] = useState({});

  const handleChange = (e) => {
    setFormData(e.formData);
  };

  const handleAddNew = () => {
    const newData = [...formData, {}];
    setFormData(newData);
  };
  const updateFormData = async () => {
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
      const response = await post(url, {
        ...data,
      });

      console.log("Response:", response.data);
      // toast(response.message)
      // Handle the response data here
    } catch (error) {
      console.error("Error:", error);
      // toast(error)
      // Handle errors here
    }
  };

  const loadFormData = async () => {
    const base_url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=`;
    const url = `${base_url}${view_path}&&client_id=${client_id}&&user_id=${user_id}&&location=${location}&&year=${year}&&month=${month}`;
    console.log(url, "is the url to be fired");

    // Make the GET request
    axiosInstance
      .get(url)
      .then((response) => {
        // Handle successful response
        console.log(response.data, " is the response data");
        setRemoteSchema(response.data.form[0].schema);
        setRemoteUiSchema(response.data.form[0].ui_schema);
        const form_parent = response.data.form_data;
        const f_data = form_parent[0].data;
        setFormData(f_data);
        // setFormData(response.data.form[0].form_data)
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
  };
  // reload the forms
  useEffect(() => {
    // console.log(r_schema, ' - is the remote schema from django', r_ui_schema, ' - is the remote ui schema from django')
  }, [r_schema, r_ui_schema]);

  // console log the formdata changes

  useEffect(() => {
    console.log("formdata is changed - ", formData);
  }, [formData]);

  // fetch backend and replace initialized forms
  useEffect(() => {
    console.log("Form loaded , ready for trigger");
    loadFormData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
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

  return (
    <>
      <div className={`overflow-y-visible custom-scrollbar flex`}>
        <div>
          <Form
            className="flex"
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
                  index={props.id.split("_")[1]}
                  onRemove={handleRemove}
                />
              ),
              FileUploadWidget: (props) => (
                <CustomFileUploadWidget
                  {...props}
                  scopes="scope2"
                  setFormData={updateFormDatanew}
                />
              ),
              EmissonCombinedWidget : (props) => (
                <CombinedWidget {...props} scope="scope2" year={year} countryCode={countryCode}/>
              )
            }}
          />
        </div>
      </div>

      <div className="flex justify-between right-1 mt-5">
        <button
          type="button"
          className="text-[#007EEF] text-[12px] flex cursor-pointer my-auto"
          onClick={handleAddNew}
        >
          <MdAdd className="text-lg" /> Add Row
        </button>

        <button
          type="button"
          className="h-8 text-center py-1 text-sm w-[100px] bg-[rgb(2,132,199)] text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default Scope2;
