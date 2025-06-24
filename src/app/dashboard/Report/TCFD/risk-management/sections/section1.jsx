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

const Section1 = ({ section6_1Ref, data, tcfdCollectData, orgName }) => {
  const dispatch = useDispatch();
  const riskManagement = useSelector(selectRiskManagement);
  const editorRef = useRef(null);

  // Extract risk management data from tcfdCollectData
  const identificationData = tcfdCollectData?.climate_related_risk_identification_assessment_process?.[0] || {};
  const significanceData = tcfdCollectData?.risk_significance?.[0] || {};
  const regulatoryData = tcfdCollectData?.regulatory_considerations?.[0] || {};
  const scopeData = tcfdCollectData?.size_scope_of_risk?.[0] || {};

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

  // Helper function to render array values
  const renderArrayValue = (value) => {
    if (Array.isArray(value)) {
      return value.map((item, index) => (
        <div key={index}>{item}</div>
      ));
    }
    return value || '';
  };

  // Helper function to render file information
  const renderFileInfo = (fileData) => {
    if (fileData && typeof fileData === 'object' && fileData.fileName) {
      return (
        <div className="mt-2 p-2 bg-gray-50 rounded border">
          <div className="text-sm">
            <strong>Attached File:</strong> {fileData.fileName}
          </div>
          {fileData.fileURL && (
            <a 
              href={fileData.fileURL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm underline"
            >
              View Document
            </a>
          )}
        </div>
      );
    }
    return null;
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

          <div className="mb-6">
            <h4 className="text-[15px] text-[#344054] mb-2 font-semibold">
              Organization's Overall Approach to Identifying and Assessing Climate-Related Risks
            </h4>
            <div className="text-sm">
              {renderArrayValue(identificationData?.Q1)}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-[15px] text-[#344054] mb-2 font-semibold">
              Determining Relative Significance of Climate-Related Risks
            </h4>
            <div className="text-sm">
              {renderArrayValue(significanceData?.Q1)}
            </div>
          </div>

          {/* Regulatory Considerations - Only show if Q1 is Yes */}
          {regulatoryData?.Q1 === 'Yes' && (
            <div className="mb-6">
              <h4 className="text-[15px] text-[#344054] mb-2 font-semibold">
                Regulatory Considerations
              </h4>
              <div className="text-sm">
                {renderArrayValue(regulatoryData?.Q2)}
              </div>
            </div>
          )}

          <div className="mb-6">
            <h4 className="text-[15px] text-[#344054] mb-2 font-semibold">
              Size & Scope of Risk
            </h4>
            <div className="text-sm">
              {renderArrayValue(scopeData?.Q1)}
              {scopeData?.Q2 && (
                <div className="mt-3">
                  {typeof scopeData.Q2 === 'object' && scopeData.Q2.text ? (
                    <div>
                      <div className="mb-2">{scopeData.Q2.text}</div>
                      {renderFileInfo(scopeData.Q2)}
                    </div>
                  ) : (
                    <div>{renderArrayValue(scopeData.Q2)}</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section1;