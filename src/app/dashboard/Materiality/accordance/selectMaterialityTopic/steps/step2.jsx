import React, { useState, useEffect } from "react";
import axiosInstance from "../../../../../utils/axiosMiddleware";
import materialImage from "../../../../../../../public/materiality.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import Image from "next/image";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import AccordionItemstep2 from "./AccordionItem2"
const Step2 = ({ data, setCurrentStep, handleNext, handlePrevious }) => {
  const [disclosureTopics, setDisclosureTopics] = useState([]);
  const [selectedDisclosures, setSelectedDisclosures] = useState({});
  const [dataPresent, setDatapresent] = useState(false);
  const id = typeof window !== "undefined" ? localStorage.getItem("id") : "";
  const [loopen, setLoOpen] = useState(false);

  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };

  // Fetch the disclosure topics from the API
  const fetchDisclosure = async () => {
    LoaderOpen();
    const url = `${process.env.BACKEND_API_URL}/materiality_dashboard/get-material-topic-disclosures/${id}/`;
    try {
      const response = await axiosInstance.get(url);
      if (response.status === 200) {
        setDisclosureTopics(response.data);
        // const disclosureData = response.data;
        // // set initial selected disclosure
        // const initialSelectedDisclosures = {};

        // // Function to add disclosures where can_edit is false to selectedDisclosures
        // const processDisclosures = (section) => {
        //   section.forEach((topicObj) => {
        //     const topicName = Object.keys(topicObj)[0];
        //     const disclosures = topicObj[topicName];

        //     disclosures.forEach((disclosure) => {
        //       if (!disclosure.can_edit) {
        //         const { selected_material_topic_id, disclosure_id } = disclosure;

        //         // Add to initialSelectedDisclosures in the correct format
        //         if (!initialSelectedDisclosures[selected_material_topic_id]) {
        //           initialSelectedDisclosures[selected_material_topic_id] = [];
        //         }

        //         // Only add the disclosure_id if it's not already present
        //         if (!initialSelectedDisclosures[selected_material_topic_id].includes(disclosure_id)) {
        //           initialSelectedDisclosures[selected_material_topic_id].push(disclosure_id);
        //         }
        //       }
        //     });
        //   });
        // };

        // // Process each section (environment, social, governance)
        // if (disclosureData.environment) {
        //   processDisclosures(disclosureData.environment);
        // }
        // if (disclosureData.social) {
        //   processDisclosures(disclosureData.social);
        // }
        // if (disclosureData.governance) {
        //   processDisclosures(disclosureData.governance);
        // }
        // setSelectedDisclosures(initialSelectedDisclosures);
        // setSelectedDisclosures((prevState) => ({
        //   ...prevState,
        //   ...initialSelectedDisclosures
        // }));
        LoaderClose();
      } else {
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
    }
  };

  const fetchSelectedDisclosure = async () => {
    LoaderOpen();
    const url = `${process.env.BACKEND_API_URL}/materiality_dashboard/assessment-disclosure-selection/${id}/`;
    try {
      const response = await axiosInstance.get(url);
      if (response.status === 200 && response.data.length > 0) {
        initializeSelectedDisclosures(response.data);
        setDatapresent(true);
        LoaderClose();
      }
      //  else {
      //   LoaderClose()
      //   toast.error("Oops, something went wrong", {
      //     position: "top-right",
      //     autoClose: 1000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "colored",
      //   });
      // }
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
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (topicSelectionId, disclosureId) => {
    setSelectedDisclosures((prev) => {
      // Check if topicSelectionId exists
      if (prev[topicSelectionId]) {
        // If the disclosureId already exists, remove it
        if (prev[topicSelectionId].includes(disclosureId)) {
          return {
            ...prev,
            [topicSelectionId]: prev[topicSelectionId].filter(
              (id) => id !== disclosureId
            ),
          };
        } else {
          // Otherwise, add the disclosureId
          return {
            ...prev,
            [topicSelectionId]: [...prev[topicSelectionId], disclosureId],
          };
        }
      } else {
        // If topicSelectionId doesn't exist, create a new array for it
        return {
          ...prev,
          [topicSelectionId]: [disclosureId],
        };
      }
    });
  };

  // Format the selected disclosures into the desired structure
  const formatSelectedDisclosures = () => {
    return Object.keys(selectedDisclosures).map((topicSelectionId) => ({
      topic_selection_id: [parseInt(topicSelectionId)],
      disclosure_ids: selectedDisclosures[topicSelectionId],
    }));
  };

  //next button disabled
  const isNextButtonDisabled = () => {
    const sections = ["environment", "social", "governance"];
    for (let section of sections) {
      const topics = disclosureTopics[section];
      if (topics) {
        for (let topic of topics) {
          const topicId = Object.keys(topic)[0];
          const disclosures = topic[topicId];
          const isAnyDisclosureSelected = disclosures.some((disclosure) =>
            selectedDisclosures[
              disclosure.selected_material_topic_id
            ]?.includes(disclosure.disclosure_id)
          );
          if (!isAnyDisclosureSelected) {
            return true; // Disable if any topic lacks a selected disclosure
          }
        }
      }
    }
    return false; // Enable if all topics have at least one selected disclosure
  };

  // Function to render topics and disclosures
  const renderDisclosureTopics = (sectionData, sectionTitle) => {
    return (
      <>
      <div className="shadow-lg rounded-lg mx-6 mt-4 hidden xl:block lg:block md:block 4k:block 2k:block" key={sectionTitle}>
        <div className="gradient-background p-2 rounded-t-lg flex justify-between">
          <p className="text-[#2E0B34] text-[17px] mx-2 pt-2 text-bold">
            {sectionTitle}
          </p>
        </div>
        <div className="p-3">
          {sectionData.map((topic, topicIndex) => {
            const topicName = Object.keys(topic)[0];
            const disclosures = topic[topicName];

            return (
              <div
                key={topicIndex}
                className={`p-3 ${
                  topicIndex < sectionData.length - 1
                    ? "border-b border-gray-300"
                    : ""
                }`}
              >
                <div className="xl:flex md:flex gap-10 items-start">
                  <p className="text-[#2E0B34] text-[15px] mx-2 pt-2 min-w-[200px]">
                    {topicName}
                  </p>
                  <div className="relative">
                    {disclosures.map((disclosure) => (
                      <div key={disclosure.disclosure_id} className="mx-2 pt-1">
                        <label className="flex items-center gap-2 text-sm mb-4 cursor-pointer">
                          <input
                            type="checkbox"
                            value={disclosure.disclosure_id}
                            checked={
                              selectedDisclosures[
                                disclosure.selected_material_topic_id
                              ]?.includes(disclosure.disclosure_id) || false
                            }
                            disabled={!disclosure.can_edit}
                            onChange={() =>
                              handleCheckboxChange(
                                disclosure.selected_material_topic_id,
                                disclosure.disclosure_id
                              )
                            }
                            className={`form-checkbox h-3 w-3 accent-[#008000]  ${
                              disclosure.can_edit ? "cursor-pointer" : ""
                            }`}
                            data-tooltip-html={
                              !disclosure.can_edit
                                ? "<p>This is a Topic Management Disclosure and cannot be skipped.</p>"
                                : ""
                            }
                            data-tooltip-id={`tooltip-${disclosure.disclosure_id}`}
                          />
                          {disclosure.name}
                        </label>
                      </div>
                    ))}
                    {disclosures.map((disclosure) => (
                      <ReactTooltip
                        key={disclosure.disclosure_id}
                        id={`tooltip-${disclosure.disclosure_id}`} // Unique ID for each tooltip
                        place="top"
                        effect="solid"
                        backgroundColor="#000"
                        textColor="white"
                        fontSize="12px"
                        borderRadius="8px"
                        delayShow={200}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* mobile version */}
      <div className="md:hidden xl:hidden lg:hidden 4k:hidden 2k:hidden 2xl:hidden block px-4 mt-4" key={`${sectionTitle}-mobile`}>
        <AccordionItemstep2 title={sectionTitle}>
          {sectionData.map((topic, topicIndex) => {
            const topicName = Object.keys(topic)[0];
            const disclosures = topic[topicName];

            return (
              <div key={topicIndex} className="mb-4">
                <p className="text-[#2E0B34] text-[15px] font-medium mb-2">
                  {topicName}
                </p>
                <div className="border-b-2"> 
                {disclosures.map((disclosure) => (
                  <div key={disclosure.disclosure_id} className="pt-1 ">
                    <label className="flex items-center gap-2 text-sm mb-3 cursor-pointer">
                      <input
                        type="checkbox"
                        value={disclosure.disclosure_id}
                        checked={
                          selectedDisclosures[
                            disclosure.selected_material_topic_id
                          ]?.includes(disclosure.disclosure_id) || false
                        }
                        disabled={!disclosure.can_edit}
                        onChange={() =>
                          handleCheckboxChange(
                            disclosure.selected_material_topic_id,
                            disclosure.disclosure_id
                          )
                        }
                        className={`form-checkbox h-3 w-3 accent-[#008000] ${
                          disclosure.can_edit ? "cursor-pointer" : ""
                        }`}
                        data-tooltip-html={
                          !disclosure.can_edit
                            ? "<p>This is a Topic Management Disclosure and cannot be skipped.</p>"
                            : ""
                        }
                        data-tooltip-id={`tooltip-${disclosure.disclosure_id}`}
                      />
                      {disclosure.name}
                    </label>
                    <ReactTooltip
                      id={`tooltip-${disclosure.disclosure_id}`}
                      place="top"
                      effect="solid"
                      backgroundColor="#000"
                      textColor="white"
                      fontSize="12px"
                      borderRadius="8px"
                      delayShow={200}
                    />
                  </div>
                ))}
                </div>
              </div>
            );
          })}
        </AccordionItemstep2>
      </div>
      </>

    );
  };

  // const initializeSelectedDisclosures = (disclosureData) => {

  //   const initialState = disclosureData.reduce((acc, curr) => {
  //     if (!acc[curr.topic_selection_id]) {
  //       acc[curr.topic_selection_id] = [];
  //     }
  //     acc[curr.topic_selection_id].push(curr.disclosure_id);
  //     return acc;
  //   }, {});
  //   setSelectedDisclosures(initialState);
  // };

  const initializeSelectedDisclosures = (disclosureData) => {
    const initialState = disclosureData.reduce((acc, curr) => {
      if (!acc[curr.topic_selection_id]) {
        acc[curr.topic_selection_id] = [];
      }

      if (!acc[curr.topic_selection_id].includes(curr.disclosure_id)) {
        acc[curr.topic_selection_id].push(curr.disclosure_id);
      }

      return acc;
    }, {});

    setSelectedDisclosures(initialState);
  };

  useEffect(() => {
    fetchDisclosure();
    fetchSelectedDisclosure();
  }, []);

  const handleSubmit = async (selectedData) => {
    const data = {
      assessment_id: id,
      topic_disclosures: selectedData,
    };
    const url = dataPresent
      ? `${process.env.BACKEND_API_URL}/materiality_dashboard/assessment-disclosure-selection/${id}/edit/`
      : `${process.env.BACKEND_API_URL}/materiality_dashboard/assessment-disclosure-selection/`;
    try {
      const response = dataPresent
        ? await axiosInstance.put(url, data)
        : await axiosInstance.post(url, data);

      if (response.status >= 200 && response.status < 300) {
        handleNext();
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
      }
    } catch (error) {
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
    }
  };

  return (
    <>
      {disclosureTopics.environment ||
      disclosureTopics.social ||
      disclosureTopics.governance ? (
        <div className="xl:mt-3 lg:mt-3 2xl:mt-3 4k:mt-3 2k:mt-3 md:mt-3 mt-8 mb-3 ">
          {/* Render Environment */}
          {disclosureTopics.environment &&
            renderDisclosureTopics(disclosureTopics.environment, "Environment")}
          {/* Render Social */}
          {disclosureTopics.social &&
            renderDisclosureTopics(disclosureTopics.social, "Social")}
          {/* Render Governance */}
          {disclosureTopics.governance &&
            renderDisclosureTopics(disclosureTopics.governance, "Governance")}
        </div>
      ) : (
        <div className="border mt-4 mx-5 rounded-md">
          <div className="flex justify-center items-center p-3">
            <div>
              <div className="flex justify-center items-center my-2 mt-5">
                <Image src={materialImage} alt="img" width={250} height={250} />
              </div>

              <div className="mb-4">
                <p className="text-[24px] font-bold mb-3 text-center">
                  No ESG Topics Selected
                </p>
                <p className="text-[16px] text-[#2E0B34] mb-4 text-center">
                  Select ESG Topics from the previous screen to select the GRI
                  disclosures here
                </p>
                <button
                  className="w-full h-full  py-2 px-3 text-[#007EEF]  cursor-pointer"
                  onClick={() => {
                    setCurrentStep(0);
                  }}
                >
                  {"<"} Back to Select ESG Topics
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-end w-full gap-4 mt-4 relative">
        <button
          className="w-auto h-full mr-2 py-2 px-3 text-[#727272] cursor-pointer"
          onClick={() => {
            handlePrevious();
          }}
        >
          {"<"} Previous
        </button>
        <button
          // className={`w-[16%] h-full mr-4 py-2 px-2 bg-[#007EEF] text-white rounded-[8px] shadow cursor-pointer`}
          className={`w-[15%] h-full mr-6 py-2 px-2 bg-[#007EEF] ${
            isNextButtonDisabled()
              ? "opacity-30 cursor-not-allowed"
              : "cursor-pointer"
          } text-white rounded-[8px] shadow`}
          onClick={() => {
            const formattedDisclosures = formatSelectedDisclosures();
            handleSubmit(formattedDisclosures);
          }}
          data-tooltip-html={
            "<p>Please select at least one disclosure from each topic.</p>"
          }
          data-tooltip-id={`nextButtonTooltip`}
          disabled={isNextButtonDisabled()}
        >
          Next {">"}
        </button>
        {isNextButtonDisabled() && (
          <ReactTooltip
            id="nextButtonTooltip"
            place="top"
            effect="solid"
            backgroundColor="#000"
            textColor="white"
            fontSize="12px"
            borderRadius="8px"
            delayShow={200}
          />
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
      {/* Toast Container */}
      <ToastContainer />
    </>
  );
};

export default Step2;
