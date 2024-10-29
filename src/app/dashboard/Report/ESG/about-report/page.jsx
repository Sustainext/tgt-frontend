'use client'
import {forwardRef, useImperativeHandle, useState, useRef, useEffect } from "react";
import Section1 from "./sections/section1";
import Section2 from "./sections/section2";
import Section3 from "./sections/section3";
import Section4 from "./sections/section4";
import axiosInstance,{patch} from "../../../../utils/axiosMiddleware";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";
import {setAboutReport,setFramework,setExternalAssurance} from "../../../../../lib/redux/features/ESGSlice/screen7Slice"

const AboutTheReport=forwardRef(({ onSubmitSuccess }, ref) => {

  const orgName = typeof window !== "undefined" ? localStorage.getItem("reportorgname") : "";
  const reportid = typeof window !== "undefined" ? localStorage.getItem("reportid") : "";
  const apiCalledRef = useRef(false);
  const [data,setData]=useState("")
  const [loopen, setLoOpen] = useState(false);
  const description = useSelector((state) => state.screen7Slice.aboutReport);
  const framework_description = useSelector((state) => state.screen7Slice.framework);
  const external_assurance = useSelector((state) => state.screen7Slice.externalAssurance);
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
        "description":description,
        "framework_description":framework_description,
        "external_assurance":external_assurance
      }
  
      const url = `${process.env.BACKEND_API_URL}/esg_report/screen_seven/${reportid}/`;
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
      dispatch(setAboutReport(''));
      dispatch(setFramework(''));
      dispatch(setExternalAssurance(''));
      const url = `${process.env.BACKEND_API_URL}/esg_report/screen_seven/${reportid}/`;
      try {
          const response = await axiosInstance.get(url);
          if(response.data){
            setData(response.data)
            dispatch(setAboutReport(response.data.description));
          dispatch(setFramework(response.data.framework_description));
          dispatch(setExternalAssurance(response.data.external_assurance));
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
    
    const [activeSection, setActiveSection] = useState('section7_1');
    const section7_1Ref = useRef(null);
  const section7_1_1Ref = useRef(null);
  const section7_2Ref = useRef(null);
  const section7_3Ref = useRef(null);

 


const scrollToSection = (sectionRef, sectionId) => {
    setActiveSection(sectionId); 
  
    const elementTop = sectionRef.current?.getBoundingClientRect().top + window.scrollY;
  
    // Scroll smoothly to the section, ensuring it scrolls up as well
    window.scrollTo({
      top: elementTop - 100, // Adjust 100 to the height of any sticky header
      behavior: 'smooth',
    });
  };

  

    return (
        <>
        <div className="mx-2 p-2">
            <h3 className="text-[22px] text-[#344054] mb-4 text-left font-semibold">
                7. About the Report
            </h3>
            <div className="flex gap-4">
            <div className="w-[80%]">
            <Section1 section7_1Ref={section7_1Ref} data={data} orgName={orgName} />
            <Section2 section7_1_1Ref={section7_1_1Ref} data={data} />
            <Section3 section7_2Ref={section7_2Ref} data={data} />
            <Section4 section7_3Ref={section7_3Ref} data={data} />
       

       

        
        

       
            </div>
            {/* page sidebar */}
           

<div className="p-4 border border-r-2 border-b-2 shadow-lg rounded-lg h-[500px] top-36 sticky mt-2 w-[20%]">
            <p className="text-[11px] text-[#727272] mb-2 uppercase">7. About The Report</p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === 'section7_1' ? 'text-blue-400' : ''
              }`}
              onClick={() => scrollToSection(section7_1Ref, 'section7_1')}
            >
              7.1 Reporting period, frequency and point of contact
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === 'section7_1_1' ? 'text-blue-400' : ''
              }`}
              onClick={() => scrollToSection(section7_1_1Ref, 'section7_1_1')}
            >
              7.1.1 Restatement of information
            </p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === 'section7_2' ? 'text-blue-400' : ''
              }`}
              onClick={() => scrollToSection(section7_2Ref, 'section7_2')}
            >
              7.2 Frameworks
            </p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === 'section7_3' ? 'text-blue-400' : ''
              }`}
              onClick={() => scrollToSection(section7_3Ref, 'section7_3')}
            >
              7.3 External Assurance
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
    )
})

export default AboutTheReport