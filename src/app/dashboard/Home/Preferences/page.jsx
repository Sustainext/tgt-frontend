"use client";
import React, { useEffect, useState, useRef } from "react";
import { AiOutlinePlus, AiOutlineEdit } from "react-icons/ai";
import { RiProgress8Fill } from "react-icons/ri";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axiosInstance from "../../../utils/axiosMiddleware";

const Preferences = () => {
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState([]);
  const [loopen, setLoOpen] = useState(false);
  const [framework, setFramework] = useState([]);
  const [regulations, setRegulations] = useState([]);
  const [targets, setTargets] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [ratings, setRatings] = useState([]);
  const isMounted = useRef(true);
  const router = useRouter();

  const handleEditToggle = () => {
    setEdit((prevEdit) => !prevEdit);
  };

  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };

  const fetchpreference = async () => {
    LoaderOpen();
    const token = localStorage.getItem("token")?.replace(/"/g, "");
    try {
      const response = await axiosInstance.get(
        `/organization_preference/`
      );
      const { org_data } = response.data;
      setData(org_data.sdg);
      setFramework(org_data.framework);
      setRegulations(org_data.regulation);
      setTargets(org_data.target);
      setCertifications(org_data.certification);
      setRatings(org_data.rating);
      LoaderClose();
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Oops, something went wrong";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      LoaderClose();
    }
  };

  useEffect(() => {
    if (isMounted.current) {
      fetchpreference();
      isMounted.current = false;
    }
    return () => {
      isMounted.current = false;
    };
  }, []);

  const routeToPage = (id) => {
    router.push(`/dashboard/Home/Preferences/pagedata?currentPage=${id}`);
  };

  return (
    <>
      <ToastContainer style={{ fontSize: "12px" }} />
      <div>
        <div className="flex justify-between items-center mb-6">
          <div className="text-neutral-800 text-[15px] font-bold leading-tight">
            Preferences
          </div>
          <div>
            <div className="text-sky-600 text-[10px] font-bold leading-[13px] space-x-2">
              <button
                onClick={handleEditToggle}
                className="text-sky-600 text-[10px] font-normal leading-[13px] space-x-2 me-2 flex"
              >
                <AiOutlineEdit style={{ fontSize: "18px" }} />
                <span className="text-[13px] mt-1">Edit</span>
              </button>
            </div>
          </div>
        </div>
        <h3 className="text-neutral-800 text-[13px] font-bold leading-none mt-8">
          Frameworks
        </h3>
        <div className="w-full h-[0px] border border-gray-200 mt-2 mb-4"></div>

        <div className="grid grid-cols-2 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-4 2k:grid-cols-4 4k:grid-cols-4 gap-2 mb-3">
          {framework &&
            framework.map((item) => (
              <div
                key={item.id}
                className="relative shadow-sm h-20  border border-gray-200"
              >
                <div className="flex justify-center h-10  mb-2">
                  <img
                    src={`${item.Image}`}
                    alt="cover"
                    className="transition-all w-[80%] aspect-[3/2] object-contain mt-2"
                  />
                </div>
                <div className="h-10">
                  <p className="text-[12px] text-center">{item.name}</p>
                </div>
              </div>
            ))}
          {edit && (
            <div onClick={() => routeToPage(2)}>
              <div className="w-[70px] h-[70px]  rounded-lg border border-dashed border-neutral-400 flex justify-center items-center cursor-pointer">
                <AiOutlinePlus />
              </div>
            </div>
          )}
        </div>
        <h3 className="text-neutral-800 text-[13px] font-bold leading-none mt-8">
          Regulations
        </h3>
        <div className="w-full h-[0px] border border-gray-200 mt-2 mb-4"></div>
        <div className="grid grid-cols-2 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-4 2k:grid-cols-4 4k:grid-cols-4 gap-2 mb-3">
          {regulations &&
            regulations.map((item) => (
              <div
                key={item.id}
                className="relative shadow-sm h-20  border border-gray-200"
              >
                <div className="flex justify-center h-10  mb-2">
                  <img
                    src={`${item.Image}`}
                    alt="cover"
                    className="transition-all w-[80%] aspect-[3/2] object-contain mt-2"
                  />
                </div>
                <div className="h-10">
                  <p className="text-[12px] text-center">{item.name}</p>
                </div>
              </div>
            ))}
          {edit && (
            <div onClick={() => routeToPage(6)}>
              <div className="w-[70px] h-[70px] rounded-lg border border-dashed border-neutral-400 flex justify-center items-center cursor-pointer">
                <AiOutlinePlus />
              </div>
            </div>
          )}
        </div>
        <h3 className="text-neutral-800 text-[13px] font-bold leading-none mt-8">
          Targets
        </h3>
        <div className="w-full  border border-gray-200 mt-2 mb-4"></div>
        <div className="grid grid-cols-2 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-4 2k:grid-cols-4 4k:grid-cols-4 gap-2 mb-3">
          {targets &&
            targets.map((item) => (
              <div
                key={item.id}
                className="relative shadow-sm h-20  border border-gray-200"
              >
                <div className="flex justify-center h-10  mb-2">
                  <img
                    src={`${item.Image}`}
                    alt="cover"
                    className="transition-all w-[80%] aspect-[3/2] object-contain mt-2"
                  />
                </div>
                <div className="h-10">
                  <p className="text-[12px] text-center">{item.name}</p>
                </div>
              </div>
            ))}
          {edit && (
            <div onClick={() => routeToPage(4)}>
              <div className="w-[70px] h-[70px] rounded-lg border border-dashed border-neutral-400 flex justify-center items-center cursor-pointer">
                <AiOutlinePlus />
              </div>
            </div>
          )}
        </div>
        <h3 className="text-neutral-800 text-[13px] font-bold leading-none mt-8">
          SDG’s
        </h3>
        <div className="w-full h-[0px] border border-gray-200 mt-2 mb-4"></div>
        <div className="grid grid-cols-8 gap-2 mb-3">
          {data &&
            data.map((item) => (
              <img
                key={item.id}
                src={`${item.Image}`}
                alt="cover"
                className="transition-all"
              />
            ))}
          {edit && (
            <div onClick={() => routeToPage(1)}>
              <div className="w-[63px] h-[63px] rounded-lg border border-dashed border-neutral-400 flex justify-center items-center cursor-pointer">
                <AiOutlinePlus />
              </div>
            </div>
          )}
        </div>
        <h3 className="text-neutral-800 text-[13px] font-bold leading-none mt-8">
          Certifications
        </h3>
        <div className="w-full h-[0px] border border-gray-200 mt-2 mb-4"></div>
        <div className="grid grid-cols-2 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-4 2k:grid-cols-4 4k:grid-cols-4 gap-2 mb-3">
          {certifications &&
            certifications.map((item) => (
              <div
                key={item.id}
                className="relative shadow-sm h-28  border border-gray-200"
              >
                <div className="flex justify-center h-10  mb-2">
                  <img
                    src={`${item.Image}`}
                    alt="cover"
                    className="transition-all w-[80%] aspect-[3/2] object-contain mt-2"
                  />
                </div>
                <div className="h-20">
                  <p className="text-[12px] text-center">{item.name}</p>
                </div>
              </div>
            ))}
          {edit && (
            <div onClick={() => routeToPage(3)}>
              <div className="w-[70px] h-[70px] rounded-lg border border-dashed border-neutral-400 flex justify-center items-center cursor-pointer">
                <AiOutlinePlus />
              </div>
            </div>
          )}
        </div>
        <h3 className="text-neutral-800 text-[13px] font-bold leading-none mt-8">
          Ratings
        </h3>
        <div className="w-full  border border-gray-200 mt-2 mb-4"></div>
        <div className="grid grid-cols-2 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-4 2k:grid-cols-4 4k:grid-cols-4 gap-2 mb-3">
          {ratings &&
            ratings.map((item) => (
              <div
                key={item.id}
                className="relative shadow-sm h-20  border border-gray-200"
              >
                <div className="flex justify-center h-10  mb-2">
                  <img
                    src={`${item.Image}`}
                    alt="cover"
                    className="transition-all w-[80%] aspect-[3/2] object-contain mt-2"
                  />
                </div>
                <div className="h-10">
                  <p className="text-[12px] text-center">{item.name}</p>
                </div>
              </div>
            ))}
          {edit && (
            <div onClick={() => routeToPage(5)}>
              <div className="w-[70px] h-[70px] rounded-lg border border-dashed border-neutral-400 flex justify-center items-center cursor-pointer">
                <AiOutlinePlus />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loopen}
      >
        <RiProgress8Fill color="inherit" />
      </Backdrop> */}
    </>
  );
};

export default Preferences;
