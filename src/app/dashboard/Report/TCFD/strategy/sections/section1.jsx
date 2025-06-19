"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import STARSVG from "../../../../../../../public/star.svg";
import {
  setClimateRisksOpportunities,
  setImpactOnBusiness, // Add this for the second editor
  selectStrategy,
} from "../../../../../../lib/redux/features/TCFDSlice/tcfdslice";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Section1 = ({ section5_1Ref, data, orgName }) => {
  const dispatch = useDispatch();
  const strategy = useSelector(selectStrategy);
  const editorRef1 = useRef(null);
  const editorRef2 = useRef(null);

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

  // Auto fill for first editor
  const loadAutoFillContent1 = () => {
    const autoFillContent = `<p>Climate-related risks and opportunities have the potential to impact our business strategy, operations, and long-term value creation. In this section, we describe how ${orgName || '[Company Name]'} currently views these issues, based on our assessments, scenario planning, and long-term value creation financial planning.</p>`;
    
    dispatch(setClimateRisksOpportunities(autoFillContent));
    
    // Force update the JoditEditor if it's mounted
    if (editorRef1.current) {
      editorRef1.current.value = autoFillContent;
    }
  };

  // Auto fill for second editor
  const loadAutoFillContent2 = () => {
    const autoFillContent = `<p>We have identified a range of climate-related risks and opportunities across short-, medium-, and long-term time horizons, using internal assessments, scenario planning, and stakeholder input. These are broadly categorized as:</p>`;;
    
    dispatch(setImpactOnBusiness(autoFillContent));
    
    // Force update the JoditEditor if it's mounted
    if (editorRef2.current) {
      editorRef2.current.value = autoFillContent;
    }
  };

  const handleEditor1Change = (content) => {
    dispatch(setClimateRisksOpportunities(content));
  };

  const handleEditor2Change = (content) => {
    dispatch(setImpactOnBusiness(content));
  };

  // Mock risk data - replace with actual data from API
  const mockRiskData = {
    physical: [
      { riskCategory: "Acute", typeOfRisk: "Extreme weather events", severityOfRisk: "High", potentialImpact: "Operational disruption", likelihoodOfImpact: "Medium", mitigation: "Business continuity plans" }
    ],
    transition: [
      { riskCategory: "Policy", typeOfRisk: "Carbon pricing", severityOfRisk: "Medium", potentialImpact: "Increased costs", likelihoodOfImpact: "High", mitigation: "Carbon reduction initiatives" }
    ],
    other: [
      { riskCategory: "Reputation", typeOfRisk: "Stakeholder concerns", severityOfRisk: "Medium", potentialImpact: "Brand impact", likelihoodOfImpact: "Medium", mitigation: "Enhanced transparency" }
    ]
  };

const RiskTable = ({ title, riskData }) => (
  <div className="mb-8">
    <h4 className="text-[15px] text-[#344054] mb-3 font-semibold">{title}</h4>
    <div className="overflow-x-auto">
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="">
              <th className="border-r border-gray-200 py-8 px-4 text-left text-gray-600 font-medium">
                Risk Category
              </th>
              <th className="border-r border-gray-200 py-8 px-4 text-left text-gray-600 font-medium">
                Type of Risk
              </th>
              <th className="border-r border-gray-200 py-8 px-4 text-left text-gray-600 font-medium">
                Severity of Risk
              </th>
              <th className="border-r border-gray-200 py-8 px-4 text-left text-gray-600 font-medium">
                Potential Impact
              </th>
              <th className="border-r border-gray-200 py-8 px-4 text-left text-gray-600 font-medium">
                Likelihood of Impact
              </th>
              <th className="p-4 text-left text-gray-600 font-medium">
                Mitigation
              </th>
            </tr>
          </thead>
          <tbody>
            {riskData.map((risk, index) => (
              <tr key={index} className="bg-white border-t border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="border-r border-gray-200 p-4 text-gray-700">
                  {risk.riskCategory || 'Data'}
                </td>
                <td className="border-r border-gray-200 p-4 text-gray-700">
                  {risk.typeOfRisk || 'Data'}
                </td>
                <td className="border-r border-gray-200 p-4 text-gray-700">
                  {risk.severityOfRisk || 'Data'}
                </td>
                <td className="border-r border-gray-200 p-4 text-gray-700">
                  {risk.potentialImpact || 'Data'}
                </td>
                <td className="border-r border-gray-200 p-4 text-gray-700">
                  {risk.likelihoodOfImpact || 'Data'}
                </td>
                <td className="p-4 text-gray-700">
                  {risk.mitigation || 'Data'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

  return (
    <>
      <div>
        <div id="section5_1" ref={section5_1Ref}>
          <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between">
            <p className="text-[15px] text-[#667085] mb-2 mt-3">
              Add a statement about how the company includes climate risks and opportunities in its overall business strategy
            </p>
            <button
              className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
              onClick={loadAutoFillContent1}
            >
              <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
              Auto Fill
            </button>
          </div>

          <div className="mb-6">
            <JoditEditor
              ref={editorRef1}
              value={strategy.climateRisksOpportunities}
              config={{...config, placeholder: "Add a statement about how the company includes climate risks and opportunities in its overall business strategy"}}
              tabIndex={1}
              onBlur={handleEditor1Change}
              onChange={handleEditor1Change}
            />
          </div>

          <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
            5.1 Climate-Related Risks and Opportunities Assessment
          </h3>

          <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between">
            <p className="text-[15px] text-[#667085] mb-2 mt-3">
              Add a statement about company's approach for identification of climate risks and opportunities
            </p>
            <button
              className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
              onClick={loadAutoFillContent2}
            >
              <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
              Auto Fill
            </button>
          </div>

          <div className="mb-6">
            <JoditEditor
              ref={editorRef2}
              value={strategy.impactOnBusiness}
              config={{...config, placeholder: "Add a statement about company's approach for identification of climate risks and opportunities"}}
              tabIndex={2}
              onBlur={handleEditor2Change}
              onChange={handleEditor2Change}
            />
          </div>

          <div className="mb-6 text-sm leading-relaxed">
            <p className="mb-4">
              We have identified a range of climate-related risks and opportunities across short-, medium-, and long-term 
              time horizons, using internal assessments, scenario planning, and stakeholder input. These are broadly 
              categorized as:
            </p>
          </div>

          <RiskTable title="Physical Risks" riskData={data.physicalRisks || mockRiskData.physical} />
          <RiskTable title="Transition Risks" riskData={data.transitionRisks || mockRiskData.transition} />
          <RiskTable title="Other Risks" riskData={data.otherRisks || mockRiskData.other} />

          <div className="mb-6 text-sm leading-relaxed py-4 rounded">
            <p className="mb-2">
              We define our climate-related time horizons to ensure a consistent and forward-looking approach to assessing risks 
              and opportunities. These are categorized as immediate term (0-1 years), short-term (1-3 years), and long-term (3+ 
              years) to support decision-making.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section1;