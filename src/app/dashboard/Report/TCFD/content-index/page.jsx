// Replace the existing component with this updated version that handles both object and array data

"use client";
import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import axiosInstance from "../../../../utils/axiosMiddleware";

const TCFDContentIndex = forwardRef(({ onSubmitSuccess }, ref) => {
  const orgName =
    typeof window !== "undefined" ? localStorage.getItem("reportorgname") : "";
  const reportid =
    typeof window !== "undefined" ? localStorage.getItem("reportid") : "";
  
  const apiCalledRef = useRef(false);
  const [data, setData] = useState("");
  const [collectData, setCollectData] = useState({});
  const [loopen, setLoOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    submitForm,
  }));

  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };

  // Default TCFD Content Index structure (fallback)
  const defaultTcfdContentIndex = [
    {
      category: "Governance",
      description: "Disclose the organization's governance around climate-related risks and opportunities.",
      disclosures: [
        {
          letter: "a)",
          text: "Describe the board's oversight of climate-related risks and opportunities.",
          pageRef: "Pg. No. --"
        },
        {
          letter: "b)",
          text: "Describe management's role in assessing and managing climate-related risks and opportunities.",
          pageRef: "Pg. No. --"
        }
      ]
    },
    {
      category: "Strategy",
      description: "Disclose the actual and potential impacts of climate-related risks and opportunities on the organization's businesses, strategy, and financial planning where such information is material.",
      disclosures: [
        {
          letter: "a)",
          text: "Describe the climate-related risks and opportunities the organization has identified over the short, medium, and long term",
          pageRef: "Pg. No. --"
        },
        {
          letter: "b)",
          text: "Describe the impact of climate-related risks and opportunities on the organization's businesses, strategy, and financial planning.",
          pageRef: "Pg. No. --"
        },
        {
          letter: "c)",
          text: "Describe the resilience of the organization's strategy, taking into consideration different climate-related scenarios, including a 2°C or lower scenario.",
          pageRef: "Pg. No. --"
        }
      ]
    },
    {
      category: "Risk Management",
      description: "Disclose how the organization identifies, assesses, and manages climate-related risks.",
      disclosures: [
        {
          letter: "a)",
          text: "Describe the organization's processes for identifying and assessing climate-related risks.",
          pageRef: "Pg. No. --"
        },
        {
          letter: "b)",
          text: "Describe the organization's processes for managing climate-related risks.",
          pageRef: "Pg. No. --"
        },
        {
          letter: "c)",
          text: "Describe how processes for identifying, assessing, and managing climate-related risks are integrated into the organization's overall risk management.",
          pageRef: "Pg. No. --"
        }
      ]
    },
    {
      category: "Metrics & Targets",
      description: "Disclose the metrics and targets used to assess and manage relevant climate-related risks and opportunities where such information is material.",
      disclosures: [
        {
          letter: "a)",
          text: "Disclose the metrics used by the organization to assess climate-related risks and opportunities in line with its strategy and risk management process.",
          pageRef: "Pg. No. --"
        },
        {
          letter: "b)",
          text: "Disclose Scope 1, Scope 2, and, if appropriate, Scope 3 greenhouse gas (GHG) emissions, and the related risks.",
          pageRef: "Pg. No. --"
        },
        {
          letter: "c)",
          text: "Describe the targets used by the organization to manage climate-related risks and opportunities and performance against targets.",
          pageRef: "Pg. No. --"
        }
      ]
    }
  ];

  // Function to process TCFD content index data - handles both object and array formats
  const processTcfdContentIndex = () => {
    // Check if we have content index data from API
    const apiContentIndex = collectData || {};
    
    console.log("Processing TCFD Content Index:", apiContentIndex);

    // If no data, return default
    if (!apiContentIndex || Object.keys(apiContentIndex).length === 0) {
      return defaultTcfdContentIndex;
    }

    // If it's already an array, return as is
    if (Array.isArray(apiContentIndex)) {
      return apiContentIndex;
    }

    // Process the specific API object structure
    if (typeof apiContentIndex === 'object') {
      const processedData = [];
      
      // Handle the specific structure from your API
      Object.keys(apiContentIndex).forEach(categoryKey => {
        const categoryData = apiContentIndex[categoryKey];
        
        if (categoryData && typeof categoryData === 'object' && categoryData.disclosures) {
          const category = {
            category: categoryKey, // Use the exact key name from API
            description: categoryData.description || "",
            disclosures: []
          };

          // Process disclosures array
          if (Array.isArray(categoryData.disclosures)) {
            categoryData.disclosures.forEach(disclosure => {
              // Extract letter from description (e.g., "a) Describe..." -> letter: "a)", text: "Describe...")
              const fullDescription = disclosure.description || "";
              const letterMatch = fullDescription.match(/^([a-z]\))\s*/i);
              
              const letter = letterMatch ? letterMatch[1] : "";
              const text = letterMatch ? fullDescription.replace(letterMatch[0], "") : fullDescription;
              
              category.disclosures.push({
                letter: letter,
                text: text,
                pageRef: disclosure.pageRef || "Pg. No. --",
                screenTag: disclosure.screen_tag,
                id: disclosure.id,
                selected: disclosure.selected
              });
            });
          }

          processedData.push(category);
        }
      });

      console.log("Processed TCFD Data:", processedData);
      return processedData.length > 0 ? processedData : defaultTcfdContentIndex;
    }

    // Fallback to default
    return defaultTcfdContentIndex;
  };

  const submitForm = async (type) => {
    LoaderOpen();

    const formData = new FormData();
    formData.append('report', reportid);
    formData.append('screen_name', 'tcfd_content_index');
    
    const dataPayload = {
      content_index_completed: {
        page: "tcfd_content_index",
        label: "8. TCFD Content Index",
        subLabel: "Content Index Table",
        type: "boolean",
        content: true,
        field: "content_index_completed",
        isSkipped: false,
      },
    };
    
    formData.append('data', JSON.stringify(dataPayload));

    const url = `${process.env.BACKEND_API_URL}/tcfd_framework/report/upsert-tcfd-report/`;

    try {
      const response = await axiosInstance.put(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200 || response.status === 201) {
        if (type === "next") {
          toast.success("Content index completed", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }

        if (onSubmitSuccess) {
          onSubmitSuccess(true);
        }
        LoaderClose();
        return true;
      } else {
        toast.error("Oops, something went wrong", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        LoaderClose();
        return false;
      }
    } catch (error) {
      LoaderClose();
      toast.error("Oops, something went wrong", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    }
  };

  const loadFormData = async () => {
    LoaderOpen();
    
    const url = `${process.env.BACKEND_API_URL}/tcfd_framework/report/get-tcfd-report-data/${reportid}/tcfd_content_index/`;
    try {
      const response = await axiosInstance.get(url);
      
      if (response.data && response.data.data) {
        console.log("TCFD Content Index response.data", response.data);
        console.log("report_data:", response.data.data.report_data);
        console.log("tcfd_collect_data:", response.data.data.tcfd_collect_data);
        
        setData(response.data.data.report_data);
        setCollectData(response.data.data.tcfd_collect_data);
      }
      LoaderClose();
    } catch (error) {
      console.error("API call failed:", error);
      LoaderClose();
    }
  };

  useEffect(() => {
    if (!apiCalledRef.current && reportid) {
      apiCalledRef.current = true;
      loadFormData();
    }
  }, [reportid]);

  // Get the processed content index data
  const tcfdContentIndex = processTcfdContentIndex();

  return (
    <>
      <div className="mx-2 p-2">
        <h3 className="text-[22px] text-[#344054] mb-6 text-left font-semibold">
          8. TCFD Content Index
        </h3>

        {/* TCFD Content Index Table */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-[#1BA9CF] text-white">
                <th className="border border-gray-300 py-10 px-4 text-left font-semibold">
                  TCFD core elements
                </th>
                <th className="border border-gray-300 py-10 px-4 text-center font-semibold">
                  Recommended Disclosures
                </th>
                <th className="border border-gray-300 py-10 px-4 text-center font-semibold w-1/3">
                  Location
                </th>
              </tr>
            </thead>
            <tbody>
              {tcfdContentIndex && tcfdContentIndex.length > 0 ? (
                tcfdContentIndex.map((category, categoryIndex) => (
                  <React.Fragment key={categoryIndex}>
                    {category.disclosures && category.disclosures.length > 0 ? (
                      // Filter to show only selected disclosures, or all if none are selected
                      category.disclosures
                        .filter(disclosure => disclosure.selected !== false) // Show selected or undefined (backwards compatibility)
                        .map((disclosure, disclosureIndex) => (
                        <tr key={`${categoryIndex}-${disclosureIndex}`}>
                          {/* First column - only show for the first disclosure of each category */}
                          {disclosureIndex === 0 && (
                            <td 
                              className="border border-gray-300 p-3 bg-gray-50 font-semibold align-top"
                              rowSpan={category.disclosures.filter(d => d.selected !== false).length}
                            >
                              <div className="font-semibold text-[#344054] mb-2">
                                {category.category}:
                              </div>
                              <div className="text-sm text-gray-600 leading-relaxed">
                                {category.description}
                              </div>
                            </td>
                          )}
                          
                          {/* Second column - Recommended Disclosures */}
                          <td className="border border-gray-300 p-3 align-top">
                            <div className="text-sm text-gray-700">
                              {disclosure.letter && (
                                <span className="font-medium">{disclosure.letter} </span>
                              )}
                              {disclosure.text}
                              {/* {disclosure.screenTag && (
                                <div className="mt-1">
                                  <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                                    {disclosure.screenTag}
                                  </span>
                                </div>
                              )} */}
                            </div>
                          </td>
                          
                          {/* Third column - Location */}
                          <td className="border border-gray-300 p-3 text-center align-top">
                            <div className="text-sm text-gray-600">
                              {disclosure.pageRef}
                              {disclosure.selected && (
                                <div className="mt-1">
                                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full" title="Selected"></span>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr key={categoryIndex}>
                        <td className="border border-gray-300 p-3 bg-gray-50 font-semibold align-top">
                          <div className="font-semibold text-[#344054] mb-2">
                            {category.category}:
                          </div>
                          <div className="text-sm text-gray-600 leading-relaxed">
                            {category.description}
                          </div>
                        </td>
                        <td className="border border-gray-300 p-3 align-top text-center text-gray-500">
                          No disclosures available
                        </td>
                        <td className="border border-gray-300 p-3 text-center align-top text-gray-500">
                          --
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="border border-gray-300 p-8 text-center text-gray-500">
                    No TCFD content index data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
    </>
  );
});

TCFDContentIndex.displayName = "TCFDContentIndex";

export default TCFDContentIndex;