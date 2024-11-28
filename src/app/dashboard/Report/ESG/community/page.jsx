"use client";
import {forwardRef, useImperativeHandle, useState, useRef, useEffect } from "react";
import Section1 from "./sections/section1";
import Section2 from "./sections/section2";
import Section3 from "./sections/section3";
import axiosInstance,{patch} from "../../../../utils/axiosMiddleware";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";
import { setCommunityEngagementStatement,
  setImpactAssessment,
  setCSRStatement} from "../../../../../lib/redux/features/ESGSlice/screen14Slice"


const Community = forwardRef(({ onSubmitSuccess }, ref) => {
  const [activeSection, setActiveSection] = useState("section14_1");
  const section14_1Ref = useRef(null);
  const section14_1_1Ref = useRef(null);
  const section14_2Ref = useRef(null);


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

  const orgName = typeof window !== "undefined" ? localStorage.getItem("reportorgname") : "";
  const reportid = typeof window !== "undefined" ? localStorage.getItem("reportid") : "";
  const apiCalledRef = useRef(false);
  const [data,setData]=useState("")
  const [loopen, setLoOpen] = useState(false);
  const community_engagement_statement = useSelector((state) => state.screen14Slice.community_engagement_statement);
  const impact_assessment = useSelector((state) => state.screen14Slice.impact_assessment);
  const csr_statement = useSelector((state) => state.screen14Slice.csr_statement);

  const dispatch = useDispatch()

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
      const data={
       "community_engagement": {"page":"screen_fourteen","label":"14.1 Community Engagement","subLabel":"Add statement about company’s community engagement","type":"textarea","content":community_engagement_statement,field:"community_engagement_statement",isSkipped:false} ,
    "impact_assessment": {"page":"screen_fourteen","label":"Impact Assessment","subLabel":"","type":"textarea","content":impact_assessment,field:"impact_assessment",isSkipped:false},
    "csr_policies": {"page":"screen_fourteen","label":"14.2 CSR","subLabel":"Add statement about company’s Corporate Social Responsibility policies","type":"richTextarea","content":csr_statement,field:"csr_statement",isSkipped:false},
      }
  
      const url = `${process.env.BACKEND_API_URL}/esg_report/screen_fourteen/${reportid}/`;
      try {
          const response = await axiosInstance.put(url, data);
  
          if (response.status === 200) {
              if(type=='next'){
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
      dispatch(setCommunityEngagementStatement(''));
      dispatch(setImpactAssessment(''));
      dispatch(setCSRStatement(''));
      const url = `${process.env.BACKEND_API_URL}/esg_report/screen_fourteen/${reportid}/`;
      try {
          const response = await axiosInstance.get(url);
          if(response.data){
            setData(response.data)
            dispatch(setCommunityEngagementStatement(response.data.community_engagement.content));
          dispatch(setImpactAssessment(response.data.impact_assessment.content));
          dispatch(setCSRStatement(response.data.csr_policies.content));
          }
          
          LoaderClose();
      
      } catch (error) {
          console.error('API call failed:', error);
          LoaderClose();
      }
  };
  
  useEffect(() => {
    // Ensure API is only called once
    if (!apiCalledRef.current && reportid) {
        apiCalledRef.current = true;  // Set the flag to true to prevent future calls
        loadFormData();  // Call the API only once
    }
  }, [reportid]);

  return (
    <>
      <div className="mx-2 p-2">
        <h3 className="text-[22px] text-[#344054] mb-4 text-left font-semibold">
        14. Community 
        </h3>
        <div className="flex gap-4">
          <div className="w-[80%]">
            <Section1 section14_1Ref={section14_1Ref} data={data}/>
            <Section2  section14_1_1Ref={section14_1_1Ref} data={data} />
            <Section3 section14_2Ref={section14_2Ref} data={data} />
        
      
          </div>
          {/* page sidebar */}

          <div className="p-4 border border-r-2 border-b-2 shadow-lg rounded-lg h-[550px] top-36 sticky mt-2 w-[20%]">
            <p className="text-[11px] text-[#727272] mb-2 uppercase">
            14. Community
            </p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section14_1" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section14_1Ref, "section14_1")}
            >
              14.1.  Management of material topics
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section14_1_1" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section14_1_1Ref, "section14_1_1")}
            >
             14.1.1  Management of material topic
            </p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section14_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section14_2Ref, "section14_2")}
            >
              14.2 CSR  
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

export default Community;
