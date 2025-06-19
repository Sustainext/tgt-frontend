"use client";
import {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import axiosInstance from "../../../../utils/axiosMiddleware";
import {
  setAboutReportDescription,
  selectAboutReport,
} from "../../../../../lib/redux/features/TCFDSlice/tcfdslice";

// Import sections
import Section1 from "./sections/section1";
import Section2 from "./sections/section2";

const AboutTheReport = forwardRef(({ onSubmitSuccess }, ref) => {
  const dispatch = useDispatch();
  const aboutReport = useSelector(selectAboutReport);
  
  const orgName =
    typeof window !== "undefined" ? localStorage.getItem("reportorgname") : "";
  const reportid =
    typeof window !== "undefined" ? localStorage.getItem("reportid") : "";
  
  const apiCalledRef = useRef(false);
  const [data, setData] = useState("");
  const [loopen, setLoOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("section2_1");

  // Section refs for navigation
  const section2_1Ref = useRef(null);
  const section2_2Ref = useRef(null);

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
      description: {
        page: "about_report",
        label: "2. About the Report",
        subLabel: "Overview of TCFD and Purpose",
        type: "textarea",
        content: aboutReport.description,
        field: "description",
        isSkipped: false,
      },
    };

    const url = `${process.env.BACKEND_API_URL}/tcfd_report/about_report/${reportid}/`;
    try {
      const response = await axiosInstance.put(url, data);

      if (response.status === 200) {
        if (type === "next") {
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
    dispatch(setAboutReportDescription(""));
    
    const url = `${process.env.BACKEND_API_URL}/tcfd_report/about_report/${reportid}/`;
    try {
      const response = await axiosInstance.get(url);
      if (response.data) {
        setData(response.data);
        dispatch(setAboutReportDescription(response.data.description?.content || ""));
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

    window.scrollTo({
      top: elementTop - 100,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="mx-2 p-2">
        <h3 className="text-[22px] text-[#344054] mb-4 text-left font-semibold">
          2. About the Report
        </h3>
        <div className="flex gap-4">
          <div className="xl:w-[80%] md:w-[75%] lg:w-[80%] 2k:w-[80%] 4k:w-[80%] 2xl:w-[80%] w-full">
            <Section1
              section2_1Ref={section2_1Ref}
              data={data}
              orgName={orgName}
            />
            <Section2
              section2_2Ref={section2_2Ref}
              data={data}
            />
          </div>

          {/* Page sidebar */}
          {/* <div className="p-4 border border-r-2 border-b-2 shadow-lg rounded-lg h-[500px] top-20 sticky mt-2 w-[20%] md:w-[25%] lg:w-[20%] xl:sticky xl:top-36 lg:sticky lg:top-36 md:fixed md:top-[19rem] md:right-4 hidden xl:block md:block lg:block 2k:block 4k:block 2xl:block">
            <p className="text-[11px] text-[#727272] mb-2 uppercase">
              2. About The Report
            </p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section2_1" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section2_1Ref, "section2_1")}
            >
              2.1 Overview of TCFD
            </p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section2_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section2_2Ref, "section2_2")}
            >
              2.2 Purpose
            </p>
          </div> */}
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

AboutTheReport.displayName = "AboutTheReport";

export default AboutTheReport;