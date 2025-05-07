"use client";
import React, { useState } from "react";
import Identifyinginformation2024 from "./V1-2024/page"
import SubmissionInformation from "./V2-2025/page"
import { useSelector } from "react-redux";
import {
  MdKeyboardArrowDown,
} from "react-icons/md";
const Identifyinginformation = ({ setMobileopen }) => {

  const selectedOrg = useSelector((state) => state.bils201filter.org);
  const selectedCorp = useSelector((state) => state.bils201filter.corp);
  const year = useSelector((state) => state.bils201filter.year);
  const reportType = useSelector((state) => state.bils201filter.reportType);

  return (
    <>
 
   
      {year <= 2023 && <Identifyinginformation2024 selectedCorp={selectedCorp || ""} selectedOrg={selectedOrg} year={year} reportType={reportType} />}
      {year >= 2024 && <SubmissionInformation selectedCorp={selectedCorp || ""} selectedOrg={selectedOrg} year={year} reportType={reportType} />}
    </>
  );
};

export default Identifyinginformation;
