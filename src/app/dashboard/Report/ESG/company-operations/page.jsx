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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";
import axiosInstance from "../../../../utils/axiosMiddleware";
import {
  setAboutTheCompany,
  setBusinessRelation,
  setEntitiesInclude,
  setSupplyChain,
} from "../../../../../lib/redux/features/ESGSlice/screen2Slice";

const Companyoperations = forwardRef(({ onSubmitSuccess }, ref) => {
  const reportid =
    typeof window !== "undefined" ? localStorage.getItem("reportid") : "";
  const orgName =
    typeof window !== "undefined" ? localStorage.getItem("reportorgname") : "";
  const [activeSection, setActiveSection] = useState("section2_1");
  const [screenTwoData, setScreentwoData] = useState("");
  const [loopen, setLoOpen] = useState(false);
  const apiCalledRef = useRef(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const section2_1Ref = useRef(null);
  const section2_1_1Ref = useRef(null);
  const section2_1_2Ref = useRef(null);
  const section2_2Ref = useRef(null);
  const about_the_company = useSelector(
    (state) => state.screen2Slice.about_the_company
  );
  const business_relations = useSelector(
    (state) => state.screen2Slice.business_relations
  ); // Assuming imageceo is a File object
  const entities_included = useSelector(
    (state) => state.screen2Slice.entities_included
  );
  const supply_chain_description = useSelector(
    (state) => state.screen2Slice.supply_chain_description
  );
  const dispatch = useDispatch();

  useImperativeHandle(ref, () => ({
    submitForm,
  }));

  //   useEffect(() => {
  //     const handleScroll = () => {
  //         const sections = [
  //             { id: 'section2_1', ref: section2_1Ref },
  //             { id: 'section2_1_1', ref: section2_1_1Ref },
  //             { id: 'section2_1_2', ref: section2_1_2Ref },
  //             { id: 'section2_2', ref: section2_2Ref }
  //         ];

  //         const threshold = 250;

  //         for (const section of sections) {
  //             const element = section.ref.current;
  //             if (element) {
  //                 const rect = element.getBoundingClientRect();
  //                 if (rect.top <= window.innerHeight && rect.bottom >= 0) {
  //                     setActiveSection(section.id);
  //                     break;
  //                 }
  //             }
  //         }

  //     };

  //     window.addEventListener("scroll", handleScroll, { passive: true });

  //     return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  const scrollToSection = (sectionRef, sectionId) => {
    setActiveSection(sectionId);

    const elementTop =
      sectionRef.current?.getBoundingClientRect().top + window.pageYOffset;

    window.scrollTo({
      top: elementTop - 250,
      behavior: "smooth",
    });
  };

  // useEffect(() => {
  //   console.log("hhh")
  //   const handleScroll = () => {
  //     const sections = [
  //       { id: 'section2_1', ref: section2_1Ref },
  //       { id: 'section2_1_1', ref: section2_1_1Ref },
  //       { id: 'section2_1_2', ref: section2_1_2Ref },
  //       { id: 'section2_2', ref: section2_2Ref }
  //     ];

  //     let foundActiveSection = false;

  //     for (const section of sections) {
  //       const element = section.ref.current;
  //       if (element) {
  //         console.log(element,"ppp")
  //         const rect = element.getBoundingClientRect();
  //         // Check if the section is at least partially visible in the viewport
  //         if (rect.top < window.innerHeight * 0.6 && rect.bottom >= window.innerHeight * 0.2) {
  //           setActiveSection(section.id);
  //           foundActiveSection = true;
  //           break; // Stop checking other sections once the active section is found
  //         }
  //       }
  //     }

  //     // If no section is active, reset to an empty state or the first section as default
  //     // if (!foundActiveSection) {
  //     //   setActiveSection(''); // or set it to a default section id if needed
  //     // }
  //   };

  //   window.addEventListener("scroll", handleScroll, { passive: true });

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // const scrollToSection = (ref,id) => {
  //   const section = document.getElementById(id);
  //   section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  // };

  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };
  const submitForm = async (type) => {
    LoaderOpen();
    const data = {
      about_the_company: {
        page: "screen_two",
        label: "2. About the company and operations",
        subLabel: "Add statement about stakeholder engagement",
        type: "richTextarea",
        content: about_the_company,
        field: "about_the_company",
        isSkipped: false,
      },
      business_relations: {
        page: "screen_two",
        label:
          "2.1.1 Activities, Value Chain, and Other Business Relationships",
        subLabel: "Add Introduction about company’s domain",
        type: "richTextarea",
        content: business_relations,
        field: "business_relations",
        isSkipped: false,
      },
      entities_included: {
        page: "screen_two",
        label:
          "2.1.2 Entities Included in the Organization's Sustainability Reporting",
        subLabel:
          "Add statement about sustainability performance data for all entities",
        type: "richTextarea",
        content: entities_included,
        field: "entities_included",
        isSkipped: false,
      },
      supply_chain_description: {
        page: "screen_two",
        label: "2.2 Supply Chain",
        subLabel: "Add statement about company's supply chain process",
        type: "richTextarea",
        content: supply_chain_description,
        field: "supply_chain_description",
        isSkipped: false,
      },
    };

    const url = `${process.env.BACKEND_API_URL}/esg_report/screen_two/${reportid}/`;
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
    dispatch(setAboutTheCompany(""));
    dispatch(setBusinessRelation(""));
    dispatch(setEntitiesInclude(""));
    dispatch(setSupplyChain(""));
    const url = `${process.env.BACKEND_API_URL}/esg_report/screen_two/${reportid}/`;
    try {
      const response = await axiosInstance.get(url);
      if (response.data) {
        setScreentwoData(response.data);
        dispatch(
          setAboutTheCompany(response.data.about_the_company?.content || "")
        );
        dispatch(
          setBusinessRelation(response.data.business_relations?.content || "")
        );
        dispatch(
          setEntitiesInclude(response.data.entities_included?.content || "")
        );
        dispatch(
          setSupplyChain(response.data.supply_chain_description?.content || "")
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
      <div className="mx-2 p-2 ">
        <div>
          <h3 className="text-[22px] text-[#344054] mb-4 text-left font-semibold">
            2. About the company and operations
          </h3>
        </div>
        <div className="flex gap-4">
          <div className="xl:w-[80%] md:w-[80%] lg:w-[80%]  2k:w-[80%] 4k:w-[80%] 2xl:w-[80%]  w-full">
            <Section1 orgName={orgName} data={screenTwoData} />
            <Section2
              orgName={orgName}
              section2_1Ref={section2_1Ref}
              section2_1_1Ref={section2_1_1Ref}
              section2_1_2Ref={section2_1_2Ref}
              data={screenTwoData}
            />
            <Section3
              orgName={orgName}
              section2_2Ref={section2_2Ref}
              data={screenTwoData}
            />
          </div>
          {/* page sidebar */}

          <div
            className="p-4 border border-r-2 border-b-2 shadow-lg rounded-lg h-[500px] top-36 sticky mt-2 w-[20%] xl:sticky xl:top-36 lg:sticky lg:top-36  md:fixed 
  md:top-[20rem]
  md:right-4  hidden xl:block md:block lg:block 2k:block 4k:block 2xl:block "
          >
            <p className="text-[11px] text-[#727272] mb-2 uppercase">
              2. About the company and operations
            </p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section2_1" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section2_1Ref, "section2_1")}
            >
              2.1 Business Model and Impact
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section2_1_1" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section2_1_1Ref, "section2_1_1")}
            >
              2.1.1 Activities, Value Chain, and Other Business Relationships
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section2_1_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section2_1_2Ref, "section2_1_2")}
            >
              2.1.2 Entities Included in the Organization's Sustainability
              Reporting
            </p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section2_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section2_2Ref, "section2_2")}
            >
              2.2 Supply Chain
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

export default Companyoperations;
