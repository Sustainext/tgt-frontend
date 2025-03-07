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
  setValidationErrors,
  fetchAssignedTasks
} from "@/lib/redux/features/emissionSlice";
import { debounce } from "lodash";
import { toast } from "react-toastify";
import { validateEmissionsData } from "./emissionValidation";
import { del } from "../../../utils/axiosMiddleware";

const Scope2 = forwardRef(
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

    const scope2State = useSelector((state) => state.emissions.scope2Data);
    const climatiqData = useSelector((state) => state.emissions.climatiqData);
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

    const formData = Array.isArray(scope2State.data?.data)
      ? scope2State.data.data
      : [];

    // Reset autofill when location, year, or month changes
    useEffect(() => {
      setHasAutoFilled(false);
      console.log("Resetting autofill flag due to location/year/month change");
    }, [location, year, month]);

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

    // Update handleChange
    const handleChange = useCallback(
      (e) => {
        // Update the form data
        dispatch(
          updateScopeDataLocal({ scope: 2, data: { data: e.formData } })
        );

        // Get the current validation errors from Redux
        const currentValidationErrors = validationErrors?.scope2?.fields || {};

        // Only run validation if there are existing errors (meaning Calculate was clicked)
        if (Object.keys(currentValidationErrors).length > 0) {
          const validationResult = validateEmissionsData(
            {
              data: { data: e.formData },
            },
            "Scope 2"
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

            // Preserve other scopes' validation errors while updating scope2
            dispatch(
              setValidationErrors({
                ...validationErrors,
                scope2: {
                  fields: newValidationFields,
                  messages: validationResult.messages,
                  emptyFields: validationResult.emptyFields,
                },
              })
            );
          } else {
            // Only remove validation errors for this scope
            const { scope2, ...otherScopeErrors } = validationErrors;
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
          scope: 2,
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
          updateScopeDataLocal({ scope: 2, data: { data: updatedData } })
        );

        // Debug validation errors
        const currentValidationErrors = validationErrors?.scope2?.fields || {};
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
                scope2: {
                  ...validationErrors.scope2,
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
      if (scope2State.status === "succeeded") {
        setRemoteSchema(scope2State.schema);
        setRemoteUiSchema(scope2State.uiSchema);
      }
    }, [scope2State]);

    useEffect(() => {
      const allDataReceived =
        formData &&
        assigned_data.status === "succeeded" &&
        approved_data.status === "succeeded" &&
        (!autoFill || (autoFill && previousMonthData.status === "succeeded"));

      if (!allDataReceived) return;

      const debouncedDataMerge = debounce(() => {
        try {
          const dataMap = new Map();
          const itemsWithoutIds = [];

          formData.forEach((item) => {
            if (item.id) {
              dataMap.set(item.id, item);
            } else if (item.autofillId) {
              dataMap.set(item.autofillId, item);
            } else {
              itemsWithoutIds.push(item);
            }
          });

          if (assigned_data.scope2?.length) {
            assigned_data.scope2.forEach((task) => {
              dataMap.set(task.id, {
                ...task,
                Emission: {
                  ...task.Emission,
                  rowType: "assigned",
                },
              });
            });
          }

          if (approved_data.scope2?.length) {
            approved_data.scope2.forEach((task) => {
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

          const hasOnlySystemEntries = Array.from(dataMap.values()).every(
            (item) =>
              item.Emission?.rowType === "assigned" ||
              item.Emission?.rowType === "approved"
          );

          if (
            autoFill &&
            previousMonthData.status === "succeeded" &&
            previousMonthData.scope2Data?.data &&
            (dataMap.size === 0 ||
              (hasOnlySystemEntries && itemsWithoutIds.length === 0))
          ) {
            previousMonthData.scope2Data.data.forEach((item) => {
              if (!dataMap.has(item.autofillId)) {
                const updatedEmission = { ...item.Emission };
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

          const updatedFormData = [
            ...Array.from(dataMap.values()),
            ...itemsWithoutIds,
          ];

          const currentDataString = JSON.stringify(formData);
          const newDataString = JSON.stringify(updatedFormData);

          if (currentDataString !== newDataString) {
            dispatch(
              updateScopeDataLocal({
                scope: 2,
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
      JSON.stringify(assigned_data.scope2),
      JSON.stringify(approved_data.scope2),
      JSON.stringify(previousMonthData.scope2Data?.data),
    ]);

    if (scope2State.status === "loading") {
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

    if (scope2State.status === "failed") {
      return <div>Error loading data: {scope2State.error}</div>;
    }

    return (
      <>
        <div className="overflow-auto custom-scrollbar">
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
                  onRemove={handleRemoveRow}
                  index={props.id.split("_")[1]}
                  activityCache={activityCache}
                  updateCache={updateCache}
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

export default Scope2;
