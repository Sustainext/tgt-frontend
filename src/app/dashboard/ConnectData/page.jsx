"use client";

import { useState, useEffect } from "react";
import {
    setHeadertext1,
    setHeadertext2,
    setHeaderdisplay,
} from "../../../lib/redux/features/topheaderSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "@/app/utils/axiosMiddleware";
import Image from "next/image";
import { useRouter } from 'next/navigation';

const ConnectData = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        dispatch(setHeadertext1(""));
        dispatch(setHeaderdisplay("none"));
        dispatch(setHeadertext2("Connect My Data"));
    }, [dispatch]);
    return (
        <>
            <div>
                <div className="">
                    <div className="flex flex-col justify-start overflow-x-hidden scrollable-content ">
                        <div className="flex justify-between items-center border-b border-gray-200 mb-2 w-full">
                            <div className="w-full">
                                <div className="text-left mb-2 ml-3 pt-1">
                                    <div className="flex">
                                        <div>
                                            <p className="gradient-text text-[22px] font-bold pt-4 pb-4 ml-3">
                                                Connect My Data
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col h-screen mx-4">
                        <div className="my-5 ml-3 mb-4">
                            <h2 className="text-[#101828] text-[18px] font-semibold mb-2">Overview</h2>
                            <p className="text-[14px] text-[#667085]">
                                Explore and manage integrations with third-party services such as utilities, energy platforms, and more.
                            </p>
                        </div>
                        <div onClick={()=>{
                            router.push('/dashboard/ConnectData/EZGB')
                        }} className="max-w-md mt-6 p-4 ml-3 bg-white border cursor-pointer border-gray-200 rounded-xl shadow-sm hover:shadow-md">
                            <div className="flex items-start space-x-4">
                                <div className="p-1 rounded-md">
                                    <img
                                        src='https://sustainextstorage1.blob.core.windows.net/sustainext-frontend-assets/EZGB_Logo.png'
                                        alt="EZGB-Logo"
                                        className="w-full h-full"
                                    />
                                </div>
                                <div>
                                    <div className="font-semibold text-[#101828] text-[16px]">
                                        EZGB connector(Only available for users in Canada)
                                    </div>
                                    <div className="mt-1 text-sm text-[#667085] text-[14px]">
                                        Securely connect utility accounts to sync energy &amp; natural gas usage data.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConnectData;
