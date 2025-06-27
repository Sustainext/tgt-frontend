"use client";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from 'react-redux';
import { IoIosWarning } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineReplay, MdDone } from "react-icons/md";
import { GoChevronRight } from "react-icons/go";
import dynamic from 'next/dynamic';
import axiosInstance, { patch } from "../../../../utils/axiosMiddleware";
import {handleNext} from '../../../../../lib/redux/features/reportBuilderSlice'
import { useDispatch } from "react-redux";
// Import Redux selectors
import {
  selectEnabledSections,
  selectSections,
} from "../../../../../lib/redux/features/reportBuilderSlice";

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const MainValidationPopup = ({
  reportid,
  reportType,
  isModalOpen,
  setIsDownloadReportModalOpen,
  setActiveStep,
  setIsModalOpen,
  reportName,
  reportCreatedOn,
  createdBy,
  email,
  missing_fields,
  createdOn,
  orgName,
  fromDate,
  toDate,
}) => {
  const editor = useRef(null);
  const [selectedField, setSelectedField] = useState(null);
  const [selectedFieldIndex, setSelectedFieldIndex] = useState(null);
  const [fieldStatuses, setFieldStatuses] = useState({});
  const [selectedPage, setSelectedPage] = useState(null);
  const [fieldValues, setFieldValues] = useState({});
  const [statement, setStatement] = useState('');
  const dispatch=useDispatch()

  // Get section data from Redux for custom reports
  const enabledSections = useSelector(selectEnabledSections);
  const allSections = useSelector(selectSections);
  const isContentIndexSelected = useSelector((state)=> state.reportCreation.includeContentIndex)

  //console.log(isContentIndexSelected,"check")

  useEffect(() => {
    setFieldStatuses({});
    setFieldValues({});
  }, [missing_fields]);

  // Static screen titles for non-custom reports
  const staticScreenTitles = {
    screen_one: "1 Message from Our Leadership",
    screen_two: "2 About the Company & Operations",
    screen_three: "3 Mission, Vision, Value",
    screen_four: "4 Sustainability Roadmap",
    screen_five: "5 Awards & Alliances",
    screen_six: "6 Stakeholder Engagement",
    screen_seven: "7 About the Report",
    screen_eight: "8 Materiality",
    screen_nine: "9 Corporate Governance",
    screen_ten: "10 Sustainability Journey",
    screen_eleven: "11 Economic Performance",
    screen_twelve: "12 Environment",
    screen_thirteen: "13 People",
    screen_fourteen: "14 Community",
    screen_fifteen: "15 Customers, products & services",
  };

  // Mapping from section IDs to screen names
  const sectionToScreenMapping = {
    message_ceo: "screen_one",
    about_company: "screen_two",
    mission_vision: "screen_three",
    sustainability: "screen_four",
    awards: "screen_five",
    stakeholder: "screen_six",
    about_report: "screen_seven",
    materiality: "screen_eight",
    governance: "screen_nine",
    journey: "screen_ten",
    economic: "screen_eleven",
    environment: "screen_twelve",
    people: "screen_thirteen",
    community: "screen_fourteen",
    customers: "screen_fifteen",
  };

  // Generate dynamic screen titles based on section selections
  const getDynamicScreenTitles = () => {
    if (reportType !== 'Custom ESG Report') {
      return staticScreenTitles;
    }

    const dynamicTitles = {};
    const sortedSections = enabledSections.sort((a, b) => a.order - b.order);

    sortedSections.forEach((section, index) => {
      const screenName = sectionToScreenMapping[section.id];
      if (screenName) {
        dynamicTitles[screenName] = `${index + 1} ${section.title}`;
      }
    });

    // Add any missing static screens that might not be in the section mapping
    Object.keys(staticScreenTitles).forEach(screenName => {
      if (!dynamicTitles[screenName]) {
        // Try to find if this screen corresponds to any section
        const sectionId = Object.keys(sectionToScreenMapping).find(
          id => sectionToScreenMapping[id] === screenName
        );
        
        if (sectionId) {
          const section = allSections.find(s => s.id === sectionId);
          if (section && section.enabled) {
            const enabledIndex = sortedSections.findIndex(s => s.id === sectionId);
            if (enabledIndex !== -1) {
              dynamicTitles[screenName] = `${enabledIndex + 1} ${section.title}`;
            }
          }
        } else {
          // Fallback to static title if no section mapping found
          dynamicTitles[screenName] = staticScreenTitles[screenName];
        }
      }
    });

    return dynamicTitles;
  };

  const screenTitles = getDynamicScreenTitles();

  const config = {
    enter: "BR",
    cleanHTML: true,
    enablePasteHTMLFilter: false,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    style: {
      fontSize: "14px",
      color: "#667085"
    },
    height: 200,
    autofocus: true,
    preserveAspectRatio: false,
    readonly: false,
    allowResizeY: false,
    defaultActionOnPaste: 'insert_clear_html',
    toolbarSticky: false,
    toolbar: true,
    buttons: [
      'bold', 'italic', 'underline', 'strikeThrough', 'align', 'outdent',
      'indent', 'ul', 'ol', 'paragraph', 'link', 'table', 'undo', 'redo',
      'hr', 'fontsize', 'selectall'
    ],
    removeButtons: [
      'fullsize', 'preview', 'source', 'print', 'about', 'find',
      'changeMode', 'paintFormat', 'image', 'brush', 'font'
    ],
  };

  // Group missing fields by page and filter out fields for disabled sections
  const getGroupedFields = () => {
    if (reportType !== 'Custom ESG Report') {
      // For non-custom reports, return all fields
      return missing_fields.reduce((acc, field) => {
        if (!acc[field.page]) acc[field.page] = [];
        acc[field.page].push(field);
        return acc;
      }, {});
    }

    // For custom reports, filter based on enabled sections
    const enabledScreens = new Set();
    enabledSections.forEach(section => {
      const screenName = sectionToScreenMapping[section.id];
      if (screenName) {
        enabledScreens.add(screenName);
      }
    });

    return missing_fields.reduce((acc, field) => {
      // Only include fields for enabled sections
      if (enabledScreens.has(field.page)) {
        if (!acc[field.page]) acc[field.page] = [];
        acc[field.page].push(field);
      }
      return acc;
    }, {});
  };

  const groupedFields = getGroupedFields();

  const handleFillNowClick = (field, index, page) => {
    setSelectedField(field);
    setSelectedFieldIndex(index);
    setSelectedPage(page);
    setStatement(fieldValues[`${page}-${index}`] || "");
  };

  const handleCloseSideModal = () => {
    setSelectedField(null);
    setSelectedFieldIndex(null);
    setSelectedPage(null);
  };

  const handleUpdateField = async () => {
    const screen = selectedPage;
    const fieldKey = selectedField.field;
    const url = `${process.env.BACKEND_API_URL}/esg_report/${screen}/${reportid}/`;

    const payload = {
      [fieldKey]: {
        ...selectedField,
        content: statement,
      },
    };

    try {
      const response = await axiosInstance.put(url, payload);
      if (response.status === 200) {
        toast.success("Data updated successfully!");
        setFieldStatuses((prevStatuses) => ({
          ...prevStatuses,
          [`${selectedPage}-${selectedFieldIndex}`]: "filled",
        }));
        setFieldValues((prevValues) => ({
          ...prevValues,
          [`${selectedPage}-${selectedFieldIndex}`]: statement,
        }));
        handleCloseSideModal();
      } else {
        toast.error("Failed to update data. Please try again.");
      }
    } catch (error) {
      console.error("Error updating field:", error);
      toast.error("An error occurred while updating data.");
    }
  };

  const handleSkipField = async () => {
    const screen = selectedPage;
    const fieldKey = selectedField.field;
    const url = `${process.env.BACKEND_API_URL}/esg_report/${screen}/${reportid}/`;

    const payload = {
      [fieldKey]: {
        ...selectedField,
        isSkipped: true,
      },
    };

    try {
      const response = await axiosInstance.put(url, payload);
      if (response.status === 200) {
        toast.success("Field skipped successfully");
        setFieldStatuses((prevStatuses) => ({
          ...prevStatuses,
          [`${selectedPage}-${selectedFieldIndex}`]: "skipped",
        }));
        handleCloseSideModal();
      } else {
        toast.error("Failed to skip field. Please try again.");
      }
    } catch (error) {
      console.error("Error skipping field:", error);
      toast.error("An error occurred while skipping the field.");
    }
  };

  const handleChange = (e) => {
    setStatement(e.target.value);
  };

  const handleChangeEditor = (value) => {
    setStatement(value);
  };

  const isAnyFieldFilled = Object.values(fieldStatuses).includes("filled");

  // After field statuses are set, compute number filled
const totalFields = Object.values(groupedFields).reduce(
  (acc, arr) => acc + arr.length, 0
);

// A field is filled if marked "filled" or "skipped"
const numFilled = Object.values(fieldStatuses).filter(
  val => val === "filled" || val === "skipped"
).length;

// All fields are filled/skipped if numFilled === totalFields && totalFields > 0
const allFieldsFilled = totalFields > 0 && numFilled === totalFields;

  // Debug information (remove in production)
  const debugInfo = reportType === 'Custom ESG Report' ? {
    enabledSections: enabledSections.map(s => ({ id: s.id, title: s.title, order: s.order })),
    screenTitles,
    groupedFieldsCount: Object.keys(groupedFields).length,
  } : null;

  return (
    <>
      {isModalOpen && (
        <>
          <div className="">
            <div className="flex gap-2 w-full">
              <div className="top-0 z-50 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center pt-14">
                <div
                  className={`bg-white p-6 rounded-lg shadow-md w-full max-w-xl mx-4 ${
                    selectedField ? "xl:mr-[400px]" : ""
                  }`}
                >
                  <div className="flex flex-col gap-4">
                    <div>
                      <div className="flex gap-4">
                        <IoIosWarning className="text-[#F98845] w-5 h-5 mt-1" />
                        <h2 className="text-[#101828] text-[18px] font-semibold">
                          Add Missing Data
                        </h2>
                      </div>
                      <p className="text-[#667085] text-[14px] mt-2">
                        The data that are not filled in the report section are shown
                        here below. Click on the fill now button if you wish to add
                        any data before proceeding to Content Index section.
                      </p>
                      {/* {reportType === 'Custom ESG Report' && (
                        <p className="text-[#667085] text-[12px] mt-1 italic">
                          Section numbers are based on your custom section selection.
                        </p>
                      )} */}
                    </div>

                    <div className="flex justify-between">
                      <div className="w-[50%]">
                        <p className="text-[#344054] text-[13px]">Report Name</p>
                        <p className="text-[#101828] text-[13px] font-semibold">
                          {reportName}
                        </p>
                        <p className="text-[#667085] text-[13px]">
                          {reportType}
                        </p>
                      </div>
                      <div className="w-[40%]">
                        <p className="text-[#344054] text-[13px]">Created By</p>
                        <p className="text-[#101828] text-[13px] font-semibold">
                          {createdBy}
                        </p>
                        <p className="text-[#667085] text-[13px] overflow-hidden text-ellipsis whitespace-nowrap sm:w-full md:w-auto">
                          {email}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <div className="w-[50%]">
                        <p className="text-[#344054] text-[13px]">Reporting Period</p>
                        <p className="text-[#101828] text-[13px] font-semibold">
                          {fromDate} to {toDate}
                        </p>
                      </div>
                      <div className="w-[40%]">
                        <p className="text-[#344054] text-[13px]">Created On</p>
                        <p className="text-[#101828] text-[13px] font-semibold">
                          {reportCreatedOn != 'undefined' ? reportCreatedOn : "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="border-t"></div>

                    <div className="overflow-y-scroll table-scrollbar max-h-[270px] pr-2">
                      {Object.keys(groupedFields).length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-[#667085] text-[14px]">
                            No missing fields found for the selected sections.
                          </p>
                        </div>
                      ) : (
                        Object.keys(groupedFields).map((page) => (
                          <div
                            key={page}
                            className="border border-gray-300 p-4 rounded-lg mb-2"
                          >
                            <h3 className="text-[16px] font-semibold text-[#343A40] mb-3">
                              {screenTitles[page] || `Section ${page}`}
                            </h3>
                            {groupedFields[page].map((field, index) => (
                              <div className="mb-4" key={index}>
                                <p className="text-[13px] text-[#667085] font-semibold mb-1">
                                  {field.label}
                                </p>
                                <div
                                  className={`flex justify-between hover:border-t-2 hover:border-b-2 hover:border-blue-200 hover:py-1 ${
                                    selectedFieldIndex === index &&
                                    selectedPage === page
                                      ? "bg-[#007eef1a] p-2 rounded-md"
                                      : ""
                                  }`}
                                >
                                  <p className="text-[#343A40] text-[13px] w-[80%]">
                                    {field.subLabel || "No description provided"}
                                  </p>
                                  <button
                                    className="text-[#007EEF] text-[13px] hover:no-underline"
                                    onClick={() =>
                                      handleFillNowClick(field, index, page)
                                    }
                                  >
                                    {fieldStatuses[`${page}-${index}`] ? (
                                      <div className="flex gap-2">
                                        <span
                                          className={`text-[13px] ${
                                            fieldStatuses[`${page}-${index}`] ===
                                            "filled"
                                              ? "text-[#0057A5]"
                                              : "text-[#0057A5]"
                                          }`}
                                        >
                                          {fieldStatuses[`${page}-${index}`] ===
                                          "filled"
                                            ? "Filled"
                                            : "Skipped"}
                                        </span>
                                        <span>
                                          {fieldStatuses[`${page}-${index}`] ===
                                          "filled"
                                            ? <MdDone className="text-[#42CC71] w-4 h-4 mt-0.5" />
                                            : <MdOutlineReplay className="text-[#0057A5] w-4 h-4 mt-0.5" />}
                                        </span>
                                      </div>
                                    ) : (
                                      <div className="flex gap-2">
                                        <p>Fill now</p>
                                        <GoChevronRight className="text-[#007EEF] w-4 h-4 mt-0.5" />
                                      </div>
                                    )}
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ))
                      )}
                    </div>

                    <div className="border-b"></div>

                    <div className="flex justify-center gap-3 mt-1">
                      <button
                        className={`py-2 px-10 bg-transparent text-gray-700 rounded-lg shadow border border-gray-300 ${
                          allFieldsFilled ? "opacity-30 cursor-not-allowed" : ""
                        }`}
                        disabled={allFieldsFilled}
                        onClick={() => {
                          if(!isContentIndexSelected && reportType==='Custom ESG Report'){
                          // if (reportType === 'GRI Report: In accordance With') {
                          //   setActiveStep(16);
                          // } else {
                          //   setActiveStep(17);
                          // }
                          //console.log("called if")
                          setIsDownloadReportModalOpen(true)
                          }
                          else{
                            //console.log("called leave")
                            dispatch(handleNext());
                           
                          }
                          setIsModalOpen(false);
                        }}
                      >
                        Leave Blank and Proceed
                      </button>
                      <button
                        className={`py-2 px-10 bg-blue-500 text-white rounded-lg shadow ${
                          allFieldsFilled
                            ? "hover:bg-blue-600"
                            : "opacity-30 cursor-not-allowed"
                        }`}
                        disabled={!allFieldsFilled}
                        onClick={() => {
                          if(!isContentIndexSelected && reportType==='Custom ESG Report'){
                            setIsDownloadReportModalOpen(true)
                          }
                          else{
                            dispatch(handleNext());
                          }
                          setIsModalOpen(false);
                        }}
                      >
                        Save and Continue
                      </button>
                    </div>

                    {/* Debug information - remove in production */}
                    {/* {process.env.NODE_ENV === 'development' && debugInfo && (
                      <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
                        <details>
                          <summary className="cursor-pointer font-bold">Debug Info</summary>
                          <pre className="mt-1 overflow-auto">
                            {JSON.stringify(debugInfo, null, 2)}
                          </pre>
                        </details>
                      </div>
                    )} */}
                  </div>
                </div>
              </div>

              {selectedField && (
                <div className="z-50 fixed inset-0 flex justify-center items-center pt-14">
                  <div
                    className={`bg-white rounded-lg shadow-md w-full xl:max-w-xl max-w-md h-[655px] ${
                      selectedField ? "xl:ml-[800px]" : ""
                    }`}
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex justify-between items-center mb-4 p-6 border-b">
                        <h3 className="text-[16px] font-semibold text-[#727272]">
                          {selectedField.label}
                        </h3>
                        <button
                          className="text-gray-500 hover:text-gray-700"
                          onClick={handleCloseSideModal}
                        >
                          <IoCloseOutline className="w-6 h-6" />
                        </button>
                      </div>
                      <div className="p-6 pt-2">
                        <p className="text-[15px] font-semibold text-[#344054] mb-2">
                          {selectedField.label || "No description provided"}
                        </p>
                        <p className="text-[14px] text-[#344054] mb-4">
                          {selectedField.subLabel || "No description provided"}
                        </p>
                        <textarea
                          value={statement}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-400 resize-none"
                          rows={3}
                        ></textarea>
                      </div>

                      <div className="flex justify-end gap-2 pb-6 pl-6 pr-6">
                        {!statement && (
                          <button
                            className="py-2 px-4 text-[#007EEF] text-[14px] bg-transparent rounded-lg hover:underline"
                            onClick={handleSkipField}
                          >
                            Skip
                          </button>
                        )}
                        <button
                          disabled={!statement}
                          className={`py-2 px-6 text-[#007EEF] text-[14px] bg-transparent rounded-lg border border-blue-500 ${
                            statement
                              ? 'hover:bg-blue-600 hover:text-white'
                              : 'opacity-30 cursor-not-allowed'
                          }`}
                          onClick={handleUpdateField}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MainValidationPopup;