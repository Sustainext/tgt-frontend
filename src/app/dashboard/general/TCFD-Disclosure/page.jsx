"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineCheck, MdInfoOutline } from "react-icons/md";
import { HiArrowRight, HiExclamationCircle } from "react-icons/hi";
import ReportingInfo from "./reporting-info/page";
import Disclosureselection from "./disclosure-selection/page";
import Fillterorgcorp from "../../../fillter/fillter-org-corp";
import ToastMessage from "../../../shared/components/Toast";
import axiosInstance from "../../../utils/axiosMiddleware";
import { Oval } from "react-loader-spinner";
import Cookies from "js-cookie";
const TCFD = ({ setMobileopen }) => {
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedCorp, setSelectedCorp] = useState("");
  const [latestDisclosures, setLatestDisclosures] = useState([]);
  const [view, setView] = useState("home");
  const [loopen, setLoOpen] = useState(false);
  const [toastQueue, setToastQueue] = useState([]);
  const [togglestatus, setToggleStatus] = useState("Organization");

  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };
    useEffect(() => {
        if (view === "home") {
     fetchLatestDisclosures();
   
  }
   
  }, [view]);

const fetchLatestDisclosures = async () => {
  LoaderOpen();
  try {
    const response = await axiosInstance.get(
      `${process.env.BACKEND_API_URL}/tcfd_framework/get-latest-selected-disclosures/`
    );

    if (response.data?.data) {
      const { framework_data, selected_disclosures } = response.data.data;

      // Try to find TCFD framework
      let selectedFramework = framework_data.find((f) =>
        f.name.toLowerCase().includes("tcfd")
      );

      // If TCFD not found, use the first available framework
      if (!selectedFramework && framework_data.length > 0) {
        selectedFramework = framework_data[0];
        console.warn("⚠️ TCFD not found. Defaulting to first framework:", selectedFramework.name);
      }

      // Set framework cookie
      if (selectedFramework?.id) {
        Cookies.set("selected_framework_id", selectedFramework.id, { expires: 7 });
        console.log("✅ Selected framework set in cookie:", selectedFramework);
      }

      // Set disclosures cookie
      Cookies.set("selected_disclosures", JSON.stringify(selected_disclosures), {
        expires: 7,
      });
   Cookies.set("tcfd_sector", JSON.stringify(response.data.data.tcfd_reporting_information_sector), {
        expires: 7,
      });
      setLatestDisclosures(response.data.data);
    }
  } catch (error) {
    console.error("Error fetching latest disclosures:", error);
  } finally {
    LoaderClose();
  }
};
  const [tcfdStatus, setTcfdStatus] = useState({
    tcfd_reporting_info_status: false,
    tcfd_selected_disclosure_status: false,
  });



  const isReportEnabled =
    selectedOrg?.trim() !== "" &&
    tcfdStatus.tcfd_reporting_info_status === true;

  const showToast = (header, body, gradient, duration = 3000) => {
    const id = Date.now();
    setToastQueue((prev) => [...prev, { id, header, body, gradient }]);

    setTimeout(() => {
      setToastQueue((prev) => prev.filter((toast) => toast.id !== id));
    }, duration);
  };

  useEffect(() => {
  if (view === "home") {
    fetchTcfdStatus();

  }
  }, [selectedOrg,view]);

      const fetchTcfdStatus = async () => {
      if (!selectedOrg) {
        setTcfdStatus({
          tcfd_reporting_info_status: false,
          tcfd_selected_disclosure_status: false,
        });
        return;
      }
      LoaderOpen();
      try {
        const response = await axiosInstance.get(
          `${process.env.BACKEND_API_URL}/tcfd_framework/tcfd-reporting-information-completion/?organization=${selectedOrg}`
        );

        setTcfdStatus({
          tcfd_reporting_info_status:
            response.data.tcfd_reporting_info_status || false,
          tcfd_selected_disclosure_status:
            response.data.tcfd_selected_disclosure_status || false,
        });
        LoaderClose();
      } catch (error) {
        console.error("Error fetching TCFD status:", error);
        setTcfdStatus({
          tcfd_reporting_info_status: false,
          tcfd_selected_disclosure_status: false,
        });
        LoaderClose();
      }
    };

  return (
    <>
      {view === "home" && (
        <>
          <div className="flex flex-col justify-start overflow-x-hidden">
            <div className="flex justify-between items-center border-b border-gray-200 mb-5 w-full">
              <div className="w-full">
                <div className="text-left mb-2 ml-3 pt-5">
                  <p className="text-[11px]">General</p>
                  <p className="gradient-text text-[22px] font-bold h-[28px] pt-1">
                    Task Force on Climate-related Financial Disclosures
                  </p>
                </div>
              </div>
            </div>

            <div className="ml-3 flex relative">
              <h6 className="text-[17px] mb-4 font-semibold flex">
                TCFD Disclosure Selection
              </h6>
            </div>
          </div>

          <Fillterorgcorp
            selectedOrg={selectedOrg}
            setSelectedOrg={setSelectedOrg}
            selectedCorp={selectedCorp}
            setSelectedCorp={setSelectedCorp}
            setToggleStatus={setToggleStatus}
          />

          {/* Info Box */}
          <div className="bg-sky-100 mx-2 rounded-md mb-4">
            <div className="flex px-4 py-3">
              <MdInfoOutline className="text-blue-500" />
              <p className="text-[13px] text-[#101828] ml-4">
                The TCFD reporting information is mandatory and has to be
                completed before selecting the TCFD disclosures
              </p>
            </div>
          </div>

          {/* Step Boxes */}
          <div className="flex mx-4 gap-6 mt-10 mb-4 ">
            {/* Step 1: Reporting Info */}
            <div className="bils201box rounded-2xl p-6 w-full xl:w-[450px] shadow-lg mb-4">
              <div className="h-[128px]">
                <div className="flex justify-between mb-2">
                  <div className="border rounded-full w-5 h-5 text-center text-[13px]">
                    1
                  </div>
                </div>
                <div className="mb-2">
                  <p className="text-[16px] font-medium">
                    TCFD Reporting Information
                  </p>
                  <p className="text-[14px] font-medium mb-2">
                    Please select the sectors and financial year details
                  </p>
                </div>
                <div className="my-4 pb-8">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                      tcfdStatus.tcfd_reporting_info_status
                        ? "bg-green-100 text-green-800"
                        : "bg-orange-100 text-[#F98845]"
                    }`}
                  >
                    {tcfdStatus.tcfd_reporting_info_status ? (
                      <MdOutlineCheck className="w-4 h-4 mr-1" />
                    ) : (
                      <HiExclamationCircle className="w-4 h-4 mr-1" />
                    )}
                    {tcfdStatus.tcfd_reporting_info_status
                      ? "Completed"
                      : "Incomplete"}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setView("tcfd-reporting-info")}
                disabled={!selectedOrg}
                className={`w-[220px] inline-flex items-center px-4 py-2 mt-2 border text-[12px] font-medium rounded-md text-white ${
                  selectedOrg
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-200 cursor-not-allowed"
                }`}
              >
                {tcfdStatus.tcfd_reporting_info_status ? "Edit" : "Add"}{" "}
                Reporting Information
                <HiArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>

            {/* Step 2: Disclosure Selection */}
            <div className="bils201box rounded-2xl p-6 w-full xl:w-[450px] shadow-lg mb-4">
              <div className="h-[128px]">
                <div className="flex justify-between mb-2">
                  <div className="border rounded-full w-5 h-5 text-center text-[13px]">
                    2
                  </div>
                </div>
                <div className="mb-2">
                  <p className="text-[16px] font-medium">
                    Select TCFD Disclosures
                  </p>
                  <p className="text-[14px] font-medium mb-2">
                    Select the disclosures which are material to the
                    organization.
                  </p>
                </div>
                <div className="my-4 pb-8">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                      tcfdStatus.tcfd_selected_disclosure_status
                        ? "bg-green-100 text-green-800"
                        : "bg-orange-100 text-[#F98845]"
                    }`}
                  >
                    {tcfdStatus.tcfd_selected_disclosure_status ? (
                      <MdOutlineCheck className="w-4 h-4 mr-1" />
                    ) : (
                      <HiExclamationCircle className="w-4 h-4 mr-1" />
                    )}
                    {tcfdStatus.tcfd_selected_disclosure_status
                      ? "Completed"
                      : "Incomplete"}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setView("tcfd-disclosure-selection")}
                disabled={!isReportEnabled}
                className={`w-[210px] inline-flex items-center px-4 py-2 mt-2 border text-[12px] font-medium rounded-md text-white ${
                  isReportEnabled
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-200 cursor-not-allowed"
                }`}
              >
                {tcfdStatus.tcfd_selected_disclosure_status ? "Edit" : ""}{" "}
                Selected Disclosures
                <HiArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="w-full text-center py-10 px-4 mb-10">
            <div className="mb-4">
              <img
                src="/undraw.svg"
                alt="No Data"
                className="w-[150px] h-[150px] mx-auto"
              />
            </div>
            <h4 className="text-[24px] font-semibold text-[#101828] mb-2">
              No data available to show TCFD screen pathway
            </h4>
            <p className="text-[16px] text-gray-600 px-4 mx-4">
              One or more scenarios are needed for analysis. Select scenarios
              from the above dropdown to start comparison.
            </p>
          </div>
        </>
      )}

      {view === "tcfd-reporting-info" && (
        <ReportingInfo showToast={showToast} setView={setView} fetchTcfdStatus={fetchTcfdStatus} />
      )}
      {view === "tcfd-disclosure-selection" && (
        <Disclosureselection
          showToast={showToast}
        setView={setView}
        fetchTcfdStatus={fetchTcfdStatus}
        />
      )}

   <div className="fixed top-36 lg:top-20 xl:top-20 2xl:top-20 2k:top-20 4k:top-20 right-4 z-[9999] space-y-3">
        {toastQueue.map((toast) => (
          <ToastMessage
            key={toast.id}
            message={{ header: toast.header, body: toast.body }}
            gradient={toast.gradient}
            onClose={() =>
              setToastQueue((prev) => prev.filter((t) => t.id !== toast.id))
            }
          />
        ))}
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
};

export default TCFD;
