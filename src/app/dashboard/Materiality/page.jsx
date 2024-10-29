"use client";
import React, { useState, useEffect } from "react";
import NoAssesment from "./components/noAssesment";
import NewMaterialityAssement from "./modals/newMaterialityAssesment";
import DataTable from "./components/dataTable";
import { MdAdd } from "react-icons/md";
import axiosInstance from "../../utils/axiosMiddleware";
import { Oval } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  setHeadertext1,
  setHeadertext2,
  setHeaderdisplay
} from "../../../lib/redux/features/topheaderSlice";
import { useDispatch } from "react-redux";
const Materiality = ({ open }) => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loopen, setLoOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // New loading state
  const dispatch = useDispatch();
  useEffect(() => {
   
    dispatch(setHeadertext1(""));
    dispatch(setHeaderdisplay("none"));
    dispatch(setHeadertext2('Materiality Dashboard'));
}, [dispatch]);
  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };

  const fetchDetails = async () => {
    // LoaderOpen();
    setIsLoading(true); // Set loading to true when fetching data
    const url = `${process.env.BACKEND_API_URL}/materiality_dashboard/get-materiality-assessments-dashboard/`;
    try {
      const response = await axiosInstance.get(url);
      if (response.status === 200) {
        const convertedData = response.data.map((item) => ({
          id: item.id,
          organization: item.organization_name,
          corporate: item.corporate_name?item.corporate_name:'',
          type: item.framework_name,
          timePeriod: `${new Date(item.start_date).toLocaleString("default", {
            month: "short",
            year: "numeric",
          })} to ${new Date(item.end_date).toLocaleString("default", {
            month: "short",
            year: "numeric",
          })}`,
          enviromentTopics: item.environment_topics,
          socialTopics: item.social_topics,
          governanceTopics: item.governance_topics,
          status:
            item.status.replace("_", "").charAt(0).toUpperCase() +
            item.status.slice(1),
        }));
        setData(convertedData);
        LoaderClose();
      } else {
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
    } finally {
      setIsLoading(false); // Set loading to false when data fetch is complete
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [refresh]);



  return (
    <>
      <div className="flex flex-col justify-start overflow-x-hidden ">
        <div className="flex justify-between items-center border-b border-gray-200 mb-5 w-full">
          <div className="w-full">
           <div className="text-left mb-2 ml-3 pt-5">
              <div className="flex">
                <div>
                  <p className="gradient-text text-[22px] font-bold pt-4 pb-4 ml-3">
                    Materiality Dashboard
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-5 mx-4">
        <div className="border border-gray-200 mb-5 w-full rounded-md">
          <div className="flex justify-between items-center w-full border-b border-gray-200 pb-5">
            <div>
              <p className="text-[18px] font-bold pt-5 px-5">
                Materiality Assessments
              </p>
              <p className="text-[14px] text-gray-500 px-5 pt-1">
                All the materiality assessments made for the organizations.
              </p>
            </div>
            {/* button */}
            <div className="pt-5 px-5 flex gap-[4px]">
              <button
                className="text-[#007EEF] text-[14px] font-bold"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                New Materiality Assessment
              </button>
              <span className="text-[#007EEF] text-[20px] font-bold mb-1">
                <MdAdd />
              </span>
            </div>
          </div>
          {/* main section */}
          {isLoading ? (
            // Show the loader while data is being fetched
            <div className="flex justify-center items-center py-10">
              <Oval
                height={50}
                width={50}
                color="#00BFFF"
                secondaryColor="#f3f3f3"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            </div>
          ) : data.length > 0 ? (
            // Render DataTable if data is available
            <DataTable data={data} setRefresh={setRefresh} refresh={refresh} />
          ) : (
            // Render NoAssesment if no data is found
            <NoAssesment
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          )}
        </div>
      </div>
      <NewMaterialityAssement
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        existingData={data}
      />

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
      
      <ToastContainer style={{marginRight:'50px'}}  />
    </>
  );
};

export default Materiality;
