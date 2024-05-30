'use client'
import React, { useState } from "react";
import { useAuth } from "../../Context/auth";
import { useRouter } from "next/navigation";
import { loadFromLocalStorage } from "../utils/storage";

const DashboardHeader = () => {
    return (
        <>

<div className="flex justify-between z-[100]  bg-white sticky top-0 right-0 border-b border-sky-600 border-opacity-50 pt-1 w-full mx-2">
  <div className="flex justify-start items-center my-4 gap-1 px-2">
    <a href="/home">
      <span className="text-[#007EEF] hover:text-[#0057A5]">Home</span>
    </a>
    <span className="text-[#222222] mx-1">&gt;</span>
    <a href="/home/sustainextHQ">
      <span className="text-[#222222] hover:text-[#0057A5] mx-2">SustainextHQ</span>
    </a>
  </div>
  <div className="flex justify-center items-center">
    <div className="me-8 flex items-center">
      <div className="text-[#007EEF]">
        <span className="text-[#007EEF]"> Hi,</span>
        <span className="me-4 text-[#007EEF]">shubham.kanungo</span>
      </div>
      <div className="relative cursor-pointer">
        <div className="flex justify-center items-center">
          <div style={{ background: 'linear-gradient(rgb(0, 126, 239), rgb(42, 228, 255))', width: '25px', height: '25px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '12px', fontWeight: 'bold' }}>
            SK
          </div>
          <div>
            <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowDropDownOutlinedIcon">
              <path d="m7 10 5 5 5-5H7z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        </>

    );


};

export default DashboardHeader;
