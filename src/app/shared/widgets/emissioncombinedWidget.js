"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { scope1Info, scope2Info, scope3Info } from "../data/scopeInfo";
import { unitTypes } from "../data/units";
import { categoriesToAppend, categoryMappings } from "../data/customActivities";
import axios from "axios";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { GlobalState } from "@/Context/page";
const CombinedWidget = ({ value = {}, onChange, scope, year, countryCode }) => {
  const { open } = GlobalState();
  const [category, setCategory] = useState(value.Category || "");
  const [subcategory, setSubcategory] = useState(value.Subcategory || "");
  const [activity, setActivity] = useState(value.Activity || "");
  const [quantity, setQuantity] = useState(value.Quantity || "");
  const [unit, setUnit] = useState(value.Unit || "");
  const [activity_id, setActivityId] = useState(value.activity_id || "");
  const [unit_type, setUnitType] = useState(value.unit_type || "");
  const [subcategories, setSubcategories] = useState([]);
  const [activities, setActivities] = useState([]);
  const [units, setUnits] = useState([]);
  const [baseCategories, setBaseCategories] = useState([]);
  const [activitySearch, setActivitySearch] = useState("");
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const isFetching = useRef(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const quantityRef = useRef(null);

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

  const fetchActivities = useCallback(async (page = 1, customFetchExecuted = false) => {
    if (isFetching.current) return;
    isFetching.current = true;

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
        console.log(
          `Fetching activities for category: ${category}, subcategory: ${subcategory}, year: ${year}, region: ${region}, page: ${page}`
        );

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

          console.log(
            `Initial call results: ${totalResults} results, ${totalPrivateResults} private results, ${totalPages} total pages`
          );
        }

        const effectiveCount = totalResults - totalPrivateResults;
        if (effectiveCount <= 5) {
          wildcard = true;
          console.log(
            "Switching to wildcard search due to insufficient results"
          );
        }

        if (wildcard) {
          console.log("Performing wildcard API call...");
          const wildcardResponse = await axios.get(
            `${baseURL}/data/v1/search?results_per_page=${resultsPerPage}&year=${currentYear}&region=*&category=${subcategory}&page=${page}&data_version=^${process.env.NEXT_PUBLIC_APP_CLIMATIQ_DATAVERSION}`,
            axiosConfig
          );
          console.log(`Wildcard API URL: ${wildcardResponse.config.url}`);

          wildcardActivitiesData = [
            ...wildcardActivitiesData,
            ...wildcardResponse.data.results,
          ];
          totalPages = wildcardResponse.data.last_page;

          console.log(
            `Wildcard call results: ${wildcardResponse.data.results.length} results, ${totalPages} total pages`
          );

          if (totalPages === 0) wildcardResultZero = true;

          if (wildcardResultZero) {
            console.log(
              "No results with wildcard search, trying previous years"
            );
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
              console.log(
                `Yearly results for ${i}: ${yearlyActivitiesData.length}`
              );
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

          console.log(
            "custom",
            categoriesToAppend.includes(subcategory),
            categoryMappings[subcategory],
            !customFetchExecuted
          );

          if (
            categoriesToAppend.includes(subcategory) &&
            categoryMappings[subcategory] &&
            !customFetchExecuted
          ) {
            console.log("Executing custom fetch logic");
            for (const entry of categoryMappings[subcategory]) {
              const source = entry.source;
              const year = entry.year;

              const url = `${baseURL}/data/v1/search?results_per_page=${resultsPerPage}&source=${source}&year=${year}&region=*&category=${subcategory}&page=${page}&data_version=^${process.env.NEXT_PUBLIC_APP_CLIMATIQ_DATAVERSION}`;
              console.log(`Custom fetch URL: ${url}`);

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

          console.log(
            "Final activities data length:",
            [...CombinedActivitiesData, ...customFetchData].length
          );
          setActivities([...CombinedActivitiesData, ...customFetchData]);
          page++;
        }
      }
    } catch (error) {
      console.error("Error fetching data from different regions: ", error);
    } finally {
      isFetching.current = false;
    }
  }, []);

  const fetchSubcategories = async () => {
    const selectedCategory = scopeMappings[scope].find((info) =>
      info.Category.some((c) => c.name === category)
    );
    const newSubcategories = selectedCategory
      ? selectedCategory.Category.find((c) => c.name === category).SubCategory
      : [];
    setSubcategories(newSubcategories);
    fetchActivities();
    if (!newSubcategories.find((sub) => sub === value.Subcategory)) {
      setSubcategory("");
    }
  };

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
    const unitConfig = unitTypes.find((u) => u.unit_type === unit_type);
    setUnits(unitConfig ? Object.values(unitConfig.units).flat() : []);
  }, [unit_type]);


  const handleCategoryChange = (value) => {
    console.log("Handle category change triggered");
    setCategory(value);
    setSubcategory("");
    setActivity("");
    setQuantity("");
    setUnit("");
    setActivityId("");
    setUnitType("");

    const selectedCategory = scope1Info.find((info) =>
      info.Category.some((c) => c.name === value)
    );
    const subCategories = selectedCategory
      ? selectedCategory.Category.find((c) => c.name === value).SubCategory
      : [];
    console.log(subCategories, " are the subcategories");

    setSubcategories(subCategories);
    onChange({
      Category: value,
      Subcategory: "",
      Activity: "",
      Quantity: "",
      Unit: "",
      activity_id: "",
      unit_type: "",
    });
  };

  const handleSubcategoryChange = (value) => {
    setSubcategory(value);
    setActivity("");
    setQuantity("");
    setUnit("");
    setActivityId("");
    setUnitType("");

    onChange({
      Category: category,
      Subcategory: value,
      Activity: "",
      Quantity: "",
      Unit: "",
      activity_id: "",
      unit_type: "",
    });
  };

  const handleActivityChange = (value) => {
    setActivity(value);
    setQuantity("");
    setUnit("");

    const foundActivity = activities.find(
      (act) => `${act.name} - (${act.source}) - ${act.unit_type}` === value
    );

    console.log('Found activity:', foundActivity);

    if (foundActivity) {
      const activityId = foundActivity.activity_id;
      setActivityId(activityId);
      setUnitType(foundActivity.unit_type);
      const unitConfig = unitTypes.find((u) => u.unit_type === foundActivity.unit_type);
      setUnits(unitConfig ? Object.values(unitConfig.units).flat() : []);
    } else {
      setActivityId("");
      setUnitType("");
      setUnits([]);
    }

    onChange({
      Category: category,
      Subcategory: subcategory,
      Activity: value,
      Quantity: "",
      Unit: "",
      activity_id: foundActivity ? foundActivity.activity_id : "",
      unit_type: foundActivity ? foundActivity.unit_type : "",
    });
  };


  const handleQuantityChange = (value) => {
    setQuantity(value);
    onChange({
      Category: category,
      Subcategory: subcategory,
      Activity: activity,
      Quantity: value,
      Unit: unit,
      activity_id: activity_id,
      unit_type: unit_type,
    });
  };

  const handleUnitChange = (value) => {
    setUnit(value);
    onChange({
      Category: category,
      Subcategory: subcategory,
      Activity: activity,
      Quantity: quantity,
      Unit: value,
      activity_id: activity_id,
      unit_type: unit_type,
    });
  };

  const toggleDropdown = () => {
    setIsDropdownActive(!isDropdownActive);
    if (isDropdownActive) {
      setActivitySearch("");
    }
  };

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
    <div className={`${open ? "sm:w-[5vw] md:w-[10vw] lg:w-[10vw] xl:w-[12vw] 2xl:w-[13vw] 3xl:w-[13vw] " : "sm:w-[5vw] md:w-[10vw] lg:w-[10vw] xl:w-[14vw] 2xl:w-[16vw] 3xl:w-[16vw]"}}`}>
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

    <div className={`${open ? "sm:w-[5vw] md:w-[10vw] lg:w-[10vw] xl:w-[12vw] 2xl:w-[13vw] 3xl:w-[13vw] " : "sm:w-[5vw] md:w-[10vw] lg:w-[10vw] xl:w-[14vw] 2xl:w-[16vw] 3xl:w-[16vw]"}} mx-2`}>
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

    <div className={`${open ? "sm:w-[5vw] md:w-[10vw] lg:w-[10vw] xl:w-[15vw] 2xl:w-[18vw] 3xl:w-[18vw] " : "sm:w-[5vw] md:w-[10vw] lg:w-[10vw] xl:w-[18vw] 2xl:w-[22vw] 3xl:w-[22vw]"}} mx-2 relative`}>
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
        className="w-full px-4 py-2 mx-2 mb-2 rounded focus:outline-none"
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
          <FaAngleUp className="text-neutral-500" style={{ fontSize: "20px" }} />
        ) : (
          <FaAngleDown className="text-neutral-500" style={{ fontSize: "20px" }} />
        )}
      </div>
    </div>

    <div  className={`${open ? "sm:w-[5vw] md:w-[10vw] lg:w-[10vw] xl:w-[12vw] 2xl:w-[13vw] 3xl:w-[13vw] " : "sm:w-[5vw] md:w-[10vw] lg:w-[10vw] xl:w-[12vw] 2xl:w-[16vw] 3xl:w-[16vw]"}} mx-2 mt-2 sm:mt-0`}>
      <input
        ref={quantityRef}
        type="number"
        value={quantity}
        onChange={(e) => handleQuantityChange(e.target.value)}
        className="w-full py-1 mt-2 pl-2 rounded-sm border-b focus:outline-none text-right"
      />
    </div>

    <div className={`${open ? "sm:w-[5vw] md:w-[5vw] lg:w-[5vw] xl:w-[7vw] 2xl:w-[6vw] 3xl:w-[6vw] " : "sm:w-[5vw] md:w-[5vw] lg:w-[5vw] xl:w-[7vw] 2xl:w-[5vw] 3xl:w-[5vw]"}} mx-2`}>
      <select
        value={unit}
        onChange={(e) => handleUnitChange(e.target.value)}
        className="w-[100px] text-center cursor-pointer appearance-none px-2 py-1 rounded-md leading-tight outline-none mt-1.5 font-bold text-sm bg-sky-600 text-white"
      >
        <option value="">Unit</option>
        {units.map((unit, index) => (
          <option key={index} value={unit}>
            {unit}
          </option>
        ))}
      </select>
    </div>
  </div>
  );
};

export default CombinedWidget;
