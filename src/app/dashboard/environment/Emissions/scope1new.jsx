"use client";
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useCallback,
  useRef,
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
  setValidationErrors,
  fetchAssignedTasks
} from "@/lib/redux/features/emissionSlice";
import { toast } from "react-toastify";
import { debounce } from "lodash";
import { validateEmissionsData } from "./emissionValidation";
import { del } from "../../../utils/axiosMiddleware";

const local_schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      Emission: {
        type: ["string","object", "null"],
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
    {
      location,
      year,
      month,
      successCallback,
      countryCode,
      setAccordionOpen,
      dataError,
      showError,
    },
    ref
  ) => {
    const dispatch = useDispatch();

    const scope1State = useSelector((state) => state.emissions.scope1Data);
    const selectedRows = useSelector(
      (state) => state.emissions.selectedRows["scope1"]
    );
    const previousMonthData = useSelector(
      (state) => state.emissions.previousMonthData
    );
    const autoFill = useSelector((state) => state.emissions.autoFill);
    const assigned_data = useSelector((state) => state.emissions.assignedTasks);
    const approved_data = useSelector((state) => state.emissions.approvedTasks);
    const [r_schema, setRemoteSchema] = useState({});
    const [r_ui_schema, setRemoteUiSchema] = useState({});
    const [loopen, setLoOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [activityCache, setActivityCache] = useState({});
    const [hasAutoFilled, setHasAutoFilled] = useState(false);

    const formData = Array.isArray(scope1State.data?.data)
      ? scope1State.data.data
      : [];

    useImperativeHandle(ref, () => ({
      updateFormData: () => {
        // Filter and format the data
        const formattedData = formData
          .filter((row) => {
            // Only filter out assigned rows
            return !["assigned"].includes(row.Emission?.rowType);
          })
          .map((row) => {
            // Only reorder approved rows to put Emission first
            if (row.Emission?.rowType === "approved") {
              const { id, Emission, ...rest } = row;
              return {
                Emission,
                id,
                ...rest,
              };
            }
            // Return other rows as is
            return row;
          });

        // Only proceed with update if we have data
        if (formattedData.length > 0) {
          return updateFormData(formattedData);
        }

        return Promise.resolve();
      },
    }));

    const LoaderOpen = () => setLoOpen(true);
    const LoaderClose = () => setLoOpen(false);

    const validationErrors = useSelector(
      (state) => state.emissions.validationErrors
    );

    const handleChange = useCallback(
      (e) => {
        // Update the form data
        dispatch(
          updateScopeDataLocal({ scope: 1, data: { data: e.formData } })
        );

        // Get the current validation errors from Redux
        const currentValidationErrors = validationErrors?.scope1?.fields || {};

        // Only run validation if there are existing errors (meaning Calculate was clicked)
        if (Object.keys(currentValidationErrors).length > 0) {
          const validationResult = validateEmissionsData(
            {
              data: { data: e.formData },
            },
            "Scope 1"
          );

          if (validationResult.hasErrors) {
            // Only keep validation errors for rows that previously had errors
            const newValidationFields = {};
            Object.keys(currentValidationErrors).forEach((rowIndex) => {
              if (validationResult.fields[rowIndex]) {
                newValidationFields[rowIndex] =
                  validationResult.fields[rowIndex];
              }
            });

            // Preserve other scopes' validation errors while updating scope1
            dispatch(
              setValidationErrors({
                ...validationErrors, // Keep existing validation errors for other scopes
                scope1: {
                  // Only update scope1 validation errors
                  fields: newValidationFields,
                  messages: validationResult.messages,
                  emptyFields: validationResult.emptyFields,
                },
              })
            );
          } else {
            // Only remove validation errors for this scope
            const { scope1, ...otherScopeErrors } = validationErrors;
            dispatch(setValidationErrors(otherScopeErrors));
          }
        }
      },
      [dispatch, validationErrors]
    );

    const handleAddNew = useCallback(() => {
      const newRow = { Emission: {} };

      const assignedRows = formData.filter(
        (row) => row.Emission?.rowType === "assigned"
      );
      const approvedRows = formData.filter(
        (row) => row.Emission?.rowType === "approved"
      );

      const regularRows = formData.filter(
        (row) =>
          !row.Emission?.rowType ||
          (row.Emission.rowType !== "assigned" &&
            row.Emission.rowType !== "approved")
      );

      const updatedRegularRows = [...regularRows, newRow];

      const updatedFormData = [
        ...assignedRows,
        ...approvedRows,
        ...updatedRegularRows,
      ];

      dispatch(
        updateScopeDataLocal({
          scope: 1,
          data: { data: updatedFormData },
        })
      );
    }, [formData, dispatch]);

    const deleteTask = async (taskId) => {
      try {
        const response = await del(`organization_task_dashboard/${taskId}`);
        if (response.status === 204) {
          toast.success("Task deleted successfully");
          
        } else {
          console.log('response after delete failed', response);
          
          toast.error("Failed to delete task");
        }
      }
      catch(error) {
        console.error("Error deleting task:", error);
      }}
        

    const handleRemoveRow = useCallback(
      async (index) => {
        const parsedIndex = parseInt(index, 10);
        console.log("Removing row at index:", parsedIndex);

        const rowToRemove = formData[parsedIndex];
        console.log("Row being removed:", rowToRemove);

        if (!rowToRemove) {
          console.error("Row not found");
          return;
        }

        const rowType = rowToRemove.Emission?.rowType;
        console.log("Row type:", rowType);

        if (rowType === "approved") {
          toast.error("Cannot delete approved task row");
          return;
        }

        else if (rowType === "assigned") {
          const deletedRow = await deleteTask(rowToRemove.id);
          console.log("Deleted row:", deletedRow);
          dispatch(fetchAssignedTasks())
        }

        const updatedData = formData.filter((_, i) => i !== parsedIndex);
        console.log("Updated data after removal:", updatedData);

        dispatch(
          updateScopeDataLocal({ scope: 1, data: { data: updatedData } })
        );

        // Debug validation errors
        const currentValidationErrors = validationErrors?.scope1?.fields || {};
        console.log("Current validation errors:", currentValidationErrors);
        console.log("Full validation state:", validationErrors);

        if (Object.keys(currentValidationErrors).length > 0) {
          const newValidationFields = {};

          Object.entries(currentValidationErrors).forEach(
            ([rowIdx, errors]) => {
              const currentIndex = parseInt(rowIdx);
              console.log(
                "Processing row index:",
                currentIndex,
                "with errors:",
                errors
              );

              if (currentIndex < parsedIndex) {
                console.log(
                  "Keeping errors for row before deleted row:",
                  currentIndex
                );
                newValidationFields[currentIndex] = errors;
              } else if (currentIndex > parsedIndex) {
                console.log(
                  "Shifting errors for row after deleted row:",
                  currentIndex,
                  "to",
                  currentIndex - 1
                );
                newValidationFields[currentIndex - 1] = errors;
              } else {
                console.log("Skipping errors for deleted row:", currentIndex);
              }
            }
          );

          console.log(
            "New validation fields after processing:",
            newValidationFields
          );

          if (Object.keys(newValidationFields).length > 0) {
            console.log("Dispatching updated validation errors");
            dispatch(
              setValidationErrors({
                scope1: {
                  ...validationErrors.scope1,
                  fields: newValidationFields,
                },
              })
            );
          } else {
            console.log("Clearing all validation errors");
            dispatch(setValidationErrors({}));
          }
        }

        if (rowType === "calculated") {
          try {
            await updateFormData(updatedData);
          } catch (error) {
            console.error("Failed to update form data:", error);
            toast.error("Failed to update data on the server");
            return;
          }
        }

        if (parsedIndex === 0 && updatedData.length === 0) {
          setAccordionOpen(false);
        }
      },
      [formData, dispatch, setAccordionOpen, validationErrors]
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

    const updateCache = useCallback((cacheKey, activities) => {
      setActivityCache((prevCache) => ({
        ...prevCache,
        [cacheKey]: activities,
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
      // Only proceed if we have all the data
      const allDataReceived =
        formData &&
        assigned_data.status === "succeeded" &&
        approved_data.status === "succeeded" &&
        (!autoFill || (autoFill && previousMonthData.status === "succeeded"));

      if (!allDataReceived) return;

      const debouncedDataMerge = debounce(() => {
        try {
          // Create a map for faster lookup using ID as key
          const dataMap = new Map();

          // Track items without IDs separately
          const itemsWithoutIds = [];

          // First, add all current formData to establish baseline
          formData.forEach((item) => {
            if (item.id) {
              dataMap.set(item.id, item);
            } else if (item.autofillId) {
              dataMap.set(item.autofillId, item);
            } else {
              itemsWithoutIds.push(item);
            }
          });

          // Add assigned data, overwriting any existing entries
          if (assigned_data.scope1?.length) {
            assigned_data.scope1.forEach((task) => {
              dataMap.set(task.id, {
                ...task,
                Emission: {
                  ...task.Emission,
                  rowType: "assigned",
                },
              });
            });
          }

          // Add approved data, only if not already assigned
          if (approved_data.scope1?.length) {
            approved_data.scope1.forEach((task) => {
              if (!dataMap.has(task.id)) {
                dataMap.set(task.id, {
                  ...task,
                  Emission: {
                    ...task.Emission,
                    rowType: "approved",
                  },
                });
              }
            });
          }

          // Handle autofill data only if autoFill is true and current formData is empty
          // (excluding assigned and approved items)
          const hasOnlySystemEntries = Array.from(dataMap.values()).every(
            (item) =>
              item.Emission?.rowType === "assigned" ||
              item.Emission?.rowType === "approved"
          );

          // Handle autofill data with enhanced filtering
          if (
            autoFill &&
            previousMonthData.status === "succeeded" &&
            previousMonthData.scope1Data?.data &&
            (dataMap.size === 0 ||
              (hasOnlySystemEntries && itemsWithoutIds.length === 0))
          ) {
            previousMonthData.scope1Data.data.forEach((item) => {
              if (!dataMap.has(item.autofillId)) {
                const updatedEmission = { ...item.Emission };
                // Reset values
                updatedEmission.Unit = "";
                updatedEmission.Quantity = "";
                updatedEmission.assigned_to = "";
                updatedEmission.file = {};
                if (updatedEmission.unit_type?.includes("Over")) {
                  updatedEmission.Unit2 = "";
                  updatedEmission.Quantity2 = "";
                }

                dataMap.set(item.autofillId, {
                  ...item,
                  Emission: updatedEmission,
                });
              }
            });

            setHasAutoFilled(true);
          }

          // Combine all data sources
          const updatedFormData = [
            ...Array.from(dataMap.values()),
            ...itemsWithoutIds,
          ];

          // Only update if data has actually changed
          const currentDataString = JSON.stringify(formData);
          const newDataString = JSON.stringify(updatedFormData);

          if (currentDataString !== newDataString) {
            dispatch(
              updateScopeDataLocal({
                scope: 1,
                data: { data: updatedFormData },
              })
            );
          }
        } catch (error) {
          console.error("Error merging data:", error);
        }
      }, 300);

      debouncedDataMerge();

      return () => {
        debouncedDataMerge.cancel();
      };
    }, [
      formData,
      assigned_data.status,
      approved_data.status,
      previousMonthData.status,
      autoFill,
      JSON.stringify(assigned_data.scope1),
      JSON.stringify(approved_data.scope1),
      JSON.stringify(previousMonthData.scope1Data?.data),
    ]);

    useEffect(() => {
      setHasAutoFilled(false);
    }, [location, year, month]);

    const formRef = useRef();

    const scopeReRender = useSelector((state) => state.emissions.scopeReRender);

    useEffect(() => {}, [scopeReRender]);

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
        <div className="overflow-auto custom-scrollbar">
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
        <div className="flex justify-between items-center">
          <button
            className="mt-4 text-[#007EEF] px-4 py-2 rounded-md text-[14px]"
            onClick={handleAddNew}
          >
            + Add new
          </button>
          {/* {showError && (
            <div className="text-xs text-red-500 mt-4 flex items-center">
              <MdError />
              <span>{dataError}</span>
            </div>
          )} */}
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
