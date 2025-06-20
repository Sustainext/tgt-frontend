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

  const submitForm = async (type) => {
    LoaderOpen();
    
    // No specific data to submit for content index - it's mainly a reference table
    const data = {
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

    const url = `${process.env.BACKEND_API_URL}/tcfd_report/content_index/${reportid}/`;
    try {
      const response = await axiosInstance.put(url, data);

      if (response.status === 200) {
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
    
    const url = `${process.env.BACKEND_API_URL}/tcfd_report/content_index/${reportid}/`;
    try {
      const response = await axiosInstance.get(url);
      if (response.data) {
        setData(response.data);
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

  // TCFD Content Index data structure
  const tcfdContentIndex = [
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
        }
      ]
    },
    {
      category: "Risk Management",
      description: "Disclose the actual and potential impacts of climate-related risks and opportunities on the organization's businesses, strategy, and financial planning where such information is material.",
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
          text: "Describe how processes for identifying, assessing, and managing climate-related risks are integrated into the organization's overall risk management.",
          pageRef: "Pg. No. --"
        }
      ]
    }
  ];

  return (
    <>
      <div className="mx-2 p-2">
        <h3 className="text-[22px] text-[#344054] mb-6 text-left font-semibold">
          8. TCFD Content Index
        </h3>

        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-4">
            This content index provides a reference to where TCFD recommended disclosures can be found within this report, 
            enabling readers to easily locate relevant climate-related financial information.
          </p>
        </div>

        {/* TCFD Content Index Table */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-[#1BA9CF] text-white">
                <th className="border border-gray-300 py-10 px-4 text-left font-semibold">
                  TCFD core elements
                </th>
                <th className="border border-gray-300 py-10 px-4 text-left font-semibold">
                  Recommended Disclosures
                </th>
                <th className="border border-gray-300 py-10 px-4 text-left font-semibold">
                  Location
                </th>
              </tr>
            </thead>
            <tbody>
              {tcfdContentIndex.map((category, categoryIndex) => (
                <React.Fragment key={categoryIndex}>
                  {/* Category row */}
                  <tr>
                    <td className="border border-gray-300 p-3 bg-gray-50 font-semibold align-top">
                      <div className="font-semibold text-[#344054] mb-2">
                        {category.category}:
                      </div>
                      <div className="text-sm text-gray-600 leading-relaxed">
                        {category.description}
                      </div>
                    </td>
                    <td className="border border-gray-300 p-3 align-top">
                      <div className="text-sm text-gray-700">
                        {category.disclosures[0].letter} {category.disclosures[0].text}
                      </div>
                    </td>
                    <td className="border border-gray-300 p-3 text-center align-top">
                      <div className="text-sm text-gray-600">
                        {category.disclosures[0].pageRef}
                      </div>
                    </td>
                  </tr>
                  
                  {/* Additional disclosure rows for the same category */}
                  {category.disclosures.slice(1).map((disclosure, disclosureIndex) => (
                    <tr key={`${categoryIndex}-${disclosureIndex + 1}`}>
                      <td className="border border-gray-300 p-3 bg-gray-50"></td>
                      <td className="border border-gray-300 p-3">
                        <div className="text-sm text-gray-700">
                          {disclosure.letter} {disclosure.text}
                        </div>
                      </td>
                      <td className="border border-gray-300 p-3 text-center">
                        <div className="text-sm text-gray-600">
                          {disclosure.pageRef}
                        </div>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Additional Information */}
        <div className="bg-blue-50 p-4 rounded border">
          <h4 className="text-[15px] text-[#344054] mb-2 font-semibold">
            Note
          </h4>
          <p className="text-sm text-gray-700">
            This TCFD Content Index is designed to help readers navigate our climate-related disclosures. 
            Page numbers will be automatically populated when the final report is generated. For the most 
            current information on our climate-related risks, opportunities, and performance, please refer 
            to the respective sections of this report.
          </p>
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