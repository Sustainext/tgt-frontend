"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import STARSVG from "../../../../../../../public/star.svg";
import {
  setResilienceOfStrategy,
  selectStrategy,
} from "../../../../../../lib/redux/features/TCFDSlice/tcfdslice";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Section3 = ({ section5_3Ref, data, tcfdCollectData, orgName }) => {
  const dispatch = useDispatch();
  const strategy = useSelector(selectStrategy);
  const editorRef = useRef(null);

  // Extract resilience data from tcfdCollectData
  const resilienceData = tcfdCollectData?.strategy_resilience_to_climate_related_risks_and_opportunities?.[0] || {};

  // Jodit Editor configuration
  const config = {
    readonly: false,
    height: 200,
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
    const autoFillContent = `<p>As ${orgName || '[Company Name]'} operates in a dynamic business environment, we recognize the importance of integrating sector-specific considerations into our climate strategy. Our approach includes:</p>
    <ul>
      <li><strong>Industry-Specific Risk Assessment:</strong> We evaluate climate risks and opportunities that are particularly relevant to our sector, considering regulatory requirements, market dynamics, and stakeholder expectations.</li>
      <li><strong>Regulatory Compliance:</strong> We monitor and adapt to evolving climate-related regulations and reporting requirements specific to our industry.</li>
      <li><strong>Technology Integration:</strong> We assess opportunities for adopting new technologies and innovations that can enhance our climate resilience and reduce our environmental footprint.</li>
      <li><strong>Value Chain Considerations:</strong> We evaluate climate impacts across our value chain, including suppliers, operations, and customers, to ensure comprehensive risk management.</li>
      <li><strong>Stakeholder Alignment:</strong> We engage with industry peers, regulatory bodies, and other stakeholders to ensure our strategy aligns with sector best practices and emerging standards.</li>
    </ul>`;
    
    dispatch(setResilienceOfStrategy(autoFillContent));
    
    // Force update the JoditEditor if it's mounted
    if (editorRef.current) {
      editorRef.current.value = autoFillContent;
    }
  };

  const handleEditorChange = (content) => {
    dispatch(setResilienceOfStrategy(content));
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

  return (
    <>
      <div>
        <div id="section5_3" ref={section5_3Ref}>
          <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
            5.3 Scenario Analysis & Strategic Resilience
          </h3>

          <div className="mb-6">
            <h4 className="text-[15px] text-[#344054] mb-3 font-semibold">
              Scenario Analysis
            </h4>
            {resilienceData?.Q1 === 'Yes' && resilienceData?.Q2 ? (
              <div className="text-sm">
                {renderArrayValue(resilienceData.Q2)}
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                {resilienceData?.Q1 === 'No' ? 'No scenario analysis conducted.' : 'No scenario analysis data available.'}
              </div>
            )}
          </div>

          <div className="mb-6">
            <h4 className="text-[15px] text-[#344054] mb-3 font-semibold">
              Strategic Resilience and Evolution of Business Strategy
            </h4>
            
            {/* Strategic Resilience */}
            {resilienceData?.Q3 && (
              <div className="mb-4">
                {/* <h5 className="text-[14px] text-[#344054] mb-2 font-medium">
                  Strategy Resilience to Climate Risks
                </h5> */}
                <div className="text-sm">
                  {renderArrayValue(resilienceData.Q3)}
                </div>
              </div>
            )}

            {/* Strategy Affected by Climate Issues */}
            {resilienceData?.Q4 && (
              <div className="mb-4">
                {/* <h5 className="text-[14px] text-[#344054] mb-2 font-medium">
                  How Strategy Was Affected by Climate-Related Issues
                </h5> */}
                <div className="text-sm">
                  {renderArrayValue(resilienceData.Q4)}
                </div>
              </div>
            )}

            {/* Strategy Evolution */}
            {resilienceData?.Q5 && (
              <div className="mb-4">
                {/* <h5 className="text-[14px] text-[#344054] mb-2 font-medium">
                  Expected Strategy Evolution
                </h5> */}
                <div className="text-sm">
                  {renderArrayValue(resilienceData.Q5)}
                </div>
              </div>
            )}
          </div>

          <div className="mb-6">
            <h4 className="text-[15px] text-[#344054] mb-3 font-semibold">
              Financial Impacts
            </h4>
            {resilienceData?.Q6 ? (
              <div className="text-sm">
                {renderArrayValue(resilienceData.Q6)}
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                No financial impact data available.
              </div>
            )}
          </div>

          {/* Show message if no resilience data */}
          {Object.keys(resilienceData).length === 0 && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-700 text-sm">
                No strategy resilience data available. Please complete the questionnaire to see detailed resilience and scenario analysis information here.
              </p>
            </div>
          )}

          <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between mt-6">
            <p className="text-[15px] text-[#667085] mb-2 mt-3">
              Add sector-specific (e.g., financial or non-financial) information relevant to the Strategy disclosures, in line with TCFD sector guidance (if applicable). 
            </p>
            {/* <button
              className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
              onClick={loadAutoFillContent}
            >
              <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
              Auto Fill
            </button> */}
          </div>

          <div className="mb-6">
            <JoditEditor
              ref={editorRef}
              value={strategy.resilienceOfStrategy}
              config={{...config, placeholder: "Add sector-specific (e.g., financial or non-financial) information relevant to the Strategy disclosures, in line with TCFD sector guidance (if applicable). "}}
              tabIndex={1}
              onBlur={handleEditorChange}
              onChange={handleEditorChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Section3;