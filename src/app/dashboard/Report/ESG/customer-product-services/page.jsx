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
import axiosInstance, { patch } from "../../../../utils/axiosMiddleware";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";
import {
  setCommitmentStatement,
  setProductInfo,
  setMarketingPractices,
  setConclusion,
  setCustomers
} from "../../../../../lib/redux/features/ESGSlice/screen15Slice";

const CustomerProductService = forwardRef(({ onSubmitSuccess,reportType,hasChanges }, ref) => {
  const [activeSection, setActiveSection] = useState("section15_1");
  const [initialData, setInitialData] = useState({});
  const section15_1Ref = useRef(null);
  const section15_1_1Ref = useRef(null);
  const section15_1_2Ref = useRef(null);
  const section15_1_3Ref = useRef(null);
  const section15_2Ref = useRef(null);
  const section15_2_1Ref = useRef(null);
  const section15_2_2Ref = useRef(null);
  const section15_3Ref = useRef(null);
  const section15_3_1Ref = useRef(null);

  // Function to scroll to the section
  //   const scrollToSection = (sectionRef,sectionId) => {
  //     setActiveSection(sectionId);
  //     sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  //   };

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
  const commitment_statement = useSelector(
    (state) => state.screen15Slice.commitment_statement
  );
  const product_info_labelling = useSelector(
    (state) => state.screen15Slice.product_info_labelling
  );
  const marketing_practices = useSelector(
    (state) => state.screen15Slice.marketing_practices
  );
  const conclusion = useSelector((state) => state.screen15Slice.conclusion);
  const customers = useSelector((state) => state.screen15Slice.customers);

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
    commitment_statement,
    product_info_labelling,
    marketing_practices,
    conclusion,
    customers
  }
  const submitForm = async (type) => {
    LoaderOpen();
    if (!hasChanges(initialData, currentData)) {
      LoaderClose();
      return false;
    }
    const data = {
      commitment_statement: {
        page: "screen_fifteen",
        label: "15.1 Products and Services",
        subLabel:
          "Add statement about company’s commitment to products and services",
        type: "textarea",
        content: commitment_statement,
        field: "commitment_statement",
        isSkipped: false,
      },
      product_info_labelling: {
        page: "screen_fifteen",
        label: "15.2 Product and Service Information and Labelling",
        subLabel:
          "Add statement about company’s product and service information and labelling",
        type: "textarea",
        content: product_info_labelling,
        field: "product_info_labelling",
        isSkipped: false,
      },
      marketing_practices: {
        page: "screen_fifteen",
        label: "15.2.2 Marketing",
        subLabel: "Add statement about company’s marketing practices",
        type: "textarea",
        content: marketing_practices,
        field: "marketing_practices",
        isSkipped: false,
      },
      conclusion: {
        page: "screen_fifteen",
        label: "Conclusion",
        subLabel: "Add a conclusion to the report",
        type: "richTextarea",
        content: conclusion,
        field: "conclusion",
        isSkipped: false,
      },
      customers: {
        page: "screen_fifteen",
        label: "Customers",
        subLabel: "Add statement about customers",
        type: "textarea",
        content: customers,
        field: "customers",
        isSkipped: false,
      },
    };

    const url = `${process.env.BACKEND_API_URL}/esg_report/screen_fifteen/${reportid}/`;
    try {
      const response = await axiosInstance.put(url, data);

      if (response.status === 200) {
        if (type == "last") {
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
    dispatch(setCommitmentStatement(""));
    dispatch(setProductInfo(""));
    dispatch(setMarketingPractices(""));
    dispatch(setConclusion(""));
    dispatch(setCustomers(""));
    const url = `${process.env.BACKEND_API_URL}/esg_report/screen_fifteen/${reportid}/`;
    try {
      const response = await axiosInstance.get(url);
      if (response.data) {
        const flatData = {};
  Object.keys(response.data).forEach((key) => {
    flatData[key] = response.data[key]?.content || "";
  });

  setInitialData(flatData);
        setData(response.data);
        dispatch(
          setCommitmentStatement(
            response.data.commitment_statement?.content || ""
          )
        );
        dispatch(
          setProductInfo(response.data.product_info_labelling?.content || "")
        );
        dispatch(
          setMarketingPractices(
            response.data.marketing_practices?.content || ""
          )
        );
        dispatch(setConclusion(response.data.conclusion?.content || ""));
        dispatch(setCustomers(response.data.customers?.content || ""));
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
          15. Customers, Products & Services 
        </h3>
        <div className="flex gap-4">
          <div className="xl:w-[80%] md:w-[75%] lg:w-[80%]  2k:w-[80%] 4k:w-[80%] 2xl:w-[80%]  w-full">
            <Section1 section15_1Ref={section15_1Ref} data={data} />
            {reportType=='GRI Report: In accordance With' && <Section2 section15_1_1Ref={section15_1_1Ref} data={data} /> }  
            <Section3 section15_1_2Ref={section15_1_2Ref} data={data} reportType={reportType} />
            <Section4 section15_1_3Ref={section15_1_3Ref} data={data} reportType={reportType} />
            <Section5 section15_2Ref={section15_2Ref} data={data} reportType={reportType} />
            {reportType=='GRI Report: In accordance With' && <Section6 section15_2_1Ref={section15_2_1Ref} data={data} /> } 
            
            <Section7 section15_2_2Ref={section15_2_2Ref} data={data} reportType={reportType} />
            <Section8 section15_3Ref={section15_3Ref} data={data} reportType={reportType}/>
            {reportType=='GRI Report: In accordance With' && <Section9
              section15_3_1Ref={section15_3_1Ref}
              orgName={orgName}
              data={data}
            /> } 
           
            
          </div>
          {/* page sidebar */}

          <div className="p-4 border border-r-2 border-b-2 shadow-lg rounded-lg h-[550px] top-20 sticky mt-2 w-[20%] md:w-[25%] lg:w-[20%] xl:sticky xl:top-36 lg:sticky lg:top-36  md:fixed 
  md:top-[19rem]
  md:right-4  hidden xl:block md:block lg:block 2k:block 4k:block 2xl:block">
            <p className="text-[11px] text-[#727272] mb-2 uppercase">
              15. Customers, products & services 
            </p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section15_1" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section15_1Ref, "section15_1")}
            >
              15.1. Products and services 
            </p>
            {reportType=='GRI Report: In accordance With'?(
               <p
               className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                 activeSection === "section15_1_1" ? "text-blue-400" : ""
               }`}
               onClick={() => scrollToSection(section15_1_1Ref, "section15_1_1")}
             >
               15.1.1. Management of material topic
             </p>
            ):(
              <div></div>
            )}
           
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section15_1_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section15_1_2Ref, "section15_1_2")}
            >
             {reportType=='GRI Report: In accordance With'?'15.1.2.':'15.1.1.'}  Health and safety impacts of product and service
              categories
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section15_1_3" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section15_1_3Ref, "section15_1_3")}
            >
            {reportType=='GRI Report: In accordance With'?'15.1.3.':'15.1.2.'}  Incidents of non-compliance
            </p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section15_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section15_2Ref, "section15_2")}
            >
              15.2. Product and service information and labelling
            </p>
            {reportType=='GRI Report: In accordance With'?(
               <p
               className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                 activeSection === "section15_2_1" ? "text-blue-400" : ""
               }`}
               onClick={() => scrollToSection(section15_2_1Ref, "section15_2_1")}
             >
               15.2.1. Management of material topic
             </p>
            ):(
              <div></div>
            )}
           
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section15_2_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section15_2_2Ref, "section15_2_2")}
            >
             {reportType=='GRI Report: In accordance With'?'15.2.2.':'15.2.1.'} Marketing
            </p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section15_3" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section15_3Ref, "section15_3")}
            >
              15.3. Customers 
            </p>
            {reportType=='GRI Report: In accordance With'?(
               <p
               className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                 activeSection === "section15_3_1" ? "text-blue-400" : ""
               }`}
               onClick={() => scrollToSection(section15_3_1Ref, "section15_3_1")}
             >
               15.3.1. Management of material topic
             </p>
            ):(
              <div></div>
            )}
           
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

export default CustomerProductService;
