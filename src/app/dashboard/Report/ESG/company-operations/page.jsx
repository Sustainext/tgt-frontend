"use client";
import { forwardRef, useImperativeHandle, useState, useRef, useEffect } from "react";
import Section1 from './sections/section1'
import Section2 from  './sections/section2'
import Section3 from  './sections/section3'

const Companyoperations= forwardRef(({ onSubmitSuccess }, ref) => 
  {
  const orgName= typeof window !== "undefined" ? localStorage.getItem("reportorgname") : "";
    const [activeSection, setActiveSection] = useState('section2_1');
    const [loopen, setLoOpen] = useState(false);
    const apiCalledRef = useRef(false);
    const [isScrolling, setIsScrolling] = useState(false); 
    const section2_1Ref = useRef(null);
    const section2_1_1Ref = useRef(null);
    const section2_1_2Ref = useRef(null);
    const section2_2Ref = useRef(null);

    useImperativeHandle(ref, () => ({
      submitForm
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
    
      const elementTop = sectionRef.current?.getBoundingClientRect().top + window.pageYOffset;
    
      window.scrollTo({
        top: elementTop - 250,
        behavior: 'smooth',
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



//   const LoaderOpen = () => {
//     setLoOpen(true);
//   };

//   const LoaderClose = () => {
//     setLoOpen(false);
//   };
// const submitForm = async () => {
//     LoaderOpen();
//     const formData = new FormData();
//     formData.append('message', content);
//     formData.append('message_image', imageceo); // If imageceo is a file, this will work
//     formData.append('ceo_name', ceoname);
//     formData.append('company_name', companyName);
//     formData.append('signature_image', imagesing); // If signature_image is also a file

//     const url = `${process.env.BACKEND_API_URL}/esg_report/screen_one/${reportid}/`;

//     try {
//         const response = await axiosInstance.put(url, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data', // Ensure multipart request
//             },
//         });

//         if (response.status === 200) {
//             toast.success("Data added successfully", {
//                 position: "top-right",
//                 autoClose: 3000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "light",
//             });
//             if (onSubmitSuccess) {
//                 onSubmitSuccess(true); // Notify the parent of successful submission
//             }
//             LoaderClose();
//             return true; 
        
//         } else {
//             toast.error("Oops, something went wrong", {
//                 position: "top-right",
//                 autoClose: 1000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "colored",
//             });
//             LoaderClose();
//             return false; 
           
//         }
//     } catch (error) {
//         toast.error("Oops, something went wrong", {
//             position: "top-right",
//             autoClose: 1000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "colored",
//         });
//         return false; // Indicate failure
//     }
// };

// const loadFormData = async () => {
//     LoaderOpen();
//     const url = `${process.env.BACKEND_API_URL}/esg_report/screen_one/${reportid}/`;
//     try {
//         const response = await axiosInstance.get(url);
//         dispatch(setMessage(response.data.message));
//         dispatch(setMessageimage(response.data.message_image));
//         dispatch(setCompanyname(response.data.company_name));
//         dispatch(setCeoname(response.data.ceo_name));
//         dispatch(setSignatureimage(response.data.signature_image));
//         console.log('API called successfully:', response.data);
//         LoaderClose();
    
//     } catch (error) {
//         console.error('API call failed:', error);
//         LoaderClose();
//     }
// };

// useEffect(() => {
//   // Ensure API is only called once
//   if (!apiCalledRef.current && reportid) {
//       apiCalledRef.current = true;  // Set the flag to true to prevent future calls
//       loadFormData();  // Call the API only once
//   }
// }, [reportid]);

  return (
    <>
      <div className="mx-2 p-2">
      <div>
              <h3 className="text-[22px] text-[#344054] mb-4 text-left font-semibold">
                2. About the company and operations
              </h3>
            </div>
        <div className="flex gap-4">
          <div className="w-[80%]">
            <Section1 orgName={orgName}/>
            <Section2 orgName={orgName} section2_1Ref={section2_1Ref} section2_1_1Ref={section2_1_1Ref} section2_1_2Ref={section2_1_2Ref} />
            <Section3 orgName={orgName} section2_2Ref={section2_2Ref}/>
          </div>
          {/* page sidebar */}
          <div className="p-4 border border-r-2 border-b-2 shadow-lg rounded-lg h-[500px] top-36 sticky mt-2 w-[20%]">
            <p className="text-[11px] text-[#727272] mb-2 uppercase">About the company and operations</p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === 'section2_1' ? 'text-blue-400' : ''
              }`}
              onClick={() => scrollToSection(section2_1Ref, 'section2_1')}
            >
              2.1 Business Model and Impact 
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === 'section2_1_1' ? 'text-blue-400' : ''
              }`}
              onClick={() => scrollToSection(section2_1_1Ref, 'section2_1_1')}
            >
             2.1.1 Activities, Value Chain, and Other Business Relationships
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === 'section2_1_2' ? 'text-blue-400' : ''
              }`}
              onClick={() => scrollToSection(section2_1_2Ref, 'section2_1_2')}
            >
              2.1.2 Entities Included in the Organization's Sustainability Reporting
            </p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === 'section2_2' ? 'text-blue-400' : ''
              }`}
              onClick={() => scrollToSection(section2_2Ref, 'section2_2')}
            >
              2.2 Supply Chain
            </p>
          </div>
        </div>
        <ToastContainer />
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
}
)

export default Companyoperations;
