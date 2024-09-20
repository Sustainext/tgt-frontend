"use client";
import { useState, useRef, useEffect } from "react";

const Section2 = ({ section14_1_1Ref }) => {
  return (
    <>
      <div ref={section14_1_1Ref} id="section14_1_1">
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
          14.1.1 Management of material topic
        </h3>
        <div className="mb-6">
          <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Description of organisation's policies or commitments for the
            material topic, along with actions taken to address, prevent or
            mitigate potential negative impacts and mention the actions taken by
            the organisation to manage actual and potential positive impacts.
          </p>
        </div>

        <div>
          <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Process used to track the effectiveness of the actions and mention
            goals, targets, and indicators used to evaluate the process along
            with specific lessons learned and how these have been incoporated to
            organisation's operational policies and procedures.
          </p>
        </div>
      </div>
    </>
  );
};

export default Section2;
