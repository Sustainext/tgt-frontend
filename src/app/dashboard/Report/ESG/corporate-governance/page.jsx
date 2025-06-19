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
import Section25 from "./sections/section25";
import axiosInstance, { patch } from "../../../../utils/axiosMiddleware";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";
import {
  setStatement,
  setBoardGov,
  setRemunerationPolicies,
  setPolicyPublic,
} from "../../../../../lib/redux/features/ESGSlice/screen9Slice";

const CorporateGovernance = forwardRef(({ onSubmitSuccess,reportType,hasChanges }, ref) => {
  const [activeSection, setActiveSection] = useState("section9_1");
  const [initialData, setInitialData] = useState({});
  const section9_1Ref = useRef(null);
  const section9_2Ref = useRef(null);
  const section9_3Ref = useRef(null);
  const section9_4Ref = useRef(null);
  const section9_5Ref = useRef(null);
  const section9_6Ref = useRef(null);
  const section9_1_1Ref = useRef(null);
  const section9_2_1Ref = useRef(null);
  const section9_2_2Ref = useRef(null);
  const section9_2_3Ref = useRef(null);
  const section9_2_4Ref = useRef(null);
  const section9_3_1Ref = useRef(null);
  const section9_3_2Ref = useRef(null);
  const section9_3_3Ref = useRef(null);
  const section9_3_4Ref = useRef(null);
  const section9_3_5Ref = useRef(null);
  const section9_3_6Ref = useRef(null);
  const section9_3_7Ref = useRef(null);
  const section9_3_8Ref = useRef(null);
  const section9_4_1Ref = useRef(null);
  const section9_4_2Ref = useRef(null);
  const section9_5_1Ref = useRef(null);
  const section9_5_2Ref = useRef(null);
  const section9_5_3Ref = useRef(null);
  const section9_6_1Ref = useRef(null);
  const section9_6_2Ref = useRef(null);
  const section9_6_3Ref = useRef(null);
  const section9_6_4Ref = useRef(null);
  const section9_6_5Ref = useRef(null);
  const section9_7Ref = useRef(null);

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

  const orgName =
    typeof window !== "undefined" ? localStorage.getItem("reportorgname") : "";
  const reportid =
    typeof window !== "undefined" ? localStorage.getItem("reportid") : "";
  const apiCalledRef = useRef(false);
  const [data, setData] = useState("");
  const [loopen, setLoOpen] = useState(false);
  const statement = useSelector((state) => state.screen9Slice.statement);
  const board_gov_statement = useSelector(
    (state) => state.screen9Slice.board_gov_statement
  );
  const remuneration_policies = useSelector(
    (state) => state.screen9Slice.remuneration_policies
  );
  const policy_not_public_reason = useSelector(
    (state) => state.screen9Slice.policy_not_public_reason
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

  const currentData={
    statement,
    board_gov_statement,
    remuneration_policies,
    policy_not_public_reason
  }
  const submitForm = async (type) => {
    LoaderOpen();
    if (!hasChanges(initialData, currentData)) {
      LoaderClose();
      return false;
    }
    const data = {
      statement: {
        page: "screen_nine",
        label: "9. Corporate Governance",
        subLabel: "Add statement about company’s corporate governance",
        type: "textarea",
        content: statement,
        field: "statement",
        isSkipped: false,
      },
      board_gov_statement: {
        page: "screen_nine",
        label: "9.1.1 Governance structure and composition",
        subLabel: "Add statement about company’s board of directors",
        type: "textarea",
        content: board_gov_statement,
        field: "board_gov_statement",
        isSkipped: false,
      },
      remuneration_policies: {
        page: "screen_nine",
        label:
          "9.3.7 Remuneration Policies & Process to Determine Remuneration",
        subLabel: "Add statement about company’s remuneration policies",
        type: "textarea",
        content: remuneration_policies,
        field: "remuneration_policies",
        isSkipped: false,
      },
      policy_not_public_reason: {
        page: "screen_nine",
        label: "9.6.2 Reason why policy is not publicly available",
        subLabel: "Add statement about company’s sustainability policies",
        type: "textarea",
        content: policy_not_public_reason,
        field: "policy_not_public_reason",
        isSkipped: false,
      },
    };

    const url = `${process.env.BACKEND_API_URL}/esg_report/screen_nine/${reportid}/`;
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
    dispatch(setStatement(""));
    dispatch(setBoardGov(""));
    dispatch(setRemunerationPolicies(""));
    dispatch(setPolicyPublic(""));
    const url = `${process.env.BACKEND_API_URL}/esg_report/screen_nine/${reportid}/`;
    try {
      const response = await axiosInstance.get(url);
      if (response.data) {
        const flatData = {};
  Object.keys(response.data).forEach((key) => {
    flatData[key] = response.data[key]?.content || "";
  });

  setInitialData(flatData);
        setData(response.data);
        dispatch(setStatement(response.data.statement?.content || ""));
        dispatch(setBoardGov(response.data.board_gov_statement?.content || ""));
        dispatch(
          setRemunerationPolicies(
            response.data.remuneration_policies?.content || ""
          )
        );
        dispatch(
          setPolicyPublic(response.data.policy_not_public_reason?.content || "")
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

  return (
    <>
      <div className="mx-2 p-2">
        <h3 className="text-[22px] text-[#344054] mb-4 text-left font-semibold">
          9. Corporate Governance 
        </h3>
        <div className="flex gap-4">
          <div className="xl:w-[80%] md:w-[75%] lg:w-[80%]  2k:w-[80%] 4k:w-[80%] 2xl:w-[80%]  w-full">
            <Section1 orgName={orgName} />
             <Section2
              section9_1Ref={section9_1Ref}
              section9_1_1Ref={section9_1_1Ref}
              data={data}
            />
            <Section3
              section9_2Ref={section9_2Ref}
              section9_2_1Ref={section9_2_1Ref}
              data={data}
            />
            <Section4 section9_2_2Ref={section9_2_2Ref} data={data} />
            <Section5 section9_2_3Ref={section9_2_3Ref} data={data} />
           {reportType=='GRI Report: In accordance With' &&  <Section6 section9_2_4Ref={section9_2_4Ref} data={data} />}
            <Section7
              section9_3_1Ref={section9_3_1Ref}
              section9_3Ref={section9_3Ref}
              data={data}
            />
            <Section8 section9_3_2Ref={section9_3_2Ref} data={data} />
            <Section9 section9_3_3Ref={section9_3_3Ref} data={data} />
            <Section10 section9_3_4Ref={section9_3_4Ref} data={data} />
            <Section11 section9_3_5Ref={section9_3_5Ref} data={data} />
            <Section12 section9_3_6Ref={section9_3_6Ref} data={data} />
            <Section13 section9_3_7Ref={section9_3_7Ref} data={data} />
            <Section14 section9_3_8Ref={section9_3_8Ref} data={data} />
            <Section15
              section9_4_1Ref={section9_4_1Ref}
              section9_4Ref={section9_4Ref}
              data={data}
            />
            <Section16 section9_4_2Ref={section9_4_2Ref} data={data} />
            <Section17
              section9_5_1Ref={section9_5_1Ref}
              section9_5Ref={section9_5Ref}
              data={data}
            />
            <Section18 section9_5_2Ref={section9_5_2Ref} data={data} />
            <Section19 section9_5_3Ref={section9_5_3Ref} data={data} />
            <Section20
              section9_6_1Ref={section9_6_1Ref}
              section9_6Ref={section9_6Ref}
              data={data}
            />
            <Section21
              section9_6_2Ref={section9_6_2Ref}
              data={data}
              orgName={orgName}
            />
           <Section22 section9_6_3Ref={section9_6_3Ref} data={data} />
            <Section23 section9_6_4Ref={section9_6_4Ref} data={data} />
            <Section25 section9_7Ref={section9_7Ref} data={data} />
          </div>
          {/* page sidebar */}

          <div className="p-4 border border-r-2 border-b-2 shadow-lg rounded-lg h-fit top-20 sticky mt-2 w-[20%] md:w-[25%] lg:w-[20%] xl:sticky xl:top-36 lg:sticky lg:top-36  md:fixed 
  md:top-[19rem]
  md:right-4  hidden xl:block md:block lg:block 2k:block 4k:block 2xl:block">
            <p className="text-[11px] text-[#727272] mb-2 uppercase">
              9. Corporate Governance
            </p>

            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section9_1" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section9_1Ref, "section9_1")}
            >
              9.1. Board of Directors
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section9_1_1" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section9_1_1Ref, "section9_1_1")}
            >
              9.1.1 Governance structure and composition
            </p>

            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section9_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section9_2Ref, "section9_2")}
            >
              9.2. General Governance
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section9_2_1" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section9_2_1Ref, "section9_2_1")}
            >
              9.2.1 Nomination, selection of the highest governance body
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section9_2_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section9_2_2Ref, "section9_2_2")}
            >
              9.2.2 Chair of the highest governance body
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section9_2_3" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section9_2_3Ref, "section9_2_3")}
            >
              9.2.3 Senior management hired from local community
            </p>

            {
           reportType=='GRI Report: In accordance With'   &&  <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section9_2_4" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section9_2_4Ref, "section9_2_4")}
            >
              9.2.4 Management of material topic
            </p>
            }
                

            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section9_3" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section9_3Ref, "section9_3")}
            >
              9.3 Responsibility, evaluation and remuneration of the Board
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section9_3_1" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section9_3_1Ref, "section9_3_1")}
            >
              9.3.1 Role of the highest governance body
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section9_3_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section9_3_2Ref, "section9_3_2")}
            >
              9.3.2 Collective knowledge of the highest governance body
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section9_3_3" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section9_3_3Ref, "section9_3_3")}
            >
              9.3.3 Role of the highest governance body in sustainability
              reporting
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section9_3_4" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section9_3_4Ref, "section9_3_4")}
            >
              9.3.4 Delegation of responsibility for managing impacts
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section9_3_5" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section9_3_5Ref, "section9_3_5")}
            >
              9.3.5 Communication of critical concerns
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section9_3_6" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section9_3_6Ref, "section9_3_6")}
            >
              9.3.6 Evaluation of the performance of the highest governance body
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section9_3_7" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section9_3_7Ref, "section9_3_7")}
            >
              9.3.7 Remuneration policies & Process to determine remuneration
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section9_3_8" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section9_3_8Ref, "section9_3_8")}
            >
              9.3.8 Annual compensation ratio
            </p>

            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section9_4" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section9_4Ref, "section9_4")}
            >
              9.4 Strategy
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section9_4_1" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section9_4_1Ref, "section9_4_1")}
            >
              9.4.1 Statement on sustainable development strategy
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section9_4_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section9_4_2Ref, "section9_4_2")}
            >
              9.4.2 Membership association
            </p>

            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section9_5" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section9_5Ref, "section9_5")}
            >
              9.5 Risk Management
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section9_5_1" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section9_5_1Ref, "section9_5_1")}
            >
              9.5.1 Remediation of negative impacts
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section9_5_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section9_5_2Ref, "section9_5_2")}
            >
              9.5.2 Mechanism for seeking advice and raising concerns
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section9_5_3" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section9_5_3Ref, "section9_5_3")}
            >
              9.5.3 Compliance
            </p>

            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section9_6" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section9_6Ref, "section9_6")}
            >
              9.6 Policy
            </p>

            {/* <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section9_6_1' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section9_6_1Ref, 'section9_6_1')}>
    9.6.1 Management of material topic
   
  </p> */}

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section9_6_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section9_6_2Ref, "section9_6_2")}
            >
              9.6.1 Embedding policy Commitment
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section9_6_3" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section9_6_3Ref, "section9_6_3")}
            >
              9.6.2 Anti-trust, anti-competitive behavior, monopoly practices
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section9_6_4" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section9_6_4Ref, "section9_6_4")}
            >
              9.6.3 Defined benefit plan obligations and other retirement plans
            </p>

            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section9_7" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section9_7Ref, "section9_7")}
            >
              9.7 Conflict of interest
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

export default CorporateGovernance;
