"use client";
import React, { useState, useEffect } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { MdAdd } from "react-icons/md";
import CustomFileUploadWidget from "../../../shared/widgets/CustomFileUploadWidget";
import CombinedWidget from "../../../shared/widgets/emissioncombinedWidget";
import { GlobalState } from "../../../../Context/page";
import RemoveWidget from "../../../shared/widgets/RemoveWidget";
import axiosInstance, { post } from "@/app/utils/axiosMiddleware";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import CalculateSuccess from "./calculateSuccess";
import { useEmissions } from "./EmissionsContext";
import AssignToWidgetEmission from "@/app/shared/widgets/assignToWidgetEmission";

const widgets = {
  EmissonCombinedWidget: CombinedWidget,
  FileUploadWidget: CustomFileUploadWidget,
  AssignTobutton: AssignToWidgetEmission,
  RemoveWidget: RemoveWidget,
};

const view_path = "gri-environment-emissions-301-a-scope-1";
const client_id = 1;
const user_id = 1;

const Scope1 = ({ location, year, month, successCallback, countryCode }) => {
  const { open } = GlobalState();
  const [formData, setFormData] = useState([{}]);
  const [r_schema, setRemoteSchema] = useState({});
  const [r_ui_schema, setRemoteUiSchema] = useState({});
  const [loopen, setLoOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const { climatiqData, setScope1Data } = useEmissions();
  const [localClimatiq, setlocalClimatiq] = useState(0);
  const [activityCache, setActivityCache] = useState({});

  // useEffect(() => {
  //   if (climatiqData?.result?.length > 0) {
  //     const sum = climatiqData.result.reduce((acc, item) => acc + item.co2e, 0);
  //     setlocalClimatiq(sum);
  //   }
  // }, [climatiqData]);

  useEffect(() => {
    setScope1Data(formData);
  }, [formData]);

  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };

  const handleChange = (e) => {
    setFormData(e.formData);
  };

  const handleCombinedWidgetChange = (index, field, value, activityId, unitType) => {
    setFormData(prevFormData => {
      const updatedFormData = [...prevFormData];
      const currentEmission = updatedFormData[index]?.Emission || {};
  
      updatedFormData[index] = {
        ...updatedFormData[index],
        Emission: {
          ...currentEmission,
          [field]: value,
          ...(activityId !== undefined && { activity_id: activityId }),
          ...(unitType !== undefined && { unit_type: unitType })
        }
      };
  
      return updatedFormData;
    });
  };
  

  const handleFileWidgetChange = (index, name, url, type, size, uploadDateTime) => {
    setFormData(prevFormData => {
      const updatedFormData = [...prevFormData];
      const currentEmission = updatedFormData[index]?.Emission || {};
      
      updatedFormData[index] = {
        ...updatedFormData[index],
        Emission: currentEmission,
        FileUpload: {
          name: name,
          url: url,
          type: type,
          size: size,
          uploadDateTime: uploadDateTime
        }
      };
  
      console.log('Updated form data:', updatedFormData);
      return updatedFormData;
    });
  };
  

  const handleAddNew = () => {
    setFormData((prevFormData) => [...prevFormData, { Emission: {} }]);
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
      const response = await post(url, data);

      await successCallback();
      await loadFormData();
      if (response.status === 200) {
        setModalData({
          location,
          month,
          message: "Emission has been created",
          monthly_emissions: localClimatiq,
        });
      } else {
        setModalData({
          message: "Oops, something went wrong",
        });
      }
    } catch (error) {
      setModalData({
        message: "Oops, something went wrong",
      });
    } finally {
      LoaderClose();
    }
  };

  const loadFormData = async () => {
    setFormData([{}]);
    LoaderOpen();
    const base_url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=`;
    const url = `${base_url}${view_path}&&client_id=${client_id}&&user_id=${user_id}&&location=${location}&&year=${year}&&month=${month}`;

    try {
      const response = await axiosInstance.get(url);
      setRemoteSchema(response.data.form[0].schema);
      setRemoteUiSchema(response.data.form[0].ui_schema);
      const form_parent = response.data.form_data;
      const f_data = form_parent[0].data;
      setFormData(f_data);
    } catch (error) {
      console.log(error);
    } finally {
      LoaderClose();
    }
  };

  useEffect(() => {
    loadFormData();
  }, [location, year, month]);

  const handleSubmit = (e) => {
    e.preventDefault();
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

  const handleCloseModal = () => {
    setModalData(null);
  };

  const updateCache = (subcategory, activities) => {
    setActivityCache((prevCache) => ({
      ...prevCache,
      [subcategory]: activities,
    }));
  };

  return (
    <>
      <div
        className={`overflow-y-visible custom-scrollbar flex`}
        style={{ position: "relative" }}
      >
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
                  scopes="scope1"
                  setFormData={updateFormDatanew}
                  onChange={({ name,url,type,size,uploadDateTime }) =>
                    handleFileWidgetChange(
                      props.id.split("_")[1],
                      name,url,type,size,uploadDateTime
                    )
                  }
                />
              ),
              EmissonCombinedWidget: (props) => (
                <CombinedWidget
                  {...props}
                  scope="scope1"
                  year={year}
                  countryCode={countryCode}
                  onChange={({ type, value, activityId, unitType }) =>
                    handleCombinedWidgetChange(
                      props.id.split("_")[1],
                      type,
                      value,
                      activityId,
                      unitType
                    )
                  }
                  activityCache={activityCache}
                  updateCache={updateCache}
                />
              ),
              AssignTobutton: (props) => (
                <AssignToWidgetEmission
                  {...props}
                  scope="scope1"
                  location={location}
                  year={year}
                  month={month}
                  data={formData}
                  countryCode={countryCode}
                />
              ),
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

      {modalData && (
        <CalculateSuccess data={modalData} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default Scope1;
