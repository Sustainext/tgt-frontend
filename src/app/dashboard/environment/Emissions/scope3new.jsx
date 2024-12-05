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
import { debounce } from "lodash";
import { MdError } from "react-icons/md";

const Scope3 = forwardRef(
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

    const scope3State = useSelector((state) => state.emissions.scope3Data);
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

    const formData = Array.isArray(scope3State.data?.data)
      ? scope3State.data.data
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

    const handleChange = useCallback(
      (e) => {
        dispatch(
          updateScopeDataLocal({ scope: 3, data: { data: e.formData } })
        );
      },
      [dispatch]
    );

    const handleCombinedWidgetChange = useCallback(
      (
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

        dispatch(
          updateScopeDataLocal({ scope: 3, data: { data: updatedFormData } })
        );
      },
      [formData, dispatch]
    );

    const handleAddNew = useCallback(() => {
      // Create the new row
      const newRow = { Emission: {} };

      // Get all assigned and approved rows
      const assignedRows = formData.filter(
        (row) => row.Emission?.rowType === "assigned"
      );
      const approvedRows = formData.filter(
        (row) => row.Emission?.rowType === "approved"
      );

      // Get all other rows
      const regularRows = formData.filter(
        (row) =>
          !row.Emission?.rowType ||
          (row.Emission.rowType !== "assigned" &&
            row.Emission.rowType !== "approved")
      );

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
          scope: 3,
          data: { data: updatedFormData },
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

        if (rowType === "assigned" || rowType === "approved") {
          // Prevent deletion for assigned or approved rows
          toast.error("Cannot delete assigned or approved rows");
          return;
        }

        const updatedData = formData.filter((_, i) => i !== parsedIndex);
        console.log("updated data", updatedData, " for index ", parsedIndex);

        // Update local state
        dispatch(
          updateScopeDataLocal({ scope: 3, data: { data: updatedData } })
        );

        if (rowType === "calculated") {
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
            updateScopeData({ scope: 3, data: { data }, location, year, month })
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
      if (scope3State.status === "succeeded") {
        setRemoteSchema(scope3State.schema);
        setRemoteUiSchema(scope3State.uiSchema);
      }
    }, [scope3State]);

    // useEffect(() => {
    //   const debouncedDataMerge = debounce(() => {
    //     if (
    //       (autoFill && previousMonthData.status === "succeeded") ||
    //       assigned_data.status === "succeeded" ||
    //       approved_data.status === "succeeded"
    //     ) {
    //       let updatedFormData = [...formData];

    //       // Handle Assigned Data
    //       if (assigned_data.status === 'succeeded') {
    //         const assignedDataScope = assigned_data.scope3;

    //         const formattedAssignedData = assignedDataScope.map(task => ({
    //           ...task,
    //           Emission: {
    //             ...task.Emission,
    //             rowType: 'assigned'
    //           }
    //         }));

    //         updatedFormData = [
    //           ...formattedAssignedData,
    //           ...updatedFormData.filter(
    //             (item) => !formattedAssignedData.some((assignedItem) => assignedItem.id === item.id)
    //           ),

    //         ];
    //       }

    //       // Handle Approved Data
    //       if (approved_data.status === 'succeeded') {
    //         const approvedDataScope = approved_data.scope3;

    //         const formattedApprovedData = approvedDataScope.map(task => ({
    //           ...task,
    //           Emission: {
    //             ...task.Emission,
    //             rowType: 'approved'
    //           }
    //         }));

    //         updatedFormData = [
    //           ...formattedApprovedData,
    //           ...updatedFormData.filter(
    //             (item) => !formattedApprovedData.some((approvedItem) => approvedItem.id === item.id)
    //           ),

    //         ];
    //       }

    //       // Handle Previous Month Data (Auto-Fill)
    //       if (autoFill && previousMonthData.status === "succeeded") {
    //         console.log('Autofill triggered');
    //         const prevMonthFormData = previousMonthData.scope3Data?.data || [];

    //         const formattedPrevMonthData = prevMonthFormData.map((item) => {
    //           const updatedEmission = { ...item.Emission };

    //           // Resetting unit and quantity fields
    //           updatedEmission.Unit = "";
    //           updatedEmission.Quantity = "";

    //           if (
    //             updatedEmission.unit_type &&
    //             updatedEmission.unit_type.includes("Over")
    //           ) {
    //             updatedEmission.Unit2 = "";
    //             updatedEmission.Quantity2 = "";
    //           }

    //           return {
    //             ...item,
    //             Emission: updatedEmission,
    //           };
    //         });

    //         updatedFormData = [
    //           ...formattedPrevMonthData.filter(
    //             (item) => !updatedFormData.some((existingItem) => existingItem.id === item.id),
    //             ...updatedFormData,
    //           )
    //         ];
    //       }

    //       // Dispatch state update only once
    //       dispatch(updateScopeDataLocal({ scope: 3, data: { data: updatedFormData } }));
    //     }
    //   }, 300);

    //   debouncedDataMerge();

    //   return () => {
    //     debouncedDataMerge.cancel();
    //   };
    // }, [autoFill, previousMonthData.status, assigned_data.status, approved_data.status, year, month, location, formData]);

    // Add at the top of Scope3 component
    const [hasAutoFilled, setHasAutoFilled] = useState(false);

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

          if (assigned_data.scope3?.length) {
            assigned_data.scope3.forEach((task) => {
              dataMap.set(task.id, {
                ...task,
                Emission: {
                  ...task.Emission,
                  rowType: "assigned",
                },
              });
            });
          }

          if (approved_data.scope3?.length) {
            approved_data.scope3.forEach((task) => {
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
            previousMonthData.scope3Data?.data &&
            (dataMap.size === 0 ||
              (hasOnlySystemEntries && itemsWithoutIds.length === 0))
          ) {
            previousMonthData.scope3Data.data.forEach((item) => {
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
                scope: 3,
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
      JSON.stringify(assigned_data.scope3),
      JSON.stringify(approved_data.scope3),
      JSON.stringify(previousMonthData.scope3Data?.data),
    ]);

    if (scope3State.status === "loading") {
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

    if (scope3State.status === "failed") {
      return <div>Error loading data: {scope3State.error}</div>;
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
                  scope="scope3"
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
          {showError && (
            <div className="text-xs text-red-500 mt-4 flex items-center">
              <MdError />
              <span>{dataError}</span>
            </div>
          )}
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

export default Scope3;
