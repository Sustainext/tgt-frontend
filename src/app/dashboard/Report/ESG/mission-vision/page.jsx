'use client'
import {forwardRef, useImperativeHandle,  useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dynamic from 'next/dynamic';
import { MdDownload, MdDelete, MdKeyboardArrowDown, MdFileDownload } from "react-icons/md";
import axiosInstance,{patch} from "../../../../utils/axiosMiddleware";
import Link from 'next/link'
import { GlobalState } from "@/Context/page";
import Section1 from "./sections/section1";
import { useDispatch, useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";
import {setMission} from "../../../../../lib/redux/features/ESGSlice/screen3Slice"


const MissionVission=forwardRef(({ onSubmitSuccess }, ref) => {
    
    const orgName= typeof window !== "undefined" ? localStorage.getItem("reportorgname") : "";
    const reportid = typeof window !== "undefined" ? localStorage.getItem("reportid") : "";
    const apiCalledRef = useRef(false);
    const [loopen, setLoOpen] = useState(false);
    const mission = useSelector((state) => state.screen3Slice.mission);
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
          "mission":mission,
        }
    
        const url = `${process.env.BACKEND_API_URL}/esg_report/screen_three/${reportid}/`;
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
                toast.error("Oops, something went wrong 1", {
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
            toast.error("Oops, something went wrong 2", {
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
        dispatch(setMission(''));
        const url = `${process.env.BACKEND_API_URL}/esg_report/screen_three/${reportid}/`;
        try {
            const response = await axiosInstance.get(url);
            if(response.data){
              dispatch(setMission(response.data.mission));
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
                3. Mission, Vision, and Values
            </h3>
            <div className="flex gap-4">
            <div className="w-[80%]">
                <Section1 orgName={orgName} />
            </div>
            {/* page sidebar */}
            <div className="p-4 border border-r-2 border-b-2 shadow-lg rounded-lg h-[500px] top-36 sticky  w-[20%]">
                <p className="text-[11px] text-[#727272] mb-2">
                MISSION, VISION, AND VALUES
                </p>
                <p className="text-[12px] text-blue-400 mb-2">
                1. Mission, Vision, and Values
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

export default MissionVission