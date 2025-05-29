"use client";
import {
  createRef,
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

const Companyoperations = forwardRef(({ onSubmitSuccess, subsections, sectionOrder = 2 }, ref) => {
  console.log("CompanyOperations received subsections:", subsections);
  console.log("CompanyOperations received sectionOrder:", sectionOrder);
  
  // Handle both array and object formats for subsections
  const processedSubsections = Array.isArray(subsections) ? subsections : (subsections || []);
  
  const reportid =
    typeof window !== "undefined" ? localStorage.getItem("reportid") : "";
  const orgName =
    typeof window !== "undefined" ? localStorage.getItem("reportorgname") : "";
  
  const [activeSection, setActiveSection] = useState("");
  const [screenTwoData, setScreentwoData] = useState("");
  const [loopen, setLoOpen] = useState(false);
  const apiCalledRef = useRef(false);
  const [isScrolling, setIsScrolling] = useState(false);
  
  // Dynamic refs based on subsections
  const sectionRefs = useRef({});
  
  const about_the_company = useSelector(
    (state) => state.screen2Slice.about_the_company
  );
  const business_relations = useSelector(
    (state) => state.screen2Slice.business_relations
  );
  const entities_included = useSelector(
    (state) => state.screen2Slice.entities_included
  );
  const supply_chain_description = useSelector(
    (state) => state.screen2Slice.supply_chain_description
  );
  const dispatch = useDispatch();

  // Map subsection IDs to their corresponding components and data
  const subsectionMapping = {
    business_model: {
      component: Section1,
      title: "About the Company",
      subSections: []
    },
    value_chain: {
      component: Section2,
      title: "Business Model and Impact",
      subTitle: "Activities, Value Chain, and Other Business Relationships",
      subSections: []
    },
    excluded_entities: {
      component: Section3,
      title: "Business Model and Impact", 
      subTitle: "Entities Included in the Organization's Sustainability Reporting",
      subSections: []
    },
    supply_chain: {
      component: Section4,
      title: "Supply Chain",
      subSections: []
    }
  };

  // Filter and organize selected subsections
  const getSelectedSubsections = () => {
    console.log("Processing subsections:", processedSubsections);
    
    if (!processedSubsections || processedSubsections.length === 0) {
      console.log("No subsections found");
      return [];
    }
    
    const result = processedSubsections
      .filter(subId => {
        const exists = subsectionMapping[subId];
        console.log(`Subsection ${subId} exists in mapping:`, !!exists);
        return exists;
      })
      .map((subId, index) => {
        const mapped = {
          id: subId,
          ...subsectionMapping[subId],
          order: index + 1,
          sectionNumber: `${sectionOrder}.${index + 1}`
        };
        console.log(`Mapped subsection:`, mapped);
        return mapped;
      });
    
    console.log("Final selected subsections:", result);
    return result;
  };

  const selectedSubsections = getSelectedSubsections();

  // Set initial active section
  useEffect(() => {
    if (selectedSubsections.length > 0 && !activeSection) {
      setActiveSection(selectedSubsections[0].id);
    }
  }, [selectedSubsections, activeSection]);

  useImperativeHandle(ref, () => ({
    submitForm,
  }));

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const sectionRef = sectionRefs.current[sectionId];
    
    if (sectionRef?.current) {
      const elementTop = sectionRef.current.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementTop - 250,
        behavior: "smooth",
      });
    }
  };

  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };

  const submitForm = async (type) => {
    LoaderOpen();
    
    // Only submit data for selected subsections
    const data = {};
    
    if (processedSubsections.includes('business_model')) {
      data.about_the_company = {
        page: "screen_two",
        label: `${sectionOrder}. About the company and operations`,
        subLabel: "Add statement about stakeholder engagement",
        type: "richTextarea",
        content: about_the_company,
        field: "about_the_company",
        isSkipped: false,
      };
    }

    if (processedSubsections.includes('value_chain')) {
      data.business_relations = {
        page: "screen_two",
        label: `${sectionOrder}.1.1 Activities, Value Chain, and Other Business Relationships`,
        subLabel: "Add Introduction about company's domain",
        type: "richTextarea",
        content: business_relations,
        field: "business_relations",
        isSkipped: false,
      };
    }

    if (processedSubsections.includes('excluded_entities')) {
      data.entities_included = {
        page: "screen_two",
        label: `${sectionOrder}.1.2 Entities Included in the Organization's Sustainability Reporting`,
        subLabel: "Add statement about sustainability performance data for all entities",
        type: "richTextarea",
        content: entities_included,
        field: "entities_included",
        isSkipped: false,
      };
    }

    if (processedSubsections.includes('supply_chain')) {
      data.supply_chain_description = {
        page: "screen_two",
        label: `${sectionOrder}.2 Supply Chain`,
        subLabel: "Add statement about company's supply chain process",
        type: "richTextarea",
        content: supply_chain_description,
        field: "supply_chain_description",
        isSkipped: false,
      };
    }

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
    dispatch(setAboutTheCompany(""));
    dispatch(setBusinessRelation(""));
    dispatch(setEntitiesInclude(""));
    dispatch(setSupplyChain(""));
    
    const url = `${process.env.BACKEND_API_URL}/esg_report/screen_two/${reportid}/`;
    try {
      const response = await axiosInstance.get(url);
      if (response.data) {
        setScreentwoData(response.data);
        dispatch(setAboutTheCompany(response.data.about_the_company?.content || ""));
        dispatch(setBusinessRelation(response.data.business_relations?.content || ""));
        dispatch(setEntitiesInclude(response.data.entities_included?.content || ""));
        dispatch(setSupplyChain(response.data.supply_chain_description?.content || ""));
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

  // Create refs for each selected subsection
  useEffect(() => {
    selectedSubsections.forEach(section => {
      if (!sectionRefs.current[section.id]) {
        sectionRefs.current[section.id] = createRef();
      }
    });
  }, [selectedSubsections]);

  const renderSection = (section) => {
    const SectionComponent = section.component;
    const ref = sectionRefs.current[section.id] || createRef();
    sectionRefs.current[section.id] = ref;

    const commonProps = {
      orgName,
      data: screenTwoData,
      sectionNumber: section.sectionNumber,
      sectionOrder
    };

    switch (section.id) {
      case 'business_model':
        return (
          <div key={section.id} ref={ref}>
            <SectionComponent {...commonProps} />
          </div>
        );
      case 'value_chain':
        return (
          <div key={section.id} ref={ref}>
            <div className="mb-2">
              <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
                {sectionOrder}.1 {section.title}
              </h3>
            </div>
            <SectionComponent 
              {...commonProps}
              section2_1Ref={ref}
              section2_1_1Ref={ref}
              sectionTitle={section.subTitle}
              sectionNumber={`${sectionOrder}.1.1`}
            />
          </div>
        );
      case 'excluded_entities':
        return (
          <div key={section.id} ref={ref}>
            <SectionComponent 
              {...commonProps}
              section2_1_2Ref={ref}
              sectionTitle={section.subTitle}
              sectionNumber={`${sectionOrder}.1.2`}
            />
          </div>
        );
      case 'supply_chain':
        return (
          <div key={section.id} ref={ref}>
            <div>
              <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
                {sectionOrder}.2 {section.title}
              </h3>
            </div>
            <SectionComponent 
              {...commonProps}
              section2_2Ref={ref}
              sectionNumber={`${sectionOrder}.2`}
            />
          </div>
        );
      default:
        return null;
    }
  };

  console.log("Final check - selectedSubsections:", selectedSubsections);

  if (!selectedSubsections || selectedSubsections.length === 0) {
    return (
      <div className="mx-2 p-2">
        <div>
          <h3 className="text-[22px] text-[#344054] mb-4 text-left font-semibold">
            {sectionOrder}. About the company and operations
          </h3>
        </div>
        <div className="p-4 border border-yellow-300 bg-yellow-50 rounded">
          <p className="text-yellow-800 font-medium">No subsections selected for this section.</p>
          <p className="text-yellow-600 text-sm mt-2">
            Available subsections: {Object.keys(subsectionMapping).join(', ')}
          </p>
          <p className="text-yellow-600 text-sm">
            Received subsections: {JSON.stringify(processedSubsections)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mx-2 p-2">
        <div>
          <h3 className="text-[22px] text-[#344054] mb-4 text-left font-semibold">
            {sectionOrder}. About the company and operations
          </h3>
        </div>
        <div className="flex gap-4">
          <div className="xl:w-[80%] md:w-[75%] lg:w-[80%] 2k:w-[80%] 4k:w-[80%] 2xl:w-[80%] w-full">
            {selectedSubsections.map(section => renderSection(section))}
          </div>

          {/* Page sidebar */}
          <div className="p-4 border border-r-2 border-b-2 shadow-lg rounded-lg h-[500px] top-36 sticky mt-2 w-[20%] md:w-[25%] lg:w-[20%] xl:sticky xl:top-36 lg:sticky lg:top-36 md:fixed md:top-[19rem] md:right-4 hidden xl:block md:block lg:block 2k:block 4k:block 2xl:block">
            <p className="text-[11px] text-[#727272] mb-2 uppercase">
              {sectionOrder}. About the company and operations
            </p>
            
            {selectedSubsections.map((section, index) => {
              let displayTitle = section.title;
              let sectionNum = section.sectionNumber;

              // Handle special cases for nested sections
              if (section.id === 'value_chain') {
                displayTitle = `${sectionOrder}.1 Business Model and Impact`;
                return (
                  <div key={section.id}>
                    <p
                      className={`text-[12px] mb-2 cursor-pointer ${
                        activeSection === section.id ? "text-blue-400" : ""
                      }`}
                      onClick={() => scrollToSection(section.id)}
                    >
                      {displayTitle}
                    </p>
                    <p
                      className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                        activeSection === section.id ? "text-blue-400" : ""
                      }`}
                      onClick={() => scrollToSection(section.id)}
                    >
                      {sectionOrder}.1.1 Activities, Value Chain, and Other Business Relationships
                    </p>
                  </div>
                );
              } else if (section.id === 'excluded_entities') {
                return (
                  <p
                    key={section.id}
                    className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                      activeSection === section.id ? "text-blue-400" : ""
                    }`}
                    onClick={() => scrollToSection(section.id)}
                  >
                    {sectionOrder}.1.2 Entities Included in the Organization's Sustainability Reporting
                  </p>
                );
              } else if (section.id === 'supply_chain') {
                displayTitle = `${sectionOrder}.2 ${section.title}`;
              }

              return (
                <p
                  key={section.id}
                  className={`text-[12px] mb-2 cursor-pointer ${
                    activeSection === section.id ? "text-blue-400" : ""
                  }`}
                  onClick={() => scrollToSection(section.id)}
                >
                  {section.id !== 'excluded_entities' ? displayTitle : section.subTitle}
                </p>
              );
            })}
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