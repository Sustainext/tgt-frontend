"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import STARSVG from "../../../../../../../public/star.svg";
import {
  setManagementRole,
  selectGovernance,
} from "../../../../../../lib/redux/features/TCFDSlice/tcfdslice";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Section2 = ({ section4_2Ref, data, tcfdCollectData, orgName }) => {
  const dispatch = useDispatch();
  const governance = useSelector(selectGovernance);
  const editorRef = useRef(null);

  // Extract data from tcfdCollectData
  const managementRoleData = tcfdCollectData?.managements_role_in_assessing_and_managing_climate_related_risks_and_opportunities?.[0] || {};
  const governanceStructureData = tcfdCollectData?.governance_structure?.[0] || {};

  // Jodit Editor configuration
  const config = {
    readonly: false,
    placeholder: "Add a statement about how the company's management identifies and handles climate-related risks",
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
    const autoFillContent = `<p>${orgName || '[Company Name]'} has established a formalized approach to ensure climate-related responsibilities are embedded across management structures. In line with TCFD recommendations, our organization has developed clear internal processes to assign roles, enable reporting, and support operational oversight of climate-related issues. Climate-related responsibilities have been assigned to relevant management-level positions and committees, which are actively involved in assessing and managing climate-related risks and opportunities.</p>

<p>Structured processes have been defined for informing management about climate-related issues, and these are tracked through established monitoring mechanisms. Overall, ${orgName || '[Company Name]'}'s approach ensures that management has both the responsibility and the information required to effectively assess, manage, and report on climate-related risks and opportunities, while maintaining alignment with the company's broader strategic, financial, and sustainability objectives.</p>`;
    
    dispatch(setManagementRole(autoFillContent));
  };

  const handleEditorChange = (content) => {
    dispatch(setManagementRole(content));
  };

  return (
    <>
      <div>
        <div id="section4_2" ref={section4_2Ref}>
          <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
            4.2. Management's role in assessing and managing climate related risks and opportunities
          </h3>

          <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between">
            <p className="text-[15px] text-[#667085] mb-2 mt-3">
              Add a statement about how the company's management identifies and handles climate-related risks
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
              value={governance.managementRole}
              config={config}
              tabIndex={1}
              onBlur={handleEditorChange}
              onChange={() => {}}
            />
          </div>

          <div className="mb-6">
            <h4 className="text-[15px] text-[#344054] mb-2 font-semibold">
              Organization Structure
            </h4>
            <div className="text-sm">
              {Array.isArray(governanceStructureData?.Q1) ? (
                governanceStructureData.Q1.map((item, index) => (
                  <div key={index}>
                    {Array.isArray(item) ? item.join(' - ') : item}
                  </div>
                ))
              ) : (
                governanceStructureData?.Q1 || ''
              )}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-[15px] text-[#344054] mb-2 font-semibold">
              Processes for Informing the Management on Climate-Related Issues
            </h4>
            <div>
              <div className="mt-2 text-sm">
                {managementRoleData?.Q1 === 'Yes' ? (
                  Array.isArray(managementRoleData?.Q4) ? (
                    managementRoleData.Q4.map((item, index) => (
                      <div key={index}>
                        {Array.isArray(item) ? item.join(' - ') : item}
                      </div>
                    ))
                  ) : (
                    managementRoleData?.Q4 || ''
                  )
                ) : ''}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-[15px] text-[#344054] mb-2 font-semibold">
              Management Monitoring of Climate Related Issues
            </h4>
            <div className="">
              <div className="mt-2 text-sm">
                {managementRoleData?.Q3 === 'Yes' ? (
                  Array.isArray(managementRoleData?.Q5) ? (
                    managementRoleData.Q5.map((item, index) => (
                      <div key={index}>
                        {Array.isArray(item) ? item.join(' - ') : item}
                      </div>
                    ))
                  ) : (
                    managementRoleData?.Q5 || ''
                  )
                ) : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section2;