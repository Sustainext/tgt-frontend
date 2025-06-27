"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import STARSVG from "../../../../../../../public/star.svg";
import {
  setBoardOversight,
  setTcfdFrameworkDescription,
  selectGovernance,
} from "../../../../../../lib/redux/features/TCFDSlice/tcfdslice";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Section1 = ({ section4_1Ref, data, tcfdCollectData, orgName }) => {
  const dispatch = useDispatch();
  const governance = useSelector(selectGovernance);
  const boardOversightEditorRef = useRef(null);
  const tcfdFrameworkEditorRef = useRef(null);

  // Extract data from tcfdCollectData
  const boardOversightData =
    tcfdCollectData
      ?.boards_oversight_of_climate_related_risks_and_opportunities?.[0] || {};
  const governanceStructureData =
    tcfdCollectData?.governance_structure?.[0] || {};
  const committeesData =
    tcfdCollectData?.committees_of_the_highest_governance_body?.[0] || {};

  // Jodit Editor configuration
  const config = {
    readonly: false,
    height: 300,
    toolbarSticky: false,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    buttons: [
      "bold",
      "italic",
      "underline",
      "|",
      "ul",
      "ol",
      "|",
      "font",
      "fontsize",
      "|",
      "align",
      "|",
      "undo",
      "redo",
    ],
  };

  // Config for board oversight editor
  const boardOversightConfig = {
    ...config,
    placeholder:
      "Add a statement about how the company includes climate-related issues in its overall governance",
  };

  // Config for TCFD framework editor
  const tcfdFrameworkConfig = {
    ...config,
    placeholder: "Add TCFD framework description and background information",
    height: 400,
  };

  const loadBoardOversightAutoFill = () => {
    const autoFillContent = `<p>${
      orgName || "[Company Name]"
    } is committed to integrating climate-related considerations at the highest levels of decision-making. Governance of climate risks and opportunities is structured in accordance with the principles and the recommendations of the Task Force on Climate-related Financial Disclosures (TCFD).</p>`;

    dispatch(setBoardOversight(autoFillContent));
  };

  const loadTcfdFrameworkAutoFill = () => {
    const tcfdFrameworkContent = `<p>The Board of Directors at ${orgName || 'Company name'} provides oversight of climate-related risks and opportunities through formal mechanisms embedded within the company's governance structure. Oversight is exercised via dedicated board-level committees and supplemented by regular engagement with senior management.  
<br/>
Climate-related risks and opportunities are identified through internal risk assessments and are aligned with international disclosure frameworks. These matters are brought to the Board’s attention through scheduled reporting cycles and are reviewed as part of structured board agendas and risk oversight protocols. 
<br/>
Climate-related risks and opportunities are considered in the context of broader corporate decision-making. Monitoring and oversight are conducted through qualitative and quantitative indicators, scenario-based assessments, and internal review mechanisms. The Board reviews these inputs to assess progress on mitigation efforts and to ensure alignment with the company’s broader climate strategy and regulatory requirements. Information related to these matters is presented through periodic updates by management, which the Board uses to support long-term value creation and explore pathways to align the business with global decarbonization and sustainable development agendas. </p>`;

    dispatch(setTcfdFrameworkDescription(tcfdFrameworkContent));
  };

  const handleBoardOversightChange = (content) => {
    dispatch(setBoardOversight(content));
  };

  const handleTcfdFrameworkChange = (content) => {
    dispatch(setTcfdFrameworkDescription(content));
  };

  return (
    <>
      <div>
        <div id="section4_1" ref={section4_1Ref}>
          <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between">
            <p className="text-[15px] text-[#667085] mb-2 mt-3">
              Add a statement about how the company includes climate-related
              issues in its overall governance
            </p>
            <button
              className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
              onClick={loadBoardOversightAutoFill}
            >
              <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
              Auto Fill
            </button>
          </div>

          <div className="mb-6">
            <JoditEditor
              ref={boardOversightEditorRef}
              value={governance.boardOversight}
              config={boardOversightConfig}
              tabIndex={1}
              onBlur={handleBoardOversightChange}
              onChange={() => {}}
            />
          </div>

          <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
            4.1. Board's Oversight of Climate-Related Risks and Opportunities
          </h3>

          {/* TCFD Framework Description Section */}
          <div className="mb-6">
            <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between">
              <p className="text-[15px] text-[#667085] mb-2 mt-3">
                Add a statement about how the board is informed of and oversees climate-related risks and opportunities 
              </p>
              <button
                className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
                onClick={loadTcfdFrameworkAutoFill}
              >
                <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
                Auto Fill
              </button>
            </div>

            <div className="mb-6">
              <JoditEditor
                ref={tcfdFrameworkEditorRef}
                value={governance.tcfdFrameworkDescription}
                config={tcfdFrameworkConfig}
                tabIndex={2}
                onBlur={handleTcfdFrameworkChange}
                onChange={() => {}}
              />
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-[15px] text-[#344054] mb-2 font-semibold">
              Board Committees Informed on Climate Related Issues
            </h4>
            <div className="text-sm">
              {Array.isArray(committeesData?.Q1)
                ? committeesData.Q1.map((item, index) => (
                    <div key={index}>
                      {Array.isArray(item) ? item.join(" - ") : item}
                    </div>
                  ))
                : committeesData?.Q1 || ""}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-[15px] text-[#344054] mb-2 font-semibold">
              Oversight of Climate-Related Risks and Opportunities
            </h4>
            <div className="text-sm">
              {Array.isArray(boardOversightData?.Q1)
                ? boardOversightData.Q1.map((item, index) => (
                    <div key={index}>
                      {Array.isArray(item) ? item.join(" - ") : item}
                    </div>
                  ))
                : boardOversightData?.Q1 || ""}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-[15px] text-[#344054] mb-2 font-semibold">
              Processes for Informing the Board on Climate-Related Issues
            </h4>
            <div className="text-sm">
              {Array.isArray(boardOversightData?.Q2)
                ? boardOversightData.Q2.map((item, index) => (
                    <div key={index}>
                      {Array.isArray(item) ? item.join(" - ") : item}
                    </div>
                  ))
                : boardOversightData?.Q2 || ""}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-[15px] text-[#344054] mb-2 font-semibold">
              Incorporation of Climate Considerations in Strategic and
              Governance Decisions
            </h4>
            <div>
              <div className="text-sm">
                {boardOversightData?.Q3 === "Yes"
                  ? Array.isArray(boardOversightData?.Q4)
                    ? boardOversightData.Q4.map((item, index) => (
                        <div key={index}>
                          {Array.isArray(item) ? item.join(" - ") : item}
                        </div>
                      ))
                    : boardOversightData?.Q4 || ""
                  : ""}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-[15px] text-[#344054] mb-2 font-semibold">
              Board Monitoring of Progress Against Climate Targets and Goals
            </h4>
            <div className="text-sm">
              {Array.isArray(boardOversightData?.Q5)
                ? boardOversightData.Q5.map((item, index) => (
                    <div key={index}>
                      {Array.isArray(item) ? item.join(" - ") : item}
                    </div>
                  ))
                : boardOversightData?.Q5 || ""}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section1;
