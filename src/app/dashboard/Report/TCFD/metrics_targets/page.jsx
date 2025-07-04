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
  setMetricsDescription,          // Add this
  setMainContentEmissions,        // Add this
  setScope1Emissions,
  setScope2Emissions,
  setScope3Emissions,
  setGhgIntensity,               // Add this
  setGhgByScope,                 // Add this
  setGhgBySource,                // Add this
  setGhgByBusiness,              // Add this
  setGhgByLocation,              // Add this
  setClimateTargets,
  setClosingRemarks,             // Add this
  setSectorInfo,                 // Add this
  setSectorInfo2,
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
  const [data, setData] = useState({});
  const [tcfdCollectData, setTcfdCollectData] = useState({});
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
    formData.append("report", reportid);
    formData.append("screen_name", "metrics_targets");

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
      metrics_description: {
        page: "metrics_targets",
        label: "7.1 Metrics Description",
        subLabel: "Metrics Assessment Description",
        type: "textarea",
        content: metricsTargets.metricsDescription,
        field: "metrics_description",
        isSkipped: false,
      },
      main_content_emissions: {
        page: "metrics_targets",
        label: "7.2 GHG Emissions",
        subLabel: "GHG Emissions Strategy",
        type: "textarea",
        content: metricsTargets.mainContentEmissions,
        field: "main_content_emissions",
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
      ghg_intensity: {
        page: "metrics_targets",
        label: "7.2 GHG Emissions Intensity",
        subLabel: "GHG Emission Intensity",
        type: "textarea",
        content: metricsTargets.ghgIntensity,
        field: "ghg_intensity",
        isSkipped: false,
      },
      ghg_by_scope: {
        page: "metrics_targets",
        label: "7.2 GHG By Scope",
        subLabel: "GHG Emissions by Scope",
        type: "textarea",
        content: metricsTargets.ghgByScope,
        field: "ghg_by_scope",
        isSkipped: false,
      },
      ghg_by_source: {
        page: "metrics_targets",
        label: "7.2 GHG By Source",
        subLabel: "GHG Emissions by Source",
        type: "textarea",
        content: metricsTargets.ghgBySource,
        field: "ghg_by_source",
        isSkipped: false,
      },
      ghg_by_business: {
        page: "metrics_targets",
        label: "7.2 GHG By Business",
        subLabel: "GHG Emissions by Business",
        type: "textarea",
        content: metricsTargets.ghgByBusiness,
        field: "ghg_by_business",
        isSkipped: false,
      },
      ghg_by_location: {
        page: "metrics_targets",
        label: "7.2 GHG By Location",
        subLabel: "GHG Emissions by Location",
        type: "textarea",
        content: metricsTargets.ghgByLocation,
        field: "ghg_by_location",
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
      closing_remarks: {
        page: "metrics_targets",
        label: "7.5 Closing Remarks",
        subLabel: "Closing Remarks",
        type: "textarea",
        content: metricsTargets.closingRemarks,
        field: "closing_remarks",
        isSkipped: false,
      },
      sector_info: {
        page: "metrics_targets",
        label: "7.1 Sector Information",
        subLabel: "Sector-Specific Information",
        type: "textarea",
        content: metricsTargets.sectorInfo,
        field: "sector_info",
        isSkipped: false,
      },
     sector_info2: {
      page: "metrics_targets",
      label: "7.2 Sector-Specific Information",
      subLabel: "Add sector-specific information",
      type: "textarea", 
      content: metricsTargets.sectorInfo2,
      field: "sector_info_2",
      isSkipped: false,
    },
    };

    formData.append("data", JSON.stringify(dataPayload));

    const url = `${process.env.BACKEND_API_URL}/tcfd_framework/report/upsert-tcfd-report/`;

    try {
      const response = await axiosInstance.put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
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
  
  // Reset all Redux state to empty strings
  dispatch(setClimateMetrics(""));
  dispatch(setMetricsDescription(""));
  dispatch(setMainContentEmissions(""));
  dispatch(setScope1Emissions(""));
  dispatch(setScope2Emissions(""));
  dispatch(setScope3Emissions(""));
  dispatch(setGhgIntensity(""));
  dispatch(setGhgByScope(""));
  dispatch(setGhgBySource(""));
  dispatch(setGhgByBusiness(""));
  dispatch(setGhgByLocation(""));
  dispatch(setClimateTargets(""));
  dispatch(setClosingRemarks(""));
  dispatch(setSectorInfo(""));
  dispatch(setSectorInfo2(""));

  const url = `${process.env.BACKEND_API_URL}/tcfd_framework/report/get-tcfd-report-data/${reportid}/metrics_targets/`;
  try {
    const response = await axiosInstance.get(url);

    if (response.data && response.data.data) {
      console.log("Metrics & Targets response.data", response.data);

      // Handle both report_data and tcfd_collect_data
      const reportData = response.data.data.report_data || {};
      const tcfdData = response.data.data.tcfd_collect_data || {};

      setData(reportData);
      setTcfdCollectData(tcfdData);

      // Set ALL Redux state from report_data if available
      dispatch(setClimateMetrics(reportData?.climate_metrics?.content || ""));
      dispatch(setMetricsDescription(reportData?.metrics_description?.content || ""));
      dispatch(setMainContentEmissions(reportData?.main_content_emissions?.content || ""));
      dispatch(setScope1Emissions(reportData?.scope1_emissions?.content || ""));
      dispatch(setScope2Emissions(reportData?.scope2_emissions?.content || ""));
      dispatch(setScope3Emissions(reportData?.scope3_emissions?.content || ""));
      dispatch(setGhgIntensity(reportData?.ghg_intensity?.content || ""));
      dispatch(setGhgByScope(reportData?.ghg_by_scope?.content || ""));
      dispatch(setGhgBySource(reportData?.ghg_by_source?.content || ""));
      dispatch(setGhgByBusiness(reportData?.ghg_by_business?.content || ""));
      dispatch(setGhgByLocation(reportData?.ghg_by_location?.content || ""));
      dispatch(setClimateTargets(reportData?.climate_targets?.content || ""));
      dispatch(setClosingRemarks(reportData?.closing_remarks?.content || ""));
      dispatch(setSectorInfo(reportData?.sector_info?.content || ""));
      dispatch(setSectorInfo2(reportData?.sector_info2?.content || ""));

      console.log("Metrics & Targets TCFD Collect Data:", tcfdData);
      console.log("Loaded Redux State:", {
        climateMetrics: reportData?.climate_metrics?.content || "",
        metricsDescription: reportData?.metrics_description?.content || "",
        mainContentEmissions: reportData?.main_content_emissions?.content || "",
        scope1Emissions: reportData?.scope1_emissions?.content || "",
        scope2Emissions: reportData?.scope2_emissions?.content || "",
        scope3Emissions: reportData?.scope3_emissions?.content || "",
        ghgIntensity: reportData?.ghg_intensity?.content || "",
        ghgByScope: reportData?.ghg_by_scope?.content || "",
        ghgBySource: reportData?.ghg_by_source?.content || "",
        ghgByBusiness: reportData?.ghg_by_business?.content || "",
        ghgByLocation: reportData?.ghg_by_location?.content || "",
        climateTargets: reportData?.climate_targets?.content || "",
        closingRemarks: reportData?.closing_remarks?.content || "",
        sectorInfo: reportData?.sector_info?.content || "",
      });
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
          7. Metrics and Targets
        </h3>
        <div className="flex gap-4">
          <div className="xl:w-[80%] md:w-[75%] lg:w-[80%] 2k:w-[80%] 4k:w-[80%] 2xl:w-[80%] w-full">
            <Section1
              section7_1Ref={section7_1Ref}
              data={data}
              tcfdCollectData={tcfdCollectData}
              orgName={orgName}
            />
            <Section2
              section7_2Ref={section7_2Ref}
              data={data}
              tcfdCollectData={tcfdCollectData}
              orgName={orgName}
            />
            <Section3
              section7_3Ref={section7_3Ref}
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

MetricsTargets.displayName = "MetricsTargets";

export default MetricsTargets;
