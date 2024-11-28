"use client";
import React, { useState } from "react";
import { IoIosWarning } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineReplay,MdDone } from "react-icons/md";
import { GoChevronRight } from "react-icons/go";
import dynamic from 'next/dynamic';


const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });


const MainValidationPopup = ({
  reportid,
  reportType,
  isModalOpen,
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
  const [selectedField, setSelectedField] = useState(null);
  const [selectedFieldIndex, setSelectedFieldIndex] = useState(null);
  const [fieldStatuses, setFieldStatuses] = useState({});
  const [selectedPage, setSelectedPage] = useState(null);
  const [fieldValues, setFieldValues] = useState({});
  const [statement,setStatement]=useState('')

  console.log(fieldValues,"look")
  const data = {
    screenTitles: {
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
    },
  };

  const config = {
    enter: "BR", // Or customize behavior on Enter key
  cleanHTML: true,
    enablePasteHTMLFilter: false, 
    askBeforePasteHTML: false, 
    askBeforePasteFromWord: false,
    style: {
      fontSize: "14px",
      color:"#667085"
    },
    height:200,
    allowResizeY: false,
    defaultActionOnPaste: 'insert_clear_html',
    toolbarSticky: false,
    toolbar: true,
    buttons: [
        'bold',
        'italic',
        'underline',
        'strikeThrough',
        'align',
        'outdent',
        'indent',
        'ul',
        'ol',
        'paragraph',
        'link',
        'table',
        'undo',
        'redo',
        'hr',
        'fontsize',
        'selectall'
    ],
    // Remove buttons from the extra buttons list
    removeButtons: ['fullsize', 'preview', 'source', 'print', 'about', 'find', 'changeMode','paintFormat','image','brush','font'],
  };

  
  // Group missing fields by page
  const groupedFields = missing_fields.reduce((acc, field) => {
    if (!acc[field.page]) acc[field.page] = [];
    acc[field.page].push(field);
    return acc;
  }, {});

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

  const handleUpdateField = () => {
    // Mark field as "filled"
    setFieldStatuses((prevStatuses) => ({
      ...prevStatuses,
      [`${selectedPage}-${selectedFieldIndex}`]: "filled",
    }));
    setFieldValues((prevValues) => ({
      ...prevValues,
      [`${selectedPage}-${selectedFieldIndex}`]: statement,
    }));
    toast.success("Data updated!");
    handleCloseSideModal();
  };

  const handleSkipField = () => {
    // Mark field as "skipped"
    setFieldStatuses((prevStatuses) => ({
      ...prevStatuses,
      [`${selectedPage}-${selectedFieldIndex}`]: "skipped",
    }));
    handleCloseSideModal();
  };

  const handleChange=(e)=>{
    setStatement(e.target.value)
  }
  const handleChangeEditor=(value)=>{
    setStatement(value)
  }

  console.log(statement,"look")

  const isAnyFieldFilled = Object.values(fieldStatuses).includes("filled");

  return (
    <>
      {isModalOpen && (
        <div className="flex gap-2 w-full">
          <div className="top-0 z-50 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center pt-14">
            <div
              className={`bg-white p-6 rounded-lg shadow-md w-full max-w-xl mx-4 ${
                selectedField ? "mr-[25%]" : ""
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
                    <p className="text-[#667085] text-[13px]">
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
                      {reportCreatedOn!='undefined'?reportCreatedOn:"N/A"}
                    </p>
                  </div>
                </div>
                <div className="border-t"></div>
                <div className="overflow-y-scroll table-scrollbar max-h-[270px] pr-2">
                  {Object.keys(groupedFields).map((page) => (
                    <div
                      key={page}
                      className="border border-gray-300 p-4 rounded-lg mb-2"
                    >
                      <h3 className="text-[16px] font-semibold text-[#343A40] mb-3">
                        {data.screenTitles[page]}
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
                                <span>{fieldStatuses[`${page}-${index}`] ===
                                  "filled"
                                    ? <MdDone className="text-[#42CC71] w-4 h-4 mt-0.5" />
                                    : <MdOutlineReplay className="text-[#0057A5] w-4 h-4 mt-0.5" />}</span>
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
                  ))}
                </div>
                <div className="border-b"></div>
                {/* <div className="flex justify-end gap-3 mt-1">
                  <button className="py-2 px-4 bg-transparent text-gray-700 rounded-lg shadow border border-gray-300 hover:bg-gray-100">
                    Leave Blank and Proceed
                  </button>
                  <button className="cursor-not-allowed opacity-30 py-2 px-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
                    Save and Continue
                  </button>
                </div> */}
                <div className="flex justify-end gap-3 mt-1">
                  <button
                    className={`py-2 px-4 bg-transparent text-gray-700 rounded-lg shadow border border-gray-300 ${
                      isAnyFieldFilled ? "opacity-30 cursor-not-allowed" : ""
                    }`}
                    disabled={isAnyFieldFilled}
                  >
                    Leave Blank and Proceed
                  </button>
                  <button
                    className={`py-2 px-4 bg-blue-500 text-white rounded-lg shadow ${
                      isAnyFieldFilled
                        ? "hover:bg-blue-600"
                        : "opacity-30 cursor-not-allowed"
                    }`}
                    disabled={!isAnyFieldFilled}
                  >
                    Save and Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
          {selectedField && (
            <div className="z-50 fixed inset-0 flex justify-center items-center pt-14">
              <div
                className={`bg-white rounded-lg shadow-md w-full max-w-xl h-[655px] ${
                  selectedField ? "ml-[50%]" : ""
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
                    {selectedField.type=="textarea"?(
                       <textarea
                       value={statement}
                       onChange={handleChange}
                       className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-400 resize-none"
                       rows={3}
                     ></textarea>
                    ):(
                      <div>
                      <JoditEditor
                        value={statement}
                        config={config}
                        tabIndex={1} 
                        onBlur={handleChangeEditor}
                      />
                    </div>
                    )}
                   
                  </div>

                  <div className="flex justify-end gap-2 pb-6 pl-6 pr-6">
                    {
                      statement?(
                        <div></div>
                      ):(
                        <button
                        className="py-2 px-4 text-[#007EEF] text-[14px] bg-transparent rounded-lg hover:underline"
                        onClick={handleSkipField}
                      >
                        Skip
                      </button>
                      )
                    }
                   
                    <button
                      disabled={statement?false:true}
                      className={`py-2 px-6 text-[#007EEF] text-[14px] bg-transparent rounded-lg border border-blue-500  ${statement?'hover:bg-blue-600 hover:text-white':'opacity-30 cursor-not-allowed'}`}
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
      )}
    </>
  );
};

export default MainValidationPopup;
