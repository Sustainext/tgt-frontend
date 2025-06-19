"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import STARSVG from "../../../../../../../public/star.svg";
import {
  setIdentificationProcess,
  selectRiskManagement,
} from "../../../../../../lib/redux/features/TCFDSlice/tcfdslice";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Section1 = ({ section6_1Ref, data, orgName }) => {
  const dispatch = useDispatch();
  const riskManagement = useSelector(selectRiskManagement);
  const editorRef = useRef(null);

  // Jodit Editor configuration
  const config = {
    readonly: false,
    placeholder: "Add a statement about the company's approach to managing climate-related risks.",
    height: 300,
    toolbarSticky: false,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    buttons: [
      'bold', 'italic', 'underline', '|',
      'ul', 'ol', '|',
      'font', 'fontsize', '|',
      'align', '|',
      'undo', 'redo'
    ],
  };

  const loadAutoFillContent = () => {
    const autoFillContent = `<p>Effective risk management is critical to understanding and addressing the potential impacts of climate-related risks on our business. We are committed to identifying, assessing, and managing both physical and transition risks associated with climate change as part of our broader enterprise risk management (ERM) framework. This section outlines our approach to integrating climate considerations into risk processes, tools, and governance structures to support informed decision-making and long-term business resilience.</p>`;
    
    dispatch(setIdentificationProcess(autoFillContent));
  };

  const handleEditorChange = (content) => {
    dispatch(setIdentificationProcess(content));
  };

  return (
    <>
      <div>
        <div id="section6_1" ref={section6_1Ref}>
          <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between">
            <p className="text-[15px] text-[#667085] mb-2 mt-3">
              Add a statement about the company's approach to managing climate-related risks.
            </p>
            <button
              className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
              onClick={loadAutoFillContent}
            >
              <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
              Auto Fill
            </button>
          </div>

          <div className="mb-6">
            <JoditEditor
              ref={editorRef}
              value={riskManagement.identificationProcess}
              config={config}
              tabIndex={1}
              onBlur={handleEditorChange}
              onChange={() => {}}
            />
          </div>

          <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
            6.1 Risk Identification & Assessment Process
          </h3>

          {/* Response placeholders */}
          <div className="mb-6 bg-blue-50 p-4 rounded border">
            <p className="text-blue-600 text-sm mb-2">
              (Response from "Describe your organization's overall approach to identifying and assessing climate-related risks." question, without heading)
            </p>
            <div className="border-b border-blue-200 my-2"></div>
            <div className="text-sm text-gray-700">
              {data.identification_approach || "Climate risk identification and assessment process details will be displayed here based on API response."}
            </div>
          </div>

          <div className="mb-6 bg-blue-50 p-4 rounded border">
            <p className="text-blue-600 text-sm mb-2">
              (Response from "How do you determine the relative significance of climate-related risks compared to other types of risks?" question, without heading)
            </p>
            <div className="border-b border-blue-200 my-2"></div>
            <div className="text-sm text-gray-700">
              {data.risk_significance || "Risk significance determination process details will be displayed here based on API response."}
            </div>
          </div>

          {/* Regulatory Considerations */}
          <div className="mb-6">
            <h4 className="text-[15px] text-[#344054] mb-3 font-semibold">
              Regulatory Considerations
            </h4>
            <div className="text-blue-600 text-sm mb-2">Conditional section</div>
            
            <div className="bg-blue-50 p-4 rounded border mb-4">
              <p className="text-blue-600 text-sm mb-2">
                (Note for devs: A tailored version of the 'Regulatory Considerations' section's data is required here. i.e. skip yes/no response)
              </p>
              <p className="text-blue-600 text-sm mb-2">
                (If yes option is selected, fetch response from "If yes, describe how the regulatory requirements are considered." question, without heading)
              </p>
              <div className="border-b border-blue-200 my-2"></div>
              <p className="text-blue-600 text-sm">
                (If 'No' option is selected skip entire section).
              </p>
            </div>
            
            <div className="text-sm text-gray-700">
              {data.regulatory_considerations || "Regulatory considerations details will be displayed here if applicable."}
            </div>
          </div>

          {/* Size & scope of risk */}
          <div className="mb-6">
            <h4 className="text-[15px] text-[#344054] mb-3 font-semibold">
              Size & scope of risk
            </h4>
            <div className="bg-blue-50 p-4 rounded border">
              <p className="text-blue-600 text-sm mb-2">
                (Response from "Describe the process of assessing the potential size and scope of identified climate-related risks." question, without heading)
              </p>
              <div className="border-b border-blue-200 my-2"></div>
              <div className="text-sm text-gray-700">
                {data.risk_scope_assessment || "Risk size and scope assessment process details will be displayed here based on API response."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section1;