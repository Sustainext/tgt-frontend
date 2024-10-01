"use client";
import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import axiosInstance from "../../../utils/axiosMiddleware";
import EmissionWidget from "../../../shared/widgets/emissionWidget";
import { Oval } from "react-loader-spinner";
import CalculateSuccess from "./calculateSuccess";
import { updateScopeData, updateScopeDataLocal } from '@/lib/redux/features/emissionSlice';

const view_path = "gri-environment-emissions-301-a-scope-1";
const client_id = 1;
const user_id = 1;

const Scope1 = forwardRef(({ location, year, month, successCallback, countryCode, setAccordionOpen }, ref) => {
  const dispatch = useDispatch();
  const formData = useSelector(state => state.emissions.scope1Data.data);
  const [r_schema, setRemoteSchema] = useState({});
  const [r_ui_schema, setRemoteUiSchema] = useState({});
  const [loopen, setLoOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [activityCache, setActivityCache] = useState({});

  useImperativeHandle(ref, () => ({
    updateFormData() {
      return updateFormData(formData);
    },
  }));

  const LoaderOpen = () => setLoOpen(true);
  const LoaderClose = () => setLoOpen(false);

  const handleChange = (e) => {
    dispatch(updateScopeDataLocal({ scope: 1, data: e.formData }));
  };

  const handleCombinedWidgetChange = (index, field, value, activityId, unitType, name, url, filetype, size, uploadDateTime) => {
    const updatedFormData = [...formData];
    const currentEmission = updatedFormData[index]?.Emission || {};

    updatedFormData[index] = {
      ...updatedFormData[index],
      Emission: {
        ...currentEmission,
        [field]: value,
        ...(activityId !== undefined && { activity_id: activityId }),
        ...(unitType !== undefined && { unit_type: unitType }),
        ...(name && url && filetype && size && uploadDateTime && {
          file: { name, url, type: filetype, size, uploadDateTime },
        }),
      },
    };

    dispatch(updateScopeDataLocal({ scope: 1, data: updatedFormData }));
  };

  const handleAddNew = () => {
    const updatedFormData = [...formData, { Emission: {} }];
    dispatch(updateScopeDataLocal({ scope: 1, data: updatedFormData }));
  };

  const handleRemoveRow = async (index) => {
    const parsedIndex = parseInt(index, 10);
    const updatedData = formData.filter((_, i) => i !== parsedIndex);
    
    dispatch(updateScopeDataLocal({ scope: 1, data: updatedData }));
    
    try {
      await updateFormData(updatedData);
      successCallback();
      
      if (index === 0) {
        setAccordionOpen(false);
      }
    } catch (error) {
      console.error("Failed to update form data:", error);
    }
  };

  const updateFormData = async (formData) => {
    LoaderOpen();
    try {
      await dispatch(updateScopeData({ scope: 1, data: formData, location, year, month })).unwrap();
    } catch (error) {
      setModalData({
        message: "Oops, something went wrong",
      });
    } finally {
      LoaderClose();
    }
  };

  const updateCache = (subcategory, activities) => {
    setActivityCache(prevCache => ({
      ...prevCache,
      [subcategory]: activities,
    }));
  };

  const loadFormData = async () => {
    LoaderOpen();
    const base_url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=`;
    const url = `${base_url}${view_path}&&client_id=${client_id}&&user_id=${user_id}&&location=${location}&&year=${year}&&month=${month}`;

    try {
      const response = await axiosInstance.get(url);
      setRemoteSchema(response.data.form[0].schema);
      setRemoteUiSchema(response.data.form[0].ui_schema);
      const f_data = response.data.form_data[0].data;
      dispatch(updateScopeDataLocal({ scope: 1, data: f_data }));
    } catch (error) {
      console.log(error);
    } finally {
      LoaderClose();
    }
  };

  useEffect(() => {
    loadFormData();
  }, [year, month, location]);

  return (
    <>
      <div>
        <Form
          schema={r_schema}
          uiSchema={r_ui_schema}
          formData={formData}
          onChange={handleChange}
          validator={validator}
          widgets={{
            EmissionWidget: (props) => (
              <EmissionWidget
                {...props}
                scope="scope1"
                year={year}
                countryCode={countryCode}
                onChange={({
                  type,
                  value,
                  activityId,
                  unitType,
                  name,
                  url,
                  filetype,
                  size,
                  uploadDateTime,
                }) =>
                  handleCombinedWidgetChange(
                    props.id.split("_")[1],
                    type,
                    value,
                    activityId,
                    unitType,
                    name,
                    url,
                    filetype,
                    size,
                    uploadDateTime
                  )
                }
                onRemove={handleRemoveRow}
                index={props.id.split("_")[1]}
                activityCache={activityCache}
                updateCache={updateCache}
              />
            ),
          }}
        />
      </div>
      <div>
        <button
          className="mt-4 text-[#007EEF] px-4 py-2 rounded-md text-[14px]"
          onClick={handleAddNew}
        >
          + Add new
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
        <CalculateSuccess
          data={modalData}
          onClose={() => setModalData(null)}
        />
      )}
    </>
  );
});

export default Scope1;