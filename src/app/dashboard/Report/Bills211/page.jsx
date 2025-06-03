"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { setHeadertext1, setHeadertext2, setHeaderdisplay } from "../../../../lib/redux/features/topheaderSlice";
import { setReportid } from "../../../../lib/redux/features/Billsreport/Billscreen1Slice";
import Bills211Sidebar from "./sidebar";
import Aboutthereport from "./about-the-report/page";
import Organizationprofilestructure from "./organization-profile-structure/page";
import Businessactivities from "./business-activities/page";
import Supplychains from "./supply-chains/page";
import Policiesdiligence from "./policies-diligence-processes/page";
import Risksforcedchildlabour from "./risks-forced-child-labour/page";
import Reduceforcedchildlabour from "./reduce-forced-child-labour/page";
import Remediationmeasures from "./remediation-measures/page";
import Remediationlossincome from "./remediation-loss-income/page";
import Trainingforcedchildlabour from "./training-forced-child-labour/page";
import Assessingeffectiveness from "./assessing-effectiveness/page";
import Attestation from "./attestation/page";

const Bills211Report = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = useState(1);
  const [isOpenMobile, setIsOpenMobile] = useState(false);
const [reportname, setReportName] = useState("");
const [reportId, setReportId] = useState("");

useEffect(() => {
  if (typeof window !== "undefined") {
    const id = localStorage.getItem("reportid");
    if (!id) {
      router.push("/dashboard/Report"); // or wherever
      return;
    }
    setReportId(id);
     dispatch(setReportid(id));
    setReportName(localStorage.getItem("reportname") || "");
  }
}, []);


  // Section refs
  const refs = {
    1: useRef(),
    2: useRef(),
    3: useRef(),
    4: useRef(),
    5: useRef(),
    6: useRef(),
    7: useRef(),
    8: useRef(),
    9: useRef(),
    10: useRef(),
    11: useRef(),
    12: useRef(),
  };

  useEffect(() => {
    dispatch(setHeadertext1(""));
    dispatch(setHeaderdisplay("none"));
    dispatch(setHeadertext2("Bill S-211 Report"));
  }, [dispatch]);

  const handleNextStep = async (type = "next") => {
    const currentRef = refs[activeStep]?.current;
    const isSubmitted = currentRef ? await currentRef.submitForm(type) : true;

    if (isSubmitted) {
      if (type === "next") setActiveStep((prev) => prev + 1);
      else if (type === "back") setActiveStep((prev) => prev - 1);
      else {
        toast.success("Data saved as draft.", {
          position: "top-right",
          autoClose: 3000,
        });
        router.push("/dashboard/Report");
      }
    }
  };

  const renderStepComponent = () => {
    const sharedProps = { ref: refs[activeStep] };

    switch (activeStep) {
      case 1: return <Aboutthereport {...sharedProps} reportId={reportId}/>;
      case 2: return <Organizationprofilestructure {...sharedProps} reportId={reportId}/>;
      case 3: return <Businessactivities {...sharedProps} reportId={reportId}/>;
      case 4: return <Supplychains {...sharedProps} reportId={reportId} />;
      case 5: return <Policiesdiligence {...sharedProps} reportId={reportId}/>;
      case 6: return <Risksforcedchildlabour {...sharedProps} reportId={reportId}/>;
      case 7: return <Reduceforcedchildlabour {...sharedProps} reportId={reportId}/>;
      case 8: return <Remediationmeasures {...sharedProps}  reportId={reportId}/>;
      case 9: return <Remediationlossincome {...sharedProps} reportId={reportId}/>;
      case 10: return <Trainingforcedchildlabour {...sharedProps} reportId={reportId}/>;
      case 11: return <Assessingeffectiveness {...sharedProps} reportId={reportId}/>;
      case 12: return <Attestation {...sharedProps} reportId={reportId}/>;
      default: return null;
    }
  };

  return (
    <>
      <div className="flex">
        <Bills211Sidebar
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          isOpenMobile={isOpenMobile}
          setIsOpenMobile={setIsOpenMobile}
        />

        <div className="w-full px-5">
          <div className="flex justify-between items-center border-b py-4">
            <div>
              <button
                onClick={() => handleNextStep("back")}
                disabled={activeStep === 1}
                className="text-sm text-gray-600"
              >
                &lt; Back to Reports
              </button>
              <h2 className="text-xl font-semibold mt-2 gradient-text">{reportname}</h2>
            </div>

            <div className="flex gap-2">
              {activeStep > 1 && (
                <button
                  onClick={() => handleNextStep("back")}
                  className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded"
                >
                  &lt; Previous
                </button>
              )}
              <button
                onClick={() => handleNextStep("next")}
                className="px-4 py-2 text-sm text-white bg-blue-600 rounded"
              >
                {activeStep === 12 ? "Save and Create Report >" : "Next >"}
              </button>
            </div>
          </div>

          <div className="my-5 w-[90%]">{renderStepComponent()}</div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Bills211Report;
