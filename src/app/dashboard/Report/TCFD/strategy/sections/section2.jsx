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

const Section2 = ({ section5_2Ref, data, tcfdCollectData, orgName }) => {
  const dispatch = useDispatch();
  const strategy = useSelector(selectStrategy);
  const editorRef = useRef(null);

  // Extract business impact data from tcfdCollectData
  const businessImpactData = tcfdCollectData?.general_business_impact?.[0] || {};

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
    const autoFillContent = `Climate-related risks and opportunities are increasingly influencing how we operate, invest, and plan for the future. This section outlines how these factors are integrated into our core business strategy, financial planning processes, and long-term decision-making. </p>`;
    
    dispatch(setImpactOnBusiness(autoFillContent));
  };

  const handleEditorChange = (content) => {
    dispatch(setImpactOnBusiness(content));
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
              {data?.map((row, index) => (
                <tr key={index} className="bg-white border-t border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="border-r border-gray-200 p-4 text-gray-700">
                    {row.label || ''}
                  </td>
                  <td className="border-r border-gray-200 p-4 text-gray-700">
                    {renderArrayValue(row.selectedOptions)}
                  </td>
                  <td className="p-4 text-gray-700">
                    {row.impact || ''}
                  </td>
                </tr>
              ))}
              {(!data || data.length === 0) && (
                <tr className="bg-white border-t border-gray-200">
                  <td colSpan={columns.length} className="p-4 text-center text-gray-500">
                    No data available
                  </td>
                </tr>
              )}
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

          {/* General Business Impact from Q1 data */}
          {businessImpactData?.Q1 && (
            <div className="mb-6">
              <p className="text-sm mb-4">
                The following table outlines how climate-related issues have influenced our organization's strategy, planning, and operations across key business areas:
              </p>
              
              <BusinessImpactTable 
                title=""
                data={businessImpactData.Q1}
                columns={["Climate-Related Risk/Opportunity", "Business Areas Affected", "Impact"]}
              />
            </div>
          )}

          {/* Additional Q&A sections */}
          {businessImpactData?.Q2 && (
            <div className="mb-6">
              <h4 className="text-[15px] text-[#344054] mb-2 font-semibold">
                Financial Planning Prioritization
              </h4>
              <div className="text-sm">
                {businessImpactData.Q2}
              </div>
            </div>
          )}

          {businessImpactData?.Q3 && (
            <div className="mb-6">
              <h4 className="text-[15px] text-[#344054] mb-2 font-semibold">
                Impact on Financial Planning
              </h4>
              <div className="text-sm">
                {businessImpactData.Q3}
              </div>
            </div>
          )}

          {/* Show message if no business impact data */}
          {(!businessImpactData?.Q1 && !businessImpactData?.Q2 && !businessImpactData?.Q3) && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-700 text-sm">
                No business impact data available. Please complete the questionnaire to see detailed business impact information here.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Section2;