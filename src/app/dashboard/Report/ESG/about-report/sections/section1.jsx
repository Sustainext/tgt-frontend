"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  setAboutReport,
  setFramework,
  setExternalAssurance,
} from "../../../../../../lib/redux/features/ESGSlice/screen7Slice";

const Section1 = ({ section7_1Ref, orgName, data,
  sectionNumber = "7.1",
  sectionTitle = 'Reporting Period, Frequency, and Point of Contact',
  sectionOrder = 7,
 }) => {
  const description = useSelector((state) => state.screen7Slice.aboutReport);
  const dispatch = useDispatch();
  const loadContent = () => {
    dispatch(
      setAboutReport(
        `This ESG report, prepared in accordance with the Global Reporting Initiative (GRI) standards, provides a comprehensive overview of ${
          orgName ? orgName : "[Company Name]'s"
        }  environmental, social, and governance (ESG) performance for the reporting period [Year]. It reflects our commitment to transparency, accountability, and continuous improvement in our sustainability practices`
      )
    );
  };

  const handleEditorChange = (e) => {
    dispatch(setAboutReport(e.target.value));
  };
  const [content2, setContent2] = useState(
    `This report covers the period from [Start Date] to [End Date] and is part of our annual sustainability reporting cycle. 
We are committed to providing regular updates on our ESG performance to ensure transparency and keep our 
stakeholders informed of our progress.`
  );
  return (
    <>
      <div>
        <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            Add statement about the report
          </p>
          <button
            className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
            onClick={loadContent}
          >
            {/* <MdOutlinePlaylistAdd className="mr-1 w-[20px] h-[20px]"/> */}
            <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
            Auto Fill
          </button>
        </div>
        <textarea
          value={description}
          onChange={handleEditorChange}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
          rows={4}
        />
        <div id="setion7_1" ref={section7_1Ref}>
          <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
            {sectionOrder}.1 Reporting Period, Frequency, and Point of Contact
          </h3>

          {
            data && data["2-3-a"]?.Q1 && data["2-3-a"]?.Q2 ? (
              <div>

                <p className="mb-4 text-sm">
                This report covers the period from {data["2-3-a"].Q1} and is part of our {data["2-3-a"].Q2} sustainability reporting cycle. 
                We are committed to providing regular updates on our ESG performance to ensure transparency and keep our stakeholders informed of our progress. 
                {data["2-3-b"]?.Q1=="Yes"?`The reporting period for the ${orgName ? orgName : "[Company Name]'s"} financial reporting aligns with the period for its sustainability reporting.`:data["2-3-b"]?.Q1=="No"?`The reporting period for the organization's financial reporting does not align with the period for its sustainability reporting. ${data['2-3-b']?.Q2} `:''}

                {data['2-3-c']?`The report was published on ${data['2-3-c']?.Q1}, which specifies the date of publication, and the reporting information included.`:''} 
                </p>
              </div>
            ):(
              <div>
                     <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Reporting Period:
          </p>
          <p className="mb-4 text-sm">
            {data && data["2-3-a"] ? (
              typeof data["2-3-a"] === "object" ? (
                <>{data["2-3-a"].Q1 ? data["2-3-a"].Q1 : "No Data available"}</>
              ) : (
                "No data available"
              )
            ) : (
              "No data available"
            )}
          </p>
          <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Reporting frequency:
          </p>
          <p className="mb-4 text-sm">
            {data && data["2-3-a"] ? (
              typeof data["2-3-a"] === "object" ? (
                <>{data["2-3-a"].Q2 ? data["2-3-a"].Q2 : "No Data available"}</>
              ) : (
                "No data available"
              )
            ) : (
              "No data available"
            )}
          </p>
              </div>
            )
          }
         

          <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Point of Contact:
          </p>
          <p className="mb-4 text-sm">
            {data && data["2-3-d"] ? (
              typeof data["2-3-d"] === "object" ? (
                <div>
                  <p className="mb-2">For further information regarding this report or our sustainability initiatives, please contact:</p>
                   <pre style={{ fontFamily: "inherit" }}>
                  {data["2-3-d"].Q1 ? data["2-3-d"].Q1 : "No Data available"}
                </pre>
                </div>
               
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

export default Section1;
