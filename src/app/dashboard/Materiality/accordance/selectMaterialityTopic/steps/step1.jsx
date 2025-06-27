"use client";
import React, { useState, useEffect } from "react";
import Enviroment from "../../ESGchecboxes/environment";
import Social from "../../ESGchecboxes/social";
import Governance from "../../ESGchecboxes/governance";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../../../../utils/axiosMiddleware";
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import AccordionItem from "./AccordionItem";
const Step1 = ({ handleNext, esgSeleted }) => {
  const router = useRouter();
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

  useEffect(() => {
    fetchSelectedTopic();
    if (esgSeleted) {
      setEnvChecked(esgSeleted.environmentChecked);
      setSocChecked(esgSeleted.socialChecked);
      setGovChecked(esgSeleted.governanceChecked);
    }
  }, [esgSeleted]);

  const handleSubmit = async (e) => {
    const arr = Object.values(formData[0]).flat();
    e.preventDefault();
    const data = {
      assessment_id: id,
      topics: arr,
    };
    const url = dataPresent
      ? `${process.env.BACKEND_API_URL}/materiality_dashboard/assessment-topic-selections/${id}/edit/`
      : `${process.env.BACKEND_API_URL}/materiality_dashboard/assessment-topic-selection/`;
    try {
      const response = dataPresent
        ? await axiosInstance.patch(url, data)
        : await axiosInstance.post(url, data);

      if (response.status >= 200 && response.status < 300) {
        const esg_selected_data = {
          esg_selected: {
            environmentChecked: envChecked,
            socialChecked: socChecked,
            governanceChecked: govChecked,
          },
        };

        const esg_selected_url = `${process.env.BACKEND_API_URL}/materiality_dashboard/materiality-assessments/${id}/`;
        try {
          const response = await axiosInstance.patch(
            esg_selected_url,
            esg_selected_data
          );
          if (response.status == 200) {
            handleNext();
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
  return (
    <>
      <div className="mt-3 mb-3">
        <p className="text-[#344054] text-[17px] font-bold pt-4 ml-6">
          Selecting ESG Topics
        </p>
        <p className="text-[#2E0B34] text-[14px]  pt-2 pb-2 ml-6">
          Select the check box in the headings of the ESG topics if that
          particular topic is a material topic.
        </p>
      </div>

      {/* checkbox */}
      <div className="mx-5 hidden xl:block md:hidden lg:block 4k:block 2k:block 2xl:block">
        <div className="flex justify-between items-start">
          <div className="shadow-lg rounded-lg  w-[32.5%]">
            <div className="relative gradient-background p-2 rounded-t-lg flex justify-between">
              <p className="text-[#2E0B34] text-[17px] mx-2 pt-2 flex">
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
                className="h-3.5 w-3.5 mt-3 mx-2 green-checkbox"
                onChange={handleChecked}
              />
            </div>
            <Enviroment
              envChecked={envChecked}
              formData={formData}
              setFormData={setFormData}
            />
          </div>

          <div className="shadow-lg rounded-lg  w-[32.5%]">
            <div className="relative gradient-background p-2 rounded-t-lg flex justify-between">
              <p className="text-[#2E0B34] text-[17px] mx-2 pt-2 flex">
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
                checked={socChecked}
                className="h-3.5 w-3.5 mt-3 mx-2 green-checkbox" //green-checkbox appearance-none checked:bg-green-500 checked:border-green-500 border border-gray-500 rounded-[3px] relative bg-white
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
              <p className="text-[#2E0B34] text-[17px] mx-2 pt-2 flex">
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
                checked={govChecked}
                className="h-3.5 w-3.5 mt-3 mx-2 green-checkbox"
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
{/* mobile and tablet version */}
      <div className="block xl:hidden md:block lg:hidden 4k:hidden 2k:hidden 2xl:hidden">
        <AccordionItem
          title="Environmental"
          tooltipId="tooltip-env"
          tooltipContent={`<p>The environmental component of ESG 
focuses on an organization’s 
interactions with the natural environment,
 including its use of resources, emissions, 
and ecological footprint. It encompasses 
energy consumption, water use, waste generation, 
pollution, climate change mitigation,
 and biodiversity conservation. </p>`}
          checked={envChecked}
          onCheck={handleChecked}
          name="env"
          id="env"
        >
          <Enviroment
            envChecked={envChecked}
            formData={formData}
            setFormData={setFormData}
          />
        </AccordionItem>

        <AccordionItem
          title="Social"
          tooltipId="tooltip-soc"
          tooltipContent={`<p>The social aspect of ESG refers to how a company 
manages relationships with employees, 
communities, and other stakeholders. It includes labor 
practices, diversity and inclusion, human rights, 
customer relations, and community engagement. </p>`}
          checked={socChecked}
          onCheck={handleChecked}
          name="soc"
          id="soc"
        >
          <Social
            socChecked={socChecked}
            formData={formData}
            setFormData={setFormData}
          />
        </AccordionItem>

        <AccordionItem
          title="Governance"
          tooltipId="tooltip-gov"
          tooltipContent={`<p>Governance in ESG deals with the structures and 
processes that guide company 
leadership and decision-making. It includes corporate ethics, 
board diversity, executive compensation, anti-corruption efforts, 
and transparency in reporting. </p>`}
          checked={govChecked}
          onCheck={handleChecked}
          name="gov"
          id="gov"
        >
          <Governance
            govChecked={govChecked}
            formData={formData}
            setFormData={setFormData}
          />
        </AccordionItem>
      </div>

      {/* buttons */}
      <div className="flex justify-end w-full gap-4 mt-4 mb-2">
        <button
          className="w-auto h-full mr-2 py-2 px-3 text-[#727272]  cursor-pointer"
          onClick={() => {
            router.push("/dashboard/Materiality");
          }}
        >
          {"<"} Back to Dashboard
        </button>
        <button
          className="w-[16%] h-full mr-4 py-2 px-2 bg-[#007EEF] text-white rounded-[8px] shadow cursor-pointer"
          onClick={handleSubmit}
        >
          Next {">"}
        </button>
      </div>
    </>
  );
};

export default Step1;
