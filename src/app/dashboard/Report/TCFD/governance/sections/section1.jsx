"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import STARSVG from "../../../../../../../public/star.svg";
import {
  setBoardOversight,
  selectGovernance,
} from "../../../../../../lib/redux/features/TCFDSlice/tcfdslice";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Section1 = ({ section4_1Ref, data, orgName }) => {
  const dispatch = useDispatch();
  const governance = useSelector(selectGovernance);
  const editorRef = useRef(null);

  // Jodit Editor configuration
  const config = {
    readonly: false,
    placeholder: "Add a statement about how the company includes climate-related issues in its overall governance",
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
    const autoFillContent = `<p>${orgName || '[Company Name]'} is committed to integrating climate-related considerations at the highest levels of decision-making. Governance of climate risks and opportunities is structured in accordance with the principles and the recommendations of the Task Force on Climate-related Financial Disclosures (TCFD).</p>`;
    
    dispatch(setBoardOversight(autoFillContent));
  };

  const handleEditorChange = (content) => {
    dispatch(setBoardOversight(content));
  };

  // Mock data structure - replace with actual data when available
  const mockData = {
    "2-9-b": {
      committees: "Sustainability Committee, Audit Committee, Risk Committee"
    },
    "TCFD-GOV-A": {
      oversight: "The Board provides oversight of climate-related issues through quarterly reviews and strategic planning sessions.",
      processes: "Board is informed about climate-related issues through monthly reports and annual strategy sessions.",
      strategic_decisions: "Climate considerations are integrated into all major strategic and governance decisions."
    },
    "TCFD-GOV-B": {
      progress_monitoring: "Board monitors progress against climate targets through quarterly performance reviews and annual assessments."
    }
  };

  return (
    <>
      <div>
        <div id="section4_1" ref={section4_1Ref}>
          <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between">
            <p className="text-[15px] text-[#667085] mb-2 mt-3">
              Add a statement about how the company includes climate-related issues in its overall governance
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
              value={governance.boardOversight}
              config={config}
              tabIndex={1}
              onBlur={handleEditorChange}
              onChange={() => {}}
            />
          </div>

          <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
            4.1. Board's Oversight of Climate-Related Risks and Opportunities
          </h3>

          <div className="mb-6 text-sm leading-relaxed">
            <p className="mb-4">
              The Task Force on Climate-related Financial Disclosures (TCFD) was established by the Financial Stability Board (FSB) 
              to develop voluntary, consistent disclosures that enable companies, investors, lenders, and insurers to understand 
              and communicate climate-related financial risks and opportunities. The TCFD framework supports organizations in 
              assessing the material financial impacts of climate-related issues and provides guidance to communicate them 
              effectively. This improves transparency and supports more informed decision-making by stakeholders.
            </p>
            
            <p className="mb-4">
              The TCFD framework is structured around four key thematic areas that represent core elements of how organizations 
              operate:
            </p>
            
            <ul className="list-disc ml-6 mb-4 space-y-2">
              <li><strong>Governance</strong> – The organization's governance around climate-related risks and opportunities.</li>
              <li><strong>Strategy</strong> – The actual and potential impacts of climate-related risks and opportunities on the organization's businesses, strategy, and financial planning.</li>
              <li><strong>Risk Management</strong> – How the organization identifies, assesses, and manages climate-related risks.</li>
              <li><strong>Metrics and Targets</strong> – The metrics and targets used to assess and manage relevant climate-related risks and opportunities.</li>
            </ul>
            
            <p className="mb-4">
              By aligning with the TCFD recommendations, we strengthen the quality and comparability of climate-related financial 
              disclosures and demonstrate our readiness to navigate a rapidly evolving regulatory and environmental landscape.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="text-[15px] text-[#344054] mb-2 font-semibold">
              Board Committees Informed on Climate Related Issues
            </h4>
            <div className="bg-gray-50 p-3 rounded border text-sm text-blue-600">
              {data["2-9-b"]?.committees || mockData["2-9-b"].committees}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-[15px] text-[#344054] mb-2 font-semibold">
              Oversight of Climate-Related Risks and Opportunities
            </h4>
            <div className="bg-gray-50 p-3 rounded border text-sm text-blue-600">
              {data["TCFD-GOV-A"]?.oversight || mockData["TCFD-GOV-A"].oversight}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-[15px] text-[#344054] mb-2 font-semibold">
              Processes for Informing the Board on Climate-Related Issues
            </h4>
            <div className="bg-gray-50 p-3 rounded border text-sm text-blue-600">
              {data["TCFD-GOV-A"]?.processes || mockData["TCFD-GOV-A"].processes}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-[15px] text-[#344054] mb-2 font-semibold">
              Incorporation of Climate Considerations in Strategic and Governance Decisions
            </h4>
            <div className="bg-gray-50 p-4 rounded border">
              <div className="text-sm text-gray-600 mb-2">(Conditional section)</div>
              <div className="text-sm mb-2">
                Note for devs: A tailored version of the "Board's oversight of climate related issues" section's data is required here. i.e. skip yes/no response)
              </div>
              <div className="text-sm text-blue-600 mb-2">
                (If 'Yes' option is selected for the question "Does the Board and/or Board Committees consider climate-related issues when reviewing and 
                guiding key strategic and governance decisions?", fetch response from TCFD-GOV-A. "If Yes, provide details." without heading
              </div>
              <div className="text-sm text-blue-600">
                (If 'No' option is selected skip entire section).
              </div>
              <div className="mt-2 text-sm">
                {data["TCFD-GOV-A"]?.strategic_decisions || mockData["TCFD-GOV-A"].strategic_decisions}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-[15px] text-[#344054] mb-2 font-semibold">
              Board Monitoring of Progress Against Climate Targets and Goals
            </h4>
            <div className="bg-gray-50 p-3 rounded border text-sm text-blue-600">
              {data["TCFD-GOV-B"]?.progress_monitoring || mockData["TCFD-GOV-B"].progress_monitoring}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section1;