"use client";
import { useState, useRef, useEffect } from "react";

import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Assessingeffectiveness = ({ orgName, data }) => {
  return (
    <>
      <div>
        <h3 className="text-[22px] text-[#344054] mb-4 text-left font-semibold">
          10.Assessing Effectiveness
        </h3>
      </div>
      <div>
        <p className="text-[15px] text-[#344054] mb-2 mt-3">
          To measure its effectiveness in preventing forced and child labour,
          ABC takes the following steps:
        </p>
        <div className="mb-6">
          <ul className="list-disc pl-12">
            <li className="text-[14px] text-[#344054] mb-2">
              Setting up a regular review or audit of the entity's policies and
              procedures related to forced labour and child labour
            </li>
            <li className="text-[14px] text-[#344054] mb-2">
              Tracking relevant performance indicators, such as levels of
              employee awareness, numbers of cases reported and solved through
              grievance mechanisms and numbers of contracts with anti-forced
              labour and child labour clauses
            </li>
          </ul>
        </div>

        <p className="text-[15px] text-[#344054] mb-2 mt-3">
          ABC also benchmarks its practices against industry standards and
          collaborates with external partners to continuously improve its
          approach. Controlled entities within the organization are required to
          follow the same monitoring framework and report their results as part
          of ABC’s centralized compliance review process. These ongoing efforts
          help ensure that ABC’s activities and supply chains remain aligned
          with its ethical sourcing commitments and obligations under Bill
          S-211.
        </p>
      </div>
    </>
  );
};

export default Assessingeffectiveness;
