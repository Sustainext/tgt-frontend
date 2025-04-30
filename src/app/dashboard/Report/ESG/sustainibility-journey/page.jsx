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
import axiosInstance, { patch } from "../../../../utils/axiosMiddleware";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";
import {
  setCompanyStatement,
  setApproachSustainability,
  setSustainabilityGoals,
  setSupplyChainSustainability,
} from "../../../../../lib/redux/features/ESGSlice/screen10Slice";

const SustainibilityJourney = forwardRef(({ onSubmitSuccess }, ref) => {
  const [activeSection, setActiveSection] = useState("section10_1");

  const section10_1Ref = useRef(null);
  const section10_2Ref = useRef(null);
  const section10_3Ref = useRef(null);
  const section10_3_1Ref = useRef(null);
  const section10_3_2Ref = useRef(null);
  const section10_3_3Ref = useRef(null);

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
  const company_sustainability_statement = useSelector(
    (state) => state.screen10Slice.company_sustainability_statement
  );
  const approach_for_sustainability = useSelector(
    (state) => state.screen10Slice.approach_for_sustainability
  );
  const sustainability_goals = useSelector(
    (state) => state.screen10Slice.sustainability_goals
  );
  const approach_to_supply_chain_sustainability = useSelector(
    (state) => state.screen10Slice.approach_to_supply_chain_sustainability
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
      company_sustainability_statement: {
        page: "screen_ten",
        label: "10. Sustainability Journey",
        subLabel: "Add statement about company’s sustainability journey",
        type: "textarea",
        content: company_sustainability_statement,
        field: "company_sustainability_statement",
        isSkipped: false,
      },
      approach_for_sustainability: {
        page: "screen_ten",
        label: "10.1 Management approach for sustainability/ESG topics",
        subLabel: "Add statement about company’s approach for sustainability",
        type: "textarea",
        content: approach_for_sustainability,
        field: "approach_for_sustainability",
        isSkipped: false,
      },
      sustainability_goals: {
        page: "screen_ten",
        label: "10.2 Company’s Sustainability Goals",
        subLabel: "Add statement about company’s sustainability goals",
        type: "textarea",
        content: sustainability_goals,
        field: "sustainability_goals",
        isSkipped: false,
      },
      approach_to_supply_chain_sustainability: {
        page: "screen_ten",
        label: "10.3 Supply Chain Sustainability",
        subLabel:
          "Add statement about company’s approach to supply chain sustainability",
        type: "textarea",
        content: approach_to_supply_chain_sustainability,
        field: "approach_to_supply_chain_sustainability",
        isSkipped: false,
      },
    };

    const url = `${process.env.BACKEND_API_URL}/esg_report/screen_ten/${reportid}/`;
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
    dispatch(setCompanyStatement(""));
    dispatch(setApproachSustainability(""));
    dispatch(setSustainabilityGoals(""));
    dispatch(setSupplyChainSustainability(""));
    const url = `${process.env.BACKEND_API_URL}/esg_report/screen_ten/${reportid}/`;
    try {
      const response = await axiosInstance.get(url);
      if (response.data) {
        setData(response.data);
        dispatch(
          setCompanyStatement(
            response.data.company_sustainability_statement?.content || ""
          )
        );
        dispatch(
          setApproachSustainability(
            response.data.approach_for_sustainability?.content || ""
          )
        );
        dispatch(
          setSustainabilityGoals(
            response.data.sustainability_goals?.content || ""
          )
        );
        dispatch(
          setSupplyChainSustainability(
            response.data.approach_to_supply_chain_sustainability?.content || ""
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

  return (
    <>
      <div className="mx-2 p-2">
        <h3 className="text-[22px] text-[#344054] mb-4 text-left font-semibold">
          10. Sustainability Journey 
        </h3>
        <div className="flex gap-4">
          <div className="xl:w-[80%] md:w-[75%] lg:w-[80%]  2k:w-[80%] 4k:w-[80%] 2xl:w-[80%]  w-full">
            <Section1 orgName={orgName} />
            <Section2 section10_1Ref={section10_1Ref} />
            <Section3 section10_2Ref={section10_2Ref} />
            <Section4 section10_3Ref={section10_3Ref} />
            <Section5 section10_3_1Ref={section10_3_1Ref} data={data} />
            <Section6 section10_3_2Ref={section10_3_2Ref} data={data} />
            <Section7 section10_3_3Ref={section10_3_3Ref} data={data} />
          </div>
          {/* page sidebar */}

          <div className="p-4 border border-r-2 border-b-2 shadow-lg rounded-lg h-[500px] top-20 sticky mt-2 w-[20%] md:w-[25%] lg:w-[20%] xl:sticky xl:top-36 lg:sticky lg:top-36  md:fixed 
  md:top-[19rem]
  md:right-4  hidden xl:block md:block lg:block 2k:block 4k:block 2xl:block">
            <p className="text-[11px] text-[#727272] mb-2 uppercase">
              10. Sustainability Journey 
            </p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section10_1" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section10_1Ref, "section10_1")}
            >
              10.1.Management approach for sustainability/ESG topics
            </p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section10_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section10_2Ref, "section10_2")}
            >
              10.2. Company's Sustainability 
            </p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section10_3" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section10_3Ref, "section10_3")}
            >
              10.3 Supply Chain Sustainability
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section10_3_1" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section10_3_1Ref, "section10_3_1")}
            >
              10.3.1. Management of material topic 
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section10_3_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section10_3_2Ref, "section10_3_2")}
            >
              10.3.2. Local Suppliers
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section10_3_3" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section10_3_3Ref, "section10_3_3")}
            >
              10.3.3. Negative environmental & social impacts in the supply
              chain
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

export default SustainibilityJourney;
