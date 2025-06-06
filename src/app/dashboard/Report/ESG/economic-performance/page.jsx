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
  setInfrastructureInvestment,
  setgetdata,
} from "../../../../../lib/redux/features/ESGSlice/screen11Slice";

const EconomicPerformance = forwardRef(({ onSubmitSuccess,reportType,hasChanges }, ref) => {
  const [data, setData] = useState("");
  const [initialData, setInitialData] = useState({});
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

  const infrastructure_investement = useSelector(
    (state) => state.screen11Slice.infrastructure_investement
  );

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

  const currentData={
    company_economic_performance_statement,
    introduction_to_economic_value_creation,
    financial_assistance_from_government,
    infrastructure_investement
  }
  const submitForm = async (type) => {
    LoaderOpen();
    if (!hasChanges(initialData, currentData)) {
      LoaderClose();
      return false;
    }
    const data = {
      company_economic_performance_statement: {
        page: "screen_eleven",
        label: "11. Economic Performance",
        subLabel: "Add statement about company’s economic performance",
        type: "textarea",
        content: company_economic_performance_statement,
        field: "company_economic_performance_statement",
        isSkipped: false,
      },
      introduction_to_economic_value_creation: {
        page: "screen_eleven",
        label: "11.1.2 Economic Value Creation",
        subLabel: "Add introduction for company’s economic value creation",
        type: "textarea",
        content: introduction_to_economic_value_creation,
        field: "introduction_to_economic_value_creation",
        isSkipped: false,
      },
      financial_assistance_from_government: {
        page: "screen_eleven",
        label: "11.1.3 Financial Assistance Received from Government",
        subLabel:
          "Add introduction about financial assistance received from government",
        type: "textarea",
        content: financial_assistance_from_government,
        field: "financial_assistance_from_government",
        isSkipped: false,
      },
      infrastructure_investement: {
        page: "screen_eleven",
        label: "11.2 Infrastructure Investment and Services Supported",
        subLabel:
          "Add statement for infrastructure investment and services provided",
        type: "textarea",
        content: infrastructure_investement,
        field: "infrastructure_investement",
        isSkipped: false,
      },
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

  const loadFormData = async () => {
    LoaderOpen();
    dispatch(setCompanyeconomic(""));
    dispatch(setFinancialassistanc(""));
    dispatch(setIntroductionto(""));
    dispatch(setInfrastructureInvestment(""));

    const url = `${process.env.BACKEND_API_URL}/esg_report/screen_eleven/${reportid}/`;
    try {
      const response = await axiosInstance.get(url);
      if (response.data) {
        console.error("API response data11", response.data);
        const flatData = {};
  Object.keys(response.data).forEach((key) => {
    flatData[key] = response.data[key]?.content || "";
  });

  setInitialData(flatData);
        setData(response.data);
        dispatch(setgetdata(response.data));
        dispatch(
          setCompanyeconomic(
            response.data.company_economic_performance_statement?.content || ""
          )
        );
        dispatch(
          setIntroductionto(
            response.data.introduction_to_economic_value_creation?.content || ""
          )
        );
        dispatch(
          setFinancialassistanc(
            response.data.financial_assistance_from_government?.content || ""
          )
        );
        dispatch(
          setInfrastructureInvestment(
            response.data.infrastructure_investement?.content || ""
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
    if (!apiCalledRef.current && reportid) {
      apiCalledRef.current = true;
      loadFormData();
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
          11. Economic Performance 
        </h3>
        <div className="flex gap-4">
          <div className="xl:w-[80%] md:w-[75%] lg:w-[80%]  2k:w-[80%] 4k:w-[80%] 2xl:w-[80%]  w-full">
            <Section1 orgName={orgName} data={data} reportType={reportType}  />
            <Section2
              data={data}
              section11_1Ref={section11_1Ref}
              section11_1_1Ref={section11_1_1Ref}
              reportType={reportType}
            />
            <Section3
              section11_1_2Ref={section11_1_2Ref}
              orgName={orgName}
              data={data}
              reportType={reportType}
            />
            <Section4
              section11_1_3Ref={section11_1_3Ref}
              orgName={orgName}
              data={data}
              reportType={reportType}
            />
            <Section5 section11_2Ref={section11_2Ref} data={data} reportType={reportType} />
            {reportType=='GRI Report: In accordance With' && <Section6 section11_2_1Ref={section11_2_1Ref} data={data} /> }   
            <Section7 section11_2_2Ref={section11_2_2Ref} data={data} reportType={reportType} />
            <Section8
              section11_3Ref={section11_3Ref}
              section11_3_1Ref={section11_3_1Ref}
              data={data}
              reportType={reportType}
            />
            <Section9 section11_3_2Ref={section11_3_2Ref} data={data} reportType={reportType} />
            <Section10 section11_3_3Ref={section11_3_3Ref} data={data} reportType={reportType} />
            <Section11 section11_3_4Ref={section11_3_4Ref} data={data} reportType={reportType} />
            <Section12
              section11_4Ref={section11_4Ref}
              section11_4_1Ref={section11_4_1Ref}
              data={data}
              reportType={reportType}
            />
            <Section13 section11_4_2Ref={section11_4_2Ref} data={data} reportType={reportType} />
            <Section14 section11_4_3Ref={section11_4_3Ref} data={data} reportType={reportType} />
            <Section15 section11_4_4Ref={section11_4_4Ref} data={data} reportType={reportType} />
            <Section16
              section11_5Ref={section11_5Ref}
              section11_5_1Ref={section11_5_1Ref}
              data={data}
              reportType={reportType}
            />
            <Section17 section11_5_2Ref={section11_5_2Ref} data={data} reportType={reportType} />
            <Section18 section11_5_3Ref={section11_5_3Ref} data={data} reportType={reportType} />
            <Section19 section11_5_4Ref={section11_5_4Ref} data={data} reportType={reportType} />
            <Section20
              section11_6Ref={section11_6Ref}
              section11_6_1Ref={section11_6_1Ref}
              data={data}
              reportType={reportType}
            />
          </div>
          {/* page sidebar */}

          <div className="p-4 border border-r-2 border-b-2 shadow-lg rounded-lg h-fit top-20 sticky mt-2 w-[20%] md:w-[25%] lg:w-[20%] xl:sticky xl:top-36 lg:sticky lg:top-36  md:fixed 
  md:top-[19rem]
  md:right-4  hidden xl:block md:block lg:block 2k:block 4k:block 2xl:block">
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

            {reportType=='GRI Report: In accordance With'&&
               <p
               className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                 activeSection === "section11_1_1" ? "text-blue-400" : ""
               }`}
               onClick={() => scrollToSection(section11_1_1Ref, "section11_1_1")}
             >
               11.1.1. Management of Material Topics
             </p>
            }

           

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section11_1_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section11_1_2Ref, "section11_1_2")}
            >
             {reportType=='GRI Report: In accordance With'?'11.1.2.':'11.1.1.'}  Economic value creation
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section11_1_3" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section11_1_3Ref, "section11_1_3")}
            >
             {reportType=='GRI Report: In accordance With'?'11.1.3.':'11.1.2.'}  Financial assistance received from government
            </p>

            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section11_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section11_2Ref, "section11_2")}
            >
              11.2. Infrastructure investment and services supported
            </p>

                {
                  reportType=='GRI Report: In accordance With'&&
                  <p
                  className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                    activeSection === "section11_2_1" ? "text-blue-400" : ""
                  }`}
                  onClick={() => scrollToSection(section11_2_1Ref, "section11_2_1")}
                >
                  11.2.1. Management of Material Topics
                </p>
                }
           

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section11_2_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section11_2_2Ref, "section11_2_2")}
            >
            {reportType=='GRI Report: In accordance With'?'11.2.2.':'11.2.1.'}  Indirect economic impacts
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

                {
                   reportType=='GRI Report: In accordance With'&&
                   <p
                   className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                     activeSection === "section11_3_1" ? "text-blue-400" : ""
                   }`}
                   onClick={() => scrollToSection(section11_3_1Ref, "section11_3_1")}
                 >
                   11.3.1. Management of Material Topics
                 </p>
                }
           

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section11_3_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section11_3_2Ref, "section11_3_2")}
            >
            {reportType=='GRI Report: In accordance With'?'11.3.2.':'11.3.1.'}  Climate-related Financial Implications
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section11_3_3" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section11_3_3Ref, "section11_3_3")}
            >
           {reportType=='GRI Report: In accordance With'?'11.3.2.1':'11.3.1.1'}  Climate-related Risks
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section11_3_4" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section11_3_4Ref, "section11_3_4")}
            >
             {reportType=='GRI Report: In accordance With'?'11.3.2.2':'11.3.1.2'} Climate-related Opportunities
            </p>

            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section11_4" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section11_4Ref, "section11_4")}
            >
              11.4. Tax
            </p>
                {
                  reportType=='GRI Report: In accordance With' && 
                  <p
                  className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                    activeSection === "section11_4_1" ? "text-blue-400" : ""
                  }`}
                  onClick={() => scrollToSection(section11_4_1Ref, "section11_4_1")}
                >
                  11.4.1. Management of material topic
                </p>
                }
           

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section11_4_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section11_4_2Ref, "section11_4_2")}
            >
             {reportType=='GRI Report: In accordance With'?'11.4.2.':'11.4.1.'}  Approach to tax
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section11_4_3" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section11_4_3Ref, "section11_4_3")}
            >
             {reportType=='GRI Report: In accordance With'?'11.4.3.':'11.4.2.'}  Tax governance and risk management
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section11_4_4" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section11_4_4Ref, "section11_4_4")}
            >
             {reportType=='GRI Report: In accordance With'?'11.4.4.':'11.4.3.'}  Stakeholder engagement and management of concerns related
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

            {reportType=='GRI Report: In accordance With' && 
             <p
             className={`text-[11px] mb-2 ml-2 cursor-pointer ${
               activeSection === "section11_5_1" ? "text-blue-400" : ""
             }`}
             onClick={() => scrollToSection(section11_5_1Ref, "section11_5_1")}
           >
             11.5.1. Management of material topic
           </p>
            }

           

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section11_5_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section11_5_2Ref, "section11_5_2")}
            >
             {reportType=='GRI Report: In accordance With'?'11.5.2.':'11.5.1.'} Operations assessed for risks related to anti-corruption
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section11_5_3" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section11_5_3Ref, "section11_5_3")}
            >
             {reportType=='GRI Report: In accordance With'?'11.5.3.':'11.5.2.'}  Incidents of anti-corruption
            </p>

            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section11_5_4" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section11_5_4Ref, "section11_5_4")}
            >
            {reportType=='GRI Report: In accordance With'?'11.5.4.':'11.5.3.'}  Training on anti-corruption
            </p>

            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section11_6" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section11_6Ref, "section11_6")}
            >
              11.6. Political contribution
            </p>
                {
                  reportType=='GRI Report: In accordance With' &&
                  <p
                  className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                    activeSection === "section11_6_1" ? "text-blue-400" : ""
                  }`}
                  onClick={() => scrollToSection(section11_6_1Ref, "section11_6_1")}
                >
                  11.6.1. Management of Material Topic
                </p>
                }
           
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
