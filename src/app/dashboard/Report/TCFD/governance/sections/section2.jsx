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

const Section2 = ({ section4_2Ref, data, orgName }) => {
  const dispatch = useDispatch();
  const governance = useSelector(selectGovernance);
  const editorRef = useRef(null);

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

  // Mock data structure - replace with actual data when available
  const mockData = {
    "2-9-a": {
      governance_structure: "Climate Risk Committee, Sustainability Team, Executive Leadership"
    },
    "TCFD-GOV-B": {
      management_processes: "Monthly climate risk assessments and quarterly reporting to executive leadership.",
      monitoring_processes: "Continuous monitoring through established KPIs and regular stakeholder engagement."
    }
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
            <div className="bg-gray-50 p-3 rounded border text-sm text-blue-600">
              {data["2-9-a"]?.governance_structure || mockData["2-9-a"].governance_structure}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-[15px] text-[#344054] mb-2 font-semibold">
              Processes for Informing the Management on Climate-Related Issues
            </h4>
            <div className="bg-gray-50 p-4 rounded border">
              <div className="text-sm text-gray-600 mb-2">
                Note for devs: A tailored version of the "Management's role in assessing and managing climate related risks and opportunities" section's data is 
                required here. i.e. skip yes/no response)
              </div>
              <div className="text-sm text-blue-600 mb-2">
                (If 'Yes' option is selected for the question "Whether the organization has assigned climate-related responsibilities to management-level 
                positions or committees:", fetch response from TCFD-GOV-B. "Mention the processes by which management is informed about climate-related 
                issues" without heading)
              </div>
              <div className="text-sm text-blue-600 mb-2">
                (If 'No' option is selected skip entire section).
              </div>
              <div className="mt-2 text-sm">
                {data["TCFD-GOV-B"]?.management_processes || mockData["TCFD-GOV-B"].management_processes}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-[15px] text-[#344054] mb-2 font-semibold">
              Management Monitoring of Climate Related Issues
            </h4>
            <div className="bg-gray-50 p-4 rounded border">
              <div className="text-sm text-gray-600 mb-2">
                Note for devs: A tailored version of the "Management's role in assessing and managing climate related risks and opportunities" section's data is 
                required here. i.e. skip yes/no response)
              </div>
              <div className="text-sm text-blue-600 mb-2">
                (If 'Yes' option is selected for the question "Whether those responsibilities include assessing and/or managing climate-related issues", fetch 
                response from TCFD-GOV-B "Describe how the management (through specific positions and/or management committees) monitors climate-
                related issues" without heading)
              </div>
              <div className="text-sm text-blue-600 mb-2">
                (If 'No' option is selected skip entire section).
              </div>
              <div className="mt-2 text-sm">
                {data["TCFD-GOV-B"]?.monitoring_processes || mockData["TCFD-GOV-B"].monitoring_processes}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section2;