'use client';
import React, { useState } from 'react';
import { MdChevronRight, MdChevronLeft } from "react-icons/md";
import Section1 from "./Section1/page";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Ratiosstandard = ({setMobileopen}) => {
  

  return (
      <>
          <ToastContainer style={{ fontSize: "12px" }} />
          <Section1 setMobileopen={setMobileopen}/>
        
      </>
  );
};

export default Ratiosstandard;
