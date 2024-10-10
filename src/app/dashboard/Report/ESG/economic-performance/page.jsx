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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";
import axiosInstance from "../../../../utils/axiosMiddleware";
import {
  setCompanyeconomic,
  setFinancialassistanc,
  setIntroductionto,
  setgetdata,
} from "../../../../../lib/redux/features/ESGSlice/screen11Slice";

const EconomicPerformance = forwardRef(({ onSubmitSuccess }, ref) => {
  const reportid =
    typeof window !== "undefined" ? localStorage.getItem("reportid") : "";
  const orgName =
    typeof window !== "undefined" ? localStorage.getItem("reportorgname") : "";
  const company_economic_performance_statement = useSelector(
    (state) => state.screen11Slice.company_economic_performance_statement
  );
  const financial_assistance_from_government = useSelector(
    (state) => state.screen11Slice.financial_assistance_from_government
  ); // Assuming imageceo is a File object
  const introduction_to_economic_value_creation = useSelector(
    (state) => state.screen11Slice.introduction_to_economic_value_creation
  );
  const [data,setData] =useState("");
  const [activeSection, setActiveSection] = useState("section11_1");
  const section11_1Ref = useRef(null);
  const section11_2Ref = useRef(null);
  const section11_3Ref = useRef(null);
  const section11_4Ref = useRef(null);
  const section11_5Ref = useRef(null);
  const section11_6Ref = useRef(null);
  const section11_1_1Ref = useRef(null);
  const section11_1_2Ref = useRef(null);
  const section11_1_3Ref = useRef(null);
  const section11_2_1Ref = useRef(null);
  const section11_2_2Ref = useRef(null);
  const section11_3_1Ref = useRef(null);
  const section11_3_2Ref = useRef(null);
  const section11_3_3Ref = useRef(null);
  const section11_3_4Ref = useRef(null);
  const section11_4_1Ref = useRef(null);
  const section11_4_2Ref = useRef(null);
  const section11_4_3Ref = useRef(null);
  const section11_4_4Ref = useRef(null);
  const section11_5_1Ref = useRef(null);
  const section11_5_2Ref = useRef(null);
  const section11_5_3Ref = useRef(null);
  const section11_5_4Ref = useRef(null);
  const section11_6_1Ref = useRef(null);
  const apiCalledRef = useRef(false);
  const [loopen, setLoOpen] = useState(false);
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
      company_economic_performance_statement:
        company_economic_performance_statement,
      financial_assistance_from_government:
        financial_assistance_from_government,
      introduction_to_economic_value_creation:
        introduction_to_economic_value_creation,
    };

    const url = `${process.env.BACKEND_API_URL}/esg_report/screen_eleven/${reportid}/`;
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

  // const loadFormData = async () => {
  //   LoaderOpen();
  //   dispatch(setCompanyeconomic(""));
  //   dispatch(setFinancialassistanc(""));
  //   dispatch(setIntroductionto(""));

  //   const url = `${process.env.BACKEND_API_URL}/esg_report/screen_eleven/${reportid}/`;
  //   try {
  //     const response = await axiosInstance.get(url);
  //     if (response.data) {
  //       console.error("API response data11", response.data);
  //       dispatch(setgetdata(response.data));
  //     dispatch(setCompanyeconomic(response.data.company_economic_performance_statement));
  //     dispatch(setIntroductionto(response.data.introduction_to_economic_value_creation));
  //     dispatch(setFinancialassistanc(response.data.financial_assistance_from_government));
  //     }

  //     LoaderClose();
  //   } catch (error) {
  //     console.error("API call failed:", error);
  //     LoaderClose();
  //   }
  // };

  // useEffect(() => {
 
  //   if (!apiCalledRef.current && reportid) {
  //     apiCalledRef.current = true; 
  //     loadFormData(); 
  //   }
  // }, [reportid]);
  

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
          11. Economic Performance 
        </h3>
        <div className="flex gap-4">
          <div className="w-[80%]">
            <Section1 />
            <Section2

              section11_1Ref={section11_1Ref}
              section11_1_1Ref={section11_1_1Ref}
              data={data}
            />
            <Section3 section11_1_2Ref={section11_1_2Ref}  orgName={orgName} />
            <Section4 section11_1_3Ref={section11_1_3Ref} orgName={orgName}/>
            <Section5 section11_2Ref={section11_2Ref} />
            <Section6 section11_2_1Ref={section11_2_1Ref} />
            <Section7 section11_2_2Ref={section11_2_2Ref} />
            <Section8
              section11_3Ref={section11_3Ref}
              section11_3_1Ref={section11_3_1Ref}
            />
            <Section9 section11_3_2Ref={section11_3_2Ref} />
            <Section10 section11_3_3Ref={section11_3_3Ref} />
            <Section11 section11_3_4Ref={section11_3_4Ref} />
            <Section12
              section11_4Ref={section11_4Ref}
              section11_4_1Ref={section11_4_1Ref}
            />
            <Section13 section11_4_2Ref={section11_4_2Ref} />
            <Section14 section11_4_3Ref={section11_4_3Ref} />
            <Section15 section11_4_4Ref={section11_4_4Ref} />
            <Section16
              section11_5Ref={section11_5Ref}
              section11_5_1Ref={section11_5_1Ref}
            />
            <Section17 section11_5_2Ref={section11_5_2Ref} />
            <Section18 section11_5_3Ref={section11_5_3Ref} />
            <Section19 section11_5_4Ref={section11_5_4Ref} />
            <Section20
              section11_6Ref={section11_6Ref}
              section11_6_1Ref={section11_6_1Ref}
            />
          </div>
          {/* page sidebar */}

          <div className="p-4 border border-r-2 border-b-2 shadow-lg rounded-lg h-fit top-36 sticky mt-2 w-[20%]">
            <p className="text-[11px] text-[#727272] mb-2 uppercase">
              11. Economic Performance
            </p>

            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section11_1" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section11_1Ref, "section11_1")}
            >
              11.1 Highlights
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section11_1_1" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section11_1_1Ref, "section11_1_1")}
            >
              11.1.1. Management of Material Topics
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section11_1_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section11_1_2Ref, "section11_1_2")}
            >
              11.1.2. Economic value creation
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section11_1_3" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section11_1_3Ref, "section11_1_3")}
            >
              11.1.3. Financial assistance received from government
            </p>

            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section11_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section11_2Ref, "section11_2")}
            >
              11.2. Infrastructure investment and services supported
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section11_2_1" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section11_2_1Ref, "section11_2_1")}
            >
              11.2.1. Management of Material Topics
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section11_2_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section11_2_2Ref, "section11_2_2")}
            >
              11.2.2. Indirect economic impacts
            </p>

            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section11_3" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section11_3Ref, "section11_3")}
            >
              11.3. Climate-related financial implications, risks and
              opportunities
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section11_3_1" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section11_3_1Ref, "section11_3_1")}
            >
              11.3.1. Management of Material Topics
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section11_3_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section11_3_2Ref, "section11_3_2")}
            >
              11.3.2. Climate Financial Implications
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section11_3_3" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section11_3_3Ref, "section11_3_3")}
            >
              11.3.3. Climate-related Risks
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section11_3_4" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section11_3_4Ref, "section11_3_4")}
            >
              11.3.4. Climate-related Opportunities
            </p>

            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section11_4" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section11_4Ref, "section11_4")}
            >
              11.4. Tax
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section11_4_1" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section11_4_1Ref, "section11_4_1")}
            >
              11.4.1. Management of material topic
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section11_4_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section11_4_2Ref, "section11_4_2")}
            >
              11.4.2. Approach to tax
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section11_4_3" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section11_4_3Ref, "section11_4_3")}
            >
              11.4.3. Tax governance and risk management
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section11_4_4" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section11_4_4Ref, "section11_4_4")}
            >
              11.4.4. Stakeholder engagement and management of concerns related
              to tax
            </p>

            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section11_5" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section11_5Ref, "section11_5")}
            >
              11.5. Anti-corruption
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section11_5_1" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section11_5_1Ref, "section11_5_1")}
            >
              11.5.1. Management of material topic
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section11_5_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section11_5_2Ref, "section11_5_2")}
            >
              11.5.2. Operations assessed for risks related to anti-corruption
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section11_5_3" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section11_5_3Ref, "section11_5_3")}
            >
              11.5.3. Incidents of anti-corruption
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section11_5_4" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section11_5_4Ref, "section11_5_4")}
            >
              11.5.4. Training on anti-corruption
            </p>

            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section11_6" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section11_6Ref, "section11_6")}
            >
              11.6. Political contribution
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section11_6_1" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section11_6_1Ref, "section11_6_1")}
            >
              11.6.1. Training on anti-corruption
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

export default EconomicPerformance;
