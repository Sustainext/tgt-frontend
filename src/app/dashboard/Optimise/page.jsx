"use client";
import React, { useState, useEffect } from "react";
import {
  setHeadertext1,
  setHeadertext2,
  setHeaderdisplay,
  setMiddlename,
} from "../../../lib/redux/features/topheaderSlice";
import { useDispatch } from "react-redux";

const OptimiseApp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const userid = typeof window !== 'undefined' ? localStorage.getItem("user_id") : '';
  console.log(`https://sustainext-eoptimize-v2.streamlit.app?user_id=${userid}&embedded=true&embed_options=light_theme`);
  useEffect(() => {
    dispatch(setHeadertext1(""));
    dispatch(setHeaderdisplay("none"));
    dispatch(setHeadertext2("Optimise"));
  }, [dispatch]);

  return (
    <div className="relative w-full">
      {/* Container with negative margin to hide footer */}
      <div
        className="w-full relative"
        style={{ height: "890px", marginBottom: "-40px", overflow: "hidden" }}
      >
        {/* {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-4 border-[#007eef] border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-600 text-sm">Loading Optimise App...</p>
            </div>
          </div>
        )} */}

        <iframe
             src={`https://sustainext-eoptimize-v2.streamlit.app?user_id=${userid}&embedded=true&embed_options=light_theme`}
          title="Optimise App"
          width="100%"
          height="100%"
          frameBorder="0"
          onLoad={() => setIsLoading(false)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      </div>

      {/* Overlay to hide footer */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[48px] bg-white"
        style={{ zIndex: 1 }}
      />
    </div>
  );
};

export default OptimiseApp;
