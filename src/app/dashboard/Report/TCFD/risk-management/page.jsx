"use client";
import {
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
import {
  setIdentificationProcess,
  setAssessmentProcess,
  setManagementProcess,
  setIntegrationIntoOverall,
  selectRiskManagement,
} from "../../../../../lib/redux/features/TCFDSlice/tcfdslice";

// Import sections
import Section1 from "./sections/section1";
import Section2 from "./sections/section2";
import Section3 from "./sections/section3";

const RiskManagement = forwardRef(({ onSubmitSuccess }, ref) => {
  const dispatch = useDispatch();
  const riskManagement = useSelector(selectRiskManagement);
  
  const orgName =
    typeof window !== "undefined" ? localStorage.getItem("reportorgname") : "";
  const reportid =
    typeof window !== "undefined" ? localStorage.getItem("reportid") : "";
  
  const apiCalledRef = useRef(false);
  const [data, setData] = useState("");
  const [loopen, setLoOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("section6_1");

  // Section refs for navigation
  const section6_1Ref = useRef(null);
  const section6_2Ref = useRef(null);
  const section6_3Ref = useRef(null);

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

  const formData = new FormData();
  formData.append('report', reportid);
  formData.append('screen_name', 'risk_management');
  
  const dataPayload = {
    identification_process: {
      page: "risk_management",
      label: "6. Risk Management",
      subLabel: "Risk Identification & Assessment Process",
      type: "textarea",
      content: riskManagement.identificationProcess,
      field: "identification_process",
      isSkipped: false,
    },
    assessment_process: {
      page: "risk_management",
      label: "6.2 Climate Risk Management",
      subLabel: "Assessment Process",
      type: "textarea",
      content: riskManagement.assessmentProcess,
      field: "assessment_process",
      isSkipped: false,
    },
    management_process: {
      page: "risk_management",
      label: "6.2 Climate Risk Management",
      subLabel: "Management Process",
      type: "textarea",
      content: riskManagement.managementProcess,
      field: "management_process",
      isSkipped: false,
    },
    integration_into_overall: {
      page: "risk_management",
      label: "6.3 Integration with Overall Risk Management",
      subLabel: "Integration Process",
      type: "textarea",
      content: riskManagement.integrationIntoOverall,
      field: "integration_into_overall",
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

    if (response.status === 200) {
      if (type === "next") {
        toast.success("Data added successfully", {
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
  dispatch(setIdentificationProcess(""));
  dispatch(setAssessmentProcess(""));
  dispatch(setManagementProcess(""));
  dispatch(setIntegrationIntoOverall(""));
  
  const url = `${process.env.BACKEND_API_URL}/tcfd_framework/report/get-tcfd-report-data/${reportid}/risk_management/`;
  try {
    const response = await axiosInstance.get(url);
    
    if (response.data && response.data.data) {
      console.log("response.data", response.data);
      console.log("response.data.data", response.data.data);
      console.log("response.data.data.report_data", response.data.data.report_data);
      
      setData(response.data.data.report_data);
      dispatch(setIdentificationProcess(response.data.data.report_data.identification_process?.content || ""));
      dispatch(setAssessmentProcess(response.data.data.report_data.assessment_process?.content || ""));
      dispatch(setManagementProcess(response.data.data.report_data.management_process?.content || ""));
      dispatch(setIntegrationIntoOverall(response.data.data.report_data.integration_into_overall?.content || ""));
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

  const scrollToSection = (sectionRef, sectionId) => {
    setActiveSection(sectionId);

    const elementTop =
      sectionRef.current?.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: elementTop - 100,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="mx-2 p-2">
        <h3 className="text-[22px] text-[#344054] mb-4 text-left font-semibold">
          6. Risk Management
        </h3>
        <div className="flex gap-4">
          <div className="xl:w-[80%] md:w-[75%] lg:w-[80%] 2k:w-[80%] 4k:w-[80%] 2xl:w-[80%] w-full">
            <Section1
              section6_1Ref={section6_1Ref}
              data={data}
              orgName={orgName}
            />
            <Section2
              section6_2Ref={section6_2Ref}
              data={data}
              orgName={orgName}
            />
            <Section3
              section6_3Ref={section6_3Ref}
              data={data}
              orgName={orgName}
            />
          </div>

          {/* Page sidebar */}
          {/* <div className="p-4 border border-r-2 border-b-2 shadow-lg rounded-lg h-[500px] top-20 sticky mt-2 w-[20%] md:w-[25%] lg:w-[20%] xl:sticky xl:top-36 lg:sticky lg:top-36 md:fixed md:top-[19rem] md:right-4 hidden xl:block md:block lg:block 2k:block 4k:block 2xl:block">
            <p className="text-[11px] text-[#727272] mb-2 uppercase">
              6. Risk Management
            </p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section6_1" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section6_1Ref, "section6_1")}
            >
              6.1 Risk Identification & Assessment Process
            </p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section6_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section6_2Ref, "section6_2")}
            >
              6.2 Climate Risk Management
            </p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section6_3" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section6_3Ref, "section6_3")}
            >
              6.3 Integration with Overall Risk Management
            </p>
          </div> */}
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

RiskManagement.displayName = "RiskManagement";

export default RiskManagement;