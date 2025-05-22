"use client";
import { useState, useRef, useEffect } from "react";

import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Remediationmeasures = ({ orgName, data }) => {
  return (
    <>
      <div>
        <h3 className="text-[22px] text-[#344054] mb-4 text-left font-semibold">
          7.Remediation Measures
        </h3>
      </div>
      <div>
        <p className="text-[15px] text-[#344054] mb-2 mt-3">
          Measures taken by the entity to remediate any identified forced labour
          or child labour in its activities and supply chains include:
        </p>
        <div className="mb-6">
          <ul className="list-disc pl-12">
            <li className="text-[14px] text-[#344054] mb-2">
              Actions to support victims of forced labour or child labour and/or
              their families, such as workforce reintegration and psychosocial
              support
            </li>
            <li className="text-[14px] text-[#344054] mb-2">
              Compensation for victims of forced labour or child labour and/or
              their families
            </li>
            <li className="text-[14px] text-[#344054] mb-2">
              Actions to prevent forced labour or child labour and associated
              harms from reoccurring
            </li>
            <li className="text-[14px] text-[#344054] mb-2">
              Grievance mechanisms
            </li>
            <li className="text-[14px] text-[#344054] mb-2">
              Formal apologies
            </li>
          </ul>
        </div>

        <p className="text-[15px] text-[#344054] mb-2 mt-3">
          ABC has taken several remediation measures to address forced and child
          labour in its supply chains. These include providing support and
          compensation to affected workers and their families, offering
          workforce reintegration and psychosocial assistance. The company has
          strengthened its auditing processes and implemented a robust grievance
          mechanism for reporting violations. Additionally, ABC has taken steps
          to prevent future occurrences by enhancing supplier training and
          enforcing a strict Supplier Code of Conduct. Formal apologies have
          been issued where necessary, demonstrating ABC’s commitment to ethical
          labour practices
        </p>
      </div>
    </>
  );
};

export default Remediationmeasures;
