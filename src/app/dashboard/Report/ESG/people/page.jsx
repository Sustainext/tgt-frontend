"use client";
import {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useEffect,
} from "react";
import Section1 from "./sections/section1";
import Section2 from "./sections/section2";
import Section3 from "./sections/section3";
import Section4 from "./sections/section4";
import Section5 from "./sections/section5";
import Section6 from "./sections/section6";
import Section7 from "./sections/section7";
import Section8 from "./sections/section8";
import Section9 from "./sections/section9";
import Section10 from "./sections/section10";
import Section11 from "./sections/section11";
import Section12 from "./sections/section12";
import Section13 from "./sections/section13";
import Section14 from "./sections/section14";
import Section15 from "./sections/section15";
import Section16 from "./sections/section16";
import Section17 from "./sections/section17";
import Section18 from "./sections/section18";
import Section19 from "./sections/section19";
import Section20 from "./sections/section20";
import Section21 from "./sections/section21";
import Section22 from "./sections/section22";
import Section23 from "./sections/section23";
import Section24 from "./sections/section24";
import Section25 from "./sections/section25";
import Section26 from "./sections/section26";
import Section27 from "./sections/section27";
import Section28 from "./sections/section28";
import Section29 from "./sections/section29";
import Section30 from "./sections/section30";
import Section31 from "./sections/section31";
import Section32 from "./sections/section32";
import Section33 from "./sections/section33";
import axiosInstance, { patch } from "../../../../utils/axiosMiddleware";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";
import {
  setEmployeePoliciesStatement,
  setWorkforceHireRetentionStatement,
  setStandardWage,
  setPerformanceReviewProcess,
  setForcedLaborPosition,
  setChildLaborPosition,
  setEmployeeDiversityPosition,
  setEmployeeSkillUpgradePrograms,
  setRemunerationPractices,
  setOHSPolicies,
  setHazardRiskAssessment,
  setWorkRelatedHealthInjuries,
  setSafetyTraining,
  setOHSManagementSystem,
  setFreedomOfAssociationViews,
  setViolationDiscriminationPolicy,
  setIndigenousRightsPolicy,
  setParentalLeaves,
  setSecurityPersonnelInternalTraining,
  setSecurityPersonnelExternalTraining,
} from "../../../../../lib/redux/features/ESGSlice/screen13Slice";

const People = forwardRef(({ onSubmitSuccess }, ref) => {
  const [activeSection, setActiveSection] = useState("section13_1");

  const section13_1Ref = useRef(null);
  const section13_2Ref = useRef(null);
  const section13_3Ref = useRef(null);
  const section13_4Ref = useRef(null);
  const section13_5Ref = useRef(null);
  const section13_6Ref = useRef(null);
  const section13_7Ref = useRef(null);
  const section13_8Ref = useRef(null);
  const section13_1_1Ref = useRef(null);
  const section13_1_2Ref = useRef(null);
  const section13_1_3Ref = useRef(null);
  const section13_1_4Ref = useRef(null);
  const section13_1_5Ref = useRef(null);
  const section13_1_6Ref = useRef(null);
  const section13_2_1Ref = useRef(null);
  const section13_2_2Ref = useRef(null);
  const section13_2_3Ref = useRef(null);
  const section13_3_1Ref = useRef(null);
  const section13_4_1Ref = useRef(null);
  const section13_4_2Ref = useRef(null);
  const section13_4_3Ref = useRef(null);
  const section13_5_1Ref = useRef(null);
  const section13_5_2Ref = useRef(null);
  const section13_6_1Ref = useRef(null);
  const section13_6_2Ref = useRef(null);
  const section13_6_3Ref = useRef(null);
  const section13_6_4Ref = useRef(null);
  const section13_6_5Ref = useRef(null);
  const section13_6_6Ref = useRef(null);
  const section13_6_7Ref = useRef(null);
  const section13_6_8Ref = useRef(null);
  const section13_6_9Ref = useRef(null);
  const section13_6_10Ref = useRef(null);
  const section13_7_1Ref = useRef(null);
  const section13_7_2Ref = useRef(null);
  const section13_8_1Ref = useRef(null);
  const section13_8_2Ref = useRef(null);

  const orgName =
    typeof window !== "undefined" ? localStorage.getItem("reportorgname") : "";
  const reportid =
    typeof window !== "undefined" ? localStorage.getItem("reportid") : "";
  const apiCalledRef = useRef(false);
  const [data, setData] = useState("");
  const [loopen, setLoOpen] = useState(false);
  const employee_policies_statement = useSelector(
    (state) => state.screen13Slice.employee_policies_statement
  );
  const workforce_hire_retention_statement = useSelector(
    (state) => state.screen13Slice.workforce_hire_retention_statement
  );
  const standard_wage = useSelector(
    (state) => state.screen13Slice.standard_wage
  );
  const performance_review_process = useSelector(
    (state) => state.screen13Slice.performance_review_process
  );
  const forced_labor_position = useSelector(
    (state) => state.screen13Slice.forced_labor_position
  );
  const child_labor_position = useSelector(
    (state) => state.screen13Slice.child_labor_position
  );
  const employee_diversity_position = useSelector(
    (state) => state.screen13Slice.employee_diversity_position
  );
  const employee_skill_upgrade_programs = useSelector(
    (state) => state.screen13Slice.employee_skill_upgrade_programs
  );
  const remuneration_practices = useSelector(
    (state) => state.screen13Slice.remuneration_practices
  );
  const ohs_policies = useSelector((state) => state.screen13Slice.ohs_policies);
  const hazard_risk_assessment = useSelector(
    (state) => state.screen13Slice.hazard_risk_assessment
  );
  const work_related_health_injuries = useSelector(
    (state) => state.screen13Slice.work_related_health_injuries
  );
  const safety_training = useSelector(
    (state) => state.screen13Slice.safety_training
  );
  const ohs_management_system = useSelector(
    (state) => state.screen13Slice.ohs_management_system
  );
  const freedom_of_association_views = useSelector(
    (state) => state.screen13Slice.freedom_of_association_views
  );
  const violation_discrimination_policy = useSelector(
    (state) => state.screen13Slice.violation_discrimination_policy
  );
  const indigenous_rights_policy = useSelector(
    (state) => state.screen13Slice.indigenous_rights_policy
  );
  const parental_leaves = useSelector(
    (state) => state.screen13Slice.parental_leaves
  );
  const security_personnel_internal_training = useSelector(
    (state) => state.screen13Slice.security_personnel_internal_training
  );
  const security_personnel_external_training = useSelector(
    (state) => state.screen13Slice.security_personnel_external_training
  );

  const dispatch = useDispatch();

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
    const data = {
      employee_policies_statement: {
        page: "screen_thirteen",
        label: "13. People",
        subLabel: "Add statement about company’s employees and their policies",
        type: "textarea",
        content: employee_policies_statement,
        field: "employee_policies_statement",
        isSkipped: false,
      },
      workforce_hire_retention_statement: {
        page: "screen_thirteen",
        label: "13.1.2 Employee Hire, Turnover",
        subLabel: "Add statement about company’s workforce hire and retention",
        type: "textarea",
        content: workforce_hire_retention_statement,
        field: "workforce_hire_retention_statement",
        isSkipped: false,
      },
      parental_leaves: {
        page: "screen_thirteen",
        label: "13.1.4 Parental Leaves",
        subLabel: "Add statement about company’s policy on parental leave",
        type: "textarea",
        content: parental_leaves,
        field: "parental_leaves",
        isSkipped: false,
      },
      standard_wage: {
        page: "screen_thirteen",
        label: "13.1.5 Standard Wage",
        subLabel:
          "Add statement about company’s Policy on employee compensation",
        type: "textarea",
        content: standard_wage,
        field: "standard_wage",
        isSkipped: false,
      },
      performance_review_process: {
        page: "screen_thirteen",
        label: "13.1.6 Performance and Career Development Reviews of Employees",
        subLabel:
          "Add statement about company’s process for performance review of employees",
        type: "textarea",
        content: performance_review_process,
        field: "performance_review_process",
        isSkipped: false,
      },
      forced_labor_position: {
        page: "screen_thirteen",
        label: "13.2.3 Forced or Compulsory Labour",
        subLabel:
          "Add statement about company’s position on forced / compulsory labor",
        type: "textarea",
        content: forced_labor_position,
        field: "forced_labor_position",
        isSkipped: false,
      },
      child_labor_position: {
        page: "screen_thirteen",
        label: "13.3 Incidents of Child Labour",
        subLabel: "Add statement about company’s position on child labor",
        type: "textarea",
        content: child_labor_position,
        field: "child_labor_position",
        isSkipped: false,
      },
      employee_diversity_position: {
        page: "screen_thirteen",
        label: "13.4.2 Diversity of Governance Bodies and Employees",
        subLabel:
          "Add statement about company’s position on diversity of employees",
        type: "textarea",
        content: employee_diversity_position,
        field: "employee_diversity_position",
        isSkipped: false,
      },
      employee_skill_upgrade_programs: {
        page: "screen_thirteen",
        label:
          "13.5.2 Programs for Upgrading Employee Skills and Transition Assistance Programs",
        subLabel:
          "Add statement about company’s programs for upgrading employee’s skills",
        type: "textarea",
        content: employee_skill_upgrade_programs,
        field: "employee_skill_upgrade_programs",
        isSkipped: false,
      },
      remuneration_practices: {
        page: "screen_thirteen",
        label: "13.4.3 Remuneration",
        subLabel:
          "Add statement about company’s remuneration practices & policies.",
        type: "textarea",
        content: remuneration_practices,
        field: "remuneration_practices",
        isSkipped: false,
      },
      ohs_policies: {
        page: "screen_thirteen",
        label:
          "13.6.4 Worker Participation, Consultation, and Communication on OHS",
        subLabel: "Add statement about company’s OHS policies",
        type: "textarea",
        content: ohs_policies,
        field: "ohs_policies",
        isSkipped: false,
      },
      hazard_risk_assessment: {
        page: "screen_thirteen",
        label: "13.6.7 Hazard, Risk Identification and Investigation",
        subLabel:
          "Add statement about company’s process of Hazard and risk assessment",
        type: "textarea",
        content: hazard_risk_assessment,
        field: "hazard_risk_assessment",
        isSkipped: false,
      },
      work_related_health_injuries: {
        page: "screen_thirteen",
        label: "13.6.8 Work-Related Ill-Health & Injuries",
        subLabel:
          "Add statement about work related ill health and injuries in company",
        type: "textarea",
        content: work_related_health_injuries,
        field: "work_related_health_injuries",
        isSkipped: false,
      },
      safety_training: {
        page: "screen_thirteen",
        label: "13.6.9 Safety Training",
        subLabel: "Add statement about company’s safety training",
        type: "textarea",
        content: safety_training,
        field: "safety_training",
        isSkipped: false,
      },
      ohs_management_system: {
        page: "screen_thirteen",
        label: "13.6.10 Workers Covered by OHS Management System",
        subLabel: "Add statement about company’s OHS management system",
        type: "textarea",
        content: ohs_management_system,
        field: "ohs_management_system",
        isSkipped: false,
      },
      freedom_of_association_views: {
        page: "screen_thirteen",
        label:
          "13.7.2 Operations and Suppliers in Which the Right to Freedom of Association and Collective Bargaining May Be at Risk",
        subLabel:
          "Add statement about company’s views on freedom of association and collective bargaining",
        type: "textarea",
        content: freedom_of_association_views,
        field: "freedom_of_association_views",
        isSkipped: false,
      },
      violation_discrimination_policy: {
        page: "screen_thirteen",
        label: "13.8 Incidents of Violation/Discrimination",
        subLabel:
          "Add statement about company’s policy for addressing violation/ discrimination",
        type: "textarea",
        content: violation_discrimination_policy,
        field: "violation_discrimination_policy",
        isSkipped: false,
      },
      indigenous_rights_policy: {
        page: "screen_thirteen",
        label: "13.8.2 Incidents of Violation of Rights of Indigenous People",
        subLabel:
          "Add statement about company’s policy on violation of rights of indigenous people",
        type: "textarea",
        content: indigenous_rights_policy,
        field: "indigenous_rights_policy",
        isSkipped: false,
      },
      security_personnel_external_training: {
        page: "screen_thirteen",
        label:
          "Percentage of security personnel who have received formal training from third-party organisation",
        subLabel: "",
        type: "textarea",
        content: security_personnel_external_training,
        field: "security_personnel_external_training",
        isSkipped: false,
      },
      security_personnel_internal_training: {
        page: "screen_thirteen",
        label:
          "Percentage of security personnel who have received formal training in the organisation",
        subLabel: "",
        type: "textarea",
        content: security_personnel_internal_training,
        field: "security_personnel_internal_training",
        isSkipped: false,
      },
    };

    const url = `${process.env.BACKEND_API_URL}/esg_report/screen_thirteen/${reportid}/`;
    try {
      const response = await axiosInstance.put(url, data);

      if (response.status === 200) {
        if (type == "next") {
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
          onSubmitSuccess(true); // Notify the parent of successful submission
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
      return false; // Indicate failure
    }
  };

  const loadFormData = async () => {
    LoaderOpen();
    dispatch(setEmployeePoliciesStatement(""));
    dispatch(setWorkforceHireRetentionStatement(""));
    dispatch(setStandardWage(""));
    dispatch(setPerformanceReviewProcess(""));
    dispatch(setForcedLaborPosition(""));
    dispatch(setChildLaborPosition(""));
    dispatch(setEmployeeDiversityPosition(""));
    dispatch(setEmployeeSkillUpgradePrograms(""));
    dispatch(setRemunerationPractices(""));
    dispatch(setOHSPolicies(""));
    dispatch(setHazardRiskAssessment(""));
    dispatch(setWorkRelatedHealthInjuries(""));
    dispatch(setSafetyTraining(""));
    dispatch(setOHSManagementSystem(""));
    dispatch(setFreedomOfAssociationViews(""));
    dispatch(setViolationDiscriminationPolicy(""));
    dispatch(setIndigenousRightsPolicy(""));
    dispatch(setParentalLeaves(""));
    dispatch(setSecurityPersonnelInternalTraining(""));
    dispatch(setSecurityPersonnelExternalTraining(""));

    const url = `${process.env.BACKEND_API_URL}/esg_report/screen_thirteen/${reportid}/`;
    try {
      const response = await axiosInstance.get(url);
      if (response.data) {
        setData(response.data);
        dispatch(
          setEmployeePoliciesStatement(
            response.data.employee_policies_statement?.content || ""
          )
        );
        dispatch(
          setWorkforceHireRetentionStatement(
            response.data.workforce_hire_retention_statement?.content || ""
          )
        );
        dispatch(setStandardWage(response.data.standard_wage?.content || ""));
        dispatch(
          setPerformanceReviewProcess(
            response.data.performance_review_process?.content || ""
          )
        );
        dispatch(
          setForcedLaborPosition(
            response.data.forced_labor_position?.content || ""
          )
        );
        dispatch(
          setChildLaborPosition(
            response.data.child_labor_position?.content || ""
          )
        );
        dispatch(
          setEmployeeDiversityPosition(
            response.data.employee_diversity_position?.content || ""
          )
        );
        dispatch(
          setEmployeeSkillUpgradePrograms(
            response.data.employee_skill_upgrade_programs?.content || ""
          )
        );
        dispatch(
          setRemunerationPractices(
            response.data.remuneration_practices?.content || ""
          )
        );
        dispatch(setOHSPolicies(response.data.ohs_policies?.content || ""));
        dispatch(
          setHazardRiskAssessment(
            response.data.hazard_risk_assessment?.content || ""
          )
        );
        dispatch(
          setWorkRelatedHealthInjuries(
            response.data.work_related_health_injuries?.content || ""
          )
        );
        dispatch(
          setSafetyTraining(response.data.safety_training?.content || "")
        );
        dispatch(
          setOHSManagementSystem(
            response.data.ohs_management_system?.content || ""
          )
        );
        dispatch(
          setFreedomOfAssociationViews(
            response.data.freedom_of_association_views?.content || ""
          )
        );
        dispatch(
          setViolationDiscriminationPolicy(
            response.data.violation_discrimination_policy?.content || ""
          )
        );
        dispatch(
          setIndigenousRightsPolicy(
            response.data.indigenous_rights_policy?.content || ""
          )
        );
        dispatch(
          setParentalLeaves(response.data.parental_leaves?.content || "")
        );
        dispatch(
          setSecurityPersonnelInternalTraining(
            response.data.security_personnel_internal_training?.content || ""
          )
        );
        dispatch(
          setSecurityPersonnelExternalTraining(
            response.data.security_personnel_external_training?.content || ""
          )
        );
      }

      LoaderClose();
    } catch (error) {
      console.error("API call failed:", error);
      LoaderClose();
    }
  };

  useEffect(() => {
    // Ensure API is only called once
    if (!apiCalledRef.current && reportid) {
      apiCalledRef.current = true; // Set the flag to true to prevent future calls
      loadFormData(); // Call the API only once
    }
  }, [reportid]);

  const scrollToSection = (sectionRef, sectionId) => {
    setActiveSection(sectionId);

    const elementTop =
      sectionRef.current?.getBoundingClientRect().top + window.scrollY;

    // Scroll smoothly to the section, ensuring it scrolls up as well
    window.scrollTo({
      top: elementTop - 100, // Adjust 100 to the height of any sticky header
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="mx-2 p-2">
        <h3 className="text-[22px] text-[#344054] mb-4 text-left font-semibold">
          13. People
        </h3>
        <div className="flex gap-4">
          <div className="xl:w-[80%] md:w-[75%] lg:w-[80%]  2k:w-[80%] 4k:w-[80%] 2xl:w-[80%]  w-full">
            <Section1 />
            <Section2
              section13_1Ref={section13_1Ref}
              section13_1_1Ref={section13_1_1Ref}
              data={data}
            />
            <Section3 section13_1_2Ref={section13_1_2Ref} data={data} />
            <Section4 section13_1_3Ref={section13_1_3Ref} data={data} />
            <Section5 section13_1_4Ref={section13_1_4Ref} data={data} />
            <Section6 section13_1_5Ref={section13_1_5Ref} data={data} />
            <Section7 section13_1_6Ref={section13_1_6Ref} data={data} />
            <Section8
              section13_2_1Ref={section13_2_1Ref}
              section13_2Ref={section13_2Ref}
              data={data}
            />
            <Section9 section13_2_2Ref={section13_2_2Ref} data={data} />
            <Section10 section13_2_3Ref={section13_2_3Ref} data={data} />
            <Section11 section13_3Ref={section13_3Ref} data={data} />
            <Section12 section13_3_1Ref={section13_3_1Ref} data={data} />
            <Section13
              section13_4Ref={section13_4Ref}
              section13_4_1Ref={section13_4_1Ref}
              data={data}
            />
            <Section14 section13_4_2Ref={section13_4_2Ref} data={data} />
            <Section15 section13_4_3Ref={section13_4_3Ref} data={data} />
            <Section16
              section13_5Ref={section13_5Ref}
              section13_5_1Ref={section13_5_1Ref}
              data={data}
            />
            <Section17 section13_5_2Ref={section13_5_2Ref} data={data} />
            <Section18
              section13_6Ref={section13_6Ref}
              section13_6_1Ref={section13_6_1Ref}
              data={data}
            />
            <Section19 section13_6_2Ref={section13_6_2Ref} data={data} />
            <Section20 section13_6_3Ref={section13_6_3Ref} data={data} />
            <Section21 section13_6_4Ref={section13_6_4Ref} data={data} />
            <Section22 section13_6_5Ref={section13_6_5Ref} data={data} />
            <Section23 section13_6_6Ref={section13_6_6Ref} data={data} />
            <Section24 section13_6_7Ref={section13_6_7Ref} data={data} />
            <Section25 section13_6_8Ref={section13_6_8Ref} data={data} />
            <Section26 section13_6_9Ref={section13_6_9Ref} data={data} />
            <Section27 section13_6_10Ref={section13_6_10Ref} data={data} />
            <Section28 section13_7Ref={section13_7Ref} data={data} />
            <Section29 section13_7_1Ref={section13_7_1Ref} data={data} />
            <Section30
              section13_7_2Ref={section13_7_2Ref}
              data={data}
              orgName={orgName}
            />
            <Section31 section13_8Ref={section13_8Ref} data={data} />
            <Section32
              section13_8_1Ref={section13_8_1Ref}
              data={data}
              orgName={orgName}
            />
            <Section33
              section13_8_2Ref={section13_8_2Ref}
              data={data}
              orgName={orgName}
            />
          </div>
          {/* page sidebar */}

          <div className="p-4 border border-r-2 border-b-2 shadow-lg rounded-lg h-fit top-20 sticky mt-2 w-[20%] md:w-[25%] lg:w-[20%] xl:sticky xl:top-36 lg:sticky lg:top-36  md:fixed 
  md:top-[19rem]
  md:right-4  hidden xl:block md:block lg:block 2k:block 4k:block 2xl:block">
            <p className="text-[11px] text-[#727272] mb-2 uppercase">
              13. People
            </p>

            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section13_1" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section13_1Ref, "section13_1")}
            >
              13.1. Employees
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section13_1_1" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section13_1_1Ref, "section13_1_1")}
            >
              13.1.1. Management of Material Topics
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section13_1_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section13_1_2Ref, "section13_1_2")}
            >
              13.1.2. Employee hire, turnover
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section13_1_3" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section13_1_3Ref, "section13_1_3")}
            >
              13.1.3. Employee benefits and health services
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section13_1_4" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section13_1_4Ref, "section13_1_4")}
            >
              13.1.4. Personal leaves
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section13_1_5" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section13_1_5Ref, "section13_1_5")}
            >
              13.1.5. Standard wages
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section13_1_6" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section13_1_6Ref, "section13_1_6")}
            >
              13.1.6. Performance and career development reviews of employees
            </p>

            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section13_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section13_2Ref, "section13_2")}
            >
              13.2. Labour Management
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section13_2_1" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section13_2_1Ref, "section13_2_1")}
            >
              13.2.1. Management of Material Topics
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section13_2_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section13_2_2Ref, "section13_2_2")}
            >
              13.2.2. Workers who are not employees
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section13_2_3" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section13_2_3Ref, "section13_2_3")}
            >
              13.2.3. Forced or compulsory labour
            </p>

            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section13_3" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section13_3Ref, "section13_3")}
            >
              13.3. Incidents of child labour
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section13_3_1" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section13_3_1Ref, "section13_3_1")}
            >
              13.3.1. Management of Material Topic
            </p>

            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section13_4" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section13_4Ref, "section13_4")}
            >
              13.4. Diversity, Inclusion
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section13_4_1" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section13_4_1Ref, "section13_4_1")}
            >
              13.4.1. Management of Material Topics
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section13_4_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section13_4_2Ref, "section13_4_2")}
            >
              13.4.2. Diversity of governance bodies and employees
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section13_4_3" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section13_4_3Ref, "section13_4_3")}
            >
              13.4.3. Remuneration
            </p>

            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section13_5" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section13_5Ref, "section13_5")}
            >
              13.5. Training & education
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section13_5_1" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section13_5_1Ref, "section13_5_1")}
            >
              13.5.1. Management of Material Topics
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section13_5_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section13_5_2Ref, "section13_5_2")}
            >
              13.5.2. Programs for upgrading employee skills and transition
              assistance programs
            </p>

            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section13_6" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section13_6Ref, "section13_6")}
            >
              13.6. Occupational Health and Safety
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section13_6_1" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section13_6_1Ref, "section13_6_1")}
            >
              13.6.1. Management of Material Topic
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section13_6_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section13_6_2Ref, "section13_6_2")}
            >
              13.6.2. OHS management system
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section13_6_3" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section13_6_3Ref, "section13_6_3")}
            >
              13.6.3. Occupational health sevices
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section13_6_4" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section13_6_4Ref, "section13_6_4")}
            >
              13.6.4. Worker participation, consultation, and communication on
              OHS
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section13_6_5" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section13_6_5Ref, "section13_6_5")}
            >
              13.6.5. Promotion of worker health
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section13_6_6" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section13_6_6Ref, "section13_6_6")}
            >
              13.6.6. Prevention and mitigation of OHS impacts
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section13_6_7" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section13_6_7Ref, "section13_6_7")}
            >
              13.6.7. Hazard, risk identification and investigation
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section13_6_8" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section13_6_8Ref, "section13_6_8")}
            >
              13.6.8. Worked related ill-health & injuries
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section13_6_9" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section13_6_9Ref, "section13_6_9")}
            >
              13.6.9. Safety training
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section13_6_10" ? "text-blue-400" : ""
              }`}
              onClick={() =>
                scrollToSection(section13_6_10Ref, "section13_6_10")
              }
            >
              13.6.10. Workers covered by OHS management system
            </p>

            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section13_7" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section13_7Ref, "section13_7")}
            >
              13.7. Collective Bargaining 
            </p>
            {/* <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section13_7_1' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section13_7_1Ref, 'section13_7_1')} >
    13.7.1. Management of Material Topics
  </p> */}
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section13_7_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section13_7_2Ref, "section13_7_2")}
            >
              13.7.1. Operations and suppliers in which the right to freedom of
              association and collectie bargaining may be at risk 
            </p>

            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section13_8" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section13_8Ref, "section13_8")}
            >
              13.8. Incidents of violation/discrimination
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section13_8_1" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section13_8_1Ref, "section13_8_1")}
            >
              13.8.1. Management of material topic
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section13_8_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section13_8_2Ref, "section13_8_2")}
            >
              13.8.2. Incidents of violation of rights of indigenous people
            </p>
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

export default People;
