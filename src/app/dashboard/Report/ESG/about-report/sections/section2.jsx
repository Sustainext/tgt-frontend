"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Section2 = ({ section7_1_1Ref, data }) => {
  const [content, setContent] = useState(
    `This ESG report, prepared in accordance with the Global Reporting Initiative (GRI) standards, provides a comprehensive overview of [Company Name]'s environmental, social, and governance (ESG) performance for the reporting period [Year]. It reflects our commitment to transparency, accountability, and continuous improvement in our sustainability practices. `
  );
  const [content2, setContent2] = useState(
    `This report covers the period from [Start Date] to [End Date] and is part of our annual sustainability reporting cycle. 
We are committed to providing regular updates on our ESG performance to ensure transparency and keep our 
stakeholders informed of our progress.`
  );

  return (
    <>
      <div>
        <div id="setion7_1_1" ref={section7_1_1Ref}>
          <h3 className="text-[15px] text-[#344054] mb-2 text-left font-semibold">
            7.1.1 Restatement of Information
          </h3>
          <p className="mb-4 text-sm">
            {data && data["2-4-a"] ? (
              typeof data["2-4-a"] === "object" ? (
                <>
                  {data["2-4-a"].Q1
                    ? data["2-4-a"].Q1 == "No"
                      ? data["2-4-a"].Q1
                      : data["2-4-a"]?.Q2
                    : "No data available"}
                  {/* <br />
        {data["2-4-a"].Q2? data["2-4-a"].Q2:""} */}
                </>
              ) : (
                "No data available"
              )
            ) : (
              "No data available"
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default Section2;
