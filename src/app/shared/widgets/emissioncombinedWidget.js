"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { scope1Info, scope2Info, scope3Info } from "../data/scopeInfo";
import { unitTypes } from "../data/units";
import { categoriesToAppend, categoryMappings } from "../data/customActivities";
import axios from "axios";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import debounce from "lodash/debounce";
import { GlobalState } from "@/Context/page";
import {toast} from 'react-toastify'

const CombinedWidget = ({
  value = {},
  onChange,
  scope,
  year,
  countryCode,
  activityCache,
  updateCache,
}) => {
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

  // Unit validation

  const [quantityError, setQuantityError] = useState("");
  const [quantity2Error, setQuantity2Error] = useState("");

  const requiresNumericValidation = (unit) => [
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
  

  const { open } = GlobalState();

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

  // const fetchActivities = debounce(async (initialPage = 1, customFetchExecuted = false) => {
  //     if (isFetching.current) return; 
  //     isFetching.current = true;
  
  //     if (activityCache[subcategory]) {
  //       setActivities(activityCache[subcategory]);
  //       isFetching.current = false;
  //       return;
  //     }
  
  //     if (!category || !subcategory || !year || !countryCode) {
  //       console.warn("All fields (Category, Subcategory, Year, CountryCode) are required");
  //       isFetching.current = false;
  //       return;
  //     }
  
  //     const baseURL = "https://api.climatiq.io";
  //     const resultsPerPage = 500;
  //     const axiosConfig = {
  //       headers: {
  //         Authorization: `Bearer ${process.env.NEXT_PUBLIC_APP_CLIMATIQ_KEY}`,
  //         Accept: "application/json",
  //         "Content-type": "application/json",
  //       },
  //     };
      
  //     let currentYear = year === "2024" ? "2023" : year;
  //     const region = countryCode || "*";
  //     let wildcard = false;
  //     let page = initialPage;
  
  //     let activitiesData = [];
  //     let totalResults = 0;
  //     let totalPrivateResults = 0;
  //     let totalPages = 1;
  
  //     try {
  //       const fetchPageData = async (currentPage, isWildcard = false) => {
  //         const url = `${baseURL}/data/v1/search?results_per_page=${resultsPerPage}&year=${currentYear}&region=${isWildcard ? '*' : region+'*'}&category=${subcategory}&page=${currentPage}&data_version=^${process.env.NEXT_PUBLIC_APP_CLIMATIQ_DATAVERSION}`;
  //         console.log(`Fetching ${isWildcard ? 'wildcard ' : ''}page ${currentPage}: ${url}`);
        
  //         const response = await axios.get(url, axiosConfig);
  //         // console.log('response object',response.data);
  //         const fetchedData = response.data.results;
        
  //         totalPages = response.data.last_page;
  //         totalResults += fetchedData.length;
        
  //         if (totalPages === 0) {
  //           console.log(`No more pages to fetch. Stopping further API calls.`);
  //           return totalPages;
  //         }
        
  //         if (isWildcard) {
  //           activitiesData = activitiesData.concat(fetchedData);
  //         } else {
  //           activitiesData = activitiesData.concat(fetchedData);
  //           totalPrivateResults += fetchedData.filter(activity => activity.access_type === 'private').length;
  //         }
  //       };
        
  
  //       while (page <= totalPages) {
  //         console.log('normal while loop triggered for page and total page',page, totalPages)
  //         await fetchPageData(page);
  //         page++;
  
  //         if (!wildcard && (totalResults - totalPrivateResults <= 5)) {
  //           wildcard = true;
  //           page = 1;
  //         }
  //       }
  
  //       if (wildcard) {
  //         page = 1;
  //         totalPages = 1;
  //         while (page <= totalPages) {
  //           const lastPage = await fetchPageData(page);
  //           console.log('Wildcard search, current page and totalPage, lastPage', page,totalPages, lastPage);
  //           if(lastPage===0) break;
  //           page++;
  //         }
  
  //         if (activitiesData.length === 0) {
  //           for (let pastYear = currentYear - 1; pastYear >= 2019; pastYear--) {
  //             page = 1;
  //             totalPages = 1;
  //             while (page <= totalPages) {
  //               await fetchPageData(page, true);
  //               page++;
  //             }
  //             if (activitiesData.length > 0) break; 
  //           }
  //         }
  //       }
  
  //       if (categoriesToAppend.includes(subcategory) && categoryMappings[subcategory] && !customFetchExecuted) {
  //         for (const entry of categoryMappings[subcategory]) {
  //           const customUrl = `${baseURL}/data/v1/search?results_per_page=${resultsPerPage}&source=${entry.source}&year=${entry.year}&region=*&category=${subcategory}&page=1&data_version=^${process.env.NEXT_PUBLIC_APP_CLIMATIQ_DATAVERSION}`;
  //           console.log(`Fetching custom data: ${customUrl}`);
  
  //           const customResponse = await axios.get(customUrl, axiosConfig);
  //           const customData = customResponse.data.results;
  
  //           activitiesData = activitiesData.concat(customData);
  //         }
  //         customFetchExecuted = true;
  //       }
  
  //       setActivities(activitiesData);
  //       updateCache(subcategory, activitiesData);
  //     } catch (error) {
  //       console.error("Error fetching activities:", error);
  //     } finally {
  //       isFetching.current = false;
  //     }
  //   }, 800);

// let currentRequest = null;

// const fetchActivities = async (initialPage = 1, customFetchExecuted = false) => {
//   // if (currentRequest) {
//   //   currentRequest.cancel();
//   // }

//   const CancelToken = axios.CancelToken;
//   const source = CancelToken.source();
//   currentRequest = source;

//   try {
//     if (activityCache[subcategory]) {
//       setActivities(activityCache[subcategory]);
//       return;
//     }

//     if (!category || !subcategory || !year || !countryCode) {
//       console.warn("All fields (Category, Subcategory, Year, CountryCode) are required");
//       return;
//     }

//     const baseURL = "https://api.climatiq.io";
//     const resultsPerPage = 500;
//     const axiosConfig = {
//       headers: {
//         Authorization: `Bearer ${process.env.NEXT_PUBLIC_APP_CLIMATIQ_KEY}`,
//         Accept: "application/json",
//         "Content-type": "application/json",
//       },
//       cancelToken: source.token
//     };

//     let currentYear = year === "2024" ? "2023" : year;
//     const region = countryCode || "*";
//     let wildcard = false;
//     let page = initialPage;

//     let activitiesData = [];
//     let totalResults = 0;
//     let totalPrivateResults = 0;
//     let totalPages = 1;

//     const fetchPageData = async (currentPage, isWildcard = false) => {
//       const url = `${baseURL}/data/v1/search?results_per_page=${resultsPerPage}&year=${currentYear}&region=${isWildcard ? '*' : region+'*'}&category=${subcategory}&page=${currentPage}&data_version=^${process.env.NEXT_PUBLIC_APP_CLIMATIQ_DATAVERSION}`;      
//       const response = await axios.get(url, axiosConfig);
//       const fetchedData = response.data.results;

//       totalPages = response.data.last_page;
//       totalResults += fetchedData.length;

//       if (totalPages === 0) {
//         console.log(`No more pages to fetch. Stopping further API calls.`);
//         return totalPages;
//       }

//       if (isWildcard) {
//         activitiesData = activitiesData.concat(fetchedData);
//       } else {
//         activitiesData = activitiesData.concat(fetchedData);
//         totalPrivateResults += fetchedData.filter(activity => activity.access_type === 'private').length;
//       }

//       return totalPages;
//     };

//     while (page <= totalPages) {
//       const lastPage = await fetchPageData(page);

//       if (lastPage === 0 && !wildcard) {
//         wildcard = true;
//         page = 1;
//       } else {
//         page++;
//       }

//       if (!wildcard && (totalResults - totalPrivateResults <= 5)) {
//         wildcard = true;
//         page = 1;
//       }
//     }

//     if (wildcard && activitiesData.length === 0) {
//       for (let pastYear = currentYear - 1; pastYear >= 2019; pastYear--) {
//         page = 1;
//         totalPages = 1;
//         currentYear = pastYear;
//         while (page <= totalPages) {
//           await fetchPageData(page, true);
//           page++;
//         }
//         if (activitiesData.length > 0) break;
//       }
//     }

//     if (categoriesToAppend.includes(subcategory) && categoryMappings[subcategory] && !customFetchExecuted) {
//       for (const entry of categoryMappings[subcategory]) {
//         const customUrl = `${baseURL}/data/v1/search?results_per_page=${resultsPerPage}&source=${entry.source}&year=${entry.year}&region=*&category=${subcategory}&page=1&data_version=^${process.env.NEXT_PUBLIC_APP_CLIMATIQ_DATAVERSION}`;
//         console.log(`Fetching custom data: ${customUrl}`);

//         const customResponse = await axios.get(customUrl, axiosConfig);
//         const customData = customResponse.data.results;

//         activitiesData = activitiesData.concat(customData);
//       }
//       customFetchExecuted = true;
//     }

//     setActivities(activitiesData);
//     activityCache[subcategory] = activitiesData;

//   } catch (error) {
//     if (axios.isCancel(error)) {
//       console.log('Request canceled:', error.message);
//     } else {
//       console.error("Error fetching activities:", error);
//     }
//   } finally {
//     currentRequest = null;
//   }
// }

  let wildcard = false;
const fetchActivities = async (page = 1, customFetchExecuted = false) => {
    if (isFetching.current) return;
    isFetching.current = true;

    // Check cache first
    if (activityCache[subcategory]) {
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

    if (!category) {
      console.warn("Category is required");
      isFetching.current = false;
      return;
    }
    if (!subcategory) {
      console.warn("Subcategory is required");
      isFetching.current = false;
      return;
    }
    if (!year) {
      console.warn("Year is required");
      isFetching.current = false;
      return;
    }
    if (!countryCode) {
      console.warn("CountryCode is required");
      isFetching.current = false;
      return;
    }

    const region = countryCode || "*";
    let currentYear = year;
    if (year == "2024") currentYear = "2023";
    let wildcardResultZero = false;

    let activitiesData = [];
    let totalResults = 0;
    let totalPrivateResults = 0;
    let totalPages = 1;
    let totalPagesCustom = 0;
    let wildcardActivitiesData = [];
    let yearlyResponseData = [];
    let newActivitiesData = [];
    let customFetchData = [];
    let multipleSourceData = [];
    let finalActivitiesData = [];

    try {
      while (page <= totalPages) {
        console.log('Fetching page', page, 'of', totalPages);
        if (!wildcard) {
          console.log("Performing initial API call...");
          const url = `${baseURL}/data/v1/search?results_per_page=${resultsPerPage}&year=${currentYear}&region=${region}*&category=${subcategory}&page=${page}&data_version=^${process.env.NEXT_PUBLIC_APP_CLIMATIQ_DATAVERSION}`;
          console.log(`API URL: ${url}`);

          const response = await axios.get(url, axiosConfig);
          activitiesData = [...activitiesData, ...response.data.results];
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
          }

          newActivitiesData = wildcardActivitiesData.filter(
            (activity) => activity.access_type !== "private"
          );

          const CombinedActivitiesData = [
            ...activitiesData,
            ...newActivitiesData,
            ...yearlyResponseData,
          ];

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
              customFetchData = customFetchData.concat(response.data.results);
              finalActivitiesData = [
                ...customFetchData,
                ...activitiesData,
                ...newActivitiesData,
                ...yearlyResponseData,
              ];
              totalPagesCustom = response.data.last_page;
            }
            customFetchExecuted = true;
          }

          setActivities([...CombinedActivitiesData, ...customFetchData]);
          // Cache activities
          updateCache(subcategory, [
            ...CombinedActivitiesData,
            ...customFetchData,
          ]);
          page++;
        }
      }
    } catch (error) {
      console.error("Error fetching data from different regions: ", error);
    } finally {
      isFetching.current = false;
    }
  }

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
    (value) => {
      setCategory(value);
      const selectedCategory = scope1Info.find((info) =>
        info.Category.some((c) => c.name === value)
      );
      const subCategories = selectedCategory
        ? selectedCategory.Category.find((c) => c.name === value).SubCategory
        : [];

      setSubcategories(subCategories);
      onChange({
        type: "Category",
        value,
      });
    },
    [onChange]
  );

  const handleSubcategoryChange = useCallback(
    (value) => {
      setSubcategory(value);
      onChange({
        type: "Subcategory",
        value,
      });
    },
    [onChange]
  );

  const handleActivityChange = useCallback(
    (value) => {
      setActivity(value);
      setQuantity("");
      setUnit("");

      const foundActivity = activities.find(
        (act) => `${act.name} - (${act.source}) - ${act.unit_type}` === value
      );

      console.log("activity found", foundActivity);

      if (foundActivity) {
        const activityId = foundActivity.activity_id;
        setActivityId(activityId);
        setUnitType(foundActivity.unit_type);
        const unitConfig = unitTypes.find(
          (u) => u.unit_type === foundActivity.unit_type
        );
      } else {
        setActivityId("");
        setUnitType("");
        setUnits([]);
      }

      onChange({
        type: "Activity",
        value,
        activityId: foundActivity ? foundActivity.activity_id : "",
        unitType: foundActivity ? foundActivity.unit_type : "",
      });
    },
    [category, subcategory, activities, onChange]
  );

  const debouncedHandleQuantityChange = useCallback(
    debounce((nextValue) => {
      setQuantity(nextValue);
      onChange({
        type: "Quantity",
        value: nextValue,
      });
    }, 300),
    [onChange]
  );

  const debouncedHandleQuantity2Change = useCallback(
    debounce((nextValue) => {
      setQuantity2(nextValue);
      onChange({
        type: "Quantity2",
        value: nextValue,
      });
    }, 2000),
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

  useEffect(() => {
    if (unit && requiresNumericValidation(unit)) {
      const newQuantity = Math.floor(Number(quantity));
      if (newQuantity !== Number(quantity)) {
        setQuantity(newQuantity);
        const error = validateQuantity(newQuantity, unit);
        setQuantityError(error);
        debouncedHandleQuantityChange(newQuantity);
          toast.error('This field cannot have decimal value');
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
          toast.error('This field cannot have decimal value');
      }
    }
  }, [unit2, quantity2]); 

  const handleUnitChange = useCallback(
    (value) => {
      setUnit(value);
      onChange({
        type: "Unit",
        value,
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
    (value) => {
      setUnit2(value);
      onChange({
        type: "Unit2",
        value,
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

  return (
    <div className="flex mb-5">
      <div
        className={`${
          open
            ? "sm:w-[5vw] md:w-[10vw] lg:w-[10vw] xl:w-[12vw] 2xl:w-[13vw] 3xl:w-[13vw] "
            : "sm:w-[5vw] md:w-[10vw] lg:w-[10vw] xl:w-[14vw] 2xl:w-[16vw] 3xl:w-[16vw]"
        }}`}
      >
        <select
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="w-full py-2 text-sm leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 border-b-2 border-gray-300"
        >
          <option value="">Select Category</option>
          {baseCategories.map((categoryName, index) => (
            <option key={index} value={categoryName}>
              {categoryName}
            </option>
          ))}
        </select>
      </div>

      <div
        className={`${
          open
            ? "sm:w-[5vw] md:w-[10vw] lg:w-[10vw] xl:w-[12vw] 2xl:w-[13vw] 3xl:w-[13vw] "
            : "sm:w-[5vw] md:w-[10vw] lg:w-[10vw] xl:w-[14vw] 2xl:w-[16vw] 3xl:w-[16vw]"
        }} mx-2`}
      >
        <select
          value={subcategory}
          onChange={(e) => handleSubcategoryChange(e.target.value)}
          className="w-full py-2 text-sm leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 border-b-2 border-gray-300"
        >
          <option value="">Select Subcategory</option>
          {subcategories.map((sub, index) => (
            <option key={index} value={sub}>
              {sub}
            </option>
          ))}
        </select>
      </div>

      <div
        className={`${
          open
            ? "sm:w-[5vw] md:w-[10vw] lg:w-[10vw] xl:w-[15vw] 2xl:w-[18vw] 3xl:w-[18vw] "
            : "sm:w-[5vw] md:w-[10vw] lg:w-[10vw] xl:w-[18vw] 2xl:w-[22vw] 3xl:w-[22vw]"
        }} relative`}
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
          className="w-full pr-4 py-2 mx-2 mb-2 rounded focus:outline-none"
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
            className="absolute left-0 top-8 cursor-pointer max-w-[750px] bg-white py-2 border-2 rounded-lg z-50 pb-2"
            style={{ position: "absolute", zIndex: 1000 }}
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
                item.name.toLowerCase().includes(activitySearch.toLowerCase())
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
        <div
          className="absolute inset-y-0 -right-2 flex items-center cursor-pointer"
          onClick={toggleDropdown}
        >
          {isDropdownActive ? (
            <FaAngleUp
              className="text-neutral-500"
              style={{ fontSize: "20px" }}
            />
          ) : (
            <FaAngleDown
              className="text-neutral-500"
              style={{ fontSize: "20px" }}
            />
          )}
        </div>
      </div>
      <div
        className={`flex justify-center items-center ${
          open
            ? "sm:w-[6vw] md:w-[12vw] lg:w-[12vw] xl:w-[22vw] 2xl:w-[22vw] 3xl:w-[18vw] "
            : "sm:w-[6vw] md:w-[12vw] lg:w-[12vw] xl:w-[26vw] 2xl:w-[22vw] 3xl:w-[18vw]"
        }} mx-2 mt-2 sm:mt-0`}
      >
        {unit_type.includes("Over") ? (
          <>
            <div
              className={`${
                open
                  ? "sm:w-[5vw] md:w-[10vw] lg:w-[10vw] xl:w-[12vw] 2xl:w-[13vw] 3xl:w-[13vw] "
                  : "sm:w-[5vw] md:w-[10vw] lg:w-[10vw] xl:w-[12vw] 2xl:w-[16vw] 3xl:w-[16vw]"
              }} mx-2 mt-2 sm:mt-0`}
            >
              <input
                ref={quantityRef}
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-full py-1 mt-2 rounded-sm border-b focus:outline-none"
                step="1"
                min="0"
              />
            </div>
            <div
              className={`${
                open
                  ? "sm:w-[5vw] md:w-[5vw] lg:w-[5vw] xl:w-[5vw] 2xl:w-[6vw] 3xl:w-[6vw] "
                  : "sm:w-[5vw] md:w-[5vw] lg:w-[5vw] xl:w-[5vw] 2xl:w-[5vw] 3xl:w-[5vw]"
              }}`}
            >
              <select
                value={unit}
                onChange={(e) => handleUnitChange(e.target.value)}
                className="w-[50px] text-center cursor-pointer appearance-none px-2 py-1 rounded-md leading-tight outline-none mt-1.5 font-bold text-sm bg-sky-600 text-white"
              >
                <option value="">Unit</option>
                {units.map((unit, index) => (
                  <option key={index} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
            <div
              className={`${
                open
                  ? "sm:w-[5vw] md:w-[10vw] lg:w-[10vw] xl:w-[12vw] 2xl:w-[13vw] 3xl:w-[13vw] "
                  : "sm:w-[5vw] md:w-[10vw] lg:w-[10vw] xl:w-[12vw] 2xl:w-[16vw] 3xl:w-[16vw]"
              }} mx-2 mt-2 sm:mt-0`}
            >
              <input
                ref={quantityRef}
                type="number"
                value={quantity2}
                onChange={handleQuantity2Change}
                className="w-full py-1 mt-2 rounded-sm border-b focus:outline-none"
              />
            </div>
            <div
              className={`${
                open
                  ? "sm:w-[5vw] md:w-[5vw] lg:w-[5vw] xl:w-[5vw] 2xl:w-[6vw] 3xl:w-[6vw] "
                  : "sm:w-[5vw] md:w-[5vw] lg:w-[5vw] xl:w-[5vw] 2xl:w-[5vw] 3xl:w-[5vw]"
              }}`}
            >
              <select
                value={unit2}
                onChange={(e) => handleUnit2Change(e.target.value)}
                className="w-[50px] text-center cursor-pointer appearance-none px-2 py-1 rounded-md leading-tight outline-none mt-1.5 font-bold text-sm bg-sky-600 text-white"
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
          <>
            <div
              className={`${
                open
                  ? "sm:w-[5vw] md:w-[10vw] lg:w-[10vw] xl:w-[21vw] 2xl:w-[13vw] 3xl:w-[13vw] "
                  : "sm:w-[5vw] md:w-[10vw] lg:w-[10vw] xl:w-[26vw] 2xl:w-[16vw] 3xl:w-[16vw]"
              }} mx-2 mt-2 sm:mt-0`}
            >
              <input
                ref={quantityRef}
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-full py-1 mt-2 pl-2 rounded-sm border-b focus:outline-none"
              />
            </div>
            <div
              className={`${
                open
                  ? "sm:w-[5vw] md:w-[5vw] lg:w-[5vw] xl:w-[5vw] 2xl:w-[6vw] 3xl:w-[6vw] "
                  : "sm:w-[5vw] md:w-[5vw] lg:w-[5vw] xl:w-[5vw] 2xl:w-[5vw] 3xl:w-[5vw]"
              }}`}
            >
              <select
                value={unit}
                onChange={(e) => handleUnitChange(e.target.value)}
                className="w-[50px] text-center cursor-pointer appearance-none px-2 py-1 rounded-md leading-tight outline-none mt-1.5 font-bold text-sm bg-sky-600 text-white"
              >
                <option value="">Unit</option>
                {units.map((unit, index) => (
                  <option key={index} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CombinedWidget;
