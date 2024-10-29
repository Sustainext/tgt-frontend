"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { scope1Info, scope2Info, scope3Info } from "../data/scopeInfo";
import { unitTypes } from "../data/units";
import { categoriesToAppend, categoryMappings } from "../data/customActivities";
import axios from "axios"; // Import icons from React Icons
import { LuTrash2 } from "react-icons/lu";
import { TbUpload } from "react-icons/tb";
import debounce from "lodash/debounce";
import { toast } from "react-toastify";
import { BlobServiceClient } from "@azure/storage-blob";
import { MdClose } from "react-icons/md";
import { RiFileExcel2Line } from "react-icons/ri";
import { BsFiletypePdf, BsFileEarmarkImage } from "react-icons/bs";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import {
  setSelectedRows,
  updateSelectedRow,
  toggleSelectAll,
} from "@/lib/redux/features/emissionSlice";
import { useDispatch, useSelector } from "react-redux";
import AssignEmissionModal from "./assignEmissionModal";
import MultipleAssignEmissionModal from "./MultipleAssignEmissionModal";
import { getMonthName } from "@/app/utils/dateUtils";

const EmissionWidget = React.memo(
  ({
    value = {},
    onChange,
    scope,
    year,
    countryCode,
    activityCache,
    updateCache,
    onRemove,
    index,
    id,
    formRef,
  }) => {
    const dispatch = useDispatch();
    const rowId = scope + "_" + index;
    const [rowType, setRowType] = useState(value.rowType || "default");
    const [category, setCategory] = useState(value.Category || "");
    const [subcategory, setSubcategory] = useState(value.Subcategory || "");
    const [activity, setActivity] = useState(value.Activity || "");
    const [quantity, setQuantity] = useState(value.Quantity || "");
    const [unit, setUnit] = useState(value.Unit || "");
    const [quantity2, setQuantity2] = useState(value.Quantity2 || "");
    const [unit2, setUnit2] = useState(value.Unit2 || "");
    const [activity_id, setActivityId] = useState(value.activity_id || "");
    const [unit_type, setUnitType] = useState(value.unit_type || "");
    const [subcategories, setSubcategories] = useState([]);
    const [activities, setActivities] = useState([]);
    const [units, setUnits] = useState([]);
    const [units2, setUnits2] = useState([]);
    const [baseCategories, setBaseCategories] = useState([]);
    const [activitySearch, setActivitySearch] = useState("");
    const [isDropdownActive, setIsDropdownActive] = useState(false);
    const isFetching = useRef(false);
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);
    const quantityRef = useRef(null);

    // Assign To
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [isMultipleAssignModalOpen, setIsMultipleAssignModalOpen] =
      useState(false);
    const users = useSelector((state) => state.emissions.users.data);
    const [assignedUser, setAssignedUser] = useState(value.assigned_to || "");
    const { location, month } = useSelector((state) => state.emissions);
    //row selection
    const selectedRows = useSelector(
      (state) => state.emissions.selectedRows[scope]
    );
    const scopeDataFull = useSelector(
      (state) => state.emissions[`${scope}Data`]
    );
    const [isSelected, setIsSelected] = useState(false);
    const selectAll = useSelector(
      (state) => state.emissions.selectAllChecked[scope]
    );

    // Function to check if current row is selected
    const isRowSelected = useCallback(() => {
      return selectedRows?.some((row) => row.rowId === rowId);
    }, [selectedRows, rowId]);

    const updateSelectedRowIfNeeded = useCallback(
      (updatedValue) => {
        if (isRowSelected()) {
          dispatch(
            updateSelectedRow({
              scope,
              rowId,
              isSelected: true,
              rowData: updatedValue,
            })
          );
        }
      },
      [dispatch, scope, rowId, isRowSelected]
    );

    useEffect(() => {
      const filteredUser = users?.filter(
        (user) => user.id === parseInt(value.assigned_to)
      );
      setAssignedUser(filteredUser[0]?.username);
    }, [users, value.assigned_to]);

    const handleAssignClick = () => {
      // Disable form validation before opening modal
      if (category && subcategory) setIsAssignModalOpen(true);
      else toast.error("Please select category and subcategory");
    };

    const handleCloseAssignModal = () => {
      // Re-enable form validation after modal closes
      if (formRef?.current) {
        formRef.current.noValidate = false;
      }
      setIsAssignModalOpen(false);
    };

    const handleMultipleAssignClick = () => {
      // Check if all selected rows have category and subcategory
      const invalidRows = selectedRows.filter(
        (row) => !row.Emission?.Category || !row.Emission?.Subcategory
      );

      if (invalidRows.length > 0) {
        toast.error("All rows must have Category and Sub-Category selected");
        return;
      }

      setIsMultipleAssignModalOpen(true);
    };

    const handleCloseMultipleAssignModal = () => {
      setIsMultipleAssignModalOpen(false);
      // setShowAllTasks(false)
    };

    // Unit validation

    const [quantityError, setQuantityError] = useState("");
    const [quantity2Error, setQuantity2Error] = useState("");
    const requiresNumericValidation = (unit) =>
      [
        "Number of items",
        "Number of flights",
        "passengers",
        "Number of vehicles",
        "number of Nights",
      ].includes(unit);

    const validateQuantity = (value, unit) => {
      if (requiresNumericValidation(unit) && !/^\d+$/.test(value)) {
        return "This field must be a positive integer.";
      }
      return "";
    };
    const scopeMappings = {
      scope1: scope1Info,
      scope2: scope2Info,
      scope3: scope3Info,
    };

    const scopeData = scopeMappings[scope];

    const fetchBaseCategories = async () => {
      if (!scopeData) {
        console.error("Invalid scope provided");
        return;
      }
      const categories = scopeData.flatMap((info) =>
        info.Category.map((c) => c.name)
      );
      setBaseCategories(categories);
    };

    useEffect(() => {
      fetchBaseCategories();
    }, []);

    let wildcard = false;
    const fetchActivities = useCallback(
      async (page = 1, customFetchExecuted = false) => {
        if (isFetching.current) return;
        isFetching.current = true;

        const updateCacheAndActivities = (data, type = "default") => {
          setActivities((prevData) => {
            const updatedData = [...prevData, ...data];
            updateCache(subcategory, updatedData);
            return updatedData;
          });
        };

        // Check cache first
        if (activityCache[subcategory]) {
          console.log("Using cached activities", activityCache[subcategory]);
          setActivities(activityCache[subcategory]);
          isFetching.current = false;
          return;
        }

        const baseURL = "https://api.climatiq.io";
        const resultsPerPage = 500;
        const axiosConfig = {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_APP_CLIMATIQ_KEY}`,
            Accept: "application/json",
            "Content-type": "application/json",
          },
        };

        if (!category || !subcategory || !year || !countryCode) {
          console.warn(
            "Category, Subcategory, Year, and CountryCode are required"
          );
          isFetching.current = false;
          return;
        }

        const region = countryCode || "*";
        let currentYear = year;
        if (year === "2024") currentYear = "2023";
        let wildcardResultZero = false;

        let totalResults = 0;
        let totalPrivateResults = 0;
        let totalPages = 1;
        let totalPagesCustom = 0;
        let activitiesData = [];
        let wildcardActivitiesData = [];
        let yearlyResponseData = [];
        let customFetchData = [];

        try {
          while (page <= totalPages) {
            if (!wildcard) {
              const url = `${baseURL}/data/v1/search?results_per_page=${resultsPerPage}&year=${currentYear}&region=${region}*&category=${subcategory}&page=${page}&data_version=^${process.env.NEXT_PUBLIC_APP_CLIMATIQ_DATAVERSION}`;
              const response = await axios.get(url, axiosConfig);

              activitiesData = [...activitiesData, ...response.data.results];
              updateCacheAndActivities(response.data.results);

              totalResults = response.data.results.length;
              totalPages = response.data.last_page;
              totalPrivateResults = activitiesData.reduce((count, activity) => {
                if (activity.access_type === "private") {
                  count += 1;
                }
                return count;
              }, 0);
            }

            const effectiveCount = totalResults - totalPrivateResults;
            if (effectiveCount <= 5) {
              wildcard = true;
            }

            if (wildcard) {
              const wildcardResponse = await axios.get(
                `${baseURL}/data/v1/search?results_per_page=${resultsPerPage}&year=${currentYear}&region=*&category=${subcategory}&page=${page}&data_version=^${process.env.NEXT_PUBLIC_APP_CLIMATIQ_DATAVERSION}`,
                axiosConfig
              );

              wildcardActivitiesData = [
                ...wildcardActivitiesData,
                ...wildcardResponse.data.results,
              ];
              updateCacheAndActivities(wildcardResponse.data.results);

              totalPages = wildcardResponse.data.last_page;

              if (totalPages === 0) wildcardResultZero = true;

              if (wildcardResultZero) {
                for (let i = currentYear - 1; i >= 2019; i--) {
                  const yearlyResponse = await axios.get(
                    `${baseURL}/data/v1/search?results_per_page=${resultsPerPage}&year=${i}&region=${region}*&category=${subcategory}&page=${page}&data_version=^${process.env.NEXT_PUBLIC_APP_CLIMATIQ_DATAVERSION}`,
                    axiosConfig
                  );
                  const yearlyActivitiesData = yearlyResponse.data.results;
                  totalPages = yearlyResponse.data.last_page;
                  yearlyResponseData = [
                    ...yearlyResponseData,
                    ...yearlyActivitiesData,
                  ];
                  if (yearlyActivitiesData.length !== 0) break;
                }
                updateCacheAndActivities(yearlyResponseData);
              }

              if (
                categoriesToAppend.includes(subcategory) &&
                categoryMappings[subcategory] &&
                !customFetchExecuted
              ) {
                for (const entry of categoryMappings[subcategory]) {
                  const source = entry.source;
                  const year = entry.year;

                  const url = `${baseURL}/data/v1/search?results_per_page=${resultsPerPage}&source=${source}&year=${year}&region=*&category=${subcategory}&page=${page}&data_version=^${process.env.NEXT_PUBLIC_APP_CLIMATIQ_DATAVERSION}`;

                  const response = await axios.get(url, axiosConfig);
                  customFetchData = customFetchData.concat(
                    response.data.results
                  );
                  totalPagesCustom = response.data.last_page;
                }
                updateCacheAndActivities(customFetchData);
                customFetchExecuted = true;
              }
            }
            page++;
          }
        } catch (error) {
          console.error("Error fetching data from different regions: ", error);
        } finally {
          isFetching.current = false;
        }
      },
      []
    );

    const fetchSubcategories = useCallback(async () => {
      const selectedCategory = scopeMappings[scope].find((info) =>
        info.Category.some((c) => c.name === category)
      );
      const newSubcategories = selectedCategory
        ? selectedCategory.Category.find((c) => c.name === category).SubCategory
        : [];
      setSubcategories(newSubcategories);

      if (subcategory) {
        fetchActivities();
      }
    }, [category]);

    useEffect(() => {
      if (category) {
        fetchSubcategories();
      }
    }, [category]);

    useEffect(() => {
      if (activities.length > 0 && value.Activity) {
        const initialActivity = activities.find(
          (act) =>
            `${act.name} - ( ${act.source} ) - ${act.unit_type}` ===
            value.Activity
        );
        if (initialActivity) {
          const activityId = initialActivity.activity_id;
          setActivityId(activityId);
          setUnitType(initialActivity.unit_type);
        }
      }
    }, [activities, value.Activity]);

    useEffect(() => {
      console.log("Unit type changed:", unit_type);
      const unitConfig = unitTypes.find((u) => u.unit_type === unit_type);
      console.log("Unit config found:", unitConfig);

      if (unitConfig && unitConfig.units) {
        const unitKeys = Object.keys(unitConfig.units);
        console.log("Unit keys:", unitKeys);
        const units1 = unitKeys.length > 0 ? unitConfig.units[unitKeys[0]] : [];
        const units2 = unitKeys.length > 1 ? unitConfig.units[unitKeys[1]] : [];

        setUnits(units1);
        setUnits2(units2);
      } else {
        setUnits([]);
        setUnits2([]);
      }
    }, [unit_type]);

    const handleCategoryChange = useCallback(
      (newCategory) => {
        const updatedValue = {
          ...value, // Need to keep other existing fields
          Category: newCategory,
          Subcategory: "",
          Activity: "",
          Quantity: "",
          Unit: "",
        };
        setCategory(newCategory);
        onChange(updatedValue);
        updateSelectedRowIfNeeded(updatedValue);

        // Reset local state
        setSubcategory("");
        setActivity("");
        setQuantity("");
        setUnit("");
      },
      [onChange, value, updateSelectedRowIfNeeded]
    );

    const handleSubcategoryChange = useCallback(
      (newSubcategory) => {
        const updatedValue = {
          ...value,
          Subcategory: newSubcategory,
          Activity: "",
          Quantity: "",
          Unit: "",
        };
        onChange(updatedValue);
        updateSelectedRowIfNeeded(updatedValue);

        setActivity("");
        setQuantity("");
        setUnit("");
      },
      [onChange, value, updateSelectedRowIfNeeded]
    );

    const handleActivityChange = useCallback(
      (newActivity) => {
        const foundActivity = activities.find(
          (act) =>
            `${act.name} - (${act.source}) - ${act.unit_type}` === newActivity
        );
        const updatedValue = {
          ...value,
          Activity: newActivity,
          activity_id: foundActivity ? foundActivity.activity_id : "",
          unit_type: foundActivity ? foundActivity.unit_type : "",
          Quantity: "",
          Quantity2: "",
          Unit: "",
          Unit2: "",
        };
        onChange(updatedValue);
        updateSelectedRowIfNeeded(updatedValue);

        setQuantity("");
        setQuantity2("");
        setUnit("");
        setUnit2("");
      },
      [activities, onChange, value, updateSelectedRowIfNeeded]
    );

    const debouncedHandleQuantityChange = useCallback(
      debounce((nextValue) => {
        setQuantity(nextValue);
        onChange({
          ...value,
          Quantity: nextValue,
        });
      }, 500),
      [onChange]
    );

    const debouncedHandleQuantity2Change = useCallback(
      debounce((nextValue) => {
        setQuantity2(nextValue);
        onChange({
          ...value,
          Quantity2: nextValue,
        });
      }, 500),
      [onChange]
    );

    const handleQuantityChange = useCallback(
      (e) => {
        const value = e.target.value;
        setQuantity(value);
        debouncedHandleQuantityChange(value);
        const error = validateQuantity(value, unit);
        setQuantityError(error);
        if (error) {
          toast.error(error);
        }
      },
      [unit]
    );

    const handleQuantity2Change = useCallback(
      (e) => {
        const value = e.target.value;
        setQuantity2(value);
        debouncedHandleQuantity2Change(value);
        const error = validateQuantity(value, unit2);
        setQuantity2Error(error);
        if (error) {
          toast.error(error);
        }
      },
      [unit2]
    );

    const handleUnitChange = useCallback(
      (newValue) => {
        setUnit(newValue);
        onChange({
          ...value,
          Unit: newValue,
        });
      },
      [
        category,
        subcategory,
        activity,
        quantity,
        activity_id,
        unit_type,
        onChange,
      ]
    );

    const handleUnit2Change = useCallback(
      (newValue) => {
        setUnit2(newValue);
        onChange({
          ...value,
          Unit2: newValue,
        });
      },
      [
        category,
        subcategory,
        activity,
        quantity,
        activity_id,
        unit_type,
        onChange,
      ]
    );

    useEffect(() => {
      if (unit && requiresNumericValidation(unit)) {
        const newQuantity = Math.floor(Number(quantity));
        if (newQuantity !== Number(quantity)) {
          setQuantity(newQuantity);
          const error = validateQuantity(newQuantity, unit);
          setQuantityError(error);
          debouncedHandleQuantityChange(newQuantity);
          toast.error("This field cannot have decimal value");
        }
      }
    }, [unit, quantity]);

    useEffect(() => {
      if (unit2 && requiresNumericValidation(unit2)) {
        const newQuantity2 = Math.floor(Number(quantity2));
        if (newQuantity2.toString() !== quantity2) {
          setQuantity2(newQuantity2);
          debouncedHandleQuantityChange(newQuantity);
          const error = validateQuantity(newQuantity2, unit2);
          setQuantity2Error(error);
          toast.error("This field cannot have decimal value");
        }
      }
    }, [unit2, quantity2]);

    const toggleDropdown = useCallback(() => {
      setIsDropdownActive(!isDropdownActive);
      if (isDropdownActive) {
        setActivitySearch("");
      }
    }, [isDropdownActive]);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target) &&
          inputRef.current &&
          !inputRef.current.contains(event.target)
        ) {
          setIsDropdownActive(false);
          setActivitySearch("");
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    //file uplod code///
    const [fileName, setFileName] = useState(value.file?.name ?? ""); // Fallback to empty string instead of null
    const [showModal, setShowModal] = useState(false);
    const [previewData, setPreviewData] = useState(value.file?.url ?? ""); // Fallback to empty string
    const [fileType, setFileType] = useState(value.file?.type ?? ""); // Fallback to empty string
    const [fileSize, setFileSize] = useState(value.file?.size ?? 0); // Fallback to 0
    const [uploadDateTime, setUploadDateTime] = useState(
      value.file?.uploadDateTime ?? ""
    ); // Fallback to empty string

    const uploadFileToAzure = async (file, newFileName) => {
      const arrayBuffer = await file.arrayBuffer();
      const blob = new Blob([arrayBuffer]);

      const accountName = process.env.NEXT_PUBLIC_AZURE_STORAGE_ACCOUNT;
      const containerName = process.env.NEXT_PUBLIC_AZURE_STORAGE_CONTAINER;
      const sasToken = process.env.NEXT_PUBLIC_AZURE_SAS_TOKEN;

      const blobServiceClient = new BlobServiceClient(
        `https://${accountName}.blob.core.windows.net?${sasToken}`
      );

      const containerClient =
        blobServiceClient.getContainerClient(containerName);
      const blobName = newFileName || file.name;
      const blobClient = containerClient.getBlockBlobClient(blobName);

      try {
        const uploadOptions = {
          blobHTTPHeaders: {
            blobContentType: file.type,
          },
        };

        await blobClient.uploadData(blob, uploadOptions);
        const url = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;
        return url;
      } catch (error) {
        console.error("Error uploading file:", error.message);
        return null;
      }
    };

    useEffect(() => {
      console.log(value, " is the new value passed to the component"); // Log to check incoming data

      if (value?.url && value?.name) {
        setFileName(value.file?.name); // Ensure fileName is updated only when value contains the correct data
        setPreviewData(value.file?.url);
        setFileType(value.file?.type ?? "");
        setFileSize(value.file?.size ?? "");
        setUploadDateTime(value.file?.uploadDateTime ?? "");
      } else {
        console.log("value prop is missing some data, not updating state");
      }
    }, [value]);

    // const handleChange = async (event) => {
    //   const selectedFile = event.target.files[0];

    //   if (selectedFile) {
    //     const newFileName = selectedFile.name;
    //     const fileType = selectedFile.type;
    //     const fileSize = selectedFile.size;
    //     const uploadDateTime = new Date().toLocaleString();

    //     console.log("Selected file details:", {
    //       newFileName,
    //       fileType,
    //       fileSize,
    //       uploadDateTime,
    //     });

    //     setFileName(newFileName); // Set the file name

    //     const uploadUrl = await uploadFileToAzure(selectedFile, newFileName);

    //     if (uploadUrl) {
    //       const reader = new FileReader();
    //       reader.onloadend = () => {
    //         setPreviewData(reader.result); // For preview
    //       };
    //       reader.readAsDataURL(selectedFile);

    //       onChange({
    //         type: "file",
    // value: uploadUrl,
    // name: newFileName,
    // url: uploadUrl,
    // filetype: fileType,
    // size: fileSize,
    // uploadDateTime,
    //       });

    //       console.log("File uploaded successfully:", uploadUrl);
    //     } else {
    //       console.error("File upload failed");
    //     }
    //   }
    // };

    const handleChange = async (event) => {
      const selectedFile = event.target.files[0];

      if (selectedFile) {
        const newFileName = selectedFile.name;
        const fileType = selectedFile.type;
        const fileSize = selectedFile.size;
        const uploadDateTime = new Date().toLocaleString();

        console.log("Selected file details:", {
          newFileName,
          fileType,
          fileSize,
          uploadDateTime,
        });

        setFileName(newFileName); // Set the file name

        const uploadUrl = await uploadFileToAzure(selectedFile, newFileName);

        if (uploadUrl) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreviewData(reader.result); // For preview
          };
          reader.readAsDataURL(selectedFile);

          // Update only the file data, keeping the rest of the row state
          onChange({
            ...value,
            file: {
              value: uploadUrl,
              name: newFileName,
              url: uploadUrl,
              type: fileType,
              size: fileSize,
              uploadDateTime,
            },
          });
          setFileType(fileType);

          console.log("File uploaded successfully:", uploadUrl);
        } else {
          console.error("File upload failed");
        }
      }
    };

    const handlePreview = () => {
      setShowModal(true);
    };

    const handleCloseModal = () => {
      setShowModal(false);
    };

    const handleDelete = () => {
      const resetValue = {
        type: "file",
        value: "",
        name: "",
        url: "",
        type: "",
        size: "",
        uploadDateTime: "",
      };

      setFileName("");
      setPreviewData(null);
      onChange(resetValue);
      setShowModal(false);
    };

    const handleClickonRemove = () => {
      onRemove(index);
    };

    useEffect(() => {
      // Check if this row is in the selectedRows array for this scope
      setIsSelected(selectedRows.some((row) => row.rowId === rowId));
    }, [selectedRows, rowId]);

    const handleRowSelection = (event) => {
      const checked = event.target.checked;
      setIsSelected(checked);
      dispatch(
        setSelectedRows({
          scope,
          rowId,
          isSelected: checked,
          rowData: value,
        })
      );
    };

    const handleSelectAll = (event) => {
      const isChecked = event.target.checked;
      console.log("Select all isChecked:", isChecked, scope);

      dispatch(toggleSelectAll({ scope, isChecked }));
    };

    useEffect(() => {
      if (
        value.assigned_to &&
        value.assigned_to !== "" &&
        rowType === "default"
      ) {
        setRowType("assigned");
      }
    }, [value.assigned_to]);

    const renderFirstColumn = () => {
      switch (rowType) {
        case "calculated":
          return (
            <td className="py-2 text-center w-[1vw]">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 mx-auto"></div>
            </td>
          );
        case "assigned":
          return (
            <td className="py-2 text-center w-[1vw]">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-500 mx-auto"></div>
            </td>
          );
        case "approved":
          return (
            <td className="py-2 text-center w-[1vw]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FFA701] mx-auto"></div>
            </td>
          );
        default:
          return (
            <td className="py-2 text-center w-[1vw]">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={handleRowSelection}
                className="w-4 h-4 mt-2 border-gray-600 green-checkbox"
              />
            </td>
          );
      }
    };

    return (
      <div className={`w-full ${!id.startsWith("root_0") && "ml-1"}`}>
        {id.startsWith("root_0") && (
          <div className="mb-2">
            <button
              type="button"
              className=" border text-[12px] py-1.5 px-3 rounded-md text-[#007eef] font-semibold leading-tight border-[#007eef] disabled:text-slate-300 disabled:border-slate-300 cursor-pointer"
              disabled={!selectedRows?.length}
              onClick={handleMultipleAssignClick}
            >
              Assign Tasks ({selectedRows.length})
            </button>
          </div>
        )}
        <table className="min-w-full w-full">
          {id.startsWith("root_0") && (
            <thead className="bg-gray-50">
              <tr>
                <th className="h-[44px] border-b border-gray-300">
                  <input
                    type="checkbox"
                    className="w-4 h-4 mt-2 green-checkbox-minus"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className=" h-[44px] pl-2 border-b border-gray-300 text-[12px] text-left text-[#667085]">
                  Category
                </th>
                <th className=" h-[44px]  border-b border-gray-300 text-[12px] text-left text-[#667085]">
                  Sub-Category
                </th>
                <th className=" h-[44px]  border-b border-gray-300 text-[12px] text-left text-[#667085]">
                  Activity
                </th>
                <th className="h-[44px]  border-b border-gray-300 text-[12px] text-center text-[#667085]">
                  Quantity
                </th>
                <th className=" h-[44px]  border-b border-gray-300 text-[12px] text-center text-[#667085]">
                  Assignee
                </th>
                <th className=" h-[44px]  border-b border-gray-300 text-[12px] text-center text-[#667085]">
                  Actions
                </th>
              </tr>
            </thead>
          )}
          <tbody className="bg-white">
            <tr className="border-b border-gray-200">
              {/* Checkbox */}
              {renderFirstColumn()}

              {/* Category Dropdown */}
              <td className="py-2 px-1 pl-2 w-[15vw]">
                <select
                  value={category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className={`text-[12px] focus:border-blue-500 focus:outline-none w-full py-1 ${
                    category && rowType === "default"
                      ? "border-b border-zinc-800"
                      : ""
                  }
`}
                  disabled={rowType === "assigned"}
                >
                  <option className="emissionscopc">Select Category</option>
                  {baseCategories.map((categoryName, index) => (
                    <option key={index} value={categoryName}>
                      {categoryName}
                    </option>
                  ))}
                </select>
              </td>

              {/* Sub-Category Dropdown */}
              <td className="py-2 px-1 w-[15vw]">
                <select
                  value={subcategory}
                  onChange={(e) => handleSubcategoryChange(e.target.value)}
                  className={`text-[12px] focus:border-blue-500 focus:outline-none w-full py-1 ${
                    subcategory && rowType === "default"
                      ? "border-b border-zinc-800"
                      : ""
                  }`}
                  disabled={rowType === "assigned"}
                >
                  <option className="emissionscopc">Select Sub-Category</option>
                  {subcategories.map((sub, index) => (
                    <option key={index} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </td>

              {/* Activity Dropdown */}
              <td className="py-2  w-[15vw]">
                <div
                  className={`relative ${
                    activity &&
                    activity !== "No relevant activities found" &&
                    rowType === "default"
                      ? "border-b border-zinc-800"
                      : ""
                  }`}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder={
                      isFetching.current
                        ? "Fetching activities..."
                        : activities.length === 0
                        ? "No relevant activities found"
                        : activity
                        ? activity
                        : "Select Activity"
                    }
                    value={activitySearch}
                    onChange={(e) => setActivitySearch(e.target.value)}
                    onFocus={toggleDropdown}
                    className={`text-[12px] focus:border-blue-500 focus:outline-none w-full py-1 `}
                    disabled={rowType === "assigned"}
                  />

                  {isDropdownActive && (
                    <select
                      ref={dropdownRef}
                      size="9"
                      value={activity}
                      onChange={(e) => {
                        handleActivityChange(e.target.value);
                        toggleDropdown();
                        setActivitySearch("");
                      }}
                      className={`text-[12px] focus:border-blue-500 focus:outline-none w-full absolute left-0 top-8 z-[100] min-w-[810px]`}
                      disabled={rowType === "assigned"}
                    >
                      <option value="" className="px-1">
                        {isFetching.current
                          ? "Fetching activities..."
                          : activities.length === 0
                          ? "No relevant activities found"
                          : "Select Activity"}
                      </option>
                      {activities
                        .filter((item) =>
                          item.name
                            .toLowerCase()
                            .includes(activitySearch.toLowerCase())
                        )
                        .map((item) => (
                          <option
                            key={item.id}
                            value={`${item.name} - (${item.source}) - ${item.unit_type}`}
                            className="px-2"
                          >
                            {item.name} - ({item.source}) - {item.unit_type} -{" "}
                            {item.region} - {item.year}
                            {item.source_lca_activity !== "unknown" &&
                              ` - ${item.source_lca_activity}`}
                          </option>
                        ))}
                    </select>
                  )}
                </div>
              </td>

              {/* Quantity Input */}
              <td className="w-[2vw]">
                <div className="grid grid-flow-col-dense">
                  {unit_type.includes("Over") ? (
                    <>
                      <div className="flex justify-end ">
                        <input
                          ref={quantityRef}
                          type="number"
                          value={quantity}
                          onChange={handleQuantityChange}
                          placeholder="Enter Value"
                          className="focus:border-blue-500 focus:outline-none text-[12px] w-[7vw] text-right pe-1"
                          step="1"
                          min="0"
                          disabled={rowType === "assigned"}
                        />
                        <select
                          value={unit}
                          onChange={(e) => handleUnitChange(e.target.value)}
                          className={` text-[12px] w-[100px]   text-center rounded-md py-1 shadow ${
                            unit
                              ? "bg-white text-blue-500 "
                              : "bg-blue-500 text-white hover:bg-blue-600"
                          }`}
                          disabled={rowType === "assigned"}
                        >
                          <option value="">Unit</option>
                          {units.map((unit, index) => (
                            <option key={index} value={unit}>
                              {unit}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex justify-end">
                        <input
                          ref={quantityRef}
                          type="number"
                          value={quantity2}
                          onChange={handleQuantity2Change}
                          placeholder="Enter Value"
                          className="focus:border-blue-500 focus:outline-none text-[12px] w-[6vw] text-right pe-1"
                          step="1"
                          min="0"
                          disabled={rowType === "assigned"}
                        />
                        <select
                          value={unit2}
                          onChange={(e) => handleUnit2Change(e.target.value)}
                          className={` text-[12px] w-[100px]   text-center rounded-md py-1 shadow ${
                            unit2
                              ? "bg-white text-blue-500 "
                              : "bg-blue-500 text-white hover:bg-blue-600"
                          }`}
                          disabled={rowType === "assigned"}
                        >
                          <option value="">Unit</option>
                          {units2.map((unit, index) => (
                            <option key={index} value={unit}>
                              {unit}
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-end">
                      <input
                        ref={quantityRef}
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        placeholder="Enter Value"
                        className="focus:border-blue-500 focus:outline-none text-[12px] w-[19.7vw] text-right pe-1"
                        step="1"
                        min="0"
                        disabled={rowType === "assigned"}
                      />
                      <select
                        value={unit}
                        onChange={(e) => handleUnitChange(e.target.value)}
                        className={` text-[12px] w-[100px]   text-center rounded-md py-1 shadow ${
                          unit
                            ? "bg-white text-blue-500 "
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                        disabled={rowType === "assigned"}
                      >
                        <option value="">Unit</option>
                        {units.map((unit, index) => (
                          <option key={index} value={unit}>
                            {unit}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </td>

              {/* Assignee Button */}
              <td className="py-2 text-center w-[5vw]">
                <button
                  type="button"
                  className={`${
                    assignedUser
                      ? "bg-white text-blue-500 pl-1 truncate overflow-hidden shadow-md border border-gray-300 hover:shadow-lg"
                      : "bg-blue-500 text-white hover:bg-blue-600 "
                  }  text-[12px] w-[112px] py-1 rounded-md shadow disabled:opacity-80`}
                  onClick={handleAssignClick}
                  disabled={
                    rowType === "calculated" ||
                    rowType === "approved" ||
                    rowType === "assigned"
                  }
                >
                  {assignedUser ? `${assignedUser}` : "Assign to"}
                </button>
              </td>

              {/* Actions - Delete & Upload */}
              <td className="py-3 w-[3vw]">
                <div className=" flex justify-center">
                  <div className="pt-1">
                    <label className="cursor-pointer">
                      <LuTrash2
                        className="text-gray-500 hover:text-red-500"
                        onClick={handleClickonRemove}
                      />
                    </label>
                  </div>

                  <div className="pt-1">
                    <input
                      type="file"
                      id={id + scope}
                      onChange={handleChange}
                      style={{ display: "none" }}
                      disabled={
                        rowType === "assigned" || rowType === "approved"
                      }
                    />

                    {fileName ? (
                      <label className="cursor-pointer relative">
                        {fileType.includes(
                          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        ) ? (
                          <RiFileExcel2Line
                            className="text-green-500 ml-2"
                            onClick={handlePreview}
                            data-tooltip-id={fileName}
                            data-tooltip-content={fileName}
                          />
                        ) : fileType.includes("application/pdf") ? (
                          <BsFiletypePdf
                            className="text-red-500 ml-2"
                            onClick={handlePreview}
                            data-tooltip-id={fileName}
                            data-tooltip-content={fileName}
                          />
                        ) : fileType.includes("image") ? (
                          <BsFileEarmarkImage
                            className="text-blue-500 ml-2"
                            onClick={handlePreview}
                            data-tooltip-id={fileName}
                            data-tooltip-content={fileName}
                          />
                        ) : (
                          <RiFileExcel2Line
                            className="text-gray-500 ml-2"
                            onClick={handlePreview}
                            data-tooltip-id={fileName}
                            data-tooltip-content={fileName}
                          />
                        )}
                        <ReactTooltip
                          id={fileName}
                          place="top"
                          effect="solid"
                          style={{
                            backgroundColor: "#000",
                            color: "white",
                            fontSize: "10px",
                            boxShadow: 3,
                            borderRadius: "8px",
                          }}
                        />
                      </label>
                    ) : (
                      <label htmlFor={id + scope} className="cursor-pointer">
                        <TbUpload className="text-gray-500 hover:text-blue-500 ml-2" />
                      </label>
                    )}

                    {/* Preview Modal */}
                    {showModal && previewData && (
                      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-1 rounded-lg w-[60%] h-[90%] mt-6">
                          <div className="flex justify-between mt-4 mb-4">
                            <div>
                              <h5 className="mb-4 ml-2 font-semibold">
                                {fileName}
                              </h5>
                            </div>
                            <div className="flex">
                              <div
                                className="mb-4"
                                onClick={() => handleDelete(id, scope)}
                              >
                                <button
                                  type="button"
                                  className="px-2 py-1 mr-2 w-[120px] mt-1 flex items-center justify-center border border-red-500 text-red-600 text-[13px] rounded hover:bg-red-600 hover:text-white"
                                >
                                  <LuTrash2 className="me-2" /> Delete File
                                </button>
                              </div>
                              <div>
                                <button
                                  className="px-4 py-2 text-xl rounded"
                                  onClick={handleCloseModal}
                                >
                                  <MdClose />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="flex">
                            <div className="relative w-[744px] h-[545px]">
                              {fileType.startsWith("image") ? (
                                <img
                                  src={previewData}
                                  alt="Preview"
                                  className="max-w-full max-h-full object-contain"
                                />
                              ) : fileType === "application/pdf" ? (
                                <iframe
                                  src={previewData}
                                  title="PDF Preview"
                                  className="w-full h-full"
                                />
                              ) : (
                                <p className="text-red-500 ml-5">
                                  File preview not available.Please download and
                                  verify
                                </p>
                              )}
                            </div>
                            <div className="w-[211px] ml-6">
                              <div className="mb-4 mt-1">
                                <h2 className="text-neutral-500 text-[15px] font-semibold leading-relaxed tracking-wide">
                                  File information
                                </h2>
                              </div>
                              <div className="mb-4">
                                <h2 className="text-neutral-500 text-[12px] font-semibold leading-relaxed tracking-wide">
                                  FILE NAME
                                </h2>
                                <h2 className="text-[14px] leading-relaxed tracking-wide">
                                  {fileName}
                                </h2>
                              </div>
                              <div className="mb-4">
                                <h2 className="text-neutral-500 text-[12px] font-semibold leading-relaxed tracking-wide">
                                  FILE SIZE
                                </h2>
                                <h2 className="text-[14px] leading-relaxed tracking-wide">
                                  {(fileSize / 1024).toFixed(2)} KB
                                </h2>
                              </div>
                              <div className="mb-4">
                                <h2 className="text-neutral-500 text-[12px] font-semibold leading-relaxed tracking-wide">
                                  FILE TYPE
                                </h2>
                                <h2 className="text-[14px] leading-relaxed tracking-wide">
                                  {fileType}
                                </h2>
                              </div>
                              <div className="mb-4">
                                <h2 className="text-neutral-500 text-[12px] font-semibold leading-relaxed tracking-wide">
                                  UPLOAD DATE & TIME
                                </h2>
                                <h2 className="text-[14px] leading-relaxed tracking-wide">
                                  {uploadDateTime}
                                </h2>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <AssignEmissionModal
          isOpen={isAssignModalOpen}
          onClose={handleCloseAssignModal}
          onChange={onChange}
          index={index}
          onRemove={onRemove}
          taskData={{
            location,
            year,
            month: getMonthName(month),
            scope,
            category: value.Category,
            subcategory: value.Subcategory,
            activity: value.Activity,
            activity_id: value.activity_id,
            unit_type: value.unit_type,
            countryCode,
            rowId: rowId,
          }}
        />
        <MultipleAssignEmissionModal
          isOpen={isMultipleAssignModalOpen}
          onClose={handleCloseMultipleAssignModal}
          onChange={onChange}
          scope={scope}
          onRemove={onRemove}
          taskData={{
            location,
            year,
            month: getMonthName(month),
            scope,
            countryCode,
          }}
        />
      </div>
    );
  }
);

export default EmissionWidget;
