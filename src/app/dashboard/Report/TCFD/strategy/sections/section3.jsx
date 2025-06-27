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

  // Extract resilience data from tcfdCollectData with better error handling
  const resilienceData = tcfdCollectData?.strategy_resilience_to_climate_related_risks_and_opportunities?.[0] || {};

  console.log('resilienceData', resilienceData);

  // Helper function to safely render any data value
  const safeRenderValue = (value) => {
    if (value === null || value === undefined) {
      return '';
    }
    
    if (typeof value === 'object') {
      if (value.start && value.end) {
        return `${value.start} - ${value.end}`;
      }
      return JSON.stringify(value);
    }
    
    return String(value);
  };

  // Helper function to render array values
  const renderArrayValue = (value) => {
    if (Array.isArray(value)) {
      return value.map((item, index) => (
        <div key={index} className="mb-1">
          {safeRenderValue(item)}
        </div>
      ));
    }
    return safeRenderValue(value) || '';
  };

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

  return (
    <>
      <div>
        <div id="section5_3" ref={section5_3Ref}>
          <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
            5.3 Scenario Analysis & Strategic Resilience
          </h3>

          {/* Scenario Analysis Section */}
          <div className="mb-8">
            <h4 className="text-[16px] text-[#344054] mb-4 font-semibold">
              Scenario Analysis
            </h4>
            
            {resilienceData?.Q1 === 'Yes' ? (
              <div className="space-y-4">
                {resilienceData?.Q2 && (
                  <div className="rounded-lg text-sm text-gray-700">
                    {safeRenderValue(resilienceData.Q2)}
                  </div>
                )}
                {!resilienceData?.Q2 && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-700 text-sm">
                      Scenario analysis is conducted, but details are not available.
                    </p>
                  </div>
                )}
              </div>
            ) : resilienceData?.Q1 === 'No' ? (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-700 text-sm">
                  No scenario analysis has been conducted.
                </p>
              </div>
            ) : (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-700 text-sm">
                  No scenario analysis data available.
                </p>
              </div>
            )}
          </div>

          {/* Strategic Resilience Section */}
          <div className="mb-8">
            <h4 className="text-[16px] text-[#344054] mb-4 font-semibold">
              Strategic Resilience and Evolution
            </h4>
            
            <div className="space-y-6">
              {/* Strategy Resilience */}
              {resilienceData?.Q3 && (
                <div>
                  {/* <h5 className="text-[14px] text-[#344054] mb-2 font-medium">
                    Strategy Resilience to Climate Risks and Opportunities
                  </h5> */}
                  <div className="rounded-lg text-sm text-gray-700">
                    {safeRenderValue(resilienceData.Q3)}
                  </div>
                </div>
              )}

              {/* Strategy Impact Areas */}
              {resilienceData?.Q4 && (
                <div>
                  {/* <h5 className="text-[14px] text-[#344054] mb-2 font-medium">
                    How Strategy Is Affected by Climate-Related Issues
                  </h5> */}
                  <div className="rounded-lg text-sm text-gray-700">
                    {safeRenderValue(resilienceData.Q4)}
                  </div>
                </div>
              )}

              {/* Strategy Evolution */}
              {resilienceData?.Q5 && (
                <div>
                  {/* <h5 className="text-[14px] text-[#344054] mb-2 font-medium">
                    Expected Evolution of Business Strategy
                  </h5> */}
                  <div className="rounded-lg text-sm text-gray-700">
                    {safeRenderValue(resilienceData.Q5)}
                  </div>
                </div>
              )}
            </div>

            {/* Show message if no strategic resilience data */}
            {!resilienceData?.Q3 && !resilienceData?.Q4 && !resilienceData?.Q5 && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-700 text-sm">
                  No strategic resilience data available.
                </p>
              </div>
            )}
          </div>

          {/* Financial Impact Assessment Section */}
          <div className="mb-8">
            <h4 className="text-[16px] text-[#344054] mb-4 font-semibold">
              Financial Impact Assessment
            </h4>
            
            {resilienceData?.Q6 ? (
              <div className="rounded-lg text-sm text-gray-700">
                {safeRenderValue(resilienceData.Q6)}
              </div>
            ) : (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-700 text-sm">
                  No financial impact assessment data available.
                </p>
              </div>
            )}
          </div>

          {/* Sector-Specific Information Section */}
          <div className="mb-8">
            <h4 className="text-[16px] text-[#344054] mb-4 font-semibold">
              Sector-Specific Strategy Considerations
            </h4>

            <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between items-start">
              <p className="text-[15px] text-[#667085] mb-2 mt-0">
                Add sector-specific (e.g., financial or non-financial) information relevant to the Strategy disclosures, in line with TCFD sector guidance (if applicable).
              </p>
            </div>

            <div className="mb-6">
              <JoditEditor
                ref={editorRef}
                value={strategy.resilienceOfStrategy}
                config={{
                  ...config, 
                  placeholder: "Add sector-specific (e.g., financial or non-financial) information relevant to the Strategy disclosures, in line with TCFD sector guidance (if applicable)."
                }}
                tabIndex={1}
                onBlur={handleEditorChange}
                onChange={() => {}}
              />
            </div>
          </div>

          {/* Show comprehensive message if no data available */}
          {Object.keys(resilienceData).length === 0 && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-700 text-sm">
                No strategy resilience data available. Please complete the questionnaire to see detailed resilience, scenario analysis, and financial impact information here.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Section3;