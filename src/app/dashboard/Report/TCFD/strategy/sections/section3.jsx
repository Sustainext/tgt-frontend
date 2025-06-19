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

const Section3 = ({ section5_3Ref, data, orgName }) => {
  const dispatch = useDispatch();
  const strategy = useSelector(selectStrategy);
  const editorRef = useRef(null);

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

          <div className="mb-6">
            <h4 className="text-[15px] text-[#344054] mb-3 font-semibold">
              Scenario Analysis
            </h4>
            <div className="bg-blue-50 p-3 rounded border text-sm text-blue-600">
              (Note for devs: A tailored version of the 'Climate Scenarios & Financial Impact' section's data is required here. i.e. skip yes/no response)
            </div>
            <div className="bg-blue-50 p-3 rounded border text-sm text-blue-600 mt-2">
              (If 'yes' option is selected, fetch response from "If yes, please describe climate scenario(s) and/or associated time horizon(s) considered" question, without heading)
            </div>
            <div className="bg-blue-50 p-3 rounded border text-sm text-blue-600 mt-2">
              (If 'No' option is selected skip entire section).
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-[15px] text-[#344054] mb-3 font-semibold">
              Strategic Resilience and Evolution of Business Strategy
            </h4>
            <div className="bg-blue-50 p-3 rounded border text-sm text-blue-600 mb-2">
              (Response from "Describe how your organisation's strategy is resilient to climate related risks and opportunities, including use of a 2°C or lower scenario" question, without heading)
            </div>
            <div className="bg-blue-50 p-3 rounded border text-sm text-blue-600 mb-2">
              (Response from "When your organisation's strategy was affected by climate-related risks and opportunities?" question, without heading)
            </div>
            <div className="bg-blue-50 p-3 rounded border text-sm text-blue-600">
              (Response from "How is your organisation's strategy expected to evolve in response to identified climate-related risks and opportunities?" question, without heading)
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-[15px] text-[#344054] mb-3 font-semibold">
              Financial Impacts
            </h4>
            <div className="bg-blue-50 p-3 rounded border text-sm text-blue-600">
              (Response from "How have you been able to your organisation's strategy to climate-related issues considering potential impacts on financial planning under different climate scenarios?" question, without heading)
            </div>
          </div>

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