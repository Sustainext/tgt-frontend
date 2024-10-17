"use client";
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import EmissionWidget from "../../../shared/widgets/emissionWidget";
import { Oval } from "react-loader-spinner";
import CalculateSuccess from "./calculateSuccess";
import {
  updateScopeData,
  updateScopeDataLocal,
} from "@/lib/redux/features/emissionSlice";

const Scope2 = forwardRef(
  (
    {
      location,
      year,
      month,
      successCallback,
      countryCode,
      setAccordionOpen,
    },
    ref
  ) => {
    const dispatch = useDispatch();

    const scope2State = useSelector((state) => state.emissions.scope2Data);
    const climatiqData = useSelector((state) => state.emissions.climatiqData);
    const previousMonthData = useSelector((state) => state.emissions.previousMonthData);
    const autoFill = useSelector((state) => state.emissions.autoFill);
    const assigned_data = useSelector(state=>state.emissions.assignedTasks)


    const [r_schema, setRemoteSchema] = useState({});
    const [r_ui_schema, setRemoteUiSchema] = useState({});
    const [loopen, setLoOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [activityCache, setActivityCache] = useState({});

    const formData = Array.isArray(scope2State.data?.data) ? scope2State.data.data : [];

    useImperativeHandle(ref, () => ({
      updateFormData: () => updateFormData(formData),
    }));

    const LoaderOpen = () => setLoOpen(true);
    const LoaderClose = () => setLoOpen(false);

    const handleChange = useCallback((e) => {
      dispatch(updateScopeDataLocal({ scope: 2, data: { data: e.formData } }));
    }, [dispatch]);

    const handleCombinedWidgetChange = useCallback((
      index,
      field,
      value,
      activityId,
      unitType,
      name,
      url,
      filetype,
      size,
      uploadDateTime
    ) => {
      const updatedFormData = [...formData];
      const currentEmission = updatedFormData[index]?.Emission || {};

      updatedFormData[index] = {
        ...updatedFormData[index],
        Emission: {
          ...currentEmission,
          [field]: value,
          ...(activityId !== undefined && { activity_id: activityId }),
          ...(unitType !== undefined && { unit_type: unitType }),
          ...(name &&
            url &&
            filetype &&
            size &&
            uploadDateTime && {
              file: { name, url, type: filetype, size, uploadDateTime },
            }),
        },
      };

      dispatch(updateScopeDataLocal({ scope: 2, data: { data: updatedFormData } }));
    }, [formData, dispatch]);

    const handleAddNew = useCallback(() => {
      const newRow = { Emission: {} };
      const updatedFormData = [...formData, newRow];
      dispatch(updateScopeDataLocal({ scope: 2, data: { data: updatedFormData } }));
    }, [formData, dispatch]);

    const handleRemoveRow = useCallback(async (index) => {
      const parsedIndex = parseInt(index, 10);
      const updatedData = formData.filter((_, i) => i !== parsedIndex);

      dispatch(updateScopeDataLocal({ scope: 2, data: { data: updatedData } }));

      try {
        await updateFormData(updatedData);

        if (parsedIndex === 0 && updatedData.length === 0) {
          setAccordionOpen(false);
        }
      } catch (error) {
        console.error("Failed to update form data:", error);
      }
    }, [formData, dispatch, setAccordionOpen]);

    const updateFormData = useCallback(async (data) => {
      LoaderOpen();
      try {
        await dispatch(
          updateScopeData({ scope: 2, data: { data }, location, year, month })
        ).unwrap();
        successCallback();
      } catch (error) {
        setModalData({
          message: "Oops, something went wrong",
        });
      } finally {
        LoaderClose();
      }
    }, [dispatch, location, year, month, successCallback]);

    const updateCache = useCallback((subcategory, activities) => {
      setActivityCache((prevCache) => ({
        ...prevCache,
        [subcategory]: activities,
      }));
    }, []);

    useEffect(() => {
      if (scope2State.status === 'succeeded') {
        setRemoteSchema(scope2State.schema);
        setRemoteUiSchema(scope2State.uiSchema);
      }
    }, [scope2State]);

    useEffect(() => {
      // if (autoFill && previousMonthData.status === 'succeeded') {
      //   const prevMonthFormData = previousMonthData.scope2Data?.data || [];
        
      //   const formattedPrevMonthData = prevMonthFormData.map(item => {
      //     const updatedEmission = { ...item.Emission };
          
      //     updatedEmission.Unit = '';
      //     updatedEmission.Quantity = '';
          
      //     if (updatedEmission.unit_type && updatedEmission.unit_type.includes('Over')) {
      //       updatedEmission.Unit2 = '';
      //       updatedEmission.Quantity2 = '';
      //     }
          
      //     return {
      //       ...item,
      //       Emission: updatedEmission
      //     };
      //   });
        
      //   const currentFormData = formData.length > 0 ? formData : formattedPrevMonthData;
      //   dispatch(updateScopeDataLocal({ scope: 2, data: { data: currentFormData } }));
      // }
      if (assigned_data.status === 'succeeded') {
        const assigned_data_scope = assigned_data.scope2;
        
        // Format the assigned data
        const formattedAssignedData = assigned_data_scope.map(task => ({
          id: task.id,
          Emission: {
            ...task,
            Category: task.Category,
            Subcategory: task.Subcategory,
            Activity: task.Activity,
            Quantity: task.Quantity,
            Unit: task.Unit,
            Quantity2: task.Quantity2,
            Unit2: task.Unit2,
            rowType: 'assigned',
            assignTo: task.assign_to,
            deadline: task.deadline
          }
        }));
        console.log('formatted assigned task',assigned_data_scope,formattedAssignedData);
        
        // Combine existing formData with formatted assigned data
        const updated_formData = [
          ...formData.filter(item => !formattedAssignedData.some(assignedItem => assignedItem.id === item.id)),
          ...formattedAssignedData
        ];
      
        dispatch(
          updateScopeDataLocal({ scope: 2, data: { data: updated_formData } })
        );
      }
    }, [climatiqData.totalScore, previousMonthData]);

    if (scope2State.status === 'loading') {
      return (
        <div className="flex items-center justify-center">
          <Oval
            height={50}
            width={50}
            color="#00BFFF"
            secondaryColor="#f3f3f3"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      );
    }

    if (scope2State.status === 'failed') {
      return <div>Error loading data: {scope2State.error}</div>;
    }

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
                  scope="scope2"
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
  }
);

export default Scope2;