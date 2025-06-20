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
  setClimateMetrics,
  setScope1Emissions,
  setScope2Emissions,
  setScope3Emissions,
  setClimateTargets,
  selectMetricsTargets,
} from "../../../../../lib/redux/features/TCFDSlice/tcfdslice";

// Import sections
import Section1 from "./sections/section1";
import Section2 from "./sections/section2";
import Section3 from "./sections/section3";

const MetricsTargets = forwardRef(({ onSubmitSuccess }, ref) => {
  const dispatch = useDispatch();
  const metricsTargets = useSelector(selectMetricsTargets);
  
  const orgName =
    typeof window !== "undefined" ? localStorage.getItem("reportorgname") : "";
  const reportid =
    typeof window !== "undefined" ? localStorage.getItem("reportid") : "";
  
  const apiCalledRef = useRef(false);
  const [data, setData] = useState("");
  const [loopen, setLoOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("section7_1");

  // Section refs for navigation
  const section7_1Ref = useRef(null);
  const section7_2Ref = useRef(null);
  const section7_3Ref = useRef(null);
  const section7_4Ref = useRef(null);

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
  formData.append('screen_name', 'metrics_targets');
  
  const dataPayload = {
    climate_metrics: {
      page: "metrics_targets",
      label: "7. Metrics and Targets",
      subLabel: "Climate-Related Metrics",
      type: "textarea",
      content: metricsTargets.climateMetrics,
      field: "climate_metrics",
      isSkipped: false,
    },
    scope1_emissions: {
      page: "metrics_targets",
      label: "7.2 Scope 1 Emissions",
      subLabel: "Scope 1 GHG Emissions",
      type: "textarea",
      content: metricsTargets.scope1Emissions,
      field: "scope1_emissions",
      isSkipped: false,
    },
    scope2_emissions: {
      page: "metrics_targets",
      label: "7.3 Scope 2 Emissions",
      subLabel: "Scope 2 GHG Emissions",
      type: "textarea",
      content: metricsTargets.scope2Emissions,
      field: "scope2_emissions",
      isSkipped: false,
    },
    scope3_emissions: {
      page: "metrics_targets",
      label: "7.4 Scope 3 Emissions",
      subLabel: "Scope 3 GHG Emissions",
      type: "textarea",
      content: metricsTargets.scope3Emissions,
      field: "scope3_emissions",
      isSkipped: false,
    },
    climate_targets: {
      page: "metrics_targets",
      label: "7.5 Targets and Performance",
      subLabel: "Climate Targets",
      type: "textarea",
      content: metricsTargets.climateTargets,
      field: "climate_targets",
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
  dispatch(setClimateMetrics(""));
  dispatch(setScope1Emissions(""));
  dispatch(setScope2Emissions(""));
  dispatch(setScope3Emissions(""));
  dispatch(setClimateTargets(""));
  
  const url = `${process.env.BACKEND_API_URL}/tcfd_framework/report/get-tcfd-report-data/${reportid}/metrics_targets/`;
  try {
    const response = await axiosInstance.get(url);
    
    if (response.data && response.data.data) {
      console.log("response.data", response.data);
      console.log("response.data.data", response.data.data);
      console.log("response.data.data.report_data", response.data.data.report_data);
      
      setData(response.data.data.report_data);
      dispatch(setClimateMetrics(response.data.data.report_data.climate_metrics?.content || ""));
      dispatch(setScope1Emissions(response.data.data.report_data.scope1_emissions?.content || ""));
      dispatch(setScope2Emissions(response.data.data.report_data.scope2_emissions?.content || ""));
      dispatch(setScope3Emissions(response.data.data.report_data.scope3_emissions?.content || ""));
      dispatch(setClimateTargets(response.data.data.report_data.climate_targets?.content || ""));
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
          7. Metrics and Targets
        </h3>
        <div className="flex gap-4">
          <div className="xl:w-[80%] md:w-[75%] lg:w-[80%] 2k:w-[80%] 4k:w-[80%] 2xl:w-[80%] w-full">
            <Section1
              section7_1Ref={section7_1Ref}
              data={data}
              orgName={orgName}
            />
            <Section2
              section7_2Ref={section7_2Ref}
              data={data}
              orgName={orgName}
            />
            <Section3
              section7_3Ref={section7_3Ref}
              data={data}
              orgName={orgName}
            />
          </div>

          {/* Page sidebar */}
          {/* <div className="p-4 border border-r-2 border-b-2 shadow-lg rounded-lg h-[600px] top-20 sticky mt-2 w-[20%] md:w-[25%] lg:w-[20%] xl:sticky xl:top-36 lg:sticky lg:top-36 md:fixed md:top-[19rem] md:right-4 hidden xl:block md:block lg:block 2k:block 4k:block 2xl:block">
            <p className="text-[11px] text-[#727272] mb-2 uppercase">
              7. Metrics and Targets
            </p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section7_1" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section7_1Ref, "section7_1")}
            >
              7.1 Climate-Related Metrics
            </p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section7_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section7_2Ref, "section7_2")}
            >
              7.2 Scope 1 Emissions
            </p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section7_3" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section7_3Ref, "section7_3")}
            >
              7.3 Scope 2 Emissions
            </p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section7_4" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section7_4Ref, "section7_4")}
            >
              7.4 Scope 3 Emissions & Targets
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

MetricsTargets.displayName = "MetricsTargets";

export default MetricsTargets;