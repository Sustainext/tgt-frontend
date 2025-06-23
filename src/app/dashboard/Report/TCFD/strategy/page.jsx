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
  setClimateRisksOpportunities,
  setImpactOnBusiness,
  setResilienceOfStrategy,
  setScenarioAnalysis,
  selectStrategy,
} from "../../../../../lib/redux/features/TCFDSlice/tcfdslice";

// Import sections
import Section1 from "./sections/section1";
import Section2 from "./sections/section2";
import Section3 from "./sections/section3";

const Strategy = forwardRef(({ onSubmitSuccess }, ref) => {
  const dispatch = useDispatch();
  const strategy = useSelector(selectStrategy);
  
  const orgName =
    typeof window !== "undefined" ? localStorage.getItem("reportorgname") : "";
  const reportid =
    typeof window !== "undefined" ? localStorage.getItem("reportid") : "";
  
  const apiCalledRef = useRef(false);
  const [data, setData] = useState({});
  const [tcfdCollectData, setTcfdCollectData] = useState({});
  const [loopen, setLoOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("section5_1");

  // Section refs for navigation
  const section5_1Ref = useRef(null);
  const section5_2Ref = useRef(null);
  const section5_3Ref = useRef(null);

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
  formData.append('screen_name', 'strategy');
  
  const dataPayload = {
    climate_risks_opportunities: {
      page: "strategy",
      label: "5. Strategy",
      subLabel: "Climate-Related Risks and Opportunities Assessment",
      type: "textarea",
      content: strategy.climateRisksOpportunities,
      field: "climate_risks_opportunities",
      isSkipped: false,
    },
    impact_on_business: {
      page: "strategy",
      label: "5.1 Climate-Related Risks and Opportunities Assessment", 
      subLabel: "Company's approach for identification",
      type: "textarea",
      content: strategy.impactOnBusiness,
      field: "impact_on_business",
      isSkipped: false,
    },
    resilience_of_strategy: {
      page: "strategy",
      label: "5.3 Scenario Analysis & Strategic Resilience",
      subLabel: "Strategic Resilience",
      type: "textarea",
      content: strategy.resilienceOfStrategy,
      field: "resilience_of_strategy",
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
  dispatch(setClimateRisksOpportunities(""));
  dispatch(setImpactOnBusiness(""));
  dispatch(setResilienceOfStrategy(""));
  
  const url = `${process.env.BACKEND_API_URL}/tcfd_framework/report/get-tcfd-report-data/${reportid}/strategy/`;
  try {
    const response = await axiosInstance.get(url);
    
    if (response.data && response.data.data) {
      console.log("Strategy response.data", response.data);
      
      // Handle both report_data and tcfd_collect_data
      const reportData = response.data.data.report_data || {};
      const tcfdData = response.data.data.tcfd_collect_data || {};
      
      setData(reportData);
      setTcfdCollectData(tcfdData);
      
      // Set Redux state from report_data if available
      dispatch(setClimateRisksOpportunities(reportData?.climate_risks_opportunities?.content || ""));
      dispatch(setImpactOnBusiness(reportData?.impact_on_business?.content || ""));
      dispatch(setResilienceOfStrategy(reportData?.resilience_of_strategy?.content || ""));
      
      console.log("Strategy TCFD Collect Data:", tcfdData);
    } else {
      setData({});
      setTcfdCollectData({});
    }
    LoaderClose();
  } catch (error) {
    console.error("API call failed:", error);
    setData({});
    setTcfdCollectData({});
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
          5. Strategy
        </h3>
        <div className="flex gap-4">
          <div className="xl:w-[80%] md:w-[75%] lg:w-[80%] 2k:w-[80%] 4k:w-[80%] 2xl:w-[80%] w-full">
            <Section1
              section5_1Ref={section5_1Ref}
              data={data}
              tcfdCollectData={tcfdCollectData}
              orgName={orgName}
            />
            <Section2
              section5_2Ref={section5_2Ref}
              data={data}
              tcfdCollectData={tcfdCollectData}
              orgName={orgName}
            />
            <Section3
              section5_3Ref={section5_3Ref}
              data={data}
              tcfdCollectData={tcfdCollectData}
              orgName={orgName}
            />
          </div>
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

Strategy.displayName = "Strategy";

export default Strategy;