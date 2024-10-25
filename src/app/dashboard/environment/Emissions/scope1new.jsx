"use client";
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useCallback,
  useRef
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
import {toast} from 'react-toastify';
import { debounce } from "lodash";

const local_schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      Emission: {
        type: "string",
        title: "Emissionsscop2",
      },
    },
  },
};

const local_ui_schema = {
  items: {
    Emission: {
      "ui:widget": "EmissionWidget",
      "ui:options": {
        label: false,
      },
      "ui:horizontal": true,
    },
    "ui:order": ["Emission"],
    "ui:options": {
      layout: "horizontal",
      addable: false,
      orderable: false,
      removable: false,
    },
  },
};

const Scope1 = forwardRef(
  (
    { location, year, month, successCallback, countryCode, setAccordionOpen },
    ref
  ) => {
    const dispatch = useDispatch();

    const scope1State = useSelector((state) => state.emissions.scope1Data);
    const climatiqData = useSelector((state) => state.emissions.climatiqData);
    const previousMonthData = useSelector(
      (state) => state.emissions.previousMonthData
    );
    const autoFill = useSelector((state) => state.emissions.autoFill);
    const assigned_data = useSelector(state=>state.emissions.assignedTasks)
    const approved_data = useSelector(state=>state.emissions.approvedTasks)
    const [r_schema, setRemoteSchema] = useState({});
    const [r_ui_schema, setRemoteUiSchema] = useState({});
    const [loopen, setLoOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [activityCache, setActivityCache] = useState({});

    const formData = Array.isArray(scope1State.data?.data)
      ? scope1State.data.data
      : [];

    useImperativeHandle(ref, () => ({
      updateFormData: () => updateFormData(formData),
    }));

    const LoaderOpen = () => setLoOpen(true);
    const LoaderClose = () => setLoOpen(false);

    const handleChange = useCallback(
      (e) => {
        dispatch(
          updateScopeDataLocal({ scope: 1, data: { data: e.formData } })
        );
      },
      [dispatch]
    );

    // const handleCombinedWidgetChange = useCallback(
    //   (
    //     index,
    //     field,
    //     value,
    //     activityId,
    //     unitType,
    //     name,
    //     url,
    //     filetype,
    //     size,
    //     uploadDateTime
    //   ) => {
    //     const updatedFormData = [...formData];
    //     const currentEmission = updatedFormData[index]?.Emission || {};

    //     updatedFormData[index] = {
    //       ...updatedFormData[index],
    //       Emission: {
    //         ...currentEmission,
    //         [field]: value,
    //         ...(activityId !== undefined && { activity_id: activityId }),
    //         ...(unitType !== undefined && { unit_type: unitType }),
    //         ...(name &&
    //           url &&
    //           filetype &&
    //           size &&
    //           uploadDateTime && {
    //             file: { name, url, type: filetype, size, uploadDateTime },
    //           }),
    //       },
    //     };

    //     dispatch(
    //       updateScopeDataLocal({ scope: 1, data: { data: updatedFormData } })
    //     );
    //   },
    //   [formData, dispatch]
    // );

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
      uploadDateTime,
      rowId  // Add rowId parameter
    ) => {
      const updatedFormData = [...formData];
      
      // Only update the specific row if rowId is provided
      if (rowId) {
        const rowIndex = updatedFormData.findIndex((item, idx) => 
          `scope${scope}_${idx}` === rowId
        );
        if (rowIndex !== -1) {
          const currentEmission = updatedFormData[rowIndex]?.Emission || {};
          updatedFormData[rowIndex] = {
            ...updatedFormData[rowIndex],
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
        }
      } else {
        // Original logic for non-assignment updates
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
      }
    
      dispatch(updateScopeDataLocal({ scope: 1, data: { data: updatedFormData } }));
    }, [formData, dispatch]);

    // const handleAddNew = useCallback(() => {
    //   const newRow = { Emission: {} };
    //   const updatedFormData = [...formData, newRow];
    //   dispatch(
    //     updateScopeDataLocal({ scope: 1, data: { data: updatedFormData } })
    //   );
    // }, [formData, dispatch]);

    const handleAddNew = useCallback(() => {
      // Create the new row
      const newRow = { Emission: {} };
      
      // Get all assigned and approved rows
      const assignedRows = formData.filter(row => row.Emission?.rowType === 'assigned');
      const approvedRows = formData.filter(row => row.Emission?.rowType === 'approved');
      
      // Get all other rows
      const regularRows = formData.filter(row => !row.Emission?.rowType || 
        (row.Emission.rowType !== 'assigned' && row.Emission.rowType !== 'approved'));
      
      // Add the new row to regular rows
      const updatedRegularRows = [...regularRows, newRow];
      
      // Combine all rows in the desired order:
      // regular rows (including the new one) first, then assigned, then approved
      const updatedFormData = [
        ...assignedRows,
        ...approvedRows,
        ...updatedRegularRows,
      ];
      
      dispatch(
        updateScopeDataLocal({ 
          scope: 1, 
          data: { data: updatedFormData } 
        })
      );
    }, [formData, dispatch]);

    const handleRemoveRow = useCallback(
      async (index) => {
        const parsedIndex = parseInt(index, 10);
        const rowToRemove = formData[parsedIndex];
    
        if (!rowToRemove) {
          console.error("Row not found");
          return;
        }
    
        const rowType = rowToRemove.Emission?.rowType;
    
        if (rowType === 'assigned' || rowType === 'approved') {
          // Prevent deletion for assigned or approved rows
          toast.error("Cannot delete assigned or approved rows");
          return;
        }
    
        const updatedData = formData.filter((_, i) => i !== parsedIndex);
        console.log("updated data", updatedData, " for index ", parsedIndex);
    
        // Update local state
        dispatch(
          updateScopeDataLocal({ scope: 1, data: { data: updatedData } })
        );
    
        if (rowType === 'calculated') {
          try {
            // Only call API for calculated rows
            await updateFormData(updatedData);
          } catch (error) {
            console.error("Failed to update form data:", error);
            toast.error("Failed to update data on the server");
            // Optionally, revert the local state change here
            return;
          }
        }
    
        // Check if we need to close the accordion
        if (parsedIndex === 0 && updatedData.length === 0) {
          setAccordionOpen(false);
        }
    
        // Notify success
        // if(rowType !== 'default') {
        //   toast.success("Row removed successfully");
        // }
      },
      [formData, dispatch, setAccordionOpen]
    );

    const updateFormData = useCallback(
      async (data) => {
        LoaderOpen();
        try {
          await dispatch(
            updateScopeData({ scope: 1, data: { data }, location, year, month })
          ).unwrap();
          successCallback();
        } catch (error) {
          setModalData({
            message: "Oops, something went wrong",
          });
        } finally {
          LoaderClose();
        }
      },
      [dispatch, location, year, month, successCallback]
    );

    const updateCache = useCallback((subcategory, activities) => {
      setActivityCache((prevCache) => ({
        ...prevCache,
        [subcategory]: activities,
      }));
    }, []);

    useEffect(() => {
      if (
        scope1State.status === "succeeded" &&
        scope1State.schema &&
        scope1State.uiSchema
      ) {
        setRemoteSchema(scope1State.schema);
        setRemoteUiSchema(scope1State.uiSchema);
      }
    }, [scope1State.status, scope1State.schema, scope1State.uiSchema]);

useEffect(() => {
  const debouncedDataMerge = debounce(() => {
    if (
      (autoFill && previousMonthData.status === "succeeded") ||
      assigned_data.status === "succeeded" ||
      approved_data.status === "succeeded"
    ) {
      let updatedFormData = [...formData];

      // Handle Assigned Data
      if (assigned_data.status === 'succeeded') {
        const assignedDataScope = assigned_data.scope1;

        const formattedAssignedData = assignedDataScope.map(task => ({
          ...task,
          Emission: {
            ...task.Emission,
            rowType: 'assigned'
          }
        }));

        updatedFormData = [
          ...formattedAssignedData,
          ...updatedFormData.filter(
            (item) => !formattedAssignedData.some((assignedItem) => assignedItem.id === item.id)
          ),
         
        ];
      }

      // Handle Approved Data
      if (approved_data.status === 'succeeded') {
        const approvedDataScope = approved_data.scope1;

        const formattedApprovedData = approvedDataScope.map(task => ({
          ...task,
          Emission: {
            ...task.Emission,
            rowType: 'approved'
          }
        }));

        updatedFormData = [
          ...formattedApprovedData,
          ...updatedFormData.filter(
            (item) => !formattedApprovedData.some((approvedItem) => approvedItem.id === item.id)
          ),
          
        ];
      }

      // Handle Previous Month Data (Auto-Fill)
      if (autoFill && previousMonthData.status === "succeeded") {
        console.log('Autofill triggered');
        const prevMonthFormData = previousMonthData.scope1Data?.data || [];

        const formattedPrevMonthData = prevMonthFormData.map((item) => {
          const updatedEmission = { ...item.Emission };

          // Resetting unit and quantity fields
          updatedEmission.Unit = "";
          updatedEmission.Quantity = "";

          if (
            updatedEmission.unit_type &&
            updatedEmission.unit_type.includes("Over")
          ) {
            updatedEmission.Unit2 = "";
            updatedEmission.Quantity2 = "";
          }

          return {
            ...item,
            Emission: updatedEmission,
          };
        });

        updatedFormData = [
          ...formattedPrevMonthData.filter(
            (item) => !updatedFormData.some((existingItem) => existingItem.id === item.id),
            ...updatedFormData,
          )
        ];
      }

      // Dispatch state update only once
      dispatch(updateScopeDataLocal({ scope: 1, data: { data: updatedFormData } }));
    }
  }, 300);

  debouncedDataMerge();

  return () => {
    debouncedDataMerge.cancel();
  };
}, [autoFill, previousMonthData.status, assigned_data.status, approved_data.status, year, month, location, formData]);


const formRef = useRef();

  // Add this function to handle form validation
  const handleFormValidation = useCallback((formData, errors) => {
    // If the form has the noValidate flag, return empty errors
    if (formRef.current?.noValidate) {
      return {};
    }
    return errors;
  }, []);

  const scopeReRender = useSelector(state=>state.emissions.scopeReRender)

  useEffect(()=>{},[scopeReRender])
  
    if (scope1State.status === "loading") {
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

    if (scope1State.status === "failed") {
      return <div>Error loading data: {scope1State.error}</div>;
    }

    return (
      <>
        <div>
          <Form
            schema={local_schema}
            uiSchema={local_ui_schema}
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
                  onRemove={handleRemoveRow}
                  index={props.id.split("_")[1]}
                  activityCache={activityCache}
                  updateCache={updateCache}
                  formRef={formRef}
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

export default Scope1;
