import React, { useState, useEffect,useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  CheckOutlined,
  AddOutlined,
  FilePresent,
  ArrowDropDown,
  KeyboardArrowDownOutlined,
  FileUploadOutlined,
  DeleteOutline,
  ErrorOutlined,
} from "@mui/icons-material";
import PdfPreviewModal from "./PdfPreviewModal";
import ShowEmission from "./ShowEmission";
import { unitTypes } from "components/data/units";
import { useDispatch } from "react-redux";
import { setRowsStateNew, selectRowsStateNew } from "state/emissionSlice";
import _ from "lodash";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function CollectEmission({ scope, scopeInfo, data, prevMonth, monthlyEmissions, errorState,locError }) {
  const countryCode = useSelector((state) => state.emission?.countryCode);
  const quarter = useSelector((state) => state.emission?.quarter);
  const token = useSelector((state) => state.global.authToken);
  const location = useSelector((state) => state.emission.location);
  const dispatch = useDispatch();
  // Underline comes after selecting input
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");

  const rowsState = useSelector((state) =>
    selectRowsStateNew(state, quarter, scope)
  );
  const currentUser = localStorage.getItem("email");

  const [rows, setRows] = useState([]);

   //loader
   const [loopen, setLoOpen] = useState(false);
   const LoaderOpen = () => {
     setLoOpen(true);
   };
   const LoaderClose = () => {
     setLoOpen(false);
   };

  useEffect(() => {
    let isMounted = true;
    setTimeout(() => {
      const fetchAndUpdateActivities = async () => {
        let initialRows = [
          {
            category: "",
            subCategory: "",
            activities: [],
            value1: "",
            value2: "",
            unit: ["", ""],
            fileRaw: "",
            file: null,
            fileName: "",
            modifiedTime: "",
            activity: "",
            selectedActivity: {},
            unitType: "",
            assignTo: "",
            uploadedBy: currentUser,
            noActivities: false,
            fetchingActivities: false,
          },
        ];
  
        if (prevMonth.length > 0 && data.length === 0 && monthlyEmissions === 0) {
          const rowsPromises = prevMonth.map(async (prevRow, index) => {
            const newSubCategory = prevRow.subCategory || "";
            try {
              let allActivities = [];
  
              const response = await fetchActivities(index, newSubCategory, 1, false);
              const { activitiesData, pages, pagesCustom } = response;
              
              activitiesData.sort((a, b) => {
                if (a.access_type === "private" && b.access_type !== "private") {
                  return -1;
                } else if (a.access_type !== "private" && b.access_type === "private") {
                  return 1;
                }
                return 0;
              });
  
              allActivities = activitiesData;
  
              if (pages > 1) {
                for (let page = 2; page <= pages; page++) {
                  let customFetched = pagesCustom && page <= pagesCustom ? false : true;
                  const response = await fetchActivities(index, newSubCategory, page, customFetched);
                  const { activitiesData: nextPageActivities } = response;
                  allActivities = [...allActivities,...nextPageActivities];
                }
              }

              const finalActivities = allActivities.filter((activity, index, self) => {
                const firstIndex = self.findIndex(item => item.id === activity.id);
                return index === firstIndex;
              });
              
              
              const filteredActivities = finalActivities.filter((activity) => {
                return activity.id === prevRow.emmissionfactorid;
              });
  
              const selectedActivity = filteredActivities.length > 0 ? filteredActivities[0] : {};
  
              return {
                ...prevRow,
                // category: prevRow.category,
                // subCategory: prevRow.subCategory,
                activity: `${prevRow.name} - ( ${prevRow.source} ) - ${selectedActivity.unit_type}` || "",
                activities: activitiesData,
                noActivities: activitiesData.length === 0,
                fetchingActivities: false,
                selectedActivity:selectedActivity,
                unitType: selectedActivity.unit_type,
                value1: "",
                value2: "",
                unit: ["", ""],
                fileRaw: "",
                file: null,
                fileName: "",
                modifiedTime: "",
              };
            } catch (error) {
              console.error('Error fetching activities for subCategory:', newSubCategory, error);
              return {
                ...prevRow,
                activities: [],
                noActivities: true,
                fetchingActivities: false,
                // activity: "",
                // selectedActivity:{},
                // unitType: "",
                // value1: "",
                // value2: "",
                // unit: ["", ""],
                // fileRaw: "",
                // file: null,
                // fileName: "",
                // modifiedTime: "",
              };
            }
          });
          initialRows = await Promise.all(rowsPromises);
        }
        console.log('scopeInfo.length,prevMonth.length,data.length,monthlyEmissions', scope, scopeInfo.length, prevMonth.length, data.length, monthlyEmissions);
        if (isMounted) {
          setRows(initialRows);
          dispatch(setRowsStateNew({ quarter, scope, rows: initialRows }));
        }
      };
  
      async function fetchData() {
        try {
          LoaderOpen();
          await fetchAndUpdateActivities();
          setTimeout(() => {
            LoaderClose();
          }, 500);
        } catch (error) {
          console.error('Error during data fetch:', error);
          LoaderClose();
        }
      }
  
      fetchData();
    }, 500); 
    return () => {
      isMounted = false;
    };
  }, [currentUser, data.length, dispatch, prevMonth, quarter, scope, scopeInfo.length]);
  
  

  const handleAddRow = () => {
    const newRow = {
      category: "",
      subCategory: "",
      activities: [],
      value1: "",
      value2: "",
      unit: ["", ""],
      fileRaw: "",
      file: null,
      fileName: "",
      modifiedTime: "",
      activity: "",
      selectedActivity: {},
      unitType: "",
      assignTo: "",
      uploadedBy: currentUser,
      noActivities: false,
      fetchingActivities: false

    };

    const updatedRows = [...rowsState, newRow];
    // console.log("updated rows", updatedRows);
    dispatch(setRowsStateNew({ quarter, scope, rows: updatedRows }));
    setRows(updatedRows);

    setSelectedCategory("");
    setSelectedSubCategory("");
    setSelectedActivity("");
  };

  const [showCheckmark, setShowCheckmark] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [currentStat, setCurrentStat] = useState({
    index: -1,
    field: "fuel",
  });
  const [loading, setLoading] = useState(false);
  let wildcard = false;

  const handleChange = async (event, index, field) => {
    setLoading(true);
    setCurrentStat({ ...currentStat, index: index });
    if (index >= 0 && index < rowsState.length) {
      let newRows = _.cloneDeep(rowsState);
      // console.log("After cloning newRows:", newRows);
      if (field === "category") {
        if(location)
        {
          setSelectedCategory(event.target.value);
        newRows[index].category = event.target.value;
        setSelectedSubCategory("");
        setSelectedActivity("");
        wildcard = false;
        }else
        locError(true);
      } else if (field === "subCategory") {
        setSelectedSubCategory(event.target.value);
        setSelectedActivity("");
      } else if (field === "activity") {
        const selectedUnitType =
          event.target.options[event.target.selectedIndex].dataset.unitType;
        newRows[index].activity = event.target.value;
        newRows[index].unitType = selectedUnitType || null;
        const selectedId =
          event.target.options[event.target.selectedIndex].dataset.id;
        const activitySelected = newRows[index].activities.find(
          (activity) => activity.id === selectedId
        );
        newRows[index].selectedActivity = activitySelected;
      }
      if (field === "subCategory") {
        newRows[index].fetchingActivities=true;
        newRows[index].activities=[];
        dispatch(setRowsStateNew({ quarter, scope, rows: newRows }));
        const categorySelected= newRows[index].category;
        const newSubCategory = event.target.value;
        newRows[index].subCategory = newSubCategory;
        setCurrentStat({ ...currentStat, field: newSubCategory });
        // let customFetchExecuted= false;

        try {
          const response = await fetchActivities(index, newSubCategory, 1,false);
          const { activitiesData, pages, pagesCustom } = response;
          // const response = await fetchActivities(index,categorySelected, newSubCategory, year,countryCode);
          // const { activitiesData } = response;

          // console.log('activities received', activitiesData);
          // Sort the combined activities with private activities first
          activitiesData.sort((a, b) => {
            if (a.access_type === "private" && b.access_type !== "private") {
              return -1;
            } else if (
              a.access_type !== "private" &&
              b.access_type === "private"
            ) {
              return 1;
            }
            return 0;
          });

          newRows[index].activities = activitiesData;
          if(activitiesData.length===0) newRows[index].noActivities=true;
          else newRows[index].noActivities=false;
          newRows[index].fetchingActivities=false;
          newRows[index].activity = "";
          newRows[index].assignTo = "";
          newRows[index].unit = [];

          dispatch(setRowsStateNew({ quarter, scope, rows: newRows }));
          setRows(newRows);

          if (pages > 1) {
            let customFetched = false;
            for (let i = 2; i <= pages; i++) {
              if (pagesCustom > 1 && i <= pagesCustom) {
                customFetched = false;
              } else {
                customFetched = true;
              }
              const response = await fetchActivities(index, newSubCategory, i,customFetched);
              const { activitiesData } = response;

              const newCombinedActivities = [
                ...activitiesData,
                ...newRows[index].activities, // Previous activities
              ];

              newCombinedActivities.sort((a, b) => {
                // First, compare by access_type
                if (a.access_type === "private" && b.access_type !== "private") {
                  return -1;
                } else if (a.access_type !== "private" && b.access_type === "private") {
                  return 1;
                }
              
                // If access_type is the same, compare by name
                return a.name.localeCompare(b.name);
              });
              

              newRows[index].activities = newCombinedActivities;
              if(newCombinedActivities.length===0) {
                newRows[index].noActivities=true;
                newRows[index].activities=[];
              }
              else newRows[index].noActivities=false;
              newRows[index].fetchingActivities = false;

              if (i % 3 === 0) {
                dispatch(setRowsStateNew({ quarter, scope, rows: newRows }));
                setRows(newRows);
              }
            }
          }
        } catch (error) {
          setLoading(false);
          console.error("Error fetching activities: ", error);
        }
      }
       else if (field === "assignTo") {
        newRows[index].assignTo = event.target.value;
      } else if (field === "unit") {
        const selectedUnit = event.target.value;
        const allUnits = rows[index].unit;
        // console.log(allUnits, selectedUnit);
        newRows[index].unit = [...allUnits, selectedUnit];
      } else if (field === "unit1") {
        const selectedUnit = event.target.value;
        newRows[index].unit[0] = selectedUnit;
      } else if (field === "unit2") {
        const selectedUnit = event.target.value;
        newRows[index].unit[1] = selectedUnit;
      } else if (field === "value1") {
        const selectedValue = event.target.value;
        // console.log("value1", selectedValue);
        if (/^\s*$|^$|^(0|[1-9]\d*)\.?\d{0,3}$/.test(selectedValue)) {
          newRows[index].value1 = selectedValue;
        } else if (selectedValue === null)
          newRows[index].value1 = selectedValue;
      } else if (field === "value2") {
        const selectedValue = event.target.value;
        if (/^\s*$|^$|^(0|[1-9]\d*)\.?\d{0,3}$/.test(selectedValue)) {
          newRows[index].value2 = selectedValue;
        }
      } else if (field === "file") {
        const uploadedFile = event.target.files[0];
        // console.log("uploaded File", uploadedFile);
        if (uploadedFile && uploadedFile.size > 4 * 1024 * 1024) {
          alert("File size exceeds the maximum allowed size (4 MB).");
          return;
        }
        if (uploadedFile) {
          const reader = new FileReader();
          reader.readAsDataURL(uploadedFile);
          reader.onload = (event) => {
            // console.log(event.target.result, uploadedFile.name, "afterload");
            newRows[index].file = event.target.result;
            newRows[index].fileName = uploadedFile.name;
            newRows[index].modifiedTime = new Date().toLocaleString();
            newRows[index].uploadedBy = currentUser;
            // console.log({ newRows, scope });
            setIsUploaded(true);
            setTimeout(() => {
              setShowCheckmark(false);
            }, 2000);
            dispatch(setRowsStateNew({ quarter, scope, rows: newRows }));
            setRows(newRows);
          };
        }
      }
      if (field !== "file") {
        dispatch(setRowsStateNew({ quarter, scope, rows: newRows }));
      }
      setRows(newRows);
    } else {
      setLoading(false);
      console.error(`Invalid index: ${index}`);
    }
    setLoading(false);
  };

  // function uploadFileInChunks(file) {
  //   const CHUNK_SIZE = 1024 * 1024; // 1MB
  //   const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
  
  //   for (let i = 0; i < totalChunks; i++) {
  //     const chunk = file.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
  //     // Generate formData and append the current chunk
  //     const formData = new FormData();
  //     formData.append('file', chunk);
  //     formData.append('chunkIndex', i);
  //     formData.append('totalChunks', totalChunks);
  
  //     // Send the chunk to the server
  //     axios.post('/upload_chunk', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     })
  //     .then(response => {
  //       // Handle successful chunk upload
  //     })
  //     .catch(error => {
  //       // Handle error, possibly retry
  //     });
  //   }
  // }
  

  const fetchedYear = useSelector((state) => state.emission?.year);
  let year = fetchedYear.substring(0, 4);

  // Custom
  async function fetchActivities(index, category, page,customFetchExecuted) {
    // console.log("Fetching activities", page);
    const baseURL = "https://api.climatiq.io";
    const resultsPerPage = 500;
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_CLIMATIQ_KEY}`,
        Accept: "application/json",
        "Content-type": "application/json",
      },
    };
    const region = countryCode || "*";
    let currentYear = year;
    if(year=='2024') currentYear = '2023';
    let wildcardResultZero = false; 

    let activitiesData=[];
    let totalResults = 0;
    let totalPrivateResults = 0;
    let totalPages;
    let totalPagesCustom=0;
    let wildcardActivitiesData = [];
    let yearlyResponseData = [];
    let newActivitiesData = [];
    let customFetchData=[];
    let multipleSourceData = [];
    let finalActivitiesData=[];

    try {
      if (!wildcard) {
        // const url = `${baseURL}/search?results_per_page=${resultsPerPage}&year=${currentYear}&region=${region}*&query=${category}&page=${page}&data_version=^${process.env.REACT_APP_CLIMATIQ_DATAVERSION}`;
        const url = `${baseURL}/data/v1/search?results_per_page=${resultsPerPage}&year=${currentYear}&region=${region}*&category=${category}&page=${page}&data_version=^${process.env.REACT_APP_CLIMATIQ_DATAVERSION}`;

        const response = await axios.get(url, axiosConfig);
        activitiesData = response.data.results;
        // totalResults = response.data.total_results;
        totalResults = response.data.results.length;
        totalPages = response.data.last_page;
        // console.log('main call totalResults and pages',totalResults,totalPages);
        totalPrivateResults = activitiesData.reduce((count, activity) => {
          if (activity.access_type === "private") {
            count += 1;
          }
          return count;
        }, 0);
      }

      const effectiveCount = totalResults - totalPrivateResults;
      if (effectiveCount <= 5) {
        wildcard = true; // Set wildcard state to true immediately
      }
      // If less results were found and it's the first page, try a wildcard search
      if (wildcard) {
        const wildcardResponse = await axios.get(
          `${baseURL}/data/v1/search?results_per_page=${resultsPerPage}&year=${currentYear}&region=*&category=${category}&page=${page}&data_version=^${process.env.REACT_APP_CLIMATIQ_DATAVERSION}`,
          axiosConfig
        );
        wildcardActivitiesData = wildcardResponse.data.results;
        totalPages = wildcardResponse.data.last_page;
        // console.log('wild call totalResults and pages',wildcardActivitiesData.length,totalPages);

        if(totalPages===0)
        wildcardResultZero=true;
      }

      if (wildcardResultZero) {
        for(let i=currentYear-1;i>=2019;i--){
          const yearlyResponse = await axios.get(
            `${baseURL}/data/v1/search?results_per_page=${resultsPerPage}&year=${i}&region=${region}*&category=${category}&page=${page}&data_version=^${process.env.REACT_APP_CLIMATIQ_DATAVERSION}`,
            axiosConfig
          );
          const yearlyActivitiesData = yearlyResponse.data.results;
          totalPages = yearlyResponse.data.last_page;
          yearlyResponseData=[...yearlyResponseData,...yearlyActivitiesData]
          if(yearlyActivitiesData.length !== 0) break;
        } 
      }

      // Filter out private activities
      newActivitiesData = wildcardActivitiesData.filter(
        (activity) => activity.access_type !== "private"
      );
      
      const CombinedActivitiesData = [...activitiesData, ...newActivitiesData,...yearlyResponseData];
      // console.log('combined wildcard activities',CombinedActivitiesData);
      // console.log('pages',totalPages);

      const categoriesToAppend = [
        "Vehicles",
        "Clothing and Footwear",
        "DIY and Gardening Equipment",
        "Domestic Services",
        "Education",
        "Electrical Equipment",
        "Equipment Rental",
        "Food and Beverage Services",
        "Furnishings and Household",
        "General Retail",
        "Government Activities",
        "Health and Social Care",
        "Information and Communication Services",
        "Office Equipment",
        "Paper Products",
        "Plastics and Rubber Products",
        "Professional Services and Activities",
        "Waste Management",
        "Water Treatment",
        "Electrical Equipment",
        "Furnishings and Household",
        "Office Equipment",
        "Restaurants and Accommodation",
        "Vehicles",
        "Recreation and Culture",
        "Accommodation",
        "Vehicle Maintenance and Services",
        "Road Travel"
        // "Utilities",
      ];

      const categoryMappings = {
        "Accommodation":[{ source: "BEIS", year: "2021" }],
        "Vehicles":[{ source: "EXIOBASE", year: "2019" }],
        // "Road Travel":[{ source: "Ecoinvent", year: "2019" }],
        "Clothing and Footwear": [{ source: "EXIOBASE", year: "2019" },{ source: "EPA", year: "2018" }],
        "DIY and Gardening Equipment": [{ source: "EPA", year: "2019" }],
        "Domestic Services": [{ source: "EXIOBASE", year: "2019" }],
        "Education": [{ source: "EXIOBASE", year: "2019" }],
        "Electrical Equipment": [{ source: "EXIOBASE", year: "2019" }],
        "Equipment Rental": [{ source: "EXIOBASE", year: "2019" }],
        "Food and Beverage Services": [{ source: "EPA", year: "2019" },{ source: "BEIS", year: "2019" }],
        "Furnishings and Household": [{ source: "EXIOBASE", year: "2019" },{ source: "BEIS", year: "2020" }],
        "General Retail": [{ source: "EXIOBASE", year: "2019" }],
        "Government Activities": [{ source: "EXIOBASE", year: "2019" }],
        "Health and Social Care": [{ source: "EXIOBASE", year: "2019" }],
        "Information and Communication Services":[{ source: "EXIOBASE", year: "2019" },{ source: "BEIS", year: "2020" },],
        "Post and Telecommunication": [{ source: "EXIPOBASE", year: "2019" }],
        "Office Equipment": [
          { source: "EXIOBASE", year: "2019" },
          { source: "EPA", year: "2018" },
          { source: "EPA", year: "2019" },
          
        ],
        "Paper Products": [{ source: "EXIOBASE", year: "2019" },{ source: "BEIS", year: "2020" },],
        // "Utilities": [{ source: "EXIOBASE", year: "2019" }],
        "Plastics and Rubber Products": [{ source: "EXIOBASE", year: "2019" }],
        "Professional Services and Activities": [
          { source: "EXIOBASE", year: "2019" },
          { source: "EXIOBASE", year: "2020" },
          { source: "EPA", year: "2019" },
          { source: "BEIS", year: "2020" },
        ],
        "Waste Management": [{ source: "EXIOBASE", year: "2019" }],
        // "Water Supply": [{ source: 'Ecoinvent', year: '2015' }],
        "Water Treatment": [{ source: 'EXIOBASE', year: '2019' }],
        "Restaurants and Accommodation": [{ source: 'EXIOBASE', year: '2019' }],
        "Recreation and Culture":[{ source: "EPA", year: "2019" }],
        "Consumer Goods and Services":[{ source: "EPA", year: "2018" }],
        "Vehicle Maintenance and Services":[{ source: "EPA", year: "2019" },{ source: "EXIOBASE", year: "2019",region:"AU", category:"Vehicles" }],
        "Road Travel":[{ source: "EPA", year: "2019" }]
      };

      if (categoriesToAppend.includes(category) && categoryMappings[category] && !customFetchExecuted) {
        for (const entry of categoryMappings[category]) {
          const source = entry.source;
          const year = entry.year;
          const categoryToFetch = entry.category ? entry.category : category;
          const regionToFetch = entry.region ? entry.region : "*";

          const url = `${baseURL}/data/v1/search?results_per_page=${resultsPerPage}&source=${source}&year=${year}&region=${regionToFetch}&category=${categoryToFetch}&page=${page}&data_version=^${process.env.REACT_APP_CLIMATIQ_DATAVERSION}`;
          const response = await axios.get(url, axiosConfig);
          customFetchData = customFetchData.concat(response.data.results); // Accumulate custom fetched data
          // multipleSourceData = CombinedActivitiesData.concat(response.data.results);
          finalActivitiesData = [...customFetchData,...activitiesData, ...newActivitiesData,...yearlyResponseData];
          totalPagesCustom = response.data.last_page;
        }
      }
      // console.log("final data", finalActivitiesData);
      if (!customFetchExecuted) {
        return {
          activitiesData: [...CombinedActivitiesData,...customFetchData],
          pages: totalPages,
          pagesCustom: totalPagesCustom
        };
      } else {
        return {
          activitiesData: CombinedActivitiesData,
          pages: totalPages,
        };
      }
    } catch (error) {
      // ! Throws Error if couldn't fetch data
      console.error("Error fetching data from different regions: ", error);
      throw error;
    }
  }


  // Async function to fetch activities (backend)
  // async function fetchActivities(index, category, subCategory, year = 2023, region = '*') {
  //   const baseURL = `${process.env.REACT_APP_BACKEND_URL}/sustainapp/scope_categories/`;
  //   try {
  //     const url = `${baseURL}?category=${encodeURIComponent(category)}&sub_category=${encodeURIComponent(subCategory)}&year=${year}&region=${region}`;
  //     const backend_key = localStorage.getItem('authTokens');
  //     console.log('key', backend_key);
  //     const response = await axios.get(url, {
  //       headers: {
  //         'Authorization': `token ${backend_key.slice(1, -1)}`
  //       }
  //     });
  
  //     // Process the response here
  //     // const data = response.json();
  //     const activitiesData = response.results;
  //     console.log(response.results);
  //     return activitiesData;
  //   } catch (error) {
  //     console.error('Error fetching activities:', error);
  //     throw error;
  //   }
  // }

  // useEffect(()=>{fetchActivities(1,'Stationary Combustion','Fuel',2023,'CA')},[])

  //USERS

  const [users, setUsers] = useState([
    { username: "Dept Head", id: "1" },
    { username: "Line Manager", id: "2" },
    { username: "Emp 1", id: "3" },
    { username: "Emp 2", id: "4" },
    { username: "Emp 3", id: "5" },
  ]);

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  // function fetchUsers() {
  //   let axiosConfig = {
  //     headers: {
  //       Authorization: 'Bearer ' + token,
  //       'Content-type': 'application/json',
  //     },
  //   };
  //   axios
  //     .get(
  //       `${process.env.REACT_APP_BACKEND_URL}/accounts/user`,
  //       { username: 'Riti25' },
  //       axiosConfig
  //     )
  //     .then((response) => {
  //       setUsers(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data: ', error);
  //     });
  // }

  // Modal for File preview
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewRowIndex, setPreviewRowIndex] = useState(null);

  const handleGreenIconClick = (index) => {
    setPreviewRowIndex(index);
    setShowPreviewModal(true);
  };

  const closeModal = () => {
    setShowPreviewModal(false);
  };

  useEffect(() => {
    if (isUploaded) {
      setShowCheckmark(true);
      const timer = setTimeout(() => {
        setShowCheckmark(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isUploaded]);

  const [units, setUnits] = useState(unitTypes);

  // Delete row on frontend

  const handleDeleteRow = (index) => {
    const updatedRows = [...rowsState];
    updatedRows.splice(index, 1);
    dispatch(setRowsStateNew({ quarter, scope, rows: updatedRows }));
    setRows(updatedRows);
  };

  const collectErrorFieldNames = () => {
    const errorFieldNames = [];

    // Check each property in the errorState object
    for (const fieldName in errorState) {
      if (errorState[fieldName]) {
        errorFieldNames.push(fieldName);
      }
    }

    return errorFieldNames;
  };

  // Collect field names with errors
  const errorFieldNames = collectErrorFieldNames();

  const uniqueValueBasedOnActivities = useMemo(() => {
    return rowsState.map(row => row.activities?.map(activity => activity.id).join(',')).join('|');
  }, [rowsState]);

  // useEffect(() => {
  //   const newRow = {
  //     category: "",
  //     subCategory: "",
  //     activities: [],
  //     value1: "",
  //     value2: "",
  //     unit: ["", ""],
  //     fileRaw: "",
  //     file: null,
  //     fileName: "",
  //     modifiedTime: "",
  //     activity: "",
  //     selectedActivity: {},
  //     unitType: "",
  //     assignTo: "",
  //     uploadedBy: currentUser,
  //     noActivities: false,
  //     fetchingActivities: false
  //   };
  
  //   const updatedRows = [newRow];
  //   // Assuming you want to reset to the initial state when there's data present
  //   if (data.length > 0) {
  //     LoaderOpen();
  //     console.log('Empty rows dispatched');
  //     dispatch(setRowsStateNew({ quarter, scope, rows: updatedRows }));
  //     setRows(updatedRows);
  //     setTimeout(() => {
  //       LoaderClose(); 
  //     }, 1000); 
  //   }
  // }, [data, quarter,dispatch, scope]); 

  return (
    <>
    <div className="bg-white rounded-lg shadow border border-neutral-200 py-4 px-2 show w-full">
      <div>
        <div className="w-12 h-6 flex-col justify-center items-start inline-flex">
          <span className="">
            <div className="h-4 px-1 py-0.5 opacity-80 bg-gradient-to-r from-[#007EEF] to-[#2AE4FF] rounded-sm justify-start items-start gap-2.5 inline-flex ms-5">
              <div className="text-white text-[11px] font-bold uppercase leading-none">
                {quarter}
              </div>
            </div>
          </span>
        </div>
      </div>
      <ShowEmission data={data} scope={1} scopeInfo={scopeInfo} />
      <table
        className={`${
          data ? "mb-5" : "mb-5 mt-4"
        } w-full text-xs text-start text-[#707070]`}
      >
        <tbody>
          {rowsState?.map((row, index) => (
            <tr key={index} className="border-b border-[#EDEAE9]">
              <td className="w-[17.25%]">
                <div className="relative">
                  <select
                    value={row.category}
                    onChange={(event) => handleChange(event, index, "category")}
                    className="cursor-pointer appearance-none bg-white px-4 py-2 rounded leading-tight outline-none m-[3px] w-full truncate"
                  >
                    <option value="">Select Category</option>
                    {scopeInfo[0]?.Category?.map((item) => (
                      <option key={item.name}>{item.name}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
                    <KeyboardArrowDownOutlined
                      className="text-neutral-500"
                      style={{ fontSize: "20px" }}
                    />
                  </div>
                  {selectedCategory && (
                    <div
                      className="absolute left-0 right-0 bottom-0 h-px mb-1 bg-gray-500"
                      // You can adjust the styles and colors of the underline as needed
                    />
                  )}
                </div>
              </td>
              <td className="w-[17.25%]">
                <div className="relative">
                  <select
                    value={row.subCategory}
                    onChange={(event) =>
                      handleChange(event, index, "subCategory")
                    }
                    className="cursor-pointer appearance-none bg-white px-4 py-2 rounded leading-tight outline-none m-[3px] w-full truncate"
                  >
                    <option value="">Select SubCategory</option>
                    {scopeInfo[0]?.Category?.map((item) => {
                      if (item.name === row.category && item.SubCategory) {
                        return item.SubCategory.map((subItem) => (
                          <option key={subItem}>{subItem}</option>
                        ));
                      }
                      return null;
                    })}
                  </select>
                  <div className="absolute inset-y-0 -right-2 flex items-center pointer-events-none">
                    <KeyboardArrowDownOutlined
                      className="text-neutral-500"
                      style={{ fontSize: "20px" }}
                    />
                  </div>
                  {selectedSubCategory && (
                    <div
                      className="absolute left-0 right-0 bottom-0 h-px mb-1 bg-gray-500"
                      // You can adjust the styles and colors of the underline as needed
                    />
                  )}
                </div>
              </td>
              <td className="w-[17.25%]">
                <div className="relative" key={uniqueValueBasedOnActivities}>
                  <select
                    value={row.activity}
                    onChange={(event) => {
                      handleChange(event, index, "activity");
                    }}
                    className="cursor-pointer appearance-none bg-white px-4 py-2 rounded leading-tight outline-none m-[3px] w-full"
                  >
                    <option value="">
                      {row.fetchingActivities ? "Fetching activities..." : row.noActivities? 'No relevant activities found' : "Select Activity"}
                    </option>
                    {row?.activities?.map((item) => (
                      <option
                        key={item.id}
                        data-unit-type={item.unit_type}
                        data-id={item.id}
                        value={`${item.name} - ( ${item.source} ) - ${item.unit_type}`}
                      >
                        {item.name} - ( {item.source} ) - {item.unit_type} -{" "}
                        {item.region} - {item.year}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 -right-2 flex items-center pointer-events-none">
                    <KeyboardArrowDownOutlined
                      className="text-neutral-500"
                      style={{ fontSize: "20px" }}
                    />
                  </div>
                  {selectedActivity && (
                    <div
                      className="absolute left-0 right-0 bottom-0 h-px mb-1 bg-gray-500"
                      // You can adjust the styles and colors of the underline as needed
                    />
                  )}
                </div>
              </td>

              {!row.unitType.includes("Over") ? (
                <td className="relative w-[27.21%]">
                  <div className="flex w-full">
                    <div className="flex-grow">
                      <input
                        type="number"
                        className="w-full p-2 rounded-sm mt-1 ms-2 alignment"
                        value={row.value1}
                        onChange={(event) =>
                          handleChange(event, index, "value1")
                        }
                      />
                    </div>
                    <div className="absolute right-0 top-0.5">
                      <select
                        value={row.unit[0]}
                        onChange={(event) =>
                          handleChange(event, index, "unit1")
                        }
                        className={`cursor-pointer appearance-none px-2 py-1 rounded-md leading-tight outline-none ms-1 mt-1.5 font-bold text-xs ${
                          row.unit[0]
                            ? "text-sky-600 bg-white drop-shadow-md"
                            : "bg-sky-600 text-white"
                        }`}
                        style={{ width: "66px" }}
                      >
                        <option className="text-xs">Unit</option>
                        {row.activity &&
                          row.unitType &&
                          units
                            .filter((unit) => unit.unit_type === row.unitType)
                            .reduce((combinedUnits, unit) => {
                              return combinedUnits.concat(
                                Object.values(unit.units)
                              );
                            }, [])
                            .flat()
                            .map((unitName) => (
                              <option key={unitName} className="text-xs">
                                {unitName}
                              </option>
                            ))}
                      </select>
                      <span className="absolute right-2 top-4 transform -translate-y-1/2 pointer-events-none">
                        <ArrowDropDown
                          className={`text-xs ${
                            row.unit[0] ? "text-sky-600" : "text-white "
                          }`}
                        />
                      </span>
                    </div>
                  </div>
                </td>
              ) : (
                <td className="w-[27.21%]">
                  <div className="flex items-center">
                    <div className="relative w-1/2">
                      <input
                        type="number"
                        value={row.value1}
                        onChange={(event) =>
                          handleChange(event, index, "value1")
                        }
                        className="w-full p-2 rounded-sm mt-1 ms-2 alignment"
                      />
                      <div className="absolute right-0 top-0.5">
                        <select
                          value={row.unit[0]}
                          onChange={(event) =>
                            handleChange(event, index, "unit1")
                          }
                          className={`cursor-pointer appearance-none px-2 pe-5 py-1 rounded-md leading-tight outline-none ms-1 mt-1.5 font-bold text-xs ${
                            row.unit[0]
                              ? "text-sky-600 bg-white drop-shadow-md"
                              : "bg-sky-600 text-white"
                          } w-[66px]`}
                          style={{ width: "66px" }}
                        >
                          <option className="text-xs truncate">Unit</option>
                          {row.activity &&
                            row.unitType &&
                            units
                              .filter((unit) => unit.unit_type === row.unitType)
                              .map((unit) => {
                                const unitValues = Object.values(unit.units);
                                if (unitValues.length >= 2) {
                                  const firstArray = unitValues[0];
                                  return firstArray;
                                }
                                return [];
                              })
                              .flat()
                              .map((unitName) => (
                                <option
                                  key={unitName}
                                  className="text-xs truncate"
                                >
                                  {unitName}
                                </option>
                              ))}
                        </select>

                        <span className="absolute right-0 top-[1.15rem] transform -translate-y-1/2 pointer-events-none">
                          <ArrowDropDown
                            className={`text-xs ${
                              row.unit[0] ? "text-sky-600" : "text-white "
                            }`}
                          />
                        </span>
                      </div>
                    </div>

                    <div className="relative w-1/2 ">
                      <input
                        type="number"
                        className="w-full p-2 rounded-sm mt-1 ms-2 alignment"
                        value={row.value2}
                        onChange={(event) =>
                          handleChange(event, index, "value2")
                        }
                      />
                      <div className="absolute right-0 top-0.5">
                        <select
                          value={row.unit[1]}
                          onChange={(event) =>
                            handleChange(event, index, "unit2")
                          }
                          className={`cursor-pointer appearance-none  px-2 py-1 rounded-md leading-tight outline-none ms-1 mt-1.5 font-bold text-xs ${
                            row.unit[1]
                              ? "text-sky-600 bg-white drop-shadow-md"
                              : "bg-sky-600 text-white"
                          }`}
                          style={{ width: "66px" }}
                        >
                          <option className="text-xs">Unit</option>
                          {row.activity &&
                            row.unitType &&
                            units
                              .filter((unit) => unit.unit_type === row.unitType)
                              .map((unit) => {
                                const unitValues = Object.values(unit.units);
                                if (unitValues.length >= 2) {
                                  return unitValues[1]; // Get the second array within units
                                }
                                return [];
                              })
                              .flat()
                              .map((unitName) => (
                                <option key={unitName} className="text-xs">
                                  {unitName}
                                </option>
                              ))}
                        </select>
                        <span className="absolute right-2 top-4 transform -translate-y-1/2 pointer-events-none">
                          <ArrowDropDown
                            className={`text-xs ${
                              row.unit[1] ? "text-sky-600" : "text-white "
                            }`}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
              )}

              <td className="relative w-[8.26%]">
                <label
                  htmlFor={`fileInput-${index}-${scope}`}
                  className={`absolute left-2 top-0 cursor-pointer scope-${scope}`}
                >
                  <div className="flex items-center justify-center h-10">
                    {showCheckmark ? (
                      <CheckOutlined className="w-6 h-6 text-green-500" />
                    ) : row.file ? (
                      <div
                        className="flex items-center"
                        onClick={() => handleGreenIconClick(index)}
                      >
                        <FilePresent
                          className="w-6 h-6 mr-1 text-gray-400"
                          style={{ color: "green" }}
                        />
                        <div className="w-[56px] truncate text-sky-600">
                          {row.fileName}
                        </div>
                      </div>
                    ) : (
                      <>
                        <FileUploadOutlined className="w-6 h-6 text-sky-600 hover:text-gray-700 cursor-pointer" />
                        <span className="text-sky-600 ms-1.5">
                          {row.file ? row.fileName : "Upload"}
                        </span>
                      </>
                    )}
                  </div>
                </label>
                <input
                  id={`fileInput-${index}-${scope}`}
                  type="file"
                  className={`hidden scope-${scope}`}
                  onChange={(event) => handleChange(event, index, "file")}
                  disabled={row.file ? true : false}
                />

                <PdfPreviewModal
                  isOpen={showPreviewModal && previewRowIndex === index}
                  onClose={closeModal}
                  file={row.file}
                  fileName={row.fileName}
                  modifiedTime={row.modifiedTime}
                  row={row}
                  scope={scope}
                  uploadedBy={row.uploadedBy}
                />
              </td>

              <td className="w-[6.32%]">
                <div className="flex ml-2">
                  <div className="w-[85px] h-[30px] px-2.5 py-1 bg-sky-600 rounded-l flex-col justify-center items-center inline-flex">
                    <div className="justify-center items-center gap-2 inline-flex">
                      <div className="relative text-white text-[13px] font-medium leading-snug tracking-wide">
                        Assign to
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-[25px] h-[30px] px-2.5 py-1 bg-sky-600 rounded-r">
                    <div className="relative inline-flex">
                      <div className="absolute -mr-2 inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <ArrowDropDown className="text-white bg-blue" />
                      </div>
                      <select
                        value={row.value}
                        onChange={(event) =>
                          handleChange(event, index, "assignTo")
                        }
                        className="flex justify-center items-center w-[25px] h-[30px] px-2.5 py-1 bg-sky-600 rounded-r cursor-pointer appearance-none focus:outline-none text-white bg-blue hover:bg-light-blue-300"
                      >
                        <option value="" className="text-white pe-1"></option>
                        {users?.map(({ username }) => (
                          <option key={username}>{username}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </td>
              <td className="w-[2.32%]">
                <DeleteOutline
                  className="text-red-600 cursor-pointer"
                  onClick={() => handleDeleteRow(index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center">
        <button
          className="font-bold py-2 px-4 rounded text-xs opacity-70 text-sky-600"
          onClick={handleAddRow}
        >
          <AddOutlined style={{ fontSize: "20px", marginBottom: "3px" }} /> Add
          new
        </button>
        <div className="me-4">
          {errorFieldNames.length > 0 && (
            <p className="text-xs text-red-600">
              <ErrorOutlined style={{ fontSize: "16px" }} />
              The following fields are required:{" "}
              <span className="">{` ${errorFieldNames.join(", ")}`}</span>
            </p>
          )}
        </div>
      </div>
    </div>
    <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loopen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      </>
  );
}

export default CollectEmission;