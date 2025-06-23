"use client";
import { useState, useRef, useEffect } from "react";

const Section1 = ({ section2_1Ref, data, orgName }) => {
  return (
    <>
      <div>
        <div id="section2_1" ref={section2_1Ref}>
          <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
            2.1 Overview of TCFD
          </h3>
          
          <div className="mb-4 text-sm leading-relaxed">
            <p className="mb-4">
              The Task Force on Climate-related Financial Disclosures (TCFD) was established by the Financial Stability Board (FSB) 
              to develop voluntary, consistent disclosures that enable companies, investors, lenders, and insurers to understand 
              and communicate climate-related financial risks and opportunities. The TCFD framework supports organizations in 
              assessing the material financial impacts of climate-related issues and provides guidance to communicate them 
              effectively. This improves transparency and supports more informed decision-making by stakeholders.
            </p>
            
            <p className="mb-4">
              The TCFD framework is structured around four key thematic areas that represent core elements of how organizations 
              operate:
            </p>
            
            <ul className="list-disc ml-6 mb-4 space-y-2">
              <li>
                <strong>Governance</strong> – The organization's governance around climate-related risks and opportunities.
              </li>
              <li>
                <strong>Strategy</strong> – The actual and potential impacts of climate-related risks and opportunities on the organization's 
                businesses, strategy, and financial planning.
              </li>
              <li>
                <strong>Risk Management</strong> – How the organization identifies, assesses, and manages climate-related risks.
              </li>
              <li>
                <strong>Metrics and Targets</strong> – The metrics and targets used to assess and manage relevant climate-related risks and 
                opportunities.
              </li>
            </ul>
            
            <p className="mb-4">
              By aligning with the TCFD recommendations, we strengthen the quality and comparability of climate-related financial 
              disclosures and demonstrate our readiness to navigate a rapidly evolving regulatory and environmental landscape.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section1;