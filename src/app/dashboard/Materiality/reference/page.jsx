"use client";
import React, { useState, useEffect } from "react";
import ReferencePopup from "../modals/referencePopup";
import CompletePopup from "../modals/completePopup";
import { GRIData } from "../data/GRIinfo";
import { MdOutlineClear, MdInfoOutline } from "react-icons/md";
import Environment from "./ESGcheckboxes/environment";
import Social from "./ESGcheckboxes/social";
import Governance from "./ESGcheckboxes/governance";
import axiosInstance from "../../../utils/axiosMiddleware";
import { Oval } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import environment from "../../environment/page";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const Reference = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState();
  const [category, setCategory] = useState("");
  const [cardData, setCarddata] = useState({});
  const [envChecked, setEnvChecked] = useState(false);
  const [socChecked, setSocChecked] = useState(false);
  const [govChecked, setGovChecked] = useState(false);
  const [formData, setFormData] = useState([{}]);
  const [dataPresent, setDatapresent] = useState(false);

  const handleChecked = (event) => {
    if (event.target.name == "env") {
      setEnvChecked(event.target.checked);
    } else if (event.target.name == "soc") {
      setSocChecked(event.target.checked);
    } else {
      setGovChecked(event.target.checked);
    }
  };

  const toggleDrawerclose = () => {
    setIsOpen(!isOpen);
  };
  const toggleDrawer = (selected) => {
    setIsOpen(!isOpen);
    setCategory(selected);
  };
  useEffect(() => {
    const newData = GRIData.filter((program) =>
      program.category.includes(category)
    );
    setData(newData);
  }, [category]);

  useEffect(() => {
    const isFirstVisit =
      typeof window !== "undefined"
        ? localStorage.getItem("hasVisitedref")
        : "";
    if (isFirstVisit == "true") {
      setIsModalOpen(true);
      localStorage.setItem("hasVisitedref", "false");
    }
  }, []);

  const id = typeof window !== "undefined" ? localStorage.getItem("id") : "";
  const fetchSelectedTopic = async () => {
    const url = `${process.env.BACKEND_API_URL}/materiality_dashboard/get-material-topics/${id}/`;
    try {
      const response = await axiosInstance.get(url);
      if (response.status == 200 && response.data.length > 0) {
        const groupedData = {
          Environmental: [],
          Social: [],
          Governance: [],
        };

        const categoryMap = {
          environment: "Environmental",
          social: "Social",
          governance: "Governance",
        };

        response.data.forEach((item) => {
          const categoryKey = categoryMap[item.esg_category.toLowerCase()];
          if (categoryKey) {
            groupedData[categoryKey].push(item.id.toString());
          }
        });

        // const arr=Object.values(groupedData).flat();
        setFormData([groupedData]);
        if (groupedData.Environmental.length > 0) {
          setEnvChecked(true);
        }
        if (groupedData.Social.length > 0) {
          setSocChecked(true);
        }
        if (groupedData.Governance.length > 0) {
          setGovChecked(true);
        }
        setDatapresent(true);
      }
      // else{
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
  const fetchDetails = async () => {
    const url = `${process.env.BACKEND_API_URL}/materiality_dashboard/materiality-assessments/${id}/`;
    try {
      const response = await axiosInstance.get(url);
      if (response.status == 200) {
        setCarddata(response.data);
        if (response.data.esg_selected) {
          setEnvChecked(response.data.esg_selected.environmentChecked);
          setSocChecked(response.data.esg_selected.socialChecked);
          setGovChecked(response.data.esg_selected.governanceChecked);
        }
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
  useEffect(() => {
    fetchDetails();
    fetchSelectedTopic();
  }, []);

  const handleSubmit = async (e) => {
    const arr = Object.values(formData[0]).flat();
    e.preventDefault();
    const data = {
      assessment_id: id,
      topics: arr,
      // "esg_selected":{environmentChecked:envChecked,socialChecked:socChecked,governanceChecked:govChecked}
    };
    const url = dataPresent
      ? `${process.env.BACKEND_API_URL}/materiality_dashboard/assessment-topic-selections/${id}/edit/`
      : `${process.env.BACKEND_API_URL}/materiality_dashboard/assessment-topic-selection/`;
    try {
      const response = dataPresent
        ? await axiosInstance.patch(url, data)
        : await axiosInstance.post(url, data);

      if (response.status >= 200 && response.status < 300) {
        const markComplete = {
          status: "completed",
          esg_selected: {
            environmentChecked: envChecked,
            socialChecked: socChecked,
            governanceChecked: govChecked,
          },
        };
        const CompleteUrl = `${process.env.BACKEND_API_URL}/materiality_dashboard/materiality-assessments/${id}/`;
        try {
          const response = await axiosInstance.patch(CompleteUrl, markComplete);

          if (response.status == 200) {
            setIsCompleteModalOpen(true);
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

  const convertDate = (dateStr) => {
    const date = new Date(dateStr);

    return date.toLocaleString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <>
      <div
        className={`${
          isOpen ? "translate-x-[15%] block" : "translate-x-[120%] hidden"
        }
      fixed right-[51px]  w-[340px] h-[93%] bg-white  rounded-md
      transition-transform duration-300 ease-in-out z-[100] shadow-2xl px-2`}
      >
        {data &&
          data.map((program) => (
            <>
              <div className="flex justify-between p-2 pt-5 pb-4 border-b-2 ">
                <div className="ml-2">{program.header}</div>

                <div className="ml-2 float-right">
                  <h5
                    className="text-[#727272] text-[17px] font-bold cursor-pointer"
                    onClick={toggleDrawerclose}
                  >
                    <MdOutlineClear />
                  </h5>
                </div>
              </div>
              <div> {program.data}</div>
            </>
          ))}
      </div>
      <div className="flex flex-col justify-start overflow-x-hidden ">
        <div className="flex justify-between items-center border-b border-gray-200 w-full">
          <div className="w-full">
           <div className="text-left mb-2 ml-3 pt-5">
              <div className="flex justify-between items-center">
                <div className="w-[70%]">
                  <p className="gradient-text text-[22px] font-bold pt-4 pb-4 ml-3">
                    Select Materiality Topic
                  </p>
                </div>
                <div className="w-full float-end px-5 ">
                  <div className="flex float-end border-l">
                    <button
                      className="text-[#007EEF] bg-slate-200 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5"
                      onClick={() => toggleDrawer("1")}
                    >
                      GRI 3-2
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between">
          <div>
            <p className="text-[#344054] text-[22px] font-bold pt-4 pb-2 ml-6">
              ESG Topics
            </p>
            <p className="text-[#2E0B34] text-[14px] font-[400] pb-4 ml-6">
              Select the topics that were chosen as the material topic by the
              organization.
            </p>
          </div>
          <div className="shadow-lg p-3 bg-white w-[40%] mx-5 rounded-lg mt-10">
            <div className="flex  mb-4">
              <div className="w-[50%]">
                <p className="text-[14px] text-black font-[400] px-2 pt-2">
                  Reporting Level
                </p>
                <p className="text-[13px] text-gray-500 font-[400] px-2 pt-2">
                  {cardData.corporate_name ? "Corporate" : "Organization"}
                </p>
              </div>
              <div>
                <p className="text-[14px] text-black font-[400] px-2 pt-2">
                  Materiality Assessment approach
                </p>
                <p className="text-[13px] text-gray-500 font-[400] px-2 pt-2">
                  {cardData.approach}
                </p>
              </div>
            </div>
            <div className="flex  mb-2">
              <div className="w-[50%]">
                <p className="text-[14px] text-black font-[400] px-2 pt-2">
                  Reporting Year
                </p>
                <p className="text-[13px] text-gray-500 font-[400] px-2 pt-2">
                  {`${convertDate(cardData.start_date)} - ${convertDate(
                    cardData.end_date
                  )}`}
                </p>
              </div>
            </div>
            <div className="flex  mb-2">
              <div className="w-[50%]">
                <p className="text-[14px] text-black font-[400] px-2 pt-2">
                  Organization Name
                </p>
                <p className="text-[13px] text-gray-500 font-[400] px-2 pt-2">
                  {cardData.organisation_name}
                </p>
              </div>
              {cardData.corporate_name ? (
                <div>
                  <p className="text-[14px] text-black font-[400] px-2 pt-2">
                    Corporate Entity Name
                  </p>
                  <p className="text-[13px] text-gray-500 font-[400] px-2 pt-2">
                    {cardData.corporate_name}
                  </p>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 mb-3">
        <p className="text-[#344054] text-[17px] font-bold pt-4 pb-2 ml-6">
          Selecting ESG Topics
        </p>
      </div>
      <div className="mx-5">
        <div className="flex justify-between items-start">
          <div className="shadow-lg rounded-lg  w-[32.5%]">
            <div className=" relative gradient-background p-2 rounded-t-lg flex justify-between">
              <p className="text-[##2E0B34] text-[17px] mx-2 pt-2 flex">
                Environmental
                <MdInfoOutline
                  data-tooltip-id={`tooltip-env`}
                  data-tooltip-html={`<p>The environmental component of ESG 
focuses on an organization’s 
interactions with the natural environment,
 including its use of resources, emissions, 
and ecological footprint. It encompasses 
energy consumption, water use, waste generation, 
pollution, climate change mitigation,
 and biodiversity conservation. </p>`}
                  className="ml-3 mt-[3px] w-[15px] flex-shrink-0"
                />
                {/* Tooltip */}
                <ReactTooltip
                  id={`tooltip-env`}
                  place="top"
                  effect="solid"
                  style={{
                    width: "300px",
                    backgroundColor: "#000",
                    color: "white",
                    fontSize: "12px",
                    boxShadow: 3,
                    borderRadius: "8px",
                  }}
                ></ReactTooltip>
              </p>
              <input
                id="env"
                type="checkbox"
                name="env"
                checked={envChecked}
                className="h-3.5 w-3.5 mt-3 mx-2 accent-[#008000]"
                onChange={handleChecked}
              />
            </div>
            <Environment
              envChecked={envChecked}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
          <div className="shadow-lg rounded-lg  w-[32.5%]">
            <div className=" relative gradient-background p-2 rounded-t-lg flex justify-between">
              <p className="text-[##2E0B34] text-[17px] mx-2 pt-2 flex">
                Social
                <MdInfoOutline
                  data-tooltip-id={`tooltip-soc`}
                  data-tooltip-html={`<p>The social aspect of ESG refers to how a company 
manages relationships with employees, 
communities, and other stakeholders. It includes labor 
practices, diversity and inclusion, human rights, 
customer relations, and community engagement. </p>`}
                  className="ml-3 mt-[3px] w-[15px] flex-shrink-0"
                />
                {/* Tooltip */}
                <ReactTooltip
                  id={`tooltip-soc`}
                  place="top"
                  effect="solid"
                  style={{
                    width: "300px",
                    backgroundColor: "#000",
                    color: "white",
                    fontSize: "12px",
                    boxShadow: 3,
                    borderRadius: "8px",
                  }}
                ></ReactTooltip>
              </p>
              <input
                id="soc"
                type="checkbox"
                name="soc"
                className="h-3.5 w-3.5 mt-3 mx-2 accent-[#008000]"
                checked={socChecked}
                onChange={handleChecked}
              />
            </div>
            <Social
              socChecked={socChecked}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
          <div className="shadow-lg rounded-lg  w-[32.5%]">
            <div className="relative gradient-background p-2 rounded-t-lg flex justify-between">
              <p className="text-[##2E0B34] text-[17px] mx-2 pt-2 flex">
                Governance
                <MdInfoOutline
                  data-tooltip-id={`tooltip-gov`}
                  data-tooltip-html={`<p>Governance in ESG deals with the structures and 
processes that guide company 
leadership and decision-making. It includes corporate ethics, 
board diversity, executive compensation, anti-corruption efforts, 
and transparency in reporting. </p>`}
                  className="ml-3 mt-[3px] w-[15px] flex-shrink-0"
                />
                {/* Tooltip */}
                <ReactTooltip
                  id={`tooltip-gov`}
                  place="top"
                  effect="solid"
                  style={{
                    width: "300px",
                    backgroundColor: "#000",
                    color: "white",
                    fontSize: "12px",
                    boxShadow: 3,
                    borderRadius: "8px",
                  }}
                ></ReactTooltip>
              </p>
              <input
                id="gov"
                type="checkbox"
                name="gov"
                className="h-3.5 w-3.5 mt-3 mx-2 accent-[#008000]"
                checked={govChecked}
                onChange={handleChecked}
              />
            </div>
            <Governance
              govChecked={govChecked}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center mb-3 mx-3">
        <button
          className="h-full mr-2  py-2 px-6 bg-[#007EEF] text-white rounded-[8px] shadow cursor-pointer"
          // onClick={()=>{setIsCompleteModalOpen(true)}}
          onClick={handleSubmit}
        >
          Save and Proceed {">"}
        </button>
      </div>
      <ReferencePopup
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <CompletePopup
        isCompleteModalOpen={isCompleteModalOpen}
        setIsCompleteModalOpen={setIsCompleteModalOpen}
      />
    </>
  );
};
export default Reference;
