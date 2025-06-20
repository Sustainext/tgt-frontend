"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import STARSVG from "../../../../../../../public/star.svg";
import {
  setImpactOnBusiness,
  selectStrategy,
} from "../../../../../../lib/redux/features/TCFDSlice/tcfdslice";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Section2 = ({ section5_2Ref, data, orgName }) => {
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
    const autoFillContent = `<p>Climate-related risks and opportunities are influencing ${orgName || '[Company Name]'}'s strategic direction and outlook for the future. This section outlines how these factors are integrated into our core business strategy, financial planning processes, and long-term decision-making.</p>`;
    
    dispatch(setImpactOnBusiness(autoFillContent));
  };

  const handleEditorChange = (content) => {
    dispatch(setImpactOnBusiness(content));
  };

  // Mock data for business impact tables
  const mockBusinessImpact = {
    climateRelatedRiskImpact: [
      { item: "Supply Chain", impact: "Disruption potential", rating: "Medium" },
      { item: "Operations", impact: "Cost increases", rating: "High" },
      { item: "Revenue", impact: "Market volatility", rating: "Medium" }
    ],
    businessAreasAffected: [
      { area: "Manufacturing", effect: "Energy costs", impact: "High" },
      { area: "Logistics", effect: "Transportation efficiency", impact: "Medium" },
      { area: "R&D", effect: "Innovation focus", impact: "High" }
    ]
  };

const BusinessImpactTable = ({ title, data, columns }) => (
  <div className="mb-8">
    <h4 className="text-[15px] text-[#344054] mb-3 font-semibold">{title}</h4>
    <div className="overflow-x-auto">
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="">
              {columns.map((col, index) => (
                <th 
                  key={index} 
                  className={`py-8 px-4 text-left text-gray-600 font-medium ${
                    index < columns.length - 1 ? 'border-r border-gray-200' : ''
                  }`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="bg-white border-t border-gray-200 hover:bg-gray-50 transition-colors">
                {Object.values(row).map((value, cellIndex) => (
                  <td 
                    key={cellIndex} 
                    className={`p-4 text-gray-700 ${
                      cellIndex < Object.values(row).length - 1 ? 'border-r border-gray-200' : ''
                    }`}
                  >
                    {value || 'Data'}
                  </td>
                ))}
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
        <div id="section5_2" ref={section5_2Ref}>
          <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
            5.2 Impact on Business, Strategy, and Financial Planning
          </h3>

          <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between">
            <p className="text-[15px] text-[#667085] mb-2 mt-3">
              Add statement about impact of climate related issues on company's business, strategy and financial planning
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
              value={strategy.impactOnBusiness}
              config={{...config, placeholder: "Add statement about impact of climate related issues on company's business, strategy and financial planning"}}
              tabIndex={1}
              onBlur={handleEditorChange}
              onChange={() => {}}
            />
          </div>

          {/* Blue placeholder text sections */}
          <div className="mb-6 bg-blue-50 p-3 rounded border">
            <p className="text-blue-600 text-sm font-medium mb-2">
              (Response from TCFD-STG-B "General Business Impact" field group, without heading)
            </p>
            <p className="text-sm">
              The following table outlines how climate-related issues have influenced our organization's strategy, planning, and operations across key business areas:
            </p>
          </div>

          <BusinessImpactTable 
            title="Climate-Related Risk Impact"
            data={data.climateRelatedRiskImpact || mockBusinessImpact.climateRelatedRiskImpact}
            columns={["Climate-Related Risk/Opportunity", "Business Areas Affected", "Impact"]}
          />

          <BusinessImpactTable 
            title="Business Areas Affected"
            data={data.businessAreasAffected || mockBusinessImpact.businessAreasAffected}
            columns={["Business Areas", "Type of Risks", "Impact"]}
          />

          {/* Additional placeholder sections */}
          <div className="mb-6 bg-blue-50 p-3 rounded border">
            <p className="text-blue-600 text-sm">
              (Response from "Describe how climate-related risks and opportunities are prioritised in financial planning" question, without heading)
            </p>
          </div>

          <div className="mb-6 bg-blue-50 p-3 rounded border">
            <p className="text-blue-600 text-sm">
              (Response from "What impacts have climate-related issues had on your financial planning" question, without heading)
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section2;